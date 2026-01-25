'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Building2, CheckCircle, Clock, Zap, Shield, Heart,
  ChevronDown, Phone, ArrowLeft, Users, Palette, Key,
  Wallet, Sofa, TrendingUp,
  type LucideIcon
} from 'lucide-react'
import { getTipologiaById } from '@/data/tipologie'
import SectionDivider from '@/components/ui/SectionDivider'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import FloatingShapes from '@/components/ui/FloatingShapes'
import ParticleField from '@/components/ui/backgrounds/ParticleField'
import { BentoGrid, BentoFeatureCard } from '@/components/ui/BentoGrid'
import GlowEffect, { ShimmerButton, AnimatedGridBackground } from '@/components/ui/GlowEffect'

// Text stagger animation for hero title
function StaggerText({ text, className }: { text: string; className?: string }) {
  const letters = text.split('')

  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.4 + i * 0.05,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  )
}

// Rainbow border badge
function RainbowBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="relative inline-flex"
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute -inset-[2px] rounded-full opacity-60"
        style={{
          background: 'linear-gradient(90deg, #2D5A47, #C4704B, #40916c, #2D5A47)',
          backgroundSize: '300% 100%'
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <div className="relative px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-sm">
        {children}
      </div>
    </motion.div>
  )
}

// Animated scroll indicator
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      <span className="text-white/40 text-sm tracking-wider">SCROLL</span>
      <motion.div
        className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-white/60"
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  )
}

// Stat card with counter
function StatCard({
  value,
  suffix,
  label,
  color,
  delay,
  icon: Icon
}: {
  value: number
  suffix?: string
  label: string
  color: string
  delay: number
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-[#E8E0D5] hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}10 0%, transparent 70%)`
        }}
      />

      {/* Icon background */}
      <motion.div
        className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ backgroundColor: color }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <span style={{ color }}><Icon className="w-5 h-5" /></span>
          </div>
        </div>

        <div className="flex items-baseline gap-1">
          <AnimatedCounter
            value={value}
            suffix={suffix || ''}
            className="text-5xl md:text-6xl font-bold"
            style={{ color } as React.CSSProperties}
          />
        </div>

        <p className="text-[#6B6560] mt-2 font-medium">{label}</p>
      </div>
    </motion.div>
  )
}

// Feature icon mapping for Residenziali
const featureIcons: Record<string, LucideIcon> = {
  'Personalizzazione completa': Palette,
  'Consegna chiavi in mano': Key,
  'Mutuo agevolato': Wallet,
  'Efficienza energetica massima': Zap,
  'Comfort abitativo superiore': Sofa,
  'Valore immobiliare garantito': TrendingUp
}

export default function ResidenzialiPage() {
  const tipologia = getTipologiaById('residenziali')!
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const additionalBenefits = [
    {
      icon: Users,
      title: 'Progettazione Partecipata',
      description: 'Ti accompagniamo in ogni fase, dalla scelta del layout alle finiture, per creare la casa perfetta per la tua famiglia.'
    },
    {
      icon: Heart,
      title: 'Benessere Abitativo',
      description: 'Materiali naturali, aria sempre pulita e temperatura costante per il massimo comfort quotidiano.'
    },
    {
      icon: Shield,
      title: 'Investimento Sicuro',
      description: 'Valore immobiliare garantito nel tempo grazie a certificazioni e prestazioni energetiche superiori.'
    },
    {
      icon: Zap,
      title: 'Efficienza Energetica',
      description: 'Isolamento termoacustico superiore per il massimo comfort e risparmio sui costi energetici.'
    },
  ]

  // Stats with animated counters
  const stats = useMemo(() => [
    { value: 250, suffix: ' m²', label: 'Superficie max', icon: Building2 },
    { value: 45, suffix: '', label: 'Giorni minimi', icon: Clock },
    { value: 30, suffix: ' anni', label: 'Garanzia', icon: Shield },
    { value: 100, suffix: '%', label: 'Personalizzabile', icon: Palette }
  ], [])

  return (
    <main className="min-h-screen bg-[#FFFCF7] overflow-hidden">

      {/* ============================================ */}
      {/* HERO - Immersivo con Gradient Animati */}
      {/* ============================================ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroImageScale }}
        >
          <Image
            src={tipologia.imageUrl}
            alt={tipologia.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#1E3D30]" />
        </motion.div>

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(45, 90, 71, 0.3) 0%, transparent 70%)',
              filter: 'blur(80px)'
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -40, 30, 0],
              scale: [1, 1.2, 0.9, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(196, 112, 75, 0.25) 0%, transparent 70%)',
              filter: 'blur(80px)'
            }}
            animate={{
              x: [0, -40, 50, 0],
              y: [0, 30, -40, 0],
              scale: [1, 0.9, 1.15, 1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>

        {/* Particle field */}
        <ParticleField
          particleCount={30}
          color="rgba(255, 255, 255, 0.4)"
          maxRadius={2}
          connectionDistance={100}
          lineOpacity={0.1}
          className="opacity-50"
        />

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-4 text-center"
          style={{ opacity: heroOpacity }}
        >
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-10"
          >
            <Link
              href="/tipologie"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            >
              <motion.span
                className="inline-block"
                whileHover={{ x: -5 }}
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.span>
              <span>Tutte le tipologie</span>
            </Link>
          </motion.div>

          {/* Rainbow Badge */}
          <RainbowBadge>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium tracking-wide">{tipologia.category}</span>
            </div>
          </RainbowBadge>

          {/* Title with stagger */}
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-white mt-8 mb-6 leading-none">
            <StaggerText text={tipologia.title} />
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          >
            {tipologia.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <motion.a
              href="/contatti"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#1E3D30] font-semibold rounded-2xl hover:bg-white/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Consulenza Gratuita
            </motion.a>
            <motion.a
              href="tel:+390963195139"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-2xl border-2 border-white/30 hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5" />
              Chiama Ora
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </section>

      {/* Transition */}
      <SectionDivider from="#1E3D30" to="#FAF7F2" height="150px" />

      {/* ============================================ */}
      {/* INTRO + STATS - Counter Animati */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 bg-[#FAF7F2] relative overflow-hidden">
        <FloatingShapes variant="section" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Intro text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#1E3D30] mb-6">
              La casa dei tuoi{' '}
              <span className="relative">
                <span style={{ color: tipologia.color }}>sogni</span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
                  style={{ backgroundColor: tipologia.color }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </span>
              , concreta
            </h2>
            <p className="text-lg md:text-xl text-[#6B6560] leading-relaxed max-w-3xl mx-auto">
              {tipologia.extendedDescription}
            </p>
          </motion.div>

          {/* Stats Grid with Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <StatCard
                key={i}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                color={tipologia.color}
                delay={i * 0.1}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Transition */}
      <SectionDivider from="#FAF7F2" to="#FFFFFF" height="100px" />

      {/* ============================================ */}
      {/* FEATURES - Bento Grid Layout */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 bg-white relative overflow-hidden">
        <AnimatedGridBackground color="#2D5A47" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              className="inline-block px-4 py-2 bg-[#2D5A47]/10 rounded-full text-[#2D5A47] text-sm font-medium mb-4"
            >
              Tutto Incluso
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mb-4">
              Dal Progetto alle Chiavi in Mano
            </h2>
            <p className="text-[#6B6560] text-lg">Ogni dettaglio pensato per la tua famiglia</p>
          </motion.div>

          {/* Bento Grid */}
          <BentoGrid>
            {tipologia.features.map((feature, i) => {
              const Icon = featureIcons[feature] || CheckCircle
              // First item is large, rest alternate between medium sizes
              const size = i === 0 ? 'large' : 'medium'
              const gradients = [
                'linear-gradient(135deg, rgba(45, 90, 71, 0.05) 0%, transparent 60%)',
                'linear-gradient(135deg, rgba(196, 112, 75, 0.05) 0%, transparent 60%)',
                'linear-gradient(135deg, rgba(64, 145, 108, 0.05) 0%, transparent 60%)',
                'linear-gradient(45deg, rgba(45, 90, 71, 0.05) 0%, transparent 60%)',
                'linear-gradient(225deg, rgba(196, 112, 75, 0.05) 0%, transparent 60%)',
                'linear-gradient(315deg, rgba(64, 145, 108, 0.05) 0%, transparent 60%)'
              ]

              const descriptions: Record<string, string> = {
                'Personalizzazione completa': 'Scegli layout, materiali e finiture. Ogni dettaglio della tua casa sara progettato insieme a te.',
                'Consegna chiavi in mano': 'Dalla fondazione agli arredi, ci occupiamo di tutto noi.',
                'Mutuo agevolato': 'Condizioni vantaggiose grazie ai nostri partner finanziari.',
                'Efficienza energetica massima': 'Classe A4 garantita, bollette ridotte fino all\'80%.',
                'Comfort abitativo superiore': 'Isolamento termoacustico per vivere in tranquillita.',
                'Valore immobiliare garantito': 'Un investimento che cresce nel tempo.'
              }

              return (
                <BentoFeatureCard
                  key={i}
                  icon={<Icon className="w-full h-full" />}
                  title={feature}
                  description={i === 0 ? descriptions[feature] : undefined}
                  size={size}
                  color={tipologia.color}
                  delay={i * 0.1}
                  gradient={gradients[i % gradients.length]}
                />
              )
            })}
          </BentoGrid>
        </div>
      </section>

      {/* Transition */}
      <SectionDivider from="#FFFFFF" to="#1E3D30" height="150px" />

      {/* ============================================ */}
      {/* BENEFITS - Glassmorphism Interattive */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 bg-[#1E3D30] relative overflow-hidden">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(45, 90, 71, 0.3) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(196, 112, 75, 0.2) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Perche scegliere una <span style={{ color: tipologia.color }}>casa Ecolive</span>
            </h2>
            <p className="text-white/60 text-lg">I vantaggi di vivere in una casa in bioedilizia</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {additionalBenefits.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="group relative"
                >
                  {/* Animated border gradient */}
                  <motion.div
                    className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${tipologia.color}80, transparent 50%, ${tipologia.color}40)`,
                    }}
                  />

                  <div className="relative p-8 md:p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 group-hover:bg-white/10 transition-all duration-500">
                    {/* Icon with pulse */}
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${tipologia.color}30` }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                    <p className="text-white/60 leading-relaxed text-lg">{benefit.description}</p>
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
      {/* CTA - Glow Effect Dinamico */}
      {/* ============================================ */}
      <section className="py-20 lg:py-32 px-4 bg-[#FFFCF7] relative overflow-hidden">
        <GlowEffect
          color="#2D5A47"
          secondaryColor="#C4704B"
          intensity="medium"
          className="max-w-4xl mx-auto"
        >
          <div className="text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
            >
              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                className="inline-block px-4 py-2 bg-[#2D5A47]/10 rounded-full text-[#2D5A47] text-sm font-medium mb-6"
              >
                Inizia Oggi
              </motion.span>

              <h2 className="text-4xl md:text-6xl font-bold text-[#1E3D30] mb-6 leading-tight">
                Inizia a costruire<br />
                <motion.span
                  style={{ color: tipologia.color }}
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  il tuo futuro
                </motion.span>
              </h2>

              <p className="text-[#6B6560] text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
                Contattaci per una consulenza gratuita e scopri come realizzare la casa perfetta per la tua famiglia.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ShimmerButton href="/contatti" variant="primary">
                  Consulenza Gratuita
                </ShimmerButton>

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
                viewport={{ once: false }}
                transition={{ delay: 0.4 }}
                className="mt-16"
              >
                <Link
                  href="/tipologie"
                  className="inline-flex items-center gap-2 text-[#6B6560] hover:text-[#1E3D30] transition-colors group"
                >
                  <motion.span
                    className="inline-block"
                    whileHover={{ x: -5 }}
                  >
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
