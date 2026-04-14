import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { prepareVideoInputForMcp } from '../src/lib/public-api/prepare-video-input.ts';

test('prepareVideoInputForMcp returns reusable file_uri payload for hosted attachments', async () => {
  const prepared = await prepareVideoInputForMcp({
    source: {
      kind: 'video_uri',
      videoUri: 'data:video/mp4;base64,YWJjZA==',
      mimeType: 'video/mp4',
      fileName: 'upload.mp4',
    },
    quality: 'balanced',
    preferGeminiFileUpload: true,
    uploadVideo: async () => ({
      name: 'files/123',
      uri: 'https://generativelanguage.googleapis.com/v1beta/files/123',
      mimeType: 'video/mp4',
      sizeBytes: '4',
      state: 'ACTIVE',
    }),
  });

  assert.equal(prepared.recommendedField, 'file_uri');
  assert.equal(prepared.recommendedMimeField, 'file_mime_type');
});
