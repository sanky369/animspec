'use client';

import { ZapIcon, ClipboardIcon, CpuIcon } from '@/components/ui/icons';

export function HeroSection() {
  return (
    <section className="hero hero-centered">
      <div className="hero-content animate-fade-in">
        <div className="hero-eyebrow">
          <ZapIcon className="w-3.5 h-3.5" />
          <span>Video to Prompt for Coding Agents</span>
        </div>

        <h1 className="hero-title text-balance">
          <span className="hero-title-accent">Capture Deep Insights from Any Video</span>
        </h1>

        <p className="hero-subtitle text-balance">
          Upload a screen recording and get structured prompts your coding agent can implement —
          clone UIs, extract design tokens, generate components, audit accessibility.
        </p>

        <div className="hero-features">
          <div className="feature-tag stagger-1">
            <ZapIcon className="w-3.5 h-3.5" />
            <span>15 Output Formats</span>
          </div>
          <div className="feature-tag stagger-2">
            <ClipboardIcon className="w-3.5 h-3.5" />
            <span>Paste Into Any Agent</span>
          </div>
          <div className="feature-tag stagger-3">
            <CpuIcon className="w-3.5 h-3.5" />
            <span>Powered by Gemini 3</span>
          </div>
        </div>
      </div>
    </section>
  );
}
