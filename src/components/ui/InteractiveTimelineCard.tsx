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
}

const steps: TimelineStep[] = [
  {
    number: 1,
    label: 'Progettazione',
    days: '10 giorni',
    icon: Lightbulb,
    description: 'Design personalizzato e approvazione finale'
  },
  {
    number: 2,
    label: 'Produzione',
    days: '20 giorni',
    icon: Cog,
    description: 'Fabbricazione componenti prefabbricati'
  },
  {
    number: 3,
    label: 'Montaggio',
    days: '20 giorni',
    icon: Hammer,
    description: 'Assemblaggio on-site della struttura'
  },
  {
    number: 4,
    label: 'Finiture',
    days: '10 giorni',
    icon: Sparkles,
    description: 'Dettagli finali e consegna chiavi'
  }
]

export default function InteractiveTimelineCard() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <div
      ref={ref}
      className="relative h-full rounded-2xl p-8 bg-gradient-to-br from-white/80 to-[#C4704B]/5 backdrop-blur-xl border border-[#C4704B]/20 shadow-xl shadow-black/5 overflow-hidden"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#C4704B] flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-[#1E3D30]">60 Giorni Consegna</h3>
        </div>
        <p className="text-sm text-gray-600">
          Dalla firma alla consegna chiavi in mano
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Progress bar background */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full" />

        {/* Animated progress bar */}
        <motion.div
          className="absolute top-6 left-0 h-1 bg-gradient-to-r from-[#C4704B] to-[#1E3D30] rounded-full"
          initial={{ width: '0%' }}
          animate={isInView ? { width: '100%' } : { width: '0%' }}
          transition={{ duration: 2, delay: 0.3, ease: 'easeInOut' }}
        />

        {/* Steps */}
        <div className="relative grid grid-cols-4 gap-2">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isHovered = hoveredStep === index

            return (
              <div
                key={step.number}
                className="relative flex flex-col items-center"
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Step node */}
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
                    'w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300 cursor-pointer',
                    isHovered
                      ? 'bg-[#C4704B] shadow-lg shadow-[#C4704B]/30 scale-110'
                      : 'bg-white border-2 border-[#C4704B]'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-5 h-5 transition-colors',
                      isHovered ? 'text-white' : 'text-[#C4704B]'
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
                  <p className="text-sm font-semibold text-[#1E3D30] mb-1">
                    {step.label}
                  </p>
                  <p className="text-xs text-[#C4704B] font-medium">
                    {step.days}
                  </p>
                </motion.div>

                {/* Hover tooltip */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-16 left-1/2 -translate-x-1/2 mt-12 w-48 p-3 bg-white rounded-lg shadow-xl border border-[#C4704B]/20 z-20"
                  >
                    <p className="text-xs text-gray-600 text-center">
                      {step.description}
                    </p>
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
          <span className="text-[#C4704B] font-semibold">60 giorni</span>
        </p>
      </motion.div>
    </div>
  )
}
