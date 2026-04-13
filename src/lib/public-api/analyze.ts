import {
  analyzeVideoWithGemini,
  analyzeVideoWithGeminiFile,
  type GeminiQualityLevel,
} from '@/lib/ai/gemini';
import { analyzeVideoWithKimi } from '@/lib/ai/kimi';
import { extractOverview, parseAnalysisOutput } from '@/lib/ai/output-parsers';
import { createAnalysisRunRecord, finalizeAnalysisRunRecord, persistArtifacts } from '@/lib/video-understanding/persistence/run-store';
import { runDeepAnalysis } from '@/lib/video-understanding/orchestrator';
import type { DeepAnalysisRunResult } from '@/lib/video-understanding/artifacts';
import type { PublicAnalyzeRequest } from './contracts';
import {
  checkCredits,
  refundCredits,
  reserveCredits,
  saveAnalysisRecord,
  trimAnalysisHistory,
} from './credits';
import { prepareAnalysisSource } from './video-source';

const DEEP_ANALYSIS_PIPELINE_VERSION = process.env.DEEP_ANALYSIS_PIPELINE_VERSION ?? 'v2';

export class PublicApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
  }
}

export interface PublicAnalyzeResult {
  overview: string;
  code: string;
  format: PublicAnalyzeRequest['format'];
  notes?: string | null;
  creditsUsed: number;
  creditsRemaining: number;
  runId?: string | null;
  verificationScore?: number | null;
  pipelineFamily?: 'reconstruct' | 'audit' | 'behavior' | null;
  pipelineVersion?: string | null;
}

interface RunAnalysisOptions {
  userId: string;
  request: PublicAnalyzeRequest;
  source: 'api' | 'mcp';
}

function requireGeminiApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new PublicApiError('GEMINI_API_KEY is not configured', 500);
  }
  return apiKey;
}

function buildVideoMetadata(
  request: PublicAnalyzeRequest,
  prepared: Awaited<ReturnType<typeof prepareAnalysisSource>>
) {
  return {
    duration: request.metadata?.duration ?? 0,
    width: request.metadata?.width ?? 0,
    height: request.metadata?.height ?? 0,
    size: request.metadata?.size || prepared.fileSize,
    mimeType:
      request.metadata?.mimeType
      || prepared.fileMimeType
      || prepared.inlineMimeType
      || '',
    name: request.metadata?.name || prepared.videoName,
  };
}

async function runRegularAnalysis(
  request: PublicAnalyzeRequest,
  prepared: Awaited<ReturnType<typeof prepareAnalysisSource>>
): Promise<Pick<PublicAnalyzeResult, 'overview' | 'code' | 'format' | 'notes'>> {
  const videoMetadata = buildVideoMetadata(request, prepared);

  if (request.quality === 'kimi') {
    if (!prepared.inlineVideoBase64 || !prepared.inlineMimeType) {
      throw new PublicApiError(
        'Kimi analysis requires inline video data. Use videoBase64, videoUrl, or r2ObjectKey.',
        400
      );
    }

    const rawOutput = await analyzeVideoWithKimi({
      videoBase64: prepared.inlineVideoBase64,
      mimeType: prepared.inlineMimeType,
      format: request.format,
      triggerContext: request.triggerContext,
      videoMetadata,
    });

    const result = parseAnalysisOutput(rawOutput, request.format);
    return {
      overview: result.overview,
      code: result.code,
      format: result.format,
      notes: result.notes ?? null,
    };
  }

  let rawOutput = '';
  if (prepared.fileUri && prepared.fileMimeType) {
    rawOutput = await analyzeVideoWithGeminiFile({
      fileUri: prepared.fileUri,
      fileMimeType: prepared.fileMimeType,
      format: request.format,
      quality: request.quality as GeminiQualityLevel,
      triggerContext: request.triggerContext,
      videoMetadata,
    });
  } else if (prepared.inlineVideoBase64 && prepared.inlineMimeType) {
    rawOutput = await analyzeVideoWithGemini({
      videoBase64: prepared.inlineVideoBase64,
      mimeType: prepared.inlineMimeType,
      format: request.format,
      quality: request.quality as GeminiQualityLevel,
      triggerContext: request.triggerContext,
      videoMetadata,
    });
  } else {
    throw new PublicApiError('Prepared video source is invalid for Gemini analysis', 500);
  }

  const result = parseAnalysisOutput(rawOutput, request.format);
  return {
    overview: result.overview,
    code: result.code,
    format: result.format,
    notes: result.notes ?? null,
  };
}

async function runDeepPipeline(
  userId: string,
  request: PublicAnalyzeRequest,
  prepared: Awaited<ReturnType<typeof prepareAnalysisSource>>
): Promise<
  Pick<
    PublicAnalyzeResult,
    'overview' | 'code' | 'format' | 'runId' | 'verificationScore' | 'pipelineFamily' | 'pipelineVersion'
  >
> {
  if (request.quality !== 'kimi') {
    requireGeminiApiKey();
  }

  const videoMetadata = buildVideoMetadata(request, prepared);
  const deepApiKey = process.env.GEMINI_API_KEY || process.env.MOONSHOT_API_KEY || '';

  let runId: string | null = null;
  let runFamily: 'reconstruct' | 'audit' | 'behavior' | null = null;
  let verificationScore: number | null = null;
  let deepResult: DeepAnalysisRunResult | null = null;

  const iterator = runDeepAnalysis({
    apiKey: deepApiKey,
    format: request.format,
    quality: request.quality,
    triggerContext: request.triggerContext,
    videoMetadata,
    fileSize: prepared.fileSize,
    videoName: videoMetadata.name,
    fileUri: prepared.fileUri,
    fileMimeType: prepared.fileMimeType,
    inlineMimeType: prepared.inlineMimeType,
    inlineVideoBase64: prepared.inlineVideoBase64,
  });

  let step = await iterator.next();
  while (!step.done) {
    const event = step.value;

    switch (event.type) {
      case 'run_created':
        runId = event.runId;
        runFamily = event.family as 'reconstruct' | 'audit' | 'behavior';
        await createAnalysisRunRecord({
          runId,
          userId,
          format: request.format,
          quality: request.quality,
          triggerContext: request.triggerContext,
          family: runFamily,
          complexity: event.complexity as 'simple' | 'moderate' | 'complex',
          pipelineVersion: DEEP_ANALYSIS_PIPELINE_VERSION,
          generatorModel: event.generatorModel,
          verifierModel: event.verifierModel,
        });
        break;
      case 'verification':
        verificationScore = event.verification.score;
        break;
      case 'error':
        throw new PublicApiError(event.message, 500);
      default:
        break;
    }

    step = await iterator.next();
  }

  deepResult = step.value;

  if (runId && deepResult) {
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

  return {
    overview: deepResult?.finalArtifact.overview || extractOverview(deepResult?.finalArtifact.content || ''),
    code: deepResult?.finalArtifact.content || '',
    format: request.format,
    runId,
    verificationScore: verificationScore ?? deepResult?.verification?.score ?? null,
    pipelineFamily: runFamily,
    pipelineVersion: DEEP_ANALYSIS_PIPELINE_VERSION,
  };
}

export async function runPublicVideoAnalysis(
  options: RunAnalysisOptions
): Promise<PublicAnalyzeResult> {
  const { userId, request, source } = options;

  const creditCheck = await checkCredits(userId, request.quality, request.deepAnalysis);
  if (!creditCheck.canProceed) {
    throw new PublicApiError(creditCheck.error || 'Unable to analyze', 402, {
      creditsRequired: creditCheck.cost,
      creditsBalance: creditCheck.balance,
    });
  }

  const reserved = await reserveCredits(
    userId,
    request.quality,
    request.deepAnalysis,
    request.format,
    source
  );

  try {
    const geminiApiKey = process.env.GEMINI_API_KEY || undefined;
    const prepared = await prepareAnalysisSource(
      request.source,
      request.quality,
      geminiApiKey,
      {
        preferGeminiFileUpload:
          request.quality !== 'kimi'
          && (request.deepAnalysis || request.source.kind === 'video_uri'),
      }
    );

    const result = request.deepAnalysis
      ? await runDeepPipeline(userId, request, prepared)
      : await runRegularAnalysis(request, prepared);

    const videoMetadata = buildVideoMetadata(request, prepared);

    try {
      const resultRunId = 'runId' in result ? result.runId ?? null : null;
      const resultVerificationScore = 'verificationScore' in result ? result.verificationScore ?? null : null;
      const resultPipelineFamily = 'pipelineFamily' in result ? result.pipelineFamily ?? null : null;
      const resultPipelineVersion = 'pipelineVersion' in result ? result.pipelineVersion ?? null : null;

      await saveAnalysisRecord({
        userId,
        quality: request.quality,
        format: request.format,
        triggerContext: request.triggerContext,
        overview: result.overview,
        code: result.code,
        videoName: videoMetadata.name,
        videoDuration: videoMetadata.duration,
        creditsUsed: reserved.cost,
        source,
        runId: resultRunId,
        verificationScore: resultVerificationScore,
        pipelineFamily: resultPipelineFamily,
        pipelineVersion: resultPipelineVersion,
      });
      await trimAnalysisHistory(userId);
    } catch (error) {
      console.error('Failed to persist public analysis result:', error);
    }

    return {
      ...result,
      creditsUsed: reserved.cost,
      creditsRemaining: reserved.newBalance,
    };
  } catch (error) {
    await refundCredits(userId, request.quality, request.deepAnalysis, request.format, source).catch(
      (refundError) => {
        console.error('Failed to refund credits after public API error:', refundError);
      }
    );

    if (error instanceof PublicApiError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : 'Analysis failed';
    throw new PublicApiError(message, 500);
  }
}
