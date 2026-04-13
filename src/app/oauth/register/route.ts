import { NextRequest, NextResponse } from 'next/server';
import { buildClientRegistrationResponse, getOAuthClient, registerOAuthClient } from '@/lib/oauth/store';
import { getAppOrigin, OAUTH_SCOPE } from '@/lib/oauth/config';

export const runtime = 'nodejs';

function sanitizeRedirectUris(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === 'string' && /^https?:\/\//.test(item));
}

export async function POST(request: NextRequest) {
  const origin = getAppOrigin(request.nextUrl.origin);
  const body = await request.json().catch(() => ({}));

  const redirectUris = sanitizeRedirectUris((body as Record<string, unknown>).redirect_uris);
  if (redirectUris.length === 0) {
    return NextResponse.json(
      { error: 'invalid_client_metadata', error_description: 'redirect_uris is required.' },
      { status: 400 }
    );
  }

  const authMethod = (body as Record<string, unknown>).token_endpoint_auth_method;
  const tokenEndpointAuthMethod =
    authMethod === 'client_secret_post' || authMethod === 'client_secret_basic'
      ? authMethod
      : 'none';

  const client = await registerOAuthClient({
    clientName: typeof (body as Record<string, unknown>).client_name === 'string'
      ? (body as Record<string, unknown>).client_name as string
      : null,
    redirectUris,
    tokenEndpointAuthMethod,
    grantTypes: ['authorization_code', 'refresh_token'],
    responseTypes: ['code'],
    scope: typeof (body as Record<string, unknown>).scope === 'string'
      ? (body as Record<string, unknown>).scope as string
      : OAUTH_SCOPE,
  });

  return NextResponse.json(buildClientRegistrationResponse(origin, client), {
    status: 201,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

export async function GET() {
  return NextResponse.json(
    { error: 'method_not_allowed' },
    { status: 405 }
  );
}
