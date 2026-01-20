'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Check, X, ArrowRight, Sparkles } from 'lucide-react'

// Dati comparativi materiali
const materialsData = [
  {
    id: 'telaio',
    component: 'Telaio Strutturale',
    ecolive: {
      name: 'BiLam (Lamellare)',
      features: [
        'Stabilita dimensionale assoluta',
        'Nessuna deformazione nel tempo',
        'Certificazioni strutturali complete',
        'Nodi critici eliminati',
      ],
    },
    standard: {
      name: 'Massello',
      issues: [
        'Soggetto a deformazioni',
        'Nodi naturali = punti deboli',
        'Variazioni con umidita',
      ],
    },
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: 'pannelli',
    component: 'Pannelli Parete',
    ecolive: {
      name: '3 Strati Lamellare',
      features: [
        'Copertura full-size (no giunzioni)',
        'Resistenza strutturale superiore',
        'Zero problemi umidita',
        'Qualita certificata',
      ],
    },
    standard: {
      name: 'OSB',
      issues: [
        'Scarti di lavorazione compressi',
        'Instabile con umidita',
        'Giunzioni multiple necessarie',
      ],
    },
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    id: 'cappotto',
    component: 'Isolamento Esterno',
    ecolive: {
      name: 'Sughero Alta Densita 30mm',
      features: [
        '100% naturale e rinnovabile',
        'Corteccia che ricresce',
        'Spessore ridotto, stesse performance',
        'Zero derivati petrolio',
      ],
    },
    standard: {
      name: 'Polistirolo (EPS)',
      issues: [
        'Derivato del petrolio',
        'Non rinnovabile',
        'Spessori maggiori necessari',
      ],
    },
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    id: 'interno',
    component: 'Rivestimento Interno',
    ecolive: {
      name: 'Gesso Fibra Ceramizzato 25mm',
      features: [
        'Accumulo termico superiore',
        'Resistenza urti eccezionale',
        'Insonorizzazione ottimale',
        'Doppio spessore standard',
      ],
    },
    standard: {
      name: 'Cartongesso 12mm',
      issues: [
        'Fragile agli urti',
        'Minimo accumulo termico',
        'Spessore ridotto',
      ],
    },
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 'connessioni',
    component: 'Sistema Connessioni',
    ecolive: {
      name: 'Viti Acciaio Carbonio Avvitate',
      features: [
        'Tenuta sismica garantita',
        'Nessun rifollamento nel tempo',
        'Precisione millimetrica',
        'Smontaggio possibile',
      ],
    },
    standard: {
      name: 'Chiodi Sparati',
      issues: [
        'Rifollamento progressivo',
        'Minor resistenza sismica',
        'Assemblaggio irreversibile',
      ],
    },
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

// Card component per singolo materiale
function MaterialCard({
  material,
  index,
  isExpanded,
  onToggle,
}: {
  material: typeof materialsData[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.1 }}
      onClick={onToggle}
      whileHover={{ y: -4 }}
    >
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-[#E5E0D8]/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E3D30] to-[#2D5A47] flex items-center justify-center text-white flex-shrink-0">
            {material.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-[#1E3D30]">{material.component}</h3>
            <p className="text-sm text-[#8A857F]">Clicca per dettagli</p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-5 h-5 text-[#C4704B]" />
          </motion.div>
        </div>
      </div>

      {/* Comparison grid */}
      <div className="grid grid-cols-2 divide-x divide-[#E5E0D8]/50">
        {/* Ecolive side */}
        <div className="p-4 sm:p-5 bg-gradient-to-br from-[#1E3D30]/5 to-transparent">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 bg-[#1E3D30] text-white text-xs font-semibold rounded">ECOLIVE</span>
          </div>
          <p className="font-semibold text-[#1E3D30] text-sm sm:text-base">{material.ecolive.name}</p>

          {/* Expanded features */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-2">
              {material.ecolive.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#4A4540]">
                  <Check className="w-4 h-4 text-[#2D5A47] flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Standard side */}
        <div className="p-4 sm:p-5 bg-[#F8F6F3]">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 bg-[#8A857F] text-white text-xs font-semibold rounded">STANDARD</span>
          </div>
          <p className="font-semibold text-[#6B6560] text-sm sm:text-base">{material.standard.name}</p>

          {/* Expanded issues */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-2">
              {material.standard.issues.map((issue, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#8A857F]">
                  <X className="w-4 h-4 text-[#C4704B]/70 flex-shrink-0 mt-0.5" />
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function MaterialsComparison() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <section
      ref={containerRef}
      className="relative py-20 lg:py-28 px-4 bg-gradient-to-b from-[#152822] via-[#1E3D30] to-[#FAF7F2] overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-20 right-10 w-80 h-80 bg-[#C4704B]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4 text-[#C4704B]" />
            <span className="text-white/90 text-xs sm:text-sm font-medium uppercase tracking-wider">
              La Differenza nei Dettagli
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Perche costa <span className="text-[#C4704B]">di piu</span>
          </h2>

          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Il paragone non e sul prezzo al mq, ma su cosa c&apos;e dentro la parete.
            Ogni componente fa la differenza tra una casa che dura 30 anni e una che ne dura 100.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-4 sm:gap-6">
          {materialsData.map((material, index) => (
            <MaterialCard
              key={material.id}
              material={material}
              index={index}
              isExpanded={expandedCard === material.id}
              onToggle={() => toggleCard(material.id)}
            />
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-lg border border-[#E5E0D8]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C4704B] to-[#A85A3A] flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-white" />
            </div>
            <p className="text-[#1E3D30] text-sm sm:text-base font-medium text-left">
              <span className="block font-bold">Materiali premium, risultati premium.</span>
              <span className="text-[#6B6560]">Garanzia 30 anni sulla struttura.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
