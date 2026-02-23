import { z } from 'zod'

// Validation schema for AI generate request
export const aiGenerateRequestSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required').max(10000, 'Prompt too long'),
  systemInstructions: z.string().max(5000).optional(),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().min(1).max(4000).default(2000),
  model: z.string().optional(),
  stream: z.boolean().default(false),
  metadata: z.record(z.any()).optional(),
})

// Validation schema for evaluation request
export const evaluateRequestSchema = z.object({
  prompt: z.string().min(1).max(10000),
})

export type AIGenerateRequestInput = z.infer<typeof aiGenerateRequestSchema>
export type EvaluateRequestInput = z.infer<typeof evaluateRequestSchema>
