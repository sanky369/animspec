'use server';

import { adminDb } from '@/lib/firebase/admin';
import {
  COLLECTIONS,
  CREDIT_COSTS,
  DEFAULT_FREE_CREDITS,
  type UserProfile,
  type CreditTransaction,
  type QualityLevel
} from '@/types/database';
import { FieldValue } from 'firebase-admin/firestore';

export async function createUserProfile(
  userId: string,
  email: string,
  fullName: string | null = null,
  avatarUrl: string | null = null
): Promise<UserProfile> {
  const now = new Date();

  const profile: UserProfile = {
    id: userId,
    email,
    fullName,
    avatarUrl,
    creditsBalance: DEFAULT_FREE_CREDITS,
    creditsExpiresAt: null,
    hasUsedFreeTrial: false,
    isPaidUser: false,
    createdAt: now,
    updatedAt: now,
  };

  await adminDb.collection(COLLECTIONS.PROFILES).doc(userId).set(profile);

  // Create signup bonus transaction
  const transaction: Omit<CreditTransaction, 'id'> = {
    userId,
    amount: DEFAULT_FREE_CREDITS,
    type: 'signup_bonus',
    quality: null,
    description: 'Welcome bonus - 20 free credits',
    analysisId: null,
    purchaseId: null,
    createdAt: now,
  };

  await adminDb.collection(COLLECTIONS.CREDIT_TRANSACTIONS).add(transaction);

  return profile;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const doc = await adminDb.collection(COLLECTIONS.PROFILES).doc(userId).get();

  if (!doc.exists) {
    return null;
  }

  const data = doc.data();
  return {
    ...data,
    createdAt: data?.createdAt?.toDate() || new Date(),
    updatedAt: data?.updatedAt?.toDate() || new Date(),
    creditsExpiresAt: data?.creditsExpiresAt?.toDate() || null,
  } as UserProfile;
}

export async function getCreditsBalance(userId: string): Promise<number> {
  const profile = await getUserProfile(userId);
  return profile?.creditsBalance ?? 0;
}

export async function checkCredits(
  userId: string,
  quality: QualityLevel
): Promise<{ canProceed: boolean; balance: number; cost: number; error?: string }> {
  const profile = await getUserProfile(userId);

  if (!profile) {
    return { canProceed: false, balance: 0, cost: 0, error: 'User profile not found' };
  }

  const cost = CREDIT_COSTS[quality];
  const balance = profile.creditsBalance;

  // Check if user can afford
  if (balance < cost) {
    return {
      canProceed: false,
      balance,
      cost,
      error: `Insufficient credits. Need ${cost}, have ${balance}`
    };
  }

  // Check if precise mode is allowed (only for paid users)
  if (quality === 'precise' && !profile.isPaidUser) {
    return {
      canProceed: false,
      balance,
      cost,
      error: 'Precise mode requires a paid account. Purchase credits to unlock.'
    };
  }

  return { canProceed: true, balance, cost };
}

export async function deductCredits(
  userId: string,
  quality: QualityLevel,
  analysisId: string
): Promise<{ success: boolean; newBalance: number; error?: string }> {
  const cost = CREDIT_COSTS[quality];
  const profileRef = adminDb.collection(COLLECTIONS.PROFILES).doc(userId);

  try {
    const result = await adminDb.runTransaction(async (transaction) => {
      const profileDoc = await transaction.get(profileRef);

      if (!profileDoc.exists) {
        throw new Error('User profile not found');
      }

      const profile = profileDoc.data() as UserProfile;

      if (profile.creditsBalance < cost) {
        throw new Error('Insufficient credits');
      }

      const newBalance = profile.creditsBalance - cost;

      // Update profile
      transaction.update(profileRef, {
        creditsBalance: newBalance,
        updatedAt: FieldValue.serverTimestamp(),
      });

      // Create transaction record
      const creditTx: Omit<CreditTransaction, 'id'> = {
        userId,
        amount: -cost,
        type: 'analysis',
        quality,
        description: `Analysis (${quality} quality)`,
        analysisId,
        purchaseId: null,
        createdAt: new Date(),
      };

      const txRef = adminDb.collection(COLLECTIONS.CREDIT_TRANSACTIONS).doc();
      transaction.set(txRef, creditTx);

      return newBalance;
    });

    return { success: true, newBalance: result as number };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to deduct credits';
    return { success: false, newBalance: 0, error: message };
  }
}

export async function addCredits(
  userId: string,
  amount: number,
  purchaseId: string,
  description: string
): Promise<{ success: boolean; newBalance: number; error?: string }> {
  const profileRef = adminDb.collection(COLLECTIONS.PROFILES).doc(userId);

  try {
    const result = await adminDb.runTransaction(async (transaction) => {
      const profileDoc = await transaction.get(profileRef);

      if (!profileDoc.exists) {
        throw new Error('User profile not found');
      }

      const profile = profileDoc.data() as UserProfile;
      const newBalance = profile.creditsBalance + amount;

      // Update profile - also mark as paid user
      transaction.update(profileRef, {
        creditsBalance: newBalance,
        isPaidUser: true,
        updatedAt: FieldValue.serverTimestamp(),
      });

      // Create transaction record
      const creditTx: Omit<CreditTransaction, 'id'> = {
        userId,
        amount,
        type: 'purchase',
        quality: null,
        description,
        analysisId: null,
        purchaseId,
        createdAt: new Date(),
      };

      const txRef = adminDb.collection(COLLECTIONS.CREDIT_TRANSACTIONS).doc();
      transaction.set(txRef, creditTx);

      return newBalance;
    });

    return { success: true, newBalance: result as number };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to add credits';
    return { success: false, newBalance: 0, error: message };
  }
}

export async function getCreditTransactions(
  userId: string,
  limit: number = 50
): Promise<CreditTransaction[]> {
  const snapshot = await adminDb
    .collection(COLLECTIONS.CREDIT_TRANSACTIONS)
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
    } as CreditTransaction;
  });
}
