'use client'

import { motion } from 'framer-motion'

export default function PromptFlowDiagram() {
  return (
    <div className="relative h-64 flex items-center justify-center">
      {/* Prompt Box */}
      <motion.div
        className="absolute left-0 w-32 h-20 bg-electric-blue/20 border-2 border-electric-blue rounded-lg flex items-center justify-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-center">
          <div className="text-2xl mb-1">📝</div>
          <div className="text-xs font-semibold">Prompt</div>
        </div>
      </motion.div>

      {/* Arrow 1 */}
      <motion.div
        className="absolute left-36 w-24 h-1 bg-gradient-to-r from-electric-blue to-forge-orange"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ transformOrigin: 'left' }}
      >
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-forge-orange"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        />
      </motion.div>

      {/* Model Box */}
      <motion.div
        className="absolute left-64 w-32 h-20 bg-forge-orange/20 border-2 border-forge-orange rounded-lg flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="text-center">
          <div className="text-2xl mb-1">🧠</div>
          <div className="text-xs font-semibold">AI Model</div>
        </div>
      </motion.div>

      {/* Processing indicator */}
      <motion.div
        className="absolute left-64 top-24 text-xs text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
      >
        Processing...
      </motion.div>

      {/* Arrow 2 */}
      <motion.div
        className="absolute left-[400px] w-24 h-1 bg-gradient-to-r from-forge-orange to-green-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        style={{ transformOrigin: 'left' }}
      >
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-green-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 }}
        />
      </motion.div>

      {/* Output Box */}
      <motion.div
        className="absolute right-0 w-32 h-20 bg-green-500/20 border-2 border-green-500 rounded-lg flex items-center justify-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5 }}
      >
        <div className="text-center">
          <div className="text-2xl mb-1">✨</div>
          <div className="text-xs font-semibold">Output</div>
        </div>
      </motion.div>

      {/* Data flow particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-forge-orange rounded-full"
          initial={{ left: '10%', opacity: 0 }}
          animate={{
            left: ['10%', '90%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            delay: 3 + i * 0.3,
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}
    </div>
  )
}
