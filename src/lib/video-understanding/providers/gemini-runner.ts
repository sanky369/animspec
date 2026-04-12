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
  disableThinking?: boolean;
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

export function resolveKimiTemperature(disableThinking: boolean = false): number {
  return disableThinking ? 1.0 : 0.6;
}

const JSON_FALLBACK_MODEL = 'gemini-3-flash-preview';

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
    return generateJsonWithFallbacks(options, {
      preferStructuredOutput: true,
      disableThinkingForText: false,
      forceModel: JSON_FALLBACK_MODEL,
    });
  }

  return generateJsonWithFallbacks(options, {
    preferStructuredOutput: true,
    disableThinkingForText: false,
    forceModel: undefined,
  });
}

async function generateTextWithKimi(options: GenerateBaseOptions): Promise<string> {
  if (!options.video.inlineBase64) {
    throw new Error('Kimi deep analysis requires inline video data. Uploaded file references are not supported for Kimi deep runs.');
  }

  const client = createKimiClient();
  let lastError: unknown = null;

  for (const temperature of getKimiTemperatureCandidates(options)) {
    try {
      const response = await client.chat.completions.create({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(buildKimiRequest({ ...options, temperature }) as any),
      } as never);

      const message = response.choices[0]?.message;
      const text = (message as { content?: string; reasoning_content?: string } | undefined)?.content
        || (message as { content?: string; reasoning_content?: string } | undefined)?.reasoning_content;
      if (!text) {
        throw new Error('Empty response from Kimi');
      }
      return text;
    } catch (error) {
      lastError = error;
      if (!isKimiTemperatureError(error)) {
        throw error;
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Kimi request failed');
}

async function streamTextWithKimi(
  options: GenerateBaseOptions,
  handlers: { onChunk?: (text: string) => Promise<void> | void; onThought?: (text: string) => Promise<void> | void }
): Promise<string> {
  if (!options.video.inlineBase64) {
    throw new Error('Kimi deep analysis requires inline video data. Uploaded file references are not supported for Kimi deep runs.');
  }

  const client = createKimiClient();
  let stream: AsyncIterable<unknown> | null = null;
  let lastError: unknown = null;

  for (const temperature of getKimiTemperatureCandidates(options)) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      stream = await (client.chat.completions.create as any)({
        ...buildKimiRequest({ ...options, temperature }),
        stream: true,
      });
      break;
    } catch (error) {
      lastError = error;
      if (!isKimiTemperatureError(error)) {
        throw error;
      }
    }
  }

  if (!stream) {
    throw lastError instanceof Error ? lastError : new Error('Kimi stream request failed');
  }

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
  const request = {
    model: options.model,
    messages: [
      {
        role: 'user',
        content: buildKimiParts(options.video, options.artifacts, options.prompt),
      },
    ],
    temperature: options.temperature ?? resolveKimiTemperature(options.disableThinking),
    top_p: 0.95,
    max_tokens: options.maxOutputTokens ?? 8192,
  };

  if (options.disableThinking) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (request as any).thinking = { type: 'disabled' };
  }

  return request;
}

function getKimiTemperatureCandidates(options: GenerateBaseOptions): number[] {
  const preferred = options.temperature ?? resolveKimiTemperature(options.disableThinking);
  const alternate = preferred === 1.0 ? 0.6 : 1.0;
  return [...new Set([preferred, alternate])];
}

function isKimiTemperatureError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /invalid temperature/i.test(message) && /only (0\.6|1)/i.test(message);
}

function parseAndValidateJson<T>(text: string, validate: (value: unknown) => T): T {
  const parsed = parseJsonFromText<unknown>(text);
  if (parsed === null) {
    throw new Error('Model returned invalid JSON payload');
  }
  return validate(parsed);
}

function buildJsonOnlyPrompt(prompt: string, schema: unknown): string {
  return `${prompt}

Return valid JSON only.
Do not return null.
Do not wrap the response in markdown fences.
Do not include commentary before or after the JSON.

Required JSON schema:
${JSON.stringify(schema, null, 2)}`;
}

function shouldRetryStructuredJson(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return /invalid json payload/i.test(error.message)
    || /expected object/i.test(error.message)
    || /received null/i.test(error.message)
    || /invalid input/i.test(error.message);
}

async function generateJsonWithFallbacks<T>(
  options: GenerateJsonOptions<T>,
  behavior: {
    preferStructuredOutput: boolean;
    disableThinkingForText: boolean;
    forceModel?: string;
  }
): Promise<T> {
  const attempts: Array<() => Promise<T>> = [];
  const seen = new Set<string>();
  const errors: string[] = [];
  const primaryModel = behavior.forceModel ?? options.model;

  const addAttempt = (key: string, fn: () => Promise<T>) => {
    if (seen.has(key)) return;
    seen.add(key);
    attempts.push(fn);
  };

  if (behavior.preferStructuredOutput && !isKimiModel(primaryModel)) {
    addAttempt(`${primaryModel}:structured`, () => generateStructuredJsonWithGeminiModel(options, primaryModel));
  }

  addAttempt(`${primaryModel}:text-json`, () =>
    generateJsonFromTextAttempt(options, primaryModel, behavior.disableThinkingForText)
  );

  if (primaryModel !== JSON_FALLBACK_MODEL) {
    addAttempt(`${JSON_FALLBACK_MODEL}:structured`, () =>
      generateStructuredJsonWithGeminiModel(options, JSON_FALLBACK_MODEL)
    );
    addAttempt(`${JSON_FALLBACK_MODEL}:text-json`, () =>
      generateJsonFromTextAttempt(options, JSON_FALLBACK_MODEL, false)
    );
  }

  for (const attempt of attempts) {
    try {
      return await attempt();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown JSON generation failure';
      errors.push(message);
      if (!shouldRetryStructuredJson(error)) {
        throw error instanceof Error ? error : new Error(message);
      }
    }
  }

  throw new Error(`Unable to generate valid JSON after ${errors.length} attempts. ${errors.join(' | ')}`);
}

async function generateStructuredJsonWithGeminiModel<T>(
  options: GenerateJsonOptions<T>,
  model: string
): Promise<T> {
  try {
    const client = createGeminiClient(options.apiKey);
    const response = await client.models.generateContent({
      model,
      contents: [{ role: 'user', parts: buildGeminiParts(options.video, options.artifacts, options.prompt) }],
      config: {
        maxOutputTokens: options.maxOutputTokens ?? 4096,
        temperature: options.temperature ?? 0.1,
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
        responseMimeType: 'application/json',
        responseJsonSchema: options.schema,
      },
    });
    return parseAndValidateJson(response.text || '', options.validate);
  } catch (error) {
    throw normalizeGeminiError(error);
  }
}

async function generateJsonFromTextAttempt<T>(
  options: GenerateJsonOptions<T>,
  model: string,
  disableThinking: boolean
): Promise<T> {
  const text = await generateText({
    ...options,
    model,
      prompt: buildJsonOnlyPrompt(options.prompt, options.schema),
      temperature: isKimiModel(model) ? resolveKimiTemperature(disableThinking) : 0.1,
      disableThinking,
  });
  return parseAndValidateJson(text, options.validate);
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
