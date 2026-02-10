'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Layers, Ruler, Thermometer, Shield, Droplets } from 'lucide-react'
import { useEffect, useCallback } from 'react'

export interface LayerData {
  code: string
  name: string
  thickness: number
  material: string
  description: string
  properties?: {
    density?: string
    conductivity?: string
    fireClass?: string
    certification?: string
  }
  color: string
  pattern: 'wood' | 'insulation' | 'membrane' | 'panel' | 'finish'
}

interface Props {
  layer: LayerData | null
  isOpen: boolean
  onClose: () => void
}

// Pattern SVG per ogni tipo di materiale
const getPatternSvg = (pattern: LayerData['pattern']) => {
  switch (pattern) {
    case 'wood':
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="wood-pattern" patternUnits="userSpaceOnUse" width="20" height="10">
              <path d="M0 5 Q5 3 10 5 T20 5" fill="none" stroke="#8b6914" strokeWidth="0.5" opacity="0.6"/>
              <path d="M0 8 Q5 6 10 8 T20 8" fill="none" stroke="#6b5210" strokeWidth="0.3" opacity="0.4"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="#c9a86c"/>
          <rect width="100" height="100" fill="url(#wood-pattern)"/>
        </svg>
      )
    case 'insulation':
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="insulation-pattern" patternUnits="userSpaceOnUse" width="8" height="8">
              <circle cx="4" cy="4" r="1.5" fill="#4a6670" opacity="0.5"/>
              <circle cx="0" cy="0" r="1" fill="#5a7680" opacity="0.3"/>
              <circle cx="8" cy="8" r="1" fill="#5a7680" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="#6b8e9f"/>
          <rect width="100" height="100" fill="url(#insulation-pattern)"/>
        </svg>
      )
    case 'membrane':
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="membrane-pattern" patternUnits="userSpaceOnUse" width="10" height="4">
              <line x1="0" y1="2" x2="10" y2="2" stroke="#4a9eff" strokeWidth="0.3" strokeDasharray="2,2"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="#2a4a6a"/>
          <rect width="100" height="100" fill="url(#membrane-pattern)"/>
        </svg>
      )
    case 'panel':
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="panel-pattern" patternUnits="userSpaceOnUse" width="15" height="15">
              <rect width="15" height="15" fill="none" stroke="#a08050" strokeWidth="0.5" opacity="0.4"/>
              <line x1="0" y1="0" x2="15" y2="15" stroke="#907040" strokeWidth="0.3" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="#b8956c"/>
          <rect width="100" height="100" fill="url(#panel-pattern)"/>
        </svg>
      )
    case 'finish':
      return (
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="finish-pattern" patternUnits="userSpaceOnUse" width="4" height="4">
              <rect width="4" height="4" fill="#e8e4dc"/>
              <circle cx="2" cy="2" r="0.3" fill="#d0ccc4" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#finish-pattern)"/>
        </svg>
      )
  }
}

export default function LayerDetailModal({ layer, isOpen, onClose }: Props) {
  // Chiudi con ESC
  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEsc])

  if (!layer) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#0a1628]/90 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Card */}
          <motion.div
            className="relative w-full max-w-2xl bg-gradient-to-br from-[#0f2847] to-[#0a1628] rounded-2xl border border-[#1a3a5c] shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#4a9eff]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#A0845C]/20 rounded-full blur-3xl" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#1a3a5c]/50 hover:bg-[#1a3a5c] text-[#4a9eff] hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="relative z-10 p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start gap-6 mb-8">
                {/* Pattern Preview */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 border-[#4a9eff]/30 shadow-lg flex-shrink-0">
                  {getPatternSvg(layer.pattern)}
                </div>

                <div className="flex-1">
                  {/* Code Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4a9eff]/20 rounded-full border border-[#4a9eff]/30 mb-3">
                    <span className="text-[#4a9eff] font-mono font-bold">{layer.code}</span>
                    <span className="text-[#4a9eff]/60 text-xs">STRATO</span>
                  </div>

                  {/* Name */}
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {layer.name}
                  </h2>

                  {/* Material */}
                  <p className="text-[#6b8e9f] text-sm">
                    {layer.material}
                  </p>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {/* Thickness */}
                <div className="bg-[#1a3a5c]/30 rounded-xl p-4 border border-[#1a3a5c]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4 text-[#4a9eff]" />
                    <span className="text-[#6b8e9f] text-xs uppercase tracking-wider">Spessore</span>
                  </div>
                  <div className="text-white font-bold text-xl">
                    {layer.thickness} <span className="text-sm font-normal text-[#6b8e9f]">mm</span>
                  </div>
                </div>

                {/* Density */}
                {layer.properties?.density && (
                  <div className="bg-[#1a3a5c]/30 rounded-xl p-4 border border-[#1a3a5c]/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-4 h-4 text-[#4a9eff]" />
                      <span className="text-[#6b8e9f] text-xs uppercase tracking-wider">Densita</span>
                    </div>
                    <div className="text-white font-bold text-xl">
                      {layer.properties.density}
                    </div>
                  </div>
                )}

                {/* Conductivity */}
                {layer.properties?.conductivity && (
                  <div className="bg-[#1a3a5c]/30 rounded-xl p-4 border border-[#1a3a5c]/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="w-4 h-4 text-[#4a9eff]" />
                      <span className="text-[#6b8e9f] text-xs uppercase tracking-wider">Lambda</span>
                    </div>
                    <div className="text-white font-bold text-xl">
                      {layer.properties.conductivity}
                    </div>
                  </div>
                )}

                {/* Fire Class */}
                {layer.properties?.fireClass && (
                  <div className="bg-[#1a3a5c]/30 rounded-xl p-4 border border-[#1a3a5c]/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-[#A0845C]" />
                      <span className="text-[#6b8e9f] text-xs uppercase tracking-wider">Classe Fuoco</span>
                    </div>
                    <div className="text-white font-bold text-xl">
                      {layer.properties.fireClass}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-[#1a3a5c]/20 rounded-xl p-5 border border-[#1a3a5c]/30 mb-6">
                <h3 className="text-[#4a9eff] font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  Funzione
                </h3>
                <p className="text-[#e8f4ff]/80 leading-relaxed">
                  {layer.description}
                </p>
              </div>

              {/* Certification Badge */}
              {layer.properties?.certification && (
                <div className="flex items-center justify-center">
                  <div className="inline-flex items-center gap-3 px-5 py-3 bg-[#A0845C]/10 rounded-full border border-[#A0845C]/30">
                    <Shield className="w-5 h-5 text-[#A0845C]" />
                    <span className="text-[#A0845C] font-semibold">
                      {layer.properties.certification}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom gradient line */}
            <div className="h-1 bg-gradient-to-r from-[#4a9eff] via-[#A0845C] to-[#4a9eff]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
