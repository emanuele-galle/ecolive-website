'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Maximize2, Sparkles, Users, Server, Cloud } from 'lucide-react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Lazy load del viewer locale (pesante)
const GaussianSplatLocal = dynamic(() => import('./GaussianSplatLocal'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FAFAFA] to-[#F5F5F7]">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-2 border-gray-200 border-t-[#A0845C] animate-spin mx-auto" />
        <p className="text-gray-400 text-xs tracking-widest uppercase mt-4">Preparazione viewer...</p>
      </div>
    </div>
  )
})

interface SupersplatViewerProps {
  splatId: string
  title: string
  description?: string
  height?: string
  minimal?: boolean
  featured?: boolean
  localPlyPath?: string // Path al file PLY locale
  userThreshold?: number // Soglia utenti per switch (default 5)
}

// Genera ID sessione unico
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export default function SupersplatViewer({
  splatId,
  title,
  description,
  height = '500px',
  minimal = false,
  featured = false,
  localPlyPath = '/models/xframe-scan-raw.ply',
  userThreshold = 5,
}: SupersplatViewerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [useLocal, setUseLocal] = useState<boolean | null>(null) // null = checking
  const [activeUsers, setActiveUsers] = useState(0)
  const sessionIdRef = useRef<string | null>(null)
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null)

  const embedUrl = `https://superspl.at/s?id=${splatId}`

  // Registra sessione e avvia heartbeat
  const registerSession = useCallback(async () => {
    if (!sessionIdRef.current) {
      sessionIdRef.current = generateSessionId()
    }

    try {
      const response = await fetch('/api/viewer-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionIdRef.current })
      })

      if (response.ok) {
        const data = await response.json()
        setActiveUsers(data.activeUsers)
        setUseLocal(data.activeUsers < userThreshold)
      }
    } catch (error) {
      console.error('Errore sessione viewer:', error)
      // Fallback: usa versione remota se API non disponibile
      setUseLocal(false)
    }
  }, [userThreshold])

  // Rimuovi sessione quando lascia la pagina
  const unregisterSession = useCallback(async () => {
    if (sessionIdRef.current) {
      try {
        await fetch('/api/viewer-session', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId: sessionIdRef.current })
        })
      } catch {
        // Ignora errori in cleanup
      }
    }
  }, [])

  // Setup sessione e heartbeat
  useEffect(() => {
    // Registra sessione iniziale
    registerSession()

    // Heartbeat ogni 10 secondi
    heartbeatRef.current = setInterval(registerSession, 10000)

    // Cleanup: rimuovi sessione e ferma heartbeat
    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current)
      }
      unregisterSession()
    }
  }, [registerSession, unregisterSession])

  // Gestisci chiusura pagina/tab
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Usa sendBeacon per invio affidabile
      if (sessionIdRef.current) {
        navigator.sendBeacon(
          '/api/viewer-session',
          JSON.stringify({ sessionId: sessionIdRef.current, action: 'delete' })
        )
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const handleFullscreen = () => {
    const container = document.getElementById(`supersplat-container-${splatId}`)
    if (container?.requestFullscreen) {
      container.requestFullscreen()
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
      <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 group-hover:from-[#A0845C]/30 group-hover:via-gray-100 group-hover:to-[#A0845C]/30 transition-all duration-700">
        <div
          id={`supersplat-container-${splatId}`}
          className={`relative w-full rounded-2xl overflow-hidden bg-white
            ${featured
              ? 'shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12),0_16px_50px_-8px_rgba(0,0,0,0.08)] group-hover:shadow-[0_12px_40px_-4px_rgba(196,112,75,0.2),0_24px_70px_-8px_rgba(0,0,0,0.15)]'
              : 'shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1),0_8px_40px_-8px_rgba(0,0,0,0.05)] group-hover:shadow-[0_8px_30px_-4px_rgba(196,112,75,0.15),0_16px_60px_-8px_rgba(0,0,0,0.1)]'
            }
            transition-all duration-500`}
          style={{ height }}
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.03] pointer-events-none z-20" />

          {/* Loading state mentre controlla utenti */}
          {useLocal === null && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FAFAFA] to-[#F5F5F7] z-10">
              <div className="text-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-gray-200 border-t-[#A0845C] animate-spin" />
                  <Users className="w-5 h-5 text-[#A0845C] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-gray-400 text-xs tracking-widest uppercase mt-4">Ottimizzazione...</p>
              </div>
            </div>
          )}

          {/* Viewer locale (Gaussian Splatting self-hosted) */}
          {useLocal === true && (
            <GaussianSplatLocal
              plyUrl={localPlyPath}
              className="absolute inset-0"
            />
          )}

          {/* Viewer remoto (iframe Supersplat) */}
          {useLocal === false && (
            <>
              {/* Loading state per iframe */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FAFAFA] to-[#F5F5F7] z-10">
                  <div className="text-center">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border-2 border-gray-200 border-t-[#A0845C] animate-spin" />
                      <Sparkles className="w-5 h-5 text-[#A0845C] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-gray-400 text-xs tracking-widest uppercase mt-4">Caricamento 3D</p>
                  </div>
                </div>
              )}

              <iframe
                id={`supersplat-${splatId}`}
                title={title}
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                allow="fullscreen; xr-spatial-tracking"
                onLoad={() => setIsLoading(false)}
              />
            </>
          )}

          {/* Fullscreen button */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-30">
            <button
              onClick={handleFullscreen}
              className="p-2.5 bg-white/95 hover:bg-white text-gray-600 hover:text-[#A0845C] rounded-xl shadow-lg border border-gray-200/80 hover:border-[#A0845C]/30 transition-all duration-200 hover:scale-105"
              title="Schermo intero"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Badge featured + hosting mode */}
          {featured && (
            <div className="absolute top-4 left-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 z-30">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1D1D1F]/90 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                <Sparkles className="w-3 h-3" />
                Gaussian Splatting
              </div>
              {/* Indicatore hosting mode */}
              <div className={`flex items-center gap-1.5 px-2.5 py-1.5 backdrop-blur-sm rounded-full text-xs font-medium ${
                useLocal
                  ? 'bg-green-600/90 text-white'
                  : 'bg-blue-600/90 text-white'
              }`}>
                {useLocal ? (
                  <>
                    <Server className="w-3 h-3" />
                    Locale
                  </>
                ) : (
                  <>
                    <Cloud className="w-3 h-3" />
                    CDN
                  </>
                )}
              </div>
            </div>
          )}

          {/* Indicatore utenti attivi */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 z-30">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs">
              <Users className="w-3 h-3" />
              <span>{activeUsers} {activeUsers === 1 ? 'utente' : 'utenti'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info below viewer */}
      {!minimal && (
        <div className="mt-6 px-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-[#1D1D1F] font-semibold text-lg tracking-tight">{title}</h3>
              {description && (
                <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{description}</p>
              )}
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#A0845C]/10 rounded-lg flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#A0845C]" />
              <span className="text-[#A0845C] text-xs font-medium">3D Scan</span>
            </div>
          </div>

          {/* Interaction hint + mode info */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3 text-gray-400 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#A0845C]" />
                Trascina per ruotare
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#A0845C]" />
                Scrolla per zoom
              </span>
            </div>
            {/* Mode indicator */}
            <span className={`text-xs ${useLocal ? 'text-green-600' : 'text-blue-600'}`}>
              {useLocal ? 'Rendering ottimizzato locale' : 'Streaming da CDN'}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
