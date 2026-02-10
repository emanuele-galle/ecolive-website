'use client'

import { motion } from 'framer-motion'

interface SeismographVisualProps {
  className?: string
  amplitude?: number
  color?: string
}

export default function SeismographVisual({
  className = '',
  amplitude = 20,
  color = '#A0845C'
}: SeismographVisualProps) {
  // Generate seismograph wave path
  const generateWavePath = () => {
    const points = 50
    const width = 200
    const baseY = 30
    let path = `M 0 ${baseY}`

    for (let i = 0; i < points; i++) {
      const x = (i / points) * width
      const variation = Math.sin(i * 0.5) * amplitude + (Math.random() - 0.5) * 5
      const y = baseY + variation
      path += ` L ${x} ${y}`
    }

    return path
  }

  return (
    <svg
      viewBox="0 0 200 60"
      className={`w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grid background */}
      <defs>
        <pattern
          id="grid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="200" height="60" fill="url(#grid)" />

      {/* Center line */}
      <line
        x1="0"
        y1="30"
        x2="200"
        y2="30"
        stroke="#9CA3AF"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* Animated seismic wave */}
      <motion.path
        d={generateWavePath()}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: 1
        }}
        transition={{
          pathLength: { duration: 2, ease: 'easeInOut' },
          opacity: { duration: 0.3 }
        }}
      />

      {/* Oscillating indicator */}
      <motion.circle
        cx="200"
        cy="30"
        r="3"
        fill={color}
        animate={{
          cy: [30, 30 - amplitude / 2, 30 + amplitude / 2, 30],
          scale: [1, 1.2, 1.2, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </svg>
  )
}
