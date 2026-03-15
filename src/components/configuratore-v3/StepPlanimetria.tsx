'use client'

import { motion } from 'framer-motion'
import { Home, Bath, UtensilsCrossed, Bed, BookOpen, Archive, DoorOpen } from 'lucide-react'
import { useConfiguratoreStore } from '@/lib/configuratore-v3/store'
import type { TipoTetto, Stanza } from '@/lib/configuratore-v3/types'

const coloriStanza: Record<Stanza['tipo'], string> = {
  soggiorno: 'rgba(160, 132, 92, 0.20)',
  cucina: 'rgba(107, 143, 113, 0.20)',
  camera: 'rgba(72, 72, 74, 0.15)',
  bagno: 'rgba(74, 144, 217, 0.20)',
  studio: 'rgba(155, 89, 182, 0.20)',
  ripostiglio: 'rgba(149, 165, 166, 0.20)',
  ingresso: 'rgba(230, 126, 34, 0.20)',
}

const borderStanza: Record<Stanza['tipo'], string> = {
  soggiorno: '#A0845C',
  cucina: '#6B8F71',
  camera: '#48484A',
  bagno: '#4A90D9',
  studio: '#9B59B6',
  ripostiglio: '#95A5A6',
  ingresso: '#E67E22',
}

const roomIcons: Record<Stanza['tipo'], typeof Home> = {
  soggiorno: Home,
  cucina: UtensilsCrossed,
  camera: Bed,
  bagno: Bath,
  studio: BookOpen,
  ripostiglio: Archive,
  ingresso: DoorOpen,
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

  const gridW = modulo.larghezza
  const gridH = modulo.profondita

  // Adaptive cell size: fit within max 600px width and 500px height
  const adaptiveCellSize = Math.min(
    Math.floor(600 / Math.max(gridW, 1)),
    Math.floor(500 / Math.max(gridH, 1)),
    56
  )
  const CELL_SIZE = Math.max(adaptiveCellSize, 28)

  // Count rooms by type
  const roomCounts = stanze.reduce<Record<string, number>>((acc, s) => {
    acc[s.tipo] = (acc[s.tipo] || 0) + 1
    return acc
  }, {})

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-8"
    >
      {/* Note — moved higher for visibility */}
      <div className="max-w-lg rounded-xl border border-[#A0845C]/20 bg-[#A0845C]/5 px-5 py-4 text-center">
        <p className="text-sm font-medium leading-relaxed text-[#48484A]">
          Layout suggerito &mdash; la distribuzione degli ambienti verr&agrave; personalizzata insieme ai nostri progettisti durante la visita in sede.
        </p>
      </div>

      {/* Floor plan container */}
      <div className="w-full max-w-[680px] rounded-2xl border border-[#E5E5E7] bg-white shadow-sm overflow-hidden">
        <div className="bg-[#F5F5F7] px-6 py-3 border-b border-[#E5E5E7]">
          <p className="text-sm font-semibold text-[#1D1D1F]">
            Layout indicativo &mdash; {modulo.label} ({modulo.mq} m&sup2;)
          </p>
          <p className="text-xs text-[#86868B]">Piano terra</p>
        </div>
        <div className="p-6 flex justify-center">
          <div
            className="relative border border-[#D1D1D6] bg-[#FAFAFA]"
            style={{ width: gridW * CELL_SIZE, height: gridH * CELL_SIZE }}
          >
            {/* Grid lines */}
            {Array.from({ length: gridW + 1 }).map((_, i) => (
              <div
                key={`vl-${i}`}
                className="absolute top-0 bottom-0 border-l border-[#E5E5E7]/50"
                style={{ left: i * CELL_SIZE }}
              />
            ))}
            {Array.from({ length: gridH + 1 }).map((_, i) => (
              <div
                key={`hl-${i}`}
                className="absolute left-0 right-0 border-t border-[#E5E5E7]/50"
                style={{ top: i * CELL_SIZE }}
              />
            ))}

            {/* Stanze */}
            {stanze.map((s) => (
              <div
                key={s.id}
                className="absolute flex items-center justify-center rounded-md border-2 text-center overflow-hidden"
                style={{
                  left: s.x * CELL_SIZE + 1,
                  top: s.y * CELL_SIZE + 1,
                  width: s.w * CELL_SIZE - 2,
                  height: s.h * CELL_SIZE - 2,
                  backgroundColor: coloriStanza[s.tipo],
                  borderColor: borderStanza[s.tipo],
                }}
              >
                <span
                  className="text-xs font-semibold leading-tight break-words px-1"
                  style={{ color: borderStanza[s.tipo] }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Room summary chips — larger with icons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {Object.entries(roomCounts).map(([tipo, count]) => {
          const Icon = roomIcons[tipo as Stanza['tipo']] ?? Home
          const labels = roomLabels[tipo]
          const label = labels ? (count === 1 ? labels.singular : labels.plural) : tipo
          return (
            <span
              key={tipo}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
              style={{
                backgroundColor: `${borderStanza[tipo as Stanza['tipo']] ?? '#86868B'}15`,
                color: borderStanza[tipo as Stanza['tipo']] ?? '#48484A',
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
