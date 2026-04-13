'use client';

import { useEffect, useMemo, useState } from 'react';
import { CheckIcon, ClipboardIcon, CopyIcon, RocketIcon } from '@/components/ui/icons';

function CopyButton({ value, copyKey }: { value: string; copyKey: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button className="btn-secondary btn-sm" onClick={handleCopy} data-copy-key={copyKey}>
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

export function ConnectionGuide() {
  const [origin, setOrigin] = useState(process.env.NEXT_PUBLIC_APP_URL || '');

  useEffect(() => {
    if (typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_APP_URL) {
      setOrigin(window.location.origin);
    }
  }, []);

  const appOrigin = (origin || 'https://animspec.ai').replace(/\/$/, '');

  const mcpUrl = useMemo(() => `${appOrigin}/api/mcp`, [appOrigin]);
  const analyzeUrl = useMemo(() => `${appOrigin}/api/v1/analyze`, [appOrigin]);
  const uploadUrl = useMemo(() => `${appOrigin}/api/v1/upload`, [appOrigin]);

  const codexConfig = `{
  "mcpServers": {
    "animspec": {
      "transport": {
        "type": "http",
        "url": "${mcpUrl}",
        "headers": {
          "Authorization": "Bearer YOUR_ANIMSPEC_API_KEY"
        }
      }
    }
  }
}`;

  const curlExample = `curl -X POST "${analyzeUrl}" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_ANIMSPEC_API_KEY" \\
  -d '{
    "format": "clone_ui_animation",
    "quality": "balanced",
    "videoUrl": "https://example.com/demo.mp4",
    "deepAnalysis": true
  }'`;

  return (
    <div className="settings-section">
      <h2 className="settings-section-title">Connect AnimSpec</h2>
      <div className="settings-card">
        <div className="settings-row settings-row-stack">
          <div className="settings-info">
            <div className="settings-label">Remote MCP / ChatGPT App</div>
            <div className="settings-description">
              Use this MCP endpoint for remote clients and hosted ChatGPT app setups.
            </div>
          </div>
          <div className="connection-guide-block">
            <div className="connection-guide-inline">
              <code>{mcpUrl}</code>
              <CopyButton value={mcpUrl} copyKey="mcp-url" />
            </div>
            <p className="connection-guide-note">
              Send your AnimSpec API key as <code>Authorization: Bearer YOUR_ANIMSPEC_API_KEY</code>.
            </p>
          </div>
        </div>

        <div className="settings-row settings-row-stack">
          <div className="settings-info">
            <div className="settings-label">Codex / Claude Code / Cursor</div>
            <div className="settings-description">
              If your client supports remote MCP over HTTP, start with this config and replace the key.
            </div>
          </div>
          <div className="connection-guide-block">
            <pre className="connection-guide-code">{codexConfig}</pre>
            <div className="connection-guide-actions">
              <CopyButton value={codexConfig} copyKey="codex-config" />
            </div>
          </div>
        </div>

        <div className="settings-row settings-row-stack">
          <div className="settings-info">
            <div className="settings-label">REST API</div>
            <div className="settings-description">
              Use the JSON API when you want to upload or analyze from your own backend or automation.
            </div>
          </div>
          <div className="connection-guide-grid">
            <div className="connection-guide-mini">
              <span>Analyze endpoint</span>
              <div className="connection-guide-inline">
                <code>{analyzeUrl}</code>
                <CopyButton value={analyzeUrl} copyKey="analyze-url" />
              </div>
            </div>
            <div className="connection-guide-mini">
              <span>Upload endpoint</span>
              <div className="connection-guide-inline">
                <code>{uploadUrl}</code>
                <CopyButton value={uploadUrl} copyKey="upload-url" />
              </div>
            </div>
            <div className="connection-guide-mini connection-guide-mini-full">
              <span>Example request</span>
              <pre className="connection-guide-code">{curlExample}</pre>
              <div className="connection-guide-actions">
                <CopyButton value={curlExample} copyKey="curl-example" />
              </div>
            </div>
          </div>
        </div>

        <div className="settings-row settings-row-stack connection-guide-callout">
          <div className="connection-guide-callout-icon">
            <RocketIcon />
          </div>
          <div className="settings-info">
            <div className="settings-label">Quick Notes</div>
            <div className="connection-guide-list">
              <div><ClipboardIcon /> Create a dedicated key per tool or environment.</div>
              <div><ClipboardIcon /> Revoke keys you no longer use instead of reusing one everywhere.</div>
              <div><ClipboardIcon /> ChatGPT app setups should point at the same MCP URL above.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
