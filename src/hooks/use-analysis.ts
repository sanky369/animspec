'use client';

import { useState, useCallback, useRef } from 'react';
import type {
  AnalysisConfig,
  AnalysisProgress,
  AnalysisResult,
  VideoMetadata,
  ResultsMap,
  OutputFormat,
} from '@/types/analysis';
import { parseAnalysisOutput } from '@/lib/ai/output-parsers';
import { extractFrameFromVideo } from '@/lib/video/extract-frame';
import { extractFrames } from '@/lib/ffmpeg/extract-frames';
import { createFrameGrid } from '@/lib/ffmpeg/create-grid';
import { createSseParser } from '@/lib/streaming/sse';

// 20MB threshold for using Files API
const FILES_API_THRESHOLD = 20 * 1024 * 1024;

interface UseAnalysisReturn {
  isAnalyzing: boolean;
  progress: AnalysisProgress | null;
  result: AnalysisResult | null;
  resultsMap: ResultsMap;
  activeFormat: OutputFormat | null;
  generatedFormats: OutputFormat[];
  streamingContent: string;
  error: string | null;
  analyze: (file: File, metadata: VideoMetadata, config: AnalysisConfig) => Promise<void>;
  switchFormat: (format: OutputFormat) => void;
  reset: () => void;
}

export function useAnalysis(): UseAnalysisReturn {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState<AnalysisProgress | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [resultsMap, setResultsMap] = useState<ResultsMap>({});
  const [activeFormat, setActiveFormat] = useState<OutputFormat | null>(null);
  const [streamingContent, setStreamingContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Get list of formats that have been generated
  const generatedFormats = Object.keys(resultsMap) as OutputFormat[];

  const analyze = useCallback(
    async (file: File, metadata: VideoMetadata, config: AnalysisConfig) => {
      setIsAnalyzing(true);
      setError(null);
      setResult(null);
      setStreamingContent('');

      let frameImage: string | undefined;
      let frameGrid: {
        base64: string;
        width: number;
        height: number;
        frameCount: number;
        columns: number;
      } | null = null;

      try {
        // Step 1: Upload progress
        setProgress({ step: 'uploading', message: 'Preparing video...' });

        // Extract a frame from the video (at 30% for a good animation state)
        try {
          frameImage = await extractFrameFromVideo(file, 0.3);
        } catch (frameError) {
          console.warn('Failed to extract frame:', frameError);
          // Continue without frame - it's not critical
        }

        const shouldAttachFrameGrid = file.size <= FILES_API_THRESHOLD && metadata.duration > 0;
        if (shouldAttachFrameGrid) {
          try {
            setProgress({ step: 'extracting', message: 'Extracting keyframes...' });

            const targetFrameSpacingMs = 150;
            const maxFrames = 24;
            const frames = await extractFrames(file, {
              durationSeconds: metadata.duration,
              targetFrameSpacingMs,
              maxFrames,
              quality: 3,
            });

            if (frames.length > 0) {
              const aspectRatio = metadata.width > 0 && metadata.height > 0
                ? metadata.width / metadata.height
                : 16 / 9;
              const frameWidth = 320;
              const frameHeight = Math.max(1, Math.round(frameWidth / aspectRatio));
              const columns = 4;

              const grid = await createFrameGrid(frames, {
                columns,
                frameWidth,
                frameHeight,
                addLabels: true,
              });

              frameGrid = {
                ...grid,
                columns,
              };
            }
          } catch (gridError) {
            console.warn('Failed to extract frame grid:', gridError);
          }
        }

        const formData = new FormData();
        formData.append('format', config.format);
        formData.append('quality', config.quality);
        formData.append('fileSize', file.size.toString());
        formData.append('videoDuration', metadata.duration.toString());
        formData.append('videoWidth', metadata.width.toString());
        formData.append('videoHeight', metadata.height.toString());
        formData.append('videoSize', metadata.size.toString());
        formData.append('videoMimeType', metadata.mimeType);
        formData.append('videoName', metadata.name);
        if (config.triggerContext) {
          formData.append('triggerContext', config.triggerContext);
        }
        if (frameGrid) {
          formData.append('frameGridBase64', frameGrid.base64);
          formData.append('frameGridWidth', frameGrid.width.toString());
          formData.append('frameGridHeight', frameGrid.height.toString());
          formData.append('frameGridCount', frameGrid.frameCount.toString());
          formData.append('frameGridColumns', frameGrid.columns.toString());
        }

        // For larger files, use Gemini Files API
        if (file.size > FILES_API_THRESHOLD) {
          setProgress({ step: 'uploading', message: 'Uploading video to Gemini...' });

          // Upload to Gemini Files API first
          const uploadFormData = new FormData();
          uploadFormData.append('file', file);

          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: uploadFormData,
          });

          if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json();
            throw new Error(errorData.error || 'Upload failed');
          }

          const uploadResult = await uploadResponse.json();

          // Use file URI for analysis
          formData.append('fileUri', uploadResult.uri);
          formData.append('fileMimeType', uploadResult.mimeType);
        } else {
          // For smaller files, use inline base64
          setProgress({ step: 'extracting', message: 'Processing video...' });

          const arrayBuffer = await file.arrayBuffer();
          const base64 = btoa(
            new Uint8Array(arrayBuffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );

          formData.append('videoBase64', base64);
          formData.append('mimeType', file.type);
        }

        // Step 2: Analyzing
        setProgress({ step: 'analyzing', message: 'AI analysis in progress...' });

        // Make streaming request
        const response = await fetch('/api/analyze', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Analysis failed');
        }

        // Read streaming response
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }

        const decoder = new TextDecoder();
        let fullContent = '';

        const parser = createSseParser((payload: string) => {
          if (!payload || payload === '[DONE]') return;

          try {
            const data = JSON.parse(payload);

            if (data.type === 'progress') {
              setProgress({ step: 'generating', message: data.message });
            } else if (data.type === 'chunk') {
              fullContent += data.data;
              setStreamingContent(fullContent);
            } else if (data.type === 'complete') {
              fullContent = data.data;
              setStreamingContent(fullContent);
            } else if (data.type === 'error') {
              throw new Error(data.message);
            }
          } catch (parseError) {
            console.warn('Failed to parse SSE payload:', parseError);
          }
        });

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          parser.feed(chunk);
        }

        parser.flush();

        // Parse the result and include the extracted frame
        const parsedResult = parseAnalysisOutput(fullContent, config.format);
        const newResult = {
          ...parsedResult,
          frameImage,
        };
        setResult(newResult);
        setResultsMap((prev) => ({
          ...prev,
          [config.format]: newResult,
        }));
        setActiveFormat(config.format);
        setProgress({ step: 'complete', message: 'Analysis complete!' });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Analysis failed';
        setError(message);
        setProgress({ step: 'error', message });
      } finally {
        setIsAnalyzing(false);
      }
    },
    []
  );

  const switchFormat = useCallback((format: OutputFormat) => {
    const formatResult = resultsMap[format];
    if (formatResult) {
      setResult(formatResult);
      setActiveFormat(format);
    }
  }, [resultsMap]);

  const reset = useCallback(() => {
    setIsAnalyzing(false);
    setProgress(null);
    setResult(null);
    setResultsMap({});
    setActiveFormat(null);
    setStreamingContent('');
    setError(null);
  }, []);

  return {
    isAnalyzing,
    progress,
    result,
    resultsMap,
    activeFormat,
    generatedFormats,
    streamingContent,
    error,
    analyze,
    switchFormat,
    reset,
  };
}
