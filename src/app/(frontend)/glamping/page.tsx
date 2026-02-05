'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Tent, Clock, Zap, Shield, Leaf, Phone, ArrowLeft,
  Ruler, Calendar, BadgeCheck, type LucideIcon
} from 'lucide-react'
import { getTipologiaById } from '@/data/tipologie'
import SectionDivider from '@/components/ui/SectionDivider'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import GlowEffect, { ShimmerButton } from '@/components/ui/GlowEffect'
import HeroParallax from '@/components/glamping/HeroParallax'
import FeaturesBounce from '@/components/glamping/FeaturesBounce'
import GlampingGallery from '@/components/glamping/GlampingGallery'
import GlampingTestimonials from '@/components/glamping/GlampingTestimonials'
import GlampingProcess from '@/components/glamping/GlampingProcess'
import ParallaxQuote from '@/components/glamping/ParallaxQuote'

const TERRACOTTA = '#C4704B'

// Stat Card - glassmorphism style for dark section
function StatCard({
  value,
  suffix,
  label,
  delay,
  icon: Icon
}: {
  value: number
  suffix?: string
  label: string
  delay: number
  icon: LucideIcon
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative p-6 md:p-8 bg-white/[0.07] backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/[0.12] hover:border-white/20 transition-all duration-500 overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 80%, ${TERRACOTTA}15 0%, transparent 70%)`
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10"
          >
            <Icon className="w-5 h-5 text-white/70" />
          </div>
        </div>

        <div className="flex items-baseline gap-1">
          <AnimatedCounter
            value={value}
            suffix={suffix || ''}
            className="text-4xl md:text-5xl font-bold"
            style={{ color: TERRACOTTA } as React.CSSProperties}
          />
        </div>

        <p className="text-white/50 mt-2 font-medium text-sm">{label}</p>
      </div>
    </motion.div>
  )
}

export default function GlampingPage() {
  const tipologia = getTipologiaById('glamping')!
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' })

  const stats = useMemo(() => [
    { value: 50, suffix: ' m\u00B2', label: 'Superficie max', icon: Ruler },
    { value: 30, suffix: '', label: 'Giorni consegna', icon: Calendar },
    { value: 30, suffix: ' anni', label: 'Garanzia struttura', icon: Shield },
    { value: 100, suffix: '%', label: 'Personalizzabile', icon: BadgeCheck }
  ], [])

  const additionalBenefits = [
    {
      icon: Tent,
      title: 'Design Iconico',
      description: 'Strutture che diventano attrazione turistica, aumentando il valore percepito della tua offerta.',
      accent: false,
    },
    {
      icon: Leaf,
      title: 'Impatto Zero',
      description: 'Fondazioni non invasive e materiali eco-sostenibili per un turismo responsabile.',
      accent: true,
    },
    {
      icon: Clock,
      title: 'Operativi in 60 Giorni',
      description: 'Dalla conferma dell\'ordine all\'apertura al pubblico in tempi record.',
      accent: false,
    },
    {
      icon: Zap,
      title: 'Massima Efficienza',
      description: 'Isolamento termico superiore per costi di gestione ridotti tutto l\'anno.',
      accent: true,
    },
  ]

  return (
    <main className="min-h-screen bg-[#FFFCF7] overflow-hidden">

      {/* ============================================ */}
      {/* HERO - Immersive Parallax with BlurText */}
      {/* ============================================ */}
      <HeroParallax
        title={tipologia.title}
        description={tipologia.description}
        category={tipologia.category}
        imageUrl={tipologia.imageUrl}
        color={tipologia.color}
      />

      {/* Transition */}
      <SectionDivider from="#1E3D30" to="#1E3D30" height="40px" />

      {/* ============================================ */}
      {/* STATS - Dark Immersive Section */}
      {/* ============================================ */}
      <section ref={statsRef} className="relative py-20 lg:py-28 px-4 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/glamping/glamping-triple-path.webp"
            alt=""
            fill
            className="object-cover"
            quality={60}
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[#1E3D30]/90" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E3D30] via-transparent to-[#1E3D30]" />
        </div>

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header - Oversize number + text (no badge) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-14"
          >
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
              <motion.span
                className="text-7xl md:text-9xl font-bold leading-none"
                style={{ color: TERRACOTTA }}
                initial={{ opacity: 0, x: -20 }}
                animate={statsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                30
              </motion.span>
              <div className="pb-2">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  giorni per il tuo glamping
                </h2>
                <p className="text-white/40 text-lg">
                  {tipologia.extendedDescription}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid - Glassmorphism Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <StatCard
                key={i}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={i * 0.1}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Transition */}
      <SectionDivider from="#1E3D30" to="#FFFFFF" height="120px" />

      {/* ============================================ */}
      {/* FEATURES - Bento Grid */}
      {/* ============================================ */}
      <FeaturesBounce features={tipologia.features} color={tipologia.color} />

      {/* ============================================ */}
      {/* PARALLAX QUOTE - Emotional Pause */}
      {/* ============================================ */}
      <ParallaxQuote color={tipologia.color} />

      {/* Transition */}
      <SectionDivider from="#000000" to="#1E3D30" height="80px" />

      {/* ============================================ */}
      {/* GALLERY - Masonry Grid + Lightbox */}
      {/* ============================================ */}
      <GlampingGallery color={tipologia.color} />

      {/* Transition */}
      <SectionDivider from="#1E3D30" to="#FFFFFF" height="150px" />

      {/* ============================================ */}
      {/* PROCESS - Vertical Timeline */}
      {/* ============================================ */}
      <GlampingProcess color={tipologia.color} />

      {/* Transition */}
      <SectionDivider from="#FFFFFF" to="#FAF7F2" height="100px" />

      {/* ============================================ */}
      {/* TESTIMONIALS */}
      {/* ============================================ */}
      <GlampingTestimonials color={tipologia.color} />

      {/* Transition */}
      <SectionDivider from="#FAF7F2" to="#1E3D30" height="150px" />

      {/* ============================================ */}
      {/* BENEFITS - Glassmorphism with Terracotta Accents */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 bg-[#1E3D30] relative overflow-hidden">
        {/* Animated aurora background */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              `radial-gradient(ellipse at 20% 30%, ${tipologia.color}18 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
              `radial-gradient(ellipse at 60% 60%, ${tipologia.color}22 0%, transparent 45%), radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
              `radial-gradient(ellipse at 20% 30%, ${tipologia.color}18 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.03) 0%, transparent 50%)`,
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${TERRACOTTA}20 0%, transparent 70%)`,
            filter: 'blur(100px)'
          }}
          animate={{ x: [0, 70, -30, 0], y: [0, 40, -20, 0], scale: [1, 1.3, 0.8, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
          animate={{ x: [0, -40, 50, 0], y: [0, -50, 30, 0], scale: [1, 0.7, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Perché scegliere{' '}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="relative"
                style={{ color: TERRACOTTA }}
              >
                Glamping Ecolive
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                  style={{ backgroundColor: TERRACOTTA }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.span>
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-white/40 text-lg"
            >
              I vantaggi di un turismo eco-sostenibile di lusso
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {additionalBenefits.map((benefit, i) => {
              const Icon = benefit.icon
              const iconColor = benefit.accent ? TERRACOTTA : tipologia.color
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  {/* Star border effect */}
                  <div className="absolute -inset-[1px] rounded-3xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <motion.div
                      className="absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full"
                      style={{ background: `radial-gradient(circle, ${iconColor}90, transparent 10%)` }}
                      animate={{ x: ['0%', '-100%'] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                      className="absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full"
                      style={{ background: `radial-gradient(circle, ${iconColor}90, transparent 10%)` }}
                      animate={{ x: ['0%', '100%'] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>

                  <div className="relative p-8 md:p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 group-hover:bg-white/10 transition-all duration-500 overflow-hidden">
                    {/* Shine sweep */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 55%, transparent 70%)',
                        backgroundSize: '200% 100%',
                        animation: 'shineSweep 2s ease-in-out',
                      }}
                    />

                    {/* Colored bottom glow */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(ellipse at 50% 100%, ${iconColor}15 0%, transparent 70%)` }}
                    />

                    {/* Icon */}
                    <div className="relative mb-6">
                      <motion.div
                        className="absolute -inset-3 rounded-2xl"
                        style={{ background: `radial-gradient(circle, ${iconColor}12 0%, transparent 70%)` }}
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                      />
                      <motion.div
                        className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${iconColor}30` }}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <motion.div
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                        >
                          <Icon className="w-8 h-8 text-white relative z-10" />
                        </motion.div>
                      </motion.div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{benefit.title}</h3>
                    <p className="text-white/50 leading-relaxed text-lg relative z-10">{benefit.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Transition */}
      <SectionDivider from="#1E3D30" to="#FFFCF7" height="150px" />

      {/* ============================================ */}
      {/* CTA - Terracotta Accent */}
      {/* ============================================ */}
      <section className="py-20 lg:py-32 px-4 bg-[#FFFCF7] relative overflow-hidden">
        <GlowEffect
          color="#40916c"
          secondaryColor={TERRACOTTA}
          intensity="medium"
          className="max-w-4xl mx-auto"
        >
          <div className="text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Badge - Terracotta */}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{ color: TERRACOTTA, backgroundColor: `${TERRACOTTA}12` }}
              >
                Inizia Oggi
              </motion.span>

              <h2 className="text-4xl md:text-6xl font-bold text-[#1E3D30] mb-6 leading-tight">
                Pronto a trasformare<br />
                <motion.span
                  style={{ color: TERRACOTTA }}
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  la tua ospitalità?
                </motion.span>
              </h2>

              <p className="text-[#6B6560] text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
                Contattaci per un preventivo personalizzato o per visitare le nostre strutture demo.
              </p>

              {/* CTA Buttons - Primary in Terracotta */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contatti"
                  className="relative inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-2xl text-white overflow-hidden group"
                  style={{ backgroundColor: TERRACOTTA }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Shimmer effect */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: 'easeInOut'
                    }}
                  />
                  <span className="relative z-10">Richiedi Preventivo</span>
                </motion.a>

                <motion.a
                  href="tel:+390963195139"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-[#1E3D30] font-semibold rounded-2xl border-2 border-[#1E3D30] hover:bg-[#1E3D30] hover:text-white transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-5 h-5" />
                  Chiama Ora
                </motion.a>
              </div>

              {/* Back to tipologie */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-16"
              >
                <Link
                  href="/tipologie"
                  className="inline-flex items-center gap-2 text-[#6B6560] hover:text-[#1E3D30] transition-colors group"
                >
                  <motion.span className="inline-block" whileHover={{ x: -5 }}>
                    <ArrowLeft className="w-4 h-4" />
                  </motion.span>
                  <span>Vedi tutte le tipologie</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </GlowEffect>
      </section>

    </main>
  )
}
