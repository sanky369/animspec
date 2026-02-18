import { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { createApiKey, listApiKeys, revokeApiKey } from '@/lib/api-keys';

export const runtime = 'nodejs';

/**
 * Verify Firebase Auth token from Authorization header.
 */
async function authenticateUser(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  try {
    const token = authHeader.slice(7);
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded.uid;
  } catch {
    return null;
  }
}

/**
 * POST /api/v1/api-keys
 *
 * Generate a new API key for the authenticated user.
 * Requires Firebase Auth Bearer token.
 *
 * Body: { "name": "My CLI Key" }
 *
 * Response: { "id": "...", "key": "ask_...", "prefix": "ask_a1b2...", "name": "My CLI Key" }
 *
 * IMPORTANT: The full `key` is only returned once. Store it securely.
 */
export async function POST(request: NextRequest) {
  const userId = await authenticateUser(request);
  if (!userId) {
    return Response.json(
      { error: 'Authentication required. Pass a Firebase Auth token as Bearer token.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const name = (body as Record<string, unknown>).name as string || 'Default';

    const result = await createApiKey(userId, name);

    return Response.json({
      id: result.id,
      key: result.rawKey,
      prefix: result.prefix,
      name,
      message: 'Store this key securely — it will not be shown again.',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create API key';
    return Response.json({ error: message }, { status: 500 });
  }
}

/**
 * GET /api/v1/api-keys
 *
 * List all API keys for the authenticated user.
 * Keys are shown as prefixes only (e.g. "ask_a1b2...").
 */
export async function GET(request: NextRequest) {
  const userId = await authenticateUser(request);
  if (!userId) {
    return Response.json(
      { error: 'Authentication required. Pass a Firebase Auth token as Bearer token.' },
      { status: 401 }
    );
  }

  try {
    const keys = await listApiKeys(userId);
    return Response.json({ keys });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to list API keys';
    return Response.json({ error: message }, { status: 500 });
  }
}

/**
 * DELETE /api/v1/api-keys
 *
 * Revoke an API key.
 *
 * Body: { "id": "key-document-id" }
 */
export async function DELETE(request: NextRequest) {
  const userId = await authenticateUser(request);
  if (!userId) {
    return Response.json(
      { error: 'Authentication required. Pass a Firebase Auth token as Bearer token.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const keyId = (body as Record<string, unknown>).id as string;

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
