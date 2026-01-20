'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'

// Types
interface MouseParallaxOptions {
  intensity?: number
  respectReducedMotion?: boolean
  smoothing?: { stiffness?: number; damping?: number }
}

interface MouseTiltOptions {
  maxRotation?: number
  perspective?: number
  respectReducedMotion?: boolean
  scale?: number
}

interface MouseFollowOptions {
  intensity?: number
  delay?: number
  respectReducedMotion?: boolean
}

interface MouseParallaxReturn {
  x: MotionValue<number>
  y: MotionValue<number>
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
}

interface MouseTiltReturn {
  ref: React.RefObject<HTMLDivElement | null>
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  scale: MotionValue<number>
  handlers: {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
    onMouseLeave: () => void
  }
}

interface MouseFollowReturn {
  x: MotionValue<number>
  y: MotionValue<number>
}

// Utility: Check if device supports hover (not touch-only)
function useIsHoverDevice(): boolean {
  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    // Check for hover capability
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    setIsHover(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setIsHover(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return isHover
}

// Utility: Check reduced motion preference
function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}

/**
 * useMouseParallax
 *
 * Global mouse tracking with parallax effect.
 * Great for background elements, hero images, decorative shapes.
 *
 * @example
 * const { x, y, rotateX, rotateY } = useMouseParallax({ intensity: 0.5 })
 * <motion.div style={{ x, y }}>...</motion.div>
 */
export function useMouseParallax(options: MouseParallaxOptions = {}): MouseParallaxReturn {
  const {
    intensity = 1,
    respectReducedMotion = true,
    smoothing = { stiffness: 150, damping: 20 }
  } = options

  const isHoverDevice = useIsHoverDevice()
  const prefersReduced = useReducedMotion()
  const shouldAnimate = isHoverDevice && (!respectReducedMotion || !prefersReduced)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring for smooth movement
  const springConfig = {
    stiffness: smoothing.stiffness || 150,
    damping: smoothing.damping || 20
  }

  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Transform values based on intensity
  const x = useTransform(springX, (v) => v * 0.02 * intensity)
  const y = useTransform(springY, (v) => v * 0.02 * intensity)
  const rotateX = useTransform(springY, (v) => v * -0.01 * intensity)
  const rotateY = useTransform(springX, (v) => v * 0.01 * intensity)

  useEffect(() => {
    if (!shouldAnimate) return

    const handler = (e: MouseEvent) => {
      // Calculate position relative to viewport center
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [shouldAnimate, mouseX, mouseY])

  // Reset to center when disabled
  useEffect(() => {
    if (!shouldAnimate) {
      mouseX.set(0)
      mouseY.set(0)
    }
  }, [shouldAnimate, mouseX, mouseY])

  return { x, y, rotateX, rotateY }
}

/**
 * useMouseTilt
 *
 * Element-relative 3D tilt effect for cards and interactive elements.
 * Tilt happens relative to the element's center, not the viewport.
 *
 * @example
 * const { ref, rotateX, rotateY, scale, handlers } = useMouseTilt({ maxRotation: 8 })
 * <motion.div
 *   ref={ref}
 *   style={{ rotateX, rotateY, scale, transformPerspective: 1000 }}
 *   {...handlers}
 * >
 *   Card content
 * </motion.div>
 */
export function useMouseTilt(options: MouseTiltOptions = {}): MouseTiltReturn {
  const {
    maxRotation = 10,
    perspective = 1000,
    respectReducedMotion = true,
    scale: scaleAmount = 1.02
  } = options

  const ref = useRef<HTMLDivElement>(null)
  const isHoverDevice = useIsHoverDevice()
  const prefersReduced = useReducedMotion()
  const shouldAnimate = isHoverDevice && (!respectReducedMotion || !prefersReduced)

  const rotateXValue = useMotionValue(0)
  const rotateYValue = useMotionValue(0)
  const scaleValue = useMotionValue(1)

  // Spring for smooth tilt
  const springConfig = { stiffness: 300, damping: 30 }
  const rotateX = useSpring(rotateXValue, springConfig)
  const rotateY = useSpring(rotateYValue, springConfig)
  const scale = useSpring(scaleValue, { stiffness: 500, damping: 30 })

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!shouldAnimate || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate rotation based on mouse position relative to element center
    const rotateXDeg = ((e.clientY - centerY) / (rect.height / 2)) * -maxRotation
    const rotateYDeg = ((e.clientX - centerX) / (rect.width / 2)) * maxRotation

    rotateXValue.set(rotateXDeg)
    rotateYValue.set(rotateYDeg)
    scaleValue.set(scaleAmount)
  }, [shouldAnimate, maxRotation, scaleAmount, rotateXValue, rotateYValue, scaleValue])

  const onMouseLeave = useCallback(() => {
    rotateXValue.set(0)
    rotateYValue.set(0)
    scaleValue.set(1)
  }, [rotateXValue, rotateYValue, scaleValue])

  return {
    ref,
    rotateX,
    rotateY,
    scale,
    handlers: { onMouseMove, onMouseLeave }
  }
}

/**
 * useMouseFollow
 *
 * Elements that follow the mouse with configurable delay.
 * Perfect for floating decorative elements, cursor followers.
 *
 * @example
 * const { x, y } = useMouseFollow({ intensity: 0.3, delay: 2 })
 * <motion.div style={{ x, y }}>Floating shape</motion.div>
 */
export function useMouseFollow(options: MouseFollowOptions = {}): MouseFollowReturn {
  const {
    intensity = 0.5,
    delay = 1,
    respectReducedMotion = true
  } = options

  const isHoverDevice = useIsHoverDevice()
  const prefersReduced = useReducedMotion()
  const shouldAnimate = isHoverDevice && (!respectReducedMotion || !prefersReduced)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Slower spring for "following" effect
  // Higher delay = slower following
  const springConfig = {
    stiffness: 50 / delay,
    damping: 20 / delay
  }

  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  // Apply intensity
  const x = useTransform(springX, (v) => v * intensity)
  const y = useTransform(springY, (v) => v * intensity)

  useEffect(() => {
    if (!shouldAnimate) return

    const handler = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [shouldAnimate, mouseX, mouseY])

  // Reset when disabled
  useEffect(() => {
    if (!shouldAnimate) {
      mouseX.set(0)
      mouseY.set(0)
    }
  }, [shouldAnimate, mouseX, mouseY])

  return { x, y }
}

// Re-export utility hooks for external use
export { useIsHoverDevice, useReducedMotion }
