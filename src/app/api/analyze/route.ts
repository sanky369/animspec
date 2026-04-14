import { NextRequest } from 'next/server';
import { after } from 'next/server';
import {
  analyzeVideoWithGeminiStream,
  analyzeVideoWithGeminiFileStream,
  type GeminiQualityLevel,
} from '@/lib/ai/gemini';
import { analyzeVideoWithKimiStream } from '@/lib/ai/kimi';
import { runAgenticPipeline } from '@/lib/ai/agentic-pipeline';
import { runDeepAnalysis } from '@/lib/video-understanding/orchestrator';
import type { DeepAnalysisRunResult } from '@/lib/video-understanding/artifacts';
import { createAnalysisRunRecord, finalizeAnalysisRunRecord, persistArtifacts } from '@/lib/video-understanding/persistence/run-store';
import { adminAuth, adminDb, adminStorage } from '@/lib/firebase/admin';
import { COLLECTIONS, CREDIT_COSTS, AGENTIC_CREDIT_COSTS, MAX_ANALYSES_PER_USER } from '@/types/database';
import { FieldValue } from 'firebase-admin/firestore';
import type { OutputFormat, QualityLevel, TriggerContext, VideoMetadata } from '@/types/analysis';
import { extractOverview } from '@/lib/ai/output-parsers';
import { uploadVideoToGemini } from '@/lib/storage/gemini-files';
import { fetchAsBase64, fetchObject, isR2Configured, deleteObject } from '@/lib/storage/r2';

export const runtime = 'nodejs';
export const maxDuration = 300; // 300 seconds timeout for Kimi thinking mode
const DEEP_ANALYSIS_PIPELINE_VERSION = process.env.DEEP_ANALYSIS_PIPELINE_VERSION ?? 'v2';

function parseNumber(value: FormDataEntryValue | null): number | null {
  if (value === null) return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function parseVideoMetadata(formData: FormData): VideoMetadata | null {
  const duration = parseNumber(formData.get('videoDuration'));
  const width = parseNumber(formData.get('videoWidth'));
  const height = parseNumber(formData.get('videoHeight'));
  const size = parseNumber(formData.get('videoSize'));
  const mimeType = formData.get('videoMimeType');
  const name = formData.get('videoName');

  if (duration === null || width === null || height === null || size === null) {
    return null;
  }

  return {
    duration,
    width,
    height,
    size,
    mimeType: typeof mimeType === 'string' ? mimeType : '',
    name: typeof name === 'string' ? name : '',
  };
}

async function verifyAuth(request: NextRequest): Promise<string | null> {
  // Check Authorization header first, then cookie
  const authHeader = request.headers.get('Authorization');
  const sessionCookie = request.cookies.get('__session')?.value;
  const token = authHeader?.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : sessionCookie;
    
  if (!token) return null;

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken.uid;
  } catch {
    return null;
  }
}

async function checkCredits(
  userId: string,
  quality: QualityLevel,
  agenticMode: boolean = false
): Promise<{ canProceed: boolean; error?: string }> {
  const profileRef = adminDb.collection(COLLECTIONS.PROFILES).doc(userId);
  const profileSnap = await profileRef.get();

  if (!profileSnap.exists) {
    return { canProceed: false, error: 'User profile not found' };
  }

  const profile = profileSnap.data();
  const cost = agenticMode ? AGENTIC_CREDIT_COSTS[quality] : CREDIT_COSTS[quality];
  const balance = profile?.creditsBalance ?? 0;

  if (balance < cost) {
    return {
      canProceed: false,
      error: `Insufficient credits. Need ${cost}, have ${balance}`,
    };
  }

  if (quality === 'precise' && !profile?.isPaidUser) {
    return {
      canProceed: false,
      error: 'Precise mode requires a paid account',
    };
  }

  return { canProceed: true };
}

async function deductCreditsAndSaveAnalysis(
  userId: string,
  quality: QualityLevel,
  format: OutputFormat,
  triggerContext: TriggerContext,
  overview: string,
  code: string,
  frameImageBase64: string | null,
  videoName: string,
  videoDuration: number,
  cost?: number,
  metadata?: {
    runId?: string | null;
    verificationScore?: number | null;
    pipelineFamily?: 'reconstruct' | 'audit' | 'behavior' | null;
    pipelineVersion?: string | null;
  }
): Promise<{ success: boolean; error?: string; analysisId?: string }> {
  const creditCost = cost ?? CREDIT_COSTS[quality];
  const profileRef = adminDb.collection(COLLECTIONS.PROFILES).doc(userId);

  try {
    // Upload frame image to Firebase Storage if provided
    let frameImageUrl: string | null = null;

    if (frameImageBase64) {
      try {
        const bucket = adminStorage.bucket();
        const fileName = `frames/${userId}/${Date.now()}.jpg`;
        const file = bucket.file(fileName);

        const buffer = Buffer.from(
          frameImageBase64.replace(/^data:image\/\w+;base64,/, ''),
          'base64'
        );

        await file.save(buffer, {
          contentType: 'image/jpeg',
          metadata: { cacheControl: 'public, max-age=31536000' },
        });

        await file.makePublic();
        frameImageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      } catch (err) {
        console.error('Failed to upload frame image:', err);
      }
    }

    // Transaction: deduct credits + save analysis
    await adminDb.runTransaction(async (transaction) => {
      const profileDoc = await transaction.get(profileRef);

      if (!profileDoc.exists) {
        throw new Error('User profile not found');
      }

      const profile = profileDoc.data();
      if ((profile?.creditsBalance ?? 0) < creditCost) {
        throw new Error('Insufficient credits');
      }

      const newBalance = (profile?.creditsBalance ?? 0) - creditCost;

      // Update profile
      transaction.update(profileRef, {
        creditsBalance: newBalance,
        updatedAt: FieldValue.serverTimestamp(),
      });

      // Create analysis record
      const analysisRef = adminDb.collection(COLLECTIONS.ANALYSES).doc();
      transaction.set(analysisRef, {
        userId,
        format,
        quality,
        triggerContext,
        overview,
        code,
        frameImageUrl,
        videoName,
        videoDuration,
        creditsUsed: creditCost,
        runId: metadata?.runId ?? null,
        verificationScore: metadata?.verificationScore ?? null,
        pipelineFamily: metadata?.pipelineFamily ?? null,
        pipelineVersion: metadata?.pipelineVersion ?? null,
        createdAt: FieldValue.serverTimestamp(),
      });

      // Create credit transaction record
      const txRef = adminDb.collection(COLLECTIONS.CREDIT_TRANSACTIONS).doc();
      transaction.set(txRef, {
        userId,
        amount: -creditCost,
        type: 'analysis',
        quality,
        description: `Analysis (${quality} quality)`,
        analysisId: analysisRef.id,
        purchaseId: null,
        createdAt: FieldValue.serverTimestamp(),
      });
    });

    return { success: true, analysisId: 'saved' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to process';
    return { success: false, error: message };
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Parse form data
    let fileUri = formData.get('fileUri') as string | null;
    let fileMimeType = formData.get('fileMimeType') as string | null;
    let videoBase64 = formData.get('videoBase64') as string | null;
    let mimeType = formData.get('mimeType') as string;
    const format = formData.get('format') as OutputFormat;
    const quality = formData.get('quality') as QualityLevel;
    const triggerContext = formData.get('triggerContext') as TriggerContext | null;
    const agenticMode = formData.get('agenticMode') === 'true';
    const fileSizeStr = formData.get('fileSize') as string | null;
    const fileSize = fileSizeStr ? parseInt(fileSizeStr, 10) : 0;
    const videoMetadata = parseVideoMetadata(formData);
    
    // R2 storage support for large files
    const r2ObjectKey = formData.get('r2ObjectKey') as string | null;
    const r2MimeType = formData.get('r2MimeType') as string | null;

    const framePreviewBase64 = formData.get('framePreviewBase64') as string | null;
    const frameGridBase64 = formData.get('frameGridBase64') as string | null;
    const frameGridWidth = parseNumber(formData.get('frameGridWidth') as string | null);
    const frameGridHeight = parseNumber(formData.get('frameGridHeight') as string | null);
    const frameGridCount = parseNumber(formData.get('frameGridCount') as string | null);
    const frameGridColumns = parseNumber(formData.get('frameGridColumns') as string | null);

    const analysisImages = [
      ...(framePreviewBase64 ? [{
        base64: framePreviewBase64,
        mimeType: 'image/jpeg',
        description: 'Primary reference frame extracted from the uploaded video',
      }] : []),
      ...(frameGridBase64 ? [{
        base64: frameGridBase64,
        mimeType: 'image/jpeg',
        description: `Keyframe grid (${frameGridCount ?? 'unknown'} frames, ${frameGridColumns ?? 'unknown'} columns, ${frameGridWidth ?? 'unknown'}x${frameGridHeight ?? 'unknown'})`,
      }] : []),
    ];

    if (!format || !quality) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch video from R2 if objectKey is provided
    if (r2ObjectKey && isR2Configured()) {
      try {
        if (quality !== 'kimi' && !fileUri) {
          const apiKey = process.env.GEMINI_API_KEY;
          if (!apiKey) {
            return new Response(
              JSON.stringify({ error: 'GEMINI_API_KEY not configured' }),
              { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
          }

          const r2Data = await fetchObject(r2ObjectKey);
          const uploadFile = new File(
            [new Uint8Array(r2Data.buffer)],
            videoMetadata?.name || 'uploaded-video.mp4',
            { type: r2MimeType || r2Data.contentType }
          );
          const uploaded = await uploadVideoToGemini(uploadFile, apiKey);
          fileUri = uploaded.uri;
          fileMimeType = uploaded.mimeType;
        } else {
          const r2Data = await fetchAsBase64(r2ObjectKey);
          videoBase64 = r2Data.base64;
          mimeType = r2MimeType || r2Data.contentType;
        }
        
        // Schedule deletion after analysis (3 days handled by R2 lifecycle, but we can delete sooner)
        after(async () => {
          try {
            await deleteObject(r2ObjectKey);
            console.log(`Deleted R2 object: ${r2ObjectKey}`);
          } catch (err) {
            console.error(`Failed to delete R2 object ${r2ObjectKey}:`, err);
          }
        });
      } catch (err) {
        console.error('R2 fetch error:', err);
        return new Response(
          JSON.stringify({ error: 'Failed to retrieve video from storage' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    if (!fileUri && !videoBase64) {
      return new Response(
        JSON.stringify({ error: 'Missing video data' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify authentication (optional for demo mode)
    const userId = await verifyAuth(request);
    const isAuthenticated = !!userId;

    // If authenticated, check credits
    if (isAuthenticated) {
      const creditCheck = await checkCredits(userId, quality, agenticMode);
      if (!creditCheck.canProceed) {
        return new Response(
          JSON.stringify({ error: creditCheck.error }),
          { status: 402, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Create streaming response
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Start analysis in background
    (async () => {
      let deepRunId: string | null = null;
      let deepStageCount = 0;

      try {
        await writer.write(
          encoder.encode(
            `data: ${JSON.stringify({ type: 'progress', step: 'analyzing', message: 'AI analysis in progress...' })}\n\n`
          )
        );

        let fullResult = '';

        // === AGENTIC MODE: V2 planner/orchestrator ===
        if (agenticMode && DEEP_ANALYSIS_PIPELINE_VERSION !== 'v1') {
          let runId: string | null = null;
          let runFamily: 'reconstruct' | 'audit' | 'behavior' | null = null;
          let verificationScore: number | null = null;
          let deepResult: DeepAnalysisRunResult | null = null;

          const iterator = runDeepAnalysis({
            apiKey: process.env.GEMINI_API_KEY || '',
            format,
            quality,
            triggerContext,
            videoMetadata,
            fileSize,
            videoName: videoMetadata?.name || 'Unknown',
            fileUri: fileUri || undefined,
            fileMimeType: fileMimeType || undefined,
            inlineMimeType: mimeType || undefined,
            inlineVideoBase64: videoBase64 || undefined,
            r2ObjectKey: r2ObjectKey || undefined,
            framePreviewBase64: framePreviewBase64 || undefined,
            frameGridBase64: frameGridBase64 || undefined,
            frameGridWidth,
            frameGridHeight,
            frameGridCount,
            frameGridColumns,
          });

          let step = await iterator.next();
          while (!step.done) {
            const event = step.value;

            switch (event.type) {
              case 'run_created':
                runId = event.runId;
                deepRunId = event.runId;
                runFamily = event.family as 'reconstruct' | 'audit' | 'behavior';
                await createAnalysisRunRecord({
                  runId,
                  userId,
                  format,
                  quality,
                  triggerContext,
                  family: runFamily,
                  complexity: event.complexity as 'simple' | 'moderate' | 'complex',
                  pipelineVersion: 'v2',
                  generatorModel: event.generatorModel,
                  verifierModel: event.verifierModel,
                });
                await writer.write(
                  encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
                );
                break;
              case 'stage_start':
              case 'stage_complete':
              case 'stage_output':
              case 'thinking':
              case 'revision_start':
              case 'verification':
                if (event.type === 'stage_output') {
                  fullResult += event.chunk;
                }
                if (event.type === 'verification') {
                  verificationScore = event.verification.score;
                }
                await writer.write(
                  encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
                );
                break;
              case 'complete':
                fullResult = event.finalArtifact.content;
                await writer.write(
                  encoder.encode(`data: ${JSON.stringify({
                    type: 'complete',
                    data: event.finalArtifact.content,
                    finalArtifact: event.finalArtifact,
                    runId,
                  })}\n\n`)
                );
                break;
              case 'error':
                throw new Error(event.message);
            }

            step = await iterator.next();
          }

          deepResult = step.value;

          if (runId && deepResult) {
            deepStageCount = deepResult.stageArtifacts.length;
            await persistArtifacts({
              runId,
              sharedArtifacts: deepResult.sharedArtifacts,
              stageArtifacts: deepResult.stageArtifacts,
              finalArtifact: deepResult.finalArtifact,
              verification: deepResult.verification,
            });
            await finalizeAnalysisRunRecord({
              runId,
              status: 'complete',
              finalArtifact: deepResult.finalArtifact,
              verification: deepResult.verification,
              stageCount: deepResult.stageArtifacts.length,
            });
          }

          if (isAuthenticated && userId) {
            const overview = extractOverview(fullResult);
            const result = await deductCreditsAndSaveAnalysis(
              userId,
              quality,
              format,
              triggerContext,
              overview,
              fullResult,
              framePreviewBase64 || frameGridBase64,
              videoMetadata?.name || 'Unknown',
              videoMetadata?.duration || 0,
              AGENTIC_CREDIT_COSTS[quality],
              {
                runId,
                verificationScore,
                pipelineFamily: runFamily,
                pipelineVersion: 'v2',
              }
            );

            if (!result.success) {
              console.error('Failed to save analysis:', result.error);
            }

            after(async () => {
              try {
                const snapshot = await adminDb
                  .collection(COLLECTIONS.ANALYSES)
                  .where('userId', '==', userId)
                  .orderBy('createdAt', 'desc')
                  .get();

                if (snapshot.size > MAX_ANALYSES_PER_USER) {
                  const toDelete = snapshot.docs.slice(MAX_ANALYSES_PER_USER);
                  const batch = adminDb.batch();
                  for (const doc of toDelete) batch.delete(doc.ref);
                  await batch.commit();
                }
              } catch (cleanupError) {
                console.error('Failed to cleanup old analyses:', cleanupError);
              }
            });
          }

        } else if (agenticMode && quality !== 'kimi') {
          const pipeline = runAgenticPipeline({
            videoBase64: videoBase64 || undefined,
            mimeType: mimeType || undefined,
            fileUri: fileUri || undefined,
            fileMimeType: fileMimeType || undefined,
            format,
            quality: quality as GeminiQualityLevel,
            triggerContext,
            videoMetadata,
            analysisImages: analysisImages.length > 0 ? analysisImages : undefined,
          });

          for await (const event of pipeline) {
            switch (event.type) {
              case 'pass_start':
                await writer.write(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      type: 'pass_start',
                      pass: event.pass,
                      passName: event.passName,
                      totalPasses: event.totalPasses,
                    })}\n\n`
                  )
                );
                break;

              case 'pass_complete':
                await writer.write(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      type: 'pass_complete',
                      pass: event.pass,
                      passName: event.passName,
                    })}\n\n`
                  )
                );
                break;

              case 'thinking':
                await writer.write(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      type: 'thinking',
                      pass: event.pass,
                      data: event.data,
                    })}\n\n`
                  )
                );
                break;

              case 'chunk':
                fullResult += event.data;
                await writer.write(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      type: 'chunk',
                      pass: event.pass,
                      data: event.data,
                    })}\n\n`
                  )
                );
                break;

              case 'error':
                throw new Error(event.data || 'Pipeline pass failed');
            }
          }

        } else {
          // === STANDARD MODE: single-pass analysis ===
          let analysisStream: AsyncGenerator<string, void, unknown>;

          // Route to appropriate AI provider based on quality level
          if (quality === 'kimi') {
            if (!videoBase64 || !mimeType) {
              throw new Error('Kimi K2.5 requires inline video data. Large files (>20MB) are not supported.');
            }
            analysisStream = analyzeVideoWithKimiStream({
              videoBase64,
              mimeType,
              format,
              triggerContext,
              videoMetadata,
              fileSize,
              analysisImages,
            });
          } else if (fileUri && fileMimeType) {
            analysisStream = analyzeVideoWithGeminiFileStream({
              fileUri,
              fileMimeType,
              format,
              quality: quality as GeminiQualityLevel,
              triggerContext,
              videoMetadata,
              analysisImages,
            });
          } else if (videoBase64 && mimeType) {
            analysisStream = analyzeVideoWithGeminiStream({
              videoBase64,
              mimeType,
              format,
              quality: quality as GeminiQualityLevel,
              triggerContext,
              videoMetadata,
              fileSize,
              analysisImages,
            });
          } else {
            throw new Error('Invalid video data configuration');
          }

          for await (const chunk of analysisStream) {
            fullResult += chunk;
            await writer.write(
              encoder.encode(
                `data: ${JSON.stringify({ type: 'chunk', data: chunk })}\n\n`
              )
            );
          }
        }

        // If authenticated, deduct credits and save analysis
        if (isAuthenticated && userId && !(agenticMode && DEEP_ANALYSIS_PIPELINE_VERSION !== 'v1')) {
          const overview = extractOverview(fullResult);
          const code = fullResult;
          const cost = agenticMode ? AGENTIC_CREDIT_COSTS[quality] : CREDIT_COSTS[quality];

          const result = await deductCreditsAndSaveAnalysis(
            userId,
            quality,
            format,
            triggerContext,
            overview,
            code,
            frameGridBase64,
            videoMetadata?.name || 'Unknown',
            videoMetadata?.duration || 0,
            cost
          );

          if (!result.success) {
            console.error('Failed to save analysis:', result.error);
          }

          // Non-blocking cleanup: enforce 50 analyses limit after response
          after(async () => {
            try {
              const snapshot = await adminDb
                .collection(COLLECTIONS.ANALYSES)
                .where('userId', '==', userId)
                .orderBy('createdAt', 'desc')
                .get();

              if (snapshot.size > MAX_ANALYSES_PER_USER) {
                const toDelete = snapshot.docs.slice(MAX_ANALYSES_PER_USER);
                const batch = adminDb.batch();

                for (const doc of toDelete) {
                  batch.delete(doc.ref);
                }

                await batch.commit();
                console.log(`Cleaned up ${toDelete.length} old analyses for user ${userId}`);
              }
            } catch (cleanupError) {
              console.error('Failed to cleanup old analyses:', cleanupError);
            }
          });
        }

        if (!(agenticMode && DEEP_ANALYSIS_PIPELINE_VERSION !== 'v1')) {
          await writer.write(
            encoder.encode(
              `data: ${JSON.stringify({ type: 'complete', data: fullResult })}\n\n`
            )
          );
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Analysis failed';
        console.error('Analysis error:', error);
        if (deepRunId) {
          try {
            await finalizeAnalysisRunRecord({
              runId: deepRunId,
              status: 'failed',
              errorMessage,
              stageCount: deepStageCount,
            });
          } catch (finalizeError) {
            console.error('Failed to finalize analysis run:', finalizeError);
          }
        }
        await writer.write(
          encoder.encode(
            `data: ${JSON.stringify({ type: 'error', message: errorMessage })}\n\n`
          )
        );
      } finally {
        await writer.close();
      }
    })();

    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
