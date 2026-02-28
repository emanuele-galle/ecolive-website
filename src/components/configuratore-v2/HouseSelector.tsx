'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Home, Layers } from 'lucide-react'
import HouseCard from './HouseCard'
import { useConfiguratorV2 } from './hooks/useConfiguratorV2'
import { houseConfigurations } from '@/lib/configuratore-v2/configurations'
import type { HouseType } from '@/lib/configuratore-v2/types'

export default function HouseSelector() {
  const { hoveredHouse, setHoveredHouse, selectHouse } = useConfiguratorV2()

  return (
    <motion.div
      className="min-h-[calc(100vh-80px)] w-full flex flex-col lg:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Desktop: Split screen horizontal */}
      <div className="hidden lg:flex w-full min-h-[calc(100vh-80px)]">
        <HouseCard
          type="2-piani"
          isHovered={hoveredHouse === '2-piani'}
          otherHovered={hoveredHouse === '1-piano'}
          onHover={(hovered) => setHoveredHouse(hovered ? '2-piani' : null)}
          onSelect={() => selectHouse('2-piani')}
        />
        {/* Divider */}
        <div className="w-px bg-white/20 relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center z-20">
            <span className="text-[#1D1D1F] font-bold text-sm">VS</span>
          </div>
        </div>
        <HouseCard
          type="1-piano"
          isHovered={hoveredHouse === '1-piano'}
          otherHovered={hoveredHouse === '2-piani'}
          onHover={(hovered) => setHoveredHouse(hovered ? '1-piano' : null)}
          onSelect={() => selectHouse('1-piano')}
        />
      </div>

      {/* Mobile: Stacked cards */}
      <div className="lg:hidden flex flex-col min-h-[calc(100vh-80px)]">
        <MobileHouseCard type="2-piani" onSelect={() => selectHouse('2-piani')} />
        <MobileHouseCard type="1-piano" onSelect={() => selectHouse('1-piano')} />
      </div>
    </motion.div>
  )
}

// Mobile version of HouseCard
function MobileHouseCard({
  type,
  onSelect,
}: {
  type: HouseType
  onSelect: () => void
}) {
  const config = houseConfigurations[type]
  const Icon = type === '1-piano' ? Home : Layers

  return (
    <motion.button
      onClick={onSelect}
      className="flex-1 relative overflow-hidden"
      whileTap={{ scale: 0.98 }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={config.heroImage}
          alt={config.label}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/95 via-[#1D1D1F]/60 to-[#1D1D1F]/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">{config.label}</h2>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#A0845C]/90 rounded-full">
              <span className="text-white text-sm font-medium">Da {config.minSqm} mq</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-[#1D1D1F]" />
          </div>
        </div>
      </div>
    </motion.button>
  )
}
