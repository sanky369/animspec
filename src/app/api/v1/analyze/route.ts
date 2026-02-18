import { NextRequest } from 'next/server';
import {
  analyzeVideoWithGemini,
  analyzeVideoWithGeminiFile,
  type GeminiQualityLevel,
} from '@/lib/ai/gemini';
import { parseAnalysisOutput } from '@/lib/ai/output-parsers';
import { validateApiKey } from '@/lib/api-keys';
import { adminDb } from '@/lib/firebase/admin';
import { COLLECTIONS, CREDIT_COSTS } from '@/types/database';
import { FieldValue } from 'firebase-admin/firestore';
import type { OutputFormat, QualityLevel, TriggerContext, VideoMetadata } from '@/types/analysis';

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
 * Authenticate via AnimSpec API key (x-api-key header).
 * Returns userId or an error response.
 */
async function authenticateRequest(
  request: NextRequest
): Promise<{ userId: string } | { error: Response }> {
  const apiKey = request.headers.get('x-api-key');

  if (!apiKey) {
    return {
      error: Response.json(
        {
          error: 'Missing API key. Pass your AnimSpec API key in the x-api-key header.',
          hint: 'Generate an API key at https://animspec.ai/dashboard or via POST /api/v1/api-keys',
        },
        { status: 401 }
      ),
    };
  }

  const result = await validateApiKey(apiKey);
  if (!result) {
    return {
      error: Response.json(
        {
          error: 'Invalid or revoked API key.',
          hint: 'Check your key or generate a new one at https://animspec.ai/dashboard',
        },
        { status: 401 }
      ),
    };
  }

  return { userId: result.userId };
}

/**
 * Check that the user has enough credits for the requested quality.
 */
async function checkCredits(
  userId: string,
  quality: QualityLevel
): Promise<{ balance: number; cost: number; canProceed: boolean }> {
  const profileRef = adminDb.collection(COLLECTIONS.PROFILES).doc(userId);
  const profileSnap = await profileRef.get();

  if (!profileSnap.exists) {
    return { balance: 0, cost: 0, canProceed: false };
  }

  const profile = profileSnap.data();
  const cost = CREDIT_COSTS[quality];
  const balance = profile?.creditsBalance ?? 0;

  return { balance, cost, canProceed: balance >= cost };
}

/**
 * Deduct credits and record the transaction.
 */
async function deductCredits(
  userId: string,
  quality: QualityLevel,
  format: OutputFormat,
  triggerContext: TriggerContext,
  overview: string,
  code: string,
  videoName: string,
  videoDuration: number
): Promise<void> {
  const cost = CREDIT_COSTS[quality];
  const profileRef = adminDb.collection(COLLECTIONS.PROFILES).doc(userId);

  await adminDb.runTransaction(async (transaction) => {
    const profileDoc = await transaction.get(profileRef);

    if (!profileDoc.exists) {
      throw new Error('User profile not found');
    }

    const profile = profileDoc.data();
    if ((profile?.creditsBalance ?? 0) < cost) {
      throw new Error('Insufficient credits');
    }

    const newBalance = (profile?.creditsBalance ?? 0) - cost;

    transaction.update(profileRef, {
      creditsBalance: newBalance,
      updatedAt: FieldValue.serverTimestamp(),
    });

    // Create analysis record
    const analysisRef = adminDb.collection(COLLECTIONS.ANALYSES).doc();
    transaction.set(analysisRef, {
      userId,
      format,
      quality,
      triggerContext,
      overview,
      code,
      frameImageUrl: null,
      videoName,
      videoDuration,
      creditsUsed: cost,
      source: 'api', // mark as API-sourced
      createdAt: FieldValue.serverTimestamp(),
    });

    // Create credit transaction record
    const txRef = adminDb.collection(COLLECTIONS.CREDIT_TRANSACTIONS).doc();
    transaction.set(txRef, {
      userId,
      amount: -cost,
      type: 'analysis',
      quality,
      description: `API analysis (${quality} quality, ${format})`,
      analysisId: analysisRef.id,
      purchaseId: null,
      createdAt: FieldValue.serverTimestamp(),
    });
  });
}

/**
 * POST /api/v1/analyze
 *
 * Programmatic REST API for video analysis. Authenticates via AnimSpec API key,
 * checks credits, runs the analysis server-side, deducts credits, and returns
 * the full result as JSON.
 *
 * Headers:
 *   x-api-key: ask_... (your AnimSpec API key)
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
 * Response:
 *   {
 *     "overview": "Brief summary",
 *     "code": "Full analysis output",
 *     "format": "clone_ui_animation",
 *     "notes": "Additional notes (if any)",
 *     "creditsUsed": 3,
 *     "creditsRemaining": 17
 *   }
 */
export async function POST(request: NextRequest) {
  // --- Authenticate ---
  const authResult = await authenticateRequest(request);
  if ('error' in authResult) return authResult.error;
  const { userId } = authResult;

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

    // --- Validate inputs ---
    if (!format) {
      return Response.json({ error: 'Missing required field: format' }, { status: 400 });
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

    // --- Check credits ---
    const creditCheck = await checkCredits(userId, quality as QualityLevel);
    if (!creditCheck.canProceed) {
      return Response.json(
        {
          error: 'Insufficient credits.',
          creditsRequired: creditCheck.cost,
          creditsBalance: creditCheck.balance,
          hint: 'Purchase more credits at https://animspec.ai/dashboard',
        },
        { status: 402 }
      );
    }

    // --- Run analysis ---
    const triggerContext: TriggerContext = trigger || null;
    const geminiQuality = quality as GeminiQualityLevel;

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

    // --- Deduct credits ---
    await deductCredits(
      userId,
      quality as QualityLevel,
      format as OutputFormat,
      triggerContext,
      result.overview,
      result.code,
      videoMetadata?.name || 'api-upload',
      videoMetadata?.duration || 0
    );

    // Calculate remaining balance
    const remaining = creditCheck.balance - creditCheck.cost;

    return Response.json({
      overview: result.overview,
      code: result.code,
      format: result.format,
      notes: result.notes || null,
      creditsUsed: creditCheck.cost,
      creditsRemaining: remaining,
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
    authentication: {
      method: 'API Key',
      header: 'x-api-key',
      generate: 'POST /api/v1/api-keys (requires Firebase Auth Bearer token)',
      dashboard: 'https://animspec.ai/dashboard',
    },
    endpoints: {
      'POST /api/v1/analyze': {
        description: 'Analyze a video and return animation specifications',
        headers: { 'x-api-key': 'your AnimSpec API key' },
        body: {
          videoBase64: 'string (base64-encoded video)',
          mimeType: 'string (video/mp4, video/webm, video/quicktime)',
          format: 'string (output format)',
          quality: 'string? (balanced | precise, default: balanced)',
          trigger: 'string? (hover | click | scroll | load | loop | focus)',
          metadata: 'object? { duration, width, height, size, name }',
        },
      },
      'POST /api/v1/api-keys': {
        description: 'Generate a new API key',
        headers: { Authorization: 'Bearer <firebase-auth-token>' },
        body: { name: 'string? (key name for your reference)' },
      },
      'GET /api/v1/api-keys': {
        description: 'List your API keys',
        headers: { Authorization: 'Bearer <firebase-auth-token>' },
      },
      'DELETE /api/v1/api-keys': {
        description: 'Revoke an API key',
        headers: { Authorization: 'Bearer <firebase-auth-token>' },
        body: { id: 'string (key document ID)' },
      },
    },
    formats: VALID_FORMATS,
    qualities: VALID_QUALITIES,
    triggers: VALID_TRIGGERS,
    creditCosts: { balanced: 3, precise: 20 },
  });
}
