'use client';

import { useState } from 'react';
import { CopyIcon, DownloadIcon, CheckIcon } from '@/components/ui/icons';

interface FramePreviewProps {
  frameImage?: string;
}

export function FramePreview({ frameImage }: FramePreviewProps) {
  const [copied, setCopied] = useState(false);

  if (!frameImage) {
    return (
      <div className="frame-empty">
        <div className="frame-empty-icon">
          <ImageIcon />
        </div>
        <p className="frame-empty-text">No reference image available</p>
        <p className="frame-empty-hint">Frame extraction failed or video format not supported</p>
      </div>
    );
  }

  const handleCopyImage = async () => {
    try {
      // Convert base64 to blob
      const response = await fetch(frameImage);
      const blob = await response.blob();

      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback: copy as data URL text
      try {
        await navigator.clipboard.writeText(frameImage);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        console.error('Failed to copy image:', error);
      }
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = frameImage;
    link.download = 'animation-reference.jpg';
    link.click();
  };

  return (
    <div className="frame-preview">
      <div className="frame-header">
        <div className="frame-title">
          <ImageIcon className="frame-title-icon" />
          <span>Reference Frame</span>
        </div>
        <div className="frame-actions">
          <button
            onClick={handleCopyImage}
            className={`frame-action ${copied ? 'success' : ''}`}
            title="Copy image to clipboard"
          >
            {copied ? <CheckIcon className="frame-action-icon" /> : <CopyIcon className="frame-action-icon" />}
            <span>{copied ? 'Copied!' : 'Copy Image'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="frame-action"
            title="Download image"
          >
            <DownloadIcon className="frame-action-icon" />
            <span>Download</span>
          </button>
        </div>
      </div>

      <div className="frame-image-container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={frameImage}
          alt="Animation reference frame"
          className="frame-image"
        />
      </div>

      <div className="frame-hint">
        <InfoIcon />
        <p>
          Copy this image and paste it along with the Agent-ready Instructions when prompting AI coding agents
          like Claude Code or Cursor for better context.
        </p>
      </div>
    </div>
  );
}

function ImageIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className || 'w-5 h-5'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
