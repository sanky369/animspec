
    import { extractOverview } from '@/lib/ai/output-parsers';
    import { buildAnalysisPrompt } from '@/lib/ai/prompts';
    import type { OutputFormat, TriggerContext, VideoMetadata } from '@/types/analysis';
    import type { FinalOutputArtifact, PipelinePlan, SharedArtifactBundle, StageArtifact, VerificationSummary } from '../artifacts';
    import { nowIso } from '../artifacts';
    import { generateJson, generateText } from '../providers/gemini-runner';
    import { behaviorInventoryJsonSchema, behaviorInventorySchema, behaviorValidationJsonSchema, behaviorValidationSchema, type BehaviorInventory } from '../schemas/behavior';
    import { verifyBehaviorOutput } from '../verification/behavior';

    export async function executeBehaviorFamily(options: {
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

      await options.emit({ type: 'stage_start', stageId: 'behavior_inventory', stageLabel: 'Extract states and transitions', stageIndex: 1, totalStages });
      const inventory = await generateJson<BehaviorInventory>({
        apiKey: options.apiKey,
        model: options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt: `Return valid JSON only. Extract all observable states and transitions from the attached UI video. Metadata: ${JSON.stringify(options.videoMetadata)}`,
        schema: behaviorInventoryJsonSchema,
        validate: (value) => behaviorInventorySchema.parse(value),
      });
      stageArtifacts.push({ stageId: 'behavior_inventory', stageType: 'structured_json', stageLabel: 'Extract states and transitions', status: 'complete', payload: inventory, createdAt: nowIso(), summary: `${inventory.states.length} states` });
      await options.emit({ type: 'stage_complete', stageId: 'behavior_inventory', stageLabel: 'Extract states and transitions', stageIndex: 1, totalStages, message: `${inventory.states.length} states extracted` });

      await options.emit({ type: 'stage_start', stageId: 'behavior_generate', stageLabel: 'Generate behavioral spec', stageIndex: 2, totalStages });
      const behaviorOutput = await generateText({
        apiKey: options.apiKey,
        model: options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt: `${buildAnalysisPrompt(options.format, options.triggerContext, options.videoMetadata, 'precise')}

Behavior inventory:
${JSON.stringify(inventory, null, 2)}

Write the final behavioral output only.`,
        maxOutputTokens: 12000,
        temperature: 0.15,
      });
      stageArtifacts.push({ stageId: 'behavior_generate', stageType: 'text', stageLabel: 'Generate behavioral spec', status: 'complete', payload: behaviorOutput, createdAt: nowIso(), summary: extractOverview(behaviorOutput) });
      await options.emit({ type: 'stage_output', stageId: 'behavior_generate', stageLabel: 'Generate behavioral spec', stageIndex: 2, totalStages, chunk: behaviorOutput });
      await options.emit({ type: 'stage_complete', stageId: 'behavior_generate', stageLabel: 'Generate behavioral spec', stageIndex: 2, totalStages, message: 'Behavioral output generated' });

      await options.emit({ type: 'stage_start', stageId: 'behavior_verify', stageLabel: 'Validate consistency', stageIndex: 3, totalStages });
      const validation = await generateJson({
        apiKey: options.apiKey,
        model: options.plan.verifierModel || options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt: `Return valid JSON only. Validate whether this behavioral output is consistent with the observed states and transitions.
Inventory:
${JSON.stringify(inventory, null, 2)}
Behavior output:
${behaviorOutput.slice(0, 16000)}`,
        schema: behaviorValidationJsonSchema,
        validate: (value) => behaviorValidationSchema.parse(value),
      });
      const verification = verifyBehaviorOutput(validation);
      stageArtifacts.push({ stageId: 'behavior_verify', stageType: 'structured_json', stageLabel: 'Validate consistency', status: 'complete', payload: validation, createdAt: nowIso(), summary: `score ${verification.score}` });
      await options.emit({ type: 'verification', verification });
      await options.emit({ type: 'stage_complete', stageId: 'behavior_verify', stageLabel: 'Validate consistency', stageIndex: 3, totalStages, message: `Behavior score ${verification.score}` });

      let finalOutput = behaviorOutput;
      if (verification.canAutoRevise && options.plan.maxIterations > 0) {
        await options.emit({ type: 'revision_start', iteration: 1, reason: verification.summary });
        await options.emit({ type: 'stage_start', stageId: 'behavior_revise', stageLabel: 'Refine from verification', stageIndex: totalStages, totalStages });
        finalOutput = await generateText({
          apiKey: options.apiKey,
          model: options.plan.generatorModel,
          video: options.sharedArtifacts.video,
          artifacts: options.sharedArtifacts,
          prompt: `Revise this behavioral spec using the findings below. Return only the improved output.
Findings:
${JSON.stringify(verification.findings, null, 2)}
Current output:
${behaviorOutput.slice(0, 16000)}`,
          maxOutputTokens: 12000,
          temperature: 0.1,
        });
        stageArtifacts.push({ stageId: 'behavior_revise', stageType: 'revision', stageLabel: 'Refine from verification', status: 'complete', payload: finalOutput, createdAt: nowIso(), summary: extractOverview(finalOutput) });
        await options.emit({ type: 'stage_complete', stageId: 'behavior_revise', stageLabel: 'Refine from verification', stageIndex: totalStages, totalStages, message: 'Behavior revision complete' });
      }

      const finalArtifact: FinalOutputArtifact = {
        format: options.format,
        content: finalOutput,
        title: 'Deep Behavioral Result',
        overview: extractOverview(finalOutput),
        verification,
      };
      return { stageArtifacts, finalArtifact, verification };
    }
