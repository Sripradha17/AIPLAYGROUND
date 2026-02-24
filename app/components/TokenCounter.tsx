'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '@/app/components/ui/Card'
import TextArea from '@/app/components/ui/TextArea'
import Badge from '@/app/components/ui/Badge'

// Approximate tokenization (simplified)
function estimateTokens(text: string, model: 'gpt' | 'claude'): number {
  if (!text) return 0
  
  // GPT models: ~4 chars per token on average
  // Claude: similar but slightly different
  const charsPerToken = model === 'gpt' ? 4 : 4.2
  
  // More accurate: count words and special chars
  const words = text.split(/\s+/).filter(t => t.length > 0).length
  const specialChars = (text.match(/[^\w\s]/g) || []).length
  
  // Rough estimate: 0.75 tokens per word + special chars
  const wordTokens = words * 0.75
  const specialTokens = specialChars * 0.5
  
  return Math.ceil(wordTokens + specialTokens)
}

export default function TokenCounter() {
  const [text, setText] = useState('')
  const [model, setModel] = useState<'gpt' | 'claude'>('gpt')
  
  const tokens = estimateTokens(text, model)
  const characters = text.length
  const words = text.split(/\s+/).filter(t => t.length > 0).length
  const lines = text.split('\n').length
  
  // Cost estimates (per 1K tokens)
  const costs = {
    'gpt-4': { input: 0.03, output: 0.06 },
    'gpt-4-turbo': { input: 0.01, output: 0.03 },
    'gpt-3.5': { input: 0.0005, output: 0.0015 },
    'claude-opus': { input: 0.015, output: 0.075 },
    'claude-sonnet': { input: 0.003, output: 0.015 },
  }
  
  const estimatedCost = (modelName: keyof typeof costs) => {
    return ((tokens / 1000) * costs[modelName].input).toFixed(6)
  }
  
  return (
    <div className="space-y-6">
      {/* Model Selector */}
      <Card variant="glass" padding="sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Tokenizer Model:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setModel('gpt')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                model === 'gpt'
                  ? 'bg-forge-orange text-white'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              GPT
            </button>
            <button
              onClick={() => setModel('claude')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                model === 'claude'
                  ? 'bg-forge-orange text-white'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              Claude
            </button>
          </div>
        </div>
      </Card>

      {/* Text Input */}
      <Card variant="gradient" padding="md">
        <label className="block text-sm font-semibold mb-2">
          Enter or paste your text:
        </label>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your prompt, document, or any text here to count tokens..."
          rows={12}
          className="font-mono"
        />
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="glass" padding="md" className="text-center">
            <div className="text-3xl font-bold text-forge-orange mb-1">
              {tokens.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Tokens</div>
            <div className="text-xs text-gray-500 mt-1">
              ≈ {(tokens / 1000).toFixed(2)}K
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="glass" padding="md" className="text-center">
            <div className="text-3xl font-bold text-electric-blue mb-1">
              {characters.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Characters</div>
            <div className="text-xs text-gray-500 mt-1">
              Including spaces
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="glass" padding="md" className="text-center">
            <div className="text-3xl font-bold text-neon-purple mb-1">
              {words.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Words</div>
            <div className="text-xs text-gray-500 mt-1">
              ≈ {(tokens / words || 0).toFixed(2)} tok/word
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="glass" padding="md" className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">
              {lines.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Lines</div>
            <div className="text-xs text-gray-500 mt-1">
              ≈ {(tokens / lines || 0).toFixed(1)} tok/line
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Cost Estimates */}
      <Card variant="glass" padding="md">
        <h3 className="text-lg font-semibold mb-4">💰 Input Cost Estimates</h3>
        <div className="space-y-2 text-sm">
          {Object.entries(costs).map(([modelName, pricing]) => (
            <div key={modelName} className="flex justify-between items-center">
              <span className="font-medium capitalize">
                {modelName.replace('-', ' ')}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400">
                  ${pricing.input}/1K tokens
                </span>
                <Badge variant="default">
                  ${estimatedCost(modelName as keyof typeof costs)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Context Window Comparison */}
      {tokens > 0 && (
        <Card variant="glass" padding="md">
          <h3 className="text-lg font-semibold mb-4">🪟 Context Window Usage</h3>
          <div className="space-y-3">
            {[
              { name: 'GPT-3.5 Turbo', limit: 16385 },
              { name: 'GPT-4', limit: 8192 },
              { name: 'GPT-4 Turbo', limit: 128000 },
              { name: 'Claude 3', limit: 200000 },
            ].map((ctx) => {
              const percentage = (tokens / ctx.limit) * 100
              return (
                <div key={ctx.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{ctx.name}</span>
                    <span className="text-gray-400">
                      {tokens.toLocaleString()} / {ctx.limit.toLocaleString()}
                      {' '}({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${
                        percentage > 90 ? 'bg-red-500' :
                        percentage > 70 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(percentage, 100)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {/* Tips */}
      <Card variant="glass" padding="sm">
        <div className="text-xs text-gray-400 space-y-1">
          <div>💡 <strong>Note:</strong> Token counts are estimates. Actual counts may vary by model.</div>
          <div>📏 GPT models: ~4 characters per token | ~0.75 tokens per word</div>
          <div>🔍 For exact counts, use OpenAI's tiktoken or Anthropic's tokenizer</div>
        </div>
      </Card>
    </div>
  )
}
