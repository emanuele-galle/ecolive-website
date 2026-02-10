'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HouseSelector from '@/components/configuratore-v2/HouseSelector'
import RoomSelector from '@/components/configuratore-v2/RoomSelector'
import QuoteRequestForm from '@/components/configuratore-v2/QuoteRequestForm'
import { useConfiguratorV2 } from '@/components/configuratore-v2/hooks/useConfiguratorV2'
import type { SubmitQuoteResult } from '@/lib/configuratore-v2/types'

interface ConfiguratoreClientProps {
  onSubmit: (formData: FormData) => Promise<SubmitQuoteResult>
}

export default function ConfiguratoreClient({ onSubmit }: ConfiguratoreClientProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const { step, goBack, reset } = useConfiguratorV2()

  // Handle browser back button
  const handlePopState = useCallback(() => {
    if (step === 'select-rooms') {
      goBack()
    } else if (step === 'form') {
      goBack()
    }
  }, [step, goBack])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Browser history management
  useEffect(() => {
    if (!isLoaded) return

    // Push state when step changes
    const stepIndex = ['select-house', 'select-rooms', 'form'].indexOf(step)
    window.history.pushState({ step, stepIndex }, '', `/configuratore`)

    // Listen for popstate (back button)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [step, isLoaded, handlePopState])

  if (!isLoaded) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[#F5F5F7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#48484A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Inizializzazione configuratore...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F5F5F7] flex flex-col">
      {/* Main content - Header del sito è già visibile */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {step === 'select-house' && (
            <motion.div
              key="select-house"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="min-h-[calc(100vh-80px)]"
            >
              <HouseSelector />
            </motion.div>
          )}

          {step === 'select-rooms' && (
            <motion.div
              key="select-rooms"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="min-h-[calc(100vh-80px)]"
            >
              <RoomSelector />
            </motion.div>
          )}

          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="min-h-[calc(100vh-80px)]"
            >
              <QuoteRequestForm onSubmit={onSubmit} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
