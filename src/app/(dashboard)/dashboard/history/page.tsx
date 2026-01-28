'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { DashboardHeader, HistoryItem, AnalysisDetailModal } from '@/components/dashboard';
import { HistoryIcon, PlusIcon } from '@/components/ui/icons';
import type { Analysis } from '@/types/database';

export default function HistoryPage() {
  const { user, refreshToken } = useAuth();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchAnalyses() {
      if (!user) return;

      try {
        // Refresh token before fetching to ensure it's valid
        await refreshToken();
        const response = await fetch('/api/analyses');
        if (response.ok) {
          const data = await response.json();
          setAnalyses(data.analyses || []);
        }
      } catch (error) {
        console.error('Failed to fetch analyses:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnalyses();
  }, [user, refreshToken]);

  const handleAnalysisClick = (analysis: Analysis) => {
    // For now, just set the selected analysis
    // Could expand to show a modal or navigate to detail page
    setSelectedAnalysis(analysis);
  };

  return (
    <>
      <DashboardHeader
        title="History"
        subtitle={`Your last ${analyses.length} analyses`}
        onMenuClick={() => setSidebarOpen(true)}
      />

      {isLoading ? (
        <div className="history-loading">
          <div className="spinner" />
        </div>
      ) : analyses.length === 0 ? (
        <div className="history-empty">
          <div className="history-empty-icon">
            <HistoryIcon />
          </div>
          <h3>No analyses yet</h3>
          <p>Start by analyzing your first animation video</p>
          <a href="/dashboard" className="btn-primary">
            <PlusIcon />
            New Analysis
          </a>
        </div>
      ) : (
        <div className="history-grid">
          {analyses.map((analysis) => (
            <HistoryItem
              key={analysis.id}
              analysis={analysis}
              onClick={() => handleAnalysisClick(analysis)}
            />
          ))}
        </div>
      )}

      <AnalysisDetailModal
        analysis={selectedAnalysis}
        isOpen={!!selectedAnalysis}
        onClose={() => setSelectedAnalysis(null)}
      />
    </>
  );
}
