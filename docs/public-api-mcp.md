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

- AnimSpec API key in request headers

This works for MCP clients that can send bearer or custom headers.

### Shared account mode for ChatGPT

If you want direct ChatGPT app testing without wiring OAuth yet, set:

```bash
CHATGPT_APP_SHARED_USER_ID=<firebase-user-id>
```

When present:

- unauthenticated MCP app calls can run analysis through that shared account
- the widget labels the run as shared app mode

Use this only for controlled internal testing.

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
