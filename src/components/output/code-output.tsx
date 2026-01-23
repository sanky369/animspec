'use client';

import { CodeBlock } from '@/components/ui';
import { getLanguageForFormat } from '@/lib/ai/output-parsers';
import { FORMAT_OPTIONS } from '@/types/output-formats';
import type { OutputFormat } from '@/types/analysis';

interface CodeOutputProps {
  code: string;
  format: OutputFormat;
  notes?: string;
  generatedFormats?: OutputFormat[];
  onFormatChange?: (format: OutputFormat) => void;
}

export function CodeOutput({ code, format, notes, generatedFormats, onFormatChange }: CodeOutputProps) {
  const formatOption = FORMAT_OPTIONS.find((f) => f.id === format);
  const language = getLanguageForFormat(format);
  const title = formatOption?.label || 'Code';

  return (
    <div>
      {notes && (
        <div style={{
          marginBottom: '16px',
          padding: '12px 14px',
          borderRadius: '10px',
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border-default)',
          color: 'var(--text-secondary)',
          fontSize: '13px',
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
        }}>
          {notes}
        </div>
      )}
      <CodeBlock
        code={code}
        language={language}
        title={title}
        currentFormat={format}
        generatedFormats={generatedFormats}
        onFormatChange={onFormatChange}
      />
    </div>
  );
}
