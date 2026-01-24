export interface FormatOption {
  id: 'natural' | 'css' | 'gsap' | 'framer' | 'remotion';
  label: string;
  icon: string;
  language: string; // For syntax highlighting
  description: string;
  bestFor: string;
}

export const FORMAT_OPTIONS: FormatOption[] = [
  {
    id: 'natural',
    label: 'Natural Language',
    icon: '📝',
    language: 'markdown',
    description: 'Detailed text description optimized for AI coding agents',
    bestFor: 'Claude Code, Codex, Cursor',
  },
  {
    id: 'css',
    label: 'CSS Keyframes',
    icon: '🎨',
    language: 'css',
    description: 'Pure CSS animations with @keyframes',
    bestFor: 'Simple web animations, vanilla CSS',
  },
  {
    id: 'gsap',
    label: 'GSAP Timeline',
    icon: '⚡',
    language: 'javascript',
    description: 'GreenSock animation timeline code',
    bestFor: 'Complex sequences, timeline control',
  },
  {
    id: 'framer',
    label: 'Framer Motion',
    icon: '🔮',
    language: 'tsx',
    description: 'React Framer Motion component code',
    bestFor: 'React applications, declarative animations',
  },
  {
    id: 'remotion',
    label: 'Remotion Template',
    icon: '🎬',
    language: 'markdown',
    description: 'Extract animation style & structure as a reusable template',
    bestFor: 'Creating similar videos for your own product',
  },
];

export interface QualityOption {
  id: 'fast' | 'balanced' | 'precise';
  label: string;
  icon: string;
  model: string;
  description: string;
  estimatedCost: string;
}

export const QUALITY_OPTIONS: QualityOption[] = [
  {
    id: 'fast',
    label: 'Fast',
    icon: '⚡',
    model: 'gemini-2.5-flash',
    description: 'Production stable, optimized for speed',
    estimatedCost: '~$0.01',
  },
  {
    id: 'balanced',
    label: 'Balanced',
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
