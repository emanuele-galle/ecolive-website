'use client'

import { useMemo } from 'react'

interface SectionTransitionProps {
  from: string
  to: string
  height?: number
  className?: string
}

export default function SectionTransition({
  from,
  to,
  height = 120,
  className = '',
}: SectionTransitionProps) {
  const transitionStyle = useMemo(() => ({
    height: `${height}px`,
    background: `linear-gradient(to bottom, ${from}, ${to})`,
  }), [height, from, to])

  return (
    <div
      className={`w-full ${className}`}
      style={transitionStyle}
      aria-hidden="true"
    />
  )
}
