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
  lightToDark: { from: '#FAF7F2', to: '#1E3D30' },
  darkToLight: { from: '#1E3D30', to: '#FAF7F2' },
  darkToNavy: { from: '#1E3D30', to: '#0a1628' },
  navyToLight: { from: '#0a1628', to: '#FAFAFA' },
  lightToNavy: { from: '#F5F5F7', to: '#0a1628' },
  terraToLight: { from: '#C4704B', to: '#FFFCF7' },
  whiteToForest: { from: '#FFFFFF', to: '#1E3D30' },
  forestToWhite: { from: '#1E3D30', to: '#FFFFFF' },
  navyToWhite: { from: '#0a1628', to: '#FFFFFF' },
  charcoalToLight: { from: '#2C2825', to: '#FAF7F2' },
}
