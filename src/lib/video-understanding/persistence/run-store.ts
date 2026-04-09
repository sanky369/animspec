
import { FieldValue } from 'firebase-admin/firestore';
import { adminDb, adminStorage } from '@/lib/firebase/admin';
import type { AnalysisFamily, ComplexityTier, FinalOutputArtifact, SharedArtifactBundle, StageArtifact, VerificationSummary } from '../artifacts';
import type { OutputFormat, QualityLevel, TriggerContext } from '@/types/analysis';
import { COLLECTIONS } from '@/types/database';

const INLINE_LIMIT = 120_000;

export async function createAnalysisRunRecord(input: {
  runId: string;
  userId: string | null;
  format: OutputFormat;
  quality: QualityLevel;
  triggerContext: TriggerContext;
  family: AnalysisFamily;
  complexity: ComplexityTier;
  pipelineVersion: string;
  generatorModel: string;
  verifierModel?: string;
}): Promise<void> {
  await adminDb.collection(COLLECTIONS.ANALYSIS_RUNS).doc(input.runId).set({
    ...input,
    status: 'running',
    iterationCount: 0,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function finalizeAnalysisRunRecord(input: {
  runId: string;
  status: 'complete' | 'failed';
  finalArtifact?: FinalOutputArtifact;
  verification?: VerificationSummary | null;
  errorMessage?: string;
  stageCount: number;
}): Promise<void> {
  const payload: Record<string, unknown> = {
    status: input.status,
    updatedAt: FieldValue.serverTimestamp(),
    stageCount: input.stageCount,
  };
  if (input.finalArtifact) {
    payload.finalTitle = input.finalArtifact.title;
    payload.finalOverview = input.finalArtifact.overview;
    payload.finalFormat = input.finalArtifact.format;
  }
  if (input.verification) {
    payload.verificationScore = input.verification.score;
    payload.verificationSummary = input.verification.summary;
  }
  if (input.errorMessage) {
    payload.errorMessage = input.errorMessage;
  }
  await adminDb.collection(COLLECTIONS.ANALYSIS_RUNS).doc(input.runId).set(payload, { merge: true });
}

export async function persistArtifacts(input: {
  runId: string;
  sharedArtifacts: SharedArtifactBundle;
  stageArtifacts: StageArtifact[];
  finalArtifact: FinalOutputArtifact;
  verification?: VerificationSummary | null;
}): Promise<void> {
  const coll = adminDb.collection(COLLECTIONS.ANALYSIS_RUNS).doc(input.runId).collection('artifacts');
  await persistArtifactDocument(coll, input.runId, 'shared_artifacts', input.sharedArtifacts, 'shared', 'Shared artifacts');
  for (const artifact of input.stageArtifacts) {
    await persistArtifactDocument(coll, input.runId, artifact.stageId, artifact.payload, artifact.stageType, artifact.stageLabel);
  }
  await persistArtifactDocument(coll, input.runId, 'final_output', input.finalArtifact, 'final_output', input.finalArtifact.title);
  if (input.verification) {
    await persistArtifactDocument(coll, input.runId, 'verification', input.verification, 'verification', input.verification.summary);
  }
}

async function persistArtifactDocument(
  coll: FirebaseFirestore.CollectionReference,
  runId: string,
  docId: string,
  payload: unknown,
  type: string,
  summary: string
): Promise<void> {
  const serialized = JSON.stringify(payload);
  const base = {
    type,
    summary,
    schemaVersion: 1,
    updatedAt: FieldValue.serverTimestamp(),
  } satisfies Record<string, unknown>;

  if (serialized.length <= INLINE_LIMIT) {
    await coll.doc(docId).set({
      ...base,
      storagePath: null,
      payload,
    });
    return;
  }

  const storagePath = `analysis-runs/${runId}/${docId}.json`;
  const bucket = adminStorage.bucket();
  const file = bucket.file(storagePath);
  await file.save(serialized, {
    contentType: 'application/json',
    resumable: false,
  });
  await coll.doc(docId).set({
    ...base,
    payload: null,
    storagePath,
  });
}
