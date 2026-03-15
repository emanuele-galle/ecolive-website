'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  Check,
  X,
  Clock,
  Home,
  Zap,
  Thermometer,
  Timer,
  Shield,
  Factory,
  Activity,
  Leaf,
  HardHat,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface ComparisonItem {
  param: string
  xframe: string
  masonry: string
  icon: LucideIcon
}

const comparisons: ComparisonItem[] = [
  { param: 'Montaggio struttura', xframe: '7 giorni', masonry: '6-12 mesi', icon: Clock },
  { param: 'Chiavi in mano', xframe: '30 giorni', masonry: '12-24 mesi', icon: Home },
  { param: 'Classe energetica', xframe: 'A1 — A4 (passiva)', masonry: 'B-C (tipica)', icon: Zap },
  { param: 'Trasmittanza pareti', xframe: '0,159 W/m²K', masonry: '0,28-0,40 W/m²K', icon: Thermometer },
  { param: 'Sfasamento termico', xframe: '18,8 ore', masonry: '8-12 ore', icon: Timer },
  { param: 'Garanzia struttura', xframe: '50 anni', masonry: 'Non standard', icon: Shield },
  { param: 'Prefabbricazione', xframe: '95%+ in laboratorio', masonry: '0% (tutto in cantiere)', icon: Factory },
  { param: 'Antisismicità', xframe: 'Eccellente (legno + acciaio)', masonry: 'Buona (con rinforzi)', icon: Activity },
  { param: 'Sostenibilità', xframe: 'Legno certificato PEFC', masonry: 'Calcestruzzo + laterizi', icon: Leaf },
  { param: 'Cantiere', xframe: 'Pulito, minimo impatto', masonry: 'Invasivo, lungo, rumoroso', icon: HardHat },
]

const easeOut = [0.25, 0.1, 0.25, 1] as const

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: easeOut },
  }),
}

const rowVariants = {
  hidden: { opacity: 0, x: 0 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: 0.3 + i * 0.06, ease: easeOut },
  }),
}

export default function QuickComparison() {
  return (
    <section className="relative bg-[#1D1D1F] text-white py-28 px-6 overflow-hidden">
      {/* Decorative background elements */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        {/* Subtle gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#A0845C]/[0.03] blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-emerald-500/[0.03] blur-[120px]" />
        {/* VS watermark */}
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[28rem] font-black text-white/[0.015] leading-none">
          VS
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <p className="text-xs uppercase tracking-[0.25em] text-[#A0845C] mb-4 font-medium">
              Confronto
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              X-Frame vs Muratura Tradizionale
            </h2>
            <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto">
              Numeri reali, risultati misurabili. Ecco perch&eacute; il sistema X-Frame
              supera la costruzione tradizionale in ogni parametro.
            </p>
          </div>
        </ScrollReveal>

        {/* Two-column card layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* X-Frame Card (winner) */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="relative rounded-2xl border border-[#A0845C]/20 bg-gradient-to-br from-[#A0845C]/[0.08] to-transparent p-6 md:p-8"
          >
            {/* Card glow effect */}
            <div
              aria-hidden
              className="absolute -top-px -left-px -right-px h-px bg-gradient-to-r from-transparent via-[#A0845C]/40 to-transparent"
            />

            {/* Card header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#A0845C]/15">
                <Check className="w-5 h-5 text-[#A0845C]" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white">EcoLive X-Frame</h3>
                <p className="text-xs text-[#A0845C]/80 uppercase tracking-wider font-medium">Sistema costruttivo brevettato</p>
              </div>
            </div>

            {/* X-Frame rows */}
            <div className="space-y-0">
              {comparisons.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.param}
                    custom={i}
                    variants={rowVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-start gap-3 py-3.5 border-b border-white/[0.06] last:border-b-0"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-[#A0845C]/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/40 uppercase tracking-wider mb-1 font-medium">
                        {item.param}
                      </p>
                      <p className="text-sm md:text-base font-semibold text-white">
                        {item.xframe}
                      </p>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Masonry Card (loser) */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8"
          >
            {/* Card header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.05]">
                <X className="w-5 h-5 text-white/30" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white/40">Muratura Tradizionale</h3>
                <p className="text-xs text-white/20 uppercase tracking-wider font-medium">Metodo convenzionale</p>
              </div>
            </div>

            {/* Masonry rows */}
            <div className="space-y-0">
              {comparisons.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.param}
                    custom={i}
                    variants={rowVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-start gap-3 py-3.5 border-b border-white/[0.04] last:border-b-0"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-white/15" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/20 uppercase tracking-wider mb-1 font-medium">
                        {item.param}
                      </p>
                      <p className="text-sm md:text-base text-white/25 line-through decoration-white/10">
                        {item.masonry}
                      </p>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center">
                        <X className="w-3 h-3 text-red-400/50" />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom callout */}
        <ScrollReveal delay={0.4}>
          <div className="mt-14 md:mt-20 flex flex-col items-center gap-6">
            {/* Highlight badge */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl bg-[#A0845C]/10 blur-xl"
              />
              <div className="relative px-8 py-5 rounded-2xl bg-gradient-to-r from-[#A0845C]/[0.12] to-[#A0845C]/[0.06] border border-[#A0845C]/20 text-center">
                <p className="text-[#A0845C] text-lg md:text-xl font-bold mb-1">
                  Fino al 20% di risparmio
                </p>
                <p className="text-white/40 text-sm">
                  sui costi complessivi dell&apos;edificio rispetto alla muratura tradizionale
                </p>
              </div>
            </div>

            {/* CTA link */}
            <Link
              href="/sistema-x-frame/confronto"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-[#A0845C] transition-colors group"
            >
              Vedi il confronto completo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
