'use client'

import { useState, useEffect, useCallback } from 'react'
import { useConfigurator } from '../hooks/useConfigurator'

interface Hint {
  id: string
  message: string
  icon: string
}

export default function ContextualHints() {
  const moduleCount = useConfigurator((state) => state.placedModules.length)
  const selectedModuleId = useConfigurator((state) => state.selectedModuleId)
  const interaction = useConfigurator((state) => state.interaction)

  const [currentHint, setCurrentHint] = useState<Hint | null>(null)
  const [dismissedHints, setDismissedHints] = useState<Set<string>>(new Set())
  const [isVisible, setIsVisible] = useState(false)

  // Carica hints dismissati da localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ecolive-dismissed-hints')
    if (saved) {
      setDismissedHints(new Set(JSON.parse(saved)))
    }
  }, [])

  // Salva hints dismissati
  const dismissHint = useCallback((hintId: string) => {
    setDismissedHints((prev) => {
      const newSet = new Set([...prev, hintId])
      localStorage.setItem('ecolive-dismissed-hints', JSON.stringify([...newSet]))
      return newSet
    })
    setIsVisible(false)
  }, [])

  // Determina quale hint mostrare
  useEffect(() => {
    // Non mostrare hints se c'è l'onboarding attivo
    const hasSeenOnboarding = localStorage.getItem('ecolive-onboarding-seen')
    if (!hasSeenOnboarding) {
      setCurrentHint(null)
      return
    }

    // Non mostrare durante il drag o quando c'è un preset selezionato
    if (interaction.draggingInstanceId || interaction.selectedPresetId) {
      setIsVisible(false)
      return
    }

    let hint: Hint | null = null

    // Hint: nessun modulo
    if (moduleCount === 0 && !dismissedHints.has('first-module')) {
      hint = {
        id: 'first-module',
        message: 'Trascina un modulo dalla sidebar per iniziare a costruire',
        icon: '👆',
      }
    }
    // Hint: modulo selezionato
    else if (selectedModuleId && !dismissedHints.has('selected-module')) {
      hint = {
        id: 'selected-module',
        message: 'Premi R per ruotare, Canc per eliminare',
        icon: '⌨️',
      }
    }
    // Hint: 3+ moduli
    else if (moduleCount >= 3 && !dismissedHints.has('export-hint')) {
      hint = {
        id: 'export-hint',
        message: 'Puoi esportare la configurazione dal menu in alto a destra',
        icon: '💾',
      }
    }

    setCurrentHint(hint)

    // Mostra con animazione
    if (hint) {
      const timer = setTimeout(() => setIsVisible(true), 300)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [moduleCount, selectedModuleId, dismissedHints, interaction.draggingInstanceId, interaction.selectedPresetId])

  if (!currentHint || !isVisible) return null

  return (
    <div
      className={`
        fixed bottom-24 left-1/2 -translate-x-1/2 z-40
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <div className="bg-[var(--color-secondary-darker)] text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-3 max-w-md">
        <span className="text-xl">{currentHint.icon}</span>
        <span className="text-sm font-medium">{currentHint.message}</span>
        <button
          onClick={() => dismissHint(currentHint.id)}
          className="ml-2 text-white/60 hover:text-white transition-colors flex-shrink-0"
          title="Nascondi"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
