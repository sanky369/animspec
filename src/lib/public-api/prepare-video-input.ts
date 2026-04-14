import type { AnalyzeSource } from './contracts';
import { prepareAnalysisSource } from './video-source';

type UploadVideoOverride = Parameters<typeof prepareAnalysisSource>[3] extends infer T
  ? T extends { uploadVideo?: infer U }
    ? U
    : never
  : never;

export interface PreparedVideoInputResult {
  fileUri?: string;
  fileMimeType?: string;
  videoBase64?: string;
  mimeType?: string;
  fileName: string;
  fileSize: number;
  recommendedField: 'file_uri' | 'video_base64';
  recommendedMimeField: 'file_mime_type' | 'mime_type';
  notes: string[];
}

export async function prepareVideoInputForMcp(input: {
  source: AnalyzeSource;
  quality?: 'balanced' | 'precise' | 'kimi';
  preferGeminiFileUpload?: boolean;
  uploadVideo?: UploadVideoOverride;
}): Promise<PreparedVideoInputResult> {
  const quality = input.quality ?? 'balanced';
  const geminiApiKey = process.env.GEMINI_API_KEY || undefined;

  const prepared = await prepareAnalysisSource(
    input.source,
    quality,
    geminiApiKey,
    {
      preferGeminiFileUpload: input.preferGeminiFileUpload ?? quality !== 'kimi',
      uploadVideo: input.uploadVideo,
    }
  );

  if (prepared.fileUri && prepared.fileMimeType) {
    return {
      fileUri: prepared.fileUri,
      fileMimeType: prepared.fileMimeType,
      fileName: prepared.videoName,
      fileSize: prepared.fileSize,
      recommendedField: 'file_uri',
      recommendedMimeField: 'file_mime_type',
      notes: [
        'Use the returned file_uri and file_mime_type in analyze_video.',
        'This is the preferred handoff for Gemini-backed analysis and hosted attachment flows.',
      ],
    };
  }

  if (prepared.inlineVideoBase64 && prepared.inlineMimeType) {
    return {
      videoBase64: prepared.inlineVideoBase64,
      mimeType: prepared.inlineMimeType,
      fileName: prepared.videoName,
      fileSize: prepared.fileSize,
      recommendedField: 'video_base64',
      recommendedMimeField: 'mime_type',
      notes: [
        'Use the returned video_base64 and mime_type in analyze_video.',
        'This fallback is smaller and may be less reliable for large hosted uploads.',
      ],
    };
  }

  throw new Error('Failed to prepare a reusable video input.');
}
