
import { z } from 'zod';

export const sceneDecompositionSchema = z.object({
  scenes: z.array(z.object({
    id: z.string(),
    name: z.string(),
    startTime: z.number(),
    endTime: z.number(),
    elements: z.array(z.string()).default([]),
    description: z.string().default(''),
    causalChain: z.string().default(''),
  })).min(1),
  elementInventory: z.array(z.object({
    name: z.string(),
    type: z.string().default('unknown'),
    cssSelector: z.string().default(''),
    sceneIds: z.array(z.string()).default([]),
  })).default([]),
  totalDuration: z.number().default(0),
  resolution: z.string().default('unknown'),
  animationComplexity: z.enum(['simple', 'moderate', 'complex']).default('moderate'),
});

export type SceneDecomposition = z.infer<typeof sceneDecompositionSchema>;

export const reconstructionVerificationSchema = z.object({
  overallScore: z.number().min(0).max(100),
  discrepancies: z.array(z.object({
    element: z.string(),
    issue: z.string(),
    severity: z.enum(['minor', 'major', 'critical']),
    suggestedFix: z.string(),
  })).default([]),
  corrections: z.array(z.string()).default([]),
  summary: z.string().default(''),
});

export type ReconstructionVerification = z.infer<typeof reconstructionVerificationSchema>;

export const sceneDecompositionJsonSchema = {
  type: 'object',
  required: ['scenes', 'totalDuration', 'resolution', 'animationComplexity'],
  properties: {
    scenes: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'name', 'startTime', 'endTime', 'elements', 'description', 'causalChain'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          startTime: { type: 'number' },
          endTime: { type: 'number' },
          elements: { type: 'array', items: { type: 'string' } },
          description: { type: 'string' },
          causalChain: { type: 'string' },
        },
      },
    },
    elementInventory: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          type: { type: 'string' },
          cssSelector: { type: 'string' },
          sceneIds: { type: 'array', items: { type: 'string' } },
        },
      },
    },
    totalDuration: { type: 'number' },
    resolution: { type: 'string' },
    animationComplexity: { type: 'string', enum: ['simple', 'moderate', 'complex'] },
  },
} as const;

export const reconstructionVerificationJsonSchema = {
  type: 'object',
  required: ['overallScore', 'discrepancies', 'corrections', 'summary'],
  properties: {
    overallScore: { type: 'number' },
    discrepancies: {
      type: 'array',
      items: {
        type: 'object',
        required: ['element', 'issue', 'severity', 'suggestedFix'],
        properties: {
          element: { type: 'string' },
          issue: { type: 'string' },
          severity: { type: 'string', enum: ['minor', 'major', 'critical'] },
          suggestedFix: { type: 'string' },
        },
      },
    },
    corrections: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string' },
  },
} as const;
