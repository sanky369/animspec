'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { DashboardHeader } from '@/components/dashboard';
import { UploadZone, VideoPreview } from '@/components/upload';
import { FormatSelector } from '@/components/config/format-selector';
import { QualitySelector } from '@/components/config/quality-selector';
import { TriggerContext } from '@/components/config/trigger-context';
import { OutputPanel } from '@/components/output';
import { useVideoUpload, useAnalysis } from '@/hooks';
import type { AnalysisConfig, VideoMetadata } from '@/types/analysis';
import { VideoIcon, SparklesIcon } from '@/components/ui/icons';

export default function DashboardPage() {
  const { profile, refreshProfile } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [config, setConfig] = useState<AnalysisConfig>({
    format: 'natural',
    quality: 'balanced',
    triggerContext: null,
  });

  const {
    file,
    metadata,
    setFile,
    setMetadata,
    reset: resetUpload,
  } = useVideoUpload();

  const {
    isAnalyzing,
    progress,
    result,
    generatedFormats,
    streamingContent,
    analyze,
    switchFormat,
    reset: resetAnalysis,
  } = useAnalysis();

  const handleFileSelect = useCallback(
    (selectedFile: File) => {
      setFile(selectedFile);
      resetAnalysis();
    },
    [setFile, resetAnalysis]
  );

  const handleMetadataLoad = useCallback(
    (meta: VideoMetadata) => {
      setMetadata(meta);
    },
    [setMetadata]
  );

  const handleRemoveVideo = useCallback(() => {
    resetUpload();
    resetAnalysis();
  }, [resetUpload, resetAnalysis]);

  const handleAnalyze = useCallback(async () => {
    if (!file || !metadata) return;
    await analyze(file, metadata, config);
    // Refresh profile to update credits after analysis
    await refreshProfile();
  }, [file, metadata, config, analyze, refreshProfile]);

  const canAnalyze = file && metadata && !isAnalyzing;

  return (
    <>
      <DashboardHeader
        title="New Analysis"
        subtitle="Upload a video to analyze its animations"
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="app-grid">
        {/* Left Panel: Input */}
        <div className="card">
          <div className="card-header">
            <div className="card-icon">
              <VideoIcon />
            </div>
            <span className="card-title">Input Video</span>
          </div>
          <div className="card-body">
            {!file ? (
              <UploadZone onFileSelect={handleFileSelect} disabled={isAnalyzing} />
            ) : (
              <VideoPreview
                file={file}
                onMetadataLoad={handleMetadataLoad}
                onRemove={handleRemoveVideo}
              />
            )}

            <FormatSelector
              value={config.format}
              onChange={(format) => setConfig({ ...config, format })}
              disabled={isAnalyzing}
            />

            <QualitySelector
              value={config.quality}
              onChange={(quality) => setConfig({ ...config, quality })}
              disabled={isAnalyzing}
              credits={profile?.creditsBalance ?? 0}
              isPaidUser={profile?.isPaidUser ?? false}
            />

            <TriggerContext
              value={config.triggerContext}
              onChange={(triggerContext) => setConfig({ ...config, triggerContext })}
              disabled={isAnalyzing}
            />

            <button
              className="btn-primary"
              onClick={handleAnalyze}
              disabled={!canAnalyze}
            >
              <SparklesIcon />
              <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Animation'}</span>
            </button>
          </div>
        </div>

        {/* Right Panel: Output */}
        <OutputPanel
          result={result}
          progress={progress}
          streamingContent={streamingContent}
          generatedFormats={generatedFormats}
          onFormatChange={switchFormat}
        />
      </div>
    </>
  );
}
