# AnimSpec

AnimSpec turns UI videos into structured outputs that agents and developers can use to rebuild, audit, or understand interfaces.

For detailed architecture and the long-term Deep Analysis roadmap, see:

- `docs/deep-analysis-v2-spec.md`
- `docs/public-api-mcp.md`
- `architecture.md`
- `spec.md`

## What the app does

You upload a screen recording, choose a use case, and get back a structured result.

Examples:

- clone a UI animation
- clone a component or landing page
- extract design tokens
- generate motion specs
- run accessibility, performance, or UI/UX audits
- infer interaction state machines

## Programmatic access

AnimSpec now exposes a public API and MCP surface for agent workflows.

- `POST /api/v1/api-keys` to mint API keys from a signed-in user session
- `POST /api/v1/analyze` to run regular or deep analysis with an API key
- `POST /api/v1/upload` for Gemini Files uploads
- `POST /api/v1/upload-url` for direct R2 uploads
- `POST /api/mcp` for remote MCP clients using Streamable HTTP
- `npm run mcp` for a local stdio MCP thin client

The remote MCP endpoint now also exposes an inline app widget for ChatGPT-style hosts.

See `docs/public-api-mcp.md` for usage patterns and current auth constraints.

## Analysis modes

AnimSpec currently has two analysis modes.

### Regular analysis

Regular analysis is the fast path.

It uses a single model run to analyze the uploaded video and generate the requested output. It is best when you want a fast answer, lower cost, and a good first pass.

Regular analysis is:

- one-shot
- faster
- cheaper
- simpler
- good for quick output generation

Regular analysis does **not** do multi-stage planning, verification, or revision.

### Deep analysis

Deep analysis is the correctness-first path.

Instead of treating every request the same way, it now plans the run based on the requested format and routes the request into one of three analysis families:

- **Reconstruction** — for clone/build/export work
- **Audit** — for UI/UX, accessibility, and performance review
- **Behavior** — for state-machine and interaction-flow extraction

Deep analysis creates shared video-understanding artifacts first, then runs family-specific stages, validates intermediate results, verifies the output, and can revise the output if the verification says it is weak.

Deep analysis is:

- multi-stage
- format-aware
- planned instead of one-shot
- verification-driven
- revision-capable
- designed to scale to future use cases

## Regular vs Deep analysis

In plain English:

- **Regular analysis** = quick answer
- **Deep analysis** = planned, checked, and improved answer

### Example: clone task

For a clone-style task, regular analysis gives you one direct output.

Deep analysis instead:

- maps scenes and states
- analyzes motion and visual details
- generates the requested output
- verifies fidelity
- revises the output if needed

### Example: audit task

For an audit task, regular analysis gives you a one-shot critique.

Deep analysis instead:

- segments the visible flow
- infers user intent and friction points
- generates the audit in the right format
- validates audit quality
- revises the audit if needed

## Why Deep Analysis exists

Deep Analysis is not just “more tokens.”

It exists so the system can:

- use different reasoning paths for different jobs
- keep intermediate artifacts separate from the final output
- validate structured intermediate results
- improve weak results before returning them
- support stronger future verification methods

## Current design direction

The long-term direction is a shared video-understanding layer plus specialized pipelines for different use cases.

That means future formats should be able to plug into the system without forcing everything through the same fixed prompt chain.

The full implementation plan lives in `docs/deep-analysis-v2-spec.md`.
