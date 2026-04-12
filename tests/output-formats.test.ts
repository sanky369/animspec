import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via --experimental-strip-types
import { FORMAT_OPTIONS } from '../src/types/output-formats.ts';
// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { getFormatTemplate } from '../src/lib/ai/prompts.ts';

test('includes the UI/UX audit format in the shared registry', () => {
  const format = FORMAT_OPTIONS.find((option) => option.id === 'ui_ux_audit');

  assert.ok(format);
  assert.equal(format?.label, 'UI/UX Audit');
  assert.equal(format?.language, 'markdown');
});

test('labels copy_design_style as Copy Design in the shared registry', () => {
  const format = FORMAT_OPTIONS.find((option) => option.id === 'copy_design_style');

  assert.ok(format);
  assert.equal(format?.label, 'Copy Design');
  assert.match(format?.description ?? '', /full UI\/UX, visual system, and screen flow/i);
});

test('copy_design_style prompt requests full rebuild context, not just style vibes', () => {
  const template = getFormatTemplate('copy_design_style');

  assert.match(template, /## OUTPUT FORMAT: Copy This Design/);
  assert.match(template, /## Flow Overview/);
  assert.match(template, /## Screen Breakdown/);
  assert.match(template, /## External Coding Agent Brief/);
  assert.match(template, /screen-to-screen map/i);
});
