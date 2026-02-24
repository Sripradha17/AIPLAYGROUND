'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ThemeToggle from '@/app/components/ThemeToggle'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Logo/Title */}
          <motion.h1
            className="text-7xl font-bold mb-6 gradient-text"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            PromptForge 🔥
          </motion.h1>

          <motion.p
            className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Master the art of prompt engineering through interactive challenges,
            real-time feedback, and beautiful visualizations
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex gap-6 justify-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/playground">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-forge-orange to-forge-red rounded-lg text-white font-semibold text-lg shadow-lg hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Launch Playground
              </motion.button>
            </Link>
            <Link href="/coach">
              <motion.button
                className="px-8 py-4 bg-dark-card border-2 border-electric-blue rounded-lg text-white font-semibold text-lg hover:bg-electric-blue/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Prompt Coach
              </motion.button>
            </Link>
            <Link href="/challenges">
              <motion.button
                className="px-8 py-4 bg-dark-card border-2 border-gray-600 rounded-lg text-white font-semibold text-lg hover:bg-gray-700/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Challenges
              </motion.button>
            </Link>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <FeatureCard
              icon="⚡"
              title="Live Playground"
              description="Test prompts in real-time with instant AI responses and token tracking"
              delay={0.8}
              link="/playground"
            />
            <FeatureCard
              icon="🎯"
              title="Prompt Coach"
              description="Get real-time scoring and suggestions to improve your prompts"
              delay={1.0}
              link="/coach"
            />
            <FeatureCard
              icon="🏆"
              title="Challenge Mode"
              description="Gamified learning with progressive difficulty and leaderboards"
              link="/challenges"
              delay={1.2}
            />
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <FeatureCard
              icon="📚"
              title="Interactive Diagrams"
              description="14 animated visualizations explaining AI concepts from basics to advanced"
              delay={1.4}
              link="/learn"
            />
            <FeatureCard
              icon="📝"
              title="Prompt Templates"
              description="10+ ready-to-use templates for common tasks with customizable variables"
              delay={1.6}
              link="/templates"
            />
            <FeatureCard
              icon="💰"
              title="Cost Calculator"
              description="Estimate API costs across models and optimize your token usage"
              delay={1.8}
              link="/calculator"
            />
          </div>

          {/* Utility Tools */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon="🛠️"
              title="Developer Tools"
              description="Token counter, prompt comparison, batch testing utilities"
              delay={2.0}
              link="/tools"
            />
            <FeatureCard
              icon="💾"
              title="Prompt Library"
              description="Save, organize, and reuse your best prompts with tags and search"
              delay={2.2}
              link="/library"
            />
            <FeatureCard
              icon="🎭"
              title="AI Personas"
              description="11 pre-built personas from Expert Coder to Creative Writer"
              delay={2.4}
              link="/playground"
            />
          </div>
        </motion.div>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-forge-orange/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-electric-blue/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-neon-purple/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>
    </main>
  )
}

function FeatureCard({ icon, title, description, delay, link }: {
  icon: string
  title: string
  description: string
  delay: number
  link?: string
}) {
  const card = (
    <motion.div
      className="p-6 bg-dark-card/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-forge-orange transition-all cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5, boxShadow: '0 10px 40px rgba(255, 107, 53, 0.3)' }}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-forge-orange">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )

  return link ? <Link href={link}>{card}</Link> : card
}
