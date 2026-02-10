'use client'

interface SectionDividerProps {
  from: string
  to: string
  height?: string
  className?: string
}

export default function SectionDivider({
  from,
  to,
  height = '120px',
  className = '',
}: SectionDividerProps) {
  return (
    <div
      className={`w-full ${className}`}
      style={{
        height,
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
      aria-hidden="true"
    />
  )
}

// Preset variants for common transitions
export const dividerPresets = {
  lightToDark: { from: '#F5F5F7', to: '#1D1D1F' },
  darkToLight: { from: '#1D1D1F', to: '#F5F5F7' },
  darkToNavy: { from: '#1D1D1F', to: '#0a1628' },
  navyToLight: { from: '#0a1628', to: '#FAFAFA' },
  lightToNavy: { from: '#F5F5F7', to: '#0a1628' },
  terraToLight: { from: '#A0845C', to: '#FFFFFF' },
  whiteToForest: { from: '#FFFFFF', to: '#1D1D1F' },
  forestToWhite: { from: '#1D1D1F', to: '#FFFFFF' },
  navyToWhite: { from: '#0a1628', to: '#FFFFFF' },
  charcoalToLight: { from: '#2C2825', to: '#F5F5F7' },
}
