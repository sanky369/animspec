import { createHash, randomBytes } from 'node:crypto';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from '@/lib/firebase/admin';
import { COLLECTIONS } from '@/types/database';

const API_KEY_PREFIX = 'ask_';
const KEY_BYTE_LENGTH = 32;

export interface GeneratedApiKey {
  rawKey: string;
  keyHash: string;
  prefix: string;
}

export interface CreatedApiKey {
  id: string;
  rawKey: string;
  prefix: string;
}

export interface ListedApiKey {
  id: string;
  prefix: string;
  name: string;
  isActive: boolean;
  lastUsedAt: Date | null;
  createdAt: Date;
}

export interface ValidatedApiKey {
  userId: string;
  keyId: string;
}

export function generateApiKey(): GeneratedApiKey {
  const rawKey = `${API_KEY_PREFIX}${randomBytes(KEY_BYTE_LENGTH).toString('hex')}`;
  return {
    rawKey,
    keyHash: hashApiKey(rawKey),
    prefix: rawKey.slice(0, 12),
  };
}

export function hashApiKey(rawKey: string): string {
  return createHash('sha256').update(rawKey).digest('hex');
}

export function isAnimSpecApiKey(value: string | null | undefined): value is string {
  return typeof value === 'string' && value.startsWith(API_KEY_PREFIX);
}

export async function createApiKey(userId: string, name: string): Promise<CreatedApiKey> {
  const { rawKey, keyHash, prefix } = generateApiKey();
  const docRef = adminDb.collection(COLLECTIONS.API_KEYS).doc();

  await docRef.set({
    userId,
    keyHash,
    prefix,
    name: name || 'Default',
    isActive: true,
    lastUsedAt: null,
    createdAt: FieldValue.serverTimestamp(),
  });

  return { id: docRef.id, rawKey, prefix };
}

export async function validateApiKey(rawKey: string): Promise<ValidatedApiKey | null> {
  if (!isAnimSpecApiKey(rawKey)) {
    return null;
  }

  const keyHash = hashApiKey(rawKey);
  const snapshot = await adminDb
    .collection(COLLECTIONS.API_KEYS)
    .where('keyHash', '==', keyHash)
    .where('isActive', '==', true)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  const data = doc.data();

  doc.ref.update({ lastUsedAt: FieldValue.serverTimestamp() }).catch((error) => {
    console.warn(`Failed to update API key usage for ${doc.id}:`, error);
  });

  return {
    userId: data.userId as string,
    keyId: doc.id,
  };
}

export async function listApiKeys(userId: string): Promise<ListedApiKey[]> {
  const snapshot = await adminDb
    .collection(COLLECTIONS.API_KEYS)
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      prefix: String(data.prefix || ''),
      name: String(data.name || 'Default'),
      isActive: Boolean(data.isActive),
      lastUsedAt: data.lastUsedAt?.toDate() ?? null,
      createdAt: data.createdAt?.toDate() ?? new Date(),
    };
  });
}

export async function revokeApiKey(userId: string, keyId: string): Promise<boolean> {
  const docRef = adminDb.collection(COLLECTIONS.API_KEYS).doc(keyId);
  const doc = await docRef.get();

  if (!doc.exists || doc.data()?.userId !== userId) {
    return false;
  }

  await docRef.update({
    isActive: false,
    revokedAt: FieldValue.serverTimestamp(),
  });

  return true;
}

export async function deleteApiKey(userId: string, keyId: string): Promise<boolean> {
  const docRef = adminDb.collection(COLLECTIONS.API_KEYS).doc(keyId);
  const doc = await docRef.get();

  if (!doc.exists || doc.data()?.userId !== userId) {
    return false;
  }

  await docRef.delete();
  return true;
}
