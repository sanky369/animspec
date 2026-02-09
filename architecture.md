# AnimSpec.ai - Architecture Documentation

> A micro-SaaS tool that converts video animations into structured text instructions for AI coding agents (Claude Code, Cursor, Codex).

## Overview

AnimSpec.ai solves the problem that AI coding agents cannot process video inputs, forcing developers to manually describe animations — a tedious, error-prone process. It analyzes uploaded animation videos using Google Gemini 3 vision models and generates precise, implementable specifications across 15 output formats.

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  FRONTEND (React 19 + Tailwind CSS 4)                        │
│  - Landing page with demo & pricing                          │
│  - Authenticated dashboard with analysis, history, account   │
│  - Real-time SSE streaming results display                   │
│  - Client-side FFmpeg WASM for keyframe extraction           │
└──────────────────────────────────────────────────────────────┘
              ↓ (POST requests + auth cookies)
┌──────────────────────────────────────────────────────────────┐
│  API LAYER (Next.js Route Handlers)                          │
│  - /api/upload      → Gemini Files API (large Gemini files)  │
│  - /api/upload-url  → R2 presigned URL (large Kimi files)    │
│  - /api/analyze     → AI analysis streaming + credit deduct  │
│  - /api/analyses    → User history CRUD                      │
│  - /api/checkout    → Lemon Squeezy payment                  │
│  - /api/webhooks    → Payment confirmation                   │
└──────────────────────────────────────────────────────────────┘
              ↓ (async operations)
┌──────────────────────────────────────────────────────────────┐
│  BACKEND SERVICES                                            │
│  - Firebase Auth (email/password + Google OAuth)             │
│  - Firestore (profiles, analyses, transactions, purchases)   │
│  - Firebase Storage (frame images)                           │
│  - Cloudflare R2 (temporary video storage for large files)   │
│  - Gemini 3 AI (video analysis — balanced/precise)           │
│  - Lemon Squeezy (payments)                                  │
└──────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Next.js 15 (App Router), Tailwind CSS 4 |
| Backend | Node.js runtime, Next.js API Routes (serverless) |
| AI | Google Gemini 3 API (`@google/genai` SDK) |
| Auth | Firebase Authentication |
| Database | Firestore |
| Storage | Firebase Storage (frame images), Cloudflare R2 (temporary video uploads) |
| Payments | Lemon Squeezy |
| Video Processing | FFmpeg.wasm (client-side keyframe extraction) |
| Cloud Storage SDK | aws4fetch (lightweight S3-compatible signing for R2) |
| UI Libraries | react-dropzone, shiki (syntax highlighting) |

---

## Core Data Flow

```
                            ┌──────────────────────┐
                            │    User Upload        │
                            │  (MP4/WebM/MOV)       │
                            └──────────┬───────────┘
                                       │
                            ┌──────────▼───────────┐
                            │   Validate & Extract  │
                            │  - Max 100MB check    │
                            │  - Metadata extraction│
                            │  - FFmpeg keyframes   │
                            └──────────┬───────────┘
                                       │
                         ┌─────────────┼─────────────┐
                         │             │             │
                    < 4MB          4-20MB        20-100MB
                         │             │             │
                   ┌─────▼─────┐ ┌─────▼─────┐ ┌─────▼─────┐
                   │ Inline    │ │ Gemini    │ │ Gemini    │
                   │ Base64    │ │ Files API │ │ Files API │
                   └─────┬─────┘ └─────┬─────┘ └─────┬─────┘
                         └─────────────┼─────────────┘
                                       │
                            ┌──────────▼───────────┐
                            │  Choose Analysis Mode │
                            └──────────┬───────────┘
                         ┌─────────────┼─────────────┐
                         │                           │
                 Standard (1-pass)           Agentic (4-pass)
                         │                           │
                 ┌───────▼───────┐          ┌────────▼────────┐
                 │ Single AI call│          │ Pass 1: Scene   │
                 │ with format   │          │   Decomposition │
                 │ template      │          │ Pass 2: Deep    │
                 └───────┬───────┘          │   Motion Anal.  │
                         │                  │ Pass 3: Code    │
                         │                  │   Generation    │
                         │                  │ Pass 4: Self-   │
                         │                  │   Verification  │
                         │                  └────────┬────────┘
                         └─────────────┬─────────────┘
                                       │
                            ┌──────────▼───────────┐
                            │  Stream via SSE       │
                            │  - Progress updates   │
                            │  - Thinking traces    │
                            │  - Code chunks        │
                            └──────────┬───────────┘
                                       │
                            ┌──────────▼───────────┐
                            │  Parse & Display      │
                            │  - Code tab           │
                            │  - Overview tab       │
                            │  - Frame preview tab  │
                            │  - Verification tab   │
                            └──────────┬───────────┘
                                       │
                            ┌──────────▼───────────┐
                            │  Save & Deduct        │
                            │  - Firestore record   │
                            │  - Firebase Storage   │
                            │  - Credit deduction   │
                            └──────────────────────┘
```

---

## AI Integration

### Gemini 3 Models

| Quality Level | Model | Max Tokens | Temperature | Thinking |
|---------------|-------|------------|-------------|----------|
| `balanced` | `gemini-3-flash-preview` | 8,192 | 0.2 | High |
| `precise` | `gemini-3-pro-preview` | 16,384 | 0.1 | High |

Both models use Gemini 3's thinking mode (`thinkingLevel: 'high'`) for deeper reasoning about animation patterns, timing, and spatial relationships.

### Gemini Functions

**File:** `src/lib/ai/gemini.ts`

| Function | Streaming | Method |
|----------|-----------|--------|
| `analyzeVideoWithGemini()` | No | Base64 inline |
| `analyzeVideoWithGeminiStream()` | Yes | Base64 inline |
| `analyzeVideoWithGeminiFile()` | No | Files API (fileUri) |
| `analyzeVideoWithGeminiFileStream()` | Yes | Files API (primary path) |

### Agentic 4-Pass Pipeline

**File:** `src/lib/ai/agentic-pipeline.ts`

The agentic pipeline uses different models per pass to optimize cost and quality:

| Pass | Name | Model (Balanced) | Model (Precise) | Purpose |
|------|------|-------------------|------------------|---------|
| 1 | Scene Decomposition | `gemini-3-flash-preview` | `gemini-3-flash-preview` | Identify all animated elements, initial/final states |
| 2 | Deep Motion Analysis | `gemini-3-flash-preview` | `gemini-3-pro-preview` | Analyze timing, easing, subtle movements |
| 3 | Code Generation | `gemini-3-flash-preview` | `gemini-3-pro-preview` | Generate implementation code in chosen format |
| 4 | Self-Verification | `gemini-3-flash-preview` | `gemini-3-flash-preview` | Compare output against original video, score 0-100 |

Each pass streams results via SSE with `pass_start`, `thinking`, `chunk`, and `pass_complete` events. Previous pass outputs are fed as context into subsequent passes.

### Prompt Engineering

**File:** `src/lib/ai/prompts.ts`

System prompts are constructed from multiple components:

```
System Prompt = Role Definition ("expert animation analyst")
              + Analysis Instructions (step-by-step process)
              + Format Template (format-specific syntax rules)
              + Trigger Context (hover/click/scroll/load/loop/focus)
              + Video Metadata (dimensions, duration, size)
              + Quality Rules (accuracy guidelines)
```

Each of the 15 output formats has a dedicated template with syntax rules, code structure patterns, and best practices for that framework.

### Streaming Architecture

```
Server (route.ts)                          Client (use-analysis.ts)
─────────────────                          ────────────────────────
TransformStream                            EventSource / fetch reader
     │                                           │
     ├─ write({ type: 'progress' })  ──────►    Update progress bar
     ├─ write({ type: 'thinking' })  ──────►    Show thinking trace
     ├─ write({ type: 'chunk' })     ──────►    Append to streaming content
     ├─ write({ type: 'pass_start' })──────►    Update pass indicator
     ├─ write({ type: 'pass_complete' })───►    Mark pass done
     └─ write({ type: 'complete' })  ──────►    Parse final output
```

SSE format: `data: ${JSON.stringify(payload)}\n\n`

---

## API Routes

### `POST /api/analyze`
Main analysis endpoint with SSE streaming response.

- **Input:** FormData with video (base64 or fileUri), format, quality, trigger context, agentic mode flag, frame grid images
- **Output:** SSE stream with progress, thinking, chunk, and completion events
- **Auth:** Optional (demo mode allowed without login)
- **Credits:** Deducted based on quality/mode (balanced: 3, precise: 20, agentic balanced: 5, agentic precise: 30)
- **Timeout:** 300 seconds

### `POST /api/upload`
Upload large videos (>20MB) to the Gemini Files API.

- **Input:** Video file (max 100MB)
- **Output:** `{ name, uri, mimeType, sizeBytes, state }`
- **Details:** Polls until file state is `ACTIVE` (max 30s)

### `POST /api/upload-url`
Get presigned URL for Cloudflare R2 direct upload.

- **Input:** `{ fileName, contentType, contentLength }`
- **Output:** `{ uploadUrl, objectKey }`
- **Details:** Presigned URL valid for 1 hour

### `GET/POST/DELETE /api/analyses`
CRUD operations for analysis history, scoped to authenticated user.

### `POST /api/checkout`
Create Lemon Squeezy checkout session for credit packs.

### `POST /api/webhooks/lemon-squeezy`
Handle payment webhooks (`order.created`, `order.refunded`, `subscription.payment_success`).

---

## Output Formats (15 Formats)

### Clone Group — Recreate What You See
| Format | Description | Best For |
|--------|-------------|----------|
| `clone_ui_animation` | JS/CSS keyframes with timing and easing | Micro-interactions, transitions, complex sequences |
| `clone_component` | React + Tailwind component reproduction | Buttons, cards, modals, navbars, widgets |
| `clone_landing_page` | Full page React component layout | Marketing pages, hero sections, pricing grids |

### Extract Group — Design Assets & Specs
| Format | Description | Best For |
|--------|-------------|----------|
| `copy_design_style` | CSS style guide for reuse across products | Redesigning your app, style refresh |
| `extract_design_tokens` | Colors, typography, spacing, shadows | Design systems, theming, consistent UI |
| `figma_motion_spec` | Figma Smart Animate properties & prototype interactions | Figma prototypes, designer-developer handoff |

### Export Group — Framework-Specific
| Format | Description | Best For |
|--------|-------------|----------|
| `remotion_demo_template` | Remotion video component for product demos | Product demo video generation |
| `tailwind_animate` | Custom keyframes & Tailwind animation utilities | Tailwind projects, utility-first animation |
| `react_native_reanimated` | React Native Reanimated 3 with gesture handlers | Mobile apps, native performance |
| `lottie_rive_export` | Lottie keyframe data & Rive state machine definitions | Motion graphics, After Effects replacement |
| `interaction_state_machine` | XState/useReducer state machine from observed UI | Complex interactions, multi-state components |

### Audit Group — Quality & Compliance
| Format | Description | Best For |
|--------|-------------|----------|
| `qa_clone_checklist` | Acceptance criteria for clone verification | Client approvals, pixel/motion perfection |
| `accessibility_audit` | WCAG compliance & prefers-reduced-motion fallbacks | Inclusive design, WCAG certification |
| `performance_budget` | Layout thrash detection & GPU layer analysis | Performance audits, 60fps optimization |
| `storyboard_breakdown` | Frame-by-frame annotated storyboard | Design handoff, animation documentation |

---

## Authentication & Credits

### Firebase Auth Integration

**Files:** `src/contexts/auth-context.tsx`, `src/lib/firebase/client.ts`, `src/lib/firebase/admin.ts`

Supports two authentication methods:
- Email/password registration and login
- Google OAuth (popup-based)

```
User Auth Flow:
  Firebase Client SDK (signInWithEmail/signInWithGoogle)
  → onAuthStateChanged → Set session cookie (__session)
  → Fetch/create user profile in Firestore
  → AuthContext provides { user, profile, isLoading }
  → API calls include Authorization: Bearer {idToken}
```

### Credit System

| Quality | Standard Mode | Agentic Mode | Access |
|---------|--------------|--------------|--------|
| balanced | 3 credits | 5 credits | All users |
| precise | 20 credits | 30 credits | Paid users only |

| Pack | Credits | Price |
|------|---------|-------|
| Signup bonus | 20 | Free |
| Creator | 200 | $24.00 |
| Pro | 600 | $59.00 |

Credits are deducted atomically via Firestore transactions after successful analysis. All transactions are logged in the `credit_transactions` collection.

---

## Database Schema (Firestore)

### Collections

| Collection | Purpose |
|------------|---------|
| `profiles` | User profiles with credits balance |
| `analyses` | Saved analysis results (max 50 per user) |
| `credit_transactions` | Credit usage/purchase history |
| `purchases` | Payment records |

### Document Types

```typescript
// profiles/{userId}
interface UserProfile {
  id: string;                    // Firebase Auth UID
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  creditsBalance: number;
  creditsExpiresAt: Date | null;
  hasUsedFreeTrial: boolean;
  isPaidUser: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// analyses/{analysisId}
interface Analysis {
  id: string;
  userId: string;
  format: OutputFormat;
  quality: QualityLevel;
  triggerContext: TriggerContext;
  overview: string;
  code: string;
  frameImageUrl: string | null;
  videoName: string;
  videoDuration: number;
  creditsUsed: number;
  createdAt: Date;
}

// credit_transactions/{transactionId}
interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;               // Positive for additions, negative for deductions
  type: 'signup_bonus' | 'analysis' | 'purchase' | 'refund' | 'admin_adjustment';
  quality: QualityLevel | null;
  description: string;
  analysisId: string | null;
  purchaseId: string | null;
  createdAt: Date;
}

// purchases/{purchaseId}
interface Purchase {
  id: string;
  userId: string;
  packType: 'creator' | 'pro';
  credits: number;
  amountCents: number;
  currency: string;
  lemonSqueezyOrderId: string;
  status: 'pending' | 'completed' | 'refunded' | 'failed';
  createdAt: Date;
}
```

---

## Client-Side Video Processing

### FFmpeg WASM Frame Extraction

Videos are processed client-side using FFmpeg compiled to WebAssembly:

```
Video File → FFmpeg WASM → Extract Frames (every 150ms, max 24)
                                    │
                                    ▼
                          Create Frame Grid (4 columns, 320px wide)
                                    │
                                    ▼
                          Send as frameGridBase64 with analysis request
```

This provides the AI model with keyframe reference images for more accurate motion analysis. Frame extraction requires `SharedArrayBuffer` support (COOP/COEP headers).

### File Size Routing

| Size Range | Gemini Path |
|-----------|-------------|
| 0-4MB | Inline base64 |
| 4-20MB | Gemini Files API |
| 20-100MB | Gemini Files API |
| >100MB | Rejected |

---

## Component Architecture

### Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (AuthProvider wrapper)
│   ├── page.tsx                  # Landing page
│   │
│   ├── (dashboard)/              # Authenticated route group
│   │   ├── layout.tsx            # Dashboard layout
│   │   ├── dashboard/page.tsx    # Main analysis workspace
│   │   ├── history/page.tsx      # Analysis history
│   │   ├── account/page.tsx      # User profile & settings
│   │   └── settings/page.tsx     # App settings
│   │
│   └── api/
│       ├── analyze/route.ts      # Main analysis endpoint (SSE streaming)
│       ├── upload/route.ts       # Gemini Files API upload
│       ├── upload-url/route.ts   # R2 presigned URLs
│       ├── analyses/route.ts     # Analysis history CRUD
│       ├── checkout/route.ts     # Payment checkout
│       ├── transactions/route.ts # Credit transactions
│       └── webhooks/
│           └── lemon-squeezy/    # Payment webhook
│
├── components/
│   ├── upload/                   # UploadZone, VideoPreview
│   ├── config/                   # FormatSelector, QualitySelector, TriggerContext, AgenticToggle
│   ├── output/                   # OutputPanel, CodeOutput, FramePreview
│   ├── analysis/                 # AnalysisProgress, StreamingOutput
│   ├── layout/                   # Header, Footer, BackgroundEffects
│   ├── landing/                  # HeroSection, HowItWorks, UseCases, Pricing
│   └── ui/                       # Button, Badge, CodeBlock, Select, Tabs
│
├── hooks/
│   ├── use-analysis.ts           # Analysis orchestration & SSE streaming
│   ├── use-video-upload.ts       # Video file handling & metadata
│   ├── use-ffmpeg.ts             # FFmpeg WASM loading & frame extraction
│   └── use-auth.ts               # Authentication state
│
├── lib/
│   ├── ai/
│   │   ├── gemini.ts             # Gemini model integration (4 functions)
│   │   ├── agentic-pipeline.ts   # 4-pass agentic analysis pipeline
│   │   ├── agentic-prompts.ts    # Pass-specific prompts
│   │   ├── prompts.ts            # System prompt construction & format templates
│   │   └── output-parsers.ts     # Extract overview/code from AI response
│   │
│   ├── firebase/
│   │   ├── client.ts             # Firebase client SDK
│   │   └── admin.ts              # Firebase Admin SDK (server-side)
│   │
│   ├── storage/
│   │   └── r2.ts                 # Cloudflare R2 operations
│   │
│   ├── ffmpeg/
│   │   └── extract-frames.ts     # Client-side keyframe extraction
│   │
│   └── actions/
│       ├── analyses.ts           # Server actions for analysis CRUD
│       └── credits.ts            # Credit check, deduct, balance
│
├── types/
│   ├── analysis.ts               # OutputFormat, QualityLevel, AnalysisResult, etc.
│   ├── output-formats.ts         # Format/Quality/Trigger option configs
│   └── database.ts               # Firestore schema, credit costs, collections
│
├── contexts/
│   └── auth-context.tsx          # Global auth context (Firebase Auth)
│
└── styles/
    └── globals.css               # Global styles & Tailwind config
```

### Dashboard Workspace Layout

```
Dashboard Page
├── Left Panel (Configuration)
│   ├── UploadZone (drag & drop, file selection)
│   ├── VideoPreview (playback, metadata display)
│   ├── FormatSelector (15 format options in groups)
│   ├── QualitySelector (balanced / precise)
│   ├── TriggerContext (hover/click/scroll/load/loop/focus)
│   ├── AgenticToggle (enable 4-pass pipeline)
│   └── Analyze Button (with credit cost display)
│
└── Right Panel (Results)
    └── OutputPanel
        ├── Code Tab (syntax-highlighted with Shiki)
        ├── Overview Tab (animation summary)
        ├── Frame Preview Tab (extracted keyframe)
        └── Verification Tab (agentic mode only, score + discrepancies)
```

### State Management

All state is managed through custom React hooks:

| Hook | Purpose |
|------|---------|
| `useVideoUpload` | Video file selection, metadata extraction, upload progress |
| `useAnalysis` | Analysis lifecycle, SSE streaming, progress tracking, results map |
| `useAuth` | Firebase Auth state, user profile, sign in/out |
| `useFFmpeg` | Lazy-load FFmpeg WASM, frame extraction |

---

## Type System

**File:** `src/types/analysis.ts`

```typescript
type OutputFormat =
  | 'clone_ui_animation' | 'clone_component' | 'clone_landing_page'
  | 'copy_design_style' | 'extract_design_tokens'
  | 'remotion_demo_template' | 'qa_clone_checklist' | 'accessibility_audit'
  | 'interaction_state_machine' | 'performance_budget'
  | 'lottie_rive_export' | 'storyboard_breakdown'
  | 'tailwind_animate' | 'react_native_reanimated' | 'figma_motion_spec';

type QualityLevel = 'balanced' | 'precise' | 'kimi';

type TriggerContext = 'hover' | 'click' | 'scroll' | 'load' | 'loop' | 'focus' | null;

interface AnalysisResult {
  overview: string;
  code: string;
  format: OutputFormat;
  notes?: string;
  rawAnalysis?: string;
  frameImage?: string;
  verificationScore?: number;       // Agentic mode only (0-100)
  verificationReport?: VerificationReport;
  thinkingLog?: string;            // Gemini thinking traces
}

interface VerificationReport {
  overallScore: number;
  discrepancies: Discrepancy[];
  corrections: string[];
  summary?: string;
}

interface AnalysisProgress {
  step: 'uploading' | 'extracting' | 'analyzing' | 'generating' | 'complete' | 'error'
    | 'pass_1_decomposing' | 'pass_2_analyzing' | 'pass_3_generating' | 'pass_4_verifying';
  message: string;
  progress?: number;
  currentPass?: number;
  totalPasses?: number;
  passName?: string;
}

interface VideoMetadata {
  duration: number;
  width: number;
  height: number;
  size: number;
  mimeType: string;
  name: string;
}
```

---

## Configuration

### Environment Variables

```bash
# Required — Gemini API
GEMINI_API_KEY=your-gemini-api-key

# Required — Firebase (Client)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Required — Firebase Admin (Server-side)
FIREBASE_SERVICE_ACCOUNT_KEY=...  # JSON string

# Required — Cloudflare R2
CLOUDFLARE_R2_ACCOUNT_ID=...
CLOUDFLARE_R2_ACCESS_KEY_ID=...
CLOUDFLARE_R2_SECRET_ACCESS_KEY=...
CLOUDFLARE_R2_BUCKET_NAME=animspec-videos

# Required — Lemon Squeezy (Payments)
LEMON_SQUEEZY_API_KEY=...

# Optional
NEXT_PUBLIC_DISABLE_KEYFRAMES=false
NEXT_PUBLIC_COOKIE_DOMAIN=yourdomain.com
```

### Next.js Configuration

- **Runtime:** Node.js (required for Firebase Admin SDK)
- **Timeout:** 300 seconds for analysis routes
- **Package optimization:** Firebase, Shiki, @google/genai tree-shaken via `optimizePackageImports`
- **Security headers:** COOP/COEP for FFmpeg WASM SharedArrayBuffer
- **CSP:** `wasm-unsafe-eval` for FFmpeg WASM execution
- **Image domains:** Google Cloud Storage, Google auth avatars

### Constraints

| Constraint | Value |
|------------|-------|
| File Size Limit | 100MB |
| Accepted Formats | MP4, WebM, MOV |
| Streaming Timeout | 300 seconds |
| Vercel Body Limit | ~4.5MB (triggers external upload) |
| Gemini Files API Threshold | > 4MB |
| Default Free Credits | 20 |
| Max Analyses per User | 50 |

---

## Security

- **Auth:** Firebase Auth with server-side ID token verification on every API call
- **Authorization:** Credit balance checks before analysis; precise mode restricted to paid users
- **API protection:** File size validation (100MB max), MIME type validation (video only), rate limiting
- **Data isolation:** Analysis records scoped to `userId`; Firestore security rules restrict collection access
- **Headers:** COOP/COEP for WASM, CSP for script execution, secure cookie flags
- **Secrets:** All API keys server-side only; environment variables not exposed to client

---

## Deployment

| Component | Service |
|-----------|---------|
| Application | Vercel (Next.js serverless) |
| Database | Firebase Firestore |
| Authentication | Firebase Auth |
| File Storage | Firebase Storage + Cloudflare R2 |
| Video Analysis | Google Gemini 3 API |
| Payments | Lemon Squeezy |
| Domain/CDN | Vercel Edge Network |

The entire stack is serverless with auto-scaling. No infrastructure to manage.

---

## Dependencies

### Production
| Package | Purpose |
|---------|---------|
| `@google/genai` ^1.0.0 | Gemini 3 API SDK |
| `@ffmpeg/ffmpeg` ^0.12.10 | Client-side video frame extraction |
| `firebase` ^12.8.0 | Client-side Firebase (Auth, Firestore, Storage) |
| `firebase-admin` ^13.6.0 | Server-side Firebase Admin |
| `next` ^15.1.0 | Next.js framework |
| `react` ^19.0.0 | React UI framework |
| `openai` ^6.16.0 | Kimi API client (OpenAI-compatible) |
| `react-dropzone` ^14.3.5 | File upload drag & drop |
| `shiki` ^1.24.0 | Code syntax highlighting |
| `aws4fetch` ^1.0.20 | Cloudflare R2 presigned URLs |

### Development
| Package | Purpose |
|---------|---------|
| `tailwindcss` ^4.0.0 | Utility-first CSS |
| `typescript` ^5.7.0 | Type safety |
| `eslint` ^9.17.0 | Linting |
