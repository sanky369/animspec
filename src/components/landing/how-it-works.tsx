'use client';

import { UploadIcon, SearchIcon, ClipboardIcon, RocketIcon } from '@/components/ui/icons';

const steps = [
  {
    number: 1,
    icon: UploadIcon,
    title: 'Record Any Screen',
    description: 'Screen record any UI you want to recreate — websites, apps, animations, landing pages',
  },
  {
    number: 2,
    icon: SearchIcon,
    title: 'Choose Your Format',
    description: 'Pick from 15 prompt formats — React components, Tailwind config, design tokens, and more',
  },
  {
    number: 3,
    icon: ClipboardIcon,
    title: 'Gemini 3 Analyzes',
    description: 'Gemini 3 thinking mode extracts every detail: timing, easing, layout, and spatial relationships',
  },
  {
    number: 4,
    icon: RocketIcon,
    title: 'Paste Into Your Agent',
    description: 'Copy the prompt into Claude Code, Cursor, Copilot, or any AI coding agent and watch it build',
  },
];

export function HowItWorks() {
  return (
    <section className="section-how">
      <div className="section-header">
        <span className="section-eyebrow">Workflow</span>
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          From video to agent-ready prompt in four steps
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
