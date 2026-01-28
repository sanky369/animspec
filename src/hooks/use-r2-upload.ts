'use client';

import { useState, useCallback } from 'react';

interface UploadProgress {
  status: 'idle' | 'getting-url' | 'uploading' | 'complete' | 'error';
  progress: number; // 0-100
  message: string;
}

interface UseR2UploadReturn {
  upload: (file: File, authToken?: string | null) => Promise<string | null>;
  uploadProgress: UploadProgress;
  reset: () => void;
}

export function useR2Upload(): UseR2UploadReturn {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    status: 'idle',
    progress: 0,
    message: '',
  });

  const reset = useCallback(() => {
    setUploadProgress({
      status: 'idle',
      progress: 0,
      message: '',
    });
  }, []);

  const upload = useCallback(async (file: File, authToken?: string | null): Promise<string | null> => {
    try {
      // Step 1: Get presigned URL
      setUploadProgress({
        status: 'getting-url',
        progress: 0,
        message: 'Preparing upload...',
      });

      const urlResponse = await fetch('/api/upload-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
        },
        credentials: 'include',
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          contentLength: file.size,
        }),
      });

      if (!urlResponse.ok) {
        const error = await urlResponse.json().catch(() => ({ error: 'Failed to get upload URL' }));
        throw new Error(error.error || 'Failed to get upload URL');
      }

      const { uploadUrl, objectKey } = await urlResponse.json();

      // Step 2: Upload directly to R2
      setUploadProgress({
        status: 'uploading',
        progress: 10,
        message: 'Uploading video...',
      });

      // Use XMLHttpRequest for progress tracking
      const uploadResult = await new Promise<boolean>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 90) + 10; // 10-100
            setUploadProgress({
              status: 'uploading',
              progress: percent,
              message: `Uploading... ${percent}%`,
            });
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(true);
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        };

        xhr.onerror = () => reject(new Error('Upload failed'));
        xhr.ontimeout = () => reject(new Error('Upload timed out'));

        xhr.open('PUT', uploadUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.timeout = 300000; // 5 minutes
        xhr.send(file);
      });

      if (!uploadResult) {
        throw new Error('Upload failed');
      }

      setUploadProgress({
        status: 'complete',
        progress: 100,
        message: 'Upload complete!',
      });

      return objectKey;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      setUploadProgress({
        status: 'error',
        progress: 0,
        message,
      });
      return null;
    }
  }, []);

  return {
    upload,
    uploadProgress,
    reset,
  };
}
