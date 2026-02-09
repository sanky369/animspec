'use client';

import {
  JSIcon,
  ReactIcon,
  CSSIcon,
  FigmaIcon,
  StoryboardIcon,
  TailwindIcon,
  MobileIcon,
  LottieIcon,
  VideoIcon,
  AccessibilityIcon,
  GaugeIcon,
  StateMachineIcon,
  FileTextIcon,
} from '@/components/ui/icons';

interface UseCase {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface UseCaseGroup {
  label: string;
  tagline: string;
  items: UseCase[];
}

const USE_CASE_GROUPS: UseCaseGroup[] = [
  {
    label: 'Clone',
    tagline: 'Recreate what you see',
    items: [
      {
        icon: JSIcon,
        title: 'Clone UI Animation',
        description: 'Recreate exact motion, timing, and easing with implementation code',
      },
      {
        icon: ReactIcon,
        title: 'Clone UI Component',
        description: 'Build pixel-perfect React + Tailwind components from video',
      },
      {
        icon: ReactIcon,
        title: 'Clone Landing Page',
        description: 'Recreate page layout, sections, and styling from a recording',
      },
    ],
  },
  {
    label: 'Extract',
    tagline: 'Pull out design assets and specs',
    items: [
      {
        icon: CSSIcon,
        title: 'Copy Design Style',
        description: 'Apply any design aesthetic to your existing product',
      },
      {
        icon: CSSIcon,
        title: 'Extract Design Tokens',
        description: 'Get reusable tokens: colors, typography, shadows, spacing',
      },
      {
        icon: FigmaIcon,
        title: 'Figma Motion Spec',
        description: 'Smart Animate properties, variant states, prototype flows',
      },
      {
        icon: StoryboardIcon,
        title: 'Storyboard Breakdown',
        description: 'Frame-by-frame timeline with annotated states for handoff',
      },
    ],
  },
  {
    label: 'Export',
    tagline: 'Framework-specific output',
    items: [
      {
        icon: TailwindIcon,
        title: 'Tailwind Animate Config',
        description: 'Custom @keyframes, animation utilities, and component classes',
      },
      {
        icon: MobileIcon,
        title: 'React Native (Reanimated)',
        description: 'useAnimatedStyle, withSpring, gesture-driven native animations',
      },
      {
        icon: LottieIcon,
        title: 'Lottie / Rive Export',
        description: 'Keyframe data for Lottie JSON or Rive state machines',
      },
      {
        icon: VideoIcon,
        title: 'Remotion Demo Template',
        description: 'Create similar product demos with your own assets',
      },
    ],
  },
  {
    label: 'Audit',
    tagline: 'Quality and testing',
    items: [
      {
        icon: AccessibilityIcon,
        title: 'Accessibility Audit',
        description: 'WCAG compliance, seizure risk, prefers-reduced-motion fallbacks',
      },
      {
        icon: GaugeIcon,
        title: 'Performance Budget',
        description: 'Layout thrash detection, GPU layers, 60fps optimization',
      },
      {
        icon: StateMachineIcon,
        title: 'Interaction State Machine',
        description: 'XState/useReducer states, transitions, and guards from observed UI',
      },
      {
        icon: FileTextIcon,
        title: 'QA Clone Checklist',
        description: 'Verify your implementation matches the original perfectly',
      },
    ],
  },
];

export function UseCasesSection() {
  return (
    <section className="use-cases-section" id="use-cases">
      <div className="section-header">
        <span className="section-eyebrow">Prompt Formats</span>
        <h2 className="section-title">15 Prompt Formats for Every Workflow</h2>
        <p className="section-subtitle">
          One video, 15 ways to prompt your coding agent — clone, extract, export, or audit
        </p>
      </div>

      <div className="use-cases-groups">
        {USE_CASE_GROUPS.map((group) => (
          <div key={group.label} className="use-case-group">
            <div className="use-case-group-header">
              <h3 className="use-case-group-label">{group.label}</h3>
              <span className="use-case-group-tagline">{group.tagline}</span>
            </div>
            <div className="use-case-group-grid">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="use-case-card">
                    <div className="use-case-card-icon">
                      <Icon />
                    </div>
                    <div className="use-case-card-content">
                      <h4 className="use-case-card-title">{item.title}</h4>
                      <p className="use-case-card-desc">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
