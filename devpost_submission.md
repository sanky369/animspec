# AnimSpec.ai — Gemini 3 Hackathon DevPost Submission

> Submission for the [Gemini 3 Hackathon: Build what's next](https://gemini3.devpost.com/)

---

## Project Name

**AnimSpec.ai** — Video-to-Code Animation Specifications for AI Coding Agents

---

## Tagline

Turn any animation video into implementable code specs — powered by Gemini 3's multimodal reasoning and thinking mode.

---

## Inspiration

AI coding agents like Claude Code, Cursor, and Codex are transforming how developers build software. But there's a critical gap: **these agents can't process video**. When a designer hands a developer a screen recording of an animation and says "build this," the developer must manually watch the video, mentally decompose every motion, timing curve, and state change, then translate that into precise text instructions for their AI coding agent.

This manual translation is:
- **Slow** — A 3-second animation can take 15-30 minutes to describe accurately
- **Error-prone** — Human descriptions miss subtle easing curves, stagger patterns, and micro-interactions
- **Inconsistent** — Two developers describe the same animation differently, producing different results

We built AnimSpec.ai because we realized that **Gemini 3's multimodal reasoning engine** — capable of seeing, understanding temporal sequences, and reasoning deeply about visual patterns — is the perfect solution to this problem.

---

## What it does

AnimSpec.ai converts video animations into structured, implementable specifications that AI coding agents can directly consume. Upload any screen recording of a UI animation, and AnimSpec.ai produces:

### 15 Output Formats across 4 categories:

**Clone** — Recreate what you see:
- Clone UI Animation (CSS keyframes with timing)
- Clone UI Component (React + Tailwind reproduction)
- Clone Landing Page (full page layout)

**Extract** — Pull design assets & specs:
- Copy Design Style (reusable CSS style guide)
- Extract Design Tokens (colors, typography, spacing)
- Figma Motion Spec (Smart Animate properties)

**Export** — Framework-specific code:
- Remotion Demo Template (video component)
- Tailwind Animate Config (custom keyframes)
- React Native Reanimated (mobile animations)
- Lottie/Rive Export (motion graphics data)
- Interaction State Machine (XState definitions)

**Audit** — Quality & compliance:
- QA Clone Checklist (acceptance criteria)
- Accessibility Audit (WCAG + prefers-reduced-motion)
- Performance Budget (GPU layer analysis, 60fps)
- Storyboard Breakdown (frame-by-frame)

### Two Analysis Modes:

1. **Standard Mode** — Single-pass analysis for quick results
2. **Agentic Mode** — A 4-pass autonomous pipeline:
   - Pass 1: Scene Decomposition (identify all animated elements)
   - Pass 2: Deep Motion Analysis (timing, easing, subtle movements)
   - Pass 3: Code Generation (in your chosen format)
   - Pass 4: Self-Verification (compare output vs. original video, score 0-100)

---

## How we built it

### Architecture

AnimSpec.ai is a full-stack Next.js 15 application with a serverless architecture:

```
Video Upload → Client-side FFmpeg WASM (keyframe extraction)
            → Size-based routing (inline / Gemini Files API)
            → Gemini 3 Analysis (streaming SSE)
            → Real-time output display
```

### Gemini 3 Integration (Core)

AnimSpec.ai is built **entirely around the Gemini 3 API**. It leverages several key Gemini 3 capabilities:

**1. Gemini 3 Thinking Mode (`thinkingLevel: 'high'`)**

Both `gemini-3-flash-preview` and `gemini-3.1-pro-preview` are used with thinking mode enabled. This is critical for animation analysis because the model needs to reason about:
- Temporal sequences (what happens at which timestamp)
- Spatial relationships (which elements move relative to others)
- Easing curves (is it ease-in, ease-out, or a custom bezier?)
- Stagger patterns (are elements animating sequentially or in parallel?)

The thinking traces are surfaced in the UI so users can see the model's reasoning process in real-time.

**2. Multimodal Video Understanding**

Using `@google/genai` SDK, we send video content directly to Gemini 3 via:
- **Inline base64** for videos under 4MB
- **Gemini Files API** (`fileUri`) for videos up to 100MB

The model processes the actual video frames — not just screenshots — enabling it to understand motion, timing, and transitions that static images cannot capture.

**3. Multi-Pass Agentic Pipeline**

Our agentic mode runs 4 sequential Gemini 3 calls, each building on the previous pass's output:

| Pass | Model | Purpose |
|------|-------|---------|
| 1 | `gemini-3-flash-preview` | Scene decomposition — fast structural analysis |
| 2 | `gemini-3.1-pro-preview` | Deep motion analysis — flagship reasoning for subtle details |
| 3 | `gemini-3.1-pro-preview` | Code generation — precise implementation |
| 4 | `gemini-3-flash-preview` | Self-verification — compare output against original video |

This mirrors the "Marathon Agent" strategic track from the hackathon — an autonomous system that maintains continuity across multi-step reasoning without human supervision.

**4. Streaming with Thinking Traces**

Responses are streamed via Server-Sent Events (SSE). For each chunk, we parse both the model's text output and its thinking traces, displaying them in parallel in the UI. Users can watch the model reason through complex animations in real-time.

**5. Client-Side Frame Grid (Context Enrichment)**

Using FFmpeg compiled to WebAssembly, we extract up to 24 keyframes from the video client-side and arrange them in a labeled grid. This grid is sent alongside the video to Gemini 3 as additional visual context, enabling more precise spatial-temporal analysis.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Next.js 15, Tailwind CSS 4 |
| AI Engine | Google Gemini 3 API (`@google/genai` SDK) |
| Video Processing | FFmpeg.wasm (client-side keyframe extraction) |
| Auth | Firebase Authentication (Email + Google OAuth) |
| Database | Firebase Firestore |
| Storage | Firebase Storage + Cloudflare R2 |
| Payments | Lemon Squeezy |
| Hosting | Vercel (serverless) |

### Code Quality

- Full TypeScript across the entire codebase
- 15 specialized prompt templates for each output format
- Atomic credit transactions via Firestore
- Real-time SSE streaming with error recovery
- Security headers (COOP/COEP for WASM, CSP)

---

## Gemini 3 Integration — Detailed Write-up (~200 words)

AnimSpec.ai is built entirely on the **Gemini 3 API**, leveraging its multimodal video understanding and extended thinking capabilities. The application uses two Gemini 3 models:

- **`gemini-3-flash-preview`** (balanced quality) — Fast, intelligent analysis with thinking mode for structural decomposition and verification passes
- **`gemini-3.1-pro-preview`** (precise quality) — Flagship reasoning for deep motion analysis and code generation where accuracy is paramount

**Key Gemini 3 features used:**

1. **Thinking Mode** (`thinkingConfig: { thinkingLevel: 'high' }`) — Enables extended reasoning, critical for decomposing complex animation sequences into precise timing, easing, and spatial relationships. Thinking traces are streamed to users in real-time.

2. **Video Understanding** — Native video input processing (inline base64 and Files API) allows the model to analyze actual motion — not static screenshots. This is fundamental to detecting easing curves, stagger patterns, and micro-interactions.

3. **Files API** — Handles videos up to 100MB with automatic state polling until processing completes.

4. **Multi-Pass Agentic Pipeline** — 4 sequential Gemini 3 calls (decomposition → analysis → generation → verification) that maintain context continuity, with model selection optimized per pass (Flash for structural tasks, Pro for deep reasoning).

Gemini 3 is not an add-on — it IS the product. Without Gemini 3's multimodal reasoning, video-to-code translation at this fidelity would not be possible.

---

## Challenges we ran into

1. **Video Size Limits** — Gemini's inline data limit required us to build a tiered upload system: inline base64 for small files, Gemini Files API for larger ones, with automatic state polling for processing completion.

2. **Prompt Engineering for 15 Formats** — Each output format required its own specialized prompt template. Getting the model to produce syntactically valid CSS keyframes vs. React Native Reanimated code vs. Lottie JSON required extensive iteration on format-specific instructions.

3. **Streaming Thinking Traces** — Parsing thinking traces from the SSE stream alongside text content required careful handling to separate reasoning from output and display both simultaneously.

4. **FFmpeg WASM in Next.js** — Required COOP/COEP headers for SharedArrayBuffer support, custom CSP rules for WASM execution, and careful lazy-loading to avoid blocking initial page render.

5. **Agentic Pipeline Context Management** — Feeding previous pass outputs as context into subsequent Gemini 3 calls while staying within token limits required careful prompt construction.

---

## Accomplishments that we're proud of

- **15 output formats** — From CSS keyframes to React Native to Lottie JSON to accessibility audits, covering the full spectrum of animation implementation needs
- **Agentic self-verification** — The 4-pass pipeline includes a verification step where Gemini 3 compares its own generated code against the original video and scores accuracy 0-100
- **Real-time thinking traces** — Users can watch Gemini 3 reason through complex animations, making the AI's decision-making transparent
- **Production-ready SaaS** — Complete with authentication, credit system, payment processing, and analysis history
- **Client-side video processing** — FFmpeg WASM extracts keyframes entirely in the browser, reducing server load and enabling richer context for Gemini 3

---

## What we learned

- **Gemini 3's thinking mode is transformative for structured output** — Enabling `thinkingLevel: 'high'` dramatically improved the quality of animation specifications, especially for complex multi-element sequences with staggered timing
- **Video beats screenshots for motion understanding** — Sending actual video to Gemini 3 (rather than frame screenshots) produced significantly better results for detecting easing curves and timing relationships
- **Multi-pass pipelines need careful model selection** — Using Flash for structural tasks and Pro for deep analysis optimizes both cost and quality
- **Frame grids as supplementary context** — Providing a labeled frame grid alongside the video helped the model anchor its spatial-temporal reasoning

---

## What's next for AnimSpec.ai

- **Batch processing** — Analyze multiple animations from a single video upload
- **Direct framework integration** — One-click export to Figma, Rive, and After Effects
- **Custom model fine-tuning** — Train on common UI animation patterns for even higher accuracy
- **Team collaboration** — Share analyses, annotate specifications, and track implementation progress
- **Animation diff** — Compare two animation videos and highlight differences

---

## Built With

- Google Gemini 3 API (gemini-3-flash-preview, gemini-3.1-pro-preview)
- `@google/genai` SDK
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Firebase (Auth, Firestore, Storage)
- FFmpeg.wasm
- Vercel
- Cloudflare R2
- Lemon Squeezy

---

## Try It Out

- **Live Demo:** [AnimSpec.ai](https://animspec.ai)
- **Code Repository:** [GitHub](https://github.com/sanketdongre/animspec)

---

## Video Demo Script (~3 minutes)

### 0:00-0:20 — Hook & Problem
"Every day, developers receive screen recordings of animations and have to manually describe them to their AI coding agents. This is slow, error-prone, and loses critical details like easing curves and timing. AnimSpec.ai solves this."

### 0:20-0:50 — Upload & Configure
Show: Upload a video animation. Select output format (e.g., "Clone UI Animation"). Choose quality level (balanced/precise). Toggle agentic mode on.

### 0:50-1:30 — Analysis in Action
Show: Click "Analyze". Show the real-time SSE streaming with thinking traces appearing. Highlight the 4-pass agentic pipeline progress (Decomposition → Analysis → Generation → Verification). Point out the thinking trace panel showing Gemini 3's reasoning.

### 1:30-2:10 — Results
Show: Switch between output tabs — Code, Overview, Frame Preview, Verification. Highlight the verification score (e.g., "92/100") and any identified discrepancies. Copy the code output and paste it into an AI coding agent to demonstrate the end-to-end workflow.

### 2:10-2:40 — Multiple Formats
Show: Re-analyze the same video with a different format (e.g., "Tailwind Animate Config" or "Accessibility Audit"). Highlight how the same video produces completely different, format-specific outputs.

### 2:40-3:00 — Gemini 3 Integration & Close
"AnimSpec.ai is powered entirely by Gemini 3. We use thinking mode for deep reasoning about motion, the Files API for large videos, and a 4-pass agentic pipeline for self-verifying accuracy. Gemini 3's multimodal video understanding makes this possible — no other model can analyze video animations at this level of detail."

---

## Submission Checklist

Based on the [official rules](https://gemini3.devpost.com/rules):

- [x] **New application** — Built specifically for this hackathon, uses Gemini 3 API
- [x] **Text description of Gemini integration** — ~200 word write-up included above
- [x] **Public project link** — Live demo at animspec.ai
- [x] **Public code repository** — GitHub repository
- [x] **~3 minute demo video** — Script provided above (record before submission)
- [x] **Not a discouraged project type:**
  - Not a baseline RAG app
  - Not a prompt-only wrapper
  - Not a simple vision analyzer
  - Not a generic chatbot
  - Not medical advice

---

## Judging Criteria Alignment

### Technical Execution (40%)
- Full-stack production application with auth, payments, and credits
- Deep Gemini 3 integration: thinking mode, Files API, streaming, multi-model pipeline
- 4-pass agentic architecture with self-verification
- TypeScript throughout, clean architecture, real-time SSE streaming
- Client-side FFmpeg WASM for video processing

### Innovation / Wow Factor (30%)
- **Novel problem space** — No existing tool converts animation videos to implementable code specs
- **15 output formats** — From CSS to React Native to Lottie to accessibility audits
- **Self-verifying AI** — Agentic pipeline scores its own output against the original video
- **Transparent reasoning** — Real-time thinking traces show the model's decision-making

### Potential Impact (20%)
- **Broad market** — Every developer using AI coding agents needs animation specs
- **Significant time savings** — 15-30 minutes of manual description → seconds
- **Accuracy improvement** — Machine vision catches details humans miss
- **Accessibility** — Makes complex animation implementation accessible to junior developers

### Presentation / Demo (10%)
- Clear problem definition and solution walkthrough
- Live demo with real-time streaming
- Architecture documentation included (architecture.md)
- Gemini 3 integration clearly explained with specific features used

---

## Key Dates

| Event | Date |
|-------|------|
| Submission Deadline | February 9, 2026, 5:00 PM PT |
| Judging Period | February 10 - February 27, 2026 |
| Winners Announced | ~March 4, 2026 |

---

## Prize Categories

| Prize | Amount | Count |
|-------|--------|-------|
| Grand Prize | $50,000 USD | 1 |
| Second Place | $20,000 USD | 1 |
| Third Place | $10,000 USD | 1 |
| Honorable Mentions | $2,000 USD each | 10 |

All prize winners receive social promotion. Top 3 also receive a 30-minute interview with the [AI Futures Fund](https://labs.google/aifuturesfund) team.
