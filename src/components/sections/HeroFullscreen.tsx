'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback } from 'react'
import BlurText from '@/components/ui/BlurText'

const fadeInUp = { opacity: 0, y: 20 }
const fadeInUpSmall = { opacity: 0, y: 15 }
const visible = { opacity: 1, y: 0 }
const heroSubtitleTransition = { duration: 1, delay: 0.6 }
const heroTrustTransition = { duration: 0.8, delay: 0.9 }
const heroCtaTransition = { duration: 1, delay: 1.1 }
const scrollIndicatorInitial = { opacity: 0 }
const scrollIndicatorAnimate = { opacity: 1 }
const scrollIndicatorTransition = { delay: 1.5, duration: 1 }
const scrollLineAnimate = { height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }
const scrollLineTransition = { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const }

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
  heroTitle = 'La tua casa, in un giorno',
  heroSubtitle = 'EcoLive progetta, produce e costruisce case prefabbricate in legno con il sistema X-Frame. Struttura montata in 1 giornata, classe energetica A4, garanzia 50 anni.',
}: HeroFullscreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const handleVideoLoaded = useCallback(() => setVideoLoaded(true), [])

  const imageUrl = heroImage?.url || '/images/luxury/gallery-1.webp'
  const videoUrl = heroVideo?.url
  const posterUrl = heroVideoPoster?.url || imageUrl

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Video or Image */}
      {heroType === 'video' && videoUrl ? (
        <>
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              autoPlay
              muted
              loop
              playsInline
              poster={posterUrl}
              onLoadedData={handleVideoLoaded}
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

      {/* Clean gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 z-[1]" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center pt-20 lg:pt-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <BlurText
            text={heroTitle}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
            delay={100}
            animateBy="words"
            direction="bottom"
          />

          <motion.p
            className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed font-normal"
            initial={fadeInUp}
            animate={visible}
            transition={heroSubtitleTransition}
          >
            {heroSubtitle}
          </motion.p>

          {/* Trust indicators - simple text with dot separators */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2 mb-12"
            initial={fadeInUpSmall}
            animate={visible}
            transition={heroTrustTransition}
          >
            {['Classe A4', 'Garanzia 50 Anni', 'Montaggio in 1 Giorno', '1.250 €/mq'].map(
              (item, i, arr) => (
                <span key={item} className="flex items-center gap-2 text-white/60 text-sm font-medium">
                  <span>{item}</span>
                  {i < arr.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                  )}
                </span>
              )
            )}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={fadeInUp}
            animate={visible}
            transition={heroCtaTransition}
          >
            <Link
              href="/configuratore"
              className="inline-flex items-center px-8 py-4 bg-[#A0845C] hover:bg-[#856B45] text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-[1.02]"
            >
              Configura la tua Casa
            </Link>
            <Link
              href="/sistema-x-frame"
              className="inline-flex items-center px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold text-lg rounded-xl border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-[1.02]"
            >
              Scopri il Sistema X-Frame
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - animated line */}
      <motion.div
        className="relative z-10 flex flex-col items-center pb-8"
        initial={scrollIndicatorInitial}
        animate={scrollIndicatorAnimate}
        transition={scrollIndicatorTransition}
      >
        <span className="text-white/40 text-xs uppercase tracking-[0.2em] mb-3 font-medium">
          Scorri
        </span>
        <div className="relative w-px h-12 bg-white/15 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[#A0845C] rounded-full"
            animate={scrollLineAnimate}
            transition={scrollLineTransition}
          />
        </div>
      </motion.div>
    </section>
  )
}
