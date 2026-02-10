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
  height = 120,
  className = '',
}: SectionTransitionProps) {
  return (
    <div
      className={`w-full ${className}`}
      style={{
        height: `${height}px`,
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
      aria-hidden="true"
    />
  )
}

export const transitionPresets = {
  lightToDark: { from: '#F5F5F7', to: '#1D1D1F' },
  darkToLight: { from: '#1D1D1F', to: '#F5F5F7' },
  whiteToGray: { from: '#FFFFFF', to: '#F5F5F7' },
  grayToWhite: { from: '#F5F5F7', to: '#FFFFFF' },
  whiteToDark: { from: '#FFFFFF', to: '#1D1D1F' },
  darkToWhite: { from: '#1D1D1F', to: '#FFFFFF' },
}
