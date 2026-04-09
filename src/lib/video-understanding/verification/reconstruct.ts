
import type { OutputFormat } from '@/types/analysis';
import type { SharedArtifactBundle, VerificationSummary } from '../artifacts';
import type { ReconstructionVerification } from '../schemas/reconstruct';

export function verifyReconstructionOutput(input: {
  format: OutputFormat;
  finalOutput: string;
  sharedArtifacts: SharedArtifactBundle;
  llmVerification: ReconstructionVerification;
}): VerificationSummary {
  const findings: VerificationSummary['findings'] = [...input.llmVerification.discrepancies.map((item) => ({
    issue: item.issue,
    severity: (item.severity === 'critical' ? 'critical' : item.severity === 'major' ? 'high' : 'medium') as 'medium' | 'high' | 'critical',
    recommendation: item.suggestedFix,
  }))];

  let deterministicPenalty = 0;
  if (input.finalOutput.trim().length < 300) {
    deterministicPenalty += 10;
    findings.push({
      issue: 'Final output is unusually short for a deep reconstruction run.',
      severity: 'medium',
      recommendation: 'Expand the answer to cover all scenes, states, and implementation details.',
    });
  }

  if (input.sharedArtifacts.scenes.length > 1 && !/scene|timeline|sequence/i.test(input.finalOutput)) {
    deterministicPenalty += 8;
    findings.push({
      issue: 'Output does not appear to acknowledge multiple scenes or sequences.',
      severity: 'medium',
      recommendation: 'Call out each scene or sequence explicitly in the final output.',
    });
  }

  if (input.sharedArtifacts.video.triggerContext && !input.finalOutput.toLowerCase().includes(String(input.sharedArtifacts.video.triggerContext))) {
    deterministicPenalty += 6;
    findings.push({
      issue: 'Trigger context is missing from the final output.',
      severity: 'low',
      recommendation: `Mention that the interaction is triggered by ${input.sharedArtifacts.video.triggerContext}.`,
    });
  }

  const adjustedScore = Math.max(0, Math.min(100, input.llmVerification.overallScore - deterministicPenalty));
  return {
    score: adjustedScore,
    validator: findings.length === input.llmVerification.discrepancies.length ? 'llm' : 'hybrid',
    summary: input.llmVerification.summary || 'Reconstruction verification complete.',
    findings,
    canAutoRevise: adjustedScore < targetScoreForFormat(input.format),
    evidence: [
      `scene_count=${input.sharedArtifacts.scenes.length}`,
      `output_length=${input.finalOutput.trim().length}`,
      `trigger=${input.sharedArtifacts.video.triggerContext ?? 'unknown'}`,
    ],
  };
}

function targetScoreForFormat(format: OutputFormat): number {
  if (format === 'clone_landing_page' || format === 'clone_component') return 88;
  return 84;
}
