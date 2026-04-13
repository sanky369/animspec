import { FORMAT_METADATA } from '@/lib/public-api/metadata';
import { OUTPUT_FORMATS, type OutputFormat } from '@/types/analysis';

export interface UseCaseInference {
  format: OutputFormat;
  confidence: 'high' | 'medium' | 'low';
  score: number;
  reason: string;
  alternatives: Array<{
    format: OutputFormat;
    score: number;
    reason: string;
  }>;
}

interface FormatHeuristic {
  keywords: string[];
  phrases?: string[];
  negatives?: string[];
  reason: string;
}

const FORMAT_HEURISTICS: Record<OutputFormat, FormatHeuristic> = {
  clone_ui_animation: {
    keywords: ['animation', 'animate', 'motion', 'transition', 'timing', 'easing', 'microinteraction', 'micro-interaction'],
    phrases: ['clone this animation', 'recreate this animation', 'match the motion', 'spec the motion'],
    negatives: ['landing page', 'state machine', 'wcag', 'accessibility', 'tailwind', 'react native', 'figma', 'tokens'],
    reason: 'Best when the user wants to recreate motion behavior, timing, or easing.',
  },
  clone_component: {
    keywords: ['component', 'button', 'card', 'modal', 'dropdown', 'navbar', 'widget', 'menu', 'toast', 'sidebar'],
    phrases: ['build this component', 'clone this component', 'make this component'],
    negatives: ['landing page', 'state machine', 'figma', 'token'],
    reason: 'Best when the request is about rebuilding a specific UI element or component.',
  },
  clone_landing_page: {
    keywords: ['landing', 'homepage', 'hero', 'marketing', 'pricing', 'section'],
    phrases: ['landing page', 'marketing page', 'clone this page', 'recreate this website'],
    negatives: ['component', 'state machine', 'token', 'wcag'],
    reason: 'Best when the user wants to rebuild a page-level marketing or product surface.',
  },
  copy_design_style: {
    keywords: ['style', 'aesthetic', 'visual', 'look', 'feel', 'redesign', 'brand', 'design language'],
    phrases: ['copy this design style', 'apply this style', 'use this aesthetic', 'match this visual language'],
    negatives: ['token', 'state machine', 'wcag', 'tailwind animate'],
    reason: 'Best when the user wants to transfer the overall visual system or design language.',
  },
  extract_design_tokens: {
    keywords: ['tokens', 'palette', 'typography', 'spacing', 'radius', 'shadow', 'theme'],
    phrases: ['extract design tokens', 'extract the theme', 'pull out the palette'],
    negatives: ['animation', 'state machine', 'landing page'],
    reason: 'Best when the user wants reusable visual tokens instead of a rebuild.',
  },
  remotion_demo_template: {
    keywords: ['remotion', 'demo', 'video template', 'product demo'],
    phrases: ['remotion demo', 'product demo template', 'reuse this demo style'],
    negatives: ['wcag', 'state machine', 'token'],
    reason: 'Best when the user wants a reusable product-demo video template.',
  },
  qa_clone_checklist: {
    keywords: ['qa', 'checklist', 'verify', 'acceptance', 'parity', 'review'],
    phrases: ['qa checklist', 'clone checklist', 'verify the clone', 'acceptance criteria'],
    negatives: ['build', 'tailwind', 'reanimated'],
    reason: 'Best when the user wants validation criteria instead of implementation output.',
  },
  accessibility_audit: {
    keywords: ['accessibility', 'a11y', 'wcag', 'reduced motion', 'screen reader', 'contrast'],
    phrases: ['accessibility audit', 'audit accessibility', 'wcag review'],
    negatives: ['state machine', 'lottie', 'tailwind animate'],
    reason: 'Best when the request is explicitly about accessibility or WCAG concerns.',
  },
  ui_ux_audit: {
    keywords: ['ux', 'ui', 'usability', 'friction', 'onboarding', 'clarity', 'audit', 'review', 'critique'],
    phrases: ['ui ux audit', 'ui/ux audit', 'product critique', 'review this flow', 'audit this onboarding'],
    negatives: ['wcag', 'state machine', 'token'],
    reason: 'Best when the user wants a product or usability critique of the observed flow.',
  },
  interaction_state_machine: {
    keywords: ['state machine', 'xstate', 'reducer', 'transition', 'guard', 'state', 'flow logic'],
    phrases: ['interaction state machine', 'extract states and transitions', 'build the state machine'],
    negatives: ['wcag', 'tailwind', 'figma', 'tokens'],
    reason: 'Best when the user wants explicit states, transitions, and behavior logic.',
  },
  performance_budget: {
    keywords: ['performance', 'jank', 'fps', '60fps', 'gpu', 'optimize', 'thrash', 'budget'],
    phrases: ['performance budget', 'performance audit', 'why is this janky'],
    negatives: ['state machine', 'figma', 'token'],
    reason: 'Best when the user is focused on motion performance or optimization.',
  },
  lottie_rive_export: {
    keywords: ['lottie', 'rive', 'export', 'after effects'],
    phrases: ['lottie export', 'rive export', 'turn this into lottie'],
    negatives: ['tailwind', 'state machine', 'wcag'],
    reason: 'Best when the target output is a motion asset format like Lottie or Rive.',
  },
  storyboard_breakdown: {
    keywords: ['storyboard', 'breakdown', 'frame', 'annotate', 'shot'],
    phrases: ['storyboard breakdown', 'frame by frame', 'break this down'],
    negatives: ['tailwind', 'reanimated', 'state machine'],
    reason: 'Best when the user wants a stepwise or frame-by-frame breakdown.',
  },
  tailwind_animate: {
    keywords: ['tailwind', 'keyframes', 'utility', 'utilities', 'css animation'],
    phrases: ['tailwind animate', 'tailwind config', 'tailwind keyframes'],
    negatives: ['react native', 'figma', 'state machine'],
    reason: 'Best when the target implementation is Tailwind animation code.',
  },
  react_native_reanimated: {
    keywords: ['react native', 'reanimated', 'mobile', 'gesture'],
    phrases: ['react native reanimated', 'reanimated 3', 'mobile animation'],
    negatives: ['tailwind', 'figma', 'lottie'],
    reason: 'Best when the user wants a React Native motion implementation.',
  },
  figma_motion_spec: {
    keywords: ['figma', 'prototype', 'variant', 'smart animate'],
    phrases: ['figma motion spec', 'figma prototype', 'smart animate spec'],
    negatives: ['tailwind', 'react native', 'state machine'],
    reason: 'Best when the output should be consumed in Figma or by design teams.',
  },
};

function normalizeIntent(intent: string): string {
  return intent
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreFormat(intent: string, format: OutputFormat): { score: number; matches: string[] } {
  const heuristic = FORMAT_HEURISTICS[format];
  let score = 0;
  const matches: string[] = [];

  for (const phrase of heuristic.phrases ?? []) {
    if (intent.includes(phrase)) {
      score += 6;
      matches.push(`matched phrase "${phrase}"`);
    }
  }

  for (const keyword of heuristic.keywords) {
    if (intent.includes(keyword)) {
      score += keyword.includes(' ') ? 4 : 3;
      matches.push(`matched keyword "${keyword}"`);
    }
  }

  for (const negative of heuristic.negatives ?? []) {
    if (intent.includes(negative)) {
      score -= 2;
    }
  }

  const metadata = FORMAT_METADATA[format];
  if (intent.includes(metadata.label.toLowerCase())) {
    score += 5;
    matches.push(`matched format label "${metadata.label}"`);
  }

  if (intent.includes(metadata.bestFor.toLowerCase())) {
    score += 2;
  }

  return { score, matches };
}

function resolveConfidence(topScore: number, secondScore: number): UseCaseInference['confidence'] {
  if (topScore >= 6 && topScore - secondScore >= 3) return 'high';
  if (topScore >= 3) return 'medium';
  return 'low';
}

export function inferUseCaseFromIntent(intent: string): UseCaseInference {
  const normalizedIntent = normalizeIntent(intent);
  const ranked = OUTPUT_FORMATS.map((format) => {
    const { score, matches } = scoreFormat(normalizedIntent, format);
    return {
      format,
      score,
      reason: matches.length > 0
        ? `${FORMAT_HEURISTICS[format].reason} ${matches.join(', ')}.`
        : FORMAT_HEURISTICS[format].reason,
    };
  }).sort((left, right) => right.score - left.score);

  const [top, second, third] = ranked;
  const chosen = top.score > 0 ? top : {
    ...top,
    format: 'clone_ui_animation' as OutputFormat,
    score: 0,
    reason: 'Defaulted to Clone UI Animation because the goal did not strongly match a more specific format.',
  };

  return {
    format: chosen.format,
    score: chosen.score,
    confidence: resolveConfidence(chosen.score, second?.score ?? 0),
    reason: chosen.reason,
    alternatives: [second, third]
      .filter((item): item is typeof top => Boolean(item))
      .map((item) => ({
        format: item.format,
        score: item.score,
        reason: item.reason,
      })),
  };
}
