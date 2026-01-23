'use client';

import { useEffect, useState } from 'react';
import { ZapIcon, ClipboardIcon, CpuIcon, PlayIcon } from '@/components/ui/icons';

export function HeroSection() {
  const [timecode, setTimecode] = useState('00:00:00:00');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const frames = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(2, '0');
      setTimecode(`${hours}:${minutes}:${seconds}:${frames}`);
    }, 41); // ~24fps

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero-layout">
        <div className="hero-content animate-slide-in-left">
          <div className="hero-eyebrow">
            <ZapIcon className="w-3.5 h-3.5" />
            <span>AI-Powered Animation Cloning</span>
          </div>

          <h1 className="hero-title text-balance">
            Clone
            <span className="hero-title-accent">Any UI Animation</span>
            with Ease
          </h1>

          <p className="hero-subtitle text-balance">
            See an animation you love? Record it, upload it, get agent-ready prompts.
            Instant specs for Claude Code, Cursor, and AI coding agents.
          </p>

          <div className="hero-features">
            <div className="feature-tag stagger-1">
              <ZapIcon className="w-3.5 h-3.5" />
              <span>Instant Analysis</span>
            </div>
            <div className="feature-tag stagger-2">
              <ClipboardIcon className="w-3.5 h-3.5" />
              <span>CSS / GSAP / Framer</span>
            </div>
            <div className="feature-tag stagger-3">
              <CpuIcon className="w-3.5 h-3.5" />
              <span>AI-Agent Ready</span>
            </div>
          </div>
        </div>

        <div className="hero-visual animate-slide-in-right">
          <div className="hero-frame">
            <div className="hero-frame-content">
              <PlayIcon className="w-12 h-12 text-text-subtle opacity-30" />
            </div>
            <div className="hero-playhead" />
          </div>
          <div className="hero-timecode">{timecode}</div>
        </div>
      </div>
    </section>
  );
}
