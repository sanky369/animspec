import { NextRequest } from 'next/server';
import { after } from 'next/server';
import {
  analyzeVideoWithGeminiStream,
  analyzeVideoWithGeminiFileStream,
  type GeminiQualityLevel,
} from '@/lib/ai/gemini';
import { analyzeVideoWithKimiStream } from '@/lib/ai/kimi';
import { adminAuth, adminDb, adminStorage } from '@/lib/firebase/admin';
import { COLLECTIONS, CREDIT_COSTS, MAX_ANALYSES_PER_USER } from '@/types/database';
import { FieldValue } from 'firebase-admin/firestore';
import type { OutputFormat, QualityLevel, TriggerContext, VideoMetadata } from '@/types/analysis';
import { getDownloadPresignedUrl, isR2Configured, deleteObject } from '@/lib/storage/r2';

export const runtime = 'nodejs';
export const maxDuration = 300; // 300 seconds timeout for Kimi thinking mode

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
  quality: QualityLevel
): Promise<{ canProceed: boolean; error?: string }> {
  const profileRef = adminDb.collection(COLLECTIONS.PROFILES).doc(userId);
  const profileSnap = await profileRef.get();

  if (!profileSnap.exists) {
    return { canProceed: false, error: 'User profile not found' };
  }

  const profile = profileSnap.data();
  const cost = CREDIT_COSTS[quality];
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
  videoDuration: number
): Promise<{ success: boolean; error?: string }> {
  const cost = CREDIT_COSTS[quality];
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
      if ((profile?.creditsBalance ?? 0) < cost) {
        throw new Error('Insufficient credits');
      }

      const newBalance = (profile?.creditsBalance ?? 0) - cost;

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
        creditsUsed: cost,
        createdAt: FieldValue.serverTimestamp(),
      });

      // Create credit transaction record
      const txRef = adminDb.collection(COLLECTIONS.CREDIT_TRANSACTIONS).doc();
      transaction.set(txRef, {
        userId,
        amount: -cost,
        type: 'analysis',
        quality,
        description: `Analysis (${quality} quality)`,
        analysisId: analysisRef.id,
        purchaseId: null,
        createdAt: FieldValue.serverTimestamp(),
      });
    });

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to process';
    return { success: false, error: message };
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Parse form data
    const fileUri = formData.get('fileUri') as string | null;
    const fileMimeType = formData.get('fileMimeType') as string | null;
    let videoBase64 = formData.get('videoBase64') as string | null;
    let mimeType = formData.get('mimeType') as string;
    const format = formData.get('format') as OutputFormat;
    const quality = formData.get('quality') as QualityLevel;
    const triggerContext = formData.get('triggerContext') as TriggerContext | null;
    const fileSizeStr = formData.get('fileSize') as string | null;
    const fileSize = fileSizeStr ? parseInt(fileSizeStr, 10) : 0;
    const videoMetadata = parseVideoMetadata(formData);
    
    // R2 storage support for large files
    const r2ObjectKey = formData.get('r2ObjectKey') as string | null;
    const r2MimeType = formData.get('r2MimeType') as string | null;

    const frameGridBase64 = formData.get('frameGridBase64') as string | null;
    const frameGridWidth = parseNumber(formData.get('frameGridWidth') as string | null);
    const frameGridHeight = parseNumber(formData.get('frameGridHeight') as string | null);
    const frameGridCount = parseNumber(formData.get('frameGridCount') as string | null);
    const frameGridColumns = parseNumber(formData.get('frameGridColumns') as string | null);

    const analysisImages = frameGridBase64
      ? [
          {
            base64: frameGridBase64,
            mimeType: 'image/jpeg',
            description: `Keyframe grid (${frameGridCount ?? 'unknown'} frames, ${frameGridColumns ?? 'unknown'} columns, ${frameGridWidth ?? 'unknown'}x${frameGridHeight ?? 'unknown'})`,
          },
        ]
      : undefined;

    if (!format || !quality) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch video from R2 if objectKey is provided
    if (r2ObjectKey && isR2Configured()) {
      try {
        const downloadUrl = await getDownloadPresignedUrl(r2ObjectKey);
        const r2Response = await fetch(downloadUrl);
        
        if (!r2Response.ok) {
          throw new Error('Failed to fetch video from storage');
        }
        
        const arrayBuffer = await r2Response.arrayBuffer();
        videoBase64 = Buffer.from(arrayBuffer).toString('base64');
        mimeType = r2MimeType || r2Response.headers.get('content-type') || 'video/mp4';
        
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
      const creditCheck = await checkCredits(userId, quality);
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
      try {
        await writer.write(
          encoder.encode(
            `data: ${JSON.stringify({ type: 'progress', step: 'analyzing', message: 'AI analysis in progress...' })}\n\n`
          )
        );

        let analysisStream: AsyncGenerator<string, void, unknown>;

        // Route to appropriate AI provider based on quality level
        if (quality === 'kimi') {
          // Kimi K2.5 only supports inline base64 (no Files API)
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

        let fullResult = '';

        for await (const chunk of analysisStream) {
          fullResult += chunk;
          await writer.write(
            encoder.encode(
              `data: ${JSON.stringify({ type: 'chunk', data: chunk })}\n\n`
            )
          );
        }

        // If authenticated, deduct credits and save analysis
        if (isAuthenticated && userId) {
          // Parse output to extract overview and code
          const overviewMatch = fullResult.match(/## Overview[\s\S]*?(?=##|$)/);
          const overview = overviewMatch ? overviewMatch[0].trim() : '';

          // Extract code block
          const codeMatch = fullResult.match(/```[\w]*\n([\s\S]*?)```/);
          const code = codeMatch ? codeMatch[1].trim() : fullResult;

          const result = await deductCreditsAndSaveAnalysis(
            userId,
            quality,
            format,
            triggerContext,
            overview,
            code,
            frameGridBase64,
            videoMetadata?.name || 'Unknown',
            videoMetadata?.duration || 0
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

        await writer.write(
          encoder.encode(
            `data: ${JSON.stringify({ type: 'complete', data: fullResult })}\n\n`
          )
        );
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Analysis failed';
        console.error('Analysis error:', error);
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
