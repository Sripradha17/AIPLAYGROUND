import type { Challenge, ChallengeAttempt } from '@/app/types/challenges'

/**
 * Validate if a user's prompt meets the challenge criteria
 */
export function validateChallengeAttempt(
  challenge: Challenge,
  userPrompt: string
): { passed: boolean; score: number; feedback: string[] } {
  const feedback: string[] = []
  let passedCriteria = 0
  const totalCriteria = challenge.successCriteria.length

  // Check each success criterion
  challenge.successCriteria.forEach((criterion, index) => {
    const passed = checkCriterion(criterion, userPrompt, challenge)
    if (passed) {
      passedCriteria++
      feedback.push(`✓ ${criterion}`)
    } else {
      feedback.push(`✗ ${criterion}`)
    }
  })

  // Calculate score (0-100)
  const score = Math.round((passedCriteria / totalCriteria) * 100)
  const passed = score >= 70 // Need 70% to pass

  if (passed) {
    feedback.unshift('🎉 Challenge completed!')
  } else {
    feedback.unshift(`⚠️ Score: ${score}%. Keep trying! (Need 70% to pass)`)
  }

  return { passed, score, feedback }
}

/**
 * Check if a specific criterion is met
 */
function checkCriterion(criterion: string, prompt: string, challenge: Challenge): boolean {
  const lowerPrompt = prompt.toLowerCase()
  const lowerCriterion = criterion.toLowerCase()

  // Type-specific checks
  if (challenge.type === 'enforce-json') {
    if (lowerCriterion.includes('json format')) {
      return /json|JSON/.test(prompt)
    }
    if (lowerCriterion.includes('schema') || lowerCriterion.includes('field')) {
      return /schema|structure|fields?|properties/.test(prompt)
    }
    if (lowerCriterion.includes('data type')) {
      return /string|number|boolean|array|object|type/.test(prompt)
    }
  }

  if (challenge.type === 'reduce-hallucination') {
    if (lowerCriterion.includes('uncertain')) {
      return /uncertain|unsure|"don't know"|don't make up|admit/.test(lowerPrompt)
    }
    if (lowerCriterion.includes('source') || lowerCriterion.includes('cite')) {
      return /source|citation|cite|reference|verify/.test(lowerPrompt)
    }
    if (lowerCriterion.includes('accuracy')) {
      return /accurate|verified|factual|correct/.test(lowerPrompt)
    }
  }

  if (challenge.type === 'add-constraints') {
    if (lowerCriterion.includes('length')) {
      return /word|sentence|paragraph|character|line|brief|concise|\d+/.test(lowerPrompt)
    }
    if (lowerCriterion.includes('format')) {
      return /format|bullet|list|paragraph|section/.test(lowerPrompt)
    }
    if (lowerCriterion.includes('audience')) {
      return /beginner|expert|child|student|audience|level/.test(lowerPrompt)
    }
  }

  if (challenge.type === 'improve-clarity' || challenge.type === 'fix-prompt') {
    if (lowerCriterion.includes('specific')) {
      return prompt.length > (challenge.brokenPrompt?.length || 0) + 10
    }
    if (lowerCriterion.includes('context')) {
      return /for|because|in order to|context|scenario/.test(lowerPrompt)
    }
    if (lowerCriterion.includes('example')) {
      return /example|instance|such as|for example|e\.g\./.test(lowerPrompt)
    }
    if (lowerCriterion.includes('step')) {
      return /step|1\.|2\.|first|second|then|next/.test(lowerPrompt)
    }
  }

  if (challenge.type === 'extract-data') {
    if (lowerCriterion.includes('extract')) {
      return /extract|pull|get|find/.test(lowerPrompt)
    }
    if (lowerCriterion.includes('fields')) {
      return /name|date|email|phone|address|field/.test(lowerPrompt)
    }
    if (lowerCriterion.includes('example')) {
      return /example|like|such as/.test(lowerPrompt)
    }
  }

  // Generic checks
  if (lowerCriterion.includes('output')) {
    return /output|result|response|answer/.test(lowerPrompt)
  }

  // Default: check if criterion keywords appear in prompt
  const criterionWords = lowerCriterion.split(' ').filter(w => w.length > 3)
  return criterionWords.some(word => lowerPrompt.includes(word))
}

/**
 * Calculate total points earned
 */
export function calculateTotalPoints(attempts: ChallengeAttempt[]): number {
  const completedChallenges = new Set<string>()
  let totalPoints = 0

  // Only count points once per challenge (best attempt)
  attempts.forEach(attempt => {
    if (attempt.passed && !completedChallenges.has(attempt.challengeId)) {
      completedChallenges.add(attempt.challengeId)
      // Find the challenge to get its points
      const challenge = require('./data').getChallengeById(attempt.challengeId)
      if (challenge) {
        totalPoints += challenge.points
      }
    }
  })

  return totalPoints
}
