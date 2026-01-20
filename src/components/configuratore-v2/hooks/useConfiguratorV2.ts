import { create } from 'zustand'
import type { ConfiguratorState, HouseType, RoomCount, RoomConfiguration } from '@/lib/configuratore-v2/types'
import { getConfiguration } from '@/lib/configuratore-v2/configurations'

export const useConfiguratorV2 = create<ConfiguratorState>((set, get) => ({
  // Initial state
  step: 'select-house',
  selectedHouse: null,
  selectedRooms: null,
  selectedConfig: null,
  hoveredHouse: null,

  // Actions
  setStep: (step) => set({ step }),

  selectHouse: (type: HouseType) => {
    set({
      selectedHouse: type,
      selectedRooms: null,
      selectedConfig: null,
      step: 'select-rooms',
    })
  },

  selectRooms: (rooms: RoomCount) => {
    const { selectedHouse } = get()
    if (!selectedHouse) return

    const config = getConfiguration(selectedHouse, rooms)
    set({
      selectedRooms: rooms,
      selectedConfig: config,
      step: 'form',
    })
  },

  setHoveredHouse: (type) => set({ hoveredHouse: type }),

  reset: () =>
    set({
      step: 'select-house',
      selectedHouse: null,
      selectedRooms: null,
      selectedConfig: null,
      hoveredHouse: null,
    }),

  goBack: () => {
    const { step } = get()
    if (step === 'select-rooms') {
      set({
        step: 'select-house',
        selectedHouse: null,
        selectedRooms: null,
        selectedConfig: null,
      })
    } else if (step === 'form') {
      set({
        step: 'select-rooms',
        selectedRooms: null,
        selectedConfig: null,
      })
    }
  },
}))
