import OpenAI from 'openai';
import type { OutputFormat, TriggerContext, VideoMetadata } from '@/types/analysis';
import { buildAnalysisPrompt, buildUserPrompt } from './prompts';

// Kimi K2.5 model configuration
const KIMI_MODEL = 'kimi-k2.5';
const KIMI_BASE_URL = 'https://api.moonshot.ai/v1';

// Config for Kimi K2.5
const KIMI_CONFIG = {
  temperature: 0.6, // Instant mode recommended temperature
  max_tokens: 8192,
};

export interface AnalysisImage {
  base64: string;
  mimeType: string;
  description?: string;
}

export interface AnalyzeVideoWithKimiOptions {
  videoBase64: string;
  mimeType: string;
  format: OutputFormat;
  triggerContext: TriggerContext;
  videoMetadata?: VideoMetadata | null;
  fileSize?: number;
  analysisImages?: AnalysisImage[];
}

function getKimiClient(): OpenAI {
  const apiKey = process.env.MOONSHOT_API_KEY;
  if (!apiKey) {
    throw new Error('MOONSHOT_API_KEY environment variable is not set');
  }

  return new OpenAI({
    apiKey,
    baseURL: KIMI_BASE_URL,
  });
}

function buildPromptWithImages(
  systemPrompt: string,
  userPrompt: string,
  analysisImages?: AnalysisImage[]
): string {
  if (!analysisImages || analysisImages.length === 0) {
    return `${systemPrompt}\n\n${userPrompt}`;
  }

  const descriptions = analysisImages
    .map((image, index) => image.description || `Reference image ${index + 1}`)
    .join('\n');

  return `${systemPrompt}\n\n${userPrompt}\n\nAdditional reference images are attached:\n${descriptions}\nUse them to confirm micro-motions, spatial relationships, and timing details.`;
}

// Kimi-specific content part types (video_url is a Moonshot extension)
// Using 'unknown' type to bypass OpenAI SDK type restrictions
type KimiContentPart =
  | { type: 'video_url'; video_url: { url: string } }
  | { type: 'image_url'; image_url: { url: string } }
  | { type: 'text'; text: string };

function buildContentParts(
  videoBase64: string,
  mimeType: string,
  promptText: string,
  analysisImages?: AnalysisImage[]
): KimiContentPart[] {
  const parts: KimiContentPart[] = [];

  // Extract video extension from mimeType (e.g., 'video/mp4' -> 'mp4')
  const videoExtension = mimeType.split('/')[1] || 'mp4';
  const videoUrl = `data:video/${videoExtension};base64,${videoBase64}`;

  // Add video as first part
  parts.push({
    type: 'video_url',
    video_url: { url: videoUrl },
  });

  // Add reference images if any
  if (analysisImages) {
    for (const image of analysisImages) {
      parts.push({
        type: 'image_url',
        image_url: { url: `data:${image.mimeType};base64,${image.base64}` },
      });
    }
  }

  // Add text prompt as last part
  parts.push({
    type: 'text',
    text: promptText,
  });

  return parts;
}

// Analyze video using Kimi K2.5 (non-streaming)
export async function analyzeVideoWithKimi(
  options: AnalyzeVideoWithKimiOptions
): Promise<string> {
  const { videoBase64, mimeType, format, triggerContext, videoMetadata, analysisImages } = options;

  const client = getKimiClient();

  const systemPrompt = buildAnalysisPrompt(format, triggerContext, videoMetadata);
  const userPrompt = buildUserPrompt();
  const promptText = buildPromptWithImages(systemPrompt, userPrompt, analysisImages);

  const contentParts = buildContentParts(videoBase64, mimeType, promptText, analysisImages);

  // Cast content to unknown to bypass OpenAI SDK type restrictions
  // video_url is a Moonshot-specific extension not in OpenAI SDK types
  const response = await client.chat.completions.create({
    model: KIMI_MODEL,
    messages: [
      {
        role: 'user',
        content: contentParts as unknown as OpenAI.Chat.ChatCompletionContentPart[],
      },
    ],
    temperature: KIMI_CONFIG.temperature,
    max_tokens: KIMI_CONFIG.max_tokens,
  });

  const text = response.choices[0]?.message?.content;
  if (!text) {
    throw new Error('Empty response from Kimi');
  }

  return text;
}

// Streaming version for Kimi K2.5
export async function* analyzeVideoWithKimiStream(
  options: AnalyzeVideoWithKimiOptions
): AsyncGenerator<string, void, unknown> {
  const { videoBase64, mimeType, format, triggerContext, videoMetadata, analysisImages } = options;

  const client = getKimiClient();

  const systemPrompt = buildAnalysisPrompt(format, triggerContext, videoMetadata);
  const userPrompt = buildUserPrompt();
  const promptText = buildPromptWithImages(systemPrompt, userPrompt, analysisImages);

  const contentParts = buildContentParts(videoBase64, mimeType, promptText, analysisImages);

  // Cast content to unknown to bypass OpenAI SDK type restrictions
  // video_url is a Moonshot-specific extension not in OpenAI SDK types
  const stream = await client.chat.completions.create({
    model: KIMI_MODEL,
    messages: [
      {
        role: 'user',
        content: contentParts as unknown as OpenAI.Chat.ChatCompletionContentPart[],
      },
    ],
    temperature: KIMI_CONFIG.temperature,
    max_tokens: KIMI_CONFIG.max_tokens,
    stream: true,
  });

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content;
    if (text) {
      yield text;
    }
  }
}
