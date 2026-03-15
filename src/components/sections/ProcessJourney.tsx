'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MessageCircle, Eye, PenTool, FileCheck,
  Wrench, Factory, Hammer, ArrowRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Step {
  number: string
  icon: LucideIcon
  title: string
  duration: string
  description: string
}

const steps: Step[] = [
  { number: '01', icon: MessageCircle, title: 'Primo Contatto', duration: '', description: 'Ci conosci online, ci contatti. Ti invitiamo in sede a Spadola con la documentazione del tuo terreno.' },
  { number: '02', icon: Eye, title: 'Visita in Sede', duration: '', description: 'Vedi il sistema X-Frame dal vivo, i nostri rendering, il modo in cui lavoriamo. Firmi il mandato di progettazione.' },
  { number: '03', icon: PenTool, title: 'Progettazione', duration: '', description: 'Sopralluogo drone, modellazione Revit, rendering fotorealistici della tua casa nel contesto reale.' },
  { number: '04', icon: FileCheck, title: 'Contratto', duration: '', description: 'Contratto di appalto dettagliato con termini, fasi e pagamenti strutturati.' },
  { number: '05', icon: Wrench, title: 'Preparazione Cantiere', duration: 'A cura tua', description: 'Scavi, fondazioni e platea. Noi verifichiamo che sia tutto pronto per il montaggio.' },
  { number: '06', icon: Factory, title: 'Produzione', duration: '', description: 'Produciamo pareti, solai e coperture nel nostro laboratorio a temperatura e umidità controllate.' },
  { number: '07', icon: Hammer, title: 'Montaggio', duration: '7 giorni', description: 'Pilastri, pareti e copertura montati in 7 giorni da 8-12 operatori specializzati con autogru.' },
]

export default function ProcessJourney() {
  return (
    <section className="py-32 lg:py-40 bg-[#F5F5F7] relative overflow-hidden">
      {/* Decorative background number */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[30rem] font-bold text-[#1D1D1F]/[0.02] select-none pointer-events-none leading-none">
        7
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#A0845C]/40" />
            <span className="text-xs font-semibold text-[#A0845C] uppercase tracking-[0.2em]">
              Il Percorso
            </span>
            <div className="h-px w-12 bg-[#A0845C]/40" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D1D1F] tracking-tight">
            7 step verso la<br />
            <span className="text-[#A0845C]">tua nuova casa</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <motion.div
            className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#A0845C] via-[#A0845C]/50 to-[#D2D2D7]/30" />
          </motion.div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isLeft = i % 2 === 0

              return (
                <motion.div
                  key={step.number}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  {/* Number circle (center on desktop, left on mobile) */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-[#1D1D1F] flex items-center justify-center ring-4 ring-[#F5F5F7]">
                      <span className="text-sm font-bold text-[#A0845C]">{step.number}</span>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${
                    isLeft ? 'md:pr-0' : 'md:pl-0'
                  }`}>
                    <div className="group bg-white rounded-2xl p-6 md:p-8 border border-[#D2D2D7]/40 hover:border-[#A0845C]/20 transition-all duration-500 hover:shadow-[0_12px_40px_-12px_rgba(160,132,92,0.12)]">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#A0845C]/8 flex items-center justify-center flex-shrink-0 group-hover:bg-[#A0845C]/15 transition-colors">
                          <Icon className="w-5 h-5 text-[#A0845C]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-[#1D1D1F]">{step.title}</h3>
                            {step.duration && (
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A0845C] bg-[#A0845C]/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                                {step.duration}
                              </span>
                            )}
                          </div>
                          <p className="text-[#86868B] text-base leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/il-processo"
            className="inline-flex items-center gap-2 text-sm text-[#86868B] hover:text-[#A0845C] font-medium uppercase tracking-wider transition-colors duration-300 group"
          >
            Scopri ogni dettaglio del processo
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
