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

  const codexConfig = `[mcp_servers.animspec]
url = "${mcpUrl}"
enabled = true
bearer_token_env_var = "ANIMSPEC_API_KEY"`;

  const claudeCodeConfig = `{
  "mcpServers": {
    "animspec": {
      "type": "http",
      "url": "${mcpUrl}",
      "headers": {
        "Authorization": "Bearer \${ANIMSPEC_API_KEY}"
      }
    }
  }
}`;

  const envSetup = `export ANIMSPEC_API_KEY="ask_your_key_here"`;

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
              Use this MCP endpoint for remote clients and hosted ChatGPT or Claude connector setups.
            </div>
          </div>
          <div className="connection-guide-block">
            <div className="connection-guide-inline">
              <code>{mcpUrl}</code>
              <CopyButton value={mcpUrl} copyKey="mcp-url" />
            </div>
            <p className="connection-guide-note">
              Hosted ChatGPT and Claude connectors should use OAuth against this server. API-key bearer auth is for local developer tools.
            </p>
          </div>
        </div>

        <div className="settings-row settings-row-stack">
          <div className="settings-info">
            <div className="settings-label">Codex CLI</div>
            <div className="settings-description">
              Use a bearer token environment variable. This is the most reliable setup for Codex.
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
            <div className="settings-label">Claude Code / Cursor / clients with HTTP header support</div>
            <div className="settings-description">
              Use this JSON-style config when the client supports remote MCP headers directly.
            </div>
          </div>
          <div className="connection-guide-block">
            <pre className="connection-guide-code">{claudeCodeConfig}</pre>
            <div className="connection-guide-actions">
              <CopyButton value={claudeCodeConfig} copyKey="claude-code-config" />
            </div>
          </div>
        </div>

        <div className="settings-row settings-row-stack">
          <div className="settings-info">
            <div className="settings-label">Claude Desktop / Claude.ai hosted connector</div>
            <div className="settings-description">
              Add a custom connector in the Claude UI, paste the MCP URL, and choose <strong>OAuth</strong>. Do not use the local config file for the remote URL.
            </div>
          </div>
          <div className="connection-guide-grid">
            <div className="connection-guide-mini connection-guide-mini-full">
              <span>Steps</span>
              <ol className="connection-guide-steps">
                <li>Open Claude and go to <strong>Customize → Connectors</strong>.</li>
                <li>Choose <strong>Add custom connector</strong>.</li>
                <li>Paste <code>{mcpUrl}</code>.</li>
                <li>Select <strong>OAuth</strong> when Claude asks for authentication.</li>
                <li>Finish the AnimSpec sign-in screen in the browser.</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="settings-row settings-row-stack">
          <div className="settings-info">
            <div className="settings-label">ChatGPT App</div>
            <div className="settings-description">
              Create a new app in ChatGPT, use the same MCP URL, and choose <strong>OAuth</strong>.
            </div>
          </div>
          <div className="connection-guide-grid">
            <div className="connection-guide-mini connection-guide-mini-full">
              <span>Steps</span>
              <ol className="connection-guide-steps">
                <li>Open ChatGPT and create a new app or connector.</li>
                <li>Use <code>{mcpUrl}</code> as the MCP Server URL.</li>
                <li>Select <strong>OAuth</strong>.</li>
                <li>Complete the AnimSpec login and consent flow.</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="settings-row settings-row-stack">
          <div className="settings-info">
            <div className="settings-label">Environment Variable</div>
            <div className="settings-description">
              For local tools, put your API key in the environment before launching the client.
            </div>
          </div>
          <div className="connection-guide-block">
            <pre className="connection-guide-code">{envSetup}</pre>
            <div className="connection-guide-actions">
              <CopyButton value={envSetup} copyKey="env-setup" />
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
              <div><ClipboardIcon /> Hosted ChatGPT and Claude connectors use OAuth, not API keys.</div>
              <div><ClipboardIcon /> Local developer tools use your AnimSpec API key.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
