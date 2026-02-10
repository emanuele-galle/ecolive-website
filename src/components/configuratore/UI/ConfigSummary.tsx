'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, ChevronRight, Maximize2, Minimize2 } from 'lucide-react'
import { useConfigurator } from '../hooks/useConfigurator'
import { getModulePreset, formatPrice, formatSquareMeters, GRID_CELL_SIZE } from '@/lib/configuratore/constants'
import PriceBar from './PriceBar'

interface ConfigSummaryProps {
  compact?: boolean
}

export default function ConfigSummary({ compact = false }: ConfigSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const placedModules = useConfigurator((state) => state.placedModules)
  const gridCellsX = useConfigurator((state) => state.gridCellsX)
  const gridCellsZ = useConfigurator((state) => state.gridCellsZ)

  // Compute values
  const { totalSqm, totalPrice, moduleCount, maxSqm } = useMemo(() => {
    const sqm = placedModules.reduce((total, module) => {
      const preset = getModulePreset(module.presetId)
      if (!preset) return total
      return total + preset.cellsX * preset.cellsZ * GRID_CELL_SIZE * GRID_CELL_SIZE
    }, 0)

    const price = placedModules.reduce((total, module) => {
      const preset = getModulePreset(module.presetId)
      if (!preset) return total
      return total + preset.basePrice
    }, 0)

    return {
      totalSqm: sqm,
      totalPrice: price,
      moduleCount: placedModules.length,
      maxSqm: gridCellsX * gridCellsZ * GRID_CELL_SIZE * GRID_CELL_SIZE,
    }
  }, [placedModules, gridCellsX, gridCellsZ])

  // Group modules by category
  const modulesByCategory = useMemo(() => {
    const groups: Record<string, { count: number; sqm: number }> = {
      living: { count: 0, sqm: 0 },
      private: { count: 0, sqm: 0 },
      service: { count: 0, sqm: 0 },
    }

    placedModules.forEach((module) => {
      const preset = getModulePreset(module.presetId)
      if (preset) {
        const sqm = preset.cellsX * preset.cellsZ * GRID_CELL_SIZE * GRID_CELL_SIZE
        groups[preset.category].count++
        groups[preset.category].sqm += sqm
      }
    })

    return groups
  }, [placedModules])

  // Compact mode for mobile
  if (compact) {
    return (
      <div className="p-4 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">Totale</span>
            <p className="text-lg font-bold text-gray-900">
              {formatSquareMeters(totalSqm)}
            </p>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">Stima</span>
            <p className="text-lg font-bold text-[#B85C38]">
              {formatPrice(totalPrice)}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Full desktop version with PriceBar
  return (
    <div className="space-y-3">
      {/* Collapsible Summary Panel */}
      <motion.div
        layout
        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
      >
        {/* Header - Always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#48484A]" />
            <span className="font-medium text-gray-900">Riepilogo</span>
            <span className="text-sm text-gray-500">
              ({moduleCount} moduli)
            </span>
          </div>
          {isExpanded ? (
            <Minimize2 className="w-4 h-4 text-gray-400" />
          ) : (
            <Maximize2 className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                {moduleCount === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">
                    Aggiungi moduli per vedere il riepilogo
                  </p>
                ) : (
                  <>
                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="p-3 bg-gray-50 rounded-xl">
                        <span className="text-xs text-gray-500 block">Superficie</span>
                        <motion.span
                          key={totalSqm}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          className="text-lg font-bold text-gray-900"
                        >
                          {formatSquareMeters(totalSqm)}
                        </motion.span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl">
                        <span className="text-xs text-gray-500 block">Moduli</span>
                        <motion.span
                          key={moduleCount}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          className="text-lg font-bold text-gray-900"
                        >
                          {moduleCount}
                        </motion.span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-500">Spazio utilizzato</span>
                        <span className="font-medium text-gray-700">
                          {Math.round((totalSqm / maxSqm) * 100)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((totalSqm / maxSqm) * 100, 100)}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          style={{
                            backgroundColor:
                              totalSqm / maxSqm > 0.9
                                ? '#B85C38'
                                : totalSqm / maxSqm > 0.7
                                ? '#D4A574'
                                : '#48484A',
                          }}
                        />
                      </div>
                    </div>

                    {/* Category breakdown */}
                    <div className="space-y-2">
                      {modulesByCategory.living.count > 0 && (
                        <CategoryRow
                          label="Zona Giorno"
                          color="#48484A"
                          count={modulesByCategory.living.count}
                          sqm={modulesByCategory.living.sqm}
                        />
                      )}
                      {modulesByCategory.private.count > 0 && (
                        <CategoryRow
                          label="Zona Notte"
                          color="#8B7355"
                          count={modulesByCategory.private.count}
                          sqm={modulesByCategory.private.sqm}
                        />
                      )}
                      {modulesByCategory.service.count > 0 && (
                        <CategoryRow
                          label="Servizi"
                          color="#5A9CAD"
                          count={modulesByCategory.service.count}
                          sqm={modulesByCategory.service.sqm}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Price Bar with CTA */}
      {moduleCount > 0 && <PriceBar />}
    </div>
  )
}

function CategoryRow({
  label,
  color,
  count,
  sqm,
}: {
  label: string
  color: string
  count: number
  sqm: number
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2">
        <span
          className="w-3 h-3 rounded"
          style={{ backgroundColor: color }}
        />
        {label}
      </span>
      <span className="text-gray-500">
        {count} ({formatSquareMeters(sqm)})
      </span>
    </div>
  )
}
