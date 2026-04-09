import type { QualityLevel } from '@/types/analysis';

/**
 * Keep Gemini inline requests comfortably below upstream payload limits.
 * Base64 expansion + prompts + optional frame grids can make "small" videos fail.
 */
export const GEMINI_INLINE_SAFE_LIMIT = 2 * 1024 * 1024;

interface GeminiUploadStrategyOptions {
  quality: QualityLevel;
  fileSize: number;
  agenticMode?: boolean;
  hasAnalysisImages?: boolean;
}

export function shouldUseGeminiFilesUpload({
  quality,
  fileSize,
  agenticMode = false,
  hasAnalysisImages = false,
}: GeminiUploadStrategyOptions): boolean {
  if (quality === 'kimi') return false;

  return agenticMode || hasAnalysisImages || fileSize > GEMINI_INLINE_SAFE_LIMIT;
}

export function normalizeGeminiError(error: unknown): Error {
  const message = error instanceof Error ? error.message : 'Gemini request failed';

  if (
    /Request Entity Too Large/i.test(message)
    || (/not valid JSON/i.test(message) && /Request En/i.test(message))
  ) {
    return new Error(
      'Gemini rejected the inline upload size. The app now routes these analyses through Gemini Files. Please try again.'
    );
  }

  if (/Empty response from Gemini/i.test(message)) {
    return new Error('Gemini returned an empty response. Please try again.');
  }

  return error instanceof Error ? error : new Error(message);
}
