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

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

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

const galleryImages: { src: string; title: string }[] = [
  { src: '/images/luxury/gallery-1.jpg', title: 'Villa Contemporanea' },
  { src: '/images/luxury/gallery-5.jpg', title: 'Villa Moderna' },
  { src: '/images/luxury/gallery-8.jpg', title: 'Residenza Premium' },
  { src: '/images/luxury/gallery-12.jpg', title: 'Villa Esclusiva' },
  { src: '/images/luxury/gallery-15.jpg', title: 'Villa Design' },
  { src: '/images/luxury/gallery-20.jpg', title: 'Residenza Elegante' },
  { src: '/images/luxury/gallery-25.jpg', title: 'Villa Panoramica' },
  { src: '/images/luxury/gallery-30.jpg', title: 'Villa Natura' },
  { src: '/images/luxury/gallery-35.jpg', title: 'Residenza Esclusiva' },
]

const processSteps: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: MessageCircle, title: 'Consulenza', description: 'Incontro esclusivo per definire la tua visione e le esigenze del progetto.' },
  { icon: ClipboardCheck, title: 'Progetto', description: 'Architettura su misura con render 3D e selezione materiali premium.' },
  { icon: Factory, title: 'Produzione', description: 'Realizzazione in stabilimento con controllo qualita certificato.' },
  { icon: Wrench, title: 'Montaggio', description: 'Installazione in cantiere con tempi rapidi e impatto minimo.' },
  { icon: KeyRound, title: 'Consegna', description: 'La tua villa pronta da vivere, chiavi in mano.' },
]

export default function LuxuryPage() {
  const tipologia = getTipologiaById('luxury')

  return (
    <main className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#1E3D30]">
        <Image
          src="/images/luxury/hero-1.jpg"
          alt="Villa luxury Ecolive"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3D30]/60 via-transparent to-[#1E3D30]/80" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Link
            href="/tipologie"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tutte le tipologie
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#C4704B]/20 text-[#C4704B] border border-[#C4704B]/30 mb-6">
              Residenziale Premium
            </span>

            <BlurText
              text="Luxury"
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
              delay={150}
              animateBy="letters"
              direction="bottom"
            />

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              {tipologia?.extendedDescription || 'Ville esclusive in bioedilizia con finiture premium e design contemporaneo.'}
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-white/90 text-sm md:text-base">
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

      {/* ===== CARATTERISTICHE ===== */}
      <section className="py-20 lg:py-28 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <span className="text-[#C4704B] text-sm font-semibold tracking-widest uppercase">
              Qualita superiore
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3D30] mt-3">
              Eccellenza in ogni dettaglio
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <SpotlightCard className="p-6 bg-white border border-[#1E3D30]/10 hover:border-[#C4704B]/30 transition-colors h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#1E3D30]/5 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-[#C4704B]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1E3D30] mb-2">{feature.title}</h3>
                  <p className="text-[#1E3D30]/70 text-sm leading-relaxed">{feature.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="py-20 lg:py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <span className="text-[#C4704B] text-sm font-semibold tracking-widest uppercase">
              Portfolio
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3D30] mt-3">
              I nostri progetti
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-semibold text-sm">{img.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESSO ===== */}
      <section className="py-20 lg:py-28 px-4 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <span className="text-[#C4704B] text-sm font-semibold tracking-widest uppercase">
              Come lavoriamo
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3D30] mt-3">
              Il tuo percorso verso la villa dei sogni
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[#1E3D30]/15 hidden md:block" />

            <div className="space-y-8">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 items-start"
                >
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
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 lg:py-28 px-4 bg-[#1E3D30]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Progetta la tua villa esclusiva
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Raccontaci la tua visione. Il nostro team di esperti ti guidera nella realizzazione della villa dei tuoi sogni.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contatti"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C4704B] text-white font-semibold rounded-full hover:bg-[#B5613E] transition-colors"
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
          </motion.div>
        </div>
      </section>
    </main>
  )
}
