import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

export async function getFFmpeg(): Promise<FFmpeg> {
  // Return existing instance if already loaded
  if (ffmpeg && ffmpeg.loaded) {
    return ffmpeg;
  }

  // Return existing load promise if loading in progress
  if (loadPromise) {
    return loadPromise;
  }

  // Start new load
  loadPromise = loadFFmpeg();
  return loadPromise;
}

async function loadFFmpeg(): Promise<FFmpeg> {
  ffmpeg = new FFmpeg();

  // Load FFmpeg with WASM files from CDN
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';

  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });

  return ffmpeg;
}

export function isFFmpegLoaded(): boolean {
  return ffmpeg?.loaded ?? false;
}
