'use client'

import { motion } from 'framer-motion'
import { BedDouble, Check } from 'lucide-react'
import type { RoomCount, RoomConfiguration } from '@/lib/configuratore-v2/types'

interface RoomOptionProps {
  config: RoomConfiguration
  isSelected: boolean
  index: number
  onSelect: () => void
}

export default function RoomOption({
  config,
  isSelected,
  index,
  onSelect,
}: RoomOptionProps) {
  return (
    <motion.button
      onClick={onSelect}
      className={`
        relative p-5 rounded-2xl border-2 text-left transition-colors duration-300
        ${
          isSelected
            ? 'border-[#A0845C] bg-[#A0845C]/5'
            : 'border-gray-200 bg-white hover:border-[#A0845C]/50 hover:bg-[#A0845C]/5'
        }
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Selected check */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#A0845C] flex items-center justify-center"
        >
          <Check className="w-4 h-4 text-white" />
        </motion.div>
      )}

      {/* Room count */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center
            ${isSelected ? 'bg-[#A0845C]' : 'bg-[#1D1D1F]/10'}
          `}
        >
          <BedDouble className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-[#1D1D1F]'}`} />
        </div>
        <div>
          <span className="text-2xl font-bold text-[#1D1D1F]">{config.rooms}</span>
          <span className="text-sm text-gray-500 ml-1">camere</span>
        </div>
      </div>

      {/* Square meters */}
      <div className="mb-3">
        <span className="text-lg font-semibold text-[#A0845C]">~{config.sqm} mq</span>
      </div>

      {/* Composition */}
      <p className="text-sm text-gray-600 leading-relaxed">{config.composition}</p>

      {/* Details for 2-piani */}
      {config.details && (
        <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
          <div className="flex items-start gap-2">
            <span className="text-xs font-medium text-[#1D1D1F] bg-[#1D1D1F]/10 px-2 py-0.5 rounded">
              PT
            </span>
            <span className="text-xs text-gray-500">{config.details.pianoTerra}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-xs font-medium text-[#1D1D1F] bg-[#1D1D1F]/10 px-2 py-0.5 rounded">
              P1
            </span>
            <span className="text-xs text-gray-500">{config.details.piano1}</span>
          </div>
        </div>
      )}
    </motion.button>
  )
}
