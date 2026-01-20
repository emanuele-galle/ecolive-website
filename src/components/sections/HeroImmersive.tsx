'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Star, Leaf } from 'lucide-react'
import { useMouseFollow, useMouseParallax } from '@/lib/hooks/useMouseParallax'
import GradientFollower from '@/components/ui/backgrounds/GradientFollower'

export default function HeroImmersive() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  // Mouse follow for decorative shapes
  const floatingSlow = useMouseFollow({ intensity: 0.25, delay: 3 })
  const floatingMedium = useMouseFollow({ intensity: 0.4, delay: 2 })
  const floatingFast = useMouseFollow({ intensity: 0.5, delay: 1.5 })

  // Subtle parallax for hero image
  const imageParallax = useMouseParallax({ intensity: 0.2 })

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#fefefe]">
      {/* Interactive gradient follower - ambient light effect */}
      <GradientFollower
        primaryColor="rgba(232, 93, 4, 0.06)"
        secondaryColor="rgba(27, 73, 101, 0.04)"
        size={700}
        blur={100}
        followSpeed={5}
        zIndex={0}
      />

      {/* Animated geometric shapes - now with mouse follow */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-[#e85d04]/10 rounded-full blur-3xl z-[1]"
        style={{ x: floatingSlow.x, y: floatingSlow.y }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-[#1b4965]/15 rounded-full blur-3xl"
        style={{ x: floatingMedium.x, y: floatingMedium.y }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Additional floating shape */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-48 h-48 bg-[#40916c]/8 rounded-full blur-2xl"
        style={{ x: floatingFast.x, y: floatingFast.y }}
      />

      {/* Split content grid */}
      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">
        {/* Left - Content */}
        <motion.div
          className="flex flex-col justify-center px-6 sm:px-8 lg:px-16 py-24 lg:py-0 order-2 lg:order-1"
          style={{ opacity }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-[#e85d04]/10 rounded-full">
              <Star className="w-4 h-4 text-[#e85d04]" />
              <span className="text-sm font-medium text-[#0a2540]">Dal 1999 leader in bioedilizia</span>
            </div>
          </motion.div>

          <motion.h1
            className="font-inter text-4xl sm:text-5xl lg:text-7xl font-bold text-[#0a2540] mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            Case Prefabbricate
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#e85d04] to-[#f48c06]">
              in Legno
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-[#5c677d] mb-10 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            In soli <strong className="text-[#0a2540]">30 giorni</strong> la casa dei tuoi sogni diventa realta.
            Sistema costruttivo X-Frame 2.0 - Classe energetica A4.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <Link href="/contatti" className="group">
              <motion.span
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#e85d04] to-[#f48c06] text-white font-semibold rounded-2xl shadow-lg shadow-[#e85d04]/25"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -12px rgba(232, 93, 4, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                Richiedi preventivo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </Link>

            <Link href="/progetti" className="group">
              <motion.span
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#0a2540] text-white font-semibold rounded-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Vedi progetti
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right - Image with parallax */}
        <div className="relative overflow-hidden min-h-[50vh] lg:min-h-screen order-1 lg:order-2">
          <motion.div
            className="absolute inset-0"
            style={{
              y,
              scale,
              x: imageParallax.x,
            }}
          >
            <motion.img
              src="/api/media/file/hero.jpg"
              alt="Villa Ecolive"
              className="w-full h-full object-cover"
              style={{
                y: imageParallax.y,
              }}
            />
            {/* Diagonal gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a2540]/20 via-transparent to-[#e85d04]/10" />
          </motion.div>

          {/* Floating eco badge */}
          <motion.div
            className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-auto lg:w-72 p-5 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#40916c]/10 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-[#40916c]" />
              </div>
              <div>
                <div className="font-semibold text-[#0a2540]">100% Ecosostenibile</div>
                <div className="text-sm text-[#5c677d]">Certificato ARCA</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-[#0a2540]/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-3 bg-[#0a2540]/50 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
