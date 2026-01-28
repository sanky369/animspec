'use client';

import { ImageIcon, CalendarIcon, CoinsIcon } from '@/components/ui/icons';
import type { Analysis } from '@/types/database';

interface HistoryItemProps {
  analysis: Analysis;
  onClick: () => void;
}

function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
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
    case 'qa_clone_checklist': return 'QA Checklist';
    default: return format;
  }
}

export function HistoryItem({ analysis, onClick }: HistoryItemProps) {
  return (
    <div className="history-card" onClick={onClick}>
      <div className="history-card-image">
        {analysis.frameImageUrl ? (
          <img src={analysis.frameImageUrl} alt={analysis.videoName} />
        ) : (
          <ImageIcon className="history-card-placeholder" />
        )}
      </div>
      <div className="history-card-content">
        <h3 className="history-card-title">{analysis.videoName}</h3>
        <div className="history-card-badges">
          <span className="badge badge-primary">{getFormatLabel(analysis.format)}</span>
          <span className="badge">{getQualityLabel(analysis.quality)}</span>
        </div>
        <div className="history-card-meta">
          <span className="history-card-date">
            <CalendarIcon />
            {formatDate(analysis.createdAt)}
          </span>
          <span className="history-card-credits">
            <CoinsIcon />
            {analysis.creditsUsed} credit{analysis.creditsUsed !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
