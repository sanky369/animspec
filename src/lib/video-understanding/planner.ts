
import type { OutputFormat, QualityLevel, VideoMetadata } from '@/types/analysis';
import type { AnalysisFamily, ComplexityTier, PipelinePlan, PlannedStage, SharedArtifactBundle } from './artifacts';
import { resolveGeneratorModel, resolveVerifierModel } from './providers/model-registry';

const RECONSTRUCT_FORMATS: OutputFormat[] = [
  'clone_ui_animation',
  'clone_component',
  'clone_landing_page',
  'copy_design_style',
  'extract_design_tokens',
  'remotion_demo_template',
  'lottie_rive_export',
  'storyboard_breakdown',
  'tailwind_animate',
  'react_native_reanimated',
  'figma_motion_spec',
];

const AUDIT_FORMATS: OutputFormat[] = [
  'accessibility_audit',
  'performance_budget',
  'ui_ux_audit',
];

export function getAnalysisFamily(format: OutputFormat): AnalysisFamily {
  if (AUDIT_FORMATS.includes(format)) return 'audit';
  if (RECONSTRUCT_FORMATS.includes(format)) return 'reconstruct';
  return 'behavior';
}

export function inferComplexity(
  artifacts: SharedArtifactBundle,
  metadata: VideoMetadata | null,
  family: AnalysisFamily
): ComplexityTier {
  let score = 0;
  if ((metadata?.duration ?? 0) > 6) score += 1;
  if ((metadata?.duration ?? 0) > 15) score += 1;
  if (artifacts.scenes.length > 2) score += 1;
  if (artifacts.motion.length > 2) score += 1;
  if (artifacts.stateHints.length > 1) score += 1;
  if (artifacts.keyframes[0]?.frameCount && artifacts.keyframes[0].frameCount > 6) score += 1;
  if (family === 'reconstruct') score += 1;

  if (score <= 2) return 'simple';
  if (score <= 4) return 'moderate';
  return 'complex';
}

export function createPipelinePlan(input: {
  format: OutputFormat;
  quality: QualityLevel;
  deepMode: boolean;
  artifacts: SharedArtifactBundle;
  videoMetadata: VideoMetadata | null;
}): PipelinePlan {
  const family = getAnalysisFamily(input.format);
  const complexity = inferComplexity(input.artifacts, input.videoMetadata, family);
  const stages = buildStages(family, complexity);

  return {
    family,
    complexity,
    stages,
    generatorModel: resolveGeneratorModel(input.quality, family, complexity),
    verifierModel: resolveVerifierModel(input.quality, family, complexity),
    maxIterations: getMaxIterations(family, complexity),
    useExternalVerification: family === 'reconstruct',
    useToolCalling: family === 'reconstruct' && complexity === 'complex',
    useCaching: false,
  };
}

function buildStages(family: AnalysisFamily, complexity: ComplexityTier): PlannedStage[] {
  const baseByFamily: Record<AnalysisFamily, PlannedStage[]> = {
    reconstruct: [
      { id: 'reconstruct_map', label: 'Map scenes and states', type: 'structured_json' },
      { id: 'reconstruct_motion', label: 'Analyze motion and visual details', type: 'text' },
      { id: 'reconstruct_generate', label: 'Generate final output', type: 'text' },
      { id: 'reconstruct_verify', label: 'Verify fidelity', type: 'structured_json' },
    ],
    audit: [
      { id: 'audit_flow', label: 'Segment flow and intent', type: 'structured_json' },
      { id: 'audit_generate', label: 'Synthesize audit', type: 'text' },
      { id: 'audit_verify', label: 'Validate audit quality', type: 'structured_json' },
    ],
    behavior: [
      { id: 'behavior_inventory', label: 'Extract states and transitions', type: 'structured_json' },
      { id: 'behavior_generate', label: 'Generate behavioral spec', type: 'text' },
      { id: 'behavior_verify', label: 'Validate consistency', type: 'structured_json' },
    ],
  };

  const stages = [...baseByFamily[family]];
  if (complexity !== 'simple') {
    stages.push({ id: `${family}_revise`, label: 'Refine from verification', type: 'revision' });
  }
  return stages;
}

function getMaxIterations(family: AnalysisFamily, complexity: ComplexityTier): number {
  if (family === 'reconstruct') {
    if (complexity === 'complex') return 2;
    if (complexity === 'moderate') return 1;
    return 0;
  }
  return complexity === 'simple' ? 0 : 1;
}
