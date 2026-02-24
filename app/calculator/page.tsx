'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import CostCalculator from '@/app/components/CostCalculator'
import { fadeInUp } from '@/app/components/animations/variants'

export default function CalculatorPage() {
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
            <Link href="/calculator" className="text-forge-orange font-semibold">
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
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold mb-2">AI Cost Calculator 💰</h2>
          <p className="text-gray-400">
            Estimate your AI API costs across different models and usage patterns
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CostCalculator />
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          className="mt-8 p-6 bg-dark-card border border-gray-700 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4">Understanding Token Pricing</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
            <div>
              <h4 className="font-semibold text-forge-orange mb-2">What are tokens?</h4>
              <p className="mb-3">
                Tokens are pieces of words or characters. On average:
              </p>
              <ul className="space-y-1 ml-4">
                <li>• 1 token ≈ 0.75 words (English)</li>
                <li>• 1 token ≈ 4 characters</li>
                <li>• 100 tokens ≈ 75 words</li>
                <li>• 1,000 tokens ≈ 750 words (2-3 pages)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-electric-blue mb-2">Cost Factors</h4>
              <ul className="space-y-2">
                <li>
                  <strong>Input tokens:</strong> Your prompt + conversation history
                </li>
                <li>
                  <strong>Output tokens:</strong> The AI's generated response
                </li>
                <li>
                  <strong>Model choice:</strong> More capable models cost more
                </li>
                <li>
                  <strong>Volume:</strong> Bulk pricing may be available
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
