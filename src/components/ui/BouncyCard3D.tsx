'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BouncyCard3DProps {
  children: ReactNode
  className?: string
}

export function BouncyCard3D({ children, className = '' }: BouncyCard3DProps) {
  return (
    <motion.div
      whileHover={{
        scale: 0.98,
        rotateX: -2,
        rotateY: 2,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20
        }
      }}
      whileTap={{ scale: 0.95 }}
      className={`group relative cursor-pointer ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {children}
    </motion.div>
  )
}

interface Card3DContentProps {
  children: ReactNode
  className?: string
  translateZ?: number
}

export function Card3DContent({
  children,
  className = '',
  translateZ = 20
}: Card3DContentProps) {
  return (
    <motion.div
      className={className}
      style={{
        transform: `translateZ(${translateZ}px)`,
        transformStyle: 'preserve-3d'
      }}
      whileHover={{
        translateZ: translateZ + 10,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.div>
  )
}
