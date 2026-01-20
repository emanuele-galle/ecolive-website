'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { MessageCircle, PenTool, Hammer, Key, ChevronDown, Check, Package } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useMouseFollow, useMouseTilt } from '@/lib/hooks/useMouseParallax'

// Types
interface JourneyStepData {
  id: string
  number: string
  icon: LucideIcon
  title: string
  subtitle: string
  shortDescription: string
  expandedContent: {
    fullDescription: string
    highlights: string[]
    deliverables: string[]
  }
}

// Step data
const journeySteps: JourneyStepData[] = [
  {
    id: 'consulenza',
    number: '01',
    icon: MessageCircle,
    title: 'Consulenza Gratuita',
    subtitle: 'Giorno 1',
    shortDescription: 'Incontro gratuito per capire le tue esigenze',
    expandedContent: {
      fullDescription: 'Il nostro team di esperti ti incontra presso il tuo terreno o nella nostra sede per ascoltare i tuoi sogni e valutare insieme le possibilita.',
      highlights: [
        'Analisi del terreno e orientamento',
        'Discussione budget e tempistiche',
        'Presentazione portfolio progetti',
        'Risposta a tutte le domande'
      ],
      deliverables: [
        'Report fattibilita',
        'Stima costi',
        'Proposta collaborazione'
      ]
    }
  },
  {
    id: 'progettazione',
    number: '02',
    icon: PenTool,
    title: 'Design Personalizzato',
    subtitle: 'Giorni 2-7',
    shortDescription: 'Progetto su misura con rendering 3D fotorealistici',
    expandedContent: {
      fullDescription: 'I nostri architetti creano un progetto unico, pensato per il tuo stile di vita, con materiali premium e soluzioni energetiche innovative.',
      highlights: [
        'Progetto architettonico completo',
        'Rendering 3D fotorealistici',
        'Piano energetico classe A4',
        'Selezione finiture e materiali'
      ],
      deliverables: [
        'Planimetrie dettagliate',
        'Rendering interni/esterni',
        'Preventivo definitivo',
        'Capitolato materiali'
      ]
    }
  },
  {
    id: 'costruzione',
    number: '03',
    icon: Hammer,
    title: 'Realizzazione',
    subtitle: 'Giorni 8-25',
    shortDescription: 'Costruzione in stabilimento con sistema X-Frame',
    expandedContent: {
      fullDescription: 'La tua casa prende vita nel nostro stabilimento controllato, dove ogni pannello viene realizzato con precisione millimetrica grazie al sistema X-Frame.',
      highlights: [
        'Produzione in ambiente controllato',
        'Sistema brevettato X-Frame',
        'Controllo qualita certificato ISO',
        'Aggiornamenti fotografici settimanali'
      ],
      deliverables: [
        'Report settimanale',
        'Documentazione tecnica',
        'Certificazioni materiali',
        'Video time-lapse'
      ]
    }
  },
  {
    id: 'consegna',
    number: '04',
    icon: Key,
    title: 'Chiavi in Mano',
    subtitle: 'Giorno 30',
    shortDescription: 'Montaggio rapido e consegna della tua nuova casa',
    expandedContent: {
      fullDescription: 'In pochi giorni i moduli prefabbricati vengono assemblati sul tuo terreno e la casa e pronta per essere abitata, con tutti gli impianti funzionanti.',
      highlights: [
        'Montaggio in 3-5 giorni',
        'Allacciamenti e collaudi',
        'Pulizia finale del cantiere',
        'Consegna chiavi con tour guidato'
      ],
      deliverables: [
        'Certificato agibilita',
        'Garanzia 30 anni',
        'Manuale manutenzione',
        'Assistenza post-vendita'
      ]
    }
  }
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
}

// JourneyStepCard component with tilt
function JourneyStepCard({
  step,
  isActive,
  onToggle,
  index
}: {
  step: JourneyStepData
  isActive: boolean
  onToggle: () => void
  index: number
}) {
  const Icon = step.icon
  const { ref, rotateX, rotateY, scale, handlers } = useMouseTilt({
    maxRotation: 5,
    scale: 1.02
  })

  return (
    <motion.div
      ref={ref}
      variants={stepVariants}
      className={`
        relative bg-white/5 backdrop-blur-sm rounded-2xl border transition-all duration-300
        ${isActive ? 'border-[#C4704B]/50 bg-white/10' : 'border-white/10 hover:border-white/20'}
        cursor-pointer overflow-hidden
      `}
      onClick={onToggle}
      style={{
        rotateX,
        rotateY,
        scale,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d'
      }}
      layout
      {...handlers}
    >
      {/* Card Header */}
      <motion.div
        className="p-5 sm:p-6 flex items-start gap-4"
        style={{ translateZ: 10 }}
      >
        {/* Icon container with depth */}
        <motion.div
          className={`
            w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#C4704B] to-[#a85a3a]
            flex items-center justify-center shadow-lg shadow-[#C4704B]/20 flex-shrink-0
          `}
          animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
          style={{ translateZ: 30 }}
        >
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </motion.div>

        <div className="flex-1 min-w-0">
          {/* Number + Duration */}
          <motion.div
            className="flex items-center gap-2 mb-1"
            style={{ translateZ: 25 }}
          >
            <span className="text-[#C4704B] font-bold text-base sm:text-lg">{step.number}</span>
            <span className="text-white/30">•</span>
            <span className="text-white/50 text-xs sm:text-sm">{step.subtitle}</span>
          </motion.div>

          {/* Title with depth */}
          <motion.h3
            className="text-lg sm:text-xl font-bold text-white mb-1"
            style={{ translateZ: 20 }}
          >
            {step.title}
          </motion.h3>

          {/* Short description */}
          <motion.p
            className="text-white/60 text-sm line-clamp-2"
            style={{ translateZ: 15 }}
          >
            {step.shortDescription}
          </motion.p>
        </div>

        {/* Expand indicator */}
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0"
          style={{ translateZ: 25 }}
        >
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 border-t border-white/10">
              {/* Full description */}
              <p className="text-white/70 mb-4 leading-relaxed text-sm sm:text-base">
                {step.expandedContent.fullDescription}
              </p>

              {/* Highlights */}
              <div className="mb-4">
                <h4 className="text-[#C4704B] text-xs font-semibold uppercase tracking-wider mb-2">
                  Cosa include
                </h4>
                <ul className="space-y-2">
                  {step.expandedContent.highlights.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2 text-white/60 text-sm"
                    >
                      <Check className="w-4 h-4 text-[#C4704B] mt-0.5 flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div className="bg-white/5 rounded-xl p-4">
                <h4 className="text-white text-xs sm:text-sm font-semibold mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#C4704B]" />
                  Cosa ricevi
                </h4>
                <div className="flex flex-wrap gap-2">
                  {step.expandedContent.deliverables.map((item, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-3 py-1.5 bg-[#C4704B]/20 text-[#E8956B] text-xs rounded-full font-medium"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow effect on active */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#C4704B]/10 to-transparent pointer-events-none rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </motion.div>
  )
}

export default function ProcessJourney() {
  const [activeStep, setActiveStep] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: "-100px" })

  // Floating decorations with mouse follow
  const floatingSlow = useMouseFollow({ intensity: 0.15, delay: 3 })
  const floatingMedium = useMouseFollow({ intensity: 0.25, delay: 2 })
  const floatingFast = useMouseFollow({ intensity: 0.35, delay: 1.5 })

  const toggleStep = (stepId: string) => {
    setActiveStep(activeStep === stepId ? null : stepId)
  }

  return (
    <section ref={containerRef} className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3D30] via-[#2D5A47] to-[#1E3D30]" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Decorative blurs with mouse follow */}
      <motion.div
        className="absolute top-20 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-[#C4704B]/10 rounded-full blur-3xl pointer-events-none"
        style={{ x: floatingSlow.x, y: floatingSlow.y }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-[#C4704B]/8 rounded-full blur-3xl pointer-events-none"
        style={{ x: floatingMedium.x, y: floatingMedium.y }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#2D5A47]/30 rounded-full blur-[100px] pointer-events-none"
        style={{ x: floatingFast.x, y: floatingFast.y }}
      />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <span className="text-[#C4704B] font-semibold text-sm uppercase tracking-wider">
            Il Tuo Percorso
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2">
            Da Sogno a <span className="text-[#C4704B]">Realta</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto mt-4">
            30 giorni dalla prima consulenza alle chiavi della tua nuova casa
          </p>
        </motion.div>

        {/* Desktop Layout: 2 columns zigzag */}
        <motion.div
          className="hidden lg:block"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* SVG Path connecting steps */}
          <svg
            className="absolute left-1/2 top-[280px] -translate-x-1/2 w-full max-w-4xl h-[600px] pointer-events-none opacity-30"
            viewBox="0 0 800 600"
            fill="none"
          >
            <motion.path
              d="M 100,50 C 200,50 300,150 400,150 C 500,150 600,250 500,350 C 400,450 300,350 400,450 C 500,550 700,550 700,550"
              stroke="url(#journeyGradient)"
              strokeWidth="2"
              strokeDasharray="8 6"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            />
            <defs>
              <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C4704B" />
                <stop offset="100%" stopColor="#E8956B" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.id}
                className={index % 2 === 0 ? 'justify-self-end' : 'justify-self-start'}
                style={{ marginTop: index % 2 === 1 ? '60px' : '0' }}
              >
                <div className="max-w-md">
                  <JourneyStepCard
                    step={step}
                    isActive={activeStep === step.id}
                    onToggle={() => toggleStep(step.id)}
                    index={index}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile/Tablet Layout: Vertical timeline */}
        <motion.div
          className="lg:hidden relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Vertical line */}
          <motion.div
            className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C4704B] via-[#C4704B]/50 to-[#C4704B]/20"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ originY: 0 }}
          />

          <div className="space-y-6">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative pl-14 sm:pl-20"
                variants={stepVariants}
              >
                {/* Connection dot */}
                <motion.div
                  className="absolute left-4 sm:left-6 top-7 w-5 h-5 rounded-full bg-[#C4704B] border-4 border-[#1E3D30] z-10"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.15, type: "spring" }}
                />

                <JourneyStepCard
                  step={step}
                  isActive={activeStep === step.id}
                  onToggle={() => toggleStep(step.id)}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom summary */}
        <motion.div
          className="text-center mt-12 lg:mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <p className="text-white/40 text-sm">
            Processo certificato ISO 9001 • Garanzia 30 anni sulla struttura • 100% Made in Italy
          </p>
        </motion.div>
      </div>
    </section>
  )
}
