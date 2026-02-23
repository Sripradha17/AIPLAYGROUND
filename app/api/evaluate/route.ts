import { NextRequest, NextResponse } from 'next/server'
import { evaluateRequestSchema } from '@/app/lib/utils/validation'
import { evaluatePrompt } from '@/app/lib/ai/validators'
import type { PromptEvaluation } from '@/app/types/ai'

/**
 * POST /api/evaluate
 * Evaluate prompt quality and provide suggestions
 * 
 * Accepts:
 * - prompt: string (required)
 * 
 * Returns:
 * - PromptEvaluation with scores and suggestions
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request
    const body = await request.json()
    const validated = evaluateRequestSchema.parse(body)

    // Evaluate the prompt
    const evaluation = evaluatePrompt(validated.prompt)

    return NextResponse.json(evaluation, { status: 200 })

  } catch (error: any) {
    console.error('Evaluation Error:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          error: 'Invalid request parameters',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/evaluate
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/evaluate',
    methods: ['POST'],
    timestamp: new Date().toISOString(),
  })
}
