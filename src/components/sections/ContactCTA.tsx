'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const trustPoints = [
  'Risposta entro 24 ore',
  'Consulenza senza impegno',
  'Preventivo trasparente e dettagliato',
]

export default function ContactCTA() {
  return (
    <section className="py-24 lg:py-32 bg-[#1D1D1F]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Title */}
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Inizia il Tuo Progetto
          </h2>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal delay={0.1}>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            Raccontaci la tua idea. Ti guideremo dalla prima consulenza alla
            consegna delle chiavi, con trasparenza e professionalita in ogni fase.
          </p>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/contatti"
              className="inline-flex items-center gap-2 bg-[#A0845C] hover:bg-[#856B45] text-white font-semibold rounded-xl px-8 py-4 transition-all duration-300 hover:scale-[1.02] group"
            >
              Richiedi Consulenza Gratuita
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+390963951395"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white/50 text-white font-semibold rounded-xl px-8 py-4 transition-all duration-300 hover:bg-white/5"
            >
              <Phone className="w-5 h-5" />
              Chiama +39 0963 1951395
            </a>
          </div>
        </ScrollReveal>

        {/* Trust points */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-10">
            {trustPoints.map((point, i) => (
              <span
                key={i}
                className="text-white/50 text-sm flex items-center gap-2"
              >
                {i > 0 && (
                  <span className="hidden sm:inline text-white/20">&middot;</span>
                )}
                {point}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
