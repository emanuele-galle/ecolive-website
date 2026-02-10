'use client'

import { motion } from 'framer-motion'

interface AnimatedProgressBarProps {
  value: number // 0-100
  color?: string
  duration?: number
  delay?: number
  height?: string
  className?: string
}

export default function AnimatedProgressBar({
  value,
  color = '#6B8F71',
  duration = 1.5,
  delay = 0,
  height = 'h-2',
  className = ''
}: AnimatedProgressBarProps) {
  return (
    <div className={`relative w-full bg-gray-200 rounded-full overflow-hidden ${height} ${className}`}>
      <motion.div
        className="absolute h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration, delay, ease: 'easeOut' }}
      />
    </div>
  )
}
