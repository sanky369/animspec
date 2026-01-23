'use client';

import type { TriggerContext as TriggerContextType } from '@/types/analysis';

interface TriggerContextProps {
  value: TriggerContextType;
  onChange: (trigger: TriggerContextType) => void;
  disabled?: boolean;
}

const TRIGGER_OPTIONS = [
  { id: 'hover' as const, label: 'On hover' },
  { id: 'click' as const, label: 'On click' },
  { id: 'scroll' as const, label: 'On scroll' },
  { id: 'load' as const, label: 'On page load' },
  { id: 'loop' as const, label: 'Loops continuously' },
  { id: 'focus' as const, label: 'On focus' },
];

export function TriggerContext({ value, onChange, disabled }: TriggerContextProps) {
  return (
    <div className="config-section">
      <label className="config-label">
        Trigger Context <span>(helps AI infer triggers)</span>
      </label>
      <div className="trigger-grid">
        <button
          type="button"
          onClick={() => onChange(null)}
          disabled={disabled}
          className={`trigger-pill ${value === null ? 'active' : ''}`}
        >
          Auto-detect
        </button>
        {TRIGGER_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            disabled={disabled}
            className={`trigger-pill ${value === option.id ? 'active' : ''}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
