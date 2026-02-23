'use client'

import { motion } from 'framer-motion'

export default function EmbeddingsDiagram() {
  return (
    <div className="relative h-[520px] p-4">
      {/* Text Input */}
      <motion.div
        className="absolute top-4 left-8 w-64 p-4 bg-electric-blue/20 border-2 border-electric-blue rounded-lg"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-sm font-semibold text-electric-blue mb-2">Text Input</div>
        <div className="space-y-2 text-xs font-mono">
          <div className="p-2 bg-dark-bg rounded">"cat"</div>
          <div className="p-2 bg-dark-bg rounded">"kitten"</div>
          <div className="p-2 bg-dark-bg rounded">"dog"</div>
          <div className="p-2 bg-dark-bg rounded">"car"</div>
        </div>
      </motion.div>

      {/* Arrow to Embedding Model */}
      <motion.div
        className="absolute top-32 left-[312px] w-20 h-1 bg-electric-blue"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8 }}
        style={{ transformOrigin: 'left' }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-electric-blue" />
      </motion.div>

      {/* Embedding Model */}
      <motion.div
        className="absolute top-20 left-[360px] w-48 h-32 bg-neon-purple/20 border-2 border-neon-purple rounded-lg p-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="text-center">
          <div className="text-2xl mb-2">🧮</div>
          <div className="text-sm font-semibold">Embedding Model</div>
          <div className="text-xs text-gray-400 mt-2">text-embedding-3-small</div>
          <div className="text-xs text-neon-purple mt-1">Converts text → vectors</div>
        </div>
      </motion.div>

      {/* Arrow to Vector Space */}
      <motion.div
        className="absolute top-132 left-[532px] w-20 h-1 bg-neon-purple"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.6 }}
        style={{ transformOrigin: 'left' }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-neon-purple" />
      </motion.div>

      {/* Vector Space Visualization */}
      <motion.div
        className="absolute top-4 right-8 w-80 h-80 bg-dark-bg border-2 border-forge-orange rounded-lg p-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="text-sm font-semibold text-forge-orange mb-3 text-center">
          Vector Space (1536 dimensions)
        </div>
        
        {/* Simplified 2D visualization */}
        <svg className="w-full h-56" viewBox="0 0 300 200">
          {/* Axes */}
          <line x1="20" y1="180" x2="280" y2="180" stroke="#4B5563" strokeWidth="1" />
          <line x1="20" y1="180" x2="20" y2="20" stroke="#4B5563" strokeWidth="1" />
          
          {/* Points with labels */}
          {/* "cat" and "kitten" close together */}
          <motion.circle
            cx="80" cy="60" r="6" fill="#00D9FF"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.5 }}
          />
          <text x="90" y="65" fill="#00D9FF" fontSize="12">cat</text>
          
          <motion.circle
            cx="100" cy="70" r="6" fill="#00D9FF"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.7 }}
          />
          <text x="110" y="75" fill="#00D9FF" fontSize="12">kitten</text>

          {/* "dog" nearby but slightly separated */}
          <motion.circle
            cx="120" cy="90" r="6" fill="#B24BF3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.9 }}
          />
          <text x="130" y="95" fill="#B24BF3" fontSize="12">dog</text>

          {/* "car" far away */}
          <motion.circle
            cx="230" cy="150" r="6" fill="#FF6B35"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 3.1 }}
          />
          <text x="240" y="155" fill="#FF6B35" fontSize="12">car</text>

          {/* Similarity lines */}
          <motion.line
            x1="80" y1="60" x2="100" y2="70"
            stroke="#00D9FF" strokeWidth="2" strokeDasharray="3,3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 3.3 }}
          />
          <text x="70" y="50" fill="#00D9FF" fontSize="10">High similarity</text>
        </svg>

        <div className="text-xs text-gray-400 mt-2 space-y-1">
          <div>• Similar words cluster together</div>
          <div>• Distance = semantic similarity</div>
          <div>• 1536D collapsed to 2D for visualization</div>
        </div>
      </motion.div>

      {/* Vector Examples */}
      <motion.div
        className="absolute bottom-4 left-8 w-[520px] p-4 bg-dark-bg border border-gray-700 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5 }}
      >
        <div className="text-sm font-semibold mb-2">Vector Representation</div>
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div>
            <div className="text-electric-blue mb-1">"cat" →</div>
            <div className="p-2 bg-gray-800 rounded overflow-hidden">
              [0.023, -0.891, 0.442, ..., 0.156]
            </div>
            <div className="text-gray-500 text-xs mt-1">1536 numbers</div>
          </div>
          <div>
            <div className="text-electric-blue mb-1">"kitten" →</div>
            <div className="p-2 bg-gray-800 rounded overflow-hidden">
              [0.031, -0.873, 0.451, ..., 0.149]
            </div>
            <div className="text-gray-500 text-xs mt-1">Very similar!</div>
          </div>
        </div>

        <div className="mt-3 p-2 bg-forge-orange/10 border border-forge-orange/30 rounded text-xs">
          <span className="font-semibold text-forge-orange">Cosine Similarity:</span> cat ↔ kitten: 0.95 | cat ↔ car: 0.23
        </div>
      </motion.div>
    </div>
  )
}
