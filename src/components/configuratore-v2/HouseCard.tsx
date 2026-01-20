'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Home, Layers } from 'lucide-react'
import type { HouseType } from '@/lib/configuratore-v2/types'
import { houseConfigurations } from '@/lib/configuratore-v2/configurations'

interface HouseCardProps {
  type: HouseType
  isHovered: boolean
  otherHovered: boolean
  onHover: (hovered: boolean) => void
  onSelect: () => void
}

export default function HouseCard({
  type,
  isHovered,
  otherHovered,
  onHover,
  onSelect,
}: HouseCardProps) {
  const config = houseConfigurations[type]
  const Icon = type === '1-piano' ? Home : Layers

  return (
    <motion.div
      className="relative h-full cursor-pointer overflow-hidden"
      animate={{
        width: isHovered ? '55%' : otherHovered ? '45%' : '50%',
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onSelect}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={config.heroImage}
          alt={config.label}
          fill
          className="object-cover transition-transform duration-700"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
          priority
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: isHovered
              ? 'linear-gradient(to top, rgba(30, 61, 48, 0.95) 0%, rgba(30, 61, 48, 0.6) 40%, rgba(30, 61, 48, 0.3) 100%)'
              : 'linear-gradient(to top, rgba(30, 61, 48, 0.9) 0%, rgba(30, 61, 48, 0.5) 50%, rgba(30, 61, 48, 0.3) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 lg:p-12">
        {/* Icon Badge */}
        <motion.div
          className="absolute top-8 left-8 lg:top-12 lg:left-12"
          animate={{
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-4">
          {/* Label */}
          <motion.h2
            className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white"
            animate={{
              y: isHovered ? -10 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            {config.label}
          </motion.h2>

          {/* Min sqm badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C4704B]/90 backdrop-blur-sm rounded-full"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-white font-semibold">Da {config.minSqm} mq</span>
          </motion.div>

          {/* Description - visible on hover */}
          <motion.p
            className="text-white/80 text-base lg:text-lg max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {config.description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0.7,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white text-[#1E3D30] font-semibold rounded-full shadow-lg group">
              <span>Scopri</span>
              <ArrowRight
                className="w-5 h-5 transition-transform duration-300"
                style={{
                  transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Hover Border Glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? 'inset 0 0 0 3px rgba(196, 112, 75, 0.5)'
              : 'inset 0 0 0 0px rgba(196, 112, 75, 0)',
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  )
}
