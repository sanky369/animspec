import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { generateApiKey, hashApiKey, isAnimSpecApiKey } from '../src/lib/api-keys/index.ts';

test('generateApiKey returns a one-time raw key, prefix, and hash', () => {
  const generated = generateApiKey();

  assert.equal(isAnimSpecApiKey(generated.rawKey), true);
  assert.equal(generated.rawKey.startsWith(generated.prefix), true);
  assert.equal(generated.keyHash, hashApiKey(generated.rawKey));
  assert.equal(generated.keyHash.length, 64);
});

test('isAnimSpecApiKey only accepts ask_ keys', () => {
  assert.equal(isAnimSpecApiKey('ask_1234'), true);
  assert.equal(isAnimSpecApiKey('sk_1234'), false);
  assert.equal(isAnimSpecApiKey(''), false);
  assert.equal(isAnimSpecApiKey(undefined), false);
});
