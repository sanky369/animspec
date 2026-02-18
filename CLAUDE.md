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

## MCP Server (AI Agent Integration)

AnimSpec includes an MCP (Model Context Protocol) server that lets AI coding agents
(Claude Code, Codex CLI, etc.) analyze videos directly from the command line.

### Quick Start

```bash
npm run mcp   # Start the MCP server (stdio transport)
```

### Claude Code Configuration

Add to your `.claude/mcp.json` (project-level) or `~/.claude/mcp.json` (global):

```json
{
  "mcpServers": {
    "animspec": {
      "command": "npx",
      "args": ["tsx", "--tsconfig", "mcp-server/tsconfig.json", "mcp-server/index.ts"],
      "cwd": "/absolute/path/to/animspec",
      "env": {
        "GEMINI_API_KEY": "your-gemini-api-key"
      }
    }
  }
}
```

### MCP Tools

| Tool | Description |
|------|-------------|
| `analyze_video` | Analyze a video file and return animation specs |
| `list_formats` | List all 15 available output formats |
| `list_models` | List available quality levels / models |

### Example Usage in Claude Code

```
"Analyze ./demo.mp4 as a clone_ui_animation using precise quality"
"Use animspec to extract tailwind_animate config from ./hero-animation.webm"
"List all animspec formats"
```

### REST API

`POST /api/v1/analyze` accepts JSON and returns the full analysis synchronously:

```bash
curl -X POST http://localhost:3000/api/v1/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "videoBase64": "<base64-encoded-video>",
    "mimeType": "video/mp4",
    "format": "clone_ui_animation",
    "quality": "balanced"
  }'
```

`GET /api/v1/analyze` returns API docs and available formats.

### Key Files

| Path | Purpose |
|------|---------|
| `mcp-server/index.ts` | MCP server entry point (stdio transport) |
| `mcp-server/tsconfig.json` | TypeScript config for MCP server |
| `src/app/api/v1/analyze/route.ts` | REST API endpoint |

## Constraints

- Max file size: 100MB
- Files API threshold: 20MB
- Streaming timeout: 60 seconds (maxDuration in route.ts)
- Accepted formats: MP4, WebM, MOV
