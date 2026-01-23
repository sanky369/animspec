'use client';

interface UploadProgressProps {
  progress: number;
  fileName: string;
}

export function UploadProgress({ progress, fileName }: UploadProgressProps) {
  return (
    <div className="upload-zone flex flex-col items-center justify-center">
      <div className="text-5xl mb-4">📤</div>
      <h3 className="text-lg font-semibold mb-2">Uploading...</h3>
      <p className="text-text-muted text-sm mb-4 truncate max-w-full">{fileName}</p>

      <div className="w-full max-w-xs bg-bg-tertiary rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-1 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-accent-cyan text-sm mt-2 font-mono">{progress}%</p>
    </div>
  );
}
