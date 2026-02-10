'use client'

import { motion, useInView } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useRef } from 'react'

interface Milestone {
  year: number
  label: string
  status: string
}

interface WarrantyTimelineCardProps {
  milestones: Milestone[]
}

export default function WarrantyTimelineCard({ milestones }: WarrantyTimelineCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  return (
    <div ref={ref} className="bg-gradient-to-br from-[#1D1D1F] to-[#48484A] rounded-3xl p-8 text-white">
      {/* Header centrato */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-2">Garanzia 30 Anni sulla Struttura</h3>
        <p className="text-white/70 text-base md:text-lg">Zero manutenzione straordinaria, zero stress</p>
      </motion.div>

      {/* Timeline orizzontale con progress line animata */}
      <div className="relative mb-12">
        {/* Static background line */}
        <div className="h-1 bg-white/20 rounded-full" />

        {/* Animated progress line (scroll-triggered) */}
        <motion.div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#A0845C] to-[#E8956B] rounded-full"
          initial={{ width: '0%' }}
          animate={isInView ? { width: '100%' } : { width: '0%' }}
          transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
        />

        {/* Milestones con pulsing rings */}
        <div className="relative flex justify-between pt-8">
          {milestones.map((milestone, idx) => (
            <motion.div
              key={idx}
              className="text-center flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + idx * 0.2, duration: 0.6 }}
            >
              {/* Dot con pulsing ring */}
              <div className="relative mb-3">
                {/* Pulsing ring effect */}
                <motion.div
                  className="absolute inset-0 w-6 h-6 rounded-full border-2 border-[#A0845C]"
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.3
                  }}
                />

                {/* Main dot */}
                <motion.div
                  className="relative w-6 h-6 rounded-full bg-[#A0845C] border-4 border-[#1D1D1F] shadow-lg shadow-[#A0845C]/30"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5 + idx * 0.2, type: "spring", stiffness: 200 }}
                />

                {/* Particle glow effect */}
                <div className="absolute inset-0 w-6 h-6 rounded-full bg-[#A0845C]/20 blur-xl" />
              </div>

              {/* Label and status */}
              <div className="text-sm md:text-base font-semibold">{milestone.label}</div>
              <div className="text-xs md:text-sm text-white/60 mt-1">{milestone.status}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comparison footer (Standard vs Ecolive) */}
      <motion.div
        className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        {/* Standard - Con problemi */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/30 flex items-center justify-center">
            <X className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <div className="font-semibold mb-1">Standard</div>
            <div className="text-white/60 text-sm">Manutenzione ogni 5-10 anni. Costi imprevisti e problemi strutturali.</div>
          </div>
        </div>

        {/* Ecolive - Perfetto */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center">
            <Check className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <div className="font-semibold mb-1">Ecolive</div>
            <div className="text-white/60 text-sm">Zero manutenzione straordinaria. Qualità costante per 30 anni.</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
