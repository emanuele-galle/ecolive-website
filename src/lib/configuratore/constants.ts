// Configuratore 3D - Constants

import type { ModulePreset, StarterPreset } from './types'

// Grid configuration
// Sistema X-Frame Ecolive: pilastri ogni 4.35m
export const GRID_CELL_SIZE = 4.35 // metri
export const CELL_SQUARE_METERS = GRID_CELL_SIZE * GRID_CELL_SIZE // ~18.92 mq

// Default grid size (3 celle x 5 celle = ~284 mq max)
export const DEFAULT_GRID_CELLS_X = 3
export const DEFAULT_GRID_CELLS_Z = 5

// 3D Scene constants
export const PILLAR_RADIUS = 0.15 // raggio pilastro in metri
export const PILLAR_HEIGHT = 3.0 // altezza pilastro in metri
export const FLOOR_THICKNESS = 0.1 // spessore piano in metri
export const MODULE_HEIGHT = 2.8 // altezza modulo in metri
export const MODULE_INSET = 0.1 // margine interno modulo per vedere la griglia

// Colors - Palette Premium
export const COLORS = {
  // Base colors
  grid: '#E8E4E0',
  gridLines: '#D4CFC9',
  pillar: '#6B6560',
  floor: '#F5F3F0',
  selected: '#C4704B', // terracotta
  hover: 'rgba(196, 112, 75, 0.3)',

  // Premium palette
  forest: '#1D3D2D',      // Header, CTA
  terracotta: '#B85C38',  // Accent, selezione
  stone100: '#FAF9F7',    // Background
  stone200: '#F0EDE8',    // Card bg
  stone300: '#E0DDD6',    // Bordi

  // Category colors
  living: '#2D5A47', // forest green
  private: '#8B7355', // warm brown
  service: '#5A9CAD', // blue-grey
} as const

// Price per square meter (base)
export const PRICE_PER_SQM = 1800 // euro/mq (stima media)

// Module Presets - Dimensioni conformi ai minimi di legge (DM 5/7/1975)
// Ogni cella = 4.35m x 4.35m = ~18.9 m² (supera tutti i minimi di legge)
export const MODULE_PRESETS: ModulePreset[] = [
  // ZONA GIORNO (living)
  {
    id: 'zona-giorno-open',
    name: 'Zona Giorno Open',
    description: 'Cucina + living + pranzo (~76 m²)',
    cellsX: 2,
    cellsZ: 2,
    color: '#2D5A47',
    category: 'living',
    basePrice: 55000,
    icon: '🏠',
    iconName: 'home',
  },
  {
    id: 'soggiorno',
    name: 'Soggiorno',
    description: 'Living separato (~38 m²)',
    cellsX: 1,
    cellsZ: 2,
    color: '#3D6B57',
    category: 'living',
    basePrice: 32000,
    icon: '🛋️',
    iconName: 'sofa',
  },
  {
    id: 'cucina',
    name: 'Cucina',
    description: 'Cucina abitabile (~19 m²)',
    cellsX: 1,
    cellsZ: 1,
    color: '#C4704B',
    category: 'living',
    basePrice: 25000,
    icon: '🍳',
    iconName: 'cooking-pot',
  },

  // ZONA NOTTE (private)
  {
    id: 'camera-matrimoniale',
    name: 'Camera Matrimoniale',
    description: 'Camera principale (~38 m², min legge 14 m²)',
    cellsX: 1,
    cellsZ: 2,
    color: '#8B7355',
    category: 'private',
    basePrice: 35000,
    icon: '🛏️',
    iconName: 'bed-double',
  },
  {
    id: 'camera-singola',
    name: 'Camera Singola',
    description: 'Camera singola (~19 m², min legge 9 m²)',
    cellsX: 1,
    cellsZ: 1,
    color: '#A68B6A',
    category: 'private',
    basePrice: 22000,
    icon: '🛏️',
    iconName: 'bed-single',
  },
  {
    id: 'studio',
    name: 'Studio',
    description: 'Home office (~19 m²)',
    cellsX: 1,
    cellsZ: 1,
    color: '#6B6560',
    category: 'private',
    basePrice: 20000,
    icon: '💼',
    iconName: 'briefcase',
  },
  {
    id: 'cabina-armadio',
    name: 'Cabina Armadio',
    description: 'Walk-in closet (~19 m²)',
    cellsX: 1,
    cellsZ: 1,
    color: '#9B8B7A',
    category: 'private',
    basePrice: 12000,
    icon: '👔',
    iconName: 'shirt',
  },

  // SERVIZI (service)
  {
    id: 'bagno',
    name: 'Bagno',
    description: 'Bagno completo (~19 m², min legge 3 m²)',
    cellsX: 1,
    cellsZ: 1,
    color: '#5A9CAD',
    category: 'service',
    basePrice: 18000,
    icon: '🚿',
    iconName: 'shower-head',
  },
]

// Starter Presets - Configurazioni pre-impostate
export const STARTER_PRESETS: StarterPreset[] = [
  {
    id: 'casa-2-camere',
    name: 'Casa 2 Camere',
    description: 'Soggiorno, cucina, 2 camere, bagno',
    sqm: 95,
    modules: [
      { presetId: 'zona-giorno-open', gridX: 0, gridZ: 0 },
      { presetId: 'camera-matrimoniale', gridX: 2, gridZ: 0 },
      { presetId: 'camera-singola', gridX: 2, gridZ: 2 },
      { presetId: 'bagno', gridX: 0, gridZ: 2 },
    ],
  },
  {
    id: 'villa-open',
    name: 'Villa Open Space',
    description: 'Grande living, master suite, studio',
    sqm: 130,
    modules: [
      { presetId: 'zona-giorno-open', gridX: 0, gridZ: 0 },
      { presetId: 'camera-matrimoniale', gridX: 2, gridZ: 0 },
      { presetId: 'cabina-armadio', gridX: 2, gridZ: 2 },
      { presetId: 'bagno', gridX: 0, gridZ: 2 },
      { presetId: 'studio', gridX: 1, gridZ: 2 },
    ],
  },
  {
    id: 'vuoto',
    name: 'Inizia da Zero',
    description: 'Griglia vuota per creare liberamente',
    sqm: 0,
    modules: [],
  },
]

// Helper function to get preset by ID
export function getModulePreset(id: string): ModulePreset | undefined {
  return MODULE_PRESETS.find((preset) => preset.id === id)
}

// Get presets by category
export function getPresetsByCategory(category: 'all' | 'living' | 'private' | 'service'): ModulePreset[] {
  if (category === 'all') return MODULE_PRESETS
  return MODULE_PRESETS.filter((preset) => preset.category === category)
}

// Calculate square meters for a preset
export function getPresetSquareMeters(preset: ModulePreset): number {
  return preset.cellsX * preset.cellsZ * CELL_SQUARE_METERS
}

// Format price
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price)
}

// Format square meters
export function formatSquareMeters(sqm: number): string {
  return `${sqm.toFixed(1)} m²`
}

// Get starter preset by ID
export function getStarterPreset(id: string): StarterPreset | undefined {
  return STARTER_PRESETS.find((preset) => preset.id === id)
}
