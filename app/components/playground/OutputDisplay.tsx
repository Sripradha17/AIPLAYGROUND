'use client'

import { motion } from 'framer-motion'
import type { AIGenerateResponse } from '@/app/types/ai'

interface OutputDisplayProps {
  response: AIGenerateResponse
  isLoading: boolean
}

export default function OutputDisplay({ response, isLoading }: OutputDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mt-6"
    >
      {/* Output Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold">Output</h3>
        {response.success && (
          <div className="flex gap-2">
            <motion.button
              onClick={() => navigator.clipboard.writeText(response.output)}
              className="px-4 py-2 bg-dark-card border border-gray-600 rounded-lg text-sm hover:border-forge-orange transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📋 Copy
            </motion.button>
          </div>
        )}
      </div>

      {/* Output Content */}
      <div className="bg-dark-card rounded-xl border border-gray-700 overflow-hidden">
        {/* Status Bar */}
        <div className={`px-4 py-2 flex items-center justify-between text-sm ${
          response.success ? 'bg-green-900/30 border-b border-green-700' : 'bg-red-900/30 border-b border-red-700'
        }`}>
          <span className={response.success ? 'text-green-400' : 'text-red-400'}>
            {response.success ? '✓ Success' : '✗ Error'}
          </span>
          <span className="text-gray-400">{response.model}</span>
        </div>

        {/* Output Text */}
        <div className="p-6">
          {response.success ? (
            <motion.pre
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white whitespace-pre-wrap font-mono text-sm leading-relaxed"
            >
              {response.output}
            </motion.pre>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400"
            >
              <p className="font-semibold mb-2">Error:</p>
              <p className="text-sm">{response.error}</p>
            </motion.div>
          )}
        </div>

        {/* Token Usage */}
        {response.success && (
          <div className="px-6 py-4 bg-dark-bg/50 border-t border-gray-700">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500 mb-1">Prompt Tokens</p>
                <p className="text-lg font-bold text-electric-blue">
                  {response.tokensUsed.prompt.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Completion Tokens</p>
                <p className="text-lg font-bold text-neon-purple">
                  {response.tokensUsed.completion.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Tokens</p>
                <p className="text-lg font-bold text-forge-orange">
                  {response.tokensUsed.total.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
