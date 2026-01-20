'use client'

import { useCallback } from 'react'
import { useConfigurator } from './useConfigurator'
import { getModulePreset, GRID_CELL_SIZE } from '@/lib/configuratore/constants'
import type { ExportedConfig } from '@/lib/configuratore/types'

export function useExportConfig() {
  const placedModules = useConfigurator((state) => state.placedModules)
  const gridCellsX = useConfigurator((state) => state.gridCellsX)
  const gridCellsZ = useConfigurator((state) => state.gridCellsZ)
  const getTotalSquareMeters = useConfigurator((state) => state.getTotalSquareMeters)
  const getTotalPrice = useConfigurator((state) => state.getTotalPrice)
  const getModuleCount = useConfigurator((state) => state.getModuleCount)

  const generateConfig = useCallback((): ExportedConfig => {
    const modules = placedModules
      .map((module) => {
        const preset = getModulePreset(module.presetId)
        if (!preset) return null
        return {
          preset,
          position: {
            gridX: module.gridX,
            gridZ: module.gridZ,
          },
          rotation: module.rotation,
        }
      })
      .filter(Boolean) as ExportedConfig['modules']

    return {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      gridSize: {
        cellsX: gridCellsX,
        cellsZ: gridCellsZ,
      },
      modules,
      summary: {
        totalSquareMeters: getTotalSquareMeters(),
        totalPrice: getTotalPrice(),
        moduleCount: getModuleCount(),
      },
    }
  }, [placedModules, gridCellsX, gridCellsZ, getTotalSquareMeters, getTotalPrice, getModuleCount])

  const exportJSON = useCallback(() => {
    const config = generateConfig()
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ecolive-configurazione-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [generateConfig])

  const exportScreenshot = useCallback(() => {
    // Find the canvas element
    const canvas = document.querySelector('canvas')
    if (!canvas) {
      console.error('Canvas not found')
      return
    }

    // Create a temporary link to download the image
    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = `ecolive-configurazione-${new Date().toISOString().split('T')[0]}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  const generateSummaryText = useCallback((): string => {
    const config = generateConfig()
    const lines = [
      '=== CONFIGURAZIONE ECOLIVE ===',
      '',
      `Data: ${new Date().toLocaleDateString('it-IT')}`,
      `Griglia: ${config.gridSize.cellsX}x${config.gridSize.cellsZ} celle (${(config.gridSize.cellsX * config.gridSize.cellsZ * GRID_CELL_SIZE * GRID_CELL_SIZE).toFixed(0)} m² max)`,
      '',
      '--- MODULI ---',
      ...config.modules.map(
        (m) =>
          `• ${m.preset.name} - ${(m.preset.cellsX * m.preset.cellsZ * GRID_CELL_SIZE * GRID_CELL_SIZE).toFixed(0)} m²`
      ),
      '',
      '--- RIEPILOGO ---',
      `Superficie totale: ${config.summary.totalSquareMeters.toFixed(1)} m²`,
      `Numero stanze: ${config.summary.moduleCount}`,
      `Prezzo stimato: €${config.summary.totalPrice.toLocaleString('it-IT')}`,
      '',
      '*Stima indicativa. Contattaci per un preventivo dettagliato.',
      '',
      'https://ecolive.srl',
    ]

    return lines.join('\n')
  }, [generateConfig])

  const copyToClipboard = useCallback(async () => {
    const text = generateSummaryText()
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
      return false
    }
  }, [generateSummaryText])

  return {
    generateConfig,
    exportJSON,
    exportScreenshot,
    generateSummaryText,
    copyToClipboard,
  }
}
