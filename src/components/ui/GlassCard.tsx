'use client'

import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  intensity?: 'light' | 'medium' | 'strong'
  as?: 'div' | 'article' | 'section'
}

const intensityStyles = {
  light: {
    bg: 'rgba(255, 255, 255, 0.05)',
    blur: 'blur(10px)',
    border: 'rgba(255, 255, 255, 0.08)',
  },
  medium: {
    bg: 'rgba(255, 255, 255, 0.08)',
    blur: 'blur(16px)',
    border: 'rgba(255, 255, 255, 0.12)',
  },
  strong: {
    bg: 'rgba(255, 255, 255, 0.12)',
    blur: 'blur(20px)',
    border: 'rgba(255, 255, 255, 0.18)',
  },
}

export default function GlassCard({
  children,
  className = '',
  intensity = 'medium',
  as: Tag = 'div',
}: GlassCardProps) {
  const styles = intensityStyles[intensity]

  return (
    <Tag
      className={`rounded-2xl p-6 ${className}`}
      style={{
        background: styles.bg,
        backdropFilter: styles.blur,
        WebkitBackdropFilter: styles.blur,
        border: `1px solid ${styles.border}`,
      }}
    >
      {children}
    </Tag>
  )
}
