'use client';

import type { QualityLevel } from '@/types/analysis';
import { CREDIT_COSTS } from '@/types/database';

interface QualitySelectorProps {
  value: QualityLevel;
  onChange: (quality: QualityLevel) => void;
  disabled?: boolean;
  credits?: number;
  isPaidUser?: boolean;
}

const QUALITY_OPTIONS = [
  { id: 'fast' as const, label: 'Fast', model: 'Gemini 2.5 Flash' },
  { id: 'balanced' as const, label: 'Balanced', model: 'Gemini 3 Flash' },
  { id: 'precise' as const, label: 'Precise', model: 'Gemini 3 Pro' },
];

export function QualitySelector({
  value,
  onChange,
  disabled,
  credits = Infinity,
  isPaidUser = true,
}: QualitySelectorProps) {
  const canAfford = (quality: QualityLevel) => credits >= CREDIT_COSTS[quality];
  const canUse = (quality: QualityLevel) => {
    if (quality === 'precise' && !isPaidUser) return false;
    return canAfford(quality);
  };

  const showUpgradeHint = !isPaidUser;
  const showInsufficientCredits = isPaidUser && credits < CREDIT_COSTS.fast;

  return (
    <div className="config-section">
      <label className="config-label">Analysis Quality</label>
      <div className="select-wrapper">
        <select
          value={value}
          onChange={(e) => {
            const newQuality = e.target.value as QualityLevel;
            if (canUse(newQuality)) {
              onChange(newQuality);
            }
          }}
          disabled={disabled}
        >
          {QUALITY_OPTIONS.map((option) => {
            const cost = CREDIT_COSTS[option.id];
            const affordable = canAfford(option.id);
            const locked = option.id === 'precise' && !isPaidUser;

            return (
              <option
                key={option.id}
                value={option.id}
                disabled={!canUse(option.id)}
              >
                {option.label} — {option.model} ({cost} credit{cost !== 1 ? 's' : ''})
                {locked ? ' [Upgrade to unlock]' : !affordable ? ' [Insufficient credits]' : ''}
              </option>
            );
          })}
        </select>
      </div>

      {showUpgradeHint && value !== 'precise' && (
        <div className="quality-selector-hint">
          Precise mode requires a paid account. <a href="/dashboard/account">Buy credits to unlock</a>
        </div>
      )}

      {showInsufficientCredits && (
        <div className="quality-selector-hint">
          You&apos;re running low on credits. <a href="/dashboard/account">Buy more credits</a>
        </div>
      )}
    </div>
  );
}
