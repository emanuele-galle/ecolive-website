'use client'

import { Home, Bath, UtensilsCrossed, Bed, BookOpen, Archive, DoorOpen } from 'lucide-react'
import type { Stanza, TipoStanza } from '@/lib/configuratore-v3/types'

const coloriStanza: Record<TipoStanza, { bg: string; border: string }> = {
  soggiorno: { bg: 'rgba(160, 132, 92, 0.35)', border: '#A0845C' },
  cucina: { bg: 'rgba(107, 143, 113, 0.35)', border: '#6B8F71' },
  camera: { bg: 'rgba(72, 72, 74, 0.20)', border: '#48484A' },
  bagno: { bg: 'rgba(74, 144, 217, 0.35)', border: '#4A90D9' },
  studio: { bg: 'rgba(155, 89, 182, 0.30)', border: '#9B59B6' },
  ripostiglio: { bg: 'rgba(149, 165, 166, 0.30)', border: '#95A5A6' },
  ingresso: { bg: 'rgba(230, 126, 34, 0.30)', border: '#E67E22' },
}

const roomIcons: Record<TipoStanza, typeof Home> = {
  soggiorno: Home,
  cucina: UtensilsCrossed,
  camera: Bed,
  bagno: Bath,
  studio: BookOpen,
  ripostiglio: Archive,
  ingresso: DoorOpen,
}

interface RoomCellProps {
  stanza: Stanza
  cellSize: number
  selected: boolean
  onClick: () => void
}

export default function RoomCell({ stanza, cellSize, selected, onClick }: RoomCellProps) {
  const colors = coloriStanza[stanza.tipo]
  const Icon = roomIcons[stanza.tipo]

  const pxW = stanza.w * cellSize - 2
  const pxH = stanza.h * cellSize - 2
  const isSmall = stanza.w < 3 || stanza.h < 3
  const isTiny = pxW < 60 || pxH < 60

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute flex flex-col items-center justify-center gap-0.5 transition-all duration-150 cursor-pointer outline-none focus-visible:z-20"
      style={{
        left: stanza.x * cellSize + 1,
        top: stanza.y * cellSize + 1,
        width: pxW,
        height: pxH,
        backgroundColor: colors.bg,
        borderWidth: selected ? 3 : 2,
        borderStyle: 'solid',
        borderColor: selected ? '#A0845C' : colors.border,
        borderRadius: 6,
        boxShadow: selected
          ? '0 0 0 2px rgba(160, 132, 92, 0.4), 0 4px 12px rgba(0,0,0,0.1)'
          : 'none',
        transform: selected ? 'scale(1.02)' : 'scale(1)',
        zIndex: selected ? 10 : 1,
      }}
    >
      {!isTiny && (
        <Icon
          className="flex-shrink-0"
          style={{ color: colors.border }}
          size={isSmall ? 14 : 18}
        />
      )}
      {!isTiny && (
        <span
          className="text-center font-semibold leading-tight px-0.5"
          style={{
            color: colors.border,
            fontSize: isSmall ? 9 : 11,
            maxWidth: pxW - 8,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {stanza.label}
        </span>
      )}
      {!isSmall && !isTiny && (
        <span
          className="font-medium"
          style={{
            color: colors.border,
            fontSize: 9,
            opacity: 0.7,
          }}
        >
          {stanza.w}×{stanza.h}m
        </span>
      )}
    </button>
  )
}

export { coloriStanza, roomIcons }
