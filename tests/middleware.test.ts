import test from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { middleware } from '../src/middleware.ts';

test('redirects signed-in users from landing root to dashboard', () => {
  const request = new NextRequest('https://animspec.ai/', {
    headers: {
      cookie: '__session=fake-session-token',
    },
  });

  const response = middleware(request);

  assert.equal(response.status, 307);
  assert.equal(response.headers.get('location'), 'https://animspec.ai/dashboard');
});

test('does not redirect signed-out users from landing root', () => {
  const request = new NextRequest('https://animspec.ai/');
  const response = middleware(request);

  assert.equal(response.status, 200);
});
