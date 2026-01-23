/**
 * Extract a frame from a video file at a specific time
 * Returns a base64 encoded JPEG image
 */
export async function extractFrameFromVideo(
  file: File,
  timePercent: number = 0.25 // Default to 25% through the video (good for showing animation state)
): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;

    const objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;

    video.onloadedmetadata = () => {
      // Seek to the specified time
      const targetTime = video.duration * timePercent;
      const maxTime = Math.max(0, video.duration - 0.1);
      video.currentTime = Math.min(targetTime, maxTime);
    };

    const timeoutId = setTimeout(() => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Frame extraction timed out'));
    }, 10000);

    video.onseeked = () => {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to base64 JPEG (good balance of quality and size)
      const base64 = canvas.toDataURL('image/jpeg', 0.85);

      // Clean up
      clearTimeout(timeoutId);
      URL.revokeObjectURL(objectUrl);
      video.remove();
      canvas.remove();

      resolve(base64);
    };

    video.onerror = () => {
      clearTimeout(timeoutId);
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load video for frame extraction'));
    };
  });
}

/**
 * Extract multiple frames from a video (start, middle, end)
 */
export async function extractKeyFrames(file: File): Promise<string[]> {
  const frames = await Promise.all([
    extractFrameFromVideo(file, 0.1),  // Near start
    extractFrameFromVideo(file, 0.5),  // Middle
    extractFrameFromVideo(file, 0.9),  // Near end
  ]);
  return frames;
}
