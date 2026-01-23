'use client';

import { UploadIcon, SearchIcon, ClipboardIcon, RocketIcon } from '@/components/ui/icons';

const steps = [
  {
    number: 1,
    icon: UploadIcon,
    title: 'Upload Video',
    description: 'Drop any animation video — screen recordings, prototypes, or references',
  },
  {
    number: 2,
    icon: SearchIcon,
    title: 'AI Analysis',
    description: 'Gemini extracts motion patterns, timing, and easing curves automatically',
  },
  {
    number: 3,
    icon: ClipboardIcon,
    title: 'Get Instructions',
    description: 'Receive precise animation specs in your preferred format',
  },
  {
    number: 4,
    icon: RocketIcon,
    title: 'Paste & Build',
    description: 'Copy to Claude Code, Cursor, or any AI coding agent',
  },
];

export function HowItWorks() {
  return (
    <section className="section-how">
      <div className="section-header">
        <span className="section-eyebrow">Workflow</span>
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Transform any animation into code-ready instructions in seconds
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
