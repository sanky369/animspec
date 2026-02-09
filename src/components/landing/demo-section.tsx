'use client';

import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { UploadZone, VideoPreview } from '@/components/upload';
import { FormatSelector } from '@/components/config/format-selector';
import { OutputPanel } from '@/components/output';
import { SignInModal } from '@/components/auth/sign-in-modal';
import { useVideoUpload, useAnalysis } from '@/hooks';
import type { AnalysisConfig, VideoMetadata } from '@/types/analysis';
import { VideoIcon, SparklesIcon, LockIcon } from '@/components/ui/icons';

const DEMO_STORAGE_KEY = 'animspec_demo_used';

export function DemoSection() {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [demoUsed, setDemoUsed] = useState(false);
  const [config, setConfig] = useState<AnalysisConfig>({
    format: 'clone_ui_animation',
    quality: 'kimi', // Demo uses Kimi K2.5 — best for UI
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

  // Check if demo has been used
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const used = localStorage.getItem(DEMO_STORAGE_KEY) === 'true';
      setDemoUsed(used);
    }
  }, []);

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

    // Check if demo already used
    if (demoUsed && !user) {
      setShowAuthModal(true);
      return;
    }

    // Run analysis
    await analyze(file, metadata, { ...config, quality: 'kimi' });

    // Mark demo as used (only for non-authenticated users)
    if (!user) {
      localStorage.setItem(DEMO_STORAGE_KEY, 'true');
      setDemoUsed(true);
    }
  }, [file, metadata, config, analyze, demoUsed, user]);

  const canAnalyze = file && metadata && !isAnalyzing && (!demoUsed || user);
  const showDemoLimit = demoUsed && !user && !result;

  return (
    <section className="demo-section" id="demo">
      <div className="section-header">
        <span className="section-eyebrow">Try It</span>
        <h2 className="section-title">Try It Free</h2>
        <p className="section-subtitle">
          Upload any screen recording, pick a format, and get a prompt your coding agent can build from
          {!user && <span className="text-text-subtle"> — one free analysis per device</span>}
        </p>
      </div>

      <div className="demo-container">
        {showDemoLimit ? (
          <div className="demo-limit-card">
            <div className="demo-limit-icon">
              <LockIcon />
            </div>
            <h3>Demo Limit Reached</h3>
            <p>Sign up for free to get 20 credits and continue analyzing animations.</p>
            <button
              className="btn-primary"
              onClick={() => setShowAuthModal(true)}
            >
              Sign Up Free
            </button>
          </div>
        ) : (
          <div className="demo-grid">
            {/* Left Panel: Input */}
            <div className="demo-card">
              <div className="card-header">
                <div className="card-icon">
                  <VideoIcon />
                </div>
                <span className="card-title">Upload Video</span>
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

                <div className="demo-quality-info">
                  <span className="badge badge-subtle">Kimi K2.5 — best for UI</span>
                  {!user && <span className="demo-quality-note">Sign in for more quality options</span>}
                </div>

                <button
                  className="btn-primary"
                  onClick={handleAnalyze}
                  disabled={!canAnalyze}
                >
                  <SparklesIcon />
                  <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Video'}</span>
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
        )}

        {/* Sign up prompt after successful analysis */}
        {result && !user && (
          <div className="demo-signup-prompt">
            <p>
              <strong>Like what you see?</strong> Sign up for 20 free credits and unlock all features.
            </p>
            <button
              className="btn-primary btn-sm"
              onClick={() => setShowAuthModal(true)}
            >
              Get Started Free
            </button>
          </div>
        )}
      </div>

      <SignInModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode="signup"
      />
    </section>
  );
}
