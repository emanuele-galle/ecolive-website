'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, Thermometer, Clock, Leaf, Home, Zap } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Massima Sicurezza Antisismica',
    description: 'Certificato per zona sismica 1. La struttura in legno assorbe e dissipa l\'energia sismica in modo ottimale grazie alla sua flessibilita naturale.',
    stat: 'Zona 1',
  },
  {
    icon: Thermometer,
    title: 'Isolamento Termico Superiore',
    description: 'Trasmittanza termica U=0.12 W/m²K, superiore agli standard Passive House. Risparmio fino all\'80% sui costi di riscaldamento.',
    stat: '-80%',
  },
  {
    icon: Clock,
    title: 'Costruzione Rapida',
    description: 'Dalla fondazione alla consegna in soli 60 giorni lavorativi. Produzione off-site con precisione millimetrica.',
    stat: '60 giorni',
  },
  {
    icon: Leaf,
    title: 'Sostenibilita Certificata',
    description: 'Legno certificato PEFC/FSC. Bilancio CO2 positivo: ogni casa assorbe piu anidride carbonica di quanta ne emetta.',
    stat: 'CO2-',
  },
  {
    icon: Home,
    title: 'Durabilita Garantita',
    description: 'Il legno e completamente protetto dagli agenti esterni. Garanzia strutturale di 30 anni, vita utile superiore a 100 anni.',
    stat: '100+ anni',
  },
  {
    icon: Zap,
    title: 'Efficienza Energetica A4',
    description: 'Classe energetica A4 garantita. Edifici NZEB (Nearly Zero Energy Building) pronti per le normative 2030.',
    stat: 'NZEB',
  },
]

interface XFrameFeaturesProps {
  embedded?: boolean
  darkTheme?: boolean
}

export default function XFrameFeatures({ embedded = false, darkTheme = false }: XFrameFeaturesProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  const content = (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {features.map((feature, index) => {
        const Icon = feature.icon

        if (darkTheme) {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 12,
                delay: index * 0.08
              }}
              whileHover={{
                y: -12,
                transition: { duration: 0.5, ease: "easeOut" }
              }}
              className="group relative"
            >
              {/* Glow effect background - sempre presente ma visibile solo su hover */}
              <div className="absolute -inset-2 bg-gradient-to-br from-[#A0845C]/0 via-[#A0845C]/0 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 group-hover:from-[#A0845C]/25 group-hover:via-[#A0845C]/15 transition-all duration-500 -z-10" />

              {/* Card */}
              <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md rounded-2xl p-8 lg:p-9 border border-white/15 group-hover:border-[#A0845C]/40 transition-all duration-300 overflow-hidden h-full">
                {/* Subtle inner glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#A0845C]/0 group-hover:bg-[#A0845C]/10 rounded-full blur-3xl transition-all duration-500" />

                {/* Header row */}
                <div className="flex items-center justify-between mb-6 relative">
                  {/* Icon box with glow */}
                  <div className="relative">
                    <div className="absolute -inset-2 bg-[#A0845C]/0 group-hover:bg-[#A0845C]/30 rounded-2xl blur-xl transition-all duration-500" />
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#A0845C]/30 to-[#A0845C]/10 group-hover:from-[#A0845C] group-hover:to-[#A0845C]/80 flex items-center justify-center transition-all duration-300 border border-[#A0845C]/20 group-hover:border-[#A0845C]/50">
                      <Icon className="w-7 h-7 text-[#A0845C] group-hover:text-white transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                    </div>
                  </div>

                  {/* Stat badge */}
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="absolute -inset-2 bg-[#A0845C]/0 group-hover:bg-[#A0845C]/20 rounded-full blur-lg transition-all duration-500" />
                    <div className="relative px-4 py-2 bg-gradient-to-br from-[#A0845C]/20 to-[#A0845C]/10 rounded-xl border border-[#A0845C]/30 group-hover:border-[#A0845C]/50 transition-all duration-300">
                      <span className="text-xl font-bold text-[#E8956B] group-hover:text-[#f0a070] transition-colors">{feature.stat}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/95 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#6b8e9f] leading-relaxed group-hover:text-[#7da0b2] transition-colors">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A0845C]/0 to-transparent group-hover:via-[#A0845C]/50 transition-all duration-500" />
              </div>
            </motion.div>
          )
        }

        // Light theme (non-embedded)
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="bg-[#F5F5F7] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group border border-[#D2D2D7] hover:border-[#A0845C]/30"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-[#A0845C]/10 rounded-xl flex items-center justify-center group-hover:bg-[#A0845C] transition-colors">
                <Icon className="w-7 h-7 text-[#A0845C] group-hover:text-white transition-colors" />
              </div>
              <span className="text-2xl font-bold text-[#A0845C]">{feature.stat}</span>
            </div>
            <h3 className="text-xl font-bold text-[#2C2825] mb-3">
              {feature.title}
            </h3>
            <p className="text-[#86868B] leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        )
      })}
    </div>
  )

  if (embedded) {
    return <div ref={ref}>{content}</div>
  }

  return (
    <section ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#A0845C] font-semibold text-sm uppercase tracking-wider">
            I Vantaggi
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2825] mt-2 mb-4">
            Perche Scegliere X-Frame
          </h2>
          <p className="text-[#86868B] text-lg max-w-2xl mx-auto">
            Un sistema costruttivo che non scende a compromessi su sicurezza, comfort e sostenibilita.
          </p>
        </div>
        {content}
      </div>
    </section>
  )
}
