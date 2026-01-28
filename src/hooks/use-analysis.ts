'use client';

import { useState, useCallback } from 'react';
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

// 20MB threshold for using Files API (Gemini)
const FILES_API_THRESHOLD = 20 * 1024 * 1024;
// 4MB threshold for using R2 (Vercel body limit is ~4.5MB)
const R2_UPLOAD_THRESHOLD = 4 * 1024 * 1024;
const KEYFRAME_EXTRACTION_TIMEOUT_MS = 15000;
const KEYFRAMES_ENABLED = process.env.NEXT_PUBLIC_DISABLE_KEYFRAMES !== 'true';

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`${label} timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    promise
      .then((value) => {
        clearTimeout(timeoutId);
        resolve(value);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        reject(err);
      });
  });
}

interface UseAnalysisReturn {
  isAnalyzing: boolean;
  progress: AnalysisProgress | null;
  result: AnalysisResult | null;
  resultsMap: ResultsMap;
  activeFormat: OutputFormat | null;
  generatedFormats: OutputFormat[];
  streamingContent: string;
  error: string | null;
  analyze: (file: File, metadata: VideoMetadata, config: AnalysisConfig, authToken?: string | null) => Promise<void>;
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
    async (file: File, metadata: VideoMetadata, config: AnalysisConfig, authToken?: string | null) => {
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

        const shouldAttachFrameGrid = KEYFRAMES_ENABLED
          && file.size <= FILES_API_THRESHOLD
          && metadata.duration > 0;
        if (shouldAttachFrameGrid) {
          try {
            setProgress({ step: 'extracting', message: 'Extracting keyframes...' });

            const targetFrameSpacingMs = 150;
            const maxFrames = 24;
            const frames = await withTimeout(
              extractFrames(file, {
                durationSeconds: metadata.duration,
                targetFrameSpacingMs,
                maxFrames,
                quality: 3,
                timeoutMs: KEYFRAME_EXTRACTION_TIMEOUT_MS,
              }),
              KEYFRAME_EXTRACTION_TIMEOUT_MS,
              'Keyframe extraction'
            );

            if (frames.length > 0) {
              const aspectRatio = metadata.width > 0 && metadata.height > 0
                ? metadata.width / metadata.height
                : 16 / 9;
              const frameWidth = 320;
              const frameHeight = Math.max(1, Math.round(frameWidth / aspectRatio));
              const columns = 4;

              const grid = await withTimeout(
                createFrameGrid(frames, {
                  columns,
                  frameWidth,
                  frameHeight,
                  addLabels: true,
                }),
                KEYFRAME_EXTRACTION_TIMEOUT_MS,
                'Keyframe grid creation'
              );

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

        // Kimi only supports inline base64 (no Files API)
        // For Gemini models with very large files (>20MB), use Gemini Files API
        const isKimi = config.quality === 'kimi';
        
        if (!isKimi && file.size > FILES_API_THRESHOLD) {
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
        } else if (file.size > R2_UPLOAD_THRESHOLD) {
          // For files >4MB (or any Kimi file >4MB), use R2 to bypass Vercel body limit
          // R2 fetches the video server-side and converts to base64 for Kimi
          // For medium files (4-20MB), use R2 to bypass Vercel body limit
          setProgress({ step: 'uploading', message: 'Uploading video...' });

          // Get presigned URL
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
            // Fall back to inline base64 if R2 not configured
            if (urlResponse.status === 503) {
              throw new Error('File too large. Please use a video under 4MB or contact support.');
            }
            throw new Error(error.error || 'Failed to get upload URL');
          }

          const { uploadUrl, objectKey } = await urlResponse.json();

          // Upload directly to R2
          setProgress({ step: 'uploading', message: 'Uploading video to cloud storage...' });
          
          const r2Response = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': file.type,
            },
            body: file,
          });

          if (!r2Response.ok) {
            throw new Error('Failed to upload video to storage');
          }

          // Pass R2 object key to analyze endpoint
          formData.append('r2ObjectKey', objectKey);
          formData.append('r2MimeType', file.type);
        } else {
          // For smaller files (<4MB), use inline base64
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
        const fetchOptions: RequestInit = {
          method: 'POST',
          body: formData,
          credentials: 'include',
        };
        if (authToken) {
          fetchOptions.headers = { 'Authorization': `Bearer ${authToken}` };
        }
        const response = await fetch('/api/analyze', fetchOptions);

        if (!response.ok) {
          let errorMessage = 'Analysis failed';
          // Read response as text first, then try to parse as JSON
          const text = await response.text().catch(() => '');
          
          try {
            const errorData = JSON.parse(text);
            errorMessage = errorData.error || errorMessage;
          } catch {
            // Response is not JSON (e.g., Vercel/nginx error pages)
            if (text.includes('Request Entity Too Large') || response.status === 413) {
              errorMessage = 'Video file is too large. Please try a smaller file.';
            } else if (response.status === 429) {
              errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
            } else if (response.status === 401) {
              errorMessage = 'Session expired. Please refresh the page and try again.';
            } else if (text) {
              errorMessage = text.slice(0, 200);
            }
          }
          throw new Error(errorMessage);
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
