import type { QualityLevel } from '@/types/analysis';
import type { AnalysisFamily, ComplexityTier } from '../artifacts';

export interface ModelCapability {
  id: string;
  label: string;
  multimodalVideo: boolean;
  structuredOutput: boolean;
  toolCalling: boolean;
  caching: boolean;
  streaming: boolean;
  stable: boolean;
}

export const MODEL_REGISTRY: Record<string, ModelCapability> = {
  'kimi-k2.5': {
    id: 'kimi-k2.5',
    label: 'Kimi K2.5',
    multimodalVideo: true,
    structuredOutput: false,
    toolCalling: false,
    caching: false,
    streaming: true,
    stable: false,
  },
  'gemini-3-flash-preview': {
    id: 'gemini-3-flash-preview',
    label: 'Gemini 3 Flash Preview',
    multimodalVideo: true,
    structuredOutput: true,
    toolCalling: true,
    caching: true,
    streaming: true,
    stable: false,
  },
  'gemini-3.1-pro-preview': {
    id: 'gemini-3.1-pro-preview',
    label: 'Gemini 3.1 Pro Preview',
    multimodalVideo: true,
    structuredOutput: true,
    toolCalling: true,
    caching: true,
    streaming: true,
    stable: false,
  },
};

export function getModelCapability(model: string): ModelCapability {
  return MODEL_REGISTRY[model] ?? {
    id: model,
    label: model,
    multimodalVideo: true,
    structuredOutput: false,
    toolCalling: false,
    caching: false,
    streaming: true,
    stable: false,
  };
}

export function resolveGeneratorModel(
  quality: QualityLevel,
  family: AnalysisFamily,
  complexity: ComplexityTier
): string {
  if (quality === 'kimi') {
    return 'kimi-k2.5';
  }

  if (quality === 'precise') {
    if (family === 'reconstruct' || complexity === 'complex') {
      return 'gemini-3.1-pro-preview';
    }
    return 'gemini-3-flash-preview';
  }

  return complexity !== 'simple' && family === 'reconstruct'
    ? 'gemini-3.1-pro-preview'
    : 'gemini-3-flash-preview';
}

export function resolveVerifierModel(
  quality: QualityLevel,
  family: AnalysisFamily,
  complexity: ComplexityTier
): string {
  if (quality === 'kimi') {
    return 'kimi-k2.5';
  }
  if (quality === 'precise' && family === 'reconstruct' && complexity !== 'simple') {
    return 'gemini-3.1-pro-preview';
  }
  return 'gemini-3-flash-preview';
}
