import { type AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp';
import { authenticateApiKeyRequest } from '@/lib/public-api/auth';
import { createAnimSpecMcpServer } from '@/lib/mcp/server';
import { authenticateOAuthBearerToken } from '@/lib/oauth/auth';
import { getAppOrigin, getProtectedResourceMetadataUrl } from '@/lib/oauth/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

async function buildAuthInfo(request: Request): Promise<AuthInfo | undefined> {
  const auth = await authenticateApiKeyRequest(request);
  if (auth) {
    return {
      token: auth.rawKey,
      clientId: 'animspec-api-key',
      scopes: ['animspec:mcp'],
      extra: {
        userId: auth.userId,
        keyId: auth.keyId,
        authType: 'api-key',
      },
    };
  }

  const authorization = request.headers.get('authorization');
  const bearer = authorization?.startsWith('Bearer ')
    ? authorization.slice(7).trim()
    : null;

  if (!bearer) {
    return undefined;
  }

  const oauth = await authenticateOAuthBearerToken(bearer);
  if (!oauth) {
    return undefined;
  }

  return {
    token: bearer,
    clientId: oauth.clientId,
    scopes: oauth.scope.split(/\s+/).filter(Boolean),
    resource: oauth.resource ? new URL(oauth.resource) : undefined,
    extra: {
      userId: oauth.userId,
      authType: 'oauth',
    },
  };
}

function buildUnauthorizedResponse(request: Request) {
  const origin = getAppOrigin(new URL(request.url).origin);
  const resourceMetadata = getProtectedResourceMetadataUrl(origin);

  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Bearer realm="AnimSpec", resource_metadata="${resourceMetadata}"`,
      'Cache-Control': 'no-store',
    },
  });
}

async function handleMcpRequest(request: Request): Promise<Response> {
  const authInfo = await buildAuthInfo(request);
  const sharedModeEnabled = Boolean(process.env.CHATGPT_APP_SHARED_USER_ID);

  if (!authInfo && !sharedModeEnabled) {
    return buildUnauthorizedResponse(request);
  }

  const server = createAnimSpecMcpServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  await server.connect(transport);

  try {
    return await transport.handleRequest(request, {
      authInfo,
    });
  } finally {
    await server.close().catch(() => {});
    await transport.close().catch(() => {});
  }
}

export async function GET(request: Request) {
  return handleMcpRequest(request);
}

export async function POST(request: Request) {
  return handleMcpRequest(request);
}

export async function DELETE(request: Request) {
  return handleMcpRequest(request);
}
