'use client'

import { useMemo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, ChevronRight, X } from 'lucide-react'
import { useConfigurator } from '../hooks/useConfigurator'
import { getModulePreset, formatPrice, formatSquareMeters, GRID_CELL_SIZE } from '@/lib/configuratore/constants'

interface PriceBarProps {
  onRequestQuote?: () => void
}

export default function PriceBar({ onRequestQuote }: PriceBarProps) {
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const placedModules = useConfigurator((state) => state.placedModules)

  // Calcola totali
  const { totalSqm, totalPrice, moduleCount } = useMemo(() => {
    const sqm = placedModules.reduce((total, module) => {
      const preset = getModulePreset(module.presetId)
      if (!preset) return total
      return total + preset.cellsX * preset.cellsZ * GRID_CELL_SIZE * GRID_CELL_SIZE
    }, 0)

    const price = placedModules.reduce((total, module) => {
      const preset = getModulePreset(module.presetId)
      if (!preset) return total
      return total + preset.basePrice
    }, 0)

    return {
      totalSqm: sqm,
      totalPrice: price,
      moduleCount: placedModules.length,
    }
  }, [placedModules])

  const handleRequestQuote = useCallback(() => {
    if (onRequestQuote) {
      onRequestQuote()
    } else {
      setShowQuoteModal(true)
    }
  }, [onRequestQuote])

  if (moduleCount === 0) return null

  return (
    <>
      {/* Sticky Price Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#1D3D2D] rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Stats */}
            <div className="flex items-center gap-6">
              <div>
                <span className="text-xs text-white/60 block">Superficie</span>
                <motion.span
                  key={totalSqm}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-xl font-bold text-white"
                >
                  {formatSquareMeters(totalSqm)}
                </motion.span>
              </div>

              <div className="w-px h-10 bg-white/20" />

              <div>
                <span className="text-xs text-white/60 block">Stima prezzo</span>
                <motion.span
                  key={totalPrice}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-xl font-bold text-[#B85C38]"
                >
                  {formatPrice(totalPrice)}
                </motion.span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleRequestQuote}
              className="flex items-center gap-2 px-5 py-3 bg-[#B85C38] hover:bg-[#A04D2E] text-white rounded-xl font-medium transition-colors shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>Richiedi Preventivo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-[10px] text-white/40 mt-2">
            *Prezzo indicativo. Il preventivo finale dipende da finiture e personalizzazioni.
          </p>
        </div>
      </motion.div>

      {/* Quote Request Modal */}
      <AnimatePresence>
        {showQuoteModal && (
          <QuoteRequestModal
            totalSqm={totalSqm}
            totalPrice={totalPrice}
            moduleCount={moduleCount}
            onClose={() => setShowQuoteModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function QuoteRequestModal({
  totalSqm,
  totalPrice,
  moduleCount,
  onClose,
}: {
  totalSqm: number
  totalPrice: number
  moduleCount: number
  onClose: () => void
}) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simula invio (in produzione: chiamata API)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Chiudi dopo 2 secondi
    setTimeout(onClose, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Richiesta Inviata!</h3>
            <p className="text-gray-500">Ti contatteremo al più presto.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="px-6 pt-6 pb-4">
              <h3 className="text-xl font-bold text-gray-900">Richiedi Preventivo</h3>
              <p className="text-sm text-gray-500 mt-1">
                Compila il form e ti invieremo un preventivo dettagliato
              </p>
            </div>

            {/* Summary */}
            <div className="mx-6 mb-4 p-4 bg-[#FAF9F7] rounded-xl">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{moduleCount} moduli • {formatSquareMeters(totalSqm)}</span>
                <span className="font-bold text-[#B85C38]">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome e Cognome *
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#48484A] focus:border-transparent outline-none transition-all"
                  placeholder="Mario Rossi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#48484A] focus:border-transparent outline-none transition-all"
                  placeholder="mario@esempio.it"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefono
                </label>
                <input
                  type="tel"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#48484A] focus:border-transparent outline-none transition-all"
                  placeholder="+39 333 123 4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note aggiuntive
                </label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#48484A] focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Hai esigenze particolari?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#48484A] hover:bg-[#1D3D2D] disabled:bg-gray-400 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Invia Richiesta
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Inviando accetti la nostra{' '}
                <a href="/privacy" className="underline">Privacy Policy</a>
              </p>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
