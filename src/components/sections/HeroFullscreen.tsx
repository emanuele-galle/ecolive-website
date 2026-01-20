'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useMouseParallax, useMouseFollow } from '@/lib/hooks/useMouseParallax'
import GradientFollower from '@/components/ui/backgrounds/GradientFollower'

interface HeroMedia {
  url?: string
  alt?: string
}

interface HeroFullscreenProps {
  heroType?: 'image' | 'video'
  heroImage?: HeroMedia | null
  heroVideo?: HeroMedia | null
  heroVideoPoster?: HeroMedia | null
  heroTitle?: string
  heroSubtitle?: string
}

const defaultImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'

export default function HeroFullscreen({
  heroType = 'image',
  heroImage,
  heroVideo,
  heroVideoPoster,
  heroTitle = 'In soli 30 giorni la Casa dei tuoi Sogni diventa Realta',
  heroSubtitle = 'Costruiamo il tuo sogno con qualita certificata e design italiano.',
}: HeroFullscreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Mouse parallax hooks
  const imageParallax = useMouseParallax({ intensity: 0.3 })
  const contentParallax = useMouseParallax({ intensity: 0.15 })
  const floatingSlow = useMouseFollow({ intensity: 0.2, delay: 3 })
  const floatingMedium = useMouseFollow({ intensity: 0.35, delay: 2 })

  const imageUrl = heroImage?.url || defaultImage
  const videoUrl = heroVideo?.url
  const posterUrl = heroVideoPoster?.url || imageUrl

  // Split title for styling
  const titleParts = heroTitle.split(' ')
  const firstPart = titleParts.slice(0, Math.ceil(titleParts.length / 2)).join(' ')
  const secondPart = titleParts.slice(Math.ceil(titleParts.length / 2)).join(' ')

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Interactive gradient follower - ambient background effect */}
      <GradientFollower
        primaryColor="rgba(196, 112, 75, 0.12)"
        secondaryColor="rgba(45, 90, 71, 0.08)"
        size={800}
        blur={120}
        followSpeed={4}
        zIndex={1}
      />

      {/* Floating decorative shapes - Mouse following */}
      <motion.div
        className="absolute top-20 -left-20 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-[100px] pointer-events-none z-[2]"
        style={{ x: floatingSlow.x, y: floatingSlow.y }}
      />
      <motion.div
        className="absolute -bottom-20 right-10 w-80 h-80 bg-[var(--color-secondary)]/15 rounded-full blur-[80px] pointer-events-none z-[2]"
        style={{ x: floatingMedium.x, y: floatingMedium.y }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-[var(--color-primary-light)]/8 rounded-full blur-[60px] pointer-events-none z-[2]"
        style={{ x: floatingSlow.x, y: floatingSlow.y }}
      />

      {/* Background Video or Image with Parallax */}
      {heroType === 'video' && videoUrl ? (
        <>
          {/* Video Background */}
          <motion.div
            className="absolute inset-0"
            style={{
              x: imageParallax.x,
              y: imageParallax.y,
              scale: 1.1 // Slightly larger to prevent edge visibility
            }}
          >
            <video
              ref={videoRef}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              autoPlay
              muted
              loop
              playsInline
              poster={posterUrl}
              onLoadedData={() => setVideoLoaded(true)}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </motion.div>
          {/* Fallback poster while loading */}
          {!videoLoaded && posterUrl && (
            <Image
              src={posterUrl}
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />
          )}
        </>
      ) : (
        /* Image Background with Parallax */
        <motion.div
          className="absolute inset-0"
          style={{
            x: imageParallax.x,
            y: imageParallax.y,
            scale: 1.1
          }}
        >
          {imageUrl.startsWith('http') ? (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${imageUrl}')` }}
            />
          ) : (
            <Image
              src={imageUrl}
              alt={heroImage?.alt || 'Hero background'}
              fill
              className="object-cover"
              priority
            />
          )}
        </motion.div>
      )}

      {/* Enhanced Gradient Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/95 via-[var(--color-charcoal)]/50 to-[var(--color-charcoal)]/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-secondary-dark)]/40 to-transparent" />

      {/* Content with subtle parallax */}
      <motion.div
        className="relative z-10 max-w-5xl 3xl:max-w-6xl mx-auto px-4 sm:px-6 3xl:px-8 text-center"
        style={{
          x: contentParallax.x,
          y: contentParallax.y
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <span className="inline-block px-5 py-2.5 mb-8 text-sm font-semibold tracking-wide text-[var(--color-primary)] bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
            Case Prefabbricate in Legno
          </span>
        </motion.div>

        <motion.h1
          className="font-inter text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.4)' }}
        >
          {firstPart}
          <span className="block text-[var(--color-primary-light)] drop-shadow-lg">{secondPart}</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
        >
          {heroSubtitle}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <Link href="/contatti">
            <motion.span
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] hover:from-[var(--color-primary-dark)] hover:to-[var(--color-primary)] text-white font-semibold text-lg rounded-xl shadow-xl shadow-[var(--color-primary)]/30 transition-all duration-300"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Richiedi Preventivo Gratuito
            </motion.span>
          </Link>
          <Link href="/progetti">
            <motion.span
              className="inline-flex items-center justify-center px-8 py-4 bg-white/15 backdrop-blur-md text-white font-semibold text-lg rounded-xl border-2 border-white/40 hover:bg-white/25 hover:border-white/60 transition-all duration-300"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Scopri i Progetti
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/60 text-xs font-medium tracking-widest uppercase">Scorri</span>
          <ChevronDown className="w-6 h-6 text-white/60" />
        </div>
      </motion.div>
    </section>
  )
}
