'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function RAGDiagram() {
  const [step, setStep] = useState(0)

  const steps = [
    'User Query',
    'Search Vector DB',
    'Retrieve Context',
    'Augment Prompt',
    'Generate Response',
  ]

  return (
    <div className="relative h-80">
      {/* User Query */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-16 bg-electric-blue/20 border-2 border-electric-blue rounded-lg flex items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center">
          <div className="text-xl mb-1">❓</div>
          <div className="text-xs font-semibold">User Query</div>
        </div>
      </motion.div>

      {/* Arrow Down */}
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-1 h-12 bg-electric-blue"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.5 }}
        style={{ transformOrigin: 'top' }}
      />

      {/* Vector Database */}
      <motion.div
        className="absolute top-36 left-1/2 -translate-x-1/2 w-40 h-16 bg-purple-500/20 border-2 border-purple-500 rounded-lg flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-center">
          <div className="text-xl mb-1">🗄️</div>
          <div className="text-xs font-semibold">Vector DB</div>
        </div>
      </motion.div>

      {/* Retrieved Documents */}
      <div className="absolute top-36 left-8 flex gap-2">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-12 h-16 bg-neon-purple/20 border border-neon-purple rounded flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.2 }}
          >
            <div className="text-xs">📄</div>
          </motion.div>
        ))}
      </div>

      {/* Context Label */}
      <motion.div
        className="absolute top-40 left-8 text-xs text-neon-purple font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Retrieved Context
      </motion.div>

      {/* Combine Arrow */}
      <motion.div
        className="absolute top-56 left-1/2 -translate-x-1/2 w-1 h-12 bg-purple-500"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 2.2 }}
        style={{ transformOrigin: 'top' }}
      />

      {/* LLM */}
      <motion.div
        className="absolute top-72 left-1/2 -translate-x-1/2 w-40 h-16 bg-forge-orange/20 border-2 border-forge-orange rounded-lg flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5 }}
      >
        <div className="text-center">
          <div className="text-xl mb-1">🧠</div>
          <div className="text-xs font-semibold">LLM + Context</div>
        </div>
      </motion.div>

      {/* Final Arrow */}
      <motion.div
        className="absolute top-72 right-8 w-24 h-1 bg-green-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.8 }}
        style={{ transformOrigin: 'left' }}
      >
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-green-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        />
      </motion.div>

      {/* Output */}
      <motion.div
        className="absolute top-64 right-8 w-32 h-20 bg-green-500/20 border-2 border-green-500 rounded-lg flex items-center justify-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.2 }}
      >
        <div className="text-center">
          <div className="text-xl mb-1">✨</div>
          <div className="text-xs font-semibold">Response</div>
        </div>
      </motion.div>
    </div>
  )
}
