'use client'

import { ReactNode, lazy, Suspense } from 'react'
import GradientFollower from './backgrounds/GradientFollower'

// Lazy load heavier components
const ParticleField = lazy(() => import('./backgrounds/ParticleField'))
const NoiseOverlay = lazy(() => import('./backgrounds/NoiseOverlay'))
const RippleEffect = lazy(() => import('./backgrounds/RippleEffect'))

interface InteractiveBackgroundProps {
  children: ReactNode
  // Enable gradient follower
  gradient?: boolean
  // Gradient options
  gradientConfig?: {
    primaryColor?: string
    secondaryColor?: string
    size?: number
    opacity?: number
    blur?: number
    followSpeed?: number
  }
  // Enable particles
  particles?: boolean
  // Particle options
  particlesConfig?: {
    particleCount?: number
    color?: string
    maxRadius?: number
    mouseRadius?: number
    lineOpacity?: number
    connectionDistance?: number
  }
  // Enable noise overlay
  noise?: boolean
  // Noise options
  noiseConfig?: {
    opacity?: number
    blendMode?: 'normal' | 'multiply' | 'overlay' | 'soft-light'
    animate?: boolean
  }
  // Enable ripple on click
  ripple?: boolean
  // Ripple options
  rippleConfig?: {
    color?: string
    maxSize?: number
    duration?: number
  }
  // Container class name
  className?: string
  // Whether container is relative positioned
  relative?: boolean
}

/**
 * InteractiveBackground
 *
 * A wrapper component that adds interactive background effects to any section.
 * Combines multiple background effects: gradient follower, particles, noise, ripple.
 *
 * @example
 * <InteractiveBackground gradient noise ripple>
 *   <HeroContent />
 * </InteractiveBackground>
 */
export default function InteractiveBackground({
  children,
  gradient = true,
  gradientConfig = {},
  particles = false,
  particlesConfig = {},
  noise = false,
  noiseConfig = {},
  ripple = false,
  rippleConfig = {},
  className = '',
  relative = true,
}: InteractiveBackgroundProps) {
  return (
    <div className={`${relative ? 'relative' : ''} overflow-hidden ${className}`}>
      {/* Gradient follower effect */}
      {gradient && (
        <GradientFollower
          primaryColor={gradientConfig.primaryColor}
          secondaryColor={gradientConfig.secondaryColor}
          size={gradientConfig.size}
          opacity={gradientConfig.opacity}
          blur={gradientConfig.blur}
          followSpeed={gradientConfig.followSpeed}
          zIndex={0}
        />
      )}

      {/* Particles effect */}
      {particles && (
        <Suspense fallback={null}>
          <ParticleField
            particleCount={particlesConfig.particleCount}
            color={particlesConfig.color}
            maxRadius={particlesConfig.maxRadius}
            mouseRadius={particlesConfig.mouseRadius}
            lineOpacity={particlesConfig.lineOpacity}
            connectionDistance={particlesConfig.connectionDistance}
            zIndex={1}
          />
        </Suspense>
      )}

      {/* Noise overlay */}
      {noise && (
        <Suspense fallback={null}>
          <NoiseOverlay
            opacity={noiseConfig.opacity}
            blendMode={noiseConfig.blendMode}
            animate={noiseConfig.animate}
            zIndex={50}
          />
        </Suspense>
      )}

      {/* Ripple effect */}
      {ripple && (
        <Suspense fallback={null}>
          <RippleEffect
            color={rippleConfig.color}
            maxSize={rippleConfig.maxSize}
            duration={rippleConfig.duration}
            zIndex={5}
          />
        </Suspense>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
