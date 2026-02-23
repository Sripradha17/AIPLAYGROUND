import type { AIGenerateResponse, PromptEvaluation } from '@/app/types/ai'

/**
 * Validate AI response structure
 */
export function validateResponse(response: AIGenerateResponse): boolean {
  if (!response.success) {
    return false
  }

  if (!response.output || response.output.length === 0) {
    return false
  }

  if (!response.tokensUsed || response.tokensUsed.total === 0) {
    return false
  }

  return true
}

/**
 * Evaluate prompt quality
 */
export function evaluatePrompt(prompt: string): PromptEvaluation {
  const suggestions: string[] = []
  
  // Clarity: Check for clear instructions
  const clarity = calculateClarity(prompt)
  if (clarity < 70) {
    suggestions.push('Make your instructions more explicit and clear')
  }

  // Specificity: Check for specific details
  const specificity = calculateSpecificity(prompt)
  if (specificity < 70) {
    suggestions.push('Add more specific details about what you want')
  }

  // Structure: Check for organized structure
  const structure = calculateStructure(prompt)
  if (structure < 70) {
    suggestions.push('Organize your prompt with clear sections (context, task, constraints)')
  }

  // Examples
  const hasExamples = checkForExamples(prompt)
  if (!hasExamples) {
    suggestions.push('Include examples to guide the AI')
  }

  // Constraints
  const hasConstraints = checkForConstraints(prompt)
  if (!hasConstraints) {
    suggestions.push('Define constraints or requirements for the output')
  }

  const overallScore = Math.round(
    (clarity + specificity + structure + 
    (hasExamples ? 100 : 0) + (hasConstraints ? 100 : 0)) / 5
  )

  return {
    clarity,
    specificity,
    structure,
    hasExamples,
    hasConstraints,
    overallScore,
    suggestions,
  }
}

function calculateClarity(prompt: string): number {
  let score = 50

  // Check for question words
  const hasQuestionWords = /what|how|why|when|where|which|who/i.test(prompt)
  if (hasQuestionWords) score += 15

  // Check for action verbs
  const hasActionVerbs = /create|generate|write|explain|analyze|summarize|list/i.test(prompt)
  if (hasActionVerbs) score += 15

  // Check for complete sentences
  const hasPunctuation = /[.!?]/.test(prompt)
  if (hasPunctuation) score += 10

  // Penalize very short prompts
  if (prompt.length < 20) score -= 20

  return Math.max(0, Math.min(100, score))
}

function calculateSpecificity(prompt: string): number {
  let score = 40

  // Check for numbers/quantities
  if (/\d+/.test(prompt)) score += 15

  // Check for specific formatting requests
  if (/format|json|markdown|bullet|list|table/i.test(prompt)) score += 20

  // Check for domain-specific terms
  if (prompt.split(' ').length > 10) score += 15

  // Check for specificity keywords
  if (/specific|particular|exact|precise|detailed/i.test(prompt)) score += 10

  return Math.max(0, Math.min(100, score))
}

function calculateStructure(prompt: string): number {
  let score = 50

  // Check for sections
  const hasSections = /context:|task:|example:|constraint:|format:/i.test(prompt)
  if (hasSections) score += 30

  // Check for line breaks
  const lineBreaks = (prompt.match(/\n/g) || []).length
  if (lineBreaks >= 2) score += 10

  // Check for bullet points or numbering
  const hasBullets = /[•\-*]|\d+\./g.test(prompt)
  if (hasBullets) score += 10

  return Math.max(0, Math.min(100, score))
}

function checkForExamples(prompt: string): boolean {
  return /example|for instance|such as|like this|e\.g\./i.test(prompt)
}

function checkForConstraints(prompt: string): boolean {
  return /must|should|require|limit|maximum|minimum|constraint|don't|avoid/i.test(prompt)
}
