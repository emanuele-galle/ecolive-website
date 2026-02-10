'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Briefcase, Phone, ArrowLeft, LayoutGrid, Cable, Volume2,
  Thermometer, Puzzle, Award
} from 'lucide-react'
import { getTipologiaById } from '@/data/tipologie'
import BlurText from '@/components/ui/BlurText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SpotlightCard from '@/components/ui/SpotlightCard'
import SectionTransition from '@/components/ui/SectionTransition'
import InfiniteMarquee from '@/components/ui/InfiniteMarquee'
import GlassCard from '@/components/ui/GlassCard'

const featureIcons = [LayoutGrid, Cable, Volume2, Thermometer, Puzzle, Award]

const featureDescriptions: Record<string, string> = {
  'Layout flessibile': 'Configura gli spazi secondo le tue esigenze: pareti divisorie mobili, aree open space, sale riunioni dedicate.',
  'Cablaggio integrato': 'Predisposizione completa per fibra ottica, rete dati strutturata e sistemi AV.',
  'Acustica ottimizzata': 'Pannelli fonoassorbenti e pareti isolate per un ambiente di lavoro silenzioso.',
  'Climatizzazione efficiente': 'Sistema HVAC ad alta efficienza per comfort tutto l\'anno a costi ridotti.',
  'Espandibile modulare': 'Aggiungi moduli in qualsiasi momento senza interruzioni per il business.',
  'Immagine professionale': 'Design contemporaneo che comunica innovazione e attenzione all\'ambiente.',
}

const processSteps = [
  { step: '01', title: 'Consulenza', desc: 'Sopralluogo e analisi delle esigenze del tuo business' },
  { step: '02', title: 'Progetto', desc: 'Layout personalizzato con rendering 3D e specifiche tecniche' },
  { step: '03', title: 'Produzione', desc: 'Prefabbricazione in stabilimento con controllo qualità' },
  { step: '04', title: 'Montaggio', desc: 'Installazione rapida con minimo impatto sulle attività' },
  { step: '05', title: 'Consegna', desc: 'Spazio pronto all\'uso, chiavi in mano con garanzia 30 anni' },
]

const smartsuiteMarqueeItems = [
  'Uffici Modulari',
  'Sale Riunioni',
  'Coworking',
  'Showroom',
  'Studi Professionali',
  'Classe A4',
  'Espandibile',
  'Layout Flessibile',
]

export default function SmartSuitePage() {
  const tipologia = getTipologiaById('smartsuite')!

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
          className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-[#A0845C]/15 blur-[100px] pointer-events-none"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
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
            <div className="flex flex-wrap justify-center gap-10 mb-12">
              {tipologia.specs.map((spec) => (
                <div key={spec.label} className="text-center">
                  <p className="text-2xl font-bold text-white">{spec.value}</p>
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Torna alle Tipologie
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" variant="wave" height={80} />

      {/* CARATTERISTICHE */}
      <section className="py-28 lg:py-36 px-4 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-20">
            <span className="text-[#A0845C] text-sm font-semibold tracking-widest uppercase">
              Funzionalita
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#1D1D1F] mt-3 mb-4">
              Spazi Pensati per il Business
            </h2>
            <p className="text-[#86868B] text-lg max-w-2xl mx-auto">
              Ogni dettaglio progettato per la produttività e il comfort lavorativo
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tipologia.features.map((feature, i) => {
              const Icon = featureIcons[i] || Briefcase
              return (
                <ScrollReveal
                  key={feature}
                  direction="up"
                  delay={i * 0.08}
                >
                  <SpotlightCard
                    className="p-7 bg-white border border-[#EDE6DB] hover:border-[#A0845C]/30 transition-all duration-300 h-full"
                    spotlightColor={`${tipologia.color}20`}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: `${tipologia.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: tipologia.color }} />
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

      {/* Marquee */}
      <div className="bg-[#F5F5F7] pb-1">
        <div className="bg-[#A0845C]/10 border-y border-[#A0845C]/20 py-4">
          <InfiniteMarquee
            items={smartsuiteMarqueeItems}
            speed={25}
            className="text-[#1D1D1F]/70"
          />
        </div>
      </div>

      <SectionTransition from="#F5F5F7" to="#1D1D1F" variant="angle" height={80} />

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
            <p className="text-white/60 text-lg">Il tuo spazio di lavoro in 5 step</p>
          </ScrollReveal>

          <div className="space-y-6">
            {processSteps.map((item, i) => (
              <ScrollReveal
                key={item.step}
                direction="left"
                delay={i * 0.1}
              >
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
              Fai crescere il tuo business
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Contattaci per un sopralluogo gratuito e scopri come SmartSuite può trasformare il tuo modo di lavorare.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1D1D1F] font-semibold rounded-full hover:bg-white/90 transition-all duration-300 hover:shadow-lg"
              >
                Sopralluogo Gratuito
              </Link>
              <a
                href="tel:+3909631951395"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
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
