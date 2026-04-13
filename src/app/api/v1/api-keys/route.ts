import { type NextRequest } from 'next/server';
import { createApiKey, deleteApiKey, listApiKeys, revokeApiKey } from '@/lib/api-keys';
import { authenticateFirebaseUser } from '@/lib/public-api/auth';

export const runtime = 'nodejs';

function unauthorizedResponse() {
  return Response.json(
    { error: 'Authentication required. Pass a Firebase Auth Bearer token.' },
    { status: 401 }
  );
}

export async function POST(request: NextRequest) {
  const userId = await authenticateFirebaseUser(request);
  if (!userId) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json().catch(() => ({}));
    const name = typeof (body as Record<string, unknown>).name === 'string'
      ? ((body as Record<string, unknown>).name as string)
      : 'Default';

    const result = await createApiKey(userId, name);

    return Response.json({
      id: result.id,
      key: result.rawKey,
      prefix: result.prefix,
      name,
      message: 'Store this key now. It will not be shown again.',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create API key';
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const userId = await authenticateFirebaseUser(request);
  if (!userId) {
    return unauthorizedResponse();
  }

  try {
    const keys = await listApiKeys(userId);
    return Response.json({ keys });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to list API keys';
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const userId = await authenticateFirebaseUser(request);
  if (!userId) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json().catch(() => ({}));
    const keyId = typeof (body as Record<string, unknown>).id === 'string'
      ? ((body as Record<string, unknown>).id as string)
      : '';

    if (!keyId) {
      return Response.json({ error: 'Missing required field: id' }, { status: 400 });
    }

    const revoked = await revokeApiKey(userId, keyId);
    if (!revoked) {
      return Response.json({ error: 'API key not found or already revoked' }, { status: 404 });
    }

    return Response.json({ success: true, message: 'API key revoked' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to revoke API key';
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const userId = await authenticateFirebaseUser(request);
  if (!userId) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json().catch(() => ({}));
    const keyId = typeof (body as Record<string, unknown>).id === 'string'
      ? ((body as Record<string, unknown>).id as string)
      : '';
    const action = typeof (body as Record<string, unknown>).action === 'string'
      ? ((body as Record<string, unknown>).action as string)
      : '';

    if (!keyId || action !== 'delete') {
      return Response.json({ error: 'Missing required fields: id and action=delete' }, { status: 400 });
    }

    const deleted = await deleteApiKey(userId, keyId);
    if (!deleted) {
      return Response.json({ error: 'API key not found' }, { status: 404 });
    }

    return Response.json({ success: true, message: 'API key deleted' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete API key';
    return Response.json({ error: message }, { status: 500 });
  }
}
