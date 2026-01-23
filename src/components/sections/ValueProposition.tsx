'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Clock, Zap, Leaf, Shield } from 'lucide-react'
import ComparisonSlider from '@/components/ui/ComparisonSlider'
import InteractiveBenefitCard from '@/components/ui/InteractiveBenefitCard'
import AnimatedTimeline from '@/components/ui/AnimatedTimeline'

// Contenuti expanded per le cards
function TempiConsegnaContent() {
  return (
    <div className="space-y-4">
      <AnimatedTimeline />
    </div>
  )
}

function EfficienzaEnergeticaContent() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-gray-600 mb-1">Casa Tradizionale (Classe C)</p>
            <div className="h-4 bg-gray-300 rounded" style={{ width: '240px' }}>
              <motion.div
                className="h-full bg-gray-500 rounded"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </div>
          <p className="text-xl font-bold text-gray-600">€2.400</p>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-[#C4704B] mb-1 font-semibold">Ecolive (Classe A4)</p>
            <div className="h-4 bg-[#C4704B]/20 rounded" style={{ width: '240px' }}>
              <motion.div
                className="h-full bg-[#C4704B] rounded"
                initial={{ width: 0 }}
                animate={{ width: '20%' }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
          </div>
          <p className="text-xl font-bold text-[#C4704B]">€480</p>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-[#C4704B]/10 to-[#C4704B]/5 rounded-lg">
        <p className="text-2xl font-bold text-[#C4704B]">-80% consumi</p>
        <p className="text-sm text-gray-600 mt-1">Risparmio annuo: €1.920</p>
      </div>
    </div>
  )
}

function SostenibilitaContent() {
  const stats = [
    { value: '~30 ton', label: 'CO₂ assorbita (50 anni)' },
    { value: '95%', label: 'Materiali riciclabili' },
    { value: '0%', label: 'Sprechi produzione' },
  ]

  return (
    <div className="space-y-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="flex justify-between items-center p-3 bg-[#C4704B]/5 rounded-lg"
        >
          <span className="text-sm text-gray-700">{stat.label}</span>
          <span className="text-xl font-bold text-[#C4704B]">{stat.value}</span>
        </motion.div>
      ))}

      <div className="mt-4 p-4 bg-gradient-to-br from-[#2D5A47]/10 to-[#C4704B]/10 rounded-lg border border-[#C4704B]/20">
        <p className="text-sm text-[#1E3D30] font-semibold">🌳 Legno PEFC certificato</p>
        <p className="text-xs text-gray-600 mt-1">
          Da foreste gestite responsabilmente
        </p>
      </div>
    </div>
  )
}

function SicurezzaAntisismicaContent() {
  const features = [
    'Flessibilità legno: dissipa energia sismica',
    'Peso ridotto: -50% vs laterizio',
    'Connessioni metalliche: resistenza garantita',
    'Test sismici: superati fino a 7.2 Richter',
  ]

  return (
    <div className="space-y-3">
      {features.map((feature, index) => (
        <motion.div
          key={feature}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="flex items-start gap-3"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
            className="mt-1"
          >
            <svg className="w-5 h-5 text-[#C4704B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <p className="text-sm text-gray-700">{feature}</p>
        </motion.div>
      ))}

      <div className="mt-4 p-4 bg-gradient-to-r from-[#1E3D30]/10 to-[#C4704B]/10 rounded-lg border border-[#C4704B]/20">
        <p className="text-sm text-[#1E3D30] font-semibold">🛡️ Certificato zona sismica 1</p>
        <p className="text-xs text-gray-600 mt-1">
          Massima sicurezza per la tua famiglia
        </p>
      </div>
    </div>
  )
}

export default function ValueProposition() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const [activeCard, setActiveCard] = useState<number | null>(null)

  const benefits = [
    {
      icon: Clock,
      title: 'Tempi di Consegna',
      collapsedText: '30 giorni dalla firma alla consegna chiavi in mano',
      expandedContent: <TempiConsegnaContent />,
    },
    {
      icon: Zap,
      title: 'Efficienza Energetica',
      collapsedText: 'Classe A4 garantita con risparmio fino all\'80% sui consumi',
      expandedContent: <EfficienzaEnergeticaContent />,
    },
    {
      icon: Leaf,
      title: 'Sostenibilità',
      collapsedText: '100% legno PEFC certificato da foreste gestite responsabilmente',
      expandedContent: <SostenibilitaContent />,
    },
    {
      icon: Shield,
      title: 'Sicurezza Antisismica',
      collapsedText: 'Certificato zona sismica 1 con test superati fino a 7.2 Richter',
      expandedContent: <SicurezzaAntisismicaContent />,
    },
  ]

  return (
    <section ref={ref} className="py-24 lg:py-32 px-4 bg-[#FAF7F2] relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-96 3xl:w-[600px] h-96 3xl:h-[600px] bg-[#C4704B]/5 3xl:bg-[#C4704B]/8 rounded-full blur-3xl 3xl:-right-20" />
      <div className="absolute bottom-0 left-0 w-64 3xl:w-[500px] h-64 3xl:h-[500px] bg-[#1E3D30]/5 3xl:bg-[#1E3D30]/8 rounded-full blur-3xl 3xl:-left-20" />

      <div className="max-w-6xl 3xl:max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <span className="text-[#C4704B] font-semibold text-sm uppercase tracking-wider">
            Perche Noi
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mt-2">
            Perche Scegliere <span className="text-[#C4704B]">Ecolive</span>
          </h2>
          <p className="text-[#6B6560] text-lg max-w-2xl mx-auto mt-4">
            Confronta e scopri i vantaggi concreti di scegliere Ecolive
            per la tua casa prefabbricata in legno.
          </p>
        </motion.div>

        {/* Comparison Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <ComparisonSlider />
        </motion.div>

        {/* Interactive Benefit Cards Grid 2x2 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          {benefits.map((benefit, index) => (
            <InteractiveBenefitCard
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              collapsedText={benefit.collapsedText}
              expandedContent={benefit.expandedContent}
              isActive={activeCard === index}
              onClick={() => setActiveCard(activeCard === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
