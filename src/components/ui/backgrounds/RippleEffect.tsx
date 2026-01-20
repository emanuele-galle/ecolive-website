'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Ripple {
  id: number
  x: number
  y: number
  timestamp: number
}

interface RippleEffectProps {
  // Ripple color
  color?: string
  // Max ripple size (px)
  maxSize?: number
  // Animation duration (ms)
  duration?: number
  // Max number of concurrent ripples
  maxRipples?: number
  // Z-index
  zIndex?: number
  // Additional class name
  className?: string
}

/**
 * RippleEffect
 *
 * Creates expanding circular ripples on click.
 * Adds a premium, interactive feel to sections.
 */
export default function RippleEffect({
  color = 'rgba(196, 112, 75, 0.15)',
  maxSize = 400,
  duration = 1000,
  maxRipples = 5,
  zIndex = 5,
  className = '',
}: RippleEffectProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [isEnabled, setIsEnabled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const rippleIdRef = useRef(0)

  // Check for capability
  useEffect(() => {
    const checkCapability = () => {
      const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setIsEnabled(hasHover && !prefersReduced)
    }

    checkCapability()

    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    hoverQuery.addEventListener('change', checkCapability)
    motionQuery.addEventListener('change', checkCapability)

    return () => {
      hoverQuery.removeEventListener('change', checkCapability)
      motionQuery.removeEventListener('change', checkCapability)
    }
  }, [])

  // Add ripple on click
  const handleClick = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple: Ripple = {
      id: rippleIdRef.current++,
      x,
      y,
      timestamp: Date.now(),
    }

    setRipples((prev) => {
      const filtered = prev.slice(-(maxRipples - 1))
      return [...filtered, newRipple]
    })

    // Auto-remove after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, duration)
  }, [maxRipples, duration])

  // Attach click listener
  useEffect(() => {
    if (!isEnabled || !containerRef.current) return

    const container = containerRef.current

    container.addEventListener('click', handleClick)

    return () => {
      container.removeEventListener('click', handleClick)
    }
  }, [isEnabled, handleClick])

  if (!isEnabled) return null

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-auto ${className}`}
      style={{ zIndex }}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              x: '-50%',
              y: '-50%',
              backgroundColor: color,
            }}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{
              width: maxSize,
              height: maxSize,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: duration / 1000,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
