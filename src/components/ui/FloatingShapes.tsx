'use client'

import { motion } from 'framer-motion'

interface FloatingShapesProps {
  variant?: 'hero' | 'section' | 'minimal'
  className?: string
}

export default function FloatingShapes({ variant = 'hero', className = '' }: FloatingShapesProps) {
  if (variant === 'minimal') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <motion.div
          className="absolute top-20 right-10 w-48 h-48 bg-[var(--color-primary)]/10 rounded-full blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    )
  }

  if (variant === 'section') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <motion.div
          className="absolute top-10 right-0 w-64 h-64 bg-[var(--color-primary)]/8 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-10 w-56 h-56 bg-[var(--color-secondary)]/10 rounded-full blur-3xl"
          animate={{ x: [0, -25, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    )
  }

  // Hero variant (default)
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-[var(--color-primary)]/15 rounded-full blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-48 h-48 bg-[var(--color-sage)]/10 rounded-full blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}
