import type { AnalysisResult, OutputFormat } from '@/types/analysis';

export function parseAnalysisOutput(
  rawOutput: string,
  format: OutputFormat
): AnalysisResult {
  const { code, notes } = extractCodeAndNotes(rawOutput, format);

  return {
    overview: extractOverview(rawOutput),
    code,
    format,
    notes,
    rawAnalysis: rawOutput,
  };
}

function extractOverview(output: string): string {
  // Try to extract the Animation Overview section
  const overviewMatch = output.match(/\*\*Animation Overview:\*\*\s*\n([^\n*]+)/i);
  if (overviewMatch) {
    return overviewMatch[1].trim();
  }

  // Fallback: get first paragraph
  const firstParagraph = output.split('\n\n')[0];
  return firstParagraph.slice(0, 200);
}

function extractCodeAndNotes(
  output: string,
  format: OutputFormat
): { code: string; notes?: string } {
  if (format === 'natural' || format === 'remotion') {
    // For natural language and remotion, return the full output
    return { code: output };
  }

  // Extract code blocks
  const codeBlockRegex = /```(?:css|javascript|tsx|js|typescript)?\n([\s\S]*?)```/g;
  const matches = [...output.matchAll(codeBlockRegex)];

  if (matches.length > 0) {
    const code = matches.map((m) => m[1].trim()).filter(Boolean).join('\n\n');
    const notes = output.replace(codeBlockRegex, '').trim();

    return {
      code: code.length > 0 ? code : output,
      notes: notes.length > 0 ? notes : undefined,
    };
  }

  // Fallback: return full output if no code blocks found
  return { code: output };
}

export function getLanguageForFormat(format: OutputFormat): string {
  switch (format) {
    case 'css':
      return 'css';
    case 'gsap':
      return 'javascript';
    case 'framer':
      return 'tsx';
    case 'remotion':
      return 'markdown';
    case 'natural':
    default:
      return 'markdown';
  }
}

export function getFileExtensionForFormat(format: OutputFormat): string {
  switch (format) {
    case 'css':
      return 'css';
    case 'gsap':
      return 'js';
    case 'framer':
      return 'tsx';
    case 'remotion':
      return 'md';
    case 'natural':
    default:
      return 'md';
  }
}
