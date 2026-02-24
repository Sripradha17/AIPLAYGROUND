'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import PromptInput from '@/app/components/playground/PromptInput'
import OutputDisplay from '@/app/components/playground/OutputDisplay'
import ControlPanel from '@/app/components/playground/ControlPanel'
import type { AIGenerateResponse } from '@/app/types/ai'

export default function PlaygroundPage() {
  const [prompt, setPrompt] = useState('')
  const [systemInstructions, setSystemInstructions] = useState('')
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(2000)
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<AIGenerateResponse | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt')
      return
    }

    setIsLoading(true)
    setResponse(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          systemInstructions: systemInstructions || undefined,
          temperature,
          maxTokens,
          stream: false,
        }),
      })

      const data: AIGenerateResponse = await res.json()
      setResponse(data)
    } catch (error: any) {
      setResponse({
        success: false,
        error: error.message,
        output: '',
        tokensUsed: { prompt: 0, completion: 0, total: 0 },
        model: '',
        finishReason: 'error',
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsLoading(false)
    }
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
            <Link href="/playground" className="text-forge-orange font-semibold">
              Playground
            </Link>
            <Link href="/coach" className="text-gray-400 hover:text-white transition-colors">
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-4xl font-bold mb-2">Live Playground</h2>
          <p className="text-gray-400">Test your prompts in real-time with instant AI responses</p>
        </motion.div>

        {/* Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column: Input + Controls */}
          <div className="lg:col-span-2 space-y-6">
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              systemInstructions={systemInstructions}
              setSystemInstructions={setSystemInstructions}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column: Controls */}
          <div>
            <ControlPanel
              temperature={temperature}
              setTemperature={setTemperature}
              maxTokens={maxTokens}
              setMaxTokens={setMaxTokens}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Output Section */}
        <AnimatePresence mode="wait">
          {response && (
            <OutputDisplay response={response} isLoading={isLoading} />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
