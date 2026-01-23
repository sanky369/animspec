'use client';

import { useState, useCallback } from 'react';
import { getFFmpeg, isFFmpegLoaded } from '@/lib/ffmpeg/client';
import { extractFrames, type ExtractedFrame } from '@/lib/ffmpeg/extract-frames';
import { createFrameGrid, type FrameGrid } from '@/lib/ffmpeg/create-grid';

interface UseFFmpegReturn {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
  progress: string;
  loadFFmpeg: () => Promise<boolean>;
  processVideo: (file: File, fps?: number) => Promise<{ frames: ExtractedFrame[]; grid: FrameGrid } | null>;
}

export function useFFmpeg(): UseFFmpegReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(isFFmpegLoaded());
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState('');

  const loadFFmpeg = useCallback(async (): Promise<boolean> => {
    if (isFFmpegLoaded()) {
      setIsReady(true);
      return true;
    }

    setIsLoading(true);
    setError(null);
    setProgress('Loading FFmpeg...');

    try {
      await getFFmpeg();
      setIsReady(true);
      setProgress('');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load FFmpeg';
      setError(message);
      setProgress('');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const processVideo = useCallback(
    async (
      file: File,
      fps: number = 4
    ): Promise<{ frames: ExtractedFrame[]; grid: FrameGrid } | null> => {
      setError(null);

      try {
        // Ensure FFmpeg is loaded
        if (!isFFmpegLoaded()) {
          setProgress('Loading FFmpeg...');
          await getFFmpeg();
        }

        // Extract frames
        setProgress('Extracting frames...');
        const frames = await extractFrames(file, { fps, maxFrames: 24 });

        if (frames.length === 0) {
          throw new Error('No frames could be extracted from the video');
        }

        // Create grid
        setProgress('Creating frame grid...');
        const grid = await createFrameGrid(frames);

        setProgress('');
        return { frames, grid };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to process video';
        setError(message);
        setProgress('');
        return null;
      }
    },
    []
  );

  return {
    isLoading,
    isReady,
    error,
    progress,
    loadFFmpeg,
    processVideo,
  };
}
