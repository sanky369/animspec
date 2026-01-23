'use client';

interface StreamingOutputProps {
  content: string;
  isComplete: boolean;
}

export function StreamingOutput({ content, isComplete }: StreamingOutputProps) {
  if (!content) return null;

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-text-muted">
          {isComplete ? 'Analysis complete' : 'Analyzing...'}
        </span>
        {!isComplete && (
          <span className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse" />
        )}
      </div>
      <div className="bg-bg-tertiary rounded-lg p-4 max-h-48 overflow-y-auto">
        <pre className="text-xs text-text-secondary font-mono whitespace-pre-wrap">
          {content}
          {!isComplete && <span className="animate-pulse">▊</span>}
        </pre>
      </div>
    </div>
  );
}
