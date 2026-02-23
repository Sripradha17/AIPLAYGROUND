// AI Request & Response Types
export interface AIGenerateRequest {
  prompt: string
  systemInstructions?: string
  temperature?: number
  maxTokens?: number
  model?: string
  stream?: boolean
  metadata?: Record<string, any>
}

export interface AIGenerateResponse {
  success: boolean
  output: string
  reasoning?: string
  tokensUsed: {
    prompt: number
    completion: number
    total: number
  }
  model: string
  finishReason: string
  timestamp: string
  metadata?: Record<string, any>
  error?: string
}

// Streaming Response
export interface AIStreamChunk {
  delta: string
  done: boolean
  tokensUsed?: {
    prompt: number
    completion: number
    total: number
  }
}

// Prompt Evaluation
export interface PromptEvaluation {
  clarity: number // 0-100
  specificity: number // 0-100
  structure: number // 0-100
  hasExamples: boolean
  hasConstraints: boolean
  overallScore: number // 0-100
  suggestions: string[]
}

// Error types
export interface AIError {
  code: string
  message: string
  details?: any
}
