import OpenAI from 'openai';
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

type KimiContentPart =
  | { type: 'video_url'; video_url: { url: string } }
  | { type: 'image_url'; image_url: { url: string } }
  | { type: 'text'; text: string };

function isKimiModel(model: string): boolean {
  return model.startsWith('kimi');
}

export function createGeminiClient(apiKey: string): GoogleGenAI {
  return new GoogleGenAI({ apiKey });
}

function createKimiClient(): OpenAI {
  const apiKey = process.env.MOONSHOT_API_KEY;
  if (!apiKey) {
    throw new Error('MOONSHOT_API_KEY environment variable is not set');
  }

  return new OpenAI({
    apiKey,
    baseURL: 'https://api.moonshot.ai/v1',
  });
}

export async function generateText(options: GenerateBaseOptions): Promise<string> {
  if (isKimiModel(options.model)) {
    return generateTextWithKimi(options);
  }

  try {
    const client = createGeminiClient(options.apiKey);
    const response = await client.models.generateContent({
      model: options.model,
      contents: [{ role: 'user', parts: buildGeminiParts(options.video, options.artifacts, options.prompt) }],
      config: {
        maxOutputTokens: options.maxOutputTokens ?? 8192,
        temperature: options.temperature ?? 0.2,
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
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
  if (isKimiModel(options.model)) {
    return streamTextWithKimi(options, handlers);
  }

  try {
    const client = createGeminiClient(options.apiKey);
    const response = await client.models.generateContentStream({
      model: options.model,
      contents: [{ role: 'user', parts: buildGeminiParts(options.video, options.artifacts, options.prompt) }],
      config: {
        maxOutputTokens: options.maxOutputTokens ?? 8192,
        temperature: options.temperature ?? 0.2,
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
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
  if (isKimiModel(options.model)) {
    const jsonPrompt = `${options.prompt}\n\nReturn valid JSON only. No markdown fences. No prose before or after the JSON.`;
    const text = await generateTextWithKimi({
      ...options,
      prompt: jsonPrompt,
      temperature: 0.1,
    });
    const parsed = parseJsonFromText<unknown>(text);
    return options.validate(parsed);
  }

  try {
    const client = createGeminiClient(options.apiKey);
    const response = await client.models.generateContent({
      model: options.model,
      contents: [{ role: 'user', parts: buildGeminiParts(options.video, options.artifacts, options.prompt) }],
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

async function generateTextWithKimi(options: GenerateBaseOptions): Promise<string> {
  if (!options.video.inlineBase64) {
    throw new Error('Kimi deep analysis requires inline video data. Uploaded file references are not supported for Kimi deep runs.');
  }

  const client = createKimiClient();
  const response = await client.chat.completions.create({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(buildKimiRequest(options) as any),
  } as never);

  const message = response.choices[0]?.message;
  const text = (message as { content?: string; reasoning_content?: string } | undefined)?.content
    || (message as { content?: string; reasoning_content?: string } | undefined)?.reasoning_content;
  if (!text) {
    throw new Error('Empty response from Kimi');
  }
  return text;
}

async function streamTextWithKimi(
  options: GenerateBaseOptions,
  handlers: { onChunk?: (text: string) => Promise<void> | void; onThought?: (text: string) => Promise<void> | void }
): Promise<string> {
  if (!options.video.inlineBase64) {
    throw new Error('Kimi deep analysis requires inline video data. Uploaded file references are not supported for Kimi deep runs.');
  }

  const client = createKimiClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stream = await (client.chat.completions.create as any)({
    ...buildKimiRequest(options),
    stream: true,
  });

  let full = '';
  for await (const chunk of stream) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const delta = (chunk as any).choices?.[0]?.delta;
    if (!delta) continue;

    const thought = delta.reasoning_content || delta.reasoning;
    const text = delta.content;
    if (thought) {
      await handlers.onThought?.(thought);
    }
    if (text) {
      full += text;
      await handlers.onChunk?.(text);
    }
  }

  return full;
}

function buildKimiRequest(options: GenerateBaseOptions) {
  return {
    model: options.model,
    messages: [
      {
        role: 'user',
        content: buildKimiParts(options.video, options.artifacts, options.prompt),
      },
    ],
    temperature: options.temperature ?? 1.0,
    top_p: 0.95,
    max_tokens: options.maxOutputTokens ?? 8192,
  };
}

function buildGeminiParts(video: VideoSourceRef, artifacts: SharedArtifactBundle, prompt: string) {
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

function buildKimiParts(video: VideoSourceRef, artifacts: SharedArtifactBundle, prompt: string): KimiContentPart[] {
  if (!video.inlineBase64) {
    throw new Error('Missing inlineBase64 video data for Kimi.');
  }

  const parts: KimiContentPart[] = [
    { type: 'text', text: prompt },
    {
      type: 'video_url',
      video_url: { url: `data:${video.mimeType};base64,${video.inlineBase64}` },
    },
  ];

  const preview = artifacts.keyframes[0]?.previewBase64;
  if (preview) {
    parts.push({
      type: 'image_url',
      image_url: { url: `data:image/jpeg;base64,${preview}` },
    });
  }

  return parts;
}
