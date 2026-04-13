'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { CheckIcon, CopyIcon, RocketIcon } from '@/components/ui/icons';

interface OAuthClientItem {
  clientId: string;
  clientName: string | null;
  redirectUris: string[];
  tokenEndpointAuthMethod: 'none' | 'client_secret_post' | 'client_secret_basic';
  scope: string;
}

interface CreatedOAuthClient {
  clientId: string;
  clientSecret: string | null;
  clientName: string | null;
  redirectUris: string[];
  tokenEndpointAuthMethod: 'none' | 'client_secret_post' | 'client_secret_basic';
  scope: string;
  message: string;
}

export function OAuthClientManager() {
  const { user, isLoading, refreshToken } = useAuth();
  const [clients, setClients] = useState<OAuthClientItem[]>([]);
  const [createdClient, setCreatedClient] = useState<CreatedOAuthClient | null>(null);
  const [clientName, setClientName] = useState('Claude Connector');
  const [redirectUri, setRedirectUri] = useState('');
  const [authMethod, setAuthMethod] = useState<'none' | 'client_secret_post' | 'client_secret_basic'>('client_secret_post');
  const [isFetching, setIsFetching] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClients() {
      if (isLoading || !user) return;

      setIsFetching(true);
      setError(null);
      try {
        const token = await refreshToken();
        const response = await fetch('/api/oauth/clients', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          credentials: 'include',
        });

        const data = await response.json().catch(() => ({ error: 'Failed to load OAuth clients' }));
        if (!response.ok) {
          throw new Error(data.error || 'Failed to load OAuth clients');
        }

        setClients(data.clients || []);
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Failed to load OAuth clients');
      } finally {
        setIsFetching(false);
      }
    }

    fetchClients();
  }, [isLoading, refreshToken, user]);

  async function copyText(value: string, key: string) {
    await navigator.clipboard.writeText(value);
    setCopiedValue(key);
    window.setTimeout(() => setCopiedValue((current) => (current === key ? null : current)), 1800);
  }

  async function createClient() {
    setError(null);
    setIsCreating(true);
    try {
      const token = await refreshToken();
      const response = await fetch('/api/oauth/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({
          clientName: clientName.trim() || 'AnimSpec Connector',
          redirectUri: redirectUri.trim(),
          tokenEndpointAuthMethod: authMethod,
        }),
      });

      const data = await response.json().catch(() => ({ error: 'Failed to create OAuth client' }));
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create OAuth client');
      }

      setCreatedClient(data);
      setClients((current) => [
        {
          clientId: data.clientId,
          clientName: data.clientName,
          redirectUris: data.redirectUris,
          tokenEndpointAuthMethod: data.tokenEndpointAuthMethod,
          scope: data.scope,
        },
        ...current,
      ]);
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Failed to create OAuth client');
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="settings-section">
      <h2 className="settings-section-title">Manual OAuth Client</h2>
      <div className="settings-card">
        <div className="settings-row settings-row-stack">
          <div className="settings-info">
            <div className="settings-label">Generate connector credentials</div>
            <div className="settings-description">
              Use this when Claude or another hosted connector asks for a client ID and secret. Paste the callback URL from that tool first.
            </div>
          </div>
          <div className="oauth-client-form">
            <input
              type="text"
              className="settings-input"
              value={clientName}
              onChange={(event) => setClientName(event.target.value)}
              placeholder="Connector name"
            />
            <input
              type="url"
              className="settings-input"
              value={redirectUri}
              onChange={(event) => setRedirectUri(event.target.value)}
              placeholder="Callback URL from Claude or ChatGPT"
            />
            <select
              className="settings-input"
              value={authMethod}
              onChange={(event) => setAuthMethod(event.target.value as typeof authMethod)}
            >
              <option value="client_secret_post">client_secret_post</option>
              <option value="client_secret_basic">client_secret_basic</option>
              <option value="none">none (public client)</option>
            </select>
            <button className="btn-primary btn-sm" onClick={createClient} disabled={isCreating || redirectUri.trim().length === 0}>
              {isCreating ? 'Generating…' : 'Generate OAuth Client'}
            </button>
          </div>
        </div>

        {createdClient && (
          <div className="settings-row settings-row-stack oauth-client-created">
            <div className="settings-info">
              <div className="settings-label">Generated OAuth Client</div>
              <div className="settings-description">{createdClient.message}</div>
            </div>
            <div className="oauth-client-created-grid">
              <div className="oauth-client-secret-row">
                <code>{createdClient.clientId}</code>
                <button className="btn-secondary btn-sm" onClick={() => copyText(createdClient.clientId, 'oauth-client-id')}>
                  {copiedValue === 'oauth-client-id' ? <CheckIcon /> : <CopyIcon />}
                  <span>{copiedValue === 'oauth-client-id' ? 'Copied' : 'Copy client ID'}</span>
                </button>
              </div>
              {createdClient.clientSecret && (
                <div className="oauth-client-secret-row">
                  <code>{createdClient.clientSecret}</code>
                  <button className="btn-secondary btn-sm" onClick={() => copyText(createdClient.clientSecret as string, 'oauth-client-secret')}>
                    {copiedValue === 'oauth-client-secret' ? <CheckIcon /> : <CopyIcon />}
                    <span>{copiedValue === 'oauth-client-secret' ? 'Copied' : 'Copy client secret'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="settings-row">
            <div className="settings-error">{error}</div>
          </div>
        )}

        <div className="settings-row settings-row-stack">
          <div className="settings-info">
            <div className="settings-label">Saved OAuth clients</div>
            <div className="settings-description">
              Existing manual clients created from this account.
            </div>
          </div>
          <div className="api-key-list">
            {isFetching ? (
              <div className="api-key-empty">Loading OAuth clients…</div>
            ) : clients.length === 0 ? (
              <div className="api-key-empty">No manual OAuth clients yet.</div>
            ) : (
              clients.map((client) => (
                <div key={client.clientId} className="api-key-item">
                  <div className="api-key-item-main">
                    <div className="api-key-item-title">
                      <RocketIcon className="api-key-item-icon" />
                      <span>{client.clientName || 'AnimSpec Connector'}</span>
                    </div>
                    <div className="api-key-item-meta">
                      <code>{client.clientId}</code>
                      <span>{client.tokenEndpointAuthMethod}</span>
                      <span>{client.redirectUris[0] || 'No callback URL'}</span>
                    </div>
                  </div>
                  <div className="api-key-item-actions">
                    <button className="btn-secondary btn-sm" onClick={() => copyText(client.clientId, `oauth-client:${client.clientId}`)}>
                      {copiedValue === `oauth-client:${client.clientId}` ? <CheckIcon /> : <CopyIcon />}
                      <span>{copiedValue === `oauth-client:${client.clientId}` ? 'Copied' : 'Copy ID'}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
