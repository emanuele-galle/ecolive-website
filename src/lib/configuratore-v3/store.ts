import { create } from 'zustand'
import type { ConfigStep, TipologiaId, FinituraLevel, TipoTetto, Stanza, ContattoLead, ModuloDimensionale } from './types'
import { getDefaultStanze } from './configurations'

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
  contatto: null as ContattoLead | null,
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
  }),

  setModulo: (modulo) => set({
    modulo,
    stanze: getDefaultStanze(modulo.id),
  }),

  setFinitura: (finitura) => set({ finitura }),

  setStanze: (stanze) => set({ stanze }),

  setTetto: (tetto) => set({ tetto }),

  setContatto: (contatto) => set({ contatto }),

  reset: () => set(initialState),
}))
