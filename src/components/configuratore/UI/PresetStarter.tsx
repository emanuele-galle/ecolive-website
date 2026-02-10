'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Building2, PlusCircle, ArrowRight } from 'lucide-react'
import { useConfigurator } from '../hooks/useConfigurator'
import { STARTER_PRESETS, formatPrice, GRID_CELL_SIZE } from '@/lib/configuratore/constants'

const PRESET_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'casa-2-camere': Home,
  'villa-open': Building2,
  'vuoto': PlusCircle,
}

export default function PresetStarter() {
  const [showModal, setShowModal] = useState(false)
  const placedModules = useConfigurator((state) => state.placedModules)
  const loadPreset = useConfigurator((state) => state.loadPreset)

  // Mostra modal solo se la griglia è vuota e non è stata vista prima
  useEffect(() => {
    const hasSeenStarter = sessionStorage.getItem('ecolive-starter-seen')
    if (!hasSeenStarter && placedModules.length === 0) {
      const timer = setTimeout(() => setShowModal(true), 300)
      return () => clearTimeout(timer)
    }
  }, [placedModules.length])

  const handleSelectPreset = useCallback((presetId: string) => {
    loadPreset(presetId)
    setShowModal(false)
    sessionStorage.setItem('ecolive-starter-seen', 'true')
  }, [loadPreset])

  const handleSkip = useCallback(() => {
    setShowModal(false)
    sessionStorage.setItem('ecolive-starter-seen', 'true')
  }, [])

  // Calcola prezzo stimato per ogni preset
  const getPresetPrice = useCallback((presetId: string) => {
    const preset = STARTER_PRESETS.find(p => p.id === presetId)
    if (!preset || preset.modules.length === 0) return 0

    // Stima basata su €1800/mq
    return preset.sqm * 1800
  }, [])

  if (!showModal) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleSkip}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
        >
          {/* Header gradient */}
          <div className="h-1.5 bg-gradient-to-r from-[#1D3D2D] via-[#48484A] to-[#B85C38]" />

          <div className="p-6 md:p-8">
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Come vuoi iniziare?
              </h2>
              <p className="text-gray-500">
                Scegli una configurazione di partenza o inizia da zero
              </p>
            </div>

            {/* Preset cards */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              {STARTER_PRESETS.map((preset) => {
                const Icon = PRESET_ICONS[preset.id] || Home
                const price = getPresetPrice(preset.id)
                const isBlank = preset.modules.length === 0

                return (
                  <motion.button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      relative p-5 rounded-xl border-2 text-left transition-all duration-200
                      ${isBlank
                        ? 'border-dashed border-gray-300 hover:border-gray-400 bg-gray-50'
                        : 'border-gray-200 hover:border-[#48484A] bg-white hover:shadow-lg'
                      }
                    `}
                  >
                    {/* Icon */}
                    <div
                      className={`
                        w-12 h-12 rounded-xl flex items-center justify-center mb-4
                        ${isBlank ? 'bg-gray-200' : 'bg-[#48484A]/10'}
                      `}
                    >
                      <Icon
                        className={`w-6 h-6 ${isBlank ? 'text-gray-500' : 'text-[#48484A]'}`}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {preset.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {preset.description}
                    </p>

                    {/* Stats */}
                    {!isBlank && (
                      <div className="flex items-center gap-3 text-sm">
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                          ~{preset.sqm} m²
                        </span>
                        <span className="font-medium text-[#B85C38]">
                          ~{formatPrice(price)}
                        </span>
                      </div>
                    )}

                    {/* Arrow indicator */}
                    <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5 text-[#48484A]" />
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Skip link */}
            <div className="text-center">
              <button
                onClick={handleSkip}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Chiudi e continua senza preset
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              Potrai modificare liberamente la configurazione in qualsiasi momento
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
