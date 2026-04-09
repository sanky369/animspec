
import type { VerificationSummary } from '../artifacts';
import type { AuditValidation } from '../schemas/audit';

export function verifyAuditOutput(validation: AuditValidation): VerificationSummary {
  return {
    score: validation.score,
    validator: 'llm',
    summary: validation.summary,
    findings: validation.findings,
    canAutoRevise: validation.canAutoRevise && validation.score < 90,
  };
}
