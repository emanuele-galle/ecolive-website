'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GripVertical, Clock, Award, Wrench } from 'lucide-react'

export default function ComparisonSlider() {
  const [inset, setInset] = useState<number>(50)
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false)

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return

    const rect = e.currentTarget.getBoundingClientRect()
    let x = 0

    if ('touches' in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left
    } else if ('clientX' in e) {
      x = e.clientX - rect.left
    }

    const percentage = (x / rect.width) * 100
    setInset(Math.max(0, Math.min(100, percentage)))
  }

  return (
    <div className="w-full mb-16">
      <div
        className="relative aspect-video w-full h-full overflow-hidden rounded-3xl select-none shadow-2xl"
        onMouseMove={onMouseMove}
        onMouseUp={() => setOnMouseDown(false)}
        onTouchMove={onMouseMove}
        onTouchEnd={() => setOnMouseDown(false)}
      >
        {/* Slider Handle */}
        <div
          className="bg-white/90 h-full w-1 absolute z-20 top-0 -ml-1 select-none shadow-lg"
          style={{
            left: inset + '%',
          }}
        >
          <button
            className="bg-white rounded-full hover:scale-110 transition-all w-12 h-12 select-none -translate-y-1/2 absolute top-1/2 -ml-6 z-30 cursor-ew-resize flex justify-center items-center shadow-xl border-2 border-[#C4704B]"
            onTouchStart={(e) => {
              setOnMouseDown(true)
              onMouseMove(e)
            }}
            onMouseDown={(e) => {
              setOnMouseDown(true)
              onMouseMove(e)
            }}
            onTouchEnd={() => setOnMouseDown(false)}
            onMouseUp={() => setOnMouseDown(false)}
          >
            <GripVertical className="h-5 w-5 select-none text-[#C4704B]" />
          </button>
        </div>

        {/* Casa Ecolive (Right side - Top layer with clip-path) */}
        <div
          className="absolute inset-0 z-10"
          style={{
            clipPath: 'inset(0 0 0 ' + inset + '%)',
          }}
        >
          <Image
            src="/images/casa-value.jpg"
            alt="Casa Ecolive moderna"
            fill
            priority
            className="object-cover select-none"
          />

          {/* Badge overlay - Casa Ecolive */}
          <div className="absolute top-6 right-6 flex flex-col gap-3 z-30">
            <div className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-[#C4704B]/20">
              <div className="flex items-center gap-2 text-[#C4704B]">
                <Clock className="w-4 h-4" />
                <span className="font-bold text-sm">30 giorni</span>
              </div>
            </div>
            <div className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-[#C4704B]/20">
              <div className="flex items-center gap-2 text-[#C4704B]">
                <Award className="w-4 h-4" />
                <span className="font-bold text-sm">Classe A4</span>
              </div>
            </div>
            <div className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-[#C4704B]/20">
              <div className="flex items-center gap-2 text-[#C4704B]">
                <Wrench className="w-4 h-4" />
                <span className="font-bold text-sm">100+ anni</span>
              </div>
            </div>
          </div>

          {/* Label - Casa Ecolive */}
          <div className="absolute bottom-6 right-6 z-30">
            <div className="px-6 py-3 bg-gradient-to-r from-[#C4704B] to-[#A55A3A] backdrop-blur-md rounded-xl shadow-xl">
              <span className="font-bold text-white text-lg">Casa Ecolive</span>
            </div>
          </div>
        </div>

        {/* Casa Tradizionale (Left side - Bottom layer) */}
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
          alt="Casa tradizionale in costruzione"
          fill
          priority
          className="object-cover select-none"
        />

        {/* Badge overlay - Casa Tradizionale */}
        <div className="absolute top-6 left-6 flex flex-col gap-3 z-10">
          <div className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-300">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="font-bold text-sm">12-24 mesi</span>
            </div>
          </div>
          <div className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-300">
            <div className="flex items-center gap-2 text-gray-600">
              <Award className="w-4 h-4" />
              <span className="font-bold text-sm">Classe C</span>
            </div>
          </div>
          <div className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-300">
            <div className="flex items-center gap-2 text-gray-600">
              <Wrench className="w-4 h-4" />
              <span className="font-bold text-sm">Manut. frequente</span>
            </div>
          </div>
        </div>

        {/* Label - Casa Tradizionale */}
        <div className="absolute bottom-6 left-6 z-10">
          <div className="px-6 py-3 bg-gray-700/90 backdrop-blur-md rounded-xl shadow-xl">
            <span className="font-bold text-white text-lg">Casa Tradizionale</span>
          </div>
        </div>
      </div>

      {/* Instruction text */}
      <p className="text-center text-gray-500 text-sm mt-4">
        <span className="hidden sm:inline">Trascina lo slider</span>
        <span className="sm:hidden">Scorri</span> per confrontare
      </p>
    </div>
  )
}
