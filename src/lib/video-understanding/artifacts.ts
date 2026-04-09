import type { OutputFormat, QualityLevel, TriggerContext, VideoMetadata } from '@/types/analysis';

export type AnalysisFamily = 'reconstruct' | 'audit' | 'behavior';
export type ComplexityTier = 'simple' | 'moderate' | 'complex';
export type StageStatus = 'pending' | 'running' | 'complete' | 'failed' | 'skipped';

export interface VideoSourceRef {
  sourceType: 'gemini_file' | 'inline_base64' | 'r2_object';
  uri?: string;
  inlineBase64?: string;
  mimeType: string;
  sizeBytes: number;
  width: number;
  height: number;
  durationSec: number;
  triggerContext: TriggerContext;
  fileName?: string;
}

export interface KeyframeArtifact {
  frameCount: number;
  columns?: number | null;
  width?: number | null;
  height?: number | null;
  previewBase64?: string | null;
  timestampsSec: number[];
  extractionMode: 'grid' | 'single_frame' | 'none';
}

export interface SceneArtifact {
  id: string;
  label: string;
  startSec: number;
  endSec: number;
  goal?: string;
}

export interface OcrArtifact {
  text: string;
  source: 'none' | 'estimated' | 'detected';
  confidence: number;
}

export interface UiElementArtifact {
  id: string;
  kind: 'button' | 'input' | 'card' | 'modal' | 'toast' | 'nav' | 'list' | 'unknown';
  label: string;
  confidence: number;
}

export interface MotionArtifact {
  regionId: string;
  summary: string;
  startSec: number;
  endSec: number;
  intensity: 'low' | 'medium' | 'high';
  motionType: 'fade' | 'slide' | 'scale' | 'rotate' | 'morph' | 'unknown';
}

export interface StateHintArtifact {
  id: string;
  stateType: 'hover' | 'click' | 'focus' | 'loading' | 'success' | 'error' | 'transition' | 'unknown';
  description: string;
  confidence: number;
}

export interface SharedArtifactBundle {
  video: VideoSourceRef;
  keyframes: KeyframeArtifact[];
  scenes: SceneArtifact[];
  ocr: OcrArtifact[];
  uiInventory: UiElementArtifact[];
  motion: MotionArtifact[];
  stateHints: StateHintArtifact[];
}

export interface PlannedStage {
  id: string;
  label: string;
  type: string;
}

export interface PipelinePlan {
  family: AnalysisFamily;
  complexity: ComplexityTier;
  stages: PlannedStage[];
  generatorModel: string;
  verifierModel?: string;
  maxIterations: number;
  useExternalVerification: boolean;
  useToolCalling: boolean;
  useCaching: boolean;
}

export interface VerificationFinding {
  issue: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recommendation: string;
}

export interface VerificationSummary {
  score: number;
  validator: 'llm' | 'deterministic' | 'render_diff' | 'hybrid';
  summary: string;
  findings: VerificationFinding[];
  canAutoRevise: boolean;
  evidence?: string[];
}

export interface FinalOutputArtifact {
  format: OutputFormat;
  content: string;
  title: string;
  overview: string;
  verification?: VerificationSummary | null;
}

export interface StageArtifact<TPayload = unknown> {
  stageId: string;
  stageType: string;
  stageLabel: string;
  status: StageStatus;
  payload: TPayload;
  createdAt: string;
  summary?: string;
}

export interface DeepAnalysisRunResult {
  plan: PipelinePlan;
  sharedArtifacts: SharedArtifactBundle;
  stageArtifacts: StageArtifact[];
  finalArtifact: FinalOutputArtifact;
  verification?: VerificationSummary | null;
  runId: string;
}

export interface BuildArtifactBundleInput {
  videoMetadata: VideoMetadata | null;
  triggerContext: TriggerContext;
  fileUri?: string | null;
  fileMimeType?: string | null;
  inlineMimeType?: string | null;
  inlineVideoBase64?: string | null;
  fileSize: number;
  videoName?: string | null;
  r2ObjectKey?: string | null;
  framePreviewBase64?: string | null;
  frameGridBase64?: string | null;
  frameGridWidth?: number | null;
  frameGridHeight?: number | null;
  frameGridCount?: number | null;
  frameGridColumns?: number | null;
  format: OutputFormat;
  quality: QualityLevel;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function summarizeArtifactBundle(bundle: SharedArtifactBundle): string {
  return [
    `duration=${bundle.video.durationSec.toFixed(2)}s`,
    `resolution=${bundle.video.width}x${bundle.video.height}`,
    `scenes=${bundle.scenes.length}`,
    `motionRegions=${bundle.motion.length}`,
    `stateHints=${bundle.stateHints.length}`,
    `uiElements=${bundle.uiInventory.length}`,
    `ocrChars=${bundle.ocr.map((item) => item.text).join(' ').trim().length}`,
  ].join(' | ');
}
