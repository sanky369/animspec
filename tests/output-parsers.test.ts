import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { parseAnalysisOutput } from '../src/lib/ai/output-parsers.ts';

test('copy_design_style preserves the full markdown brief instead of extracting only fenced code', () => {
  const rawOutput = `## Rebuild Summary
- **In 1 sentence:** A clean healthcare intake flow.

## Flow Overview
Step-by-step screen progression and user intent.

## Implementation Kit

\`\`\`css
:root {
  --bg: #ffffff;
}
\`\`\`
`;

  const parsed = parseAnalysisOutput(rawOutput, 'copy_design_style');

  assert.equal(parsed.code, rawOutput);
  assert.equal(parsed.notes, undefined);
  assert.match(parsed.overview, /Rebuild Summary|healthcare intake flow/i);
});

test('clone_component still extracts fenced code for code-first formats', () => {
  const rawOutput = `Build notes before code.

\`\`\`tsx
export function Demo() {
  return <div>Hello</div>;
}
\`\`\`
`;

  const parsed = parseAnalysisOutput(rawOutput, 'clone_component');

  assert.match(parsed.code, /export function Demo/);
  assert.match(parsed.notes ?? '', /Build notes before code/);
});
