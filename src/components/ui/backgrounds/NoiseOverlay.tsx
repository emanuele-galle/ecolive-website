'use client'

import { useEffect, useState, useId } from 'react'

interface NoiseOverlayProps {
  // Opacity of the noise (0-1)
  opacity?: number
  // Blend mode
  blendMode?: 'normal' | 'multiply' | 'overlay' | 'soft-light'
  // Whether to animate (subtle movement)
  animate?: boolean
  // Z-index
  zIndex?: number
  // Additional class name
  className?: string
}

/**
 * NoiseOverlay
 *
 * Adds a subtle grain/noise texture overlay for a premium, film-like effect.
 * Uses SVG filters for better performance.
 */
export default function NoiseOverlay({
  opacity = 0.04,
  blendMode = 'overlay',
  animate = true,
  zIndex = 50,
  className = '',
}: NoiseOverlayProps) {
  const [isEnabled, setIsEnabled] = useState(true)
  const filterId = useId()

  // Check for reduced motion
  useEffect(() => {
    const checkCapability = () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setIsEnabled(!prefersReduced)
    }

    checkCapability()

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionQuery.addEventListener('change', checkCapability)

    return () => {
      motionQuery.removeEventListener('change', checkCapability)
    }
  }, [])

  // Static fallback for reduced motion
  if (!isEnabled && !animate) {
    return null
  }

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        zIndex,
        opacity,
        mixBlendMode: blendMode,
      }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animation: animate && isEnabled ? 'noiseShift 0.5s steps(2) infinite' : undefined,
        }}
      >
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="grayscale"
            />
          </filter>
        </defs>
        <rect
          width="100%"
          height="100%"
          filter={`url(#${filterId})`}
        />
      </svg>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes noiseShift {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-1px, -1px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
    </div>
  )
}
