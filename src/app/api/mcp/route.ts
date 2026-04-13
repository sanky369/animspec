import { type AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp';
import { authenticateApiKeyRequest } from '@/lib/public-api/auth';
import { createAnimSpecMcpServer } from '@/lib/mcp/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

async function buildAuthInfo(request: Request): Promise<AuthInfo | undefined> {
  const auth = await authenticateApiKeyRequest(request);
  if (!auth) {
    return undefined;
  }

  return {
    token: auth.rawKey,
    clientId: 'animspec-api-key',
    scopes: ['analyze'],
    extra: {
      userId: auth.userId,
      keyId: auth.keyId,
    },
  };
}

async function handleMcpRequest(request: Request): Promise<Response> {
  const server = createAnimSpecMcpServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  await server.connect(transport);

  try {
    return await transport.handleRequest(request, {
      authInfo: await buildAuthInfo(request),
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
