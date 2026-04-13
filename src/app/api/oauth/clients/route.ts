import { NextRequest, NextResponse } from 'next/server';
import { authenticateFirebaseUser } from '@/lib/public-api/auth';
import { listOAuthClientsForUser, registerOAuthClient } from '@/lib/oauth/store';
import { OAUTH_SCOPE } from '@/lib/oauth/config';

export const runtime = 'nodejs';

function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Authentication required.' },
    { status: 401 }
  );
}

function parseRedirectUris(value: unknown): string[] {
  if (typeof value === 'string' && /^https?:\/\//.test(value)) {
    return [value];
  }
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string' && /^https?:\/\//.test(item));
  }
  return [];
}

export async function GET(request: NextRequest) {
  const userId = await authenticateFirebaseUser(request);
  if (!userId) {
    return unauthorizedResponse();
  }

  try {
    const clients = await listOAuthClientsForUser(userId);
    return NextResponse.json({
      clients: clients.map((client) => ({
        clientId: client.clientId,
        clientName: client.clientName,
        redirectUris: client.redirectUris,
        tokenEndpointAuthMethod: client.tokenEndpointAuthMethod,
        scope: client.scope,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to load OAuth clients' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const userId = await authenticateFirebaseUser(request);
  if (!userId) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json().catch(() => ({}));
    const redirectUris = parseRedirectUris((body as Record<string, unknown>).redirectUri ?? (body as Record<string, unknown>).redirectUris);
    const clientName = typeof (body as Record<string, unknown>).clientName === 'string'
      ? (body as Record<string, unknown>).clientName as string
      : 'AnimSpec Connector';
    const tokenEndpointAuthMethod =
      (body as Record<string, unknown>).tokenEndpointAuthMethod === 'client_secret_basic'
      || (body as Record<string, unknown>).tokenEndpointAuthMethod === 'none'
        ? (body as Record<string, unknown>).tokenEndpointAuthMethod as 'client_secret_basic' | 'none'
        : 'client_secret_post';

    if (redirectUris.length === 0) {
      return NextResponse.json(
        { error: 'A valid callback URL is required.' },
        { status: 400 }
      );
    }

    const client = await registerOAuthClient({
      createdByUserId: userId,
      clientName,
      redirectUris,
      tokenEndpointAuthMethod,
      grantTypes: ['authorization_code', 'refresh_token'],
      responseTypes: ['code'],
      scope: OAUTH_SCOPE,
    });

    return NextResponse.json({
      clientId: client.clientId,
      clientSecret: client.clientSecret,
      clientName: client.clientName,
      redirectUris: client.redirectUris,
      tokenEndpointAuthMethod: client.tokenEndpointAuthMethod,
      scope: client.scope,
      message: 'Store the client secret now. It is only shown once.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create OAuth client' },
      { status: 500 }
    );
  }
}
