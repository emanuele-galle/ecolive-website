'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
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
    <div>
      <div className="text-center mb-8">
        <p className="text-[#86868B] text-base max-w-lg mx-auto">
          Ogni tipologia ha caratteristiche e prezzi diversi. Clicca per selezionare e proseguire.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {tipologie.map((t, i) => {
          const isSelected = tipologia === t.id
          return (
            <motion.button
              key={t.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              onClick={() => handleSelect(t.id)}
              className={`group relative flex flex-col overflow-hidden rounded-2xl text-left transition-all duration-300 ${
                isSelected
                  ? 'ring-2 ring-[#A0845C] shadow-xl shadow-[#A0845C]/15'
                  : 'ring-1 ring-[#E5E5E7] hover:ring-[#A0845C]/40 hover:shadow-xl'
              } bg-white`}
            >
              {/* Image with gradient overlay */}
              <div className="relative h-[220px] sm:h-[240px] w-full overflow-hidden">
                <Image
                  src={t.imageUrl}
                  alt={t.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Category badge */}
                <span className="absolute left-4 top-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1D1D1F]">
                  {t.category}
                </span>

                {/* Surface range badge bottom-right */}
                <span className="absolute right-4 bottom-4 rounded-full bg-[#A0845C] px-3 py-1.5 text-xs font-bold text-white">
                  {t.surfaceRange}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-[#1D1D1F] mb-2">{t.title}</h3>
                <p className="text-base text-[#86868B] leading-relaxed line-clamp-2 flex-1">
                  {t.description}
                </p>

                {/* Price + CTA row */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#F5F5F7]">
                  <span className="text-lg font-bold text-[#A0845C]">{t.priceRange}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#86868B] group-hover:text-[#A0845C] transition-colors">
                    Seleziona
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
