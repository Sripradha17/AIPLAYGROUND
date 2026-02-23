'use client'

import { motion } from 'framer-motion'

export default function MCPDiagram() {
  return (
    <div className="relative h-96">
      {/* Host Application (Left) */}
      <motion.div
        className="absolute left-8 top-1/2 -translate-y-1/2 w-40 h-48 bg-electric-blue/20 border-2 border-electric-blue rounded-lg p-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-center mb-2">
          <div className="text-3xl mb-2">🖥️</div>
          <div className="text-sm font-semibold">Host</div>
          <div className="text-xs text-gray-400 mt-2">
            (Your App)
          </div>
        </div>
        <div className="space-y-1 mt-3">
          <div className="text-xs bg-electric-blue/20 rounded px-2 py-1">Claude</div>
          <div className="text-xs bg-electric-blue/20 rounded px-2 py-1">VS Code</div>
          <div className="text-xs bg-electric-blue/20 rounded px-2 py-1">Custom</div>
        </div>
      </motion.div>

      {/* Bidirectional Arrow */}
      <motion.div
        className="absolute left-52 top-1/2 -translate-y-1/2 w-32 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {/* Arrow Right */}
        <motion.div
          className="relative w-full h-1 bg-gradient-to-r from-electric-blue to-neon-purple mb-2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{ transformOrigin: 'left' }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-neon-purple" />
        </motion.div>
        
        <div className="text-xs font-mono text-neon-purple mb-2">MCP Protocol</div>
        
        {/* Arrow Left */}
        <motion.div
          className="relative w-full h-1 bg-gradient-to-l from-electric-blue to-neon-purple"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          style={{ transformOrigin: 'right' }}
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-8 border-r-neon-purple" />
        </motion.div>
      </motion.div>

      {/* MCP Server (Center) */}
      <motion.div
        className="absolute left-[380px] top-1/2 -translate-y-1/2 w-40 h-48 bg-neon-purple/20 border-2 border-neon-purple rounded-lg p-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="text-center mb-2">
          <div className="text-3xl mb-2">🔌</div>
          <div className="text-sm font-semibold">MCP Server</div>
          <div className="text-xs text-gray-400 mt-2">
            (Middleware)
          </div>
        </div>
        <div className="space-y-1 mt-3">
          <div className="text-xs bg-neon-purple/20 rounded px-2 py-1">Routing</div>
          <div className="text-xs bg-neon-purple/20 rounded px-2 py-1">Auth</div>
          <div className="text-xs bg-neon-purple/20 rounded px-2 py-1">Validation</div>
        </div>
      </motion.div>

      {/* Arrow to Tools */}
      <motion.div
        className="absolute left-[524px] top-1/2 -translate-y-1/2 w-24 h-1 bg-gradient-to-r from-neon-purple to-forge-orange"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        style={{ transformOrigin: 'left' }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-forge-orange" />
      </motion.div>

      {/* Tools (Right) */}
      <motion.div
        className="absolute right-8 top-8 w-36 h-80 bg-forge-orange/20 border-2 border-forge-orange rounded-lg p-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5 }}
      >
        <div className="text-center mb-3">
          <div className="text-2xl mb-1">🛠️</div>
          <div className="text-sm font-semibold">Tools</div>
        </div>
        <div className="space-y-2">
          <motion.div
            className="text-xs bg-forge-orange/30 rounded px-2 py-2 flex items-center gap-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3 }}
          >
            <span>📁</span> File System
          </motion.div>
          <motion.div
            className="text-xs bg-forge-orange/30 rounded px-2 py-2 flex items-center gap-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.2 }}
          >
            <span>🗄️</span> Database
          </motion.div>
          <motion.div
            className="text-xs bg-forge-orange/30 rounded px-2 py-2 flex items-center gap-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.4 }}
          >
            <span>🌐</span> Web APIs
          </motion.div>
          <motion.div
            className="text-xs bg-forge-orange/30 rounded px-2 py-2 flex items-center gap-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.6 }}
          >
            <span>🔍</span> Search
          </motion.div>
          <motion.div
            className="text-xs bg-forge-orange/30 rounded px-2 py-2 flex items-center gap-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.8 }}
          >
            <span>📊</span> Analytics
          </motion.div>
        </div>
      </motion.div>

      {/* Data flow particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-neon-purple rounded-full"
          initial={{ left: '15%', top: '50%', opacity: 0 }}
          animate={{
            left: ['15%', '85%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            delay: 4 + i * 0.5,
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
        />
      ))}

      {/* Label */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.5 }}
      >
        <div className="font-semibold text-neon-purple">MCP enables standardized communication</div>
        <div className="text-xs text-gray-400 mt-1">between AI hosts and external tools</div>
      </motion.div>
    </div>
  )
}
