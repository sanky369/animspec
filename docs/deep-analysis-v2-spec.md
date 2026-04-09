# Deep Analysis V2 — Unified Video Understanding Execution Spec

This document is the source of truth for upgrading AnimSpec's optional Deep Analysis workflow from a fixed 4-pass prompt chain into a scalable video-understanding system that can serve current and future use cases. It is intentionally written so a new contributor can start from this file alone and understand what to build, why it matters, where it lives, how to validate it, and how the rollout is staged.

This spec is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept current as implementation proceeds.

## Purpose / Big Picture

After this program is complete, a user who enables Deep Analysis will no longer get one generic expensive flow for every job. Instead, the system will extract reusable video facts once, choose the right analysis family for the requested output, validate intermediate artifacts, refine results when verification finds problems, and use external signals where available. The result should be measurably better outputs for clone-style formats, better audit quality for review formats, and a platform that can absorb future use cases without rewriting the whole stack.

User-visible outcome: the existing “Deep Analyze” toggle remains optional, but when it is enabled the output becomes more reliable, more format-aware, easier to debug, and more defensible. The system should show clearer progress, save cleaner history, and provide verification that actually improves the answer instead of merely commenting on it.

## Progress

- [x] (2026-04-09 10:13Z) Audited the current deep-analysis implementation across `src/app/api/analyze/route.ts`, `src/lib/ai/agentic-pipeline.ts`, `src/lib/ai/agentic-prompts.ts`, `src/lib/ai/prompts.ts`, `src/hooks/use-analysis.ts`, and related type/parser files.
- [x] (2026-04-09 10:13Z) Validated which earlier critique points are correct, which are partially correct, and which need nuance.
- [x] (2026-04-09 10:13Z) Authored this execution spec for the full V2 architecture and phased rollout.
- [ ] Implement Milestone 1: separate pass artifacts, add structured outputs, preserve final artifact purity, and feed verification into revision.
- [ ] Implement Milestone 2: pipeline planner and analysis-family routing.
- [ ] Implement Milestone 3: deterministic preprocessing artifact layer.
- [ ] Implement Milestone 4: closed-loop refinement and adaptive budgets.
- [ ] Implement Milestone 5: external verification for reconstruction formats.
- [ ] Implement Milestone 6: evaluation harness, telemetry, pricing revision, and production hardening.

## Surprises & Discoveries

- Observation: the current deep pipeline concatenates Pass 1, Pass 2, Pass 3, and Pass 4 output into a single `fullResult` string.
  Evidence: `src/app/api/analyze/route.ts` appends every `chunk` event from `runAgenticPipeline()` into one buffer, then stores that entire buffer as `code`.

- Observation: verification is surfaced in the UI, but it does not improve the generated result.
  Evidence: `src/hooks/use-analysis.ts` extracts a verification report from the final output, but `src/lib/ai/agentic-pipeline.ts` never regenerates Pass 3 after Pass 4.

- Observation: the agentic prompts hard-truncate prior-pass context.
  Evidence: `src/lib/ai/agentic-prompts.ts` slices decomposition, deep analysis, and generated code to 3–6K characters before feeding them into later passes.

- Observation: Deep Analysis is currently one motion-first pipeline reused for all Gemini deep jobs, even when the requested format is not fundamentally a motion-reconstruction task.
  Evidence: `runAgenticPipeline()` always executes scene decomposition → motion analysis → code generation → self-verification regardless of `format`.

- Observation: trigger context is collected from the UI and passed into standard Gemini/Kimi prompts, but the agentic 4-pass prompts do not meaningfully integrate it.
  Evidence: `buildAnalysisPrompt()` uses `triggerContext`; `buildPass1Prompt()` / `buildPass2Prompt()` / `buildPass3Prompt()` / `buildPass4Prompt()` do not.

- Observation: large Gemini jobs are now uploaded through Gemini Files once, but each pass still reuses the same video as a fresh model input.
  Evidence: `src/hooks/use-analysis.ts` uploads to `/api/upload` once; `runAgenticPipeline()` still attaches `videoPart` to every pass.

## Decision Log

- Decision: the target architecture will use a shared artifact layer plus multiple pipeline families, not one universal “deep” prompt chain.
  Rationale: reconstruction, audit, and behavior extraction are different reasoning problems and should not be forced through one motion-first sequence.
  Date/Author: 2026-04-09 / Codex

- Decision: the existing `analyses` collection remains the product-facing summary record, while new run-level and artifact-level records are introduced for deep analysis.
  Rationale: this preserves existing history UI and billing integrations while making deep analysis internally observable and extensible.
  Date/Author: 2026-04-09 / Codex

- Decision: deterministic preprocessing comes before heavy model tool-calling.
  Rationale: preprocessing is cheaper, reproducible, and easier to benchmark. Tool-calling is reserved for hard cases and targeted measurement.
  Date/Author: 2026-04-09 / Codex

- Decision: external render-diff verification is first-class only for reconstruction formats.
  Rationale: pixel similarity is a valid truth source for clone-style outputs but not for UI/UX audits, accessibility audits, or state-machine extraction.
  Date/Author: 2026-04-09 / Codex

- Decision: model names must be abstracted behind a capability registry instead of being hardcoded into pipeline logic.
  Rationale: Gemini preview models and feature support change over time. The planner must choose models by capability and environment policy, not raw string constants sprinkled across the codebase.
  Date/Author: 2026-04-09 / Codex

## Outcomes & Retrospective

Initial outcome: the repo now has a concrete design for turning Deep Analysis into a scalable system rather than repeatedly patching the current 4-pass implementation. No product code has been changed by this document alone. The next step is to implement Milestone 1 exactly as described below.

## Context and Orientation

Today’s deep-analysis path starts in `src/hooks/use-analysis.ts`, where the client builds `FormData`, optionally extracts a keyframe grid, and posts to `POST /api/analyze`. The server route in `src/app/api/analyze/route.ts` chooses between standard single-pass generation and agentic mode. Agentic mode is implemented in `src/lib/ai/agentic-pipeline.ts` as a fixed 4-pass Gemini flow. The prompts for those passes live in `src/lib/ai/agentic-prompts.ts`. Format-specific output templates live in `src/lib/ai/prompts.ts`. Parsing and partial verification extraction live in `src/lib/ai/output-parsers.ts`. The saved summary record is defined by `Analysis` in `src/types/database.ts`.

The current system already does several things well: it supports large-file Gemini uploads, streams progress to the UI, distinguishes standard and deep modes, and exposes verification information in the output panel. The weaknesses are architectural rather than cosmetic. The system has no run-level artifact model, no schema-validated intermediate outputs, no regeneration loop after verification, no task-family routing, and no external truth source for reconstruction correctness.

In this document, “artifact” means a typed intermediate product such as a scene map, OCR summary, state inventory, motion map, or verification report. “Pipeline family” means a group of stages optimized for one kind of job: reconstruction, audit, or behavior extraction. “External verification” means a check that is not just the same language model judging its own answer; examples include render-and-diff comparison, deterministic consistency checks, or replayed state transitions.

## Non-Negotiable Product Goals

Deep Analysis V2 must satisfy all of the following:

It must keep the current Deep Analysis toggle optional. Standard mode remains the fast, cheaper path. Deep Analysis becomes the premium correctness-first path.

It must support future use cases without forcing them into the current motion-spec sequence.

It must store intermediate artifacts in a way that helps debugging, evaluation, and future features without polluting the user-facing final answer.

It must be measurable. Every major improvement must be benchmarkable on known videos with latency, cost, success rate, and quality metrics.

It must degrade safely. If an advanced verifier or preprocessor is unavailable, the run should fall back to a lower tier instead of failing the user outright.

## Target Architecture

Deep Analysis V2 has five layers.

The first layer is the request layer. The UI still submits a request to `/api/analyze`, but the route now creates an `AnalysisRun` record and hands orchestration to a planner instead of directly invoking a fixed pipeline.

The second layer is the shared artifact layer. This layer produces reusable signals from video once and makes them available to later stages. These artifacts include keyframes, scene boundaries, OCR text, coarse UI inventory, motion regions, state-change hints, and any user-supplied trigger context.

The third layer is the pipeline planner. The planner looks at the requested format, deep-mode flag, video metadata, and shared artifacts, then chooses an analysis family, a complexity tier, a model strategy, a verification strategy, and a maximum iteration budget.

The fourth layer is the family-specific runner. Reconstruction jobs, audit jobs, and behavior jobs run different stage sequences even though they share base artifacts.

The fifth layer is verification and refinement. For formats where a stronger check exists, the system validates the result, produces a typed verification report, and can request a revision pass. For formats without renderable truth, it still runs consistency and rubric validation with typed outputs.

## Analysis Families

### Reconstruction family

This family is used for formats whose goal is to recreate what is in the video. It includes `clone_ui_animation`, `clone_component`, `clone_landing_page`, `tailwind_animate`, `lottie_rive_export`, `remotion_demo_template`, `figma_motion_spec`, and any future “build this screen/animation” format.

The ideal stage sequence is: artifact extraction, scene/state map, measured motion and style extraction, implementation generation, external verification when possible, and one or two regeneration passes if quality is below target.

### Audit family

This family is used for formats whose goal is critique or recommendations. It includes `ui_ux_audit`, `accessibility_audit`, `performance_budget`, and future review-centric use cases.

The ideal stage sequence is: artifact extraction, flow segmentation, task/intent inference, rubric-driven analysis, issue prioritization, and output synthesis. Motion details still matter, but they are supporting evidence rather than the center of the pipeline.

### Behavior family

This family is used for formats whose goal is to formalize behavior. It includes `interaction_state_machine`, `qa_clone_checklist`, and future behavior-spec use cases.

The ideal stage sequence is: artifact extraction, state inventory, transition inference, guard/action synthesis, internal consistency checks, and final export.

## Shared Artifact Model

Create `src/lib/video-understanding/artifacts.ts` and define the canonical intermediate types there. Every deep run must operate on these typed objects instead of raw prompt text alone.

The core types that must exist are:

    type AnalysisFamily = 'reconstruct' | 'audit' | 'behavior';
    type ComplexityTier = 'simple' | 'moderate' | 'complex';

    interface VideoSourceRef {
      sourceType: 'gemini_file' | 'inline_base64' | 'r2_object';
      uri?: string;
      mimeType: string;
      sizeBytes: number;
      width: number;
      height: number;
      durationSec: number;
      triggerContext: TriggerContext;
    }

    interface SharedArtifactBundle {
      video: VideoSourceRef;
      keyframes: KeyframeArtifact[];
      scenes: SceneArtifact[];
      ocr: OcrArtifact[];
      uiInventory: UiElementArtifact[];
      motion: MotionArtifact[];
      stateHints: StateHintArtifact[];
    }

    interface PipelinePlan {
      family: AnalysisFamily;
      complexity: ComplexityTier;
      stages: PlannedStage[];
      generatorModel: string;
      verifierModel?: string;
      maxIterations: number;
      useExternalVerification: boolean;
      useToolCalling: boolean;
      useCaching: boolean;
    }

    interface StageArtifact<TPayload> {
      stageId: string;
      stageType: string;
      status: 'pending' | 'running' | 'complete' | 'failed' | 'skipped';
      payload: TPayload;
      createdAt: string;
    }

Do not store large payloads directly on the main `analyses` document. Firestore documents have a hard size limit, and render-diff artifacts or OCR maps can grow quickly. The product-facing summary remains small. Large artifacts go to storage, with Firestore holding metadata and references.

## Persistent Run Model

Extend the data model with two new collections.

Create `analysis_runs` as the orchestration record. This is the canonical record of a single deep-analysis execution. It must include user ID, requested format, family, pipeline version, requested quality, selected models, selected validators, iteration count, status, error summary, final artifact reference, and token/cost telemetry.

Create `analysis_runs/{runId}/artifacts` as a subcollection for artifact metadata. Each metadata document points to either embedded small JSON or a storage path for large JSON/images. The artifact document must include type, stage ID, schema version, storage path if externalized, and a short human-readable summary.

Keep the existing `analyses` collection as a user-facing summary. It should point to `runId` for deep jobs and continue to hold overview, final output, cover image, format, credits used, and created time.

## File and Module Layout

Introduce a new folder tree so the repo stops mixing provider code, prompts, orchestration, and parsing in one flat `src/lib/ai` directory.

Create these new modules:

- `src/lib/video-understanding/planner.ts` for choosing family, complexity, models, and validators.
- `src/lib/video-understanding/orchestrator.ts` for running a plan and emitting typed events.
- `src/lib/video-understanding/artifacts.ts` for shared types.
- `src/lib/video-understanding/preprocess/keyframes.ts` for shared frame extraction policy.
- `src/lib/video-understanding/preprocess/scenes.ts` for scene and step segmentation.
- `src/lib/video-understanding/preprocess/ocr.ts` for OCR extraction.
- `src/lib/video-understanding/preprocess/motion.ts` for motion-region and temporal signals.
- `src/lib/video-understanding/families/reconstruct.ts` for the reconstruction pipeline.
- `src/lib/video-understanding/families/audit.ts` for the audit pipeline.
- `src/lib/video-understanding/families/behavior.ts` for the behavior pipeline.
- `src/lib/video-understanding/providers/model-registry.ts` for model aliases and capability flags.
- `src/lib/video-understanding/verification/reconstruct.ts` for render-diff verification.
- `src/lib/video-understanding/verification/audit.ts` for rubric and consistency validation.
- `src/lib/video-understanding/verification/behavior.ts` for state-transition consistency checks.
- `src/lib/video-understanding/schemas/*.ts` for Zod schemas describing stage outputs.

Existing Gemini and Kimi adapters in `src/lib/ai/gemini.ts` and `src/lib/ai/kimi.ts` should survive initially as low-level provider adapters, then gradually move under the new provider namespace once callers are migrated.

## Deep Analysis Event Model

The SSE layer must stop assuming exactly four passes. Replace fixed pass semantics with generic stage semantics.

Add event types:

    type PipelineEvent =
      | { type: 'run_created'; runId: string; family: AnalysisFamily; complexity: ComplexityTier }
      | { type: 'stage_start'; stageId: string; stageLabel: string; family: AnalysisFamily }
      | { type: 'stage_progress'; stageId: string; message: string }
      | { type: 'stage_output'; stageId: string; chunk: string }
      | { type: 'stage_complete'; stageId: string; summary?: string }
      | { type: 'verification'; report: VerificationSummary }
      | { type: 'revision_start'; iteration: number; reason: string }
      | { type: 'complete'; finalArtifact: FinalOutputArtifact }
      | { type: 'error'; message: string };

The UI in `src/hooks/use-analysis.ts` and `src/components/output/output-panel.tsx` must be updated to display generic stages rather than assuming `pass_1` through `pass_4`. A thin compatibility layer is allowed during migration, but the target state is family/stage-aware progress.

## Milestone 1 — Fix the current pipeline without changing product shape

This milestone keeps the Deep Analysis UI and endpoint shape intact but repairs the worst structural flaws.

Work to perform:

In `src/lib/ai/agentic-prompts.ts`, replace free-form “strict JSON” requests for Pass 1 and Pass 4 with typed schemas defined in `src/lib/video-understanding/schemas/reconstruct.ts`. Use `responseMimeType: 'application/json'` and `responseSchema` in Gemini requests. Use Zod validation after every pass and retry one time if validation fails.

In `src/lib/ai/agentic-pipeline.ts`, stop treating the final output as one long text blob. Return a structured result object like:

    interface ReconstructionRunResult {
      pass1: StageArtifact<SceneDecompositionPayload>;
      pass2: StageArtifact<MotionAnalysisPayload>;
      pass3: StageArtifact<FinalOutputPayload>;
      pass4: StageArtifact<VerificationPayload>;
      finalOutput: string;
      verification: VerificationPayload;
    }

Still stream stage output to the UI, but save final output and verification as separate artifacts.

In `src/app/api/analyze/route.ts`, store the final output from Pass 3 as the user-facing `code`, store verification separately, and if verification finds fixable issues below target score, run one `Pass 3B` revision prompt before completion. This is the first closed loop.

In all agentic prompts, thread `triggerContext`, `videoMetadata`, and analysis family intent explicitly so the expensive path uses the same user hints standard mode already gets.

Acceptance for Milestone 1:

From the repo root:

    npm run build
    npx tsc --noEmit
    node --experimental-strip-types --test tests/*.test.ts tests/*.test.js

Expected behavior after implementation: a deep reconstruction run saves a clean final artifact, exposes verification separately, and performs at least one revision step when verification is below the target threshold.

## Milestone 2 — Add the planner and family routing

This milestone replaces the hardcoded 4-pass assumption with a planner.

Implement `src/lib/video-understanding/planner.ts` with a single exported function:

    export function createPipelinePlan(input: {
      format: OutputFormat;
      quality: QualityLevel;
      deepMode: boolean;
      artifacts: SharedArtifactBundle;
      videoMetadata: VideoMetadata | null;
    }): PipelinePlan

Planner rules for the first version:

- Reconstruction formats route to `reconstruct`.
- Audit formats route to `audit`.
- Behavior formats route to `behavior`.
- Complexity defaults to `simple`, `moderate`, or `complex` using video duration, scene count, OCR density, motion density, and number of moving regions.
- Deep mode always uses the planner, but the planner may choose a lighter strategy internally for simple jobs.
- Standard mode continues to bypass the planner entirely.

Update `/api/analyze` so Deep Analysis calls the planner and dispatches to the right family runner.

Acceptance for Milestone 2: the same Deep Analysis toggle can now produce different stage sequences for a reconstruction format versus `ui_ux_audit` without branching ad hoc inside the route handler.

## Milestone 3 — Deterministic preprocessing artifact layer

This milestone makes video understanding less dependent on “the model noticed it” and more dependent on reusable signals.

Implement these preprocessors:

- Keyframe sampling with timestamps.
- Scene or step boundary detection.
- OCR extraction for visible text.
- Coarse UI inventory extraction from frames: probable buttons, inputs, cards, modals, toasts, lists, nav areas.
- Motion summary: moving regions, rough start/end time, broad motion type.
- State-change hints: hover-like, click-like, loading-like, success-like, error-like transitions.

Start simple. Do not build a heavy computer-vision lab on day one. Use robust heuristics and typed artifacts that can be improved later.

Important design rule: these preprocessors must have stable outputs that can be snapshotted in tests. Even if the underlying algorithm evolves, the artifact schema must remain versioned and comparable.

Acceptance for Milestone 3: deep runs can generate and persist shared artifacts before family-specific analysis begins, and later stages can reference those artifacts rather than raw video alone.

## Milestone 4 — Closed-loop refinement and adaptive budgets

This milestone makes verification useful and prevents runaway costs.

For reconstruction family runs, add a revision loop:

- generate candidate output
- verify
- if below threshold and iteration budget remains, regenerate with targeted corrections
- stop at success or budget cap

For audit and behavior family runs, add consistency refinement rather than render refinement. Example: if the rubric says “CTA unclear but later recommendation ignores CTA copy,” regenerate the audit synthesis only, not the whole run.

The planner must define a maximum iteration budget. Initial defaults:

- reconstruct simple: 1 generation + 1 verification
- reconstruct moderate: 1 generation + 1 verification + 1 revision
- reconstruct complex: 1 generation + 1 verification + up to 2 revisions
- audit: 1 synthesis + 1 validation + 1 targeted revision
- behavior: 1 synthesis + 1 validation + 1 targeted revision

Acceptance for Milestone 4: verification reports change what the system returns, not just what it comments on.

## Milestone 5 — External verification for reconstruction formats

This milestone creates a stronger truth source for clone-style outputs.

Scope this milestone narrowly. External verification applies only to renderable reconstruction outputs first. The first supported set should be `clone_component`, `clone_landing_page`, `clone_ui_animation`, and `tailwind_animate` when the output can be wrapped in a browser harness.

Build a render verifier that:

- creates a temporary render target from the generated output
- uses Playwright to render it headlessly at requested dimensions
- captures frames at selected timestamps
- compares generated frames to source frames using a perceptual metric
- produces a typed verification report with mismatch regions and severity

Do not make render-diff block all formats. If a format is not renderable, the planner must choose a different validator.

Acceptance for Milestone 5: at least one reconstruction format can be rendered and compared against source frames, and the verification result can drive one targeted revision.

## Milestone 6 — Evaluation harness, telemetry, and production hardening

This milestone makes the system measurable and safe to evolve.

Create an evaluation harness under `evals/` with three benchmark suites:

- `evals/reconstruct/`
- `evals/audit/`
- `evals/behavior/`

Each suite must contain representative videos, expected artifact summaries, and scoring logic.

Metrics to capture:

- success rate
- invalid-schema rate
- revision rate
- latency by stage
- token usage by stage
- cost by run
- quality score by family
- user-visible failure modes

Add run telemetry to `analysis_runs` so the app can later answer “which pipeline version is best for which formats?”

Only after telemetry exists should pricing be revisited. The current deep-mode credit model is flat and will become inaccurate once planner-selected strategies vary in cost.

Acceptance for Milestone 6: the team can compare pipeline versions using real benchmark cases and production telemetry rather than gut feel.

## Model Strategy

Introduce `src/lib/video-understanding/providers/model-registry.ts` with stable aliases like `GENERATOR_FAST`, `GENERATOR_DEEP`, `VERIFIER_FAST`, `VERIFIER_DEEP`, and `STRUCTURED_JSON_MODEL`.

The registry must encode capability flags rather than only names. At minimum:

- multimodal video support
- structured output support
- tool-calling support
- caching support
- streaming support
- preview/stable status

Planner decisions must depend on capabilities, not raw names. This allows future migration between Gemini versions without rewriting pipeline logic.

## Caching Strategy

Treat caching as an optimization layer, not a correctness requirement.

Phase 1 should keep a consistent prompt prefix order so implicit caching can help on supported Gemini models.

Phase 3 or later may add explicit cache creation for immutable prefixes such as the video reference plus shared artifact summary. Because cache support is model-dependent, the registry must gate it and the system must fall back safely when unavailable.

## Tool-Calling Strategy

Tool-calling is not the first lever. Use it after deterministic preprocessing exists.

The first tools worth exposing are measurement-oriented and read-only:

- `extractFrame(timestamp)`
- `sampleOcrRegion(regionId)`
- `measureDominantColors(frameId, regionId)`
- `listMotionRegions(sceneId)`
- `describeStateTransition(sceneId)`

Tool-calling is reserved for hard reconstruct jobs or cases where the planner marks uncertainty as high. It must not become the default path for every run.

## Scaling and Runtime Strategy

Milestones 1 and 2 can run in the current Next.js route model.

Milestones 3 through 5 likely exceed what is comfortable in a single synchronous route, especially once OCR, heavy preprocessing, Playwright rendering, and multi-iteration verification are introduced.

Plan for a worker-capable architecture now:

- the route creates a run and streams status
- the orchestrator can run inline at first
- the same orchestrator interface must later support an external worker runtime without changing the UI contract

Do not hardcode “runs only in the route handler” assumptions into the V2 modules.

## Concrete Steps

Before implementation begins, create the new folder tree and type skeletons, then migrate the current 4-pass code behind the new orchestrator with feature flags. The recommended sequence is:

From the repo root:

    mkdir -p src/lib/video-understanding/{families,preprocess,providers,schemas,verification}

Then add the new artifact types, planner, and orchestrator skeletons. Wire `/api/analyze` to call the orchestrator only when `agenticMode` is enabled. Keep standard mode untouched until Milestone 1 is stable.

After each milestone:

    npx tsc --noEmit
    node --experimental-strip-types --test tests/*.test.ts tests/*.test.js
    npm run build

When a milestone adds a new dependency or verifier, add milestone-specific tests before moving on.

## Validation and Acceptance

Validation must happen at three levels.

The first level is compile and unit validation. Every milestone must pass `npx tsc --noEmit`, the repo’s Node tests, and `npm run build`.

The second level is run-level validation. A deep run for one reconstruction format, one audit format, and one behavior format must succeed end-to-end, persist a clean summary record, and expose meaningful verification output.

The third level is benchmark validation. Once `evals/` exists, each milestone that changes planning or verification must be run against the benchmark suite and compared against the previous pipeline version.

Deep Analysis V2 is only accepted when it can answer all of these:

- Can it choose the right family for the requested format?
- Can it produce typed intermediate artifacts that survive validation?
- Can verification improve the answer instead of only commenting on it?
- Can at least one reconstruction format use external render-based verification?
- Can the team measure cost, latency, and quality for changes over time?

## Idempotence and Recovery

All new schema and artifact writes must be additive and versioned. Never overwrite the old `analyses` behavior until the new run model is stable and benchmarked.

Feature flags are required. Introduce a deep-analysis pipeline version flag so the product can roll back from V2 to the current deep mode while preserving newly created run artifacts.

If a preprocessing stage fails, the planner must downgrade the run rather than failing the entire request when safe to do so. Example: if OCR fails, a UI/UX audit may continue with a warning; if render verification fails, a reconstruction run may fall back to LLM-plus-artifact verification.

## Interfaces and Dependencies

The first implementation pass should add only the dependencies that are required to make Milestone 1 and Milestone 2 real. The likely early additions are Zod for schema validation and perhaps a small utility for stable artifact IDs if needed.

Do not add Playwright or heavy image-diff libraries to the product path until Milestone 5 starts. When that milestone begins, prefer widely used, actively maintained tooling that works in Node and can run in a worker environment.

The model registry must be the only place where model names are chosen. The planner consumes capability flags. Family runners request capabilities such as “structured multimodal generator” or “fast verifier”, and the registry resolves them.

## Source Notes

This design assumes the current repo state observed on 2026-04-09 and current public Gemini documentation confirming multimodal video support, structured outputs, function calling, and cache APIs. Before implementing Milestone 5 or model-caching logic, re-check provider docs and record any model-specific constraints in this section.

## Revision Note

Created on 2026-04-09 as the initial execution spec for Deep Analysis V2 after auditing the current pipeline and validating its limits against both the repository code and current Gemini documentation.