import type {
  BuildArtifactBundleInput,
  SharedArtifactBundle,
  KeyframeArtifact,
  SceneArtifact,
  MotionArtifact,
  StateHintArtifact,
  UiElementArtifact,
  OcrArtifact,
} from '../artifacts';

export function buildSharedArtifactBundle(input: BuildArtifactBundleInput): SharedArtifactBundle {
  const durationSec = input.videoMetadata?.duration ?? 0;
  const width = input.videoMetadata?.width ?? 0;
  const height = input.videoMetadata?.height ?? 0;

  const keyframeCount = Math.max(
    1,
    input.frameGridCount ?? (durationSec > 0 ? Math.min(8, Math.ceil(durationSec / 2)) : 1)
  );
  const keyframes: KeyframeArtifact[] = [
    {
      frameCount: keyframeCount,
      columns: input.frameGridColumns ?? null,
      width: input.frameGridWidth ?? null,
      height: input.frameGridHeight ?? null,
      previewBase64: input.framePreviewBase64 ?? input.frameGridBase64 ?? null,
      timestampsSec: buildTimestamps(durationSec, keyframeCount),
      extractionMode: input.frameGridBase64 ? 'grid' : input.framePreviewBase64 ? 'single_frame' : 'none',
    },
  ];

  const scenes = estimateScenes(durationSec, input.triggerContext);
  const motion = estimateMotion(durationSec, scenes.length, input.triggerContext);
  const stateHints = estimateStateHints(input.triggerContext, input.format);
  const uiInventory = estimateUiInventory(input.format, input.videoName ?? input.videoMetadata?.name ?? 'video');
  const ocr = estimateOcr(input.videoName ?? input.videoMetadata?.name ?? '');

  return {
    video: {
      sourceType: input.fileUri ? 'gemini_file' : input.r2ObjectKey ? 'r2_object' : 'inline_base64',
      uri: input.fileUri ?? input.r2ObjectKey ?? undefined,
      inlineBase64: input.inlineVideoBase64 ?? undefined,
      mimeType: input.fileMimeType ?? input.inlineMimeType ?? input.videoMetadata?.mimeType ?? 'video/mp4',
      sizeBytes: input.fileSize,
      width,
      height,
      durationSec,
      triggerContext: input.triggerContext,
      fileName: input.videoName ?? input.videoMetadata?.name,
    },
    keyframes,
    scenes,
    ocr,
    uiInventory,
    motion,
    stateHints,
  };
}

function buildTimestamps(durationSec: number, count: number): number[] {
  if (durationSec <= 0 || count <= 1) return [0];
  const step = durationSec / Math.max(1, count - 1);
  return Array.from({ length: count }, (_, index) => Number((index * step).toFixed(3)));
}

function estimateScenes(
  durationSec: number,
  triggerContext: BuildArtifactBundleInput['triggerContext']
): SceneArtifact[] {
  if (durationSec <= 1.5) {
    return [
      {
        id: 'scene_1',
        label: 'Primary interaction',
        startSec: 0,
        endSec: Math.max(durationSec, 0.8),
        goal: triggerContext ?? 'unknown',
      },
    ];
  }

  const segments = durationSec > 10 ? 3 : durationSec > 4 ? 2 : 1;
  const segmentLength = durationSec / segments;
  return Array.from({ length: segments }, (_, index) => ({
    id: `scene_${index + 1}`,
    label: index === 0 ? 'Entry' : index === segments - 1 ? 'Resolution' : `Scene ${index + 1}`,
    startSec: Number((index * segmentLength).toFixed(3)),
    endSec: Number(Math.min(durationSec, (index + 1) * segmentLength).toFixed(3)),
    goal: triggerContext ?? 'inferred',
  }));
}

function estimateMotion(
  durationSec: number,
  sceneCount: number,
  triggerContext: BuildArtifactBundleInput['triggerContext']
): MotionArtifact[] {
  if (durationSec <= 0) {
    return [
      {
        regionId: 'motion_1',
        summary: 'Single visible transition',
        startSec: 0,
        endSec: 0,
        intensity: 'low',
        motionType: 'unknown',
      },
    ];
  }

  return Array.from({ length: Math.max(1, sceneCount) }, (_, index) => ({
    regionId: `motion_${index + 1}`,
    summary: triggerContext ? `Motion associated with ${triggerContext}` : 'Observed visual transition',
    startSec: Number(((durationSec / Math.max(1, sceneCount)) * index).toFixed(3)),
    endSec: Number(((durationSec / Math.max(1, sceneCount)) * (index + 1)).toFixed(3)),
    intensity: durationSec > 8 ? 'medium' : 'low',
    motionType: triggerContext === 'scroll' ? 'slide' : triggerContext === 'hover' ? 'scale' : 'fade',
  }));
}

function estimateStateHints(
  triggerContext: BuildArtifactBundleInput['triggerContext'],
  format: BuildArtifactBundleInput['format']
): StateHintArtifact[] {
  const hints: StateHintArtifact[] = [];
  if (triggerContext) {
    const stateType = triggerContext === 'hover' || triggerContext === 'click' || triggerContext === 'focus'
      ? triggerContext
      : 'transition';
    hints.push({
      id: 'hint_trigger',
      stateType,
      description: `User indicated ${triggerContext} as the trigger`,
      confidence: 0.95,
    });
  }
  if (format === 'interaction_state_machine') {
    hints.push({
      id: 'hint_behavior',
      stateType: 'transition',
      description: 'Format requests explicit state and transition modeling',
      confidence: 0.9,
    });
  }
  if (format === 'ui_ux_audit') {
    hints.push({
      id: 'hint_audit',
      stateType: 'transition',
      description: 'Format requests task-flow and friction analysis across visible states',
      confidence: 0.9,
    });
  }
  return hints;
}

function estimateUiInventory(format: BuildArtifactBundleInput['format'], name: string): UiElementArtifact[] {
  const base: UiElementArtifact[] = [
    { id: 'surface_primary', kind: 'card', label: 'Primary surface', confidence: 0.5 },
    { id: 'action_primary', kind: 'button', label: 'Primary action', confidence: 0.45 },
  ];

  if (format === 'clone_landing_page') {
    base.push({
      id: 'hero',
      kind: 'nav',
      label: `${name} hero/navigation structure`,
      confidence: 0.4,
    });
  }

  return base;
}

function estimateOcr(name: string): OcrArtifact[] {
  const clean = name.replace(/\.[a-z0-9]+$/i, '').replace(/[-_]+/g, ' ').trim();
  if (!clean) return [{ text: '', source: 'none', confidence: 0 }];
  return [{ text: clean, source: 'estimated', confidence: 0.1 }];
}
