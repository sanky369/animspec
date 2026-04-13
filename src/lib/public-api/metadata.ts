import {
  OUTPUT_FORMATS,
  QUALITY_LEVELS,
  TRIGGER_CONTEXTS,
  type OutputFormat,
  type QualityLevel,
} from '@/types/analysis';
import { AGENTIC_CREDIT_COSTS, CREDIT_COSTS } from '@/types/database';

export const MAX_VIDEO_SIZE_BYTES = 100 * 1024 * 1024;
export const GEMINI_INLINE_SIZE_LIMIT = 20 * 1024 * 1024;

export const ACCEPTED_VIDEO_MIME_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-matroska',
] as const;

export const ACCEPTED_VIDEO_EXTENSIONS: Record<string, string> = {
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.avi': 'video/x-msvideo',
  '.mkv': 'video/x-matroska',
};

export interface FormatMetadata {
  label: string;
  description: string;
  bestFor: string;
}

export const FORMAT_METADATA: Record<OutputFormat, FormatMetadata> = {
  clone_ui_animation: {
    label: 'Clone UI Animation',
    description: 'Recreate motion, timing, easing, and sequencing with implementation-ready guidance.',
    bestFor: 'Micro-interactions, transitions, loaders, polished UI motion',
  },
  clone_component: {
    label: 'Clone UI Component',
    description: 'Generate a structured component build spec for the UI shown in the clip.',
    bestFor: 'Buttons, cards, menus, modals, widgets, nav patterns',
  },
  clone_landing_page: {
    label: 'Clone Landing Page',
    description: 'Reconstruct the layout, sections, and motion language of a landing page.',
    bestFor: 'Marketing pages, heroes, pricing sections, feature grids',
  },
  copy_design_style: {
    label: 'Copy Design Style',
    description: 'Extract the visual system so agents can apply that style to another product.',
    bestFor: 'Redesign work, visual refreshes, style transfer',
  },
  extract_design_tokens: {
    label: 'Extract Design Tokens',
    description: 'Pull out palette, spacing, typography, elevation, and shape rules.',
    bestFor: 'Design systems, theming, token setup',
  },
  remotion_demo_template: {
    label: 'Remotion Demo Template',
    description: 'Generate reusable guidance for creating product demo videos in the same style.',
    bestFor: 'Product demo videos, animated explainers',
  },
  qa_clone_checklist: {
    label: 'QA Clone Checklist',
    description: 'Generate acceptance criteria to verify that a recreation matches the source clip.',
    bestFor: 'QA handoff, parity reviews, finish checks',
  },
  accessibility_audit: {
    label: 'Accessibility Audit',
    description: 'Review motion, readability, interaction feedback, and WCAG-relevant behavior.',
    bestFor: 'Inclusive design and accessibility reviews',
  },
  ui_ux_audit: {
    label: 'UI/UX Audit',
    description: 'Review clarity, hierarchy, friction points, and overall product experience.',
    bestFor: 'UX critique, onboarding review, interface feedback',
  },
  interaction_state_machine: {
    label: 'Interaction State Machine',
    description: 'Infer states, transitions, guards, and actions from the observed behavior.',
    bestFor: 'Complex components, reducers, XState-style modeling',
  },
  performance_budget: {
    label: 'Performance Budget',
    description: 'Highlight likely performance risks and practical motion-performance constraints.',
    bestFor: 'Animation performance tuning and implementation planning',
  },
  lottie_rive_export: {
    label: 'Lottie / Rive Export',
    description: 'Translate observed motion into animation-export-oriented instructions.',
    bestFor: 'Motion graphics pipelines and interactive animation systems',
  },
  storyboard_breakdown: {
    label: 'Storyboard Breakdown',
    description: 'Break the clip into key moments, timing, and state changes.',
    bestFor: 'Documentation, handoff, frame-by-frame reviews',
  },
  tailwind_animate: {
    label: 'Tailwind Animate',
    description: 'Create Tailwind-friendly keyframes, utilities, and animation guidance.',
    bestFor: 'Tailwind CSS projects and UI motion implementation',
  },
  react_native_reanimated: {
    label: 'React Native Reanimated',
    description: 'Generate React Native motion guidance using Reanimated patterns.',
    bestFor: 'Mobile interfaces and native-feeling interaction work',
  },
  figma_motion_spec: {
    label: 'Figma Motion Spec',
    description: 'Translate motion into Figma-oriented states, variants, and prototype behavior.',
    bestFor: 'Design handoff and prototype specs',
  },
};

export function isOutputFormat(value: string): value is OutputFormat {
  return (OUTPUT_FORMATS as readonly string[]).includes(value);
}

export function isQualityLevel(value: string): value is QualityLevel {
  return (QUALITY_LEVELS as readonly string[]).includes(value);
}

export function isTriggerContext(value: string): value is (typeof TRIGGER_CONTEXTS)[number] {
  return (TRIGGER_CONTEXTS as readonly string[]).includes(value);
}

export function buildFormatsMarkdown(): string {
  return OUTPUT_FORMATS.map((format) => {
    const meta = FORMAT_METADATA[format];
    return `**${format}** - ${meta.label}\n${meta.description}\nBest for: ${meta.bestFor}`;
  }).join('\n\n');
}

export function buildQualitiesMarkdown(): string {
  return QUALITY_LEVELS.map((quality) => {
    const regularCost = CREDIT_COSTS[quality];
    const deepCost = AGENTIC_CREDIT_COSTS[quality];
    return [
      `**${quality}**`,
      `Regular analysis: ${regularCost} credits`,
      `Deep analysis: ${deepCost} credits`,
    ].join('\n');
  }).join('\n\n');
}
