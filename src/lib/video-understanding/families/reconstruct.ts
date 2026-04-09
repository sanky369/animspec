
    import { extractOverview } from '@/lib/ai/output-parsers';
    import { getFormatTemplate } from '@/lib/ai/prompts';
    import type { OutputFormat, TriggerContext, VideoMetadata } from '@/types/analysis';
    import type { FinalOutputArtifact, PipelinePlan, SharedArtifactBundle, StageArtifact, VerificationSummary } from '../artifacts';
    import { nowIso } from '../artifacts';
    import { generateJson, generateText, streamText } from '../providers/gemini-runner';
    import {
      sceneDecompositionJsonSchema,
      sceneDecompositionSchema,
      reconstructionVerificationJsonSchema,
      reconstructionVerificationSchema,
      type SceneDecomposition,
    } from '../schemas/reconstruct';
    import { verifyReconstructionOutput } from '../verification/reconstruct';
import { mergeRenderDiffVerification, tryRenderDiffVerification } from '../verification/render-diff';

    export interface ReconstructFamilyResult {
      stageArtifacts: StageArtifact[];
      finalArtifact: FinalOutputArtifact;
      verification: VerificationSummary;
    }

    export interface ReconstructFamilyOptions {
      apiKey: string;
      plan: PipelinePlan;
      format: OutputFormat;
      triggerContext: TriggerContext;
      videoMetadata: VideoMetadata | null;
      sharedArtifacts: SharedArtifactBundle;
      emit: (event: {
        type: string;
        stageId?: string;
        stageLabel?: string;
        stageIndex?: number;
        totalStages?: number;
        message?: string;
        chunk?: string;
        data?: string;
        verification?: VerificationSummary;
        iteration?: number;
        reason?: string;
      }) => Promise<void>;
    }

    export async function executeReconstructFamily(options: ReconstructFamilyOptions): Promise<ReconstructFamilyResult> {
      const stageArtifacts: StageArtifact[] = [];
      const totalStages = options.plan.stages.length;

      const sceneMap = await runSceneMapStage(options, stageArtifacts, totalStages, 1);
      const motionAnalysis = await runMotionStage(options, stageArtifacts, totalStages, 2, sceneMap);
      let finalOutput = await runGenerationStage(options, stageArtifacts, totalStages, 3, sceneMap, motionAnalysis);
      const llmVerification = await runVerificationStage(options, stageArtifacts, totalStages, 4, sceneMap, finalOutput);
      let verification = verifyReconstructionOutput({
        format: options.format,
        finalOutput,
        sharedArtifacts: options.sharedArtifacts,
        llmVerification,
      });
      await options.emit({ type: 'verification', verification });

      if (verification.canAutoRevise && options.plan.maxIterations > 0) {
        await options.emit({ type: 'revision_start', iteration: 1, reason: verification.summary });
        finalOutput = await runRevisionStage(options, stageArtifacts, totalStages, 5, finalOutput, verification);
        const revisedVerification = await runVerificationStage(options, stageArtifacts, totalStages, 4, sceneMap, finalOutput, true);
        verification = verifyReconstructionOutput({
          format: options.format,
          finalOutput,
          sharedArtifacts: options.sharedArtifacts,
          llmVerification: revisedVerification,
        });
        await options.emit({ type: 'verification', verification });
      }

      const renderDiff = await tryRenderDiffVerification({
        format: options.format,
        finalOutput,
        sharedArtifacts: options.sharedArtifacts,
      });
      verification = mergeRenderDiffVerification(verification, renderDiff);

      const finalArtifact: FinalOutputArtifact = {
        format: options.format,
        content: finalOutput,
        title: 'Deep Analysis Result',
        overview: extractOverview(finalOutput),
        verification,
      };

      return { stageArtifacts, finalArtifact, verification };
    }

    async function runSceneMapStage(
      options: ReconstructFamilyOptions,
      stageArtifacts: StageArtifact[],
      totalStages: number,
      stageIndex: number
    ): Promise<SceneDecomposition> {
      const stageId = 'reconstruct_map';
      const stageLabel = 'Map scenes and states';
      await options.emit({ type: 'stage_start', stageId, stageLabel, stageIndex, totalStages });
      const prompt = buildSceneMapPrompt(options.videoMetadata, options.triggerContext, options.sharedArtifacts);
      const payload = await generateJson<SceneDecomposition>({
        apiKey: options.apiKey,
        model: options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt,
        schema: sceneDecompositionJsonSchema,
        validate: (value) => sceneDecompositionSchema.parse(value),
      });
      stageArtifacts.push({ stageId, stageType: 'structured_json', stageLabel, status: 'complete', payload, createdAt: nowIso(), summary: `${payload.scenes.length} scenes` });
      await options.emit({ type: 'stage_complete', stageId, stageLabel, stageIndex, totalStages, message: `${payload.scenes.length} scenes mapped` });
      return payload;
    }

    async function runMotionStage(
      options: ReconstructFamilyOptions,
      stageArtifacts: StageArtifact[],
      totalStages: number,
      stageIndex: number,
      sceneMap: SceneDecomposition
    ): Promise<string> {
      const stageId = 'reconstruct_motion';
      const stageLabel = 'Analyze motion and visual details';
      await options.emit({ type: 'stage_start', stageId, stageLabel, stageIndex, totalStages });
      const prompt = buildMotionPrompt(sceneMap, options.videoMetadata, options.sharedArtifacts);
      const text = await streamText({
        apiKey: options.apiKey,
        model: options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt,
        maxOutputTokens: 10000,
        temperature: 0.1,
      }, {
        onThought: async (chunk) => options.emit({ type: 'thinking', stageId, stageLabel, stageIndex, totalStages, chunk }),
        onChunk: async (chunk) => options.emit({ type: 'stage_output', stageId, stageLabel, stageIndex, totalStages, chunk }),
      });
      stageArtifacts.push({ stageId, stageType: 'text', stageLabel, status: 'complete', payload: text, createdAt: nowIso(), summary: 'Motion analysis complete' });
      await options.emit({ type: 'stage_complete', stageId, stageLabel, stageIndex, totalStages, message: 'Motion analysis complete' });
      return text;
    }

    async function runGenerationStage(
      options: ReconstructFamilyOptions,
      stageArtifacts: StageArtifact[],
      totalStages: number,
      stageIndex: number,
      sceneMap: SceneDecomposition,
      motionAnalysis: string
    ): Promise<string> {
      const stageId = 'reconstruct_generate';
      const stageLabel = 'Generate final output';
      await options.emit({ type: 'stage_start', stageId, stageLabel, stageIndex, totalStages });
      const prompt = buildGenerationPrompt(sceneMap, motionAnalysis, options.format, options.triggerContext, options.videoMetadata);
      const text = await streamText({
        apiKey: options.apiKey,
        model: options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt,
        maxOutputTokens: 14000,
        temperature: 0.15,
      }, {
        onThought: async (chunk) => options.emit({ type: 'thinking', stageId, stageLabel, stageIndex, totalStages, chunk }),
        onChunk: async (chunk) => options.emit({ type: 'stage_output', stageId, stageLabel, stageIndex, totalStages, chunk }),
      });
      stageArtifacts.push({ stageId, stageType: 'text', stageLabel, status: 'complete', payload: text, createdAt: nowIso(), summary: extractOverview(text) });
      await options.emit({ type: 'stage_complete', stageId, stageLabel, stageIndex, totalStages, message: 'Final output generated' });
      return text;
    }

    async function runVerificationStage(
      options: ReconstructFamilyOptions,
      stageArtifacts: StageArtifact[],
      totalStages: number,
      stageIndex: number,
      sceneMap: SceneDecomposition,
      finalOutput: string,
      isRevision: boolean = false
    ) {
      const stageId = isRevision ? 'reconstruct_verify_revised' : 'reconstruct_verify';
      const stageLabel = isRevision ? 'Verify revised output' : 'Verify fidelity';
      await options.emit({ type: 'stage_start', stageId, stageLabel, stageIndex, totalStages });
      const prompt = buildVerificationPrompt(sceneMap, finalOutput, options.videoMetadata, options.triggerContext);
      const payload = await generateJson({
        apiKey: options.apiKey,
        model: options.plan.verifierModel || options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt,
        schema: reconstructionVerificationJsonSchema,
        validate: (value) => reconstructionVerificationSchema.parse(value),
      });
      stageArtifacts.push({ stageId, stageType: 'structured_json', stageLabel, status: 'complete', payload, createdAt: nowIso(), summary: `score ${payload.overallScore}` });
      await options.emit({ type: 'stage_complete', stageId, stageLabel, stageIndex, totalStages, message: `Verification score ${payload.overallScore}` });
      return payload;
    }

    async function runRevisionStage(
      options: ReconstructFamilyOptions,
      stageArtifacts: StageArtifact[],
      totalStages: number,
      stageIndex: number,
      finalOutput: string,
      verification: VerificationSummary
    ): Promise<string> {
      const stageId = 'reconstruct_revise';
      const stageLabel = 'Refine from verification';
      await options.emit({ type: 'stage_start', stageId, stageLabel, stageIndex, totalStages });
      const prompt = buildRevisionPrompt(finalOutput, verification, options.format, options.videoMetadata, options.triggerContext);
      const text = await generateText({
        apiKey: options.apiKey,
        model: options.plan.generatorModel,
        video: options.sharedArtifacts.video,
        artifacts: options.sharedArtifacts,
        prompt,
        maxOutputTokens: 14000,
        temperature: 0.1,
      });
      stageArtifacts.push({ stageId, stageType: 'revision', stageLabel, status: 'complete', payload: text, createdAt: nowIso(), summary: extractOverview(text) });
      await options.emit({ type: 'stage_complete', stageId, stageLabel, stageIndex, totalStages, message: 'Revision complete' });
      return text;
    }

    function buildSceneMapPrompt(metadata: VideoMetadata | null, triggerContext: TriggerContext, artifacts: SharedArtifactBundle): string {
      return `You are building a scene/state map for a UI video reconstruction run.
Return valid JSON only.
Use the attached video and preview image.
Video metadata: ${JSON.stringify(metadata)}
User trigger context: ${triggerContext ?? 'unknown'}
Shared artifact summary: scenes=${artifacts.scenes.length}, motionRegions=${artifacts.motion.length}, stateHints=${artifacts.stateHints.length}
Describe every distinct scene or state transition.`;
    }

    function buildMotionPrompt(sceneMap: SceneDecomposition, metadata: VideoMetadata | null, artifacts: SharedArtifactBundle): string {
      return `You are an expert motion analyst.
Use the attached video as source of truth.
Scene map:
${JSON.stringify(sceneMap, null, 2)}
Shared artifacts:
${JSON.stringify({ motion: artifacts.motion, stateHints: artifacts.stateHints }, null, 2)}
Video metadata:
${JSON.stringify(metadata, null, 2)}
Write a detailed motion analysis covering timing, easing, element relationships, state changes, and subtle visual details.`;
    }

    function buildGenerationPrompt(
      sceneMap: SceneDecomposition,
      motionAnalysis: string,
      format: OutputFormat,
      triggerContext: TriggerContext,
      metadata: VideoMetadata | null
    ): string {
      return `You are generating the final deliverable for a deep reconstruction run.
Use the exact details below. Do not include self-critique or verification JSON.
Trigger context: ${triggerContext ?? 'unknown'}
Video metadata: ${JSON.stringify(metadata)}
Scene map:
${JSON.stringify(sceneMap, null, 2)}
Motion analysis:
${motionAnalysis.slice(0, 16000)}
Format template:
${getFormatTemplate(format)}`;
    }

    function buildVerificationPrompt(
      sceneMap: SceneDecomposition,
      finalOutput: string,
      metadata: VideoMetadata | null,
      triggerContext: TriggerContext
    ): string {
      return `You are validating a reconstruction output against the attached source video.
Return valid JSON only.
Trigger context: ${triggerContext ?? 'unknown'}
Video metadata: ${JSON.stringify(metadata)}
Scene map:
${JSON.stringify(sceneMap, null, 2)}
Final output to verify:
${finalOutput.slice(0, 16000)}
Score fidelity from 0 to 100 and list concrete corrections.`;
    }

    function buildRevisionPrompt(
      finalOutput: string,
      verification: VerificationSummary,
      format: OutputFormat,
      metadata: VideoMetadata | null,
      triggerContext: TriggerContext
    ): string {
      return `Revise the output below using the verification findings.
Do not add an explanation. Return only the improved final deliverable for format ${format}.
Trigger context: ${triggerContext ?? 'unknown'}
Video metadata: ${JSON.stringify(metadata)}
Verification summary: ${verification.summary}
Findings:
${JSON.stringify(verification.findings, null, 2)}
Current output:
${finalOutput.slice(0, 16000)}`;
    }
