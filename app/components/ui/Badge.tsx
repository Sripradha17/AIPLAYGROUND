import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md'
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1 rounded-full font-medium'
  
  const variantStyles = {
    default: 'bg-gray-700 text-gray-300',
    success: 'bg-green-900/30 text-green-400 border border-green-700',
    warning: 'bg-yellow-900/30 text-yellow-400 border border-yellow-700',
    error: 'bg-red-900/30 text-red-400 border border-red-700',
    info: 'bg-blue-900/30 text-blue-400 border border-blue-700',
  }

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {children}
    </span>
  )
}
