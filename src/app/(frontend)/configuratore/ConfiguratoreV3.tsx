'use client'

import { useConfiguratoreStore } from '@/lib/configuratore-v3/store'
import StepTipologia from '@/components/configuratore-v3/StepTipologia'
import StepDimensione from '@/components/configuratore-v3/StepDimensione'
import StepFinitura from '@/components/configuratore-v3/StepFinitura'
import StepPlanimetria from '@/components/configuratore-v3/StepPlanimetria'
import StepRiepilogo from '@/components/configuratore-v3/StepRiepilogo'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, RotateCcw } from 'lucide-react'

const steps = [
  { label: 'Tipologia', title: 'Scegli la Tipologia', description: 'Seleziona il tipo di edificio che desideri realizzare' },
  { label: 'Dimensione', title: 'Dimensione Modulare', description: 'Scegli la metratura e il numero di livelli' },
  { label: 'Finitura', title: 'Livello di Finitura', description: 'Seleziona il pacchetto di materiali e prestazioni' },
  { label: 'Planimetria', title: 'Planimetria', description: 'Visualizza il layout suggerito degli ambienti' },
  { label: 'Riepilogo', title: 'Riepilogo e Contatto', description: 'Verifica la configurazione e prenota la visita in sede' },
]

export default function ConfiguratoreV3() {
  const { currentStep, prevStep, reset } = useConfiguratoreStore()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] to-[#F5F5F7]">
      {/* Hero intro — only visible at the top */}
      <div className="bg-[#1D1D1F] pt-28 pb-16 lg:pt-32 lg:pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium mb-4"
          >
            Configuratore Interattivo
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
          >
            Progetta la tua <span className="text-[#A0845C]">Casa</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            5 semplici passi per configurare la tua abitazione. Scegli tipologia, dimensione
            e finitura — riceverai un range di prezzo indicativo e potrai prenotare la visita in sede.
          </motion.p>
        </div>
      </div>

      {/* Progress bar style step indicator */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[#E8E8ED] sticky top-16 lg:top-20 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Top row */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3 min-w-0">
              {currentStep > 1 ? (
                <button onClick={prevStep} className="p-2 rounded-xl hover:bg-[#F5F5F7] transition-colors" aria-label="Indietro">
                  <ArrowLeft className="w-5 h-5 text-[#86868B]" />
                </button>
              ) : (
                <div className="w-9" />
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#A0845C] uppercase tracking-wider">
                    Passo {currentStep} di 5
                  </span>
                </div>
                <h2 className="text-lg font-bold text-[#1D1D1F] truncate">{steps[currentStep - 1].title}</h2>
              </div>
            </div>
            {currentStep > 1 && (
              <button onClick={reset} className="flex items-center gap-1.5 text-sm text-[#86868B] hover:text-[#A0845C] transition-colors">
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ricomincia</span>
              </button>
            )}
          </div>

          {/* Progress bar */}
          <div className="pb-3">
            <div className="h-1.5 bg-[#E8E8ED] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#A0845C] rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStep / 5) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {steps.map((step, i) => (
                <span
                  key={i}
                  className={`text-xs font-medium transition-colors ${
                    i + 1 <= currentStep ? 'text-[#A0845C]' : 'text-[#D2D2D7]'
                  } ${i === 0 ? 'text-left' : i === steps.length - 1 ? 'text-right' : 'text-center'}`}
                >
                  {step.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
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
