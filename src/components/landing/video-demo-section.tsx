'use client';

import { useState } from 'react';
import { PlayIcon, XIcon } from '@/components/ui/icons';

export function VideoDemoSection() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <section className="video-demo-section" id="video-demo">
        <div className="section-header">
          <span className="section-eyebrow">See Demo</span>
          <h2 className="section-title">Watch It In Action</h2>
          <p className="section-subtitle">
            See how AnimSpec transforms any UI animation into code-ready specifications
          </p>
        </div>

        <div className="video-demo-container">
          <div
            className="video-demo-frame"
            onClick={() => setIsFullscreen(true)}
          >
            <video
              src="https://pub-ee60e37df1974dd6b8882763311b99fa.r2.dev/public/animspec.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="video-demo-player"
            />
            <div className="video-demo-overlay">
              <div className="video-demo-play-btn">
                <PlayIcon className="w-8 h-8" />
              </div>
              <span className="video-demo-hint">Click to expand</span>
            </div>
          </div>
        </div>
      </section>

      {isFullscreen && (
        <div className="video-modal-overlay" onClick={() => setIsFullscreen(false)}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="video-modal-close"
              onClick={() => setIsFullscreen(false)}
            >
              <XIcon className="w-5 h-5" />
            </button>
            <video
              src="https://pub-ee60e37df1974dd6b8882763311b99fa.r2.dev/public/animspec.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
              className="video-modal-video"
            />
          </div>
        </div>
      )}
    </>
  );
}
