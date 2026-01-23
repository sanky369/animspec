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

## Constraints

- Max file size: 100MB
- Files API threshold: 20MB
- Streaming timeout: 60 seconds (maxDuration in route.ts)
- Accepted formats: MP4, WebM, MOV
