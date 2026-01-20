// Types for Configuratore V2 - Scelta Guidata

export type HouseType = '1-piano' | '2-piani'
export type RoomCount = 2 | 3 | 4 | 5

export interface RoomConfiguration {
  rooms: RoomCount
  sqm: number
  composition: string
  details?: {
    pianoTerra?: string
    piano1?: string
  }
}

export interface HouseConfiguration {
  type: HouseType
  label: string
  description: string
  minSqm: number
  heroImage: string
  configurations: RoomConfiguration[]
}

export interface ConfiguratorState {
  // Current step
  step: 'select-house' | 'select-rooms' | 'form'

  // Selected configuration
  selectedHouse: HouseType | null
  selectedRooms: RoomCount | null

  // Derived data
  selectedConfig: RoomConfiguration | null

  // UI state
  hoveredHouse: HouseType | null

  // Actions
  setStep: (step: ConfiguratorState['step']) => void
  selectHouse: (type: HouseType) => void
  selectRooms: (rooms: RoomCount) => void
  setHoveredHouse: (type: HouseType | null) => void
  reset: () => void
  goBack: () => void
}

export interface QuoteFormData {
  nome: string
  email: string
  telefono?: string
  messaggio?: string
  privacy: boolean
  // Config data
  tipoCasa: HouseType
  numStanze: RoomCount
  metratura: number
}

export interface SubmitQuoteResult {
  success: boolean
  message: string
}
