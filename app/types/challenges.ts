// Challenge Types

export type ChallengeDifficulty = 'beginner' | 'intermediate' | 'advanced'

export type ChallengeType = 
  | 'fix-prompt'
  | 'reduce-hallucination'
  | 'enforce-json'
  | 'add-constraints'
  | 'extract-data'
  | 'improve-clarity'

export interface Challenge {
  id: string
  title: string
  difficulty: ChallengeDifficulty
  type: ChallengeType
  description: string
  scenario: string
  brokenPrompt?: string
  targetOutput: string
  hints: string[]
  successCriteria: string[]
  points: number
}

export interface ChallengeAttempt {
  challengeId: string
  userPrompt: string
  output: string
  passed: boolean
  score: number
  feedback: string[]
  timestamp: string
}

export interface ChallengeProgress {
  totalChallenges: number
  completedChallenges: number
  totalPoints: number
  earnedPoints: number
  attempts: ChallengeAttempt[]
}
