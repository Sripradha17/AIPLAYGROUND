'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Card from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import TokenCounter from '@/app/components/TokenCounter'
import PromptComparison from '@/app/components/PromptComparison'
import BatchTester from '@/app/components/BatchTester'
import PromptVersionControl from '@/app/components/PromptVersionControl'
import ChainBuilder from '@/app/components/ChainBuilder'
import AnalyticsDashboard from '@/app/components/AnalyticsDashboard'
import { fadeInUp } from '@/app/components/animations/variants'

type ToolType = 'token-counter' | 'prompt-comparison' | 'batch-tester' | 'version-control' | 'chain-builder' | 'analytics'

interface Tool {
  id: ToolType
  title: string
  description: string
  icon: string
  badge?: string
}

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState<ToolType>('token-counter')

  const tools: Tool[] = [
    {
      id: 'token-counter',
      title: 'Token Counter',
      description: 'Count tokens, characters, and estimate costs in real-time',
      icon: '🔢',
    },
    {
      id: 'prompt-comparison',
      title: 'Prompt Comparison',
      description: 'A/B test different prompts side-by-side',
      icon: '⚖️',
    },
    {
      id: 'batch-tester',
      title: 'Batch Tester',
      description: 'Test one prompt with multiple inputs at once',
      icon: '📦',
    },
    {
      id: 'version-control',
      title: 'Version Control',
      description: 'Track and compare different versions of your prompts',
      icon: '🕒',
    },
    {
      id: 'chain-builder',
      title: 'Chain Builder',
      description: 'Create multi-step prompt workflows',
      icon: '🔗',
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Track usage, costs, and performance metrics',
      icon: '📊',
    },
  ]

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
            <Link href="/tools" className="text-forge-orange font-semibold">
              Tools
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
          <h2 className="text-4xl font-bold mb-2">Developer Tools 🛠️</h2>
          <p className="text-gray-400">
            Powerful utilities for working with AI prompts and APIs
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Tool Selector */}
          <div className="lg:col-span-1 space-y-3">
            {tools.map((tool) => (
              <motion.div
                key={tool.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  variant={selectedTool === tool.id ? 'default' : 'glass'}
                  padding="md"
                  hover
                  className={`cursor-pointer ${
                    selectedTool === tool.id ? 'border-forge-orange' : ''
                  } ${tool.badge ? 'opacity-60' : ''}`}
                  onClick={() => !tool.badge && setSelectedTool(tool.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-3xl">{tool.icon}</div>
                    {tool.badge && (
                      <span className="text-xs px-2 py-1 bg-yellow-600/20 text-yellow-400 rounded">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold mb-1">{tool.title}</h3>
                  <p className="text-xs text-gray-400">{tool.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Tool Display */}
          <div className="lg:col-span-3">
            <motion.div
              key={selectedTool}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {selectedTool === 'token-counter' && <TokenCounter />}
              
              {selectedTool === 'prompt-comparison' && <PromptComparison />}
              
              {selectedTool === 'batch-tester' && <BatchTester />}
              
              {selectedTool === 'version-control' && <PromptVersionControl />}
              
              {selectedTool === 'chain-builder' && <ChainBuilder />}
              
              {selectedTool === 'analytics' && <AnalyticsDashboard />}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
