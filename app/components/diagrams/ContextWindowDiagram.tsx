'use client'

import { motion } from 'framer-motion'

export default function ContextWindowDiagram() {
  const models = [
    { name: 'GPT-3.5', context: 4096, color: 'blue' },
    { name: 'GPT-4', context: 8192, color: 'purple' },
    { name: 'GPT-4 Turbo', context: 128000, color: 'orange' },
    { name: 'Claude 3', context: 200000, color: 'green' },
  ]

  const maxContext = 200000

  return (
    <div className="relative h-[500px] p-6">
      {/* Title */}
      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h4 className="text-lg font-semibold text-forge-orange">
          Context Window Comparison
        </h4>
        <p className="text-xs text-gray-400 mt-1">How much text each model can process at once</p>
      </motion.div>

      {/* Model Comparisons */}
      <div className="space-y-4 mb-6">
        {models.map((model, idx) => (
          <motion.div
            key={model.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + idx * 0.2 }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="w-32 text-sm font-semibold">{model.name}</div>
              <div className="flex-1 h-8 bg-gray-800 rounded-lg overflow-hidden">
                <motion.div
                  className={`h-full flex items-center px-3 ${
                    model.color === 'blue' ? 'bg-blue-600' :
                    model.color === 'purple' ? 'bg-purple-600' :
                    model.color === 'orange' ? 'bg-orange-600' :
                    'bg-green-600'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(model.context / maxContext) * 100}%` }}
                  transition={{ delay: 0.5 + idx * 0.2, duration: 0.8 }}
                >
                  <span className="text-sm font-semibold whitespace-nowrap">
                    {model.context.toLocaleString()} tokens
                  </span>
                </motion.div>
              </div>
            </div>
            <div className="ml-32 text-xs text-gray-400">
              ≈ {Math.round(model.context * 0.75).toLocaleString()} words | 
              ≈ {Math.round(model.context / 500)} pages
            </div>
          </motion.div>
        ))}
      </div>

      {/* Context Usage Visualization */}
      <motion.div
        className="p-4 bg-dark-bg border-2 border-electric-blue rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="text-sm font-semibold text-electric-blue mb-3">
          Context Window Usage Example (8K tokens)
        </div>
        
        <div className="h-16 bg-gray-800 rounded-lg overflow-hidden flex">
          {/* System Prompt */}
          <motion.div
            className="bg-neon-purple flex items-center justify-center text-xs font-semibold"
            initial={{ width: 0 }}
            animate={{ width: '10%' }}
            transition={{ delay: 2 }}
          >
            System (800)
          </motion.div>
          
          {/* Conversation History */}
          <motion.div
            className="bg-electric-blue flex items-center justify-center text-xs font-semibold"
            initial={{ width: 0 }}
            animate={{ width: '40%' }}
            transition={{ delay: 2.2 }}
          >
            History (3,200)
          </motion.div>
          
          {/* Current Prompt */}
          <motion.div
            className="bg-yellow-600 flex items-center justify-center text-xs font-semibold"
            initial={{ width: 0 }}
            animate={{ width: '15%' }}
            transition={{ delay: 2.4 }}
          >
            Prompt (1,200)
          </motion.div>
          
          {/* Response */}
          <motion.div
            className="bg-green-600 flex items-center justify-center text-xs font-semibold"
            initial={{ width: 0 }}
            animate={{ width: '30%' }}
            transition={{ delay: 2.6 }}
          >
            Response (2,400)
          </motion.div>
          
          {/* Remaining */}
          <motion.div
            className="bg-gray-700 flex items-center justify-center text-xs"
            initial={{ width: 0 }}
            animate={{ width: '5%' }}
            transition={{ delay: 2.8 }}
          >
            Free (400)
          </motion.div>
        </div>

        <div className="mt-3 text-xs text-gray-400">
          Total: 8,000 tokens used out of 8,192 available
        </div>
      </motion.div>

      {/* Management Strategies */}
      <motion.div
        className="mt-4 grid grid-cols-3 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <div className="p-3 bg-forge-orange/10 border border-forge-orange rounded">
          <div className="text-xs font-semibold text-forge-orange mb-1">🔄 Truncation</div>
          <div className="text-xs text-gray-400">Keep recent messages, drop old ones</div>
        </div>
        <div className="p-3 bg-forge-orange/10 border border-forge-orange rounded">
          <div className="text-xs font-semibold text-forge-orange mb-1">📝 Summarization</div>
          <div className="text-xs text-gray-400">Compress history into summary</div>
        </div>
        <div className="p-3 bg-forge-orange/10 border border-forge-orange rounded">
          <div className="text-xs font-semibold text-forge-orange mb-1">🪟 Sliding Window</div>
          <div className="text-xs text-gray-400">Move window through long text</div>
        </div>
      </motion.div>
    </div>
  )
}
