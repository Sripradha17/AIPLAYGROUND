'use client'

import { motion } from 'framer-motion'

interface ControlPanelProps {
  temperature: number
  setTemperature: (value: number) => void
  maxTokens: number
  setMaxTokens: (value: number) => void
  onGenerate: () => void
  isLoading: boolean
}

export default function ControlPanel({
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  onGenerate,
  isLoading,
}: ControlPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-card rounded-xl p-6 border border-gray-700 sticky top-24"
    >
      <h3 className="text-xl font-bold mb-6">Settings</h3>

      {/* Temperature */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-gray-300">
            Temperature
          </label>
          <span className="text-forge-orange font-mono text-sm">
            {temperature.toFixed(2)}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          disabled={isLoading}
          className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Precise</span>
          <span>Balanced</span>
          <span>Creative</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Controls randomness. Lower = more focused, Higher = more creative.
        </p>
      </div>

      {/* Max Tokens */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-gray-300">
            Max Tokens
          </label>
          <span className="text-electric-blue font-mono text-sm">
            {maxTokens}
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="4000"
          step="100"
          value={maxTokens}
          onChange={(e) => setMaxTokens(parseInt(e.target.value))}
          disabled={isLoading}
          className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>100</span>
          <span>4000</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Maximum length of the generated response.
        </p>
      </div>

      {/* Quick Presets */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-300 mb-3 block">
          Quick Presets
        </label>
        <div className="space-y-2">
          <PresetButton
            label="Precise"
            description="Low temp, focused"
            onClick={() => {
              setTemperature(0.3)
              setMaxTokens(1000)
            }}
            disabled={isLoading}
          />
          <PresetButton
            label="Balanced"
            description="Default settings"
            onClick={() => {
              setTemperature(0.7)
              setMaxTokens(2000)
            }}
            disabled={isLoading}
          />
          <PresetButton
            label="Creative"
            description="High temp, long"
            onClick={() => {
              setTemperature(1.2)
              setMaxTokens(3000)
            }}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-dark-bg rounded-lg border border-gray-700">
        <p className="text-xs text-gray-400 leading-relaxed">
          💡 <strong>Tip:</strong> Start with balanced settings. Adjust temperature 
          for more creative or precise outputs.
        </p>
      </div>
    </motion.div>
  )
}

function PresetButton({ 
  label, 
  description, 
  onClick, 
  disabled 
}: { 
  label: string
  description: string
  onClick: () => void
  disabled: boolean
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="w-full p-3 bg-dark-bg rounded-lg border border-gray-700 hover:border-forge-orange transition-all text-left disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <p className="font-semibold text-sm">{label}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </motion.button>
  )
}
