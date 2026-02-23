'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Card from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import TextArea from '@/app/components/ui/TextArea'
import ProgressBar from '@/app/components/ui/ProgressBar'
import Badge from '@/app/components/ui/Badge'
import { fadeInUp, staggerContainer, staggerItem } from '@/app/components/animations/variants'
import type { PromptEvaluation } from '@/app/types/ai'

export default function CoachPage() {
  const [originalPrompt, setOriginalPrompt] = useState('')
  const [improvedPrompt, setImprovedPrompt] = useState('')
  const [evaluation, setEvaluation] = useState<PromptEvaluation | null>(null)
  const [isEvaluating, setIsEvaluating] = useState(false)

  // Auto-evaluate as user types (debounced)
  useEffect(() => {
    if (!improvedPrompt.trim()) {
      setEvaluation(null)
      return
    }

    const timer = setTimeout(() => {
      evaluatePromptNow(improvedPrompt)
    }, 500)

    return () => clearTimeout(timer)
  }, [improvedPrompt])

  const evaluatePromptNow = async (prompt: string) => {
    if (!prompt.trim()) return

    setIsEvaluating(true)
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      const data: PromptEvaluation = await res.json()
      setEvaluation(data)
    } catch (error) {
      console.error('Evaluation error:', error)
    } finally {
      setIsEvaluating(false)
    }
  }

  const handleLoadExample = () => {
    const example = 'Explain machine learning'
    setOriginalPrompt(example)
    setImprovedPrompt(example)
  }

  const handleApplyImprovement = () => {
    if (evaluation && evaluation.suggestions.length > 0) {
      const improved = `${improvedPrompt}\n\n${evaluation.suggestions[0]}`
      setImprovedPrompt(improved)
    }
  }

  const getScoreVariant = (score: number): 'success' | 'warning' | 'error' => {
    if (score >= 80) return 'success'
    if (score >= 60) return 'warning'
    return 'error'
  }

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
            <Link href="/coach" className="text-forge-orange font-semibold">
              Prompt Coach
            </Link>
            <Link href="/challenges" className="text-gray-400 hover:text-white transition-colors">
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
          <h2 className="text-4xl font-bold mb-2">Prompt Coach 🎯</h2>
          <p className="text-gray-400 mb-4">
            Improve your prompts with real-time feedback and scoring
          </p>
          <Button onClick={handleLoadExample} size="sm" variant="outline">
            Load Example
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Original Prompt */}
          <Card variant="glass" padding="md">
            <h3 className="text-xl font-bold mb-4 text-gray-300">Original Prompt</h3>
            <TextArea
              value={originalPrompt}
              onChange={(e) => setOriginalPrompt(e.target.value)}
              placeholder="Enter your original prompt here..."
              rows={10}
            />
          </Card>

          {/* Improved Prompt */}
          <Card variant="glass" padding="md">
            <h3 className="text-xl font-bold mb-4 text-electric-blue">
              Improved Prompt
            </h3>
            <TextArea
              value={improvedPrompt}
              onChange={(e) => setImprovedPrompt(e.target.value)}
              placeholder="Edit and improve your prompt here..."
              rows={10}
            />
          </Card>
        </div>

        {/* Evaluation Results */}
        {evaluation && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <Card variant="gradient" padding="lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Evaluation Results</h3>
                <Badge variant={getScoreVariant(evaluation.overallScore)} size="md">
                  Overall Score: {evaluation.overallScore}%
                </Badge>
              </div>

              {/* Scores */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <motion.div variants={staggerItem}>
                  <ProgressBar
                    label="Clarity"
                    value={evaluation.clarity}
                    variant={getScoreVariant(evaluation.clarity)}
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <ProgressBar
                    label="Specificity"
                    value={evaluation.specificity}
                    variant={getScoreVariant(evaluation.specificity)}
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <ProgressBar
                    label="Structure"
                    value={evaluation.structure}
                    variant={getScoreVariant(evaluation.structure)}
                  />
                </motion.div>
              </div>

              {/* Boolean Checks */}
              <div className="flex gap-4 mb-6">
                <Badge variant={evaluation.hasExamples ? 'success' : 'warning'}>
                  {evaluation.hasExamples ? '✓' : '✗'} Examples
                </Badge>
                <Badge variant={evaluation.hasConstraints ? 'success' : 'warning'}>
                  {evaluation.hasConstraints ? '✓' : '✗'} Constraints
                </Badge>
              </div>

              {/* Suggestions */}
              {evaluation.suggestions.length > 0 && (
                <motion.div variants={staggerItem}>
                  <h4 className="text-lg font-semibold mb-3 text-forge-orange">
                    💡 Suggestions for Improvement
                  </h4>
                  <div className="space-y-2">
                    {evaluation.suggestions.map((suggestion, idx) => (
                      <motion.div
                        key={idx}
                        variants={staggerItem}
                        className="p-3 bg-dark-bg rounded-lg border border-gray-700"
                      >
                        <p className="text-gray-300">{suggestion}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Empty State */}
        {!evaluation && improvedPrompt.trim() === '' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-gray-500"
          >
            <div className="text-6xl mb-4">🎯</div>
            <p>Start typing in the "Improved Prompt" box to see real-time feedback</p>
          </motion.div>
        )}
      </main>
    </div>
  )
}
