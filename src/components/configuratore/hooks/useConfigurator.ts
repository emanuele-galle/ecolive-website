import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import type { ConfiguratorState, PlacedModule, GridCell, ModuleCategory, InteractionState, StarterPreset } from '@/lib/configuratore/types'
import {
  DEFAULT_GRID_CELLS_X,
  DEFAULT_GRID_CELLS_Z,
  CELL_SQUARE_METERS,
  getModulePreset,
  STARTER_PRESETS,
} from '@/lib/configuratore/constants'

// Helper per creare Set delle celle occupate (O(1) lookup)
function createOccupiedCellsSet(placedModules: PlacedModule[], excludeInstanceId?: string): Set<string> {
  const set = new Set<string>()
  placedModules
    .filter((m) => m.instanceId !== excludeInstanceId)
    .forEach((module) => {
      const preset = getModulePreset(module.presetId)
      if (!preset) return
      const isRotated = module.rotation === 90 || module.rotation === 270
      const effectiveCellsX = isRotated ? preset.cellsZ : preset.cellsX
      const effectiveCellsZ = isRotated ? preset.cellsX : preset.cellsZ
      for (let dx = 0; dx < effectiveCellsX; dx++) {
        for (let dz = 0; dz < effectiveCellsZ; dz++) {
          set.add(`${module.gridX + dx},${module.gridZ + dz}`)
        }
      }
    })
  return set
}

// Stato iniziale per le interazioni
const initialInteractionState: InteractionState = {
  selectedPresetId: null,
  draggingInstanceId: null,
  previewPosition: null,
  isValidPosition: false,
}

export const useConfigurator = create<ConfiguratorState>()(
  persist(
    (set, get) => ({
      // Grid config
      gridCellsX: DEFAULT_GRID_CELLS_X,
      gridCellsZ: DEFAULT_GRID_CELLS_Z,

      // Placed modules
      placedModules: [],

      // Selection
      selectedModuleId: null,
      hoveredCell: null,

      // UI state
      activeCategory: 'all',
      isSidebarOpen: true,
      isMobileDrawerOpen: false,

      // View state
      resetViewTrigger: 0,

      // Interaction state (semplificato)
      interaction: initialInteractionState,

      // Actions
      addModule: (presetId: string, gridX: number, gridZ: number) => {
        const preset = getModulePreset(presetId)
        if (!preset) return

        const state = get()
        if (!state.canPlaceModule(presetId, gridX, gridZ)) return

        const newModule: PlacedModule = {
          instanceId: uuidv4(),
          presetId,
          gridX,
          gridZ,
          rotation: 0,
        }

        set((state) => ({
          placedModules: [...state.placedModules, newModule],
          selectedModuleId: newModule.instanceId,
        }))
      },

      removeModule: (instanceId: string) => {
        set((state) => ({
          placedModules: state.placedModules.filter((m) => m.instanceId !== instanceId),
          selectedModuleId:
            state.selectedModuleId === instanceId ? null : state.selectedModuleId,
        }))
      },

      moveModule: (instanceId: string, newGridX: number, newGridZ: number) => {
        const state = get()
        const module = state.placedModules.find((m) => m.instanceId === instanceId)
        if (!module) return

        if (!state.canPlaceModule(module.presetId, newGridX, newGridZ, instanceId)) return

        set((state) => ({
          placedModules: state.placedModules.map((m) =>
            m.instanceId === instanceId
              ? { ...m, gridX: newGridX, gridZ: newGridZ }
              : m
          ),
        }))
      },

      rotateModule: (instanceId: string) => {
        set((state) => ({
          placedModules: state.placedModules.map((m) =>
            m.instanceId === instanceId
              ? { ...m, rotation: ((m.rotation + 90) % 360) as 0 | 90 | 180 | 270 }
              : m
          ),
        }))
      },

      selectModule: (instanceId: string | null) => {
        set({ selectedModuleId: instanceId })
      },

      setHoveredCell: (cell: { x: number; z: number } | null) => {
        set({ hoveredCell: cell })
      },

      setActiveCategory: (category: ModuleCategory | 'all') => {
        set({ activeCategory: category })
      },

      toggleSidebar: () => {
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen }))
      },

      toggleMobileDrawer: () => {
        set((state) => ({ isMobileDrawerOpen: !state.isMobileDrawerOpen }))
      },

      clearAll: () => {
        set({
          placedModules: [],
          selectedModuleId: null,
        })
      },

      setGridSize: (cellsX: number, cellsZ: number) => {
        set({ gridCellsX: cellsX, gridCellsZ: cellsZ })
      },

      resetView: () => {
        set((state) => ({ resetViewTrigger: state.resetViewTrigger + 1 }))
      },

      hardReset: () => {
        // Clear localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('ecolive-configurator')
        }
        // Reset state to defaults
        set((state) => ({
          gridCellsX: DEFAULT_GRID_CELLS_X,
          gridCellsZ: DEFAULT_GRID_CELLS_Z,
          placedModules: [],
          selectedModuleId: null,
          resetViewTrigger: state.resetViewTrigger + 1,
        }))
      },

      // Interaction actions (nuovo sistema semplificato)
      setSelectedPreset: (presetId: string | null) => {
        set((state) => ({
          interaction: {
            ...state.interaction,
            selectedPresetId: presetId,
            // Reset preview quando si seleziona un nuovo preset
            previewPosition: null,
            isValidPosition: false,
          },
        }))
      },

      startDraggingModule: (instanceId: string) => {
        set((state) => ({
          interaction: {
            ...state.interaction,
            draggingInstanceId: instanceId,
            selectedPresetId: null, // Deseleziona preset quando si trascina un modulo
          },
        }))
      },

      stopDraggingModule: () => {
        set((state) => ({
          interaction: {
            ...state.interaction,
            draggingInstanceId: null,
            previewPosition: null,
            isValidPosition: false,
          },
        }))
      },

      updatePreviewPosition: (x: number, z: number, isValid: boolean) => {
        set((state) => ({
          interaction: {
            ...state.interaction,
            previewPosition: { x, z },
            isValidPosition: isValid,
          },
        }))
      },

      clearPreview: () => {
        set((state) => ({
          interaction: {
            ...state.interaction,
            previewPosition: null,
            isValidPosition: false,
          },
        }))
      },

      // Computed
      getOccupiedCells: () => {
        const state = get()
        const cells: GridCell[] = []

        state.placedModules.forEach((module) => {
          const preset = getModulePreset(module.presetId)
          if (!preset) return

          // Get effective dimensions based on rotation
          const isRotated = module.rotation === 90 || module.rotation === 270
          const effectiveCellsX = isRotated ? preset.cellsZ : preset.cellsX
          const effectiveCellsZ = isRotated ? preset.cellsX : preset.cellsZ

          for (let dx = 0; dx < effectiveCellsX; dx++) {
            for (let dz = 0; dz < effectiveCellsZ; dz++) {
              cells.push({
                x: module.gridX + dx,
                z: module.gridZ + dz,
                occupied: true,
                moduleInstanceId: module.instanceId,
              })
            }
          }
        })

        return cells
      },

      // Carica un preset starter
      loadPreset: (presetId: string) => {
        const preset = STARTER_PRESETS.find((p) => p.id === presetId)
        if (!preset) return

        // Pulisci la griglia
        set({ placedModules: [], selectedModuleId: null })

        // Se è "vuoto", non aggiungere moduli
        if (preset.modules.length === 0) return

        // Aggiungi i moduli del preset
        const newModules: PlacedModule[] = preset.modules.map((m) => ({
          instanceId: uuidv4(),
          presetId: m.presetId,
          gridX: m.gridX,
          gridZ: m.gridZ,
          rotation: 0,
        }))

        set({ placedModules: newModules })
      },

      // Ottimizzato con Set per O(1) lookup invece di O(n)
      canPlaceModule: (
        presetId: string,
        gridX: number,
        gridZ: number,
        excludeInstanceId?: string
      ) => {
        const state = get()
        const preset = getModulePreset(presetId)
        if (!preset) return false

        // Check grid bounds
        if (
          gridX < 0 ||
          gridZ < 0 ||
          gridX + preset.cellsX > state.gridCellsX ||
          gridZ + preset.cellsZ > state.gridCellsZ
        ) {
          return false
        }

        // Get occupied cells as Set (O(1) lookup)
        const occupiedSet = createOccupiedCellsSet(state.placedModules, excludeInstanceId)

        // Check if any cell of the new module would overlap
        for (let dx = 0; dx < preset.cellsX; dx++) {
          for (let dz = 0; dz < preset.cellsZ; dz++) {
            const cellKey = `${gridX + dx},${gridZ + dz}`
            if (occupiedSet.has(cellKey)) {
              return false
            }
          }
        }

        return true
      },

      getTotalSquareMeters: () => {
        const state = get()
        return state.placedModules.reduce((total, module) => {
          const preset = getModulePreset(module.presetId)
          if (!preset) return total
          return total + preset.cellsX * preset.cellsZ * CELL_SQUARE_METERS
        }, 0)
      },

      getTotalPrice: () => {
        const state = get()
        return state.placedModules.reduce((total, module) => {
          const preset = getModulePreset(module.presetId)
          if (!preset) return total
          return total + preset.basePrice
        }, 0)
      },

      getModuleCount: () => {
        return get().placedModules.length
      },
    }),
    {
      name: 'ecolive-configurator',
      partialize: (state) => ({
        gridCellsX: state.gridCellsX,
        gridCellsZ: state.gridCellsZ,
        placedModules: state.placedModules,
      }),
      onRehydrateStorage: () => (state) => {
        // Validate loaded data - fix corrupted values
        if (state) {
          if (!state.gridCellsX || state.gridCellsX <= 0 || isNaN(state.gridCellsX)) {
            state.gridCellsX = DEFAULT_GRID_CELLS_X
          }
          if (!state.gridCellsZ || state.gridCellsZ <= 0 || isNaN(state.gridCellsZ)) {
            state.gridCellsZ = DEFAULT_GRID_CELLS_Z
          }
          if (!Array.isArray(state.placedModules)) {
            state.placedModules = []
          }
        }
      },
    }
  )
)
