'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const rows = [
  { label: 'Tempo struttura', xframe: '3-7 giorni', masonry: '12-48 mesi' },
  { label: 'Chiavi in mano', xframe: '30 giorni', masonry: 'Non definibile' },
  { label: 'Classe energetica', xframe: 'A1 — A4 (passiva)', masonry: 'B-C' },
  { label: 'Trasmittanza pareti', xframe: '0,159 W/m²K', masonry: '0,28-0,40 W/m²K' },
  { label: 'Garanzia struttura', xframe: '50 anni', masonry: 'Non standard' },
  { label: 'Prefabbricazione', xframe: '95%+ in laboratorio', masonry: '0% (tutto in cantiere)' },
]

export default function QuickComparison() {
  return (
    <section className="relative bg-[#1D1D1F] text-white py-28 px-6 overflow-hidden">
      {/* Decorative VS background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="text-[16rem] md:text-[22rem] font-black text-white/[0.02] leading-none">
          VS
        </span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[#A0845C] mb-4">
            Confronto
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Perch&eacute; scegliere X-Frame
          </h2>
        </motion.div>

        {/* Column headers */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-4 md:gap-8 mb-8 px-2">
          <div className="text-right">
            <span className="text-sm font-semibold text-[#A0845C] tracking-wide uppercase">
              EcoLive X-Frame
            </span>
          </div>
          <div className="w-px" />
          <div className="text-left">
            <span className="text-sm font-semibold text-white/30 tracking-wide uppercase">
              Muratura Tradizionale
            </span>
          </div>
        </div>

        {/* Comparison rows */}
        <div className="space-y-0">
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8 py-5 px-2 border-b border-white/[0.06] last:border-b-0"
            >
              {/* X-Frame value */}
              <p className="text-right text-base md:text-lg font-semibold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.25)]">
                {row.xframe}
              </p>

              {/* Center label */}
              <span className="text-xs md:text-sm uppercase tracking-wider text-white/40 font-medium text-center min-w-[7rem] md:min-w-[10rem]">
                {row.label}
              </span>

              {/* Masonry value */}
              <p className="text-left text-base md:text-lg text-white/25 line-through decoration-white/10">
                {row.masonry}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom highlight + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 flex flex-col items-center gap-6"
        >
          <span className="inline-block px-6 py-3 rounded-full bg-[#A0845C]/20 border border-[#A0845C]/30 text-[#A0845C] text-sm md:text-base font-semibold tracking-wide text-center">
            Fino al 20% di risparmio sui costi complessivi dell&apos;edificio
          </span>

          <Link
            href="/sistema-x-frame/confronto"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors group"
          >
            Vedi il confronto completo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
