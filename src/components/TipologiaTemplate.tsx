'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Layers, Ruler, Clock, PenTool, Gem, Smartphone } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import JsonLd from '@/components/JsonLd'

interface TipologiaSpec {
  label: string
  value: string
}

interface TipologiaModule {
  label: string
  mq: number
  livelli: number
}

interface TipologiaTemplateProps {
  title: string
  category: string
  description: string
  extendedDescription: string
  heroImage: string
  color: string
  surfaceRange: string
  priceRange: string
  features: string[]
  specs: TipologiaSpec[]
  modules: TipologiaModule[]
}

const GOLD = '#A0845C'
const DARK = '#1D1D1F'
const SURFACE = '#F5F5F7'
const MUTED = '#86868B'

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const LUXURY_GOLD = '#8B6914'

const luxuryDifferentiators = [
  {
    icon: PenTool,
    title: 'Progettazione Firmata',
    description: 'Il tuo progetto seguito da un architetto dedicato, dalla prima bozza alla consegna chiavi.',
  },
  {
    icon: Gem,
    title: 'Materiali d\'Eccellenza',
    description: 'Legno lamellare certificato, serramenti ad altissime prestazioni, finiture artigianali selezionate.',
  },
  {
    icon: Smartphone,
    title: 'Smart Living',
    description: 'Domotica completa con integrazione Alexa, HomeKit e Matter. Controllo totale della tua villa da smartphone.',
  },
]

export default function TipologiaTemplate({
  title,
  category,
  color,
  extendedDescription,
  heroImage,
  priceRange,
  features,
  specs,
  modules,
}: TipologiaTemplateProps) {
  const isLuxury = category === 'RESIDENZIALE PREMIUM'
  const accentColor = isLuxury ? LUXURY_GOLD : GOLD

  /* Pick first 3 specs for the hero stats bar */
  const heroStats = specs.slice(0, 3)
  const statIcons = [Ruler, Clock, Layers]

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${title} - Casa Prefabbricata EcoLive`,
    description: extendedDescription,
    brand: { '@type': 'Brand', name: 'EcoLive' },
    manufacturer: { '@type': 'Organization', name: 'EcoLive S.r.l.' },
    category: 'Case Prefabbricate in Legno',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      offerCount: modules.length,
    },
  }

  return (
    <div>
      <JsonLd data={productJsonLd} />
      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-14 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur-md border mb-5"
              style={{ color: GOLD, backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(160,132,92,0.3)' }}
            >
              {category}
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.h1>

          {/* Stats bar */}
          <motion.div
            className="flex flex-wrap gap-6 md:gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {heroStats.map((stat, i) => {
              const Icon = statIcons[i] ?? Layers
              return (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/10 backdrop-blur-sm">
                    <Icon className="w-4 h-4" style={{ color: GOLD }} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">{stat.value}</p>
                    <p className="text-white/50 text-xs">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Luxury Differentiators (only for luxury) ── */}
      {isLuxury && (
        <section className="py-20 lg:py-28 bg-gradient-to-b from-[#0D0D0D] to-[#1D1D1F]">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-14">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: LUXURY_GOLD }}>
                  L&apos;Eccellenza in Ogni Dettaglio
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Cosa rende unica una villa Luxury
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6">
              {luxuryDifferentiators.map((item, i) => {
                const Icon = item.icon
                return (
                  <ScrollReveal key={item.title} delay={i * 0.12}>
                    <motion.div
                      className="relative bg-white/[0.04] backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full overflow-hidden group"
                      whileHover={{ y: -4, borderColor: `${LUXURY_GOLD}50` }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B6914]/50 to-transparent" />
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                        style={{ backgroundColor: `${LUXURY_GOLD}15` }}
                      >
                        <Icon className="w-7 h-7" style={{ color: LUXURY_GOLD }} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-white/50 text-base leading-relaxed">{item.description}</p>
                    </motion.div>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Description + Features ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative">
            {/* Gold vertical accent line (desktop only) */}
            <div
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: `linear-gradient(to bottom, transparent, ${GOLD}40, transparent)` }}
            />

            {/* Left: Description */}
            <ScrollReveal>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: GOLD }}>
                  Panoramica
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6" style={{ color: DARK }}>
                  Progettazione su misura
                </h2>
                <p className="text-base md:text-lg leading-relaxed" style={{ color: MUTED }}>
                  {extendedDescription}
                </p>
              </div>
            </ScrollReveal>

            {/* Right: Features */}
            <ScrollReveal delay={0.15}>
              <motion.div
                className="space-y-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {features.map((feature) => (
                  <motion.div
                    key={feature}
                    variants={fadeUp}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#F5F5F7] border border-transparent hover:border-[#A0845C]/20 transition-colors duration-300"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${GOLD}15` }}
                    >
                      <Check className="w-4 h-4" style={{ color: GOLD }} />
                    </div>
                    <span className="text-base font-medium" style={{ color: DARK }}>{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Specs ── */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ backgroundColor: isLuxury ? '#0A0A0A' : DARK }}
      >
        {/* Grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {isLuxury && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#8B6914]/[0.03] via-transparent to-[#8B6914]/[0.03]" />
        )}
        <div className="relative max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: accentColor }}>
              {isLuxury ? 'Specifiche Premium' : 'Specifiche Tecniche'}
            </p>
            <p className="text-lg text-white/50 mb-14">
              {isLuxury ? 'Prestazioni ai massimi livelli' : 'Prestazioni e certificazioni'}
            </p>
          </ScrollReveal>

          <motion.div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden ${
              isLuxury ? 'bg-[#8B6914]/[0.08]' : 'bg-white/[0.06]'
            }`}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {specs.map((spec) => (
              <motion.div
                key={spec.label}
                variants={fadeUp}
                className="relative p-8 lg:p-10"
                style={{ backgroundColor: isLuxury ? '#0A0A0A' : DARK }}
              >
                <motion.div
                  className="absolute top-0 left-0 right-0 h-px origin-left"
                  style={{ backgroundColor: accentColor }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <p className="text-3xl md:text-4xl font-bold mb-2" style={{ color: accentColor, fontFeatureSettings: '"tnum"' }}>
                  {spec.value}
                </p>
                <p className="text-base text-white/50">{spec.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Modules ── */}
      {modules.length > 0 && (
        <section className="py-20 lg:py-28" style={{ backgroundColor: SURFACE }}>
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3 text-center" style={{ color: GOLD }}>
                Configurazioni
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-14" style={{ color: DARK }}>
                Moduli Disponibili
              </h2>
            </ScrollReveal>

            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {modules.map((mod) => (
                <motion.div
                  key={mod.label}
                  variants={fadeUp}
                  className="group relative bg-white rounded-2xl p-6 md:p-8 text-center border border-transparent hover:border-[#A0845C]/25 transition-all duration-300 hover:shadow-lg overflow-hidden"
                >
                  {/* Top gold accent */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ backgroundColor: GOLD }} />
                  <p className="text-4xl md:text-5xl font-bold mb-1" style={{ color: DARK, fontFeatureSettings: '"tnum"' }}>
                    {mod.mq}
                  </p>
                  <p className="text-sm font-medium mb-3" style={{ color: MUTED }}>m²</p>
                  <p className="text-sm font-medium mb-3" style={{ color: DARK }}>{mod.label}</p>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: `${GOLD}12`, color: GOLD }}
                  >
                    {mod.livelli === 1 ? '1 livello' : '2 livelli'}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Price Callout ── */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 md:w-20" style={{ backgroundColor: `${GOLD}50` }} />
              <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                Investimento
              </p>
              <div className="h-px w-12 md:w-20" style={{ backgroundColor: `${GOLD}50` }} />
            </div>
            <p className="text-3xl md:text-5xl font-bold mb-4" style={{ color: GOLD }}>
              {priceRange}
            </p>
            <p className="text-base leading-relaxed max-w-md mx-auto" style={{ color: MUTED }}>
              Prezzo indicativo. Il preventivo definitivo viene elaborato dopo la visita in sede e il rilievo tecnico del terreno.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: DARK }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              {isLuxury ? 'Prenota una Consulenza Esclusiva' : `Configura la tua ${title}`}
            </h2>
            <p className="text-white/50 text-base mb-10 max-w-lg mx-auto">
              {isLuxury
                ? 'Parla direttamente con il nostro team per progettare la villa dei tuoi sogni. Ogni dettaglio, su misura per te.'
                : 'Scegli dimensioni, finitura e ottieni un preventivo personalizzato in tempo reale.'}
            </p>
            <Link
              href={isLuxury ? '/contatti?oggetto=luxury' : '/configuratore'}
              className="inline-flex items-center gap-2.5 px-10 py-4 font-semibold text-white rounded-full transition-all duration-300 hover:scale-[1.03] group"
              style={{
                backgroundColor: accentColor,
                boxShadow: isLuxury ? '0 0 30px rgba(139,105,20,0.3)' : undefined,
              }}
            >
              {isLuxury ? 'Prenota una Consulenza Esclusiva' : 'Configura la tua Casa'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
