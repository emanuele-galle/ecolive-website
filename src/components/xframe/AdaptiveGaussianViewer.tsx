'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { Maximize2, Sparkles, Cpu, Smartphone, Monitor, ImageIcon, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import {
  detectDeviceCapability,
  getViewerSettings,
  type DeviceCapability,
  type DeviceInfo
} from '@/lib/deviceCapability'

// Lazy load del viewer locale
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

interface CameraConfig {
  position: [number, number, number]
  lookAt: [number, number, number]
  up: [number, number, number]
}

interface AdaptiveGaussianViewerProps {
  /** Full quality model (for high-end devices) */
  fullModelUrl: string
  /** Light model (for medium/low devices) */
  lightModelUrl: string
  /** Fallback image for devices without WebGL2 */
  fallbackImageUrl?: string
  /** Title for accessibility */
  title: string
  /** Description */
  description?: string
  /** Container height */
  height?: string
  /** Show minimal UI */
  minimal?: boolean
  /** Featured badge */
  featured?: boolean
  /** Custom camera configuration */
  cameraConfig?: CameraConfig
}

export default function AdaptiveGaussianViewer({
  fullModelUrl,
  lightModelUrl,
  fallbackImageUrl = '/images/xframe-fallback.jpg',
  title,
  description,
  height = '500px',
  minimal = false,
  featured = false,
  cameraConfig,
}: AdaptiveGaussianViewerProps) {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null)
  const [isDetecting, setIsDetecting] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewerKey, setViewerKey] = useState(0)

  // Detect device on mount
  useEffect(() => {
    try {
      const info = detectDeviceCapability()
      setDeviceInfo(info)

      // Log capability for debugging
      console.log('[AdaptiveViewer] Device detected:', {
        capability: info.capability,
        renderer: info.renderer.substring(0, 50),
        isMobile: info.isMobile
      })
    } catch (err) {
      console.error('[AdaptiveViewer] Detection error:', err)
      setError('Errore nel rilevamento del dispositivo')
    } finally {
      setIsDetecting(false)
    }
  }, [])

  // Get model URL based on capability
  const getModelUrl = useCallback(() => {
    if (!deviceInfo) return lightModelUrl

    switch (deviceInfo.capability) {
      case 'high':
        return fullModelUrl
      case 'medium':
      case 'low':
        return lightModelUrl
      default:
        return lightModelUrl
    }
  }, [deviceInfo, fullModelUrl, lightModelUrl])

  // FIX: Memoize settings to prevent viewer remount on every render
  const settings = useMemo(() => {
    if (!deviceInfo) return null
    return getViewerSettings(deviceInfo.capability)
  }, [deviceInfo])

  const handleFullscreen = () => {
    const container = document.getElementById('adaptive-viewer-container')
    if (container?.requestFullscreen) {
      container.requestFullscreen()
    }
  }

  const handleRetry = () => {
    setError(null)
    setViewerKey(prev => prev + 1)
  }

  // Capability indicator icon
  const CapabilityIcon = () => {
    if (!deviceInfo) return null

    switch (deviceInfo.capability) {
      case 'high':
        return <Monitor className="w-3 h-3" />
      case 'medium':
        return <Cpu className="w-3 h-3" />
      case 'low':
        return <Smartphone className="w-3 h-3" />
      case 'none':
        return <ImageIcon className="w-3 h-3" />
      default:
        return null
    }
  }

  const getCapabilityLabel = () => {
    if (!deviceInfo) return ''

    switch (deviceInfo.capability) {
      case 'high':
        return 'Alta qualit\u00e0'
      case 'medium':
        return 'Bilanciato'
      case 'low':
        return 'Ottimizzato'
      case 'none':
        return 'Fallback'
      default:
        return ''
    }
  }

  const getCapabilityColor = () => {
    if (!deviceInfo) return 'bg-gray-500'

    switch (deviceInfo.capability) {
      case 'high':
        return 'bg-green-600'
      case 'medium':
        return 'bg-blue-600'
      case 'low':
        return 'bg-yellow-600'
      case 'none':
        return 'bg-gray-600'
      default:
        return 'bg-gray-600'
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
          id="adaptive-viewer-container"
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

          {/* Detection loading state */}
          <AnimatePresence>
            {isDetecting && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#FAFAFA] to-[#F5F5F7] z-10"
              >
                <div className="text-center">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-gray-200 border-t-[#A0845C] animate-spin" />
                    <Cpu className="w-5 h-5 text-[#A0845C] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-gray-400 text-xs tracking-widest uppercase mt-4">Rilevamento dispositivo...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error state */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10">
              <div className="text-center px-6">
                <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Riprova
                </button>
              </div>
            </div>
          )}

          {/* Main content based on capability */}
          {!isDetecting && !error && deviceInfo && (
            <>
              {deviceInfo.capability === 'none' ? (
                // Fallback: Static image for devices without WebGL2
                <div className="absolute inset-0">
                  <Image
                    src={fallbackImageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-sm">
                    <p className="opacity-80">Il tuo dispositivo non supporta WebGL2.</p>
                    <p className="opacity-60 text-xs mt-1">Visualizzazione statica disponibile.</p>
                  </div>
                </div>
              ) : (
                // WebGL viewer with quality settings
                <GaussianSplatLocal
                  key={viewerKey}
                  plyUrl={getModelUrl()}
                  className="absolute inset-0"
                  quality={deviceInfo.capability === 'low' ? 'reduced' : 'full'}
                  settings={settings || undefined}
                  cameraConfig={cameraConfig}
                />
              )}
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

          {/* Badges */}
          {featured && (
            <div className="absolute top-4 left-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 z-30">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1D1D1F]/90 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                <Sparkles className="w-3 h-3" />
                Gaussian Splatting
              </div>
              {/* Capability indicator */}
              {deviceInfo && (
                <div className={`flex items-center gap-1.5 px-2.5 py-1.5 ${getCapabilityColor()} backdrop-blur-sm rounded-full text-white text-xs font-medium`}>
                  <CapabilityIcon />
                  {getCapabilityLabel()}
                </div>
              )}
            </div>
          )}
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

          {/* Interaction hint + device info */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3 text-gray-400 text-xs">
              {deviceInfo?.capability !== 'none' && (
                <>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#A0845C]" />
                    Trascina per ruotare
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#A0845C]" />
                    Scrolla per zoom
                  </span>
                </>
              )}
            </div>
            {/* Device info */}
            {deviceInfo && (
              <span className={`text-xs ${
                deviceInfo.capability === 'high' ? 'text-green-600' :
                deviceInfo.capability === 'medium' ? 'text-blue-600' :
                deviceInfo.capability === 'low' ? 'text-yellow-600' :
                'text-gray-600'
              }`}>
                {deviceInfo.capability === 'high' && 'Rendering completo'}
                {deviceInfo.capability === 'medium' && 'Rendering bilanciato'}
                {deviceInfo.capability === 'low' && 'Rendering ottimizzato'}
                {deviceInfo.capability === 'none' && 'Immagine statica'}
              </span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}
