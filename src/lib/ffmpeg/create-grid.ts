import type { ExtractedFrame } from './extract-frames';

export interface GridOptions {
  columns?: number;
  frameWidth?: number;
  frameHeight?: number;
  addLabels?: boolean;
  backgroundColor?: string;
  labelColor?: string;
}

export interface FrameGrid {
  dataUrl: string;
  base64: string;
  width: number;
  height: number;
  frameCount: number;
}

export async function createFrameGrid(
  frames: ExtractedFrame[],
  options: GridOptions = {}
): Promise<FrameGrid> {
  const {
    columns = 4,
    frameWidth = 480,
    frameHeight = 270,
    addLabels = true,
    backgroundColor = '#ffffff',
    labelColor = '#000000',
  } = options;

  const rows = Math.ceil(frames.length / columns);
  const gridWidth = columns * frameWidth;
  const gridHeight = rows * frameHeight;

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = gridWidth;
  canvas.height = gridHeight;
  const ctx = canvas.getContext('2d')!;

  // Fill background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, gridWidth, gridHeight);

  // Draw each frame
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const col = i % columns;
    const row = Math.floor(i / columns);
    const x = col * frameWidth;
    const y = row * frameHeight;

    // Create image from frame data
    const img = await createImageFromFrame(frame);

    // Draw frame (letterboxed to preserve aspect ratio)
    const scale = Math.min(frameWidth / img.naturalWidth, frameHeight / img.naturalHeight);
    const drawWidth = img.naturalWidth * scale;
    const drawHeight = img.naturalHeight * scale;
    const offsetX = x + (frameWidth - drawWidth) / 2;
    const offsetY = y + (frameHeight - drawHeight) / 2;
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Add label
    if (addLabels) {
      const label = `F${i + 1}`;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(x, y, 40, 24);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(label, x + 8, y + 16);
    }
  }

  const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
  const base64 = dataUrl.split(',')[1];

  return {
    dataUrl,
    base64,
    width: gridWidth,
    height: gridHeight,
    frameCount: frames.length,
  };
}

async function createImageFromFrame(frame: ExtractedFrame): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // Copy to regular ArrayBuffer to avoid SharedArrayBuffer issues
    const buffer = new Uint8Array(frame.data).buffer;
    const blob = new Blob([buffer], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load frame image'));
    };

    img.src = url;
  });
}

export function getKeyFrames(
  frames: ExtractedFrame[],
  count: number = 3
): ExtractedFrame[] {
  if (frames.length <= count) {
    return frames;
  }

  const keyFrames: ExtractedFrame[] = [];

  // Always include first frame
  keyFrames.push(frames[0]);

  // Include middle frames evenly distributed
  if (count > 2) {
    const step = Math.floor(frames.length / (count - 1));
    for (let i = 1; i < count - 1; i++) {
      const index = Math.min(i * step, frames.length - 2);
      keyFrames.push(frames[index]);
    }
  }

  // Always include last frame
  keyFrames.push(frames[frames.length - 1]);

  return keyFrames;
}
