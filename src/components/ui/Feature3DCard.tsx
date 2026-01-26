'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import AnimatedProgressBar from './AnimatedProgressBar'

interface Stat {
  label: string
  value: string
}

interface Badge {
  text: string
  icon: LucideIcon
}

interface Feature3DCardProps {
  icon: LucideIcon
  title: string
  stats: Stat[]
  badge?: Badge
  gradient?: string
  className?: string
  showProgressBars?: boolean
  progressValues?: number[] // 0-100 for each stat
  animateIcons?: boolean
  customVisual?: React.ReactNode
}

export default function Feature3DCard({
  icon: Icon,
  title,
  stats,
  badge,
  gradient = 'from-[#C4704B]/5 to-[#1E3D30]/5',
  className,
  showProgressBars = false,
  progressValues = [],
  animateIcons = false,
  customVisual
}: Feature3DCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  // Icon animation variants
  const iconAnimation = animateIcons
    ? {
        scale: [1, 1.05, 1],
        rotate: [0, 2, -2, 0]
      }
    : {}

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative h-full rounded-2xl p-6',
        'bg-gradient-to-br',
        gradient,
        'backdrop-blur-xl bg-white/60',
        'border border-[#C4704B]/20',
        'shadow-xl shadow-black/5',
        'overflow-hidden',
        'group',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        boxShadow: '0 0 20px rgba(196, 112, 75, 0.15)',
        borderColor: 'rgba(196, 112, 75, 0.4)'
      }}
    >
      {/* Icon header with animation */}
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C4704B] to-[#A55A3A] flex items-center justify-center shadow-lg"
          animate={iconAnimation}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
        <h3 className="text-xl font-bold text-[#1E3D30]">{title}</h3>
      </div>

      {/* Custom visual (optional) */}
      {customVisual && (
        <div className="mb-6">
          {customVisual}
        </div>
      )}

      {/* Stats grid with progress bars */}
      <div className="space-y-3 mb-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-[#C4704B]/10">
              <span className="text-sm text-gray-700">{stat.label}</span>
              <span className="text-lg font-bold text-[#C4704B]">{stat.value}</span>
            </div>
            {showProgressBars && progressValues[index] !== undefined && (
              <AnimatedProgressBar
                value={progressValues[index]}
                color="#40916c"
                duration={1.5}
                delay={index * 0.15 + 0.3}
                height="h-1.5"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Badge (optional) with enhanced hover */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: stats.length * 0.1 + 0.4 }}
          whileHover={{
            scale: 1.02,
            boxShadow: '0 0 15px rgba(201, 168, 108, 0.4)'
          }}
          className="mt-auto p-4 bg-gradient-to-r from-[#C4704B]/10 to-[#1E3D30]/10 rounded-lg border border-[#C4704B]/20 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <badge.icon className="w-4 h-4 text-[#C4704B]" />
            </motion.div>
            <p className="text-sm text-[#1E3D30] font-semibold">
              {badge.text}
            </p>
          </div>
        </motion.div>
      )}

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C4704B]/0 to-[#C4704B]/0 group-hover:from-[#C4704B]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
    </motion.div>
  )
}
