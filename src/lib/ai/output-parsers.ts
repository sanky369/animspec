import type { AnalysisResult, OutputFormat } from '@/types/analysis';

const FULL_OUTPUT_FORMATS: OutputFormat[] = [
  'clone_ui_animation',
  'extract_design_tokens',
  'remotion_demo_template',
  'qa_clone_checklist',
];

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

export function extractOverview(output: string): string {
  // Prefer the existing UI-friendly marker
  const overviewMatch = output.match(/\*\*Animation Overview:\*\*\s*\n([^\n]+)/i);
  if (overviewMatch) {
    return overviewMatch[1].trim();
  }

  // Support the heading-based format used by several use cases
  const h2Match = output.match(/^##\s*Overview\s*\n([\s\S]*?)(?=\n##\s|\n$)/m);
  if (h2Match) {
    const block = h2Match[1].trim();
    const firstPara = block.split('\n\n')[0]?.trim();
    if (firstPara) return firstPara.slice(0, 200);
    return block.slice(0, 200);
  }

  // Fallback: get first paragraph
  const firstParagraph = output.split('\n\n')[0];
  return firstParagraph.slice(0, 200);
}

function extractCodeAndNotes(
  output: string,
  format: OutputFormat
): { code: string; notes?: string } {
  // For full-output formats, keep the entire markdown (with headings + code fences)
  if (FULL_OUTPUT_FORMATS.includes(format)) {
    return { code: output };
  }

  // For code-focused formats (component / landing), extract the single TSX block if present
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
    case 'clone_component':
    case 'clone_landing_page':
      return 'tsx';
    case 'clone_ui_animation':
    case 'extract_design_tokens':
    case 'remotion_demo_template':
    case 'qa_clone_checklist':
    default:
      return 'markdown';
  }
}

export function getFileExtensionForFormat(format: OutputFormat): string {
  switch (format) {
    case 'clone_component':
    case 'clone_landing_page':
      return 'tsx';
    case 'clone_ui_animation':
    case 'extract_design_tokens':
    case 'remotion_demo_template':
    case 'qa_clone_checklist':
    default:
      return 'md';
  }
}
