'use client';

import { ZapIcon } from '@/components/ui/icons';
import { CREDIT_COSTS, AGENTIC_CREDIT_COSTS } from '@/types/database';
import type { QualityLevel } from '@/types/analysis';

interface AgenticToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  quality: QualityLevel;
}

export function AgenticToggle({ value, onChange, disabled, quality }: AgenticToggleProps) {
  const isKimi = quality === 'kimi';
  const effectiveDisabled = disabled || isKimi;
  const standardCost = CREDIT_COSTS[quality];
  const agenticCost = AGENTIC_CREDIT_COSTS[quality];

  return (
    <div className="config-section">
      <button
        type="button"
        onClick={() => !effectiveDisabled && onChange(!value)}
        disabled={effectiveDisabled}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '12px 16px',
          background: value ? 'rgba(245, 158, 11, 0.06)' : 'var(--bg-subtle)',
          border: `1px solid ${value ? 'rgba(245, 158, 11, 0.25)' : 'var(--border-default)'}`,
          borderRadius: 'var(--radius-md)',
          cursor: effectiveDisabled ? 'not-allowed' : 'pointer',
          opacity: effectiveDisabled ? 0.4 : 1,
          transition: 'all var(--duration-normal) ease',
          fontFamily: 'inherit',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ZapIcon className="w-4 h-4" />
          <div style={{ textAlign: 'left' }}>
            <div style={{
              fontSize: '13px',
              fontWeight: 600,
              color: value ? 'var(--accent-primary)' : 'var(--text-primary)',
            }}>
              Deep Analysis
            </div>
            <div style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              marginTop: '2px',
            }}>
              {isKimi
                ? 'Not available with Kimi'
                : '4-pass pipeline with self-verification'
              }
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {!isKimi && (
            <span style={{
              fontSize: '10px',
              color: 'var(--text-muted)',
            }}>
              {value ? `${agenticCost} cr` : `${standardCost} cr`}
            </span>
          )}

          {/* Toggle switch */}
          <div
            style={{
              width: '36px',
              height: '20px',
              borderRadius: '10px',
              background: value ? 'var(--accent-primary)' : 'var(--bg-elevated)',
              position: 'relative',
              transition: 'background var(--duration-fast) ease',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: 'white',
                position: 'absolute',
                top: '2px',
                left: value ? '18px' : '2px',
                transition: 'left var(--duration-fast) ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }}
            />
          </div>
        </div>
      </button>
    </div>
  );
}
