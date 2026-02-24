'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Card from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import TextArea from '@/app/components/ui/TextArea'
import Badge from '@/app/components/ui/Badge'
import { fadeInUp, staggerContainer, staggerItem } from '@/app/components/animations/variants'
import { challenges } from '@/app/lib/challenges/data'
import type { Challenge, ChallengeAttempt, ChallengeDifficulty } from '@/app/types/challenges'

export default function ChallengesPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [userPrompt, setUserPrompt] = useState('')
  const [currentAttempt, setCurrentAttempt] = useState<ChallengeAttempt | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [filterDifficulty, setFilterDifficulty] = useState<ChallengeDifficulty | 'all'>('all')
  const [showHints, setShowHints] = useState(false)
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set())

  const filteredChallenges = filterDifficulty === 'all' 
    ? challenges 
    : challenges.filter(c => c.difficulty === filterDifficulty)

  const handleSelectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge)
    setUserPrompt(challenge.brokenPrompt || '')
    setCurrentAttempt(null)
    setShowHints(false)
  }

  const handleSubmitAttempt = async () => {
    if (!selectedChallenge || !userPrompt.trim()) return

    setIsValidating(true)
    try {
      const res = await fetch('/api/challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId: selectedChallenge.id,
          userPrompt,
        }),
      })

      const attempt: ChallengeAttempt = await res.json()
      setCurrentAttempt(attempt)

      if (attempt.passed) {
        setCompletedChallenges(prev => new Set([...prev, selectedChallenge.id]))
      }
    } catch (error) {
      console.error('Validation error:', error)
    } finally {
      setIsValidating(false)
    }
  }

  const getDifficultyColor = (difficulty: ChallengeDifficulty) => {
    switch (difficulty) {
      case 'beginner': return 'success'
      case 'intermediate': return 'warning'
      case 'advanced': return 'error'
    }
  }

  const totalPoints = challenges.reduce((sum, c) => sum + c.points, 0)
  const earnedPoints = Array.from(completedChallenges).reduce((sum, id) => {
    const challenge = challenges.find(c => c.id === id)
    return sum + (challenge?.points || 0)
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg">
      {/* Header */}
      <header className="border-b border-gray-700 bg-dark-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <motion.h1
              className="text-2xl font-bold gradient-text cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              PromptForge 🔥
            </motion.h1>
          </Link>
          <nav className="flex gap-6">
            <Link href="/playground" className="text-gray-400 hover:text-white transition-colors">
              Playground
            </Link>
            <Link href="/coach" className="text-gray-400 hover:text-white transition-colors">
              Prompt Coach
            </Link>
            <Link href="/challenges" className="text-forge-orange font-semibold">
              Challenges
            </Link>
            <Link href="/learn" className="text-gray-400 hover:text-white transition-colors">
              Learn
            </Link>
            <Link href="/templates" className="text-gray-400 hover:text-white transition-colors">
              Templates
            </Link>
            <Link href="/calculator" className="text-gray-400 hover:text-white transition-colors">
              Calculator
            </Link>
            <Link href="/tools" className="text-gray-400 hover:text-white transition-colors">
              Tools
            </Link>
            <Link href="/library" className="text-gray-400 hover:text-white transition-colors">
              Library
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold mb-2">Challenge Mode 🏆</h2>
          <p className="text-gray-400 mb-4">
            Test your prompt engineering skills with gamified challenges
          </p>
          
          {/* Stats */}
          <div className="flex gap-4">
            <Badge variant="info" size="md">
              Progress: {completedChallenges.size}/{challenges.length}
            </Badge>
            <Badge variant="success" size="md">
              Points: {earnedPoints}/{totalPoints}
            </Badge>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Challenge List */}
          <div className="lg:col-span-1">
            <Card variant="glass" padding="md">
              <div className="flex gap-2 mb-4 flex-wrap">
                <Button
                  size="sm"
                  variant={filterDifficulty === 'all' ? 'primary' : 'ghost'}
                  onClick={() => setFilterDifficulty('all')}
                >
                  All
                </Button>
                <Button
                  size="sm"
                  variant={filterDifficulty === 'beginner' ? 'primary' : 'ghost'}
                  onClick={() => setFilterDifficulty('beginner')}
                >
                  Beginner
                </Button>
                <Button
                  size="sm"
                  variant={filterDifficulty === 'intermediate' ? 'primary' : 'ghost'}
                  onClick={() => setFilterDifficulty('intermediate')}
                >
                  Intermediate
                </Button>
                <Button
                  size="sm"
                  variant={filterDifficulty === 'advanced' ? 'primary' : 'ghost'}
                  onClick={() => setFilterDifficulty('advanced')}
                >
                  Advanced
                </Button>
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {filteredChallenges.map((challenge) => (
                  <motion.div
                    key={challenge.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleSelectChallenge(challenge)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedChallenge?.id === challenge.id
                        ? 'border-forge-orange bg-forge-orange/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm">{challenge.title}</h3>
                      {completedChallenges.has(challenge.id) && (
                        <span className="text-green-400">✓</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={getDifficultyColor(challenge.difficulty)} size="sm">
                        {challenge.difficulty}
                      </Badge>
                      <Badge variant="default" size="sm">
                        {challenge.points}pts
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right: Challenge Detail */}
          <div className="lg:col-span-2">
            {selectedChallenge ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-6"
              >
                <Card variant="gradient" padding="lg">
                  <motion.div variants={staggerItem}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{selectedChallenge.title}</h3>
                        <div className="flex gap-2">
                          <Badge variant={getDifficultyColor(selectedChallenge.difficulty)}>
                            {selectedChallenge.difficulty}
                          </Badge>
                          <Badge variant="info">{selectedChallenge.type}</Badge>
                          <Badge variant="default">{selectedChallenge.points} points</Badge>
                        </div>
                      </div>
                      {completedChallenges.has(selectedChallenge.id) && (
                        <div className="text-4xl">✓</div>
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={staggerItem} className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-forge-orange mb-2">Description</h4>
                      <p className="text-gray-300">{selectedChallenge.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-forge-orange mb-2">Scenario</h4>
                      <p className="text-gray-300">{selectedChallenge.scenario}</p>
                    </div>

                    {selectedChallenge.brokenPrompt && (
                      <div>
                        <h4 className="font-semibold text-forge-orange mb-2">Broken Prompt</h4>
                        <div className="p-3 bg-dark-bg rounded-lg border border-red-700">
                          <code className="text-red-400">{selectedChallenge.brokenPrompt}</code>
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-forge-orange mb-2">Target Output</h4>
                      <p className="text-gray-300">{selectedChallenge.targetOutput}</p>
                    </div>

                    <div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowHints(!showHints)}
                      >
                        {showHints ? 'Hide' : 'Show'} Hints ({selectedChallenge.hints.length})
                      </Button>
                      
                      <AnimatePresence>
                        {showHints && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 space-y-2"
                          >
                            {selectedChallenge.hints.map((hint, idx) => (
                              <div key={idx} className="p-2 bg-dark-bg rounded border border-gray-700">
                                <span className="text-yellow-400">💡</span> {hint}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </Card>

                <Card variant="glass" padding="md">
                  <h4 className="font-semibold mb-3">Your Solution</h4>
                  <TextArea
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder="Fix or improve the prompt here..."
                    rows={8}
                  />
                  <div className="mt-4">
                    <Button
                      onClick={handleSubmitAttempt}
                      isLoading={isValidating}
                      disabled={!userPrompt.trim()}
                      fullWidth
                    >
                      Submit Solution
                    </Button>
                  </div>
                </Card>

                {currentAttempt && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card
                      variant="glass"
                      padding="md"
                      className={currentAttempt.passed ? 'border-green-500' : 'border-yellow-500'}
                    >
                      <h4 className="font-semibold mb-3 text-lg">
                        {currentAttempt.passed ? '🎉 Success!' : '📊 Results'}
                      </h4>
                      <div className="space-y-2">
                        {currentAttempt.feedback.map((item, idx) => (
                          <div
                            key={idx}
                            className={`p-2 rounded ${
                              item.startsWith('✓')
                                ? 'bg-green-900/20 text-green-300'
                                : item.startsWith('✗')
                                ? 'bg-red-900/20 text-red-300'
                                : 'bg-blue-900/20 text-blue-300'
                            }`}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                      {currentAttempt.passed && (
                        <div className="mt-4">
                          <Badge variant="success" size="md">
                            +{selectedChallenge.points} points earned!
                          </Badge>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <Card variant="glass" padding="lg" className="text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold mb-2">Select a Challenge</h3>
                <p className="text-gray-400">
                  Choose a challenge from the list to get started
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
