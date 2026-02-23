import { NextRequest, NextResponse } from 'next/server'
import { getChallengeById } from '@/app/lib/challenges/data'
import { validateChallengeAttempt } from '@/app/lib/challenges/validator'
import type { ChallengeAttempt } from '@/app/types/challenges'

/**
 * POST /api/challenges
 * Validate a challenge attempt
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { challengeId, userPrompt } = body

    if (!challengeId || !userPrompt) {
      return NextResponse.json(
        { error: 'Missing challengeId or userPrompt' },
        { status: 400 }
      )
    }

    const challenge = getChallengeById(challengeId)
    if (!challenge) {
      return NextResponse.json(
        { error: 'Challenge not found' },
        { status: 404 }
      )
    }

    const validation = validateChallengeAttempt(challenge, userPrompt)

    const attempt: ChallengeAttempt = {
      challengeId,
      userPrompt,
      output: '', // Could generate AI output here if needed
      passed: validation.passed,
      score: validation.score,
      feedback: validation.feedback,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(attempt, { status: 200 })

  } catch (error: any) {
    console.error('Challenge validation error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/challenges
 * Health check
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/challenges',
    methods: ['POST'],
    timestamp: new Date().toISOString(),
  })
}
