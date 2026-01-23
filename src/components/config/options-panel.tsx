'use client';

import { FormatSelector } from './format-selector';
import { QualitySelector } from './quality-selector';
import { TriggerContext } from './trigger-context';
import type { AnalysisConfig } from '@/types/analysis';

interface OptionsPanelProps {
  config: AnalysisConfig;
  onChange: (config: AnalysisConfig) => void;
  disabled?: boolean;
}

export function OptionsPanel({ config, onChange, disabled }: OptionsPanelProps) {
  return (
    <div className="space-y-6 mt-8">
      <FormatSelector
        value={config.format}
        onChange={(format) => onChange({ ...config, format })}
        disabled={disabled}
      />

      <QualitySelector
        value={config.quality}
        onChange={(quality) => onChange({ ...config, quality })}
        disabled={disabled}
      />

      <TriggerContext
        value={config.triggerContext}
        onChange={(triggerContext) => onChange({ ...config, triggerContext })}
        disabled={disabled}
      />
    </div>
  );
}
