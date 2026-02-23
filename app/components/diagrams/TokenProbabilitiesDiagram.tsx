'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function TokenProbabilitiesDiagram() {
  const [showProbs, setShowProbs] = useState(false)

  const tokens = [
    { token: 'The', prob: 0.89, color: 'green' },
    { token: 'cat', prob: 0.67, color: 'yellow' },
    { token: 'is', prob: 0.92, color: 'green' },
    { token: 'sleeping', prob: 0.45, color: 'orange' },
  ]

  const alternatives = [
    { token: 'sleeping', prob: 0.45 },
    { token: 'sitting', prob: 0.28 },
    { token: 'playing', prob: 0.15 },
    { token: 'eating', prob: 0.08 },
    { token: 'running', prob: 0.04 },
  ]

  return (
    <div className="relative h-[500px] p-6">
      {/* Input Context */}
      <motion.div
        className="mb-6 p-4 bg-dark-bg border-2 border-electric-blue rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-sm font-semibold text-electric-blue mb-2">Input Context</div>
        <div className="text-lg font-mono">The cat is ___</div>
        <div className="text-xs text-gray-400 mt-2">Model predicts next token...</div>
      </motion.div>

      {/* Generated Sequence with Probabilities */}
      <motion.div
        className="mb-6 p-4 bg-dark-bg border-2 border-forge-orange rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-forge-orange">Generated Tokens</div>
          <button
            onClick={() => setShowProbs(!showProbs)}
            className="px-3 py-1 bg-forge-orange/20 hover:bg-forge-orange/30 rounded text-xs"
          >
            {showProbs ? 'Hide' : 'Show'} Probabilities
          </button>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {tokens.map((item, idx) => (
            <motion.div
              key={idx}
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + idx * 0.3 }}
            >
              <div className={`px-4 py-2 rounded-lg border-2 ${
                item.color === 'green' ? 'bg-green-900/20 border-green-500' :
                item.color === 'yellow' ? 'bg-yellow-900/20 border-yellow-500' :
                'bg-orange-900/20 border-orange-500'
              }`}>
                <div className="font-mono text-lg">{item.token}</div>
                {showProbs && (
                  <motion.div
                    className="text-xs mt-1 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {(item.prob * 100).toFixed(0)}% confident
                  </motion.div>
                )}
              </div>
              
              {/* Confidence bar */}
              {showProbs && (
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gray-700 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className={`h-full ${
                      item.color === 'green' ? 'bg-green-500' :
                      item.color === 'yellow' ? 'bg-yellow-500' :
                      'bg-orange-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.prob * 100}%` }}
                    transition={{ delay: 0.2 }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Token Alternatives */}
      <motion.div
        className="p-4 bg-dark-bg border-2 border-neon-purple rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="text-sm font-semibold text-neon-purple mb-3">
          Top 5 Alternative Tokens for "___"
        </div>
        
        <div className="space-y-2">
          {alternatives.map((alt, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2 + idx * 0.15 }}
            >
              <div className="w-24 font-mono text-sm">{alt.token}</div>
              <div className="flex-1 h-6 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-neon-purple to-electric-blue flex items-center justify-end pr-2"
                  initial={{ width: 0 }}
                  animate={{ width: `${alt.prob * 100}%` }}
                  transition={{ delay: 2.4 + idx * 0.15, duration: 0.5 }}
                >
                  <span className="text-xs font-semibold">{(alt.prob * 100).toFixed(1)}%</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Temperature Effect */}
      <motion.div
        className="mt-4 grid grid-cols-3 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <div className="p-3 bg-blue-900/20 border border-blue-500 rounded text-center">
          <div className="text-xs font-semibold mb-1">Low Temp (0.2)</div>
          <div className="text-xs text-gray-400">Always picks "sleeping" (45%)</div>
        </div>
        <div className="p-3 bg-yellow-900/20 border border-yellow-500 rounded text-center">
          <div className="text-xs font-semibold mb-1">Medium Temp (0.7)</div>
          <div className="text-xs text-gray-400">Usually "sleeping", sometimes others</div>
        </div>
        <div className="p-3 bg-red-900/20 border border-red-500 rounded text-center">
          <div className="text-xs font-semibold mb-1">High Temp (1.5)</div>
          <div className="text-xs text-gray-400">More random selection</div>
        </div>
      </motion.div>
    </div>
  )
}
