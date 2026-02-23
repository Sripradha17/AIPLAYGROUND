'use client'

import { motion } from 'framer-motion'

export default function SystemPromptDiagram() {
  return (
    <div className="relative h-[480px] p-4">
      {/* Message Structure */}
      <div className="space-y-4">
        {/* System Message */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-24 pt-2">
              <div className="text-center p-2 bg-neon-purple/20 border-2 border-neon-purple rounded">
                <div className="text-lg mb-1">⚙️</div>
                <div className="text-xs font-semibold">System</div>
              </div>
            </div>
            <motion.div
              className="flex-1 p-4 bg-neon-purple/10 border-2 border-neon-purple rounded-lg"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5 }}
              style={{ transformOrigin: 'left' }}
            >
              <div className="text-xs font-semibold text-neon-purple mb-2">SYSTEM MESSAGE</div>
              <div className="text-sm font-mono bg-dark-bg p-3 rounded">
                You are a helpful coding assistant. Always write clean, commented code.
                Use TypeScript for examples. Be concise but thorough.
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Sets behavior, tone, and constraints
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* User Message 1 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-24 pt-2">
              <div className="text-center p-2 bg-electric-blue/20 border-2 border-electric-blue rounded">
                <div className="text-lg mb-1">👤</div>
                <div className="text-xs font-semibold">User</div>
              </div>
            </div>
            <motion.div
              className="flex-1 p-4 bg-electric-blue/10 border-2 border-electric-blue rounded-lg"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1 }}
              style={{ transformOrigin: 'left' }}
            >
              <div className="text-xs font-semibold text-electric-blue mb-2">USER MESSAGE</div>
              <div className="text-sm font-mono bg-dark-bg p-3 rounded">
                How do I create a React component?
              </div>
              <div className="text-xs text-gray-400 mt-2">
                The actual question or request
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Assistant Message 1 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-24 pt-2">
              <div className="text-center p-2 bg-forge-orange/20 border-2 border-forge-orange rounded">
                <div className="text-lg mb-1">🤖</div>
                <div className="text-xs font-semibold">Assistant</div>
              </div>
            </div>
            <motion.div
              className="flex-1 p-4 bg-forge-orange/10 border-2 border-forge-orange rounded-lg"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.7 }}
              style={{ transformOrigin: 'left' }}
            >
              <div className="text-xs font-semibold text-forge-orange mb-2">ASSISTANT RESPONSE</div>
              <div className="text-sm font-mono bg-dark-bg p-3 rounded">
                {`// React component example\nfunction MyComponent() {\n  return <div>Hello!</div>\n}`}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                AI's response (follows system instructions)
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* User Message 2 (Follow-up) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-24 pt-2">
              <div className="text-center p-2 bg-electric-blue/20 border-2 border-electric-blue rounded">
                <div className="text-lg mb-1">👤</div>
                <div className="text-xs font-semibold">User</div>
              </div>
            </div>
            <motion.div
              className="flex-1 p-4 bg-electric-blue/10 border-2 border-electric-blue rounded-lg"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.3 }}
              style={{ transformOrigin: 'left' }}
            >
              <div className="text-xs font-semibold text-electric-blue mb-2">USER MESSAGE</div>
              <div className="text-sm font-mono bg-dark-bg p-3 rounded">
                Now add TypeScript types
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Conversation continues with context
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Key Points */}
      <motion.div
        className="mt-6 grid grid-cols-3 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6 }}
      >
        <div className="p-3 bg-neon-purple/10 border border-neon-purple rounded-lg">
          <div className="text-xs font-semibold text-neon-purple mb-1">System Role</div>
          <div className="text-xs text-gray-400">Persistent instructions for all responses</div>
        </div>

        <div className="p-3 bg-electric-blue/10 border border-electric-blue rounded-lg">
          <div className="text-xs font-semibold text-electric-blue mb-1">User Role</div>
          <div className="text-xs text-gray-400">Your questions and requests</div>
        </div>

        <div className="p-3 bg-forge-orange/10 border border-forge-orange rounded-lg">
          <div className="text-xs font-semibold text-forge-orange mb-1">Assistant Role</div>
          <div className="text-xs text-gray-400">AI's responses in conversation</div>
        </div>
      </motion.div>
    </div>
  )
}
