<file_map>
/Users/sanketdongre/Documents/Projects/animspec
├── docs
│   ├── R2_SETUP.md *
│   ├── public-api-mcp.md *
│   └── deep-analysis-v2-spec.md
├── mcp-server
│   ├── index.ts * +
│   └── tsconfig.json
├── src
│   ├── app
│   │   ├── .well-known
│   │   │   ├── oauth-authorization-server
│   │   │   │   └── route.ts * +
│   │   │   └── oauth-protected-resource
│   │   │       ├── [...resource]
│   │   │       │   └── route.ts * +
│   │   │       └── route.ts * +
│   │   ├── api
│   │   │   ├── mcp
│   │   │   │   └── route.ts * +
│   │   │   ├── oauth
│   │   │   │   ├── authorize
│   │   │   │   │   └── approve
│   │   │   │   │       └── route.ts * +
│   │   │   │   └── clients
│   │   │   │       └── route.ts * +
│   │   │   ├── v1
│   │   │   │   ├── analyze
│   │   │   │   │   └── route.ts * +
│   │   │   │   ├── upload
│   │   │   │   │   └── route.ts * +
│   │   │   │   ├── upload-url
│   │   │   │   │   └── route.ts * +
│   │   │   │   └── api-keys
│   │   │   │       └── route.ts +
│   │   │   ├── analyses
│   │   │   │   └── route.ts +
│   │   │   ├── analyze
│   │   │   │   └── route.ts +
│   │   │   ├── checkout
│   │   │   │   └── route.ts +
│   │   │   ├── transactions
│   │   │   │   └── route.ts +
│   │   │   ├── upload
│   │   │   │   └── route.ts +
│   │   │   ├── upload-url
│   │   │   │   └── route.ts +
│   │   │   └── webhooks
│   │   │       └── lemon-squeezy
│   │   │           └── route.ts +
│   │   ├── oauth
│   │   │   ├── authorize
│   │   │   │   ├── authorize-client.tsx * +
│   │   │   │   └── page.tsx * +
│   │   │   ├── register
│   │   │   │   ├── [clientId]
│   │   │   │   │   └── route.ts * +
│   │   │   │   └── route.ts * +
│   │   │   └── token
│   │   │       └── route.ts * +
│   │   ├── (dashboard)
│   │   │   ├── dashboard
│   │   │   │   ├── account
│   │   │   │   │   └── page.tsx +
│   │   │   │   ├── history
│   │   │   │   │   └── page.tsx +
│   │   │   │   ├── settings
│   │   │   │   │   └── page.tsx +
│   │   │   │   └── page.tsx +
│   │   │   └── layout.tsx +
│   │   ├── (landing)
│   │   │   ├── privacy
│   │   │   │   └── page.tsx +
│   │   │   ├── terms
│   │   │   │   └── page.tsx +
│   │   │   ├── layout.tsx +
│   │   │   └── page.tsx +
│   │   ├── globals.css
│   │   └── layout.tsx +
│   ├── components
│   │   ├── settings
│   │   │   ├── connection-guide.tsx * +
│   │   │   ├── oauth-client-manager.tsx * +
│   │   │   └── api-key-manager.tsx +
│   │   ├── analysis
│   │   │   ├── agentic-progress.tsx +
│   │   │   ├── analysis-progress.tsx +
│   │   │   ├── index.ts +
│   │   │   └── streaming-output.tsx +
│   │   ├── auth
│   │   │   ├── auth-button.tsx +
│   │   │   ├── index.ts +
│   │   │   └── sign-in-modal.tsx +
│   │   ├── config
│   │   │   ├── agentic-toggle.tsx +
│   │   │   ├── format-selector.tsx +
│   │   │   ├── index.ts +
│   │   │   ├── options-panel.tsx +
│   │   │   ├── quality-selector.tsx +
│   │   │   └── trigger-context.tsx +
│   │   ├── dashboard
│   │   │   ├── analysis-detail-modal.tsx +
│   │   │   ├── dashboard-header.tsx +
│   │   │   ├── history-item.tsx +
│   │   │   ├── index.ts +
│   │   │   ├── pricing-modal.tsx +
│   │   │   └── sidebar.tsx +
│   │   ├── landing
│   │   │   ├── demo-section.tsx +
│   │   │   ├── hero-section.tsx +
│   │   │   ├── how-it-works.tsx +
│   │   │   ├── index.ts +
│   │   │   ├── pricing-section.tsx +
│   │   │   ├── use-cases-section.tsx +
│   │   │   └── video-demo-section.tsx +
│   │   ├── layout
│   │   │   ├── background-effects.tsx +
│   │   │   ├── footer.tsx +
│   │   │   ├── header.tsx +
│   │   │   └── index.ts +
│   │   ├── output
│   │   │   ├── code-output.tsx +
│   │   │   ├── frame-preview.tsx +
│   │   │   ├── index.ts +
│   │   │   └── output-panel.tsx +
│   │   ├── ui
│   │   │   ├── badge.tsx +
│   │   │   ├── button.tsx +
│   │   │   ├── code-block.tsx +
│   │   │   ├── icons.tsx +
│   │   │   ├── index.ts +
│   │   │   ├── select.tsx +
│   │   │   ├── spinner.tsx +
│   │   │   └── tabs.tsx +
│   │   └── upload
│   │       ├── index.ts +
│   │       ├── upload-progress.tsx +
│   │       ├── upload-zone.tsx +
│   │       └── video-preview.tsx +
│   ├── lib
│   │   ├── firebase
│   │   │   ├── admin.ts * +
│   │   │   ├── client.ts +
│   │   │   └── index.ts +
│   │   ├── mcp
│   │   │   ├── server.ts * +
│   │   │   ├── use-case-inference.ts * +
│   │   │   └── widget.ts * +
│   │   ├── oauth
│   │   │   ├── auth.ts * +
│   │   │   ├── config.ts * +
│   │   │   ├── crypto.ts * +
│   │   │   └── store.ts * +
│   │   ├── public-api
│   │   │   ├── analyze.ts * +
│   │   │   ├── auth.ts * +
│   │   │   ├── contracts.ts * +
│   │   │   ├── metadata.ts * +
│   │   │   ├── prepare-video-input.ts * +
│   │   │   ├── video-source.ts * +
│   │   │   └── credits.ts +
│   │   ├── storage
│   │   │   ├── gemini-files.ts * +
│   │   │   ├── r2.ts * +
│   │   │   └── index.ts +
│   │   ├── actions
│   │   │   ├── analyses.ts +
│   │   │   └── credits.ts +
│   │   ├── ai
│   │   │   ├── agentic-pipeline.ts +
│   │   │   ├── agentic-prompts.ts +
│   │   │   ├── gemini-utils.ts +
│   │   │   ├── gemini.ts +
│   │   │   ├── index.ts +
│   │   │   ├── kimi.ts +
│   │   │   ├── output-parsers.ts +
│   │   │   └── prompts.ts +
│   │   ├── api-keys
│   │   │   └── index.ts +
│   │   ├── ffmpeg
│   │   │   ├── client.ts +
│   │   │   ├── create-grid.ts +
│   │   │   ├── extract-frames.ts +
│   │   │   └── index.ts +
│   │   ├── streaming
│   │   │   └── sse.js +
│   │   ├── video
│   │   │   └── extract-frame.ts +
│   │   └── video-understanding
│   │       ├── families
│   │       │   ├── audit.ts +
│   │       │   ├── behavior.ts +
│   │       │   └── reconstruct.ts +
│   │       ├── persistence
│   │       │   └── run-store.ts +
│   │       ├── preprocess
│   │       │   └── shared.ts +
│   │       ├── providers
│   │       │   ├── gemini-runner.ts +
│   │       │   └── model-registry.ts +
│   │       ├── schemas
│   │       │   ├── audit.ts +
│   │       │   ├── behavior.ts +
│   │       │   └── reconstruct.ts +
│   │       ├── utils
│   │       │   └── json.ts +
│   │       ├── verification
│   │       │   ├── audit.ts +
│   │       │   ├── behavior.ts +
│   │       │   ├── reconstruct.ts +
│   │       │   └── render-diff.ts +
│   │       ├── artifacts.ts +
│   │       ├── orchestrator.ts +
│   │       └── planner.ts +
│   ├── types
│   │   ├── analysis.ts * +
│   │   ├── database.ts * +
│   │   └── output-formats.ts +
│   ├── contexts
│   │   └── auth-context.tsx +
│   ├── hooks
│   │   ├── index.ts +
│   │   ├── use-analysis.ts +
│   │   ├── use-auth.ts +
│   │   ├── use-copy-to-clipboard.ts +
│   │   ├── use-credits.ts +
│   │   ├── use-ffmpeg.ts +
│   │   ├── use-r2-upload.ts +
│   │   └── use-video-upload.ts +
│   └── middleware.ts +
├── tests
│   ├── video-understanding
│   │   └── planner.test.ts +
│   ├── oauth-store.test.ts * +
│   ├── prepare-video-input.test.ts * +
│   ├── public-api-contracts.test.ts * +
│   ├── public-api-video-source.test.ts * +
│   ├── api-keys.test.ts +
│   ├── gemini-runner.test.ts +
│   ├── gemini-utils.test.ts +
│   ├── mcp-use-case-inference.test.ts +
│   ├── middleware.test.ts +
│   ├── output-formats.test.ts +
│   ├── output-parsers.test.ts +
│   ├── run-store.test.ts +
│   └── sse-parser.test.js +
├── .claude
│   └── settings.local.json
├── evals
│   ├── audit
│   │   └── sample-case.json
│   ├── behavior
│   │   └── sample-case.json
│   ├── reconstruct
│   │   └── sample-case.json
│   └── README.md
├── prompt-exports
│   └── 2026-04-13-094941-plan-gemini-kimi-video-understanding-robustness-audit.md
├── public
│   ├── __
│   │   └── auth
│   │       └── handler.html
│   ├── logo-options
│   │   ├── animspec-header-logo-1.png
│   │   ├── animspec-header-logo-2.png
│   │   ├── animspec-header-logo-3.png
│   │   ├── animspec-logo-1.png
│   │   ├── animspec-logo-2.png
│   │   ├── animspec-logo-3.png
│   │   ├── animspec-logo-text-1.png
│   │   ├── animspec-logo-text-2.png
│   │   ├── animspec-logo-text-3.png
│   │   ├── animspec-nano-logo-1.png
│   │   ├── animspec-nano-logo-2.png
│   │   └── animspec-nano-logo-3.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── hero-animation.jpg
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-cropped.png
│   ├── logo.png
│   └── manifest.json
├── README.md *
├── .env.example
├── .firebaserc
├── .gitignore
├── CLAUDE.md
├── Complete_SEO_Playbook.md
├── architecture.md
├── design.html
├── devpost_submission.md
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── next.config.ts +
├── package-lock.json
├── package.json
├── postcss.config.js +
├── pricing.md
├── seo.md
├── spec.md
├── storage.rules
├── tailwind.config.ts +
├── tsconfig.json
└── vercel.json


(* denotes selected files)
(+ denotes code-map available)
</file_map>
<file_contents>
File: /Users/sanketdongre/Documents/Projects/animspec/src/app/.well-known/oauth-protected-resource/route.ts
```ts
import { NextRequest, NextResponse } from 'next/server';
import { getAppOrigin, getMcpResourceUrl, getProtectedResourceMetadata } from '@/lib/oauth/config';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const origin = getAppOrigin(request.nextUrl.origin);
  return NextResponse.json(getProtectedResourceMetadata(origin, getMcpResourceUrl(origin)), {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/docs/public-api-mcp.md
```md
# Public API and MCP

AnimSpec now exposes two programmatic surfaces:

1. Public REST endpoints under `/api/v1/*`
2. MCP access:
   `POST /api/mcp` for remote Streamable HTTP clients
   `npm run mcp` for a local stdio thin client

## What shipped

### API key management

- `POST /api/v1/api-keys`
- `GET /api/v1/api-keys`
- `DELETE /api/v1/api-keys`

These routes require a Firebase Auth bearer token and let a signed-in user mint, list, and revoke AnimSpec API keys.

### Analysis

- `POST /api/v1/analyze`

Authentication:

- `x-api-key: ask_...`
- or `Authorization: Bearer ask_...`

Accepted video sources:

- `videoBase64` + `mimeType`
- `videoUrl`
- `fileUri` + `fileMimeType`
- `r2ObjectKey`

Analysis options:

- all current output formats
- `balanced`, `precise`, and `kimi`
- `trigger`
- `deepAnalysis` (also accepts legacy `agenticMode`)

### Upload helpers

- `POST /api/v1/upload`
  Use this when a Gemini-backed run should analyze a larger file through Gemini Files.

- `POST /api/v1/upload-url`
  Use this when you want a direct R2 upload URL, especially for Kimi or cloud-hosted flows.

## MCP modes

### Remote MCP / ChatGPT app surface

Endpoint:

- `POST /api/mcp`

Transport:

- Streamable HTTP

Tools:

- `analyze_video`
- `pick_use_case`
- `list_formats`
- `list_models`

UI:

- `analyze_video` now points to an inline widget resource so ChatGPT can render the result as an app panel instead of plain text only.
- `analyze_video` can also infer the best format from a `user_goal` when the host does not send an explicit `format`.

Current auth:

- OAuth for hosted connectors like ChatGPT Apps and Claude remote connectors
- AnimSpec API key in request headers for developer tools that can send custom headers

This is the intended split:

- hosted connector UX -> OAuth
- local/dev-tool UX -> API key

### Shared account mode for ChatGPT

If you want direct ChatGPT app testing without wiring OAuth yet, set:

```bash
CHATGPT_APP_SHARED_USER_ID=<firebase-user-id>
```

When present:

- unauthenticated MCP app calls can run analysis through that shared account
- the widget labels the run as shared app mode

Use this only for controlled internal testing.

### OAuth for hosted connectors

The server now exposes:

- `/.well-known/oauth-authorization-server`
- `/.well-known/oauth-protected-resource`
- `/.well-known/oauth-protected-resource/api/mcp`
- `/oauth/register`
- `/oauth/authorize`
- `/oauth/token`

This gives ChatGPT Apps and Claude hosted connectors a proper OAuth discovery + login + token exchange path backed by AnimSpec user accounts.

### Local MCP

Command:

```bash
npm run mcp
```

Required env:

```bash
export ANIMSPEC_API_KEY=ask_...
export ANIMSPEC_API_URL=https://animspec.ai
```

The local MCP server reads a local video file, chooses the right upload path, then calls the public API.

## ChatGPT note

The remote MCP endpoint is now app-compatible at the transport and UI level.

For authentication, there are two paths:

Today:

- Codex/Claude Code style local MCP works
- remote MCP clients that can send API-key headers work
- ChatGPT app testing can work in shared account mode

Not done yet:

- first-class OAuth flow for native ChatGPT connector setup

If we want direct ChatGPT connector onboarding, the next step is an OAuth-compatible auth layer on top of the current API-key system.

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/components/settings/connection-guide.tsx
```tsx
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
  const oauthAuthUrl = useMemo(() => `${appOrigin}/oauth/authorize`, [appOrigin]);
  const oauthTokenUrl = useMemo(() => `${appOrigin}/oauth/token`, [appOrigin]);
  const oauthRegistrationUrl = useMemo(() => `${appOrigin}/oauth/register`, [appOrigin]);
  const oauthMetadataUrl = useMemo(() => `${appOrigin}/.well-known/oauth-authorization-server`, [appOrigin]);
  const protectedResourceUrl = useMemo(() => `${appOrigin}/.well-known/oauth-protected-resource/api/mcp`, [appOrigin]);

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
            <div className="connection-guide-mini">
              <span>Auth URL</span>
              <div className="connection-guide-inline">
                <code>{oauthAuthUrl}</code>
                <CopyButton value={oauthAuthUrl} copyKey="claude-auth-url" />
              </div>
            </div>
            <div className="connection-guide-mini">
              <span>Token URL</span>
              <div className="connection-guide-inline">
                <code>{oauthTokenUrl}</code>
                <CopyButton value={oauthTokenUrl} copyKey="claude-token-url" />
              </div>
            </div>
            <div className="connection-guide-mini">
              <span>Registration URL</span>
              <div className="connection-guide-inline">
                <code>{oauthRegistrationUrl}</code>
                <CopyButton value={oauthRegistrationUrl} copyKey="claude-registration-url" />
              </div>
            </div>
            <div className="connection-guide-mini">
              <span>Scope</span>
              <div className="connection-guide-inline">
                <code>animspec:mcp</code>
                <CopyButton value="animspec:mcp" copyKey="claude-scope" />
              </div>
            </div>
            <div className="connection-guide-mini">
              <span>Token auth method</span>
              <div className="connection-guide-inline">
                <code>none</code>
                <CopyButton value="none" copyKey="claude-token-auth-method" />
              </div>
            </div>
            <div className="connection-guide-mini connection-guide-mini-full">
              <span>Steps</span>
              <ol className="connection-guide-steps">
                <li>Open Claude and go to <strong>Customize → Connectors</strong>.</li>
                <li>Choose <strong>Add custom connector</strong>.</li>
                <li>Paste <code>{mcpUrl}</code>.</li>
                <li>Select <strong>OAuth</strong> when Claude asks for authentication.</li>
                <li>If Claude asks for manual OAuth fields, use the Auth URL, Token URL, Registration URL, and scope shown above.</li>
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
            <div className="connection-guide-mini">
              <span>Auth URL</span>
              <div className="connection-guide-inline">
                <code>{oauthAuthUrl}</code>
                <CopyButton value={oauthAuthUrl} copyKey="chatgpt-auth-url" />
              </div>
            </div>
            <div className="connection-guide-mini">
              <span>Token URL</span>
              <div className="connection-guide-inline">
                <code>{oauthTokenUrl}</code>
                <CopyButton value={oauthTokenUrl} copyKey="chatgpt-token-url" />
              </div>
            </div>
            <div className="connection-guide-mini">
              <span>Registration URL</span>
              <div className="connection-guide-inline">
                <code>{oauthRegistrationUrl}</code>
                <CopyButton value={oauthRegistrationUrl} copyKey="chatgpt-registration-url" />
              </div>
            </div>
            <div className="connection-guide-mini">
              <span>Scope</span>
              <div className="connection-guide-inline">
                <code>animspec:mcp</code>
                <CopyButton value="animspec:mcp" copyKey="chatgpt-scope" />
              </div>
            </div>
            <div className="connection-guide-mini">
              <span>Token auth method</span>
              <div className="connection-guide-inline">
                <code>none</code>
                <CopyButton value="none" copyKey="chatgpt-token-auth-method" />
              </div>
            </div>
            <div className="connection-guide-mini connection-guide-mini-full">
              <span>Steps</span>
              <ol className="connection-guide-steps">
                <li>Open ChatGPT and create a new app or connector.</li>
                <li>Use <code>{mcpUrl}</code> as the MCP Server URL.</li>
                <li>Select <strong>OAuth</strong>.</li>
                <li>If ChatGPT asks for manual OAuth setup, use the Auth URL, Token URL, Registration URL, and scope shown above.</li>
                <li>Complete the AnimSpec login and consent flow.</li>
              </ol>
            </div>
            <div className="connection-guide-mini connection-guide-mini-full">
              <span>Discovery URLs</span>
              <div className="connection-guide-stack">
                <div className="connection-guide-inline">
                  <code>{oauthMetadataUrl}</code>
                  <CopyButton value={oauthMetadataUrl} copyKey="oauth-metadata-url" />
                </div>
                <div className="connection-guide-inline">
                  <code>{protectedResourceUrl}</code>
                  <CopyButton value={protectedResourceUrl} copyKey="protected-resource-url" />
                </div>
              </div>
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

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/oauth/auth.ts
```ts
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

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/app/api/v1/analyze/route.ts
```ts
import { type NextRequest } from 'next/server';
import { authenticateApiKeyRequest } from '@/lib/public-api/auth';
import { parsePublicAnalyzeRequest } from '@/lib/public-api/contracts';
import { buildFormatsMarkdown, buildQualitiesMarkdown } from '@/lib/public-api/metadata';
import { runPublicVideoAnalysis, PublicApiError } from '@/lib/public-api/analyze';
import { OUTPUT_FORMATS, QUALITY_LEVELS, TRIGGER_CONTEXTS } from '@/types/analysis';

export const runtime = 'nodejs';
export const maxDuration = 300;

function unauthorizedResponse() {
  return Response.json(
    {
      error: 'Missing or invalid API key.',
      hint: 'Pass your AnimSpec API key as x-api-key or Authorization: Bearer ask_...',
    },
    { status: 401 }
  );
}

export async function POST(request: NextRequest) {
  const auth = await authenticateApiKeyRequest(request);
  if (!auth) {
    return unauthorizedResponse();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  try {
    const parsed = parsePublicAnalyzeRequest(body);
    const result = await runPublicVideoAnalysis({
      userId: auth.userId,
      request: parsed,
      source: 'api',
    });

    return Response.json(result);
  } catch (error) {
    if (error instanceof PublicApiError) {
      return Response.json(
        {
          error: error.message,
          ...(error.details ?? {}),
        },
        { status: error.status }
      );
    }

    const message = error instanceof Error ? error.message : 'Analysis failed';
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({
    name: 'AnimSpec Video Analysis API',
    version: 'v1',
    description: 'Analyze UI videos and return rebuild, audit, or behavior outputs for AI tools.',
    authentication: {
      method: 'API key',
      acceptedHeaders: ['x-api-key', 'Authorization: Bearer ask_...'],
      keyManagement: '/api/v1/api-keys',
    },
    analyze: {
      endpoint: 'POST /api/v1/analyze',
      sources: [
        'videoBase64 + mimeType',
        'videoUrl',
        'fileUri + fileMimeType',
        'r2ObjectKey',
      ],
      supportsDeepAnalysis: true,
    },
    uploads: {
      geminiFiles: 'POST /api/v1/upload',
      cloudStorage: 'POST /api/v1/upload-url',
    },
    formats: OUTPUT_FORMATS,
    qualities: QUALITY_LEVELS,
    triggers: TRIGGER_CONTEXTS,
    formatGuideMarkdown: buildFormatsMarkdown(),
    qualityGuideMarkdown: buildQualitiesMarkdown(),
  });
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/public-api/video-source.ts
```ts
import path from 'node:path';
import { uploadVideoToGemini } from '@/lib/storage/gemini-files';
import { fetchAsBase64 } from '@/lib/storage/r2';
import type { AnalyzeSource } from './contracts';
import {
  ACCEPTED_VIDEO_EXTENSIONS,
  ACCEPTED_VIDEO_MIME_TYPES,
  GEMINI_INLINE_SIZE_LIMIT,
  MAX_VIDEO_SIZE_BYTES,
} from './metadata';

export interface PreparedAnalysisSource {
  inlineVideoBase64?: string;
  inlineMimeType?: string;
  fileUri?: string;
  fileMimeType?: string;
  fileSize: number;
  videoName: string;
}

interface ResolvedBinaryVideo {
  buffer: Buffer;
  mimeType: string;
  sizeBytes: number;
  fileName: string;
}

function decodeDataUri(dataUri: string, fallbackFileName?: string): ResolvedBinaryVideo {
  const match = dataUri.match(/^data:([^;,]+)?(;base64)?,([\s\S]*)$/);
  if (!match) {
    throw new Error('Invalid data URI');
  }

  const mimeType = assertAllowedMimeType(match[1] || 'video/mp4');
  const isBase64 = Boolean(match[2]);
  const payload = match[3] || '';
  const buffer = Buffer.from(
    isBase64 ? payload : decodeURIComponent(payload),
    isBase64 ? 'base64' : 'utf8',
  );

  if (buffer.byteLength > MAX_VIDEO_SIZE_BYTES) {
    throw new Error(`Video is too large. Maximum supported size is ${MAX_VIDEO_SIZE_BYTES / (1024 * 1024)}MB`);
  }

  return {
    buffer,
    mimeType,
    sizeBytes: buffer.byteLength,
    fileName: fallbackFileName || 'attached-video.mp4',
  };
}

function assertAllowedMimeType(mimeType: string): string {
  if (!(ACCEPTED_VIDEO_MIME_TYPES as readonly string[]).includes(mimeType)) {
    throw new Error(
      `Unsupported video type: ${mimeType}. Allowed: ${ACCEPTED_VIDEO_MIME_TYPES.join(', ')}`
    );
  }
  return mimeType;
}

function inferMimeType(fileName: string): string | null {
  const extension = path.extname(fileName).toLowerCase();
  return ACCEPTED_VIDEO_EXTENSIONS[extension] ?? null;
}

function getFileNameFromUrl(value: string): string {
  try {
    const url = new URL(value);
    const name = path.basename(url.pathname);
    return name || 'remote-video.mp4';
  } catch {
    return 'remote-video.mp4';
  }
}

async function fetchRemoteVideo(
  videoUrl: string,
  fallbackMimeType?: string,
  fallbackFileName?: string
): Promise<ResolvedBinaryVideo> {
  if (videoUrl.startsWith('data:')) {
    return decodeDataUri(videoUrl, fallbackFileName);
  }

  const url = new URL(videoUrl);
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('videoUrl must use http or https');
  }

  const response = await fetch(videoUrl, {
    signal: AbortSignal.timeout(60_000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch video URL: ${response.status}`);
  }

  const contentLength = Number(response.headers.get('content-length') ?? '0');
  if (contentLength > MAX_VIDEO_SIZE_BYTES) {
    throw new Error(`Video is too large. Maximum supported size is ${MAX_VIDEO_SIZE_BYTES / (1024 * 1024)}MB`);
  }

  const fileName = fallbackFileName || getFileNameFromUrl(videoUrl);
  const mimeType = assertAllowedMimeType(
    response.headers.get('content-type')?.split(';')[0]?.trim()
      || fallbackMimeType
      || inferMimeType(fileName)
      || 'video/mp4'
  );

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  if (buffer.byteLength > MAX_VIDEO_SIZE_BYTES) {
    throw new Error(`Video is too large. Maximum supported size is ${MAX_VIDEO_SIZE_BYTES / (1024 * 1024)}MB`);
  }

  return {
    buffer,
    mimeType,
    sizeBytes: buffer.byteLength,
    fileName,
  };
}

async function fetchR2Video(
  objectKey: string,
  fallbackMimeType?: string,
  fallbackFileName?: string
): Promise<ResolvedBinaryVideo> {
  const { base64, contentType } = await fetchAsBase64(objectKey);
  const buffer = Buffer.from(base64, 'base64');
  if (buffer.byteLength > MAX_VIDEO_SIZE_BYTES) {
    throw new Error(`Video is too large. Maximum supported size is ${MAX_VIDEO_SIZE_BYTES / (1024 * 1024)}MB`);
  }

  const fileName = fallbackFileName || path.basename(objectKey) || 'uploaded-video.mp4';
  const mimeType = assertAllowedMimeType(
    fallbackMimeType || contentType.split(';')[0]?.trim() || inferMimeType(fileName) || 'video/mp4'
  );

  return {
    buffer,
    mimeType,
    sizeBytes: buffer.byteLength,
    fileName,
  };
}

async function materializeSource(source: AnalyzeSource): Promise<ResolvedBinaryVideo | null> {
  switch (source.kind) {
    case 'inline_base64': {
      const mimeType = assertAllowedMimeType(source.mimeType);
      const buffer = Buffer.from(source.videoBase64, 'base64');
      if (buffer.byteLength > MAX_VIDEO_SIZE_BYTES) {
        throw new Error(`Video is too large. Maximum supported size is ${MAX_VIDEO_SIZE_BYTES / (1024 * 1024)}MB`);
      }
      return {
        buffer,
        mimeType,
        sizeBytes: buffer.byteLength,
        fileName: source.fileName || 'inline-video.mp4',
      };
    }
    case 'video_uri':
      return fetchRemoteVideo(source.videoUri, source.mimeType, source.fileName);
    case 'video_url':
      return fetchRemoteVideo(source.videoUrl, source.mimeType, source.fileName);
    case 'r2_object':
      return fetchR2Video(source.r2ObjectKey, source.r2MimeType, source.fileName);
    case 'gemini_file':
      return null;
  }
}

export async function prepareAnalysisSource(
  source: AnalyzeSource,
  quality: 'balanced' | 'precise' | 'kimi',
  geminiApiKey?: string,
  options?: {
    preferGeminiFileUpload?: boolean;
    uploadVideo?: typeof uploadVideoToGemini;
  }
): Promise<PreparedAnalysisSource> {
  if (source.kind === 'gemini_file') {
    return {
      fileUri: source.fileUri,
      fileMimeType: assertAllowedMimeType(source.fileMimeType),
      fileSize: 0,
      videoName: source.fileName || 'uploaded-video',
    };
  }

  const resolved = await materializeSource(source);
  if (!resolved) {
    throw new Error('Failed to materialize video source');
  }

  const shouldUseGeminiFiles =
    quality !== 'kimi'
    && (options?.preferGeminiFileUpload || resolved.sizeBytes > GEMINI_INLINE_SIZE_LIMIT);

  if (shouldUseGeminiFiles) {
    if (!geminiApiKey && !options?.uploadVideo) {
      throw new Error('GEMINI_API_KEY is required to upload large Gemini files');
    }
    const file = new File([new Uint8Array(resolved.buffer)], resolved.fileName, { type: resolved.mimeType });
    const uploaded = await (options?.uploadVideo ?? uploadVideoToGemini)(file, geminiApiKey || '');
    return {
      fileUri: uploaded.uri,
      fileMimeType: uploaded.mimeType,
      fileSize: resolved.sizeBytes,
      videoName: resolved.fileName,
    };
  }

  return {
    inlineVideoBase64: resolved.buffer.toString('base64'),
    inlineMimeType: resolved.mimeType,
    fileSize: resolved.sizeBytes,
    videoName: resolved.fileName,
  };
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/mcp/server.ts
```ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { parsePublicAnalyzeRequest } from '@/lib/public-api/contracts';
import { runPublicVideoAnalysis } from '@/lib/public-api/analyze';
import { buildFormatsMarkdown, buildQualitiesMarkdown } from '@/lib/public-api/metadata';
import { ANIMSPEC_WIDGET_URI, getAnimSpecWidgetHtml } from '@/lib/mcp/widget';
import { inferUseCaseFromIntent } from '@/lib/mcp/use-case-inference';
import { prepareVideoInputForMcp } from '@/lib/public-api/prepare-video-input';

function buildAnalyzeResponseText(result: Awaited<ReturnType<typeof runPublicVideoAnalysis>>): string {
  const parts = [
    `## Overview\n${result.overview}`,
    result.code,
  ];

  if (result.notes) {
    parts.push(`## Notes\n${result.notes}`);
  }

  parts.push(
    [
      '## Usage',
      `Format: ${result.format}`,
      `Credits used: ${result.creditsUsed}`,
      `Credits remaining: ${result.creditsRemaining}`,
      result.runId ? `Run ID: ${result.runId}` : null,
      result.verificationScore != null ? `Verification score: ${result.verificationScore}` : null,
      result.pipelineFamily ? `Pipeline family: ${result.pipelineFamily}` : null,
      result.pipelineVersion ? `Pipeline version: ${result.pipelineVersion}` : null,
    ].filter(Boolean).join('\n')
  );

  return parts.join('\n\n');
}

export function createAnimSpecMcpServer() {
  const server = new McpServer({
    name: 'animspec',
    version: '1.0.0',
  });

  server.registerResource(
    'animspec-results-widget',
    ANIMSPEC_WIDGET_URI,
    {
      title: 'AnimSpec Results Widget',
      description: 'Inline ChatGPT app UI for reviewing AnimSpec analysis results.',
      mimeType: 'text/html;profile=mcp-app',
      _meta: {
        ui: {
          prefersBorder: true,
          csp: {
            connectDomains: [],
            resourceDomains: [],
          },
        },
        'openai/widgetDescription': 'Displays the latest AnimSpec analysis result inside ChatGPT.',
      },
    },
    async () => ({
      contents: [
        {
          uri: ANIMSPEC_WIDGET_URI,
          mimeType: 'text/html;profile=mcp-app',
          text: getAnimSpecWidgetHtml(),
          _meta: {
            ui: {
              prefersBorder: true,
              csp: {
                connectDomains: [],
                resourceDomains: [],
              },
            },
            'openai/widgetDescription': 'Displays the latest AnimSpec analysis result inside ChatGPT.',
          },
        },
      ],
    })
  );

  server.registerTool(
    'pick_use_case',
    {
      title: 'Pick use case',
      description: 'Infer the best AnimSpec output format from a user goal or prompt.',
      inputSchema: {
        user_goal: z.string().describe('Natural-language description of what the user wants from the video'),
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async ({ user_goal }: { user_goal: string }) => {
      const inference = inferUseCaseFromIntent(user_goal);
      const structuredInference = {
        format: inference.format,
        confidence: inference.confidence,
        score: inference.score,
        reason: inference.reason,
        alternatives: inference.alternatives.map((item) => ({
          format: item.format,
          score: item.score,
          reason: item.reason,
        })),
      };
      const lines = [
        `Best format: ${inference.format}`,
        `Confidence: ${inference.confidence}`,
        '',
        inference.reason,
      ];

      if (inference.alternatives.length > 0) {
        lines.push(
          '',
          'Alternatives:',
          ...inference.alternatives.map((item) => `- ${item.format}: ${item.reason}`),
        );
      }

      return {
        structuredContent: structuredInference,
        content: [{ type: 'text' as const, text: lines.join('\n') }],
      };
    }
  );

  server.registerTool(
    'prepare_video_input',
    {
      title: 'Prepare video input',
      description: 'Normalize an attached video into a reusable backend reference before calling analyze_video. Use this first when a hosted client gives you a video attachment, base64 blob, or attachment URI.',
      inputSchema: {
        video_uri: z.string().optional().describe('Generic video URI for attached files or remote resources. Prefer this for hosted attachment handoff.'),
        video_url: z.string().url().optional().describe('Publicly fetchable HTTP(S) video URL'),
        video_base64: z.string().optional().describe('Base64-encoded video payload'),
        mime_type: z.string().optional().describe('Required with video_base64; optional with video_uri or video_url'),
        file_name: z.string().optional().describe('Optional file name for history and logs'),
        quality: z.string().optional().describe('balanced, precise, or kimi. Used to choose the best upload strategy.'),
      },
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false,
      },
    },
    async (args: {
      video_uri?: string;
      video_url?: string;
      video_base64?: string;
      mime_type?: string;
      file_name?: string;
      quality?: string;
    }) => {
      try {
        const sourceCandidates = [
          args.video_base64
            ? { kind: 'inline_base64' as const, videoBase64: args.video_base64, mimeType: args.mime_type || '', fileName: args.file_name }
            : null,
          args.video_uri
            ? { kind: 'video_uri' as const, videoUri: args.video_uri, mimeType: args.mime_type, fileName: args.file_name }
            : null,
          args.video_url
            ? { kind: 'video_url' as const, videoUrl: args.video_url, mimeType: args.mime_type, fileName: args.file_name }
            : null,
        ].filter(Boolean);

        if (sourceCandidates.length !== 1) {
          return {
            content: [{
              type: 'text' as const,
              text: 'Provide exactly one source: video_uri, video_url, or video_base64.',
            }],
            isError: true,
          };
        }

        if (sourceCandidates[0]?.kind === 'inline_base64' && !args.mime_type) {
          return {
            content: [{
              type: 'text' as const,
              text: 'mime_type is required with video_base64.',
            }],
            isError: true,
          };
        }

        const prepared = await prepareVideoInputForMcp({
          source: sourceCandidates[0]!,
          quality: args.quality === 'precise' || args.quality === 'kimi' ? args.quality : 'balanced',
          preferGeminiFileUpload: true,
        });
        const structuredPrepared = {
          fileUri: prepared.fileUri ?? null,
          fileMimeType: prepared.fileMimeType ?? null,
          videoBase64: prepared.videoBase64 ?? null,
          mimeType: prepared.mimeType ?? null,
          fileName: prepared.fileName,
          fileSize: prepared.fileSize,
          recommendedField: prepared.recommendedField,
          recommendedMimeField: prepared.recommendedMimeField,
          notes: prepared.notes,
        };

        return {
          structuredContent: structuredPrepared,
          content: [{
            type: 'text' as const,
            text: [
              `Prepared video input for ${prepared.fileName}.`,
              `Next step: call analyze_video using ${prepared.recommendedField} and ${prepared.recommendedMimeField}.`,
              ...prepared.notes,
            ].join('\n'),
          }],
        };
      } catch (error) {
        return {
          content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Failed to prepare video input'}` }],
          isError: true,
        };
      }
    }
  );

  server.registerTool(
    'analyze_video',
    {
      title: 'Analyze video',
      description:
        'Analyze a UI video and return a rebuild, audit, or behavior output. You can pass an explicit format or a user_goal and let AnimSpec infer the right use case first. If the user attached a video in ChatGPT or another hosted tool, call prepare_video_input first, then pass the returned file_uri or video_base64 here. Quality mapping: balanced = Gemini 3 Flash, precise = Gemini 3.1 Pro, kimi = Kimi K2.5.',
      inputSchema: {
        video_uri: z.string().optional().describe('Generic video URI for attached files or remote resources. Prefer this for ChatGPT/hosted attachment handoff. Supports https URLs and data URIs when the host provides them.'),
        video_url: z.string().url().optional().describe('Publicly fetchable HTTP(S) video URL'),
        video_base64: z.string().optional().describe('Base64-encoded video payload'),
        mime_type: z.string().optional().describe('Required with video_base64; optional with video_uri or video_url'),
        file_uri: z.string().optional().describe('Gemini Files URI from /api/v1/upload'),
        file_mime_type: z.string().optional().describe('Required with file_uri'),
        r2_object_key: z.string().optional().describe('R2 object key returned by /api/v1/upload-url'),
        file_name: z.string().optional().describe('Optional file name for history and logs'),
        format: z.string().optional().describe('AnimSpec output format. Explicit format wins when present.'),
        user_goal: z.string().optional().describe('Natural-language goal; used to infer the best format when format is omitted'),
        quality: z.string().optional().describe('balanced (Gemini 3 Flash), precise (Gemini 3.1 Pro), or kimi (Kimi K2.5)'),
        trigger: z.string().optional().describe('hover, click, scroll, load, loop, or focus'),
        deep_analysis: z.boolean().optional().describe('Enable the multi-stage deep analysis pipeline'),
      },
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false,
      },
      _meta: {
        ui: {
          resourceUri: ANIMSPEC_WIDGET_URI,
          visibility: ['model', 'app'],
        },
        'openai/outputTemplate': ANIMSPEC_WIDGET_URI,
        'openai/toolInvocation/invoking': 'Analyzing video…',
        'openai/toolInvocation/invoked': 'Analysis ready.',
      },
    },
    async (
      args: {
        video_uri?: string;
        video_url?: string;
        video_base64?: string;
        mime_type?: string;
        file_uri?: string;
        file_mime_type?: string;
        r2_object_key?: string;
        file_name?: string;
        format?: string;
        user_goal?: string;
        quality?: string;
        trigger?: string;
        deep_analysis?: boolean;
      },
      extra
    ) => {
      const authenticatedUserId = typeof extra.authInfo?.extra?.userId === 'string'
        ? extra.authInfo.extra.userId
        : null;
      const sharedAppUserId = process.env.CHATGPT_APP_SHARED_USER_ID || null;
      const userId = authenticatedUserId || sharedAppUserId;
      const mode = authenticatedUserId ? 'user-api-key' : sharedAppUserId ? 'shared-app-account' : 'auth-required';

      if (!userId) {
        return {
          content: [
            {
              type: 'text' as const,
              text: 'Authentication required. Send your AnimSpec API key as x-api-key or Authorization: Bearer ask_.... To make this directly usable from ChatGPT without per-user auth, set CHATGPT_APP_SHARED_USER_ID on the server.',
            },
          ],
          isError: true,
        };
      }

      try {
        const useCase = args.format
          ? null
          : args.user_goal
            ? inferUseCaseFromIntent(args.user_goal)
            : null;
        const resolvedFormat = args.format || useCase?.format;

        if (!resolvedFormat) {
          return {
            content: [
              {
                type: 'text' as const,
                text: 'Provide either format or user_goal so AnimSpec can choose the right use case.',
              },
            ],
            isError: true,
          };
        }

        const request = parsePublicAnalyzeRequest({
          format: resolvedFormat,
          quality: args.quality,
          trigger: args.trigger,
          deepAnalysis: args.deep_analysis,
          videoUri: args.video_uri,
          videoUrl: args.video_url,
          videoBase64: args.video_base64,
          mimeType: args.mime_type,
          fileUri: args.file_uri,
          fileMimeType: args.file_mime_type,
          r2ObjectKey: args.r2_object_key,
          fileName: args.file_name,
        });

        const result = await runPublicVideoAnalysis({
          userId,
          request,
          source: 'mcp',
        });

        return {
          structuredContent: {
            overview: result.overview,
            code: result.code,
            format: result.format,
            notes: result.notes ?? null,
            creditsUsed: result.creditsUsed,
            creditsRemaining: result.creditsRemaining,
            runId: result.runId ?? null,
            verificationScore: result.verificationScore ?? null,
            pipelineFamily: result.pipelineFamily ?? null,
            pipelineVersion: result.pipelineVersion ?? null,
            mode,
            inferredFormat: useCase?.format ?? null,
            inferenceConfidence: useCase?.confidence ?? null,
            inferenceReason: useCase?.reason ?? null,
          },
          content: [
            {
              type: 'text' as const,
              text: [
                useCase
                  ? `Picked use case: ${useCase.format} (${useCase.confidence})\n${useCase.reason}\n`
                  : null,
                buildAnalyzeResponseText(result),
              ].filter(Boolean).join('\n\n'),
            },
          ],
          _meta: {
            overview: result.overview,
            code: result.code,
            notes: result.notes ?? null,
            runId: result.runId ?? null,
            mode,
            inferredFormat: useCase?.format ?? null,
          },
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Analysis failed';
        return {
          content: [{ type: 'text' as const, text: `Error: ${message}` }],
          isError: true,
        };
      }
    }
  );

  server.registerTool(
    'list_formats',
    {
      title: 'List formats',
      description: 'List all AnimSpec output formats and where each one fits best. Use pick_use_case if you want AnimSpec to infer one from a natural-language goal.',
    },
    async () => ({
      content: [{ type: 'text' as const, text: `# AnimSpec Output Formats\n\n${buildFormatsMarkdown()}` }],
    })
  );

  server.registerTool(
    'list_models',
    {
      title: 'List qualities',
      description: 'List available quality levels and credit costs.',
    },
    async () => ({
      content: [{ type: 'text' as const, text: `# AnimSpec Quality Levels\n\n${buildQualitiesMarkdown()}` }],
    })
  );

  return server;
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/README.md
```md
# AnimSpec

AnimSpec turns UI videos into structured outputs that agents and developers can use to rebuild, audit, or understand interfaces.

For detailed architecture and the long-term Deep Analysis roadmap, see:

- `docs/deep-analysis-v2-spec.md`
- `docs/public-api-mcp.md`
- `architecture.md`
- `spec.md`

## What the app does

You upload a screen recording, choose a use case, and get back a structured result.

Examples:

- clone a UI animation
- clone a component or landing page
- extract design tokens
- generate motion specs
- run accessibility, performance, or UI/UX audits
- infer interaction state machines

## Programmatic access

AnimSpec now exposes a public API and MCP surface for agent workflows.

- `POST /api/v1/api-keys` to mint API keys from a signed-in user session
- `POST /api/v1/analyze` to run regular or deep analysis with an API key
- `POST /api/v1/upload` for Gemini Files uploads
- `POST /api/v1/upload-url` for direct R2 uploads
- `POST /api/mcp` for remote MCP clients using Streamable HTTP
- `npm run mcp` for a local stdio MCP thin client

The remote MCP endpoint now also exposes an inline app widget for ChatGPT-style hosts.

See `docs/public-api-mcp.md` for usage patterns and current auth constraints.

## Analysis modes

AnimSpec currently has two analysis modes.

### Regular analysis

Regular analysis is the fast path.

It uses a single model run to analyze the uploaded video and generate the requested output. It is best when you want a fast answer, lower cost, and a good first pass.

Regular analysis is:

- one-shot
- faster
- cheaper
- simpler
- good for quick output generation

Regular analysis does **not** do multi-stage planning, verification, or revision.

### Deep analysis

Deep analysis is the correctness-first path.

Instead of treating every request the same way, it now plans the run based on the requested format and routes the request into one of three analysis families:

- **Reconstruction** — for clone/build/export work
- **Audit** — for UI/UX, accessibility, and performance review
- **Behavior** — for state-machine and interaction-flow extraction

Deep analysis creates shared video-understanding artifacts first, then runs family-specific stages, validates intermediate results, verifies the output, and can revise the output if the verification says it is weak.

Deep analysis is:

- multi-stage
- format-aware
- planned instead of one-shot
- verification-driven
- revision-capable
- designed to scale to future use cases

## Regular vs Deep analysis

In plain English:

- **Regular analysis** = quick answer
- **Deep analysis** = planned, checked, and improved answer

### Example: clone task

For a clone-style task, regular analysis gives you one direct output.

Deep analysis instead:

- maps scenes and states
- analyzes motion and visual details
- generates the requested output
- verifies fidelity
- revises the output if needed

### Example: audit task

For an audit task, regular analysis gives you a one-shot critique.

Deep analysis instead:

- segments the visible flow
- infers user intent and friction points
- generates the audit in the right format
- validates audit quality
- revises the audit if needed

## Why Deep Analysis exists

Deep Analysis is not just “more tokens.”

It exists so the system can:

- use different reasoning paths for different jobs
- keep intermediate artifacts separate from the final output
- validate structured intermediate results
- improve weak results before returning them
- support stronger future verification methods

## Current design direction

The long-term direction is a shared video-understanding layer plus specialized pipelines for different use cases.

That means future formats should be able to plug into the system without forcing everything through the same fixed prompt chain.

The full implementation plan lives in `docs/deep-analysis-v2-spec.md`.

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/app/api/oauth/authorize/approve/route.ts
```ts
import { NextRequest, NextResponse } from 'next/server';
import { authenticateSessionUser } from '@/lib/oauth/auth';
import { OAUTH_SCOPE } from '@/lib/oauth/config';
import { createAuthorizationCode, getOAuthClient } from '@/lib/oauth/store';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const userId = await authenticateSessionUser(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const clientId = typeof body.clientId === 'string' ? body.clientId : '';
  const redirectUri = typeof body.redirectUri === 'string' ? body.redirectUri : '';
  const state = typeof body.state === 'string' ? body.state : '';
  const scope = typeof body.scope === 'string' && body.scope.trim().length > 0 ? body.scope : OAUTH_SCOPE;
  const resource = typeof body.resource === 'string' && body.resource.length > 0 ? body.resource : null;
  const codeChallenge = typeof body.codeChallenge === 'string' ? body.codeChallenge : '';
  const codeChallengeMethod = body.codeChallengeMethod === 'S256' ? 'S256' : null;

  if (!clientId || !redirectUri || !codeChallenge || codeChallengeMethod !== 'S256') {
    return NextResponse.json({ error: 'Invalid authorization request' }, { status: 400 });
  }

  const client = await getOAuthClient(clientId);
  if (!client || !client.redirectUris.includes(redirectUri)) {
    return NextResponse.json({ error: 'Unknown client or redirect URI' }, { status: 400 });
  }

  const code = await createAuthorizationCode({
    clientId,
    userId,
    redirectUri,
    scope,
    resource,
    codeChallenge,
    codeChallengeMethod,
  });

  const callbackUrl = new URL(redirectUri);
  callbackUrl.searchParams.set('code', code);
  if (state) {
    callbackUrl.searchParams.set('state', state);
  }

  return NextResponse.json({
    redirectTo: callbackUrl.toString(),
  });
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/app/.well-known/oauth-protected-resource/[...resource]/route.ts
```ts
import { NextRequest, NextResponse } from 'next/server';
import { getAppOrigin, getProtectedResourceMetadata } from '@/lib/oauth/config';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ resource?: string[] }> }
) {
  const origin = getAppOrigin(request.nextUrl.origin);
  const { resource = [] } = await context.params;
  const resourceUrl = resource.length > 0 ? `${origin}/${resource.join('/')}` : `${origin}/api/mcp`;

  return NextResponse.json(getProtectedResourceMetadata(origin, resourceUrl), {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/public-api/analyze.ts
```ts
import {
  analyzeVideoWithGemini,
  analyzeVideoWithGeminiFile,
  type GeminiQualityLevel,
} from '@/lib/ai/gemini';
import { analyzeVideoWithKimi } from '@/lib/ai/kimi';
import { extractOverview, parseAnalysisOutput } from '@/lib/ai/output-parsers';
import { createAnalysisRunRecord, finalizeAnalysisRunRecord, persistArtifacts } from '@/lib/video-understanding/persistence/run-store';
import { runDeepAnalysis } from '@/lib/video-understanding/orchestrator';
import type { DeepAnalysisRunResult } from '@/lib/video-understanding/artifacts';
import type { PublicAnalyzeRequest } from './contracts';
import {
  checkCredits,
  refundCredits,
  reserveCredits,
  saveAnalysisRecord,
  trimAnalysisHistory,
} from './credits';
import { prepareAnalysisSource } from './video-source';

const DEEP_ANALYSIS_PIPELINE_VERSION = process.env.DEEP_ANALYSIS_PIPELINE_VERSION ?? 'v2';

export class PublicApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
  }
}

export interface PublicAnalyzeResult {
  overview: string;
  code: string;
  format: PublicAnalyzeRequest['format'];
  notes?: string | null;
  creditsUsed: number;
  creditsRemaining: number;
  runId?: string | null;
  verificationScore?: number | null;
  pipelineFamily?: 'reconstruct' | 'audit' | 'behavior' | null;
  pipelineVersion?: string | null;
}

interface RunAnalysisOptions {
  userId: string;
  request: PublicAnalyzeRequest;
  source: 'api' | 'mcp';
}

function requireGeminiApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new PublicApiError('GEMINI_API_KEY is not configured', 500);
  }
  return apiKey;
}

function buildVideoMetadata(
  request: PublicAnalyzeRequest,
  prepared: Awaited<ReturnType<typeof prepareAnalysisSource>>
) {
  return {
    duration: request.metadata?.duration ?? 0,
    width: request.metadata?.width ?? 0,
    height: request.metadata?.height ?? 0,
    size: request.metadata?.size || prepared.fileSize,
    mimeType:
      request.metadata?.mimeType
      || prepared.fileMimeType
      || prepared.inlineMimeType
      || '',
    name: request.metadata?.name || prepared.videoName,
  };
}

async function runRegularAnalysis(
  request: PublicAnalyzeRequest,
  prepared: Awaited<ReturnType<typeof prepareAnalysisSource>>
): Promise<Pick<PublicAnalyzeResult, 'overview' | 'code' | 'format' | 'notes'>> {
  const videoMetadata = buildVideoMetadata(request, prepared);

  if (request.quality === 'kimi') {
    if (!prepared.inlineVideoBase64 || !prepared.inlineMimeType) {
      throw new PublicApiError(
        'Kimi analysis requires inline video data. Use videoBase64, videoUrl, or r2ObjectKey.',
        400
      );
    }

    const rawOutput = await analyzeVideoWithKimi({
      videoBase64: prepared.inlineVideoBase64,
      mimeType: prepared.inlineMimeType,
      format: request.format,
      triggerContext: request.triggerContext,
      videoMetadata,
    });

    const result = parseAnalysisOutput(rawOutput, request.format);
    return {
      overview: result.overview,
      code: result.code,
      format: result.format,
      notes: result.notes ?? null,
    };
  }

  let rawOutput = '';
  if (prepared.fileUri && prepared.fileMimeType) {
    rawOutput = await analyzeVideoWithGeminiFile({
      fileUri: prepared.fileUri,
      fileMimeType: prepared.fileMimeType,
      format: request.format,
      quality: request.quality as GeminiQualityLevel,
      triggerContext: request.triggerContext,
      videoMetadata,
    });
  } else if (prepared.inlineVideoBase64 && prepared.inlineMimeType) {
    rawOutput = await analyzeVideoWithGemini({
      videoBase64: prepared.inlineVideoBase64,
      mimeType: prepared.inlineMimeType,
      format: request.format,
      quality: request.quality as GeminiQualityLevel,
      triggerContext: request.triggerContext,
      videoMetadata,
    });
  } else {
    throw new PublicApiError('Prepared video source is invalid for Gemini analysis', 500);
  }

  const result = parseAnalysisOutput(rawOutput, request.format);
  return {
    overview: result.overview,
    code: result.code,
    format: result.format,
    notes: result.notes ?? null,
  };
}

async function runDeepPipeline(
  userId: string,
  request: PublicAnalyzeRequest,
  prepared: Awaited<ReturnType<typeof prepareAnalysisSource>>
): Promise<
  Pick<
    PublicAnalyzeResult,
    'overview' | 'code' | 'format' | 'runId' | 'verificationScore' | 'pipelineFamily' | 'pipelineVersion'
  >
> {
  if (request.quality !== 'kimi') {
    requireGeminiApiKey();
  }

  const videoMetadata = buildVideoMetadata(request, prepared);
  const deepApiKey = process.env.GEMINI_API_KEY || process.env.MOONSHOT_API_KEY || '';

  let runId: string | null = null;
  let runFamily: 'reconstruct' | 'audit' | 'behavior' | null = null;
  let verificationScore: number | null = null;
  let deepResult: DeepAnalysisRunResult | null = null;

  const iterator = runDeepAnalysis({
    apiKey: deepApiKey,
    format: request.format,
    quality: request.quality,
    triggerContext: request.triggerContext,
    videoMetadata,
    fileSize: prepared.fileSize,
    videoName: videoMetadata.name,
    fileUri: prepared.fileUri,
    fileMimeType: prepared.fileMimeType,
    inlineMimeType: prepared.inlineMimeType,
    inlineVideoBase64: prepared.inlineVideoBase64,
  });

  let step = await iterator.next();
  while (!step.done) {
    const event = step.value;

    switch (event.type) {
      case 'run_created':
        runId = event.runId;
        runFamily = event.family as 'reconstruct' | 'audit' | 'behavior';
        await createAnalysisRunRecord({
          runId,
          userId,
          format: request.format,
          quality: request.quality,
          triggerContext: request.triggerContext,
          family: runFamily,
          complexity: event.complexity as 'simple' | 'moderate' | 'complex',
          pipelineVersion: DEEP_ANALYSIS_PIPELINE_VERSION,
          generatorModel: event.generatorModel,
          verifierModel: event.verifierModel,
        });
        break;
      case 'verification':
        verificationScore = event.verification.score;
        break;
      case 'error':
        throw new PublicApiError(event.message, 500);
      default:
        break;
    }

    step = await iterator.next();
  }

  deepResult = step.value;

  if (runId && deepResult) {
    await persistArtifacts({
      runId,
      sharedArtifacts: deepResult.sharedArtifacts,
      stageArtifacts: deepResult.stageArtifacts,
      finalArtifact: deepResult.finalArtifact,
      verification: deepResult.verification,
    });

    await finalizeAnalysisRunRecord({
      runId,
      status: 'complete',
      finalArtifact: deepResult.finalArtifact,
      verification: deepResult.verification,
      stageCount: deepResult.stageArtifacts.length,
    });
  }

  return {
    overview: deepResult?.finalArtifact.overview || extractOverview(deepResult?.finalArtifact.content || ''),
    code: deepResult?.finalArtifact.content || '',
    format: request.format,
    runId,
    verificationScore: verificationScore ?? deepResult?.verification?.score ?? null,
    pipelineFamily: runFamily,
    pipelineVersion: DEEP_ANALYSIS_PIPELINE_VERSION,
  };
}

export async function runPublicVideoAnalysis(
  options: RunAnalysisOptions
): Promise<PublicAnalyzeResult> {
  const { userId, request, source } = options;

  const creditCheck = await checkCredits(userId, request.quality, request.deepAnalysis);
  if (!creditCheck.canProceed) {
    throw new PublicApiError(creditCheck.error || 'Unable to analyze', 402, {
      creditsRequired: creditCheck.cost,
      creditsBalance: creditCheck.balance,
    });
  }

  const reserved = await reserveCredits(
    userId,
    request.quality,
    request.deepAnalysis,
    request.format,
    source
  );

  try {
    const geminiApiKey = process.env.GEMINI_API_KEY || undefined;
    const prepared = await prepareAnalysisSource(
      request.source,
      request.quality,
      geminiApiKey,
      {
        preferGeminiFileUpload:
          request.quality !== 'kimi'
          && (request.deepAnalysis || request.source.kind === 'video_uri'),
      }
    );

    const result = request.deepAnalysis
      ? await runDeepPipeline(userId, request, prepared)
      : await runRegularAnalysis(request, prepared);

    const videoMetadata = buildVideoMetadata(request, prepared);

    try {
      const resultRunId = 'runId' in result ? result.runId ?? null : null;
      const resultVerificationScore = 'verificationScore' in result ? result.verificationScore ?? null : null;
      const resultPipelineFamily = 'pipelineFamily' in result ? result.pipelineFamily ?? null : null;
      const resultPipelineVersion = 'pipelineVersion' in result ? result.pipelineVersion ?? null : null;

      await saveAnalysisRecord({
        userId,
        quality: request.quality,
        format: request.format,
        triggerContext: request.triggerContext,
        overview: result.overview,
        code: result.code,
        videoName: videoMetadata.name,
        videoDuration: videoMetadata.duration,
        creditsUsed: reserved.cost,
        source,
        runId: resultRunId,
        verificationScore: resultVerificationScore,
        pipelineFamily: resultPipelineFamily,
        pipelineVersion: resultPipelineVersion,
      });
      await trimAnalysisHistory(userId);
    } catch (error) {
      console.error('Failed to persist public analysis result:', error);
    }

    return {
      ...result,
      creditsUsed: reserved.cost,
      creditsRemaining: reserved.newBalance,
    };
  } catch (error) {
    await refundCredits(userId, request.quality, request.deepAnalysis, request.format, source).catch(
      (refundError) => {
        console.error('Failed to refund credits after public API error:', refundError);
      }
    );

    if (error instanceof PublicApiError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : 'Analysis failed';
    throw new PublicApiError(message, 500);
  }
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/app/oauth/register/route.ts
```ts
import { NextRequest, NextResponse } from 'next/server';
import { buildClientRegistrationResponse, getOAuthClient, registerOAuthClient } from '@/lib/oauth/store';
import { getAppOrigin, OAUTH_SCOPE } from '@/lib/oauth/config';

export const runtime = 'nodejs';

function sanitizeRedirectUris(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === 'string' && /^https?:\/\//.test(item));
}

export async function POST(request: NextRequest) {
  const origin = getAppOrigin(request.nextUrl.origin);
  const body = await request.json().catch(() => ({}));

  const redirectUris = sanitizeRedirectUris((body as Record<string, unknown>).redirect_uris);
  if (redirectUris.length === 0) {
    return NextResponse.json(
      { error: 'invalid_client_metadata', error_description: 'redirect_uris is required.' },
      { status: 400 }
    );
  }

  const authMethod = (body as Record<string, unknown>).token_endpoint_auth_method;
  const tokenEndpointAuthMethod =
    authMethod === 'client_secret_post' || authMethod === 'client_secret_basic'
      ? authMethod
      : 'none';

  const client = await registerOAuthClient({
    clientName: typeof (body as Record<string, unknown>).client_name === 'string'
      ? (body as Record<string, unknown>).client_name as string
      : null,
    redirectUris,
    tokenEndpointAuthMethod,
    grantTypes: ['authorization_code', 'refresh_token'],
    responseTypes: ['code'],
    scope: typeof (body as Record<string, unknown>).scope === 'string'
      ? (body as Record<string, unknown>).scope as string
      : OAUTH_SCOPE,
  });

  return NextResponse.json(buildClientRegistrationResponse(origin, client), {
    status: 201,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

export async function GET() {
  return NextResponse.json(
    { error: 'method_not_allowed' },
    { status: 405 }
  );
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/storage/gemini-files.ts
```ts
// Gemini Files API utilities for video upload
// Uses Google's native file upload for optimal video processing

import { GoogleGenAI } from '@google/genai';

export interface UploadedFile {
  name: string;
  uri: string;
  mimeType: string;
  sizeBytes: string;
  state: 'PROCESSING' | 'ACTIVE' | 'FAILED';
}

export async function uploadVideoToGemini(
  file: File,
  apiKey: string
): Promise<UploadedFile> {
  const client = new GoogleGenAI({ apiKey });

  // Convert file to blob for upload
  const blob = new Blob([await file.arrayBuffer()], { type: file.type });

  // Upload the file using Gemini Files API
  const uploadResult = await client.files.upload({
    file: blob,
    config: {
      mimeType: file.type,
      displayName: file.name,
    },
  });

  // Wait for processing to complete
  let fileInfo = uploadResult;
  const fileName = fileInfo.name;
  if (!fileName) {
    throw new Error('Failed to get file name from upload');
  }

  while (fileInfo.state === 'PROCESSING') {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    fileInfo = await client.files.get({ name: fileName });
  }

  if (fileInfo.state === 'FAILED') {
    throw new Error('File processing failed');
  }

  if (!fileInfo.uri || !fileInfo.mimeType || !fileInfo.sizeBytes) {
    throw new Error('File processing returned incomplete data');
  }

  return {
    name: fileName,
    uri: fileInfo.uri,
    mimeType: fileInfo.mimeType,
    sizeBytes: fileInfo.sizeBytes,
    state: fileInfo.state as 'ACTIVE',
  };
}

export async function deleteGeminiFile(
  fileName: string,
  apiKey: string
): Promise<void> {
  const client = new GoogleGenAI({ apiKey });
  await client.files.delete({ name: fileName });
}

export async function listGeminiFiles(apiKey: string): Promise<UploadedFile[]> {
  const client = new GoogleGenAI({ apiKey });
  const pager = await client.files.list();

  const result: UploadedFile[] = [];
  for await (const file of pager) {
    if (file.name && file.uri && file.mimeType && file.sizeBytes) {
      result.push({
        name: file.name,
        uri: file.uri,
        mimeType: file.mimeType,
        sizeBytes: file.sizeBytes,
        state: file.state as 'PROCESSING' | 'ACTIVE' | 'FAILED',
      });
    }
  }
  return result;
}

export function formatFileSize(bytes: number | string): string {
  const numBytes = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
  if (numBytes < 1024) {
    return `${numBytes} B`;
  } else if (numBytes < 1024 * 1024) {
    return `${(numBytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(numBytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}

export function isLargeFile(file: File): boolean {
  const THRESHOLD = 20 * 1024 * 1024; // 20MB - Gemini inline limit
  return file.size > THRESHOLD;
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/mcp/widget.ts
```ts
const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

export const ANIMSPEC_WIDGET_URI = 'ui://widget/animspec-results-v1.html';

export function getAnimSpecWidgetHtml(): string {
  const initialState = {
    title: 'AnimSpec',
    subtitle: 'Run a video analysis from ChatGPT and inspect the result here.',
  };

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>AnimSpec Results</title>
    <style>
      :root {
        color-scheme: light dark;
        --bg: #0f1117;
        --panel: rgba(18, 21, 31, 0.88);
        --panel-border: rgba(255, 255, 255, 0.08);
        --text: #f5f7fb;
        --muted: #a5afc1;
        --accent: #71f7c7;
        --accent-2: #71b8ff;
        --code-bg: rgba(9, 12, 19, 0.95);
        --pill: rgba(255, 255, 255, 0.08);
      }

      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; min-height: 100%; background:
        radial-gradient(circle at top left, rgba(113, 247, 199, 0.15), transparent 36%),
        radial-gradient(circle at top right, rgba(113, 184, 255, 0.18), transparent 32%),
        linear-gradient(180deg, #11131b 0%, #090b11 100%);
        color: var(--text);
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      main {
        width: min(920px, calc(100vw - 24px));
        margin: 0 auto;
        padding: 16px 0 24px;
      }

      .shell {
        border: 1px solid var(--panel-border);
        background: var(--panel);
        backdrop-filter: blur(18px);
        border-radius: 22px;
        overflow: hidden;
        box-shadow: 0 20px 70px rgba(0, 0, 0, 0.38);
      }

      .hero {
        padding: 20px 20px 14px;
        border-bottom: 1px solid var(--panel-border);
      }

      .kicker {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--accent);
      }

      h1 {
        margin: 10px 0 8px;
        font-size: clamp(24px, 4vw, 34px);
        line-height: 1.05;
      }

      .subtitle {
        margin: 0;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.5;
      }

      .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 16px 20px 0;
      }

      .pill {
        padding: 7px 10px;
        border-radius: 999px;
        background: var(--pill);
        color: var(--muted);
        font-size: 12px;
      }

      .body {
        display: grid;
        gap: 16px;
        padding: 16px 20px 20px;
      }

      .panel {
        border: 1px solid var(--panel-border);
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.03);
        overflow: hidden;
      }

      .panel h2 {
        margin: 0;
        padding: 14px 16px;
        font-size: 13px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--accent-2);
        border-bottom: 1px solid var(--panel-border);
      }

      .panel .content {
        padding: 16px;
        line-height: 1.6;
        font-size: 14px;
      }

      pre {
        margin: 0;
        white-space: pre-wrap;
        word-break: break-word;
        background: var(--code-bg);
        padding: 16px;
        font-size: 12px;
        line-height: 1.55;
        overflow: auto;
      }

      .empty {
        color: var(--muted);
      }
    </style>
  </head>
  <body>
    <main>
      <div class="shell">
        <div class="hero">
          <div class="kicker">AnimSpec App</div>
          <h1 id="title">${escapeHtml(initialState.title)}</h1>
          <p class="subtitle" id="subtitle">${escapeHtml(initialState.subtitle)}</p>
        </div>
        <div class="meta" id="meta"></div>
        <div class="body">
          <section class="panel">
            <h2>Overview</h2>
            <div class="content" id="overview"><span class="empty">Run an analysis to populate this view.</span></div>
          </section>
          <section class="panel">
            <h2>Output</h2>
            <pre id="code">Waiting for tool result…</pre>
          </section>
          <section class="panel" id="notes-panel" hidden>
            <h2>Notes</h2>
            <div class="content" id="notes"></div>
          </section>
        </div>
      </div>
    </main>
    <script>
      const titleEl = document.getElementById('title');
      const subtitleEl = document.getElementById('subtitle');
      const metaEl = document.getElementById('meta');
      const overviewEl = document.getElementById('overview');
      const codeEl = document.getElementById('code');
      const notesPanelEl = document.getElementById('notes-panel');
      const notesEl = document.getElementById('notes');

      function escapeHtml(value) {
        return String(value)
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;')
          .replaceAll("'", '&#39;');
      }

      function render(data) {
        const title = data?.format ? 'Analysis ready' : 'AnimSpec';
        const subtitle = data?.mode === 'shared-app-account'
          ? 'Using the shared ChatGPT app account.'
          : 'Rendered from the latest tool result.';

        titleEl.textContent = title;
        subtitleEl.textContent = subtitle;

        const pills = [
          data?.format ? 'Format: ' + data.format : null,
          data?.creditsUsed != null ? 'Credits: ' + data.creditsUsed : null,
          data?.creditsRemaining != null ? 'Remaining: ' + data.creditsRemaining : null,
          data?.pipelineFamily ? 'Pipeline: ' + data.pipelineFamily : null,
          data?.verificationScore != null ? 'Score: ' + data.verificationScore : null,
        ].filter(Boolean);

        metaEl.innerHTML = pills.map((pill) => '<span class="pill">' + escapeHtml(pill) + '</span>').join('');
        overviewEl.innerHTML = data?.overview ? escapeHtml(data.overview) : '<span class="empty">No overview yet.</span>';
        codeEl.textContent = data?.code || 'No output yet.';

        if (data?.notes) {
          notesPanelEl.hidden = false;
          notesEl.textContent = data.notes;
        } else {
          notesPanelEl.hidden = true;
          notesEl.textContent = '';
        }
      }

      window.addEventListener('message', (event) => {
        if (event.source !== window.parent) return;
        const message = event.data;
        if (!message || message.jsonrpc !== '2.0') return;
        if (message.method !== 'ui/notifications/tool-result') return;
        render(message.params?.structuredContent || {});
      }, { passive: true });
    </script>
  </body>
</html>`;
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/firebase/admin.ts
```ts
import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getStorage, type Storage } from 'firebase-admin/storage';

// Lazy initialization to avoid build-time errors
let _adminApp: App | null = null;
let _adminAuth: Auth | null = null;
let _adminDb: Firestore | null = null;
let _adminStorage: Storage | null = null;

function initializeAdminApp(): App {
  if (_adminApp) {
    return _adminApp;
  }

  if (getApps().length > 0) {
    _adminApp = getApps()[0];
    return _adminApp;
  }

  // Parse service account from environment variable
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    : undefined;

  if (!serviceAccount) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set');
  }

  _adminApp = initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });

  return _adminApp;
}

// Lazy getters - only initialize when actually needed
export function getAdminAuth(): Auth {
  if (!_adminAuth) {
    _adminAuth = getAuth(initializeAdminApp());
  }
  return _adminAuth;
}

export function getAdminDb(): Firestore {
  if (!_adminDb) {
    _adminDb = getFirestore(initializeAdminApp());
  }
  return _adminDb;
}

export function getAdminStorage(): Storage {
  if (!_adminStorage) {
    _adminStorage = getStorage(initializeAdminApp());
  }
  return _adminStorage;
}

// For backwards compatibility, export as const using getters
// These will throw at runtime if env vars aren't set, but won't throw at build time
export const adminAuth = {
  get instance() { return getAdminAuth(); },
  verifyIdToken: (...args: Parameters<Auth['verifyIdToken']>) => getAdminAuth().verifyIdToken(...args),
  createSessionCookie: (...args: Parameters<Auth['createSessionCookie']>) => getAdminAuth().createSessionCookie(...args),
  verifySessionCookie: (...args: Parameters<Auth['verifySessionCookie']>) => getAdminAuth().verifySessionCookie(...args),
};

export const adminDb = {
  get instance() { return getAdminDb(); },
  collection: (...args: Parameters<Firestore['collection']>) => getAdminDb().collection(...args),
  doc: (...args: Parameters<Firestore['doc']>) => getAdminDb().doc(...args),
  runTransaction: (...args: Parameters<Firestore['runTransaction']>) => getAdminDb().runTransaction(...args),
  batch: () => getAdminDb().batch(),
};

export const adminStorage = {
  get instance() { return getAdminStorage(); },
  bucket: (...args: Parameters<Storage['bucket']>) => getAdminStorage().bucket(...args),
};

export default initializeAdminApp;

```

File: /Users/sanketdongre/Documents/Projects/animspec/tests/public-api-contracts.test.ts
```ts
import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { parsePublicAnalyzeRequest } from '../src/lib/public-api/contracts.ts';

test('parsePublicAnalyzeRequest accepts the new ui_ux_audit format and deepAnalysis flag', () => {
  const request = parsePublicAnalyzeRequest({
    format: 'ui_ux_audit',
    quality: 'kimi',
    trigger: 'scroll',
    deepAnalysis: true,
    videoUrl: 'https://example.com/demo.mp4',
    metadata: {
      duration: 4.2,
      width: 1440,
      height: 900,
      size: 12345,
    },
  });

  assert.equal(request.format, 'ui_ux_audit');
  assert.equal(request.quality, 'kimi');
  assert.equal(request.triggerContext, 'scroll');
  assert.equal(request.deepAnalysis, true);
  assert.equal(request.source.kind, 'video_url');
});

test('parsePublicAnalyzeRequest rejects multiple video sources', () => {
  assert.throws(
    () =>
      parsePublicAnalyzeRequest({
        format: 'clone_ui_animation',
        videoUrl: 'https://example.com/demo.mp4',
        videoBase64: 'abcd',
        mimeType: 'video/mp4',
      }),
    /exactly one video source/i
  );
});

test('parsePublicAnalyzeRequest accepts legacy agenticMode alias', () => {
  const request = parsePublicAnalyzeRequest({
    format: 'clone_component',
    quality: 'balanced',
    agenticMode: true,
    videoBase64: 'abcd',
    mimeType: 'video/mp4',
  });

  assert.equal(request.deepAnalysis, true);
  assert.equal(request.source.kind, 'inline_base64');
});

test('parsePublicAnalyzeRequest accepts generic videoUri sources for hosted attachment handoff', () => {
  const request = parsePublicAnalyzeRequest({
    format: 'ui_ux_audit',
    quality: 'balanced',
    videoUri: 'data:video/mp4;base64,YWJjZA==',
    mimeType: 'video/mp4',
    fileName: 'upload.mp4',
  });

  assert.equal(request.source.kind, 'video_uri');
  assert.equal(request.source.videoUri.startsWith('data:video/mp4;base64,'), true);
});

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/app/api/v1/upload/route.ts
```ts
import { type NextRequest, NextResponse } from 'next/server';
import { uploadVideoToGemini } from '@/lib/storage/gemini-files';
import { authenticateApiKeyRequest } from '@/lib/public-api/auth';
import { ACCEPTED_VIDEO_MIME_TYPES, MAX_VIDEO_SIZE_BYTES } from '@/lib/public-api/metadata';

export const runtime = 'nodejs';
export const maxDuration = 300;

function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Missing or invalid API key' },
    { status: 401 }
  );
}

export async function POST(request: NextRequest) {
  const auth = await authenticateApiKeyRequest(request);
  if (!auth) {
    return unauthorizedResponse();
  }

  try {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!(ACCEPTED_VIDEO_MIME_TYPES as readonly string[]).includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${ACCEPTED_VIDEO_MIME_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    if (file.size > MAX_VIDEO_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_VIDEO_SIZE_BYTES / (1024 * 1024)}MB.` },
        { status: 400 }
      );
    }

    const uploaded = await uploadVideoToGemini(file, geminiApiKey);
    return NextResponse.json(uploaded);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/tests/oauth-store.test.ts
```ts
import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { buildClientRegistrationResponse } from '../src/lib/oauth/store.ts';

test('public OAuth clients omit client_secret fields in registration response', () => {
  const response = buildClientRegistrationResponse('https://www.animspec.com', {
    clientId: 'client_123',
    clientSecret: null,
    createdByUserId: null,
    clientName: 'ChatGPT',
    redirectUris: ['https://chatgpt.com/callback'],
    tokenEndpointAuthMethod: 'none',
    grantTypes: ['authorization_code', 'refresh_token'],
    responseTypes: ['code'],
    scope: 'animspec:mcp',
  });

  assert.equal(response.client_id, 'client_123');
  assert.equal('client_secret' in response, false);
  assert.equal('client_secret_expires_at' in response, false);
});

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/oauth/config.ts
```ts
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

```

File: /Users/sanketdongre/Documents/Projects/animspec/mcp-server/index.ts
```ts
#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';
import { z } from 'zod';
import { buildFormatsMarkdown, buildQualitiesMarkdown, ACCEPTED_VIDEO_EXTENSIONS } from '../src/lib/public-api/metadata';

const API_URL = process.env.ANIMSPEC_API_URL || 'https://animspec.ai';
const MAX_VIDEO_SIZE_BYTES = 100 * 1024 * 1024;
const GEMINI_INLINE_SIZE_LIMIT = 20 * 1024 * 1024;
const KIMI_R2_THRESHOLD = 2 * 1024 * 1024;

function getApiKey(): string {
  const apiKey = process.env.ANIMSPEC_API_KEY;
  if (!apiKey) {
    throw new Error(
      'ANIMSPEC_API_KEY is not set. Generate one at /api/v1/api-keys or from the AnimSpec dashboard.'
    );
  }
  return apiKey;
}

function getMimeType(filePath: string): string {
  const extension = path.extname(filePath).toLowerCase();
  const mimeType = ACCEPTED_VIDEO_EXTENSIONS[extension];
  if (!mimeType) {
    throw new Error(
      `Unsupported video type: ${extension}. Accepted: ${Object.keys(ACCEPTED_VIDEO_EXTENSIONS).join(', ')}`
    );
  }
  return mimeType;
}

async function readVideo(filePath: string): Promise<{ buffer: Buffer; fileName: string; mimeType: string }> {
  const resolvedPath = path.resolve(filePath);
  const stats = await fs.stat(resolvedPath);

  if (stats.size > MAX_VIDEO_SIZE_BYTES) {
    throw new Error(`File too large: ${(stats.size / (1024 * 1024)).toFixed(1)}MB. Maximum is 100MB.`);
  }

  return {
    buffer: await fs.readFile(resolvedPath),
    fileName: path.basename(resolvedPath),
    mimeType: getMimeType(resolvedPath),
  };
}

async function uploadToGemini(fileName: string, mimeType: string, buffer: Buffer) {
  const formData = new FormData();
  formData.append('file', new File([new Uint8Array(buffer)], fileName, { type: mimeType }));

  const response = await fetch(`${API_URL}/api/v1/upload`, {
    method: 'POST',
    headers: {
      'x-api-key': getApiKey(),
    },
    body: formData,
    signal: AbortSignal.timeout(300_000),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(String((payload as { error?: string }).error || `Upload failed (${response.status})`));
  }

  return payload as { uri: string; mimeType: string };
}

async function uploadToR2(fileName: string, mimeType: string, buffer: Buffer) {
  const urlResponse = await fetch(`${API_URL}/api/v1/upload-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': getApiKey(),
    },
    body: JSON.stringify({
      fileName,
      contentType: mimeType,
      contentLength: buffer.byteLength,
    }),
    signal: AbortSignal.timeout(60_000),
  });

  const urlPayload = await urlResponse.json().catch(() => ({}));
  if (!urlResponse.ok) {
    throw new Error(String((urlPayload as { error?: string }).error || `Upload URL failed (${urlResponse.status})`));
  }

  const { uploadUrl, objectKey } = urlPayload as { uploadUrl: string; objectKey: string };
  const putResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': mimeType,
      'Content-Length': buffer.byteLength.toString(),
    },
    body: new Uint8Array(buffer),
    signal: AbortSignal.timeout(300_000),
  });

  if (!putResponse.ok) {
    throw new Error(`R2 upload failed (${putResponse.status})`);
  }

  return { objectKey };
}

async function callAnalyzeApi(body: Record<string, unknown>) {
  const response = await fetch(`${API_URL}/api/v1/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': getApiKey(),
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(300_000),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMessage = String((payload as { error?: string }).error || `Analyze failed (${response.status})`);
    throw new Error(errorMessage);
  }

  return payload as {
    overview: string;
    code: string;
    format: string;
    notes?: string | null;
    creditsUsed: number;
    creditsRemaining: number;
    runId?: string | null;
    verificationScore?: number | null;
    pipelineFamily?: string | null;
    pipelineVersion?: string | null;
  };
}

function formatAnalyzeResult(result: Awaited<ReturnType<typeof callAnalyzeApi>>): string {
  const blocks = [
    `## Overview\n${result.overview}`,
    result.code,
  ];

  if (result.notes) {
    blocks.push(`## Notes\n${result.notes}`);
  }

  blocks.push(
    [
      '## Usage',
      `Format: ${result.format}`,
      `Credits used: ${result.creditsUsed}`,
      `Credits remaining: ${result.creditsRemaining}`,
      result.runId ? `Run ID: ${result.runId}` : null,
      result.verificationScore != null ? `Verification score: ${result.verificationScore}` : null,
      result.pipelineFamily ? `Pipeline family: ${result.pipelineFamily}` : null,
      result.pipelineVersion ? `Pipeline version: ${result.pipelineVersion}` : null,
    ].filter(Boolean).join('\n')
  );

  return blocks.join('\n\n');
}

async function analyzeLocalVideo(input: {
  videoPath: string;
  format: string;
  quality: 'balanced' | 'precise' | 'kimi';
  trigger?: string;
  deepAnalysis?: boolean;
}) {
  const { buffer, fileName, mimeType } = await readVideo(input.videoPath);

  if (input.quality === 'kimi' && buffer.byteLength > KIMI_R2_THRESHOLD) {
    const { objectKey } = await uploadToR2(fileName, mimeType, buffer);
    return callAnalyzeApi({
      format: input.format,
      quality: input.quality,
      trigger: input.trigger,
      deepAnalysis: input.deepAnalysis,
      r2ObjectKey: objectKey,
      r2MimeType: mimeType,
      metadata: {
        name: fileName,
        size: buffer.byteLength,
        mimeType,
      },
    });
  }

  if (input.quality !== 'kimi' && buffer.byteLength > GEMINI_INLINE_SIZE_LIMIT) {
    const uploaded = await uploadToGemini(fileName, mimeType, buffer);
    return callAnalyzeApi({
      format: input.format,
      quality: input.quality,
      trigger: input.trigger,
      deepAnalysis: input.deepAnalysis,
      fileUri: uploaded.uri,
      fileMimeType: uploaded.mimeType,
      metadata: {
        name: fileName,
        size: buffer.byteLength,
        mimeType,
      },
    });
  }

  return callAnalyzeApi({
    format: input.format,
    quality: input.quality,
    trigger: input.trigger,
    deepAnalysis: input.deepAnalysis,
    videoBase64: buffer.toString('base64'),
    mimeType,
    metadata: {
      name: fileName,
      size: buffer.byteLength,
      mimeType,
    },
  });
}

const server = new McpServer({
  name: 'animspec-local',
  version: '1.0.0',
});

server.registerTool(
  'analyze_video',
  {
    title: 'Analyze local video',
    description:
      'Read a local video file from disk and analyze it via the AnimSpec API. Requires ANIMSPEC_API_KEY.',
    inputSchema: {
      video_path: z.string().describe('Absolute or relative path to the local video file'),
      format: z.string().default('clone_ui_animation').describe('AnimSpec output format'),
      quality: z.enum(['balanced', 'precise', 'kimi']).default('balanced'),
      trigger: z.enum(['hover', 'click', 'scroll', 'load', 'loop', 'focus']).optional(),
      deep_analysis: z.boolean().optional().describe('Enable the multi-stage deep analysis pipeline'),
    },
  },
  async ({
    video_path,
    format,
    quality,
    trigger,
    deep_analysis,
  }: {
    video_path: string;
    format: string;
    quality: 'balanced' | 'precise' | 'kimi';
    trigger?: 'hover' | 'click' | 'scroll' | 'load' | 'loop' | 'focus';
    deep_analysis?: boolean;
  }) => {
    try {
      getApiKey();
      const result = await analyzeLocalVideo({
        videoPath: video_path,
        format,
        quality,
        trigger,
        deepAnalysis: deep_analysis,
      });

      return {
        content: [
          {
            type: 'text' as const,
            text: formatAnalyzeResult(result),
          },
        ],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Analysis failed';
      return {
        content: [{ type: 'text' as const, text: `Error: ${message}` }],
        isError: true,
      };
    }
  }
);

server.registerTool(
  'list_formats',
  {
    title: 'List formats',
    description: 'List AnimSpec output formats.',
  },
  async () => ({
    content: [{ type: 'text' as const, text: `# AnimSpec Output Formats\n\n${buildFormatsMarkdown()}` }],
  })
);

server.registerTool(
  'list_models',
  {
    title: 'List qualities',
    description: 'List AnimSpec quality levels and credit costs.',
  },
  async () => ({
    content: [{ type: 'text' as const, text: `# AnimSpec Quality Levels\n\n${buildQualitiesMarkdown()}` }],
  })
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error('AnimSpec MCP server error:', error);
  process.exit(1);
});

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/storage/r2.ts
```ts
import { AwsClient } from 'aws4fetch';

// R2 configuration
const R2_ACCOUNT_ID = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'animspec-videos';

// Presigned URL expiration (1 hour)
const URL_EXPIRY_SECONDS = 3600;

let r2Client: AwsClient | null = null;

function getR2Client(): AwsClient {
  if (r2Client) return r2Client;

  if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    throw new Error('Cloudflare R2 credentials not configured');
  }

  r2Client = new AwsClient({
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
    region: 'auto',
    service: 's3',
  });

  return r2Client;
}

function getR2Endpoint(): string {
  if (!R2_ACCOUNT_ID) {
    throw new Error('R2 account ID not configured');
  }
  return `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
}

export function isR2Configured(): boolean {
  return !!(R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY);
}

/**
 * Generate a presigned URL for uploading a video to R2
 */
export async function getUploadPresignedUrl(
  userId: string,
  fileName: string,
  contentType: string,
  contentLength: number
): Promise<{ uploadUrl: string; objectKey: string }> {
  const client = getR2Client();
  const endpoint = getR2Endpoint();

  // Generate unique object key
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const objectKey = `uploads/${userId}/${timestamp}-${sanitizedFileName}`;

  const url = new URL(`${endpoint}/${R2_BUCKET_NAME}/${objectKey}`);
  
  // Add query params for presigned URL
  url.searchParams.set('X-Amz-Expires', URL_EXPIRY_SECONDS.toString());

  // Sign the request
  const signedRequest = await client.sign(
    new Request(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': contentType,
        'Content-Length': contentLength.toString(),
      },
    }),
    {
      aws: { signQuery: true },
    }
  );

  return {
    uploadUrl: signedRequest.url,
    objectKey,
  };
}

/**
 * Generate a presigned URL for downloading/reading a video from R2
 */
export async function getDownloadPresignedUrl(objectKey: string): Promise<string> {
  const client = getR2Client();
  const endpoint = getR2Endpoint();

  const url = new URL(`${endpoint}/${R2_BUCKET_NAME}/${objectKey}`);
  url.searchParams.set('X-Amz-Expires', URL_EXPIRY_SECONDS.toString());

  const signedRequest = await client.sign(
    new Request(url.toString(), {
      method: 'GET',
    }),
    {
      aws: { signQuery: true },
    }
  );

  return signedRequest.url;
}

/**
 * Delete a video from R2
 */
export async function deleteObject(objectKey: string): Promise<void> {
  const client = getR2Client();
  const endpoint = getR2Endpoint();

  const url = `${endpoint}/${R2_BUCKET_NAME}/${objectKey}`;

  const response = await client.fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok && response.status !== 404) {
    throw new Error(`Failed to delete object: ${response.status}`);
  }
}

/**
 * Fetch video from R2 and return as base64
 */
export async function fetchAsBase64(objectKey: string): Promise<{ base64: string; contentType: string }> {
  const downloadUrl = await getDownloadPresignedUrl(objectKey);
  
  const response = await fetch(downloadUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch from R2: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const contentType = response.headers.get('content-type') || 'video/mp4';

  return { base64, contentType };
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/public-api/contracts.ts
```ts
import { z } from 'zod';
import {
  OUTPUT_FORMATS,
  QUALITY_LEVELS,
  TRIGGER_CONTEXTS,
  type OutputFormat,
  type QualityLevel,
  type TriggerContext,
  type VideoMetadata,
} from '@/types/analysis';
import { isOutputFormat, isQualityLevel, isTriggerContext } from './metadata';

export type AnalyzeSource =
  | { kind: 'inline_base64'; videoBase64: string; mimeType: string; fileName?: string }
  | { kind: 'video_uri'; videoUri: string; mimeType?: string; fileName?: string }
  | { kind: 'video_url'; videoUrl: string; mimeType?: string; fileName?: string }
  | { kind: 'gemini_file'; fileUri: string; fileMimeType: string; fileName?: string }
  | { kind: 'r2_object'; r2ObjectKey: string; r2MimeType?: string; fileName?: string };

export interface PublicAnalyzeRequest {
  format: OutputFormat;
  quality: QualityLevel;
  triggerContext: TriggerContext;
  deepAnalysis: boolean;
  source: AnalyzeSource;
  metadata: VideoMetadata | null;
}

const metadataSchema = z.object({
  duration: z.coerce.number().nonnegative().optional(),
  width: z.coerce.number().nonnegative().optional(),
  height: z.coerce.number().nonnegative().optional(),
  size: z.coerce.number().nonnegative().optional(),
  mimeType: z.string().optional(),
  name: z.string().optional(),
}).partial();

function pickString(
  body: Record<string, unknown>,
  key: string
): string | undefined {
  const value = body[key];
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

function normalizeMetadata(
  metadataValue: unknown,
  fallback: { mimeType?: string; name?: string }
): VideoMetadata | null {
  if (metadataValue === undefined) {
    return null;
  }

  const parsed = metadataSchema.safeParse(metadataValue);
  if (!parsed.success) {
    throw new Error('Invalid metadata payload');
  }

  const metadata = parsed.data;
  return {
    duration: metadata.duration ?? 0,
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
    size: metadata.size ?? 0,
    mimeType: metadata.mimeType || fallback.mimeType || '',
    name: metadata.name || fallback.name || '',
  };
}

export function parsePublicAnalyzeRequest(body: unknown): PublicAnalyzeRequest {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new Error('Request body must be a JSON object');
  }

  const record = body as Record<string, unknown>;
  const format = pickString(record, 'format');
  if (!format || !isOutputFormat(format)) {
    throw new Error(`Invalid format. Valid values: ${OUTPUT_FORMATS.join(', ')}`);
  }

  const qualityValue = pickString(record, 'quality') ?? 'balanced';
  if (!isQualityLevel(qualityValue)) {
    throw new Error(`Invalid quality. Valid values: ${QUALITY_LEVELS.join(', ')}`);
  }

  const triggerValue = pickString(record, 'trigger')
    ?? pickString(record, 'triggerContext')
    ?? null;
  if (triggerValue !== null && !isTriggerContext(triggerValue)) {
    throw new Error(`Invalid trigger. Valid values: ${TRIGGER_CONTEXTS.join(', ')}`);
  }

  const deepAnalysis = Boolean(record.deepAnalysis ?? record.agenticMode ?? false);

  const videoBase64 = pickString(record, 'videoBase64');
  const mimeType = pickString(record, 'mimeType');
  const videoUri = pickString(record, 'videoUri');
  const videoUrl = pickString(record, 'videoUrl');
  const fileUri = pickString(record, 'fileUri');
  const fileMimeType = pickString(record, 'fileMimeType');
  const r2ObjectKey = pickString(record, 'r2ObjectKey');
  const r2MimeType = pickString(record, 'r2MimeType');
  const fileName = pickString(record, 'fileName');

  const sources: AnalyzeSource[] = [];

  if (videoBase64) {
    if (!mimeType) {
      throw new Error('videoBase64 and mimeType are required together');
    }
    sources.push({ kind: 'inline_base64', videoBase64, mimeType, fileName });
  }

  if (videoUri) {
    sources.push({ kind: 'video_uri', videoUri, mimeType, fileName });
  }

  if (videoUrl) {
    sources.push({ kind: 'video_url', videoUrl, mimeType, fileName });
  }

  if (fileUri || fileMimeType) {
    if (!fileUri || !fileMimeType) {
      throw new Error('fileUri and fileMimeType are required together');
    }
    sources.push({ kind: 'gemini_file', fileUri, fileMimeType, fileName });
  }

  if (r2ObjectKey) {
    sources.push({ kind: 'r2_object', r2ObjectKey, r2MimeType, fileName });
  }

  if (sources.length === 0) {
    throw new Error('Provide one source: videoBase64, videoUri, videoUrl, fileUri, or r2ObjectKey');
  }

  if (sources.length > 1) {
    throw new Error('Provide exactly one video source per request');
  }

  const source = sources[0];
  const metadata = normalizeMetadata(record.metadata, {
    mimeType: source.kind === 'gemini_file'
      ? source.fileMimeType
      : source.kind === 'inline_base64'
        ? source.mimeType
        : source.kind === 'video_uri'
          ? source.mimeType
          : source.kind === 'r2_object'
            ? source.r2MimeType
            : source.mimeType,
    name: source.fileName,
  });

  return {
    format,
    quality: qualityValue,
    triggerContext: triggerValue,
    deepAnalysis,
    source,
    metadata,
  };
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/app/oauth/authorize/page.tsx
```tsx
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

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/app/oauth/register/[clientId]/route.ts
```ts
import { NextRequest, NextResponse } from 'next/server';
import { getOAuthClient } from '@/lib/oauth/store';

export const runtime = 'nodejs';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await context.params;
  const client = await getOAuthClient(clientId);

  if (!client) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  return NextResponse.json({
    client_id: client.clientId,
    client_name: client.clientName,
    redirect_uris: client.redirectUris,
    grant_types: client.grantTypes,
    response_types: client.responseTypes,
    token_endpoint_auth_method: client.tokenEndpointAuthMethod,
    scope: client.scope,
  }, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/app/oauth/authorize/authorize-client.tsx
```tsx
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
  const { user, isLoading, signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
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
      const response = await fetch('/api/oauth/authorize/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

```

File: /Users/sanketdongre/Documents/Projects/animspec/tests/prepare-video-input.test.ts
```ts
import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { prepareVideoInputForMcp } from '../src/lib/public-api/prepare-video-input.ts';

test('prepareVideoInputForMcp returns reusable file_uri payload for hosted attachments', async () => {
  const prepared = await prepareVideoInputForMcp({
    source: {
      kind: 'video_uri',
      videoUri: 'data:video/mp4;base64,YWJjZA==',
      mimeType: 'video/mp4',
      fileName: 'upload.mp4',
    },
    quality: 'balanced',
    preferGeminiFileUpload: true,
    uploadVideo: async () => ({
      name: 'files/123',
      uri: 'https://generativelanguage.googleapis.com/v1beta/files/123',
      mimeType: 'video/mp4',
      sizeBytes: '4',
      state: 'ACTIVE',
    }),
  });

  assert.equal(prepared.recommendedField, 'file_uri');
  assert.equal(prepared.recommendedMimeField, 'file_mime_type');
});

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/app/api/v1/upload-url/route.ts
```ts
import { type NextRequest, NextResponse } from 'next/server';
import { authenticateApiKeyRequest } from '@/lib/public-api/auth';
import { ACCEPTED_VIDEO_MIME_TYPES, MAX_VIDEO_SIZE_BYTES } from '@/lib/public-api/metadata';
import { getUploadPresignedUrl, isR2Configured } from '@/lib/storage/r2';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const auth = await authenticateApiKeyRequest(request);
  if (!auth) {
    return NextResponse.json(
      { error: 'Missing or invalid API key' },
      { status: 401 }
    );
  }

  if (!isR2Configured()) {
    return NextResponse.json(
      { error: 'Cloud storage not configured' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const fileName = typeof body?.fileName === 'string' ? body.fileName : '';
    const contentType = typeof body?.contentType === 'string' ? body.contentType : '';
    const contentLength = typeof body?.contentLength === 'number'
      ? body.contentLength
      : Number(body?.contentLength ?? 0);

    if (!fileName || !contentType || !Number.isFinite(contentLength) || contentLength <= 0) {
      return NextResponse.json(
        { error: 'Missing required fields: fileName, contentType, contentLength' },
        { status: 400 }
      );
    }

    if (!(ACCEPTED_VIDEO_MIME_TYPES as readonly string[]).includes(contentType)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${ACCEPTED_VIDEO_MIME_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    if (contentLength > MAX_VIDEO_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_VIDEO_SIZE_BYTES / (1024 * 1024)}MB.` },
        { status: 400 }
      );
    }

    const { uploadUrl, objectKey } = await getUploadPresignedUrl(
      auth.userId,
      fileName,
      contentType,
      contentLength
    );

    return NextResponse.json({
      uploadUrl,
      objectKey,
      expiresIn: 3600,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to generate upload URL';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/oauth/store.ts
```ts
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
  createdByUserId: string | null;
  clientName: string | null;
  redirectUris: string[];
  tokenEndpointAuthMethod: 'none' | 'client_secret_post' | 'client_secret_basic';
  grantTypes: string[];
  responseTypes: string[];
  scope: string;
}

export interface OAuthClientRecord {
  clientId: string;
  createdByUserId: string | null;
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
  createdByUserId?: string | null;
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
    createdByUserId: input.createdByUserId ?? null,
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
    createdByUserId: input.createdByUserId ?? null,
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
    createdByUserId: (data.createdByUserId as string | null) ?? null,
    clientName: (data.clientName as string | null) ?? null,
    redirectUris: Array.isArray(data.redirectUris) ? data.redirectUris as string[] : [],
    tokenEndpointAuthMethod: (data.tokenEndpointAuthMethod as OAuthClientRecord['tokenEndpointAuthMethod']) ?? 'none',
    grantTypes: Array.isArray(data.grantTypes) ? data.grantTypes as string[] : ['authorization_code', 'refresh_token'],
    responseTypes: Array.isArray(data.responseTypes) ? data.responseTypes as string[] : ['code'],
    scope: (data.scope as string) || OAUTH_SCOPE,
    secretHash: (data.secretHash as string | null) ?? null,
  };
}

export async function listOAuthClientsForUser(userId: string): Promise<OAuthClientRecord[]> {
  const snapshot = await adminDb
    .collection(COLLECTIONS.OAUTH_CLIENTS)
    .where('createdByUserId', '==', userId)
    .get();

  const clients = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      clientId: doc.id,
      createdByUserId: (data.createdByUserId as string | null) ?? null,
      clientName: (data.clientName as string | null) ?? null,
      redirectUris: Array.isArray(data.redirectUris) ? data.redirectUris as string[] : [],
      tokenEndpointAuthMethod: (data.tokenEndpointAuthMethod as OAuthClientRecord['tokenEndpointAuthMethod']) ?? 'none',
      grantTypes: Array.isArray(data.grantTypes) ? data.grantTypes as string[] : ['authorization_code', 'refresh_token'],
      responseTypes: Array.isArray(data.responseTypes) ? data.responseTypes as string[] : ['code'],
      scope: (data.scope as string) || OAUTH_SCOPE,
      secretHash: (data.secretHash as string | null) ?? null,
    };
  });

  return clients.sort((left, right) => left.clientId.localeCompare(right.clientId)).reverse();
}

export async function deleteOAuthClientForUser(userId: string, clientId: string): Promise<boolean> {
  const ref = adminDb.collection(COLLECTIONS.OAUTH_CLIENTS).doc(clientId);
  const doc = await ref.get();
  if (!doc.exists) {
    return false;
  }

  const data = doc.data();
  if (!data || data.createdByUserId !== userId) {
    return false;
  }

  await ref.delete();
  return true;
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

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/mcp/use-case-inference.ts
```ts
import { FORMAT_METADATA } from '@/lib/public-api/metadata';
import { OUTPUT_FORMATS, type OutputFormat } from '@/types/analysis';

export interface UseCaseInference {
  format: OutputFormat;
  confidence: 'high' | 'medium' | 'low';
  score: number;
  reason: string;
  alternatives: Array<{
    format: OutputFormat;
    score: number;
    reason: string;
  }>;
}

interface FormatHeuristic {
  keywords: string[];
  phrases?: string[];
  negatives?: string[];
  reason: string;
}

const FORMAT_HEURISTICS: Record<OutputFormat, FormatHeuristic> = {
  clone_ui_animation: {
    keywords: ['animation', 'animate', 'motion', 'transition', 'timing', 'easing', 'microinteraction', 'micro-interaction'],
    phrases: ['clone this animation', 'recreate this animation', 'match the motion', 'spec the motion'],
    negatives: ['landing page', 'state machine', 'wcag', 'accessibility', 'tailwind', 'react native', 'figma', 'tokens'],
    reason: 'Best when the user wants to recreate motion behavior, timing, or easing.',
  },
  clone_component: {
    keywords: ['component', 'button', 'card', 'modal', 'dropdown', 'navbar', 'widget', 'menu', 'toast', 'sidebar'],
    phrases: ['build this component', 'clone this component', 'make this component'],
    negatives: ['landing page', 'state machine', 'figma', 'token'],
    reason: 'Best when the request is about rebuilding a specific UI element or component.',
  },
  clone_landing_page: {
    keywords: ['landing', 'homepage', 'hero', 'marketing', 'pricing', 'section'],
    phrases: ['landing page', 'marketing page', 'clone this page', 'recreate this website'],
    negatives: ['component', 'state machine', 'token', 'wcag'],
    reason: 'Best when the user wants to rebuild a page-level marketing or product surface.',
  },
  copy_design_style: {
    keywords: ['style', 'aesthetic', 'visual', 'look', 'feel', 'redesign', 'brand', 'design language'],
    phrases: ['copy this design style', 'apply this style', 'use this aesthetic', 'match this visual language'],
    negatives: ['token', 'state machine', 'wcag', 'tailwind animate'],
    reason: 'Best when the user wants to transfer the overall visual system or design language.',
  },
  extract_design_tokens: {
    keywords: ['tokens', 'palette', 'typography', 'spacing', 'radius', 'shadow', 'theme'],
    phrases: ['extract design tokens', 'extract the theme', 'pull out the palette'],
    negatives: ['animation', 'state machine', 'landing page'],
    reason: 'Best when the user wants reusable visual tokens instead of a rebuild.',
  },
  remotion_demo_template: {
    keywords: ['remotion', 'demo', 'video template', 'product demo'],
    phrases: ['remotion demo', 'product demo template', 'reuse this demo style'],
    negatives: ['wcag', 'state machine', 'token'],
    reason: 'Best when the user wants a reusable product-demo video template.',
  },
  qa_clone_checklist: {
    keywords: ['qa', 'checklist', 'verify', 'acceptance', 'parity', 'review'],
    phrases: ['qa checklist', 'clone checklist', 'verify the clone', 'acceptance criteria'],
    negatives: ['build', 'tailwind', 'reanimated'],
    reason: 'Best when the user wants validation criteria instead of implementation output.',
  },
  accessibility_audit: {
    keywords: ['accessibility', 'a11y', 'wcag', 'reduced motion', 'screen reader', 'contrast'],
    phrases: ['accessibility audit', 'audit accessibility', 'wcag review'],
    negatives: ['state machine', 'lottie', 'tailwind animate'],
    reason: 'Best when the request is explicitly about accessibility or WCAG concerns.',
  },
  ui_ux_audit: {
    keywords: ['ux', 'ui', 'usability', 'friction', 'onboarding', 'clarity', 'audit', 'review', 'critique'],
    phrases: ['ui ux audit', 'ui/ux audit', 'product critique', 'review this flow', 'audit this onboarding'],
    negatives: ['wcag', 'state machine', 'token'],
    reason: 'Best when the user wants a product or usability critique of the observed flow.',
  },
  interaction_state_machine: {
    keywords: ['state machine', 'xstate', 'reducer', 'transition', 'guard', 'state', 'flow logic'],
    phrases: ['interaction state machine', 'extract states and transitions', 'build the state machine'],
    negatives: ['wcag', 'tailwind', 'figma', 'tokens'],
    reason: 'Best when the user wants explicit states, transitions, and behavior logic.',
  },
  performance_budget: {
    keywords: ['performance', 'jank', 'fps', '60fps', 'gpu', 'optimize', 'thrash', 'budget'],
    phrases: ['performance budget', 'performance audit', 'why is this janky'],
    negatives: ['state machine', 'figma', 'token'],
    reason: 'Best when the user is focused on motion performance or optimization.',
  },
  lottie_rive_export: {
    keywords: ['lottie', 'rive', 'export', 'after effects'],
    phrases: ['lottie export', 'rive export', 'turn this into lottie'],
    negatives: ['tailwind', 'state machine', 'wcag'],
    reason: 'Best when the target output is a motion asset format like Lottie or Rive.',
  },
  storyboard_breakdown: {
    keywords: ['storyboard', 'breakdown', 'frame', 'annotate', 'shot'],
    phrases: ['storyboard breakdown', 'frame by frame', 'break this down'],
    negatives: ['tailwind', 'reanimated', 'state machine'],
    reason: 'Best when the user wants a stepwise or frame-by-frame breakdown.',
  },
  tailwind_animate: {
    keywords: ['tailwind', 'keyframes', 'utility', 'utilities', 'css animation'],
    phrases: ['tailwind animate', 'tailwind config', 'tailwind keyframes'],
    negatives: ['react native', 'figma', 'state machine'],
    reason: 'Best when the target implementation is Tailwind animation code.',
  },
  react_native_reanimated: {
    keywords: ['react native', 'reanimated', 'mobile', 'gesture'],
    phrases: ['react native reanimated', 'reanimated 3', 'mobile animation'],
    negatives: ['tailwind', 'figma', 'lottie'],
    reason: 'Best when the user wants a React Native motion implementation.',
  },
  figma_motion_spec: {
    keywords: ['figma', 'prototype', 'variant', 'smart animate'],
    phrases: ['figma motion spec', 'figma prototype', 'smart animate spec'],
    negatives: ['tailwind', 'react native', 'state machine'],
    reason: 'Best when the output should be consumed in Figma or by design teams.',
  },
};

function normalizeIntent(intent: string): string {
  return intent
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreFormat(intent: string, format: OutputFormat): { score: number; matches: string[] } {
  const heuristic = FORMAT_HEURISTICS[format];
  let score = 0;
  const matches: string[] = [];

  for (const phrase of heuristic.phrases ?? []) {
    if (intent.includes(phrase)) {
      score += 6;
      matches.push(`matched phrase "${phrase}"`);
    }
  }

  for (const keyword of heuristic.keywords) {
    if (intent.includes(keyword)) {
      score += keyword.includes(' ') ? 4 : 3;
      matches.push(`matched keyword "${keyword}"`);
    }
  }

  for (const negative of heuristic.negatives ?? []) {
    if (intent.includes(negative)) {
      score -= 2;
    }
  }

  const metadata = FORMAT_METADATA[format];
  if (intent.includes(metadata.label.toLowerCase())) {
    score += 5;
    matches.push(`matched format label "${metadata.label}"`);
  }

  if (intent.includes(metadata.bestFor.toLowerCase())) {
    score += 2;
  }

  return { score, matches };
}

function resolveConfidence(topScore: number, secondScore: number): UseCaseInference['confidence'] {
  if (topScore >= 6 && topScore - secondScore >= 3) return 'high';
  if (topScore >= 3) return 'medium';
  return 'low';
}

export function inferUseCaseFromIntent(intent: string): UseCaseInference {
  const normalizedIntent = normalizeIntent(intent);
  const ranked = OUTPUT_FORMATS.map((format) => {
    const { score, matches } = scoreFormat(normalizedIntent, format);
    return {
      format,
      score,
      reason: matches.length > 0
        ? `${FORMAT_HEURISTICS[format].reason} ${matches.join(', ')}.`
        : FORMAT_HEURISTICS[format].reason,
    };
  }).sort((left, right) => right.score - left.score);

  const [top, second, third] = ranked;
  const chosen = top.score > 0 ? top : {
    ...top,
    format: 'clone_ui_animation' as OutputFormat,
    score: 0,
    reason: 'Defaulted to Clone UI Animation because the goal did not strongly match a more specific format.',
  };

  return {
    format: chosen.format,
    score: chosen.score,
    confidence: resolveConfidence(chosen.score, second?.score ?? 0),
    reason: chosen.reason,
    alternatives: [second, third]
      .filter((item): item is typeof top => Boolean(item))
      .map((item) => ({
        format: item.format,
        score: item.score,
        reason: item.reason,
      })),
  };
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/docs/R2_SETUP.md
```md
# Cloudflare R2 Setup for AnimSpec

AnimSpec uses Cloudflare R2 to handle video uploads larger than Vercel's 4.5MB body limit.

## Setup Steps

### 1. Create R2 Bucket

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to R2 → Create bucket
3. Name it `animspec-videos` (or your preferred name)
4. Select your preferred location

### 2. Configure Object Lifecycle (Auto-Delete)

1. Go to your bucket settings
2. Click "Object lifecycle rules"
3. Add a rule:
   - **Rule name**: `auto-delete-uploads`
   - **Prefix filter**: `uploads/`
   - **Action**: Delete objects
   - **Days after upload**: `3`
4. Save the rule

This ensures all uploaded videos are automatically deleted after 3 days.

### 3. Configure CORS

1. Go to bucket settings → CORS policy
2. Add this configuration:

```json
[
  {
    "AllowedOrigins": [
      "https://animspec.com",
      "https://www.animspec.com",
      "http://localhost:3000"
    ],
    "AllowedMethods": ["GET", "PUT", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

### 4. Create API Token

1. Go to R2 → Manage R2 API Tokens
2. Create a new token with:
   - **Permissions**: Object Read & Write
   - **Bucket scope**: Your bucket only
3. Copy the Access Key ID and Secret Access Key

### 5. Add Environment Variables

Add these to your `.env.local` and Vercel project settings:

```env
CLOUDFLARE_R2_ACCOUNT_ID=your_account_id
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key_id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_access_key
CLOUDFLARE_R2_BUCKET_NAME=animspec-videos
```

Find your Account ID in the Cloudflare dashboard URL or R2 overview page.

## How It Works

1. **Small files (<4MB)**: Sent directly to `/api/analyze` as base64
2. **Medium files (4-20MB)**: 
   - Client requests presigned URL from `/api/upload-url`
   - Client uploads directly to R2 (bypasses Vercel)
   - Server fetches from R2 for analysis
   - Object deleted after analysis (or after 3 days via lifecycle)
3. **Large files (>20MB)**: Use Gemini Files API

## Pricing

R2 pricing is very affordable:
- Storage: $0.015/GB/month
- Class A operations (writes): $4.50/million
- Class B operations (reads): $0.36/million
- Egress: Free!

For AnimSpec's use case (temporary video storage), costs should be minimal.

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/public-api/auth.ts
```ts
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

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/app/api/mcp/route.ts
```ts
import { type AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp';
import { authenticateApiKeyRequest } from '@/lib/public-api/auth';
import { createAnimSpecMcpServer } from '@/lib/mcp/server';
import { authenticateOAuthBearerToken } from '@/lib/oauth/auth';
import { getAppOrigin, getProtectedResourceMetadataUrl } from '@/lib/oauth/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

async function buildAuthInfo(request: Request): Promise<AuthInfo | undefined> {
  const auth = await authenticateApiKeyRequest(request);
  if (auth) {
    return {
      token: auth.rawKey,
      clientId: 'animspec-api-key',
      scopes: ['animspec:mcp'],
      extra: {
        userId: auth.userId,
        keyId: auth.keyId,
        authType: 'api-key',
      },
    };
  }

  const authorization = request.headers.get('authorization');
  const bearer = authorization?.startsWith('Bearer ')
    ? authorization.slice(7).trim()
    : null;

  if (!bearer) {
    return undefined;
  }

  const oauth = await authenticateOAuthBearerToken(bearer);
  if (!oauth) {
    return undefined;
  }

  return {
    token: bearer,
    clientId: oauth.clientId,
    scopes: oauth.scope.split(/\s+/).filter(Boolean),
    resource: oauth.resource ? new URL(oauth.resource) : undefined,
    extra: {
      userId: oauth.userId,
      authType: 'oauth',
    },
  };
}

function buildUnauthorizedResponse(request: Request) {
  const origin = getAppOrigin(new URL(request.url).origin);
  const resourceMetadata = getProtectedResourceMetadataUrl(origin);

  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Bearer realm="AnimSpec", resource_metadata="${resourceMetadata}"`,
      'Cache-Control': 'no-store',
    },
  });
}

async function handleMcpRequest(request: Request): Promise<Response> {
  const authInfo = await buildAuthInfo(request);
  const sharedModeEnabled = Boolean(process.env.CHATGPT_APP_SHARED_USER_ID);

  if (!authInfo && !sharedModeEnabled) {
    return buildUnauthorizedResponse(request);
  }

  const server = createAnimSpecMcpServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  await server.connect(transport);
  return transport.handleRequest(request, { authInfo });
}

export async function GET(request: Request) {
  return handleMcpRequest(request);
}

export async function POST(request: Request) {
  return handleMcpRequest(request);
}

export async function DELETE(request: Request) {
  return handleMcpRequest(request);
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/public-api/prepare-video-input.ts
```ts
import type { AnalyzeSource } from './contracts';
import { prepareAnalysisSource } from './video-source';

type UploadVideoOverride = Parameters<typeof prepareAnalysisSource>[3] extends infer T
  ? T extends { uploadVideo?: infer U }
    ? U
    : never
  : never;

export interface PreparedVideoInputResult {
  fileUri?: string;
  fileMimeType?: string;
  videoBase64?: string;
  mimeType?: string;
  fileName: string;
  fileSize: number;
  recommendedField: 'file_uri' | 'video_base64';
  recommendedMimeField: 'file_mime_type' | 'mime_type';
  notes: string[];
}

export async function prepareVideoInputForMcp(input: {
  source: AnalyzeSource;
  quality?: 'balanced' | 'precise' | 'kimi';
  preferGeminiFileUpload?: boolean;
  uploadVideo?: UploadVideoOverride;
}): Promise<PreparedVideoInputResult> {
  const quality = input.quality ?? 'balanced';
  const geminiApiKey = process.env.GEMINI_API_KEY || undefined;

  const prepared = await prepareAnalysisSource(
    input.source,
    quality,
    geminiApiKey,
    {
      preferGeminiFileUpload: input.preferGeminiFileUpload ?? quality !== 'kimi',
      uploadVideo: input.uploadVideo,
    }
  );

  if (prepared.fileUri && prepared.fileMimeType) {
    return {
      fileUri: prepared.fileUri,
      fileMimeType: prepared.fileMimeType,
      fileName: prepared.videoName,
      fileSize: prepared.fileSize,
      recommendedField: 'file_uri',
      recommendedMimeField: 'file_mime_type',
      notes: [
        'Use the returned file_uri and file_mime_type in analyze_video.',
        'This is the preferred handoff for Gemini-backed analysis and hosted attachment flows.',
      ],
    };
  }

  if (prepared.inlineVideoBase64 && prepared.inlineMimeType) {
    return {
      videoBase64: prepared.inlineVideoBase64,
      mimeType: prepared.inlineMimeType,
      fileName: prepared.videoName,
      fileSize: prepared.fileSize,
      recommendedField: 'video_base64',
      recommendedMimeField: 'mime_type',
      notes: [
        'Use the returned video_base64 and mime_type in analyze_video.',
        'This fallback is smaller and may be less reliable for large hosted uploads.',
      ],
    };
  }

  throw new Error('Failed to prepare a reusable video input.');
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/tests/public-api-video-source.test.ts
```ts
import test from 'node:test';
import assert from 'node:assert/strict';

// @ts-expect-error TS5097 -- Node test runner loads this via tsx
import { prepareAnalysisSource } from '../src/lib/public-api/video-source.ts';

test('prepareAnalysisSource prefers Gemini Files for hosted attachment URIs when requested', async () => {
  const prepared = await prepareAnalysisSource(
    {
      kind: 'video_uri',
      videoUri: 'data:video/mp4;base64,YWJjZA==',
      mimeType: 'video/mp4',
      fileName: 'upload.mp4',
    },
    'balanced',
    'gemini-key',
    {
      preferGeminiFileUpload: true,
      uploadVideo: async () => ({
        name: 'files/123',
        uri: 'https://generativelanguage.googleapis.com/v1beta/files/123',
        mimeType: 'video/mp4',
        sizeBytes: '4',
        state: 'ACTIVE',
      }),
    }
  );

  assert.equal(prepared.fileUri, 'https://generativelanguage.googleapis.com/v1beta/files/123');
  assert.equal(prepared.fileMimeType, 'video/mp4');
  assert.equal(prepared.inlineVideoBase64, undefined);
});

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/components/settings/oauth-client-manager.tsx
```tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { CheckIcon, CopyIcon, RocketIcon, XIcon } from '@/components/ui/icons';

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
  const [deletingClientId, setDeletingClientId] = useState<string | null>(null);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const claudeCallback = 'https://claude.ai/api/mcp/auth_callback';
  const claudeCompatCallback = 'https://claude.com/api/mcp/auth_callback';
  const chatgptCallback = 'https://chatgpt.com/connector/oauth/callback';

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
          redirectUris: redirectUri
            .split('\n')
            .map((value) => value.trim())
            .filter(Boolean),
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

  async function deleteClient(clientId: string) {
    if (deletingClientId) return;

    setDeletingClientId(clientId);
    setError(null);

    try {
      const token = await refreshToken();
      const response = await fetch('/api/oauth/clients', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: 'include',
        body: JSON.stringify({ clientId }),
      });

      const data = await response.json().catch(() => ({ error: 'Failed to delete OAuth client' }));
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete OAuth client');
      }

      setClients((current) => current.filter((item) => item.clientId !== clientId));
      if (createdClient?.clientId === clientId) {
        setCreatedClient(null);
      }
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete OAuth client');
    } finally {
      setDeletingClientId(null);
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
          <div className="connection-guide-list" style={{ marginTop: '16px' }}>
            <div>
              <RocketIcon className="w-4 h-4" />
              Claude preset callback: <code>{claudeCallback}</code>
            </div>
            <div>
              <RocketIcon className="w-4 h-4" />
              Claude compatibility callback: <code>{claudeCompatCallback}</code>
            </div>
            <div>
              <RocketIcon className="w-4 h-4" />
              ChatGPT callback changes per app. Prefer the exact value shown in ChatGPT.
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
            <textarea
              className="settings-input"
              value={redirectUri}
              onChange={(event) => setRedirectUri(event.target.value)}
              placeholder={'Callback URL(s), one per line'}
              rows={3}
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
          <div className="connection-guide-actions" style={{ justifyContent: 'flex-start', gap: '12px', marginTop: '12px' }}>
            <button className="btn-secondary btn-sm" type="button" onClick={() => { setClientName('Claude Connector'); setRedirectUri(`${claudeCallback}\n${claudeCompatCallback}`); setAuthMethod('client_secret_post'); }}>
              Use Claude preset
            </button>
            <button className="btn-secondary btn-sm" type="button" onClick={() => { setClientName('ChatGPT App'); setRedirectUri(chatgptCallback); setAuthMethod('none'); }}>
              Use ChatGPT preset
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
                    <button
                      className="btn-danger btn-danger-subtle"
                      onClick={() => deleteClient(client.clientId)}
                      disabled={deletingClientId === client.clientId}
                    >
                      <XIcon />
                      <span>{deletingClientId === client.clientId ? 'Deleting…' : 'Delete'}</span>
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

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/types/database.ts
```ts
import type { OutputFormat, QualityLevel, TriggerContext } from './analysis';

// Re-export types from analysis for convenience
export type { OutputFormat, QualityLevel, TriggerContext };

// Credit costs per quality level
export const CREDIT_COSTS: Record<QualityLevel, number> = {
  balanced: 3,
  precise: 20,
  kimi: 5,
};

// Agentic mode credit costs (4-pass pipeline)
export const AGENTIC_CREDIT_COSTS: Record<QualityLevel, number> = {
  balanced: 5,
  precise: 30,
  kimi: 5,
};

// Pack types
export type PackType = 'creator' | 'pro';

export const PACK_CREDITS: Record<PackType, number> = {
  creator: 200,
  pro: 600,
};

export const PACK_PRICES: Record<PackType, number> = {
  creator: 2400, // $24.00 in cents
  pro: 5900, // $59.00 in cents
};

// Firestore document types

export interface UserProfile {
  id: string; // Same as Firebase Auth UID
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  creditsBalance: number;
  creditsExpiresAt: Date | null;
  hasUsedFreeTrial: boolean;
  isPaidUser: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Analysis {
  id: string;
  userId: string;
  format: OutputFormat;
  quality: QualityLevel;
  triggerContext: TriggerContext;
  overview: string;
  code: string;
  frameImageUrl: string | null;
  videoName: string;
  videoDuration: number;
  creditsUsed: number;
  runId?: string | null;
  verificationScore?: number | null;
  pipelineFamily?: 'reconstruct' | 'audit' | 'behavior' | null;
  pipelineVersion?: string | null;
  source?: 'web' | 'api' | 'mcp' | null;
  createdAt: Date;
}

export type CreditTransactionType = 'signup_bonus' | 'analysis' | 'purchase' | 'refund' | 'admin_adjustment';

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number; // Positive for additions, negative for deductions
  type: CreditTransactionType;
  quality: QualityLevel | null;
  description: string;
  analysisId: string | null;
  purchaseId: string | null;
  createdAt: Date;
}

export type PurchaseStatus = 'pending' | 'completed' | 'refunded' | 'failed';

export interface Purchase {
  id: string;
  userId: string;
  packType: PackType;
  credits: number;
  amountCents: number;
  currency: string;
  lemonSqueezyOrderId: string;
  status: PurchaseStatus;
  createdAt: Date;
}

export interface ApiKeyRecord {
  id: string;
  userId: string;
  keyHash: string;
  prefix: string;
  name: string;
  isActive: boolean;
  lastUsedAt: Date | null;
  createdAt: Date;
}

export interface OAuthClientRecord {
  id: string;
  createdByUserId: string | null;
  clientName: string | null;
  redirectUris: string[];
  tokenEndpointAuthMethod: 'none' | 'client_secret_post' | 'client_secret_basic';
  grantTypes: string[];
  responseTypes: string[];
  scope: string;
  secretHash: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface OAuthAuthorizationCodeRecord {
  id: string;
  clientId: string;
  userId: string;
  redirectUri: string;
  scope: string;
  resource: string | null;
  codeChallenge: string;
  codeChallengeMethod: 'S256';
  expiresAt: Date;
  createdAt: Date;
}

export interface OAuthAccessTokenRecord {
  id: string;
  clientId: string;
  userId: string;
  scope: string;
  resource: string | null;
  expiresAt: Date;
  refreshTokenId: string | null;
  createdAt: Date;
  lastUsedAt: Date | null;
  revokedAt: Date | null;
}

export interface OAuthRefreshTokenRecord {
  id: string;
  clientId: string;
  userId: string;
  scope: string;
  resource: string | null;
  expiresAt: Date;
  createdAt: Date;
  revokedAt: Date | null;
}

// Firestore collection names
export interface AnalysisRun {
  id: string;
  userId: string | null;
  format: OutputFormat;
  quality: QualityLevel;
  triggerContext: TriggerContext;
  family: 'reconstruct' | 'audit' | 'behavior';
  complexity: 'simple' | 'moderate' | 'complex';
  pipelineVersion: string;
  generatorModel: string;
  verifierModel?: string | null;
  status: 'running' | 'complete' | 'failed';
  iterationCount: number;
  finalTitle?: string | null;
  finalOverview?: string | null;
  finalFormat?: OutputFormat | null;
  verificationScore?: number | null;
  verificationSummary?: string | null;
  errorMessage?: string | null;
  stageCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalysisRunArtifact {
  id: string;
  type: string;
  summary: string;
  schemaVersion: number;
  storagePath: string | null;
  payload: unknown;
  updatedAt: Date;
}

export const COLLECTIONS = {
  PROFILES: 'profiles',
  ANALYSES: 'analyses',
  ANALYSIS_RUNS: 'analysis_runs',
  API_KEYS: 'api_keys',
  OAUTH_CLIENTS: 'oauth_clients',
  OAUTH_AUTHORIZATION_CODES: 'oauth_authorization_codes',
  OAUTH_ACCESS_TOKENS: 'oauth_access_tokens',
  OAUTH_REFRESH_TOKENS: 'oauth_refresh_tokens',
  CREDIT_TRANSACTIONS: 'credit_transactions',
  PURCHASES: 'purchases',
} as const;

// Default values
export const DEFAULT_FREE_CREDITS = 20;
export const MAX_ANALYSES_PER_USER = 50;

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/app/oauth/token/route.ts
```ts
import { NextRequest, NextResponse } from 'next/server';
import { authenticateOAuthClient } from '@/lib/oauth/auth';
import { consumeAuthorizationCode, getOAuthClient, issueOAuthTokens, refreshOAuthTokens } from '@/lib/oauth/store';

export const runtime = 'nodejs';

function tokenError(error: string, errorDescription: string, status = 400) {
  return NextResponse.json(
    {
      error,
      error_description: errorDescription,
    },
    {
      status,
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}

export async function POST(request: NextRequest) {
  const params = new URLSearchParams(await request.text());
  const grantType = params.get('grant_type');

  const clientAuth = await authenticateOAuthClient(request, params);
  if (!clientAuth) {
    return tokenError('invalid_client', 'Client authentication failed.', 401);
  }

  const client = await getOAuthClient(clientAuth.clientId);
  if (!client) {
    return tokenError('invalid_client', 'Unknown client.', 401);
  }

  if (grantType === 'authorization_code') {
    const code = params.get('code');
    const redirectUri = params.get('redirect_uri');
    const codeVerifier = params.get('code_verifier');

    if (!code || !redirectUri || !codeVerifier) {
      return tokenError('invalid_request', 'code, redirect_uri, and code_verifier are required.');
    }

    const consumed = await consumeAuthorizationCode({
      code,
      clientId: client.clientId,
      redirectUri,
      codeVerifier,
    });

    if (!consumed) {
      return tokenError('invalid_grant', 'Authorization code is invalid, expired, or already used.');
    }

    const tokens = await issueOAuthTokens({
      clientId: client.clientId,
      userId: consumed.userId,
      scope: consumed.scope,
      resource: consumed.resource,
    });

    return NextResponse.json({
      access_token: tokens.accessToken,
      token_type: 'Bearer',
      expires_in: tokens.expiresIn,
      refresh_token: tokens.refreshToken,
      scope: consumed.scope,
    }, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  }

  if (grantType === 'refresh_token') {
    const refreshToken = params.get('refresh_token');
    if (!refreshToken) {
      return tokenError('invalid_request', 'refresh_token is required.');
    }

    const refreshed = await refreshOAuthTokens({
      refreshToken,
      clientId: client.clientId,
    });

    if (!refreshed) {
      return tokenError('invalid_grant', 'Refresh token is invalid or expired.');
    }

    return NextResponse.json({
      access_token: refreshed.accessToken,
      token_type: 'Bearer',
      expires_in: refreshed.expiresIn,
      refresh_token: refreshed.refreshToken,
      scope: refreshed.scope,
    }, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  }

  return tokenError('unsupported_grant_type', 'Only authorization_code and refresh_token are supported.');
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/app/.well-known/oauth-authorization-server/route.ts
```ts
import { NextRequest, NextResponse } from 'next/server';
import { getAppOrigin, getAuthorizationServerMetadata } from '@/lib/oauth/config';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const origin = getAppOrigin(request.nextUrl.origin);
  return NextResponse.json(getAuthorizationServerMetadata(origin), {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/app/api/oauth/clients/route.ts
```ts
import { NextRequest, NextResponse } from 'next/server';
import { authenticateFirebaseUser } from '@/lib/public-api/auth';
import { deleteOAuthClientForUser, listOAuthClientsForUser, registerOAuthClient } from '@/lib/oauth/store';
import { OAUTH_SCOPE } from '@/lib/oauth/config';

export const runtime = 'nodejs';

function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Authentication required.' },
    { status: 401 }
  );
}

function parseRedirectUris(value: unknown): string[] {
  if (typeof value === 'string' && /^https?:\/\//.test(value)) {
    return [value];
  }
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string' && /^https?:\/\//.test(item));
  }
  return [];
}

function dedupeRedirectUris(values: string[]): string[] {
  return [...new Set(values)];
}

export async function GET(request: NextRequest) {
  const userId = await authenticateFirebaseUser(request);
  if (!userId) {
    return unauthorizedResponse();
  }

  try {
    const clients = await listOAuthClientsForUser(userId);
    return NextResponse.json({
      clients: clients.map((client) => ({
        clientId: client.clientId,
        clientName: client.clientName,
        redirectUris: client.redirectUris,
        tokenEndpointAuthMethod: client.tokenEndpointAuthMethod,
        scope: client.scope,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to load OAuth clients' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const userId = await authenticateFirebaseUser(request);
  if (!userId) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json().catch(() => ({}));
    const redirectUris = dedupeRedirectUris(
      parseRedirectUris((body as Record<string, unknown>).redirectUri ?? (body as Record<string, unknown>).redirectUris)
    );
    const clientName = typeof (body as Record<string, unknown>).clientName === 'string'
      ? (body as Record<string, unknown>).clientName as string
      : 'AnimSpec Connector';
    const tokenEndpointAuthMethod =
      (body as Record<string, unknown>).tokenEndpointAuthMethod === 'client_secret_basic'
      || (body as Record<string, unknown>).tokenEndpointAuthMethod === 'none'
        ? (body as Record<string, unknown>).tokenEndpointAuthMethod as 'client_secret_basic' | 'none'
        : 'client_secret_post';

    if (redirectUris.length === 0) {
      return NextResponse.json(
        { error: 'A valid callback URL is required.' },
        { status: 400 }
      );
    }

    const client = await registerOAuthClient({
      createdByUserId: userId,
      clientName,
      redirectUris,
      tokenEndpointAuthMethod,
      grantTypes: ['authorization_code', 'refresh_token'],
      responseTypes: ['code'],
      scope: OAUTH_SCOPE,
    });

    return NextResponse.json({
      clientId: client.clientId,
      clientSecret: client.clientSecret,
      clientName: client.clientName,
      redirectUris: client.redirectUris,
      tokenEndpointAuthMethod: client.tokenEndpointAuthMethod,
      scope: client.scope,
      message: 'Store the client secret now. It is only shown once.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create OAuth client' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const userId = await authenticateFirebaseUser(request);
  if (!userId) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json().catch(() => ({}));
    const clientId = typeof (body as Record<string, unknown>).clientId === 'string'
      ? (body as Record<string, unknown>).clientId as string
      : '';

    if (!clientId) {
      return NextResponse.json(
        { error: 'clientId is required.' },
        { status: 400 }
      );
    }

    const deleted = await deleteOAuthClientForUser(userId, clientId);
    if (!deleted) {
      return NextResponse.json(
        { error: 'OAuth client not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'OAuth client deleted.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete OAuth client' },
      { status: 500 }
    );
  }
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/types/analysis.ts
```ts
export const OUTPUT_FORMATS = [
  'clone_ui_animation',
  'clone_component',
  'clone_landing_page',
  'copy_design_style',
  'extract_design_tokens',
  'remotion_demo_template',
  'qa_clone_checklist',
  'accessibility_audit',
  'ui_ux_audit',
  'interaction_state_machine',
  'performance_budget',
  'lottie_rive_export',
  'storyboard_breakdown',
  'tailwind_animate',
  'react_native_reanimated',
  'figma_motion_spec',
] as const;

export type OutputFormat = (typeof OUTPUT_FORMATS)[number];

export const QUALITY_LEVELS = ['balanced', 'precise', 'kimi'] as const;
export type QualityLevel = (typeof QUALITY_LEVELS)[number];

export const TRIGGER_CONTEXTS = ['hover', 'click', 'scroll', 'load', 'loop', 'focus'] as const;
export type TriggerContext = (typeof TRIGGER_CONTEXTS)[number] | null;

export interface VideoMetadata {
  duration: number;
  width: number;
  height: number;
  size: number;
  mimeType: string;
  name: string;
}

export interface AnalysisConfig {
  format: OutputFormat;
  quality: QualityLevel;
  triggerContext: TriggerContext;
  agenticMode?: boolean;
}

export interface AnalysisProgress {
  step: 'uploading' | 'extracting' | 'analyzing' | 'generating' | 'complete' | 'error'
    | 'pass_1_decomposing' | 'pass_2_analyzing' | 'pass_3_generating' | 'pass_4_verifying';
  message: string;
  progress?: number;
  currentPass?: number;
  totalPasses?: number;
  passName?: string;
}

export interface AnalysisResult {
  overview: string;
  code: string;
  format: OutputFormat;
  notes?: string;
  elements?: AnimationElement[];
  timing?: TimingInfo;
  rawAnalysis?: string;
  frameImage?: string; // Base64 encoded frame from the video
  verificationScore?: number;
  verificationReport?: VerificationReport;
  thinkingLog?: string;
}

export interface VerificationReport {
  overallScore: number;
  discrepancies: Discrepancy[];
  corrections: string[];
  summary?: string;
}

export interface Discrepancy {
  element: string;
  issue: string;
  severity: 'minor' | 'major' | 'critical';
  suggestedFix: string;
}

export interface AnimationElement {
  name: string;
  initialState: Record<string, string | number>;
  finalState: Record<string, string | number>;
  motion: string;
}

export interface TimingInfo {
  totalDuration: string;
  easing: string;
  delay?: string;
  stagger?: string;
}

export interface StreamingChunk {
  type: 'progress' | 'result' | 'error';
  data?: string;
  step?: string;
  message?: string;
}

// Map of analysis results keyed by output format
export type ResultsMap = Partial<Record<OutputFormat, AnalysisResult>>;

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/public-api/metadata.ts
```ts
import {
  OUTPUT_FORMATS,
  QUALITY_LEVELS,
  TRIGGER_CONTEXTS,
  type OutputFormat,
  type QualityLevel,
} from '@/types/analysis';
import { AGENTIC_CREDIT_COSTS, CREDIT_COSTS } from '@/types/database';

export const MAX_VIDEO_SIZE_BYTES = 100 * 1024 * 1024;
export const GEMINI_INLINE_SIZE_LIMIT = 20 * 1024 * 1024;

export const ACCEPTED_VIDEO_MIME_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-msvideo',
  'video/x-matroska',
] as const;

export const ACCEPTED_VIDEO_EXTENSIONS: Record<string, string> = {
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.avi': 'video/x-msvideo',
  '.mkv': 'video/x-matroska',
};

export interface FormatMetadata {
  label: string;
  description: string;
  bestFor: string;
}

export const FORMAT_METADATA: Record<OutputFormat, FormatMetadata> = {
  clone_ui_animation: {
    label: 'Clone UI Animation',
    description: 'Recreate motion, timing, easing, and sequencing with implementation-ready guidance.',
    bestFor: 'Micro-interactions, transitions, loaders, polished UI motion',
  },
  clone_component: {
    label: 'Clone UI Component',
    description: 'Generate a structured component build spec for the UI shown in the clip.',
    bestFor: 'Buttons, cards, menus, modals, widgets, nav patterns',
  },
  clone_landing_page: {
    label: 'Clone Landing Page',
    description: 'Reconstruct the layout, sections, and motion language of a landing page.',
    bestFor: 'Marketing pages, heroes, pricing sections, feature grids',
  },
  copy_design_style: {
    label: 'Copy Design Style',
    description: 'Extract the visual system so agents can apply that style to another product.',
    bestFor: 'Redesign work, visual refreshes, style transfer',
  },
  extract_design_tokens: {
    label: 'Extract Design Tokens',
    description: 'Pull out palette, spacing, typography, elevation, and shape rules.',
    bestFor: 'Design systems, theming, token setup',
  },
  remotion_demo_template: {
    label: 'Remotion Demo Template',
    description: 'Generate reusable guidance for creating product demo videos in the same style.',
    bestFor: 'Product demo videos, animated explainers',
  },
  qa_clone_checklist: {
    label: 'QA Clone Checklist',
    description: 'Generate acceptance criteria to verify that a recreation matches the source clip.',
    bestFor: 'QA handoff, parity reviews, finish checks',
  },
  accessibility_audit: {
    label: 'Accessibility Audit',
    description: 'Review motion, readability, interaction feedback, and WCAG-relevant behavior.',
    bestFor: 'Inclusive design and accessibility reviews',
  },
  ui_ux_audit: {
    label: 'UI/UX Audit',
    description: 'Review clarity, hierarchy, friction points, and overall product experience.',
    bestFor: 'UX critique, onboarding review, interface feedback',
  },
  interaction_state_machine: {
    label: 'Interaction State Machine',
    description: 'Infer states, transitions, guards, and actions from the observed behavior.',
    bestFor: 'Complex components, reducers, XState-style modeling',
  },
  performance_budget: {
    label: 'Performance Budget',
    description: 'Highlight likely performance risks and practical motion-performance constraints.',
    bestFor: 'Animation performance tuning and implementation planning',
  },
  lottie_rive_export: {
    label: 'Lottie / Rive Export',
    description: 'Translate observed motion into animation-export-oriented instructions.',
    bestFor: 'Motion graphics pipelines and interactive animation systems',
  },
  storyboard_breakdown: {
    label: 'Storyboard Breakdown',
    description: 'Break the clip into key moments, timing, and state changes.',
    bestFor: 'Documentation, handoff, frame-by-frame reviews',
  },
  tailwind_animate: {
    label: 'Tailwind Animate',
    description: 'Create Tailwind-friendly keyframes, utilities, and animation guidance.',
    bestFor: 'Tailwind CSS projects and UI motion implementation',
  },
  react_native_reanimated: {
    label: 'React Native Reanimated',
    description: 'Generate React Native motion guidance using Reanimated patterns.',
    bestFor: 'Mobile interfaces and native-feeling interaction work',
  },
  figma_motion_spec: {
    label: 'Figma Motion Spec',
    description: 'Translate motion into Figma-oriented states, variants, and prototype behavior.',
    bestFor: 'Design handoff and prototype specs',
  },
};

export function isOutputFormat(value: string): value is OutputFormat {
  return (OUTPUT_FORMATS as readonly string[]).includes(value);
}

export function isQualityLevel(value: string): value is QualityLevel {
  return (QUALITY_LEVELS as readonly string[]).includes(value);
}

export function isTriggerContext(value: string): value is (typeof TRIGGER_CONTEXTS)[number] {
  return (TRIGGER_CONTEXTS as readonly string[]).includes(value);
}

export function buildFormatsMarkdown(): string {
  return OUTPUT_FORMATS.map((format) => {
    const meta = FORMAT_METADATA[format];
    return `**${format}** - ${meta.label}\n${meta.description}\nBest for: ${meta.bestFor}`;
  }).join('\n\n');
}

export function buildQualitiesMarkdown(): string {
  return QUALITY_LEVELS.map((quality) => {
    const regularCost = CREDIT_COSTS[quality];
    const deepCost = AGENTIC_CREDIT_COSTS[quality];
    return [
      `**${quality}**`,
      `Regular analysis: ${regularCost} credits`,
      `Deep analysis: ${deepCost} credits`,
    ].join('\n');
  }).join('\n\n');
}

```

File: /Users/sanketdongre/Documents/Projects/animspec/src/lib/oauth/crypto.ts
```ts
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

export function sha256Hex(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

export function sha256Base64Url(value: string): string {
  return createHash('sha256').update(value).digest('base64url');
}

export function generateOpaqueSecret(prefix: string): string {
  return `${prefix}${randomBytes(32).toString('base64url')}`;
}

export function constantTimeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }
  return timingSafeEqual(leftBuffer, rightBuffer);
}

```
</file_contents>
<meta prompt 1 = "[Architect]">
You are producing an implementation-ready technical plan. The implementer will work from your plan without asking clarifying questions, so every design decision must be resolved, every touched component must be identified, and every behavioral change must be specified precisely.

Your job:
1. Analyze the requested change against the provided code — identify the relevant architecture, constraints, data flow, and extension points.
2. Decide whether this is best solved by a targeted change or a broader refactor, and justify that decision.
3. Produce a plan detailed enough that an engineer can implement it file-by-file without making design decisions of their own.

Hard constraints:
- Do not write production code, patches, diffs, or copy-paste-ready implementations.
- Stay in analysis and architecture mode only.
- Use illustrative snippets, interface shapes, sample signatures, state/data shapes, or pseudocode when they communicate the design more precisely than prose. Keep them partial — enough to remove ambiguity, not enough to copy-paste.
- Scale your response to the complexity of the request. Small, localized changes need short plans; only expand sections for changes that genuinely require the detail.

─── ANALYSIS ───

Current-state analysis (always include):
- Map the existing responsibilities, type relationships, ownership, data flow, and mutation points relevant to the request.
- Identify existing code that should be reused or extended — never duplicate what already exists without justification.
- Note hard constraints: API contracts, protocol conformances, state ownership rules, thread/actor isolation, persistence schemas, UI update mechanisms.
- When multiple subsystems interact, trace the call chain end-to-end and identify each transformation boundary.

─── DESIGN ───

Design standards — address only the standards relevant to the change; skip sections that don't apply:

1. New and modified components/types: For each, specify:
   - The name, kind (for example: class, interface, enum, record, service, module, controller), and why that kind fits the codebase and language.
   - The fields/properties/state it owns, including data shape, mutability, and ownership/lifecycle semantics.
   - Key callable interfaces or signatures, including inputs, outputs, and whether execution is synchronous/asynchronous or can fail.
   - Contracts it implements, extends, composes with, or depends on.
   - For closed sets of variants (for example enums, tagged unions, discriminated unions): all cases/variants and any attached data.
   - Where the component lives (file path) and who creates/owns its instances.

2. State and data flow: For each state change the plan introduces or modifies:
   - What triggers the change (user action, callback, notification, timer, stream event).
   - The exact path the data travels: source → transformations → destination.
   - Thread/actor/queue context at each step.
   - How downstream consumers observe the change (published property, delegate, notification, binding, callback).
   - What happens if the change arrives out of order, is duplicated, or is dropped.

3. API and interface changes: For each modified public/internal interface:
   - The before and after signatures (or new signature if additive).
   - Every call site that must be updated, grouped by file.
   - Backward-compatibility strategy if the interface is used by external consumers or persisted data.

4. Persistence and serialization: When the plan touches stored data:
   - Schema changes with exact field names, types, and defaults.
   - Migration strategy: how existing data is read, transformed, and re-persisted.
   - What happens when new code reads old data and when old code reads new data (if rollback is possible).

5. Concurrency and lifecycle:
   - Specify the execution model and safety boundaries for each new/modified component: thread affinity, event-loop/runtime constraints, isolation boundaries, queue/worker discipline, or thread-safety expectations as applicable.
   - Identify potential races, leaked references/resources, or lifecycle mismatches introduced by the change.
   - When operations are asynchronous, specify cancellation/abort behavior and what state remains after interruption.

6. Error handling and edge cases:
   - For each operation that can fail, specify what failures are possible and how they propagate.
   - Describe degraded-mode behavior: what the user sees, what state is preserved, what recovery is available.
   - Identify boundary conditions: empty collections, missing/null/optional values, first-run states, interrupted operations.

7. Algorithmic and logic-heavy work (include whenever the change involves non-trivial control flow, state machines, data transformations, or performance-sensitive paths):
   - Describe the algorithm step-by-step: inputs, outputs, invariants, and data structures.
   - Cover edge cases, failure modes, and performance characteristics (time/space complexity if relevant).
   - Explain why this approach over the most plausible alternatives.

8. Avoid unnecessary complexity:
   - Do not add layers, abstractions, or indirection without a concrete benefit identified in the plan.
   - Do not create parallel code paths — unify where possible.
   - Reuse existing patterns unless those patterns are themselves the problem.

─── OUTPUT ───

Structure your response as:

1. **Summary** — One paragraph: what changes, why, and the high-level approach.

2. **Current-state analysis** — How the relevant code works today. Trace the data/control flow end-to-end. Identify what is reusable and what is blocking.

3. **Design** — The core of the plan. Apply every applicable standard from above. Organize by logical component or subsystem, not by standard number. Each component section should cover types, state flow, interfaces, persistence, concurrency, and error handling as relevant to that component.

4. **File-by-file impact** — For every file that changes, list:
   - What changes (added/modified/removed types, methods, properties).
   - Why (which design decision drives this change).
   - Dependencies on other changes in this plan (ordering constraints).

5. **Risks and migration** — Include only when the change introduces breaking changes, data migration, or rollback concerns. Omit for additive or non-breaking work.

6. **Implementation order** — A numbered sequence of steps. Each step should be independently compilable and testable where possible. Call out steps that must be atomic (landed together).

Response discipline:
- Be specific to the provided code — reference actual type names, file paths, method names, and property names.
- Make every assumption explicit.
- Flag unknowns that must be validated during implementation, with a suggested validation approach.
- When a design decision has a non-obvious rationale, explain it in one sentence.
- Do not pad with generic advice. Every sentence should convey information the implementer needs.

Please proceed with your analysis based on the following <user instructions>
</meta prompt 1>
<user_instructions>
<taskname="MCP auth ingest"/>
<task>Investigate why the AnimSpec remote MCP connector fails in Claude Desktop with “Authorization with the MCP server failed”, and determine the viable path for uploaded video files from ChatGPT and Claude to reach AnimSpec through MCP tools or adjacent API flows. This is an investigation/handoff task, not an implementation task. Focus on protocol fit, auth/discovery behavior, client-registration expectations, and how hosted attachments can be converted into `video_uri`, `file_uri`, `video_base64`, or `r2_object_key` inputs for `analyze_video`.</task>

<architecture>AnimSpec exposes two integration surfaces. `src/app/api/mcp/route.ts` serves the remote Streamable HTTP MCP endpoint and authenticates either AnimSpec API keys or OAuth bearer tokens before delegating to `src/lib/mcp/server.ts`. `src/lib/mcp/server.ts` defines hosted-facing tools including `prepare_video_input` and `analyze_video`, and routes work into the public API layer in `src/lib/public-api/*`. OAuth discovery and token exchange live in `src/app/.well-known/*`, `src/app/oauth/*`, and `src/lib/oauth/*`, backed by Firestore via `src/lib/firebase/admin.ts` and collection names in `src/types/database.ts`. The hosted video-ingestion path is implemented in `src/lib/public-api/prepare-video-input.ts`, `src/lib/public-api/video-source.ts`, `src/lib/public-api/contracts.ts`, `src/lib/public-api/analyze.ts`, and the upload endpoints under `src/app/api/v1/*`. There is also a separate local stdio thin client in `mcp-server/index.ts` that uploads files itself and then calls the REST API; that path is important as a contrast because it solves local-file access outside hosted connector constraints.</architecture>

<selected_context>
docs/public-api-mcp.md: current product/docs story for public API + MCP; includes current auth split, shared-account mode, OAuth discovery endpoints, and notes that direct ChatGPT onboarding was “not done yet” even though OAuth routes now exist.
docs/R2_SETUP.md: explains the R2 upload path and size thresholds; useful for hosted uploads and `r2ObjectKey` flow.
README.md: concise public summary of available programmatic endpoints.

src/app/api/mcp/route.ts: remote MCP entrypoint; builds `AuthInfo` from API key or OAuth bearer token, returns `401` with `WWW-Authenticate: Bearer ... resource_metadata=...`, and allows unauthenticated access only when `CHATGPT_APP_SHARED_USER_ID` is set.
src/lib/mcp/server.ts: MCP server definition; resources + tools. `prepare_video_input` accepts `video_uri`, `video_url`, or `video_base64`; `analyze_video` accepts those plus `file_uri`/`file_mime_type` and `r2_object_key`. Auth-required logic uses `extra.authInfo.extra.userId` or shared-app fallback.
src/lib/mcp/widget.ts: inline app widget resource for ChatGPT-style hosts.
src/lib/mcp/use-case-inference.ts: format inference used when a host supplies `user_goal` instead of `format`.

src/app/.well-known/oauth-authorization-server/route.ts: serves authorization-server metadata.
src/app/.well-known/oauth-protected-resource/route.ts: serves protected-resource metadata for `/api/mcp`.
src/app/.well-known/oauth-protected-resource/[...resource]/route.ts: resource-specific metadata path, including `/api/mcp`.
src/lib/oauth/config.ts: OAuth constants + metadata payloads; advertises `registration_endpoint`, `authorization_endpoint`, `token_endpoint`, PKCE `S256`, and supported auth methods `none`, `client_secret_post`, `client_secret_basic`.
src/lib/oauth/crypto.ts: PKCE/token hashing helpers.
src/lib/oauth/auth.ts: session-user auth for consent screen, bearer-token validation, and token-endpoint client auth parsing.
src/lib/oauth/store.ts: client registration, authorization code storage/consumption, token issuance/refresh, bearer-token validation, and registration response shape.

src/app/oauth/authorize/page.tsx: validates `client_id`, `redirect_uri`, `response_type=code`, `code_challenge`, `code_challenge_method=S256`, and rejects unknown redirect URIs.
src/app/oauth/authorize/authorize-client.tsx: browser sign-in + consent UI; posts approval to `/api/oauth/authorize/approve` and redirects to the client callback with `code` and `state`.
src/app/api/oauth/authorize/approve/route.ts: creates authorization code for a signed-in user and returns redirect target.
src/app/oauth/token/route.ts: authorization-code and refresh-token exchange.
src/app/oauth/register/route.ts: dynamic client registration endpoint; accepts `redirect_uris`, optional `token_endpoint_auth_method`, returns client credentials.
src/app/oauth/register/[clientId]/route.ts: registration metadata lookup.
src/app/api/oauth/clients/route.ts: authenticated dashboard API for creating/listing/deleting manual OAuth clients.

src/components/settings/connection-guide.tsx: explicit user-facing connector instructions for Claude Desktop/Claude.ai and ChatGPT; says hosted connectors should use OAuth and gives manual Auth/Token/Registration URLs plus scope `animspec:mcp`.
src/components/settings/oauth-client-manager.tsx: manual client creation UI; hardcodes known callback URLs for Claude (`https://claude.ai/api/mcp/auth_callback`, `https://claude.com/api/mcp/auth_callback`) and a ChatGPT callback preset; lets users choose `client_secret_post`, `client_secret_basic`, or `none`.

src/lib/public-api/auth.ts: API-key auth for public REST endpoints.
src/lib/public-api/contracts.ts: canonical analyze request parser; exactly one source among `videoBase64`, `videoUri`, `videoUrl`, `fileUri`, `r2ObjectKey`.
src/lib/public-api/metadata.ts: accepted video MIME types/extensions and size thresholds.
src/lib/public-api/prepare-video-input.ts: hosted attachment normalization helper; returns either reusable Gemini `fileUri` or inline base64 payload with notes about preferred handoff.
src/lib/public-api/video-source.ts: materializes `video_uri`, `video_url`, `r2_object`, or inline base64; supports `data:` URIs and `http(s)` fetches; may upload to Gemini Files when `preferGeminiFileUpload` is set or size exceeds threshold.
src/lib/public-api/analyze.ts: main analysis pipeline; for non-Kimi jobs it prefers Gemini Files when source kind is `video_uri` or deep analysis is on; Kimi requires inline video data; `r2ObjectKey` is resolved back into base64 via R2 fetch.
src/app/api/v1/analyze/route.ts: public REST analyze endpoint and self-description.
src/app/api/v1/upload/route.ts: API-key-authenticated Gemini Files upload endpoint.
src/app/api/v1/upload-url/route.ts: API-key-authenticated R2 presigned upload URL endpoint.
src/lib/storage/gemini-files.ts: Gemini Files upload/poll utilities.
src/lib/storage/r2.ts: presigned R2 PUT/GET flow and `fetchAsBase64` for later analysis.
mcp-server/index.ts: local stdio MCP thin client; reads local file from disk, chooses inline vs Gemini upload vs R2 upload, then calls REST API. Useful as evidence that local-file upload already works in non-hosted mode.

src/lib/firebase/admin.ts: required Firebase admin env-backed auth/Firestore dependency for OAuth/session/token flows.
src/types/database.ts: Firestore collection/type definitions including OAuth client/auth-code/access-token/refresh-token records.

tests/oauth-store.test.ts: only OAuth-focused test; verifies public clients omit `client_secret` in registration responses.
tests/prepare-video-input.test.ts: proves hosted `video_uri` can become Gemini `file_uri` when upload is preferred.
tests/public-api-video-source.test.ts: proves `video_uri` source can produce Gemini Files upload.
tests/public-api-contracts.test.ts: verifies generic `videoUri` is accepted and only one source may be supplied.
</selected_context>

<relationships>
- Hosted MCP request -> `src/app/api/mcp/route.ts` -> `createAnimSpecMcpServer()` in `src/lib/mcp/server.ts` -> `runPublicVideoAnalysis()` in `src/lib/public-api/analyze.ts`.
- MCP 401 path -> `WWW-Authenticate` header with `resource_metadata` -> `/.well-known/oauth-protected-resource/api/mcp` -> authorization server at `/.well-known/oauth-authorization-server`.
- OAuth authorization flow: connector/client -> `/oauth/register` (optional DCR) -> `/oauth/authorize` -> consent UI -> `/api/oauth/authorize/approve` -> redirect with code -> `/oauth/token` -> bearer token -> `/api/mcp`.
- Manual hosted setup path: dashboard settings -> `OAuthClientManager` creates client with known callback URL(s) -> connector uses that client during OAuth.
- OAuth persistence path: `src/lib/oauth/store.ts` uses Firestore collection names from `src/types/database.ts` through `src/lib/firebase/admin.ts`.
- Hosted attachment path: `prepare_video_input` in `src/lib/mcp/server.ts` -> `prepareVideoInputForMcp()` -> `prepareAnalysisSource()` -> either Gemini Files (`file_uri` + `file_mime_type`) or inline base64 (`video_base64` + `mime_type`) -> `analyze_video`.
- Remote URL/attachment fetch path: `video_uri` and `video_url` both flow through `prepareAnalysisSource()` in `src/lib/public-api/video-source.ts`; accepted schemes are `http(s)` and `data:`.
- R2 path: client/backend obtains presigned PUT URL from `/api/v1/upload-url` -> uploads binary to R2 -> passes `r2ObjectKey` into analyze endpoint/tool -> server fetches object back via `fetchAsBase64()`.
- Local MCP path is separate: `mcp-server/index.ts` can access disk directly, unlike Claude/Desktop/ChatGPT hosted connectors.
</relationships>

<ambiguities>
- Docs/UI claim hosted ChatGPT and Claude connectors should use OAuth and imply a proper discovery + token flow exists, but `docs/public-api-mcp.md` also says first-class ChatGPT connector onboarding was “not done yet”. The next model should reconcile whether this is stale documentation or a real implementation gap.
- `src/app/api/mcp/route.ts` only authenticates API keys and already-issued OAuth bearer tokens. Any Claude failure before bearer-token issuance is likely in discovery, registration, redirect URI matching, consent/session handling, or token exchange rather than in MCP tool execution.
- Manual client creation exists alongside dynamic client registration. It is not yet clear whether Claude Desktop expects DCR, manual client credentials, or a specific token auth method (`none` vs `client_secret_post`), and whether AnimSpec’s metadata matches that expectation.
- Hosted video support is framed around generic `video_uri` / `video_base64` handoff, but there is no host-specific adapter here for ChatGPT or Claude attachment objects. The next model should determine what those hosts actually send into MCP tools, and whether `video_uri` can realistically carry those attachment references without an extra bridge.
- Non-Kimi hosted flows prefer Gemini Files upload for `video_uri`, but the upload helper uses server-side fetch of the supplied URI. If ChatGPT/Claude attachment URIs are not publicly fetchable or are short-lived/private to the host, this path may fail even though the API surface looks ready.
- The only explicit Claude callback values in-product are `https://claude.ai/api/mcp/auth_callback` and `https://claude.com/api/mcp/auth_callback` from `oauth-client-manager.tsx`; if Claude Desktop now uses a different callback or registration pattern, redirect URI validation in `/oauth/authorize` and `/api/oauth/authorize/approve` would reject it.
</ambiguities>
</user_instructions>
