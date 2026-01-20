'use client'

import { useMemo } from 'react'
import { useConfigurator } from '../hooks/useConfigurator'
import { getModulePreset } from '@/lib/configuratore/constants'
import DraggableModule from './DraggableModule'

interface ModuleRendererProps {
  offsetX: number
  offsetZ: number
}

export default function ModuleRenderer({ offsetX, offsetZ }: ModuleRendererProps) {
  const placedModules = useConfigurator((state) => state.placedModules)

  const modulesWithPresets = useMemo(() => {
    return placedModules
      .map((module) => {
        const preset = getModulePreset(module.presetId)
        if (!preset) return null
        return { module, preset }
      })
      .filter(Boolean) as Array<{
      module: (typeof placedModules)[0]
      preset: NonNullable<ReturnType<typeof getModulePreset>>
    }>
  }, [placedModules])

  return (
    <group>
      {modulesWithPresets.map(({ module, preset }) => (
        <DraggableModule
          key={module.instanceId}
          module={module}
          preset={preset}
          offsetX={offsetX}
          offsetZ={offsetZ}
        />
      ))}
    </group>
  )
}
