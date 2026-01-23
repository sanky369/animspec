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
            <span>AI-Powered Analysis</span>
          </div>

          <h1 className="hero-title text-balance">
            Video to
            <span className="hero-title-accent">Code-Ready</span>
            Animation Specs
          </h1>

          <p className="hero-subtitle text-balance">
            Transform any animation video into precise, agent-ready instructions.
            Built for Claude Code, Cursor, and modern AI coding tools.
          </p>

          <div className="hero-features">
            <div className="feature-tag stagger-1">
              <ZapIcon className="w-3.5 h-3.5" />
              <span>Gemini Vision</span>
            </div>
            <div className="feature-tag stagger-2">
              <ClipboardIcon className="w-3.5 h-3.5" />
              <span>CSS / GSAP / Framer</span>
            </div>
            <div className="feature-tag stagger-3">
              <CpuIcon className="w-3.5 h-3.5" />
              <span>Agent-Optimized</span>
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
