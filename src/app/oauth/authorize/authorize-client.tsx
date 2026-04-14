'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { BackgroundEffects } from '@/components/layout/background-effects';
import { PlayIcon, CheckIcon, RocketIcon } from '@/components/ui/icons';

interface OAuthAuthorizeClientProps {
  clientName: string;
  clientId: string;
  redirectUri: string;
  scope: string;
  state: string;
  resource: string;
  codeChallenge: string;
  codeChallengeMethod: string;
}

export function OAuthAuthorizeClient(props: OAuthAuthorizeClientProps) {
  const { user, isLoading, signInWithEmail, signUpWithEmail, signInWithGoogle, refreshToken } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scopeList = useMemo(
    () => props.scope.split(/\s+/).filter(Boolean),
    [props.scope]
  );
  const resourceLabel = props.resource || 'Primary AnimSpec MCP resource';
  const clientInitial = (props.clientName || 'A').slice(0, 1).toUpperCase();

  async function handleAuthSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setError(null);
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Google sign-in failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleApprove() {
    setError(null);
    setIsSubmitting(true);

    try {
      const token = await refreshToken();
      if (!token) {
        throw new Error('Your sign-in session is not ready yet. Please try again.');
      }

      const response = await fetch('/api/oauth/authorize/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          clientId: props.clientId,
          redirectUri: props.redirectUri,
          scope: props.scope,
          state: props.state,
          resource: props.resource,
          codeChallenge: props.codeChallenge,
          codeChallengeMethod: props.codeChallengeMethod,
        }),
      });

      const data = await response.json().catch(() => ({ error: 'Authorization failed' }));
      if (!response.ok) {
        throw new Error(data.error || 'Authorization failed');
      }

      window.location.href = data.redirectTo;
    } catch (approveError) {
      setError(approveError instanceof Error ? approveError.message : 'Authorization failed');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="oauth-page">
      <BackgroundEffects />
      <div className="oauth-grid" />
      <div className="oauth-card">
        <div className="oauth-header">
          <div className="oauth-brand">
            <div className="logo-icon">
              <PlayIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="oauth-kicker">AnimSpec Connector</span>
              <div className="oauth-brand-name">Secure account linking</div>
            </div>
          </div>
          <h1>{user ? 'Authorize access' : 'Sign in to continue'}</h1>
          <p>
            {user
              ? `${props.clientName} wants permission to use your AnimSpec account in hosted AI tools.`
              : `${props.clientName} is requesting access to your AnimSpec account.`}
          </p>
        </div>

        {!user ? (
          <div className="oauth-auth">
            <div className="oauth-tabs">
              <button
                className={mode === 'signin' ? 'active' : ''}
                onClick={() => setMode('signin')}
                type="button"
              >
                Sign in
              </button>
              <button
                className={mode === 'signup' ? 'active' : ''}
                onClick={() => setMode('signup')}
                type="button"
              >
                Create account
              </button>
            </div>

            <form className="oauth-form" onSubmit={handleAuthSubmit}>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                required
                minLength={6}
              />
              <button className="btn-primary" type="submit" disabled={isSubmitting || isLoading}>
                {isSubmitting ? 'Working…' : mode === 'signup' ? 'Create account' : 'Sign in'}
              </button>
            </form>

            <button className="btn-secondary oauth-google-btn" type="button" onClick={handleGoogleSignIn} disabled={isSubmitting || isLoading}>
              Continue with Google
            </button>
            <div className="oauth-trust-strip">
              <div><CheckIcon className="w-4 h-4" /> Your AnimSpec account stays under your control.</div>
              <div><RocketIcon className="w-4 h-4" /> You can revoke connector access later by rotating keys or disabling the client.</div>
            </div>
          </div>
        ) : (
          <div className="oauth-consent">
            <div className="oauth-user">
              Signed in as <strong>{user.email}</strong>
            </div>
            <div className="oauth-details">
              <div>
                <span>Client</span>
                <div className="oauth-identity">
                  <div className="oauth-client-badge">{clientInitial}</div>
                  <code>{props.clientName}</code>
                </div>
              </div>
              <div>
                <span>Resource</span>
                <code>{resourceLabel}</code>
              </div>
              <div>
                <span>Scopes</span>
                <div className="oauth-scopes">
                  {scopeList.map((scope) => (
                    <span key={scope} className="badge badge-subtle">{scope}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="oauth-permissions">
              <h2>What this connector can do</h2>
              <ul>
                <li>Run AnimSpec video analysis on your behalf</li>
                <li>Return structured outputs for rebuild, audit, or behavior use cases</li>
                <li>Use only the scopes shown above</li>
              </ul>
            </div>
            <div className="oauth-actions">
              <button className="btn-primary" type="button" onClick={handleApprove} disabled={isSubmitting}>
                {isSubmitting ? 'Authorizing…' : 'Allow access'}
              </button>
            </div>
          </div>
        )}

        {error && <div className="oauth-error">{error}</div>}
      </div>
    </div>
  );
}
