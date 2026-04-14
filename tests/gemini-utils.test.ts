import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via --experimental-strip-types
import {
  GEMINI_DIRECT_UPLOAD_SAFE_LIMIT,
  GEMINI_INLINE_SAFE_LIMIT,
  getGeminiUploadTransport,
  shouldUseGeminiFilesUpload,
} from '../src/lib/ai/gemini-utils.ts';

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

test('routes small Gemini file uploads directly through the upload endpoint', () => {
  assert.equal(
    getGeminiUploadTransport({
      quality: 'balanced',
      fileSize: GEMINI_INLINE_SAFE_LIMIT + 1,
      agenticMode: false,
      hasAnalysisImages: false,
    }),
    'direct'
  );
});

test('routes larger Gemini file uploads through R2 to avoid request size failures', () => {
  assert.equal(
    getGeminiUploadTransport({
      quality: 'precise',
      fileSize: GEMINI_DIRECT_UPLOAD_SAFE_LIMIT + 1,
      agenticMode: false,
      hasAnalysisImages: false,
    }),
    'r2'
  );
});
