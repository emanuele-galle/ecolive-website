'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { tipologie } from '@/data/tipologie'
import { useConfiguratoreStore } from '@/lib/configuratore-v3/store'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function StepTipologia() {
  const { tipologia, setTipologia, nextStep } = useConfiguratoreStore()

  function handleSelect(id: string) {
    setTipologia(id as typeof tipologia & string)
    nextStep()
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {tipologie.map((t, i) => {
        const isSelected = tipologia === t.id
        return (
          <motion.button
            key={t.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4 }}
            onClick={() => handleSelect(t.id)}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 text-left transition-colors ${
              isSelected
                ? 'border-[#A0845C] shadow-lg shadow-[#A0845C]/20'
                : 'border-[#E5E5E7] hover:border-[#A0845C]/50'
            } bg-white`}
          >
            {/* Image */}
            <div className="relative h-[200px] w-full overflow-hidden">
              <Image
                src={t.imageUrl}
                alt={t.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-[#1D1D1F]/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                {t.category}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-2 p-5">
              <h3 className="text-lg font-bold text-[#1D1D1F]">{t.title}</h3>
              <p className="text-base text-[#86868B] leading-relaxed line-clamp-2">
                {t.description}
              </p>
              <div className="mt-auto flex items-center justify-between pt-3 text-sm">
                <span className="font-medium text-[#1D1D1F]">{t.surfaceRange}</span>
                <span className="font-semibold text-[#A0845C]">{t.priceRange}</span>
              </div>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
