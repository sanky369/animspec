'use client';

import { useState } from 'react';
import type { OutputFormat } from '@/types/analysis';
import { FileTextIcon, CSSIcon, JSIcon, ReactIcon, VideoIcon, AccessibilityIcon, StateMachineIcon, GaugeIcon, LottieIcon, StoryboardIcon, TailwindIcon, MobileIcon, FigmaIcon } from '@/components/ui/icons';

interface FormatSelectorProps {
  value: OutputFormat;
  onChange: (format: OutputFormat) => void;
  disabled?: boolean;
}

type FormatGroup = 'clone' | 'extract' | 'export' | 'audit';

interface FormatOption {
  id: OutputFormat;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  useCase: string;
  group: FormatGroup;
}

const FORMAT_GROUPS: { id: FormatGroup; label: string }[] = [
  { id: 'clone', label: 'Clone' },
  { id: 'extract', label: 'Extract' },
  { id: 'export', label: 'Export' },
  { id: 'audit', label: 'Audit' },
];

const FORMAT_OPTIONS: FormatOption[] = [
  // Clone — recreate what you see
  {
    id: 'clone_ui_animation',
    label: 'Clone UI Animation',
    icon: JSIcon,
    useCase: 'Recreate exact motion, timing, and easing with implementation code',
    group: 'clone',
  },
  {
    id: 'clone_component',
    label: 'Clone UI Component',
    icon: ReactIcon,
    useCase: 'Build a pixel-perfect React + Tailwind component',
    group: 'clone',
  },
  {
    id: 'clone_landing_page',
    label: 'Clone Landing Page',
    icon: ReactIcon,
    useCase: 'Recreate the page layout, sections, and styling',
    group: 'clone',
  },

  // Extract — design assets & specs
  {
    id: 'copy_design_style',
    label: 'Copy Design Style',
    icon: CSSIcon,
    useCase: 'Apply this design aesthetic to YOUR existing product',
    group: 'extract',
  },
  {
    id: 'extract_design_tokens',
    label: 'Extract Style & Tokens',
    icon: CSSIcon,
    useCase: 'Get reusable tokens: colors, typography, shadows, spacing',
    group: 'extract',
  },
  {
    id: 'figma_motion_spec',
    label: 'Figma Motion Spec',
    icon: FigmaIcon,
    useCase: 'Smart Animate properties, variant states, prototype flows',
    group: 'extract',
  },
  {
    id: 'storyboard_breakdown',
    label: 'Storyboard Breakdown',
    icon: StoryboardIcon,
    useCase: 'Frame-by-frame timeline with annotated states for handoff',
    group: 'extract',
  },

  // Export — framework-specific code
  {
    id: 'tailwind_animate',
    label: 'Tailwind Animate Config',
    icon: TailwindIcon,
    useCase: 'Custom @keyframes, animation utilities, and component classes',
    group: 'export',
  },
  {
    id: 'react_native_reanimated',
    label: 'React Native (Reanimated)',
    icon: MobileIcon,
    useCase: 'useAnimatedStyle, withSpring, gesture-driven native animations',
    group: 'export',
  },
  {
    id: 'lottie_rive_export',
    label: 'Lottie / Rive Export',
    icon: LottieIcon,
    useCase: 'Keyframe data for Lottie JSON or Rive state machines',
    group: 'export',
  },
  {
    id: 'remotion_demo_template',
    label: 'Reuse Demo Style (Remotion)',
    icon: VideoIcon,
    useCase: 'Create similar product demos with your own assets',
    group: 'export',
  },

  // Audit — quality & testing
  {
    id: 'accessibility_audit',
    label: 'Accessibility Audit',
    icon: AccessibilityIcon,
    useCase: 'WCAG compliance, seizure risk, prefers-reduced-motion fallbacks',
    group: 'audit',
  },
  {
    id: 'performance_budget',
    label: 'Performance Budget',
    icon: GaugeIcon,
    useCase: 'Layout thrash detection, GPU layers, 60fps optimization',
    group: 'audit',
  },
  {
    id: 'interaction_state_machine',
    label: 'Interaction State Machine',
    icon: StateMachineIcon,
    useCase: 'XState/useReducer: states, transitions, guards from observed UI',
    group: 'audit',
  },
  {
    id: 'qa_clone_checklist',
    label: 'QA Checklist for Perfect Clone',
    icon: FileTextIcon,
    useCase: 'Verify your clone matches the original perfectly',
    group: 'audit',
  },
];

function getGroupForFormat(formatId: OutputFormat): FormatGroup {
  return FORMAT_OPTIONS.find((f) => f.id === formatId)?.group ?? 'clone';
}

export function FormatSelector({ value, onChange, disabled }: FormatSelectorProps) {
  const [activeGroup, setActiveGroup] = useState<FormatGroup>(() => getGroupForFormat(value));
  const selectedFormat = FORMAT_OPTIONS.find((f) => f.id === value);
  const visibleOptions = FORMAT_OPTIONS.filter((f) => f.group === activeGroup);

  return (
    <div className="config-section">
      <label className="config-label">Choose Use Case</label>

      <div className="format-tabs">
        {FORMAT_GROUPS.map((group) => (
          <button
            key={group.id}
            type="button"
            onClick={() => setActiveGroup(group.id)}
            disabled={disabled}
            className={`format-tab ${activeGroup === group.id ? 'active' : ''}`}
          >
            {group.label}
            {FORMAT_OPTIONS.some((f) => f.group === group.id && f.id === value) && (
              <span className="format-tab-dot" />
            )}
          </button>
        ))}
      </div>

      <div className="format-grid">
        {visibleOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              disabled={disabled}
              className={`format-option ${value === option.id ? 'active' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="format-option-icon">
                <Icon />
              </div>
              <div className="format-option-label">{option.label}</div>
            </button>
          );
        })}
      </div>
      {selectedFormat && (
        <p className="format-hint">{selectedFormat.useCase}</p>
      )}
    </div>
  );
}
