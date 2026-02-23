'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function CostOptimizationDiagram() {
  const [tokens, setTokens] = useState(1000)
  
  const models = [
    { name: 'GPT-4 Turbo', inputCost: 0.01, outputCost: 0.03 },
    { name: 'GPT-4', inputCost: 0.03, outputCost: 0.06 },
    { name: 'GPT-3.5 Turbo', inputCost: 0.0005, outputCost: 0.0015 },
  ]

  const calculateCost = (model: typeof models[0], inputTokens: number, outputTokens: number) => {
    return ((inputTokens / 1000) * model.inputCost + (outputTokens / 1000) * model.outputCost).toFixed(4)
  }

  return (
    <div className="relative h-[540px] p-4">
      {/* Title */}
      <motion.div
        className="mb-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h4 className="text-lg font-semibold text-forge-orange">Cost Optimization</h4>
        <p className="text-xs text-gray-400">Managing AI API expenses effectively</p>
      </motion.div>

      {/* Token Counter */}
      <motion.div
        className="mb-4 p-4 bg-dark-bg border-2 border-electric-blue rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-sm font-semibold text-electric-blue mb-3">Request Size</div>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={tokens}
            onChange={(e) => setTokens(Number(e.target.value))}
            className="flex-1"
          />
          <div className="text-lg font-mono font-bold text-electric-blue w-32">
            {tokens.toLocaleString()} tokens
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-2">
          ≈ {Math.round(tokens * 0.75)} words | Input: {tokens} + Output: {tokens}
        </div>
      </motion.div>

      {/* Model Cost Comparison */}
      <motion.div
        className="mb-4 p-4 bg-dark-bg border-2 border-neon-purple rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="text-sm font-semibold text-neon-purple mb-3">
          Cost per Request (Input + Output)
        </div>
        
        <div className="space-y-3">
          {models.map((model, idx) => {
            const cost = parseFloat(calculateCost(model, tokens, tokens))
            const maxCost = parseFloat(calculateCost(models[1], 10000, 10000))
            const barWidth = (cost / maxCost) * 100
            
            return (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.2 }}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-32 text-xs font-semibold">{model.name}</div>
                  <div className="flex-1 h-8 bg-gray-800 rounded overflow-hidden">
                    <motion.div
                      className={`h-full flex items-center px-3 ${
                        idx === 0 ? 'bg-orange-600' :
                        idx === 1 ? 'bg-red-600' :
                        'bg-green-600'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(barWidth, 100)}%` }}
                      transition={{ delay: 1 + idx * 0.2, duration: 0.5 }}
                    >
                      <span className="text-sm font-bold whitespace-nowrap">
                        ${cost.toFixed(4)}
                      </span>
                    </motion.div>
                  </div>
                </div>
                <div className="ml-32 text-xs text-gray-400">
                  In: ${model.inputCost}/1K | Out: ${model.outputCost}/1K tokens
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Optimization Strategies */}
      <motion.div
        className="grid grid-cols-2 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
      >
        <div className="p-3 bg-green-900/20 border border-green-500 rounded">
          <div className="text-xs font-semibold text-green-400 mb-2">💰 Cost Saving Tips</div>
          <div className="space-y-1 text-xs text-gray-300">
            <div>• Use GPT-3.5 for simple tasks</div>
            <div>• Batch requests when possible</div>
            <div>• Cache common responses</div>
            <div>• Truncate old conversation history</div>
          </div>
        </div>

        <div className="p-3 bg-blue-900/20 border border-blue-500 rounded">
          <div className="text-xs font-semibold text-blue-400 mb-2">🎯 Smart Model Selection</div>
          <div className="space-y-1 text-xs text-gray-300">
            <div>• GPT-3.5: Classification, simple Q&A</div>
            <div>• GPT-4 Turbo: Complex reasoning</div>
            <div>• GPT-4: Highest quality needed</div>
            <div>• Route by complexity</div>
          </div>
        </div>
      </motion.div>

      {/* Monthly Estimate */}
      <motion.div
        className="mt-4 p-4 bg-forge-orange/10 border-2 border-forge-orange rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <div className="text-sm font-semibold text-forge-orange mb-2">
          📊 Monthly Cost Estimate (1,000 requests/day)
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          {models.map((model, idx) => {
            const dailyCost = parseFloat(calculateCost(model, tokens, tokens)) * 1000
            const monthlyCost = dailyCost * 30
            
            return (
              <div key={model.name} className="p-2 bg-dark-bg rounded">
                <div className="text-xs text-gray-400">{model.name}</div>
                <div className={`text-lg font-bold ${
                  idx === 0 ? 'text-orange-400' :
                  idx === 1 ? 'text-red-400' :
                  'text-green-400'
                }`}>
                  ${monthlyCost.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">/month</div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
