#!/usr/bin/env node

/**
 * AnimSpec MCP Server
 *
 * Exposes AnimSpec video analysis as MCP tools for AI coding agents
 * (Claude Code, Codex CLI, etc.).
 *
 * Usage:
 *   npx tsx mcp-server/index.ts
 *
 * Configure in Claude Code's MCP settings:
 *   {
 *     "mcpServers": {
 *       "animspec": {
 *         "command": "npx",
 *         "args": ["tsx", "mcp-server/index.ts"],
 *         "cwd": "/path/to/animspec",
 *         "env": { "GEMINI_API_KEY": "your-key" }
 *       }
 *     }
 *   }
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';
import { GoogleGenAI } from '@google/genai';
import { buildAnalysisPrompt, buildUserPrompt } from '../src/lib/ai/prompts';
import { parseAnalysisOutput, extractVerificationReport } from '../src/lib/ai/output-parsers';
import type { OutputFormat, QualityLevel, TriggerContext, VideoMetadata } from '../src/types/analysis';
import { FORMAT_OPTIONS, QUALITY_OPTIONS, TRIGGER_OPTIONS } from '../src/types/output-formats';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

type GeminiQuality = 'balanced' | 'precise';

const QUALITY_TO_MODEL: Record<GeminiQuality, string> = {
  balanced: 'gemini-3-flash-preview',
  precise: 'gemini-3-pro-preview',
};

const QUALITY_TO_CONFIG: Record<GeminiQuality, object> = {
  balanced: {
    maxOutputTokens: 8192,
    temperature: 0.2,
    thinkingConfig: { thinkingLevel: 'high' },
  },
  precise: {
    maxOutputTokens: 16384,
    temperature: 0.1,
    thinkingConfig: { thinkingLevel: 'high' },
  },
};

const ACCEPTED_EXTENSIONS: Record<string, string> = {
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
};

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
const GEMINI_FILES_THRESHOLD = 20 * 1024 * 1024; // 20 MB

const ALL_FORMATS: OutputFormat[] = [
  'clone_ui_animation',
  'clone_component',
  'clone_landing_page',
  'copy_design_style',
  'extract_design_tokens',
  'remotion_demo_template',
  'qa_clone_checklist',
  'accessibility_audit',
  'interaction_state_machine',
  'performance_budget',
  'lottie_rive_export',
  'storyboard_breakdown',
  'tailwind_animate',
  'react_native_reanimated',
  'figma_motion_spec',
];

const ALL_TRIGGERS = ['hover', 'click', 'scroll', 'load', 'loop', 'focus'] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resolveVideoPath(videoPath: string): string {
  const resolved = path.resolve(videoPath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Video file not found: ${resolved}`);
  }
  return resolved;
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const mime = ACCEPTED_EXTENSIONS[ext];
  if (!mime) {
    throw new Error(
      `Unsupported video format: ${ext}. Accepted: ${Object.keys(ACCEPTED_EXTENSIONS).join(', ')}`
    );
  }
  return mime;
}

function readVideoAsBase64(filePath: string): string {
  const buffer = fs.readFileSync(filePath);
  return buffer.toString('base64');
}

function getFileSize(filePath: string): number {
  const stat = fs.statSync(filePath);
  return stat.size;
}

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY environment variable is not set. ' +
        'Get one at https://aistudio.google.com/app/apikey'
    );
  }
  return new GoogleGenAI({ apiKey });
}

/**
 * Upload a large video to the Gemini Files API and poll until ACTIVE.
 */
async function uploadToGeminiFiles(
  client: GoogleGenAI,
  filePath: string,
  mimeType: string
): Promise<{ uri: string; mimeType: string }> {
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: mimeType });

  const uploaded = await client.files.upload({
    file: blob,
    config: { mimeType },
  });

  if (!uploaded.uri) {
    throw new Error('Gemini Files API upload failed: no URI returned');
  }

  // Poll until file is ACTIVE (max 60s)
  const maxWait = 60_000;
  const start = Date.now();
  let file = uploaded;

  while (file.state === 'PROCESSING' && Date.now() - start < maxWait) {
    await new Promise((r) => setTimeout(r, 2000));
    if (file.name) {
      file = await client.files.get({ name: file.name });
    }
  }

  if (file.state !== 'ACTIVE') {
    throw new Error(`Gemini file not ready after ${maxWait / 1000}s. State: ${file.state}`);
  }

  return { uri: file.uri!, mimeType: file.mimeType || mimeType };
}

/**
 * Run the Gemini analysis (non-streaming) and return the full text.
 */
async function analyzeVideo(
  filePath: string,
  format: OutputFormat,
  quality: GeminiQuality,
  triggerContext: TriggerContext,
  metadata: VideoMetadata | null
): Promise<string> {
  const client = getGeminiClient();
  const mimeType = getMimeType(filePath);
  const fileSize = getFileSize(filePath);
  const model = QUALITY_TO_MODEL[quality];
  const config = QUALITY_TO_CONFIG[quality];
  const systemPrompt = buildAnalysisPrompt(format, triggerContext, metadata, quality);
  const userPrompt = buildUserPrompt();
  const promptText = `${systemPrompt}\n\n${userPrompt}`;

  let videoPart: Record<string, unknown>;

  if (fileSize > GEMINI_FILES_THRESHOLD) {
    // Upload via Gemini Files API for large files
    const uploaded = await uploadToGeminiFiles(client, filePath, mimeType);
    videoPart = {
      fileData: { mimeType: uploaded.mimeType, fileUri: uploaded.uri },
    };
  } else {
    const base64 = readVideoAsBase64(filePath);
    videoPart = {
      inlineData: { mimeType, data: base64 },
    };
  }

  const response = await client.models.generateContent({
    model,
    contents: [
      {
        role: 'user',
        parts: [videoPart, { text: promptText }],
      },
    ],
    config,
  });

  const text = response.text;
  if (!text) {
    throw new Error('Empty response from Gemini');
  }
  return text;
}

// ---------------------------------------------------------------------------
// MCP Server
// ---------------------------------------------------------------------------

const server = new McpServer({
  name: 'animspec',
  version: '1.0.0',
});

// ---------------------------------------------------------------------------
// Tool: analyze_video
// ---------------------------------------------------------------------------

server.tool(
  'analyze_video',
  `Analyze a video animation and generate structured specifications for AI coding agents.
Reads a video file from the local filesystem, sends it to Google Gemini for vision analysis,
and returns a detailed animation specification in the requested format.

Supported video formats: MP4, WebM, MOV (max 100 MB).

Common formats:
- clone_ui_animation: Agent instructions to recreate exact motion, timing, easing (default)
- clone_component: React + Tailwind component spec
- tailwind_animate: Tailwind CSS keyframes & utility classes
- clone_landing_page: Landing page layout & section specs
- figma_motion_spec: Figma Smart Animate properties & variants

Use list_formats to see all 15 available output formats.`,
  {
    video_path: z
      .string()
      .describe('Absolute or relative path to the video file (MP4, WebM, or MOV)'),
    format: z
      .enum(ALL_FORMATS as [string, ...string[]])
      .default('clone_ui_animation')
      .describe('Output format for the analysis. Use list_formats to see all options.'),
    quality: z
      .enum(['balanced', 'precise'])
      .default('balanced')
      .describe(
        'Quality level. "balanced" uses Gemini 3 Flash (fast, good). "precise" uses Gemini 3 Pro (slower, best quality).'
      ),
    trigger: z
      .enum(['hover', 'click', 'scroll', 'load', 'loop', 'focus'])
      .optional()
      .describe(
        'Animation trigger context. If omitted, the AI will infer the trigger from the video.'
      ),
  },
  async ({ video_path, format, quality, trigger }) => {
    try {
      const resolvedPath = resolveVideoPath(video_path);
      const fileSize = getFileSize(resolvedPath);

      if (fileSize > MAX_FILE_SIZE) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Error: File too large (${(fileSize / 1024 / 1024).toFixed(1)} MB). Maximum is 100 MB.`,
            },
          ],
        };
      }

      const mimeType = getMimeType(resolvedPath);
      const fileName = path.basename(resolvedPath);

      // Build basic metadata from file info
      const metadata: VideoMetadata = {
        duration: 0, // Unknown without ffprobe
        width: 0,
        height: 0,
        size: fileSize,
        mimeType,
        name: fileName,
      };

      const triggerContext: TriggerContext = trigger || null;
      const geminiQuality = quality as GeminiQuality;

      const rawOutput = await analyzeVideo(
        resolvedPath,
        format as OutputFormat,
        geminiQuality,
        triggerContext,
        metadata
      );

      const result = parseAnalysisOutput(rawOutput, format as OutputFormat);

      // Build a clean response
      let response = '';

      if (result.overview) {
        response += `## Overview\n${result.overview}\n\n`;
      }

      response += result.code;

      if (result.notes) {
        response += `\n\n---\n\n## Notes\n${result.notes}`;
      }

      return {
        content: [{ type: 'text' as const, text: response }],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [{ type: 'text' as const, text: `Error: ${message}` }],
        isError: true,
      };
    }
  }
);

// ---------------------------------------------------------------------------
// Tool: list_formats
// ---------------------------------------------------------------------------

server.tool(
  'list_formats',
  'List all available AnimSpec output formats with descriptions and best-use cases.',
  {},
  async () => {
    const lines = FORMAT_OPTIONS.map(
      (f) => `**${f.id}** - ${f.label}\n  ${f.description}\n  Best for: ${f.bestFor}`
    );

    return {
      content: [
        {
          type: 'text' as const,
          text: `# AnimSpec Output Formats\n\n${lines.join('\n\n')}`,
        },
      ],
    };
  }
);

// ---------------------------------------------------------------------------
// Tool: list_models
// ---------------------------------------------------------------------------

server.tool(
  'list_models',
  'List available AI models/quality levels for video analysis.',
  {},
  async () => {
    const lines = [
      `**balanced** (${QUALITY_TO_MODEL.balanced})`,
      `  Fast, high-quality analysis. 8K output tokens, thinking mode enabled.`,
      `  Best for most use cases.`,
      ``,
      `**precise** (${QUALITY_TO_MODEL.precise})`,
      `  Flagship model with deeper reasoning. 16K output tokens, thinking mode enabled.`,
      `  Best for complex animations requiring pixel-perfect accuracy.`,
    ];

    return {
      content: [
        {
          type: 'text' as const,
          text: `# AnimSpec Quality Levels\n\n${lines.join('\n')}`,
        },
      ],
    };
  }
);

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error('MCP server error:', error);
  process.exit(1);
});
