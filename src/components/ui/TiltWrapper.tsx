'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TiltWrapperProps {
  children: ReactNode
  className?: string
  tiltRange?: number // degrees (default 7)
}

export default function TiltWrapper({
  children,
  className,
  tiltRange = 7
}: TiltWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Mouse position values (-0.5 to 0.5)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for smooth movement
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 })

  // Transform to rotation (subtle ±7°)
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${tiltRange}deg`, `-${tiltRange}deg`]
  )
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${tiltRange}deg`, `${tiltRange}deg`]
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Normalize to -0.5 to 0.5
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    // Reset to neutral position
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn('h-full', className)}
    >
      {children}
    </motion.div>
  )
}
