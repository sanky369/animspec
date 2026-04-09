
import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import type { OutputFormat } from '@/types/analysis';
import type { SharedArtifactBundle, VerificationSummary } from '../artifacts';

export interface RenderDiffResult {
  score: number;
  mismatchRatio: number;
  evidence: string[];
}

export async function tryRenderDiffVerification(input: {
  format: OutputFormat;
  finalOutput: string;
  sharedArtifacts: SharedArtifactBundle;
}): Promise<RenderDiffResult | null> {
  const keyframe = input.sharedArtifacts.keyframes[0];
  if (!keyframe?.previewBase64 || keyframe.extractionMode !== 'single_frame') {
    return null;
  }

  const html = extractCodeBlock(input.finalOutput, 'html');
  if (!html) return null;
  const css = extractCodeBlock(input.finalOutput, 'css') || '';
  const executablePath = resolveChromiumExecutable();
  if (!executablePath) return null;

  const browser = await chromium.launch({ executablePath, headless: true });
  try {
    const width = input.sharedArtifacts.video.width || 1280;
    const height = input.sharedArtifacts.video.height || 720;
    const renderPage = await browser.newPage({ viewport: { width, height } });
    await renderPage.setContent(`<style>${css}</style>${html}`, { waitUntil: 'load' });
    const renderBuffer = await renderPage.screenshot({ type: 'png' });

    const sourcePage = await browser.newPage({ viewport: { width, height } });
    await sourcePage.setContent(`<img src="data:image/jpeg;base64,${keyframe.previewBase64}" style="width:100%;height:100%;object-fit:contain;background:#111" />`, { waitUntil: 'load' });
    const sourceBuffer = await sourcePage.screenshot({ type: 'png' });

    const renderPng = PNG.sync.read(renderBuffer);
    const sourcePng = PNG.sync.read(sourceBuffer);
    const diff = new PNG({ width, height });
    const mismatchedPixels = pixelmatch(sourcePng.data, renderPng.data, diff.data, width, height, { threshold: 0.2 });
    const mismatchRatio = mismatchedPixels / (width * height);
    const score = Math.max(0, Math.round(100 - mismatchRatio * 220));
    return {
      score,
      mismatchRatio,
      evidence: [`render_diff_ratio=${mismatchRatio.toFixed(4)}`, `render_diff_score=${score}`],
    };
  } finally {
    await browser.close();
  }
}

export function mergeRenderDiffVerification(base: VerificationSummary, renderDiff: RenderDiffResult | null): VerificationSummary {
  if (!renderDiff) return base;
  const findings = [...base.findings];
  if (renderDiff.score < 75) {
    findings.push({
      issue: 'Rendered preview diverges from the captured reference frame.',
      severity: renderDiff.score < 50 ? 'high' : 'medium',
      recommendation: 'Review the generated layout and visual hierarchy against the source frame.',
    });
  }
  return {
    ...base,
    validator: 'hybrid',
    score: Math.round(base.score * 0.7 + renderDiff.score * 0.3),
    findings,
    canAutoRevise: base.canAutoRevise || renderDiff.score < 84,
    evidence: [...(base.evidence ?? []), ...renderDiff.evidence],
  };
}

function extractCodeBlock(value: string, language: string): string | null {
  const regex = new RegExp('```(?:' + language + ')?\s*([\s\S]*?)```', 'i');
  return value.match(regex)?.[1]?.trim() ?? null;
}

function resolveChromiumExecutable(): string | null {
  const candidates = [
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].filter(Boolean) as string[];

  for (const candidate of candidates) {
    try {
      if (existsSync(candidate)) return candidate;
    } catch {
      // ignore
    }
  }
  return null;
}
