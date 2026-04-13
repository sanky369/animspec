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
