'use client';

import { useState, useCallback } from 'react';
import type { VideoMetadata } from '@/types/analysis';

interface UseVideoUploadReturn {
  file: File | null;
  metadata: VideoMetadata | null;
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
  setFile: (file: File | null) => void;
  setMetadata: (metadata: VideoMetadata | null) => void;
  uploadToBlob: (file: File) => Promise<string | null>;
  reset: () => void;
}

export function useVideoUpload(): UseVideoUploadReturn {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadToBlob = useCallback(async (fileToUpload: File): Promise<string | null> => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', fileToUpload);

      // Simulate progress for now (real progress would need XHR or fetch with streams)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data = await response.json();
      return data.url;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setFile(null);
    setMetadata(null);
    setIsUploading(false);
    setUploadProgress(0);
    setError(null);
  }, []);

  return {
    file,
    metadata,
    isUploading,
    uploadProgress,
    error,
    setFile,
    setMetadata,
    uploadToBlob,
    reset,
  };
}
