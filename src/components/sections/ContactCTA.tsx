'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import InfiniteMarquee from '@/components/ui/InfiniteMarquee'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'

const priceCards = [
  {
    tier: 'Grezzo Base',
    price: '1.200',
    description: 'Struttura portante e chiusura esterna',
    features: ['Struttura X-Frame', 'Pareti perimetrali', 'Copertura', 'Impermeabilizzazione'],
  },
  {
    tier: 'Avanzato',
    price: '1.600',
    description: 'Grezzo + impianti e finiture interne base',
    features: ['Tutto del Grezzo Base', 'Impianto elettrico', 'Impianto idraulico', 'Cappotto termico'],
    highlighted: true,
  },
  {
    tier: 'Chiavi in Mano',
    price: '2.100',
    description: 'Casa completa, pronta da abitare',
    features: ['Tutto dell\'Avanzato', 'Finiture premium', 'Pavimenti e rivestimenti', 'Cucina e bagni'],
  },
]

const marqueeItems = [
  'Richiedi Preventivo Gratuito',
  'Consulenza Gratuita',
  'Risposta in 24h',
  'Prezzi Trasparenti',
  'Senza Impegno',
]

/* Animated gradient orbs for background */
function GradientOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -top-1/3 -right-1/4 w-[50vw] h-[50vw] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(196,112,75,0.3) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-[40vw] h-[40vw] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(45,90,71,0.4) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

export default function ContactCTA() {
  return (
    <>
      <SectionTransition from="#FAF7F2" to="#1E3D30" variant="wave" height={80} />
      <section className="relative bg-[#1E3D30] overflow-hidden">
        <GradientOrbs />

        {/* Marquee strip at top */}
        <div className="relative z-10 bg-[#C4704B]/10 border-b border-white/5 py-4">
          <InfiniteMarquee
            items={marqueeItems}
            speed={20}
            direction="right"
            className="text-[#C4704B]/80"
          />
        </div>

        <div className="relative z-10 py-28 lg:py-36">
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  Quanto Costa la Tua <span className="text-[#C4704B]">Casa</span>?
                </h2>
                <p className="text-white/60 text-lg max-w-xl mx-auto mt-5 leading-relaxed">
                  Prezzi trasparenti, nessuna sorpresa. Scegli il livello di finitura che preferisci.
                </p>
              </div>
            </ScrollReveal>

            {/* Price cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {priceCards.map((card, i) => (
                <ScrollReveal key={card.tier} delay={i * 0.12}>
                  {card.highlighted ? (
                    <motion.div
                      className="bg-gradient-to-br from-[#C4704B] to-[#A85A3A] rounded-2xl p-8 ring-2 ring-[#C4704B] ring-offset-2 ring-offset-[#1E3D30] relative overflow-hidden h-full"
                      whileHover={{ scale: 1.02, y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Popular badge */}
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Piu Scelto
                      </div>

                      <div className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">
                        {card.tier}
                      </div>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl font-bold text-white">&euro;{card.price}</span>
                        <span className="text-sm text-white/70">/mq</span>
                      </div>
                      <p className="text-sm mb-6 text-white/80">{card.description}</p>
                      <ul className="space-y-2.5">
                        {card.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-white/90">
                            <Check className="w-4 h-4 mt-0.5 text-white/80 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : (
                    <GlassCard intensity="light" className="p-8 h-full">
                      <motion.div
                        className="h-full"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/50">
                          {card.tier}
                        </div>
                        <div className="flex items-baseline gap-1 mb-2">
                          <span className="text-4xl font-bold text-white">&euro;{card.price}</span>
                          <span className="text-sm text-white/40">/mq</span>
                        </div>
                        <p className="text-sm mb-6 text-white/50">{card.description}</p>
                        <ul className="space-y-2.5">
                          {card.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-sm text-white/60">
                              <Check className="w-4 h-4 mt-0.5 text-[#C4704B]/60 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </GlassCard>
                  )}
                </ScrollReveal>
              ))}
            </div>

            {/* CTA */}
            <ScrollReveal delay={0.3}>
              <div className="text-center">
                <Link
                  href="/contatti"
                  className="inline-flex items-center gap-2 px-10 py-5 bg-[#C4704B] hover:bg-[#A85A3A] text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group"
                >
                  Richiedi Preventivo Gratuito
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <p className="text-white/40 text-sm mt-5">
                  Consulenza gratuita &middot; Risposta entro 24 ore &middot; Senza impegno
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
