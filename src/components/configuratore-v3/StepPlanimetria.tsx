'use client'

import { motion } from 'framer-motion'
import { useConfiguratoreStore } from '@/lib/configuratore-v3/store'
import type { TipoTetto, Stanza } from '@/lib/configuratore-v3/types'

const CELL_SIZE = 40

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
      {/* Floor plan */}
      <div className="rounded-2xl border border-[#E5E5E7] bg-white p-6 shadow-sm">
        <p className="mb-4 text-center text-sm font-medium text-[#86868B]">
          Layout indicativo &mdash; {modulo.label} ({modulo.mq} m&sup2;)
        </p>

        <div
          className="relative mx-auto border border-[#D1D1D6] bg-[#FAFAFA]"
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
              className="absolute flex items-center justify-center rounded-md border-2 text-center"
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
                className="text-[11px] font-semibold leading-tight"
                style={{ color: borderStanza[s.tipo] }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
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

      {/* Room summary */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#48484A]">
        {roomCounts.camera && (
          <span className="rounded-full bg-[#48484A]/10 px-3 py-1">{roomCounts.camera} {roomCounts.camera === 1 ? 'camera' : 'camere'}</span>
        )}
        {roomCounts.bagno && (
          <span className="rounded-full bg-[#4A90D9]/10 px-3 py-1">{roomCounts.bagno} {roomCounts.bagno === 1 ? 'bagno' : 'bagni'}</span>
        )}
        {roomCounts.soggiorno && (
          <span className="rounded-full bg-[#A0845C]/10 px-3 py-1">{roomCounts.soggiorno} soggiorno</span>
        )}
        {roomCounts.cucina && (
          <span className="rounded-full bg-[#6B8F71]/10 px-3 py-1">{roomCounts.cucina} cucina</span>
        )}
        <span className="font-semibold text-[#1D1D1F]">{modulo.mq} m&sup2; totali</span>
      </div>

      {/* Note */}
      <p className="max-w-lg text-center text-sm leading-relaxed text-[#86868B]">
        Il layout dettagliato verr&agrave; definito durante la visita in sede con i nostri progettisti.
      </p>

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
