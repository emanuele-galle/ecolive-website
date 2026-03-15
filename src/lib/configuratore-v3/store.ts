import { create } from 'zustand'
import type { ConfigStep, TipologiaId, FinituraLevel, TipoTetto, Stanza, TipoStanza, ContattoLead, ModuloDimensionale } from './types'
import { getDefaultStanze, findAvailablePosition, defaultRoomSizes } from './configurations'

interface ConfiguratoreState {
  // Navigation
  currentStep: ConfigStep
  setStep: (step: ConfigStep) => void
  nextStep: () => void
  prevStep: () => void

  // Step 1: Tipologia
  tipologia: TipologiaId | null
  setTipologia: (t: TipologiaId) => void

  // Step 2: Dimensione
  modulo: ModuloDimensionale | null
  setModulo: (m: ModuloDimensionale) => void

  // Step 3: Finitura
  finitura: FinituraLevel | null
  setFinitura: (f: FinituraLevel) => void

  // Step 4: Planimetria
  stanze: Stanza[]
  setStanze: (s: Stanza[]) => void
  tetto: TipoTetto
  setTetto: (t: TipoTetto) => void
  selectedRoomId: string | null
  setSelectedRoomId: (id: string | null) => void
  activePresetId: string | null
  setActivePresetId: (id: string | null) => void
  addRoom: (tipo: TipoStanza) => boolean
  removeRoom: (id: string) => void
  updateRoom: (id: string, updates: Partial<Pick<Stanza, 'tipo' | 'label'>>) => void

  // Step 5: Contatto
  contatto: ContattoLead | null
  setContatto: (c: ContattoLead) => void

  // Reset
  reset: () => void
}

const initialState = {
  currentStep: 1 as ConfigStep,
  tipologia: null as TipologiaId | null,
  modulo: null as ModuloDimensionale | null,
  finitura: null as FinituraLevel | null,
  stanze: [] as Stanza[],
  tetto: 'due-falde' as TipoTetto,
  selectedRoomId: null as string | null,
  activePresetId: null as string | null,
  contatto: null as ContattoLead | null,
}

const defaultLabels: Record<TipoStanza, string> = {
  soggiorno: 'Soggiorno',
  cucina: 'Cucina',
  camera: 'Camera',
  bagno: 'Bagno',
  studio: 'Studio',
  ripostiglio: 'Ripostiglio',
  ingresso: 'Ingresso',
}

export const useConfiguratoreStore = create<ConfiguratoreState>((set, get) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const { currentStep } = get()
    if (currentStep < 5) set({ currentStep: (currentStep + 1) as ConfigStep })
  },

  prevStep: () => {
    const { currentStep } = get()
    if (currentStep > 1) set({ currentStep: (currentStep - 1) as ConfigStep })
  },

  setTipologia: (tipologia) => set({
    tipologia,
    modulo: null,
    finitura: null,
    stanze: [],
    selectedRoomId: null,
    activePresetId: null,
  }),

  setModulo: (modulo) => set({
    modulo,
    stanze: getDefaultStanze(modulo.id),
    selectedRoomId: null,
    activePresetId: 'default',
  }),

  setFinitura: (finitura) => set({ finitura }),

  setStanze: (stanze) => set({ stanze }),

  setTetto: (tetto) => set({ tetto }),

  selectedRoomId: null,
  setSelectedRoomId: (id) => set({ selectedRoomId: id }),

  activePresetId: null,
  setActivePresetId: (id) => set({ activePresetId: id }),

  addRoom: (tipo) => {
    const { stanze, modulo } = get()
    if (!modulo) return false

    const gridW = modulo.larghezza
    const gridH = modulo.profondita
    const size = defaultRoomSizes[tipo]
    const pos = findAvailablePosition(stanze, gridW, gridH, size.w, size.h)

    if (!pos) return false

    const count = stanze.filter(s => s.tipo === tipo).length
    const label = count > 0 ? `${defaultLabels[tipo]} ${count + 1}` : defaultLabels[tipo]

    const newRoom: Stanza = {
      id: `s${Date.now()}`,
      tipo,
      label,
      x: pos.x,
      y: pos.y,
      w: size.w,
      h: size.h,
    }

    set({
      stanze: [...stanze, newRoom],
      selectedRoomId: newRoom.id,
      activePresetId: 'custom',
    })
    return true
  },

  removeRoom: (id) => {
    const { stanze, selectedRoomId } = get()
    set({
      stanze: stanze.filter(s => s.id !== id),
      selectedRoomId: selectedRoomId === id ? null : selectedRoomId,
      activePresetId: 'custom',
    })
  },

  updateRoom: (id, updates) => {
    const { stanze } = get()
    set({
      stanze: stanze.map(s => s.id === id ? { ...s, ...updates } : s),
      activePresetId: 'custom',
    })
  },

  setContatto: (contatto) => set({ contatto }),

  reset: () => set(initialState),
}))
