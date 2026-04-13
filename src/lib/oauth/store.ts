import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from '@/lib/firebase/admin';
import { COLLECTIONS } from '@/types/database';
import { generateOpaqueSecret, sha256Base64Url, sha256Hex } from './crypto';
import {
  OAUTH_ACCESS_TOKEN_TTL_MS,
  OAUTH_CODE_TTL_MS,
  OAUTH_REFRESH_TOKEN_TTL_MS,
  OAUTH_SCOPE,
} from './config';

export interface RegisteredOAuthClient {
  clientId: string;
  clientSecret: string | null;
  clientName: string | null;
  redirectUris: string[];
  tokenEndpointAuthMethod: 'none' | 'client_secret_post' | 'client_secret_basic';
  grantTypes: string[];
  responseTypes: string[];
  scope: string;
}

export interface OAuthClientRecord {
  clientId: string;
  clientName: string | null;
  redirectUris: string[];
  tokenEndpointAuthMethod: 'none' | 'client_secret_post' | 'client_secret_basic';
  grantTypes: string[];
  responseTypes: string[];
  scope: string;
  secretHash: string | null;
}

export interface OAuthTokenValidationResult {
  userId: string;
  clientId: string;
  scope: string;
  resource: string | null;
}

function now() {
  return Date.now();
}

export async function registerOAuthClient(input: {
  clientName?: string | null;
  redirectUris: string[];
  tokenEndpointAuthMethod?: 'none' | 'client_secret_post' | 'client_secret_basic';
  grantTypes?: string[];
  responseTypes?: string[];
  scope?: string;
}): Promise<RegisteredOAuthClient> {
  const tokenEndpointAuthMethod = input.tokenEndpointAuthMethod ?? 'none';
  const clientId = generateOpaqueSecret('client_');
  const clientSecret = tokenEndpointAuthMethod === 'none' ? null : generateOpaqueSecret('secret_');

  await adminDb.collection(COLLECTIONS.OAUTH_CLIENTS).doc(clientId).set({
    clientName: input.clientName ?? null,
    redirectUris: input.redirectUris,
    tokenEndpointAuthMethod,
    grantTypes: input.grantTypes ?? ['authorization_code', 'refresh_token'],
    responseTypes: input.responseTypes ?? ['code'],
    scope: input.scope ?? OAUTH_SCOPE,
    secretHash: clientSecret ? sha256Hex(clientSecret) : null,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  return {
    clientId,
    clientSecret,
    clientName: input.clientName ?? null,
    redirectUris: input.redirectUris,
    tokenEndpointAuthMethod,
    grantTypes: input.grantTypes ?? ['authorization_code', 'refresh_token'],
    responseTypes: input.responseTypes ?? ['code'],
    scope: input.scope ?? OAUTH_SCOPE,
  };
}

export async function getOAuthClient(clientId: string): Promise<OAuthClientRecord | null> {
  const doc = await adminDb.collection(COLLECTIONS.OAUTH_CLIENTS).doc(clientId).get();
  if (!doc.exists) {
    return null;
  }

  const data = doc.data();
  if (!data) {
    return null;
  }

  return {
    clientId: doc.id,
    clientName: (data.clientName as string | null) ?? null,
    redirectUris: Array.isArray(data.redirectUris) ? data.redirectUris as string[] : [],
    tokenEndpointAuthMethod: (data.tokenEndpointAuthMethod as OAuthClientRecord['tokenEndpointAuthMethod']) ?? 'none',
    grantTypes: Array.isArray(data.grantTypes) ? data.grantTypes as string[] : ['authorization_code', 'refresh_token'],
    responseTypes: Array.isArray(data.responseTypes) ? data.responseTypes as string[] : ['code'],
    scope: (data.scope as string) || OAUTH_SCOPE,
    secretHash: (data.secretHash as string | null) ?? null,
  };
}

export async function createAuthorizationCode(input: {
  clientId: string;
  userId: string;
  redirectUri: string;
  scope: string;
  resource?: string | null;
  codeChallenge: string;
  codeChallengeMethod: 'S256';
}): Promise<string> {
  const code = generateOpaqueSecret('ac_');
  const codeId = sha256Hex(code);

  await adminDb.collection(COLLECTIONS.OAUTH_AUTHORIZATION_CODES).doc(codeId).set({
    clientId: input.clientId,
    userId: input.userId,
    redirectUri: input.redirectUri,
    scope: input.scope,
    resource: input.resource ?? null,
    codeChallenge: input.codeChallenge,
    codeChallengeMethod: input.codeChallengeMethod,
    expiresAt: new Date(now() + OAUTH_CODE_TTL_MS),
    createdAt: FieldValue.serverTimestamp(),
  });

  return code;
}

export async function consumeAuthorizationCode(input: {
  code: string;
  clientId: string;
  redirectUri: string;
  codeVerifier: string;
}): Promise<{ userId: string; scope: string; resource: string | null } | null> {
  const codeId = sha256Hex(input.code);
  const ref = adminDb.collection(COLLECTIONS.OAUTH_AUTHORIZATION_CODES).doc(codeId);
  const doc = await ref.get();
  if (!doc.exists) {
    return null;
  }

  const data = doc.data();
  if (!data) {
    return null;
  }

  const expired = data.expiresAt?.toDate
    ? data.expiresAt.toDate().getTime() < now()
    : new Date(data.expiresAt).getTime() < now();
  const expectedChallenge = sha256Base64Url(input.codeVerifier);

  if (
    expired
    || data.clientId !== input.clientId
    || data.redirectUri !== input.redirectUri
    || data.codeChallengeMethod !== 'S256'
    || data.codeChallenge !== expectedChallenge
  ) {
    return null;
  }

  await ref.delete();

  return {
    userId: data.userId as string,
    scope: (data.scope as string) || OAUTH_SCOPE,
    resource: (data.resource as string | null) ?? null,
  };
}

export async function issueOAuthTokens(input: {
  clientId: string;
  userId: string;
  scope: string;
  resource?: string | null;
}): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}> {
  const accessToken = generateOpaqueSecret('at_');
  const refreshToken = generateOpaqueSecret('rt_');
  const accessTokenId = sha256Hex(accessToken);
  const refreshTokenId = sha256Hex(refreshToken);

  await adminDb.collection(COLLECTIONS.OAUTH_REFRESH_TOKENS).doc(refreshTokenId).set({
    clientId: input.clientId,
    userId: input.userId,
    scope: input.scope,
    resource: input.resource ?? null,
    expiresAt: new Date(now() + OAUTH_REFRESH_TOKEN_TTL_MS),
    createdAt: FieldValue.serverTimestamp(),
    revokedAt: null,
  });

  await adminDb.collection(COLLECTIONS.OAUTH_ACCESS_TOKENS).doc(accessTokenId).set({
    clientId: input.clientId,
    userId: input.userId,
    scope: input.scope,
    resource: input.resource ?? null,
    expiresAt: new Date(now() + OAUTH_ACCESS_TOKEN_TTL_MS),
    refreshTokenId,
    createdAt: FieldValue.serverTimestamp(),
    lastUsedAt: null,
    revokedAt: null,
  });

  return {
    accessToken,
    refreshToken,
    expiresIn: Math.floor(OAUTH_ACCESS_TOKEN_TTL_MS / 1000),
  };
}

export async function refreshOAuthTokens(input: {
  refreshToken: string;
  clientId: string;
}): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  scope: string;
  resource: string | null;
} | null> {
  const refreshTokenId = sha256Hex(input.refreshToken);
  const refreshRef = adminDb.collection(COLLECTIONS.OAUTH_REFRESH_TOKENS).doc(refreshTokenId);
  const refreshDoc = await refreshRef.get();
  if (!refreshDoc.exists) {
    return null;
  }

  const refreshData = refreshDoc.data();
  if (!refreshData) {
    return null;
  }

  const refreshExpired = refreshData.expiresAt?.toDate
    ? refreshData.expiresAt.toDate().getTime() < now()
    : new Date(refreshData.expiresAt).getTime() < now();
  const revoked = refreshData.revokedAt != null;

  if (refreshExpired || revoked || refreshData.clientId !== input.clientId) {
    return null;
  }

  await refreshRef.update({
    revokedAt: FieldValue.serverTimestamp(),
  });

  const issued = await issueOAuthTokens({
    clientId: input.clientId,
    userId: refreshData.userId as string,
    scope: (refreshData.scope as string) || OAUTH_SCOPE,
    resource: (refreshData.resource as string | null) ?? null,
  });

  return {
    ...issued,
    scope: (refreshData.scope as string) || OAUTH_SCOPE,
    resource: (refreshData.resource as string | null) ?? null,
  };
}

export async function validateOAuthAccessToken(accessToken: string): Promise<OAuthTokenValidationResult | null> {
  const accessTokenId = sha256Hex(accessToken);
  const ref = adminDb.collection(COLLECTIONS.OAUTH_ACCESS_TOKENS).doc(accessTokenId);
  const doc = await ref.get();
  if (!doc.exists) {
    return null;
  }

  const data = doc.data();
  if (!data) {
    return null;
  }

  const expired = data.expiresAt?.toDate
    ? data.expiresAt.toDate().getTime() < now()
    : new Date(data.expiresAt).getTime() < now();
  const revoked = data.revokedAt != null;

  if (expired || revoked) {
    return null;
  }

  ref.update({ lastUsedAt: FieldValue.serverTimestamp() }).catch(() => {});

  return {
    userId: data.userId as string,
    clientId: data.clientId as string,
    scope: (data.scope as string) || OAUTH_SCOPE,
    resource: (data.resource as string | null) ?? null,
  };
}

export function buildClientRegistrationResponse(origin: string, client: RegisteredOAuthClient) {
  return {
    client_id: client.clientId,
    client_id_issued_at: Math.floor(now() / 1000),
    ...(client.clientSecret
      ? {
          client_secret: client.clientSecret,
          client_secret_expires_at: 0,
        }
      : {}),
    redirect_uris: client.redirectUris,
    client_name: client.clientName,
    grant_types: client.grantTypes,
    response_types: client.responseTypes,
    token_endpoint_auth_method: client.tokenEndpointAuthMethod,
    scope: client.scope,
    registration_client_uri: `${origin}/oauth/register/${client.clientId}`,
  };
}
