'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Home, Layers, BedDouble, Ruler, Check, Edit2 } from 'lucide-react'
import { useConfiguratorV2 } from './hooks/useConfiguratorV2'
import { houseConfigurations, getRoomImage } from '@/lib/configuratore-v2/configurations'

interface ConfigSummaryProps {
  onEdit?: () => void
}

export default function ConfigSummary({ onEdit }: ConfigSummaryProps) {
  const { selectedHouse, selectedRooms, selectedConfig, goBack } = useConfiguratorV2()

  if (!selectedHouse || !selectedRooms || !selectedConfig) return null

  const houseConfig = houseConfigurations[selectedHouse]
  const Icon = selectedHouse === '1-piano' ? Home : Layers
  const roomImage = getRoomImage(selectedHouse, selectedRooms)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-40 lg:h-48">
        <Image
          src={roomImage}
          alt={`${houseConfig.label} - ${selectedRooms} camere`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/80 to-transparent" />

        {/* Edit button */}
        <button
          onClick={onEdit || goBack}
          className="absolute top-3 right-3 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/20 transition-colors"
        >
          <Edit2 className="w-4 h-4" />
        </button>

        {/* Config label */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Icon className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg">{houseConfig.label}</h3>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 space-y-4">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          La tua configurazione
        </h4>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 bg-[#1D1D1F]/5 rounded-xl">
            <BedDouble className="w-5 h-5 text-[#1D1D1F]" />
            <div>
              <p className="text-lg font-bold text-[#1D1D1F]">{selectedRooms}</p>
              <p className="text-xs text-gray-500">Camere</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#A0845C]/5 rounded-xl">
            <Ruler className="w-5 h-5 text-[#A0845C]" />
            <div>
              <p className="text-lg font-bold text-[#A0845C]">~{selectedConfig.sqm}</p>
              <p className="text-xs text-gray-500">mq</p>
            </div>
          </div>
        </div>

        {/* Composition */}
        <div className="pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed">
            {selectedConfig.composition}
          </p>
        </div>

        {/* Details for 2-piani */}
        {selectedConfig.details && (
          <div className="space-y-2 pt-3 border-t border-gray-100">
            <div className="flex items-start gap-2">
              <span className="text-xs font-medium text-[#1D1D1F] bg-[#1D1D1F]/10 px-2 py-0.5 rounded">
                PT
              </span>
              <span className="text-sm text-gray-600">{selectedConfig.details.pianoTerra}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs font-medium text-[#1D1D1F] bg-[#1D1D1F]/10 px-2 py-0.5 rounded">
                P1
              </span>
              <span className="text-sm text-gray-600">{selectedConfig.details.piano1}</span>
            </div>
          </div>
        )}

        {/* Benefits */}
        <div className="pt-3 border-t border-gray-100">
          <div className="space-y-2">
            {[
              'Struttura in legno X-Frame',
              'Classe energetica A4',
              'Garanzia 10 anni',
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#A0845C]" />
                <span className="text-sm text-gray-600">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
