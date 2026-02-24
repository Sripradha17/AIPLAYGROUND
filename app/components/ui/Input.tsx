interface InputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
  type?: string
  disabled?: boolean
}

export default function Input({
  value,
  onChange,
  placeholder,
  className = '',
  type = 'text',
  disabled = false,
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        w-full px-4 py-2
        bg-dark-card border border-gray-700 rounded-lg
        text-white placeholder-gray-500
        focus:outline-none focus:ring-2 focus:ring-forge-orange focus:border-transparent
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all
        ${className}
      `}
    />
  )
}
