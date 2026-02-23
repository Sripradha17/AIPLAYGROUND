'use client'

import { motion } from 'framer-motion'

export default function FewShotDiagram() {
  return (
    <div className="relative h-[500px] p-6">
      {/* Title */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h4 className="text-lg font-semibold text-forge-orange">
          Few-Shot Learning: Teaching by Example
        </h4>
      </motion.div>

      <div className="grid grid-cols-2 gap-6">
        {/* Zero-Shot (Left) */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center p-3 bg-red-900/20 border-2 border-red-500 rounded-lg">
            <div className="text-2xl mb-1">❌</div>
            <div className="font-semibold text-red-400">Zero-Shot</div>
            <div className="text-xs text-gray-400">No examples given</div>
          </div>

          <motion.div
            className="p-4 bg-dark-bg border border-gray-700 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-xs font-semibold text-gray-400 mb-2">PROMPT:</div>
            <div className="text-sm bg-gray-800 p-3 rounded font-mono">
              Classify the sentiment: "This movie was terrible"
            </div>
          </motion.div>

          <motion.div
            className="p-4 bg-dark-bg border border-red-700 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="text-xs font-semibold text-gray-400 mb-2">OUTPUT:</div>
            <div className="text-sm bg-gray-800 p-3 rounded">
              <span className="text-red-400">Negative (?)</span>
              <div className="text-xs text-gray-500 mt-2">May be inconsistent</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Few-Shot (Right) */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center p-3 bg-green-900/20 border-2 border-green-500 rounded-lg">
            <div className="text-2xl mb-1">✅</div>
            <div className="font-semibold text-green-400">Few-Shot</div>
            <div className="text-xs text-gray-400">Examples provided</div>
          </div>

          <motion.div
            className="p-4 bg-dark-bg border border-gray-700 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-xs font-semibold text-gray-400 mb-2">PROMPT WITH EXAMPLES:</div>
            <div className="text-sm bg-gray-800 p-3 rounded font-mono space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-green-400">Ex1:</span>
                <div className="flex-1">
                  <div>"I loved it!" → Positive</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">Ex2:</span>
                <div className="flex-1">
                  <div>"Boring film" → Negative</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">Ex3:</span>
                <div className="flex-1">
                  <div>"It was okay" → Neutral</div>
                </div>
              </div>
              <div className="border-t border-gray-600 pt-2 mt-2">
                <span className="text-forge-orange">Now:</span> "This movie was terrible" →
              </div>
            </div>
          </motion.div>

          <motion.div
            className="p-4 bg-dark-bg border border-green-700 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="text-xs font-semibold text-gray-400 mb-2">OUTPUT:</div>
            <div className="text-sm bg-gray-800 p-3 rounded">
              <span className="text-green-400">Negative ✓</span>
              <div className="text-xs text-gray-500 mt-2">Consistent format!</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Benefits */}
      <motion.div
        className="mt-6 grid grid-cols-3 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="p-3 bg-electric-blue/10 border border-electric-blue rounded-lg text-center">
          <div className="text-xl mb-1">🎯</div>
          <div className="text-xs font-semibold">Better Accuracy</div>
          <div className="text-xs text-gray-400 mt-1">Examples guide the model</div>
        </div>

        <div className="p-3 bg-electric-blue/10 border border-electric-blue rounded-lg text-center">
          <div className="text-xl mb-1">📋</div>
          <div className="text-xs font-semibold">Consistent Format</div>
          <div className="text-xs text-gray-400 mt-1">Matches your examples</div>
        </div>

        <div className="p-3 bg-electric-blue/10 border border-electric-blue rounded-lg text-center">
          <div className="text-xl mb-1">🚀</div>
          <div className="text-xs font-semibold">No Fine-tuning</div>
          <div className="text-xs text-gray-400 mt-1">Works immediately</div>
        </div>
      </motion.div>

      {/* Best Practices */}
      <motion.div
        className="mt-4 p-4 bg-forge-orange/10 border border-forge-orange/30 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="text-sm font-semibold text-forge-orange mb-2">💡 Best Practices:</div>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
          <div>• Use 2-5 diverse examples</div>
          <div>• Show the exact format you want</div>
          <div>• Cover edge cases in examples</div>
          <div>• Keep examples concise</div>
        </div>
      </motion.div>
    </div>
  )
}
