import OpenAI from 'openai';
import type { OutputFormat, TriggerContext, VideoMetadata } from '@/types/analysis';
import { buildAnalysisPrompt, buildUserPrompt } from './prompts';

// Kimi K2.5 model configuration
const KIMI_MODEL = 'kimi-k2.5';
const KIMI_BASE_URL = 'https://api.moonshot.ai/v1';

// Config for Kimi K2.5
// Thinking mode (temp=1.0) gives best quality with deep reasoning
// Vercel Pro/Enterprise supports up to 300s timeout
const KIMI_CONFIG = {
  temperature: 1.0,  // Thinking mode requires temp=1.0
  top_p: 0.95,       // Recommended by official Moonshot docs
  max_tokens: 8192,
  // Set to true to use Instant mode (faster, no reasoning traces)
  // Set to false for Thinking mode (slower but higher quality)
  useInstantMode: false,
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

  // IMPORTANT: Per Kimi K2.5 official docs, text should come FIRST, then media
  // See: https://huggingface.co/moonshotai/Kimi-K2.5#chat-completion-with-visual-content
  parts.push({
    type: 'text',
    text: promptText,
  });

  // Extract video extension from mimeType (e.g., 'video/mp4' -> 'mp4')
  const videoExtension = mimeType.split('/')[1] || 'mp4';
  // Format: data:video/mp4;base64,{base64} - NO space after comma
  const videoUrl = `data:video/${videoExtension};base64,${videoBase64}`;

  // Add video after text
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

  return parts;
}

// Analyze video using Kimi K2.5 (non-streaming)
export async function analyzeVideoWithKimi(
  options: AnalyzeVideoWithKimiOptions
): Promise<string> {
  const { videoBase64, mimeType, format, triggerContext, videoMetadata, analysisImages } = options;

  const client = getKimiClient();

  const systemPrompt = buildAnalysisPrompt(format, triggerContext, videoMetadata, 'kimi');
  const userPrompt = buildUserPrompt();
  const promptText = buildPromptWithImages(systemPrompt, userPrompt, analysisImages);

  const contentParts = buildContentParts(videoBase64, mimeType, promptText, analysisImages);

  // Cast to any to support Moonshot-specific extensions not in OpenAI SDK types:
  // - video_url content type
  // - thinking parameter for mode selection
  // Per official docs: https://huggingface.co/moonshotai/Kimi-K2.5#chat-completion
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requestParams: any = {
    model: KIMI_MODEL,
    messages: [
      {
        role: 'user',
        content: contentParts,
      },
    ],
    temperature: KIMI_CONFIG.temperature,
    top_p: KIMI_CONFIG.top_p,
    max_tokens: KIMI_CONFIG.max_tokens,
  };

  // Use Instant mode for faster responses (required for Vercel 60s timeout)
  if (KIMI_CONFIG.useInstantMode) {
    requestParams.thinking = { type: 'disabled' };
  }

  const response = await (client.chat.completions.create as any)(requestParams);

  // In Instant mode: content only
  // In Thinking mode: reasoning_content + content
  const message = response.choices[0]?.message;
  const text = message?.content || message?.reasoning_content;
  
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

  const systemPrompt = buildAnalysisPrompt(format, triggerContext, videoMetadata, 'kimi');
  const userPrompt = buildUserPrompt();
  const promptText = buildPromptWithImages(systemPrompt, userPrompt, analysisImages);

  const contentParts = buildContentParts(videoBase64, mimeType, promptText, analysisImages);

  // Cast to any to support Moonshot-specific extensions not in OpenAI SDK types:
  // - video_url content type  
  // - thinking parameter for mode selection
  // Per official docs: https://huggingface.co/moonshotai/Kimi-K2.5#chat-completion
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requestParams: any = {
    model: KIMI_MODEL,
    messages: [
      {
        role: 'user',
        content: contentParts,
      },
    ],
    temperature: KIMI_CONFIG.temperature,
    top_p: KIMI_CONFIG.top_p,
    max_tokens: KIMI_CONFIG.max_tokens,
    stream: true,
  };

  // Use Instant mode for faster responses (required for Vercel 60s timeout)
  if (KIMI_CONFIG.useInstantMode) {
    requestParams.thinking = { type: 'disabled' };
  }

  const stream = await (client.chat.completions.create as any)(requestParams);

  // In streaming:
  // - Instant mode: delta.content only
  // - Thinking mode: delta.reasoning_content/reasoning + delta.content
  let chunkCount = 0;
  
  for await (const chunk of stream) {
    chunkCount++;
    const delta = chunk.choices[0]?.delta;
    if (!delta) continue;
    
    // Log first few chunks to debug
    if (chunkCount <= 3) {
      console.log(`[Kimi] Chunk ${chunkCount} delta keys:`, Object.keys(delta));
    }
    
    // Try all possible fields
    const text = delta.content || delta.reasoning_content || delta.reasoning;
    if (text) {
      yield text;
    }
  }
  
  console.log(`[Kimi] Stream complete. Total chunks: ${chunkCount}`);
}
