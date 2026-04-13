import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { buildClientRegistrationResponse } from '../src/lib/oauth/store.ts';

test('public OAuth clients omit client_secret fields in registration response', () => {
  const response = buildClientRegistrationResponse('https://www.animspec.com', {
    clientId: 'client_123',
    clientSecret: null,
    createdByUserId: null,
    clientName: 'ChatGPT',
    redirectUris: ['https://chatgpt.com/callback'],
    tokenEndpointAuthMethod: 'none',
    grantTypes: ['authorization_code', 'refresh_token'],
    responseTypes: ['code'],
    scope: 'animspec:mcp',
  });

  assert.equal(response.client_id, 'client_123');
  assert.equal('client_secret' in response, false);
  assert.equal('client_secret_expires_at' in response, false);
});
