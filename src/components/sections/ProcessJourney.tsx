'use client'

import { motion } from 'framer-motion'
import { MessageCircle, PenTool, Hammer, Key } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

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

export default function ProcessJourney() {
  return (
    <section className="py-24 lg:py-32 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1E3D30]">
            Da Sogno a <span className="text-[#C4704B]">Realta</span>
          </h2>
          <p className="text-[#6B6560] text-lg max-w-xl mx-auto mt-4">
            60 giorni dalla prima consulenza alle chiavi della tua nuova casa
          </p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:grid grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-[#E5E0D8]" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#1E3D30] flex items-center justify-center relative z-10">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-[#C4704B] text-sm font-semibold">{step.duration}</span>
                <h3 className="text-lg font-bold text-[#1E3D30] mt-1 mb-2">{step.title}</h3>
                <p className="text-[#6B6560] text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden space-y-8 relative pl-12">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-[#E5E0D8]" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-[#1E3D30] flex items-center justify-center z-10">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-[#C4704B] text-sm font-semibold">{step.duration}</span>
                <h3 className="text-lg font-bold text-[#1E3D30] mt-1 mb-1">{step.title}</h3>
                <p className="text-[#6B6560] text-sm">{step.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-[#8A857F] text-sm mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Processo certificato ISO 9001 &middot; Garanzia 30 anni &middot; 100% Made in Italy
        </motion.p>
      </div>
    </section>
  )
}
