'use client'

import { motion } from 'framer-motion'
import { MessageCircle, PenTool, Hammer, Key } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SpotlightCard from '@/components/ui/SpotlightCard'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'

interface Step {
  number: string
  icon: LucideIcon
  title: string
  duration: string
  description: string
}

const steps: Step[] = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Consulenza Gratuita',
    duration: 'Giorno 1',
    description: 'Incontro per capire le tue esigenze e valutare il terreno.',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Design Personalizzato',
    duration: 'Giorni 2-7',
    description: 'Progetto su misura con rendering 3D fotorealistici.',
  },
  {
    number: '03',
    icon: Hammer,
    title: 'Realizzazione',
    duration: 'Giorni 8-25',
    description: 'Costruzione in stabilimento con sistema X-Frame.',
  },
  {
    number: '04',
    icon: Key,
    title: 'Chiavi in Mano',
    duration: 'Giorno 30',
    description: 'Montaggio rapido e consegna della tua nuova casa.',
  },
]

function AnimatedConnectorLine({ index }: { index: number }) {
  return (
    <div className="absolute top-10 left-full w-full h-px z-0 overflow-hidden hidden lg:block">
      <motion.div
        className="h-full bg-gradient-to-r from-[#C4704B]/50 to-[#C4704B]/10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  )
}

export default function ProcessJourney() {
  return (
    <>
      <SectionTransition from="#FFFCF7" to="#FAF7F2" variant="wave" height={80} />
      <section className="py-28 lg:py-36 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3D30]">
                Da Sogno a <span className="text-[#C4704B]">Realta</span>
              </h2>
              <p className="text-[#6B6560] text-lg max-w-xl mx-auto mt-5 leading-relaxed">
                60 giorni dalla prima consulenza alle chiavi della tua nuova casa
              </p>
            </div>
          </ScrollReveal>

          {/* Desktop: horizontal timeline with SpotlightCards */}
          <div className="hidden lg:grid grid-cols-4 gap-8 relative">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <ScrollReveal key={step.number} delay={i * 0.15}>
                  <div className="relative">
                    {/* Animated connector */}
                    {i < steps.length - 1 && <AnimatedConnectorLine index={i} />}

                    <SpotlightCard
                      className="bg-white border border-[#E5E0D8]/60 p-8 text-center h-full"
                      spotlightColor="rgba(196, 112, 75, 0.1)"
                    >
                      {/* Gradient number badge */}
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#1E3D30] to-[#2D5A47] flex items-center justify-center relative">
                        <Icon className="w-8 h-8 text-white" />
                        {/* Step number floating */}
                        <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#C4704B] flex items-center justify-center text-white text-xs font-bold shadow-lg">
                          {step.number}
                        </div>
                      </div>

                      <span className="inline-block text-[#C4704B] text-xs font-semibold uppercase tracking-wider bg-[#C4704B]/10 px-3 py-1 rounded-full">
                        {step.duration}
                      </span>
                      <h3 className="text-lg font-bold text-[#1E3D30] mt-3 mb-2">{step.title}</h3>
                      <p className="text-[#6B6560] text-sm leading-relaxed">{step.description}</p>
                    </SpotlightCard>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Mobile: vertical timeline */}
          <div className="lg:hidden space-y-6 relative pl-14">
            {/* Animated vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px overflow-hidden">
              <motion.div
                className="w-full bg-gradient-to-b from-[#C4704B] via-[#C4704B]/50 to-[#E5E0D8]"
                initial={{ height: '0%' }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </div>

            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <ScrollReveal key={step.number} delay={i * 0.12}>
                  <div className="relative">
                    <div className="absolute -left-14 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3D30] to-[#2D5A47] flex items-center justify-center z-10 shadow-md">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <SpotlightCard
                      className="bg-white border border-[#E5E0D8]/60 p-6"
                      spotlightColor="rgba(196, 112, 75, 0.1)"
                    >
                      <span className="inline-block text-[#C4704B] text-xs font-semibold uppercase tracking-wider bg-[#C4704B]/10 px-2.5 py-0.5 rounded-full">
                        {step.duration}
                      </span>
                      <h3 className="text-lg font-bold text-[#1E3D30] mt-2 mb-1">{step.title}</h3>
                      <p className="text-[#6B6560] text-sm">{step.description}</p>
                    </SpotlightCard>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Bottom note */}
          <ScrollReveal delay={0.6}>
            <p className="text-center text-[#8A857F] text-sm mt-16">
              Processo certificato ISO 9001 &middot; Garanzia 30 anni &middot; 100% Made in Italy
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
