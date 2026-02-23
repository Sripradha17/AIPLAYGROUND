import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number // 0-100
  label?: string
  showValue?: boolean
  variant?: 'default' | 'success' | 'warning' | 'error'
  height?: 'sm' | 'md' | 'lg'
}

export default function ProgressBar({
  value,
  label,
  showValue = true,
  variant = 'default',
  height = 'md',
}: ProgressBarProps) {
  const clampedValue = Math.min(Math.max(value, 0), 100)

  const variantColors = {
    default: 'from-forge-orange to-forge-red',
    success: 'from-green-500 to-emerald-600',
    warning: 'from-yellow-500 to-orange-600',
    error: 'from-red-500 to-red-700',
  }

  const heightStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-300">{label}</span>}
          {showValue && (
            <span className="text-sm font-mono text-forge-orange">{clampedValue}%</span>
          )}
        </div>
      )}
      
      <div className={`w-full bg-dark-bg rounded-full overflow-hidden ${heightStyles[height]}`}>
        <motion.div
          className={`${heightStyles[height]} bg-gradient-to-r ${variantColors[variant]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
