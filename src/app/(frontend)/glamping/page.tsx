'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Tent, Clock, Leaf, Zap, Shield, Phone, ArrowLeft, Wrench, Sparkles } from 'lucide-react'
import { getTipologiaById } from '@/data/tipologie'
import BlurText from '@/components/ui/BlurText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SpotlightCard from '@/components/ui/SpotlightCard'
import SectionTransition from '@/components/ui/SectionTransition'
import InfiniteMarquee from '@/components/ui/InfiniteMarquee'
import ImageLightbox from '@/components/ui/ImageLightbox'
import GlassCard from '@/components/ui/GlassCard'

const galleryImages = [
  { src: '/images/glamping/glamping-triple-path.webp', alt: 'Glamping triplo immerso nel verde', title: 'Glamping Triplo' },
  { src: '/images/glamping/glamping-triple-frontal.webp', alt: 'Vista frontale glamping triplo', title: 'Vista Frontale' },
  { src: '/images/glamping/glamping-aframe-balcony.webp', alt: 'A-frame con balcone panoramico', title: 'A-Frame Panoramico' },
  { src: '/images/glamping/glamping-single-forest.webp', alt: 'Glamping singolo nella foresta', title: 'Forest Lodge' },
  { src: '/images/glamping/glamping-duo-garden.webp', alt: 'Due glamping con giardino', title: 'Duo Garden' },
  { src: '/images/glamping/glamping-duo-nature.webp', alt: 'Glamping duo immerso nella natura', title: 'Natura Suite' },
]

const featureIcons = [Tent, Leaf, Sparkles, Wrench, Clock, Zap]

const featureDescriptions: Record<string, string> = {
  'Pronte in 60 giorni': 'Dalla conferma dell\'ordine all\'apertura al pubblico in tempi record.',
  'Zero fondazioni invasive': 'Nessun impatto sul terreno, installazione reversibile e rispettosa dell\'ambiente.',
  'Design personalizzabile': 'Ogni struttura viene adattata al tuo concept e al paesaggio circostante.',
  'Manutenzione minima': 'Materiali resistenti e trattamenti protettivi per una gestione semplice.',
  'Integrazione con il paesaggio': 'Forme e colori studiati per armonizzarsi con l\'ambiente naturale.',
  'Comfort premium': 'Isolamento termico, impianti moderni e finiture di alta qualità.',
}

const processSteps = [
  { step: '01', title: 'Consulenza', desc: 'Analizziamo le tue esigenze e il sito di installazione' },
  { step: '02', title: 'Progetto', desc: 'Design personalizzato e rendering 3D della struttura' },
  { step: '03', title: 'Produzione', desc: 'Prefabbricazione in stabilimento con controllo qualità' },
  { step: '04', title: 'Montaggio', desc: 'Installazione rapida in loco senza fondazioni invasive' },
  { step: '05', title: 'Consegna', desc: 'Struttura pronta all\'uso, chiavi in mano' },
]

const glampingMarqueeItems = [
  'Eco-Tourism',
  'Luxury Camping',
  'Zero Impact',
  'Design Naturale',
  'Comfort Premium',
  'A-Frame',
  'Forest Lodge',
  'Pronte in 60 Giorni',
]

export default function GlampingPage() {
  const tipologia = getTipologiaById('glamping')!

  return (
    <main className="min-h-screen">

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={tipologia.heroImage}
            alt={tipologia.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-[#1D1D1F]/90" />
        </div>

        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 -left-16 w-72 h-72 rounded-full bg-[#48484A]/25 blur-[100px] pointer-events-none"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-16 w-64 h-64 rounded-full bg-[#A0845C]/10 blur-[80px] pointer-events-none"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-32">
          <ScrollReveal direction="up">
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium tracking-wider mb-8">
              {tipologia.category}
            </span>
          </ScrollReveal>

          <BlurText
            text={tipologia.title}
            className="font-serif text-5xl md:text-7xl text-white mb-8"
            delay={120}
            animateBy="words"
            direction="bottom"
          />

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
              {tipologia.description}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-wrap justify-center gap-10 md:gap-14 mb-12">
              {tipologia.specs.map((spec) => (
                <div key={spec.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white">{spec.value}</p>
                  <p className="text-white/50 text-sm mt-1">{spec.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#A0845C] text-white font-semibold rounded-full hover:bg-[#b5623f] transition-all duration-300 hover:shadow-lg hover:shadow-[#A0845C]/20"
              >
                Richiedi Preventivo
              </Link>
              <Link
                href="/tipologie"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Torna alle Tipologie
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-[#1D1D1F] pb-1">
        <div className="bg-[#A0845C]/10 border-y border-[#A0845C]/20 py-4">
          <InfiniteMarquee
            items={glampingMarqueeItems}
            speed={25}
            className="text-white/70"
          />
        </div>
      </div>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" variant="wave" height={80} />

      {/* CARATTERISTICHE */}
      <section className="py-28 lg:py-36 px-4 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-20">
            <span className="text-[#A0845C] text-sm font-semibold tracking-widest uppercase">
              Vantaggi
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#1D1D1F] mt-3 mb-4">
              Caratteristiche
            </h2>
            <p className="text-[#86868B] text-lg max-w-2xl mx-auto">
              Tutto il necessario per un turismo eco-sostenibile di lusso
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tipologia.features.map((feature, i) => {
              const Icon = featureIcons[i] || Tent
              return (
                <ScrollReveal key={feature} delay={i * 0.08} direction="up">
                  <SpotlightCard
                    className="p-7 bg-white border border-[#EDE6DB] hover:border-[#A0845C]/30 transition-all duration-300 h-full"
                    spotlightColor={`${tipologia.color}20`}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: `${tipologia.color}15` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: tipologia.color }} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">{feature}</h3>
                    <p className="text-[#86868B] text-sm leading-relaxed">
                      {featureDescriptions[feature] || ''}
                    </p>
                  </SpotlightCard>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#ffffff" variant="gradient" height={60} />

      {/* GALLERY */}
      <section className="py-28 lg:py-36 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-20">
            <span className="text-[#A0845C] text-sm font-semibold tracking-widest uppercase">
              Portfolio
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#1D1D1F] mt-3 mb-4">
              Galleria
            </h2>
            <p className="text-[#86868B] text-lg">Le nostre realizzazioni glamping</p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <ImageLightbox images={galleryImages} columns={3} />
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#ffffff" to="#1D1D1F" variant="angle" height={80} />

      {/* PROCESSO */}
      <section className="relative py-28 lg:py-36 px-4 bg-[#1D1D1F] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#A0845C]/5 blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-20">
            <span className="text-[#A0845C] text-sm font-semibold tracking-widest uppercase">
              Come lavoriamo
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white mt-3 mb-4">
              Il Processo
            </h2>
            <p className="text-white/60 text-lg">Da idea a realtà in 5 semplici step</p>
          </ScrollReveal>

          <div className="space-y-6">
            {processSteps.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.1} direction="left">
                <GlassCard intensity="light" className="flex gap-6 items-start !p-6">
                  <span className="text-3xl font-bold text-[#A0845C] shrink-0 w-12">
                    {item.step}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-white/50 leading-relaxed">{item.desc}</p>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#A0845C" variant="wave" height={80} />

      {/* CTA */}
      <section className="relative py-28 lg:py-36 px-4 bg-[#A0845C] overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-[150px] pointer-events-none"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <ScrollReveal direction="up">
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-8">
              Pronto a trasformare la tua ospitalità?
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Contattaci per un preventivo personalizzato o per visitare le nostre strutture demo.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1D1D1F] font-semibold rounded-full hover:bg-white/90 transition-all duration-300 hover:shadow-lg"
              >
                Richiedi Preventivo
              </Link>
              <a
                href="tel:+3909631951395"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Chiama Ora
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
  )
}
