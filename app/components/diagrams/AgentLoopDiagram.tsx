'use client'

import { motion } from 'framer-motion'

export default function AgentLoopDiagram() {
  return (
    <div className="relative h-96 flex items-center justify-center">
      {/* Center: Agent */}
      <motion.div
        className="absolute w-32 h-32 bg-forge-orange/20 border-4 border-forge-orange rounded-full flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
      >
        <div className="text-3xl mb-1">🤖</div>
        <div className="text-xs font-semibold">Agent</div>
      </motion.div>

      {/* Tool 1: Top */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-20 bg-electric-blue/20 border-2 border-electric-blue rounded-lg flex items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-center">
          <div className="text-xl mb-1">🔍</div>
          <div className="text-xs font-semibold">Search</div>
        </div>
      </motion.div>

      {/* Arrow: Agent to Tool 1 */}
      <motion.path
        d="M 280 140 Q 280 80 280 60"
        stroke="#00D9FF"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      />

      {/* Tool 2: Right */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 w-24 h-20 bg-neon-purple/20 border-2 border-neon-purple rounded-lg flex items-center justify-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="text-center">
          <div className="text-xl mb-1">💾</div>
          <div className="text-xs font-semibold">Database</div>
        </div>
      </motion.div>

      {/* Tool 3: Bottom */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-20 bg-green-500/20 border-2 border-green-500 rounded-lg flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <div className="text-center">
          <div className="text-xl mb-1">📊</div>
          <div className="text-xs font-semibold">Analytics</div>
        </div>
      </motion.div>

      {/* Tool 4: Left */}
      <motion.div
        className="absolute left-8 top-1/2 -translate-y-1/2 w-24 h-20 bg-yellow-500/20 border-2 border-yellow-500 rounded-lg flex items-center justify-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6 }}
      >
        <div className="text-center">
          <div className="text-xl mb-1">🌐</div>
          <div className="text-xs font-semibold">API</div>
        </div>
      </motion.div>

      {/* Circular arrows indicating loop */}
      <motion.div
        className="absolute w-48 h-48 border-4 border-dashed border-forge-orange/40 rounded-full"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{ delay: 2, duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      {/* Thought bubble */}
      <motion.div
        className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-800 border border-gray-600 rounded-full text-xs"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
      >
        🤔 Reasoning...
      </motion.div>

      {/* Action indicators */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-forge-orange rounded-full"
          style={{
            left: '50%',
            top: '50%',
          }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, Math.cos((i * Math.PI) / 2) * 80, 0],
            y: [0, Math.sin((i * Math.PI) / 2) * 80, 0],
          }}
          transition={{
            delay: 3 + i * 0.5,
            duration: 2,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}
    </div>
  )
}
