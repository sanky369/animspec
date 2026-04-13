import { type NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { constantTimeEqual, sha256Hex } from './crypto';
import { getOAuthClient, validateOAuthAccessToken } from './store';

export async function authenticateSessionUser(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('authorization');
  const sessionCookie = request.cookies.get('__session')?.value;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : sessionCookie;

  if (!token) {
    return null;
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded.uid;
  } catch {
    return null;
  }
}

export async function authenticateOAuthBearerToken(rawToken: string) {
  return validateOAuthAccessToken(rawToken);
}

export async function authenticateOAuthClient(request: NextRequest, body: URLSearchParams): Promise<{
  clientId: string;
  tokenEndpointAuthMethod: 'none' | 'client_secret_post' | 'client_secret_basic';
} | null> {
  const authorization = request.headers.get('authorization');

  if (authorization?.startsWith('Basic ')) {
    const decoded = Buffer.from(authorization.slice(6), 'base64').toString('utf8');
    const separatorIndex = decoded.indexOf(':');
    const clientId = separatorIndex === -1 ? decoded : decoded.slice(0, separatorIndex);
    const clientSecret = separatorIndex === -1 ? '' : decoded.slice(separatorIndex + 1);
    const client = await getOAuthClient(clientId);
    if (!client || !client.secretHash) {
      return null;
    }

    if (!constantTimeEqual(client.secretHash, sha256Hex(clientSecret))) {
      return null;
    }

    return {
      clientId,
      tokenEndpointAuthMethod: 'client_secret_basic',
    };
  }

  const clientId = body.get('client_id');
  if (!clientId) {
    return null;
  }

  const client = await getOAuthClient(clientId);
  if (!client) {
    return null;
  }

  if (client.tokenEndpointAuthMethod === 'none') {
    return {
      clientId,
      tokenEndpointAuthMethod: client.tokenEndpointAuthMethod,
    };
  }

  const clientSecret = body.get('client_secret');
  if (!client.secretHash || !clientSecret) {
    return null;
  }

  if (!constantTimeEqual(client.secretHash, sha256Hex(clientSecret))) {
    return null;
  }

  return {
    clientId,
    tokenEndpointAuthMethod: 'client_secret_post',
  };
}
