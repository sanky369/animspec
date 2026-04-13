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
