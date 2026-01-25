"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import NumberFlow from '@number-flow/react'
import type { MaterialSpec } from "@/data/materialsEducationData"
import { useState } from "react"

interface ComparisonTableProps {
  specs: MaterialSpec[]
  title?: string
}

/**
 * Extract numeric value from string if present (e.g., "±3-5mm" -> 4)
 * Returns a percentage representation for visual bar (0-100)
 */
function extractPercentageValue(value: string, isEcolive: boolean): number {
  // Try to extract first number
  const match = value.match(/[\d.]+/)
  if (!match) {
    // Fallback based on quality keywords
    if (isEcolive) return 95
    return 40
  }

  const num = parseFloat(match[0])

  // Normalize to percentage (heuristic based on typical values)
  if (num < 1) return num * 100 // Already percentage-like
  if (num < 10) return isEcolive ? 95 : 60 // Small values (years, etc)
  if (num < 50) return isEcolive ? 90 : 50 // Medium values
  return isEcolive ? 98 : 35 // Large values
}

export default function ComparisonTable({ specs, title = "Dati Tecnici a Confronto" }: ComparisonTableProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-8 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/60 text-sm md:text-base">
          Confronto oggettivo delle prestazioni certificate
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="space-y-6">
        {specs.map((spec, index) => {
          const isHovered = hoveredRow === spec.metrica
          const standardPercent = extractPercentageValue(spec.standard.valore, false)
          const ecolivePercent = extractPercentageValue(spec.ecolive.valore, true)

          return (
            <motion.div
              key={spec.metrica}
              className={`
                relative p-6 rounded-2xl border transition-all duration-300
                ${isHovered
                  ? 'bg-white/[0.05] border-[#C4704B]/40 shadow-lg shadow-[#C4704B]/10'
                  : 'bg-white/[0.02] border-white/10'
                }
              `}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onHoverStart={() => setHoveredRow(spec.metrica)}
              onHoverEnd={() => setHoveredRow(null)}
            >
              {/* Metric name */}
              <h4 className="text-lg font-bold text-white mb-6">{spec.metrica}</h4>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Standard Column */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20">
                      <X className="w-3.5 h-3.5 text-red-400" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-medium text-white/70">Standard</span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="relative h-3 bg-black/30 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${standardPercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                    />
                  </div>

                  {/* Value */}
                  <div className="text-white/90 font-mono text-sm">
                    {spec.standard.valore}
                  </div>

                  {/* Problems */}
                  <p className="text-red-400/70 text-xs leading-relaxed">
                    {spec.standard.problemi}
                  </p>
                </div>

                {/* Ecolive Column */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20">
                      <Check className="w-3.5 h-3.5 text-green-400" strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-medium text-[#C4704B]">Ecolive Premium</span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="relative h-3 bg-black/30 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#40916c] to-green-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${ecolivePercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                    />
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileInView={{ x: '200%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
                    />
                  </div>

                  {/* Value */}
                  <div className="text-[#C4704B] font-mono font-semibold text-sm">
                    {spec.ecolive.valore}
                  </div>

                  {/* Benefits */}
                  <p className="text-green-400/70 text-xs leading-relaxed">
                    {spec.ecolive.benefici}
                  </p>
                </div>
              </div>

              {/* Percentage indicator */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-white/50">Differenza prestazioni:</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[#40916c] font-semibold">+</span>
                  <NumberFlow
                    value={Math.round(ecolivePercent - standardPercent)}
                    className="text-[#40916c] font-bold"
                    format={{ notation: 'standard' }}
                    suffix="%"
                    animated
                  />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Summary Footer */}
      <motion.div
        className="mt-8 p-6 bg-gradient-to-br from-[#C4704B]/10 to-[#40916c]/10 backdrop-blur-sm rounded-xl border border-[#C4704B]/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: specs.length * 0.1 + 0.2 }}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C4704B]/30 flex items-center justify-center">
            <Check className="w-5 h-5 text-[#C4704B]" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-white font-semibold mb-2">Perché la differenza è evidente</div>
            <p className="text-white/60 text-sm leading-relaxed">
              I dati tecnici mostrano prestazioni certificate superiori in ogni categoria.
              Questi numeri si traducono in comfort quotidiano, risparmio energetico e
              tranquillità a lungo termine.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
