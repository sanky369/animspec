export type OutputFormat = 'natural' | 'css' | 'gsap' | 'framer' | 'remotion';

export type QualityLevel = 'fast' | 'balanced' | 'precise';

export type TriggerContext = 'hover' | 'click' | 'scroll' | 'load' | 'loop' | 'focus' | null;

export interface VideoMetadata {
  duration: number;
  width: number;
  height: number;
  size: number;
  mimeType: string;
  name: string;
}

export interface AnalysisConfig {
  format: OutputFormat;
  quality: QualityLevel;
  triggerContext: TriggerContext;
}

export interface AnalysisProgress {
  step: 'uploading' | 'extracting' | 'analyzing' | 'generating' | 'complete' | 'error';
  message: string;
  progress?: number;
}

export interface AnalysisResult {
  overview: string;
  code: string;
  format: OutputFormat;
  notes?: string;
  elements?: AnimationElement[];
  timing?: TimingInfo;
  rawAnalysis?: string;
  frameImage?: string; // Base64 encoded frame from the video
}

export interface AnimationElement {
  name: string;
  initialState: Record<string, string | number>;
  finalState: Record<string, string | number>;
  motion: string;
}

export interface TimingInfo {
  totalDuration: string;
  easing: string;
  delay?: string;
  stagger?: string;
}

export interface StreamingChunk {
  type: 'progress' | 'result' | 'error';
  data?: string;
  step?: string;
  message?: string;
}

// Map of analysis results keyed by output format
export type ResultsMap = Partial<Record<OutputFormat, AnalysisResult>>;
