import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via --experimental-strip-types
import { FORMAT_OPTIONS } from '../src/types/output-formats.ts';

test('includes the UI/UX audit format in the shared registry', () => {
  const format = FORMAT_OPTIONS.find((option) => option.id === 'ui_ux_audit');

  assert.ok(format);
  assert.equal(format?.label, 'UI/UX Audit');
  assert.equal(format?.language, 'markdown');
});
