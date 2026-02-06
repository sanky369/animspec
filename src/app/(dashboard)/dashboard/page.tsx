'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { DashboardHeader } from '@/components/dashboard';
import { UploadZone, VideoPreview } from '@/components/upload';
import { FormatSelector } from '@/components/config/format-selector';
import { QualitySelector } from '@/components/config/quality-selector';
import { TriggerContext } from '@/components/config/trigger-context';
import { AgenticToggle } from '@/components/config/agentic-toggle';
import { OutputPanel } from '@/components/output';
import { useVideoUpload, useAnalysis } from '@/hooks';
import type { AnalysisConfig, VideoMetadata } from '@/types/analysis';
import { VideoIcon, SparklesIcon, ZapIcon } from '@/components/ui/icons';

export default function DashboardPage() {
  const { profile, refreshProfile, refreshToken } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [config, setConfig] = useState<AnalysisConfig>({
    format: 'clone_ui_animation',
    quality: 'balanced',
    triggerContext: null,
    agenticMode: true, // Default ON for hackathon
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
    thinkingContent,
    currentPass,
    totalPasses,
    passName,
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
    // Refresh token before analysis to ensure it's valid
    // Pass token directly to analyze to avoid cookie race condition
    const token = await refreshToken();
    await analyze(file, metadata, config, token);
    // Refresh profile to update credits after analysis
    await refreshProfile();
  }, [file, metadata, config, analyze, refreshToken, refreshProfile]);

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

            <AgenticToggle
              value={config.agenticMode ?? false}
              onChange={(agenticMode) => setConfig({ ...config, agenticMode })}
              disabled={isAnalyzing}
              quality={config.quality}
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
              {config.agenticMode ? <ZapIcon /> : <SparklesIcon />}
              <span>{isAnalyzing ? 'Analyzing...' : config.agenticMode ? 'Deep Analyze' : 'Analyze Animation'}</span>
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
          agenticMode={config.agenticMode}
          thinkingContent={thinkingContent}
          currentPass={currentPass}
          totalPasses={totalPasses}
          passName={passName}
        />
      </div>
    </>
  );
}
