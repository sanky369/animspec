import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via --experimental-strip-types
import { GEMINI_INLINE_SAFE_LIMIT, shouldUseGeminiFilesUpload } from '../src/lib/ai/gemini-utils.ts';

test('routes Gemini agentic analyses through Files API', () => {
  assert.equal(
    shouldUseGeminiFilesUpload({
      quality: 'balanced',
      fileSize: 128 * 1024,
      agenticMode: true,
      hasAnalysisImages: false,
    }),
    true
  );
});

test('routes Gemini analyses with keyframe images through Files API', () => {
  assert.equal(
    shouldUseGeminiFilesUpload({
      quality: 'precise',
      fileSize: 128 * 1024,
      agenticMode: false,
      hasAnalysisImages: true,
    }),
    true
  );
});

test('routes larger Gemini uploads through Files API', () => {
  assert.equal(
    shouldUseGeminiFilesUpload({
      quality: 'balanced',
      fileSize: GEMINI_INLINE_SAFE_LIMIT + 1,
      agenticMode: false,
      hasAnalysisImages: false,
    }),
    true
  );
});

test('keeps tiny non-agentic Gemini uploads inline when safe', () => {
  assert.equal(
    shouldUseGeminiFilesUpload({
      quality: 'balanced',
      fileSize: 128 * 1024,
      agenticMode: false,
      hasAnalysisImages: false,
    }),
    false
  );
});

test('never routes Kimi through Gemini Files API', () => {
  assert.equal(
    shouldUseGeminiFilesUpload({
      quality: 'kimi',
      fileSize: GEMINI_INLINE_SAFE_LIMIT * 4,
      agenticMode: true,
      hasAnalysisImages: true,
    }),
    false
  );
});
