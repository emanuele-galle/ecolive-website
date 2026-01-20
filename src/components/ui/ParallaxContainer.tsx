'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useMouseParallax, useMouseTilt, useMouseFollow } from '@/lib/hooks/useMouseParallax'

// ============================================
// ParallaxContainer - Generic parallax wrapper
// ============================================

interface ParallaxContainerProps {
  children: ReactNode
  effect?: 'translate' | 'tilt' | 'both'
  intensity?: number
  className?: string
  as?: 'div' | 'section' | 'article'
}

/**
 * ParallaxContainer
 *
 * Wraps content with mouse-based parallax effects.
 * Use effect="translate" for position shift, "tilt" for 3D rotation, "both" for combined.
 *
 * @example
 * <ParallaxContainer effect="both" intensity={0.8}>
 *   <Image src={hero} ... />
 * </ParallaxContainer>
 */
export function ParallaxContainer({
  children,
  effect = 'translate',
  intensity = 1,
  className = '',
  as = 'div'
}: ParallaxContainerProps) {
  const parallax = useMouseParallax({ intensity })
  const Component = motion[as]

  const style = {
    ...(effect === 'translate' || effect === 'both' ? { x: parallax.x, y: parallax.y } : {}),
    ...(effect === 'tilt' || effect === 'both' ? {
      rotateX: parallax.rotateX,
      rotateY: parallax.rotateY,
      transformPerspective: 1000
    } : {})
  }

  return (
    <Component className={className} style={style}>
      {children}
    </Component>
  )
}

// ============================================
// TiltCard - 3D tilt card wrapper
// ============================================

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxRotation?: number
  scale?: number
  glareEnabled?: boolean
}

/**
 * TiltCard
 *
 * A card that tilts in 3D based on mouse position within the element.
 *
 * @example
 * <TiltCard maxRotation={10} scale={1.03}>
 *   <div className="card-content">...</div>
 * </TiltCard>
 */
export function TiltCard({
  children,
  className = '',
  maxRotation = 8,
  scale = 1.02,
  glareEnabled = false
}: TiltCardProps) {
  const { ref, rotateX, rotateY, scale: scaleValue, handlers } = useMouseTilt({
    maxRotation,
    scale
  })

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX,
        rotateY,
        scale: scaleValue,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d'
      }}
      {...handlers}
    >
      {children}

      {/* Optional glare effect */}
      {glareEnabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 100%)',
            opacity: 0.5
          }}
        />
      )}
    </motion.div>
  )
}

// ============================================
// FloatingElement - Slow mouse-following element
// ============================================

interface FloatingElementProps {
  children: ReactNode
  className?: string
  /** Layer 1 = slowest, 3 = fastest */
  layer?: 1 | 2 | 3
  /** Custom intensity override */
  intensity?: number
}

/**
 * FloatingElement
 *
 * Decorative elements that lazily follow the mouse.
 * Use different layers for depth effect (parallax layers).
 *
 * @example
 * <FloatingElement layer={1}>
 *   <div className="w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
 * </FloatingElement>
 */
export function FloatingElement({
  children,
  className = '',
  layer = 2,
  intensity
}: FloatingElementProps) {
  // Layer config: slower = more delay, less intensity
  const layerConfig = {
    1: { delay: 3, intensity: 0.15 },   // Slowest, furthest back
    2: { delay: 2, intensity: 0.25 },   // Medium
    3: { delay: 1.2, intensity: 0.4 }   // Fastest, closest
  }

  const config = layerConfig[layer]
  const { x, y } = useMouseFollow({
    delay: config.delay,
    intensity: intensity ?? config.intensity
  })

  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  )
}

// ============================================
// DepthLayer - Position-based depth parallax
// ============================================

interface DepthLayerProps {
  children: ReactNode
  className?: string
  /** Depth from 0 (stationary) to 1 (max movement) */
  depth?: number
  /** Reverse direction */
  invert?: boolean
}

/**
 * DepthLayer
 *
 * Create depth illusion with multiple layers moving at different speeds.
 *
 * @example
 * <DepthLayer depth={0.1}> // Background - slow </DepthLayer>
 * <DepthLayer depth={0.5}> // Midground - medium </DepthLayer>
 * <DepthLayer depth={1}>   // Foreground - fast </DepthLayer>
 */
export function DepthLayer({
  children,
  className = '',
  depth = 0.5,
  invert = false
}: DepthLayerProps) {
  const { x, y } = useMouseParallax({
    intensity: depth * (invert ? -1 : 1),
    smoothing: { stiffness: 100 + depth * 100, damping: 15 + depth * 10 }
  })

  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  )
}

// ============================================
// ParallaxImage - Image with parallax shift
// ============================================

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  intensity?: number
  /** Scale image to prevent edge visibility during parallax */
  overflowScale?: number
}

/**
 * ParallaxImage
 *
 * An image that subtly shifts based on mouse position.
 * Includes overflow handling to prevent edge gaps.
 *
 * @example
 * <ParallaxImage
 *   src="/hero.jpg"
 *   alt="Hero"
 *   intensity={0.3}
 *   className="w-full h-full object-cover"
 * />
 */
export function ParallaxImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  intensity = 0.3,
  overflowScale = 1.05
}: ParallaxImageProps) {
  const { x, y } = useMouseParallax({ intensity })

  return (
    <div className={`overflow-hidden ${containerClassName}`}>
      <motion.img
        src={src}
        alt={alt}
        className={className}
        style={{
          x,
          y,
          scale: overflowScale
        }}
      />
    </div>
  )
}

// Export all
export default ParallaxContainer
