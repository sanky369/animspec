import { type NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { isAnimSpecApiKey, validateApiKey } from '@/lib/api-keys';

export interface AuthenticatedApiKey {
  rawKey: string;
  userId: string;
  keyId: string;
}

export function readApiKeyFromRequest(request: Request): string | null {
  const headerKey = request.headers.get('x-api-key');
  if (isAnimSpecApiKey(headerKey)) {
    return headerKey;
  }

  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const bearerToken = authHeader.slice(7).trim();
  return isAnimSpecApiKey(bearerToken) ? bearerToken : null;
}

export async function authenticateApiKeyRequest(
  request: Request
): Promise<AuthenticatedApiKey | null> {
  const rawKey = readApiKeyFromRequest(request);
  if (!rawKey) {
    return null;
  }

  const result = await validateApiKey(rawKey);
  if (!result) {
    return null;
  }

  return {
    rawKey,
    userId: result.userId,
    keyId: result.keyId,
  };
}

export async function authenticateFirebaseUser(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  try {
    const decoded = await adminAuth.verifyIdToken(authHeader.slice(7).trim());
    return decoded.uid;
  } catch {
    return null;
  }
}
