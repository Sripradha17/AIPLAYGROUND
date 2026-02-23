'use client'

import { motion } from 'framer-motion'

export default function ChainOfThoughtDiagram() {
  const steps = [
    { emoji: '📖', label: 'Read Problem', color: 'electric-blue' },
    { emoji: '🤔', label: 'Analyze', color: 'neon-purple' },
    { emoji: '📝', label: 'Plan Steps', color: 'forge-orange' },
    { emoji: '🧮', label: 'Calculate', color: 'yellow-500' },
    { emoji: '✅', label: 'Verify', color: 'green-500' },
    { emoji: '💡', label: 'Final Answer', color: 'green-500' },
  ]

  return (
    <div className="relative h-96 p-8">
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        {/* Connecting lines */}
        {steps.map((_, i) => {
          if (i === steps.length - 1) return null
          const y = 60 + i * 60
          return (
            <motion.line
              key={i}
              x1="120"
              y1={y}
              x2="120"
              y2={y + 40}
              stroke="#FF6B35"
              strokeWidth="3"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 + i * 0.6, duration: 0.4 }}
            />
          )
        })}
      </svg>

      <div className="relative space-y-4" style={{ zIndex: 1 }}>
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.6 }}
          >
            {/* Step Number */}
            <div className="w-8 h-8 bg-dark-bg rounded-full flex items-center justify-center text-sm font-bold text-forge-orange border-2 border-forge-orange">
              {i + 1}
            </div>

            {/* Step Content */}
            <motion.div
              className={`flex-1 p-4 bg-${step.color}/20 border-2 border-${step.color} rounded-lg`}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{step.emoji}</div>
                <div>
                  <div className="font-semibold">{step.label}</div>
                  <motion.div
                    className="text-xs text-gray-400 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.6 + 0.3 }}
                  >
                    {i === 0 && 'Understanding the problem...'}
                    {i === 1 && 'Breaking down the requirements...'}
                    {i === 2 && 'Creating step-by-step approach...'}
                    {i === 3 && 'Performing calculations...'}
                    {i === 4 && 'Checking the solution...'}
                    {i === 5 && 'Presenting the result!'}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Indicator */}
            {i < steps.length - 1 && (
              <motion.div
                className="w-2 h-2 bg-forge-orange rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  delay: i * 0.6 + 0.4,
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Success animation */}
      <motion.div
        className="absolute bottom-4 right-4 text-4xl"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: steps.length * 0.6, type: 'spring' }}
      >
        🎯
      </motion.div>
    </div>
  )
}
