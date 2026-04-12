import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { resolveKimiTemperature } from '../src/lib/video-understanding/providers/gemini-runner.ts';

test('Kimi deep-analysis uses the right temperature for thinking vs instant modes', () => {
  assert.equal(resolveKimiTemperature(false), 0.6);
  assert.equal(resolveKimiTemperature(true), 1.0);
});
