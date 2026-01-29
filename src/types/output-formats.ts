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
