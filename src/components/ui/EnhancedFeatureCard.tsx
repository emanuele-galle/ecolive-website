'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface EnhancedFeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  stats?: { label: string; value: string }[]
  badge?: { text: string; icon: LucideIcon }
  gradient?: string
  children?: ReactNode
  className?: string
}

export default function EnhancedFeatureCard({
  icon: Icon,
  title,
  description,
  stats,
  badge,
  gradient = 'from-[#C4704B]/20 to-[#1E3D30]/20',
  children,
  className = ''
}: EnhancedFeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className={`relative h-full rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-[#C4704B]/20 p-6 overflow-hidden ${className}`}
      style={{
        rotateY,
        rotateX,
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(196, 112, 75, 0.25)',
        transition: { duration: 0.2 }
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0`}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(196, 112, 75, 0.2), transparent 70%)',
          }}
        />
      )}

      {/* Content with 3D transform */}
      <motion.div
        className="relative z-10"
        style={{
          transform: 'translateZ(50px)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Icon with bounce animation */}
        <motion.div
          className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#C4704B] to-[#1E3D30] mb-4"
          whileHover={{
            scale: 1.1,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.5 }
          }}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#1E3D30] mb-2">{title}</h3>

        {/* Description */}
        <p className="text-[#6B6560] text-sm mb-4">{description}</p>

        {/* Stats */}
        {stats && (
          <div className="space-y-2 mb-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="flex justify-between items-center text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isHovered ? 1 : 0.7, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <span className="text-[#6B6560]">{stat.label}</span>
                <span className="font-bold text-[#C4704B]">{stat.value}</span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Badge */}
        {badge && (
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E3D30]/10 border border-[#1E3D30]/20"
            whileHover={{ scale: 1.05 }}
          >
            <badge.icon className="w-3.5 h-3.5 text-[#1E3D30]" />
            <span className="text-xs font-medium text-[#1E3D30]">{badge.text}</span>
          </motion.div>
        )}

        {/* Custom children */}
        {children}
      </motion.div>

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-[#C4704B]/0"
        animate={{
          borderColor: isHovered ? 'rgba(196, 112, 75, 0.5)' : 'rgba(196, 112, 75, 0)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
