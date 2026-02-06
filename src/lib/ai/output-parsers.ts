import type { AnalysisResult, OutputFormat, VerificationReport } from '@/types/analysis';

const FULL_OUTPUT_FORMATS: OutputFormat[] = [
  'clone_ui_animation',
  'extract_design_tokens',
  'remotion_demo_template',
  'qa_clone_checklist',
  'accessibility_audit',
  'interaction_state_machine',
  'performance_budget',
  'lottie_rive_export',
  'storyboard_breakdown',
  'tailwind_animate',
  'react_native_reanimated',
  'figma_motion_spec',
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
    case 'interaction_state_machine':
      return 'typescript';
    case 'react_native_reanimated':
      return 'tsx';
    case 'tailwind_animate':
      return 'css';
    case 'lottie_rive_export':
      return 'json';
    case 'clone_ui_animation':
    case 'extract_design_tokens':
    case 'remotion_demo_template':
    case 'qa_clone_checklist':
    case 'accessibility_audit':
    case 'performance_budget':
    case 'storyboard_breakdown':
    case 'figma_motion_spec':
    default:
      return 'markdown';
  }
}

export function getFileExtensionForFormat(format: OutputFormat): string {
  switch (format) {
    case 'clone_component':
    case 'clone_landing_page':
    case 'react_native_reanimated':
      return 'tsx';
    case 'interaction_state_machine':
      return 'ts';
    case 'tailwind_animate':
      return 'css';
    case 'lottie_rive_export':
      return 'json';
    case 'clone_ui_animation':
    case 'extract_design_tokens':
    case 'remotion_demo_template':
    case 'qa_clone_checklist':
    case 'accessibility_audit':
    case 'performance_budget':
    case 'storyboard_breakdown':
    case 'figma_motion_spec':
    default:
      return 'md';
  }
}

/**
 * Extract the verification report JSON from the combined agentic pipeline output.
 * Pass 4 output is a JSON block with { overallScore, discrepancies, corrections, summary }.
 * It appears at the tail end of the concatenated output.
 */
export function extractVerificationReport(rawOutput: string): VerificationReport | null {
  // Look for JSON blocks containing "overallScore" — this is unique to Pass 4
  const jsonBlockRegex = /```(?:json)?\s*\n([\s\S]*?)```/g;
  const matches = [...rawOutput.matchAll(jsonBlockRegex)];

  // Search from the end since Pass 4 is the last pass
  for (let i = matches.length - 1; i >= 0; i--) {
    const jsonStr = matches[i][1].trim();
    if (!jsonStr.includes('overallScore')) continue;

    try {
      const parsed = JSON.parse(jsonStr);
      if (typeof parsed.overallScore !== 'number') continue;

      return {
        overallScore: Math.max(0, Math.min(100, parsed.overallScore)),
        discrepancies: Array.isArray(parsed.discrepancies)
          ? parsed.discrepancies.map((d: Record<string, unknown>) => ({
              element: String(d.element || ''),
              issue: String(d.issue || ''),
              severity: ['minor', 'major', 'critical'].includes(d.severity as string)
                ? (d.severity as 'minor' | 'major' | 'critical')
                : 'minor',
              suggestedFix: String(d.suggestedFix || ''),
            }))
          : [],
        corrections: Array.isArray(parsed.corrections)
          ? parsed.corrections.map((c: unknown) => String(c))
          : [],
        summary: parsed.summary ? String(parsed.summary) : undefined,
      };
    } catch {
      continue;
    }
  }

  // Fallback: try to find raw JSON (without code fences) at the end of output
  const lastBraceIndex = rawOutput.lastIndexOf('{');
  if (lastBraceIndex !== -1) {
    // Find the matching closing brace
    let depth = 0;
    let end = -1;
    for (let i = lastBraceIndex; i < rawOutput.length; i++) {
      if (rawOutput[i] === '{') depth++;
      if (rawOutput[i] === '}') depth--;
      if (depth === 0) { end = i; break; }
    }
    if (end !== -1) {
      const jsonStr = rawOutput.slice(lastBraceIndex, end + 1);
      if (jsonStr.includes('overallScore')) {
        try {
          const parsed = JSON.parse(jsonStr);
          if (typeof parsed.overallScore === 'number') {
            return {
              overallScore: Math.max(0, Math.min(100, parsed.overallScore)),
              discrepancies: Array.isArray(parsed.discrepancies)
                ? parsed.discrepancies.map((d: Record<string, unknown>) => ({
                    element: String(d.element || ''),
                    issue: String(d.issue || ''),
                    severity: ['minor', 'major', 'critical'].includes(d.severity as string)
                      ? (d.severity as 'minor' | 'major' | 'critical')
                      : 'minor',
                    suggestedFix: String(d.suggestedFix || ''),
                  }))
                : [],
              corrections: Array.isArray(parsed.corrections)
                ? parsed.corrections.map((c: unknown) => String(c))
                : [],
              summary: parsed.summary ? String(parsed.summary) : undefined,
            };
          }
        } catch {
          // Not valid JSON
        }
      }
    }
  }

  return null;
}
