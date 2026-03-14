'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Layers,
  LayoutGrid,
  Home,
  Truck,
  BarChart3,
  ShieldCheck,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

// --- Static Data ---

const keyStats = [
  {
    value: '0,159',
    unit: 'W/m²K',
    label: 'Trasmittanza pareti',
  },
  {
    value: '18,8',
    unit: 'ore',
    label: 'Sfasamento',
  },
  {
    value: '29',
    unit: 'cm',
    label: 'Spessore pareti',
  },
]

const navigationCards = [
  {
    title: 'Pareti',
    href: '/sistema-x-frame/pareti',
    icon: Layers,
    description:
      'Stratigrafia completa delle pareti X-Frame: 14 componenti ingegnerizzati per isolamento termoacustico superiore e zero ponti termici.',
  },
  {
    title: 'Solai',
    href: '/sistema-x-frame/solai',
    icon: LayoutGrid,
    description:
      'Moduli solaio prefabbricati con struttura portante in legno lamellare, isolamento integrato e predisposizione impiantistica.',
  },
  {
    title: 'Coperture',
    href: '/sistema-x-frame/coperture',
    icon: Home,
    description:
      'Soluzioni per tetto piano, a falde e combinato. Trasmittanza fino a 0,137 W/m²K con ventilazione naturale integrata.',
  },
  {
    title: 'Trasporto e Montaggio',
    href: '/sistema-x-frame/trasporto-montaggio',
    icon: Truck,
    description:
      'Trasporto orizzontale dei pannelli e montaggio della struttura portante in un solo giorno grazie alla prefabbricazione totale.',
  },
  {
    title: 'Confronto',
    href: '/sistema-x-frame/confronto',
    icon: BarChart3,
    description:
      'Tabelle comparative dettagliate tra X-Frame, costruzione tradizionale, X-Lam e Platform Frame su prestazioni, tempi e costi.',
  },
]

const certifications = [
  { name: 'A4 CliMAX', label: 'Classe Energetica' },
  { name: 'Passive House / PHIUS', label: 'Standard Passivo' },
  { name: 'ARCA', label: 'Architettura Comfort Ambiente' },
  { name: 'LEED for Homes', label: 'Green Building' },
]

// --- Animation Variants ---

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// --- Component ---

export default function SistemaXFrameContent() {
  return (
    <div className="min-h-screen">

      {/* ========== 1. HERO BANNER ========== */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/xframe-render/optimized/spaccato-copertina.webp"
            alt="Spaccato costruttivo sistema X-Frame Ecolive"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#1D1D1F]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1D1D1F]/40 via-transparent to-[#1D1D1F]/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-20">
          <ScrollReveal>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Sistema Costruttivo{' '}
              <span className="text-[#A0845C]">X-Frame</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Il sistema costruttivo ibrido che unisce il meglio di{' '}
              <span className="text-white/90 font-medium">Platform Frame</span>,{' '}
              <span className="text-white/90 font-medium">X-Lam</span> e{' '}
              <span className="text-white/90 font-medium">Post and Beam</span>{' '}
              in un&apos;unica tecnologia brevettata.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== 2. INTRODUCTION ========== */}
      <section className="py-20 lg:py-28 bg-[#F5F5F7]">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <blockquote className="text-center">
              <p className="text-xl md:text-2xl lg:text-[1.65rem] text-[#1D1D1F] leading-relaxed font-light">
                &ldquo;L&apos;innovativo X-Frame rappresenta un ibrido dei sistemi costruttivi
                Platform Frame, X-Lam e Post and Beam. Le performance strutturali
                complessive surclassano qualsivoglia altro sistema, così come la
                velocità operativa nel montaggio si è rivelata insuperabile.&rdquo;
              </p>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== 3. KEY STATS ========== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {keyStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeInUp}
                className="text-center p-8 rounded-2xl bg-[#F5F5F7] border border-[#E5E5E7]"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#A0845C] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[#86868B] mb-3">{stat.unit}</div>
                <div className="text-[#1D1D1F] font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== 4. NAVIGATION CARDS ========== */}
      <section className="py-20 lg:py-28 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-4">
                Esplora il <span className="text-[#A0845C]">Sistema</span>
              </h2>
              <p className="text-[#86868B] text-lg max-w-2xl mx-auto">
                Approfondisci ogni aspetto della tecnologia costruttiva X-Frame
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {navigationCards.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.title}
                  custom={i}
                  variants={fadeInUp}
                  className={i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}
                >
                  <Link href={card.href} className="group block h-full">
                    <div className="h-full p-8 rounded-2xl bg-white border border-[#E5E5E7] hover:shadow-lg hover:shadow-[#A0845C]/8 transition-all duration-300 hover:border-[#A0845C]/30 flex flex-col">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#F5F5F7] text-[#A0845C] mb-5 group-hover:bg-[#A0845C]/10 transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="text-xl font-semibold text-[#1D1D1F] mb-3">
                        {card.title}
                      </h3>

                      <p className="text-[#86868B] leading-relaxed text-sm flex-1 mb-5">
                        {card.description}
                      </p>

                      <div className="flex items-center gap-2 text-[#A0845C] font-medium text-sm group-hover:gap-3 transition-all duration-300">
                        Scopri di più
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== 5. CERTIFICATIONS ========== */}
      <section className="py-16 lg:py-20 bg-white border-t border-[#E5E5E7]">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] mb-3">
                Certificazioni e Standard
              </h2>
              <p className="text-[#86868B]">
                Il sistema X-Frame soddisfa i più rigorosi standard internazionali
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                custom={i}
                variants={fadeInUp}
                className="text-center p-6 rounded-2xl border border-[#E5E5E7] bg-[#F5F5F7] hover:border-[#A0845C]/30 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#A0845C]/10 text-[#A0845C] mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-[#1D1D1F] font-semibold text-sm mb-1">
                  {cert.name}
                </div>
                <div className="text-[#86868B] text-xs">{cert.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  )
}
