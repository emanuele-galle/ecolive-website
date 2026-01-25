'use client'

import { motion, useInView, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

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

// Animated counter component
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const duration = 2000 // 2 seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out quad
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeProgress * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <div ref={ref} className="text-7xl lg:text-8xl font-bold text-[#C4704B] leading-none">
      {count}
      {suffix}
    </div>
  )
}

export default function HeroStatCard({
  statValue,
  statSuffix = '',
  statLabel,
  badges,
  className
}: HeroStatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
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
        'bg-gradient-to-br from-[#C4704B]/10 to-[#1E3D30]/5',
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
      {/* Decorative pattern dots */}
      <div
        className="absolute inset-0 opacity-5"
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
        {/* Hero number */}
        <div className="mb-4">
          <AnimatedCounter value={statValue} suffix={statSuffix} />
          <p className="text-lg lg:text-xl text-[#1E3D30] font-semibold mt-2">
            {statLabel}
          </p>
        </div>

        {/* Floating badges */}
        <div className="space-y-3">
          {badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.4 }}
                className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-[#C4704B]/10 shadow-sm"
                style={{
                  transform: `translateZ(${(index + 1) * 10}px)`,
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-[#C4704B]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#C4704B]" />
                </div>
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
