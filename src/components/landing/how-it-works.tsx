'use client';

import { UploadIcon, SearchIcon, ClipboardIcon, RocketIcon } from '@/components/ui/icons';

const steps = [
  {
    number: 1,
    icon: UploadIcon,
    title: 'Upload Any Animation',
    description: 'Drop a screen recording, prototype demo, or any video with UI animations',
  },
  {
    number: 2,
    icon: SearchIcon,
    title: 'Choose Output Format',
    description: 'Pick from 15 formats — clone code, design tokens, Tailwind config, accessibility audit, and more',
  },
  {
    number: 3,
    icon: ClipboardIcon,
    title: 'AI Analyzes Motion',
    description: 'Gemini vision models extract every detail: timing, easing, colors, layout, and spatial relationships',
  },
  {
    number: 4,
    icon: RocketIcon,
    title: 'Use Anywhere',
    description: 'Copy specs to Claude Code, Cursor, Figma, or integrate directly into your codebase',
  },
];

export function HowItWorks() {
  return (
    <section className="section-how">
      <div className="section-header">
        <span className="section-eyebrow">Workflow</span>
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          From video to structured specifications in four steps
        </p>
      </div>
      <div className="steps-grid">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="step-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="step-number">{step.number}</div>
              <div className="step-icon">
                <Icon />
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
