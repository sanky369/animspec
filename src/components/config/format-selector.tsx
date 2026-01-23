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
    id: 'natural' as const,
    label: 'Natural Language',
    icon: FileTextIcon,
    useCase: 'Best for AI coding agents like Claude Code, Cursor, or Copilot',
  },
  {
    id: 'css' as const,
    label: 'CSS Keyframes',
    icon: CSSIcon,
    useCase: 'Simple web animations without JavaScript dependencies',
  },
  {
    id: 'gsap' as const,
    label: 'GSAP Timeline',
    icon: JSIcon,
    useCase: 'Complex sequences with precise timeline control',
  },
  {
    id: 'framer' as const,
    label: 'Framer Motion',
    icon: ReactIcon,
    useCase: 'React apps with declarative, spring-based animations',
  },
  {
    id: 'remotion' as const,
    label: 'Remotion',
    icon: VideoIcon,
    useCase: 'AI-generated video animations using Claude Code + /remotion-script-writer',
  },
];

export function FormatSelector({ value, onChange, disabled }: FormatSelectorProps) {
  const selectedFormat = FORMAT_OPTIONS.find((f) => f.id === value);

  return (
    <div className="config-section">
      <label className="config-label">Output Format</label>
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
