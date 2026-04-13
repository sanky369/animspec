import { z } from 'zod';
import {
  OUTPUT_FORMATS,
  QUALITY_LEVELS,
  TRIGGER_CONTEXTS,
  type OutputFormat,
  type QualityLevel,
  type TriggerContext,
  type VideoMetadata,
} from '@/types/analysis';
import { isOutputFormat, isQualityLevel, isTriggerContext } from './metadata';

export type AnalyzeSource =
  | { kind: 'inline_base64'; videoBase64: string; mimeType: string; fileName?: string }
  | { kind: 'video_uri'; videoUri: string; mimeType?: string; fileName?: string }
  | { kind: 'video_url'; videoUrl: string; mimeType?: string; fileName?: string }
  | { kind: 'gemini_file'; fileUri: string; fileMimeType: string; fileName?: string }
  | { kind: 'r2_object'; r2ObjectKey: string; r2MimeType?: string; fileName?: string };

export interface PublicAnalyzeRequest {
  format: OutputFormat;
  quality: QualityLevel;
  triggerContext: TriggerContext;
  deepAnalysis: boolean;
  source: AnalyzeSource;
  metadata: VideoMetadata | null;
}

const metadataSchema = z.object({
  duration: z.coerce.number().nonnegative().optional(),
  width: z.coerce.number().nonnegative().optional(),
  height: z.coerce.number().nonnegative().optional(),
  size: z.coerce.number().nonnegative().optional(),
  mimeType: z.string().optional(),
  name: z.string().optional(),
}).partial();

function pickString(
  body: Record<string, unknown>,
  key: string
): string | undefined {
  const value = body[key];
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

function normalizeMetadata(
  metadataValue: unknown,
  fallback: { mimeType?: string; name?: string }
): VideoMetadata | null {
  if (metadataValue === undefined) {
    return null;
  }

  const parsed = metadataSchema.safeParse(metadataValue);
  if (!parsed.success) {
    throw new Error('Invalid metadata payload');
  }

  const metadata = parsed.data;
  return {
    duration: metadata.duration ?? 0,
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
    size: metadata.size ?? 0,
    mimeType: metadata.mimeType || fallback.mimeType || '',
    name: metadata.name || fallback.name || '',
  };
}

export function parsePublicAnalyzeRequest(body: unknown): PublicAnalyzeRequest {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new Error('Request body must be a JSON object');
  }

  const record = body as Record<string, unknown>;
  const format = pickString(record, 'format');
  if (!format || !isOutputFormat(format)) {
    throw new Error(`Invalid format. Valid values: ${OUTPUT_FORMATS.join(', ')}`);
  }

  const qualityValue = pickString(record, 'quality') ?? 'balanced';
  if (!isQualityLevel(qualityValue)) {
    throw new Error(`Invalid quality. Valid values: ${QUALITY_LEVELS.join(', ')}`);
  }

  const triggerValue = pickString(record, 'trigger')
    ?? pickString(record, 'triggerContext')
    ?? null;
  if (triggerValue !== null && !isTriggerContext(triggerValue)) {
    throw new Error(`Invalid trigger. Valid values: ${TRIGGER_CONTEXTS.join(', ')}`);
  }

  const deepAnalysis = Boolean(record.deepAnalysis ?? record.agenticMode ?? false);

  const videoBase64 = pickString(record, 'videoBase64');
  const mimeType = pickString(record, 'mimeType');
  const videoUri = pickString(record, 'videoUri');
  const videoUrl = pickString(record, 'videoUrl');
  const fileUri = pickString(record, 'fileUri');
  const fileMimeType = pickString(record, 'fileMimeType');
  const r2ObjectKey = pickString(record, 'r2ObjectKey');
  const r2MimeType = pickString(record, 'r2MimeType');
  const fileName = pickString(record, 'fileName');

  const sources: AnalyzeSource[] = [];

  if (videoBase64) {
    if (!mimeType) {
      throw new Error('videoBase64 and mimeType are required together');
    }
    sources.push({ kind: 'inline_base64', videoBase64, mimeType, fileName });
  }

  if (videoUri) {
    sources.push({ kind: 'video_uri', videoUri, mimeType, fileName });
  }

  if (videoUrl) {
    sources.push({ kind: 'video_url', videoUrl, mimeType, fileName });
  }

  if (fileUri || fileMimeType) {
    if (!fileUri || !fileMimeType) {
      throw new Error('fileUri and fileMimeType are required together');
    }
    sources.push({ kind: 'gemini_file', fileUri, fileMimeType, fileName });
  }

  if (r2ObjectKey) {
    sources.push({ kind: 'r2_object', r2ObjectKey, r2MimeType, fileName });
  }

  if (sources.length === 0) {
    throw new Error('Provide one source: videoBase64, videoUri, videoUrl, fileUri, or r2ObjectKey');
  }

  if (sources.length > 1) {
    throw new Error('Provide exactly one video source per request');
  }

  const source = sources[0];
  const metadata = normalizeMetadata(record.metadata, {
    mimeType: source.kind === 'gemini_file'
      ? source.fileMimeType
      : source.kind === 'inline_base64'
        ? source.mimeType
        : source.kind === 'video_uri'
          ? source.mimeType
          : source.kind === 'r2_object'
            ? source.r2MimeType
            : source.mimeType,
    name: source.fileName,
  });

  return {
    format,
    quality: qualityValue,
    triggerContext: triggerValue,
    deepAnalysis,
    source,
    metadata,
  };
}
