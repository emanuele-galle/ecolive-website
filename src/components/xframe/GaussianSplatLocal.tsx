'use client'

import { useEffect, useRef, useState } from 'react'
import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d'

interface ViewerSettings {
  maxScreenSpaceSplatSize?: number
  antialiased?: boolean
  dynamicScene?: boolean
  useFloat16?: boolean
  preferredOutputMode?: number
}

interface CameraConfig {
  position: [number, number, number]
  lookAt: [number, number, number]
  up: [number, number, number]
}

interface GaussianSplatLocalProps {
  plyUrl: string
  className?: string
  /** Quality preset: 'full' or 'reduced' for low-end devices */
  quality?: 'full' | 'reduced'
  /** Custom viewer settings from device capability detection */
  settings?: ViewerSettings
  /** Custom camera configuration */
  cameraConfig?: CameraConfig
}

export default function GaussianSplatLocal({
  plyUrl,
  className = '',
  quality = 'full',
  settings,
  cameraConfig
}: GaussianSplatLocalProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<GaussianSplats3D.Viewer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadProgress, setLoadProgress] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return

    // FIX: Track mount state to prevent state updates after unmount
    let isMounted = true
    const container = containerRef.current

    // Determine viewer options based on quality/settings
    const isReduced = quality === 'reduced'
    const viewerOptions: Record<string, unknown> = {
      // Camera config: usa valori custom se forniti, altrimenti default
      cameraUp: cameraConfig?.up ?? [0, -1, 0],
      initialCameraPosition: cameraConfig?.position ?? [0, -5, 22],
      initialCameraLookAt: cameraConfig?.lookAt ?? [0, 0, 0],
      rootElement: container,
      sharedMemoryForWorkers: false,
      dynamicScene: settings?.dynamicScene ?? false,
      antialiased: settings?.antialiased ?? !isReduced,
      focalAdjustment: 1.0,
    }

    // Apply max splat size if specified
    if (settings?.maxScreenSpaceSplatSize) {
      viewerOptions.maxScreenSpaceSplatSize = settings.maxScreenSpaceSplatSize
    } else if (isReduced) {
      viewerOptions.maxScreenSpaceSplatSize = 16
    }

    // Crea il viewer
    const viewer = new GaussianSplats3D.Viewer(viewerOptions)

    viewerRef.current = viewer

    // Carica il modello senza modifiche - come su SuperSplat originale
    viewer.addSplatScene(plyUrl, {
      showLoadingUI: false,
      progressiveLoad: true,
      // Nessuna rotazione o scala - modello originale
      onProgress: (event: ProgressEvent) => {
        if (!isMounted) return // FIX: Check mount state
        if (event.lengthComputable && event.total > 0) {
          const percent = Math.round((event.loaded / event.total) * 100)
          setLoadProgress(Math.min(percent, 100))
        }
      }
    })
      .then(() => {
        // FIX: Check mount state before state updates
        if (!isMounted) return
        setIsLoading(false)
        try {
          viewer.start()
        } catch (err) {
          console.error('Errore avvio viewer:', err)
          if (isMounted) {
            setError('Errore nell\'avvio del modello 3D')
          }
        }
      })
      .catch((err: Error) => {
        // FIX: Check mount state before state updates
        if (!isMounted) return
        console.error('Errore caricamento splat:', err)
        setError('Errore nel caricamento del modello 3D')
        setIsLoading(false)
      })

    // Cleanup - FIX: Prevent race condition
    return () => {
      isMounted = false // FIX: Prevent state updates after unmount
      if (viewerRef.current) {
        try {
          viewerRef.current.dispose()
        } catch (e) {
          console.warn('Errore dispose viewer:', e)
        }
        viewerRef.current = null
      }
    }
  }, [plyUrl, quality, settings, cameraConfig])

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FAFAFA] to-[#F5F5F7] z-10">
          <div className="text-center">
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-full border-3 border-gray-200 border-t-[#C4704B] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#C4704B] font-bold text-sm">{loadProgress}%</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">Caricamento modello 3D...</p>
            <p className="text-gray-400 text-xs mt-1">
              {quality === 'reduced' ? 'Versione ottimizzata per il tuo dispositivo' : 'Qualit\u00e0 completa'}
            </p>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10">
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Canvas container */}
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ touchAction: 'none' }}
      />
    </div>
  )
}
