'use client'

import { useConfiguratoreStore } from '@/lib/configuratore-v3/store'
import RoomCell from './RoomCell'

export default function FloorPlanGrid() {
  const { modulo, stanze, selectedRoomId, setSelectedRoomId } = useConfiguratoreStore()

  if (!modulo) return null

  const gridW = modulo.larghezza
  const gridH = modulo.profondita

  const adaptiveCellSize = Math.min(
    Math.floor(600 / Math.max(gridW, 1)),
    Math.floor(500 / Math.max(gridH, 1)),
    56
  )
  const CELL_SIZE = Math.max(adaptiveCellSize, 28)

  const totalW = gridW * CELL_SIZE
  const totalH = gridH * CELL_SIZE

  return (
    <div className="w-full max-w-[680px] rounded-2xl border border-[#E5E5E7] bg-white shadow-sm overflow-hidden">
      <div className="bg-[#F5F5F7] px-6 py-3 border-b border-[#E5E5E7]">
        <p className="text-sm font-semibold text-[#1D1D1F]">
          Layout &mdash; {modulo.label} ({modulo.mq} m&sup2;)
        </p>
        <p className="text-xs text-[#86868B]">
          Piano terra &middot; Tocca una stanza per modificarla
        </p>
      </div>

      <div className="p-6 flex justify-center">
        <div className="relative">
          {/* Dimension annotations - top */}
          <div
            className="flex justify-center mb-1.5"
            style={{ width: totalW }}
          >
            <span className="text-[10px] font-medium text-[#86868B] tracking-wide">
              {modulo.larghezza} m
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Dimension annotation - left */}
            <div
              className="flex items-center justify-center"
              style={{ height: totalH }}
            >
              <span
                className="text-[10px] font-medium text-[#86868B] tracking-wide"
                style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
              >
                {modulo.profondita} m
              </span>
            </div>

            {/* Grid container */}
            <div
              className="relative border-2 border-[#48484A] bg-[#FAFAFA]"
              style={{ width: totalW, height: totalH }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedRoomId(null)
              }}
            >
              {/* Grid lines */}
              {Array.from({ length: gridW + 1 }).map((_, i) => (
                <div
                  key={`vl-${i}`}
                  className="absolute top-0 bottom-0 pointer-events-none"
                  style={{
                    left: i * CELL_SIZE,
                    borderLeft: i === 0 || i === gridW ? 'none' : '1px dashed rgba(0,0,0,0.08)',
                  }}
                />
              ))}
              {Array.from({ length: gridH + 1 }).map((_, i) => (
                <div
                  key={`hl-${i}`}
                  className="absolute left-0 right-0 pointer-events-none"
                  style={{
                    top: i * CELL_SIZE,
                    borderTop: i === 0 || i === gridH ? 'none' : '1px dashed rgba(0,0,0,0.08)',
                  }}
                />
              ))}

              {/* Rooms */}
              {stanze.map((s) => (
                <RoomCell
                  key={s.id}
                  stanza={s}
                  cellSize={CELL_SIZE}
                  selected={selectedRoomId === s.id}
                  onClick={() => setSelectedRoomId(selectedRoomId === s.id ? null : s.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
