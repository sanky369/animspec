
import { z } from 'zod';

export const behaviorInventorySchema = z.object({
  states: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    entrySignals: z.array(z.string()).default([]),
    exitSignals: z.array(z.string()).default([]),
  })).min(1),
  transitions: z.array(z.object({
    from: z.string(),
    event: z.string(),
    to: z.string(),
    confidence: z.number().min(0).max(1),
  })).default([]),
  inferredComplexity: z.enum(['simple', 'moderate', 'complex']).default('moderate'),
});

export type BehaviorInventory = z.infer<typeof behaviorInventorySchema>;

export const behaviorValidationSchema = z.object({
  score: z.number().min(0).max(100),
  summary: z.string(),
  findings: z.array(z.object({
    issue: z.string(),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    recommendation: z.string(),
  })).default([]),
  canAutoRevise: z.boolean().default(true),
});

export type BehaviorValidation = z.infer<typeof behaviorValidationSchema>;

export const behaviorInventoryJsonSchema = {
  type: 'object',
  required: ['states', 'transitions', 'inferredComplexity'],
  properties: {
    states: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'name', 'description', 'entrySignals', 'exitSignals'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          entrySignals: { type: 'array', items: { type: 'string' } },
          exitSignals: { type: 'array', items: { type: 'string' } },
        },
      },
    },
    transitions: {
      type: 'array',
      items: {
        type: 'object',
        required: ['from', 'event', 'to', 'confidence'],
        properties: {
          from: { type: 'string' },
          event: { type: 'string' },
          to: { type: 'string' },
          confidence: { type: 'number' },
        },
      },
    },
    inferredComplexity: { type: 'string', enum: ['simple', 'moderate', 'complex'] },
  },
} as const;

export const behaviorValidationJsonSchema = {
  type: 'object',
  required: ['score', 'summary', 'findings', 'canAutoRevise'],
  properties: {
    score: { type: 'number' },
    summary: { type: 'string' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        required: ['issue', 'severity', 'recommendation'],
        properties: {
          issue: { type: 'string' },
          severity: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
          recommendation: { type: 'string' },
        },
      },
    },
    canAutoRevise: { type: 'boolean' },
  },
} as const;
