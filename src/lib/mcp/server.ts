import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { z } from 'zod';
import { parsePublicAnalyzeRequest } from '@/lib/public-api/contracts';
import { runPublicVideoAnalysis } from '@/lib/public-api/analyze';
import { buildFormatsMarkdown, buildQualitiesMarkdown } from '@/lib/public-api/metadata';
import { ANIMSPEC_WIDGET_URI, getAnimSpecWidgetHtml } from '@/lib/mcp/widget';
import { inferUseCaseFromIntent } from '@/lib/mcp/use-case-inference';

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
    'analyze_video',
    {
      title: 'Analyze video',
      description:
        'Analyze a UI video and return a rebuild, audit, or behavior output. You can pass an explicit format or a user_goal and let AnimSpec infer the right use case first.',
      inputSchema: {
        video_url: z.string().url().optional().describe('Publicly fetchable HTTP(S) video URL'),
        video_base64: z.string().optional().describe('Base64-encoded video payload'),
        mime_type: z.string().optional().describe('Required with video_base64; optional with video_url'),
        file_uri: z.string().optional().describe('Gemini Files URI from /api/v1/upload'),
        file_mime_type: z.string().optional().describe('Required with file_uri'),
        r2_object_key: z.string().optional().describe('R2 object key returned by /api/v1/upload-url'),
        file_name: z.string().optional().describe('Optional file name for history and logs'),
        format: z.string().optional().describe('AnimSpec output format. Explicit format wins when present.'),
        user_goal: z.string().optional().describe('Natural-language goal; used to infer the best format when format is omitted'),
        quality: z.string().optional().describe('balanced, precise, or kimi'),
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
