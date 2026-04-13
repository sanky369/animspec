import { getOAuthClient } from '@/lib/oauth/store';
import { OAUTH_SCOPE } from '@/lib/oauth/config';
import { OAuthAuthorizeClient } from './authorize-client';
import { BackgroundEffects } from '@/components/layout/background-effects';

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function pickFirst(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || '' : value || '';
}

export default async function OAuthAuthorizePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const clientId = pickFirst(params.client_id);
  const redirectUri = pickFirst(params.redirect_uri);
  const state = pickFirst(params.state);
  const scope = pickFirst(params.scope) || OAUTH_SCOPE;
  const resource = pickFirst(params.resource);
  const codeChallenge = pickFirst(params.code_challenge);
  const codeChallengeMethod = pickFirst(params.code_challenge_method);
  const responseType = pickFirst(params.response_type);

  if (
    !clientId
    || !redirectUri
    || responseType !== 'code'
    || !codeChallenge
    || codeChallengeMethod !== 'S256'
  ) {
    return (
      <div className="oauth-page">
        <BackgroundEffects />
        <div className="oauth-grid" />
        <div className="oauth-card">
          <div className="oauth-header">
            <span className="oauth-kicker">AnimSpec Connector</span>
            <h1>Invalid authorization request</h1>
            <p>The connector request is missing required OAuth parameters.</p>
          </div>
        </div>
      </div>
    );
  }

  const client = await getOAuthClient(clientId);
  if (!client || !client.redirectUris.includes(redirectUri)) {
    return (
      <div className="oauth-page">
        <BackgroundEffects />
        <div className="oauth-grid" />
        <div className="oauth-card">
          <div className="oauth-header">
            <span className="oauth-kicker">AnimSpec Connector</span>
            <h1>Unknown client</h1>
            <p>That connector is not registered with AnimSpec.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <OAuthAuthorizeClient
      clientName={client.clientName || client.clientId}
      clientId={client.clientId}
      redirectUri={redirectUri}
      scope={scope}
      state={state}
      resource={resource}
      codeChallenge={codeChallenge}
      codeChallengeMethod={codeChallengeMethod}
    />
  );
}
