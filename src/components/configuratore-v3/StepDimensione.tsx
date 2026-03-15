'use client'

import { motion } from 'framer-motion'
import { Layers, ArrowLeft } from 'lucide-react'
import { useConfiguratoreStore } from '@/lib/configuratore-v3/store'
import { moduliPerTipologia } from '@/lib/configuratore-v3/configurations'
import type { ModuloDimensionale } from '@/lib/configuratore-v3/types'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function StepDimensione() {
  const { tipologia, modulo, setModulo, nextStep, prevStep } = useConfiguratoreStore()

  if (!tipologia) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-[#86868B]">Seleziona prima una tipologia.</p>
        <button
          onClick={prevStep}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#A0845C] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Torna indietro
        </button>
      </div>
    )
  }

  const moduli = moduliPerTipologia[tipologia]

  function handleSelect(m: ModuloDimensionale) {
    setModulo(m)
    nextStep()
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <p className="text-[#86868B] text-base">Dimensioni disponibili per la tipologia selezionata. I moduli sono combinabili.</p>
      </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {moduli.map((m, i) => {
        const isSelected = modulo?.id === m.id
        return (
          <motion.button
            key={m.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4 }}
            onClick={() => handleSelect(m)}
            className={`group relative flex flex-col items-start rounded-2xl border-2 p-6 text-left transition-all overflow-hidden ${
              isSelected
                ? 'border-[#A0845C] shadow-lg shadow-[#A0845C]/20 bg-gradient-to-br from-[#A0845C]/5 to-[#A0845C]/10'
                : 'border-[#E5E5E7] hover:border-[#A0845C]/50 bg-white'
            }`}
          >
            {/* Gold top accent on hover */}
            <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-300 ${
              isSelected ? 'bg-[#A0845C]' : 'bg-transparent group-hover:bg-[#A0845C]/50'
            }`} />

            {/* MQ large number */}
            <span className="text-5xl font-bold text-[#1D1D1F]">
              {m.mq}
              <span className="ml-1 text-lg font-medium text-[#86868B]">m²</span>
            </span>

            {/* Label and description */}
            <h3 className="mt-3 text-base font-semibold text-[#1D1D1F]">{m.label}</h3>
            <p className="mt-1 text-base text-[#86868B] leading-relaxed">{m.description}</p>

            {/* Livelli badge */}
            <div className="mt-auto flex items-center gap-2 pt-4">
              <Layers className="h-4 w-4 text-[#A0845C]" />
              <span className="text-xs font-medium text-[#86868B]">
                {m.livelli === 1 ? '1 livello' : '2 livelli'}
              </span>
            </div>
          </motion.button>
        )
      })}
    </div>
    </div>
  )
}
