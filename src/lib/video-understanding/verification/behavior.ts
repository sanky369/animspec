
import type { VerificationSummary } from '../artifacts';
import type { BehaviorValidation } from '../schemas/behavior';

export function verifyBehaviorOutput(validation: BehaviorValidation): VerificationSummary {
  return {
    score: validation.score,
    validator: 'llm',
    summary: validation.summary,
    findings: validation.findings,
    canAutoRevise: validation.canAutoRevise && validation.score < 90,
  };
}
