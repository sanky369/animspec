'use client';

import type { AnalysisProgress as AnalysisProgressType } from '@/types/analysis';
import { Spinner } from '@/components/ui';

interface AnalysisProgressProps {
  progress: AnalysisProgressType;
}

export function AnalysisProgress({ progress }: AnalysisProgressProps) {
  const steps = [
    { id: 'uploading', label: 'Video uploaded', icon: '📹' },
    { id: 'extracting', label: 'Extracting frames', icon: '🎞️' },
    { id: 'analyzing', label: 'AI analysis', icon: '🤖' },
    { id: 'generating', label: 'Generating code', icon: '✨' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === progress.step);

  return (
    <div className="flex flex-col items-center py-8">
      <Spinner size="lg" className="mb-4" />
      <p className="text-text-secondary text-center mb-6">{progress.message}</p>

      <div className="space-y-2 w-full max-w-xs">
        {steps.map((step, index) => {
          const isComplete = index < currentStepIndex;
          const isActive = index === currentStepIndex;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive ? 'bg-bg-tertiary' : ''
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isComplete
                    ? 'bg-accent-cyan text-bg-primary'
                    : isActive
                      ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan'
                      : 'bg-bg-tertiary text-text-muted border border-border-color'
                }`}
              >
                {isComplete ? '✓' : step.icon}
              </div>
              <span
                className={`text-sm ${
                  isComplete
                    ? 'text-accent-cyan'
                    : isActive
                      ? 'text-text-primary font-medium'
                      : 'text-text-muted'
                }`}
              >
                {step.label}
              </span>
              {isActive && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
