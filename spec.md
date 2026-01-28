# AnimSpec.ai - Video to Agent-ready Instructions
## Product Specification Document

**Version:** 1.0  
**Date:** January 18, 2026  
**Author:** Sanket (AI-Assisted)

---

## Executive Summary

**AnimSpec.ai** is a micro-SaaS tool that converts video animations (MP4) into precise, structured text instructions that can be passed to AI coding agents like Claude Code, Codex, Cursor, or any LLM-powered development tool.

### The Problem
AI coding agents cannot process video inputs. When developers want to communicate specific animations visually, they're forced to manually describe motion, timing, and transitions—a tedious and often imprecise process that leads to multiple iterations.

### The Solution
AnimSpec.ai extracts frames from uploaded videos, analyzes motion patterns using AI vision models, and generates structured animation specifications in formats optimized for coding agents (CSS keyframes, GSAP instructions, Framer Motion props, etc.).

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                               │
│  ┌─────────────┐  ┌─────────────────┐  ┌─────────────────────────┐  │
│  │ Video Drop  │→ │ Preview + Config │→ │ Generated Instructions  │  │
│  │    Zone     │  │    Controls      │  │     + Copy/Export       │  │
│  └─────────────┘  └─────────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      PROCESSING PIPELINE                             │
│                                                                      │
│  ┌──────────────┐    ┌──────────────┐    ┌───────────────────────┐  │
│  │   FFmpeg     │    │  Frame Grid  │    │   AI Vision Model     │  │
│  │   Frame      │ →  │  Composer    │ →  │   (gemini 3 Pro     │  │
│  │   Extraction │    │  (Montage)   │    │   or GPT-4o)          │  │
│  └──────────────┘    └──────────────┘    └───────────────────────┘  │
│                                                     │                │
│                              ┌───────────────────────┘                │
│                              ▼                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                 INSTRUCTION GENERATOR                         │   │
│  │  ┌─────────┐  ┌───────────┐  ┌────────────┐  ┌─────────────┐ │   │
│  │  │  CSS    │  │   GSAP    │  │  Framer    │  │  Natural    │ │   │
│  │  │Keyframes│  │   Timeline│  │  Motion    │  │  Language   │ │   │
│  │  └─────────┘  └───────────┘  └────────────┘  └─────────────┘ │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Technical Components

### 1. Frame Extraction Layer

**Technology:** FFmpeg via Python bindings (`ffmpeg-python` or subprocess)

**Approach:**
- Extract frames at configurable FPS (default: 4 FPS for most animations)
- I-frame extraction for scene change detection
- Smart keyframe selection based on motion delta

**Implementation:**

```python
import subprocess
import os

def extract_frames(video_path: str, output_dir: str, fps: float = 4) -> list[str]:
    """
    Extract frames from video at specified FPS.
    Returns list of extracted frame paths.
    """
    os.makedirs(output_dir, exist_ok=True)
    
    cmd = [
        'ffmpeg', '-i', video_path,
        '-vf', f'fps={fps}',
        '-q:v', '2',  # High quality JPEGs
        f'{output_dir}/frame_%04d.jpg'
    ]
    
    subprocess.run(cmd, capture_output=True, check=True)
    
    frames = sorted([
        os.path.join(output_dir, f) 
        for f in os.listdir(output_dir) 
        if f.endswith('.jpg')
    ])
    
    return frames


def extract_keyframes_only(video_path: str, output_dir: str) -> list[str]:
    """
    Extract only I-frames (keyframes) for scene change detection.
    """
    os.makedirs(output_dir, exist_ok=True)
    
    cmd = [
        'ffmpeg', '-i', video_path,
        '-vf', "select='eq(pict_type,PICT_TYPE_I)'",
        '-vsync', 'vfr',
        f'{output_dir}/keyframe_%04d.jpg'
    ]
    
    subprocess.run(cmd, capture_output=True, check=True)
    
    return sorted([
        os.path.join(output_dir, f)
        for f in os.listdir(output_dir)
        if f.startswith('keyframe_')
    ])
```

### 2. Frame Grid Composer

**Purpose:** Combine multiple frames into a single grid image for efficient AI processing (reduces API calls and provides temporal context).

**Implementation:**

```python
from PIL import Image
import math

def create_frame_grid(
    frame_paths: list[str],
    output_path: str,
    cols: int = 4,
    frame_size: tuple[int, int] = (480, 270),
    add_labels: bool = True
) -> str:
    """
    Create a grid montage of frames with optional timestamp labels.
    Optimized for AI vision model input.
    """
    frames = [Image.open(p).resize(frame_size) for p in frame_paths]
    n = len(frames)
    rows = math.ceil(n / cols)
    
    grid_width = cols * frame_size[0]
    grid_height = rows * frame_size[1]
    
    grid = Image.new('RGB', (grid_width, grid_height), color='white')
    
    for idx, frame in enumerate(frames):
        row = idx // cols
        col = idx % cols
        x = col * frame_size[0]
        y = row * frame_size[1]
        grid.paste(frame, (x, y))
        
        if add_labels:
            from PIL import ImageDraw, ImageFont
            draw = ImageDraw.Draw(grid)
            label = f"F{idx + 1}"
            draw.rectangle([x, y, x + 40, y + 20], fill='black')
            draw.text((x + 5, y + 2), label, fill='white')
    
    grid.save(output_path, quality=85)
    return output_path
```

### 3. AI Vision Analysis Layer

**Recommended APIs (in order of capability) - Updated January 2026:**

| Provider | Model | Model Code | Native Video | Best For |
|----------|-------|------------|--------------|----------|
| **Google** | Gemini 3 Flash | `gemini-3-flash-preview` | ✅ Yes | Fastest, balanced performance |
| **Google** | Gemini 3 Pro | `gemini-3-pro` | ✅ Yes | Complex reasoning, highest quality |
| **Google** | gemini 3 Pro | `gemini-2.5-pro` | ✅ Yes | Production stable, 1M context |
| **Google** | gemini 3 Flash | `gemini-2.5-flash` | ✅ Yes | Cost-effective, production ready |
| **OpenAI** | GPT-5.2 | `gpt-5.2` | ❌ Frames only | Highest accuracy, reasoning |
| **OpenAI** | gpt-5.2 | `gpt-5.2` | ❌ Frames only | Vision + cost balance |
| **OpenAI** | gpt-5.2 Mini | `gpt-5.2-mini` | ❌ Frames only | Budget option |
| **Anthropic** | Claude Sonnet 4 | `claude-sonnet-4-20250514` | ❌ Frames only | Structured output, code gen |

### Model Specifications

**Gemini Models (Native Video Support):**
- **Gemini 3 Flash/Pro**: Latest series with advanced reasoning ("thinking" mode)
- **gemini 3 Flash**: 1M token context, text/images/video/audio input
- **gemini 3 Pro**: State-of-the-art thinking model, best for complex analysis
- **Knowledge cutoff**: January 2025
- **Video processing**: Native support via File API or inline base64
- **Custom FPS**: Supports `videoMetadata.fps` parameter (default 1 FPS)

**OpenAI Models (Frame-based):**
- **GPT-5.2**: Most capable, supports reasoning effort levels
- **gpt-5.2**: Excellent vision, 85 base tokens + 170 per tile (high detail)
- **Image detail modes**: `low` (85 tokens), `high` (scaled tiles), `auto`

**Primary Recommendation: gemini 3 Flash (Production) / Gemini 3 Flash (Preview)**

Gemini supports native video input up to 1M tokens (~2 hours), eliminating the need for frame extraction. It can process videos directly via:
- Base64 inline data (<20MB)
- File API upload (larger files, recommended)
- YouTube URLs (public videos, preview feature)
- Custom FPS sampling via `videoMetadata`

**Gemini Implementation (Latest SDK):**

```python
from google import genai
from google.genai import types

def analyze_video_with_gemini(
    video_path: str,
    output_format: str = "css",
    fps: int = 5  # Higher FPS for animation analysis
) -> dict:
    """
    Analyze video using Gemini's native video understanding.
    Uses File API for larger videos, inline for <20MB.
    """
    client = genai.Client()
    
    # Option 1: File API (recommended for larger videos)
    uploaded_file = client.files.upload(file=video_path)
    
    prompt = build_analysis_prompt(output_format)
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",  # or "gemini-3-flash-preview" for latest
        contents=[
            uploaded_file,
            prompt
        ]
    )
    
    return parse_animation_response(response.text)


def analyze_video_inline_with_fps(
    video_path: str,
    output_format: str = "css",
    fps: int = 5
) -> dict:
    """
    Analyze video with custom FPS for detailed motion capture.
    Use higher FPS (5-10) for fast animations.
    """
    client = genai.Client()
    
    video_bytes = open(video_path, 'rb').read()
    prompt = build_analysis_prompt(output_format)
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=types.Content(
            parts=[
                types.Part(
                    inline_data=types.Blob(
                        data=video_bytes,
                        mime_type='video/mp4'
                    ),
                    video_metadata=types.VideoMetadata(fps=fps)  # Custom FPS!
                ),
                types.Part(text=prompt)
            ]
        )
    )
    
    return parse_animation_response(response.text)
```

**OpenAI gpt-5.2/5.2 Frame Grid Implementation:**

```python
from openai import OpenAI
import base64

def analyze_frames_with_openai(
    frame_grid_path: str,
    individual_frames: list[str],
    output_format: str = "css",
    model: str = "gpt-5.2"  # or "gpt-5.2" for highest quality
) -> dict:
    """
    Analyze animation frames using OpenAI vision models.
    Sends grid image plus key individual frames for detail.
    """
    client = OpenAI()
    
    def encode_image(path):
        with open(path, 'rb') as f:
            return base64.b64encode(f.read()).decode('utf-8')
    
    # Build content with grid + selected frames
    content = [
        {"type": "input_text", "text": build_analysis_prompt(output_format)},
        {
            "type": "input_image",
            "image_url": f"data:image/jpeg;base64,{encode_image(frame_grid_path)}",
            "detail": "high"  # Use high detail for animation analysis
        }
    ]
    
    # Add first, middle, and last frames for detail
    key_indices = [0, len(individual_frames)//2, -1]
    for idx in key_indices:
        content.append({
            "type": "input_image",
            "image_url": f"data:image/jpeg;base64,{encode_image(individual_frames[idx])}",
            "detail": "high"
        })
    
    response = client.responses.create(
        model=model,
        input=[{"role": "user", "content": content}]
    )
    
    return parse_animation_response(response.output_text)
```

---

## The System Prompt

This is the core prompt that generates accurate Agent-ready Instructions:

```
ANIMATION ANALYSIS SYSTEM PROMPT
================================

You are an expert animation analyst. Your task is to analyze video/image sequences showing UI animations and extract precise, implementable animation specifications.

## ANALYSIS PROCESS

1. **IDENTIFY ELEMENTS**: What objects/elements are being animated?
   - Describe their visual appearance (shape, color, size)
   - Note their initial state/position
   - Note their final state/position

2. **DETECT MOTION TYPES**: For each element, identify:
   - Translation (movement in X/Y/Z)
   - Rotation (degrees, axis)
   - Scale (grow/shrink, from/to values)
   - Opacity (fade in/out, values)
   - Color/fill changes
   - Deformation (morph, path animation)
   - Filter effects (blur, shadow changes)

3. **TIMING ANALYSIS**: Extract temporal information:
   - Total duration (estimate from frame count if not provided)
   - Per-property timing (which properties animate when)
   - Delays between elements (stagger)
   - Easing curves (linear, ease-in, ease-out, ease-in-out, spring, bounce)

4. **SEQUENCE STRUCTURE**:
   - Are animations sequential or parallel?
   - Are there distinct phases/keyframes?
   - Is there looping? What type?

## OUTPUT FORMAT: {output_format}

Based on the requested format, provide:

### For CSS Keyframes:
```css
@keyframes animationName {
  0% {
    /* initial state with all animated properties */
  }
  /* intermediate keyframes as needed */
  100% {
    /* final state */
  }
}

.element {
  animation: animationName [duration] [easing] [delay] [iteration] [direction] [fill-mode];
}
```

### For GSAP:
```javascript
gsap.timeline()
  .fromTo('.element', 
    { /* from state */ },
    { /* to state */, duration: X, ease: 'power2.out' }
  )
  // chain additional animations
```

### For Framer Motion:
```jsx
const variants = {
  initial: { /* initial state */ },
  animate: { /* final state */ },
}

<motion.div
  variants={variants}
  initial="initial"
  animate="animate"
  transition={{ duration: X, ease: [0.4, 0, 0.2, 1] }}
/>
```

### For Natural Language (Claude Code/Codex):
Provide a detailed description in this format:

**Animation Overview:**
[Brief description of what the animation achieves]

**Elements:**
1. [Element 1 name/description]
   - Initial state: [describe position, opacity, scale, etc.]
   - Final state: [describe end state]
   - Motion: [describe the movement path and behavior]
   
**Timing:**
- Total duration: [X seconds]
- Easing: [describe the feel - snappy, smooth, bouncy, etc.]
- Stagger: [if multiple elements, describe the delay pattern]

**Keyframes:**
- 0%: [state description]
- [X]%: [intermediate state if applicable]
- 100%: [final state]

**Implementation Notes:**
[Any specific considerations for implementing this animation]

## CRITICAL RULES

1. **Be Precise**: Use exact values (px, %, degrees) not vague descriptions
2. **Include Easing**: Always specify easing - it defines the animation's feel
3. **Note Stagger**: If multiple elements animate, note the stagger timing
4. **Identify Loops**: Clearly state if animation loops and how
5. **Describe Spring Physics**: If motion has bounce/overshoot, describe it
6. **Use Standard Units**: 
   - Duration in seconds (s) or milliseconds (ms)
   - Distances in pixels (px) or percentages (%)
   - Rotations in degrees (deg)
   - Opacity from 0 to 1
7. **Break Down Complex Animations**: Multi-step animations should be clearly sequenced

## EXAMPLE OUTPUT (Natural Language)

**Animation Overview:**
A card slides up from below the viewport with a fade-in effect, settling with a subtle overshoot (spring physics).

**Elements:**
1. Card Container
   - Initial state: Y position +100%, opacity 0, scale 0.95
   - Final state: Y position 0%, opacity 1, scale 1
   - Motion: Vertical slide upward with spring easing

**Timing:**
- Total duration: 0.6s
- Easing: Spring with stiffness ~300, damping ~24 (or CSS: cubic-bezier(0.34, 1.56, 0.64, 1))
- Delay: 0.1s after trigger

**Keyframes:**
- 0%: translateY(100%), opacity: 0, scale: 0.95
- 70%: translateY(-5%), opacity: 1, scale: 1.02 (overshoot)
- 100%: translateY(0%), opacity: 1, scale: 1

**Implementation Notes:**
- Use transform for GPU acceleration
- Consider reduced-motion preference: provide instant alternative
- Card shadow could also animate (subtle increase) for depth effect
```

---

## Output Formats

### Format 1: CSS Keyframes (Default)
Best for: Simple web animations, CSS-only implementations

### Format 2: GSAP Timeline  
Best for: Complex sequences, timeline control, JavaScript-based animations

### Format 3: Framer Motion
Best for: React applications, declarative animations

### Format 4: Natural Language Spec
Best for: Claude Code, Codex, and other AI coding agents that need implementation flexibility

### Format 5: Lottie Parameters
Best for: Cross-platform animations, After Effects workflow

### Format 6: Unity/Unreal Animation Spec
Best for: Game development animations

---

## API Design

### Endpoints

**POST /api/analyze**
```json
{
  "video": "<base64 or URL>",
  "output_format": "css | gsap | framer | natural | lottie | unity",
  "fps": 4,
  "detail_level": "basic | detailed | comprehensive"
}
```

**Response:**
```json
{
  "success": true,
  "animation_spec": {
    "overview": "...",
    "elements": [...],
    "timing": {...},
    "code": "...",
    "raw_analysis": "..."
  },
  "frames_analyzed": 24,
  "processing_time_ms": 3420
}
```

---

## Cost Analysis (Updated January 2026)

### Per-Analysis Costs (estimated)

| Component | Model | Cost |
|-----------|-------|------|
| Gemini 3 Flash (30s video) | `gemini-3-flash-preview` | ~$0.01 |
| gemini 3 Flash (30s video) | `gemini-2.5-flash` | ~$0.02 |
| gemini 3 Pro (30s video) | `gemini-2.5-pro` | ~$0.08 |
| gpt-5.2 (grid + 3 frames, high detail) | `gpt-5.2` | ~$0.04 |
| gpt-5.2 Mini (grid + 3 frames) | `gpt-5.2-mini` | ~$0.01 |
| GPT-5.2 (grid + 3 frames) | `gpt-5.2` | ~$0.10 |
| Server processing | - | ~$0.001 |
| **Total per analysis** | **Range** | **$0.01 - $0.12** |

### Token Calculations (OpenAI Vision)

**gpt-5.2 / GPT-5.2 Image Tokens:**
- Low detail: 85 base tokens (fixed)
- High detail: 85 base + (170 × tiles)
  - Tiles = ceil(768/512) × ceil(scaled_height/512)
- Example: 1024×1024 image at high detail = 765 tokens

**Gemini Video Tokens:**
- ~258 tokens per frame (at 1 FPS)
- ~32 tokens per second of audio
- ~300 tokens total per second of video

### Pricing Model Recommendation

| Tier | Price | Analyses/month |
|------|-------|----------------|
| Free | $0 | 5 |
| Starter | $9/mo | 50 |
| Pro | $29/mo | 200 |
| Unlimited | $79/mo | Unlimited |

---

## Tech Stack Recommendation

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS v4
- **File Upload:** React Dropzone
- **Video Preview:** Video.js or native HTML5
- **Code Display:** Shiki (syntax highlighting)

### Backend
- **Runtime:** Node.js 22 / Bun
- **Framework:** Next.js API Routes or Hono
- **Video Processing:** FFmpeg (via fluent-ffmpeg or subprocess)
- **AI Integration:** 
  - Google: `@google/genai` (new unified SDK)
  - OpenAI: `openai` v2+ (Responses API)
  - Vercel AI SDK (for streaming)

### AI SDK Examples

**Google GenAI SDK (Recommended for Gemini):**
```javascript
import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";

const ai = new GoogleGenAI({});

// Upload and analyze video
const myfile = await ai.files.upload({
  file: "path/to/video.mp4",
  config: { mimeType: "video/mp4" },
});

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: createUserContent([
    createPartFromUri(myfile.uri, myfile.mimeType),
    "Analyze this animation and extract keyframe specifications.",
  ]),
});
```

**OpenAI SDK (Responses API):**
```javascript
import OpenAI from "openai";

const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-5.2",
  input: [{
    role: "user",
    content: [
      { type: "input_text", text: "Analyze this animation frame grid..." },
      { type: "input_image", image_url: `data:image/jpeg;base64,${base64Image}`, detail: "high" }
    ]
  }]
});

console.log(response.output_text);
```

### Infrastructure
- **Hosting:** Vercel (frontend + serverless)
- **Video Processing:** AWS Lambda with FFmpeg layer OR Modal.com
- **Storage:** Cloudflare R2 or AWS S3 (temporary video storage)
- **Database:** Planetscale or Supabase (user accounts, history)

---

## User Flow

```
1. USER LANDS ON PAGE
   │
   ├── Sees hero section with value proposition
   ├── Video drop zone prominently displayed
   │
2. USER UPLOADS VIDEO (drag & drop or click)
   │
   ├── Video preview appears
   ├── Configure options:
   │   ├── Output format (CSS/GSAP/Framer/Natural)
   │   ├── Detail level
   │   └── Analysis quality (Fast/Precise)
   │
3. USER CLICKS "ANALYZE"
   │
   ├── Loading state with progress indicators
   ├── Frame extraction visual feedback
   │
4. RESULTS DISPLAYED
   │
   ├── Animation overview summary
   ├── Detected elements list
   ├── Generated code/instructions
   │   ├── Syntax highlighted
   │   ├── Copy button
   │   └── Download option
   ├── Side-by-side: video preview + generated animation preview
   │
5. USER COPIES/EXPORTS
   │
   └── Paste into Claude Code, Cursor, Codex, etc.
```

---

## MVP Feature Scope

### Phase 1 (Launch)
- [ ] Video upload (MP4, WebM, MOV)
- [ ] CSS Keyframes output
- [ ] Natural Language output
- [ ] Basic frame extraction
- [ ] gemini 3 Flash integration

### Phase 2 (Growth)
- [ ] GSAP output format
- [ ] Framer Motion output format
- [ ] User accounts + history
- [ ] Multiple videos comparison
- [ ] Custom system prompt tuning

### Phase 3 (Scale)
- [ ] API access for developers
- [ ] Browser extension
- [ ] Figma plugin
- [ ] Team collaboration features

---

## Competitive Advantages

1. **First-to-market** for video-to-code-agent translation
2. **Multi-format output** (CSS, GSAP, Framer, Natural Language)
3. **Optimized for AI coding agents** (structured output)
4. **Fast processing** (Gemini native video vs frame-by-frame)
5. **Developer-focused UX** (copy-paste ready)

---

## Success Metrics

- **Conversion:** Free → Paid (target: 5%)
- **Retention:** Monthly active users returning (target: 40%)
- **Usage:** Analyses per user per month (target: 15)
- **NPS:** User satisfaction (target: 50+)
- **Time Saved:** Average time saved per animation (target: 30 min)