'use client';

import { useState } from 'react';
import { CodeOutput } from './code-output';
import { FramePreview } from './frame-preview';
import { Tabs } from '@/components/ui';
import type { AnalysisResult, AnalysisProgress, OutputFormat } from '@/types/analysis';
import { TargetIcon, CheckIcon, VideoIcon, SearchIcon, CodeIcon, SparklesIcon } from '@/components/ui/icons';

interface OutputPanelProps {
  result: AnalysisResult | null;
  progress: AnalysisProgress | null;
  streamingContent: string;
  generatedFormats?: OutputFormat[];
  onFormatChange?: (format: OutputFormat) => void;
}

const tabs = [
  { id: 'code', label: 'Code' },
  { id: 'reference', label: 'Reference Image' },
  { id: 'overview', label: 'Overview' },
];

export function OutputPanel({ result, progress, streamingContent, generatedFormats, onFormatChange }: OutputPanelProps) {
  const [activeTab, setActiveTab] = useState('code');

  // Loading state
  if (progress && progress.step !== 'complete' && progress.step !== 'error') {
    return (
      <div className="card h-full min-h-[500px]">
        <div className="card-header">
          <div className="card-icon">
            <ClipboardIcon />
          </div>
          <span className="card-title">Agent-ready Instructions</span>
        </div>
        <div className="card-body">
          <LoadingState progress={progress} streamingContent={streamingContent} />
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
