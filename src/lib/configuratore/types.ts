// Configuratore 3D - TypeScript Types

export type ModuleCategory = 'living' | 'private' | 'service'

// Stato semplificato per interazioni
export interface InteractionState {
  // Preset selezionato dalla sidebar, pronto per essere piazzato
  selectedPresetId: string | null
  // Modulo che si sta trascinando sulla griglia
  draggingInstanceId: string | null
  // Posizione preview durante hover/drag
  previewPosition: { x: number; z: number } | null
  // Se la posizione preview è valida
  isValidPosition: boolean
}

// Icone disponibili per i moduli (Lucide React)
export type ModuleIconName =
  | 'home'
  | 'sofa'
  | 'cooking-pot'
  | 'bed-double'
  | 'bed-single'
  | 'briefcase'
  | 'shirt'
  | 'shower-head'

export interface ModulePreset {
  id: string
  name: string
  description: string
  cellsX: number // larghezza in celle (1 cella = 4.35m)
  cellsZ: number // profondità in celle
  color: string
  category: ModuleCategory
  basePrice: number // prezzo base in euro
  icon?: string // emoji legacy
  iconName?: ModuleIconName // nuova icona Lucide
}

// Preset starter per configurazioni pre-impostate
export interface StarterPresetModule {
  presetId: string
  gridX: number
  gridZ: number
}

export interface StarterPreset {
  id: string
  name: string
  description: string
  sqm: number // metri quadri approssimativi
  modules: StarterPresetModule[]
}

export interface PlacedModule {
  instanceId: string
  presetId: string
  gridX: number // posizione X in celle (0-indexed)
  gridZ: number // posizione Z in celle (0-indexed)
  rotation: 0 | 90 | 180 | 270 // rotazione in gradi
}

export interface GridCell {
  x: number
  z: number
  occupied: boolean
  moduleInstanceId?: string
}

export interface ConfiguratorState {
  // Grid config
  gridCellsX: number
  gridCellsZ: number

  // Placed modules
  placedModules: PlacedModule[]

  // Selection
  selectedModuleId: string | null
  hoveredCell: { x: number; z: number } | null

  // UI state
  activeCategory: ModuleCategory | 'all'
  isSidebarOpen: boolean
  isMobileDrawerOpen: boolean

  // View state
  resetViewTrigger: number

  // Interaction state (semplificato)
  interaction: InteractionState

  // Actions
  addModule: (presetId: string, gridX: number, gridZ: number) => void
  removeModule: (instanceId: string) => void
  moveModule: (instanceId: string, newGridX: number, newGridZ: number) => void
  rotateModule: (instanceId: string) => void
  selectModule: (instanceId: string | null) => void
  setHoveredCell: (cell: { x: number; z: number } | null) => void
  setActiveCategory: (category: ModuleCategory | 'all') => void
  toggleSidebar: () => void
  toggleMobileDrawer: () => void
  clearAll: () => void
  setGridSize: (cellsX: number, cellsZ: number) => void
  resetView: () => void
  hardReset: () => void

  // Interaction actions (nuovo sistema semplificato)
  setSelectedPreset: (presetId: string | null) => void
  startDraggingModule: (instanceId: string) => void
  stopDraggingModule: () => void
  updatePreviewPosition: (x: number, z: number, isValid: boolean) => void
  clearPreview: () => void

  // Preset starter
  loadPreset: (presetId: string) => void

  // Computed
  getOccupiedCells: () => GridCell[]
  canPlaceModule: (presetId: string, gridX: number, gridZ: number, excludeInstanceId?: string) => boolean
  getTotalSquareMeters: () => number
  getTotalPrice: () => number
  getModuleCount: () => number
}

export interface ExportedConfig {
  version: string
  timestamp: string
  gridSize: {
    cellsX: number
    cellsZ: number
  }
  modules: Array<{
    preset: ModulePreset
    position: {
      gridX: number
      gridZ: number
    }
    rotation: number
  }>
  summary: {
    totalSquareMeters: number
    totalPrice: number
    moduleCount: number
  }
}

// 3D Scene types
export interface SceneProps {
  onCellClick?: (x: number, z: number) => void
  onModuleClick?: (instanceId: string) => void
}

export interface DraggableModuleProps {
  module: PlacedModule
  preset: ModulePreset
  isSelected: boolean
  onSelect: () => void
  onMove: (newX: number, newZ: number) => void
  gridCellsX: number
  gridCellsZ: number
  offsetX: number
  offsetZ: number
}
