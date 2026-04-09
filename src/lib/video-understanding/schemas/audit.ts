
import { z } from 'zod';

export const auditSegmentationSchema = z.object({
  primaryGoal: z.string(),
  strengths: z.array(z.string()).default([]),
  risks: z.array(z.string()).default([]),
  steps: z.array(z.object({
    id: z.string(),
    title: z.string(),
    startTime: z.number(),
    endTime: z.number(),
    userIntent: z.string(),
    frictionSignals: z.array(z.string()).default([]),
  })).min(1),
  inferredComplexity: z.enum(['simple', 'moderate', 'complex']).default('moderate'),
});

export type AuditSegmentation = z.infer<typeof auditSegmentationSchema>;

export const auditValidationSchema = z.object({
  score: z.number().min(0).max(100),
  summary: z.string(),
  findings: z.array(z.object({
    issue: z.string(),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    recommendation: z.string(),
  })).default([]),
  canAutoRevise: z.boolean().default(true),
});

export type AuditValidation = z.infer<typeof auditValidationSchema>;

export const auditSegmentationJsonSchema = {
  type: 'object',
  required: ['primaryGoal', 'strengths', 'risks', 'steps', 'inferredComplexity'],
  properties: {
    primaryGoal: { type: 'string' },
    strengths: { type: 'array', items: { type: 'string' } },
    risks: { type: 'array', items: { type: 'string' } },
    steps: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'title', 'startTime', 'endTime', 'userIntent', 'frictionSignals'],
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          startTime: { type: 'number' },
          endTime: { type: 'number' },
          userIntent: { type: 'string' },
          frictionSignals: { type: 'array', items: { type: 'string' } },
        },
      },
    },
    inferredComplexity: { type: 'string', enum: ['simple', 'moderate', 'complex'] },
  },
} as const;

export const auditValidationJsonSchema = {
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
