import { NextRequest, NextResponse } from 'next/server';
import { authenticateOAuthClient } from '@/lib/oauth/auth';
import { consumeAuthorizationCode, getOAuthClient, issueOAuthTokens, refreshOAuthTokens } from '@/lib/oauth/store';

export const runtime = 'nodejs';

function tokenError(error: string, errorDescription: string, status = 400) {
  return NextResponse.json(
    {
      error,
      error_description: errorDescription,
    },
    {
      status,
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}

export async function POST(request: NextRequest) {
  const params = new URLSearchParams(await request.text());
  const grantType = params.get('grant_type');

  const clientAuth = await authenticateOAuthClient(request, params);
  if (!clientAuth) {
    return tokenError('invalid_client', 'Client authentication failed.', 401);
  }

  const client = await getOAuthClient(clientAuth.clientId);
  if (!client) {
    return tokenError('invalid_client', 'Unknown client.', 401);
  }

  if (grantType === 'authorization_code') {
    const code = params.get('code');
    const redirectUri = params.get('redirect_uri');
    const codeVerifier = params.get('code_verifier');

    if (!code || !redirectUri || !codeVerifier) {
      return tokenError('invalid_request', 'code, redirect_uri, and code_verifier are required.');
    }

    const consumed = await consumeAuthorizationCode({
      code,
      clientId: client.clientId,
      redirectUri,
      codeVerifier,
    });

    if (!consumed) {
      return tokenError('invalid_grant', 'Authorization code is invalid, expired, or already used.');
    }

    const tokens = await issueOAuthTokens({
      clientId: client.clientId,
      userId: consumed.userId,
      scope: consumed.scope,
      resource: consumed.resource,
    });

    return NextResponse.json({
      access_token: tokens.accessToken,
      token_type: 'Bearer',
      expires_in: tokens.expiresIn,
      refresh_token: tokens.refreshToken,
      scope: consumed.scope,
    }, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  }

  if (grantType === 'refresh_token') {
    const refreshToken = params.get('refresh_token');
    if (!refreshToken) {
      return tokenError('invalid_request', 'refresh_token is required.');
    }

    const refreshed = await refreshOAuthTokens({
      refreshToken,
      clientId: client.clientId,
    });

    if (!refreshed) {
      return tokenError('invalid_grant', 'Refresh token is invalid or expired.');
    }

    return NextResponse.json({
      access_token: refreshed.accessToken,
      token_type: 'Bearer',
      expires_in: refreshed.expiresIn,
      refresh_token: refreshed.refreshToken,
      scope: refreshed.scope,
    }, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  }

  return tokenError('unsupported_grant_type', 'Only authorization_code and refresh_token are supported.');
}
