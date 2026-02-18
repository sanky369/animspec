import { randomBytes, createHash } from 'crypto';
import { adminDb } from '@/lib/firebase/admin';
import { COLLECTIONS } from '@/types/database';
import { FieldValue } from 'firebase-admin/firestore';

const API_KEY_PREFIX = 'ask_'; // animspec key
const KEY_BYTE_LENGTH = 32; // 256-bit key

/**
 * Generate a cryptographically secure API key.
 * Returns the raw key (shown once to the user) and its SHA-256 hash (stored).
 */
export function generateApiKey(): { rawKey: string; keyHash: string; prefix: string } {
  const raw = randomBytes(KEY_BYTE_LENGTH).toString('hex');
  const rawKey = `${API_KEY_PREFIX}${raw}`;
  const keyHash = hashApiKey(rawKey);
  const prefix = rawKey.slice(0, 12); // "ask_a1b2c3d4"
  return { rawKey, keyHash, prefix };
}

/**
 * SHA-256 hash of an API key for storage/lookup.
 */
export function hashApiKey(rawKey: string): string {
  return createHash('sha256').update(rawKey).digest('hex');
}

/**
 * Create a new API key for a user. Returns the raw key (only shown once).
 */
export async function createApiKey(
  userId: string,
  name: string
): Promise<{ id: string; rawKey: string; prefix: string }> {
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

/**
 * Validate an API key and return the associated userId.
 * Returns null if the key is invalid or revoked.
 * Updates lastUsedAt on successful validation.
 */
export async function validateApiKey(
  rawKey: string
): Promise<{ userId: string; keyId: string } | null> {
  if (!rawKey.startsWith(API_KEY_PREFIX)) {
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

  // Update lastUsedAt (non-blocking)
  doc.ref.update({ lastUsedAt: FieldValue.serverTimestamp() }).catch(() => {});

  return { userId: data.userId, keyId: doc.id };
}

/**
 * List all API keys for a user (without revealing the full key).
 */
export async function listApiKeys(
  userId: string
): Promise<Array<{ id: string; prefix: string; name: string; isActive: boolean; lastUsedAt: Date | null; createdAt: Date }>> {
  const snapshot = await adminDb
    .collection(COLLECTIONS.API_KEYS)
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      prefix: data.prefix,
      name: data.name,
      isActive: data.isActive,
      lastUsedAt: data.lastUsedAt?.toDate() ?? null,
      createdAt: data.createdAt?.toDate() ?? new Date(),
    };
  });
}

/**
 * Revoke an API key.
 */
export async function revokeApiKey(userId: string, keyId: string): Promise<boolean> {
  const docRef = adminDb.collection(COLLECTIONS.API_KEYS).doc(keyId);
  const doc = await docRef.get();

  if (!doc.exists || doc.data()?.userId !== userId) {
    return false;
  }

  await docRef.update({ isActive: false });
  return true;
}
