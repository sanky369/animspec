'use client';

import { useState } from 'react';
import { CodeOutput } from './code-output';
import { FramePreview } from './frame-preview';
import { AgenticProgress } from '@/components/analysis/agentic-progress';
import { Tabs } from '@/components/ui';
import type { AnalysisResult, AnalysisProgress, OutputFormat, VerificationReport } from '@/types/analysis';
import { TargetIcon, CheckIcon, VideoIcon, SearchIcon, CodeIcon, SparklesIcon } from '@/components/ui/icons';

interface OutputPanelProps {
  result: AnalysisResult | null;
  progress: AnalysisProgress | null;
  streamingContent: string;
  generatedFormats?: OutputFormat[];
  onFormatChange?: (format: OutputFormat) => void;
  // Agentic mode props
  agenticMode?: boolean;
  thinkingContent?: string;
  currentPass?: number;
  totalPasses?: number;
  passName?: string;
}

const standardTabs = [
  { id: 'code', label: 'Code' },
  { id: 'reference', label: 'Reference Image' },
  { id: 'overview', label: 'Overview' },
];

const agenticTabs = [
  { id: 'code', label: 'Code' },
  { id: 'verification', label: 'Verification' },
  { id: 'reference', label: 'Reference Image' },
  { id: 'overview', label: 'Overview' },
];

export function OutputPanel({
  result,
  progress,
  streamingContent,
  generatedFormats,
  onFormatChange,
  agenticMode,
  thinkingContent,
  currentPass,
  totalPasses,
  passName,
}: OutputPanelProps) {
  const [activeTab, setActiveTab] = useState('code');

  const hasVerification = result?.verificationReport || result?.verificationScore != null;
  const tabs = hasVerification ? agenticTabs : standardTabs;

  // Loading state
  if (progress && progress.step !== 'complete' && progress.step !== 'error') {
    const isAgenticLoading = agenticMode && (currentPass ?? 0) > 0;

    return (
      <div className="card h-full min-h-[500px]">
        <div className="card-header">
          <div className="card-icon">
            <ClipboardIcon />
          </div>
          <span className="card-title">
            {isAgenticLoading ? 'Deep Analysis Pipeline' : 'Agent-ready Instructions'}
          </span>
        </div>
        <div className="card-body">
          {isAgenticLoading ? (
            <AgenticProgress
              currentPass={currentPass ?? 0}
              totalPasses={totalPasses ?? 4}
              passName={passName ?? ''}
              streamingContent={streamingContent}
              thinkingContent={thinkingContent ?? ''}
              message={progress.message}
            />
          ) : (
            <LoadingState progress={progress} streamingContent={streamingContent} />
          )}
        </div>
      </div>
    );
  }

  // Error state
  if (progress?.step === 'error') {
    return (
      <div className="card h-full min-h-[500px]">
        <div className="card-header">
          <div className="card-icon">
            <ClipboardIcon />
          </div>
          <span className="card-title">Agent-ready Instructions</span>
        </div>
        <div className="card-body">
          <div className="empty-state">
            <div className="empty-state-icon" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
              <svg className="w-7 h-7 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h3 className="empty-state-title" style={{ color: '#f87171' }}>Analysis Failed</h3>
            <p className="empty-state-subtitle">{progress.message}</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!result) {
    return (
      <div className="card h-full min-h-[500px]">
        <div className="card-header">
          <div className="card-icon">
            <ClipboardIcon />
          </div>
          <span className="card-title">Agent-ready Instructions</span>
        </div>
        <div className="card-body">
          <EmptyState />
        </div>
      </div>
    );
  }

  // Result state
  return (
    <div className="card h-full min-h-[500px]">
      <div className="card-header">
        <div className="card-icon">
          <ClipboardIcon />
        </div>
        <span className="card-title">Agent-ready Instructions</span>
        {result.verificationScore != null && (
          <VerificationBadge score={result.verificationScore} />
        )}
      </div>
      <Tabs tabs={tabs} defaultTab="code" onChange={setActiveTab} />
      <div className="card-body">
        {activeTab === 'code' && (
          <CodeOutput
            code={result.code}
            format={result.format}
            notes={result.notes}
            generatedFormats={generatedFormats}
            onFormatChange={onFormatChange}
          />
        )}
        {activeTab === 'verification' && (
          <VerificationTab report={result.verificationReport} score={result.verificationScore} />
        )}
        {activeTab === 'reference' && (
          <FramePreview frameImage={result.frameImage} />
        )}
        {activeTab === 'overview' && (
          <div className="prose prose-invert max-w-none">
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{result.overview}</p>
            {result.rawAnalysis && (
              <details style={{ marginTop: '24px' }}>
                <summary style={{ cursor: 'pointer', fontSize: '13px', color: 'var(--text-muted)' }}>
                  View full analysis
                </summary>
                <pre style={{
                  marginTop: '12px',
                  padding: '16px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '10px',
                  fontSize: '12px',
                  overflow: 'auto',
                  maxHeight: '280px',
                  color: 'var(--text-secondary)'
                }}>
                  {result.rawAnalysis}
                </pre>
              </details>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ClipboardIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <TargetIcon />
      </div>
      <h3 className="empty-state-title">Ready to analyze</h3>
      <p className="empty-state-subtitle">Upload a video to generate Agent-ready Instructions</p>
    </div>
  );
}

function LoadingState({ progress, streamingContent }: { progress: AnalysisProgress; streamingContent: string }) {
  const steps = [
    { id: 'uploading', label: 'Uploading video', Icon: VideoIcon },
    { id: 'extracting', label: 'Processing video', Icon: CodeIcon },
    { id: 'analyzing', label: 'AI analysis', Icon: SearchIcon },
    { id: 'generating', label: 'Generating output', Icon: SparklesIcon },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === progress.step);

  return (
    <div className="loading-container">
      <div className="loading-spinner-wrapper">
        <div className="spinner spinner-lg" />
      </div>
      <p className="loading-message">{progress.message}</p>

      <div className="progress-timeline">
        {steps.map((step, index) => {
          const isComplete = index < currentStepIndex;
          const isActive = index === currentStepIndex;
          const isPending = index > currentStepIndex;
          const Icon = step.Icon;

          return (
            <div key={step.id} className="progress-timeline-item">
              {/* Connector line */}
              {index > 0 && (
                <div className={`progress-connector ${isComplete || isActive ? 'filled' : ''}`} />
              )}

              {/* Step indicator */}
              <div
                className={`progress-indicator ${isComplete ? 'complete' : ''} ${isActive ? 'active' : ''} ${isPending ? 'pending' : ''}`}
              >
                {isComplete ? (
                  <CheckIcon className="progress-icon" />
                ) : (
                  <Icon className="progress-icon" />
                )}
              </div>

              {/* Label */}
              <span className={`progress-label ${isComplete ? 'complete' : ''} ${isActive ? 'active' : ''}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {streamingContent && (
        <div className="streaming-preview">
          <div className="streaming-header">
            <span className="streaming-dot" />
            <span>Live output</span>
          </div>
          <p className="streaming-content">
            {streamingContent.slice(-400)}
          </p>
        </div>
      )}
    </div>
  );
}

function VerificationBadge({ score }: { score: number }) {
  const color = score >= 90 ? '#22c55e' : score >= 75 ? '#f59e0b' : score >= 50 ? '#f97316' : '#ef4444';
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      marginLeft: 'auto',
      padding: '2px 10px',
      borderRadius: 'var(--radius-full)',
      background: `${color}15`,
      border: `1px solid ${color}30`,
      fontSize: '12px',
      fontWeight: 600,
      color,
    }}>
      {score}/100
    </span>
  );
}

function VerificationTab({ report, score }: { report?: VerificationReport; score?: number }) {
  if (!report && score == null) {
    return (
      <div className="empty-state">
        <p className="empty-state-subtitle">No verification data available</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Score header */}
      {score != null && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px',
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-default)',
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 700,
            color: score >= 90 ? '#22c55e' : score >= 75 ? '#f59e0b' : score >= 50 ? '#f97316' : '#ef4444',
            fontFamily: 'var(--font-mono), monospace',
          }}>
            {score}
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Fidelity Score
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {score >= 90 ? 'Near perfect match' : score >= 75 ? 'Good match, minor adjustments needed' : score >= 50 ? 'Decent match, some corrections needed' : 'Significant discrepancies found'}
            </div>
          </div>
        </div>
      )}

      {/* Discrepancies */}
      {report?.discrepancies && report.discrepancies.length > 0 && (
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Discrepancies ({report.discrepancies.length})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {report.discrepancies.map((d, i) => (
              <div key={i} style={{
                padding: '10px 12px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-sm)',
                borderLeft: `3px solid ${d.severity === 'critical' ? '#ef4444' : d.severity === 'major' ? '#f97316' : '#f59e0b'}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: d.severity === 'critical' ? '#ef4444' : d.severity === 'major' ? '#f97316' : '#f59e0b',
                  }}>
                    {d.severity}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {d.element}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {d.issue}
                </p>
                {d.suggestedFix && (
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '4px 0 0', lineHeight: 1.4 }}>
                    Fix: {d.suggestedFix}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Corrections */}
      {report?.corrections && report.corrections.length > 0 && (
        <div>
          <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Suggested Corrections
          </h4>
          <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {report.corrections.map((c, i) => (
              <li key={i} style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Summary */}
      {report?.summary && (
        <div style={{
          padding: '12px',
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-default)',
        }}>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
            {report.summary}
          </p>
        </div>
      )}
    </div>
  );
}
