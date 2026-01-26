'use client'

import { motion, useInView, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useRef } from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SlidingNumber } from './SlidingNumber'

interface Badge {
  text: string
  icon: LucideIcon
}

interface HeroStatCardProps {
  statValue: number
  statSuffix?: string
  statLabel: string
  badges: Badge[]
  className?: string
}

export default function HeroStatCard({
  statValue,
  statSuffix = '',
  statLabel,
  badges,
  className
}: HeroStatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        'relative h-full rounded-2xl p-8',
        'backdrop-blur-xl bg-white/60',
        'border border-[#C4704B]/20',
        'shadow-xl shadow-black/5',
        'overflow-hidden',
        'group',
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          background: [
            'linear-gradient(135deg, rgba(196, 112, 75, 0.10) 0%, rgba(30, 61, 48, 0.05) 100%)',
            'linear-gradient(135deg, rgba(196, 112, 75, 0.15) 0%, rgba(30, 61, 48, 0.08) 100%)',
            'linear-gradient(135deg, rgba(196, 112, 75, 0.10) 0%, rgba(30, 61, 48, 0.05) 100%)',
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Decorative pattern dots */}
      <motion.div
        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #C4704B 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Mouse-follow glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(196, 112, 75, 0.08), transparent 50%)`
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Hero number with SlidingNumber */}
        <div className="mb-4">
          {isInView && (
            <div className="text-8xl lg:text-9xl font-bold text-[#C4704B] leading-none">
              <SlidingNumber value={statValue} suffix={statSuffix} />
            </div>
          )}
          <p className="text-lg lg:text-xl text-[#1E3D30] font-semibold mt-2">
            {statLabel}
          </p>
        </div>

        {/* Floating badges with enhanced hover */}
        <div className="space-y-3">
          {badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.5, duration: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 20px rgba(196, 112, 75, 0.2)'
                }}
                className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-[#C4704B]/10 shadow-sm cursor-pointer"
                style={{
                  transform: `translateZ(${(index + 1) * 10}px)`,
                }}
              >
                <motion.div
                  className="w-8 h-8 rounded-lg bg-[#C4704B]/10 flex items-center justify-center flex-shrink-0"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-4 h-4 text-[#C4704B]" />
                </motion.div>
                <span className="text-sm text-[#1E3D30] font-medium">
                  {badge.text}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
