'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface GradientFollowerProps {
  // Primary color (CSS color value)
  primaryColor?: string
  // Secondary color (CSS color value)
  secondaryColor?: string
  // Size of the gradient blob (px)
  size?: number
  // Opacity of the gradient (0-1)
  opacity?: number
  // Blur amount (px)
  blur?: number
  // Speed of following (lower = slower/smoother)
  followSpeed?: number
  // Z-index
  zIndex?: number
  // Additional class name
  className?: string
}

/**
 * GradientFollower
 *
 * A soft, ambient gradient that slowly follows the mouse cursor.
 * Creates a premium, dynamic background effect.
 */
export default function GradientFollower({
  primaryColor = 'rgba(196, 112, 75, 0.15)',
  secondaryColor = 'rgba(45, 90, 71, 0.1)',
  size = 600,
  opacity = 1,
  blur = 100,
  followSpeed = 3,
  zIndex = 0,
  className = '',
}: GradientFollowerProps) {
  const [isEnabled, setIsEnabled] = useState(false)

  // Check for hover capability and reduced motion
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

  // Mouse position
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)

  // Slow spring for ambient following effect
  const springConfig = {
    stiffness: 20 / followSpeed,
    damping: 15 / followSpeed,
  }

  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Transform to percentage for CSS positioning
  const gradientX = useTransform(springX, (x) => `${x}px`)
  const gradientY = useTransform(springY, (y) => `${y}px`)

  // Track mouse
  useEffect(() => {
    if (!isEnabled) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isEnabled, mouseX, mouseY])

  // Initialize center position
  useEffect(() => {
    if (typeof window !== 'undefined') {
      mouseX.set(window.innerWidth / 2)
      mouseY.set(window.innerHeight / 2)
    }
  }, [mouseX, mouseY])

  // Static fallback for non-hover devices
  if (!isEnabled) {
    return (
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
        style={{ zIndex }}
      >
        <div
          className="absolute"
          style={{
            width: size,
            height: size,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${primaryColor} 0%, ${secondaryColor} 50%, transparent 70%)`,
            filter: `blur(${blur}px)`,
            opacity,
          }}
        />
      </div>
    )
  }

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex }}
    >
      <motion.div
        className="absolute"
        style={{
          width: size,
          height: size,
          left: gradientX,
          top: gradientY,
          x: '-50%',
          y: '-50%',
          background: `radial-gradient(circle, ${primaryColor} 0%, ${secondaryColor} 50%, transparent 70%)`,
          filter: `blur(${blur}px)`,
          opacity,
          willChange: 'transform',
        }}
      />
    </div>
  )
}
