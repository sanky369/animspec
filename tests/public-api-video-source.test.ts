import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { prepareAnalysisSource } from '../src/lib/public-api/video-source.ts';

test('prepareAnalysisSource prefers Gemini Files for hosted attachment URIs when requested', async () => {
  const prepared = await prepareAnalysisSource(
    {
      kind: 'video_uri',
      videoUri: 'data:video/mp4;base64,YWJjZA==',
      mimeType: 'video/mp4',
      fileName: 'upload.mp4',
    },
    'balanced',
    'gemini-key',
    {
      preferGeminiFileUpload: true,
      uploadVideo: async () => ({
        name: 'files/123',
        uri: 'https://generativelanguage.googleapis.com/v1beta/files/123',
        mimeType: 'video/mp4',
        sizeBytes: '4',
        state: 'ACTIVE',
      }),
    }
  );

  assert.equal(prepared.fileUri, 'https://generativelanguage.googleapis.com/v1beta/files/123');
  assert.equal(prepared.fileMimeType, 'video/mp4');
  assert.equal(prepared.inlineVideoBase64, undefined);
});
