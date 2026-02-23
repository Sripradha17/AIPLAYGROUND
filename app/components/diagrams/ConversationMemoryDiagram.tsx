'use client'

import { motion } from 'framer-motion'

export default function ConversationMemoryDiagram() {
  const messages = [
    { role: 'user', text: "Hi! My name is Alice.", time: '10:00' },
    { role: 'assistant', text: "Hello Alice! How can I help you today?", time: '10:00' },
    { role: 'user', text: "I like programming in Python.", time: '10:05' },
    { role: 'assistant', text: "Great! Python is wonderful. What do you work on?", time: '10:05' },
    { role: 'user', text: "What's my name?", time: '10:15' },
    { role: 'assistant', text: "Your name is Alice!", time: '10:15' },
  ]

  return (
    <div className="relative h-[540px] p-4">
      {/* Title */}
      <motion.div
        className="mb-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h4 className="text-lg font-semibold text-forge-orange">Conversation Memory</h4>
        <p className="text-xs text-gray-400">How AI remembers context across messages</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {/* Conversation Flow */}
        <div className="space-y-3">
          <div className="text-sm font-semibold text-electric-blue mb-2">Message History</div>
          
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              className={`p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-electric-blue/20 border border-electric-blue ml-0'
                  : 'bg-neon-purple/20 border border-neon-purple mr-0'
              }`}
              initial={{ opacity: 0, x: msg.role === 'user' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.4 }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-semibold ${
                  msg.role === 'user' ? 'text-electric-blue' : 'text-neon-purple'
                }`}>
                  {msg.role === 'user' ? '👤 User' : '🤖 AI'}
                </span>
                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>
              <div className="text-sm">{msg.text}</div>
            </motion.div>
          ))}
        </div>

        {/* Memory Representation */}
        <div className="space-y-4">
          {/* Context Array */}
          <motion.div
            className="p-4 bg-dark-bg border-2 border-forge-orange rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
          >
            <div className="text-sm font-semibold text-forge-orange mb-2">
              Memory Structure
            </div>
            <div className="font-mono text-xs space-y-1 bg-gray-800 p-3 rounded">
              <div className="text-gray-400">messages: [</div>
              <div className="ml-3">{'{'} role: "user", content: "Hi! My name is Alice" {'}'},</div>
              <div className="ml-3">{'{'} role: "assistant", content: "Hello Alice!" {'}'},</div>
              <div className="ml-3">{'{'} role: "user", content: "I like Python" {'}'},</div>
              <div className="ml-3">{'{'} role: "assistant", content: "Great!" {'}'},</div>
              <div className="ml-3 text-green-400">{'{'} role: "user", content: "What's my name?" {'}'},</div>
              <div className="text-gray-400">]</div>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              ✅ Full history sent with each request
            </div>
          </motion.div>

          {/* Memory Strategies */}
          <motion.div
            className="p-4 bg-dark-bg border-2 border-green-500 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
          >
            <div className="text-sm font-semibold text-green-400 mb-3">
              Memory Strategies
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <span className="text-green-400">💾</span>
                <div>
                  <div className="font-semibold">Short-Term (in context)</div>
                  <div className="text-gray-400">Recent messages in prompt</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="text-yellow-400">📝</span>
                <div>
                  <div className="font-semibold">Summarization</div>
                  <div className="text-gray-400">Compress old messages</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="text-blue-400">🗄️</span>
                <div>
                  <div className="font-semibold">Vector DB (RAG)</div>
                  <div className="text-gray-400">Store & retrieve relevant history</div>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <span className="text-purple-400">🎯</span>
                <div>
                  <div className="font-semibold">Entity Extraction</div>
                  <div className="text-gray-400">Remember key facts (name=Alice)</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Token Usage Warning */}
          <motion.div
            className="p-3 bg-orange-900/20 border border-orange-500 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
          >
            <div className="text-xs">
              <span className="font-semibold text-orange-400">⚠️ Token Cost:</span>
              <span className="text-gray-400 ml-2">
                Longer history = more tokens per request
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Implementation Note */}
      <motion.div
        className="mt-4 p-3 bg-dark-bg border border-gray-700 rounded text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
      >
        <div className="text-xs text-gray-400">
          💡 <span className="font-semibold">Pro Tip:</span> Keep last 10-20 messages for balance between context and cost
        </div>
      </motion.div>
    </div>
  )
}
