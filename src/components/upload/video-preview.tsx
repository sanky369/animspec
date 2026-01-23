'use client';

import { useEffect, useRef, useState } from 'react';
import type { VideoMetadata } from '@/types/analysis';

interface VideoPreviewProps {
  file: File;
  onMetadataLoad?: (metadata: VideoMetadata) => void;
  onRemove?: () => void;
}

export function VideoPreview({ file, onMetadataLoad, onRemove }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const url = URL.createObjectURL(file);
    video.src = url;

    const handleLoadedMetadata = () => {
      const meta: VideoMetadata = {
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
        size: file.size,
        mimeType: file.type,
        name: file.name,
      };
      setMetadata(meta);
      onMetadataLoad?.(meta);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      URL.revokeObjectURL(url);
    };
  }, [file, onMetadataLoad]);

  const formatDuration = (seconds: number) => {
    return `${seconds.toFixed(1)}s`;
  };

  const formatSize = (bytes: number) => {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatResolution = (width: number, height: number) => {
    return `${width}×${height}`;
  };

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="w-full rounded-lg bg-black"
        controls
        muted
        loop
        playsInline
      />

      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 w-8 h-8 bg-bg-tertiary/90 border border-border-color rounded-full flex items-center justify-center text-text-secondary hover:text-red-400 hover:border-red-400 transition-colors"
          title="Remove video"
        >
          ✕
        </button>
      )}

      {metadata && (
        <div className="video-info">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="video-info-label">Duration</div>
              <div className="video-info-value">{formatDuration(metadata.duration)}</div>
            </div>
            <div>
              <div className="video-info-label">Resolution</div>
              <div className="video-info-value">
                {formatResolution(metadata.width, metadata.height)}
              </div>
            </div>
            <div>
              <div className="video-info-label">Size</div>
              <div className="video-info-value">{formatSize(metadata.size)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
