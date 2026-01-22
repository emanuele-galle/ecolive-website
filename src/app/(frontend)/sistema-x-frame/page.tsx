'use client'

import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SketchfabViewer from '@/components/SketchfabViewer'
import AdaptiveGaussianViewer from '@/components/xframe/AdaptiveGaussianViewer'
import Stratigraphy3D from '@/components/xframe/Stratigraphy3D'
import RenderShowcase from '@/components/xframe/RenderShowcase'
import WhyCostMoreSection from '@/components/sections/WhyCostMoreSection'
import EvolutionTimelineSection from '@/components/xframe/EvolutionTimelineSection'
import InvestmentExcellenceSection from '@/components/xframe/InvestmentExcellenceSection'
import { Check, Phone, ChevronDown } from 'lucide-react'
import SectionDivider from '@/components/ui/SectionDivider'

// AnimatedCounter component
function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2
}: {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: false, margin: "0px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const formatted = value < 1 ? latest.toFixed(2) : Math.floor(latest).toString()
        ref.current.textContent = prefix + formatted + suffix
      }
    })
    return unsubscribe
  }, [springValue, suffix, prefix, value])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

// Technical specs - DATI CORRETTI DA BROCHURE 2025
const technicalSpecs = [
  { label: 'Trasmittanza Parete', value: 0.169, suffix: ' W/m²K', description: 'Isolamento termico superiore' },
  { label: 'Trasmittanza Tetto', value: 0.137, suffix: ' W/m²K', description: 'Massimo comfort abitativo' },
  { label: 'Sfasamento Parete', value: 10.8, suffix: ' ore', description: 'Protezione dal caldo estivo' },
  { label: 'Sfasamento Tetto', value: 14.5, suffix: ' ore', description: 'Inerzia termica ottimale' },
  { label: 'Spessore Parete', value: 29, suffix: ' cm', description: 'Compatto e performante' },
  { label: 'Spessore Tetto', value: 40, suffix: ' cm', description: 'Isolamento massimo' },
]

// Render images for gallery
const renderImages: {
  src: string
  srcFull: string
  title: string
  description: string
  alt: string
  featured: boolean
  category: 'struttura' | 'tetto' | 'viste'
}[] = [
  {
    src: '/images/xframe-render/optimized/spaccato-copertina.webp',
    srcFull: '/images/xframe-render/optimized/spaccato-copertina.webp',
    title: 'Spaccato Sistema X-Frame',
    description: 'Vista completa della stratigrafia costruttiva',
    alt: 'Spaccato costruttivo sistema X-Frame Ecolive',
    featured: true,
    category: 'struttura',
  },
  {
    src: '/images/xframe-render/optimized/render-avanzato-thumb.webp',
    srcFull: '/images/xframe-render/optimized/render-avanzato.webp',
    title: 'Configurazione Avanzata',
    description: 'Versione completa con finiture premium',
    alt: 'Render configurazione avanzata X-Frame',
    featured: false,
    category: 'struttura',
  },
  {
    src: '/images/xframe-render/optimized/render-base-thumb.webp',
    srcFull: '/images/xframe-render/optimized/render-base.webp',
    title: 'Configurazione Base',
    description: 'Struttura essenziale del sistema',
    alt: 'Render configurazione base X-Frame',
    featured: false,
    category: 'struttura',
  },
  {
    src: '/images/xframe-render/optimized/tetto-3-strati-thumb.webp',
    srcFull: '/images/xframe-render/optimized/tetto-3-strati.webp',
    title: 'Tetto a 3 Strati',
    description: 'Dettaglio stratigrafia copertura',
    alt: 'Stratigrafia tetto 3 strati Ecolive',
    featured: true,
    category: 'tetto',
  },
  {
    src: '/images/xframe-render/optimized/tetto-piano-osb-thumb.webp',
    srcFull: '/images/xframe-render/optimized/tetto-piano-osb.webp',
    title: 'Tetto Piano con OSB',
    description: 'Soluzione per coperture piane',
    alt: 'Tetto piano con pannelli OSB',
    featured: false,
    category: 'tetto',
  },
  {
    src: '/images/xframe-render/optimized/tetto-principale-thumb.webp',
    srcFull: '/images/xframe-render/optimized/tetto-principale.webp',
    title: 'Sistema Tetto Principale',
    description: 'Copertura standard X-Frame',
    alt: 'Sistema tetto principale X-Frame',
    featured: false,
    category: 'tetto',
  },
]

// Premium materials data

// Velocita Montaggio Section Component
function VelocitaMontaggioSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32 px-4 bg-gradient-to-b from-[#0a1628] via-[#0f2040] to-[#152822] overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="speed-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a3a5c" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#speed-grid)"/>
        </svg>
      </div>

      {/* Animated Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C4704B]/15 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <motion.div
            className="inline-flex items-center gap-2.5 px-6 py-3 mb-8 bg-white/[0.06] backdrop-blur-md rounded-full border border-white/15"
          >
            <motion.span
              className="w-2.5 h-2.5 bg-[#C4704B] rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-white/90 text-sm font-semibold tracking-widest uppercase">
              Velocita Record
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Il Montaggio Diventa uno{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4896A] to-[#E8956B]">
              Spettacolo
            </span>
          </h2>

          <p className="text-[#7da0b2] text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Tutto e preparato in laboratorio e montato con autogru specializzate.
            Il sogno diventa realta in pochi giorni.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* 30 Minutes */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="relative bg-white/[0.04] backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center group hover:border-[#C4704B]/30 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#C4704B]/0 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 group-hover:from-[#C4704B]/10 transition-all duration-500" />
            <div className="relative">
              <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4896A] to-[#E8956B] mb-4">
                30
              </div>
              <div className="text-2xl font-bold text-white mb-2">minuti</div>
              <p className="text-white/50">Struttura portante montata</p>
            </div>
          </motion.div>

          {/* 1 Day */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="relative bg-gradient-to-br from-[#C4704B]/20 to-[#a85a3a]/10 rounded-2xl p-8 border border-[#C4704B]/30 text-center"
          >
            <div className="text-6xl md:text-7xl font-black text-white mb-4">
              1
            </div>
            <div className="text-2xl font-bold text-white mb-2">giorno</div>
            <p className="text-white/70">Casa completa: pareti, solai, tetto</p>
          </motion.div>

          {/* 100x */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="relative bg-white/[0.04] backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center group hover:border-[#C4704B]/30 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#C4704B]/0 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 group-hover:from-[#C4704B]/10 transition-all duration-500" />
            <div className="relative">
              <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4896A] to-[#E8956B] mb-4">
                100x
              </div>
              <div className="text-2xl font-bold text-white mb-2">piu veloce</div>
              <p className="text-white/50">Rispetto alla muratura tradizionale</p>
            </div>
          </motion.div>
        </div>

        {/* Comparison Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="bg-white/[0.03] backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* X-Frame */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30 mb-4">
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-semibold">X-Frame</span>
              </div>
              <p className="text-white/70 leading-relaxed">
                In <span className="text-white font-bold">30 minuti</span> la struttura portante e montata.
                In <span className="text-white font-bold">un solo giorno</span> l'intera casa prende forma:
                non solo 4 pareti, ma <span className="text-[#C4704B] font-medium">tutta la struttura completa</span>.
              </p>
            </div>

            {/* Divider */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

            {/* Traditional */}
            <div className="text-center md:text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full border border-red-500/30 mb-4">
                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-red-400 font-semibold">Muratura Tradizionale</span>
              </div>
              <p className="text-white/70 leading-relaxed">
                Solo per la struttura portante servono
                <span className="text-white font-bold"> 1-2 mesi</span> nella migliore delle ipotesi.
                Poi inizia tutto il resto.
              </p>
            </div>
          </div>

          {/* Bottom note */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-white/50 text-sm">
              Il rapporto e di <span className="text-[#C4704B] font-bold">centinaia di volte</span>, non 2 o 3 volte.
              Non dipendiamo dalle condizioni meteo: una giornata senza pioggia si trova sempre.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

export default function SistemaXFramePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Refs for sections
  const whatIsRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  // Parallax for What Is section
  const { scrollYProgress: whatIsScrollProgress } = useScroll({
    target: whatIsRef,
    offset: ["start end", "end start"]
  })

  // Parallax for Specs section
  const { scrollYProgress: specsScrollProgress } = useScroll({
    target: specsRef,
    offset: ["start end", "end start"]
  })

  const whatIsInView = useInView(whatIsRef, { once: false, margin: "-100px" })
  const specsInView = useInView(specsRef, { once: false, margin: "-100px" })
  const ctaInView = useInView(ctaRef, { once: false, margin: "-100px" })


  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Full Screen with 3D Render Background */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Layer 1: 3D Render Background with Deep Parallax */}
        <motion.div
          className="absolute inset-0 scale-110"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        >
          <Image
            src="/images/xframe-render/optimized/render-avanzato.webp"
            alt="Sistema X-Frame render 3D"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>

        {/* Layer 2: Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3D30]/85 via-[#1E3D30]/70 to-[#1E3D30]/90" />

        {/* Layer 3: Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 mix-blend-overlay"
          animate={{
            background: [
              'radial-gradient(ellipse at 30% 20%, rgba(196,112,75,0.3) 0%, transparent 50%)',
              'radial-gradient(ellipse at 70% 80%, rgba(196,112,75,0.3) 0%, transparent 50%)',
              'radial-gradient(ellipse at 30% 20%, rgba(196,112,75,0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Layer 4: Grid pattern with medium parallax */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </motion.div>

        {/* Layer 5: Floating orbs with different parallax speeds */}
        <motion.div
          className="absolute top-[10%] right-[5%] w-96 h-96 bg-[#C4704B]/30 rounded-full blur-[100px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[10%] w-72 h-72 bg-[#4a9eff]/20 rounded-full blur-[80px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 120]) }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] left-[60%] w-48 h-48 bg-white/10 rounded-full blur-[60px]"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Layer 6: Geometric shapes with parallax */}
        <motion.div
          className="absolute top-[15%] left-[8%] w-32 h-32 border border-white/10 rotate-45"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, 60]),
            rotate: useTransform(scrollYProgress, [0, 1], [45, 90])
          }}
        />
        <motion.div
          className="absolute bottom-[25%] right-[12%] w-24 h-24 border border-[#C4704B]/20 rotate-12"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, 90]),
            rotate: useTransform(scrollYProgress, [0, 1], [12, -30])
          }}
        />

        {/* Content with inverse parallax (moves slower = feels closer) */}
        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-4"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -50]),
            opacity: heroOpacity
          }}
        >
          <div className="text-center">
            {/* Badge with glow */}
            <motion.span
              className="inline-block px-5 py-2.5 mb-8 text-sm font-semibold text-[#C4704B] bg-white/10 backdrop-blur-md rounded-full border border-[#C4704B]/30 shadow-lg shadow-[#C4704B]/10"
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            >
              <span className="mr-2">◈</span>
              Tecnologia Brevettata
            </motion.span>

            {/* Title with enhanced stagger animation */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 md:mb-8"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.span
                className="block drop-shadow-2xl"
                variants={fadeInUp}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              >
                Sistema Costruttivo
              </motion.span>
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-[#C4704B] via-[#e08860] to-[#C4704B] drop-shadow-2xl"
                variants={fadeInUp}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              >
                X-Frame
              </motion.span>
            </motion.h1>

            {/* Description with blur backdrop */}
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed px-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
            >
              L'innovazione che unisce il meglio di tre sistemi costruttivi: la versatilita del <strong className="text-white">Platform Frame</strong>,
              la solidita dello <strong className="text-white">X-Lam</strong> e l'eleganza del <strong className="text-white">Post & Beam</strong>.
            </motion.p>

            {/* CTA Buttons with enhanced hover */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center px-4 sm:px-0"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
            >
              <Link href="/contatti">
                <motion.span
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#C4704B] to-[#a85a3a] text-white font-semibold text-base sm:text-lg rounded-xl sm:rounded-2xl cursor-pointer shadow-xl shadow-[#C4704B]/30"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px -12px rgba(196, 112, 75, 0.6)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Richiedi Informazioni
                </motion.span>
              </Link>
              <motion.a
                href="#stratigrafia"
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 bg-white/5 backdrop-blur-sm text-white font-semibold text-base sm:text-lg rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Scopri i Dettagli
                <ChevronDown className="w-5 h-5 ml-2" />
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.2 }}
            >
              {[
                { value: '3in1', label: 'Tecnologie Unite' },
                { value: 'A4', label: 'Classe Energetica' },
                { value: '25+', label: 'Anni Garanzia' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center min-w-[80px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + i * 0.1 }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#C4704B]">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator - positioned at very bottom */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          whileHover={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 cursor-pointer"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => document.getElementById('stratigrafia')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="w-5 h-8 rounded-full border border-white/40 flex justify-center pt-1.5">
              <motion.div
                className="w-1 h-1 bg-white/70 rounded-full"
                animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Transition: Hero to What Is X-Frame */}
      <SectionDivider from="#1E3D30" to="#1E3D30" height="80px" />

      {/* Evolution Timeline Section (Redesigned) */}
      <EvolutionTimelineSection />

      {/* Stratigraphy Section - 3D Model */}
      <section id="stratigrafia">
        <Stratigraphy3D />
      </section>

      {/* Investment Excellence Section (Redesigned) */}
      <InvestmentExcellenceSection />

      {/* Why Cost More Section - Educational Material Breakdown */}
      <WhyCostMoreSection />

      {/* Velocita Montaggio Section */}
      <VelocitaMontaggioSection />

      {/* Transition: Velocita Montaggio to 3D Models */}
      <SectionDivider from="#152822" to="#FFFFFF" height="200px" />

      {/* 3D Model Section - Premium Immersive */}
      <section id="modello-3d" className="relative py-28 lg:py-36 px-4 bg-gradient-to-b from-white via-[#FAFAFA] to-[#F5F5F7] overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Dot pattern - ultra subtle */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #1E3D30 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />
          {/* Terracotta glow orb */}
          <div className="absolute top-20 right-[15%] w-[400px] h-[400px] bg-[#C4704B]/10 rounded-full blur-[120px]" />
          {/* Green glow orb */}
          <div className="absolute bottom-40 left-[10%] w-[300px] h-[300px] bg-[#1E3D30]/8 rounded-full blur-[100px]" />
          {/* Accent line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-[#C4704B]/30 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header - Premium Typography */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2 }}
          >
            {/* Badge with glow */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white rounded-full border border-gray-200 shadow-[0_2px_20px_-4px_rgba(196,112,75,0.15)]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-[#C4704B] animate-pulse" />
              <span className="text-[#1E3D30] text-xs font-semibold uppercase tracking-widest">
                Modelli Interattivi
              </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.05]">
              <span className="font-light text-gray-400">Esplora ogni</span>
              <br />
              <span className="font-bold text-[#1E3D30]">dettaglio costruttivo.</span>
            </h2>

            <p className="text-lg lg:text-xl text-gray-500 mt-8 max-w-2xl mx-auto leading-relaxed">
              6 modelli 3D interattivi per scoprire ogni componente del sistema X-Frame.
              <span className="text-[#C4704B] font-medium"> Ruota, zooma, esplora.</span>
            </p>
          </motion.div>

          {/* Main 3D Model - Featured Hero */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <SketchfabViewer
              modelId="e5d5772efd5d44e4a16d08a34d798f02"
              title="Spaccato X-Frame 2.0 - Animato"
              description="Esplora la sezione completa con animazione interattiva: fondazione, struttura portante, isolamento e finiture."
              height="600px"
              autoStart={true}
              featured={true}
            />
          </motion.div>

          {/* Gaussian Splatting 3D Scan */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <AdaptiveGaussianViewer
              fullModelUrl="/models/xframe-scan-raw.ply"
              lightModelUrl="/models/xframe-light.ply"
              fallbackImageUrl="/images/xframe-render/optimized/spaccato-copertina.webp"
              title="Scansione 3D Fotorealistica"
              description="Visualizzazione Gaussian Splatting: la tecnologia piu avanzata per esplorare i dettagli costruttivi con realismo fotografico."
              height="600px"
              featured={true}
            />
          </motion.div>

          {/* Section Divider with Title */}
          <motion.div
            className="flex items-center gap-6 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300" />
            <div className="flex items-center gap-3 px-5 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4704B]" />
              <span className="text-sm text-[#1E3D30] font-semibold tracking-wide">Dettagli Costruttivi Completi</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-300" />
          </motion.div>

          {/* Secondary Models - Full Screen Vertical */}
          {/* Parete Esterna */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            <SketchfabViewer
              modelId="eef538fbecae4ce6ad2efdfeffd1799c"
              title="Parete Esterna X-Frame"
              description="Dettaglio stratigrafia parete: telaio, isolamento termo-acustico e rivestimento esterno."
              height="600px"
              autoStart={true}
            />
          </motion.div>

          {/* Tetto con Cartongesso */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            <SketchfabViewer
              modelId="fa9d29118a944d41becddf0b9a1a1dee"
              title="Tetto con Cartongesso"
              description="Sistema tetto con finitura cartongesso: isolamento, ventilazione e controllo vapore."
              height="600px"
              autoStart={true}
            />
          </motion.div>

          {/* Tetto a Vista */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            <SketchfabViewer
              modelId="3794569f38a4405abb7c5ef55cac2ccc"
              title="Tetto a Vista"
              description="Copertura con travi strutturali a vista: design e prestazioni termiche."
              height="600px"
              autoStart={true}
            />
          </motion.div>

          {/* Spaccato Tetto Piano */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.7 }}
          >
            <SketchfabViewer
              modelId="1a4b908a94a24964a950866852a5a4f5"
              title="Spaccato Tetto Piano"
              description="Stratigrafia tetto piano: impermeabilizzazione, isolamento e pendenze."
              height="600px"
              autoStart={true}
            />
          </motion.div>

          {/* CTA Link to Sketchfab - Premium */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="https://sketchfab.com/skeypian"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-[#1E3D30] hover:bg-[#2D5A47] text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#1E3D30]/20"
            >
              <span>Esplora tutti i modelli su Sketchfab</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Transition: 3D Models (light) to Render Gallery (navy) */}
      <SectionDivider from="#F5F5F7" to="#0a1628" height="200px" />

      {/* Render Gallery Section - Premium Showcase */}
      <section id="render-gallery">
        <RenderShowcase images={renderImages} />
      </section>

      {/* Technical Specs - Premium Dark Immersive */}
      <section ref={specsRef} className="relative min-h-screen flex items-center py-20 lg:py-28 px-4 bg-gradient-to-b from-[#0a1628] via-[#0f2040] to-[#152822] overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-25">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="specs-grid-small" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a3a5c" strokeWidth="0.5"/>
              </pattern>
              <pattern id="specs-grid-large" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#specs-grid-small)"/>
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1a3a5c" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#specs-grid-large)"/>
          </svg>
        </div>

        {/* Enhanced Animated Glow Orbs */}
        <motion.div
          className="absolute top-[8%] right-[5%] w-[400px] h-[400px] bg-gradient-to-br from-[#C4704B]/20 to-[#C4704B]/5 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2],
            x: [0, 25, 0],
            y: [0, -15, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[12%] left-[3%] w-[350px] h-[350px] bg-gradient-to-tr from-[#4a9eff]/15 to-[#4a9eff]/5 rounded-full blur-[100px]"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, -20, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-[#2D5A47]/20 to-transparent rounded-full blur-[140px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Accent particles */}
        <motion.div
          className="absolute top-[20%] left-[15%] w-2 h-2 bg-[#C4704B]/50 rounded-full"
          animate={{ y: [0, -25, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[25%] right-[20%] w-1.5 h-1.5 bg-[#4a9eff]/40 rounded-full"
          animate={{ y: [0, 20, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />

        <div className="max-w-6xl mx-auto relative z-10 w-full">
          {/* Header */}
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={specsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            {/* Badge with glass effect */}
            <motion.div
              className="inline-flex items-center gap-2.5 px-6 py-3 mb-8 bg-white/[0.06] backdrop-blur-md rounded-full border border-white/15 shadow-[0_0_30px_-5px_rgba(196,112,75,0.15)]"
              whileHover={{ scale: 1.02, borderColor: "rgba(196, 112, 75, 0.3)" }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="w-2.5 h-2.5 bg-[#C4704B] rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white/90 text-sm font-semibold tracking-widest uppercase">
                Prestazioni Certificate
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 drop-shadow-[0_4px_20px_rgba(196,112,75,0.2)]">
              Specifiche{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4896A] via-[#E8956B] to-[#D4896A]">
                Tecniche
              </span>
            </h2>

            <p className="text-[#7da0b2] text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              Valori che superano gli standard di mercato e le normative piu stringenti.
            </p>

            {/* Divisore animato */}
            <motion.div
              className="mt-10 h-px bg-gradient-to-r from-transparent via-[#C4704B]/40 to-transparent max-w-md mx-auto"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={specsInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
          </motion.div>

          {/* Specs Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {technicalSpecs.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={specsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  delay: 0.1 + index * 0.08
                }}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.5, ease: "easeOut" }
                }}
                className="group relative"
              >
                {/* Glow effect background */}
                <div className="absolute -inset-2 bg-gradient-to-br from-[#C4704B]/0 via-[#C4704B]/0 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 group-hover:from-[#C4704B]/25 group-hover:via-[#C4704B]/15 transition-all duration-500 -z-10" />

                {/* Card */}
                <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md rounded-2xl p-8 lg:p-9 border border-white/15 group-hover:border-[#C4704B]/40 transition-all duration-300 overflow-hidden h-full">
                  {/* Subtle inner glow */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#C4704B]/0 group-hover:bg-[#C4704B]/10 rounded-full blur-2xl transition-all duration-500" />

                  {/* Value with glow */}
                  <div className="relative mb-4">
                    <motion.div
                      className="absolute -inset-4 bg-[#C4704B]/0 group-hover:bg-[#C4704B]/10 rounded-full blur-xl transition-all duration-500"
                    />
                    <div className="relative text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E8956B] to-[#C4704B] group-hover:from-[#f0a070] group-hover:to-[#D4896A] transition-all">
                      <AnimatedCounter
                        value={spec.value}
                        suffix={spec.suffix}
                      />
                    </div>
                  </div>

                  {/* Label */}
                  <div className="text-white font-semibold text-lg mb-2 group-hover:text-white/95 transition-colors">
                    {spec.label}
                  </div>

                  {/* Description */}
                  <div className="text-[#6b8e9f] text-sm leading-relaxed group-hover:text-[#7da0b2] transition-colors">
                    {spec.description}
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4704B]/0 to-transparent group-hover:via-[#C4704B]/50 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transition: Technical Specs dark to CTA terracotta */}
      <SectionDivider from="#152822" to="#C4704B" height="180px" />

      {/* CTA Section - Half Screen */}
      <section ref={ctaRef} className="min-h-[60vh] flex items-center py-16 lg:py-20 px-4 relative overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(135deg, #C4704B 0%, #A85A3A 100%)',
              'linear-gradient(135deg, #A85A3A 0%, #C4704B 100%)',
              'linear-gradient(135deg, #C4704B 0%, #A85A3A 100%)',
            ]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating circles */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.1, 0.15] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Vuoi vedere X-Frame da vicino?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Prenota una visita al nostro stabilimento a Spadola (VV) per toccare con mano
            la qualita dei materiali e vedere il processo produttivo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contatti">
              <motion.span
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#C4704B] font-semibold text-lg rounded-xl cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px -12px rgba(255, 255, 255, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                Prenota una Visita
              </motion.span>
            </Link>
            <motion.a
              href="tel:+393276473099"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold text-lg rounded-xl border-2 border-white"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.1)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5 mr-2" />
              Chiama Ora
            </motion.a>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
