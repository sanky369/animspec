import { GoogleGenAI } from '@google/genai';
import type { OutputFormat, QualityLevel, TriggerContext, VideoMetadata } from '@/types/analysis';
import { buildAnalysisPrompt, buildUserPrompt } from './prompts';

// Model mapping for quality levels
const QUALITY_TO_MODEL: Record<QualityLevel, string> = {
  fast: 'gemini-2.5-flash',
  balanced: 'gemini-3-flash-preview',
  precise: 'gemini-3-pro-preview',
};

// Inline base64 size limit (20MB)
const INLINE_SIZE_LIMIT = 20 * 1024 * 1024;

// Config for each quality level
// Gemini 3 models support thinking mode for deeper reasoning
const QUALITY_TO_CONFIG: Record<QualityLevel, object> = {
  fast: {
    maxOutputTokens: 3072,
    temperature: 0.4,
  },
  balanced: {
    maxOutputTokens: 8192,
    temperature: 0.2,
    thinkingConfig: {
      thinkingLevel: 'high',
    },
  },
  precise: {
    maxOutputTokens: 16384,
    temperature: 0.1,
    thinkingConfig: {
      thinkingLevel: 'high',
    },
  },
};

export interface AnalysisImage {
  base64: string;
  mimeType: string;
  description?: string;
}

export interface AnalyzeVideoOptions {
  videoBase64: string;
  mimeType: string;
  format: OutputFormat;
  quality: QualityLevel;
  triggerContext: TriggerContext;
  videoMetadata?: VideoMetadata | null;
  fileSize?: number;
  analysisImages?: AnalysisImage[];
}

export interface AnalyzeVideoWithFileOptions {
  fileUri: string;
  fileMimeType: string;
  format: OutputFormat;
  quality: QualityLevel;
  triggerContext: TriggerContext;
  videoMetadata?: VideoMetadata | null;
  analysisImages?: AnalysisImage[];
}

// Analyze video using inline base64 (for files < 20MB)
export async function analyzeVideoWithGemini(
  options: AnalyzeVideoOptions
): Promise<string> {
  const { videoBase64, mimeType, format, quality, triggerContext, videoMetadata, analysisImages } = options;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }

  const client = new GoogleGenAI({ apiKey });

  const model = QUALITY_TO_MODEL[quality];
  const systemPrompt = buildAnalysisPrompt(format, triggerContext, videoMetadata);
  const userPrompt = buildUserPrompt();
  const promptText = buildPromptWithImages(systemPrompt, userPrompt, analysisImages);
  const modelConfig = QUALITY_TO_CONFIG[quality];

  try {
    const response = await client.models.generateContent({
      model,
      contents: [
        {
          role: 'user',
          parts: buildParts(
            {
              inlineData: {
                mimeType,
                data: videoBase64,
              },
            },
            promptText,
            analysisImages
          ),
        },
      ],
      config: modelConfig,
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from Gemini');
    }

    return text;
  } catch (error) {
    // Try fallback model if primary fails
    if (quality === 'fast') {
      console.warn('Primary model failed, trying fallback...');
      return analyzeVideoWithGemini({
        ...options,
        quality: 'balanced',
      });
    }
    throw error;
  }
}

// Analyze video using Gemini Files API (for larger files)
export async function analyzeVideoWithGeminiFile(
  options: AnalyzeVideoWithFileOptions
): Promise<string> {
  const { fileUri, fileMimeType, format, quality, triggerContext, videoMetadata, analysisImages } = options;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }

  const client = new GoogleGenAI({ apiKey });

  const model = QUALITY_TO_MODEL[quality];
  const systemPrompt = buildAnalysisPrompt(format, triggerContext, videoMetadata);
  const userPrompt = buildUserPrompt();
  const promptText = buildPromptWithImages(systemPrompt, userPrompt, analysisImages);
  const modelConfig = QUALITY_TO_CONFIG[quality];

  const response = await client.models.generateContent({
    model,
    contents: [
      {
        role: 'user',
        parts: buildParts(
          {
            fileData: {
              mimeType: fileMimeType,
              fileUri,
            },
          },
          promptText,
          analysisImages
        ),
      },
    ],
    config: modelConfig,
  });

  const text = response.text;
  if (!text) {
    throw new Error('Empty response from Gemini');
  }

  return text;
}

// Streaming version for inline base64
export async function* analyzeVideoWithGeminiStream(
  options: AnalyzeVideoOptions
): AsyncGenerator<string, void, unknown> {
  const { videoBase64, mimeType, format, quality, triggerContext, videoMetadata, analysisImages } = options;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }

  const client = new GoogleGenAI({ apiKey });

  const model = QUALITY_TO_MODEL[quality];
  const systemPrompt = buildAnalysisPrompt(format, triggerContext, videoMetadata);
  const userPrompt = buildUserPrompt();
  const promptText = buildPromptWithImages(systemPrompt, userPrompt, analysisImages);
  const modelConfig = QUALITY_TO_CONFIG[quality];

  const response = await client.models.generateContentStream({
    model,
    contents: [
      {
        role: 'user',
        parts: buildParts(
          {
            inlineData: {
              mimeType,
              data: videoBase64,
            },
          },
          promptText,
          analysisImages
        ),
      },
    ],
    config: modelConfig,
  });

  for await (const chunk of response) {
    const text = chunk.text;
    if (text) {
      yield text;
    }
  }
}

// Streaming version using Gemini Files API
export async function* analyzeVideoWithGeminiFileStream(
  options: AnalyzeVideoWithFileOptions
): AsyncGenerator<string, void, unknown> {
  const { fileUri, fileMimeType, format, quality, triggerContext, videoMetadata, analysisImages } = options;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }

  const client = new GoogleGenAI({ apiKey });

  const model = QUALITY_TO_MODEL[quality];
  const systemPrompt = buildAnalysisPrompt(format, triggerContext, videoMetadata);
  const userPrompt = buildUserPrompt();
  const promptText = buildPromptWithImages(systemPrompt, userPrompt, analysisImages);
  const modelConfig = QUALITY_TO_CONFIG[quality];

  const response = await client.models.generateContentStream({
    model,
    contents: [
      {
        role: 'user',
        parts: buildParts(
          {
            fileData: {
              mimeType: fileMimeType,
              fileUri,
            },
          },
          promptText,
          analysisImages
        ),
      },
    ],
    config: modelConfig,
  });

  for await (const chunk of response) {
    const text = chunk.text;
    if (text) {
      yield text;
    }
  }
}

// Helper to determine which method to use
export function shouldUseFilesAPI(fileSize: number): boolean {
  return fileSize > INLINE_SIZE_LIMIT;
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

function buildParts(
  videoPart: { inlineData?: { mimeType: string; data: string }; fileData?: { mimeType: string; fileUri: string } },
  promptText: string,
  analysisImages?: AnalysisImage[]
) {
  const parts: Array<{ inlineData?: { mimeType: string; data: string }; fileData?: { mimeType: string; fileUri: string }; text?: string }> = [
    videoPart,
  ];

  if (analysisImages) {
    for (const image of analysisImages) {
      parts.push({
        inlineData: {
          mimeType: image.mimeType,
          data: image.base64,
        },
      });
    }
  }

  parts.push({ text: promptText });
  return parts;
}
