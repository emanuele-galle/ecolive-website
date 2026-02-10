'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Trash2,
  Download,
  FileJson,
  Image,
  Copy,
  Check,
  ChevronDown,
  MoreVertical,
  RotateCcw,
  HelpCircle,
  AlertTriangle,
  X,
} from 'lucide-react'
import { useConfigurator } from '../hooks/useConfigurator'
import { useExportConfig } from '../hooks/useExportConfig'

export default function ActionBar() {
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [showOptionsMenu, setShowOptionsMenu] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const hardReset = useConfigurator((state) => state.hardReset)
  const resetView = useConfigurator((state) => state.resetView)
  const clearAll = useConfigurator((state) => state.clearAll)
  const placedModules = useConfigurator((state) => state.placedModules)
  const moduleCount = placedModules.length

  const { exportJSON, exportScreenshot, copyToClipboard } = useExportConfig()

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard()
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [copyToClipboard])

  const handleHardReset = useCallback(() => {
    setShowConfirmModal(true)
    setShowOptionsMenu(false)
  }, [])

  const confirmHardReset = useCallback(() => {
    hardReset()
    setShowConfirmModal(false)
  }, [hardReset])

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Options menu (reset, help) */}
        <div className="relative">
          <button
            onClick={() => setShowOptionsMenu(!showOptionsMenu)}
            className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
            title="Opzioni"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {showOptionsMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowOptionsMenu(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
                >
                  <div className="p-1">
                    <button
                      onClick={() => {
                        resetView()
                        setShowOptionsMenu(false)
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Home className="w-4 h-4 text-gray-400" />
                      Reset Vista
                    </button>

                    <button
                      onClick={() => {
                        clearAll()
                        setShowOptionsMenu(false)
                      }}
                      disabled={moduleCount === 0}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RotateCcw className="w-4 h-4 text-gray-400" />
                      Pulisci Griglia
                    </button>

                    <div className="border-t border-gray-100 my-1" />

                    <button
                      onClick={handleHardReset}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Ricomincia da Zero
                    </button>

                    <div className="border-t border-gray-100 my-1" />

                    <button
                      onClick={() => {
                        localStorage.removeItem('ecolive-onboarding-v2')
                        sessionStorage.removeItem('ecolive-starter-seen')
                        window.location.reload()
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                      Mostra Tutorial
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Export menu */}
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            disabled={moduleCount === 0}
            className="flex items-center gap-2 px-4 py-2 bg-[#48484A] text-white rounded-lg shadow-sm hover:bg-[#1D3D2D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span className="font-medium text-sm">Esporta</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showExportMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowExportMenu(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
                >
                  <div className="p-1">
                    <button
                      onClick={() => {
                        exportJSON()
                        setShowExportMenu(false)
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <FileJson className="w-4 h-4 text-gray-400" />
                      <div className="text-left">
                        <span className="font-medium block">Esporta JSON</span>
                        <span className="text-xs text-gray-400">Dati configurazione</span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        exportScreenshot()
                        setShowExportMenu(false)
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Image className="w-4 h-4 text-gray-400" />
                      <div className="text-left">
                        <span className="font-medium block">Screenshot PNG</span>
                        <span className="text-xs text-gray-400">Immagine della scena</span>
                      </div>
                    </button>

                    <div className="border-t border-gray-100 my-1" />

                    <button
                      onClick={() => {
                        handleCopy()
                        setShowExportMenu(false)
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                      <div className="text-left">
                        <span className="font-medium block">
                          {copied ? 'Copiato!' : 'Copia Riepilogo'}
                        </span>
                        <span className="text-xs text-gray-400">Testo per condividere</span>
                      </div>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Confirm Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowConfirmModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden"
            >
              <button
                onClick={() => setShowConfirmModal(false)}
                className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-red-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                  Ricominciare da zero?
                </h3>
                <p className="text-gray-500 text-center mb-6">
                  Questa azione cancellerà tutti i moduli piazzati e i dati salvati. Non potrà essere annullata.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  >
                    Annulla
                  </button>
                  <button
                    onClick={confirmHardReset}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
                  >
                    Conferma
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
