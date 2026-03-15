'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useConfiguratoreStore } from '@/lib/configuratore-v3/store'
import type { TipoStanza } from '@/lib/configuratore-v3/types'
import { roomIcons, coloriStanza } from './RoomCell'

const roomTypes: { id: TipoStanza; label: string }[] = [
  { id: 'soggiorno', label: 'Soggiorno' },
  { id: 'cucina', label: 'Cucina' },
  { id: 'camera', label: 'Camera' },
  { id: 'bagno', label: 'Bagno' },
  { id: 'studio', label: 'Studio' },
  { id: 'ripostiglio', label: 'Ripostiglio' },
  { id: 'ingresso', label: 'Ingresso' },
]

interface AddRoomDialogProps {
  onClose: () => void
}

export default function AddRoomDialog({ onClose }: AddRoomDialogProps) {
  const { addRoom } = useConfiguratoreStore()
  const [error, setError] = useState<string | null>(null)

  function handleAdd(tipo: TipoStanza) {
    const success = addRoom(tipo)
    if (success) {
      setError(null)
      onClose()
    } else {
      setError('Spazio esaurito nella planimetria. Rimuovi una stanza per aggiungerne un\'altra.')
    }
  }

  return (
    <div className="rounded-2xl border border-[#E5E5E7] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-[#1D1D1F]">Aggiungi stanza</h4>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-[#86868B] transition-colors hover:bg-[#F5F5F7] hover:text-[#1D1D1F]"
        >
          <X size={16} />
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {roomTypes.map(({ id, label }) => {
          const Icon = roomIcons[id]
          const colors = coloriStanza[id]
          return (
            <button
              key={id}
              type="button"
              onClick={() => handleAdd(id)}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-[#E5E5E7] p-3 text-center transition-all hover:border-[#A0845C]/50 hover:shadow-sm active:scale-95"
              style={{ backgroundColor: colors.bg }}
            >
              <Icon size={20} style={{ color: colors.border }} />
              <span className="text-xs font-medium" style={{ color: colors.border }}>
                {label}
              </span>
            </button>
          )
        })}
      </div>

      {error && (
        <p className="mt-3 text-xs text-[#FF3B30] text-center">{error}</p>
      )}
    </div>
  )
}
