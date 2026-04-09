
import { randomUUID } from 'node:crypto';
import type { OutputFormat, QualityLevel, TriggerContext, VideoMetadata } from '@/types/analysis';
import type { DeepAnalysisRunResult, FinalOutputArtifact, PipelinePlan, SharedArtifactBundle, VerificationSummary } from './artifacts';
import { buildSharedArtifactBundle } from './preprocess/shared';
import { createPipelinePlan } from './planner';
import { summarizeArtifactBundle } from './artifacts';
import { executeReconstructFamily } from './families/reconstruct';
import { executeAuditFamily } from './families/audit';
import { executeBehaviorFamily } from './families/behavior';

export type PipelineEvent =
  | { type: 'run_created'; runId: string; family: string; complexity: string; stageLabels: string[]; generatorModel: string; verifierModel?: string }
  | { type: 'stage_start'; stageId: string; stageLabel: string; stageIndex: number; totalStages: number }
  | { type: 'stage_output'; stageId: string; stageLabel: string; stageIndex: number; totalStages: number; chunk: string }
  | { type: 'stage_complete'; stageId: string; stageLabel: string; stageIndex: number; totalStages: number; message: string }
  | { type: 'thinking'; stageId: string; stageLabel: string; stageIndex: number; totalStages: number; chunk: string }
  | { type: 'verification'; verification: VerificationSummary }
  | { type: 'revision_start'; iteration: number; reason: string }
  | { type: 'complete'; finalArtifact: FinalOutputArtifact }
  | { type: 'error'; message: string };

export interface RunDeepAnalysisOptions {
  apiKey: string;
  format: OutputFormat;
  quality: QualityLevel;
  triggerContext: TriggerContext;
  videoMetadata: VideoMetadata | null;
  fileSize: number;
  videoName?: string | null;
  fileUri?: string | null;
  fileMimeType?: string | null;
  inlineMimeType?: string | null;
  inlineVideoBase64?: string | null;
  r2ObjectKey?: string | null;
  framePreviewBase64?: string | null;
  frameGridBase64?: string | null;
  frameGridWidth?: number | null;
  frameGridHeight?: number | null;
  frameGridCount?: number | null;
  frameGridColumns?: number | null;
}

export async function* runDeepAnalysis(
  options: RunDeepAnalysisOptions
): AsyncGenerator<PipelineEvent, DeepAnalysisRunResult, unknown> {
  const runId = randomUUID();
  const sharedArtifacts = buildSharedArtifactBundle({
    videoMetadata: options.videoMetadata,
    triggerContext: options.triggerContext,
    fileUri: options.fileUri,
    fileMimeType: options.fileMimeType,
    inlineMimeType: options.inlineMimeType,
    inlineVideoBase64: options.inlineVideoBase64,
    fileSize: options.fileSize,
    videoName: options.videoName,
    r2ObjectKey: options.r2ObjectKey,
    framePreviewBase64: options.framePreviewBase64,
    frameGridBase64: options.frameGridBase64,
    frameGridWidth: options.frameGridWidth,
    frameGridHeight: options.frameGridHeight,
    frameGridCount: options.frameGridCount,
    frameGridColumns: options.frameGridColumns,
    format: options.format,
    quality: options.quality,
  });
  const plan = createPipelinePlan({
    format: options.format,
    quality: options.quality,
    deepMode: true,
    artifacts: sharedArtifacts,
    videoMetadata: options.videoMetadata,
  });

  yield {
    type: 'run_created',
    runId,
    family: plan.family,
    complexity: plan.complexity,
    stageLabels: plan.stages.map((stage) => stage.label),
    generatorModel: plan.generatorModel,
    verifierModel: plan.verifierModel,
  };

  const eventBuffer: PipelineEvent[] = [];
  const emit = async (event: Record<string, unknown>) => {
    eventBuffer.push(event as PipelineEvent);
  };

  let familyResult;
  if (plan.family === 'reconstruct') {
    familyResult = await executeReconstructFamily({
      apiKey: options.apiKey,
      plan,
      format: options.format,
      triggerContext: options.triggerContext,
      videoMetadata: options.videoMetadata,
      sharedArtifacts,
      emit,
    });
  } else if (plan.family === 'audit') {
    familyResult = await executeAuditFamily({
      apiKey: options.apiKey,
      plan,
      format: options.format,
      triggerContext: options.triggerContext,
      videoMetadata: options.videoMetadata,
      sharedArtifacts,
      emit,
    });
  } else {
    familyResult = await executeBehaviorFamily({
      apiKey: options.apiKey,
      plan,
      format: options.format,
      triggerContext: options.triggerContext,
      videoMetadata: options.videoMetadata,
      sharedArtifacts,
      emit,
    });
  }

  for (const event of eventBuffer) {
    yield event;
  }

  yield { type: 'complete', finalArtifact: familyResult.finalArtifact };
  return {
    runId,
    plan,
    sharedArtifacts,
    stageArtifacts: familyResult.stageArtifacts,
    finalArtifact: familyResult.finalArtifact,
    verification: familyResult.verification,
  };
}

export function summarizeRun(plan: PipelinePlan, artifacts: SharedArtifactBundle): string {
  return `${plan.family} | ${plan.complexity} | ${summarizeArtifactBundle(artifacts)}`;
}
