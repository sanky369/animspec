import type { OutputFormat, QualityLevel, TriggerContext } from './analysis';

// Re-export types from analysis for convenience
export type { OutputFormat, QualityLevel, TriggerContext };

// Credit costs per quality level
export const CREDIT_COSTS: Record<QualityLevel, number> = {
  balanced: 3,
  precise: 20,
  kimi: 5,
};

// Agentic mode credit costs (4-pass pipeline)
export const AGENTIC_CREDIT_COSTS: Record<QualityLevel, number> = {
  balanced: 5,
  precise: 30,
  kimi: 5,
};

// Pack types
export type PackType = 'creator' | 'pro';

export const PACK_CREDITS: Record<PackType, number> = {
  creator: 200,
  pro: 600,
};

export const PACK_PRICES: Record<PackType, number> = {
  creator: 2400, // $24.00 in cents
  pro: 5900, // $59.00 in cents
};

// Firestore document types

export interface UserProfile {
  id: string; // Same as Firebase Auth UID
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  creditsBalance: number;
  creditsExpiresAt: Date | null;
  hasUsedFreeTrial: boolean;
  isPaidUser: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Analysis {
  id: string;
  userId: string;
  format: OutputFormat;
  quality: QualityLevel;
  triggerContext: TriggerContext;
  overview: string;
  code: string;
  frameImageUrl: string | null;
  videoName: string;
  videoDuration: number;
  creditsUsed: number;
  runId?: string | null;
  verificationScore?: number | null;
  pipelineFamily?: 'reconstruct' | 'audit' | 'behavior' | null;
  pipelineVersion?: string | null;
  source?: 'web' | 'api' | 'mcp' | null;
  createdAt: Date;
}

export type CreditTransactionType = 'signup_bonus' | 'analysis' | 'purchase' | 'refund' | 'admin_adjustment';

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number; // Positive for additions, negative for deductions
  type: CreditTransactionType;
  quality: QualityLevel | null;
  description: string;
  analysisId: string | null;
  purchaseId: string | null;
  createdAt: Date;
}

export type PurchaseStatus = 'pending' | 'completed' | 'refunded' | 'failed';

export interface Purchase {
  id: string;
  userId: string;
  packType: PackType;
  credits: number;
  amountCents: number;
  currency: string;
  lemonSqueezyOrderId: string;
  status: PurchaseStatus;
  createdAt: Date;
}

export interface ApiKeyRecord {
  id: string;
  userId: string;
  keyHash: string;
  prefix: string;
  name: string;
  isActive: boolean;
  lastUsedAt: Date | null;
  createdAt: Date;
}

// Firestore collection names
export interface AnalysisRun {
  id: string;
  userId: string | null;
  format: OutputFormat;
  quality: QualityLevel;
  triggerContext: TriggerContext;
  family: 'reconstruct' | 'audit' | 'behavior';
  complexity: 'simple' | 'moderate' | 'complex';
  pipelineVersion: string;
  generatorModel: string;
  verifierModel?: string | null;
  status: 'running' | 'complete' | 'failed';
  iterationCount: number;
  finalTitle?: string | null;
  finalOverview?: string | null;
  finalFormat?: OutputFormat | null;
  verificationScore?: number | null;
  verificationSummary?: string | null;
  errorMessage?: string | null;
  stageCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalysisRunArtifact {
  id: string;
  type: string;
  summary: string;
  schemaVersion: number;
  storagePath: string | null;
  payload: unknown;
  updatedAt: Date;
}

export const COLLECTIONS = {
  PROFILES: 'profiles',
  ANALYSES: 'analyses',
  ANALYSIS_RUNS: 'analysis_runs',
  API_KEYS: 'api_keys',
  CREDIT_TRANSACTIONS: 'credit_transactions',
  PURCHASES: 'purchases',
} as const;

// Default values
export const DEFAULT_FREE_CREDITS = 20;
export const MAX_ANALYSES_PER_USER = 50;
