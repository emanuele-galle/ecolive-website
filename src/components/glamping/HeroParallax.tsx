'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ChevronDown, Tent } from 'lucide-react'

interface HeroParallaxProps {
  title: string
  description: string
  category: string
  imageUrl: string
  color: string
}

export default function HeroParallax({
  title,
  description,
  category,
  imageUrl,
  color
}: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // Parallax transforms
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.8])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Title reveal animation variants
  const titleVariants = {
    hidden: {
      clipPath: 'inset(100% 0% 0% 0%)',
      y: 50
    },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeOut' as const,
        delay: 0.3
      }
    }
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
        delay: 0.8
      }
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] max-h-[1000px] overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </motion.div>

      {/* Dynamic Gradient Overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom,
            rgba(0,0,0,0.3) 0%,
            rgba(0,0,0,0.2) 40%,
            rgba(30,61,48,0.9) 100%
          )`,
          opacity: overlayOpacity
        }}
      />

      {/* Animated grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-4"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="absolute top-24 left-4 md:left-8"
        >
          <Link
            href="/tipologie"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Tutte le tipologie</span>
          </Link>
        </motion.div>

        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full border border-white/20 backdrop-blur-sm"
            style={{ backgroundColor: `${color}40` }}
          >
            <Tent className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium tracking-wide">{category}</span>
          </motion.div>

          {/* Title with reveal animation */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight"
              style={{
                textShadow: '0 4px 30px rgba(0,0,0,0.3)',
                willChange: 'transform'
              }}
            >
              {title}
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
          <div className="relative">
            <ChevronDown className="w-6 h-6 text-white/50" />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: color }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1E3D30] to-transparent z-10" />
    </section>
  )
}
