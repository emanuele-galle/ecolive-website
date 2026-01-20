'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { useMotionValue, useSpring, MotionValue } from 'framer-motion'

interface MagneticOptions {
  // Distance from element center where magnetic effect starts (px)
  attractionRadius?: number
  // Strength of the magnetic pull (0-1)
  strength?: number
  // Spring configuration
  springConfig?: {
    stiffness?: number
    damping?: number
  }
  // Whether to respect reduced motion
  respectReducedMotion?: boolean
}

interface MagneticReturn {
  ref: React.RefObject<HTMLDivElement | null>
  x: MotionValue<number>
  y: MotionValue<number>
  isHovered: boolean
  handlers: {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
    onMouseLeave: () => void
    onMouseEnter: () => void
  }
}

/**
 * useMagneticElement
 *
 * Creates a magnetic effect where the element is attracted to the cursor
 * when the mouse is within a certain radius of the element's center.
 *
 * @example
 * const { ref, x, y, handlers } = useMagneticElement({ strength: 0.3 })
 * <motion.button ref={ref} style={{ x, y }} {...handlers}>
 *   Click me
 * </motion.button>
 */
export function useMagneticElement(options: MagneticOptions = {}): MagneticReturn {
  const {
    attractionRadius = 100,
    strength = 0.3,
    springConfig = { stiffness: 150, damping: 15 },
    respectReducedMotion = true,
  } = options

  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)

  // Check for hover capability and reduced motion
  useEffect(() => {
    const checkCapability = () => {
      const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setIsEnabled(hasHover && (!respectReducedMotion || !prefersReduced))
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
  }, [respectReducedMotion])

  // Motion values
  const xValue = useMotionValue(0)
  const yValue = useMotionValue(0)

  // Springs for smooth animation
  const x = useSpring(xValue, springConfig)
  const y = useSpring(yValue, springConfig)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEnabled || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Distance from cursor to element center
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

    // Only apply magnetic effect within attraction radius
    if (distance < attractionRadius) {
      // Strength increases as cursor gets closer
      const normalizedDistance = 1 - distance / attractionRadius
      const magnetStrength = normalizedDistance * strength

      xValue.set(distanceX * magnetStrength)
      yValue.set(distanceY * magnetStrength)
    } else {
      xValue.set(0)
      yValue.set(0)
    }
  }, [isEnabled, attractionRadius, strength, xValue, yValue])

  const onMouseLeave = useCallback(() => {
    setIsHovered(false)
    xValue.set(0)
    yValue.set(0)
  }, [xValue, yValue])

  const onMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  return {
    ref,
    x,
    y,
    isHovered,
    handlers: {
      onMouseMove,
      onMouseLeave,
      onMouseEnter,
    },
  }
}

// Re-export for convenience
export default useMagneticElement
