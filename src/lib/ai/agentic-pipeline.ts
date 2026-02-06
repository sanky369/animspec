import { GoogleGenAI } from '@google/genai';
import type { OutputFormat, VideoMetadata, TriggerContext } from '@/types/analysis';
import type { GeminiQualityLevel, AnalysisImage } from './gemini';
import { buildPass1Prompt, buildPass2Prompt, buildPass3Prompt, buildPass4Prompt } from './agentic-prompts';
import { getFormatTemplate } from './prompts';

export interface PipelineEvent {
  type: 'pass_start' | 'pass_complete' | 'thinking' | 'chunk' | 'error';
  pass: number;
  passName: string;
  totalPasses: number;
  data?: string;
}

export interface AgenticPipelineOptions {
  videoBase64?: string;
  mimeType?: string;
  fileUri?: string;
  fileMimeType?: string;
  format: OutputFormat;
  quality: GeminiQualityLevel;
  triggerContext: TriggerContext;
  videoMetadata?: VideoMetadata | null;
  analysisImages?: AnalysisImage[];
}

const PASS_NAMES = [
  'Scene Decomposition',
  'Deep Motion Analysis',
  'Code Generation',
  'Self-Verification',
];

const TOTAL_PASSES = 4;

/**
 * Select model per pass: flash for structural tasks (1 & 4), pro for deep analysis (2 & 3).
 * When quality is 'balanced', all passes use flash.
 */
function getModelForPass(pass: number, quality: GeminiQualityLevel): string {
  if (quality === 'balanced') return 'gemini-3-flash-preview';
  // 'precise': pro for deep passes, flash for structural
  return (pass === 2 || pass === 3) ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
}

function getConfigForPass(pass: number): object {
  const isDeepPass = pass === 2 || pass === 3;
  return {
    maxOutputTokens: isDeepPass ? 16384 : 8192,
    temperature: isDeepPass ? 0.1 : 0.2,
    thinkingConfig: {
      thinkingLevel: 'high',
    },
  };
}

type VideoPart =
  | { inlineData: { mimeType: string; data: string } }
  | { fileData: { mimeType: string; fileUri: string } };

/**
 * Main agentic pipeline orchestrator.
 * Runs 4 sequential passes, each a separate Gemini API call.
 * The video is re-sent with each call (via base64 or fileUri).
 */
export async function* runAgenticPipeline(
  options: AgenticPipelineOptions
): AsyncGenerator<PipelineEvent, void, unknown> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not set');

  const client = new GoogleGenAI({ apiKey });

  // Build video part (inline or fileUri)
  const videoPart: VideoPart = options.fileUri
    ? { fileData: { mimeType: options.fileMimeType!, fileUri: options.fileUri } }
    : { inlineData: { mimeType: options.mimeType!, data: options.videoBase64! } };

  // We need to override the model per pass. We'll do this by modifying the
  // generateContentStream call. Since runSinglePass uses a hardcoded model,
  // we'll refactor to pass model through config.
  // Actually, let's create the stream call inline for each pass.

  let pass1Result = '';
  let pass2Result = '';
  let pass3Result = '';

  // === PASS 1: Scene Decomposition ===
  yield {
    type: 'pass_start',
    pass: 1,
    passName: PASS_NAMES[0],
    totalPasses: TOTAL_PASSES,
  };

  const pass1Prompt = buildPass1Prompt(options.videoMetadata);
  pass1Result = yield* runPassWithModel(
    client, videoPart, pass1Prompt, 1, options.quality, options.analysisImages
  );

  yield {
    type: 'pass_complete',
    pass: 1,
    passName: PASS_NAMES[0],
    totalPasses: TOTAL_PASSES,
    data: pass1Result,
  };

  // === PASS 2: Deep Motion Analysis ===
  yield {
    type: 'pass_start',
    pass: 2,
    passName: PASS_NAMES[1],
    totalPasses: TOTAL_PASSES,
  };

  const pass2Prompt = buildPass2Prompt(pass1Result, options.videoMetadata);
  pass2Result = yield* runPassWithModel(
    client, videoPart, pass2Prompt, 2, options.quality, options.analysisImages
  );

  yield {
    type: 'pass_complete',
    pass: 2,
    passName: PASS_NAMES[1],
    totalPasses: TOTAL_PASSES,
    data: pass2Result,
  };

  // === PASS 3: Code Generation ===
  yield {
    type: 'pass_start',
    pass: 3,
    passName: PASS_NAMES[2],
    totalPasses: TOTAL_PASSES,
  };

  const formatTemplate = getFormatTemplate(options.format);
  const pass3Prompt = buildPass3Prompt(pass1Result, pass2Result, options.format, formatTemplate);
  pass3Result = yield* runPassWithModel(
    client, videoPart, pass3Prompt, 3, options.quality, options.analysisImages
  );

  yield {
    type: 'pass_complete',
    pass: 3,
    passName: PASS_NAMES[2],
    totalPasses: TOTAL_PASSES,
    data: pass3Result,
  };

  // === PASS 4: Self-Verification ===
  yield {
    type: 'pass_start',
    pass: 4,
    passName: PASS_NAMES[3],
    totalPasses: TOTAL_PASSES,
  };

  const pass4Prompt = buildPass4Prompt(pass3Result, pass1Result);
  yield* runPassWithModel(
    client, videoPart, pass4Prompt, 4, options.quality, options.analysisImages
  );

  yield {
    type: 'pass_complete',
    pass: 4,
    passName: PASS_NAMES[3],
    totalPasses: TOTAL_PASSES,
  };
}

/**
 * Run a single pass with the correct model for that pass.
 */
async function* runPassWithModel(
  client: InstanceType<typeof GoogleGenAI>,
  videoPart: VideoPart,
  prompt: string,
  passNumber: number,
  quality: GeminiQualityLevel,
  analysisImages?: AnalysisImage[]
): AsyncGenerator<PipelineEvent, string, unknown> {
  const model = getModelForPass(passNumber, quality);
  const passName = PASS_NAMES[passNumber - 1];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parts: any[] = [videoPart];

  if (analysisImages) {
    for (const img of analysisImages) {
      parts.push({ inlineData: { mimeType: img.mimeType, data: img.base64 } });
    }
  }

  parts.push({ text: prompt });

  const response = await client.models.generateContentStream({
    model,
    contents: [{ role: 'user', parts }],
    config: getConfigForPass(passNumber),
  });

  let fullResult = '';

  for await (const chunk of response) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const candidate = (chunk as any).candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.thought && part.text) {
          yield {
            type: 'thinking',
            pass: passNumber,
            passName,
            totalPasses: TOTAL_PASSES,
            data: part.text,
          };
        } else if (part.text && !part.thought) {
          fullResult += part.text;
          yield {
            type: 'chunk',
            pass: passNumber,
            passName,
            totalPasses: TOTAL_PASSES,
            data: part.text,
          };
        }
      }
    } else {
      const text = chunk.text;
      if (text) {
        fullResult += text;
        yield {
          type: 'chunk',
          pass: passNumber,
          passName,
          totalPasses: TOTAL_PASSES,
          data: text,
        };
      }
    }
  }

  return fullResult;
}
