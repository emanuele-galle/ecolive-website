'use client'

import { motion } from 'framer-motion'
import NumberFlow from '@number-flow/react'
import PerformanceSparkline from '@/components/charts/PerformanceSparkline'
import { materialsEducationData, MaterialEducationData } from '@/data/materialsEducationData'

interface MaterialTabsProps {
  activeId: string
  onSelect: (id: string) => void
}

export default function MaterialTabs({ activeId, onSelect }: MaterialTabsProps) {
  const materials = Object.values(materialsEducationData)

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((material, idx) => {
            const isActive = material.id === activeId
            const Icon = material.icon

            return (
              <motion.button
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                onClick={() => onSelect(material.id)}
                className={`
                  relative group text-left p-6 rounded-2xl border-2 transition-all duration-300
                  ${isActive
                    ? 'bg-gradient-to-br from-[#152822]/80 to-[#152822]/60 border-[#C4704B] shadow-lg shadow-[#C4704B]/20'
                    : 'bg-[#152822]/40 border-[#8A857F]/20 hover:border-[#C4704B]/40'
                  }
                `}
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Animated ring glow for active state */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{
                      boxShadow: [
                        `0 0 0 0 ${material.color}40`,
                        `0 0 0 8px ${material.color}10`,
                        `0 0 0 0 ${material.color}40`,
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Icon */}
                <div
                  className={`
                    w-16 h-16 rounded-xl flex items-center justify-center mb-4
                    transition-colors duration-300
                    ${isActive
                      ? 'bg-gradient-to-br from-[#C4704B] to-[#A85A3A]'
                      : 'bg-[#8A857F]/20 group-hover:bg-[#C4704B]/30'
                    }
                  `}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-1">{material.nome}</h3>
                <p className="text-sm text-[#8A857F] mb-4 line-clamp-1">{material.sottotitolo}</p>

                {/* Investment amount */}
                <div className="mb-4">
                  <p className="text-xs text-[#8A857F] mb-1">Investimento extra</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold" style={{ color: material.color }}>+€</span>
                    <NumberFlow
                      value={material.breakdown.investimentoExtra}
                      className="text-xl font-bold"
                      style={{ color: material.color }}
                      format={{ notation: 'standard' }}
                      animated
                    />
                  </div>
                </div>

                {/* Sparkline chart */}
                <div className="mb-2">
                  <p className="text-xs text-[#8A857F] mb-2">
                    {material.performanceTrend[0]?.metrica || 'Performance'}
                  </p>
                  <div className="h-12 w-full bg-black/20 rounded-lg overflow-hidden border border-white/5">
                    <PerformanceSparkline
                      data={material.performanceTrend}
                      color={material.color}
                      height={48}
                    />
                  </div>
                </div>

                {/* Quality indicator */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                  <span className="text-xs text-[#8A857F]">Ecolive Premium</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#40916c] animate-pulse" />
                    <span className="text-xs font-semibold text-[#40916c]">100%</span>
                  </div>
                </div>

                {/* Active indicator arrow */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2"
                  >
                    <div
                      className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent"
                      style={{ borderTopColor: material.color }}
                    />
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
