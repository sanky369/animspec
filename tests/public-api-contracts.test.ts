import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { parsePublicAnalyzeRequest } from '../src/lib/public-api/contracts.ts';

test('parsePublicAnalyzeRequest accepts the new ui_ux_audit format and deepAnalysis flag', () => {
  const request = parsePublicAnalyzeRequest({
    format: 'ui_ux_audit',
    quality: 'kimi',
    trigger: 'scroll',
    deepAnalysis: true,
    videoUrl: 'https://example.com/demo.mp4',
    metadata: {
      duration: 4.2,
      width: 1440,
      height: 900,
      size: 12345,
    },
  });

  assert.equal(request.format, 'ui_ux_audit');
  assert.equal(request.quality, 'kimi');
  assert.equal(request.triggerContext, 'scroll');
  assert.equal(request.deepAnalysis, true);
  assert.equal(request.source.kind, 'video_url');
});

test('parsePublicAnalyzeRequest rejects multiple video sources', () => {
  assert.throws(
    () =>
      parsePublicAnalyzeRequest({
        format: 'clone_ui_animation',
        videoUrl: 'https://example.com/demo.mp4',
        videoBase64: 'abcd',
        mimeType: 'video/mp4',
      }),
    /exactly one video source/i
  );
});

test('parsePublicAnalyzeRequest accepts legacy agenticMode alias', () => {
  const request = parsePublicAnalyzeRequest({
    format: 'clone_component',
    quality: 'balanced',
    agenticMode: true,
    videoBase64: 'abcd',
    mimeType: 'video/mp4',
  });

  assert.equal(request.deepAnalysis, true);
  assert.equal(request.source.kind, 'inline_base64');
});

test('parsePublicAnalyzeRequest accepts generic videoUri sources for hosted attachment handoff', () => {
  const request = parsePublicAnalyzeRequest({
    format: 'ui_ux_audit',
    quality: 'balanced',
    videoUri: 'data:video/mp4;base64,YWJjZA==',
    mimeType: 'video/mp4',
    fileName: 'upload.mp4',
  });

  assert.equal(request.source.kind, 'video_uri');
  assert.equal(request.source.videoUri.startsWith('data:video/mp4;base64,'), true);
});
