'use client'

import { motion } from 'framer-motion'

interface PromptInputProps {
  prompt: string
  setPrompt: (value: string) => void
  systemInstructions: string
  setSystemInstructions: (value: string) => void
  onGenerate: () => void
  isLoading: boolean
}

export default function PromptInput({
  prompt,
  setPrompt,
  systemInstructions,
  setSystemInstructions,
  onGenerate,
  isLoading,
}: PromptInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-card rounded-xl p-6 border border-gray-700"
    >
      {/* System Instructions */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          System Instructions (Optional)
        </label>
        <textarea
          value={systemInstructions}
          onChange={(e) => setSystemInstructions(e.target.value)}
          placeholder="You are a helpful AI assistant..."
          className="w-full h-20 bg-dark-bg text-white rounded-lg p-3 border border-gray-600 focus:border-forge-orange focus:outline-none focus:ring-2 focus:ring-forge-orange/50 transition-all resize-none font-mono text-sm"
        />
      </div>

      {/* Main Prompt */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Your Prompt <span className="text-forge-orange">*</span>
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here... Be specific and clear!"
          className="w-full h-64 bg-dark-bg text-white rounded-lg p-4 border border-gray-600 focus:border-forge-orange focus:outline-none focus:ring-2 focus:ring-forge-orange/50 transition-all resize-none font-mono"
          disabled={isLoading}
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">
            {prompt.length} characters
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPrompt('')}
              className="text-xs text-gray-400 hover:text-white transition-colors"
              disabled={isLoading}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <motion.button
        onClick={onGenerate}
        disabled={isLoading || !prompt.trim()}
        className="w-full py-4 bg-gradient-to-r from-forge-orange to-forge-red rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-forge-orange/50 transition-all"
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            Generating...
          </span>
        ) : (
          'Generate ⚡'
        )}
      </motion.button>
    </motion.div>
  )
}
