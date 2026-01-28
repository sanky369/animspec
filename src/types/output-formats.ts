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
    description: 'Motion spec + timing + easing + an implementation recipe from the video',
    bestFor: 'Micro-interactions, transitions, complex sequences',
  },
  {
    id: 'clone_component',
    label: 'Clone UI Component',
    icon: '🧩',
    language: 'tsx',
    description: 'Generate a reusable React + Tailwind component that matches the video',
    bestFor: 'Buttons, cards, modals, navbars, menus, widgets',
  },
  {
    id: 'clone_landing_page',
    label: 'Clone Landing Page',
    icon: '🧱',
    language: 'tsx',
    description: 'Create a landing page/section skeleton (React + Tailwind) matching layout and styling',
    bestFor: 'Marketing pages, hero sections, pricing sections, feature grids',
  },
  {
    id: 'extract_design_tokens',
    label: 'Extract Style & Tokens',
    icon: '🎨',
    language: 'markdown',
    description: 'Extract palette, typography, radius, shadows, spacing, and provide reusable tokens',
    bestFor: 'Design systems, theming, consistent UI replication',
  },
  {
    id: 'remotion_demo_template',
    label: 'Reuse Product Demo Style (Remotion)',
    icon: '🎬',
    language: 'markdown',
    description: 'Convert the video into a reusable Remotion template: scenes, timing, motion style, transitions',
    bestFor: 'Generating similar product demo videos with your own assets',
  },
  {
    id: 'qa_clone_checklist',
    label: 'QA Checklist for Perfect Clone',
    icon: '✅',
    language: 'markdown',
    description: 'Acceptance criteria + measurement checklist to ensure your clone matches the video',
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
