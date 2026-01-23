// Gemini Files API utilities for video upload
// Uses Google's native file upload for optimal video processing

import { GoogleGenAI } from '@google/genai';

export interface UploadedFile {
  name: string;
  uri: string;
  mimeType: string;
  sizeBytes: string;
  state: 'PROCESSING' | 'ACTIVE' | 'FAILED';
}

export async function uploadVideoToGemini(
  file: File,
  apiKey: string
): Promise<UploadedFile> {
  const client = new GoogleGenAI({ apiKey });

  // Convert file to blob for upload
  const blob = new Blob([await file.arrayBuffer()], { type: file.type });

  // Upload the file using Gemini Files API
  const uploadResult = await client.files.upload({
    file: blob,
    config: {
      mimeType: file.type,
      displayName: file.name,
    },
  });

  // Wait for processing to complete
  let fileInfo = uploadResult;
  const fileName = fileInfo.name;
  if (!fileName) {
    throw new Error('Failed to get file name from upload');
  }

  while (fileInfo.state === 'PROCESSING') {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    fileInfo = await client.files.get({ name: fileName });
  }

  if (fileInfo.state === 'FAILED') {
    throw new Error('File processing failed');
  }

  if (!fileInfo.uri || !fileInfo.mimeType || !fileInfo.sizeBytes) {
    throw new Error('File processing returned incomplete data');
  }

  return {
    name: fileName,
    uri: fileInfo.uri,
    mimeType: fileInfo.mimeType,
    sizeBytes: fileInfo.sizeBytes,
    state: fileInfo.state as 'ACTIVE',
  };
}

export async function deleteGeminiFile(
  fileName: string,
  apiKey: string
): Promise<void> {
  const client = new GoogleGenAI({ apiKey });
  await client.files.delete({ name: fileName });
}

export async function listGeminiFiles(apiKey: string): Promise<UploadedFile[]> {
  const client = new GoogleGenAI({ apiKey });
  const pager = await client.files.list();

  const result: UploadedFile[] = [];
  for await (const file of pager) {
    if (file.name && file.uri && file.mimeType && file.sizeBytes) {
      result.push({
        name: file.name,
        uri: file.uri,
        mimeType: file.mimeType,
        sizeBytes: file.sizeBytes,
        state: file.state as 'PROCESSING' | 'ACTIVE' | 'FAILED',
      });
    }
  }
  return result;
}

export function formatFileSize(bytes: number | string): string {
  const numBytes = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
  if (numBytes < 1024) {
    return `${numBytes} B`;
  } else if (numBytes < 1024 * 1024) {
    return `${(numBytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(numBytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}

export function isLargeFile(file: File): boolean {
  const THRESHOLD = 20 * 1024 * 1024; // 20MB - Gemini inline limit
  return file.size > THRESHOLD;
}
