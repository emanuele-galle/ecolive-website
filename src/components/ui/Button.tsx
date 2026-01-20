'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: boolean
  className?: string
  onClick?: () => void
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  icon = true,
  className = '',
  onClick
}: ButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-semibold overflow-hidden group"

  const variants = {
    primary: "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white shadow-lg shadow-[var(--color-primary)]/25",
    secondary: "bg-[var(--color-secondary-dark)] text-white",
    outline: "bg-transparent border-2 border-[var(--color-secondary-dark)] text-[var(--color-secondary-dark)]",
    ghost: "bg-transparent text-[var(--color-secondary-dark)] hover:bg-[var(--color-secondary-dark)]/5"
  }

  const sizes = {
    sm: "px-5 py-2.5 text-sm rounded-xl gap-2",
    md: "px-7 py-3.5 text-base rounded-2xl gap-3",
    lg: "px-10 py-5 text-lg rounded-2xl gap-3"
  }

  const buttonContent = (
    <motion.span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Shine effect on hover */}
      <span className="absolute inset-0 w-full h-full">
        <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-700" />
      </span>

      <span className="relative z-10">{children}</span>

      {icon && (
        <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      )}
    </motion.span>
  )

  if (href) {
    return <Link href={href}>{buttonContent}</Link>
  }

  return <button onClick={onClick}>{buttonContent}</button>
}
