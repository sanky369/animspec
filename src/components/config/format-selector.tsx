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
    useCase: 'Extract motion + timing + easing and a practical implementation recipe',
  },
  {
    id: 'clone_component' as const,
    label: 'Clone UI Component',
    icon: ReactIcon,
    useCase: 'Generate a reusable React + Tailwind component matching the video',
  },
  {
    id: 'clone_landing_page' as const,
    label: 'Clone Landing Page',
    icon: ReactIcon,
    useCase: 'Create a landing page/section skeleton that matches layout + styling',
  },
  {
    id: 'extract_design_tokens' as const,
    label: 'Extract Style & Tokens',
    icon: CSSIcon,
    useCase: 'Pull palette, typography, radius, shadows, spacing + reusable tokens',
  },
  {
    id: 'remotion_demo_template' as const,
    label: 'Reuse Demo Style (Remotion)',
    icon: VideoIcon,
    useCase: 'Turn the video into a reusable Remotion scene + motion template',
  },
  {
    id: 'qa_clone_checklist' as const,
    label: 'QA Checklist for Perfect Clone',
    icon: FileTextIcon,
    useCase: 'Acceptance criteria + measurements to verify your clone matches',
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
