import { NextRequest, NextResponse } from 'next/server';
import { getOAuthClient } from '@/lib/oauth/store';

export const runtime = 'nodejs';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await context.params;
  const client = await getOAuthClient(clientId);

  if (!client) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  return NextResponse.json({
    client_id: client.clientId,
    client_name: client.clientName,
    redirect_uris: client.redirectUris,
    grant_types: client.grantTypes,
    response_types: client.responseTypes,
    token_endpoint_auth_method: client.tokenEndpointAuthMethod,
    scope: client.scope,
  }, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
