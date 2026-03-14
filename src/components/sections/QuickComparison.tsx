'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check, X as XIcon } from 'lucide-react'

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
    <section className="bg-[#1D1D1F] text-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-widest text-[#A0845C] mb-4">
            Confronto
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Perch&eacute; scegliere X-Frame
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 text-sm font-semibold border-b border-white/10">
            <div className="px-5 py-4" />
            <div className="px-5 py-4 bg-[#A0845C]/15 text-[#A0845C] text-center">
              EcoLive X-Frame
            </div>
            <div className="px-5 py-4 text-white/50 text-center">
              Muratura Tradizionale
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className={`grid grid-cols-3 text-sm ${
                i < rows.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <div className="px-5 py-4 text-white/70 font-medium">
                {row.label}
              </div>
              <div className="px-5 py-4 bg-[#A0845C]/5 text-center font-medium flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-300">{row.xframe}</span>
              </div>
              <div className="px-5 py-4 text-center text-white/40 flex items-center justify-center gap-2">
                <XIcon className="w-4 h-4 text-white/25 shrink-0" />
                <span>{row.masonry}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/sistema-x-frame/confronto"
            className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Vedi il confronto completo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
