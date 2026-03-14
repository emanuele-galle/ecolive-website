'use client'

import { useConfiguratoreStore } from '@/lib/configuratore-v3/store'
import StepTipologia from '@/components/configuratore-v3/StepTipologia'
import StepDimensione from '@/components/configuratore-v3/StepDimensione'
import StepFinitura from '@/components/configuratore-v3/StepFinitura'
import StepPlanimetria from '@/components/configuratore-v3/StepPlanimetria'
import StepRiepilogo from '@/components/configuratore-v3/StepRiepilogo'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const stepLabels = [
  'Tipologia',
  'Dimensione',
  'Finitura',
  'Planimetria',
  'Riepilogo',
]

export default function ConfiguratoreV3() {
  const { currentStep, prevStep, reset } = useConfiguratoreStore()

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Header */}
      <div className="bg-white border-b border-[#D2D2D7]/60 sticky top-16 lg:top-20 z-30">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="p-2 rounded-lg hover:bg-[#F5F5F7] transition-colors"
                  aria-label="Passo precedente"
                >
                  <ArrowLeft className="w-5 h-5 text-[#86868B]" />
                </button>
              )}
              <h1 className="text-lg font-bold text-[#1D1D1F]">
                Configura la tua Casa
              </h1>
            </div>
            {currentStep > 1 && (
              <button
                onClick={reset}
                className="text-sm text-[#86868B] hover:text-[#A0845C] transition-colors"
              >
                Ricomincia
              </button>
            )}
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-1">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex-1">
                <div
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i + 1 <= currentStep ? 'bg-[#A0845C]' : 'bg-[#D2D2D7]/60'
                  }`}
                />
                <p className={`text-[10px] mt-1.5 text-center transition-colors ${
                  i + 1 === currentStep ? 'text-[#A0845C] font-semibold' : 'text-[#86868B]'
                }`}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && <StepTipologia />}
            {currentStep === 2 && <StepDimensione />}
            {currentStep === 3 && <StepFinitura />}
            {currentStep === 4 && <StepPlanimetria />}
            {currentStep === 5 && <StepRiepilogo />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
