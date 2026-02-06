'use client';

import { useState, useRef, useEffect } from 'react';
import { SearchIcon, CpuIcon, CodeIcon, CheckIcon } from '@/components/ui/icons';

interface AgenticProgressProps {
  currentPass: number;
  totalPasses: number;
  passName: string;
  streamingContent: string;
  thinkingContent: string;
  message: string;
}

const PASS_STEPS = [
  { id: 1, label: 'Decompose', fullLabel: 'Scene Decomposition', Icon: SearchIcon },
  { id: 2, label: 'Analyze', fullLabel: 'Deep Motion Analysis', Icon: CpuIcon },
  { id: 3, label: 'Generate', fullLabel: 'Code Generation', Icon: CodeIcon },
  { id: 4, label: 'Verify', fullLabel: 'Self-Verification', Icon: ShieldIcon },
];

function ShieldIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function BrainIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a6 6 0 0 0-6 6c0 1.5.6 2.8 1.5 3.8L12 17l4.5-5.2A6 6 0 0 0 12 2z" />
      <path d="M12 17v5" />
      <path d="M9 22h6" />
    </svg>
  );
}

export function AgenticProgress({
  currentPass,
  totalPasses,
  passName,
  streamingContent,
  thinkingContent,
  message,
}: AgenticProgressProps) {
  const [thinkingOpen, setThinkingOpen] = useState(false);
  const thinkingRef = useRef<HTMLPreElement>(null);

  // Auto-scroll thinking panel
  useEffect(() => {
    if (thinkingRef.current && thinkingOpen) {
      thinkingRef.current.scrollTop = thinkingRef.current.scrollHeight;
    }
  }, [thinkingContent, thinkingOpen]);

  return (
    <div className="loading-container">
      {/* Spinner */}
      <div className="loading-spinner-wrapper">
        <div className="spinner spinner-lg" />
      </div>

      {/* Current pass message */}
      <p className="loading-message">{message}</p>

      {/* Pipeline visualization */}
      <div className="agentic-pipeline">
        {PASS_STEPS.map((step, index) => {
          const isComplete = step.id < currentPass;
          const isActive = step.id === currentPass;
          const isPending = step.id > currentPass;
          const Icon = step.Icon;

          return (
            <div key={step.id} className="agentic-step-wrapper">
              {/* Connector line */}
              {index > 0 && (
                <div
                  className="agentic-connector"
                  style={{
                    background: isComplete || isActive
                      ? 'var(--accent-primary)'
                      : 'var(--border-default)',
                  }}
                />
              )}

              {/* Step indicator */}
              <div
                className={`agentic-step ${isComplete ? 'complete' : ''} ${isActive ? 'active' : ''} ${isPending ? 'pending' : ''}`}
              >
                {isComplete ? (
                  <CheckIcon className="w-3.5 h-3.5" />
                ) : (
                  <Icon className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Label */}
              <span
                className="agentic-step-label"
                style={{
                  color: isComplete
                    ? 'var(--accent-primary)'
                    : isActive
                    ? 'var(--text-primary)'
                    : 'var(--text-muted)',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Pass counter */}
      {currentPass > 0 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '16px',
          fontSize: '12px',
          color: 'var(--text-muted)',
        }}>
          <span>Pass {currentPass}/{totalPasses}</span>
          <span style={{ color: 'var(--border-default)' }}>|</span>
          <span>{passName}</span>
        </div>
      )}

      {/* Thinking panel (collapsible) */}
      {thinkingContent && (
        <div className="agentic-thinking-panel" style={{ marginTop: '16px' }}>
          <button
            onClick={() => setThinkingOpen(!thinkingOpen)}
            className="agentic-thinking-header"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BrainIcon className="w-3.5 h-3.5" />
              <span>AI Reasoning</span>
              {currentPass > 0 && (
                <span className="agentic-thinking-badge">
                  {Math.round(thinkingContent.length / 4)} tokens
                </span>
              )}
            </div>
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{
                transform: thinkingOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 200ms ease',
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {thinkingOpen && (
            <pre
              ref={thinkingRef}
              className="agentic-thinking-content"
            >
              {thinkingContent}
            </pre>
          )}
        </div>
      )}

      {/* Live streaming output */}
      {streamingContent && (
        <div className="streaming-preview" style={{ marginTop: '16px' }}>
          <div className="streaming-header">
            <span className="streaming-dot" />
            <span>Live output — Pass {currentPass}</span>
          </div>
          <p className="streaming-content">
            {streamingContent.slice(-400)}
          </p>
        </div>
      )}
    </div>
  );
}
