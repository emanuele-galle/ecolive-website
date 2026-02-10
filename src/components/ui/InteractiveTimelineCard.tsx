'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Clock, Lightbulb, Cog, Hammer, Sparkles, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineStep {
  number: number
  label: string
  days: string
  icon: LucideIcon
  description: string
  status: 'completed' | 'current' | 'upcoming'
  category: string
  details?: {
    team: string
    cost: string
  }
}

const steps: TimelineStep[] = [
  {
    number: 1,
    label: 'Progettazione',
    days: '10 giorni',
    icon: Lightbulb,
    description: 'Design personalizzato e approvazione finale',
    status: 'completed',
    category: 'Design',
    details: {
      team: 'Architetti + Cliente',
      cost: '15% totale'
    }
  },
  {
    number: 2,
    label: 'Produzione',
    days: '20 giorni',
    icon: Cog,
    description: 'Fabbricazione componenti prefabbricati',
    status: 'completed',
    category: 'Fabbrica',
    details: {
      team: 'Produzione CNC',
      cost: '40% totale'
    }
  },
  {
    number: 3,
    label: 'Montaggio',
    days: '20 giorni',
    icon: Hammer,
    description: 'Assemblaggio on-site della struttura',
    status: 'current',
    category: 'Cantiere',
    details: {
      team: 'Squadra Montaggio',
      cost: '30% totale'
    }
  },
  {
    number: 4,
    label: 'Finiture',
    days: '10 giorni',
    icon: Sparkles,
    description: 'Dettagli finali e consegna chiavi',
    status: 'upcoming',
    category: 'Rifinitura',
    details: {
      team: 'Artigiani + QA',
      cost: '15% totale'
    }
  }
]

// Status colors
const statusColors = {
  completed: {
    bg: 'bg-green-500',
    border: 'border-green-500',
    text: 'text-green-600',
    glow: 'shadow-green-500/30'
  },
  current: {
    bg: 'bg-[#A0845C]',
    border: 'border-[#A0845C]',
    text: 'text-[#A0845C]',
    glow: 'shadow-[#A0845C]/30'
  },
  upcoming: {
    bg: 'bg-gray-300',
    border: 'border-gray-300',
    text: 'text-gray-500',
    glow: 'shadow-gray-500/20'
  }
}

export default function InteractiveTimelineCard() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <div
      ref={ref}
      className="relative h-full rounded-2xl p-8 bg-gradient-to-br from-white/80 to-[#A0845C]/5 backdrop-blur-xl border border-[#A0845C]/20 shadow-xl shadow-black/5 overflow-hidden"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#A0845C] flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-[#1D1D1F]">60 Giorni Consegna</h3>
        </div>
        <p className="text-sm text-gray-600">
          Dalla firma alla consegna chiavi in mano
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Progress bar background */}
        <div className="absolute top-10 left-0 right-0 h-1 bg-gray-200 rounded-full" />

        {/* Multi-color animated progress bar */}
        <motion.div
          className="absolute top-10 left-0 h-1 rounded-full"
          style={{
            background: 'linear-gradient(to right, #10b981 0%, #10b981 50%, #A0845C 50%, #A0845C 75%, #9CA3AF 75%)'
          }}
          initial={{ width: '0%' }}
          animate={isInView ? { width: '100%' } : { width: '0%' }}
          transition={{ duration: 2, delay: 0.3, ease: 'easeInOut' }}
        />

        {/* Steps */}
        <div className="relative grid grid-cols-4 gap-2">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isHovered = hoveredStep === index
            const isCurrent = step.status === 'current'
            const colors = statusColors[step.status]

            return (
              <div
                key={step.number}
                className="relative flex flex-col items-center"
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Category badge */}
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
                  transition={{ delay: index * 0.2 + 0.4 }}
                  className="mb-2"
                >
                  <span className={cn(
                    'text-[10px] font-semibold px-2 py-1 rounded-full',
                    colors.text,
                    colors.bg === 'bg-green-500' ? 'bg-green-50' :
                    colors.bg === 'bg-[#A0845C]' ? 'bg-[#A0845C]/10' :
                    'bg-gray-100'
                  )}>
                    {step.category}
                  </span>
                </motion.div>

                {/* Avatar circular node */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.2 + 0.5
                  }}
                  className={cn(
                    'w-14 h-14 rounded-full flex items-center justify-center z-10 transition-all duration-300 cursor-pointer',
                    'border-4',
                    isHovered || isCurrent ? `${colors.bg} shadow-lg ${colors.glow} scale-110` : `bg-white ${colors.border}`,
                    isCurrent && 'animate-pulse'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-6 h-6 transition-colors',
                      isHovered || isCurrent ? 'text-white' : colors.text
                    )}
                  />
                </motion.div>

                {/* Step label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.2 + 0.7 }}
                  className="mt-4 text-center"
                >
                  <p className={cn(
                    'text-sm font-semibold mb-1',
                    isCurrent ? colors.text : 'text-[#1D1D1F]'
                  )}>
                    {step.label}
                  </p>
                  <p className={cn(
                    'text-xs font-medium',
                    colors.text
                  )}>
                    {step.days}
                  </p>
                </motion.div>

                {/* Enhanced hover tooltip */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-20 left-1/2 -translate-x-1/2 mt-12 w-52 p-4 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-[#A0845C]/20 z-20"
                  >
                    <p className="text-xs text-gray-700 font-semibold mb-2">
                      {step.description}
                    </p>
                    {step.details && (
                      <div className="space-y-1 pt-2 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-gray-500">Team:</span>
                          <span className="text-[10px] text-gray-700 font-medium">{step.details.team}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-gray-500">Costo:</span>
                          <span className="text-[10px] text-[#A0845C] font-semibold">{step.details.cost}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Comparison subtle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-12 pt-4 border-t border-gray-200"
      >
        <p className="text-xs text-gray-500 text-center">
          Tradizionale:{' '}
          <span className="line-through">12-24 mesi</span>
          {' '}• Ecolive:{' '}
          <span className="text-[#A0845C] font-semibold">60 giorni</span>
        </p>
      </motion.div>
    </div>
  )
}
