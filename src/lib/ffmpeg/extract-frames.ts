import { getFFmpeg } from './client';
import { fetchFile } from '@ffmpeg/util';

export interface ExtractFramesOptions {
  fps?: number;
  maxFrames?: number;
  quality?: number; // 1-31, lower is better
  durationSeconds?: number;
  targetFrameSpacingMs?: number;
  timeoutMs?: number;
}

export interface ExtractedFrame {
  data: Uint8Array;
  index: number;
  timestamp: number;
}

export async function extractFrames(
  videoFile: File,
  options: ExtractFramesOptions = {}
): Promise<ExtractedFrame[]> {
  const maxFrames = options.maxFrames ?? 32;
  const quality = options.quality ?? 2;
  const fps = resolveFps(options, maxFrames);
  const execTimeout = options.timeoutMs && options.timeoutMs > 0 ? options.timeoutMs : undefined;

  const ffmpeg = await getFFmpeg();

  // Write input file to FFmpeg virtual filesystem
  const inputFileName = 'input.mp4';
  await ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));

  const frames: ExtractedFrame[] = [];

  try {
    // Extract frames at specified FPS
    const result = await ffmpeg.exec([
      '-i', inputFileName,
      '-vf', `fps=${fps}`,
      '-q:v', quality.toString(),
      '-frames:v', maxFrames.toString(),
      'frame_%04d.jpg',
    ], execTimeout);

    if (result !== 0) {
      throw new Error(`FFmpeg frame extraction failed (code ${result})`);
    }

    // Read extracted frames
    let frameIndex = 1;

    while (frameIndex <= maxFrames) {
      const fileName = `frame_${frameIndex.toString().padStart(4, '0')}.jpg`;
      try {
        const data = await ffmpeg.readFile(fileName) as Uint8Array;
        if (data && data.length > 0) {
          frames.push({
            data,
            index: frameIndex - 1,
            timestamp: fps > 0 ? (frameIndex - 1) / fps : 0,
          });
          // Clean up frame file
          await ffmpeg.deleteFile(fileName);
        }
      } catch {
        // No more frames
        break;
      }
      frameIndex++;
    }

    return frames;
  } finally {
    // Best-effort cleanup
    try {
      await ffmpeg.deleteFile(inputFileName);
    } catch {}

    for (let frameIndex = 1; frameIndex <= maxFrames; frameIndex++) {
      const fileName = `frame_${frameIndex.toString().padStart(4, '0')}.jpg`;
      try {
        await ffmpeg.deleteFile(fileName);
      } catch {}
    }
  }
}

export function framesToBase64(frames: ExtractedFrame[]): string[] {
  return frames.map((frame) => {
    const binary = String.fromCharCode(...frame.data);
    return btoa(binary);
  });
}

export function frameToBlob(frame: ExtractedFrame): Blob {
  // Copy to regular ArrayBuffer to avoid SharedArrayBuffer issues
  const buffer = new Uint8Array(frame.data).buffer;
  return new Blob([buffer], { type: 'image/jpeg' });
}

export function frameToDataURL(frame: ExtractedFrame): string {
  const base64 = btoa(String.fromCharCode(...frame.data));
  return `data:image/jpeg;base64,${base64}`;
}

function resolveFps(options: ExtractFramesOptions, maxFrames: number): number {
  if (options.fps) return options.fps;

  const targetSpacingMs = options.targetFrameSpacingMs ?? 200;
  const fpsFromSpacing = 1000 / targetSpacingMs;

  if (!options.durationSeconds || options.durationSeconds <= 0) {
    return fpsFromSpacing;
  }

  const fpsFromCap = maxFrames / options.durationSeconds;
  const fps = Math.min(fpsFromSpacing, fpsFromCap);

  return Math.max(fps, 0.25);
}
