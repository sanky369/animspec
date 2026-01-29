'use client';

import type { OutputFormat } from '@/types/analysis';
import { FileTextIcon, CSSIcon, JSIcon, ReactIcon, VideoIcon } from '@/components/ui/icons';

interface FormatSelectorProps {
  value: OutputFormat;
  onChange: (format: OutputFormat) => void;
  disabled?: boolean;
}

const FORMAT_OPTIONS = [
  {
    id: 'clone_ui_animation' as const,
    label: 'Clone UI Animation',
    icon: JSIcon,
    useCase: 'Recreate exact motion, timing, and easing with implementation code',
  },
  {
    id: 'clone_component' as const,
    label: 'Clone UI Component',
    icon: ReactIcon,
    useCase: 'Build a pixel-perfect React + Tailwind component',
  },
  {
    id: 'clone_landing_page' as const,
    label: 'Clone Landing Page',
    icon: ReactIcon,
    useCase: 'Recreate the page layout, sections, and styling',
  },
  {
    id: 'copy_design_style' as const,
    label: 'Copy Design Style',
    icon: CSSIcon,
    useCase: 'Apply this design aesthetic to YOUR existing product',
  },
  {
    id: 'extract_design_tokens' as const,
    label: 'Extract Style & Tokens',
    icon: CSSIcon,
    useCase: 'Get reusable tokens: colors, typography, shadows, spacing',
  },
  {
    id: 'remotion_demo_template' as const,
    label: 'Reuse Demo Style (Remotion)',
    icon: VideoIcon,
    useCase: 'Create similar product demos with your own assets',
  },
  {
    id: 'qa_clone_checklist' as const,
    label: 'QA Checklist for Perfect Clone',
    icon: FileTextIcon,
    useCase: 'Verify your clone matches the original perfectly',
  },
];

export function FormatSelector({ value, onChange, disabled }: FormatSelectorProps) {
  const selectedFormat = FORMAT_OPTIONS.find((f) => f.id === value);

  return (
    <div className="config-section">
      <label className="config-label">Choose Use Case</label>
      <div className="format-grid">
        {FORMAT_OPTIONS.map((option) => {
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
