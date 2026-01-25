'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlowEffectProps {
  children: ReactNode
  color?: string
  secondaryColor?: string
  className?: string
  intensity?: 'low' | 'medium' | 'high'
}

export default function GlowEffect({
  children,
  color = '#1E3D30',
  secondaryColor = '#C4704B',
  className = '',
  intensity = 'medium'
}: GlowEffectProps) {
  const intensityValues = {
    low: { blur: 80, scale: 0.8, opacity: 0.2 },
    medium: { blur: 120, scale: 1, opacity: 0.3 },
    high: { blur: 160, scale: 1.2, opacity: 0.4 }
  }

  const { blur, scale, opacity } = intensityValues[intensity]

  return (
    <div className={`relative ${className}`}>
      {/* Animated glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary glow */}
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{
            width: `${400 * scale}px`,
            height: `${400 * scale}px`,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            filter: `blur(${blur}px)`,
            opacity
          }}
          animate={{
            x: ['-50%', '-40%', '-60%', '-50%'],
            y: ['-50%', '-60%', '-40%', '-50%'],
            scale: [1, 1.1, 0.95, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Secondary glow */}
        <motion.div
          className="absolute top-1/3 right-1/4"
          style={{
            width: `${300 * scale}px`,
            height: `${300 * scale}px`,
            background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)`,
            filter: `blur(${blur}px)`,
            opacity: opacity * 0.7
          }}
          animate={{
            x: ['0%', '15%', '-10%', '0%'],
            y: ['0%', '-20%', '15%', '0%'],
            scale: [1, 0.9, 1.15, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />

        {/* Tertiary subtle glow */}
        <motion.div
          className="absolute bottom-1/3 left-1/3"
          style={{
            width: `${250 * scale}px`,
            height: `${250 * scale}px`,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            filter: `blur(${blur * 1.2}px)`,
            opacity: opacity * 0.5
          }}
          animate={{
            x: ['0%', '-20%', '10%', '0%'],
            y: ['0%', '15%', '-15%', '0%'],
            scale: [1, 1.2, 0.85, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

interface ShimmerButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  className?: string
  variant?: 'primary' | 'secondary'
}

export function ShimmerButton({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary'
}: ShimmerButtonProps) {
  const isPrimary = variant === 'primary'

  const buttonContent = (
    <motion.span
      className={`
        relative inline-flex items-center justify-center gap-2
        px-8 py-4 rounded-2xl font-semibold
        overflow-hidden
        ${isPrimary
          ? 'bg-[#1E3D30] text-white'
          : 'bg-transparent text-[#1E3D30] border-2 border-[#1E3D30]'
        }
        ${className}
      `}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Shimmer effect for primary */}
      {isPrimary && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut'
          }}
        />
      )}

      <span className="relative z-10">{children}</span>
    </motion.span>
  )

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {buttonContent}
      </a>
    )
  }

  return (
    <button onClick={onClick} type="button">
      {buttonContent}
    </button>
  )
}

interface AnimatedGridBackgroundProps {
  color?: string
  className?: string
}

export function AnimatedGridBackground({
  color = '#1E3D30',
  className = ''
}: AnimatedGridBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Static grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(${color} 1px, transparent 1px),
            linear-gradient(90deg, ${color} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Animated scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}30, transparent)`
        }}
        animate={{
          top: ['0%', '100%']
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  )
}
