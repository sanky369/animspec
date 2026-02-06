'use client';

import { useState } from 'react';
import { XIcon, CalendarIcon, CoinsIcon, ZapIcon } from '@/components/ui/icons';
import { CodeBlock } from '@/components/ui';
import { getLanguageForFormat } from '@/lib/ai/output-parsers';
import type { Analysis } from '@/types/database';

interface AnalysisDetailModalProps {
  analysis: Analysis | null;
  isOpen: boolean;
  onClose: () => void;
}

function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function getQualityLabel(quality: string): string {
  switch (quality) {
    case 'balanced': return 'Good';
    case 'precise': return 'Precise';
    case 'kimi': return 'Best for most cases';
    default: return quality;
  }
}

function getFormatLabel(format: string): string {
  switch (format) {
    case 'clone_ui_animation': return 'UI Animation';
    case 'clone_component': return 'UI Component';
    case 'clone_landing_page': return 'Landing Page';
    case 'extract_design_tokens': return 'Style & Tokens';
    case 'remotion_demo_template': return 'Remotion Template';
    case 'copy_design_style': return 'Design Style';
    case 'qa_clone_checklist': return 'QA Checklist';
    case 'accessibility_audit': return 'A11y Audit';
    case 'interaction_state_machine': return 'State Machine';
    case 'performance_budget': return 'Perf Budget';
    case 'lottie_rive_export': return 'Lottie/Rive';
    case 'storyboard_breakdown': return 'Storyboard';
    case 'tailwind_animate': return 'Tailwind Animate';
    case 'react_native_reanimated': return 'React Native';
    case 'figma_motion_spec': return 'Figma Spec';
    default: return format;
  }
}

export function AnalysisDetailModal({ analysis, isOpen, onClose }: AnalysisDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'code' | 'overview'>('code');

  if (!isOpen || !analysis) return null;

  const language = getLanguageForFormat(analysis.format);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content analysis-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <XIcon />
        </button>

        {/* Header */}
        <div className="analysis-detail-header">
          <h2 className="analysis-detail-title">{analysis.videoName}</h2>
          <div className="analysis-detail-meta">
            <span className="badge badge-primary">{getFormatLabel(analysis.format)}</span>
            <span className="badge">
              <ZapIcon className="w-3 h-3" />
              {getQualityLabel(analysis.quality)}
            </span>
            <span className="analysis-detail-date">
              <CalendarIcon className="w-3.5 h-3.5" />
              {formatDate(analysis.createdAt)}
            </span>
            <span className="analysis-detail-credits">
              <CoinsIcon className="w-3.5 h-3.5" />
              {analysis.creditsUsed} credit{analysis.creditsUsed !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="analysis-detail-tabs">
          <button
            className={`analysis-detail-tab ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            Code
          </button>
          <button
            className={`analysis-detail-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
        </div>

        {/* Content */}
        <div className="analysis-detail-body">
          {activeTab === 'code' && analysis.code && (
            <CodeBlock
              code={analysis.code}
              language={language}
              title={getFormatLabel(analysis.format)}
            />
          )}
          {activeTab === 'code' && !analysis.code && (
            <p className="analysis-detail-empty">No code output available.</p>
          )}
          {activeTab === 'overview' && analysis.overview && (
            <div className="analysis-detail-overview">
              {analysis.overview}
            </div>
          )}
          {activeTab === 'overview' && !analysis.overview && (
            <p className="analysis-detail-empty">No overview available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
