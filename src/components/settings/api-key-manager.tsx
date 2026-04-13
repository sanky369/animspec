'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { CopyIcon, CheckIcon, XIcon, KeyIcon } from '@/components/ui/icons';

interface ApiKeyItem {
  id: string;
  prefix: string;
  name: string;
  isActive: boolean;
  lastUsedAt: string | null;
  createdAt: string;
}

interface CreatedApiKey {
  id: string;
  key: string;
  prefix: string;
  name: string;
  message: string;
}

export function ApiKeyManager() {
  const { user, isLoading, refreshToken } = useAuth();
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([]);
  const [keyName, setKeyName] = useState('');
  const [createdKey, setCreatedKey] = useState<CreatedApiKey | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchKeys() {
      if (isLoading || !user) return;

      setIsFetching(true);
      setError(null);

      try {
        const token = await refreshToken();
        const response = await fetch('/api/v1/api-keys', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          credentials: 'include',
        });

        const data = await response.json().catch(() => ({ error: 'Failed to load API keys' }));
        if (!response.ok) {
          throw new Error(data.error || 'Failed to load API keys');
        }

        setApiKeys(data.keys || []);
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Failed to load API keys');
      } finally {
        setIsFetching(false);
      }
    }

    fetchKeys();
  }, [isLoading, refreshToken, user]);

  async function copyText(value: string, key: string) {
    await navigator.clipboard.writeText(value);
    setCopiedValue(key);
    window.setTimeout(() => setCopiedValue((current) => (current === key ? null : current)), 1800);
  }

  async function createKey() {
    if (isCreating) return;

    setIsCreating(true);
    setError(null);

    try {
      const token = await refreshToken();
      const response = await fetch('/api/v1/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({
          name: keyName.trim() || 'Default',
        }),
      });

      const data = await response.json().catch(() => ({ error: 'Failed to create API key' }));
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create API key');
      }

      setCreatedKey(data);
      setApiKeys((current) => [
        {
          id: data.id,
          prefix: data.prefix,
          name: data.name,
          isActive: true,
          lastUsedAt: null,
          createdAt: new Date().toISOString(),
        },
        ...current,
      ]);
      setKeyName('');
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : 'Failed to create API key');
    } finally {
      setIsCreating(false);
    }
  }

  async function revokeKey(id: string) {
    if (revokingId) return;

    setRevokingId(id);
    setError(null);

    try {
      const token = await refreshToken();
      const response = await fetch('/api/v1/api-keys', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
      });

      const data = await response.json().catch(() => ({ error: 'Failed to revoke API key' }));
      if (!response.ok) {
        throw new Error(data.error || 'Failed to revoke API key');
      }

      setApiKeys((current) => current.map((item) => (
        item.id === id ? { ...item, isActive: false } : item
      )));
      if (createdKey?.id === id) {
        setCreatedKey(null);
      }
    } catch (revokeError) {
      setError(revokeError instanceof Error ? revokeError.message : 'Failed to revoke API key');
    } finally {
      setRevokingId(null);
    }
  }

  function formatDate(value: string | null) {
    if (!value) return 'Never used';
    return new Date(value).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  return (
    <div className="settings-section">
      <h2 className="settings-section-title">Developer Access</h2>
      <div className="settings-card">
        <div className="settings-row settings-row-stack">
          <div className="settings-info">
            <div className="settings-label">Create API Key</div>
            <div className="settings-description">
              Create a key for the API, MCP clients, or a hosted ChatGPT app setup. The full key is shown once.
            </div>
          </div>
          <div className="api-key-create">
            <input
              type="text"
              className="settings-input"
              value={keyName}
              onChange={(event) => setKeyName(event.target.value)}
              placeholder="Key name, for example: Codex or Production app"
            />
            <button className="btn-primary btn-sm" onClick={createKey} disabled={isCreating}>
              {isCreating ? 'Creating…' : 'Generate Key'}
            </button>
          </div>
        </div>

        {createdKey && (
          <div className="settings-row settings-row-stack api-key-created">
            <div className="settings-info">
              <div className="settings-label">New Key</div>
              <div className="settings-description">
                Save this now. For security, the full key is not shown again.
              </div>
            </div>
            <div className="api-key-secret-row">
              <code className="api-key-secret">{createdKey.key}</code>
              <button
                className="btn-secondary btn-sm"
                onClick={() => copyText(createdKey.key, `created:${createdKey.id}`)}
              >
                {copiedValue === `created:${createdKey.id}` ? <CheckIcon /> : <CopyIcon />}
                <span>{copiedValue === `created:${createdKey.id}` ? 'Copied' : 'Copy'}</span>
              </button>
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
            <div className="settings-label">Your Keys</div>
            <div className="settings-description">
              Use prefixes to identify existing keys. Revoke anything you no longer use.
            </div>
          </div>
          <div className="api-key-list">
            {isFetching ? (
              <div className="api-key-empty">Loading keys…</div>
            ) : apiKeys.length === 0 ? (
              <div className="api-key-empty">No API keys yet.</div>
            ) : (
              apiKeys.map((item) => (
                <div key={item.id} className="api-key-item">
                  <div className="api-key-item-main">
                    <div className="api-key-item-title">
                      <KeyIcon className="api-key-item-icon" />
                      <span>{item.name}</span>
                      {item.isActive ? (
                        <span className="badge badge-success">Active</span>
                      ) : (
                        <span className="badge badge-subtle">Revoked</span>
                      )}
                    </div>
                    <div className="api-key-item-meta">
                      <code>{item.prefix}…</code>
                      <span>Created {formatDate(item.createdAt)}</span>
                      <span>Last used {formatDate(item.lastUsedAt)}</span>
                    </div>
                  </div>
                  <div className="api-key-item-actions">
                    <button
                      className="btn-secondary btn-sm"
                      onClick={() => copyText(item.prefix, `prefix:${item.id}`)}
                    >
                      {copiedValue === `prefix:${item.id}` ? <CheckIcon /> : <CopyIcon />}
                      <span>{copiedValue === `prefix:${item.id}` ? 'Copied' : 'Copy Prefix'}</span>
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => revokeKey(item.id)}
                      disabled={!item.isActive || revokingId === item.id}
                    >
                      <XIcon />
                      <span>{revokingId === item.id ? 'Revoking…' : 'Revoke'}</span>
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
