'use client'

interface SectionTransitionProps {
  from: string
  to: string
  variant?: 'wave' | 'gradient' | 'angle'
  height?: number
  flip?: boolean
  className?: string
}

export default function SectionTransition({
  from,
  to,
  variant = 'wave',
  height = 80,
  flip = false,
  className = '',
}: SectionTransitionProps) {
  const transform = flip ? 'scaleY(-1)' : undefined

  if (variant === 'gradient') {
    return (
      <div
        className={`w-full ${className}`}
        style={{
          height: `${height}px`,
          background: `linear-gradient(to bottom, ${from}, ${to})`,
          transform,
        }}
        aria-hidden="true"
      />
    )
  }

  if (variant === 'angle') {
    return (
      <div className={`relative w-full ${className}`} style={{ height: `${height}px`, transform }} aria-hidden="true">
        <svg
          viewBox={`0 0 1440 ${height}`}
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <rect width="1440" height={height} fill={from} />
          <polygon points={`0,${height * 0.3} 1440,0 1440,${height} 0,${height}`} fill={to} />
        </svg>
      </div>
    )
  }

  // wave (default)
  return (
    <div className={`relative w-full ${className}`} style={{ height: `${height}px`, transform }} aria-hidden="true">
      <svg
        viewBox={`0 0 1440 ${height}`}
        fill="none"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <rect width="1440" height={height} fill={from} />
        <path
          d={`M0,${height * 0.4} C360,${height * 0.1} 1080,${height * 0.7} 1440,${height * 0.3} L1440,${height} L0,${height} Z`}
          fill={to}
        />
      </svg>
    </div>
  )
}

export const transitionPresets = {
  lightToDark: { from: '#FAF7F2', to: '#1E3D30' },
  darkToLight: { from: '#1E3D30', to: '#FAF7F2' },
  warmToDark: { from: '#FFFCF7', to: '#1E3D30' },
  darkToWarm: { from: '#1E3D30', to: '#FFFCF7' },
  terraToDark: { from: '#C4704B', to: '#1E3D30' },
  darkToTerra: { from: '#1E3D30', to: '#C4704B' },
}
