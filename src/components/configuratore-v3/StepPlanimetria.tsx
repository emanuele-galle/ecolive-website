'use client'

import { motion } from 'framer-motion'
import { Home, Bath, UtensilsCrossed, Bed, BookOpen, Archive, DoorOpen } from 'lucide-react'
import { useConfiguratoreStore } from '@/lib/configuratore-v3/store'
import type { TipoTetto, TipoStanza } from '@/lib/configuratore-v3/types'
import FloorPlanGrid from './planimetria/FloorPlanGrid'
import RoomEditPanel from './planimetria/RoomEditPanel'
import LayoutPresetSelector from './planimetria/LayoutPresetSelector'

const roomIcons: Record<TipoStanza, typeof Home> = {
  soggiorno: Home,
  cucina: UtensilsCrossed,
  camera: Bed,
  bagno: Bath,
  studio: BookOpen,
  ripostiglio: Archive,
  ingresso: DoorOpen,
}

const borderStanza: Record<TipoStanza, string> = {
  soggiorno: '#A0845C',
  cucina: '#6B8F71',
  camera: '#48484A',
  bagno: '#4A90D9',
  studio: '#9B59B6',
  ripostiglio: '#95A5A6',
  ingresso: '#E67E22',
}

const roomLabels: Record<string, { singular: string; plural: string }> = {
  camera: { singular: 'camera', plural: 'camere' },
  bagno: { singular: 'bagno', plural: 'bagni' },
  soggiorno: { singular: 'soggiorno', plural: 'soggiorni' },
  cucina: { singular: 'cucina', plural: 'cucine' },
  studio: { singular: 'studio', plural: 'studi' },
  ripostiglio: { singular: 'ripostiglio', plural: 'ripostigli' },
  ingresso: { singular: 'ingresso', plural: 'ingressi' },
}

const tettoOptions: { id: TipoTetto; label: string }[] = [
  { id: 'piano', label: 'Piano' },
  { id: 'una-falda', label: 'Una Falda' },
  { id: 'due-falde', label: 'Due Falde' },
]

export default function StepPlanimetria() {
  const { modulo, stanze, tetto, setTetto, nextStep } = useConfiguratoreStore()

  if (!modulo) return null

  const roomCounts = stanze.reduce<Record<string, number>>((acc, s) => {
    acc[s.tipo] = (acc[s.tipo] || 0) + 1
    return acc
  }, {})

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-6"
    >
      {/* Info note */}
      <div className="max-w-lg rounded-xl border border-[#A0845C]/20 bg-[#A0845C]/5 px-5 py-4 text-center">
        <p className="text-sm font-medium leading-relaxed text-[#48484A]">
          Personalizza il layout — puoi aggiungere, rimuovere e modificare le stanze.
          La distribuzione definitiva verr&agrave; perfezionata con i nostri progettisti.
        </p>
      </div>

      {/* Layout preset selector */}
      <LayoutPresetSelector />

      {/* Floor plan grid */}
      <FloorPlanGrid />

      {/* Room edit panel */}
      <RoomEditPanel />

      {/* Room summary chips */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {Object.entries(roomCounts).map(([tipo, count]) => {
          const Icon = roomIcons[tipo as TipoStanza] ?? Home
          const labels = roomLabels[tipo]
          const label = labels ? (count === 1 ? labels.singular : labels.plural) : tipo
          return (
            <span
              key={tipo}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
              style={{
                backgroundColor: `${borderStanza[tipo as TipoStanza] ?? '#86868B'}15`,
                color: borderStanza[tipo as TipoStanza] ?? '#48484A',
              }}
            >
              <Icon className="h-4 w-4" />
              {count} {label}
            </span>
          )
        })}
        <span className="rounded-full bg-[#1D1D1F]/5 px-4 py-2 text-sm font-bold text-[#1D1D1F]">
          {modulo.mq} m&sup2; totali
        </span>
      </div>

      {/* Tetto selector */}
      <div className="w-full max-w-md">
        <p className="mb-3 text-center text-sm font-semibold text-[#1D1D1F]">Tipo di tetto</p>
        <div className="flex gap-3">
          {tettoOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setTetto(opt.id)}
              className={`flex-1 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors ${
                tetto === opt.id
                  ? 'border-[#A0845C] bg-[#A0845C]/10 text-[#A0845C]'
                  : 'border-[#E5E5E7] bg-white text-[#48484A] hover:border-[#A0845C]/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Avanti */}
      <button
        onClick={nextStep}
        className="rounded-full bg-[#A0845C] px-10 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#8B7049] hover:shadow-lg"
      >
        Avanti
      </button>
    </motion.div>
  )
}
