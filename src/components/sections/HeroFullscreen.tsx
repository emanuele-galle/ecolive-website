'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useCallback, useMemo } from 'react'

/* ── animation constants (hoisted outside render) ────────────────────── */
const GOLD = '#A0845C'
const TRUST_ITEMS = ['Classe A4', 'Garanzia 50 Anni', 'Montaggio in 1 Giorno', '1.250 €/mq']

const bgFade = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1.2 } }
const labelLine = { initial: { scaleX: 0 }, animate: { scaleX: 1 }, transition: { duration: 0.6, delay: 0.2, ease: 'easeOut' as const } }
const labelText = { initial: { opacity: 0, x: -12 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: 0.35 } }
const subtitleAnim = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.8 } }
const trustBar = { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.7, delay: 1.0 } }
const ctaAnim = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 1.2 } }
const scrollAnim = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1.5, duration: 0.8 } }
const scrollLineCycle = { animate: { height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }, transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const } }
const accentLineAnim = { initial: { scaleY: 0 }, animate: { scaleY: 1 }, transition: { duration: 0.8, delay: 0.1, ease: 'easeOut' as const } }

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

  const titleWords = useMemo(() => heroTitle.split(' '), [heroTitle])

  /* ── media element (shared between layouts) ────────────────────────── */
  const mediaElement = (
    <>
      {heroType === 'video' && videoUrl ? (
        <>
          <motion.div className="absolute inset-0" {...bgFade}>
            <video
              ref={videoRef}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              autoPlay muted loop playsInline
              poster={posterUrl}
              onLoadedData={handleVideoLoaded}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </motion.div>
          {!videoLoaded && posterUrl && (
            <Image src={posterUrl} alt="Hero background" fill className="object-cover" priority />
          )}
        </>
      ) : (
        <motion.div className="absolute inset-0" {...bgFade}>
          <Image
            src={imageUrl}
            alt={heroImage?.alt || 'Casa Ecolive in bioedilizia'}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      )}

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />

      {/* Grain / noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
    </>
  )

  return (
    <section className="relative h-screen min-h-[700px] max-h-[1100px] overflow-hidden bg-[#0a0a08]">

      {/* ═══════ MOBILE: full-screen with content overlay ═══════ */}
      <div className="lg:hidden relative h-full flex flex-col">
        {/* Background media */}
        <div className="absolute inset-0">{mediaElement}</div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/25 z-[1]" />

        {/* Content overlay */}
        <div className="relative z-10 flex-1 flex flex-col justify-end pb-8 px-6 pt-24">
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <motion.div className="h-px w-8 bg-[#A0845C] origin-left" {...labelLine} />
            <motion.span className="text-[11px] uppercase tracking-[0.25em] text-white/60 font-medium" {...labelText}>
              Case in Bioedilizia
            </motion.span>
          </div>

          {/* Title */}
          <h1 className="mb-5">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block text-5xl sm:text-6xl font-bold text-white tracking-tight leading-[1.05] mr-[0.25em]"
                initial={{ opacity: 0, y: 30, rotateX: 12 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p className="text-base text-white/70 leading-relaxed max-w-md mb-8" {...subtitleAnim}>
            {heroSubtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div className="flex flex-col sm:flex-row items-start gap-3 mb-8" {...ctaAnim}>
            <Link
              href="/configuratore"
              className="inline-flex items-center px-7 py-3.5 bg-[#A0845C] text-white font-semibold text-sm tracking-wide rounded-lg transition-all duration-300 hover:shadow-[0_0_24px_rgba(160,132,92,0.35)]"
            >
              Configura la tua Casa
            </Link>
            <Link
              href="/sistema-x-frame"
              className="group inline-flex items-center px-1 py-3.5 text-white/80 font-medium text-sm tracking-wide transition-colors hover:text-white"
            >
              Scopri il Sistema
              <span className="block ml-2 h-px w-0 bg-white/60 transition-all duration-300 group-hover:w-6" />
            </Link>
          </motion.div>

          {/* Trust bar */}
          <motion.div className="flex flex-wrap items-center gap-x-4 gap-y-1" {...trustBar}>
            {TRUST_ITEMS.map((item, i) => (
              <span key={item} className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/45 font-mono">{item}</span>
                {i < TRUST_ITEMS.length - 1 && <span className="w-px h-3 bg-white/15" />}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ═══════ DESKTOP: split-screen layout ═══════ */}
      <div className="hidden lg:grid lg:grid-cols-[45%_1fr] h-full">

        {/* Left — Content pane */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 2xl:px-28 bg-gradient-to-br from-[#0e0e0c] via-[#111110] to-[#0e0e0c]">
          {/* Label */}
          <div className="flex items-center gap-4 mb-10">
            <motion.div className="h-px w-12 origin-left" style={{ backgroundColor: GOLD }} {...labelLine} />
            <motion.span className="text-xs uppercase tracking-[0.3em] text-white/50 font-medium" {...labelText}>
              Case in Bioedilizia
            </motion.span>
          </div>

          {/* Title */}
          <h1 className="mb-8">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white tracking-[-0.02em] leading-[1.05] mr-[0.22em]"
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p className="text-lg xl:text-xl text-white/55 leading-relaxed max-w-lg mb-12" {...subtitleAnim}>
            {heroSubtitle}
          </motion.p>

          {/* CTAs — side by side */}
          <motion.div className="flex items-center gap-6 mb-16" {...ctaAnim}>
            <Link
              href="/configuratore"
              className="inline-flex items-center px-8 py-4 bg-[#A0845C] text-white font-semibold text-base tracking-wide rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(160,132,92,0.4)] hover:bg-[#b0946c]"
            >
              Configura la tua Casa
            </Link>
            <Link
              href="/sistema-x-frame"
              className="group inline-flex items-center text-white/70 font-medium text-base tracking-wide transition-colors hover:text-white"
            >
              Scopri il Sistema
              <span className="block ml-2 h-px w-0 bg-white/50 transition-all duration-300 group-hover:w-8" />
            </Link>
          </motion.div>

          {/* Trust bar */}
          <motion.div className="flex items-center gap-5" {...trustBar}>
            {TRUST_ITEMS.map((item, i) => (
              <span key={item} className="flex items-center gap-5">
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/35 font-mono">{item}</span>
                {i < TRUST_ITEMS.length - 1 && <span className="w-px h-4 bg-white/10" />}
              </span>
            ))}
          </motion.div>

          {/* Scroll indicator — bottom left */}
          <motion.div className="absolute bottom-10 left-12 xl:left-20 flex items-center gap-3" {...scrollAnim}>
            <div className="relative w-px h-10 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="absolute left-0 w-full bg-[#A0845C] rounded-full" {...scrollLineCycle} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">Scorri</span>
          </motion.div>
        </div>

        {/* Gold accent line between panes */}
        <motion.div
          className="absolute left-[45%] top-0 w-px h-full origin-top z-20"
          style={{ backgroundColor: GOLD }}
          {...accentLineAnim}
        />

        {/* Right — Media pane */}
        <div className="relative">
          {mediaElement}
        </div>
      </div>
    </section>
  )
}
