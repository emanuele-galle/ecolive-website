'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'
import { useConfiguratoreStore } from '@/lib/configuratore-v3/store'
import { finiture } from '@/lib/configuratore-v3/configurations'
import type { FinituraLevel } from '@/lib/configuratore-v3/types'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const PRICE_LABELS: Record<FinituraLevel, string> = {
  essenziale: 'Prezzo base ridotto (-18%)',
  premium: 'Prezzo di riferimento',
  passiva: 'Prezzo base + certificazione A4',
}

export default function StepFinitura() {
  const { finitura, setFinitura, nextStep } = useConfiguratoreStore()

  function handleSelect(id: FinituraLevel) {
    setFinitura(id)
    nextStep()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {finiture.map((f, i) => {
        const isSelected = finitura === f.id
        const isRecommended = f.id === 'premium'
        const isPassiva = f.id === 'passiva'

        return (
          <motion.button
            key={f.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4 }}
            onClick={() => handleSelect(f.id)}
            className={`group relative flex flex-col rounded-2xl border-2 p-6 text-left transition-colors ${
              isSelected
                ? 'border-[#A0845C] shadow-lg shadow-[#A0845C]/20 bg-[#A0845C]/5'
                : isRecommended
                  ? 'border-[#A0845C]/40 bg-[#F5F5F7]'
                  : 'border-[#E5E5E7] hover:border-[#A0845C]/50 bg-white'
            }`}
          >
            {/* Recommended badge */}
            {isRecommended && (
              <span className="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full bg-[#A0845C] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                <Star className="h-3 w-3" /> Raccomandato
              </span>
            )}

            {/* Title and description */}
            <h3 className="text-xl font-bold text-[#1D1D1F]">{f.label}</h3>
            <p className="mt-2 text-base text-[#86868B] leading-relaxed">{f.description}</p>

            {/* Materials list */}
            <ul className="mt-4 flex flex-col gap-2">
              {f.materiali.map((mat) => (
                <li key={mat} className="flex items-start gap-2 text-sm text-[#1D1D1F]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#A0845C]" />
                  <span>{mat}</span>
                </li>
              ))}
            </ul>

            {/* Price indication */}
            <div className="mt-auto pt-5">
              <span className="text-xs font-medium text-[#86868B]">
                {PRICE_LABELS[f.id]}
              </span>
              {isPassiva && (
                <p className="mt-1 text-xs text-[#A0845C] font-medium">
                  +€10.000/€18.000 per certificazione A4
                </p>
              )}
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
