# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AnimSpec.ai converts video animations (MP4, WebM, MOV) into structured text instructions for AI coding agents. It analyzes motion patterns using Google Gemini vision models and outputs specifications in multiple formats (natural language, CSS keyframes, GSAP, Framer Motion).

## Development Commands

```bash
npm run dev      # Start development server (Next.js)
npm run build    # Production build
npm run lint     # ESLint check
npm run start    # Start production server
```

## Environment Setup

Requires `GEMINI_API_KEY` in `.env` (get from https://aistudio.google.com/app/apikey)

## Architecture

### Core Data Flow

```
Video Upload → Size Check (20MB threshold)
    ↓
< 20MB: Convert to base64 → POST /api/analyze (inline)
≥ 20MB: Upload to /api/upload → Gemini Files API → POST /api/analyze (fileUri)
    ↓
Build prompt (format + trigger + metadata + accuracy rules)
    ↓
Stream response via SSE → Parse output → Display in tabs
```

### Key Files

| Path | Purpose |
|------|---------|
| `src/app/api/analyze/route.ts` | Main analysis endpoint, streams SSE responses |
| `src/app/api/upload/route.ts` | Gemini Files API upload for large videos |
| `src/lib/ai/gemini.ts` | Gemini model integration, 4 analysis functions |
| `src/lib/ai/prompts.ts` | System prompt construction with format templates |
| `src/lib/ai/output-parsers.ts` | Extracts overview/code from AI response |
| `src/hooks/use-analysis.ts` | Client-side analysis orchestration |
| `src/hooks/use-video-upload.ts` | Video file handling and metadata extraction |
| `src/types/analysis.ts` | Core TypeScript types |

### Quality Levels → Models

- `fast`: gemini-2.5-flash (3K tokens, temp 0.4)
- `balanced`: gemini-3-flash-preview (8K tokens, temp 0.2, thinking: high)
- `precise`: gemini-3-pro-preview (16K tokens, temp 0.1, thinking: high)

### Output Formats

- `natural`: Structured text for AI coding agents (default)
- `css`: CSS @keyframes syntax
- `gsap`: GreenSock timeline syntax
- `framer`: React JSX with Framer Motion

### Component Structure

```
src/components/
├── upload/      # UploadZone, VideoPreview
├── config/      # FormatSelector, QualitySelector, TriggerContext
├── output/      # OutputPanel, CodeOutput, FramePreview
├── analysis/    # AnalysisProgress, StreamingOutput
├── layout/      # Header, Footer, BackgroundEffects
├── landing/     # HeroSection, HowItWorks
└── ui/          # Button, Badge, CodeBlock, Select, Tabs
```

## MCP Server & API (AI Agent Integration)

AnimSpec includes an MCP server and REST API that lets AI coding agents
(Claude Code, Codex CLI, etc.) analyze videos directly. Users authenticate
with an AnimSpec API key — no Gemini key needed. Credits are deducted from
their AnimSpec account.

### Setup

1. Generate an API key on the AnimSpec dashboard (or via `POST /api/v1/api-keys`)
2. Configure your MCP client with the key

### Claude Code Configuration

Add to `.claude/mcp.json` (project-level) or `~/.claude/mcp.json` (global):

```json
{
  "mcpServers": {
    "animspec": {
      "command": "npx",
      "args": ["tsx", "--tsconfig", "mcp-server/tsconfig.json", "mcp-server/index.ts"],
      "cwd": "/absolute/path/to/animspec",
      "env": {
        "ANIMSPEC_API_KEY": "ask_your_api_key_here"
      }
    }
  }
}
```

### MCP Tools

| Tool | Description |
|------|-------------|
| `analyze_video` | Analyze a video file and return animation specs (costs credits) |
| `list_formats` | List all 15 available output formats |
| `list_models` | List available quality levels, models, and credit costs |

### Example Usage in Claude Code

```
"Analyze ./demo.mp4 as a clone_ui_animation using precise quality"
"Use animspec to extract tailwind_animate config from ./hero-animation.webm"
"List all animspec formats"
```

### REST API

All API requests require an AnimSpec API key via the `x-api-key` header.

**Analyze a video:**
```bash
curl -X POST https://animspec.ai/api/v1/analyze \
  -H "Content-Type: application/json" \
  -H "x-api-key: ask_your_api_key_here" \
  -d '{
    "videoBase64": "<base64-encoded-video>",
    "mimeType": "video/mp4",
    "format": "clone_ui_animation",
    "quality": "balanced"
  }'
```

**API key management** (requires Firebase Auth Bearer token):
- `POST /api/v1/api-keys` — Generate a new API key
- `GET /api/v1/api-keys` — List your API keys
- `DELETE /api/v1/api-keys` — Revoke an API key

**API docs:** `GET /api/v1/analyze` returns full docs, formats, and credit costs.

### Key Files

| Path | Purpose |
|------|---------|
| `mcp-server/index.ts` | MCP server (thin client, calls AnimSpec API) |
| `mcp-server/tsconfig.json` | TypeScript config for MCP server |
| `src/app/api/v1/analyze/route.ts` | REST API endpoint (auth + credits + Gemini) |
| `src/app/api/v1/api-keys/route.ts` | API key management endpoint |
| `src/lib/api-keys/index.ts` | API key generation, validation, revocation |
| `src/types/database.ts` | Firestore types including `ApiKey` |

## Constraints

- Max file size: 100MB
- Files API threshold: 20MB
- Streaming timeout: 60 seconds (maxDuration in route.ts)
- Accepted formats: MP4, WebM, MOV
