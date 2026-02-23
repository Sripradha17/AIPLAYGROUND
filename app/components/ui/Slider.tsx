import { motion } from 'framer-motion'

interface SliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  description?: string
}

export default function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  description,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <span className="text-sm font-mono text-forge-orange">{value}</span>
      </div>
      
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #FF6B35 0%, #FF6B35 ${percentage}%, #1F2937 ${percentage}%, #1F2937 100%)`,
          }}
        />
      </div>
    </div>
  )
}
