'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import SketchfabViewer from '@/components/SketchfabViewer'
import { ChevronDown, Shield } from 'lucide-react'
import { useMouseFollow, useMouseTilt } from '@/lib/hooks/useMouseParallax'
import ParticleField from '@/components/ui/backgrounds/ParticleField'

// Dati 4 benefici chiave - linguaggio semplice
const benefits = [
  {
    id: 'summer',
    icon: '☀️',
    title: "Fresco d'Estate",
    description: 'Il caldo esterno impiega 11 ore per entrare. La casa resta fresca naturalmente, senza aria condizionata sempre accesa.',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
  },
  {
    id: 'winter',
    icon: '❄️',
    title: "Caldo d'Inverno",
    description: "Il calore interno non esce. Bolletta del riscaldamento ridotta fino all'80% rispetto a una casa tradizionale.",
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
  },
  {
    id: 'fire',
    icon: '🔥',
    title: 'Sicurezza Incendio',
    description: 'Resiste al fuoco per oltre 60 minuti. Tempo prezioso per metterti in salvo e per i soccorsi.',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
  },
  {
    id: 'natural',
    icon: '🌿',
    title: 'Materiali Naturali',
    description: 'Sughero, legno lamellare, gesso-fibra. Zero polistirolo, zero derivati del petrolio. Casa che respira.',
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.1)',
  },
]

// Dettagli tecnici per chi vuole approfondire
const technicalDetails = [
  {
    label: 'Trasmittanza termica',
    value: '0.169 W/m²K',
    explanation: 'Eccellente isolamento - meno dispersione = meno bollette',
  },
  {
    label: 'Sfasamento termico',
    value: '10.8 ore',
    explanation: 'Il caldo estivo entra dopo 11 ore - casa fresca di giorno',
  },
  {
    label: 'Resistenza al fuoco',
    value: 'REI 60',
    explanation: 'Oltre 60 minuti di protezione - tempo per evacuare',
  },
  {
    label: 'Classe energetica',
    value: 'A4 NZEB',
    explanation: 'Massima classe possibile - quasi zero consumo energetico',
  },
  {
    label: 'Spessore parete',
    value: '290 mm',
    explanation: '8 strati specializzati - ogni cm ha una funzione precisa',
  },
]

// Benefit card with tilt
function BenefitCard({
  benefit,
  index,
  isInView
}: {
  benefit: typeof benefits[0]
  index: number
  isInView: boolean
}) {
  const { ref, rotateX, rotateY, scale, handlers } = useMouseTilt({
    maxRotation: 6,
    scale: 1.02
  })

  return (
    <motion.div
      ref={ref}
      className="group bg-[#0f2040]/60 rounded-2xl p-5 border border-[#1a3a5c]/50 hover:border-opacity-100 transition-all duration-300 cursor-default"
      style={{
        borderColor: `${benefit.color}30`,
        rotateX,
        rotateY,
        scale,
        transformPerspective: 800,
        transformStyle: 'preserve-3d'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
      whileHover={{
        borderColor: `${benefit.color}60`,
        backgroundColor: benefit.bgColor,
      }}
      {...handlers}
    >
      {/* Icona emoji grande with depth */}
      <motion.div
        className="text-4xl mb-3"
        style={{ translateZ: 30 }}
      >
        {benefit.icon}
      </motion.div>

      {/* Titolo with depth */}
      <motion.h3
        className="font-bold text-lg mb-2 transition-colors duration-300"
        style={{ color: benefit.color, translateZ: 20 }}
      >
        {benefit.title}
      </motion.h3>

      {/* Descrizione */}
      <motion.p
        className="text-[#8ba3b5] text-sm leading-relaxed"
        style={{ translateZ: 10 }}
      >
        {benefit.description}
      </motion.p>
    </motion.div>
  )
}

export default function Stratigraphy3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: '-50px' })
  const [techExpanded, setTechExpanded] = useState(false)

  // Glow effects that follow the mouse
  const glowLeft = useMouseFollow({ intensity: 0.3, delay: 2.5 })
  const glowRight = useMouseFollow({ intensity: 0.35, delay: 2 })
  const glowCenter = useMouseFollow({ intensity: 0.2, delay: 3 })

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#0a1628] overflow-hidden py-16 lg:py-20"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="stratigraphy-grid-simple"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a3a5c" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stratigraphy-grid-simple)" />
        </svg>
      </div>

      {/* Interactive particle field */}
      <ParticleField
        particleCount={35}
        color="rgba(74, 158, 255, 0.5)"
        maxRadius={2.5}
        mouseRadius={120}
        lineOpacity={0.12}
        connectionDistance={100}
        zIndex={1}
      />

      {/* Glow effects with mouse follow */}
      <motion.div
        className="absolute top-1/4 -left-20 w-80 h-80 bg-[#4a9eff]/8 rounded-full blur-3xl pointer-events-none"
        style={{ x: glowLeft.x, y: glowLeft.y }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#A0845C]/8 rounded-full blur-3xl pointer-events-none"
        style={{ x: glowRight.x, y: glowRight.y }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#4a9eff]/5 rounded-full blur-[100px] pointer-events-none"
        style={{ x: glowCenter.x, y: glowCenter.y }}
      />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Header semplificato */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#A0845C]/10 rounded-full border border-[#A0845C]/20 mb-6">
            <Shield className="w-4 h-4 text-[#A0845C]" />
            <span className="text-[#A0845C] text-sm font-medium">La Tua Protezione</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="text-[#A0845C]">290mm</span> di Comfort e Sicurezza
          </h2>

          <p className="text-[#8ba3b5] text-lg max-w-2xl mx-auto leading-relaxed">
            Una parete progettata per il tuo benessere, non per impressionare con numeri tecnici.
            Esplora il modello 3D e scopri come ti protegge.
          </p>
        </motion.div>

        {/* 3D Viewer - Hero centrale grande */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="relative">
            {/* Viewer container with glow border on hover */}
            {/* Mobile viewer */}
            <div className="lg:hidden rounded-2xl overflow-hidden border border-[#1a3a5c] hover:border-[#4a9eff]/40 transition-colors duration-500">
              <SketchfabViewer
                modelId="9eda71a7fa444aedbb9354a9ae26726f"
                title="Parete X-Frame - Esplora i materiali"
                height="400px"
                autoStart={true}
              />
            </div>
            {/* Desktop viewer */}
            <div className="hidden lg:block rounded-2xl overflow-hidden border border-[#1a3a5c] hover:border-[#4a9eff]/40 transition-colors duration-500">
              <SketchfabViewer
                modelId="9eda71a7fa444aedbb9354a9ae26726f"
                title="Parete X-Frame - Esplora i materiali"
                height="550px"
                autoStart={true}
              />
            </div>

            {/* Hint per interazione */}
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0a1628]/90 backdrop-blur-sm px-4 py-2 rounded-full border border-[#1a3a5c] pointer-events-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <span className="text-[#8ba3b5] text-sm">
                👆 Ruota e zooma per esplorare gli strati
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* 4 Benefici chiave - Cards with tilt */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={benefit.id}
              benefit={benefit}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>

        {/* Accordion dettagli tecnici */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <button
            onClick={() => setTechExpanded(!techExpanded)}
            className="w-full flex items-center justify-between px-6 py-4 bg-[#0f2040]/40 hover:bg-[#0f2040]/60 rounded-xl border border-[#1a3a5c]/50 transition-all duration-300 group"
          >
            <span className="text-[#8ba3b5] group-hover:text-white transition-colors">
              Vuoi i dettagli tecnici?
            </span>
            <motion.div animate={{ rotate: techExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-5 h-5 text-[#4a9eff]" />
            </motion.div>
          </button>

          <AnimatePresence>
            {techExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-3">
                  {technicalDetails.map((detail, index) => (
                    <motion.div
                      key={detail.label}
                      className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 bg-[#0f2040]/30 rounded-xl border border-[#1a3a5c]/30"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="mb-2 sm:mb-0">
                        <span className="text-[#6b8e9f] text-sm block">{detail.label}</span>
                        <span className="text-[#8ba3b5] text-xs">{detail.explanation}</span>
                      </div>
                      <span className="text-[#A0845C] font-bold text-lg sm:text-xl font-mono">
                        {detail.value}
                      </span>
                    </motion.div>
                  ))}

                  {/* Nota finale */}
                  <p className="text-[#6b8e9f] text-xs text-center pt-2 px-4">
                    Dati certificati secondo normative UNI EN. Valori riferiti alla configurazione
                    completa &quot;Chiavi in Mano&quot;.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
