'use client';

import { useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { UploadIcon } from '@/components/ui/icons';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

const MAX_SIZE = 100 * 1024 * 1024; // 100MB
const ACCEPTED_TYPES = {
  'video/mp4': ['.mp4'],
  'video/webm': ['.webm'],
  'video/quicktime': ['.mov'],
};

export function UploadZone({ onFileSelect, disabled }: UploadZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        if (error.code === 'file-too-large') {
          alert('File is too large. Maximum size is 100MB.');
        } else if (error.code === 'file-invalid-type') {
          alert('Invalid file type. Please upload MP4, WebM, or MOV files.');
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE,
    multiple: false,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={`upload-zone ${isDragActive ? 'dragover' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />

      <div className="upload-icon">
        <UploadIcon />
      </div>

      <h3 className="upload-title">
        {isDragActive ? 'Drop your video here' : 'Drop your recorded video'}
      </h3>
      <p className="upload-subtitle">MP4, WebM, or MOV up to 100MB</p>
      <p className="upload-hint">or click to browse</p>
    </div>
  );
}
