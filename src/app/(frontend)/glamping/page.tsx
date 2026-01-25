'use client'

import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  Tent, Clock, Zap, Shield, Leaf, Phone, ArrowLeft
} from 'lucide-react'
import { getTipologiaById } from '@/data/tipologie'
import SectionDivider from '@/components/ui/SectionDivider'
import Button from '@/components/ui/Button'
import HeroParallax from '@/components/glamping/HeroParallax'
import FeaturesBounce from '@/components/glamping/FeaturesBounce'
import GlampingGallery from '@/components/glamping/GlampingGallery'
import GlampingTestimonials from '@/components/glamping/GlampingTestimonials'

// Animated Counter Component
function AnimatedCounter({
  value,
  suffix = '',
  color
}: {
  value: number
  suffix?: string
  color: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000 })
  const isInView = useInView(ref, { once: false, margin: '-50px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix
      }
    })
    return unsubscribe
  }, [springValue, suffix])

  return (
    <span ref={ref} style={{ color }}>
      0{suffix}
    </span>
  )
}

export default function GlampingPage() {
  const tipologia = getTipologiaById('glamping')!
  const introRef = useRef<HTMLDivElement>(null)
  const introInView = useInView(introRef, { once: false, margin: '-50px' })

  const additionalBenefits = [
    {
      icon: Tent,
      title: 'Design Iconico',
      description: 'Strutture che diventano attrazione turistica, aumentando il valore percepito della tua offerta.'
    },
    {
      icon: Leaf,
      title: 'Impatto Zero',
      description: 'Fondazioni non invasive e materiali eco-sostenibili per un turismo responsabile.'
    },
    {
      icon: Clock,
      title: 'Operativi in 60 Giorni',
      description: 'Dalla conferma dell\'ordine all\'apertura al pubblico in tempi record.'
    },
    {
      icon: Zap,
      title: 'Massima Efficienza',
      description: 'Isolamento termico superiore per costi di gestione ridotti tutto l\'anno.'
    },
  ]

  // Parse numeric value from spec
  const parseSpecValue = (value: string): number => {
    const match = value.match(/\d+/)
    return match ? parseInt(match[0]) : 0
  }

  return (
    <main className="min-h-screen bg-[#FFFCF7] overflow-hidden">

      {/* ============================================ */}
      {/* HERO - New Parallax Version */}
      {/* ============================================ */}
      <HeroParallax
        title={tipologia.title}
        description={tipologia.description}
        category={tipologia.category}
        imageUrl={tipologia.imageUrl}
        color={tipologia.color}
      />

      {/* Transition */}
      <SectionDivider from="#1E3D30" to="#FAF7F2" height="150px" />

      {/* ============================================ */}
      {/* INTRO - Enhanced */}
      {/* ============================================ */}
      <section ref={introRef} className="py-20 px-4 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-[#1E3D30] mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              L&apos;ospitalita incontra la{' '}
              <motion.span
                style={{ color: tipologia.color }}
                className="relative inline-block"
              >
                natura
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 rounded-full"
                  style={{ backgroundColor: tipologia.color }}
                  initial={{ width: 0 }}
                  animate={introInView ? { width: '100%' } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-[#6B6560] leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {tipologia.extendedDescription}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SPECS - Animated Counters */}
      {/* ============================================ */}
      <section className="py-16 px-4 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {tipologia.specs.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: '-30px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="p-6 md:p-8 bg-white rounded-3xl border border-[#E8E0D5] text-center group cursor-default"
              >
                <div className="text-4xl md:text-5xl font-bold mb-3">
                  {spec.value.includes('m²') || spec.value.includes('anni') || spec.value.includes('giorni') ? (
                    <AnimatedCounter
                      value={parseSpecValue(spec.value)}
                      suffix={spec.value.replace(/\d+[-]?/g, '')}
                      color={tipologia.color}
                    />
                  ) : (
                    <span style={{ color: tipologia.color }}>{spec.value}</span>
                  )}
                </div>
                <div className="text-[#6B6560] text-sm md:text-base font-medium">{spec.label}</div>

                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 100%, ${tipologia.color}08, transparent 70%)`
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transition */}
      <SectionDivider from="#FAF7F2" to="#FFFFFF" height="100px" />

      {/* ============================================ */}
      {/* FEATURES - Bounce Cards */}
      {/* ============================================ */}
      <FeaturesBounce features={tipologia.features} color={tipologia.color} />

      {/* Transition */}
      <SectionDivider from="#FFFFFF" to="#FAF7F2" height="100px" />

      {/* ============================================ */}
      {/* GALLERY - New Image Swiper */}
      {/* ============================================ */}
      <GlampingGallery color={tipologia.color} />

      {/* Transition */}
      <SectionDivider from="#FAF7F2" to="#FFFFFF" height="100px" />

      {/* ============================================ */}
      {/* TESTIMONIALS - New Section */}
      {/* ============================================ */}
      <GlampingTestimonials color={tipologia.color} />

      {/* Transition */}
      <SectionDivider from="#FFFFFF" to="#1E3D30" height="150px" />

      {/* ============================================ */}
      {/* BENEFITS - Enhanced with glow effects */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 bg-[#1E3D30] relative overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Decorative blurs */}
        <motion.div
          className="absolute top-0 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: `${tipologia.color}20` }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${tipologia.color}15` }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <span
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: tipologia.color }}
            >
              Vantaggi
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
              Perche scegliere <span style={{ color: tipologia.color }}>Glamping Ecolive</span>
            </h2>
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
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="relative p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 group overflow-hidden"
                >
                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${tipologia.color}30` }}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-white/60 leading-relaxed">{benefit.description}</p>

                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                    style={{
                      background: `radial-gradient(circle at 50% 100%, ${tipologia.color}20, transparent 70%)`
                    }}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Transition */}
      <SectionDivider from="#1E3D30" to="#FFFCF7" height="150px" />

      {/* ============================================ */}
      {/* CTA - Enhanced */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 bg-[#FFFCF7]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-[#1E3D30] mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
            >
              Pronto a trasformare<br />
              <span style={{ color: tipologia.color }}>la tua ospitalita?</span>
            </motion.h2>

            <motion.p
              className="text-[#6B6560] text-lg mb-10 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
            >
              Contattaci per un preventivo personalizzato o per visitare le nostre strutture demo.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
            >
              <Button href="/contatti" variant="primary" size="lg">
                Richiedi Preventivo
              </Button>
              <motion.a
                href="tel:+390963195139"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-[#1E3D30] font-semibold rounded-2xl border-2 border-[#1E3D30] hover:bg-[#1E3D30] hover:text-white transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5 group-hover:animate-pulse" />
                Chiama Ora
              </motion.a>
            </motion.div>

            {/* Back to tipologie */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <Link
                href="/tipologie"
                className="inline-flex items-center gap-2 text-[#6B6560] hover:text-[#1E3D30] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Vedi tutte le tipologie</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
