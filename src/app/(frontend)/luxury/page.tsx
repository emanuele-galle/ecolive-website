'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Gem, Cpu, Waves, Compass, Award, Shield,
  MessageCircle, ClipboardCheck, Factory, Wrench, KeyRound,
  Phone, ArrowLeft, type LucideIcon,
} from 'lucide-react'
import { getTipologiaById } from '@/data/tipologie'
import BlurText from '@/components/ui/BlurText'
import SpotlightCard from '@/components/ui/SpotlightCard'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'
import InfiniteMarquee from '@/components/ui/InfiniteMarquee'
import ImageLightbox from '@/components/ui/ImageLightbox'
import GlassCard from '@/components/ui/GlassCard'

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Gem,
    title: 'Finiture premium personalizzate',
    description: 'Materiali di pregio selezionati e finiture artigianali su misura per ogni ambiente.',
  },
  {
    icon: Cpu,
    title: 'Domotica integrata',
    description: 'Sistemi smart home di ultima generazione per comfort, sicurezza e risparmio energetico.',
  },
  {
    icon: Waves,
    title: 'Piscina e spa',
    description: 'Progettazione integrata di aree wellness, piscine e spazi relax esterni.',
  },
  {
    icon: Compass,
    title: 'Progettazione architettonica dedicata',
    description: 'Un team di architetti dedicato traduce la tua visione in un progetto unico.',
  },
  {
    icon: Award,
    title: 'Materiali esclusivi',
    description: 'Legno certificato PEFC, isolamento triplo strato, vetri antirumore di alta gamma.',
  },
  {
    icon: Shield,
    title: 'Certificazioni top di gamma',
    description: 'Classe energetica A4, antisismica, acustica e resistenza al fuoco certificate.',
  },
]

const galleryImages = [
  { src: '/images/luxury/gallery-1.jpg', alt: 'Villa Contemporanea', title: 'Villa Contemporanea' },
  { src: '/images/luxury/gallery-5.jpg', alt: 'Villa Moderna', title: 'Villa Moderna' },
  { src: '/images/luxury/gallery-8.jpg', alt: 'Residenza Premium', title: 'Residenza Premium' },
  { src: '/images/luxury/gallery-12.jpg', alt: 'Villa Esclusiva', title: 'Villa Esclusiva' },
  { src: '/images/luxury/gallery-15.jpg', alt: 'Villa Design', title: 'Villa Design' },
  { src: '/images/luxury/gallery-20.jpg', alt: 'Residenza Elegante', title: 'Residenza Elegante' },
  { src: '/images/luxury/gallery-25.jpg', alt: 'Villa Panoramica', title: 'Villa Panoramica' },
  { src: '/images/luxury/gallery-30.jpg', alt: 'Villa Natura', title: 'Villa Natura' },
  { src: '/images/luxury/gallery-35.jpg', alt: 'Residenza Esclusiva', title: 'Residenza Esclusiva' },
]

const processSteps: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: MessageCircle, title: 'Consulenza', description: 'Incontro esclusivo per definire la tua visione e le esigenze del progetto.' },
  { icon: ClipboardCheck, title: 'Progetto', description: 'Architettura su misura con render 3D e selezione materiali premium.' },
  { icon: Factory, title: 'Produzione', description: 'Realizzazione in stabilimento con controllo qualita certificato.' },
  { icon: Wrench, title: 'Montaggio', description: 'Installazione in cantiere con tempi rapidi e impatto minimo.' },
  { icon: KeyRound, title: 'Consegna', description: 'La tua villa pronta da vivere, chiavi in mano.' },
]

const luxuryMarqueeItems = [
  'Domotica',
  'Piscina & Spa',
  'Finiture Premium',
  'Design Esclusivo',
  'Classe A4',
  'Architettura Dedicata',
  'Materiali Certificati',
  'Garanzia 30 Anni',
]

export default function LuxuryPage() {
  const tipologia = getTipologiaById('luxury')

  return (
    <main className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#1E3D30]">
        <Image
          src="/images/luxury/hero-1.jpg"
          alt="Villa luxury Ecolive"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3D30]/60 via-transparent to-[#1E3D30]/80" />

        {/* Floating decorative orbs */}
        <motion.div
          className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#C4704B]/15 blur-[100px] pointer-events-none"
          animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#2D5A47]/20 blur-[120px] pointer-events-none"
          animate={{ y: [0, -25, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Link
            href="/tipologie"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tutte le tipologie
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#C4704B]/20 text-[#C4704B] border border-[#C4704B]/30 mb-8">
              Residenziale Premium
            </span>

            <BlurText
              text="Luxury"
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8"
              delay={150}
              animateBy="letters"
              direction="bottom"
            />

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
              {tipologia?.extendedDescription || 'Ville esclusive in bioedilizia con finiture premium e design contemporaneo.'}
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-white/90 text-sm md:text-base">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4704B]" />
                150-400 m²
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4704B]" />
                90-120 giorni
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4704B]" />
                Garanzia 30 anni
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionTransition from="#1E3D30" to="#FAF7F2" variant="wave" height={80} />

      {/* ===== CARATTERISTICHE ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-20">
            <span className="text-[#C4704B] text-sm font-semibold tracking-widest uppercase">
              Qualita superiore
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3D30] mt-3">
              Eccellenza in ogni dettaglio
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <ScrollReveal
                key={feature.title}
                direction="up"
                delay={i * 0.1}
              >
                <SpotlightCard
                  className="p-7 bg-white border border-[#1E3D30]/10 hover:border-[#C4704B]/30 transition-colors h-full"
                  spotlightColor="rgba(196, 112, 75, 0.15)"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1E3D30]/5 flex items-center justify-center mb-5">
                    <feature.icon className="w-6 h-6 text-[#C4704B]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1E3D30] mb-2">{feature.title}</h3>
                  <p className="text-[#1E3D30]/70 text-sm leading-relaxed">{feature.description}</p>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-[#FAF7F2] pb-1">
        <div className="bg-[#C4704B]/10 border-y border-[#C4704B]/20 py-4">
          <InfiniteMarquee
            items={luxuryMarqueeItems}
            speed={25}
            className="text-[#1E3D30]/70"
          />
        </div>
      </div>

      <SectionTransition from="#FAF7F2" to="#ffffff" variant="gradient" height={60} />

      {/* ===== GALLERY ===== */}
      <section className="py-28 lg:py-36 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-20">
            <span className="text-[#C4704B] text-sm font-semibold tracking-widest uppercase">
              Portfolio
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3D30] mt-3">
              I nostri progetti
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <ImageLightbox images={galleryImages} columns={3} />
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#ffffff" to="#FAF7F2" variant="wave" height={80} />

      {/* ===== PROCESSO ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" className="text-center mb-20">
            <span className="text-[#C4704B] text-sm font-semibold tracking-widest uppercase">
              Come lavoriamo
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3D30] mt-3">
              Il tuo percorso verso la villa dei sogni
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[#1E3D30]/15 hidden md:block" />

            <div className="space-y-10">
              {processSteps.map((step, i) => (
                <ScrollReveal
                  key={step.title}
                  direction="left"
                  delay={i * 0.1}
                >
                  <SpotlightCard className="flex gap-6 items-start p-5 bg-white border border-[#1E3D30]/8">
                    <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-[#1E3D30] flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="pt-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-semibold text-[#C4704B] tracking-widest uppercase">
                          Fase {i + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1E3D30] mb-1">{step.title}</h3>
                      <p className="text-[#1E3D30]/70 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionTransition from="#FAF7F2" to="#1E3D30" variant="angle" height={80} />

      {/* ===== CTA ===== */}
      <section className="relative py-28 lg:py-36 px-4 bg-[#1E3D30] overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#C4704B]/8 blur-[150px] pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#2D5A47]/15 blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <ScrollReveal direction="up">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              Progetta la tua villa esclusiva
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-white/70 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Raccontaci la tua visione. Il nostro team di esperti ti guidera nella realizzazione della villa dei tuoi sogni.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contatti"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C4704B] text-white font-semibold rounded-full hover:bg-[#B5613E] transition-all duration-300 hover:shadow-lg hover:shadow-[#C4704B]/20"
              >
                Richiedi Preventivo
              </Link>
              <a
                href="tel:+3909631951395"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Chiama ora
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
