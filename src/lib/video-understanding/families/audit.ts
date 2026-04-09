
    import { extractOverview } from '@/lib/ai/output-parsers';
    import { buildAnalysisPrompt } from '@/lib/ai/prompts';
    import type { OutputFormat, TriggerContext, VideoMetadata } from '@/types/analysis';
    import type { FinalOutputArtifact, PipelinePlan, SharedArtifactBundle, StageArtifact, VerificationSummary } from '../artifacts';
    import { nowIso } from '../artifacts';
    import { generateJson, generateText } from '../providers/gemini-runner';
    import { auditSegmentationJsonSchema, auditSegmentationSchema, auditValidationJsonSchema, auditValidationSchema, type AuditSegmentation } from '../schemas/audit';
    import { verifyAuditOutput } from '../verification/audit';

    export async function executeAuditFamily(options: {
      apiKey: string;
      plan: PipelinePlan;
      format: OutputFormat;
      triggerContext: TriggerContext;
      videoMetadata: VideoMetadata | null;
      sharedArtifacts: SharedArtifactBundle;
      emit: (event: Record<string, unknown>) => Promise<void>;
    }): Promise<{ stageArtifacts: StageArtifact[]; finalArtifact: FinalOutputArtifact; verification: VerificationSummary }> {
      const stageArtifacts: StageArtifact[] = [];
      const totalStages = options.plan.stages.length;

      await options.emit({ type: 'stage_start', stageId: 'audit_flow', stageLabel: 'Segment flow and intent', stageIndex: 1, totalStages });
      const segmentation = await generateJson<AuditSegmentation>({
        apiKey: options.apiKey,
        model: options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt: `Return valid JSON only. Segment the attached product flow into steps, infer the primary user goal, list strengths, list risks, and note friction signals for each step. Metadata: ${JSON.stringify(options.videoMetadata)}`,
        schema: auditSegmentationJsonSchema,
        validate: (value) => auditSegmentationSchema.parse(value),
      });
      stageArtifacts.push({ stageId: 'audit_flow', stageType: 'structured_json', stageLabel: 'Segment flow and intent', status: 'complete', payload: segmentation, createdAt: nowIso(), summary: `${segmentation.steps.length} steps` });
      await options.emit({ type: 'stage_complete', stageId: 'audit_flow', stageLabel: 'Segment flow and intent', stageIndex: 1, totalStages, message: `${segmentation.steps.length} steps segmented` });

      await options.emit({ type: 'stage_start', stageId: 'audit_generate', stageLabel: 'Synthesize audit', stageIndex: 2, totalStages });
      const auditOutput = await generateText({
        apiKey: options.apiKey,
        model: options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt: `${buildAnalysisPrompt(options.format, options.triggerContext, options.videoMetadata, 'precise')}

Flow segmentation:
${JSON.stringify(segmentation, null, 2)}

Write the final audit only.`,
        maxOutputTokens: 12000,
        temperature: 0.2,
      });
      stageArtifacts.push({ stageId: 'audit_generate', stageType: 'text', stageLabel: 'Synthesize audit', status: 'complete', payload: auditOutput, createdAt: nowIso(), summary: extractOverview(auditOutput) });
      await options.emit({ type: 'stage_output', stageId: 'audit_generate', stageLabel: 'Synthesize audit', stageIndex: 2, totalStages, chunk: auditOutput });
      await options.emit({ type: 'stage_complete', stageId: 'audit_generate', stageLabel: 'Synthesize audit', stageIndex: 2, totalStages, message: 'Audit synthesized' });

      await options.emit({ type: 'stage_start', stageId: 'audit_verify', stageLabel: 'Validate audit quality', stageIndex: 3, totalStages });
      const validation = await generateJson({
        apiKey: options.apiKey,
        model: options.plan.verifierModel || options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt: `Return valid JSON only. Validate whether this audit is specific, evidence-based, prioritized, and covers the visible flow.
Flow segmentation:
${JSON.stringify(segmentation, null, 2)}
Audit:
${auditOutput.slice(0, 16000)}`,
        schema: auditValidationJsonSchema,
        validate: (value) => auditValidationSchema.parse(value),
      });
      const verification = verifyAuditOutput(validation);
      stageArtifacts.push({ stageId: 'audit_verify', stageType: 'structured_json', stageLabel: 'Validate audit quality', status: 'complete', payload: validation, createdAt: nowIso(), summary: `score ${verification.score}` });
      await options.emit({ type: 'verification', verification });
      await options.emit({ type: 'stage_complete', stageId: 'audit_verify', stageLabel: 'Validate audit quality', stageIndex: 3, totalStages, message: `Audit score ${verification.score}` });

      let finalOutput = auditOutput;
      if (verification.canAutoRevise && options.plan.maxIterations > 0) {
        await options.emit({ type: 'revision_start', iteration: 1, reason: verification.summary });
        await options.emit({ type: 'stage_start', stageId: 'audit_revise', stageLabel: 'Refine from verification', stageIndex: totalStages, totalStages });
        finalOutput = await generateText({
          apiKey: options.apiKey,
          model: options.plan.generatorModel,
          video: options.sharedArtifacts.video,
          artifacts: options.sharedArtifacts,
          prompt: `Revise this audit using the findings below. Return only the improved final audit.
Findings:
${JSON.stringify(verification.findings, null, 2)}
Current audit:
${auditOutput.slice(0, 16000)}`,
          maxOutputTokens: 12000,
          temperature: 0.15,
        });
        stageArtifacts.push({ stageId: 'audit_revise', stageType: 'revision', stageLabel: 'Refine from verification', status: 'complete', payload: finalOutput, createdAt: nowIso(), summary: extractOverview(finalOutput) });
        await options.emit({ type: 'stage_complete', stageId: 'audit_revise', stageLabel: 'Refine from verification', stageIndex: totalStages, totalStages, message: 'Audit revision complete' });
      }

      const finalArtifact: FinalOutputArtifact = {
        format: options.format,
        content: finalOutput,
        title: 'Deep Audit Result',
        overview: extractOverview(finalOutput),
        verification,
      };
      return { stageArtifacts, finalArtifact, verification };
    }
