<file_map>
/Users/sanketdongre/Documents/Projects/animspec
├── docs
│   ├── R2_SETUP.md *
│   └── deep-analysis-v2-spec.md *
├── evals
│   ├── audit
│   │   └── sample-case.json
│   ├── behavior
│   │   └── sample-case.json
│   ├── reconstruct
│   │   └── sample-case.json
│   └── README.md *
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── analyze
│   │   │   │   └── route.ts * +
│   │   │   ├── upload
│   │   │   │   └── route.ts * +
│   │   │   ├── upload-url
│   │   │   │   └── route.ts * +
│   │   │   ├── analyses
│   │   │   │   └── route.ts +
│   │   │   ├── checkout
│   │   │   │   └── route.ts +
│   │   │   ├── transactions
│   │   │   │   └── route.ts +
│   │   │   └── webhooks
│   │   │       └── lemon-squeezy
│   │   │           └── route.ts +
│   │   ├── (dashboard)
│   │   │   ├── dashboard
│   │   │   │   ├── account
│   │   │   │   │   └── page.tsx +
│   │   │   │   ├── history
│   │   │   │   │   └── page.tsx +
│   │   │   │   ├── settings
│   │   │   │   │   └── page.tsx +
│   │   │   │   └── page.tsx +
│   │   │   └── layout.tsx +
│   │   ├── (landing)
│   │   │   ├── privacy
│   │   │   │   └── page.tsx +
│   │   │   ├── terms
│   │   │   │   └── page.tsx +
│   │   │   ├── layout.tsx +
│   │   │   └── page.tsx +
│   │   ├── globals.css
│   │   └── layout.tsx +
│   ├── hooks
│   │   ├── use-analysis.ts * +
│   │   ├── index.ts +
│   │   ├── use-auth.ts +
│   │   ├── use-copy-to-clipboard.ts +
│   │   ├── use-credits.ts +
│   │   ├── use-ffmpeg.ts +
│   │   ├── use-r2-upload.ts +
│   │   └── use-video-upload.ts +
│   ├── lib
│   │   ├── ai
│   │   │   ├── agentic-pipeline.ts * +
│   │   │   ├── agentic-prompts.ts * +
│   │   │   ├── gemini-utils.ts * +
│   │   │   ├── gemini.ts * +
│   │   │   ├── kimi.ts * +
│   │   │   ├── output-parsers.ts * +
│   │   │   ├── prompts.ts * +
│   │   │   └── index.ts +
│   │   ├── ffmpeg
│   │   │   ├── create-grid.ts * +
│   │   │   ├── extract-frames.ts * +
│   │   │   ├── client.ts +
│   │   │   └── index.ts +
│   │   ├── storage
│   │   │   ├── r2.ts * +
│   │   │   ├── gemini-files.ts +
│   │   │   └── index.ts +
│   │   ├── streaming
│   │   │   └── sse.js * +
│   │   ├── video
│   │   │   └── extract-frame.ts * +
│   │   ├── video-understanding
│   │   │   ├── families
│   │   │   │   ├── audit.ts * +
│   │   │   │   ├── behavior.ts * +
│   │   │   │   └── reconstruct.ts * +
│   │   │   ├── preprocess
│   │   │   │   └── shared.ts * +
│   │   │   ├── providers
│   │   │   │   ├── gemini-runner.ts * +
│   │   │   │   └── model-registry.ts * +
│   │   │   ├── schemas
│   │   │   │   ├── audit.ts * +
│   │   │   │   ├── behavior.ts * +
│   │   │   │   └── reconstruct.ts * +
│   │   │   ├── utils
│   │   │   │   └── json.ts * +
│   │   │   ├── verification
│   │   │   │   ├── audit.ts * +
│   │   │   │   ├── behavior.ts * +
│   │   │   │   ├── reconstruct.ts * +
│   │   │   │   └── render-diff.ts * +
│   │   │   ├── persistence
│   │   │   │   └── run-store.ts +
│   │   │   ├── artifacts.ts * +
│   │   │   ├── orchestrator.ts * +
│   │   │   └── planner.ts * +
│   │   ├── actions
│   │   │   ├── analyses.ts +
│   │   │   └── credits.ts +
│   │   └── firebase
│   │       ├── admin.ts +
│   │       ├── client.ts +
│   │       └── index.ts +
│   ├── types
│   │   ├── analysis.ts * +
│   │   ├── database.ts * +
│   │   └── output-formats.ts +
│   ├── components
│   │   ├── analysis
│   │   │   ├── agentic-progress.tsx +
│   │   │   ├── analysis-progress.tsx +
│   │   │   ├── index.ts +
│   │   │   └── streaming-output.tsx +
│   │   ├── auth
│   │   │   ├── auth-button.tsx +
│   │   │   ├── index.ts +
│   │   │   └── sign-in-modal.tsx +
│   │   ├── config
│   │   │   ├── agentic-toggle.tsx +
│   │   │   ├── format-selector.tsx +
│   │   │   ├── index.ts +
│   │   │   ├── options-panel.tsx +
│   │   │   ├── quality-selector.tsx +
│   │   │   └── trigger-context.tsx +
│   │   ├── dashboard
│   │   │   ├── analysis-detail-modal.tsx +
│   │   │   ├── dashboard-header.tsx +
│   │   │   ├── history-item.tsx +
│   │   │   ├── index.ts +
│   │   │   ├── pricing-modal.tsx +
│   │   │   └── sidebar.tsx +
│   │   ├── landing
│   │   │   ├── demo-section.tsx +
│   │   │   ├── hero-section.tsx +
│   │   │   ├── how-it-works.tsx +
│   │   │   ├── index.ts +
│   │   │   ├── pricing-section.tsx +
│   │   │   ├── use-cases-section.tsx +
│   │   │   └── video-demo-section.tsx +
│   │   ├── layout
│   │   │   ├── background-effects.tsx +
│   │   │   ├── footer.tsx +
│   │   │   ├── header.tsx +
│   │   │   └── index.ts +
│   │   ├── output
│   │   │   ├── code-output.tsx +
│   │   │   ├── frame-preview.tsx +
│   │   │   ├── index.ts +
│   │   │   └── output-panel.tsx +
│   │   ├── ui
│   │   │   ├── badge.tsx +
│   │   │   ├── button.tsx +
│   │   │   ├── code-block.tsx +
│   │   │   ├── icons.tsx +
│   │   │   ├── index.ts +
│   │   │   ├── select.tsx +
│   │   │   ├── spinner.tsx +
│   │   │   └── tabs.tsx +
│   │   └── upload
│   │       ├── index.ts +
│   │       ├── upload-progress.tsx +
│   │       ├── upload-zone.tsx +
│   │       └── video-preview.tsx +
│   ├── contexts
│   │   └── auth-context.tsx +
│   └── middleware.ts +
├── tests
│   ├── video-understanding
│   │   └── planner.test.ts * +
│   ├── gemini-utils.test.ts * +
│   ├── output-parsers.test.ts * +
│   ├── run-store.test.ts * +
│   ├── sse-parser.test.js * +
│   ├── gemini-runner.test.ts +
│   ├── middleware.test.ts +
│   └── output-formats.test.ts +
├── .claude
│   └── settings.local.json
├── public
│   ├── __
│   │   └── auth
│   │       └── handler.html
│   ├── logo-options
│   │   ├── animspec-header-logo-1.png
│   │   ├── animspec-header-logo-2.png
│   │   ├── animspec-header-logo-3.png
│   │   ├── animspec-logo-1.png
│   │   ├── animspec-logo-2.png
│   │   ├── animspec-logo-3.png
│   │   ├── animspec-logo-text-1.png
│   │   ├── animspec-logo-text-2.png
│   │   ├── animspec-logo-text-3.png
│   │   ├── animspec-nano-logo-1.png
│   │   ├── animspec-nano-logo-2.png
│   │   └── animspec-nano-logo-3.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── hero-animation.jpg
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-cropped.png
│   ├── logo.png
│   └── manifest.json
├── .env.example
├── .firebaserc
├── .gitignore
├── CLAUDE.md
├── Complete_SEO_Playbook.md
├── README.md
├── architecture.md
├── design.html
├── devpost_submission.md
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── next.config.ts +
├── package-lock.json
├── package.json
├── postcss.config.js +
├── pricing.md
├── seo.md
├── spec.md
├── storage.rules
├── tailwind.config.ts +
├── tsconfig.json
└── vercel.json


(* denotes selected files)
(+ denotes code-map available)
</file_map>
<file_contents>
File: /Users/sanketdongre/Documents/Projects/animspec/src/app/api/upload/route.ts
```ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const runtime = 'nodejs';
export const maxDuration = 300; // 300 seconds timeout

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload MP4, WebM, or MOV files.' },
        { status: 400 }
      );
    }

    // Validate file size (100MB max)
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 100MB.' },
        { status: 400 }
      );
    }

    // Upload to Gemini Files API
    const client = new GoogleGenAI({ apiKey });

    // Convert File to Blob for upload
    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: file.type });

    const uploadResult = await client.files.upload({
      file: blob,
      config: {
        mimeType: file.type,
        displayName: file.name,
      },
    });

    // Wait for processing to complete
    let fileInfo = uploadResult;
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds max wait
    const fileName = fileInfo.name;

    if (!fileName) {
      return NextResponse.json(
        { error: 'Failed to get file name from upload' },
        { status: 500 }
      );
    }

    while (fileInfo.state === 'PROCESSING' && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      fileInfo = await client.files.get({ name: fileName });
      attempts++;
    }

    if (fileInfo.state === 'PROCESSING') {
      return NextResponse.json(
        { error: 'File processing timed out. Please try again.' },
        { status: 408 }
      );
    }

    if (fileInfo.state === 'FAILED') {
      return NextResponse.json(
        { error: 'File processing failed. Please try a different video.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      name: fileName,
      uri: fileInfo.uri,
      mimeType: fileInfo.mimeType,
      sizeBytes: fileInfo.sizeBytes,
      state: fileInfo.state,
    });
  } catch (error) {
    console.error('Upload error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video-understanding/orchestrator.ts
```ts

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

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video-understanding/verification/audit.ts
```ts

import type { VerificationSummary } from '../artifacts';
import type { AuditValidation } from '../schemas/audit';

export function verifyAuditOutput(validation: AuditValidation): VerificationSummary {
  return {
    score: validation.score,
    validator: 'llm',
    summary: validation.summary,
    findings: validation.findings,
    canAutoRevise: validation.canAutoRevise && validation.score < 90,
  };
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video-understanding/verification/behavior.ts
```ts

import type { VerificationSummary } from '../artifacts';
import type { BehaviorValidation } from '../schemas/behavior';

export function verifyBehaviorOutput(validation: BehaviorValidation): VerificationSummary {
  return {
    score: validation.score,
    validator: 'llm',
    summary: validation.summary,
    findings: validation.findings,
    canAutoRevise: validation.canAutoRevise && validation.score < 90,
  };
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video-understanding/schemas/behavior.ts
```ts

import { z } from 'zod';

export const behaviorInventorySchema = z.object({
  states: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    entrySignals: z.array(z.string()).default([]),
    exitSignals: z.array(z.string()).default([]),
  })).min(1),
  transitions: z.array(z.object({
    from: z.string(),
    event: z.string(),
    to: z.string(),
    confidence: z.number().min(0).max(1),
  })).default([]),
  inferredComplexity: z.enum(['simple', 'moderate', 'complex']).default('moderate'),
});

export type BehaviorInventory = z.infer<typeof behaviorInventorySchema>;

export const behaviorValidationSchema = z.object({
  score: z.number().min(0).max(100),
  summary: z.string(),
  findings: z.array(z.object({
    issue: z.string(),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    recommendation: z.string(),
  })).default([]),
  canAutoRevise: z.boolean().default(true),
});

export type BehaviorValidation = z.infer<typeof behaviorValidationSchema>;

export const behaviorInventoryJsonSchema = {
  type: 'object',
  required: ['states', 'transitions', 'inferredComplexity'],
  properties: {
    states: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'name', 'description', 'entrySignals', 'exitSignals'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          entrySignals: { type: 'array', items: { type: 'string' } },
          exitSignals: { type: 'array', items: { type: 'string' } },
        },
      },
    },
    transitions: {
      type: 'array',
      items: {
        type: 'object',
        required: ['from', 'event', 'to', 'confidence'],
        properties: {
          from: { type: 'string' },
          event: { type: 'string' },
          to: { type: 'string' },
          confidence: { type: 'number' },
        },
      },
    },
    inferredComplexity: { type: 'string', enum: ['simple', 'moderate', 'complex'] },
  },
} as const;

export const behaviorValidationJsonSchema = {
  type: 'object',
  required: ['score', 'summary', 'findings', 'canAutoRevise'],
  properties: {
    score: { type: 'number' },
    summary: { type: 'string' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        required: ['issue', 'severity', 'recommendation'],
        properties: {
          issue: { type: 'string' },
          severity: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
          recommendation: { type: 'string' },
        },
      },
    },
    canAutoRevise: { type: 'boolean' },
  },
} as const;

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/streaming/sse.js
```js
/**
 * Simple SSE parser that buffers partial chunks and emits data payloads per event.
 */
function createSseParser(onData) {
  let buffer = '';

  function feed(chunk) {
    if (!chunk) return;
    buffer += chunk;
    buffer = buffer.replace(/\r/g, '');

    const events = buffer.split('\n\n');
    buffer = events.pop() ?? '';

    for (const event of events) {
      dispatchEvent(event);
    }
  }

  function flush() {
    if (buffer.trim().length === 0) {
      buffer = '';
      return;
    }
    dispatchEvent(buffer);
    buffer = '';
  }

  function dispatchEvent(eventText) {
    const lines = eventText.split('\n');
    const dataLines = [];

    for (const line of lines) {
      if (!line.startsWith('data:')) continue;
      let value = line.slice(5);
      if (value.startsWith(' ')) value = value.slice(1);
      dataLines.push(value);
    }

    if (dataLines.length > 0) {
      onData(dataLines.join('\n'));
    }
  }

  return { feed, flush };
}

module.exports = {
  createSseParser,
};

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/types/analysis.ts
```ts
export type OutputFormat =
  | 'clone_ui_animation'
  | 'clone_component'
  | 'clone_landing_page'
  | 'copy_design_style'
  | 'extract_design_tokens'
  | 'remotion_demo_template'
  | 'qa_clone_checklist'
  | 'accessibility_audit'
  | 'ui_ux_audit'
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

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video-understanding/verification/render-diff.ts
```ts

import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import type { OutputFormat } from '@/types/analysis';
import type { SharedArtifactBundle, VerificationSummary } from '../artifacts';

export interface RenderDiffResult {
  score: number;
  mismatchRatio: number;
  evidence: string[];
}

export async function tryRenderDiffVerification(input: {
  format: OutputFormat;
  finalOutput: string;
  sharedArtifacts: SharedArtifactBundle;
}): Promise<RenderDiffResult | null> {
  const keyframe = input.sharedArtifacts.keyframes[0];
  if (!keyframe?.previewBase64 || keyframe.extractionMode !== 'single_frame') {
    return null;
  }

  const html = extractCodeBlock(input.finalOutput, 'html');
  if (!html) return null;
  const css = extractCodeBlock(input.finalOutput, 'css') || '';
  const executablePath = resolveChromiumExecutable();
  if (!executablePath) return null;

  const browser = await chromium.launch({ executablePath, headless: true });
  try {
    const width = input.sharedArtifacts.video.width || 1280;
    const height = input.sharedArtifacts.video.height || 720;
    const renderPage = await browser.newPage({ viewport: { width, height } });
    await renderPage.setContent(`<style>${css}</style>${html}`, { waitUntil: 'load' });
    const renderBuffer = await renderPage.screenshot({ type: 'png' });

    const sourcePage = await browser.newPage({ viewport: { width, height } });
    await sourcePage.setContent(`<img src="data:image/jpeg;base64,${keyframe.previewBase64}" style="width:100%;height:100%;object-fit:contain;background:#111" />`, { waitUntil: 'load' });
    const sourceBuffer = await sourcePage.screenshot({ type: 'png' });

    const renderPng = PNG.sync.read(renderBuffer);
    const sourcePng = PNG.sync.read(sourceBuffer);
    const diff = new PNG({ width, height });
    const mismatchedPixels = pixelmatch(sourcePng.data, renderPng.data, diff.data, width, height, { threshold: 0.2 });
    const mismatchRatio = mismatchedPixels / (width * height);
    const score = Math.max(0, Math.round(100 - mismatchRatio * 220));
    return {
      score,
      mismatchRatio,
      evidence: [`render_diff_ratio=${mismatchRatio.toFixed(4)}`, `render_diff_score=${score}`],
    };
  } finally {
    await browser.close();
  }
}

export function mergeRenderDiffVerification(base: VerificationSummary, renderDiff: RenderDiffResult | null): VerificationSummary {
  if (!renderDiff) return base;
  const findings = [...base.findings];
  if (renderDiff.score < 75) {
    findings.push({
      issue: 'Rendered preview diverges from the captured reference frame.',
      severity: renderDiff.score < 50 ? 'high' : 'medium',
      recommendation: 'Review the generated layout and visual hierarchy against the source frame.',
    });
  }
  return {
    ...base,
    validator: 'hybrid',
    score: Math.round(base.score * 0.7 + renderDiff.score * 0.3),
    findings,
    canAutoRevise: base.canAutoRevise || renderDiff.score < 84,
    evidence: [...(base.evidence ?? []), ...renderDiff.evidence],
  };
}

function extractCodeBlock(value: string, language: string): string | null {
  const regex = new RegExp('```(?:' + language + ')?\s*([\s\S]*?)```', 'i');
  return value.match(regex)?.[1]?.trim() ?? null;
}

function resolveChromiumExecutable(): string | null {
  const candidates = [
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].filter(Boolean) as string[];

  for (const candidate of candidates) {
    try {
      if (existsSync(candidate)) return candidate;
    } catch {
      // ignore
    }
  }
  return null;
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video/extract-frame.ts
```ts
/**
 * Extract a frame from a video file at a specific time
 * Returns a base64 encoded JPEG image
 */
export async function extractFrameFromVideo(
  file: File,
  timePercent: number = 0.25 // Default to 25% through the video (good for showing animation state)
): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;

    const objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;

    video.onloadedmetadata = () => {
      // Seek to the specified time
      const targetTime = video.duration * timePercent;
      const maxTime = Math.max(0, video.duration - 0.1);
      video.currentTime = Math.min(targetTime, maxTime);
    };

    const timeoutId = setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Frame extraction timed out'));
    }, 10000);

    video.onseeked = () => {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to base64 JPEG (good balance of quality and size)
      const base64 = canvas.toDataURL('image/jpeg', 0.85);

      // Clean up
      clearTimeout(timeoutId);
      URL.revokeObjectURL(objectUrl);
      video.remove();
      canvas.remove();

      resolve(base64);
    };

    video.onerror = () => {
      clearTimeout(timeoutId);
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load video for frame extraction'));
    };
  });
}

/**
 * Extract multiple frames from a video (start, middle, end)
 */
export async function extractKeyFrames(file: File): Promise<string[]> {
  const frames = await Promise.all([
    extractFrameFromVideo(file, 0.1),  // Near start
    extractFrameFromVideo(file, 0.5),  // Middle
    extractFrameFromVideo(file, 0.9),  // Near end
  ]);
  return frames;
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/tests/gemini-utils.test.ts
```ts
import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via --experimental-strip-types
import { GEMINI_INLINE_SAFE_LIMIT, shouldUseGeminiFilesUpload } from '../src/lib/ai/gemini-utils.ts';

test('routes Gemini agentic analyses through Files API', () => {
  assert.equal(
    shouldUseGeminiFilesUpload({
      quality: 'balanced',
      fileSize: 128 * 1024,
      agenticMode: true,
      hasAnalysisImages: false,
    }),
    true
  );
});

test('routes Gemini analyses with keyframe images through Files API', () => {
  assert.equal(
    shouldUseGeminiFilesUpload({
      quality: 'precise',
      fileSize: 128 * 1024,
      agenticMode: false,
      hasAnalysisImages: true,
    }),
    true
  );
});

test('routes larger Gemini uploads through Files API', () => {
  assert.equal(
    shouldUseGeminiFilesUpload({
      quality: 'balanced',
      fileSize: GEMINI_INLINE_SAFE_LIMIT + 1,
      agenticMode: false,
      hasAnalysisImages: false,
    }),
    true
  );
});

test('keeps tiny non-agentic Gemini uploads inline when safe', () => {
  assert.equal(
    shouldUseGeminiFilesUpload({
      quality: 'balanced',
      fileSize: 128 * 1024,
      agenticMode: false,
      hasAnalysisImages: false,
    }),
    false
  );
});

test('never routes Kimi through Gemini Files API', () => {
  assert.equal(
    shouldUseGeminiFilesUpload({
      quality: 'kimi',
      fileSize: GEMINI_INLINE_SAFE_LIMIT * 4,
      agenticMode: true,
      hasAnalysisImages: true,
    }),
    false
  );
});

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video-understanding/verification/reconstruct.ts
```ts

import type { OutputFormat } from '@/types/analysis';
import type { SharedArtifactBundle, VerificationSummary } from '../artifacts';
import type { ReconstructionVerification } from '../schemas/reconstruct';

export function verifyReconstructionOutput(input: {
  format: OutputFormat;
  finalOutput: string;
  sharedArtifacts: SharedArtifactBundle;
  llmVerification: ReconstructionVerification;
}): VerificationSummary {
  const findings: VerificationSummary['findings'] = [...input.llmVerification.discrepancies.map((item) => ({
    issue: item.issue,
    severity: (item.severity === 'critical' ? 'critical' : item.severity === 'major' ? 'high' : 'medium') as 'medium' | 'high' | 'critical',
    recommendation: item.suggestedFix,
  }))];

  let deterministicPenalty = 0;
  if (input.finalOutput.trim().length < 300) {
    deterministicPenalty += 10;
    findings.push({
      issue: 'Final output is unusually short for a deep reconstruction run.',
      severity: 'medium',
      recommendation: 'Expand the answer to cover all scenes, states, and implementation details.',
    });
  }

  if (input.sharedArtifacts.scenes.length > 1 && !/scene|timeline|sequence/i.test(input.finalOutput)) {
    deterministicPenalty += 8;
    findings.push({
      issue: 'Output does not appear to acknowledge multiple scenes or sequences.',
      severity: 'medium',
      recommendation: 'Call out each scene or sequence explicitly in the final output.',
    });
  }

  if (input.sharedArtifacts.video.triggerContext && !input.finalOutput.toLowerCase().includes(String(input.sharedArtifacts.video.triggerContext))) {
    deterministicPenalty += 6;
    findings.push({
      issue: 'Trigger context is missing from the final output.',
      severity: 'low',
      recommendation: `Mention that the interaction is triggered by ${input.sharedArtifacts.video.triggerContext}.`,
    });
  }

  const adjustedScore = Math.max(0, Math.min(100, input.llmVerification.overallScore - deterministicPenalty));
  return {
    score: adjustedScore,
    validator: findings.length === input.llmVerification.discrepancies.length ? 'llm' : 'hybrid',
    summary: input.llmVerification.summary || 'Reconstruction verification complete.',
    findings,
    canAutoRevise: adjustedScore < targetScoreForFormat(input.format),
    evidence: [
      `scene_count=${input.sharedArtifacts.scenes.length}`,
      `output_length=${input.finalOutput.trim().length}`,
      `trigger=${input.sharedArtifacts.video.triggerContext ?? 'unknown'}`,
    ],
  };
}

function targetScoreForFormat(format: OutputFormat): number {
  if (format === 'clone_landing_page' || format === 'clone_component') return 88;
  return 84;
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/tests/sse-parser.test.js
```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { createSseParser } = require('../src/lib/streaming/sse');

test('buffers partial SSE events across chunks', () => {
  const events = [];
  const parser = createSseParser((data) => events.push(data));

  parser.feed('data: {"type":"chunk","data":"hel');
  parser.feed('lo"}\n\n');

  assert.equal(events.length, 1);
  assert.equal(events[0], '{"type":"chunk","data":"hello"}');
});

test('handles multiple events in one chunk', () => {
  const events = [];
  const parser = createSseParser((data) => events.push(data));

  parser.feed('data: {"type":"chunk","data":"a"}\n\n' +
    'data: {"type":"chunk","data":"b"}\n\n');

  assert.deepEqual(events, [
    '{"type":"chunk","data":"a"}',
    '{"type":"chunk","data":"b"}',
  ]);
});

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video-understanding/preprocess/shared.ts
```ts
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

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/app/api/upload-url/route.ts
```ts
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { getUploadPresignedUrl, isR2Configured } from '@/lib/storage/r2';

export const runtime = 'nodejs';

// Maximum file size: 100MB (Kimi's limit)
const MAX_FILE_SIZE = 100 * 1024 * 1024;

// Allowed video MIME types
const ALLOWED_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime', // .mov
  'video/x-msvideo', // .avi
  'video/x-matroska', // .mkv
];

async function verifyAuth(request: NextRequest): Promise<string | null> {
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

export async function POST(request: NextRequest) {
  try {
    // Check if R2 is configured
    if (!isR2Configured()) {
      return NextResponse.json(
        { error: 'Cloud storage not configured' },
        { status: 503 }
      );
    }

    // Verify authentication
    const userId = await verifyAuth(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { fileName, contentType, contentLength } = body;

    // Validate inputs
    if (!fileName || !contentType || !contentLength) {
      return NextResponse.json(
        { error: 'Missing required fields: fileName, contentType, contentLength' },
        { status: 400 }
      );
    }

    // Validate content type
    if (!ALLOWED_TYPES.includes(contentType)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate file size
    if (contentLength > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size: ${MAX_FILE_SIZE / (1024 * 1024)}MB` },
        { status: 400 }
      );
    }

    // Generate presigned URL
    const { uploadUrl, objectKey } = await getUploadPresignedUrl(
      userId,
      fileName,
      contentType,
      contentLength
    );

    return NextResponse.json({
      uploadUrl,
      objectKey,
      expiresIn: 3600, // 1 hour
    });
  } catch (error) {
    console.error('Failed to generate upload URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/types/database.ts
```ts
import type { OutputFormat, QualityLevel, TriggerContext } from './analysis';

// Re-export types from analysis for convenience
export type { OutputFormat, QualityLevel, TriggerContext };

// Credit costs per quality level
export const CREDIT_COSTS: Record<QualityLevel, number> = {
  balanced: 3,
  precise: 20,
  kimi: 5,
};

// Agentic mode credit costs (4-pass pipeline)
export const AGENTIC_CREDIT_COSTS: Record<QualityLevel, number> = {
  balanced: 5,
  precise: 30,
  kimi: 5,
};

// Pack types
export type PackType = 'creator' | 'pro';

export const PACK_CREDITS: Record<PackType, number> = {
  creator: 200,
  pro: 600,
};

export const PACK_PRICES: Record<PackType, number> = {
  creator: 2400, // $24.00 in cents
  pro: 5900, // $59.00 in cents
};

// Firestore document types

export interface UserProfile {
  id: string; // Same as Firebase Auth UID
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  creditsBalance: number;
  creditsExpiresAt: Date | null;
  hasUsedFreeTrial: boolean;
  isPaidUser: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Analysis {
  id: string;
  userId: string;
  format: OutputFormat;
  quality: QualityLevel;
  triggerContext: TriggerContext;
  overview: string;
  code: string;
  frameImageUrl: string | null;
  videoName: string;
  videoDuration: number;
  creditsUsed: number;
  runId?: string | null;
  verificationScore?: number | null;
  pipelineFamily?: 'reconstruct' | 'audit' | 'behavior' | null;
  pipelineVersion?: string | null;
  createdAt: Date;
}

export type CreditTransactionType = 'signup_bonus' | 'analysis' | 'purchase' | 'refund' | 'admin_adjustment';

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number; // Positive for additions, negative for deductions
  type: CreditTransactionType;
  quality: QualityLevel | null;
  description: string;
  analysisId: string | null;
  purchaseId: string | null;
  createdAt: Date;
}

export type PurchaseStatus = 'pending' | 'completed' | 'refunded' | 'failed';

export interface Purchase {
  id: string;
  userId: string;
  packType: PackType;
  credits: number;
  amountCents: number;
  currency: string;
  lemonSqueezyOrderId: string;
  status: PurchaseStatus;
  createdAt: Date;
}

// Firestore collection names
export interface AnalysisRun {
  id: string;
  userId: string | null;
  format: OutputFormat;
  quality: QualityLevel;
  triggerContext: TriggerContext;
  family: 'reconstruct' | 'audit' | 'behavior';
  complexity: 'simple' | 'moderate' | 'complex';
  pipelineVersion: string;
  generatorModel: string;
  verifierModel?: string | null;
  status: 'running' | 'complete' | 'failed';
  iterationCount: number;
  finalTitle?: string | null;
  finalOverview?: string | null;
  finalFormat?: OutputFormat | null;
  verificationScore?: number | null;
  verificationSummary?: string | null;
  errorMessage?: string | null;
  stageCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalysisRunArtifact {
  id: string;
  type: string;
  summary: string;
  schemaVersion: number;
  storagePath: string | null;
  payload: unknown;
  updatedAt: Date;
}

export const COLLECTIONS = {
  PROFILES: 'profiles',
  ANALYSES: 'analyses',
  ANALYSIS_RUNS: 'analysis_runs',
  CREDIT_TRANSACTIONS: 'credit_transactions',
  PURCHASES: 'purchases',
} as const;

// Default values
export const DEFAULT_FREE_CREDITS = 20;
export const MAX_ANALYSES_PER_USER = 50;

```

File: /Users/sanketdongre/Documents/Projects/animspec/evals/README.md
```md

# Deep Analysis V2 eval harness

This folder is the home for benchmark fixtures and scoring scripts for the new deep-analysis runtime.

The suites are:

- `reconstruct/` for clone and export tasks.
- `audit/` for critique and recommendation tasks.
- `behavior/` for state-machine and QA style tasks.

Each case should eventually include:

- source fixture path
- target format
- expected artifact summary
- expected acceptance checks
- notes about scoring

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video-understanding/providers/gemini-runner.ts
```ts
import OpenAI from 'openai';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import type { VideoSourceRef, SharedArtifactBundle } from '../artifacts';
import { normalizeGeminiError } from '@/lib/ai/gemini-utils';
import { parseJsonFromText } from '../utils/json';

interface GenerateBaseOptions {
  apiKey: string;
  model: string;
  video: VideoSourceRef;
  artifacts: SharedArtifactBundle;
  prompt: string;
  maxOutputTokens?: number;
  temperature?: number;
  disableThinking?: boolean;
}

interface GenerateJsonOptions<T> extends GenerateBaseOptions {
  schema: unknown;
  validate: (value: unknown) => T;
}

type KimiContentPart =
  | { type: 'video_url'; video_url: { url: string } }
  | { type: 'image_url'; image_url: { url: string } }
  | { type: 'text'; text: string };

function isKimiModel(model: string): boolean {
  return model.startsWith('kimi');
}

export function resolveKimiTemperature(disableThinking: boolean = false): number {
  return disableThinking ? 1.0 : 0.6;
}

const JSON_FALLBACK_MODEL = 'gemini-3-flash-preview';

export function createGeminiClient(apiKey: string): GoogleGenAI {
  return new GoogleGenAI({ apiKey });
}

function createKimiClient(): OpenAI {
  const apiKey = process.env.MOONSHOT_API_KEY;
  if (!apiKey) {
    throw new Error('MOONSHOT_API_KEY environment variable is not set');
  }

  return new OpenAI({
    apiKey,
    baseURL: 'https://api.moonshot.ai/v1',
  });
}

export async function generateText(options: GenerateBaseOptions): Promise<string> {
  if (isKimiModel(options.model)) {
    return generateTextWithKimi(options);
  }

  try {
    const client = createGeminiClient(options.apiKey);
    const response = await client.models.generateContent({
      model: options.model,
      contents: [{ role: 'user', parts: buildGeminiParts(options.video, options.artifacts, options.prompt) }],
      config: {
        maxOutputTokens: options.maxOutputTokens ?? 8192,
        temperature: options.temperature ?? 0.2,
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
      },
    });
    return response.text || '';
  } catch (error) {
    throw normalizeGeminiError(error);
  }
}

export async function streamText(
  options: GenerateBaseOptions,
  handlers: { onChunk?: (text: string) => Promise<void> | void; onThought?: (text: string) => Promise<void> | void } = {}
): Promise<string> {
  if (isKimiModel(options.model)) {
    return streamTextWithKimi(options, handlers);
  }

  try {
    const client = createGeminiClient(options.apiKey);
    const response = await client.models.generateContentStream({
      model: options.model,
      contents: [{ role: 'user', parts: buildGeminiParts(options.video, options.artifacts, options.prompt) }],
      config: {
        maxOutputTokens: options.maxOutputTokens ?? 8192,
        temperature: options.temperature ?? 0.2,
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
      },
    });

    let full = '';
    for await (const chunk of response) {
      const candidate = (chunk as { candidates?: Array<{ content?: { parts?: Array<{ text?: string; thought?: boolean }> } }> }).candidates?.[0];
      const parts = candidate?.content?.parts ?? [];
      if (parts.length > 0) {
        for (const part of parts) {
          if (part.text && part.thought) {
            await handlers.onThought?.(part.text);
          } else if (part.text) {
            full += part.text;
            await handlers.onChunk?.(part.text);
          }
        }
      } else if (chunk.text) {
        full += chunk.text;
        await handlers.onChunk?.(chunk.text);
      }
    }
    return full;
  } catch (error) {
    throw normalizeGeminiError(error);
  }
}

export async function generateJson<T>(options: GenerateJsonOptions<T>): Promise<T> {
  if (isKimiModel(options.model)) {
    return generateJsonWithFallbacks(options, {
      preferStructuredOutput: true,
      disableThinkingForText: false,
      forceModel: JSON_FALLBACK_MODEL,
    });
  }

  return generateJsonWithFallbacks(options, {
    preferStructuredOutput: true,
    disableThinkingForText: false,
    forceModel: undefined,
  });
}

async function generateTextWithKimi(options: GenerateBaseOptions): Promise<string> {
  if (!options.video.inlineBase64) {
    throw new Error('Kimi deep analysis requires inline video data. Uploaded file references are not supported for Kimi deep runs.');
  }

  const client = createKimiClient();
  let lastError: unknown = null;

  for (const temperature of getKimiTemperatureCandidates(options)) {
    try {
      const response = await client.chat.completions.create({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(buildKimiRequest({ ...options, temperature }) as any),
      } as never);

      const message = response.choices[0]?.message;
      const text = (message as { content?: string; reasoning_content?: string } | undefined)?.content
        || (message as { content?: string; reasoning_content?: string } | undefined)?.reasoning_content;
      if (!text) {
        throw new Error('Empty response from Kimi');
      }
      return text;
    } catch (error) {
      lastError = error;
      if (!isKimiTemperatureError(error)) {
        throw error;
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Kimi request failed');
}

async function streamTextWithKimi(
  options: GenerateBaseOptions,
  handlers: { onChunk?: (text: string) => Promise<void> | void; onThought?: (text: string) => Promise<void> | void }
): Promise<string> {
  if (!options.video.inlineBase64) {
    throw new Error('Kimi deep analysis requires inline video data. Uploaded file references are not supported for Kimi deep runs.');
  }

  const client = createKimiClient();
  let stream: AsyncIterable<unknown> | null = null;
  let lastError: unknown = null;

  for (const temperature of getKimiTemperatureCandidates(options)) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      stream = await (client.chat.completions.create as any)({
        ...buildKimiRequest({ ...options, temperature }),
        stream: true,
      });
      break;
    } catch (error) {
      lastError = error;
      if (!isKimiTemperatureError(error)) {
        throw error;
      }
    }
  }

  if (!stream) {
    throw lastError instanceof Error ? lastError : new Error('Kimi stream request failed');
  }

  let full = '';
  for await (const chunk of stream) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const delta = (chunk as any).choices?.[0]?.delta;
    if (!delta) continue;

    const thought = delta.reasoning_content || delta.reasoning;
    const text = delta.content;
    if (thought) {
      await handlers.onThought?.(thought);
    }
    if (text) {
      full += text;
      await handlers.onChunk?.(text);
    }
  }

  return full;
}

function buildKimiRequest(options: GenerateBaseOptions) {
  const request = {
    model: options.model,
    messages: [
      {
        role: 'user',
        content: buildKimiParts(options.video, options.artifacts, options.prompt),
      },
    ],
    temperature: options.temperature ?? resolveKimiTemperature(options.disableThinking),
    top_p: 0.95,
    max_tokens: options.maxOutputTokens ?? 8192,
  };

  if (options.disableThinking) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (request as any).thinking = { type: 'disabled' };
  }

  return request;
}

function getKimiTemperatureCandidates(options: GenerateBaseOptions): number[] {
  const preferred = options.temperature ?? resolveKimiTemperature(options.disableThinking);
  const alternate = preferred === 1.0 ? 0.6 : 1.0;
  return [...new Set([preferred, alternate])];
}

function isKimiTemperatureError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /invalid temperature/i.test(message) && /only (0\.6|1)/i.test(message);
}

function parseAndValidateJson<T>(text: string, validate: (value: unknown) => T): T {
  const parsed = parseJsonFromText<unknown>(text);
  if (parsed === null) {
    throw new Error('Model returned invalid JSON payload');
  }
  return validate(parsed);
}

function buildJsonOnlyPrompt(prompt: string, schema: unknown): string {
  return `${prompt}

Return valid JSON only.
Do not return null.
Do not wrap the response in markdown fences.
Do not include commentary before or after the JSON.

Required JSON schema:
${JSON.stringify(schema, null, 2)}`;
}

function shouldRetryStructuredJson(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return /invalid json payload/i.test(error.message)
    || /expected object/i.test(error.message)
    || /received null/i.test(error.message)
    || /invalid input/i.test(error.message);
}

async function generateJsonWithFallbacks<T>(
  options: GenerateJsonOptions<T>,
  behavior: {
    preferStructuredOutput: boolean;
    disableThinkingForText: boolean;
    forceModel?: string;
  }
): Promise<T> {
  const attempts: Array<() => Promise<T>> = [];
  const seen = new Set<string>();
  const errors: string[] = [];
  const primaryModel = behavior.forceModel ?? options.model;

  const addAttempt = (key: string, fn: () => Promise<T>) => {
    if (seen.has(key)) return;
    seen.add(key);
    attempts.push(fn);
  };

  if (behavior.preferStructuredOutput && !isKimiModel(primaryModel)) {
    addAttempt(`${primaryModel}:structured`, () => generateStructuredJsonWithGeminiModel(options, primaryModel));
  }

  addAttempt(`${primaryModel}:text-json`, () =>
    generateJsonFromTextAttempt(options, primaryModel, behavior.disableThinkingForText)
  );

  if (primaryModel !== JSON_FALLBACK_MODEL) {
    addAttempt(`${JSON_FALLBACK_MODEL}:structured`, () =>
      generateStructuredJsonWithGeminiModel(options, JSON_FALLBACK_MODEL)
    );
    addAttempt(`${JSON_FALLBACK_MODEL}:text-json`, () =>
      generateJsonFromTextAttempt(options, JSON_FALLBACK_MODEL, false)
    );
  }

  for (const attempt of attempts) {
    try {
      return await attempt();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown JSON generation failure';
      errors.push(message);
      if (!shouldRetryStructuredJson(error)) {
        throw error instanceof Error ? error : new Error(message);
      }
    }
  }

  throw new Error(`Unable to generate valid JSON after ${errors.length} attempts. ${errors.join(' | ')}`);
}

async function generateStructuredJsonWithGeminiModel<T>(
  options: GenerateJsonOptions<T>,
  model: string
): Promise<T> {
  try {
    const client = createGeminiClient(options.apiKey);
    const response = await client.models.generateContent({
      model,
      contents: [{ role: 'user', parts: buildGeminiParts(options.video, options.artifacts, options.prompt) }],
      config: {
        maxOutputTokens: options.maxOutputTokens ?? 4096,
        temperature: options.temperature ?? 0.1,
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
        responseMimeType: 'application/json',
        responseJsonSchema: options.schema,
      },
    });
    return parseAndValidateJson(response.text || '', options.validate);
  } catch (error) {
    throw normalizeGeminiError(error);
  }
}

async function generateJsonFromTextAttempt<T>(
  options: GenerateJsonOptions<T>,
  model: string,
  disableThinking: boolean
): Promise<T> {
  const text = await generateText({
    ...options,
    model,
      prompt: buildJsonOnlyPrompt(options.prompt, options.schema),
      temperature: isKimiModel(model) ? resolveKimiTemperature(disableThinking) : 0.1,
      disableThinking,
  });
  return parseAndValidateJson(text, options.validate);
}

function buildGeminiParts(video: VideoSourceRef, artifacts: SharedArtifactBundle, prompt: string) {
  const parts: Array<{ fileData?: { mimeType: string; fileUri: string }; inlineData?: { mimeType: string; data: string }; text?: string }> = [];
  if (video.sourceType === 'gemini_file' && video.uri) {
    parts.push({ fileData: { mimeType: video.mimeType, fileUri: video.uri } });
  } else if (video.inlineBase64) {
    parts.push({ inlineData: { mimeType: video.mimeType, data: video.inlineBase64 } });
  }
  const preview = artifacts.keyframes[0]?.previewBase64;
  if (preview) {
    parts.push({ inlineData: { mimeType: 'image/jpeg', data: preview } });
  }
  parts.push({ text: prompt });
  return parts;
}

function buildKimiParts(video: VideoSourceRef, artifacts: SharedArtifactBundle, prompt: string): KimiContentPart[] {
  if (!video.inlineBase64) {
    throw new Error('Missing inlineBase64 video data for Kimi.');
  }

  const parts: KimiContentPart[] = [
    { type: 'text', text: prompt },
    {
      type: 'video_url',
      video_url: { url: `data:${video.mimeType};base64,${video.inlineBase64}` },
    },
  ];

  const preview = artifacts.keyframes[0]?.previewBase64;
  if (preview) {
    parts.push({
      type: 'image_url',
      image_url: { url: `data:image/jpeg;base64,${preview}` },
    });
  }

  return parts;
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/ai/agentic-pipeline.ts
```ts
import { GoogleGenAI } from '@google/genai';
import type { OutputFormat, VideoMetadata, TriggerContext } from '@/types/analysis';
import type { GeminiQualityLevel, AnalysisImage } from './gemini';
import { buildPass1Prompt, buildPass2Prompt, buildPass3Prompt, buildPass4Prompt } from './agentic-prompts';
import { normalizeGeminiError } from './gemini-utils';
import { getFormatTemplate } from './prompts';

export interface PipelineEvent {
  type: 'pass_start' | 'pass_complete' | 'thinking' | 'chunk' | 'error';
  pass: number;
  passName: string;
  totalPasses: number;
  data?: string;
}

export interface AgenticPipelineOptions {
  videoBase64?: string;
  mimeType?: string;
  fileUri?: string;
  fileMimeType?: string;
  format: OutputFormat;
  quality: GeminiQualityLevel;
  triggerContext: TriggerContext;
  videoMetadata?: VideoMetadata | null;
  analysisImages?: AnalysisImage[];
}

const PASS_NAMES = [
  'Scene Decomposition',
  'Deep Motion Analysis',
  'Code Generation',
  'Self-Verification',
];

const TOTAL_PASSES = 4;

/**
 * Select model per pass: flash for structural tasks (1 & 4), pro for deep analysis (2 & 3).
 * When quality is 'balanced', all passes use flash.
 */
function getModelForPass(pass: number, quality: GeminiQualityLevel): string {
  if (quality === 'balanced') return 'gemini-3-flash-preview';
  // 'precise': pro for deep passes, flash for structural
  return (pass === 2 || pass === 3) ? 'gemini-3.1-pro-preview' : 'gemini-3-flash-preview';
}

function getConfigForPass(pass: number): object {
  const isDeepPass = pass === 2 || pass === 3;
  return {
    maxOutputTokens: isDeepPass ? 16384 : 8192,
    temperature: isDeepPass ? 0.1 : 0.2,
    thinkingConfig: {
      thinkingLevel: 'high',
    },
  };
}

type VideoPart =
  | { inlineData: { mimeType: string; data: string } }
  | { fileData: { mimeType: string; fileUri: string } };

/**
 * Main agentic pipeline orchestrator.
 * Runs 4 sequential passes, each a separate Gemini API call.
 * The video is re-sent with each call (via base64 or fileUri).
 */
export async function* runAgenticPipeline(
  options: AgenticPipelineOptions
): AsyncGenerator<PipelineEvent, void, unknown> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not set');

  const client = new GoogleGenAI({ apiKey });

  // Build video part (inline or fileUri)
  const videoPart: VideoPart = options.fileUri
    ? { fileData: { mimeType: options.fileMimeType!, fileUri: options.fileUri } }
    : { inlineData: { mimeType: options.mimeType!, data: options.videoBase64! } };

  // We need to override the model per pass. We'll do this by modifying the
  // generateContentStream call. Since runSinglePass uses a hardcoded model,
  // we'll refactor to pass model through config.
  // Actually, let's create the stream call inline for each pass.

  let pass1Result = '';
  let pass2Result = '';
  let pass3Result = '';

  // === PASS 1: Scene Decomposition ===
  yield {
    type: 'pass_start',
    pass: 1,
    passName: PASS_NAMES[0],
    totalPasses: TOTAL_PASSES,
  };

  const pass1Prompt = buildPass1Prompt(options.videoMetadata);
  pass1Result = yield* runPassWithModel(
    client, videoPart, pass1Prompt, 1, options.quality, options.analysisImages
  );

  yield {
    type: 'pass_complete',
    pass: 1,
    passName: PASS_NAMES[0],
    totalPasses: TOTAL_PASSES,
    data: pass1Result,
  };

  // === PASS 2: Deep Motion Analysis ===
  yield {
    type: 'pass_start',
    pass: 2,
    passName: PASS_NAMES[1],
    totalPasses: TOTAL_PASSES,
  };

  const pass2Prompt = buildPass2Prompt(pass1Result, options.videoMetadata);
  pass2Result = yield* runPassWithModel(
    client, videoPart, pass2Prompt, 2, options.quality, options.analysisImages
  );

  yield {
    type: 'pass_complete',
    pass: 2,
    passName: PASS_NAMES[1],
    totalPasses: TOTAL_PASSES,
    data: pass2Result,
  };

  // === PASS 3: Code Generation ===
  yield {
    type: 'pass_start',
    pass: 3,
    passName: PASS_NAMES[2],
    totalPasses: TOTAL_PASSES,
  };

  const formatTemplate = getFormatTemplate(options.format);
  const pass3Prompt = buildPass3Prompt(pass1Result, pass2Result, options.format, formatTemplate);
  pass3Result = yield* runPassWithModel(
    client, videoPart, pass3Prompt, 3, options.quality, options.analysisImages
  );

  yield {
    type: 'pass_complete',
    pass: 3,
    passName: PASS_NAMES[2],
    totalPasses: TOTAL_PASSES,
    data: pass3Result,
  };

  // === PASS 4: Self-Verification ===
  yield {
    type: 'pass_start',
    pass: 4,
    passName: PASS_NAMES[3],
    totalPasses: TOTAL_PASSES,
  };

  const pass4Prompt = buildPass4Prompt(pass3Result, pass1Result);
  yield* runPassWithModel(
    client, videoPart, pass4Prompt, 4, options.quality, options.analysisImages
  );

  yield {
    type: 'pass_complete',
    pass: 4,
    passName: PASS_NAMES[3],
    totalPasses: TOTAL_PASSES,
  };
}

/**
 * Run a single pass with the correct model for that pass.
 */
async function* runPassWithModel(
  client: InstanceType<typeof GoogleGenAI>,
  videoPart: VideoPart,
  prompt: string,
  passNumber: number,
  quality: GeminiQualityLevel,
  analysisImages?: AnalysisImage[]
): AsyncGenerator<PipelineEvent, string, unknown> {
  const model = getModelForPass(passNumber, quality);
  const passName = PASS_NAMES[passNumber - 1];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parts: any[] = [videoPart];

  if (analysisImages) {
    for (const img of analysisImages) {
      parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } });
    }
  }

  parts.push({ text: prompt });

  try {
    const response = await client.models.generateContentStream({
      model,
      contents: [{ role: 'user', parts }],
      config: getConfigForPass(passNumber),
    });

    let fullResult = '';

    for await (const chunk of response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const candidate = (chunk as any).candidates?.[0];
      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if (part.thought && part.text) {
            yield {
              type: 'thinking',
              pass: passNumber,
              passName,
              totalPasses: TOTAL_PASSES,
              data: part.text,
            };
          } else if (part.text && !part.thought) {
            fullResult += part.text;
            yield {
              type: 'chunk',
              pass: passNumber,
              passName,
              totalPasses: TOTAL_PASSES,
              data: part.text,
            };
          }
        }
      } else {
        const text = chunk.text;
        if (text) {
          fullResult += text;
          yield {
            type: 'chunk',
            pass: passNumber,
            passName,
            totalPasses: TOTAL_PASSES,
            data: text,
          };
        }
      }
    }

    return fullResult;
  } catch (error) {
    throw normalizeGeminiError(error);
  }
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/ai/output-parsers.ts
```ts
import type { AnalysisResult, OutputFormat, VerificationReport } from '@/types/analysis';

const FULL_OUTPUT_FORMATS: OutputFormat[] = [
  'clone_ui_animation',
  'copy_design_style',
  'extract_design_tokens',
  'remotion_demo_template',
  'qa_clone_checklist',
  'accessibility_audit',
  'ui_ux_audit',
  'interaction_state_machine',
  'performance_budget',
  'lottie_rive_export',
  'storyboard_breakdown',
  'tailwind_animate',
  'react_native_reanimated',
  'figma_motion_spec',
];

export function parseAnalysisOutput(
  rawOutput: string,
  format: OutputFormat
): AnalysisResult {
  const { code, notes } = extractCodeAndNotes(rawOutput, format);

  return {
    overview: extractOverview(rawOutput),
    code,
    format,
    notes,
    rawAnalysis: rawOutput,
  };
}

export function extractOverview(output: string): string {
  // Prefer the existing UI-friendly marker
  const overviewMatch = output.match(/\*\*Animation Overview:\*\*\s*\n([^\n]+)/i);
  if (overviewMatch) {
    return overviewMatch[1].trim();
  }

  // Support the heading-based format used by several use cases
  const h2Match = output.match(/^##\s*Overview\s*\n([\s\S]*?)(?=\n##\s|\n$)/m);
  if (h2Match) {
    const block = h2Match[1].trim();
    const firstPara = block.split('\n\n')[0]?.trim();
    if (firstPara) return firstPara.slice(0, 200);
    return block.slice(0, 200);
  }

  // Fallback: get first paragraph
  const firstParagraph = output.split('\n\n')[0];
  return firstParagraph.slice(0, 200);
}

function extractCodeAndNotes(
  output: string,
  format: OutputFormat
): { code: string; notes?: string } {
  // For full-output formats, keep the entire markdown (with headings + code fences)
  if (FULL_OUTPUT_FORMATS.includes(format)) {
    return { code: output };
  }

  // For code-focused formats (component / landing), extract the single TSX block if present
  const codeBlockRegex = /```(?:css|javascript|tsx|js|typescript)?\n([\s\S]*?)```/g;
  const matches = [...output.matchAll(codeBlockRegex)];

  if (matches.length > 0) {
    const code = matches.map((m) => m[1].trim()).filter(Boolean).join('\n\n');
    const notes = output.replace(codeBlockRegex, '').trim();

    return {
      code: code.length > 0 ? code : output,
      notes: notes.length > 0 ? notes : undefined,
    };
  }

  // Fallback: return full output if no code blocks found
  return { code: output };
}

export function getLanguageForFormat(format: OutputFormat): string {
  switch (format) {
    case 'clone_component':
    case 'clone_landing_page':
      return 'tsx';
    case 'interaction_state_machine':
      return 'typescript';
    case 'react_native_reanimated':
      return 'tsx';
    case 'tailwind_animate':
      return 'css';
    case 'lottie_rive_export':
      return 'json';
    case 'clone_ui_animation':
    case 'extract_design_tokens':
    case 'remotion_demo_template':
    case 'qa_clone_checklist':
    case 'accessibility_audit':
    case 'ui_ux_audit':
    case 'performance_budget':
    case 'storyboard_breakdown':
    case 'figma_motion_spec':
    default:
      return 'markdown';
  }
}

export function getFileExtensionForFormat(format: OutputFormat): string {
  switch (format) {
    case 'clone_component':
    case 'clone_landing_page':
    case 'react_native_reanimated':
      return 'tsx';
    case 'interaction_state_machine':
      return 'ts';
    case 'tailwind_animate':
      return 'css';
    case 'lottie_rive_export':
      return 'json';
    case 'clone_ui_animation':
    case 'extract_design_tokens':
    case 'remotion_demo_template':
    case 'qa_clone_checklist':
    case 'accessibility_audit':
    case 'ui_ux_audit':
    case 'performance_budget':
    case 'storyboard_breakdown':
    case 'figma_motion_spec':
    default:
      return 'md';
  }
}

/**
 * Extract the verification report JSON from the combined agentic pipeline output.
 * Pass 4 output is a JSON block with { overallScore, discrepancies, corrections, summary }.
 * It appears at the tail end of the concatenated output.
 */
export function extractVerificationReport(rawOutput: string): VerificationReport | null {
  // Look for JSON blocks containing "overallScore" — this is unique to Pass 4
  const jsonBlockRegex = /```(?:json)?\s*\n([\s\S]*?)```/g;
  const matches = [...rawOutput.matchAll(jsonBlockRegex)];

  // Search from the end since Pass 4 is the last pass
  for (let i = matches.length - 1; i >= 0; i--) {
    const jsonStr = matches[i][1].trim();
    if (!jsonStr.includes('overallScore')) continue;

    try {
      const parsed = JSON.parse(jsonStr);
      if (typeof parsed.overallScore !== 'number') continue;

      return {
        overallScore: Math.max(0, Math.min(100, parsed.overallScore)),
        discrepancies: Array.isArray(parsed.discrepancies)
          ? parsed.discrepancies.map((d: Record<string, unknown>) => ({
              element: String(d.element || ''),
              issue: String(d.issue || ''),
              severity: ['minor', 'major', 'critical'].includes(d.severity as string)
                ? (d.severity as 'minor' | 'major' | 'critical')
                : 'minor',
              suggestedFix: String(d.suggestedFix || ''),
            }))
          : [],
        corrections: Array.isArray(parsed.corrections)
          ? parsed.corrections.map((c: unknown) => String(c))
          : [],
        summary: parsed.summary ? String(parsed.summary) : undefined,
      };
    } catch {
      continue;
    }
  }

  // Fallback: try to find raw JSON (without code fences) at the end of output
  const lastBraceIndex = rawOutput.lastIndexOf('{');
  if (lastBraceIndex !== -1) {
    // Find the matching closing brace
    let depth = 0;
    let end = -1;
    for (let i = lastBraceIndex; i < rawOutput.length; i++) {
      if (rawOutput[i] === '{') depth++;
      if (rawOutput[i] === '}') depth--;
      if (depth === 0) { end = i; break; }
    }
    if (end !== -1) {
      const jsonStr = rawOutput.slice(lastBraceIndex, end + 1);
      if (jsonStr.includes('overallScore')) {
        try {
          const parsed = JSON.parse(jsonStr);
          if (typeof parsed.overallScore === 'number') {
            return {
              overallScore: Math.max(0, Math.min(100, parsed.overallScore)),
              discrepancies: Array.isArray(parsed.discrepancies)
                ? parsed.discrepancies.map((d: Record<string, unknown>) => ({
                    element: String(d.element || ''),
                    issue: String(d.issue || ''),
                    severity: ['minor', 'major', 'critical'].includes(d.severity as string)
                      ? (d.severity as 'minor' | 'major' | 'critical')
                      : 'minor',
                    suggestedFix: String(d.suggestedFix || ''),
                  }))
                : [],
              corrections: Array.isArray(parsed.corrections)
                ? parsed.corrections.map((c: unknown) => String(c))
                : [],
              summary: parsed.summary ? String(parsed.summary) : undefined,
            };
          }
        } catch {
          // Not valid JSON
        }
      }
    }
  }

  return null;
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/ai/gemini.ts
```ts
import { GoogleGenAI } from '@google/genai';
import type { OutputFormat, QualityLevel, TriggerContext, VideoMetadata } from '@/types/analysis';
import { buildAnalysisPrompt, buildUserPrompt } from './prompts';
import { normalizeGeminiError } from './gemini-utils';

// Quality levels supported by Gemini
export type GeminiQualityLevel = Exclude<QualityLevel, 'kimi'>;

// Model mapping for Gemini quality levels
const QUALITY_TO_MODEL: Record<GeminiQualityLevel, string> = {
  balanced: 'gemini-3-flash-preview',
  precise: 'gemini-3.1-pro-preview',
};

// Inline base64 size limit (20MB)
const INLINE_SIZE_LIMIT = 20 * 1024 * 1024;

// Config for each Gemini quality level
// Gemini 3 models support thinking mode for deeper reasoning
const QUALITY_TO_CONFIG: Record<GeminiQualityLevel, object> = {
  balanced: {
    maxOutputTokens: 8192,
    temperature: 0.2,
    thinkingConfig: {
      thinkingLevel: 'high',
    },
  },
  precise: {
    maxOutputTokens: 16384,
    temperature: 0.1,
    thinkingConfig: {
      thinkingLevel: 'high',
    },
  },
};

export interface AnalysisImage {
  base64: string;
  mimeType: string;
  description?: string;
}

export interface AnalyzeVideoOptions {
  videoBase64: string;
  mimeType: string;
  format: OutputFormat;
  quality: GeminiQualityLevel;
  triggerContext: TriggerContext;
  videoMetadata?: VideoMetadata | null;
  fileSize?: number;
  analysisImages?: AnalysisImage[];
}

export interface AnalyzeVideoWithFileOptions {
  fileUri: string;
  fileMimeType: string;
  format: OutputFormat;
  quality: GeminiQualityLevel;
  triggerContext: TriggerContext;
  videoMetadata?: VideoMetadata | null;
  analysisImages?: AnalysisImage[];
}

// Analyze video using inline base64 (for files < 20MB)
export async function analyzeVideoWithGemini(
  options: AnalyzeVideoOptions
): Promise<string> {
  const { videoBase64, mimeType, format, quality, triggerContext, videoMetadata, analysisImages } = options;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }

  const client = new GoogleGenAI({ apiKey });

  const model = QUALITY_TO_MODEL[quality];
  const systemPrompt = buildAnalysisPrompt(format, triggerContext, videoMetadata, quality);
  const userPrompt = buildUserPrompt();
  const promptText = buildPromptWithImages(systemPrompt, userPrompt, analysisImages);
  const modelConfig = QUALITY_TO_CONFIG[quality];

  try {
    const response = await client.models.generateContent({
      model,
      contents: [
        {
          role: 'user',
          parts: buildParts(
            {
              inlineData: {
                mimeType,
                data: videoBase64,
              },
            },
            promptText,
            analysisImages
          ),
        },
      ],
      config: modelConfig,
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from Gemini');
    }

    return text;
  } catch (error) {
    throw normalizeGeminiError(error);
  }
}

// Analyze video using Gemini Files API (for larger files)
export async function analyzeVideoWithGeminiFile(
  options: AnalyzeVideoWithFileOptions
): Promise<string> {
  const { fileUri, fileMimeType, format, quality, triggerContext, videoMetadata, analysisImages } = options;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }

  const client = new GoogleGenAI({ apiKey });

  const model = QUALITY_TO_MODEL[quality];
  const systemPrompt = buildAnalysisPrompt(format, triggerContext, videoMetadata, quality);
  const userPrompt = buildUserPrompt();
  const promptText = buildPromptWithImages(systemPrompt, userPrompt, analysisImages);
  const modelConfig = QUALITY_TO_CONFIG[quality];

  try {
    const response = await client.models.generateContent({
      model,
      contents: [
        {
          role: 'user',
          parts: buildParts(
            {
              fileData: {
                mimeType: fileMimeType,
                fileUri,
              },
            },
            promptText,
            analysisImages
          ),
        },
      ],
      config: modelConfig,
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from Gemini');
    }

    return text;
  } catch (error) {
    throw normalizeGeminiError(error);
  }
}

// Streaming version for inline base64
export async function* analyzeVideoWithGeminiStream(
  options: AnalyzeVideoOptions
): AsyncGenerator<string, void, unknown> {
  const { videoBase64, mimeType, format, quality, triggerContext, videoMetadata, analysisImages } = options;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }

  const client = new GoogleGenAI({ apiKey });

  const model = QUALITY_TO_MODEL[quality];
  const systemPrompt = buildAnalysisPrompt(format, triggerContext, videoMetadata, quality);
  const userPrompt = buildUserPrompt();
  const promptText = buildPromptWithImages(systemPrompt, userPrompt, analysisImages);
  const modelConfig = QUALITY_TO_CONFIG[quality];

  try {
    const response = await client.models.generateContentStream({
      model,
      contents: [
        {
          role: 'user',
          parts: buildParts(
            {
              inlineData: {
                mimeType,
                data: videoBase64,
              },
            },
            promptText,
            analysisImages
          ),
        },
      ],
      config: modelConfig,
    });

    for await (const chunk of response) {
      const text = chunk.text;
      if (text) {
        yield text;
      }
    }
  } catch (error) {
    throw normalizeGeminiError(error);
  }
}

// Streaming version using Gemini Files API
export async function* analyzeVideoWithGeminiFileStream(
  options: AnalyzeVideoWithFileOptions
): AsyncGenerator<string, void, unknown> {
  const { fileUri, fileMimeType, format, quality, triggerContext, videoMetadata, analysisImages } = options;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }

  const client = new GoogleGenAI({ apiKey });

  const model = QUALITY_TO_MODEL[quality];
  const systemPrompt = buildAnalysisPrompt(format, triggerContext, videoMetadata, quality);
  const userPrompt = buildUserPrompt();
  const promptText = buildPromptWithImages(systemPrompt, userPrompt, analysisImages);
  const modelConfig = QUALITY_TO_CONFIG[quality];

  try {
    const response = await client.models.generateContentStream({
      model,
      contents: [
        {
          role: 'user',
          parts: buildParts(
            {
              fileData: {
                mimeType: fileMimeType,
                fileUri,
              },
            },
            promptText,
            analysisImages
          ),
        },
      ],
      config: modelConfig,
    });

    for await (const chunk of response) {
      const text = chunk.text;
      if (text) {
        yield text;
      }
    }
  } catch (error) {
    throw normalizeGeminiError(error);
  }
}

// Helper to determine which method to use
export function shouldUseFilesAPI(fileSize: number): boolean {
  return fileSize > INLINE_SIZE_LIMIT;
}

function buildPromptWithImages(
  systemPrompt: string,
  userPrompt: string,
  analysisImages?: AnalysisImage[]
): string {
  if (!analysisImages || analysisImages.length === 0) {
    return `${systemPrompt}\n\n${userPrompt}`;
  }

  const descriptions = analysisImages
    .map((image, index) => image.description || `Reference image ${index + 1}`)
    .join('\n');

  return `${systemPrompt}\n\n${userPrompt}\n\nAdditional reference images are attached:\n${descriptions}\nUse them to confirm micro-motions, spatial relationships, and timing details.`;
}

function buildParts(
  videoPart: { inlineData?: { mimeType: string; data: string }; fileData?: { mimeType: string; fileUri: string } },
  promptText: string,
  analysisImages?: AnalysisImage[]
) {
  const parts: Array<{ inlineData?: { mimeType: string; data: string }; fileData?: { mimeType: string; fileUri: string }; text?: string }> = [
    videoPart,
  ];

  if (analysisImages) {
    for (const image of analysisImages) {
      parts.push({
        inlineData: {
          mimeType: image.mimeType,
          data: image.base64,
        },
      });
    }
  }

  parts.push({ text: promptText });
  return parts;
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video-understanding/families/audit.ts
```ts

    import { extractOverview } from '@/lib/ai/output-parsers';
    import { buildAnalysisPrompt } from '@/lib/ai/prompts';
    import type { OutputFormat, TriggerContext, VideoMetadata } from '@/types/analysis';
    import type { FinalOutputArtifact, PipelinePlan, SharedArtifactBundle, StageArtifact, VerificationSummary } from '../artifacts';
    import { nowIso } from '../artifacts';
    import { generateJson, generateText } from '../providers/gemini-runner';
    import { auditSegmentationJsonSchema, auditSegmentationSchema, auditValidationJsonSchema, auditValidationSchema, type AuditSegmentation } from '../schemas/audit';
    import { verifyAuditOutput } from '../verification/audit';

    export async function executeAuditFamily(options: {
      apiKey: string;
      plan: PipelinePlan;
      format: OutputFormat;
      triggerContext: TriggerContext;
      videoMetadata: VideoMetadata | null;
      sharedArtifacts: SharedArtifactBundle;
      emit: (event: Record<string, unknown>) => Promise<void>;
    }): Promise<{ stageArtifacts: StageArtifact[]; finalArtifact: FinalOutputArtifact; verification: VerificationSummary }> {
      const stageArtifacts: StageArtifact[] = [];
      const totalStages = options.plan.stages.length;

      await options.emit({ type: 'stage_start', stageId: 'audit_flow', stageLabel: 'Segment flow and intent', stageIndex: 1, totalStages });
      const segmentation = await generateJson<AuditSegmentation>({
        apiKey: options.apiKey,
        model: options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt: `Return valid JSON only. Segment the attached product flow into steps, infer the primary user goal, list strengths, list risks, and note friction signals for each step. Metadata: ${JSON.stringify(options.videoMetadata)}`,
        schema: auditSegmentationJsonSchema,
        validate: (value) => auditSegmentationSchema.parse(value),
      });
      stageArtifacts.push({ stageId: 'audit_flow', stageType: 'structured_json', stageLabel: 'Segment flow and intent', status: 'complete', payload: segmentation, createdAt: nowIso(), summary: `${segmentation.steps.length} steps` });
      await options.emit({ type: 'stage_complete', stageId: 'audit_flow', stageLabel: 'Segment flow and intent', stageIndex: 1, totalStages, message: `${segmentation.steps.length} steps segmented` });

      await options.emit({ type: 'stage_start', stageId: 'audit_generate', stageLabel: 'Synthesize audit', stageIndex: 2, totalStages });
      const auditOutput = await generateText({
        apiKey: options.apiKey,
        model: options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt: `${buildAnalysisPrompt(options.format, options.triggerContext, options.videoMetadata, options.plan.generatorModel.startsWith('kimi') ? 'kimi' : 'precise')}

Flow segmentation:
${JSON.stringify(segmentation, null, 2)}

Write the final audit only.`,
        maxOutputTokens: 12000,
        temperature: 0.2,
      });
      stageArtifacts.push({ stageId: 'audit_generate', stageType: 'text', stageLabel: 'Synthesize audit', status: 'complete', payload: auditOutput, createdAt: nowIso(), summary: extractOverview(auditOutput) });
      await options.emit({ type: 'stage_output', stageId: 'audit_generate', stageLabel: 'Synthesize audit', stageIndex: 2, totalStages, chunk: auditOutput });
      await options.emit({ type: 'stage_complete', stageId: 'audit_generate', stageLabel: 'Synthesize audit', stageIndex: 2, totalStages, message: 'Audit synthesized' });

      await options.emit({ type: 'stage_start', stageId: 'audit_verify', stageLabel: 'Validate audit quality', stageIndex: 3, totalStages });
      const validation = await generateJson({
        apiKey: options.apiKey,
        model: options.plan.verifierModel || options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt: `Return valid JSON only. Validate whether this audit is specific, evidence-based, prioritized, and covers the visible flow.
Flow segmentation:
${JSON.stringify(segmentation, null, 2)}
Audit:
${auditOutput.slice(0, 16000)}`,
        schema: auditValidationJsonSchema,
        validate: (value) => auditValidationSchema.parse(value),
      });
      const verification = verifyAuditOutput(validation);
      stageArtifacts.push({ stageId: 'audit_verify', stageType: 'structured_json', stageLabel: 'Validate audit quality', status: 'complete', payload: validation, createdAt: nowIso(), summary: `score ${verification.score}` });
      await options.emit({ type: 'verification', verification });
      await options.emit({ type: 'stage_complete', stageId: 'audit_verify', stageLabel: 'Validate audit quality', stageIndex: 3, totalStages, message: `Audit score ${verification.score}` });

      let finalOutput = auditOutput;
      if (verification.canAutoRevise && options.plan.maxIterations > 0) {
        await options.emit({ type: 'revision_start', iteration: 1, reason: verification.summary });
        await options.emit({ type: 'stage_start', stageId: 'audit_revise', stageLabel: 'Refine from verification', stageIndex: totalStages, totalStages });
        finalOutput = await generateText({
          apiKey: options.apiKey,
          model: options.plan.generatorModel,
          video: options.sharedArtifacts.video,
          artifacts: options.sharedArtifacts,
          prompt: `Revise this audit using the findings below. Return only the improved final audit.
Findings:
${JSON.stringify(verification.findings, null, 2)}
Current audit:
${auditOutput.slice(0, 16000)}`,
          maxOutputTokens: 12000,
          temperature: 0.15,
        });
        stageArtifacts.push({ stageId: 'audit_revise', stageType: 'revision', stageLabel: 'Refine from verification', status: 'complete', payload: finalOutput, createdAt: nowIso(), summary: extractOverview(finalOutput) });
        await options.emit({ type: 'stage_complete', stageId: 'audit_revise', stageLabel: 'Refine from verification', stageIndex: totalStages, totalStages, message: 'Audit revision complete' });
      }

      const finalArtifact: FinalOutputArtifact = {
        format: options.format,
        content: finalOutput,
        title: 'Deep Audit Result',
        overview: extractOverview(finalOutput),
        verification,
      };
      return { stageArtifacts, finalArtifact, verification };
    }

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video-understanding/planner.ts
```ts

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

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video-understanding/families/reconstruct.ts
```ts

    import { extractOverview } from '@/lib/ai/output-parsers';
    import { getFormatTemplate } from '@/lib/ai/prompts';
    import type { OutputFormat, TriggerContext, VideoMetadata } from '@/types/analysis';
    import type { FinalOutputArtifact, PipelinePlan, SharedArtifactBundle, StageArtifact, VerificationSummary } from '../artifacts';
    import { nowIso } from '../artifacts';
    import { generateJson, generateText, streamText } from '../providers/gemini-runner';
    import {
      sceneDecompositionJsonSchema,
      sceneDecompositionSchema,
      reconstructionVerificationJsonSchema,
      reconstructionVerificationSchema,
      type SceneDecomposition,
    } from '../schemas/reconstruct';
    import { verifyReconstructionOutput } from '../verification/reconstruct';
import { mergeRenderDiffVerification, tryRenderDiffVerification } from '../verification/render-diff';

    export interface ReconstructFamilyResult {
      stageArtifacts: StageArtifact[];
      finalArtifact: FinalOutputArtifact;
      verification: VerificationSummary;
    }

    export interface ReconstructFamilyOptions {
      apiKey: string;
      plan: PipelinePlan;
      format: OutputFormat;
      triggerContext: TriggerContext;
      videoMetadata: VideoMetadata | null;
      sharedArtifacts: SharedArtifactBundle;
      emit: (event: {
        type: string;
        stageId?: string;
        stageLabel?: string;
        stageIndex?: number;
        totalStages?: number;
        message?: string;
        chunk?: string;
        data?: string;
        verification?: VerificationSummary;
        iteration?: number;
        reason?: string;
      }) => Promise<void>;
    }

    export async function executeReconstructFamily(options: ReconstructFamilyOptions): Promise<ReconstructFamilyResult> {
      const stageArtifacts: StageArtifact[] = [];
      const totalStages = options.plan.stages.length;

      const sceneMap = await runSceneMapStage(options, stageArtifacts, totalStages, 1);
      const motionAnalysis = await runMotionStage(options, stageArtifacts, totalStages, 2, sceneMap);
      let finalOutput = await runGenerationStage(options, stageArtifacts, totalStages, 3, sceneMap, motionAnalysis);
      const llmVerification = await runVerificationStage(options, stageArtifacts, totalStages, 4, sceneMap, finalOutput);
      let verification = verifyReconstructionOutput({
        format: options.format,
        finalOutput,
        sharedArtifacts: options.sharedArtifacts,
        llmVerification,
      });
      await options.emit({ type: 'verification', verification });

      if (verification.canAutoRevise && options.plan.maxIterations > 0) {
        await options.emit({ type: 'revision_start', iteration: 1, reason: verification.summary });
        finalOutput = await runRevisionStage(options, stageArtifacts, totalStages, 5, finalOutput, verification);
        const revisedVerification = await runVerificationStage(options, stageArtifacts, totalStages, 4, sceneMap, finalOutput, true);
        verification = verifyReconstructionOutput({
          format: options.format,
          finalOutput,
          sharedArtifacts: options.sharedArtifacts,
          llmVerification: revisedVerification,
        });
        await options.emit({ type: 'verification', verification });
      }

      const renderDiff = await tryRenderDiffVerification({
        format: options.format,
        finalOutput,
        sharedArtifacts: options.sharedArtifacts,
      });
      verification = mergeRenderDiffVerification(verification, renderDiff);

      const finalArtifact: FinalOutputArtifact = {
        format: options.format,
        content: finalOutput,
        title: 'Deep Analysis Result',
        overview: extractOverview(finalOutput),
        verification,
      };

      return { stageArtifacts, finalArtifact, verification };
    }

    async function runSceneMapStage(
      options: ReconstructFamilyOptions,
      stageArtifacts: StageArtifact[],
      totalStages: number,
      stageIndex: number
    ): Promise<SceneDecomposition> {
      const stageId = 'reconstruct_map';
      const stageLabel = 'Map scenes and states';
      await options.emit({ type: 'stage_start', stageId, stageLabel, stageIndex, totalStages });
      const prompt = buildSceneMapPrompt(options.videoMetadata, options.triggerContext, options.sharedArtifacts);
      const payload = await generateJson<SceneDecomposition>({
        apiKey: options.apiKey,
        model: options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt,
        schema: sceneDecompositionJsonSchema,
        validate: (value) => sceneDecompositionSchema.parse(value),
      });
      stageArtifacts.push({ stageId, stageType: 'structured_json', stageLabel, status: 'complete', payload, createdAt: nowIso(), summary: `${payload.scenes.length} scenes` });
      await options.emit({ type: 'stage_complete', stageId, stageLabel, stageIndex, totalStages, message: `${payload.scenes.length} scenes mapped` });
      return payload;
    }

    async function runMotionStage(
      options: ReconstructFamilyOptions,
      stageArtifacts: StageArtifact[],
      totalStages: number,
      stageIndex: number,
      sceneMap: SceneDecomposition
    ): Promise<string> {
      const stageId = 'reconstruct_motion';
      const stageLabel = 'Analyze motion and visual details';
      await options.emit({ type: 'stage_start', stageId, stageLabel, stageIndex, totalStages });
      const prompt = buildMotionPrompt(sceneMap, options.videoMetadata, options.sharedArtifacts);
      const text = await streamText({
        apiKey: options.apiKey,
        model: options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt,
        maxOutputTokens: 10000,
        temperature: 0.1,
      }, {
        onThought: async (chunk) => options.emit({ type: 'thinking', stageId, stageLabel, stageIndex, totalStages, chunk }),
        onChunk: async (chunk) => options.emit({ type: 'stage_output', stageId, stageLabel, stageIndex, totalStages, chunk }),
      });
      stageArtifacts.push({ stageId, stageType: 'text', stageLabel, status: 'complete', payload: text, createdAt: nowIso(), summary: 'Motion analysis complete' });
      await options.emit({ type: 'stage_complete', stageId, stageLabel, stageIndex, totalStages, message: 'Motion analysis complete' });
      return text;
    }

    async function runGenerationStage(
      options: ReconstructFamilyOptions,
      stageArtifacts: StageArtifact[],
      totalStages: number,
      stageIndex: number,
      sceneMap: SceneDecomposition,
      motionAnalysis: string
    ): Promise<string> {
      const stageId = 'reconstruct_generate';
      const stageLabel = 'Generate final output';
      await options.emit({ type: 'stage_start', stageId, stageLabel, stageIndex, totalStages });
      const prompt = buildGenerationPrompt(sceneMap, motionAnalysis, options.format, options.triggerContext, options.videoMetadata);
      const text = await streamText({
        apiKey: options.apiKey,
        model: options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt,
        maxOutputTokens: 14000,
        temperature: 0.15,
      }, {
        onThought: async (chunk) => options.emit({ type: 'thinking', stageId, stageLabel, stageIndex, totalStages, chunk }),
        onChunk: async (chunk) => options.emit({ type: 'stage_output', stageId, stageLabel, stageIndex, totalStages, chunk }),
      });
      stageArtifacts.push({ stageId, stageType: 'text', stageLabel, status: 'complete', payload: text, createdAt: nowIso(), summary: extractOverview(text) });
      await options.emit({ type: 'stage_complete', stageId, stageLabel, stageIndex, totalStages, message: 'Final output generated' });
      return text;
    }

    async function runVerificationStage(
      options: ReconstructFamilyOptions,
      stageArtifacts: StageArtifact[],
      totalStages: number,
      stageIndex: number,
      sceneMap: SceneDecomposition,
      finalOutput: string,
      isRevision: boolean = false
    ) {
      const stageId = isRevision ? 'reconstruct_verify_revised' : 'reconstruct_verify';
      const stageLabel = isRevision ? 'Verify revised output' : 'Verify fidelity';
      await options.emit({ type: 'stage_start', stageId, stageLabel, stageIndex, totalStages });
      const prompt = buildVerificationPrompt(sceneMap, finalOutput, options.videoMetadata, options.triggerContext);
      const payload = await generateJson({
        apiKey: options.apiKey,
        model: options.plan.verifierModel || options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt,
        schema: reconstructionVerificationJsonSchema,
        validate: (value) => reconstructionVerificationSchema.parse(value),
      });
      stageArtifacts.push({ stageId, stageType: 'structured_json', stageLabel, status: 'complete', payload, createdAt: nowIso(), summary: `score ${payload.overallScore}` });
      await options.emit({ type: 'stage_complete', stageId, stageLabel, stageIndex, totalStages, message: `Verification score ${payload.overallScore}` });
      return payload;
    }

    async function runRevisionStage(
      options: ReconstructFamilyOptions,
      stageArtifacts: StageArtifact[],
      totalStages: number,
      stageIndex: number,
      finalOutput: string,
      verification: VerificationSummary
    ): Promise<string> {
      const stageId = 'reconstruct_revise';
      const stageLabel = 'Refine from verification';
      await options.emit({ type: 'stage_start', stageId, stageLabel, stageIndex, totalStages });
      const prompt = buildRevisionPrompt(finalOutput, verification, options.format, options.videoMetadata, options.triggerContext);
      const text = await generateText({
        apiKey: options.apiKey,
        model: options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt,
        maxOutputTokens: 14000,
        temperature: 0.1,
      });
      stageArtifacts.push({ stageId, stageType: 'revision', stageLabel, status: 'complete', payload: text, createdAt: nowIso(), summary: extractOverview(text) });
      await options.emit({ type: 'stage_complete', stageId, stageLabel, stageIndex, totalStages, message: 'Revision complete' });
      return text;
    }

    function buildSceneMapPrompt(metadata: VideoMetadata | null, triggerContext: TriggerContext, artifacts: SharedArtifactBundle): string {
      return `You are building a scene/state map for a UI video reconstruction run.
Return valid JSON only.
Use the attached video and preview image.
Video metadata: ${JSON.stringify(metadata)}
User trigger context: ${triggerContext ?? 'unknown'}
Shared artifact summary: scenes=${artifacts.scenes.length}, motionRegions=${artifacts.motion.length}, stateHints=${artifacts.stateHints.length}
Describe every distinct scene or state transition.`;
    }

    function buildMotionPrompt(sceneMap: SceneDecomposition, metadata: VideoMetadata | null, artifacts: SharedArtifactBundle): string {
      return `You are an expert motion analyst.
Use the attached video as source of truth.
Scene map:
${JSON.stringify(sceneMap, null, 2)}
Shared artifacts:
${JSON.stringify({ motion: artifacts.motion, stateHints: artifacts.stateHints }, null, 2)}
Video metadata:
${JSON.stringify(metadata, null, 2)}
Write a detailed motion analysis covering timing, easing, element relationships, state changes, and subtle visual details.`;
    }

    function buildGenerationPrompt(
      sceneMap: SceneDecomposition,
      motionAnalysis: string,
      format: OutputFormat,
      triggerContext: TriggerContext,
      metadata: VideoMetadata | null
    ): string {
      return `You are generating the final deliverable for a deep reconstruction run.
Use the exact details below. Do not include self-critique or verification JSON.
Trigger context: ${triggerContext ?? 'unknown'}
Video metadata: ${JSON.stringify(metadata)}
Scene map:
${JSON.stringify(sceneMap, null, 2)}
Motion analysis:
${motionAnalysis.slice(0, 16000)}
Format template:
${getFormatTemplate(format)}`;
    }

    function buildVerificationPrompt(
      sceneMap: SceneDecomposition,
      finalOutput: string,
      metadata: VideoMetadata | null,
      triggerContext: TriggerContext
    ): string {
      return `You are validating a reconstruction output against the attached source video.
Return valid JSON only.
Trigger context: ${triggerContext ?? 'unknown'}
Video metadata: ${JSON.stringify(metadata)}
Scene map:
${JSON.stringify(sceneMap, null, 2)}
Final output to verify:
${finalOutput.slice(0, 16000)}
Score fidelity from 0 to 100 and list concrete corrections.`;
    }

    function buildRevisionPrompt(
      finalOutput: string,
      verification: VerificationSummary,
      format: OutputFormat,
      metadata: VideoMetadata | null,
      triggerContext: TriggerContext
    ): string {
      return `Revise the output below using the verification findings.
Do not add an explanation. Return only the improved final deliverable for format ${format}.
Trigger context: ${triggerContext ?? 'unknown'}
Video metadata: ${JSON.stringify(metadata)}
Verification summary: ${verification.summary}
Findings:
${JSON.stringify(verification.findings, null, 2)}
Current output:
${finalOutput.slice(0, 16000)}`;
    }

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video-understanding/utils/json.ts
```ts
export function safeJsonParse<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function extractJsonObject(value: string): string | null {
  const fenced = value.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) return fenced[1].trim();

  const firstBrace = value.indexOf('{');
  const lastBrace = value.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) return null;
  return value.slice(firstBrace, lastBrace + 1);
}

export function parseJsonFromText<T>(value: string): T | null {
  const extracted = extractJsonObject(value);
  if (!extracted) return null;
  return safeJsonParse<T>(extracted);
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/tests/run-store.test.ts
```ts
import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { toFirestoreSafePayload } from '../src/lib/video-understanding/persistence/run-store.ts';

test('toFirestoreSafePayload strips undefined values that Firestore rejects', () => {
  const value = {
    video: {
      uri: 'file-123',
      inlineBase64: undefined,
    },
    scenes: [{ id: 'scene_1', note: undefined, label: 'Entry' }],
  };

  const safe = toFirestoreSafePayload(value) as {
    video: Record<string, string>;
    scenes: Array<Record<string, string>>;
  };

  assert.deepEqual(safe, {
    video: {
      uri: 'file-123',
    },
    scenes: [{ id: 'scene_1', label: 'Entry' }],
  });
});

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/ai/kimi.ts
```ts
import OpenAI from 'openai';
import type { OutputFormat, TriggerContext, VideoMetadata } from '@/types/analysis';
import { buildAnalysisPrompt, buildUserPrompt } from './prompts';

// Kimi K2.5 model configuration
const KIMI_MODEL = 'kimi-k2.5';
const KIMI_BASE_URL = 'https://api.moonshot.ai/v1';

// Config for Kimi K2.5
// Thinking mode (temp=1.0) gives best quality with deep reasoning
// Vercel Pro/Enterprise supports up to 300s timeout
const KIMI_CONFIG = {
  temperature: 1.0,  // Thinking mode requires temp=1.0
  top_p: 0.95,       // Recommended by official Moonshot docs
  max_tokens: 8192,
  // Set to true to use Instant mode (faster, no reasoning traces)
  // Set to false for Thinking mode (slower but higher quality)
  useInstantMode: false,
};

export interface AnalysisImage {
  base64: string;
  mimeType: string;
  description?: string;
}

export interface AnalyzeVideoWithKimiOptions {
  videoBase64: string;
  mimeType: string;
  format: OutputFormat;
  triggerContext: TriggerContext;
  videoMetadata?: VideoMetadata | null;
  fileSize?: number;
  analysisImages?: AnalysisImage[];
}

function getKimiClient(): OpenAI {
  const apiKey = process.env.MOONSHOT_API_KEY;
  if (!apiKey) {
    throw new Error('MOONSHOT_API_KEY environment variable is not set');
  }

  return new OpenAI({
    apiKey,
    baseURL: KIMI_BASE_URL,
  });
}

function buildPromptWithImages(
  systemPrompt: string,
  userPrompt: string,
  analysisImages?: AnalysisImage[]
): string {
  if (!analysisImages || analysisImages.length === 0) {
    return `${systemPrompt}\n\n${userPrompt}`;
  }

  const descriptions = analysisImages
    .map((image, index) => image.description || `Reference image ${index + 1}`)
    .join('\n');

  return `${systemPrompt}\n\n${userPrompt}\n\nAdditional reference images are attached:\n${descriptions}\nUse them to confirm micro-motions, spatial relationships, and timing details.`;
}

// Kimi-specific content part types (video_url is a Moonshot extension)
// Using 'unknown' type to bypass OpenAI SDK type restrictions
type KimiContentPart =
  | { type: 'video_url'; video_url: { url: string } }
  | { type: 'image_url'; image_url: { url: string } }
  | { type: 'text'; text: string };

function buildContentParts(
  videoBase64: string,
  mimeType: string,
  promptText: string,
  analysisImages?: AnalysisImage[]
): KimiContentPart[] {
  const parts: KimiContentPart[] = [];

  // IMPORTANT: Per Kimi K2.5 official docs, text should come FIRST, then media
  // See: https://huggingface.co/moonshotai/Kimi-K2.5#chat-completion-with-visual-content
  parts.push({
    type: 'text',
    text: promptText,
  });

  // Extract video extension from mimeType (e.g., 'video/mp4' -> 'mp4')
  const videoExtension = mimeType.split('/')[1] || 'mp4';
  // Format: data:video/mp4;base64,{base64} - NO space after comma
  const videoUrl = `data:video/${videoExtension};base64,${videoBase64}`;

  // Add video after text
  parts.push({
    type: 'video_url',
    video_url: { url: videoUrl },
  });

  // Add reference images if any
  if (analysisImages) {
    for (const image of analysisImages) {
      parts.push({
        type: 'image_url',
        image_url: { url: `data:${image.mimeType};base64,${image.base64}` },
      });
    }
  }

  return parts;
}

// Analyze video using Kimi K2.5 (non-streaming)
export async function analyzeVideoWithKimi(
  options: AnalyzeVideoWithKimiOptions
): Promise<string> {
  const { videoBase64, mimeType, format, triggerContext, videoMetadata, analysisImages } = options;

  const client = getKimiClient();

  const systemPrompt = buildAnalysisPrompt(format, triggerContext, videoMetadata, 'kimi');
  const userPrompt = buildUserPrompt();
  const promptText = buildPromptWithImages(systemPrompt, userPrompt, analysisImages);

  const contentParts = buildContentParts(videoBase64, mimeType, promptText, analysisImages);

  // Cast to any to support Moonshot-specific extensions not in OpenAI SDK types:
  // - video_url content type
  // - thinking parameter for mode selection
  // Per official docs: https://huggingface.co/moonshotai/Kimi-K2.5#chat-completion
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requestParams: any = {
    model: KIMI_MODEL,
    messages: [
      {
        role: 'user',
        content: contentParts,
      },
    ],
    temperature: KIMI_CONFIG.temperature,
    top_p: KIMI_CONFIG.top_p,
    max_tokens: KIMI_CONFIG.max_tokens,
  };

  // Use Instant mode for faster responses (required for Vercel 60s timeout)
  if (KIMI_CONFIG.useInstantMode) {
    requestParams.thinking = { type: 'disabled' };
  }

  const response = await (client.chat.completions.create as any)(requestParams);

  // In Instant mode: content only
  // In Thinking mode: reasoning_content + content
  const message = response.choices[0]?.message;
  const text = message?.content || message?.reasoning_content;
  
  if (!text) {
    throw new Error('Empty response from Kimi');
  }

  return text;
}

// Streaming version for Kimi K2.5
export async function* analyzeVideoWithKimiStream(
  options: AnalyzeVideoWithKimiOptions
): AsyncGenerator<string, void, unknown> {
  const { videoBase64, mimeType, format, triggerContext, videoMetadata, analysisImages } = options;

  const client = getKimiClient();

  const systemPrompt = buildAnalysisPrompt(format, triggerContext, videoMetadata, 'kimi');
  const userPrompt = buildUserPrompt();
  const promptText = buildPromptWithImages(systemPrompt, userPrompt, analysisImages);

  const contentParts = buildContentParts(videoBase64, mimeType, promptText, analysisImages);

  // Cast to any to support Moonshot-specific extensions not in OpenAI SDK types:
  // - video_url content type  
  // - thinking parameter for mode selection
  // Per official docs: https://huggingface.co/moonshotai/Kimi-K2.5#chat-completion
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requestParams: any = {
    model: KIMI_MODEL,
    messages: [
      {
        role: 'user',
        content: contentParts,
      },
    ],
    temperature: KIMI_CONFIG.temperature,
    top_p: KIMI_CONFIG.top_p,
    max_tokens: KIMI_CONFIG.max_tokens,
    stream: true,
  };

  // Use Instant mode for faster responses (required for Vercel 60s timeout)
  if (KIMI_CONFIG.useInstantMode) {
    requestParams.thinking = { type: 'disabled' };
  }

  const stream = await (client.chat.completions.create as any)(requestParams);

  // In streaming:
  // - Instant mode: delta.content only
  // - Thinking mode: delta.reasoning_content/reasoning + delta.content
  let chunkCount = 0;
  
  for await (const chunk of stream) {
    chunkCount++;
    const delta = chunk.choices[0]?.delta;
    if (!delta) continue;
    
    // Log first few chunks to debug
    if (chunkCount <= 3) {
      console.log(`[Kimi] Chunk ${chunkCount} delta keys:`, Object.keys(delta));
    }
    
    // Try all possible fields
    const text = delta.content || delta.reasoning_content || delta.reasoning;
    if (text) {
      yield text;
    }
  }
  
  console.log(`[Kimi] Stream complete. Total chunks: ${chunkCount}`);
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/docs/R2_SETUP.md
```md
# Cloudflare R2 Setup for AnimSpec

AnimSpec uses Cloudflare R2 to handle video uploads larger than Vercel's 4.5MB body limit.

## Setup Steps

### 1. Create R2 Bucket

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to R2 → Create bucket
3. Name it `animspec-videos` (or your preferred name)
4. Select your preferred location

### 2. Configure Object Lifecycle (Auto-Delete)

1. Go to your bucket settings
2. Click "Object lifecycle rules"
3. Add a rule:
   - **Rule name**: `auto-delete-uploads`
   - **Prefix filter**: `uploads/`
   - **Action**: Delete objects
   - **Days after upload**: `3`
4. Save the rule

This ensures all uploaded videos are automatically deleted after 3 days.

### 3. Configure CORS

1. Go to bucket settings → CORS policy
2. Add this configuration:

```json
[
  {
    "AllowedOrigins": [
      "https://animspec.com",
      "https://www.animspec.com",
      "http://localhost:3000"
    ],
    "AllowedMethods": ["GET", "PUT", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

### 4. Create API Token

1. Go to R2 → Manage R2 API Tokens
2. Create a new token with:
   - **Permissions**: Object Read & Write
   - **Bucket scope**: Your bucket only
3. Copy the Access Key ID and Secret Access Key

### 5. Add Environment Variables

Add these to your `.env.local` and Vercel project settings:

```env
CLOUDFLARE_R2_ACCOUNT_ID=your_account_id
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key_id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_access_key
CLOUDFLARE_R2_BUCKET_NAME=animspec-videos
```

Find your Account ID in the Cloudflare dashboard URL or R2 overview page.

## How It Works

1. **Small files (<4MB)**: Sent directly to `/api/analyze` as base64
2. **Medium files (4-20MB)**: 
   - Client requests presigned URL from `/api/upload-url`
   - Client uploads directly to R2 (bypasses Vercel)
   - Server fetches from R2 for analysis
   - Object deleted after analysis (or after 3 days via lifecycle)
3. **Large files (>20MB)**: Use Gemini Files API

## Pricing

R2 pricing is very affordable:
- Storage: $0.015/GB/month
- Class A operations (writes): $4.50/million
- Class B operations (reads): $0.36/million
- Egress: Free!

For AnimSpec's use case (temporary video storage), costs should be minimal.

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/ffmpeg/extract-frames.ts
```ts
import { getFFmpeg } from './client';
import { fetchFile } from '@ffmpeg/util';

export interface ExtractFramesOptions {
  fps?: number;
  maxFrames?: number;
  quality?: number; // 1-31, lower is better
  durationSeconds?: number;
  targetFrameSpacingMs?: number;
  timeoutMs?: number;
}

export interface ExtractedFrame {
  data: Uint8Array;
  index: number;
  timestamp: number;
}

export async function extractFrames(
  videoFile: File,
  options: ExtractFramesOptions = {}
): Promise<ExtractedFrame[]> {
  const maxFrames = options.maxFrames ?? 32;
  const quality = options.quality ?? 2;
  const fps = resolveFps(options, maxFrames);
  const execTimeout = options.timeoutMs && options.timeoutMs > 0 ? options.timeoutMs : undefined;

  const ffmpeg = await getFFmpeg();

  // Write input file to FFmpeg virtual filesystem
  const inputFileName = 'input.mp4';
  await ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));

  const frames: ExtractedFrame[] = [];

  try {
    // Extract frames at specified FPS
    const result = await ffmpeg.exec([
      '-i', inputFileName,
      '-vf', `fps=${fps}`,
      '-q:v', quality.toString(),
      '-frames:v', maxFrames.toString(),
      'frame_%04d.jpg',
    ], execTimeout);

    if (result !== 0) {
      throw new Error(`FFmpeg frame extraction failed (code ${result})`);
    }

    // Read extracted frames
    let frameIndex = 1;

    while (frameIndex <= maxFrames) {
      const fileName = `frame_${frameIndex.toString().padStart(4, '0')}.jpg`;
      try {
        const data = await ffmpeg.readFile(fileName) as Uint8Array;
        if (data && data.length > 0) {
          frames.push({
            data,
            index: frameIndex - 1,
            timestamp: fps > 0 ? (frameIndex - 1) / fps : 0,
          });
          // Clean up frame file
          await ffmpeg.deleteFile(fileName);
        }
      } catch {
        // No more frames
        break;
      }
      frameIndex++;
    }

    return frames;
  } finally {
    // Best-effort cleanup
    try {
      await ffmpeg.deleteFile(inputFileName);
    } catch {}

    for (let frameIndex = 1; frameIndex <= maxFrames; frameIndex++) {
      const fileName = `frame_${frameIndex.toString().padStart(4, '0')}.jpg`;
      try {
        await ffmpeg.deleteFile(fileName);
      } catch {}
    }
  }
}

export function framesToBase64(frames: ExtractedFrame[]): string[] {
  return frames.map((frame) => {
    const binary = String.fromCharCode(...frame.data);
    return btoa(binary);
  });
}

export function frameToBlob(frame: ExtractedFrame): Blob {
  // Copy to regular ArrayBuffer to avoid SharedArrayBuffer issues
  const buffer = new Uint8Array(frame.data).buffer;
  return new Blob([buffer], { type: 'image/jpeg' });
}

export function frameToDataURL(frame: ExtractedFrame): string {
  const base64 = btoa(String.fromCharCode(...frame.data));
  return `data:image/jpeg;base64,${base64}`;
}

function resolveFps(options: ExtractFramesOptions, maxFrames: number): number {
  if (options.fps) return options.fps;

  const targetSpacingMs = options.targetFrameSpacingMs ?? 200;
  const fpsFromSpacing = 1000 / targetSpacingMs;

  if (!options.durationSeconds || options.durationSeconds <= 0) {
    return fpsFromSpacing;
  }

  const fpsFromCap = maxFrames / options.durationSeconds;
  const fps = Math.min(fpsFromSpacing, fpsFromCap);

  return Math.max(fps, 0.25);
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video-understanding/families/behavior.ts
```ts

    import { extractOverview } from '@/lib/ai/output-parsers';
    import { buildAnalysisPrompt } from '@/lib/ai/prompts';
    import type { OutputFormat, TriggerContext, VideoMetadata } from '@/types/analysis';
    import type { FinalOutputArtifact, PipelinePlan, SharedArtifactBundle, StageArtifact, VerificationSummary } from '../artifacts';
    import { nowIso } from '../artifacts';
    import { generateJson, generateText } from '../providers/gemini-runner';
    import { behaviorInventoryJsonSchema, behaviorInventorySchema, behaviorValidationJsonSchema, behaviorValidationSchema, type BehaviorInventory } from '../schemas/behavior';
    import { verifyBehaviorOutput } from '../verification/behavior';

    export async function executeBehaviorFamily(options: {
      apiKey: string;
      plan: PipelinePlan;
      format: OutputFormat;
      triggerContext: TriggerContext;
      videoMetadata: VideoMetadata | null;
      sharedArtifacts: SharedArtifactBundle;
      emit: (event: Record<string, unknown>) => Promise<void>;
    }): Promise<{ stageArtifacts: StageArtifact[]; finalArtifact: FinalOutputArtifact; verification: VerificationSummary }> {
      const stageArtifacts: StageArtifact[] = [];
      const totalStages = options.plan.stages.length;

      await options.emit({ type: 'stage_start', stageId: 'behavior_inventory', stageLabel: 'Extract states and transitions', stageIndex: 1, totalStages });
      const inventory = await generateJson<BehaviorInventory>({
        apiKey: options.apiKey,
        model: options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt: `Return valid JSON only. Extract all observable states and transitions from the attached UI video. Metadata: ${JSON.stringify(options.videoMetadata)}`,
        schema: behaviorInventoryJsonSchema,
        validate: (value) => behaviorInventorySchema.parse(value),
      });
      stageArtifacts.push({ stageId: 'behavior_inventory', stageType: 'structured_json', stageLabel: 'Extract states and transitions', status: 'complete', payload: inventory, createdAt: nowIso(), summary: `${inventory.states.length} states` });
      await options.emit({ type: 'stage_complete', stageId: 'behavior_inventory', stageLabel: 'Extract states and transitions', stageIndex: 1, totalStages, message: `${inventory.states.length} states extracted` });

      await options.emit({ type: 'stage_start', stageId: 'behavior_generate', stageLabel: 'Generate behavioral spec', stageIndex: 2, totalStages });
      const behaviorOutput = await generateText({
        apiKey: options.apiKey,
        model: options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt: `${buildAnalysisPrompt(options.format, options.triggerContext, options.videoMetadata, options.plan.generatorModel.startsWith('kimi') ? 'kimi' : 'precise')}

Behavior inventory:
${JSON.stringify(inventory, null, 2)}

Write the final behavioral output only.`,
        maxOutputTokens: 12000,
        temperature: 0.15,
      });
      stageArtifacts.push({ stageId: 'behavior_generate', stageType: 'text', stageLabel: 'Generate behavioral spec', status: 'complete', payload: behaviorOutput, createdAt: nowIso(), summary: extractOverview(behaviorOutput) });
      await options.emit({ type: 'stage_output', stageId: 'behavior_generate', stageLabel: 'Generate behavioral spec', stageIndex: 2, totalStages, chunk: behaviorOutput });
      await options.emit({ type: 'stage_complete', stageId: 'behavior_generate', stageLabel: 'Generate behavioral spec', stageIndex: 2, totalStages, message: 'Behavioral output generated' });

      await options.emit({ type: 'stage_start', stageId: 'behavior_verify', stageLabel: 'Validate consistency', stageIndex: 3, totalStages });
      const validation = await generateJson({
        apiKey: options.apiKey,
        model: options.plan.verifierModel || options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt: `Return valid JSON only. Validate whether this behavioral output is consistent with the observed states and transitions.
Inventory:
${JSON.stringify(inventory, null, 2)}
Behavior output:
${behaviorOutput.slice(0, 16000)}`,
        schema: behaviorValidationJsonSchema,
        validate: (value) => behaviorValidationSchema.parse(value),
      });
      const verification = verifyBehaviorOutput(validation);
      stageArtifacts.push({ stageId: 'behavior_verify', stageType: 'structured_json', stageLabel: 'Validate consistency', status: 'complete', payload: validation, createdAt: nowIso(), summary: `score ${verification.score}` });
      await options.emit({ type: 'verification', verification });
      await options.emit({ type: 'stage_complete', stageId: 'behavior_verify', stageLabel: 'Validate consistency', stageIndex: 3, totalStages, message: `Behavior score ${verification.score}` });

      let finalOutput = behaviorOutput;
      if (verification.canAutoRevise && options.plan.maxIterations > 0) {
        await options.emit({ type: 'revision_start', iteration: 1, reason: verification.summary });
        await options.emit({ type: 'stage_start', stageId: 'behavior_revise', stageLabel: 'Refine from verification', stageIndex: totalStages, totalStages });
        finalOutput = await generateText({
          apiKey: options.apiKey,
          model: options.plan.generatorModel,
          video: options.sharedArtifacts.video,
          artifacts: options.sharedArtifacts,
          prompt: `Revise this behavioral spec using the findings below. Return only the improved output.
Findings:
${JSON.stringify(verification.findings, null, 2)}
Current output:
${behaviorOutput.slice(0, 16000)}`,
          maxOutputTokens: 12000,
          temperature: 0.1,
        });
        stageArtifacts.push({ stageId: 'behavior_revise', stageType: 'revision', stageLabel: 'Refine from verification', status: 'complete', payload: finalOutput, createdAt: nowIso(), summary: extractOverview(finalOutput) });
        await options.emit({ type: 'stage_complete', stageId: 'behavior_revise', stageLabel: 'Refine from verification', stageIndex: totalStages, totalStages, message: 'Behavior revision complete' });
      }

      const finalArtifact: FinalOutputArtifact = {
        format: options.format,
        content: finalOutput,
        title: 'Deep Behavioral Result',
        overview: extractOverview(finalOutput),
        verification,
      };
      return { stageArtifacts, finalArtifact, verification };
    }

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/ai/gemini-utils.ts
```ts
import type { QualityLevel } from '@/types/analysis';

/**
 * Keep Gemini inline requests comfortably below upstream payload limits.
 * Base64 expansion + prompts + optional frame grids can make "small" videos fail.
 */
export const GEMINI_INLINE_SAFE_LIMIT = 2 * 1024 * 1024;

interface GeminiUploadStrategyOptions {
  quality: QualityLevel;
  fileSize: number;
  agenticMode?: boolean;
  hasAnalysisImages?: boolean;
}

export function shouldUseGeminiFilesUpload({
  quality,
  fileSize,
  agenticMode = false,
  hasAnalysisImages = false,
}: GeminiUploadStrategyOptions): boolean {
  if (quality === 'kimi') return false;

  return agenticMode || hasAnalysisImages || fileSize > GEMINI_INLINE_SAFE_LIMIT;
}

export function normalizeGeminiError(error: unknown): Error {
  const message = error instanceof Error ? error.message : 'Gemini request failed';

  if (
    /Request Entity Too Large/i.test(message)
    || (/not valid JSON/i.test(message) && /Request En/i.test(message))
  ) {
    return new Error(
      'Gemini rejected the inline upload size. The app now routes these analyses through Gemini Files. Please try again.'
    );
  }

  if (/Empty response from Gemini/i.test(message)) {
    return new Error('Gemini returned an empty response. Please try again.');
  }

  return error instanceof Error ? error : new Error(message);
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/tests/video-understanding/planner.test.ts
```ts

import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via --experimental-strip-types
import { createPipelinePlan, getAnalysisFamily } from '../../src/lib/video-understanding/planner.ts';
// @ts-expect-error TS5097 -- Node test runner loads this via --experimental-strip-types
import { buildSharedArtifactBundle } from '../../src/lib/video-understanding/preprocess/shared.ts';

test('routes UI/UX audit to the audit family', () => {
  const artifacts = buildSharedArtifactBundle({
    videoMetadata: { duration: 8, width: 1440, height: 900, size: 1024, mimeType: 'video/mp4', name: 'flow.mp4' },
    triggerContext: 'click',
    fileSize: 1024,
    format: 'ui_ux_audit',
    quality: 'balanced',
  });

  const plan = createPipelinePlan({
    format: 'ui_ux_audit',
    quality: 'balanced',
    deepMode: true,
    artifacts,
    videoMetadata: { duration: 8, width: 1440, height: 900, size: 1024, mimeType: 'video/mp4', name: 'flow.mp4' },
  });

  assert.equal(getAnalysisFamily('ui_ux_audit'), 'audit');
  assert.equal(plan.family, 'audit');
  assert.equal(plan.stages[0]?.id, 'audit_flow');
});

test('routes interaction state machine to the behavior family', () => {
  const artifacts = buildSharedArtifactBundle({
    videoMetadata: { duration: 5, width: 390, height: 844, size: 1024, mimeType: 'video/mp4', name: 'state.mp4' },
    triggerContext: 'hover',
    fileSize: 1024,
    format: 'interaction_state_machine',
    quality: 'balanced',
  });

  const plan = createPipelinePlan({
    format: 'interaction_state_machine',
    quality: 'balanced',
    deepMode: true,
    artifacts,
    videoMetadata: { duration: 5, width: 390, height: 844, size: 1024, mimeType: 'video/mp4', name: 'state.mp4' },
  });

  assert.equal(plan.family, 'behavior');
  assert.equal(plan.stages[0]?.id, 'behavior_inventory');
});

test('chooses Kimi as the generator when quality is Kimi', () => {
  const artifacts = buildSharedArtifactBundle({
    videoMetadata: { duration: 4, width: 1280, height: 720, size: 1024, mimeType: 'video/mp4', name: 'kimi.mp4' },
    triggerContext: 'click',
    fileSize: 1024,
    format: 'ui_ux_audit',
    quality: 'kimi',
  });

  const plan = createPipelinePlan({
    format: 'ui_ux_audit',
    quality: 'kimi',
    deepMode: true,
    artifacts,
    videoMetadata: { duration: 4, width: 1280, height: 720, size: 1024, mimeType: 'video/mp4', name: 'kimi.mp4' },
  });

  assert.equal(plan.generatorModel, 'kimi-k2.5');
  assert.equal(plan.verifierModel, 'kimi-k2.5');
});

test('escalates reconstruct jobs with longer durations to non-simple complexity', () => {
  const artifacts = buildSharedArtifactBundle({
    videoMetadata: { duration: 18, width: 1440, height: 900, size: 1024, mimeType: 'video/mp4', name: 'long.mp4' },
    triggerContext: 'scroll',
    fileSize: 1024,
    frameGridCount: 8,
    format: 'clone_landing_page',
    quality: 'precise',
  });

  const plan = createPipelinePlan({
    format: 'clone_landing_page',
    quality: 'precise',
    deepMode: true,
    artifacts,
    videoMetadata: { duration: 18, width: 1440, height: 900, size: 1024, mimeType: 'video/mp4', name: 'long.mp4' },
  });

  assert.notEqual(plan.complexity, 'simple');
  assert.equal(plan.family, 'reconstruct');
});

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video-understanding/providers/model-registry.ts
```ts
import type { QualityLevel } from '@/types/analysis';
import type { AnalysisFamily, ComplexityTier } from '../artifacts';

export interface ModelCapability {
  id: string;
  label: string;
  multimodalVideo: boolean;
  structuredOutput: boolean;
  toolCalling: boolean;
  caching: boolean;
  streaming: boolean;
  stable: boolean;
}

export const MODEL_REGISTRY: Record<string, ModelCapability> = {
  'kimi-k2.5': {
    id: 'kimi-k2.5',
    label: 'Kimi K2.5',
    multimodalVideo: true,
    structuredOutput: false,
    toolCalling: false,
    caching: false,
    streaming: true,
    stable: false,
  },
  'gemini-3-flash-preview': {
    id: 'gemini-3-flash-preview',
    label: 'Gemini 3 Flash Preview',
    multimodalVideo: true,
    structuredOutput: true,
    toolCalling: true,
    caching: true,
    streaming: true,
    stable: false,
  },
  'gemini-3.1-pro-preview': {
    id: 'gemini-3.1-pro-preview',
    label: 'Gemini 3.1 Pro Preview',
    multimodalVideo: true,
    structuredOutput: true,
    toolCalling: true,
    caching: true,
    streaming: true,
    stable: false,
  },
};

export function getModelCapability(model: string): ModelCapability {
  return MODEL_REGISTRY[model] ?? {
    id: model,
    label: model,
    multimodalVideo: true,
    structuredOutput: false,
    toolCalling: false,
    caching: false,
    streaming: true,
    stable: false,
  };
}

export function resolveGeneratorModel(
  quality: QualityLevel,
  family: AnalysisFamily,
  complexity: ComplexityTier
): string {
  if (quality === 'kimi') {
    return 'kimi-k2.5';
  }

  if (quality === 'precise') {
    if (family === 'reconstruct' || complexity === 'complex') {
      return 'gemini-3.1-pro-preview';
    }
    return 'gemini-3-flash-preview';
  }

  return complexity !== 'simple' && family === 'reconstruct'
    ? 'gemini-3.1-pro-preview'
    : 'gemini-3-flash-preview';
}

export function resolveVerifierModel(
  quality: QualityLevel,
  family: AnalysisFamily,
  complexity: ComplexityTier
): string {
  if (quality === 'kimi') {
    return 'kimi-k2.5';
  }
  if (quality === 'precise' && family === 'reconstruct' && complexity !== 'simple') {
    return 'gemini-3.1-pro-preview';
  }
  return 'gemini-3-flash-preview';
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/ai/agentic-prompts.ts
```ts
import type { OutputFormat, VideoMetadata } from '@/types/analysis';

/**
 * Pass 1: Scene Decomposition
 * Identifies all distinct animation segments, timestamps, and element inventory.
 * Output: strict JSON for downstream passes.
 */
export function buildPass1Prompt(metadata?: VideoMetadata | null): string {
  const duration = metadata?.duration ?? 0;
  const resolution = metadata
    ? `${metadata.width}x${metadata.height}`
    : 'unknown';

  return `You are an expert animation decomposition agent specializing in spatial-temporal video understanding.

## TASK
Watch the video carefully and decompose it into distinct animation scenes/segments.
Identify EVERY animated element—even subtle micro-interactions, background shifts, and decorative motion.

For each scene, extract:
1. Start and end timestamps (video duration: ${duration}s)
2. All animated elements visible in that scene
3. A brief description focusing on CAUSE-AND-EFFECT relationships
   - e.g., "Button press triggers container expansion which cascades into child element stagger"

## OUTPUT FORMAT (strict JSON — output ONLY this JSON block, nothing else)
\`\`\`json
{
  "scenes": [
    {
      "id": "scene_1",
      "name": "Hero content entrance",
      "startTime": 0.0,
      "endTime": 1.2,
      "elements": ["headline", "subtitle", "cta_button", "background_gradient"],
      "description": "Page loads triggering staggered fade-up of hero content. Background gradient shifts from dark to warm as elements enter.",
      "causalChain": "page_load → background_shift → headline_fade_up → subtitle_fade_up(+120ms) → cta_scale_in(+200ms)"
    }
  ],
  "elementInventory": [
    {
      "name": "headline",
      "type": "text",
      "cssSelector": ".hero-headline, h1",
      "initialState": { "opacity": "0", "transform": "translateY(20px)" },
      "finalState": { "opacity": "1", "transform": "translateY(0)" },
      "sceneIds": ["scene_1"]
    }
  ],
  "totalDuration": ${duration},
  "resolution": "${resolution}",
  "animationComplexity": "moderate"
}
\`\`\`

## RULES
- Be exhaustive: list EVERY element that moves, fades, scales, or changes
- Timestamps must be precise to 0.1s
- If elements appear in multiple scenes, list all scene IDs
- Include background/decorative elements, shadows, and blur changes
- For causalChain: use → arrows to show temporal dependencies
- Output ONLY the JSON block, no explanatory text`;
}

/**
 * Pass 2: Deep Motion Analysis
 * Per-scene detailed motion specs with cause-and-effect relationships.
 * Receives Pass 1 decomposition as context.
 */
export function buildPass2Prompt(
  decomposition: string,
  metadata?: VideoMetadata | null
): string {
  const duration = metadata?.duration ?? 0;
  const resolution = metadata
    ? `${metadata.width}x${metadata.height}`
    : 'unknown';

  return `You are an expert motion analysis agent. You understand spatial-temporal relationships in animations—not just what moves, but WHY and HOW each motion connects to the next.

## CONTEXT FROM PASS 1 (Scene Decomposition)
${decomposition.slice(0, 5000)}

## TASK
Re-watch the video and for each scene/element above, extract PRECISE motion specifications.
Focus on:
1. Exact timing curves and easing (cubic-bezier values, not names)
2. Precise pixel/degree/opacity values
3. Transform origins
4. Stagger patterns and overlap timing
5. Cause-and-effect relationships between element animations

## OUTPUT FORMAT
For each scene, provide motion specs in this exact structure:

### Scene: [name] ([startTime]s – [endTime]s)

**Causal Chain:** [describe the temporal dependency chain]

**[Element Name]** (\`[cssSelector]\`)
\`\`\`
Property: transform (translateY)
From: 20px
To: 0px
Duration: 400ms
Delay: 0ms (relative to scene start)
Easing: cubic-bezier(0.16, 1, 0.3, 1)
Transform-origin: center center
\`\`\`

\`\`\`
Property: opacity
From: 0
To: 1
Duration: 350ms
Delay: 0ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
\`\`\`

**Stagger Pattern** (if applicable):
- Base delay: 80ms between children
- Direction: top-to-bottom
- First child delay: 0ms from scene start

**Spatial Relationships:**
- [element A] begins when [element B] reaches 80% of translateY
- Container expands 60ms before children start entering

## RULES
- Use EXACT values: px, deg, ms, cubic-bezier() — never vague terms like "smooth" or "fast"
- If a value is estimated, label it with (est.)
- Colors must be hex or rgba
- Note spring/bounce physics with overshoot percentages if applicable
- Video duration: ${duration}s | Resolution: ${resolution}
- Describe micro-interactions: hover glows, subtle shadows, breathing effects
- Every property change is a separate spec block`;
}

/**
 * Pass 3: Code Generation
 * Generates final implementation using existing format template.
 * Receives Pass 1 + Pass 2 as context.
 */
export function buildPass3Prompt(
  decomposition: string,
  deepAnalysis: string,
  format: OutputFormat,
  formatTemplate: string
): string {
  return `You are an expert animation code generation agent. You have access to a detailed motion analysis from two previous passes. Your job is to generate the final implementation code.

## CONTEXT FROM PREVIOUS ANALYSIS

### Pass 1 — Scene Decomposition:
${decomposition.slice(0, 4000)}

### Pass 2 — Deep Motion Analysis:
${deepAnalysis.slice(0, 6000)}

## TASK
Using the EXACT values from the analysis above, generate the final implementation.
Do NOT re-estimate values. Use the precise cubic-bezier curves, pixel values, durations, and delays from Pass 2.

Follow the output format specification below:

${formatTemplate}

## RULES
- Use the EXACT values from the deep analysis (do not re-estimate or round)
- Include ALL elements from ALL scenes
- Maintain the temporal relationships: staggers, overlaps, causal sequences
- Match the easing curves precisely (cubic-bezier values, not named easings)
- The output must be complete and self-contained
- If the format calls for code, it must be runnable as-is`;
}

/**
 * Pass 4: Self-Verification
 * Re-watches video and compares against generated implementation.
 * Outputs discrepancies, score, and corrections.
 */
export function buildPass4Prompt(
  generatedCode: string,
  decomposition: string
): string {
  return `You are a QA verification agent. Your task is to ensure animation implementation fidelity by re-watching the original video and comparing it against the generated implementation.

## GENERATED IMPLEMENTATION (from Pass 3)
\`\`\`
${generatedCode.slice(0, 6000)}
\`\`\`

## ORIGINAL SCENE DECOMPOSITION (from Pass 1)
${decomposition.slice(0, 3000)}

## TASK
Re-watch the video frame by frame and compare against the generated implementation.

Check for:
1. **Missing animations** — elements that animate in the video but aren't in the code
2. **Timing mismatches** — durations, delays, or staggers that don't match the video
3. **Wrong easing** — different curve feel (spring vs ease, overshoot present/absent)
4. **Incorrect values** — wrong pixel offsets, opacity values, colors, sizes
5. **Missing micro-interactions** — subtle hover effects, shadows, blur transitions
6. **Spatial errors** — wrong direction, wrong transform-origin, wrong axis

## OUTPUT FORMAT (strict JSON — output ONLY this JSON block, nothing else)
\`\`\`json
{
  "overallScore": 85,
  "discrepancies": [
    {
      "element": "cta_button",
      "issue": "Scale animation missing: button has subtle 1.02x scale on hover in video",
      "severity": "minor",
      "suggestedFix": "Add transform: scale(1.02) with 200ms ease-out on hover state"
    }
  ],
  "corrections": [
    "Change headline translateY from 20px to 24px — video shows slightly larger offset",
    "Add box-shadow transition: 0 4px 12px rgba(0,0,0,0.1) → 0 8px 24px rgba(0,0,0,0.15) over 300ms"
  ],
  "summary": "Implementation captures the main animation flow accurately. 2 micro-interactions missing, 1 timing adjustment needed. Overall feel matches the video."
}
\`\`\`

## SCORING GUIDE
- 90-100: Near perfect match, only cosmetic differences
- 75-89: Good match, minor timing/value adjustments needed
- 50-74: Decent match, some animations missing or significantly off
- Below 50: Major discrepancies, core animations missing

## RULES
- Be critical but constructive
- Severity: minor (polish detail), major (visible difference), critical (broken/missing core animation)
- Provide actionable fixes with exact values
- Output ONLY the JSON block, no explanatory text`;
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/ffmpeg/create-grid.ts
```ts
import type { ExtractedFrame } from './extract-frames';

export interface GridOptions {
  columns?: number;
  frameWidth?: number;
  frameHeight?: number;
  addLabels?: boolean;
  backgroundColor?: string;
  labelColor?: string;
}

export interface FrameGrid {
  dataUrl: string;
  base64: string;
  width: number;
  height: number;
  frameCount: number;
}

export async function createFrameGrid(
  frames: ExtractedFrame[],
  options: GridOptions = {}
): Promise<FrameGrid> {
  const {
    columns = 4,
    frameWidth = 480,
    frameHeight = 270,
    addLabels = true,
    backgroundColor = '#ffffff',
    labelColor = '#000000',
  } = options;

  const rows = Math.ceil(frames.length / columns);
  const gridWidth = columns * frameWidth;
  const gridHeight = rows * frameHeight;

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = gridWidth;
  canvas.height = gridHeight;
  const ctx = canvas.getContext('2d')!;

  // Fill background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, gridWidth, gridHeight);

  // Draw each frame
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const col = i % columns;
    const row = Math.floor(i / columns);
    const x = col * frameWidth;
    const y = row * frameHeight;

    // Create image from frame data
    const img = await createImageFromFrame(frame);

    // Draw frame (letterboxed to preserve aspect ratio)
    const scale = Math.min(frameWidth / img.naturalWidth, frameHeight / img.naturalHeight);
    const drawWidth = img.naturalWidth * scale;
    const drawHeight = img.naturalHeight * scale;
    const offsetX = x + (frameWidth - drawWidth) / 2;
    const offsetY = y + (frameHeight - drawHeight) / 2;
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Add label
    if (addLabels) {
      const label = `F${i + 1}`;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(x, y, 40, 24);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(label, x + 8, y + 16);
    }
  }

  const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
  const base64 = dataUrl.split(',')[1];

  return {
    dataUrl,
    base64,
    width: gridWidth,
    height: gridHeight,
    frameCount: frames.length,
  };
}

async function createImageFromFrame(frame: ExtractedFrame): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Copy to regular ArrayBuffer to avoid SharedArrayBuffer issues
    const buffer = new Uint8Array(frame.data).buffer;
    const blob = new Blob([buffer], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load frame image'));
    };

    img.src = url;
  });
}

export function getKeyFrames(
  frames: ExtractedFrame[],
  count: number = 3
): ExtractedFrame[] {
  if (frames.length <= count) {
    return frames;
  }

  const keyFrames: ExtractedFrame[] = [];

  // Always include first frame
  keyFrames.push(frames[0]);

  // Include middle frames evenly distributed
  if (count > 2) {
    const step = Math.floor(frames.length / (count - 1));
    for (let i = 1; i < count - 1; i++) {
      const index = Math.min(i * step, frames.length - 2);
      keyFrames.push(frames[index]);
    }
  }

  // Always include last frame
  keyFrames.push(frames[frames.length - 1]);

  return keyFrames;
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video-understanding/schemas/audit.ts
```ts

import { z } from 'zod';

export const auditSegmentationSchema = z.object({
  primaryGoal: z.string(),
  strengths: z.array(z.string()).default([]),
  risks: z.array(z.string()).default([]),
  steps: z.array(z.object({
    id: z.string(),
    title: z.string(),
    startTime: z.number(),
    endTime: z.number(),
    userIntent: z.string(),
    frictionSignals: z.array(z.string()).default([]),
  })).min(1),
  inferredComplexity: z.enum(['simple', 'moderate', 'complex']).default('moderate'),
});

export type AuditSegmentation = z.infer<typeof auditSegmentationSchema>;

export const auditValidationSchema = z.object({
  score: z.number().min(0).max(100),
  summary: z.string(),
  findings: z.array(z.object({
    issue: z.string(),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    recommendation: z.string(),
  })).default([]),
  canAutoRevise: z.boolean().default(true),
});

export type AuditValidation = z.infer<typeof auditValidationSchema>;

export const auditSegmentationJsonSchema = {
  type: 'object',
  required: ['primaryGoal', 'strengths', 'risks', 'steps', 'inferredComplexity'],
  properties: {
    primaryGoal: { type: 'string' },
    strengths: { type: 'array', items: { type: 'string' } },
    risks: { type: 'array', items: { type: 'string' } },
    steps: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'title', 'startTime', 'endTime', 'userIntent', 'frictionSignals'],
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          startTime: { type: 'number' },
          endTime: { type: 'number' },
          userIntent: { type: 'string' },
          frictionSignals: { type: 'array', items: { type: 'string' } },
        },
      },
    },
    inferredComplexity: { type: 'string', enum: ['simple', 'moderate', 'complex'] },
  },
} as const;

export const auditValidationJsonSchema = {
  type: 'object',
  required: ['score', 'summary', 'findings', 'canAutoRevise'],
  properties: {
    score: { type: 'number' },
    summary: { type: 'string' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        required: ['issue', 'severity', 'recommendation'],
        properties: {
          issue: { type: 'string' },
          severity: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
          recommendation: { type: 'string' },
        },
      },
    },
    canAutoRevise: { type: 'boolean' },
  },
} as const;

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/hooks/use-analysis.ts
```ts
'use client';

import { useState, useCallback } from 'react';
import type {
  AnalysisConfig,
  AnalysisProgress,
  AnalysisResult,
  VideoMetadata,
  ResultsMap,
  OutputFormat,
} from '@/types/analysis';
import { parseAnalysisOutput, extractVerificationReport } from '@/lib/ai/output-parsers';
import { shouldUseGeminiFilesUpload } from '@/lib/ai/gemini-utils';
import { extractFrameFromVideo } from '@/lib/video/extract-frame';
import { extractFrames } from '@/lib/ffmpeg/extract-frames';
import { createFrameGrid } from '@/lib/ffmpeg/create-grid';
import { createSseParser } from '@/lib/streaming/sse';

// 4MB threshold - Vercel body limit is ~4.5MB
// Gemini: files >4MB use Gemini Files API (supports up to 100MB)
// Kimi: files >4MB use R2 → server fetches → base64
const VERCEL_BODY_LIMIT = 4 * 1024 * 1024;
// Kimi videos are sent to /api/analyze as base64 unless we use R2.
// Base64 expands by ~33%, and Deep Analysis also sends a reference image, so keep this conservative.
const KIMI_INLINE_SAFE_LIMIT = 2 * 1024 * 1024;
const MAX_INLINE_REFERENCE_IMAGE_BASE64_LENGTH = 750 * 1024;
const KEYFRAME_EXTRACTION_TIMEOUT_MS = 15000;
const KEYFRAMES_ENABLED = process.env.NEXT_PUBLIC_DISABLE_KEYFRAMES !== 'true';

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`${label} timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    promise
      .then((value) => {
        clearTimeout(timeoutId);
        resolve(value);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        reject(err);
      });
  });
}

interface UseAnalysisReturn {
  isAnalyzing: boolean;
  progress: AnalysisProgress | null;
  result: AnalysisResult | null;
  resultsMap: ResultsMap;
  activeFormat: OutputFormat | null;
  generatedFormats: OutputFormat[];
  streamingContent: string;
  error: string | null;
  thinkingContent: string;
  currentPass: number;
  totalPasses: number;
  passName: string;
  stageLabels: string[];
  analyze: (file: File, metadata: VideoMetadata, config: AnalysisConfig, authToken?: string | null) => Promise<void>;
  switchFormat: (format: OutputFormat) => void;
  reset: () => void;
}

export function useAnalysis(): UseAnalysisReturn {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState<AnalysisProgress | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [resultsMap, setResultsMap] = useState<ResultsMap>({});
  const [activeFormat, setActiveFormat] = useState<OutputFormat | null>(null);
  const [streamingContent, setStreamingContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [thinkingContent, setThinkingContent] = useState('');
  const [currentPass, setCurrentPass] = useState(0);
  const [totalPasses, setTotalPasses] = useState(0);
  const [passName, setPassName] = useState('');
  const [stageLabels, setStageLabels] = useState<string[]>([]);

  // Get list of formats that have been generated
  const generatedFormats = Object.keys(resultsMap) as OutputFormat[];

  const analyze = useCallback(
    async (file: File, metadata: VideoMetadata, config: AnalysisConfig, authToken?: string | null) => {
      setIsAnalyzing(true);
      setError(null);
      setResult(null);
      setStreamingContent('');
      setThinkingContent('');
      setCurrentPass(0);
      setTotalPasses(0);
      setPassName('');
      setStageLabels([]);

      let frameImage: string | undefined;
      let frameGrid: {
        base64: string;
        width: number;
        height: number;
        frameCount: number;
        columns: number;
      } | null = null;

      try {
        // Step 1: Upload progress
        setProgress({ step: 'uploading', message: 'Preparing video...' });

        // Extract a frame from the video (at 30% for a good animation state)
        try {
          frameImage = await extractFrameFromVideo(file, 0.3);
        } catch (frameError) {
          console.warn('Failed to extract frame:', frameError);
          // Continue without frame - it's not critical
        }

        const shouldAttachFrameGrid = KEYFRAMES_ENABLED
          && file.size <= VERCEL_BODY_LIMIT
          && metadata.duration > 0;
        if (shouldAttachFrameGrid) {
          try {
            setProgress({ step: 'extracting', message: 'Extracting keyframes...' });

            const targetFrameSpacingMs = 150;
            const maxFrames = 24;
            const frames = await withTimeout(
              extractFrames(file, {
                durationSeconds: metadata.duration,
                targetFrameSpacingMs,
                maxFrames,
                quality: 3,
                timeoutMs: KEYFRAME_EXTRACTION_TIMEOUT_MS,
              }),
              KEYFRAME_EXTRACTION_TIMEOUT_MS,
              'Keyframe extraction'
            );

            if (frames.length > 0) {
              const aspectRatio = metadata.width > 0 && metadata.height > 0
                ? metadata.width / metadata.height
                : 16 / 9;
              const frameWidth = 320;
              const frameHeight = Math.max(1, Math.round(frameWidth / aspectRatio));
              const columns = 4;

              const grid = await withTimeout(
                createFrameGrid(frames, {
                  columns,
                  frameWidth,
                  frameHeight,
                  addLabels: true,
                }),
                KEYFRAME_EXTRACTION_TIMEOUT_MS,
                'Keyframe grid creation'
              );

              frameGrid = {
                ...grid,
                columns,
              };
            }
          } catch (gridError) {
            console.warn('Failed to extract frame grid:', gridError);
          }
        }

        const formData = new FormData();
        formData.append('format', config.format);
        formData.append('quality', config.quality);
        formData.append('fileSize', file.size.toString());
        formData.append('videoDuration', metadata.duration.toString());
        formData.append('videoWidth', metadata.width.toString());
        formData.append('videoHeight', metadata.height.toString());
        formData.append('videoSize', metadata.size.toString());
        formData.append('videoMimeType', metadata.mimeType);
        formData.append('videoName', metadata.name);
        if (config.triggerContext) {
          formData.append('triggerContext', config.triggerContext);
        }
        const framePreviewBase64 = frameImage?.replace(/^data:image\/\w+;base64,/, '');
        if (framePreviewBase64 && framePreviewBase64.length <= MAX_INLINE_REFERENCE_IMAGE_BASE64_LENGTH) {
          formData.append('framePreviewBase64', framePreviewBase64);
        } else if (framePreviewBase64) {
          console.warn('Skipping oversized reference frame for server upload:', framePreviewBase64.length);
        }
        if (config.agenticMode) {
          formData.append('agenticMode', 'true');
        }
        if (frameGrid) {
          formData.append('frameGridBase64', frameGrid.base64);
          formData.append('frameGridWidth', frameGrid.width.toString());
          formData.append('frameGridHeight', frameGrid.height.toString());
          formData.append('frameGridCount', frameGrid.frameCount.toString());
          formData.append('frameGridColumns', frameGrid.columns.toString());
        }

        const isKimi = config.quality === 'kimi';
        const useR2ForKimi = isKimi && file.size > KIMI_INLINE_SAFE_LIMIT;
        const useGeminiFilesUpload = shouldUseGeminiFilesUpload({
          quality: config.quality,
          fileSize: file.size,
          agenticMode: config.agenticMode,
          hasAnalysisImages: !!frameGrid,
        });
        
        // Large Gemini inline payloads can fail upstream even when they fit through Vercel.
        // Route Gemini through Files API for agentic runs, keyframe-assisted runs, or larger uploads.
        // Kimi still uses inline/R2 because it doesn't support Gemini Files.
        if (useGeminiFilesUpload) {
          setProgress({ step: 'uploading', message: 'Uploading video to Gemini...' });

          const uploadFormData = new FormData();
          uploadFormData.append('file', file);

          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: uploadFormData,
          });

          if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json().catch(() => ({ error: 'Upload failed' }));
            throw new Error(errorData.error || 'Upload failed');
          }

          const uploadResult = await uploadResponse.json();

          formData.append('fileUri', uploadResult.uri);
          formData.append('fileMimeType', uploadResult.mimeType);
        } else if (useR2ForKimi) {
          // R2 path for Kimi (server fetches and converts to base64 for Moonshot).
          // Use a conservative threshold because base64 expansion + reference images can hit request limits.
          setProgress({ step: 'uploading', message: 'Uploading video...' });

          // Get presigned URL
          const urlResponse = await fetch('/api/upload-url', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
            },
            credentials: 'include',
            body: JSON.stringify({
              fileName: file.name,
              contentType: file.type,
              contentLength: file.size,
            }),
          });

          if (!urlResponse.ok) {
            const error = await urlResponse.json().catch(() => ({ error: 'Failed to get upload URL' }));
            if (urlResponse.status === 503) {
              throw new Error('Cloud storage is required for this Kimi video size but is not configured.');
            }
            throw new Error(error.error || 'Failed to get upload URL');
          }

          const { uploadUrl, objectKey } = await urlResponse.json();

          // Upload directly to R2
          setProgress({ step: 'uploading', message: 'Uploading video to cloud storage...' });
          
          const r2Response = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': file.type,
            },
            body: file,
          });

          if (!r2Response.ok) {
            throw new Error('Failed to upload video to storage');
          }

          // Pass R2 object key to analyze endpoint
          formData.append('r2ObjectKey', objectKey);
          formData.append('r2MimeType', file.type);
        } else {
          // For smaller files, use inline base64. Kimi uses a stricter threshold than Vercel's body limit.
          setProgress({ step: 'extracting', message: 'Processing video...' });

          const arrayBuffer = await file.arrayBuffer();
          const base64 = btoa(
            new Uint8Array(arrayBuffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );

          formData.append('videoBase64', base64);
          formData.append('mimeType', file.type);
        }

        // Step 2: Analyzing
        setProgress({ step: 'analyzing', message: 'AI analysis in progress...' });

        // Make streaming request
        const fetchOptions: RequestInit = {
          method: 'POST',
          body: formData,
          credentials: 'include',
        };
        if (authToken) {
          fetchOptions.headers = { 'Authorization': `Bearer ${authToken}` };
        }
        const response = await fetch('/api/analyze', fetchOptions);

        if (!response.ok) {
          let errorMessage = 'Analysis failed';
          // Read response as text first, then try to parse as JSON
          const text = await response.text().catch(() => '');
          
          try {
            const errorData = JSON.parse(text);
            errorMessage = errorData.error || errorMessage;
          } catch {
            // Response is not JSON (e.g., Vercel/nginx error pages)
            if (text.includes('Request Entity Too Large') || response.status === 413) {
              errorMessage = 'Video file is too large. Please try a smaller file.';
            } else if (response.status === 429) {
              errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
            } else if (response.status === 401) {
              errorMessage = 'Session expired. Please refresh the page and try again.';
            } else if (text) {
              errorMessage = text.slice(0, 200);
            }
          }
          throw new Error(errorMessage);
        }

        // Read streaming response
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }

        const decoder = new TextDecoder();
        let fullContent = '';

        const completionPayload: {
          finalArtifact?: {
            overview?: string;
            verification?: AnalysisResult['verificationReport'] & { score?: number };
          };
        } = {};

        const parser = createSseParser((payload: string) => {
          if (!payload || payload === '[DONE]') return;

          try {
            const data = JSON.parse(payload);

            if (data.type === 'progress') {
              setProgress({ step: 'generating', message: data.message });
            } else if (data.type === 'run_created') {
              setStageLabels(Array.isArray(data.stageLabels) ? data.stageLabels : []);
              setTotalPasses(Array.isArray(data.stageLabels) ? data.stageLabels.length : 0);
            } else if (data.type === 'stage_start') {
              const passStepMap: Record<number, AnalysisProgress['step']> = {
                1: 'pass_1_decomposing',
                2: 'pass_2_analyzing',
                3: 'pass_3_generating',
                4: 'pass_4_verifying',
              };
              setCurrentPass(data.stageIndex);
              setTotalPasses(data.totalStages);
              setPassName(data.stageLabel);
              setProgress({
                step: passStepMap[data.stageIndex] || 'analyzing',
                message: `Stage ${data.stageIndex}/${data.totalStages}: ${data.stageLabel}...`,
                currentPass: data.stageIndex,
                totalPasses: data.totalStages,
                passName: data.stageLabel,
              });
            } else if (data.type === 'stage_complete' || data.type === 'pass_complete') {
              if (data.message) {
                setProgress((prev) => prev ? { ...prev, message: data.message } : { step: 'generating', message: data.message });
              }
            } else if (data.type === 'thinking') {
              setThinkingContent((prev) => prev + (data.data || data.chunk || ''));
            } else if (data.type === 'stage_output') {
              fullContent += data.chunk;
              setStreamingContent(fullContent);
            } else if (data.type === 'chunk') {
              fullContent += data.data;
              setStreamingContent(fullContent);
            } else if (data.type === 'verification') {
              // final artifact will attach the full verification object on completion
            } else if (data.type === 'complete') {
              fullContent = data.data;
              completionPayload.finalArtifact = data.finalArtifact || undefined;
              setStreamingContent(fullContent);
            } else if (data.type === 'error') {
              throw new Error(data.message);
            }
          } catch (parseError) {
            console.warn('Failed to parse SSE payload:', parseError);
          }
        });

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          parser.feed(chunk);
        }

        parser.flush();

        // Parse the result and include the extracted frame
        const parsedResult = parseAnalysisOutput(fullContent, config.format);
        const newResult: AnalysisResult = {
          ...parsedResult,
          frameImage,
        };

        // For agentic mode, extract the verification report from Pass 4 output
        if (config.agenticMode) {
          const finalArtifact = completionPayload.finalArtifact;
          const verification = (finalArtifact?.verification as ({ score?: number; overallScore?: number } & NonNullable<AnalysisResult['verificationReport']>) | undefined)
            || extractVerificationReport(fullContent);
          if (verification) {
            const verificationWithScore = verification as { score?: number; overallScore?: number };
            const score = typeof verificationWithScore.score === 'number'
              ? verificationWithScore.score
              : verificationWithScore.overallScore;
            if (typeof score === 'number') {
              newResult.verificationScore = score;
            }
            newResult.verificationReport = verification as AnalysisResult['verificationReport'];
          }
          if (finalArtifact?.overview) {
            newResult.overview = finalArtifact.overview;
          }
        }
        setResult(newResult);
        setResultsMap((prev) => ({
          ...prev,
          [config.format]: newResult,
        }));
        setActiveFormat(config.format);
        setProgress({ step: 'complete', message: 'Analysis complete!' });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Analysis failed';
        setError(message);
        setProgress({ step: 'error', message });
      } finally {
        setIsAnalyzing(false);
      }
    },
    []
  );

  const switchFormat = useCallback((format: OutputFormat) => {
    const formatResult = resultsMap[format];
    if (formatResult) {
      setResult(formatResult);
      setActiveFormat(format);
    }
  }, [resultsMap]);

  const reset = useCallback(() => {
    setIsAnalyzing(false);
    setProgress(null);
    setResult(null);
    setResultsMap({});
    setActiveFormat(null);
    setStreamingContent('');
    setError(null);
    setThinkingContent('');
    setCurrentPass(0);
    setTotalPasses(0);
    setPassName('');
    setStageLabels([]);
  }, []);

  return {
    isAnalyzing,
    progress,
    result,
    resultsMap,
    activeFormat,
    generatedFormats,
    streamingContent,
    error,
    thinkingContent,
    currentPass,
    totalPasses,
    passName,
    stageLabels,
    analyze,
    switchFormat,
    reset,
  };
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video-understanding/schemas/reconstruct.ts
```ts

import { z } from 'zod';

export const sceneDecompositionSchema = z.object({
  scenes: z.array(z.object({
    id: z.string(),
    name: z.string(),
    startTime: z.number(),
    endTime: z.number(),
    elements: z.array(z.string()).default([]),
    description: z.string().default(''),
    causalChain: z.string().default(''),
  })).min(1),
  elementInventory: z.array(z.object({
    name: z.string(),
    type: z.string().default('unknown'),
    cssSelector: z.string().default(''),
    sceneIds: z.array(z.string()).default([]),
  })).default([]),
  totalDuration: z.number().default(0),
  resolution: z.string().default('unknown'),
  animationComplexity: z.enum(['simple', 'moderate', 'complex']).default('moderate'),
});

export type SceneDecomposition = z.infer<typeof sceneDecompositionSchema>;

export const reconstructionVerificationSchema = z.object({
  overallScore: z.number().min(0).max(100),
  discrepancies: z.array(z.object({
    element: z.string(),
    issue: z.string(),
    severity: z.enum(['minor', 'major', 'critical']),
    suggestedFix: z.string(),
  })).default([]),
  corrections: z.array(z.string()).default([]),
  summary: z.string().default(''),
});

export type ReconstructionVerification = z.infer<typeof reconstructionVerificationSchema>;

export const sceneDecompositionJsonSchema = {
  type: 'object',
  required: ['scenes', 'totalDuration', 'resolution', 'animationComplexity'],
  properties: {
    scenes: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'name', 'startTime', 'endTime', 'elements', 'description', 'causalChain'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          startTime: { type: 'number' },
          endTime: { type: 'number' },
          elements: { type: 'array', items: { type: 'string' } },
          description: { type: 'string' },
          causalChain: { type: 'string' },
        },
      },
    },
    elementInventory: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          type: { type: 'string' },
          cssSelector: { type: 'string' },
          sceneIds: { type: 'array', items: { type: 'string' } },
        },
      },
    },
    totalDuration: { type: 'number' },
    resolution: { type: 'string' },
    animationComplexity: { type: 'string', enum: ['simple', 'moderate', 'complex'] },
  },
} as const;

export const reconstructionVerificationJsonSchema = {
  type: 'object',
  required: ['overallScore', 'discrepancies', 'corrections', 'summary'],
  properties: {
    overallScore: { type: 'number' },
    discrepancies: {
      type: 'array',
      items: {
        type: 'object',
        required: ['element', 'issue', 'severity', 'suggestedFix'],
        properties: {
          element: { type: 'string' },
          issue: { type: 'string' },
          severity: { type: 'string', enum: ['minor', 'major', 'critical'] },
          suggestedFix: { type: 'string' },
        },
      },
    },
    corrections: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string' },
  },
} as const;

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/storage/r2.ts
```ts
import { AwsClient } from 'aws4fetch';

// R2 configuration
const R2_ACCOUNT_ID = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'animspec-videos';

// Presigned URL expiration (1 hour)
const URL_EXPIRY_SECONDS = 3600;

let r2Client: AwsClient | null = null;

function getR2Client(): AwsClient {
  if (r2Client) return r2Client;

  if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    throw new Error('Cloudflare R2 credentials not configured');
  }

  r2Client = new AwsClient({
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
    region: 'auto',
    service: 's3',
  });

  return r2Client;
}

function getR2Endpoint(): string {
  if (!R2_ACCOUNT_ID) {
    throw new Error('R2 account ID not configured');
  }
  return `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
}

export function isR2Configured(): boolean {
  return !!(R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY);
}

/**
 * Generate a presigned URL for uploading a video to R2
 */
export async function getUploadPresignedUrl(
  userId: string,
  fileName: string,
  contentType: string,
  contentLength: number
): Promise<{ uploadUrl: string; objectKey: string }> {
  const client = getR2Client();
  const endpoint = getR2Endpoint();

  // Generate unique object key
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const objectKey = `uploads/${userId}/${timestamp}-${sanitizedFileName}`;

  const url = new URL(`${endpoint}/${R2_BUCKET_NAME}/${objectKey}`);
  
  // Add query params for presigned URL
  url.searchParams.set('X-Amz-Expires', URL_EXPIRY_SECONDS.toString());

  // Sign the request
  const signedRequest = await client.sign(
    new Request(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
        'Content-Length': contentLength.toString(),
      },
    }),
    {
      aws: { signQuery: true },
    }
  );

  return {
    uploadUrl: signedRequest.url,
    objectKey,
  };
}

/**
 * Generate a presigned URL for downloading/reading a video from R2
 */
export async function getDownloadPresignedUrl(objectKey: string): Promise<string> {
  const client = getR2Client();
  const endpoint = getR2Endpoint();

  const url = new URL(`${endpoint}/${R2_BUCKET_NAME}/${objectKey}`);
  url.searchParams.set('X-Amz-Expires', URL_EXPIRY_SECONDS.toString());

  const signedRequest = await client.sign(
    new Request(url.toString(), {
      method: 'GET',
    }),
    {
      aws: { signQuery: true },
    }
  );

  return signedRequest.url;
}

/**
 * Delete a video from R2
 */
export async function deleteObject(objectKey: string): Promise<void> {
  const client = getR2Client();
  const endpoint = getR2Endpoint();

  const url = `${endpoint}/${R2_BUCKET_NAME}/${objectKey}`;

  const response = await client.fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok && response.status !== 404) {
    throw new Error(`Failed to delete object: ${response.status}`);
  }
}

/**
 * Fetch video from R2 and return as base64
 */
export async function fetchAsBase64(objectKey: string): Promise<{ base64: string; contentType: string }> {
  const downloadUrl = await getDownloadPresignedUrl(objectKey);
  
  const response = await fetch(downloadUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch from R2: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const contentType = response.headers.get('content-type') || 'video/mp4';

  return { base64, contentType };
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/tests/output-parsers.test.ts
```ts
import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { parseAnalysisOutput } from '../src/lib/ai/output-parsers.ts';

test('copy_design_style preserves the full markdown brief instead of extracting only fenced code', () => {
  const rawOutput = `## Rebuild Summary
- **In 1 sentence:** A clean healthcare intake flow.

## Flow Overview
Step-by-step screen progression and user intent.

## Implementation Kit

\`\`\`css
:root {
  --bg: #ffffff;
}
\`\`\`
`;

  const parsed = parseAnalysisOutput(rawOutput, 'copy_design_style');

  assert.equal(parsed.code, rawOutput);
  assert.equal(parsed.notes, undefined);
  assert.match(parsed.overview, /Rebuild Summary|healthcare intake flow/i);
});

test('clone_component still extracts fenced code for code-first formats', () => {
  const rawOutput = `Build notes before code.

\`\`\`tsx
export function Demo() {
  return <div>Hello</div>;
}
\`\`\`
`;

  const parsed = parseAnalysisOutput(rawOutput, 'clone_component');

  assert.match(parsed.code, /export function Demo/);
  assert.match(parsed.notes ?? '', /Build notes before code/);
});

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/video-understanding/artifacts.ts
```ts
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

```

File: /Users/sanketdongre/Documents/Projects/animspec/docs/deep-analysis-v2-spec.md
```md
# Deep Analysis V2 — Unified Video Understanding Execution Spec

This document is the source of truth for upgrading AnimSpec's optional Deep Analysis workflow from a fixed 4-pass prompt chain into a scalable video-understanding system that can serve current and future use cases. It is intentionally written so a new contributor can start from this file alone and understand what to build, why it matters, where it lives, how to validate it, and how the rollout is staged.

This spec is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept current as implementation proceeds.

## Purpose / Big Picture

After this program is complete, a user who enables Deep Analysis will no longer get one generic expensive flow for every job. Instead, the system will extract reusable video facts once, choose the right analysis family for the requested output, validate intermediate artifacts, refine results when verification finds problems, and use external signals where available. The result should be measurably better outputs for clone-style formats, better audit quality for review formats, and a platform that can absorb future use cases without rewriting the whole stack.

User-visible outcome: the existing “Deep Analyze” toggle remains optional, but when it is enabled the output becomes more reliable, more format-aware, easier to debug, and more defensible. The system should show clearer progress, save cleaner history, and provide verification that actually improves the answer instead of merely commenting on it.

## Progress

- [x] (2026-04-09 10:13Z) Audited the current deep-analysis implementation across `src/app/api/analyze/route.ts`, `src/lib/ai/agentic-pipeline.ts`, `src/lib/ai/agentic-prompts.ts`, `src/lib/ai/prompts.ts`, `src/hooks/use-analysis.ts`, and related type/parser files.
- [x] (2026-04-09 10:13Z) Validated which earlier critique points are correct, which are partially correct, and which need nuance.
- [x] (2026-04-09 10:13Z) Authored this execution spec for the full V2 architecture and phased rollout.
- [ ] Implement Milestone 1: separate pass artifacts, add structured outputs, preserve final artifact purity, and feed verification into revision.
- [ ] Implement Milestone 2: pipeline planner and analysis-family routing.
- [ ] Implement Milestone 3: deterministic preprocessing artifact layer.
- [ ] Implement Milestone 4: closed-loop refinement and adaptive budgets.
- [ ] Implement Milestone 5: external verification for reconstruction formats.
- [ ] Implement Milestone 6: evaluation harness, telemetry, pricing revision, and production hardening.

## Surprises & Discoveries

- Observation: the current deep pipeline concatenates Pass 1, Pass 2, Pass 3, and Pass 4 output into a single `fullResult` string.
  Evidence: `src/app/api/analyze/route.ts` appends every `chunk` event from `runAgenticPipeline()` into one buffer, then stores that entire buffer as `code`.

- Observation: verification is surfaced in the UI, but it does not improve the generated result.
  Evidence: `src/hooks/use-analysis.ts` extracts a verification report from the final output, but `src/lib/ai/agentic-pipeline.ts` never regenerates Pass 3 after Pass 4.

- Observation: the agentic prompts hard-truncate prior-pass context.
  Evidence: `src/lib/ai/agentic-prompts.ts` slices decomposition, deep analysis, and generated code to 3–6K characters before feeding them into later passes.

- Observation: Deep Analysis is currently one motion-first pipeline reused for all Gemini deep jobs, even when the requested format is not fundamentally a motion-reconstruction task.
  Evidence: `runAgenticPipeline()` always executes scene decomposition → motion analysis → code generation → self-verification regardless of `format`.

- Observation: trigger context is collected from the UI and passed into standard Gemini/Kimi prompts, but the agentic 4-pass prompts do not meaningfully integrate it.
  Evidence: `buildAnalysisPrompt()` uses `triggerContext`; `buildPass1Prompt()` / `buildPass2Prompt()` / `buildPass3Prompt()` / `buildPass4Prompt()` do not.

- Observation: large Gemini jobs are now uploaded through Gemini Files once, but each pass still reuses the same video as a fresh model input.
  Evidence: `src/hooks/use-analysis.ts` uploads to `/api/upload` once; `runAgenticPipeline()` still attaches `videoPart` to every pass.

## Decision Log

- Decision: the target architecture will use a shared artifact layer plus multiple pipeline families, not one universal “deep” prompt chain.
  Rationale: reconstruction, audit, and behavior extraction are different reasoning problems and should not be forced through one motion-first sequence.
  Date/Author: 2026-04-09 / Codex

- Decision: the existing `analyses` collection remains the product-facing summary record, while new run-level and artifact-level records are introduced for deep analysis.
  Rationale: this preserves existing history UI and billing integrations while making deep analysis internally observable and extensible.
  Date/Author: 2026-04-09 / Codex

- Decision: deterministic preprocessing comes before heavy model tool-calling.
  Rationale: preprocessing is cheaper, reproducible, and easier to benchmark. Tool-calling is reserved for hard cases and targeted measurement.
  Date/Author: 2026-04-09 / Codex

- Decision: external render-diff verification is first-class only for reconstruction formats.
  Rationale: pixel similarity is a valid truth source for clone-style outputs but not for UI/UX audits, accessibility audits, or state-machine extraction.
  Date/Author: 2026-04-09 / Codex

- Decision: model names must be abstracted behind a capability registry instead of being hardcoded into pipeline logic.
  Rationale: Gemini preview models and feature support change over time. The planner must choose models by capability and environment policy, not raw string constants sprinkled across the codebase.
  Date/Author: 2026-04-09 / Codex

## Outcomes & Retrospective

Initial outcome: the repo now has a concrete design for turning Deep Analysis into a scalable system rather than repeatedly patching the current 4-pass implementation. No product code has been changed by this document alone. The next step is to implement Milestone 1 exactly as described below.

## Context and Orientation

Today’s deep-analysis path starts in `src/hooks/use-analysis.ts`, where the client builds `FormData`, optionally extracts a keyframe grid, and posts to `POST /api/analyze`. The server route in `src/app/api/analyze/route.ts` chooses between standard single-pass generation and agentic mode. Agentic mode is implemented in `src/lib/ai/agentic-pipeline.ts` as a fixed 4-pass Gemini flow. The prompts for those passes live in `src/lib/ai/agentic-prompts.ts`. Format-specific output templates live in `src/lib/ai/prompts.ts`. Parsing and partial verification extraction live in `src/lib/ai/output-parsers.ts`. The saved summary record is defined by `Analysis` in `src/types/database.ts`.

The current system already does several things well: it supports large-file Gemini uploads, streams progress to the UI, distinguishes standard and deep modes, and exposes verification information in the output panel. The weaknesses are architectural rather than cosmetic. The system has no run-level artifact model, no schema-validated intermediate outputs, no regeneration loop after verification, no task-family routing, and no external truth source for reconstruction correctness.

In this document, “artifact” means a typed intermediate product such as a scene map, OCR summary, state inventory, motion map, or verification report. “Pipeline family” means a group of stages optimized for one kind of job: reconstruction, audit, or behavior extraction. “External verification” means a check that is not just the same language model judging its own answer; examples include render-and-diff comparison, deterministic consistency checks, or replayed state transitions.

## Non-Negotiable Product Goals

Deep Analysis V2 must satisfy all of the following:

It must keep the current Deep Analysis toggle optional. Standard mode remains the fast, cheaper path. Deep Analysis becomes the premium correctness-first path.

It must support future use cases without forcing them into the current motion-spec sequence.

It must store intermediate artifacts in a way that helps debugging, evaluation, and future features without polluting the user-facing final answer.

It must be measurable. Every major improvement must be benchmarkable on known videos with latency, cost, success rate, and quality metrics.

It must degrade safely. If an advanced verifier or preprocessor is unavailable, the run should fall back to a lower tier instead of failing the user outright.

## Target Architecture

Deep Analysis V2 has five layers.

The first layer is the request layer. The UI still submits a request to `/api/analyze`, but the route now creates an `AnalysisRun` record and hands orchestration to a planner instead of directly invoking a fixed pipeline.

The second layer is the shared artifact layer. This layer produces reusable signals from video once and makes them available to later stages. These artifacts include keyframes, scene boundaries, OCR text, coarse UI inventory, motion regions, state-change hints, and any user-supplied trigger context.

The third layer is the pipeline planner. The planner looks at the requested format, deep-mode flag, video metadata, and shared artifacts, then chooses an analysis family, a complexity tier, a model strategy, a verification strategy, and a maximum iteration budget.

The fourth layer is the family-specific runner. Reconstruction jobs, audit jobs, and behavior jobs run different stage sequences even though they share base artifacts.

The fifth layer is verification and refinement. For formats where a stronger check exists, the system validates the result, produces a typed verification report, and can request a revision pass. For formats without renderable truth, it still runs consistency and rubric validation with typed outputs.

## Analysis Families

### Reconstruction family

This family is used for formats whose goal is to recreate what is in the video. It includes `clone_ui_animation`, `clone_component`, `clone_landing_page`, `tailwind_animate`, `lottie_rive_export`, `remotion_demo_template`, `figma_motion_spec`, and any future “build this screen/animation” format.

The ideal stage sequence is: artifact extraction, scene/state map, measured motion and style extraction, implementation generation, external verification when possible, and one or two regeneration passes if quality is below target.

### Audit family

This family is used for formats whose goal is critique or recommendations. It includes `ui_ux_audit`, `accessibility_audit`, `performance_budget`, and future review-centric use cases.

The ideal stage sequence is: artifact extraction, flow segmentation, task/intent inference, rubric-driven analysis, issue prioritization, and output synthesis. Motion details still matter, but they are supporting evidence rather than the center of the pipeline.

### Behavior family

This family is used for formats whose goal is to formalize behavior. It includes `interaction_state_machine`, `qa_clone_checklist`, and future behavior-spec use cases.

The ideal stage sequence is: artifact extraction, state inventory, transition inference, guard/action synthesis, internal consistency checks, and final export.

## Shared Artifact Model

Create `src/lib/video-understanding/artifacts.ts` and define the canonical intermediate types there. Every deep run must operate on these typed objects instead of raw prompt text alone.

The core types that must exist are:

    type AnalysisFamily = 'reconstruct' | 'audit' | 'behavior';
    type ComplexityTier = 'simple' | 'moderate' | 'complex';

    interface VideoSourceRef {
      sourceType: 'gemini_file' | 'inline_base64' | 'r2_object';
      uri?: string;
      mimeType: string;
      sizeBytes: number;
      width: number;
      height: number;
      durationSec: number;
      triggerContext: TriggerContext;
    }

    interface SharedArtifactBundle {
      video: VideoSourceRef;
      keyframes: KeyframeArtifact[];
      scenes: SceneArtifact[];
      ocr: OcrArtifact[];
      uiInventory: UiElementArtifact[];
      motion: MotionArtifact[];
      stateHints: StateHintArtifact[];
    }

    interface PipelinePlan {
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

    interface StageArtifact<TPayload> {
      stageId: string;
      stageType: string;
      status: 'pending' | 'running' | 'complete' | 'failed' | 'skipped';
      payload: TPayload;
      createdAt: string;
    }

Do not store large payloads directly on the main `analyses` document. Firestore documents have a hard size limit, and render-diff artifacts or OCR maps can grow quickly. The product-facing summary remains small. Large artifacts go to storage, with Firestore holding metadata and references.

## Persistent Run Model

Extend the data model with two new collections.

Create `analysis_runs` as the orchestration record. This is the canonical record of a single deep-analysis execution. It must include user ID, requested format, family, pipeline version, requested quality, selected models, selected validators, iteration count, status, error summary, final artifact reference, and token/cost telemetry.

Create `analysis_runs/{runId}/artifacts` as a subcollection for artifact metadata. Each metadata document points to either embedded small JSON or a storage path for large JSON/images. The artifact document must include type, stage ID, schema version, storage path if externalized, and a short human-readable summary.

Keep the existing `analyses` collection as a user-facing summary. It should point to `runId` for deep jobs and continue to hold overview, final output, cover image, format, credits used, and created time.

## File and Module Layout

Introduce a new folder tree so the repo stops mixing provider code, prompts, orchestration, and parsing in one flat `src/lib/ai` directory.

Create these new modules:

- `src/lib/video-understanding/planner.ts` for choosing family, complexity, models, and validators.
- `src/lib/video-understanding/orchestrator.ts` for running a plan and emitting typed events.
- `src/lib/video-understanding/artifacts.ts` for shared types.
- `src/lib/video-understanding/preprocess/keyframes.ts` for shared frame extraction policy.
- `src/lib/video-understanding/preprocess/scenes.ts` for scene and step segmentation.
- `src/lib/video-understanding/preprocess/ocr.ts` for OCR extraction.
- `src/lib/video-understanding/preprocess/motion.ts` for motion-region and temporal signals.
- `src/lib/video-understanding/families/reconstruct.ts` for the reconstruction pipeline.
- `src/lib/video-understanding/families/audit.ts` for the audit pipeline.
- `src/lib/video-understanding/families/behavior.ts` for the behavior pipeline.
- `src/lib/video-understanding/providers/model-registry.ts` for model aliases and capability flags.
- `src/lib/video-understanding/verification/reconstruct.ts` for render-diff verification.
- `src/lib/video-understanding/verification/audit.ts` for rubric and consistency validation.
- `src/lib/video-understanding/verification/behavior.ts` for state-transition consistency checks.
- `src/lib/video-understanding/schemas/*.ts` for Zod schemas describing stage outputs.

Existing Gemini and Kimi adapters in `src/lib/ai/gemini.ts` and `src/lib/ai/kimi.ts` should survive initially as low-level provider adapters, then gradually move under the new provider namespace once callers are migrated.

## Deep Analysis Event Model

The SSE layer must stop assuming exactly four passes. Replace fixed pass semantics with generic stage semantics.

Add event types:

    type PipelineEvent =
      | { type: 'run_created'; runId: string; family: AnalysisFamily; complexity: ComplexityTier }
      | { type: 'stage_start'; stageId: string; stageLabel: string; family: AnalysisFamily }
      | { type: 'stage_progress'; stageId: string; message: string }
      | { type: 'stage_output'; stageId: string; chunk: string }
      | { type: 'stage_complete'; stageId: string; summary?: string }
      | { type: 'verification'; report: VerificationSummary }
      | { type: 'revision_start'; iteration: number; reason: string }
      | { type: 'complete'; finalArtifact: FinalOutputArtifact }
      | { type: 'error'; message: string };

The UI in `src/hooks/use-analysis.ts` and `src/components/output/output-panel.tsx` must be updated to display generic stages rather than assuming `pass_1` through `pass_4`. A thin compatibility layer is allowed during migration, but the target state is family/stage-aware progress.

## Milestone 1 — Fix the current pipeline without changing product shape

This milestone keeps the Deep Analysis UI and endpoint shape intact but repairs the worst structural flaws.

Work to perform:

In `src/lib/ai/agentic-prompts.ts`, replace free-form “strict JSON” requests for Pass 1 and Pass 4 with typed schemas defined in `src/lib/video-understanding/schemas/reconstruct.ts`. Use `responseMimeType: 'application/json'` and `responseSchema` in Gemini requests. Use Zod validation after every pass and retry one time if validation fails.

In `src/lib/ai/agentic-pipeline.ts`, stop treating the final output as one long text blob. Return a structured result object like:

    interface ReconstructionRunResult {
      pass1: StageArtifact<SceneDecompositionPayload>;
      pass2: StageArtifact<MotionAnalysisPayload>;
      pass3: StageArtifact<FinalOutputPayload>;
      pass4: StageArtifact<VerificationPayload>;
      finalOutput: string;
      verification: VerificationPayload;
    }

Still stream stage output to the UI, but save final output and verification as separate artifacts.

In `src/app/api/analyze/route.ts`, store the final output from Pass 3 as the user-facing `code`, store verification separately, and if verification finds fixable issues below target score, run one `Pass 3B` revision prompt before completion. This is the first closed loop.

In all agentic prompts, thread `triggerContext`, `videoMetadata`, and analysis family intent explicitly so the expensive path uses the same user hints standard mode already gets.

Acceptance for Milestone 1:

From the repo root:

    npm run build
    npx tsc --noEmit
    node --experimental-strip-types --test tests/*.test.ts tests/*.test.js

Expected behavior after implementation: a deep reconstruction run saves a clean final artifact, exposes verification separately, and performs at least one revision step when verification is below the target threshold.

## Milestone 2 — Add the planner and family routing

This milestone replaces the hardcoded 4-pass assumption with a planner.

Implement `src/lib/video-understanding/planner.ts` with a single exported function:

    export function createPipelinePlan(input: {
      format: OutputFormat;
      quality: QualityLevel;
      deepMode: boolean;
      artifacts: SharedArtifactBundle;
      videoMetadata: VideoMetadata | null;
    }): PipelinePlan

Planner rules for the first version:

- Reconstruction formats route to `reconstruct`.
- Audit formats route to `audit`.
- Behavior formats route to `behavior`.
- Complexity defaults to `simple`, `moderate`, or `complex` using video duration, scene count, OCR density, motion density, and number of moving regions.
- Deep mode always uses the planner, but the planner may choose a lighter strategy internally for simple jobs.
- Standard mode continues to bypass the planner entirely.

Update `/api/analyze` so Deep Analysis calls the planner and dispatches to the right family runner.

Acceptance for Milestone 2: the same Deep Analysis toggle can now produce different stage sequences for a reconstruction format versus `ui_ux_audit` without branching ad hoc inside the route handler.

## Milestone 3 — Deterministic preprocessing artifact layer

This milestone makes video understanding less dependent on “the model noticed it” and more dependent on reusable signals.

Implement these preprocessors:

- Keyframe sampling with timestamps.
- Scene or step boundary detection.
- OCR extraction for visible text.
- Coarse UI inventory extraction from frames: probable buttons, inputs, cards, modals, toasts, lists, nav areas.
- Motion summary: moving regions, rough start/end time, broad motion type.
- State-change hints: hover-like, click-like, loading-like, success-like, error-like transitions.

Start simple. Do not build a heavy computer-vision lab on day one. Use robust heuristics and typed artifacts that can be improved later.

Important design rule: these preprocessors must have stable outputs that can be snapshotted in tests. Even if the underlying algorithm evolves, the artifact schema must remain versioned and comparable.

Acceptance for Milestone 3: deep runs can generate and persist shared artifacts before family-specific analysis begins, and later stages can reference those artifacts rather than raw video alone.

## Milestone 4 — Closed-loop refinement and adaptive budgets

This milestone makes verification useful and prevents runaway costs.

For reconstruction family runs, add a revision loop:

- generate candidate output
- verify
- if below threshold and iteration budget remains, regenerate with targeted corrections
- stop at success or budget cap

For audit and behavior family runs, add consistency refinement rather than render refinement. Example: if the rubric says “CTA unclear but later recommendation ignores CTA copy,” regenerate the audit synthesis only, not the whole run.

The planner must define a maximum iteration budget. Initial defaults:

- reconstruct simple: 1 generation + 1 verification
- reconstruct moderate: 1 generation + 1 verification + 1 revision
- reconstruct complex: 1 generation + 1 verification + up to 2 revisions
- audit: 1 synthesis + 1 validation + 1 targeted revision
- behavior: 1 synthesis + 1 validation + 1 targeted revision

Acceptance for Milestone 4: verification reports change what the system returns, not just what it comments on.

## Milestone 5 — External verification for reconstruction formats

This milestone creates a stronger truth source for clone-style outputs.

Scope this milestone narrowly. External verification applies only to renderable reconstruction outputs first. The first supported set should be `clone_component`, `clone_landing_page`, `clone_ui_animation`, and `tailwind_animate` when the output can be wrapped in a browser harness.

Build a render verifier that:

- creates a temporary render target from the generated output
- uses Playwright to render it headlessly at requested dimensions
- captures frames at selected timestamps
- compares generated frames to source frames using a perceptual metric
- produces a typed verification report with mismatch regions and severity

Do not make render-diff block all formats. If a format is not renderable, the planner must choose a different validator.

Acceptance for Milestone 5: at least one reconstruction format can be rendered and compared against source frames, and the verification result can drive one targeted revision.

## Milestone 6 — Evaluation harness, telemetry, and production hardening

This milestone makes the system measurable and safe to evolve.

Create an evaluation harness under `evals/` with three benchmark suites:

- `evals/reconstruct/`
- `evals/audit/`
- `evals/behavior/`

Each suite must contain representative videos, expected artifact summaries, and scoring logic.

Metrics to capture:

- success rate
- invalid-schema rate
- revision rate
- latency by stage
- token usage by stage
- cost by run
- quality score by family
- user-visible failure modes

Add run telemetry to `analysis_runs` so the app can later answer “which pipeline version is best for which formats?”

Only after telemetry exists should pricing be revisited. The current deep-mode credit model is flat and will become inaccurate once planner-selected strategies vary in cost.

Acceptance for Milestone 6: the team can compare pipeline versions using real benchmark cases and production telemetry rather than gut feel.

## Model Strategy

Introduce `src/lib/video-understanding/providers/model-registry.ts` with stable aliases like `GENERATOR_FAST`, `GENERATOR_DEEP`, `VERIFIER_FAST`, `VERIFIER_DEEP`, and `STRUCTURED_JSON_MODEL`.

The registry must encode capability flags rather than only names. At minimum:

- multimodal video support
- structured output support
- tool-calling support
- caching support
- streaming support
- preview/stable status

Planner decisions must depend on capabilities, not raw names. This allows future migration between Gemini versions without rewriting pipeline logic.

## Caching Strategy

Treat caching as an optimization layer, not a correctness requirement.

Phase 1 should keep a consistent prompt prefix order so implicit caching can help on supported Gemini models.

Phase 3 or later may add explicit cache creation for immutable prefixes such as the video reference plus shared artifact summary. Because cache support is model-dependent, the registry must gate it and the system must fall back safely when unavailable.

## Tool-Calling Strategy

Tool-calling is not the first lever. Use it after deterministic preprocessing exists.

The first tools worth exposing are measurement-oriented and read-only:

- `extractFrame(timestamp)`
- `sampleOcrRegion(regionId)`
- `measureDominantColors(frameId, regionId)`
- `listMotionRegions(sceneId)`
- `describeStateTransition(sceneId)`

Tool-calling is reserved for hard reconstruct jobs or cases where the planner marks uncertainty as high. It must not become the default path for every run.

## Scaling and Runtime Strategy

Milestones 1 and 2 can run in the current Next.js route model.

Milestones 3 through 5 likely exceed what is comfortable in a single synchronous route, especially once OCR, heavy preprocessing, Playwright rendering, and multi-iteration verification are introduced.

Plan for a worker-capable architecture now:

- the route creates a run and streams status
- the orchestrator can run inline at first
- the same orchestrator interface must later support an external worker runtime without changing the UI contract

Do not hardcode “runs only in the route handler” assumptions into the V2 modules.

## Concrete Steps

Before implementation begins, create the new folder tree and type skeletons, then migrate the current 4-pass code behind the new orchestrator with feature flags. The recommended sequence is:

From the repo root:

    mkdir -p src/lib/video-understanding/{families,preprocess,providers,schemas,verification}

Then add the new artifact types, planner, and orchestrator skeletons. Wire `/api/analyze` to call the orchestrator only when `agenticMode` is enabled. Keep standard mode untouched until Milestone 1 is stable.

After each milestone:

    npx tsc --noEmit
    node --experimental-strip-types --test tests/*.test.ts tests/*.test.js
    npm run build

When a milestone adds a new dependency or verifier, add milestone-specific tests before moving on.

## Validation and Acceptance

Validation must happen at three levels.

The first level is compile and unit validation. Every milestone must pass `npx tsc --noEmit`, the repo’s Node tests, and `npm run build`.

The second level is run-level validation. A deep run for one reconstruction format, one audit format, and one behavior format must succeed end-to-end, persist a clean summary record, and expose meaningful verification output.

The third level is benchmark validation. Once `evals/` exists, each milestone that changes planning or verification must be run against the benchmark suite and compared against the previous pipeline version.

Deep Analysis V2 is only accepted when it can answer all of these:

- Can it choose the right family for the requested format?
- Can it produce typed intermediate artifacts that survive validation?
- Can verification improve the answer instead of only commenting on it?
- Can at least one reconstruction format use external render-based verification?
- Can the team measure cost, latency, and quality for changes over time?

## Idempotence and Recovery

All new schema and artifact writes must be additive and versioned. Never overwrite the old `analyses` behavior until the new run model is stable and benchmarked.

Feature flags are required. Introduce a deep-analysis pipeline version flag so the product can roll back from V2 to the current deep mode while preserving newly created run artifacts.

If a preprocessing stage fails, the planner must downgrade the run rather than failing the entire request when safe to do so. Example: if OCR fails, a UI/UX audit may continue with a warning; if render verification fails, a reconstruction run may fall back to LLM-plus-artifact verification.

## Interfaces and Dependencies

The first implementation pass should add only the dependencies that are required to make Milestone 1 and Milestone 2 real. The likely early additions are Zod for schema validation and perhaps a small utility for stable artifact IDs if needed.

Do not add Playwright or heavy image-diff libraries to the product path until Milestone 5 starts. When that milestone begins, prefer widely used, actively maintained tooling that works in Node and can run in a worker environment.

The model registry must be the only place where model names are chosen. The planner consumes capability flags. Family runners request capabilities such as “structured multimodal generator” or “fast verifier”, and the registry resolves them.

## Source Notes

This design assumes the current repo state observed on 2026-04-09 and current public Gemini documentation confirming multimodal video support, structured outputs, function calling, and cache APIs. Before implementing Milestone 5 or model-caching logic, re-check provider docs and record any model-specific constraints in this section.

## Revision Note

Created on 2026-04-09 as the initial execution spec for Deep Analysis V2 after auditing the current pipeline and validating its limits against both the repository code and current Gemini documentation.
```

File: /Users/sanketdongre/Documents/Projects/animspec/src/app/api/analyze/route.ts
```ts
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
import { fetchAsBase64, isR2Configured, deleteObject } from '@/lib/storage/r2';

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
    const fileUri = formData.get('fileUri') as string | null;
    const fileMimeType = formData.get('fileMimeType') as string | null;
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
        const r2Data = await fetchAsBase64(r2ObjectKey);
        videoBase64 = r2Data.base64;
        mimeType = r2MimeType || r2Data.contentType;
        
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

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/ai/prompts.ts
(lines 1-260: Base analysis prompt scaffolding, trigger inference, metadata injection, and format prompt definitions that shape both Gemini and Kimi regular-analysis requests.)
```ts
import type { OutputFormat, QualityLevel, TriggerContext, VideoMetadata } from '@/types/analysis';

const BASE_SYSTEM_PROMPT = `You are an expert animation analyst cum UI & Interaction Designer with a keen eye for detail. Your task is to analyze video/image sequences showing UI animations and extract precise, implementable animation specifications. Capture EVERY visual detail—even subtle ones that might seem minor.

## ANALYSIS PROCESS

1. **IDENTIFY ELEMENTS**: What objects/elements are being animated?
   - Describe their visual appearance (shape, color, size)
   - Note their initial state/position
   - Note their final state/position
   - Include ALL elements, even small icons, decorative shapes, or background elements

2. **VISUAL CHARACTERISTICS** (Extract exact values):

   **Colors:**
   - Extract exact hex codes (e.g., #3B82F6, not "blue")
   - Note color transitions (from #X to #Y)
   - Identify gradients: type (linear/radial), angle, color stops with positions
   - Background colors, border colors, text colors, shadow colors
   - Opacity values for semi-transparent colors (rgba)

   **Typography** (if text is animated):
   - Font size changes (from Xpx to Ypx)
   - Font weight transitions (400 → 700)
   - Letter spacing / tracking changes
   - Line height adjustments
   - Text color transitions
   - Text shadow animations
   - Text reveal effects (clip, mask, character-by-character)
   - Underline/decoration animations

   **Borders & Outlines:**
   - Border width, style, color, and radius
   - Border radius changes (e.g., 4px → 24px for pill effect)
   - Outline animations (focus rings)

   **Shadows & Depth:**
   - Box shadows: offset-x, offset-y, blur, spread, color
   - Shadow transitions (elevation changes)
   - Drop shadows vs box shadows
   - Inner shadows (inset)
   - Multiple shadow layers

   **Backgrounds:**
   - Solid color, gradient, or image
   - Background position/size animations
   - Background blur (backdrop-filter)
   - Pattern or texture movements

3. **DETECT MOTION TYPES**: For each element, identify:
   - Translation (movement in X/Y/Z) — note exact pixel distances
   - Rotation (degrees, axis, transform-origin)
   - Scale (from/to values, e.g., 1 → 1.05 for subtle growth)
   - Opacity (fade in/out, exact values like 0 → 1 or 0.5 → 1)
   - Skew/perspective transforms
   - Color/fill changes with exact values
   - Deformation (morph, path animation, clip-path changes)
   - Filter effects (blur amount, brightness, contrast, saturate, hue-rotate)

4. **SUBTLE MOVEMENTS** (Don't miss these!):
   - Micro-interactions (tiny scale bumps like 1 → 1.02)
   - Hover lifts (small Y translations like -2px)
   - Breathing effects (subtle pulsing scale)
   - Shimmer/shine effects moving across surfaces
   - Icon rotations or bounces
   - Cursor/pointer feedback animations
   - Ripple or wave effects
   - Particle effects or confetti
   - Loading skeleton pulse animations
   - Progress indicator movements
   - Tooltip/popover enter/exit
   - Focus ring expansion
   - Button press depth effect (scale 0.98)
   - Shake/wiggle for errors
   - Checkmark draw-on animations
   - Counter/number roll animations

5. **TIMING ANALYSIS**: Extract temporal information:
   - Total duration (estimate from frame count if not provided)
   - Per-property timing (which properties animate when)
   - Delays between elements (stagger patterns)
   - Easing curves (linear, ease-in, ease-out, ease-in-out, spring, bounce)
   - Overlapping animations (properties that animate simultaneously vs sequentially)

6. **SEQUENCE STRUCTURE**:
   - Are animations sequential or parallel?
   - Are there distinct phases/keyframes?
   - Is there looping? What type (infinite, ping-pong, count)?
   - Choreography of multiple elements (what triggers what)

## EASING DETECTION

Identify the easing curve from visual motion patterns:

**Named Easings:**
- ease-in: Starts slow, accelerates
- ease-out: Starts fast, decelerates
- ease-in-out: Slow start and end
- linear: Constant speed

**Cubic Bezier (provide values):**
- cubic-bezier(0.4, 0, 0.2, 1) - standard ease
- cubic-bezier(0.34, 1.56, 0.64, 1) - spring overshoot

**Spring Physics (if detected):**
- Overshoot: Element goes past target then settles
- Oscillation: Bounces before rest
- Encode as: spring(stiffness: 300, damping: 24, mass: 1)

**Step Functions:**
- steps(N, jump-end) - for frame-by-frame animations

## CRITICAL RULES

1. **Be Precise**: Use exact values (px, %, degrees) not vague descriptions
2. **Colors Must Be Exact**: Always use hex codes (#RRGGBB) or rgba() — never say "blue" or "darker"
3. **Capture Subtlety**: Even a 2px movement or 0.02 scale change matters for polish
4. **Include Easing**: Always specify easing - it defines the animation's feel
5. **Note Stagger**: If multiple elements animate, note the stagger timing
6. **Identify Loops**: Clearly state if animation loops and how
7. **Describe Spring Physics**: If motion has bounce/overshoot, describe it
8. **Typography Details**: Note font-size, weight, spacing changes if text animates
9. **Shadow Precision**: Full shadow values (x, y, blur, spread, color) for elevation effects
10. **Use Standard Units**:
    - Duration in seconds (s) or milliseconds (ms)
    - Distances in pixels (px) or percentages (%)
    - Rotations in degrees (deg)
    - Opacity from 0 to 1
    - Colors in hex (#3B82F6) or rgba(59, 130, 246, 0.5)
    - Font sizes in px or rem
    - Font weights as numbers (400, 500, 600, 700)
11. **Break Down Complex Animations**: Multi-step animations should be clearly sequenced
12. **Don't Overlook**: Background changes, border-radius morphs, filter effects, text animations`;

const ACCURACY_PROTOCOL_PROMPT = `
## CLONING ACCURACY PROTOCOL

1. Use one coordinate system (X right, Y down). Call out the origin you assume.
2. Use the provided video duration to convert percentages into seconds.
3. Prefer pixel values; if you must use %, anchor them to the provided resolution.
4. Match total duration to the video duration (or loop period if it clearly loops).
5. Do not invent elements that are not visible.
6. If you estimate a value, label it as an estimate.`;

function formatBytes(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  if (!Number.isFinite(mb)) return `${bytes} B`;
  return `${mb.toFixed(2)} MB`;
}

function buildVideoMetadataPrompt(metadata: VideoMetadata): string {
  const duration = Number.isFinite(metadata.duration) ? metadata.duration.toFixed(3) : 'unknown';
  const width = Number.isFinite(metadata.width) ? Math.round(metadata.width) : 'unknown';
  const height = Number.isFinite(metadata.height) ? Math.round(metadata.height) : 'unknown';
  const size = Number.isFinite(metadata.size) ? formatBytes(metadata.size) : 'unknown';
  const mimeType = metadata.mimeType || 'unknown';
  const name = metadata.name || 'unknown';

  return `
## VIDEO METADATA (Use for timing + scale)
- Duration: ${duration}s
- Resolution: ${width}x${height} px
- File size: ${size}
- MIME type: ${mimeType}
- File name: ${name}`;
}

const TRIGGER_INFERENCE_PROMPT = `
## TRIGGER DETECTION

Infer the animation trigger from visual patterns:

| Visual Pattern | Inferred Trigger |
|----------------|------------------|
| Cursor visible → element changes | hover or click |
| Page scroll visible | scroll / scrollIntoView |
| Element appears after delay | load / mount |
| Sequence of staggered elements | stagger on parent |
| Form field focus indicator | focus |
| Button press feedback | active / click |
| Modal appearing | open state change |

If trigger cannot be determined, output:
**Trigger:** unknown (recommend: provide trigger context)`;

export const FORMAT_PROMPTS: Record<OutputFormat, string> = {
  clone_ui_animation: `
## OUTPUT FORMAT: Clone This Animation

Generate a spec that captures every detail needed to recreate this animation perfectly.

Required structure:

## Overview
[1 sentence: what this animation does and where it's used]

## Trigger
[hover / click / scroll / load / focus — state confidence if inferred]

## Elements

**[Element 1 Name]**
- Selector: \`.suggested-class\` or \`[data-element]\`
- Size: [W]px × [H]px
- Colors: background #XXXXXX, border #XXXXXX, text #XXXXXX
- Border radius: [X]px
- Shadow: \`[exact box-shadow value]\`
- Z-index: [if layered]

[Repeat for each animated element]

## Animation Sequence

**[Element 1 Name]**
\`\`\`
Initial:  { opacity: X, transform: translateY(Xpx) scale(X), background: #XXX }
Final:    { opacity: X, transform: translateY(Xpx) scale(X), background: #XXX }
Duration: [X]ms
Delay:    [X]ms
Easing:   cubic-bezier(X, X, X, X)  /* or spring(stiffness: X, damping: X) */
\`\`\`

[Repeat for each element — include ALL animated properties]

## Stagger Pattern
[If multiple elements: describe the timing relationship — e.g., "Each card delays 80ms after previous"]

## Micro-details
[List the subtle touches that make this feel polished — the 2px lift, the 0.02 scale bump, the shadow fade, etc.]

## Implementation

\`\`\`css
/* CSS approach — or use GSAP/Framer Motion if spring physics required */
\`\`\`

## The Details That Matter
- [ ] [Specific detail to nail]
- [ ] [Specific detail to nail]
- [ ] [Specific detail to nail]
[6-10 items — these are what separate a good clone from a perfect one]`,

  clone_component: `
## OUTPUT FORMAT: Clone This Component

Generate a complete spec to recreate this component with pixel-perfect accuracy.

Required structure:

## Overview
[1 sentence: what this component is]

## Dimensions & Layout
- Container: [W] × [H] (or min/max constraints)
- Padding: [top] [right] [bottom] [left]
- Layout: [flex/grid] with [gap]px gap
- Alignment: [how children are aligned]

## Colors
| Element | Property | Value |

```

(lines 2270-2323: Model-specific guidance plus buildAnalysisPrompt(), buildUserPrompt(), and getFormatTemplate() used by regular and deep analysis generation.)
```ts
## MODEL GUIDANCE (Kimi K2.5)
You are running on Kimi K2.5, which excels at holistic visual reproduction and code generation.
Lean into these strengths:
- Prioritise producing complete, runnable code that visually matches the video.
- For colors, shadows, typography, and layout — aim for exact visual fidelity.
- For motion timing: provide your best estimates and label uncertainties (e.g., "~300ms (estimated)").
- Focus on the overall feel and visual result rather than frame-by-frame temporal decomposition.
- When generating React components, produce a single self-contained file that works out of the box.`;

export function buildAnalysisPrompt(
  format: OutputFormat,
  triggerContext: TriggerContext,
  metadata?: VideoMetadata | null,
  quality?: QualityLevel
): string {
  let prompt = BASE_SYSTEM_PROMPT;

  // Add trigger context
  if (triggerContext) {
    prompt += `\n\n**User-provided trigger context:** The animation triggers on "${triggerContext}". Factor this into your analysis and output.`;
  } else {
    prompt += `\n\n${TRIGGER_INFERENCE_PROMPT}`;
  }

  if (metadata) {
    prompt += `\n\n${buildVideoMetadataPrompt(metadata)}`;
  }

  prompt += `\n\n${ACCURACY_PROTOCOL_PROMPT}`;

  // Add use-case prompt
  prompt += `\n\n${FORMAT_PROMPTS[format]}`;

  // Add model-specific guidance
  if (quality === 'kimi') {
    prompt += `\n\n${KIMI_MODEL_GUIDANCE}`;
  } else if (quality) {
    prompt += `\n\n${GEMINI_MODEL_GUIDANCE}`;
  }

  return prompt;
}

export function buildUserPrompt(
  videoDescription: string = 'Analyze this video and produce the requested clone pack'
): string {
  return `${videoDescription}

Be precise with values and timings. If you estimate, label it as an estimate.`;
}

export function getFormatTemplate(format: OutputFormat): string {
  return FORMAT_PROMPTS[format] || FORMAT_PROMPTS['clone_ui_animation'];
}

```
</file_contents>
<meta prompt 1 = "[Architect]">
You are producing an implementation-ready technical plan. The implementer will work from your plan without asking clarifying questions, so every design decision must be resolved, every touched component must be identified, and every behavioral change must be specified precisely.

Your job:
1. Analyze the requested change against the provided code — identify the relevant architecture, constraints, data flow, and extension points.
2. Decide whether this is best solved by a targeted change or a broader refactor, and justify that decision.
3. Produce a plan detailed enough that an engineer can implement it file-by-file without making design decisions of their own.

Hard constraints:
- Do not write production code, patches, diffs, or copy-paste-ready implementations.
- Stay in analysis and architecture mode only.
- Use illustrative snippets, interface shapes, sample signatures, state/data shapes, or pseudocode when they communicate the design more precisely than prose. Keep them partial — enough to remove ambiguity, not enough to copy-paste.
- Scale your response to the complexity of the request. Small, localized changes need short plans; only expand sections for changes that genuinely require the detail.

─── ANALYSIS ───

Current-state analysis (always include):
- Map the existing responsibilities, type relationships, ownership, data flow, and mutation points relevant to the request.
- Identify existing code that should be reused or extended — never duplicate what already exists without justification.
- Note hard constraints: API contracts, protocol conformances, state ownership rules, thread/actor isolation, persistence schemas, UI update mechanisms.
- When multiple subsystems interact, trace the call chain end-to-end and identify each transformation boundary.

─── DESIGN ───

Design standards — address only the standards relevant to the change; skip sections that don't apply:

1. New and modified components/types: For each, specify:
   - The name, kind (for example: class, interface, enum, record, service, module, controller), and why that kind fits the codebase and language.
   - The fields/properties/state it owns, including data shape, mutability, and ownership/lifecycle semantics.
   - Key callable interfaces or signatures, including inputs, outputs, and whether execution is synchronous/asynchronous or can fail.
   - Contracts it implements, extends, composes with, or depends on.
   - For closed sets of variants (for example enums, tagged unions, discriminated unions): all cases/variants and any attached data.
   - Where the component lives (file path) and who creates/owns its instances.

2. State and data flow: For each state change the plan introduces or modifies:
   - What triggers the change (user action, callback, notification, timer, stream event).
   - The exact path the data travels: source → transformations → destination.
   - Thread/actor/queue context at each step.
   - How downstream consumers observe the change (published property, delegate, notification, binding, callback).
   - What happens if the change arrives out of order, is duplicated, or is dropped.

3. API and interface changes: For each modified public/internal interface:
   - The before and after signatures (or new signature if additive).
   - Every call site that must be updated, grouped by file.
   - Backward-compatibility strategy if the interface is used by external consumers or persisted data.

4. Persistence and serialization: When the plan touches stored data:
   - Schema changes with exact field names, types, and defaults.
   - Migration strategy: how existing data is read, transformed, and re-persisted.
   - What happens when new code reads old data and when old code reads new data (if rollback is possible).

5. Concurrency and lifecycle:
   - Specify the execution model and safety boundaries for each new/modified component: thread affinity, event-loop/runtime constraints, isolation boundaries, queue/worker discipline, or thread-safety expectations as applicable.
   - Identify potential races, leaked references/resources, or lifecycle mismatches introduced by the change.
   - When operations are asynchronous, specify cancellation/abort behavior and what state remains after interruption.

6. Error handling and edge cases:
   - For each operation that can fail, specify what failures are possible and how they propagate.
   - Describe degraded-mode behavior: what the user sees, what state is preserved, what recovery is available.
   - Identify boundary conditions: empty collections, missing/null/optional values, first-run states, interrupted operations.

7. Algorithmic and logic-heavy work (include whenever the change involves non-trivial control flow, state machines, data transformations, or performance-sensitive paths):
   - Describe the algorithm step-by-step: inputs, outputs, invariants, and data structures.
   - Cover edge cases, failure modes, and performance characteristics (time/space complexity if relevant).
   - Explain why this approach over the most plausible alternatives.

8. Avoid unnecessary complexity:
   - Do not add layers, abstractions, or indirection without a concrete benefit identified in the plan.
   - Do not create parallel code paths — unify where possible.
   - Reuse existing patterns unless those patterns are themselves the problem.

─── OUTPUT ───

Structure your response as:

1. **Summary** — One paragraph: what changes, why, and the high-level approach.

2. **Current-state analysis** — How the relevant code works today. Trace the data/control flow end-to-end. Identify what is reusable and what is blocking.

3. **Design** — The core of the plan. Apply every applicable standard from above. Organize by logical component or subsystem, not by standard number. Each component section should cover types, state flow, interfaces, persistence, concurrency, and error handling as relevant to that component.

4. **File-by-file impact** — For every file that changes, list:
   - What changes (added/modified/removed types, methods, properties).
   - Why (which design decision drives this change).
   - Dependencies on other changes in this plan (ordering constraints).

5. **Risks and migration** — Include only when the change introduces breaking changes, data migration, or rollback concerns. Omit for additive or non-breaking work.

6. **Implementation order** — A numbered sequence of steps. Each step should be independently compilable and testable where possible. Call out steps that must be atomic (landed together).

Response discipline:
- Be specific to the provided code — reference actual type names, file paths, method names, and property names.
- Make every assumption explicit.
- Flag unknowns that must be validated during implementation, with a suggested validation approach.
- When a design decision has a non-obvious rationale, explain it in one sentence.
- Do not pad with generic advice. Every sentence should convey information the implementer needs.

Please proceed with your analysis based on the following <user instructions>
</meta prompt 1>
<user_instructions>
<taskname="Video AI audit"/>
<task>Investigate Gemini video understanding and Kimi 2.5 video understanding in detail, ideally with current official docs and recent sources if web access is available, then compare those findings against this repo’s current implementation for both regular analysis and deep analysis. Identify concrete robustness issues, provider mismatch risks, parsing/validation gaps, upload/runtime limits, and implementation fixes needed to avoid analysis failures, JSON failures, and system-level failures across diverse videos.</task>

<architecture>The app has two analysis paths. Standard mode flows from client upload prep in `src/hooks/use-analysis.ts` to `POST /api/analyze` in `src/app/api/analyze/route.ts`, which dispatches to either Gemini adapters in `src/lib/ai/gemini.ts` or the Kimi adapter in `src/lib/ai/kimi.ts`. Deep mode has two implementations: legacy Gemini-only 4-pass agentic mode in `src/lib/ai/agentic-pipeline.ts` + `src/lib/ai/agentic-prompts.ts`, and the newer V2 planner/orchestrator path under `src/lib/video-understanding/**` driven by `runDeepAnalysis()`.

Prompt construction for provider calls lives in `src/lib/ai/prompts.ts` (selected slices only). Parsing of standard outputs and legacy deep verification extraction lives in `src/lib/ai/output-parsers.ts`. Upload routing thresholds are split across client logic, Gemini Files upload in `src/app/api/upload/route.ts`, and Kimi/R2 presigned upload flow in `src/app/api/upload-url/route.ts` + `src/lib/storage/r2.ts`.

Deep Analysis V2 uses `planner.ts` to choose family/model/stages, `orchestrator.ts` to emit stage-based SSE events, `preprocess/shared.ts` to synthesize shared artifacts, `providers/gemini-runner.ts` as the real provider abstraction for Gemini and Kimi, family runners in `families/*.ts`, typed schemas in `schemas/*.ts`, and verification logic in `verification/*.ts`. Persistence is in `persistence/run-store.ts`. The spec doc `docs/deep-analysis-v2-spec.md` explains intended architecture and already calls out several shortcomings in the old deep flow.</architecture>

<selected_context>
docs/deep-analysis-v2-spec.md: detailed intent/source-of-truth for Deep Analysis V2, including explicit critique of the old 4-pass pipeline and milestones for structured outputs, planning, verification, and robustness.
docs/R2_SETUP.md: intended size-routing model: small inline, medium via R2, large via Gemini Files.
src/hooks/use-analysis.ts: client-side thresholds, frame extraction/grid creation, Gemini Files vs Kimi R2 routing, SSE parsing, and final parse/verification handling.
src/app/api/analyze/route.ts: main server orchestration; branches between standard Gemini/Kimi, legacy agentic Gemini, and V2 deep pipeline; also converts R2 objects back to base64 before Kimi.
src/app/api/upload/route.ts: Gemini Files upload and polling.
src/app/api/upload-url/route.ts: Kimi/R2 presigned upload setup.
src/lib/ai/gemini.ts: regular Gemini video analysis adapters, model/config mapping, inline vs file parts, streaming.
src/lib/ai/kimi.ts: regular Kimi adapter using Moonshot-compatible OpenAI chat completions with `video_url` + `image_url` data URIs.
src/lib/ai/gemini-utils.ts: Gemini upload threshold and basic error normalization.
src/lib/ai/prompts.ts: base prompt scaffolding and `buildAnalysisPrompt()`/model-specific prompt guidance.
src/lib/ai/output-parsers.ts: standard output parsing and legacy deep verification JSON extraction from concatenated text.
src/lib/ai/agentic-pipeline.ts: old deep Gemini-only 4-pass pipeline that re-attaches video every pass and returns one concatenated text stream.
src/lib/ai/agentic-prompts.ts: pass prompts with strict-JSON requests for pass 1 and 4 plus aggressive truncation of pass context.
src/lib/video-understanding/orchestrator.ts: V2 deep-run entrypoint, stage event emission, family dispatch.
src/lib/video-understanding/planner.ts: family selection, complexity heuristic, generator/verifier selection.
src/lib/video-understanding/preprocess/shared.ts: current shared artifacts are heuristics/placeholders, not real video understanding.
src/lib/video-understanding/providers/gemini-runner.ts: actual deep provider abstraction; includes Gemini structured output path, Kimi text fallback path, JSON extraction/retry behavior, Kimi inline-only deep constraint.
src/lib/video-understanding/providers/model-registry.ts: hardcoded capability registry and model-name routing.
src/lib/video-understanding/families/reconstruct.ts: reconstruct deep flow with JSON scene map, streamed motion/generation, JSON verification, optional revision, optional render-diff.
src/lib/video-understanding/families/audit.ts: audit deep flow with segmentation, text synthesis, JSON validation, optional revision.
src/lib/video-understanding/families/behavior.ts: behavior deep flow with state inventory, text synthesis, JSON validation, optional revision.
src/lib/video-understanding/schemas/*.ts: Zod + JSON schemas for reconstruct/audit/behavior intermediates.
src/lib/video-understanding/verification/*.ts: deterministic/LLM verification merge logic, including render-diff.
src/lib/video-understanding/persistence/run-store.ts: run/artifact persistence and size handling.
src/types/analysis.ts and src/types/database.ts: quality levels, output formats, progress model, verification/result types, run persistence types.
tests/gemini-utils.test.ts, tests/output-parsers.test.ts, tests/run-store.test.ts, tests/video-understanding/planner.test.ts, tests/sse-parser.test.js: current regression coverage boundaries.
</selected_context>

<relationships>
- `use-analysis.ts` decides upload path before the request: Gemini deep/with keyframes/over threshold => `/api/upload`; Kimi over 2MB => `/api/upload-url` + R2; otherwise inline base64.
- `/api/analyze` is the convergence point: it may fetch R2 back into base64, then choose standard Gemini/Kimi, legacy `runAgenticPipeline()`, or V2 `runDeepAnalysis()`.
- Standard Gemini uses `buildAnalysisPrompt()` + `buildUserPrompt()` from `prompts.ts`, while Kimi regular analysis uses the same prompt builder but a different transport/message shape in `kimi.ts`.
- Legacy deep mode is Gemini-only and streams mixed outputs from all passes into one `fullResult`; the client then tries to recover verification JSON from that combined string via `extractVerificationReport()`.
- V2 deep mode no longer uses `agentic-pipeline.ts`; it uses `planner.ts` + `orchestrator.ts` + family runners + `providers/gemini-runner.ts`.
- `providers/gemini-runner.ts` is the most important file for provider-comparison work: Gemini gets structured JSON via `responseMimeType/responseJsonSchema`; Kimi deep never gets true structured output and instead falls back to prompt-only JSON plus `parseJsonFromText()`.
- `preprocess/shared.ts` fabricates scenes/motion/state hints from metadata/trigger context; family runners consume these artifacts as if they were meaningful evidence.
- `reconstruct.ts` adds an extra verification layer through `verifyReconstructionOutput()` and optional `render-diff.ts`; audit/behavior verifiers are thin wrappers around model-produced scores.
- `run-store.ts` persists artifact payloads inline unless oversized, then spills to storage.
</relationships>

<ambiguities>
- Web research is not embedded here. If web access is available to the next model, verify current Gemini and Moonshot/Kimi product/API details against official docs before recommending fixes.
- Repo naming/marketing references are inconsistent across files: UI copy mentions Gemini 3 / 3.1 / Kimi K2.5, but actual code uses preview Gemini model strings and `kimi-k2.5` everywhere.
- `docs/R2_SETUP.md` says medium files use R2 and large files use Gemini Files, but current client logic uses Gemini Files much more aggressively whenever agentic mode or keyframe images are present.
- Deep-mode product copy suggests Kimi deep analysis exists broadly, but legacy agentic deep mode explicitly excludes Kimi and V2 deep Kimi has inline-only constraints in `providers/gemini-runner.ts`.
- `render-diff.ts` only works when there is a single preview frame and extractable HTML/CSS blocks; it is not a general video verifier.
</ambiguities>

<focus_areas>
- Compare repo assumptions about Gemini Files, inline video limits, structured output support, streaming, thinking config, and file-processing lifecycle against current Gemini docs.
- Compare repo assumptions about Kimi/Moonshot multimodal video support, accepted content shape/order, data-URI size practicality, temperature/thinking rules, max token/runtime expectations, and structured JSON support against current docs.
- Identify mismatches between regular analysis and V2 deep analysis provider handling: regular Kimi in `src/lib/ai/kimi.ts` vs deep Kimi in `providers/gemini-runner.ts` differ materially.
- Inspect failure handling around empty responses, huge payloads, invalid JSON, SSE chunk assembly, and revision loops.
- Call out where placeholder preprocessing or weak verification makes the system appear robust while actually being brittle.
- Propose concrete code-level fixes and test gaps, but do not implement them in this handoff.</focus_areas>
</user_instructions>
