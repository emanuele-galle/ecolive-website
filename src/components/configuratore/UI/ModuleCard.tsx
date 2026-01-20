'use client'

import { useMemo, useCallback } from 'react'
import {
  Home,
  Sofa,
  CookingPot,
  BedDouble,
  BedSingle,
  Briefcase,
  Shirt,
  ShowerHead,
  Plus,
  MousePointerClick,
} from 'lucide-react'
import type { ModulePreset, ModuleIconName } from '@/lib/configuratore/types'
import { GRID_CELL_SIZE, formatPrice, formatSquareMeters } from '@/lib/configuratore/constants'
import { useConfigurator } from '../hooks/useConfigurator'

// Mappa icone Lucide
const ICON_MAP: Record<ModuleIconName, React.ComponentType<{ className?: string }>> = {
  'home': Home,
  'sofa': Sofa,
  'cooking-pot': CookingPot,
  'bed-double': BedDouble,
  'bed-single': BedSingle,
  'briefcase': Briefcase,
  'shirt': Shirt,
  'shower-head': ShowerHead,
}

interface ModuleCardProps {
  preset: ModulePreset
}

export default function ModuleCard({ preset }: ModuleCardProps) {
  const setSelectedPreset = useConfigurator((state) => state.setSelectedPreset)
  const selectedPresetId = useConfigurator((state) => state.interaction.selectedPresetId)

  const isSelected = selectedPresetId === preset.id

  const squareMeters = useMemo(
    () => preset.cellsX * preset.cellsZ * GRID_CELL_SIZE * GRID_CELL_SIZE,
    [preset.cellsX, preset.cellsZ]
  )

  // Click sulla card: seleziona/deseleziona preset
  const handleCardClick = useCallback(() => {
    if (isSelected) {
      setSelectedPreset(null)
    } else {
      setSelectedPreset(preset.id)
    }
  }, [preset.id, isSelected, setSelectedPreset])

  // Click sul pulsante Aggiungi: seleziona direttamente
  const handleAddClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedPreset(preset.id)
  }, [preset.id, setSelectedPreset])

  // Ottieni icona corretta
  const IconComponent = preset.iconName ? ICON_MAP[preset.iconName] : null

  return (
    <div
      onClick={handleCardClick}
      className={`
        w-full p-3 bg-white rounded-xl border-2 transition-all duration-200 text-left group cursor-pointer select-none
        ${isSelected
          ? 'border-[#2D5A47] shadow-lg ring-2 ring-[#2D5A47]/20'
          : 'border-gray-200 hover:border-[#2D5A47]/50 hover:shadow-md'
        }
      `}
    >
      <div className="flex items-start gap-3">
        {/* Icon indicator - Lucide SVG invece di emoji */}
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform ${isSelected ? 'scale-110' : ''}`}
          style={{ backgroundColor: preset.color }}
        >
          {IconComponent ? (
            <IconComponent className="w-5 h-5 text-white" />
          ) : (
            <span className="text-lg drop-shadow-sm">{preset.icon}</span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className={`font-medium transition-colors truncate ${isSelected ? 'text-[#2D5A47]' : 'text-gray-900 group-hover:text-[#2D5A47]'}`}>
            {preset.name}
          </h4>
          <p className="text-xs text-gray-500 truncate">{preset.description}</p>

          <div className="flex items-center gap-2 mt-1.5">
            {/* Size badge */}
            <span className="inline-flex items-center px-1.5 py-0.5 bg-gray-100 rounded text-xs text-gray-500">
              {preset.cellsX}x{preset.cellsZ}
            </span>

            {/* Square meters */}
            <span className="text-xs text-gray-500">
              {formatSquareMeters(squareMeters)}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="text-right flex-shrink-0">
          <span className="text-sm font-semibold text-[#B85C38]">
            {formatPrice(preset.basePrice)}
          </span>
        </div>
      </div>

      {/* Action button - Esplicito invece di double-click */}
      <div className="mt-3">
        {isSelected ? (
          <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#2D5A47] text-white">
            <MousePointerClick className="w-4 h-4" />
            <span className="text-xs font-medium">
              Clicca sulla griglia per piazzare
            </span>
          </div>
        ) : (
          <button
            onClick={handleAddClick}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gray-100 hover:bg-[#2D5A47] text-gray-600 hover:text-white transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs font-medium">
              Aggiungi
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
