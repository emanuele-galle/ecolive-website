'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'

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

export default function HeroFullscreen({
  heroType = 'image',
  heroImage,
  heroVideo,
  heroVideoPoster,
  heroTitle = 'La Casa dei Tuoi Sogni, in Soli 60 Giorni',
  heroSubtitle = 'Case prefabbricate in legno di alta qualita. Design italiano, efficienza energetica classe A4.',
}: HeroFullscreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const imageUrl = heroImage?.url || '/images/luxury/gallery-1.jpg'
  const videoUrl = heroVideo?.url
  const posterUrl = heroVideoPoster?.url || imageUrl

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Video or Image */}
      {heroType === 'video' && videoUrl ? (
        <>
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              autoPlay muted loop playsInline
              poster={posterUrl}
              onLoadedData={() => setVideoLoaded(true)}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
          {!videoLoaded && posterUrl && (
            <Image src={posterUrl} alt="Hero background" fill className="object-cover" priority />
          )}
        </>
      ) : (
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={heroImage?.alt || 'Casa Ecolive in bioedilizia'}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {heroTitle}
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Link
            href="/tipologie"
            className="inline-flex items-center px-8 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-lg rounded-xl transition-colors duration-300"
          >
            Scopri le Tipologie
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-6 h-6 text-white/50" />
      </motion.div>
    </section>
  )
}
