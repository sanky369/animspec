'use client';

import { useEffect, useState, useRef } from 'react';
import { ZapIcon, ClipboardIcon, CpuIcon } from '@/components/ui/icons';

export function HeroSection() {
  const [timecode, setTimecode] = useState('00:00:00:00');
  const playheadRef = useRef<HTMLDivElement>(null);
  const videoLayerRef = useRef<HTMLDivElement>(null);

  // Synced animation for playhead and video clip
  useEffect(() => {
    let animationId: number;
    const duration = 4000; // 4 seconds
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = (currentTime - startTime) % duration;
      const progress = elapsed / duration;

      // Sine wave for smooth back-and-forth motion
      const sineProgress = Math.sin(progress * Math.PI * 2 - Math.PI / 2) * 0.5 + 0.5;
      const pos = 10 + sineProgress * 80; // 10% to 90%

      if (playheadRef.current) {
        playheadRef.current.style.left = `${pos}%`;
      }
      if (videoLayerRef.current) {
        // Clip from right: video visible on LEFT of playhead, code on RIGHT
        videoLayerRef.current.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Timecode animation
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
            Instant specs for Claude Code, Codex, and other AI coding agents.
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
            <div className="hero-frame-content hero-reveal">
              {/* Video layer (before) - controlled by JS */}
              <div ref={videoLayerRef} className="hero-layer hero-layer-video">
                <img
                  src="/hero-animation.jpg"
                  alt="UI Animation"
                  className="hero-video-image"
                />
              </div>
              {/* Code layer (after) */}
              <div className="hero-layer hero-layer-code">
                <div className="hero-code-content">
                  <code className="hero-prompt-text">
                    <span className="text-accent-primary">slideIn</span> from left{'\n'}
                    <span className="text-text-subtle">duration:</span> 0.4s{'\n'}
                    <span className="text-text-subtle">easing:</span> cubic-bezier(0.4, 0, 0.2, 1){'\n'}
                    <span className="text-text-subtle">delay:</span> 0.1s{'\n'}
                    <span className="text-text-subtle">transform:</span> translateX(-100%) → translateX(0)
                  </code>
                </div>
              </div>
            </div>
            <div ref={playheadRef} className="hero-playhead" />
          </div>
          <div className="hero-timecode">{timecode}</div>
        </div>
      </div>
    </section>
  );
}
