import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { normalizeMcpVideoSource } from '../src/lib/mcp/video-input.ts';

test('normalizeMcpVideoSource maps hosted file objects into video_uri sources', () => {
  const source = normalizeMcpVideoSource({
    video_file: {
      download_url: 'https://files.example.com/video.mp4',
      file_id: 'file_123',
      mime_type: 'video/mp4',
      name: 'video.mp4',
    },
  });

  assert.equal(source.kind, 'video_uri');
  if (source.kind !== 'video_uri') {
    throw new Error('Expected video_uri source');
  }
  assert.equal(source.videoUri, 'https://files.example.com/video.mp4');
  assert.equal(source.fileName, 'video.mp4');
  assert.equal(source.mimeType, 'video/mp4');
});

test('normalizeMcpVideoSource requires exactly one source', () => {
  assert.throws(
    () => normalizeMcpVideoSource({
      video_url: 'https://example.com/video.mp4',
      video_uri: 'https://example.com/other.mp4',
    }),
    /exactly one source/i
  );
});
