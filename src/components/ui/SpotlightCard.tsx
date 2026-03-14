'use client'

import React, { useRef, useState, useCallback, useMemo } from 'react'

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string
  spotlightColor?: string
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(196, 112, 75, 0.15)',
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = useCallback<React.MouseEventHandler<HTMLDivElement>>((e) => {
    if (!divRef.current || isFocused) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [isFocused])

  const handleFocus = useCallback(() => { setIsFocused(true); setOpacity(0.6) }, [])
  const handleBlur = useCallback(() => { setIsFocused(false); setOpacity(0) }, [])
  const handleMouseEnter = useCallback(() => setOpacity(0.6), [])
  const handleMouseLeave = useCallback(() => setOpacity(0), [])

  const spotlightStyle = useMemo(() => ({
    opacity,
    background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
  }), [opacity, position.x, position.y, spotlightColor])

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={spotlightStyle}
      />
      {children}
    </div>
  )
}

export default SpotlightCard
