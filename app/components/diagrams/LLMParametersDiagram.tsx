'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function LLMParametersDiagram() {
  const [currentParam, setCurrentParam] = useState<'temp' | 'tokens' | 'topP'>('temp')

  return (
    <div className="relative h-96 p-6">
      {/* Parameter Controls */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* Temperature */}
        <motion.div
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
            currentParam === 'temp'
              ? 'bg-forge-orange/20 border-forge-orange'
              : 'bg-dark-bg border-gray-700'
          }`}
          onClick={() => setCurrentParam('temp')}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">🌡️</div>
            <div className="font-semibold text-sm">Temperature</div>
            <div className="text-xs text-gray-400 mt-1">Randomness</div>
            <div className="mt-2 text-forge-orange font-mono text-lg">0.0 - 2.0</div>
          </div>
        </motion.div>

        {/* Max Tokens */}
        <motion.div
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
            currentParam === 'tokens'
              ? 'bg-electric-blue/20 border-electric-blue'
              : 'bg-dark-bg border-gray-700'
          }`}
          onClick={() => setCurrentParam('tokens')}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">📏</div>
            <div className="font-semibold text-sm">Max Tokens</div>
            <div className="text-xs text-gray-400 mt-1">Length Limit</div>
            <div className="mt-2 text-electric-blue font-mono text-lg">100 - 4000</div>
          </div>
        </motion.div>

        {/* Top P */}
        <motion.div
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
            currentParam === 'topP'
              ? 'bg-neon-purple/20 border-neon-purple'
              : 'bg-dark-bg border-gray-700'
          }`}
          onClick={() => setCurrentParam('topP')}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-semibold text-sm">Top P</div>
            <div className="text-xs text-gray-400 mt-1">Nucleus Sampling</div>
            <div className="mt-2 text-neon-purple font-mono text-lg">0.0 - 1.0</div>
          </div>
        </motion.div>
      </div>

      {/* Visualization Area */}
      <motion.div
        key={currentParam}
        className="bg-dark-bg rounded-lg p-6 border-2 border-gray-700"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {currentParam === 'temp' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-forge-orange mb-4">Temperature Effect</h4>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <motion.div
                className="p-3 bg-blue-900/20 border border-blue-500 rounded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-blue-400 font-mono text-xl mb-2">0.0</div>
                <div className="text-xs">Deterministic</div>
                <div className="text-xs text-gray-400 mt-1">Same output every time</div>
              </motion.div>

              <motion.div
                className="p-3 bg-yellow-900/20 border border-yellow-500 rounded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-yellow-400 font-mono text-xl mb-2">0.7</div>
                <div className="text-xs">Balanced</div>
                <div className="text-xs text-gray-400 mt-1">Creative but coherent</div>
              </motion.div>

              <motion.div
                className="p-3 bg-red-900/20 border border-red-500 rounded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-red-400 font-mono text-xl mb-2">2.0</div>
                <div className="text-xs">Random</div>
                <div className="text-xs text-gray-400 mt-1">Very creative/unpredictable</div>
              </motion.div>
            </div>

            <div className="mt-4 p-3 bg-forge-orange/10 rounded border border-forge-orange/30">
              <div className="text-sm">💡 <strong>Use Cases:</strong></div>
              <div className="text-xs text-gray-400 mt-1">
                Low (0-0.3): Code, facts, translations • Mid (0.7): General chat • High (1.5+): Creative writing
              </div>
            </div>
          </div>
        )}

        {currentParam === 'tokens' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-electric-blue mb-4">Token Limits</h4>
            
            <div className="space-y-3">
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-24 text-sm font-mono">1 token ≈</div>
                <div className="flex-1 p-2 bg-electric-blue/20 rounded border border-electric-blue">
                  <span className="text-sm">4 characters or ~0.75 words</span>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-24 text-sm font-mono">100 tokens ≈</div>
                <div className="flex-1 p-2 bg-electric-blue/20 rounded border border-electric-blue">
                  <span className="text-sm">75 words (short paragraph)</span>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="w-24 text-sm font-mono">2000 tokens ≈</div>
                <div className="flex-1 p-2 bg-electric-blue/20 rounded border border-electric-blue">
                  <span className="text-sm">1500 words (3-4 pages)</span>
                </div>
              </motion.div>
            </div>

            <div className="mt-4 p-3 bg-electric-blue/10 rounded border border-electric-blue/30">
              <div className="text-sm">⚠️ <strong>Context Window:</strong></div>
              <div className="text-xs text-gray-400 mt-1">
                Total tokens = Prompt + Response. GPT-4: 8K-128K • Claude: 200K+
              </div>
            </div>
          </div>
        )}

        {currentParam === 'topP' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-neon-purple mb-4">Top P (Nucleus Sampling)</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                className="p-4 bg-neon-purple/20 rounded border border-neon-purple"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-center mb-3">
                  <div className="text-neon-purple font-mono text-2xl">0.1</div>
                  <div className="text-xs text-gray-400">Low Diversity</div>
                </div>
                <div className="text-xs">
                  Only considers top 10% most likely tokens. Very focused and consistent.
                </div>
              </motion.div>

              <motion.div
                className="p-4 bg-neon-purple/20 rounded border border-neon-purple"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-center mb-3">
                  <div className="text-neon-purple font-mono text-2xl">0.9</div>
                  <div className="text-xs text-gray-400">High Diversity</div>
                </div>
                <div className="text-xs">
                  Considers top 90% of tokens. More varied and creative responses.
                </div>
              </motion.div>
            </div>

            <div className="mt-4 p-3 bg-neon-purple/10 rounded border border-neon-purple/30">
              <div className="text-sm">🎛️ <strong>Temperature vs Top P:</strong></div>
              <div className="text-xs text-gray-400 mt-1">
                Generally use one or the other, not both. Top P is more controlled than temperature.
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
