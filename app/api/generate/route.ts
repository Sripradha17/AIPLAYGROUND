import { NextRequest, NextResponse } from 'next/server'
import { aiGenerateRequestSchema } from '@/app/lib/utils/validation'
import { callAIModelWithRetry, streamAIModel } from '@/app/lib/ai/client'
import type { AIGenerateResponse } from '@/app/types/ai'

/**
 * POST /api/generate
 * Main endpoint for AI generation
 * 
 * Accepts:
 * - prompt: string (required)
 * - systemInstructions: string (optional)
 * - temperature: number (0-2, default 0.7)
 * - maxTokens: number (1-4000, default 2000)
 * - model: string (optional)
 * - stream: boolean (default false)
 * 
 * Returns:
 * - AIGenerateResponse (JSON) or StreamingResponse
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validated = aiGenerateRequestSchema.parse(body)

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: 'API key not configured',
          output: '',
          tokensUsed: { prompt: 0, completion: 0, total: 0 },
          model: '',
          finishReason: 'error',
          timestamp: new Date().toISOString(),
        } as AIGenerateResponse,
        { status: 500 }
      )
    }

    // Handle streaming response
    if (validated.stream) {
      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of streamAIModel(validated)) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ delta: chunk, done: false })}\n\n`)
              )
            }
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ delta: '', done: true })}\n\n`)
            )
            controller.close()
          } catch (error: any) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ error: error.message, done: true })}\n\n`)
            )
            controller.close()
          }
        },
      })

      return new NextResponse(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    }

    // Handle regular (non-streaming) response
    const response = await callAIModelWithRetry(validated, 3)

    return NextResponse.json(response, {
      status: response.success ? 200 : 500,
    })

  } catch (error: any) {
    console.error('API Error:', error)

    // Validation errors
    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request parameters',
          details: error.errors,
          output: '',
          tokensUsed: { prompt: 0, completion: 0, total: 0 },
          model: '',
          finishReason: 'error',
          timestamp: new Date().toISOString(),
        } as AIGenerateResponse,
        { status: 400 }
      )
    }

    // Generic error
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
        output: '',
        tokensUsed: { prompt: 0, completion: 0, total: 0 },
        model: '',
        finishReason: 'error',
        timestamp: new Date().toISOString(),
      } as AIGenerateResponse,
      { status: 500 }
    )
  }
}

/**
 * GET /api/generate
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/generate',
    methods: ['POST'],
    timestamp: new Date().toISOString(),
  })
}
