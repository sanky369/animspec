'use client';

import { useEffect, useState, useRef } from 'react';
import { CopyIcon, DownloadIcon, CheckIcon } from './icons';
import type { OutputFormat } from '@/types/analysis';
import { FORMAT_OPTIONS } from '@/types/output-formats';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  currentFormat?: OutputFormat;
  generatedFormats?: OutputFormat[];
  onFormatChange?: (format: OutputFormat) => void;
  onCopy?: () => void;
  onDownload?: () => void;
}

// Language display names and file extensions
const LANGUAGE_CONFIG: Record<string, { label: string; ext: string; color: string }> = {
  markdown: { label: 'Markdown', ext: 'md', color: '#519aba' },
  css: { label: 'CSS', ext: 'css', color: '#264de4' },
  javascript: { label: 'JavaScript', ext: 'js', color: '#f7df1e' },
  tsx: { label: 'React TSX', ext: 'tsx', color: '#61dafb' },
};

export function CodeBlock({ code, language, title, currentFormat, generatedFormats, onFormatChange, onCopy, onDownload }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const config = LANGUAGE_CONFIG[language] || { label: language, ext: 'txt', color: '#888' };
  const lineCount = code.split('\n').length;

  // Get format label for display
  const currentFormatOption = currentFormat ? FORMAT_OPTIONS.find(f => f.id === currentFormat) : null;
  const displayTitle = currentFormatOption?.label || title || config.label;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if we should show dropdown (more than 1 generated format)
  const showDropdown = generatedFormats && generatedFormats.length > 1 && onFormatChange;

  useEffect(() => {
    setIsLoading(true);
    async function highlightCode() {
      try {
        const { codeToHtml } = await import('shiki');
        const html = await codeToHtml(code, {
          lang: language === 'tsx' ? 'tsx' : language === 'javascript' ? 'javascript' : language === 'css' ? 'css' : 'markdown',
          theme: 'github-dark-default',
        });
        setHighlightedCode(html);
      } catch {
        setHighlightedCode(`<pre><code>${escapeHtml(code)}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    }
    highlightCode();
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `animspec-${currentFormat || 'output'}.${config.ext}`;
    a.click();
    URL.revokeObjectURL(url);
    onDownload?.();
  };

  return (
    <div className="code-block">
      {/* Header */}
      <div className="code-header">
        <div className="code-header-left">
          <div className="code-file-info">
            {showDropdown ? (
              <div className="format-dropdown-container" ref={dropdownRef}>
                <button
                  className="format-dropdown-trigger"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{ '--lang-color': config.color } as React.CSSProperties}
                >
                  <span>{displayTitle}</span>
                  <svg className="dropdown-chevron" viewBox="0 0 20 20" fill="currentColor" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="format-dropdown-menu">
                    {generatedFormats.map((format) => {
                      const formatOption = FORMAT_OPTIONS.find(f => f.id === format);
                      const isActive = format === currentFormat;
                      return (
                        <button
                          key={format}
                          className={`format-dropdown-item ${isActive ? 'active' : ''}`}
                          onClick={() => {
                            onFormatChange(format);
                            setDropdownOpen(false);
                          }}
                        >
                          <span className="format-dropdown-icon">{formatOption?.icon}</span>
                          <span>{formatOption?.label || format}</span>
                          {isActive && (
                            <CheckIcon className="format-dropdown-check" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              <span className="code-lang-badge" style={{ '--lang-color': config.color } as React.CSSProperties}>
                {displayTitle}
              </span>
            )}
            <span className="code-line-count">{lineCount} lines</span>
          </div>
        </div>
        <div className="code-actions">
          <button
            onClick={handleCopy}
            className={`code-action ${copied ? 'code-action-success' : ''}`}
            title={copied ? 'Copied!' : 'Copy to clipboard'}
          >
            {copied ? <CheckIcon className="code-action-icon" /> : <CopyIcon className="code-action-icon" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="code-action"
            title={`Download as .${config.ext}`}
          >
            <DownloadIcon className="code-action-icon" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="code-body">
        {isLoading ? (
          <div className="code-loading">
            <div className="code-loading-shimmer" />
          </div>
        ) : (
          <div
            className="code-content"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        )}
      </div>
    </div>
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
