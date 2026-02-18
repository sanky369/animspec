#!/usr/bin/env node

/**
 * AnimSpec MCP Server
 *
 * A thin client that exposes AnimSpec video analysis as MCP tools for
 * AI coding agents (Claude Code, Codex CLI, etc.).
 *
 * The server reads video files from disk and calls the AnimSpec API
 * (which handles Gemini calls, credit deduction, etc.). Users authenticate
 * with their AnimSpec API key — no Gemini key needed.
 *
 * Usage:
 *   npx tsx mcp-server/index.ts
 *
 * Environment:
 *   ANIMSPEC_API_KEY  - Your AnimSpec API key (generate at https://animspec.ai/dashboard)
 *   ANIMSPEC_API_URL  - API base URL (default: https://animspec.ai)
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const API_URL = process.env.ANIMSPEC_API_URL || 'https://animspec.ai';

const ACCEPTED_EXTENSIONS: Record<string, string> = {
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
};

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

const ALL_FORMATS = [
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
] as const;

const FORMAT_DESCRIPTIONS: Record<string, { label: string; description: string; bestFor: string }> = {
  clone_ui_animation: { label: 'Clone UI Animation', description: 'Agent instructions to recreate exact motion, timing, easing', bestFor: 'Micro-interactions, transitions, complex sequences' },
  clone_component: { label: 'Clone UI Component', description: 'Agent instructions to build a matching React + Tailwind component', bestFor: 'Buttons, cards, modals, navbars, menus, widgets' },
  clone_landing_page: { label: 'Clone Landing Page', description: 'Agent instructions to recreate the page layout and sections', bestFor: 'Marketing pages, hero sections, pricing sections' },
  copy_design_style: { label: 'Copy Design Style', description: 'Agent instructions to apply this design style to YOUR existing product', bestFor: 'Redesigning your app, adopting a new aesthetic' },
  extract_design_tokens: { label: 'Extract Style & Tokens', description: 'Reusable design tokens: palette, typography, radius, shadows, spacing', bestFor: 'Design systems, theming, consistent UI' },
  remotion_demo_template: { label: 'Reuse Product Demo Style (Remotion)', description: 'Agent instructions to create similar product demos with your assets', bestFor: 'Product demo videos' },
  qa_clone_checklist: { label: 'QA Checklist for Perfect Clone', description: 'Acceptance criteria to verify your clone matches the original', bestFor: 'Hand-off to devs, pixel/motion perfection' },
  accessibility_audit: { label: 'Accessibility Audit', description: 'WCAG compliance, seizure risk assessment, prefers-reduced-motion fallbacks', bestFor: 'Inclusive design, WCAG certification' },
  interaction_state_machine: { label: 'Interaction State Machine', description: 'XState/useReducer state machine from observed UI states and transitions', bestFor: 'Complex interactions, multi-state components' },
  performance_budget: { label: 'Performance Budget', description: 'Layout thrash detection, GPU layer analysis, 60fps optimization', bestFor: 'Performance audits, mobile optimization' },
  lottie_rive_export: { label: 'Lottie / Rive Export', description: 'Lottie keyframe data and Rive state machine definitions', bestFor: 'Motion graphics, micro-animations' },
  storyboard_breakdown: { label: 'Storyboard Breakdown', description: 'Frame-by-frame storyboard with annotated timing and states', bestFor: 'Design handoff, animation documentation' },
  tailwind_animate: { label: 'Tailwind Animate Config', description: 'Custom keyframes, animation utilities, and Tailwind config entries', bestFor: 'Tailwind projects, utility-first animation' },
  react_native_reanimated: { label: 'React Native (Reanimated)', description: 'Reanimated 3 with useAnimatedStyle, withSpring, gesture handler', bestFor: 'Mobile apps, native performance' },
  figma_motion_spec: { label: 'Figma Motion Spec', description: 'Smart Animate properties, variant states, prototype interactions', bestFor: 'Design systems, Figma prototypes' },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getApiKey(): string {
  const key = process.env.ANIMSPEC_API_KEY;
  if (!key) {
    throw new Error(
      'ANIMSPEC_API_KEY environment variable is not set.\n' +
        'Generate one at https://animspec.ai/dashboard or via the API:\n' +
        '  POST /api/v1/api-keys'
    );
  }
  return key;
}

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

async function readVideoAsBase64(filePath: string): Promise<string> {
  const buffer = await fs.promises.readFile(filePath);
  return buffer.toString('base64');
}

function getFileSize(filePath: string): number {
  return fs.statSync(filePath).size;
}

interface AnalyzeApiResponse {
  overview?: string;
  code?: string;
  format?: string;
  notes?: string;
  creditsUsed?: number;
  creditsRemaining?: number;
  error?: string;
  hint?: string;
  creditsRequired?: number;
  creditsBalance?: number;
}

/**
 * Call the AnimSpec API to analyze a video.
 */
async function callAnalyzeApi(
  videoBase64: string,
  mimeType: string,
  format: string,
  quality: string,
  trigger: string | undefined,
  fileName: string,
  fileSize: number
): Promise<AnalyzeApiResponse> {
  const apiKey = getApiKey();
  const url = `${API_URL}/api/v1/analyze`;

  const body: Record<string, unknown> = {
    videoBase64,
    mimeType,
    format,
    quality,
    metadata: {
      name: fileName,
      size: fileSize,
      mimeType,
      duration: 0,
      width: 0,
      height: 0,
    },
  };

  if (trigger) {
    body.trigger = trigger;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(5 * 60 * 1000), // 5 minute timeout
  });

  const data = (await response.json()) as AnalyzeApiResponse;

  if (!response.ok) {
    // Build a helpful error message
    let errorMsg = data.error || `API returned ${response.status}`;

    if (response.status === 401) {
      errorMsg += '\n\nYour API key is invalid or revoked. Generate a new one at https://animspec.ai/dashboard';
    } else if (response.status === 402) {
      const required = data.creditsRequired ?? '?';
      const balance = data.creditsBalance ?? '?';
      errorMsg = `Insufficient credits. This analysis requires ${required} credits but you have ${balance}.`;
      errorMsg += '\n\nPurchase more credits at https://animspec.ai/dashboard';
    }

    if (data.hint) {
      errorMsg += `\n${data.hint}`;
    }

    throw new Error(errorMsg);
  }

  return data;
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
Reads a video file from the local filesystem, uploads it to the AnimSpec API,
and returns a detailed animation specification in the requested format.

Supported video formats: MP4, WebM, MOV (max 100 MB).
Credits are deducted from your AnimSpec account (balanced: 3 credits, precise: 20 credits).

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
      .enum(ALL_FORMATS)
      .default('clone_ui_animation')
      .describe('Output format for the analysis. Use list_formats to see all options.'),
    quality: z
      .enum(['balanced', 'precise'])
      .default('balanced')
      .describe(
        'Quality level. "balanced" uses Gemini 3 Flash (fast, 3 credits). "precise" uses Gemini 3 Pro (slower, 20 credits).'
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
      // Validate API key early
      getApiKey();

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
          isError: true,
        };
      }

      const mimeType = getMimeType(resolvedPath);
      const fileName = path.basename(resolvedPath);
      const videoBase64 = await readVideoAsBase64(resolvedPath);

      const data = await callAnalyzeApi(
        videoBase64,
        mimeType,
        format,
        quality,
        trigger,
        fileName,
        fileSize
      );

      // Build response
      let response = '';

      if (data.overview) {
        response += `## Overview\n${data.overview}\n\n`;
      }

      response += data.code || '';

      if (data.notes) {
        response += `\n\n---\n\n## Notes\n${data.notes}`;
      }

      // Append credit info
      if (data.creditsUsed !== undefined || data.creditsRemaining !== undefined) {
        response += `\n\n---\n_Credits used: ${data.creditsUsed ?? '?'} | Remaining: ${data.creditsRemaining ?? '?'}_`;
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
    const lines = ALL_FORMATS.map((id) => {
      const f = FORMAT_DESCRIPTIONS[id];
      return `**${id}** - ${f.label}\n  ${f.description}\n  Best for: ${f.bestFor}`;
    });

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
  'List available AI models/quality levels and their credit costs.',
  {},
  async () => {
    const text = [
      '# AnimSpec Quality Levels',
      '',
      '**balanced** (Gemini 3 Flash) - 3 credits',
      '  Fast, high-quality analysis. 8K output tokens, thinking mode enabled.',
      '  Best for most use cases.',
      '',
      '**precise** (Gemini 3 Pro) - 20 credits',
      '  Flagship model with deeper reasoning. 16K output tokens, thinking mode enabled.',
      '  Best for complex animations requiring pixel-perfect accuracy.',
    ].join('\n');

    return {
      content: [{ type: 'text' as const, text }],
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
