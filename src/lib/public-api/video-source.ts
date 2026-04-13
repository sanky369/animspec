import path from 'node:path';
import { uploadVideoToGemini } from '@/lib/storage/gemini-files';
import { fetchAsBase64 } from '@/lib/storage/r2';
import type { AnalyzeSource } from './contracts';
import {
  ACCEPTED_VIDEO_EXTENSIONS,
  ACCEPTED_VIDEO_MIME_TYPES,
  GEMINI_INLINE_SIZE_LIMIT,
  MAX_VIDEO_SIZE_BYTES,
} from './metadata';

export interface PreparedAnalysisSource {
  inlineVideoBase64?: string;
  inlineMimeType?: string;
  fileUri?: string;
  fileMimeType?: string;
  fileSize: number;
  videoName: string;
}

interface ResolvedBinaryVideo {
  buffer: Buffer;
  mimeType: string;
  sizeBytes: number;
  fileName: string;
}

function decodeDataUri(dataUri: string, fallbackFileName?: string): ResolvedBinaryVideo {
  const match = dataUri.match(/^data:([^;,]+)?(;base64)?,([\s\S]*)$/);
  if (!match) {
    throw new Error('Invalid data URI');
  }

  const mimeType = assertAllowedMimeType(match[1] || 'video/mp4');
  const isBase64 = Boolean(match[2]);
  const payload = match[3] || '';
  const buffer = Buffer.from(
    isBase64 ? payload : decodeURIComponent(payload),
    isBase64 ? 'base64' : 'utf8',
  );

  if (buffer.byteLength > MAX_VIDEO_SIZE_BYTES) {
    throw new Error(`Video is too large. Maximum supported size is ${MAX_VIDEO_SIZE_BYTES / (1024 * 1024)}MB`);
  }

  return {
    buffer,
    mimeType,
    sizeBytes: buffer.byteLength,
    fileName: fallbackFileName || 'attached-video.mp4',
  };
}

function assertAllowedMimeType(mimeType: string): string {
  if (!(ACCEPTED_VIDEO_MIME_TYPES as readonly string[]).includes(mimeType)) {
    throw new Error(
      `Unsupported video type: ${mimeType}. Allowed: ${ACCEPTED_VIDEO_MIME_TYPES.join(', ')}`
    );
  }
  return mimeType;
}

function inferMimeType(fileName: string): string | null {
  const extension = path.extname(fileName).toLowerCase();
  return ACCEPTED_VIDEO_EXTENSIONS[extension] ?? null;
}

function getFileNameFromUrl(value: string): string {
  try {
    const url = new URL(value);
    const name = path.basename(url.pathname);
    return name || 'remote-video.mp4';
  } catch {
    return 'remote-video.mp4';
  }
}

async function fetchRemoteVideo(
  videoUrl: string,
  fallbackMimeType?: string,
  fallbackFileName?: string
): Promise<ResolvedBinaryVideo> {
  if (videoUrl.startsWith('data:')) {
    return decodeDataUri(videoUrl, fallbackFileName);
  }

  const url = new URL(videoUrl);
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('videoUrl must use http or https');
  }

  const response = await fetch(videoUrl, {
    signal: AbortSignal.timeout(60_000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch video URL: ${response.status}`);
  }

  const contentLength = Number(response.headers.get('content-length') ?? '0');
  if (contentLength > MAX_VIDEO_SIZE_BYTES) {
    throw new Error(`Video is too large. Maximum supported size is ${MAX_VIDEO_SIZE_BYTES / (1024 * 1024)}MB`);
  }

  const fileName = fallbackFileName || getFileNameFromUrl(videoUrl);
  const mimeType = assertAllowedMimeType(
    response.headers.get('content-type')?.split(';')[0]?.trim()
      || fallbackMimeType
      || inferMimeType(fileName)
      || 'video/mp4'
  );

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  if (buffer.byteLength > MAX_VIDEO_SIZE_BYTES) {
    throw new Error(`Video is too large. Maximum supported size is ${MAX_VIDEO_SIZE_BYTES / (1024 * 1024)}MB`);
  }

  return {
    buffer,
    mimeType,
    sizeBytes: buffer.byteLength,
    fileName,
  };
}

async function fetchR2Video(
  objectKey: string,
  fallbackMimeType?: string,
  fallbackFileName?: string
): Promise<ResolvedBinaryVideo> {
  const { base64, contentType } = await fetchAsBase64(objectKey);
  const buffer = Buffer.from(base64, 'base64');
  if (buffer.byteLength > MAX_VIDEO_SIZE_BYTES) {
    throw new Error(`Video is too large. Maximum supported size is ${MAX_VIDEO_SIZE_BYTES / (1024 * 1024)}MB`);
  }

  const fileName = fallbackFileName || path.basename(objectKey) || 'uploaded-video.mp4';
  const mimeType = assertAllowedMimeType(
    fallbackMimeType || contentType.split(';')[0]?.trim() || inferMimeType(fileName) || 'video/mp4'
  );

  return {
    buffer,
    mimeType,
    sizeBytes: buffer.byteLength,
    fileName,
  };
}

async function materializeSource(source: AnalyzeSource): Promise<ResolvedBinaryVideo | null> {
  switch (source.kind) {
    case 'inline_base64': {
      const mimeType = assertAllowedMimeType(source.mimeType);
      const buffer = Buffer.from(source.videoBase64, 'base64');
      if (buffer.byteLength > MAX_VIDEO_SIZE_BYTES) {
        throw new Error(`Video is too large. Maximum supported size is ${MAX_VIDEO_SIZE_BYTES / (1024 * 1024)}MB`);
      }
      return {
        buffer,
        mimeType,
        sizeBytes: buffer.byteLength,
        fileName: source.fileName || 'inline-video.mp4',
      };
    }
    case 'video_uri':
      return fetchRemoteVideo(source.videoUri, source.mimeType, source.fileName);
    case 'video_url':
      return fetchRemoteVideo(source.videoUrl, source.mimeType, source.fileName);
    case 'r2_object':
      return fetchR2Video(source.r2ObjectKey, source.r2MimeType, source.fileName);
    case 'gemini_file':
      return null;
  }
}

export async function prepareAnalysisSource(
  source: AnalyzeSource,
  quality: 'balanced' | 'precise' | 'kimi',
  geminiApiKey?: string,
  options?: {
    preferGeminiFileUpload?: boolean;
    uploadVideo?: typeof uploadVideoToGemini;
  }
): Promise<PreparedAnalysisSource> {
  if (source.kind === 'gemini_file') {
    return {
      fileUri: source.fileUri,
      fileMimeType: assertAllowedMimeType(source.fileMimeType),
      fileSize: 0,
      videoName: source.fileName || 'uploaded-video',
    };
  }

  const resolved = await materializeSource(source);
  if (!resolved) {
    throw new Error('Failed to materialize video source');
  }

  const shouldUseGeminiFiles =
    quality !== 'kimi'
    && (options?.preferGeminiFileUpload || resolved.sizeBytes > GEMINI_INLINE_SIZE_LIMIT);

  if (shouldUseGeminiFiles) {
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY is required to upload large Gemini files');
    }
    const file = new File([new Uint8Array(resolved.buffer)], resolved.fileName, { type: resolved.mimeType });
    const uploaded = await (options?.uploadVideo ?? uploadVideoToGemini)(file, geminiApiKey);
    return {
      fileUri: uploaded.uri,
      fileMimeType: uploaded.mimeType,
      fileSize: resolved.sizeBytes,
      videoName: resolved.fileName,
    };
  }

  return {
    inlineVideoBase64: resolved.buffer.toString('base64'),
    inlineMimeType: resolved.mimeType,
    fileSize: resolved.sizeBytes,
    videoName: resolved.fileName,
  };
}
