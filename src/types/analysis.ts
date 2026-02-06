export type OutputFormat =
  | 'clone_ui_animation'
  | 'clone_component'
  | 'clone_landing_page'
  | 'copy_design_style'
  | 'extract_design_tokens'
  | 'remotion_demo_template'
  | 'qa_clone_checklist'
  | 'accessibility_audit'
  | 'interaction_state_machine'
  | 'performance_budget'
  | 'lottie_rive_export'
  | 'storyboard_breakdown'
  | 'tailwind_animate'
  | 'react_native_reanimated'
  | 'figma_motion_spec';

export type QualityLevel = 'balanced' | 'precise' | 'kimi';

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
  agenticMode?: boolean;
}

export interface AnalysisProgress {
  step: 'uploading' | 'extracting' | 'analyzing' | 'generating' | 'complete' | 'error'
    | 'pass_1_decomposing' | 'pass_2_analyzing' | 'pass_3_generating' | 'pass_4_verifying';
  message: string;
  progress?: number;
  currentPass?: number;
  totalPasses?: number;
  passName?: string;
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
  verificationScore?: number;
  verificationReport?: VerificationReport;
  thinkingLog?: string;
}

export interface VerificationReport {
  overallScore: number;
  discrepancies: Discrepancy[];
  corrections: string[];
  summary?: string;
}

export interface Discrepancy {
  element: string;
  issue: string;
  severity: 'minor' | 'major' | 'critical';
  suggestedFix: string;
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
