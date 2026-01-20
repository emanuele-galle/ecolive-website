'use client'

import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import {
  Award, Shield, Home, Leaf, Zap, ChevronDown, ArrowRight,
  BadgeCheck, Clock, Thermometer, Timer, CheckCircle,
  Phone, Mail, Volume2, ChevronRight, Flame, Snowflake,
  Building2, X
} from 'lucide-react'
import Button from '@/components/ui/Button'

// ============================================
// INTERACTIVE CERTIFICATION EXPLORER
// ============================================
const certifications = [
  {
    id: 'passive',
    name: 'Passive House',
    icon: Home,
    color: '#C4704B',
    value: '15',
    unit: 'kWh/m²',
    tagline: 'Consumo quasi zero',
    features: ['Risparmio 90% energia', 'Comfort 365 giorni', 'Zero ponti termici', 'Aria sempre pulita']
  },
  {
    id: 'casaclima',
    name: 'Casa Clima',
    icon: Leaf,
    color: '#40916c',
    value: 'Gold',
    unit: '',
    tagline: 'Sostenibilità certificata',
    features: ['Materiali eco', 'Qualità garantita', 'Valore +30%', 'Benessere abitativo']
  },
  {
    id: 'arca',
    name: 'ARCA',
    icon: Shield,
    color: '#2D5A47',
    value: '100%',
    unit: '',
    tagline: 'Tracciabilità totale',
    features: ['Legno certificato', 'Filiera controllata', 'Made in Italy', 'Garanzia 30 anni']
  },
  {
    id: 'nzeb',
    name: 'Classe A4',
    icon: Zap,
    color: '#C9A86C',
    value: 'NZEB',
    unit: '',
    tagline: 'Nearly Zero Energy',
    features: ['Bollette minime', 'Indipendenza energetica', 'Max incentivi', 'Futuro garantito']
  },
]

// ============================================
// INTERACTIVE SPECS DATA
// ============================================
const specsCategories = [
  {
    id: 'thermal',
    name: 'Termico',
    icon: Thermometer,
    color: '#C4704B',
    mainValue: '0.12',
    mainUnit: 'W/m²K',
    mainLabel: 'Trasmittanza',
    comparison: { us: 0.12, required: 0.25, traditional: 0.35 },
  },
  {
    id: 'inertia',
    name: 'Inerzia',
    icon: Timer,
    color: '#2D5A47',
    mainValue: '12+',
    mainUnit: 'ore',
    mainLabel: 'Sfasamento',
    comparison: { us: 12, required: 10, traditional: 6 },
  },
  {
    id: 'acoustic',
    name: 'Acustico',
    icon: Volume2,
    color: '#6B5B95',
    mainValue: '55',
    mainUnit: 'dB',
    mainLabel: 'Isolamento',
    comparison: { us: 55, required: 50, traditional: 42 },
  },
  {
    id: 'seismic',
    name: 'Sismico',
    icon: Shield,
    color: '#E63946',
    mainValue: 'Zona 1',
    mainUnit: '',
    mainLabel: 'Certificazione',
    comparison: { us: 100, required: 70, traditional: 50 },
  },
]


// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function AreaTecnicaPage() {
  const [activeCert, setActiveCert] = useState<string>('passive')
  const [activeSpec, setActiveSpec] = useState<string>('thermal')

  const heroRef = useRef<HTMLDivElement>(null)
  const certRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const comparisonRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  const certInView = useInView(certRef, { once: false, margin: "-50px" })
  const specsInView = useInView(specsRef, { once: false, margin: "-50px" })
  const comparisonInView = useInView(comparisonRef, { once: false, margin: "-50px" })
  const ctaInView = useInView(ctaRef, { once: false, margin: "-50px" })

  const selectedCert = certifications.find(c => c.id === activeCert)!
  const selectedSpec = specsCategories.find(s => s.id === activeSpec)!

  return (
    <main className="min-h-screen bg-[#FFFCF7] overflow-hidden">

      {/* ============================================ */}
      {/* HERO - Minimal & Animated */}
      {/* ============================================ */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3D30] via-[#2D5A47] to-[#1E3D30]" />

        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #C4704B 0%, transparent 70%)' }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-4 text-center"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          >
            <BadgeCheck className="w-4 h-4 text-[#C4704B]" />
            <span className="text-white/80 text-sm">Qualità Certificata</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8"
          >
            Area <span className="text-[#C4704B]">Tecnica</span>
          </motion.h1>

          {/* Interactive Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { value: '4', label: 'Certificazioni' },
              { value: 'A4', label: 'Classe Energia' },
              { value: '30', label: 'Anni Garanzia' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="group px-8 py-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 cursor-pointer"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[#C4704B] group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-white/30" />
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* CERTIFICATIONS - Interactive Tabs */}
      {/* ============================================ */}
      <section ref={certRef} className="py-20 lg:py-28 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={certInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mb-4">
              Certificazioni
            </h2>
            <p className="text-[#6B6560]">Clicca per esplorare ogni standard</p>
          </motion.div>

          {/* Tab Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={certInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {certifications.map((cert) => {
              const Icon = cert.icon
              const isActive = activeCert === cert.id
              return (
                <motion.button
                  key={cert.id}
                  onClick={() => setActiveCert(cert.id)}
                  className={`
                    flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all
                    ${isActive
                      ? 'bg-[#1E3D30] text-white shadow-lg'
                      : 'bg-white text-[#6B6560] hover:bg-[#1E3D30]/5 border border-[#E8E0D5]'}
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#C4704B]' : ''}`} />
                  {cert.name}
                </motion.button>
              )
            })}
          </motion.div>

          {/* Active Certification Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCert}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl"
              style={{ backgroundColor: selectedCert.color }}
            >
              {/* Background pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}
              />

              <div className="relative p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left - Main Info */}
                  <div className="text-white">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring" }}
                      className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6"
                    >
                      <selectedCert.icon className="w-8 h-8" />
                    </motion.div>

                    <h3 className="text-3xl md:text-4xl font-bold mb-2">{selectedCert.name}</h3>
                    <p className="text-white/70 text-lg mb-6">{selectedCert.tagline}</p>

                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl md:text-7xl font-bold">{selectedCert.value}</span>
                      <span className="text-2xl text-white/60">{selectedCert.unit}</span>
                    </div>
                  </div>

                  {/* Right - Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {selectedCert.features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors cursor-default"
                      >
                        <CheckCircle className="w-5 h-5 text-white/80 mb-2" />
                        <span className="text-white text-sm font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={certInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-center mt-8"
          >
            <Link href="/area-tecnica/certificazioni">
              <motion.span
                className="inline-flex items-center gap-2 text-[#C4704B] font-semibold hover:gap-3 transition-all"
                whileHover={{ x: 5 }}
              >
                Vedi tutte le certificazioni <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SPECS - Interactive Cards */}
      {/* ============================================ */}
      <section ref={specsRef} className="py-20 lg:py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={specsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mb-4">
              Prestazioni
            </h2>
            <p className="text-[#6B6560]">Seleziona una categoria per i dettagli</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left - Category Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={specsInView ? { opacity: 1, x: 0 } : {}}
              className="space-y-3"
            >
              {specsCategories.map((spec) => {
                const Icon = spec.icon
                const isActive = activeSpec === spec.id
                return (
                  <motion.button
                    key={spec.id}
                    onClick={() => setActiveSpec(spec.id)}
                    className={`
                      w-full flex items-center gap-4 p-5 rounded-2xl text-left transition-all
                      ${isActive
                        ? 'bg-[#1E3D30] shadow-xl'
                        : 'bg-[#FAF7F2] hover:bg-[#F0EDE8] border border-[#E8E0D5]'}
                    `}
                    whileHover={{ x: isActive ? 0 : 5 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${isActive ? 'bg-white/20' : ''}`}
                      style={{ backgroundColor: isActive ? undefined : `${spec.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: isActive ? 'white' : spec.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold ${isActive ? 'text-white' : 'text-[#1E3D30]'}`}>
                        {spec.name}
                      </h3>
                      <p className={`text-sm ${isActive ? 'text-white/60' : 'text-[#6B6560]'}`}>
                        {spec.mainLabel}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-2xl font-bold ${isActive ? 'text-[#C4704B]' : ''}`}
                        style={{ color: isActive ? undefined : spec.color }}
                      >
                        {spec.mainValue}
                      </span>
                      <span className={`text-sm ml-1 ${isActive ? 'text-white/60' : 'text-[#6B6560]'}`}>
                        {spec.mainUnit}
                      </span>
                    </div>
                    <ChevronRight className={`w-5 h-5 ${isActive ? 'text-white/50' : 'text-[#6B6560]'}`} />
                  </motion.button>
                )
              })}
            </motion.div>

            {/* Right - Visual Comparison */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={specsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpec}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#FAF7F2] rounded-3xl p-8 h-full"
                >
                  <h4 className="text-lg font-bold text-[#1E3D30] mb-6">Confronto Prestazioni</h4>

                  <div className="space-y-6">
                    {/* Ecolive Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-[#1E3D30]">Ecolive X-Frame</span>
                        <span className="font-bold" style={{ color: selectedSpec.color }}>
                          {selectedSpec.mainValue} {selectedSpec.mainUnit}
                        </span>
                      </div>
                      <div className="h-4 bg-[#E8E0D5] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: selectedSpec.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(selectedSpec.comparison.us / Math.max(selectedSpec.comparison.us, selectedSpec.comparison.traditional)) * 100}%` }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Required Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-[#6B6560]">Normativa richiede</span>
                        <span className="text-[#6B6560]">
                          {typeof selectedSpec.comparison.required === 'number' && selectedSpec.comparison.required < 1
                            ? selectedSpec.comparison.required
                            : selectedSpec.comparison.required} {selectedSpec.mainUnit}
                        </span>
                      </div>
                      <div className="h-4 bg-[#E8E0D5] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-[#6B6560]/50"
                          initial={{ width: 0 }}
                          animate={{ width: `${(selectedSpec.comparison.required / Math.max(selectedSpec.comparison.us, selectedSpec.comparison.traditional)) * 100}%` }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                        />
                      </div>
                    </div>

                    {/* Traditional Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-[#6B6560]">Edilizia tradizionale</span>
                        <span className="text-[#6B6560]">
                          {selectedSpec.comparison.traditional} {selectedSpec.mainUnit}
                        </span>
                      </div>
                      <div className="h-4 bg-[#E8E0D5] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-[#A0998F]"
                          initial={{ width: 0 }}
                          animate={{ width: `${(selectedSpec.comparison.traditional / Math.max(selectedSpec.comparison.us, selectedSpec.comparison.traditional)) * 100}%` }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Advantage Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 p-4 rounded-xl border-2 border-dashed"
                    style={{ borderColor: `${selectedSpec.color}40` }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${selectedSpec.color}15` }}
                      >
                        <CheckCircle className="w-5 h-5" style={{ color: selectedSpec.color }} />
                      </div>
                      <div>
                        <p className="font-bold text-[#1E3D30]">Superiamo la normativa</p>
                        <p className="text-sm text-[#6B6560]">Prestazioni oltre gli standard richiesti</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* COMPARISON - Side by Side */}
      {/* ============================================ */}
      <section ref={comparisonRef} className="py-20 lg:py-28 px-4 bg-[#1E3D30] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={comparisonInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Perché Scegliere <span className="text-[#C4704B]">Ecolive</span>
            </h2>
          </motion.div>

          {/* Header Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={comparisonInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-6"
          >
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C4704B] rounded-full">
                <CheckCircle className="w-4 h-4 text-white" />
                <span className="text-white font-bold text-sm">ECOLIVE</span>
              </div>
            </div>
            <div />
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                <span className="text-white/60 font-medium text-sm">TRADIZIONALE</span>
              </div>
            </div>
          </motion.div>

          {/* Comparison Rows */}
          <div className="space-y-3">
            {[
              { aspect: 'Tempi di costruzione', ecolive: '30-45 giorni', traditional: '12-18 mesi', icon: Clock },
              { aspect: 'Classe energetica', ecolive: 'A4 garantita', traditional: 'B-C media', icon: Zap },
              { aspect: 'Resistenza sismica', ecolive: 'Zona 1', traditional: 'Variabile', icon: Shield },
              { aspect: 'Costo indicativo', ecolive: '€1.100-1.500/mq', traditional: '€1.500-2.500/mq', icon: Building2 },
              { aspect: 'Impatto ambientale', ecolive: 'CO₂ negativo', traditional: 'CO₂ positivo', icon: Leaf },
            ].map((row, index) => {
              const Icon = row.icon
              return (
                <motion.div
                  key={row.aspect}
                  initial={{ opacity: 0, y: 20 }}
                  animate={comparisonInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="grid grid-cols-3 gap-4 items-center"
                >
                  {/* Ecolive Value */}
                  <motion.div
                    className="bg-[#C4704B]/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-[#C4704B]/30"
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(196,112,75,0.3)' }}
                  >
                    <span className="text-[#C4704B] font-bold text-lg">{row.ecolive}</span>
                  </motion.div>

                  {/* Aspect Label (Center) */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white/70" />
                    </div>
                    <span className="text-white/80 text-sm font-medium text-center">{row.aspect}</span>
                  </div>

                  {/* Traditional Value */}
                  <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/10">
                    <span className="text-white/50 font-medium">{row.traditional}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={comparisonInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-10"
          >
            <p className="text-white/50 text-sm">
              Valori indicativi basati su progetti realizzati
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* IN SINTESI - Bento Grid */}
      {/* ============================================ */}
      <section className="py-20 lg:py-28 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30]">
              In Sintesi
            </h2>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-6 md:grid-cols-12 gap-4 auto-rows-[140px]">

            {/* Card Grande - Tempi */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              whileHover={{ scale: 1.02 }}
              className="col-span-6 md:col-span-5 row-span-2 bg-gradient-to-br from-[#C4704B] to-[#A85A3A] rounded-3xl p-8 relative overflow-hidden cursor-default group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative h-full flex flex-col justify-between">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl md:text-7xl font-bold text-white">30</span>
                    <span className="text-2xl text-white/70">giorni</span>
                  </div>
                  <p className="text-white/80 text-lg mt-2">Tempo di costruzione chiavi in mano</p>
                </div>
              </div>
            </motion.div>

            {/* Card Media - Risparmio */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="col-span-6 md:col-span-4 row-span-1 bg-[#40916c] rounded-3xl p-6 relative overflow-hidden cursor-default group"
            >
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
              <div className="relative h-full flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm mb-1">Risparmio energia</p>
                  <span className="text-4xl font-bold text-white">90%</span>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Thermometer className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Card Piccola - REI */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="col-span-3 md:col-span-3 row-span-1 bg-white rounded-3xl p-5 border border-[#E8E0D5] cursor-default group hover:border-[#E63946]/30 transition-colors"
            >
              <div className="h-full flex flex-col justify-between">
                <div className="w-10 h-10 bg-[#E63946]/10 rounded-xl flex items-center justify-center group-hover:bg-[#E63946]/20 transition-colors">
                  <Shield className="w-5 h-5 text-[#E63946]" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-[#1E3D30]">REI 60</span>
                  <p className="text-[#6B6560] text-xs">Fuoco</p>
                </div>
              </div>
            </motion.div>

            {/* Card Media - Garanzia */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="col-span-6 md:col-span-4 row-span-1 bg-[#1E3D30] rounded-3xl p-6 relative overflow-hidden cursor-default"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#C4704B]/20 rounded-full blur-2xl" />
              <div className="relative h-full flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-1">Garanzia struttura</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">30</span>
                    <span className="text-xl text-white/60">anni</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#C4704B]" />
                </div>
              </div>
            </motion.div>

            {/* Card Piccola - Esperienza */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.25 }}
              whileHover={{ scale: 1.02 }}
              className="col-span-3 md:col-span-3 row-span-1 bg-white rounded-3xl p-5 border border-[#E8E0D5] cursor-default group hover:border-[#2D5A47]/30 transition-colors"
            >
              <div className="h-full flex flex-col justify-between">
                <div className="w-10 h-10 bg-[#2D5A47]/10 rounded-xl flex items-center justify-center group-hover:bg-[#2D5A47]/20 transition-colors">
                  <Building2 className="w-5 h-5 text-[#2D5A47]" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-[#1E3D30]">25+</span>
                  <p className="text-[#6B6560] text-xs">Anni esperienza</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA - Clean & Direct */}
      {/* ============================================ */}
      <section ref={ctaRef} className="py-20 lg:py-28 px-4 bg-gradient-to-br from-[#C4704B] to-[#A85A3A] relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hai domande tecniche?
            </h2>
            <p className="text-white/70 text-lg mb-10">
              Il nostro team di esperti è pronto a rispondere.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contatti" variant="secondary" size="lg">
                <Mail className="w-5 h-5 mr-2" />
                Contattaci
              </Button>
              <motion.a
                href="tel:+390963195139"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5" />
                Chiama Ora
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
