import { NextRequest, NextResponse } from 'next/server';
import { authenticateSessionUser } from '@/lib/oauth/auth';
import { OAUTH_SCOPE } from '@/lib/oauth/config';
import { createAuthorizationCode, getOAuthClient } from '@/lib/oauth/store';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const userId = await authenticateSessionUser(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const clientId = typeof body.clientId === 'string' ? body.clientId : '';
  const redirectUri = typeof body.redirectUri === 'string' ? body.redirectUri : '';
  const state = typeof body.state === 'string' ? body.state : '';
  const scope = typeof body.scope === 'string' && body.scope.trim().length > 0 ? body.scope : OAUTH_SCOPE;
  const resource = typeof body.resource === 'string' && body.resource.length > 0 ? body.resource : null;
  const codeChallenge = typeof body.codeChallenge === 'string' ? body.codeChallenge : '';
  const codeChallengeMethod = body.codeChallengeMethod === 'S256' ? 'S256' : null;

  if (!clientId || !redirectUri || !codeChallenge || codeChallengeMethod !== 'S256') {
    return NextResponse.json({ error: 'Invalid authorization request' }, { status: 400 });
  }

  const client = await getOAuthClient(clientId);
  if (!client || !client.redirectUris.includes(redirectUri)) {
    return NextResponse.json({ error: 'Unknown client or redirect URI' }, { status: 400 });
  }

  const code = await createAuthorizationCode({
    clientId,
    userId,
    redirectUri,
    scope,
    resource,
    codeChallenge,
    codeChallengeMethod,
  });

  const callbackUrl = new URL(redirectUri);
  callbackUrl.searchParams.set('code', code);
  if (state) {
    callbackUrl.searchParams.set('state', state);
  }

  return NextResponse.json({
    redirectTo: callbackUrl.toString(),
  });
}
