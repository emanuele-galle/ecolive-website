/**
 * Device Capability Detection for WebGL/GPU
 * Determines what quality level the device can handle for Gaussian Splatting
 */

export type DeviceCapability = 'high' | 'medium' | 'low' | 'none'

export interface DeviceInfo {
  capability: DeviceCapability
  renderer: string
  hasWebGL2: boolean
  maxTextureSize: number
  isMobile: boolean
  memoryEstimate: 'high' | 'medium' | 'low'
}

/**
 * Detects WebGL2 support and GPU capability
 */
export function detectDeviceCapability(): DeviceInfo {
  // Check for WebGL2 support
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2') as WebGL2RenderingContext | null

  if (!gl) {
    return {
      capability: 'none',
      renderer: 'unknown',
      hasWebGL2: false,
      maxTextureSize: 0,
      isMobile: isMobileDevice(),
      memoryEstimate: 'low'
    }
  }

  // Get GPU renderer info
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
  const renderer = debugInfo
    ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
    : 'unknown'

  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 4096
  const isMobile = isMobileDevice()
  const memoryEstimate = estimateMemory()

  // Determine capability based on GPU
  let capability: DeviceCapability = 'medium'

  // High-end dedicated GPUs
  const highEndPatterns = [
    /NVIDIA.*GeForce.*(RTX|GTX\s*(1[6-9]|[2-9]\d)|3\d{3}|4\d{3})/i,
    /AMD.*Radeon.*(RX\s*[5-7]\d{3}|VII)/i,
    /Apple\s*M[1-4]/i,
    /Apple\s*A1[5-9]/i,
  ]

  // Low-end integrated GPUs
  const lowEndPatterns = [
    /Intel.*HD\s*(Graphics\s*[2-5]|4\d{2}|5\d{2}|6\d{2})/i,
    /Intel.*UHD\s*(Graphics\s*[2-5]|6\d{2})/i,
    /Mali-G[0-5]/i,
    /Mali-[4-6]/i,
    /Adreno.*[2-4]\d{2}/i,
    /PowerVR/i,
    /VideoCore/i,
  ]

  // Check GPU capability
  for (const pattern of highEndPatterns) {
    if (pattern.test(renderer)) {
      capability = 'high'
      break
    }
  }

  if (capability !== 'high') {
    for (const pattern of lowEndPatterns) {
      if (pattern.test(renderer)) {
        capability = 'low'
        break
      }
    }
  }

  // Downgrade on mobile regardless of GPU
  if (isMobile && capability === 'high') {
    capability = 'medium'
  }

  // Downgrade if memory is low
  if (memoryEstimate === 'low') {
    capability = capability === 'high' ? 'medium' : 'low'
  }

  // Cleanup
  const loseContext = gl.getExtension('WEBGL_lose_context')
  if (loseContext) {
    loseContext.loseContext()
  }

  return {
    capability,
    renderer,
    hasWebGL2: true,
    maxTextureSize,
    isMobile,
    memoryEstimate
  }
}

/**
 * Detect if device is mobile
 */
function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false

  // Check user agent
  const ua = navigator.userAgent.toLowerCase()
  const mobilePatterns = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i

  // Check screen size
  const isSmallScreen = window.innerWidth <= 1024

  // Check touch support
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  return mobilePatterns.test(ua) || (isSmallScreen && hasTouch)
}

/**
 * Estimate available memory
 */
function estimateMemory(): 'high' | 'medium' | 'low' {
  if (typeof navigator === 'undefined') return 'medium'

  // Use deviceMemory API if available (Chrome)
  const nav = navigator as Navigator & { deviceMemory?: number }
  if (nav.deviceMemory) {
    if (nav.deviceMemory >= 8) return 'high'
    if (nav.deviceMemory >= 4) return 'medium'
    return 'low'
  }

  // Fallback: estimate based on platform
  const isMobile = isMobileDevice()
  return isMobile ? 'low' : 'medium'
}

/**
 * Get recommended settings for viewer based on capability
 */
export function getViewerSettings(capability: DeviceCapability) {
  switch (capability) {
    case 'high':
      return {
        maxScreenSpaceSplatSize: 64,
        antialiased: true,
        dynamicScene: false,
        useFloat16: false,
        preferredOutputMode: 0, // ThreeD
      }
    case 'medium':
      return {
        maxScreenSpaceSplatSize: 32,
        antialiased: true,
        dynamicScene: false,
        useFloat16: true,
        preferredOutputMode: 0, // ThreeD
      }
    case 'low':
      return {
        maxScreenSpaceSplatSize: 16,
        antialiased: false,
        dynamicScene: false,
        useFloat16: true,
        preferredOutputMode: 1, // TwoD
      }
    default:
      return {
        maxScreenSpaceSplatSize: 16,
        antialiased: false,
        dynamicScene: false,
        useFloat16: true,
        preferredOutputMode: 1,
      }
  }
}

/**
 * Get recommended model based on capability
 */
export function getRecommendedModel(
  capability: DeviceCapability,
  models: {
    full?: string
    light?: string
    fallback?: string
  }
): { url: string; type: 'splat' | 'image' } {
  switch (capability) {
    case 'high':
      return { url: models.full || models.light || '', type: 'splat' }
    case 'medium':
    case 'low':
      return { url: models.light || models.full || '', type: 'splat' }
    case 'none':
      return { url: models.fallback || '', type: 'image' }
    default:
      return { url: models.fallback || '', type: 'image' }
  }
}
