import type { OutputFormat, VideoMetadata } from '@/types/analysis';

/**
 * Pass 1: Scene Decomposition
 * Identifies all distinct animation segments, timestamps, and element inventory.
 * Output: strict JSON for downstream passes.
 */
export function buildPass1Prompt(metadata?: VideoMetadata | null): string {
  const duration = metadata?.duration ?? 0;
  const resolution = metadata
    ? `${metadata.width}x${metadata.height}`
    : 'unknown';

  return `You are an expert animation decomposition agent specializing in spatial-temporal video understanding.

## TASK
Watch the video carefully and decompose it into distinct animation scenes/segments.
Identify EVERY animated element—even subtle micro-interactions, background shifts, and decorative motion.

For each scene, extract:
1. Start and end timestamps (video duration: ${duration}s)
2. All animated elements visible in that scene
3. A brief description focusing on CAUSE-AND-EFFECT relationships
   - e.g., "Button press triggers container expansion which cascades into child element stagger"

## OUTPUT FORMAT (strict JSON — output ONLY this JSON block, nothing else)
\`\`\`json
{
  "scenes": [
    {
      "id": "scene_1",
      "name": "Hero content entrance",
      "startTime": 0.0,
      "endTime": 1.2,
      "elements": ["headline", "subtitle", "cta_button", "background_gradient"],
      "description": "Page loads triggering staggered fade-up of hero content. Background gradient shifts from dark to warm as elements enter.",
      "causalChain": "page_load → background_shift → headline_fade_up → subtitle_fade_up(+120ms) → cta_scale_in(+200ms)"
    }
  ],
  "elementInventory": [
    {
      "name": "headline",
      "type": "text",
      "cssSelector": ".hero-headline, h1",
      "initialState": { "opacity": "0", "transform": "translateY(20px)" },
      "finalState": { "opacity": "1", "transform": "translateY(0)" },
      "sceneIds": ["scene_1"]
    }
  ],
  "totalDuration": ${duration},
  "resolution": "${resolution}",
  "animationComplexity": "moderate"
}
\`\`\`

## RULES
- Be exhaustive: list EVERY element that moves, fades, scales, or changes
- Timestamps must be precise to 0.1s
- If elements appear in multiple scenes, list all scene IDs
- Include background/decorative elements, shadows, and blur changes
- For causalChain: use → arrows to show temporal dependencies
- Output ONLY the JSON block, no explanatory text`;
}

/**
 * Pass 2: Deep Motion Analysis
 * Per-scene detailed motion specs with cause-and-effect relationships.
 * Receives Pass 1 decomposition as context.
 */
export function buildPass2Prompt(
  decomposition: string,
  metadata?: VideoMetadata | null
): string {
  const duration = metadata?.duration ?? 0;
  const resolution = metadata
    ? `${metadata.width}x${metadata.height}`
    : 'unknown';

  return `You are an expert motion analysis agent. You understand spatial-temporal relationships in animations—not just what moves, but WHY and HOW each motion connects to the next.

## CONTEXT FROM PASS 1 (Scene Decomposition)
${decomposition.slice(0, 5000)}

## TASK
Re-watch the video and for each scene/element above, extract PRECISE motion specifications.
Focus on:
1. Exact timing curves and easing (cubic-bezier values, not names)
2. Precise pixel/degree/opacity values
3. Transform origins
4. Stagger patterns and overlap timing
5. Cause-and-effect relationships between element animations

## OUTPUT FORMAT
For each scene, provide motion specs in this exact structure:

### Scene: [name] ([startTime]s – [endTime]s)

**Causal Chain:** [describe the temporal dependency chain]

**[Element Name]** (\`[cssSelector]\`)
\`\`\`
Property: transform (translateY)
From: 20px
To: 0px
Duration: 400ms
Delay: 0ms (relative to scene start)
Easing: cubic-bezier(0.16, 1, 0.3, 1)
Transform-origin: center center
\`\`\`

\`\`\`
Property: opacity
From: 0
To: 1
Duration: 350ms
Delay: 0ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
\`\`\`

**Stagger Pattern** (if applicable):
- Base delay: 80ms between children
- Direction: top-to-bottom
- First child delay: 0ms from scene start

**Spatial Relationships:**
- [element A] begins when [element B] reaches 80% of translateY
- Container expands 60ms before children start entering

## RULES
- Use EXACT values: px, deg, ms, cubic-bezier() — never vague terms like "smooth" or "fast"
- If a value is estimated, label it with (est.)
- Colors must be hex or rgba
- Note spring/bounce physics with overshoot percentages if applicable
- Video duration: ${duration}s | Resolution: ${resolution}
- Describe micro-interactions: hover glows, subtle shadows, breathing effects
- Every property change is a separate spec block`;
}

/**
 * Pass 3: Code Generation
 * Generates final implementation using existing format template.
 * Receives Pass 1 + Pass 2 as context.
 */
export function buildPass3Prompt(
  decomposition: string,
  deepAnalysis: string,
  format: OutputFormat,
  formatTemplate: string
): string {
  return `You are an expert animation code generation agent. You have access to a detailed motion analysis from two previous passes. Your job is to generate the final implementation code.

## CONTEXT FROM PREVIOUS ANALYSIS

### Pass 1 — Scene Decomposition:
${decomposition.slice(0, 4000)}

### Pass 2 — Deep Motion Analysis:
${deepAnalysis.slice(0, 6000)}

## TASK
Using the EXACT values from the analysis above, generate the final implementation.
Do NOT re-estimate values. Use the precise cubic-bezier curves, pixel values, durations, and delays from Pass 2.

Follow the output format specification below:

${formatTemplate}

## RULES
- Use the EXACT values from the deep analysis (do not re-estimate or round)
- Include ALL elements from ALL scenes
- Maintain the temporal relationships: staggers, overlaps, causal sequences
- Match the easing curves precisely (cubic-bezier values, not named easings)
- The output must be complete and self-contained
- If the format calls for code, it must be runnable as-is`;
}

/**
 * Pass 4: Self-Verification
 * Re-watches video and compares against generated implementation.
 * Outputs discrepancies, score, and corrections.
 */
export function buildPass4Prompt(
  generatedCode: string,
  decomposition: string
): string {
  return `You are a QA verification agent. Your task is to ensure animation implementation fidelity by re-watching the original video and comparing it against the generated implementation.

## GENERATED IMPLEMENTATION (from Pass 3)
\`\`\`
${generatedCode.slice(0, 6000)}
\`\`\`

## ORIGINAL SCENE DECOMPOSITION (from Pass 1)
${decomposition.slice(0, 3000)}

## TASK
Re-watch the video frame by frame and compare against the generated implementation.

Check for:
1. **Missing animations** — elements that animate in the video but aren't in the code
2. **Timing mismatches** — durations, delays, or staggers that don't match the video
3. **Wrong easing** — different curve feel (spring vs ease, overshoot present/absent)
4. **Incorrect values** — wrong pixel offsets, opacity values, colors, sizes
5. **Missing micro-interactions** — subtle hover effects, shadows, blur transitions
6. **Spatial errors** — wrong direction, wrong transform-origin, wrong axis

## OUTPUT FORMAT (strict JSON — output ONLY this JSON block, nothing else)
\`\`\`json
{
  "overallScore": 85,
  "discrepancies": [
    {
      "element": "cta_button",
      "issue": "Scale animation missing: button has subtle 1.02x scale on hover in video",
      "severity": "minor",
      "suggestedFix": "Add transform: scale(1.02) with 200ms ease-out on hover state"
    }
  ],
  "corrections": [
    "Change headline translateY from 20px to 24px — video shows slightly larger offset",
    "Add box-shadow transition: 0 4px 12px rgba(0,0,0,0.1) → 0 8px 24px rgba(0,0,0,0.15) over 300ms"
  ],
  "summary": "Implementation captures the main animation flow accurately. 2 micro-interactions missing, 1 timing adjustment needed. Overall feel matches the video."
}
\`\`\`

## SCORING GUIDE
- 90-100: Near perfect match, only cosmetic differences
- 75-89: Good match, minor timing/value adjustments needed
- 50-74: Decent match, some animations missing or significantly off
- Below 50: Major discrepancies, core animations missing

## RULES
- Be critical but constructive
- Severity: minor (polish detail), major (visible difference), critical (broken/missing core animation)
- Provide actionable fixes with exact values
- Output ONLY the JSON block, no explanatory text`;
}
