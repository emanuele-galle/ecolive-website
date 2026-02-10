'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Tent, Phone } from 'lucide-react'
import ParticleField from '@/components/ui/backgrounds/ParticleField'
import BlurText from '@/components/ui/BlurText'

interface HeroParallaxProps {
  title: string
  description: string
  category: string
  imageUrl: string
  color: string
}

function NatureBadge({ category, color }: { category: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.6, type: 'spring', stiffness: 200 }}
      className="relative inline-flex"
    >
      {/* Pulsing ring */}
      <motion.div
        className="absolute -inset-3 rounded-full"
        style={{
          border: `1px solid ${color}40`,
        }}
        animate={{ scale: [1, 1.3, 1.3], opacity: [0.5, 0, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute -inset-[2px] rounded-full opacity-60"
        style={{
          background: `linear-gradient(90deg, ${color}, #1D1D1F, ${color}cc, ${color})`,
          backgroundSize: '300% 100%'
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Tent className="w-4 h-4 text-white" />
        </motion.div>
        <span className="text-white text-sm font-medium tracking-wide">{category}</span>
      </div>
    </motion.div>
  )
}

function ScrollIndicator({ color }: { color: string }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8 }}
    >
      <motion.span
        className="text-white/40 text-xs uppercase tracking-[0.25em]"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scopri
      </motion.span>
      <div className="relative">
        <motion.div className="w-[1px] h-10 bg-white/15 overflow-hidden rounded-full">
          <motion.div
            className="w-full bg-white/70 origin-top"
            style={{ height: '100%' }}
            animate={{ scaleY: [0, 1], y: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        {/* Pulse dot at bottom */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        />
      </div>
    </motion.div>
  )
}

/* Floating decorative elements */
function FloatingElements({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating circles */}
      {[
        { size: 6, x: '15%', y: '25%', delay: 0, duration: 7 },
        { size: 4, x: '80%', y: '20%', delay: 2, duration: 9 },
        { size: 8, x: '70%', y: '65%', delay: 4, duration: 11 },
        { size: 3, x: '25%', y: '70%', delay: 1, duration: 8 },
        { size: 5, x: '50%', y: '15%', delay: 3, duration: 10 },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: item.size,
            height: item.size,
            left: item.x,
            top: item.y,
            backgroundColor: i % 2 === 0 ? `${color}60` : 'rgba(255,255,255,0.3)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Animated crossing lines */}
      <motion.div
        className="absolute top-1/3 left-0 w-full h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${color}15, transparent)` }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-2/3 left-0 w-full h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)` }}
        animate={{ x: ['100%', '-100%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
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

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-[#1D1D1F]/95" />
      </motion.div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}35 0%, transparent 70%)`,
            filter: 'blur(80px)'
          }}
          animate={{
            x: [0, 70, -40, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.3, 0.8, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/5 w-[400px] h-[400px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(30,61,48,0.4) 0%, transparent 70%)`,
            filter: 'blur(80px)'
          }}
          animate={{
            x: [0, -50, 60, 0],
            y: [0, 40, -50, 0],
            scale: [1, 0.8, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      {/* Particle field */}
      <ParticleField
        particleCount={30}
        color="rgba(255, 255, 255, 0.35)"
        maxRadius={2}
        connectionDistance={100}
        lineOpacity={0.08}
        className="opacity-40"
      />

      {/* Floating decorative elements */}
      <FloatingElements color={color} />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.3) 100%)'
      }} />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="absolute top-[-120px] left-0 md:left-4"
        >
          <Link
            href="/tipologie"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
          >
            <motion.span
              className="inline-block"
              whileHover={{ x: -6 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.span>
            <span className="text-sm">Tutte le tipologie</span>
          </Link>
        </motion.div>

        {/* Badge */}
        <NatureBadge category={category} color={color} />

        {/* Title with BlurText */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold text-white mt-8 mb-6 leading-none">
          <BlurText
            text={title}
            animateBy="letters"
            delay={50}
            direction="bottom"
            stepDuration={0.5}
            className="justify-center"
          />
        </h1>

        {/* Description with typewriter feel */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-white/65 max-w-2xl mx-auto leading-relaxed font-light"
        >
          {description}
        </motion.p>

        {/* CTA Buttons with enhanced hover */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          <motion.a
            href="/contatti"
            className="relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1D1D1F] font-semibold rounded-2xl overflow-hidden group"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Shine sweep on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Richiedi Preventivo</span>
          </motion.a>
          <motion.a
            href="tel:+3909631951395"
            className="relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-2xl border-2 border-white/25 hover:border-white/50 transition-all backdrop-blur-sm group overflow-hidden"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
            <Phone className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Chiama Ora</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <ScrollIndicator color={color} />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#1D1D1F] via-[#1D1D1F]/50 to-transparent z-10" />
    </section>
  )
}
