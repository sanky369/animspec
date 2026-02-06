'use client';

import { ZapIcon, ClipboardIcon, CpuIcon } from '@/components/ui/icons';

export function HeroSection() {
  return (
    <section className="hero hero-centered">
      <div className="hero-content animate-fade-in">
        <div className="hero-eyebrow">
          <ZapIcon className="w-3.5 h-3.5" />
          <span>AI-Powered Video Analysis</span>
        </div>

        <h1 className="hero-title text-balance">
          Turn Any Animation Into
          <span className="hero-title-accent">Developer-Ready Specs</span>
        </h1>

        <p className="hero-subtitle text-balance">
          Upload a video, choose from 15 output formats, get structured specifications.
          Clone animations, extract tokens, audit accessibility, export to any framework.
        </p>

        <div className="hero-features">
          <div className="feature-tag stagger-1">
            <ZapIcon className="w-3.5 h-3.5" />
            <span>15 Output Formats</span>
          </div>
          <div className="feature-tag stagger-2">
            <ClipboardIcon className="w-3.5 h-3.5" />
            <span>Deep AI Analysis</span>
          </div>
          <div className="feature-tag stagger-3">
            <CpuIcon className="w-3.5 h-3.5" />
            <span>Agent-Ready Output</span>
          </div>
        </div>
      </div>
    </section>
  );
}
