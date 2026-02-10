'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState, useMemo } from 'react'
import BlurText from '@/components/ui/BlurText'
import InfiniteMarquee from '@/components/ui/InfiniteMarquee'

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

/* Floating particles background */
function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 8 + 12,
        delay: Math.random() * 5,
      })),
    []
  )

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, 20, -20, 0],
            opacity: [0, 0.6, 0.3, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* Animated gradient orbs */
function GradientOrbs() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(196,112,75,0.4) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(30,61,48,0.5) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -60, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

const marqueeItems = [
  'Bioedilizia',
  'Classe A4',
  '30 Anni Garanzia',
  'Sistema X-Frame',
  'Made in Italy',
  '60 Giorni',
  'Zero Sprechi',
  'Efficienza Energetica',
]

const trustBadges = [
  { label: 'Garanzia 30 Anni', icon: '🛡' },
  { label: 'Classe A4', icon: '⚡' },
  { label: '100% Made in Italy', icon: '🇮🇹' },
  { label: '60 Giorni', icon: '⏱' },
]

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
    <section className="relative min-h-screen flex flex-col overflow-hidden">
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

      {/* Dramatic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25 z-[1]" />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 200px 60px rgba(0,0,0,0.4)',
        }}
      />

      {/* Animated gradient orbs */}
      <GradientOrbs />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <BlurText
            text={heroTitle}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]"
            delay={100}
            animateBy="words"
            direction="bottom"
          />

          <motion.p
            className="text-lg sm:text-xl text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {heroSubtitle}
          </motion.p>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-white/70 text-sm"
              >
                <span className="text-base">{badge.icon}</span>
                <span className="font-medium">{badge.label}</span>
              </div>
            ))}
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
              className="inline-flex items-center px-8 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              Scopri le Tipologie
            </Link>
            <a
              href="tel:+390961234567"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-lg rounded-xl border border-white/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <Phone className="w-5 h-5" />
              Chiama Ora
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - animated line + dot */}
      <motion.div
        className="relative z-10 flex flex-col items-center pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-white/40 text-xs uppercase tracking-[0.2em] mb-3 font-medium">Scorri</span>
        <div className="relative w-px h-12 bg-white/15 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[#C4704B] rounded-full"
            animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* Marquee strip at bottom */}
      <div className="relative z-10 bg-black/40 backdrop-blur-sm border-t border-white/10 py-4">
        <InfiniteMarquee
          items={marqueeItems}
          speed={25}
          className="text-white/60"
        />
      </div>
    </section>
  )
}
