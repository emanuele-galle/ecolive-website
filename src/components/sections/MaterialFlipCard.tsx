"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Check, X, TrendingUp } from "lucide-react"

interface Material {
  id: string
  component: string
  ecolive: {
    name: string
    features: string[]
  }
  standard: {
    name: string
    issues: string[]
  }
  icon: React.ReactNode
  costMultiplier: string
  roi: {
    year5: string
    year10: string
    year25: string
  }
}

interface MaterialFlipCardProps {
  material: Material
  index: number
}

export default function MaterialFlipCard({ material, index }: MaterialFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className="perspective-1000 h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.div
        className="relative w-full h-[480px] cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* FRONT SIDE - Comparison */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="h-full bg-white border border-[#E5E0D8] shadow-lg">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-[#E5E0D8]/50 bg-gradient-to-br from-[#1E3D30]/5 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E3D30] to-[#2D5A47] flex items-center justify-center text-white flex-shrink-0">
                  {material.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-[#1E3D30]">{material.component}</h3>
                  <p className="text-sm text-[#8A857F]">Tocca per vedere i Guadagni</p>
                </div>
                <div className="px-3 py-1 bg-[#C4704B]/10 rounded-full">
                  <span className="text-[#C4704B] font-bold text-sm">{material.costMultiplier}</span>
                </div>
              </div>
            </div>

            {/* Comparison grid */}
            <div className="grid grid-cols-2 divide-x divide-[#E5E0D8]/50 h-[calc(100%-88px)]">
              {/* Ecolive side */}
              <div className="p-4 sm:p-5 bg-gradient-to-br from-[#1E3D30]/5 to-transparent">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-[#1E3D30] text-white text-xs font-semibold rounded">ECOLIVE</span>
                </div>
                <p className="font-semibold text-[#1E3D30] text-sm sm:text-base mb-4">{material.ecolive.name}</p>

                <ul className="space-y-3">
                  {material.ecolive.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#4A4540]">
                      <Check className="w-4 h-4 text-[#2D5A47] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Standard side */}
              <div className="p-4 sm:p-5 bg-[#F8F6F3]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-[#8A857F] text-white text-xs font-semibold rounded">STANDARD</span>
                </div>
                <p className="font-semibold text-[#6B6560] text-sm sm:text-base mb-4">{material.standard.name}</p>

                <ul className="space-y-3">
                  {material.standard.issues.map((issue, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#8A857F]">
                      <X className="w-4 h-4 text-[#C4704B]/70 flex-shrink-0 mt-0.5" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* BACK SIDE - ROI Timeline */}
        <div
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="h-full bg-gradient-to-br from-[#C4704B] to-[#A85A3A] p-6 sm:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Guadagni negli Anni</h4>
                <p className="text-white/80 text-sm">{material.component}</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-6">
              {/* Year 5 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isFlipped ? 1 : 0, x: isFlipped ? 0 : -20 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex flex-col items-center justify-center flex-shrink-0">
                  <div className="text-white font-bold text-2xl">5</div>
                  <div className="text-white/70 text-xs">anni</div>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-base">{material.roi.year5}</p>
                </div>
              </motion.div>

              {/* Year 10 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isFlipped ? 1 : 0, x: isFlipped ? 0 : -20 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-xl bg-white/30 backdrop-blur-sm flex flex-col items-center justify-center flex-shrink-0">
                  <div className="text-white font-bold text-2xl">10</div>
                  <div className="text-white/70 text-xs">anni</div>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-base">{material.roi.year10}</p>
                </div>
              </motion.div>

              {/* Year 25 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isFlipped ? 1 : 0, x: isFlipped ? 0 : -20 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-xl bg-white/40 backdrop-blur-sm flex flex-col items-center justify-center flex-shrink-0">
                  <div className="text-white font-bold text-2xl">25</div>
                  <div className="text-white/70 text-xs">anni</div>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-base">{material.roi.year25}</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-white/70 text-xs">Tocca di nuovo per tornare</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
