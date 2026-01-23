'use client';

import { ImageIcon, CalendarIcon, CoinsIcon } from '@/components/ui/icons';
import type { Analysis } from '@/types/database';

interface HistoryItemProps {
  analysis: Analysis;
  onClick: () => void;
}

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

function getQualityLabel(quality: string): string {
  switch (quality) {
    case 'fast': return 'Fast';
    case 'balanced': return 'Balanced';
    case 'precise': return 'Precise';
    default: return quality;
  }
}

function getFormatLabel(format: string): string {
  switch (format) {
    case 'natural': return 'Natural';
    case 'css': return 'CSS';
    case 'gsap': return 'GSAP';
    case 'framer': return 'Framer';
    case 'remotion': return 'Remotion';
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
