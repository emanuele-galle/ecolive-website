'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { useCursor } from '@/lib/context/CursorContext'

export default function CustomCursor() {
  const { variant, isVisible, isEnabled } = useCursor()
  const cursorRef = useRef<HTMLDivElement>(null)

  // Motion values SENZA spring = istantaneo
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  useEffect(() => {
    if (!isEnabled) return

    const handleMouseMove = (e: MouseEvent) => {
      // Aggiornamento DIRETTO, nessun spring
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseLeave = () => {
      cursorX.set(-100)
      cursorY.set(-100)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isEnabled, cursorX, cursorY])

  if (!isEnabled) return null

  const shouldShow = isVisible && variant !== 'hidden'

  // Dimensioni in base al variant
  const dotSize = variant === 'pointer' ? 6 : 8
  const ringSize = variant === 'pointer' ? 48 : 32

  return (
    <>
      {shouldShow && (
        <>
          {/* Dot centrale - colore scuro visibile */}
          <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
            style={{
              x: cursorX,
              y: cursorY,
              width: dotSize,
              height: dotSize,
              translateX: '-50%',
              translateY: '-50%',
              backgroundColor: '#2D5A47', // Verde scuro hardcoded
              boxShadow: '0 0 6px rgba(45, 90, 71, 0.5)',
            }}
          />

          {/* Ring esterno */}
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
            style={{
              x: cursorX,
              y: cursorY,
              width: ringSize,
              height: ringSize,
              translateX: '-50%',
              translateY: '-50%',
              border: '2px solid #C4704B', // Terracotta hardcoded
              opacity: variant === 'pointer' ? 0.9 : 0.6,
            }}
          />
        </>
      )}
    </>
  )
}
