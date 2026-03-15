'use client'

import { useConfiguratoreStore } from '@/lib/configuratore-v3/store'
import { getLayoutPresets } from '@/lib/configuratore-v3/configurations'

export default function LayoutPresetSelector() {
  const { modulo, activePresetId, setActivePresetId, setStanze, setSelectedRoomId } = useConfiguratoreStore()

  if (!modulo) return null

  const presets = getLayoutPresets(modulo.id)

  // Hide if no presets or only 1
  if (presets.length <= 1) return null

  function selectPreset(presetId: string) {
    const preset = presets.find(p => p.id === presetId)
    if (!preset) return

    setStanze(preset.stanze)
    setActivePresetId(presetId)
    setSelectedRoomId(null)
  }

  const isCustom = activePresetId === 'custom'

  return (
    <div className="w-full max-w-[680px]">
      <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-[#86868B]">
        Layout
      </p>
      <div className="flex gap-2.5 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-none">
        {presets.map((preset) => {
          const isActive = activePresetId === preset.id && !isCustom
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => selectPreset(preset.id)}
              className={`flex-shrink-0 snap-start rounded-xl border-2 px-4 py-3 text-left transition-all min-w-[140px] ${
                isActive
                  ? 'border-[#A0845C] bg-[#A0845C]/8 shadow-sm'
                  : 'border-[#E5E5E7] bg-white hover:border-[#A0845C]/40'
              }`}
            >
              <p className={`text-sm font-semibold ${isActive ? 'text-[#A0845C]' : 'text-[#1D1D1F]'}`}>
                {preset.label}
              </p>
              <p className="text-xs text-[#86868B] mt-0.5 line-clamp-2">
                {preset.description}
              </p>
            </button>
          )
        })}
        {isCustom && (
          <div className="flex-shrink-0 snap-start rounded-xl border-2 border-[#A0845C] bg-[#A0845C]/8 px-4 py-3 text-left min-w-[140px] shadow-sm">
            <p className="text-sm font-semibold text-[#A0845C]">Personalizzato</p>
            <p className="text-xs text-[#86868B] mt-0.5">Layout modificato</p>
          </div>
        )}
      </div>
    </div>
  )
}
