import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { toFirestoreSafePayload } from '../src/lib/video-understanding/persistence/run-store.ts';

test('toFirestoreSafePayload strips undefined values that Firestore rejects', () => {
  const value = {
    video: {
      uri: 'file-123',
      inlineBase64: undefined,
    },
    scenes: [{ id: 'scene_1', note: undefined, label: 'Entry' }],
  };

  const safe = toFirestoreSafePayload(value) as {
    video: Record<string, string>;
    scenes: Array<Record<string, string>>;
  };

  assert.deepEqual(safe, {
    video: {
      uri: 'file-123',
    },
    scenes: [{ id: 'scene_1', label: 'Entry' }],
  });
});
