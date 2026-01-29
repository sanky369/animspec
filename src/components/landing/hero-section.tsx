'use client';

import { ZapIcon, ClipboardIcon, CpuIcon } from '@/components/ui/icons';

export function HeroSection() {
  return (
    <section className="hero hero-centered">
      <div className="hero-content animate-fade-in">
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
    </section>
  );
}
