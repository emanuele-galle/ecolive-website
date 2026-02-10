'use client'

import { useMemo } from 'react'
import { LayoutGrid, Sofa, BedDouble, ShowerHead } from 'lucide-react'
import { useConfigurator } from '../hooks/useConfigurator'
import { getPresetsByCategory } from '@/lib/configuratore/constants'
import type { ModuleCategory } from '@/lib/configuratore/types'
import ModuleCard from './ModuleCard'
import ConfigSummary from './ConfigSummary'

const CATEGORY_TABS: Array<{
  id: ModuleCategory | 'all'
  label: string
  Icon: React.ComponentType<{ className?: string }>
}> = [
  { id: 'all', label: 'Tutti', Icon: LayoutGrid },
  { id: 'living', label: 'Giorno', Icon: Sofa },
  { id: 'private', label: 'Notte', Icon: BedDouble },
  { id: 'service', label: 'Servizi', Icon: ShowerHead },
]

export default function Sidebar() {
  const activeCategory = useConfigurator((state) => state.activeCategory)
  const setActiveCategory = useConfigurator((state) => state.setActiveCategory)

  const filteredPresets = useMemo(
    () => getPresetsByCategory(activeCategory),
    [activeCategory]
  )

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Moduli Disponibili
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Clicca <span className="font-medium">+ Aggiungi</span> poi sulla griglia
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex p-2 gap-1 border-b border-gray-200 bg-gray-50">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-all ${
              activeCategory === tab.id
                ? 'bg-white text-[#48484A] shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
            }`}
          >
            <tab.Icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Module list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filteredPresets.map((preset) => (
          <ModuleCard key={preset.id} preset={preset} />
        ))}
      </div>

      {/* Summary (mobile hidden, shown inline on desktop) */}
      <div className="border-t border-gray-200 lg:hidden">
        <ConfigSummary compact />
      </div>
    </div>
  )
}
