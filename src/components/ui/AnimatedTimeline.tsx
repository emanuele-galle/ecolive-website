'use client'

import { motion } from 'framer-motion'

interface TimelineStep {
  label: string
  days: number
}

const steps: TimelineStep[] = [
  { label: 'Progettazione', days: 5 },
  { label: 'Produzione', days: 10 },
  { label: 'Montaggio', days: 10 },
  { label: 'Finiture', days: 5 },
]

export default function AnimatedTimeline() {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="relative"
        >
          <div className="flex items-center gap-4">
            {/* Step number */}
            <div className="w-8 h-8 rounded-full bg-[#C4704B] text-white flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>

            {/* Step info */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-[#1E3D30]">{step.label}</span>
                <span className="text-sm text-gray-500">{step.days} giorni</span>
              </div>

              {/* Progress bar */}
              <motion.div
                className="h-2 bg-gray-200 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-[#C4704B] to-[#A55A3A]"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}

      <div className="mt-4 p-4 bg-[#C4704B]/10 rounded-lg">
        <p className="text-sm text-[#1E3D30] font-semibold">
          Totale: 30 giorni
        </p>
        <p className="text-xs text-gray-600 mt-1">
          vs Tradizionale: 12-24 mesi
        </p>
      </div>
    </div>
  )
}
