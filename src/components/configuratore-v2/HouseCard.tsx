'use client'

import { useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Home, Layers } from 'lucide-react'
import type { HouseType } from '@/lib/configuratore-v2/types'
import { houseConfigurations } from '@/lib/configuratore-v2/configurations'

const cardTransition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
const scaleTransition = { duration: 0.3 }
const slideTransition = { duration: 0.4 }
const descriptionInitial = { opacity: 0, y: 20 }
const descriptionTransition = { duration: 0.4, delay: 0.1 }

interface HouseCardProps {
  type: HouseType
  isHovered: boolean
  otherHovered: boolean
  onHover: (hovered: boolean) => void
  onSelect: () => void
}

function getCardWidth(isHovered: boolean, otherHovered: boolean): string {
  if (isHovered) return '55%'
  if (otherHovered) return '45%'
  return '50%'
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

  const handleMouseEnter = useCallback(() => onHover(true), [onHover])
  const handleMouseLeave = useCallback(() => onHover(false), [onHover])

  const widthAnimate = useMemo(() => ({
    width: getCardWidth(isHovered, otherHovered),
  }), [isHovered, otherHovered])

  const scaleAnimate = useMemo(() => ({
    scale: isHovered ? 1.1 : 1,
    opacity: isHovered ? 1 : 0.8,
  }), [isHovered])

  const slideAnimate = useMemo(() => ({
    y: isHovered ? -10 : 0,
  }), [isHovered])

  const badgeScaleAnimate = useMemo(() => ({
    scale: isHovered ? 1.05 : 1,
  }), [isHovered])

  const descriptionAnimate = useMemo(() => ({
    opacity: isHovered ? 1 : 0,
    y: isHovered ? 0 : 20,
  }), [isHovered])

  const ctaAnimate = useMemo(() => ({
    opacity: isHovered ? 1 : 0.7,
    y: isHovered ? 0 : 10,
  }), [isHovered])

  const borderGlowAnimate = useMemo(() => ({
    boxShadow: isHovered
      ? 'inset 0 0 0 3px rgba(196, 112, 75, 0.5)'
      : 'inset 0 0 0 0px rgba(196, 112, 75, 0)',
  }), [isHovered])

  const imageStyle = useMemo(() => ({
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  }), [isHovered])

  const overlayStyle = useMemo(() => ({
    background: isHovered
      ? 'linear-gradient(to top, rgba(30, 61, 48, 0.95) 0%, rgba(30, 61, 48, 0.6) 40%, rgba(30, 61, 48, 0.3) 100%)'
      : 'linear-gradient(to top, rgba(30, 61, 48, 0.9) 0%, rgba(30, 61, 48, 0.5) 50%, rgba(30, 61, 48, 0.3) 100%)',
  }), [isHovered])

  const arrowStyle = useMemo(() => ({
    transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
  }), [isHovered])

  return (
    <motion.div
      className="relative h-full cursor-pointer overflow-hidden"
      animate={widthAnimate}
      transition={cardTransition}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={config.heroImage}
          alt={config.label}
          fill
          className="object-cover transition-transform duration-700"
          style={imageStyle}
          priority
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={overlayStyle}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 lg:p-12">
        {/* Icon Badge */}
        <motion.div
          className="absolute top-8 left-8 lg:top-12 lg:left-12"
          animate={scaleAnimate}
          transition={scaleTransition}
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
            animate={slideAnimate}
            transition={slideTransition}
          >
            {config.label}
          </motion.h2>

          {/* Min sqm badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#A0845C]/90 backdrop-blur-sm rounded-full"
            animate={badgeScaleAnimate}
            transition={scaleTransition}
          >
            <span className="text-white font-semibold">Da {config.minSqm} mq</span>
          </motion.div>

          {/* Description - visible on hover */}
          <motion.p
            className="text-white/80 text-base lg:text-lg max-w-md"
            initial={descriptionInitial}
            animate={descriptionAnimate}
            transition={descriptionTransition}
          >
            {config.description}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            animate={ctaAnimate}
            transition={slideTransition}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white text-[#1D1D1F] font-semibold rounded-full shadow-lg group">
              <span>Scopri</span>
              <ArrowRight
                className="w-5 h-5 transition-transform duration-300"
                style={arrowStyle}
              />
            </div>
          </motion.div>
        </div>

        {/* Hover Border Glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={borderGlowAnimate}
          transition={slideTransition}
        />
      </div>
    </motion.div>
  )
}
