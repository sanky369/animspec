import type { AnalyzeSource } from '@/lib/public-api/contracts';

type McpAnalyzeSource = Extract<
  AnalyzeSource,
  { kind: 'inline_base64' } | { kind: 'video_uri' } | { kind: 'video_url' }
>;

export interface McpHostVideoFile {
  download_url?: string;
  file_id?: string;
  mime_type?: string;
  name?: string;
}

export interface McpVideoInputArgs {
  video_file?: McpHostVideoFile;
  video_uri?: string;
  video_url?: string;
  video_base64?: string;
  mime_type?: string;
  file_name?: string;
}

export function normalizeMcpVideoSource(args: McpVideoInputArgs): McpAnalyzeSource {
  const candidates: McpAnalyzeSource[] = [];

  if (args.video_base64) {
    if (!args.mime_type) {
      throw new Error('mime_type is required with video_base64.');
    }

    candidates.push({
      kind: 'inline_base64',
      videoBase64: args.video_base64,
      mimeType: args.mime_type,
      fileName: args.file_name,
    });
  }

  if (args.video_file?.download_url) {
    candidates.push({
      kind: 'video_uri',
      videoUri: args.video_file.download_url,
      mimeType: args.video_file.mime_type || args.mime_type,
      fileName: args.video_file.name || args.file_name,
    });
  }

  if (args.video_uri) {
    candidates.push({
      kind: 'video_uri',
      videoUri: args.video_uri,
      mimeType: args.mime_type,
      fileName: args.file_name,
    });
  }

  if (args.video_url) {
    candidates.push({
      kind: 'video_url',
      videoUrl: args.video_url,
      mimeType: args.mime_type,
      fileName: args.file_name,
    });
  }

  if (candidates.length !== 1) {
    throw new Error('Provide exactly one source: video_file, video_uri, video_url, or video_base64.');
  }

  return candidates[0];
}
