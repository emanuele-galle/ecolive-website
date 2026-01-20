'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react'

// Cursor variant types
export type CursorVariant = 'default' | 'pointer' | 'text' | 'hidden'

interface CursorContextType {
  variant: CursorVariant
  setVariant: (variant: CursorVariant) => void
  isVisible: boolean
  setIsVisible: (visible: boolean) => void
  isEnabled: boolean // Tracks if custom cursor should be shown (desktop only)
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

interface CursorProviderProps {
  children: ReactNode
}

export function CursorProvider({ children }: CursorProviderProps) {
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [isVisible, setIsVisible] = useState(true)
  const [isEnabled, setIsEnabled] = useState(false)

  // Check if device supports hover (not touch-only)
  useEffect(() => {
    const checkDevice = () => {
      const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      setIsEnabled(hasHover && !prefersReduced)
    }

    checkDevice()

    // Listen for changes
    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handler = () => checkDevice()
    hoverQuery.addEventListener('change', handler)
    motionQuery.addEventListener('change', handler)

    return () => {
      hoverQuery.removeEventListener('change', handler)
      motionQuery.removeEventListener('change', handler)
    }
  }, [])

  // Toggle body class for CSS cursor hiding
  useEffect(() => {
    if (isEnabled) {
      document.body.classList.add('custom-cursor-active')
    } else {
      document.body.classList.remove('custom-cursor-active')
    }
    return () => {
      document.body.classList.remove('custom-cursor-active')
    }
  }, [isEnabled])

  // Reset variant when leaving window
  useEffect(() => {
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  const handleSetVariant = useCallback((newVariant: CursorVariant) => {
    setVariant(newVariant)
  }, [])

  const handleSetIsVisible = useCallback((visible: boolean) => {
    setIsVisible(visible)
  }, [])

  return (
    <CursorContext.Provider
      value={{
        variant,
        setVariant: handleSetVariant,
        isVisible,
        setIsVisible: handleSetIsVisible,
        isEnabled,
      }}
    >
      {children}
    </CursorContext.Provider>
  )
}

// Hook to use cursor context
export function useCursor() {
  const context = useContext(CursorContext)
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}

// Hook for cursor-interactive elements (auto-detect variant)
export function useCursorInteraction(variant: CursorVariant = 'pointer') {
  const { setVariant, isEnabled } = useCursor()

  const onMouseEnter = useCallback(() => {
    if (isEnabled) setVariant(variant)
  }, [setVariant, variant, isEnabled])

  const onMouseLeave = useCallback(() => {
    if (isEnabled) setVariant('default')
  }, [setVariant, isEnabled])

  return { onMouseEnter, onMouseLeave }
}
