import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from '@/lib/firebase/admin';
import {
  AGENTIC_CREDIT_COSTS,
  COLLECTIONS,
  CREDIT_COSTS,
  MAX_ANALYSES_PER_USER,
} from '@/types/database';
import type { OutputFormat, QualityLevel, TriggerContext } from '@/types/analysis';

export interface CreditCheckResult {
  canProceed: boolean;
  cost: number;
  balance: number;
  error?: string;
}

export interface ReservedCredits {
  cost: number;
  newBalance: number;
}

export interface SaveAnalysisInput {
  userId: string;
  quality: QualityLevel;
  format: OutputFormat;
  triggerContext: TriggerContext;
  overview: string;
  code: string;
  videoName: string;
  videoDuration: number;
  creditsUsed: number;
  source: 'api' | 'mcp';
  runId?: string | null;
  verificationScore?: number | null;
  pipelineFamily?: 'reconstruct' | 'audit' | 'behavior' | null;
  pipelineVersion?: string | null;
}

export function getCreditCost(quality: QualityLevel, deepAnalysis: boolean): number {
  return deepAnalysis ? AGENTIC_CREDIT_COSTS[quality] : CREDIT_COSTS[quality];
}

export async function checkCredits(
  userId: string,
  quality: QualityLevel,
  deepAnalysis: boolean
): Promise<CreditCheckResult> {
  const cost = getCreditCost(quality, deepAnalysis);
  const profileRef = adminDb.collection(COLLECTIONS.PROFILES).doc(userId);
  const profileSnap = await profileRef.get();

  if (!profileSnap.exists) {
    return { canProceed: false, balance: 0, cost, error: 'User profile not found' };
  }

  const profile = profileSnap.data();
  const balance = Number(profile?.creditsBalance ?? 0);

  if (balance < cost) {
    return { canProceed: false, balance, cost, error: 'Insufficient credits' };
  }

  if (quality === 'precise' && !profile?.isPaidUser) {
    return { canProceed: false, balance, cost, error: 'Precise mode requires a paid account' };
  }

  return { canProceed: true, balance, cost };
}

export async function reserveCredits(
  userId: string,
  quality: QualityLevel,
  deepAnalysis: boolean,
  format: OutputFormat,
  source: 'api' | 'mcp'
): Promise<ReservedCredits> {
  const cost = getCreditCost(quality, deepAnalysis);
  const profileRef = adminDb.collection(COLLECTIONS.PROFILES).doc(userId);

  const newBalance = await adminDb.runTransaction(async (transaction) => {
    const profileDoc = await transaction.get(profileRef);
    if (!profileDoc.exists) {
      throw new Error('User profile not found');
    }

    const profile = profileDoc.data();
    const balance = Number(profile?.creditsBalance ?? 0);
    if (balance < cost) {
      throw new Error('Insufficient credits');
    }

    const updatedBalance = balance - cost;
    transaction.update(profileRef, {
      creditsBalance: updatedBalance,
      updatedAt: FieldValue.serverTimestamp(),
    });

    const txRef = adminDb.collection(COLLECTIONS.CREDIT_TRANSACTIONS).doc();
    transaction.set(txRef, {
      userId,
      amount: -cost,
      type: 'analysis',
      quality,
      description: `${source.toUpperCase()} analysis (${deepAnalysis ? 'deep' : 'regular'}, ${format})`,
      analysisId: null,
      purchaseId: null,
      createdAt: FieldValue.serverTimestamp(),
    });

    return updatedBalance;
  }) as number;

  return { cost, newBalance };
}

export async function refundCredits(
  userId: string,
  quality: QualityLevel,
  deepAnalysis: boolean,
  format: OutputFormat,
  source: 'api' | 'mcp'
): Promise<void> {
  const cost = getCreditCost(quality, deepAnalysis);
  const profileRef = adminDb.collection(COLLECTIONS.PROFILES).doc(userId);

  await adminDb.runTransaction(async (transaction) => {
    const profileDoc = await transaction.get(profileRef);
    if (!profileDoc.exists) {
      return;
    }

    const profile = profileDoc.data();
    const balance = Number(profile?.creditsBalance ?? 0);
    transaction.update(profileRef, {
      creditsBalance: balance + cost,
      updatedAt: FieldValue.serverTimestamp(),
    });

    const txRef = adminDb.collection(COLLECTIONS.CREDIT_TRANSACTIONS).doc();
    transaction.set(txRef, {
      userId,
      amount: cost,
      type: 'refund',
      quality,
      description: `Refund: ${source.toUpperCase()} analysis failed (${deepAnalysis ? 'deep' : 'regular'}, ${format})`,
      analysisId: null,
      purchaseId: null,
      createdAt: FieldValue.serverTimestamp(),
    });
  });
}

export async function saveAnalysisRecord(input: SaveAnalysisInput): Promise<string> {
  const analysisRef = adminDb.collection(COLLECTIONS.ANALYSES).doc();

  await analysisRef.set({
    userId: input.userId,
    format: input.format,
    quality: input.quality,
    triggerContext: input.triggerContext,
    overview: input.overview,
    code: input.code,
    frameImageUrl: null,
    videoName: input.videoName,
    videoDuration: input.videoDuration,
    creditsUsed: input.creditsUsed,
    runId: input.runId ?? null,
    verificationScore: input.verificationScore ?? null,
    pipelineFamily: input.pipelineFamily ?? null,
    pipelineVersion: input.pipelineVersion ?? null,
    source: input.source,
    createdAt: FieldValue.serverTimestamp(),
  });

  return analysisRef.id;
}

export async function trimAnalysisHistory(userId: string): Promise<void> {
  const snapshot = await adminDb
    .collection(COLLECTIONS.ANALYSES)
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  if (snapshot.size <= MAX_ANALYSES_PER_USER) {
    return;
  }

  const toDelete = snapshot.docs.slice(MAX_ANALYSES_PER_USER);
  const batch = adminDb.batch();
  for (const doc of toDelete) {
    batch.delete(doc.ref);
  }
  await batch.commit();
}
