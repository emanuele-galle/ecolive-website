'use client'

import { useConfiguratoreStore } from '@/lib/configuratore-v3/store'
import StepTipologia from '@/components/configuratore-v3/StepTipologia'
import StepDimensione from '@/components/configuratore-v3/StepDimensione'
import StepFinitura from '@/components/configuratore-v3/StepFinitura'
import StepPlanimetria from '@/components/configuratore-v3/StepPlanimetria'
import StepRiepilogo from '@/components/configuratore-v3/StepRiepilogo'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, RotateCcw } from 'lucide-react'

const steps = [
  { label: 'Tipologia', title: 'Scegli la Tipologia' },
  { label: 'Dimensione', title: 'Dimensione Modulare' },
  { label: 'Finitura', title: 'Livello di Finitura' },
  { label: 'Planimetria', title: 'Planimetria' },
  { label: 'Riepilogo', title: 'Riepilogo e Contatto' },
]

function StepIndicator({ index, currentStep }: { index: number; currentStep: number }) {
  const stepNum = index + 1
  const isCompleted = stepNum < currentStep
  const isCurrent = stepNum === currentStep

  return (
    <div className="flex items-center">
      {index > 0 && (
        <div
          className={`h-[2px] w-6 sm:w-10 transition-colors duration-500 ${
            stepNum <= currentStep ? 'bg-[#A0845C]' : 'bg-[#D2D2D7]'
          }`}
        />
      )}
      <div className="relative flex flex-col items-center">
        <div
          className={`relative flex items-center justify-center rounded-full transition-all duration-500 ${
            isCompleted
              ? 'w-8 h-8 bg-[#A0845C]'
              : isCurrent
                ? 'w-8 h-8 border-2 border-[#A0845C] bg-white'
                : 'w-8 h-8 border-2 border-[#D2D2D7] bg-white'
          }`}
        >
          {isCompleted ? (
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          ) : (
            <span
              className={`text-xs font-semibold ${
                isCurrent ? 'text-[#A0845C]' : 'text-[#86868B]'
              }`}
            >
              {stepNum}
            </span>
          )}
          {isCurrent && (
            <span className="absolute inset-0 rounded-full border-2 border-[#A0845C] animate-ping opacity-30" />
          )}
        </div>
        <span
          className={`absolute top-10 whitespace-nowrap text-[10px] sm:text-xs transition-colors duration-300 ${
            isCurrent
              ? 'text-[#A0845C] font-semibold'
              : isCompleted
                ? 'text-[#A0845C]/70'
                : 'text-[#86868B]'
          }`}
        >
          {steps[index].label}
        </span>
      </div>
    </div>
  )
}

export default function ConfiguratoreV3() {
  const { currentStep, prevStep, reset } = useConfiguratoreStore()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] to-[#F5F5F7]">
      {/* Sticky header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#E8E8ED] sticky top-16 lg:top-20 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Top row: back + title + restart */}
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2 min-w-0">
              {currentStep > 1 ? (
                <button
                  onClick={prevStep}
                  className="p-1.5 -ml-1.5 rounded-lg hover:bg-[#F5F5F7] transition-colors shrink-0"
                  aria-label="Passo precedente"
                >
                  <ArrowLeft className="w-5 h-5 text-[#86868B]" />
                </button>
              ) : (
                <div className="w-8 shrink-0" />
              )}
              <h1 className="text-base sm:text-lg font-bold text-[#1D1D1F] truncate">
                {steps[currentStep - 1].title}
              </h1>
            </div>

            {currentStep > 1 && (
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-sm text-[#86868B] hover:text-[#A0845C] transition-colors shrink-0 ml-4"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ricomincia</span>
              </button>
            )}
          </div>

          {/* Step indicator dots with connecting lines */}
          <div className="flex items-center justify-center pb-7 pt-1">
            {steps.map((_, i) => (
              <StepIndicator key={i} index={i} currentStep={currentStep} />
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
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
