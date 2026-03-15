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
import CountUp from '@/components/ui/CountUp'

// --- Static Data ---

const keyStats = [
  { to: 0.159, decimals: 3, suffix: ' W/m²K', label: 'Trasmittanza pareti' },
  { to: 18.8, decimals: 1, suffix: ' ore', label: 'Sfasamento termico' },
  { to: 29, decimals: 0, suffix: ' cm', label: 'Spessore pareti' },
]

const navigationCards = [
  {
    title: 'Pareti',
    href: '/sistema-x-frame/pareti',
    icon: Layers,
    description:
      '14 componenti ingegnerizzati per isolamento termoacustico superiore e zero ponti termici.',
  },
  {
    title: 'Solai',
    href: '/sistema-x-frame/solai',
    icon: LayoutGrid,
    description:
      'Moduli prefabbricati con struttura portante in legno lamellare e isolamento integrato.',
  },
  {
    title: 'Coperture',
    href: '/sistema-x-frame/coperture',
    icon: Home,
    description:
      'Tetto piano, a falde e combinato. Trasmittanza fino a 0,137 W/m²K con ventilazione naturale.',
  },
  {
    title: 'Trasporto e Montaggio',
    href: '/sistema-x-frame/trasporto-montaggio',
    icon: Truck,
    description:
      'Struttura portante montata in 7 giorni grazie alla prefabbricazione totale in stabilimento.',
  },
  {
    title: 'Confronto',
    href: '/sistema-x-frame/confronto',
    icon: BarChart3,
    description:
      'Tabelle comparative tra X-Frame, costruzione tradizionale, X-Lam e Platform Frame.',
  },
]

const certifications = [
  { name: 'A4 CliMAX', label: 'Classe Energetica' },
  { name: 'Passive House / PHIUS', label: 'Standard Passivo' },
  { name: 'ARCA', label: 'Architettura Comfort Ambiente' },
  { name: 'LEED for Homes', label: 'Green Building' },
  { name: 'Woodworks', label: 'Residential Construction' },
]

// --- Animation Variants ---

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

// --- Component ---

export default function SistemaXFrameContent() {
  return (
    <div className="min-h-screen">

      {/* ========== 1. HERO ========== */}
      <section className="relative min-h-[75vh] lg:min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/xframe-render/optimized/spaccato-copertina.webp"
            alt="Spaccato costruttivo sistema X-Frame Ecolive"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F] via-[#1D1D1F]/50 to-[#1D1D1F]/20" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-16 lg:pb-24">
          <ScrollReveal>
            <p className="uppercase tracking-[0.25em] text-[#A0845C] text-xs sm:text-sm font-semibold mb-4">
              La bioedilizia più innovativa parte dal Sud
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.08] max-w-4xl">
              Sistema Costruttivo{' '}
              <span className="text-[#A0845C]">X-Frame</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl leading-relaxed">
              L&apos;ibrido brevettato che fonde{' '}
              <span className="text-white/90 font-medium">Platform Frame</span>,{' '}
              <span className="text-white/90 font-medium">X-Lam</span> e{' '}
              <span className="text-white/90 font-medium">Post and Beam</span>{' '}
              in un unico sistema dalle prestazioni insuperabili.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== 2. BLOCKQUOTE ========== */}
      <section className="py-24 lg:py-32 bg-[#F5F5F7]">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <blockquote className="relative pl-8 border-l-4 border-[#A0845C]">
              <p className="text-xl md:text-2xl lg:text-[1.7rem] text-[#1D1D1F]/90 leading-relaxed italic font-light">
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
      <section className="py-20 lg:py-28 bg-[#1D1D1F]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-3 gap-8 lg:gap-12"
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
                className="text-center py-10"
              >
                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#A0845C] mb-2 tabular-nums">
                  <CountUp
                    to={stat.to}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    duration={2.5}
                    separator="."
                  />
                </div>
                <div className="text-white/50 text-sm uppercase tracking-wider mt-3">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== 4. NAVIGATION CARDS ========== */}
      <section className="py-24 lg:py-32 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-4">
                Esplora il <span className="text-[#A0845C]">Sistema</span>
              </h2>
              <p className="text-[#86868B] text-lg md:text-xl max-w-2xl mx-auto">
                Approfondisci ogni aspetto della tecnologia costruttiva X-Frame
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
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
                    <div className="relative h-full p-8 rounded-2xl bg-white border border-[#E5E5E7] transition-all duration-300 hover:shadow-xl hover:shadow-[#A0845C]/8 hover:border-[#A0845C]/30 flex flex-col overflow-hidden">
                      {/* Gold top border on hover */}
                      <div className="absolute top-0 inset-x-0 h-[3px] bg-[#A0845C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#F5F5F7] text-[#A0845C] mb-6 group-hover:bg-[#A0845C]/10 transition-colors duration-300">
                        <Icon className="w-7 h-7" />
                      </div>

                      <h3 className="text-xl font-semibold text-[#1D1D1F] mb-3">
                        {card.title}
                      </h3>

                      <p className="text-[#86868B] leading-relaxed text-base flex-1 mb-6">
                        {card.description}
                      </p>

                      <div className="flex items-center gap-2 text-[#A0845C] font-medium text-sm group-hover:gap-3 transition-all duration-300">
                        Scopri di più
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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
      <section className="py-20 lg:py-24 bg-white border-t border-[#E5E5E7]">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-[#1D1D1F] mb-3">
                Certificazioni e Standard
              </h2>
              <p className="text-[#86868B] text-base md:text-lg max-w-xl mx-auto">
                X-Frame soddisfa i più rigorosi standard internazionali di bioedilizia
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5"
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
                className="text-center p-6 rounded-2xl border border-[#E5E5E7] bg-[#F5F5F7] hover:border-[#A0845C]/30 hover:bg-white transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#A0845C]/10 text-[#A0845C] mb-4">
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
