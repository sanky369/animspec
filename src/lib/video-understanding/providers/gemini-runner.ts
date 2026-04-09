
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import type { VideoSourceRef, SharedArtifactBundle } from '../artifacts';
import { normalizeGeminiError } from '@/lib/ai/gemini-utils';
import { parseJsonFromText } from '../utils/json';

interface GenerateBaseOptions {
  apiKey: string;
  model: string;
  video: VideoSourceRef;
  artifacts: SharedArtifactBundle;
  prompt: string;
  maxOutputTokens?: number;
  temperature?: number;
}

interface GenerateJsonOptions<T> extends GenerateBaseOptions {
  schema: unknown;
  validate: (value: unknown) => T;
}

export function createGeminiClient(apiKey: string): GoogleGenAI {
  return new GoogleGenAI({ apiKey });
}

export async function generateText(options: GenerateBaseOptions): Promise<string> {
  try {
    const client = createGeminiClient(options.apiKey);
    const response = await client.models.generateContent({
      model: options.model,
      contents: [{ role: 'user', parts: buildParts(options.video, options.artifacts, options.prompt) }],
      config: {
        maxOutputTokens: options.maxOutputTokens ?? 8192,
        temperature: options.temperature ?? 0.2,
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
      },
    });
    return response.text || '';
  } catch (error) {
    throw normalizeGeminiError(error);
  }
}

export async function streamText(
  options: GenerateBaseOptions,
  handlers: { onChunk?: (text: string) => Promise<void> | void; onThought?: (text: string) => Promise<void> | void } = {}
): Promise<string> {
  try {
    const client = createGeminiClient(options.apiKey);
    const response = await client.models.generateContentStream({
      model: options.model,
      contents: [{ role: 'user', parts: buildParts(options.video, options.artifacts, options.prompt) }],
      config: {
        maxOutputTokens: options.maxOutputTokens ?? 8192,
        temperature: options.temperature ?? 0.2,
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
      },
    });

    let full = '';
    for await (const chunk of response) {
      const candidate = (chunk as { candidates?: Array<{ content?: { parts?: Array<{ text?: string; thought?: boolean }> } }> }).candidates?.[0];
      const parts = candidate?.content?.parts ?? [];
      if (parts.length > 0) {
        for (const part of parts) {
          if (part.text && part.thought) {
            await handlers.onThought?.(part.text);
          } else if (part.text) {
            full += part.text;
            await handlers.onChunk?.(part.text);
          }
        }
      } else if (chunk.text) {
        full += chunk.text;
        await handlers.onChunk?.(chunk.text);
      }
    }
    return full;
  } catch (error) {
    throw normalizeGeminiError(error);
  }
}

export async function generateJson<T>(options: GenerateJsonOptions<T>): Promise<T> {
  try {
    const client = createGeminiClient(options.apiKey);
    const response = await client.models.generateContent({
      model: options.model,
      contents: [{ role: 'user', parts: buildParts(options.video, options.artifacts, options.prompt) }],
      config: {
        maxOutputTokens: options.maxOutputTokens ?? 4096,
        temperature: options.temperature ?? 0.1,
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
        responseMimeType: 'application/json',
        responseJsonSchema: options.schema,
      },
    });
    const parsed = parseJsonFromText<unknown>(response.text || '');
    return options.validate(parsed);
  } catch (error) {
    throw normalizeGeminiError(error);
  }
}

function buildParts(video: VideoSourceRef, artifacts: SharedArtifactBundle, prompt: string) {
  const parts: Array<{ fileData?: { mimeType: string; fileUri: string }; inlineData?: { mimeType: string; data: string }; text?: string }> = [];
  if (video.sourceType === 'gemini_file' && video.uri) {
    parts.push({ fileData: { mimeType: video.mimeType, fileUri: video.uri } });
  } else if (video.inlineBase64) {
    parts.push({ inlineData: { mimeType: video.mimeType, data: video.inlineBase64 } });
  }
  const preview = artifacts.keyframes[0]?.previewBase64;
  if (preview) {
    parts.push({ inlineData: { mimeType: 'image/jpeg', data: preview } });
  }
  parts.push({ text: prompt });
  return parts;
}
