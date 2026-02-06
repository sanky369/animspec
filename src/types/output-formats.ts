import type { OutputFormat } from './analysis';

export interface FormatOption {
  id: OutputFormat;
  label: string;
  icon: string;
  language: string; // For syntax highlighting
  description: string;
  bestFor: string;
}

export const FORMAT_OPTIONS: FormatOption[] = [
  {
    id: 'clone_ui_animation',
    label: 'Clone UI Animation',
    icon: '✨',
    language: 'markdown',
    description: 'Agent instructions to recreate exact motion, timing, and easing',
    bestFor: 'Micro-interactions, transitions, complex sequences',
  },
  {
    id: 'clone_component',
    label: 'Clone UI Component',
    icon: '🧩',
    language: 'tsx',
    description: 'Agent instructions to build a matching React + Tailwind component',
    bestFor: 'Buttons, cards, modals, navbars, menus, widgets',
  },
  {
    id: 'clone_landing_page',
    label: 'Clone Landing Page',
    icon: '🧱',
    language: 'tsx',
    description: 'Agent instructions to recreate the page layout and sections',
    bestFor: 'Marketing pages, hero sections, pricing sections, feature grids',
  },
  {
    id: 'copy_design_style',
    label: 'Copy Design Style',
    icon: '🪄',
    language: 'markdown',
    description: 'Agent instructions to apply this design style to YOUR existing product',
    bestFor: 'Redesigning your app, adopting a new aesthetic, style refresh',
  },
  {
    id: 'extract_design_tokens',
    label: 'Extract Style & Tokens',
    icon: '🎨',
    language: 'markdown',
    description: 'Reusable design tokens: palette, typography, radius, shadows, spacing',
    bestFor: 'Design systems, theming, consistent UI replication',
  },
  {
    id: 'remotion_demo_template',
    label: 'Reuse Product Demo Style (Remotion)',
    icon: '🎬',
    language: 'markdown',
    description: 'Agent instructions to create similar product demos with your assets',
    bestFor: 'Generating similar product demo videos with your own assets',
  },
  {
    id: 'qa_clone_checklist',
    label: 'QA Checklist for Perfect Clone',
    icon: '✅',
    language: 'markdown',
    description: 'Acceptance criteria to verify your clone matches the original',
    bestFor: 'Hand-off to devs, client approvals, pixel/motion perfection',
  },
  {
    id: 'accessibility_audit',
    label: 'Accessibility Audit',
    icon: '♿',
    language: 'markdown',
    description: 'WCAG compliance, seizure risk assessment, prefers-reduced-motion fallbacks',
    bestFor: 'Inclusive design, WCAG certification, motion sensitivity safety',
  },
  {
    id: 'interaction_state_machine',
    label: 'Interaction State Machine',
    icon: '⚙️',
    language: 'typescript',
    description: 'XState/useReducer state machine from observed UI states and transitions',
    bestFor: 'Complex interactions, multi-state components, form flows',
  },
  {
    id: 'performance_budget',
    label: 'Performance Budget',
    icon: '⚡',
    language: 'markdown',
    description: 'Layout thrash detection, GPU layer analysis, 60fps optimization',
    bestFor: 'Performance audits, mobile optimization, jank-free animations',
  },
  {
    id: 'lottie_rive_export',
    label: 'Lottie / Rive Export',
    icon: '🎞️',
    language: 'json',
    description: 'Lottie keyframe data and Rive state machine definitions',
    bestFor: 'Motion graphics, micro-animations, After Effects replacement',
  },
  {
    id: 'storyboard_breakdown',
    label: 'Storyboard Breakdown',
    icon: '🎬',
    language: 'markdown',
    description: 'Frame-by-frame storyboard with annotated timing and states',
    bestFor: 'Design handoff, team alignment, animation documentation',
  },
  {
    id: 'tailwind_animate',
    label: 'Tailwind Animate Config',
    icon: '🌊',
    language: 'css',
    description: 'Custom keyframes, animation utilities, and Tailwind config entries',
    bestFor: 'Tailwind projects, utility-first animation, drop-in configs',
  },
  {
    id: 'react_native_reanimated',
    label: 'React Native (Reanimated)',
    icon: '📱',
    language: 'tsx',
    description: 'Reanimated 3 with useAnimatedStyle, withSpring, gesture handler',
    bestFor: 'Mobile apps, native performance, gesture-driven animations',
  },
  {
    id: 'figma_motion_spec',
    label: 'Figma Motion Spec',
    icon: '🎨',
    language: 'markdown',
    description: 'Smart Animate properties, variant states, prototype interactions',
    bestFor: 'Design systems, Figma prototypes, designer-developer handoff',
  },
];

export interface QualityOption {
  id: 'balanced' | 'precise' | 'kimi';
  label: string;
  icon: string;
  model: string;
  description: string;
  estimatedCost: string;
}

export const QUALITY_OPTIONS: QualityOption[] = [
  {
    id: 'balanced',
    label: 'Good',
    icon: '🎯',
    model: 'gemini-3-flash-preview',
    description: 'Pro-level intelligence at Flash speed',
    estimatedCost: '~$0.02',
  },
  {
    id: 'precise',
    label: 'Precise',
    icon: '🧠',
    model: 'gemini-3-pro-preview',
    description: 'Flagship model, complex reasoning',
    estimatedCost: '~$0.08',
  },
];

export interface TriggerOption {
  id: 'hover' | 'click' | 'scroll' | 'load' | 'loop' | 'focus';
  label: string;
  description: string;
}

export const TRIGGER_OPTIONS: TriggerOption[] = [
  { id: 'hover', label: 'On hover', description: 'Animation triggers when user hovers' },
  { id: 'click', label: 'On click', description: 'Animation triggers on click/tap' },
  { id: 'scroll', label: 'On scroll', description: 'Animation triggers when scrolled into view' },
  { id: 'load', label: 'On page load', description: 'Animation plays when page loads' },
  { id: 'loop', label: 'Loops continuously', description: 'Animation repeats indefinitely' },
  { id: 'focus', label: 'On focus', description: 'Animation triggers on element focus' },
];
