'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BentoItemProps {
  children: ReactNode
  className?: string
  size?: 'small' | 'medium' | 'large'
  delay?: number
  hoverEffect?: boolean
}

export function BentoItem({
  children,
  className = '',
  size = 'medium',
  delay = 0,
  hoverEffect = true
}: BentoItemProps) {
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
    large: 'col-span-1 row-span-1 md:col-span-2 md:row-span-2'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={hoverEffect ? {
        y: -8,
        transition: { duration: 0.3 }
      } : undefined}
      className={`
        ${sizeClasses[size]}
        relative overflow-hidden rounded-3xl
        bg-gradient-to-br from-white to-[#F5F5F7]
        border border-[#EDE6DB]/60
        shadow-sm hover:shadow-xl
        transition-shadow duration-500
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}

interface BentoGridProps {
  children: ReactNode
  className?: string
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div className={`
      grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4
      gap-4 md:gap-6
      auto-rows-[minmax(180px,auto)]
      ${className}
    `}>
      {children}
    </div>
  )
}

interface BentoFeatureCardProps {
  icon: ReactNode
  title: string
  description?: string
  size?: 'small' | 'medium' | 'large'
  color?: string
  delay?: number
  gradient?: string
}

export function BentoFeatureCard({
  icon,
  title,
  description,
  size = 'medium',
  color = '#1D1D1F',
  delay = 0,
  gradient
}: BentoFeatureCardProps) {
  const isLarge = size === 'large'

  return (
    <BentoItem size={size} delay={delay}>
      {/* Background gradient */}
      {gradient && (
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: gradient }}
        />
      )}

      {/* Hover gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}15 0%, transparent 70%)`
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      <div className={`
        relative z-10 h-full p-6 md:p-8
        flex flex-col
        ${isLarge ? 'justify-between' : 'justify-center'}
      `}>
        {/* Icon */}
        <motion.div
          className={`
            rounded-2xl flex items-center justify-center
            ${isLarge ? 'w-16 h-16 mb-6' : 'w-12 h-12 mb-4'}
          `}
          style={{ backgroundColor: `${color}15` }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <div style={{ color }} className={isLarge ? 'w-8 h-8' : 'w-6 h-6'}>
            {icon}
          </div>
        </motion.div>

        {/* Title */}
        <h3 className={`
          font-bold text-[#1D1D1F]
          ${isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}
        `}>
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className={`
            text-[#86868B] leading-relaxed mt-3
            ${isLarge ? 'text-base md:text-lg' : 'text-sm'}
          `}>
            {description}
          </p>
        )}

        {/* CTA for large cards */}
        {isLarge && (
          <motion.div
            className="mt-6 flex items-center gap-2 text-sm font-medium"
            style={{ color }}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.3 }}
          >
            <span>Scopri di piu</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        )}
      </div>
    </BentoItem>
  )
}
