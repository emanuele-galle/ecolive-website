'use client'

import { motion, type Variants } from 'framer-motion'
import { ReactNode, useMemo } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right'

interface ScrollRevealProps {
  children: ReactNode
  direction?: Direction
  delay?: number
  distance?: number
  duration?: number
  threshold?: number
  once?: boolean
  className?: string
}

const getInitialOffset = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up': return { y: distance, x: 0 }
    case 'down': return { y: -distance, x: 0 }
    case 'left': return { x: distance, y: 0 }
    case 'right': return { x: -distance, y: 0 }
  }
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  distance = 40,
  duration = 0.6,
  threshold = 0.2,
  once = true,
  className = '',
}: ScrollRevealProps) {
  const offset = getInitialOffset(direction, distance)

  const viewportConfig = useMemo(() => ({ once, amount: threshold }), [once, threshold])

  const variants: Variants = useMemo(() => ({
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }), [offset.x, offset.y, duration, delay])

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      {children}
    </motion.div>
  )
}
