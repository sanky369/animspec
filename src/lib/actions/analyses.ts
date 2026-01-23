'use server';

import { adminDb, adminStorage } from '@/lib/firebase/admin';
import {
  COLLECTIONS,
  MAX_ANALYSES_PER_USER,
  type Analysis,
  type OutputFormat,
  type QualityLevel,
  type TriggerContext,
} from '@/types/database';

interface SaveAnalysisParams {
  userId: string;
  format: OutputFormat;
  quality: QualityLevel;
  triggerContext: TriggerContext;
  overview: string;
  code: string;
  frameImageBase64: string | null;
  videoName: string;
  videoDuration: number;
  creditsUsed: number;
}

export async function saveAnalysis(params: SaveAnalysisParams): Promise<Analysis> {
  const {
    userId,
    format,
    quality,
    triggerContext,
    overview,
    code,
    frameImageBase64,
    videoName,
    videoDuration,
    creditsUsed,
  } = params;

  // Upload frame image to Firebase Storage if provided
  let frameImageUrl: string | null = null;

  if (frameImageBase64) {
    try {
      const bucket = adminStorage.bucket();
      const fileName = `frames/${userId}/${Date.now()}.jpg`;
      const file = bucket.file(fileName);

      // Convert base64 to buffer
      const buffer = Buffer.from(frameImageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64');

      await file.save(buffer, {
        contentType: 'image/jpeg',
        metadata: {
          cacheControl: 'public, max-age=31536000',
        },
      });

      // Make the file publicly accessible
      await file.makePublic();
      frameImageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    } catch (error) {
      console.error('Failed to upload frame image:', error);
      // Continue without the frame image
    }
  }

  const now = new Date();

  const analysisData: Omit<Analysis, 'id'> = {
    userId,
    format,
    quality,
    triggerContext,
    overview,
    code,
    frameImageUrl,
    videoName,
    videoDuration,
    creditsUsed,
    createdAt: now,
  };

  // Add the analysis
  const docRef = await adminDb.collection(COLLECTIONS.ANALYSES).add(analysisData);

  // Enforce the 50 analyses limit - delete oldest if needed
  await enforceAnalysisLimit(userId);

  return {
    id: docRef.id,
    ...analysisData,
  };
}

async function enforceAnalysisLimit(userId: string): Promise<void> {
  const snapshot = await adminDb
    .collection(COLLECTIONS.ANALYSES)
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  if (snapshot.size > MAX_ANALYSES_PER_USER) {
    // Get analyses to delete (everything after the first 50)
    const toDelete = snapshot.docs.slice(MAX_ANALYSES_PER_USER);

    const batch = adminDb.batch();
    for (const doc of toDelete) {
      batch.delete(doc.ref);

      // Also delete the frame image if it exists
      const data = doc.data();
      if (data.frameImageUrl) {
        try {
          const bucket = adminStorage.bucket();
          // Extract file path from URL
          const urlParts = data.frameImageUrl.split(`${bucket.name}/`);
          if (urlParts[1]) {
            await bucket.file(urlParts[1]).delete().catch(() => {});
          }
        } catch {
          // Ignore deletion errors for frame images
        }
      }
    }

    await batch.commit();
  }
}

export async function getAnalyses(userId: string, limit: number = 50): Promise<Analysis[]> {
  const snapshot = await adminDb
    .collection(COLLECTIONS.ANALYSES)
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
    } as Analysis;
  });
}

export async function getAnalysisById(analysisId: string, userId: string): Promise<Analysis | null> {
  const doc = await adminDb.collection(COLLECTIONS.ANALYSES).doc(analysisId).get();

  if (!doc.exists) {
    return null;
  }

  const data = doc.data();

  // Ensure the analysis belongs to the user
  if (data?.userId !== userId) {
    return null;
  }

  return {
    id: doc.id,
    ...data,
    createdAt: data?.createdAt?.toDate() || new Date(),
  } as Analysis;
}

export async function deleteAnalysis(analysisId: string, userId: string): Promise<boolean> {
  const doc = await adminDb.collection(COLLECTIONS.ANALYSES).doc(analysisId).get();

  if (!doc.exists) {
    return false;
  }

  const data = doc.data();

  // Ensure the analysis belongs to the user
  if (data?.userId !== userId) {
    return false;
  }

  // Delete the frame image if it exists
  if (data.frameImageUrl) {
    try {
      const bucket = adminStorage.bucket();
      const urlParts = data.frameImageUrl.split(`${bucket.name}/`);
      if (urlParts[1]) {
        await bucket.file(urlParts[1]).delete().catch(() => {});
      }
    } catch {
      // Ignore deletion errors
    }
  }

  await adminDb.collection(COLLECTIONS.ANALYSES).doc(analysisId).delete();
  return true;
}
