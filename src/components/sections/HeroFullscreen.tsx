'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import BlurText from '@/components/ui/BlurText'

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
  heroTitle = 'Abitare il futuro, in armonia con la natura',
  heroSubtitle = 'Progettiamo e realizziamo case prefabbricate in legno certificate Classe A4. Design su misura, montaggio in 1 giorno, consegna in 60 giorni.',
}: HeroFullscreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const imageUrl = heroImage?.url || '/images/luxury/gallery-1.jpg'
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

      {/* Clean gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 z-[1]" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {heroSubtitle}
          </motion.p>

          {/* Trust indicators - simple text with dot separators */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2 mb-12"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {['Classe A4', 'Garanzia 30 Anni', 'Made in Italy', 'Montaggio in 1 Giorno'].map(
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <Link
              href="/tipologie"
              className="inline-flex items-center px-8 py-4 bg-[#A0845C] hover:bg-[#856B45] text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-[1.02]"
            >
              Scopri le Tipologie
            </Link>
            <Link
              href="/contatti"
              className="inline-flex items-center px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold text-lg rounded-xl border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-[1.02]"
            >
              Richiedi Consulenza
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - animated line */}
      <motion.div
        className="relative z-10 flex flex-col items-center pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-white/40 text-xs uppercase tracking-[0.2em] mb-3 font-medium">
          Scorri
        </span>
        <div className="relative w-px h-12 bg-white/15 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[#A0845C] rounded-full"
            animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
