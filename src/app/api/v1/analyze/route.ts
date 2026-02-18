import { NextRequest } from 'next/server';
import {
  analyzeVideoWithGemini,
  analyzeVideoWithGeminiFile,
  type GeminiQualityLevel,
} from '@/lib/ai/gemini';
import { parseAnalysisOutput } from '@/lib/ai/output-parsers';
import type { OutputFormat, TriggerContext, VideoMetadata } from '@/types/analysis';

export const runtime = 'nodejs';
export const maxDuration = 300;

const VALID_FORMATS: OutputFormat[] = [
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

const VALID_QUALITIES = ['balanced', 'precise'];
const VALID_TRIGGERS = ['hover', 'click', 'scroll', 'load', 'loop', 'focus'];

/**
 * POST /api/v1/analyze
 *
 * Programmatic REST API for video analysis. Accepts JSON body, returns full
 * analysis result synchronously (no SSE streaming). Designed for CLI tools,
 * scripts, and integrations that don't use MCP.
 *
 * Authentication: Requires GEMINI_API_KEY to be set server-side.
 * Optionally accepts x-api-key header for future use.
 *
 * Request body:
 *   {
 *     "videoBase64": "base64-encoded video data",
 *     "mimeType": "video/mp4",
 *     "format": "clone_ui_animation",
 *     "quality": "balanced",
 *     "trigger": "hover",           // optional
 *     "metadata": {                  // optional
 *       "duration": 2.5,
 *       "width": 1920,
 *       "height": 1080,
 *       "size": 1234567,
 *       "name": "animation.mp4"
 *     }
 *   }
 *
 * OR for Gemini Files API (pre-uploaded):
 *   {
 *     "fileUri": "https://generativelanguage.googleapis.com/...",
 *     "fileMimeType": "video/mp4",
 *     "format": "clone_ui_animation",
 *     "quality": "balanced"
 *   }
 *
 * Response:
 *   {
 *     "overview": "Brief summary",
 *     "code": "Full analysis output",
 *     "format": "clone_ui_animation",
 *     "notes": "Additional notes (if any)",
 *     "rawAnalysis": "Raw AI output"
 *   }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      videoBase64,
      mimeType,
      fileUri,
      fileMimeType,
      format,
      quality = 'balanced',
      trigger,
      metadata,
    } = body;

    // Validate required fields
    if (!format) {
      return Response.json(
        { error: 'Missing required field: format' },
        { status: 400 }
      );
    }

    if (!VALID_FORMATS.includes(format)) {
      return Response.json(
        { error: `Invalid format: ${format}. Valid: ${VALID_FORMATS.join(', ')}` },
        { status: 400 }
      );
    }

    if (!VALID_QUALITIES.includes(quality)) {
      return Response.json(
        { error: `Invalid quality: ${quality}. Valid: ${VALID_QUALITIES.join(', ')}` },
        { status: 400 }
      );
    }

    if (trigger && !VALID_TRIGGERS.includes(trigger)) {
      return Response.json(
        { error: `Invalid trigger: ${trigger}. Valid: ${VALID_TRIGGERS.join(', ')}` },
        { status: 400 }
      );
    }

    if (!videoBase64 && !fileUri) {
      return Response.json(
        { error: 'Must provide either videoBase64 or fileUri' },
        { status: 400 }
      );
    }

    const triggerContext: TriggerContext = trigger || null;
    const geminiQuality = quality as GeminiQualityLevel;

    // Build video metadata if provided
    const videoMetadata: VideoMetadata | null = metadata
      ? {
          duration: metadata.duration || 0,
          width: metadata.width || 0,
          height: metadata.height || 0,
          size: metadata.size || 0,
          mimeType: metadata.mimeType || mimeType || fileMimeType || '',
          name: metadata.name || '',
        }
      : null;

    let rawOutput: string;

    if (fileUri && fileMimeType) {
      rawOutput = await analyzeVideoWithGeminiFile({
        fileUri,
        fileMimeType,
        format: format as OutputFormat,
        quality: geminiQuality,
        triggerContext,
        videoMetadata,
      });
    } else if (videoBase64 && mimeType) {
      rawOutput = await analyzeVideoWithGemini({
        videoBase64,
        mimeType,
        format: format as OutputFormat,
        quality: geminiQuality,
        triggerContext,
        videoMetadata,
      });
    } else {
      return Response.json(
        { error: 'Invalid video data: provide videoBase64+mimeType or fileUri+fileMimeType' },
        { status: 400 }
      );
    }

    const result = parseAnalysisOutput(rawOutput, format as OutputFormat);

    return Response.json({
      overview: result.overview,
      code: result.code,
      format: result.format,
      notes: result.notes || null,
      rawAnalysis: rawOutput,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Analysis failed';
    console.error('v1/analyze error:', error);
    return Response.json({ error: message }, { status: 500 });
  }
}

/**
 * GET /api/v1/analyze
 *
 * Returns API documentation and available formats/models.
 */
export async function GET() {
  return Response.json({
    name: 'AnimSpec Video Analysis API',
    version: 'v1',
    description:
      'Analyze video animations and generate structured specifications for AI coding agents.',
    endpoints: {
      'POST /api/v1/analyze': {
        description: 'Analyze a video and return animation specifications',
        body: {
          videoBase64: 'string (base64-encoded video)',
          mimeType: 'string (video/mp4, video/webm, video/quicktime)',
          format: 'string (output format)',
          quality: 'string (balanced | precise)',
          trigger: 'string? (hover | click | scroll | load | loop | focus)',
          metadata: 'object? { duration, width, height, size, name }',
        },
      },
    },
    formats: VALID_FORMATS,
    qualities: VALID_QUALITIES,
    triggers: VALID_TRIGGERS,
  });
}
