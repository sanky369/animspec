export const OAUTH_SCOPE = 'animspec:mcp';
export const OAUTH_CODE_TTL_MS = 10 * 60 * 1000;
export const OAUTH_ACCESS_TOKEN_TTL_MS = 60 * 60 * 1000;
export const OAUTH_REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export function getAppOrigin(fallbackOrigin?: string): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL || fallbackOrigin || 'http://localhost:3000';
  return configured.replace(/\/$/, '');
}

export function getMcpResourceUrl(origin: string): string {
  return `${origin}/api/mcp`;
}

export function getProtectedResourceMetadataUrl(origin: string): string {
  return `${origin}/.well-known/oauth-protected-resource/api/mcp`;
}

export function getAuthorizationServerMetadata(origin: string) {
  return {
    issuer: origin,
    authorization_endpoint: `${origin}/oauth/authorize`,
    token_endpoint: `${origin}/oauth/token`,
    registration_endpoint: `${origin}/oauth/register`,
    response_types_supported: ['code'],
    grant_types_supported: ['authorization_code', 'refresh_token'],
    code_challenge_methods_supported: ['S256'],
    token_endpoint_auth_methods_supported: ['none', 'client_secret_post', 'client_secret_basic'],
    scopes_supported: [OAUTH_SCOPE],
  };
}

export function getProtectedResourceMetadata(origin: string, resourceUrl?: string) {
  return {
    resource: resourceUrl || getMcpResourceUrl(origin),
    authorization_servers: [origin],
    scopes_supported: [OAUTH_SCOPE],
    bearer_methods_supported: ['header'],
  };
}
