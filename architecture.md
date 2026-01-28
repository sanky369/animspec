# AnimSpec.ai Architecture

> A micro-SaaS tool that converts video animations into structured text instructions for AI coding agents (Claude Code, Cursor, Codex).

## Overview

AnimSpec.ai solves the problem that AI models cannot process video inputs, forcing developers to manually describe animations—a tedious, error-prone process. It analyzes uploaded animation videos and generates precise, implementable specifications.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (React 19 + Tailwind CSS 4)                       │
│  - Landing page with demo & pricing                         │
│  - Authenticated dashboard with analysis, history, account  │
│  - Real-time streaming results display                      │
└─────────────────────────────────────────────────────────────┘
              ↓ (POST requests + auth cookies)
┌─────────────────────────────────────────────────────────────┐
│  API LAYER (Next.js Route Handlers)                         │
│  - /api/upload      → Gemini Files API (large Gemini files) │
│  - /api/upload-url  → R2 presigned URL (large Kimi files)   │
│  - /api/analyze     → AI analysis streaming + credit deduct │
│  - /api/analyses    → User history                          │
│  - /api/checkout    → Lemon Squeezy payment                 │
│  - /api/webhooks    → Payment confirmation                  │
└─────────────────────────────────────────────────────────────┘
              ↓ (async operations)
┌─────────────────────────────────────────────────────────────┐
│  BACKEND SERVICES                                           │
│  - Firebase Auth (email/password + Google OAuth)            │
│  - Firestore (profiles, analyses, transactions, purchases)  │
│  - Firebase Storage (frame images)                          │
│  - Cloudflare R2 (temporary video storage for large files)  │
│  - Gemini AI (video analysis — fast/balanced/precise)       │
│  - Kimi K2.5 (video analysis — thinking mode)               │
│  - Lemon Squeezy (payments)                                 │
└─────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Next.js 15 (App Router), Tailwind CSS 4 |
| Backend | Node.js runtime, Next.js API Routes |
| AI | Google Gemini API (@google/genai SDK), Kimi K2.5 (OpenAI SDK via Moonshot API) |
| Auth | Firebase Authentication |
| Database | Firestore |
| Storage | Firebase Storage (frame images), Cloudflare R2 (temporary video uploads) |
| Payments | Lemon Squeezy |
| Video Processing | FFmpeg.wasm (client-side, optional) |
| Cloud Storage SDK | aws4fetch (lightweight S3-compatible signing for R2) |
| UI Libraries | react-dropzone, shiki (syntax highlighting) |

---

## Authentication & Authorization

### Firebase Auth Integration

**Files:** `src/contexts/auth-context.tsx`, `src/lib/firebase/client.ts`, `src/lib/firebase/admin.ts`

Supports two authentication methods:
- Email/password registration and login
- Google OAuth (popup-based)

```
User Auth Flow:
  ↓
  Firebase Client SDK (signInWithEmail/signInWithGoogle)
  ↓
  onAuthStateChanged → Set session cookie (__session)
  ↓
  Fetch/create user profile in Firestore
  ↓
  AuthContext provides { user, profile, isLoading }
```

### Route Protection

**File:** `src/middleware.ts`

- Protected routes: `/dashboard/*` (require authentication)
- Unauthenticated users redirected to landing page
- Session verified via `__session` cookie

---

## Credits System

### Credit Costs per Quality Level

| Quality | Model | Credits | Access |
|---------|-------|---------|--------|
| fast | gemini-2.5-flash | 1 | All users |
| balanced | gemini-3-flash-preview | 3 | All users |
| precise | gemini-3-pro-preview | 20 | Paid users only |
| kimi | kimi-k2.5 (Moonshot) | 5 | All users |

### Credit Packs (Lemon Squeezy)

| Pack | Credits | Price |
|------|---------|-------|
| Creator | 200 | $24.00 |
| Pro | 600 | $59.00 |

### Credit Flow

**Files:** `src/lib/actions/credits.ts`, `src/hooks/use-credits.ts`

```
New User Signup → 20 free credits
  ↓
User analyzes video → Check credits balance
  ↓
If sufficient → Deduct credits → Save analysis → Record transaction
  ↓
Low credits → Purchase pack via /api/checkout
  ↓
Lemon Squeezy webhook → Add credits to profile
```

---

## Extraction Logic (Core Pipeline)

### 1. Video Ingestion

**Files:** `src/hooks/use-analysis.ts` → `src/app/api/upload/route.ts`, `src/app/api/upload-url/route.ts`

Users upload MP4, WebM, or MOV videos (max 100MB). File size and quality level determine the upload strategy:

```
Video File → Check Size (4MB threshold — Vercel body limit)
  ↓
  IF ≤ 4MB: Convert to base64 → Include inline in request
  ↓
  IF > 4MB AND Gemini quality (fast/balanced/precise):
    Upload to /api/upload → Gemini Files API → Get fileUri
  ↓
  IF > 4MB AND Kimi quality:
    POST /api/upload-url → Get R2 presigned URL
    Client uploads directly to R2 → Pass objectKey to /api/analyze
    Server fetches from R2 → Converts to base64 → Deletes R2 object after
  ↓
  All paths → /api/analyze with video data + metadata
```

**Video Metadata Extracted:**
- Duration (seconds)
- Resolution (width × height in px)
- File size (bytes)
- MIME type
- File name

### 2. AI Analysis Engine

**Files:** `src/lib/ai/gemini.ts`, `src/lib/ai/kimi.ts`

Two AI providers are supported, routed by quality level:

**Gemini (Google)** — `src/lib/ai/gemini.ts`

| Function | Streaming | Method |
|----------|-----------|--------|
| `analyzeVideoWithGemini()` | No | Base64 |
| `analyzeVideoWithGeminiStream()` | Yes | Base64 |
| `analyzeVideoWithGeminiFile()` | No | Files API |
| `analyzeVideoWithGeminiFileStream()` | Yes | Files API (primary) |

**Kimi K2.5 (Moonshot)** — `src/lib/ai/kimi.ts`

| Function | Streaming | Method |
|----------|-----------|--------|
| `analyzeVideoWithKimi()` | No | Inline base64 |
| `analyzeVideoWithKimiStream()` | Yes | Inline base64 (primary) |

Kimi uses the OpenAI SDK with Moonshot's base URL. It only supports inline base64 video input (no Files API), so large files are routed through Cloudflare R2 on the server side.

**Model Selection by Quality Level:**

| Quality | Provider | Model | Max Tokens | Temperature | Thinking |
|---------|----------|-------|------------|-------------|----------|
| fast | Gemini | gemini-2.5-flash | 3,072 | 0.4 | — |
| balanced | Gemini | gemini-3-flash-preview | 8,192 | 0.2 | high |
| precise | Gemini | gemini-3-pro-preview | 16,384 | 0.1 | high |
| kimi | Moonshot | kimi-k2.5 | 8,192 | 1.0 | thinking mode (temp must be 1.0) |

**What Gets Extracted:**
1. **Animation Elements** — What's being animated (buttons, modals, cards, etc.)
2. **Motion Types** — Translation, rotation, scale, opacity, color changes, effects
3. **Timing Information** — Duration, delays, stagger patterns, easing curves
4. **Sequence Structure** — Sequential vs. parallel, phases, looping behavior
5. **Trigger Context** — How animation is triggered (hover, click, scroll, load, focus, loop)

### 3. Prompt Engineering

**File:** `src/lib/ai/prompts.ts`

The system prompt is constructed from multiple components:

```
System Prompt:
  ├── BASE_SYSTEM_PROMPT (analysis process & motion detection)
  ├── TRIGGER_INFERENCE_PROMPT (or user-provided trigger)
  ├── VIDEO_METADATA (formatted duration, resolution, file size)
  ├── ACCURACY_PROTOCOL_PROMPT (coordinate system, unit standards)
  └── FORMAT_PROMPTS[selectedFormat] (output format instructions)

User Prompt:
  "Analyze the animation in this video. Provide a complete, implementable animation specification."
```

**Output Format Options:**

| Format | Description |
|--------|-------------|
| `natural` | Structured text for AI coding agents (default) |
| `css` | Pure CSS @keyframes syntax |
| `gsap` | GreenSock timeline syntax |
| `framer` | React JSX with Framer Motion variants |
| `remotion` | React components for Remotion video framework |

### 4. Streaming Response

**File:** `src/app/api/analyze/route.ts`

Responses are streamed using Server-Sent Events (SSE):

```
Client → POST /api/analyze (with auth cookie)
  ↓
Server → Verify auth → Check credits
  ↓
Server → If R2 objectKey provided: Fetch video from R2 → Convert to base64 → Schedule R2 deletion
  ↓
Server → Route to AI provider based on quality level:
         - fast/balanced/precise → Gemini (inline or Files API)
         - kimi → Kimi K2.5 (inline base64)
  ↓
Server → Opens SSE stream
  ↓
Server → Yields chunks: { type: 'progress' | 'chunk' | 'complete' | 'error', data?: string }
  ↓
Client → Updates UI with each chunk in real-time
  ↓
Server → Deducts credits → Saves analysis to Firestore
```

### 5. Output Parsing

**File:** `src/lib/ai/output-parsers.ts`

**Functions:**
- `parseAnalysisOutput()` — Extracts overview, code, and notes from AI response
- `extractOverview()` — Finds "Animation Overview" section
- `extractCodeAndNotes()` — Extracts code blocks and additional notes from markdown
- `getLanguageForFormat()` — Maps format to syntax highlighting language
- `getFileExtensionForFormat()` — For download functionality

**Returns:**
```typescript
{
  overview: string;      // Brief description
  code: string;          // Formatted code/instructions
  notes?: string;        // Additional implementation notes
  format: OutputFormat;  // Selected output type
  rawAnalysis?: string;  // Full AI response for inspection
  frameImage?: string;   // Base64 frame from video
}
```

### 6. Frame Extraction (Optional)

**Files:** `src/lib/video/extract-frame.ts`, `src/lib/ffmpeg/`

Two approaches are available:

| Approach | Method | Use Case |
|----------|--------|----------|
| Fast Frame | HTML5 Video + Canvas API | Preview frame at 30% of video duration |
| Full Grid | FFmpeg.wasm | N frames at configurable FPS (not used in main flow) |

---

## Data Flow Diagram

```
1. USER AUTHENTICATES
   ↓
   Landing page → Sign in (email/Google) → Dashboard redirect
   ↓
   AuthProvider fetches/creates profile → Credits balance loaded

2. USER UPLOADS VIDEO
   ↓
   UploadZone.onDrop() → useVideoUpload.setFile()
   ↓
   Extract metadata from <video> element → VideoPreview displays

3. USER CONFIGURES OPTIONS
   ↓
   - Output format (natural/css/gsap/framer/remotion)
   - Quality level (fast/balanced/precise)
   - Trigger context (hover/click/scroll/load/loop/focus)

4. USER CLICKS "ANALYZE"
   ↓
   useAnalysis.analyze(file, metadata, config)
   ↓
   Size check (4MB threshold):
     ≤ 4MB → inline base64
     > 4MB + Gemini → Gemini Files API (/api/upload)
     > 4MB + Kimi → R2 presigned URL (/api/upload-url) → Direct upload to R2
   ↓
   POST to /api/analyze with __session cookie

5. SERVER PROCESSES
   ↓
   Verify auth → Check credits
   ↓
   If R2 objectKey → Fetch from R2 → Convert to base64 → Schedule cleanup
   ↓
   Route by quality: Gemini (fast/balanced/precise) OR Kimi K2.5 (kimi)
   ↓
   Build system prompt → Call AI API → Stream response
   ↓
   Deduct credits → Save analysis to Firestore → Record credit transaction

6. CLIENT DISPLAYS
   ↓
   Accumulate chunks → parseAnalysisOutput() → Display in tabs
   ↓
   Analysis saved to history → User credits refreshed
```

---

## Database Schema (Firestore)

### Collections

| Collection | Purpose |
|------------|---------|
| `profiles` | User profiles with credits balance |
| `analyses` | Saved analysis results |
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
  amount: number;                // Positive for additions, negative for deductions
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

## Component Architecture

### App Structure (Route Groups)

```
src/app/
├── (landing)/           # Public pages (landing, pricing)
│   ├── layout.tsx       # Header + Footer + BackgroundEffects
│   └── page.tsx         # HeroSection, DemoSection, HowItWorks, Pricing
│
├── (dashboard)/         # Authenticated pages
│   ├── layout.tsx       # Sidebar + auth check + redirect
│   └── dashboard/
│       ├── page.tsx     # Main analysis interface
│       ├── history/     # Past analyses
│       ├── account/     # Credits, transactions, buy packs
│       └── settings/    # User settings
│
├── api/
│   ├── analyze/         # Video analysis endpoint (Gemini + Kimi routing)
│   ├── upload/          # Gemini Files API upload (large Gemini files)
│   ├── upload-url/      # R2 presigned URL generation (large Kimi files)
│   ├── analyses/        # Get user's analyses
│   ├── checkout/        # Create Lemon Squeezy checkout
│   ├── transactions/    # Get credit transactions
│   └── webhooks/
│       └── lemon-squeezy/  # Payment webhook handler
│
└── layout.tsx           # Root layout with AuthProvider
```

### Component Structure

```
src/components/
├── analysis/        # AnalysisProgress, StreamingOutput
├── auth/            # AuthButton, SignInModal
├── config/          # FormatSelector, QualitySelector, TriggerContext, OptionsPanel
├── dashboard/       # DashboardHeader, Sidebar, HistoryItem, PricingModal
├── landing/         # HeroSection, DemoSection, HowItWorks, PricingSection
├── layout/          # Header, Footer, BackgroundEffects
├── output/          # OutputPanel, CodeOutput, FramePreview
├── ui/              # Button, Badge, CodeBlock, Select, Tabs, Spinner, Icons
└── upload/          # UploadZone, VideoPreview, UploadProgress
```

### State Management

| Hook | File | Purpose |
|------|------|---------|
| `useAuth` | `src/contexts/auth-context.tsx` | Auth state, user profile, sign in/out |
| `useAnalysis` | `src/hooks/use-analysis.ts` | Analysis lifecycle, streaming, progress |
| `useVideoUpload` | `src/hooks/use-video-upload.ts` | Video file selection and metadata extraction |
| `useCredits` | `src/hooks/use-credits.ts` | Credits balance, quality access check |
| `useFFmpeg` | `src/hooks/use-ffmpeg.ts` | Lazy-loads FFmpeg WASM for frame extraction |
| `useCopyToClipboard` | `src/hooks/use-copy-to-clipboard.ts` | Copy-to-clipboard utility |

---

## Type System

**File:** `src/types/analysis.ts`

```typescript
type OutputFormat = 'natural' | 'css' | 'gsap' | 'framer' | 'remotion'
type QualityLevel = 'fast' | 'balanced' | 'precise' | 'kimi'
type TriggerContext = 'hover' | 'click' | 'scroll' | 'load' | 'loop' | 'focus' | null

interface AnalysisConfig {
  format: OutputFormat
  quality: QualityLevel
  triggerContext: TriggerContext
}

interface AnalysisResult {
  overview: string
  code: string
  notes?: string
  format: OutputFormat
  rawAnalysis?: string
  frameImage?: string
}

interface AnalysisProgress {
  step: 'uploading' | 'extracting' | 'analyzing' | 'generating' | 'complete' | 'error'
  message: string
  progress?: number
}

interface VideoMetadata {
  duration: number
  width: number
  height: number
  size: number
  mimeType: string
  name: string
}
```

---

## Key Files Reference

| Path | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with AuthProvider |
| `src/app/(landing)/page.tsx` | Landing page layout |
| `src/app/(dashboard)/dashboard/page.tsx` | Main analysis interface |
| `src/app/api/analyze/route.ts` | Main analysis endpoint (streaming) |
| `src/app/api/upload/route.ts` | Gemini Files API upload handler |
| `src/app/api/upload-url/route.ts` | R2 presigned URL generation for Kimi uploads |
| `src/app/api/checkout/route.ts` | Lemon Squeezy checkout creation |
| `src/app/api/webhooks/lemon-squeezy/route.ts` | Payment webhook handler |
| `src/lib/ai/gemini.ts` | Gemini model integration |
| `src/lib/ai/kimi.ts` | Kimi K2.5 model integration (Moonshot API) |
| `src/lib/ai/prompts.ts` | System prompt construction |
| `src/lib/ai/output-parsers.ts` | Result parsing & formatting |
| `src/lib/storage/r2.ts` | Cloudflare R2 storage operations (presigned URLs, fetch, delete) |
| `src/lib/firebase/admin.ts` | Firebase Admin SDK (server-side) |
| `src/lib/firebase/client.ts` | Firebase Client SDK (browser) |
| `src/lib/actions/credits.ts` | Credit management functions |
| `src/lib/actions/analyses.ts` | Analysis CRUD operations |
| `src/contexts/auth-context.tsx` | Authentication context provider |
| `src/hooks/use-analysis.ts` | Analysis orchestration hook |
| `src/hooks/use-credits.ts` | Credits state hook |
| `src/middleware.ts` | Route protection middleware |
| `src/types/analysis.ts` | Core TypeScript types |
| `src/types/database.ts` | Firestore document types |

---

## Configuration

### Environment Variables

```bash
# Required - Gemini API
GEMINI_API_KEY=your-gemini-api-key

# Required - Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Required - Firebase Admin (server-side)
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Required - Kimi K2.5 (Moonshot AI)
MOONSHOT_API_KEY=your-moonshot-api-key

# Required - Lemon Squeezy (payments)
LEMON_SQUEEZY_API_KEY=your-lemon-squeezy-api-key
LEMON_SQUEEZY_STORE_ID=your-store-id
LEMON_SQUEEZY_CREATOR_VARIANT_ID=creator-pack-variant-id
LEMON_SQUEEZY_PRO_VARIANT_ID=pro-pack-variant-id
LEMON_SQUEEZY_TEST_MODE=true
LEMON_SQUEEZY_WEBHOOK_SECRET=your-webhook-secret
NEXT_PUBLIC_COOKIE_DOMAIN=.animspec.com

# Required - Cloudflare R2 (temporary video storage for large files)
CLOUDFLARE_R2_ACCOUNT_ID=your-r2-account-id
CLOUDFLARE_R2_ACCESS_KEY_ID=your-r2-access-key-id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
CLOUDFLARE_R2_BUCKET_NAME=animspec-videos

# Optional
NEXT_PUBLIC_APP_URL=https://animspec.ai
```

### Constraints

| Constraint | Value |
|------------|-------|
| File Size Limit | 100MB |
| Accepted Formats | MP4, WebM, MOV |
| Streaming Timeout | 300 seconds (Vercel Pro/Enterprise) |
| Vercel Body Limit | ~4.5MB (triggers external upload) |
| Gemini Files API Threshold | > 4MB (uses Gemini Files API) |
| R2 Upload Threshold | > 4MB for Kimi quality (uses R2 → server fetch) |
| R2 Presigned URL Expiry | 1 hour |
| Default Free Credits | 20 |
| Max Analyses per User | 50 |

---

## Example Extraction Flow

**Input:** 5-second button hover animation video (3.2 MB)

```
1. Auth: User logged in with 15 credits
2. Upload: 3.2 MB ≤ 4 MB → inline base64 path
3. Metadata: duration=5.0, resolution=1920x1080, mimeType=video/mp4
4. Config: format=natural, quality=balanced, triggerContext=hover
5. Credits: balanced costs 3 → User has 15 → Proceed
6. Prompt: Base + trigger + metadata + accuracy + format instructions
7. Model: gemini-3-flash-preview (8192 tokens, temp 0.2, thinking: high)
8. Analysis: Detects button, color change, scale, 0.3s duration, ease-out
9. Deduct: 15 - 3 = 12 credits remaining
10. Save: Analysis stored in Firestore with frame image
11. Output: Structured natural language specification
```

**Sample Output:**
```
**Animation Overview:**
A button smoothly transitions to a darker blue on hover, with a subtle
scale increase creating a tactile feedback effect.

**Elements:**
1. Button
   - Initial: backgroundColor #3b82f6, scale 1
   - Final: backgroundColor #1d4ed8, scale 1.05

**Timing:**
- Duration: 0.3s
- Easing: ease-out

**Trigger:** hover
```
