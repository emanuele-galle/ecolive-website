'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, MousePointerClick, Move, RotateCcw, X } from 'lucide-react'
import { useConfigurator } from '../hooks/useConfigurator'

// Solo 3 step essenziali
const ONBOARDING_STEPS = [
  {
    id: 'preset',
    title: 'Scegli un punto di partenza',
    description: 'Seleziona una configurazione preset oppure inizia con una griglia vuota.',
    Icon: Home,
    color: '#2D5A47',
  },
  {
    id: 'place',
    title: 'Click + Click',
    description: 'Clicca su un modulo nella sidebar, poi clicca su una cella della griglia per piazzarlo.',
    Icon: MousePointerClick,
    color: '#B85C38',
  },
  {
    id: 'edit',
    title: 'Modifica liberamente',
    description: 'Trascina i moduli per spostarli. Premi R per ruotare, Canc per eliminare.',
    Icon: Move,
    color: '#5A9CAD',
  },
]

export default function OnboardingTour() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const moduleCount = useConfigurator((state) => state.placedModules.length)

  // Mostra onboarding solo prima volta (dopo che PresetStarter è stato chiuso)
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('ecolive-onboarding-v2')
    const hasSeenStarter = sessionStorage.getItem('ecolive-starter-seen')

    // Mostra solo se:
    // 1. Non ha visto l'onboarding
    // 2. Ha già visto (o saltato) il preset starter
    // 3. Ha pochi moduli (potrebbe essere un preset)
    if (!hasSeenOnboarding && hasSeenStarter && moduleCount <= 5) {
      const timer = setTimeout(() => setShowOnboarding(true), 500)
      return () => clearTimeout(timer)
    }
  }, [moduleCount])

  const handleNext = useCallback(() => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      handleClose()
    }
  }, [currentStep])

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  const handleClose = useCallback(() => {
    setShowOnboarding(false)
    localStorage.setItem('ecolive-onboarding-v2', 'true')
  }, [])

  // Chiudi con ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    if (showOnboarding) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showOnboarding, handleClose, handleNext, handlePrev])

  if (!showOnboarding) return null

  const step = ONBOARDING_STEPS[currentStep]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        {/* Backdrop con spotlight effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal compatto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Progress bar */}
          <div className="h-1 bg-gray-100">
            <motion.div
              className="h-full bg-gradient-to-r from-[#2D5A47] to-[#B85C38]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / ONBOARDING_STEPS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-6">
            {/* Icon */}
            <motion.div
              key={step.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: `${step.color}15` }}
            >
              <step.Icon className="w-8 h-8" style={{ color: step.color }} />
            </motion.div>

            {/* Content */}
            <motion.div
              key={`content-${step.id}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </motion.div>

            {/* Step indicators */}
            <div className="flex justify-center gap-2 my-6">
              {ONBOARDING_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`
                    h-2 rounded-full transition-all duration-300
                    ${i === currentStep
                      ? 'w-8 bg-[#2D5A47]'
                      : i < currentStep
                      ? 'w-2 bg-[#2D5A47]/40'
                      : 'w-2 bg-gray-200'
                    }
                  `}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {currentStep > 0 ? (
                <button
                  onClick={handlePrev}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Indietro
                </button>
              ) : (
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Salta
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex-1 px-4 py-2.5 bg-[#2D5A47] text-white rounded-xl text-sm font-medium hover:bg-[#1D3D2D] transition-colors shadow-lg shadow-[#2D5A47]/25"
              >
                {currentStep === ONBOARDING_STEPS.length - 1 ? 'Inizia!' : 'Avanti'}
              </button>
            </div>
          </div>

          {/* Footer tip */}
          <div className="px-6 py-3 bg-gray-50 text-center">
            <span className="text-xs text-gray-400">
              Usa ← → per navigare, ESC per chiudere
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
