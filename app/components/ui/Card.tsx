import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  children: ReactNode
  variant?: 'default' | 'glass' | 'gradient'
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

export default function Card({
  children,
  variant = 'default',
  hover = false,
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  const baseStyles = 'rounded-xl border transition-all'
  
  const variantStyles = {
    default: 'bg-dark-card border-gray-700',
    glass: 'bg-dark-card/50 backdrop-blur-sm border-gray-700',
    gradient: 'bg-gradient-to-br from-dark-card to-dark-bg border-gray-700',
  }

  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const hoverStyles = hover
    ? 'hover:border-forge-orange hover:shadow-lg hover:shadow-forge-orange/20'
    : ''

  return (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
      whileHover={hover ? { y: -5 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  )
}
