'use client'

import { useState } from 'react'
import { Trash2, Plus } from 'lucide-react'
import { useConfiguratoreStore } from '@/lib/configuratore-v3/store'
import type { TipoStanza } from '@/lib/configuratore-v3/types'
import AddRoomDialog from './AddRoomDialog'

const tipiStanza: { id: TipoStanza; label: string }[] = [
  { id: 'soggiorno', label: 'Soggiorno' },
  { id: 'cucina', label: 'Cucina' },
  { id: 'camera', label: 'Camera' },
  { id: 'bagno', label: 'Bagno' },
  { id: 'studio', label: 'Studio' },
  { id: 'ripostiglio', label: 'Ripostiglio' },
  { id: 'ingresso', label: 'Ingresso' },
]

export default function RoomEditPanel() {
  const { stanze, selectedRoomId, updateRoom, removeRoom } = useConfiguratoreStore()
  const [showAddRoom, setShowAddRoom] = useState(false)

  const selected = selectedRoomId ? stanze.find(s => s.id === selectedRoomId) : null

  return (
    <div className="w-full max-w-[680px]">
      {selected ? (
        <div className="rounded-2xl border border-[#E5E5E7] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-[#1D1D1F]">Modifica stanza</h4>
            <button
              type="button"
              onClick={() => {
                removeRoom(selected.id)
              }}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#FF3B30] transition-colors hover:bg-[#FF3B30]/10"
            >
              <Trash2 size={14} />
              Rimuovi
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Tipo */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#86868B]">Tipo</label>
              <select
                value={selected.tipo}
                onChange={(e) => updateRoom(selected.id, { tipo: e.target.value as TipoStanza })}
                className="w-full rounded-xl border border-[#E5E5E7] bg-[#FAFAFA] px-3 py-2.5 text-sm text-[#1D1D1F] outline-none focus:border-[#A0845C] focus:ring-1 focus:ring-[#A0845C]/30"
              >
                {tipiStanza.map(t => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Label */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#86868B]">Nome</label>
              <input
                type="text"
                value={selected.label}
                onChange={(e) => updateRoom(selected.id, { label: e.target.value })}
                className="w-full rounded-xl border border-[#E5E5E7] bg-[#FAFAFA] px-3 py-2.5 text-sm text-[#1D1D1F] outline-none focus:border-[#A0845C] focus:ring-1 focus:ring-[#A0845C]/30"
              />
            </div>

            {/* Dimensioni (read-only) */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#86868B]">Dimensioni</label>
              <div className="flex items-center rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] px-3 py-2.5 text-sm text-[#86868B]">
                {selected.w} × {selected.h} m ({selected.w * selected.h} m²)
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#D1D1D6] bg-[#FAFAFA] p-5 text-center">
          <p className="text-sm text-[#86868B]">
            Tocca una stanza nella planimetria per modificarla
          </p>
        </div>
      )}

      {/* Add room button */}
      <div className="mt-3">
        {showAddRoom ? (
          <AddRoomDialog onClose={() => setShowAddRoom(false)} />
        ) : (
          <button
            type="button"
            onClick={() => setShowAddRoom(true)}
            className="flex items-center gap-2 rounded-xl border-2 border-dashed border-[#A0845C]/30 px-4 py-3 text-sm font-medium text-[#A0845C] transition-colors hover:border-[#A0845C]/60 hover:bg-[#A0845C]/5 w-full justify-center"
          >
            <Plus size={16} />
            Aggiungi stanza
          </button>
        )}
      </div>
    </div>
  )
}
