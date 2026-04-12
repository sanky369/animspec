import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { resolveKimiTemperature } from '../src/lib/video-understanding/providers/gemini-runner.ts';

test('Kimi deep-analysis requests always use the model-required temperature', () => {
  assert.equal(resolveKimiTemperature(), 1.0);
});
