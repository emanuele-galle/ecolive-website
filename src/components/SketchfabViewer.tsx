'use client'

import { useState } from 'react'
import { Maximize2, RotateCw, Box } from 'lucide-react'
import { motion } from 'framer-motion'

interface SketchfabViewerProps {
  modelId: string
  title: string
  description?: string
  height?: string
  autoStart?: boolean
  minimal?: boolean
  featured?: boolean
}

export default function SketchfabViewer({
  modelId,
  title,
  description,
  height = '500px',
  autoStart = false,
  minimal = false,
  featured = false,
}: SketchfabViewerProps) {
  const [isLoading, setIsLoading] = useState(true)

  const embedUrl = `https://sketchfab.com/models/${modelId}/embed?autostart=${autoStart ? 1 : 0}&ui_theme=dark&ui_infos=0&ui_watermark=0&ui_inspector=0&preload=1`

  const handleFullscreen = () => {
    const iframe = document.getElementById(`sketchfab-${modelId}`) as HTMLIFrameElement
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen()
      }
    }
  }

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 1.0 }}
    >
      {/* Premium Container with Gradient Border */}
      <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 group-hover:from-[#C4704B]/30 group-hover:via-gray-100 group-hover:to-[#C4704B]/30 transition-all duration-700">
        <div
          className={`relative w-full rounded-2xl overflow-hidden bg-white
            ${featured
              ? 'shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12),0_16px_50px_-8px_rgba(0,0,0,0.08)] group-hover:shadow-[0_12px_40px_-4px_rgba(196,112,75,0.2),0_24px_70px_-8px_rgba(0,0,0,0.15)]'
              : 'shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1),0_8px_40px_-8px_rgba(0,0,0,0.05)] group-hover:shadow-[0_8px_30px_-4px_rgba(196,112,75,0.15),0_16px_60px_-8px_rgba(0,0,0,0.1)]'
            }
            transition-all duration-500`}
          style={{ height }}
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.03] pointer-events-none" />

          {/* Loading state - premium */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FAFAFA] to-[#F5F5F7] z-10">
              <div className="text-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-gray-200 border-t-[#C4704B] animate-spin" />
                  <Box className="w-5 h-5 text-[#C4704B] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-gray-400 text-xs tracking-widest uppercase mt-4">Caricamento 3D</p>
              </div>
            </div>
          )}

          {/* Sketchfab iframe */}
          <iframe
            id={`sketchfab-${modelId}`}
            title={title}
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            onLoad={() => setIsLoading(false)}
          />

          {/* Fullscreen button - premium */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleFullscreen}
              className="p-2.5 bg-white/95 hover:bg-white text-gray-600 hover:text-[#C4704B] rounded-xl shadow-lg border border-gray-200/80 hover:border-[#C4704B]/30 transition-all duration-200 hover:scale-105"
              title="Schermo intero"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Top-left badge for featured */}
          {featured && (
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E3D30]/90 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                <Box className="w-3 h-3" />
                3D Interattivo
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info below viewer - premium typography */}
      {!minimal && (
        <div className="mt-6 px-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[#1E3D30] font-semibold text-lg tracking-tight">{title}</h3>
              {description && (
                <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{description}</p>
              )}
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#C4704B]/10 rounded-lg flex-shrink-0">
              <Box className="w-3.5 h-3.5 text-[#C4704B]" />
              <span className="text-[#C4704B] text-xs font-medium">360°</span>
            </div>
          </div>

          {/* Interaction hint - more visible */}
          <div className="flex items-center gap-3 mt-4 text-gray-400 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#C4704B]" />
              Trascina per ruotare
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#C4704B]" />
              Scrolla per zoom
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
