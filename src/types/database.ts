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
  kimi: 5, // Kimi doesn't support agentic mode
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

// API Keys for MCP / CLI / programmatic access
export interface ApiKey {
  id: string;
  userId: string;
  /** SHA-256 hash of the full key — never store the raw key */
  keyHash: string;
  /** First 8 characters of the key for display (e.g. "ask_a1b2...") */
  prefix: string;
  name: string;
  isActive: boolean;
  lastUsedAt: Date | null;
  createdAt: Date;
}

// Firestore collection names
export const COLLECTIONS = {
  PROFILES: 'profiles',
  ANALYSES: 'analyses',
  CREDIT_TRANSACTIONS: 'credit_transactions',
  PURCHASES: 'purchases',
  API_KEYS: 'api_keys',
} as const;

// Default values
export const DEFAULT_FREE_CREDITS = 20;
export const MAX_ANALYSES_PER_USER = 50;
