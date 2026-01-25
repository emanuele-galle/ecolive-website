'use client'

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface TimelineEntry {
  title: string
  content: React.ReactNode
}

interface TimelineProps {
  data: TimelineEntry[]
  lineColor?: string
  activeLineGradient?: string
  className?: string
}

export const Timeline = ({
  data,
  lineColor = 'rgba(221, 213, 201, 0.5)',
  activeLineGradient = 'linear-gradient(to bottom, #C4704B, #D4896A, transparent)',
  className
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div
      className={cn('w-full font-sans', className)}
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-32 md:gap-10"
          >
            {/* Sticky year indicator */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Dot */}
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#FAF7F2] flex items-center justify-center">
                <motion.div
                  className="h-4 w-4 rounded-full border-2 border-[#C4704B] bg-[#FAF7F2]"
                  whileInView={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: false }}
                />
              </div>
              {/* Year text */}
              <h3 className="hidden md:block text-xl md:pl-20 md:text-6xl font-bold text-[#1E3D30]">
                {item.title}
              </h3>
            </div>

            {/* Content */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-3xl mb-4 text-left font-bold text-[#1E3D30]">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Vertical line background */}
        <div
          style={{
            height: height + 'px',
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px]"
        >
          {/* Static line */}
          <div
            className="absolute inset-0 w-full"
            style={{ backgroundColor: lineColor }}
          />
          {/* Animated progress line */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full"
            initial={{ background: activeLineGradient }}
            animate={{ background: activeLineGradient }}
          />
        </div>
      </div>
    </div>
  )
}

// Timeline content wrapper with fade-in animation
export const TimelineContent = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Image grid for timeline entries
export const TimelineImageGrid = ({
  images,
  className
}: {
  images: { src: string; alt: string }[]
  className?: string
}) => {
  return (
    <div className={cn('grid grid-cols-2 gap-4', className)}>
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ delay: index * 0.1 }}
          className="relative aspect-video rounded-2xl overflow-hidden"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover shadow-[0_0_24px_rgba(30,61,48,0.1),_0_1px_1px_rgba(0,0,0,0.05),_0_0_0_1px_rgba(30,61,48,0.04)]"
          />
        </motion.div>
      ))}
    </div>
  )
}
