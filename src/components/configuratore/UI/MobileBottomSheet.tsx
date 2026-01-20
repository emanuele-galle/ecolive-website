'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion, useMotionValue, useTransform, useDragControls, PanInfo } from 'framer-motion'
import { ChevronUp, LayoutGrid, Sofa, BedDouble, ShowerHead, Plus, MousePointerClick } from 'lucide-react'
import { useConfigurator } from '../hooks/useConfigurator'
import { getPresetsByCategory, formatPrice, formatSquareMeters, GRID_CELL_SIZE, getModulePreset } from '@/lib/configuratore/constants'
import type { ModuleCategory, ModulePreset, ModuleIconName } from '@/lib/configuratore/types'
import ActionBar from './ActionBar'

// Icone per i moduli
import {
  Home,
  CookingPot,
  BedSingle,
  Briefcase,
  Shirt,
  ShowerHead as ShowerIcon,
} from 'lucide-react'

const ICON_MAP: Record<ModuleIconName, React.ComponentType<{ className?: string }>> = {
  'home': Home,
  'sofa': Sofa,
  'cooking-pot': CookingPot,
  'bed-double': BedDouble,
  'bed-single': BedSingle,
  'briefcase': Briefcase,
  'shirt': Shirt,
  'shower-head': ShowerIcon,
}

// Stati del bottom sheet
type SheetState = 'collapsed' | 'half' | 'full'

const SHEET_HEIGHTS = {
  collapsed: 100, // Solo prezzo
  half: 320,      // Moduli in orizzontale
  full: 600,      // Lista completa
}

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

export default function MobileBottomSheet() {
  const [sheetState, setSheetState] = useState<SheetState>('collapsed')
  const [activeCategory, setActiveCategory] = useState<ModuleCategory | 'all'>('all')
  const dragControls = useDragControls()
  const y = useMotionValue(0)

  // Store data
  const placedModules = useConfigurator((state) => state.placedModules)
  const setSelectedPreset = useConfigurator((state) => state.setSelectedPreset)
  const selectedPresetId = useConfigurator((state) => state.interaction.selectedPresetId)

  const filteredPresets = useMemo(
    () => getPresetsByCategory(activeCategory),
    [activeCategory]
  )

  // Calcola totali
  const { totalSqm, totalPrice, moduleCount } = useMemo(() => {
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
    }
  }, [placedModules])

  // Handle drag end
  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocity = info.velocity.y
    const offset = info.offset.y

    // Determine direction based on velocity and offset
    if (velocity < -500 || offset < -50) {
      // Swipe up - expand
      if (sheetState === 'collapsed') setSheetState('half')
      else if (sheetState === 'half') setSheetState('full')
    } else if (velocity > 500 || offset > 50) {
      // Swipe down - collapse
      if (sheetState === 'full') setSheetState('half')
      else if (sheetState === 'half') setSheetState('collapsed')
    }
  }, [sheetState])

  // Handle tap on handle
  const handleHandleTap = useCallback(() => {
    if (sheetState === 'collapsed') setSheetState('half')
    else if (sheetState === 'half') setSheetState('full')
    else setSheetState('collapsed')
  }, [sheetState])

  // Handle module selection
  const handleSelectModule = useCallback((presetId: string) => {
    if (selectedPresetId === presetId) {
      setSelectedPreset(null)
    } else {
      setSelectedPreset(presetId)
      // Collapse sheet when selecting to allow placing
      setSheetState('collapsed')
    }
  }, [selectedPresetId, setSelectedPreset])

  const currentHeight = SHEET_HEIGHTS[sheetState]

  return (
    <motion.div
      drag="y"
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      animate={{ height: currentHeight }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-40 flex flex-col"
      style={{ maxHeight: '85vh' }}
    >
      {/* Drag handle */}
      <div
        onPointerDown={(e) => dragControls.start(e)}
        onClick={handleHandleTap}
        className="flex-shrink-0 pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none"
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto" />

        {/* Chevron indicator */}
        <motion.div
          animate={{ rotate: sheetState === 'collapsed' ? 0 : 180 }}
          className="flex justify-center mt-1"
        >
          <ChevronUp className="w-5 h-5 text-gray-400" />
        </motion.div>
      </div>

      {/* Collapsed state - Price bar only */}
      {sheetState === 'collapsed' && (
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500">Superficie</span>
              <p className="text-xl font-bold text-gray-900">{formatSquareMeters(totalSqm)}</p>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">Stima</span>
              <p className="text-xl font-bold text-[#B85C38]">{formatPrice(totalPrice)}</p>
            </div>
          </div>

          {/* Selected module indicator */}
          {selectedPresetId && (
            <div className="mt-2 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#2D5A47] text-white">
              <MousePointerClick className="w-4 h-4" />
              <span className="text-xs font-medium">
                Tocca la griglia per piazzare
              </span>
            </div>
          )}
        </div>
      )}

      {/* Half state - Horizontal scrolling modules */}
      {sheetState === 'half' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Category tabs */}
          <div className="flex px-2 gap-1 py-2 border-b border-gray-100">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === tab.id
                    ? 'bg-[#2D5A47] text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <tab.Icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Horizontal scroll modules */}
          <div className="flex-1 overflow-x-auto overflow-y-hidden px-4 py-3">
            <div className="flex gap-3 h-full">
              {filteredPresets.map((preset) => (
                <MobileModuleCard
                  key={preset.id}
                  preset={preset}
                  isSelected={selectedPresetId === preset.id}
                  onSelect={() => handleSelectModule(preset.id)}
                />
              ))}
            </div>
          </div>

          {/* Price summary */}
          <div className="flex-shrink-0 px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {moduleCount} moduli • {formatSquareMeters(totalSqm)}
              </span>
            </div>
            <span className="text-lg font-bold text-[#B85C38]">{formatPrice(totalPrice)}</span>
          </div>
        </div>
      )}

      {/* Full state - Complete list with actions */}
      {sheetState === 'full' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Action bar */}
          <div className="flex-shrink-0 px-4 py-3 border-b border-gray-100 flex justify-end">
            <ActionBar />
          </div>

          {/* Category tabs */}
          <div className="flex px-2 gap-1 py-2 border-b border-gray-100">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === tab.id
                    ? 'bg-[#2D5A47] text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <tab.Icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Vertical list */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
            {filteredPresets.map((preset) => (
              <FullModuleCard
                key={preset.id}
                preset={preset}
                isSelected={selectedPresetId === preset.id}
                onSelect={() => handleSelectModule(preset.id)}
              />
            ))}
          </div>

          {/* Price bar */}
          <div className="flex-shrink-0 px-4 py-4 bg-[#1D3D2D] text-white">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-white/70">{moduleCount} moduli • {formatSquareMeters(totalSqm)}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-white/70">Prezzo stimato</span>
                <p className="text-2xl font-bold">{formatPrice(totalPrice)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

// Compact card for horizontal scroll
function MobileModuleCard({
  preset,
  isSelected,
  onSelect,
}: {
  preset: ModulePreset
  isSelected: boolean
  onSelect: () => void
}) {
  const IconComponent = preset.iconName ? ICON_MAP[preset.iconName] : null
  const sqm = preset.cellsX * preset.cellsZ * GRID_CELL_SIZE * GRID_CELL_SIZE

  return (
    <button
      onClick={onSelect}
      className={`
        flex-shrink-0 w-36 p-3 rounded-xl border-2 transition-all touch-manipulation
        ${isSelected
          ? 'border-[#2D5A47] bg-[#2D5A47]/5'
          : 'border-gray-200 bg-white'
        }
      `}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
        style={{ backgroundColor: preset.color }}
      >
        {IconComponent ? (
          <IconComponent className="w-5 h-5 text-white" />
        ) : (
          <span className="text-lg">{preset.icon}</span>
        )}
      </div>

      {/* Name */}
      <h4 className={`font-medium text-sm truncate ${isSelected ? 'text-[#2D5A47]' : 'text-gray-900'}`}>
        {preset.name}
      </h4>

      {/* Stats */}
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-gray-500">{formatSquareMeters(sqm)}</span>
        <span className="text-xs font-semibold text-[#B85C38]">{formatPrice(preset.basePrice)}</span>
      </div>

      {/* Add indicator */}
      <div className={`mt-2 py-1.5 rounded-lg text-center text-xs font-medium ${
        isSelected
          ? 'bg-[#2D5A47] text-white'
          : 'bg-gray-100 text-gray-600'
      }`}>
        {isSelected ? 'Selezionato' : '+ Aggiungi'}
      </div>
    </button>
  )
}

// Full card for vertical list
function FullModuleCard({
  preset,
  isSelected,
  onSelect,
}: {
  preset: ModulePreset
  isSelected: boolean
  onSelect: () => void
}) {
  const IconComponent = preset.iconName ? ICON_MAP[preset.iconName] : null
  const sqm = preset.cellsX * preset.cellsZ * GRID_CELL_SIZE * GRID_CELL_SIZE

  return (
    <button
      onClick={onSelect}
      className={`
        w-full p-3 rounded-xl border-2 transition-all text-left touch-manipulation flex items-center gap-3
        ${isSelected
          ? 'border-[#2D5A47] bg-[#2D5A47]/5'
          : 'border-gray-200 bg-white'
        }
      `}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: preset.color }}
      >
        {IconComponent ? (
          <IconComponent className="w-6 h-6 text-white" />
        ) : (
          <span className="text-xl">{preset.icon}</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className={`font-medium truncate ${isSelected ? 'text-[#2D5A47]' : 'text-gray-900'}`}>
          {preset.name}
        </h4>
        <p className="text-xs text-gray-500 truncate">{preset.description}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">{preset.cellsX}x{preset.cellsZ}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">{formatSquareMeters(sqm)}</span>
        </div>
      </div>

      {/* Price & action */}
      <div className="text-right flex-shrink-0">
        <span className="text-sm font-semibold text-[#B85C38] block">{formatPrice(preset.basePrice)}</span>
        <span className={`text-xs ${isSelected ? 'text-[#2D5A47]' : 'text-gray-400'}`}>
          {isSelected ? 'Selezionato' : '+ Aggiungi'}
        </span>
      </div>
    </button>
  )
}
