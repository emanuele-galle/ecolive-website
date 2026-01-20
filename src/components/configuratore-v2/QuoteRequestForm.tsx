'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from 'lucide-react'
import { useConfiguratorV2 } from './hooks/useConfiguratorV2'
import ConfigSummary from './ConfigSummary'
import { houseConfigurations, getRoomImage } from '@/lib/configuratore-v2/configurations'
import type { SubmitQuoteResult } from '@/lib/configuratore-v2/types'

interface QuoteRequestFormProps {
  onSubmit: (formData: FormData) => Promise<SubmitQuoteResult>
}

export default function QuoteRequestForm({ onSubmit }: QuoteRequestFormProps) {
  const { selectedHouse, selectedRooms, selectedConfig, goBack, reset } = useConfiguratorV2()

  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<SubmitQuoteResult | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  if (!selectedHouse || !selectedRooms || !selectedConfig) return null

  const houseConfig = houseConfigurations[selectedHouse]
  const backgroundImage = getRoomImage(selectedHouse, selectedRooms)

  const handleSubmit = async (formData: FormData) => {
    // Add configuration data to form
    formData.set('tipoCasa', selectedHouse)
    formData.set('numStanze', String(selectedRooms))
    formData.set('metratura', String(selectedConfig.sqm))
    formData.set('source', '/configuratore')

    // Auto-generate message if empty
    const message = formData.get('messaggio') as string
    if (!message || message.trim() === '') {
      formData.set(
        'messaggio',
        `Richiesta preventivo dal configuratore:\n- Tipo casa: ${houseConfig.label}\n- Camere: ${selectedRooms}\n- Metratura: ~${selectedConfig.sqm} mq\n- Composizione: ${selectedConfig.composition}`
      )
    } else {
      formData.set(
        'messaggio',
        `${message}\n\n---\nConfigurazione selezionata:\n- Tipo casa: ${houseConfig.label}\n- Camere: ${selectedRooms}\n- Metratura: ~${selectedConfig.sqm} mq\n- Composizione: ${selectedConfig.composition}`
      )
    }

    startTransition(async () => {
      const response = await onSubmit(formData)
      setResult(response)

      if (response.success) {
        const form = document.getElementById('quote-form') as HTMLFormElement
        form?.reset()
      }
    })
  }

  const inputClasses = (fieldName: string) => `
    w-full pl-12 pr-4 py-4
    bg-gray-50
    border-2 border-transparent
    rounded-xl
    text-[#1E3D30]
    placeholder:text-gray-400
    transition-all duration-300
    focus:bg-white focus:border-[#C4704B]/30 focus:shadow-lg focus:shadow-[#C4704B]/10
    disabled:bg-gray-100 disabled:cursor-not-allowed
    outline-none
    ${focusedField === fieldName ? 'bg-white border-[#C4704B]/30 shadow-lg shadow-[#C4704B]/10' : ''}
  `

  const iconClasses = (fieldName: string) => `
    absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5
    transition-colors duration-300
    ${focusedField === fieldName ? 'text-[#C4704B]' : 'text-gray-400'}
  `

  // Success state
  if (result?.success) {
    return (
      <motion.div
        className="h-full w-full flex items-center justify-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-md text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
          >
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </motion.div>

          <h2 className="text-2xl font-bold text-[#1E3D30] mb-3">Richiesta Inviata!</h2>
          <p className="text-gray-600 mb-8">{result.message}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1E3D30] text-white rounded-xl hover:bg-[#2D5A47] transition-colors"
            >
              Torna alla Home
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Nuova Configurazione
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="min-h-[calc(100vh-80px)] w-full flex flex-col lg:flex-row relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image (desktop) */}
      <div className="hidden lg:block absolute inset-0 lg:relative lg:flex-1">
        <Image
          src={backgroundImage}
          alt={`${houseConfig.label} - ${selectedRooms} camere`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3D30]/70 via-[#1E3D30]/40 to-transparent" />

        {/* Back button - top-28 per evitare conflitto con Header */}
        <motion.button
          onClick={goBack}
          className="absolute top-28 left-8 flex items-center gap-2 px-5 py-2.5 bg-white text-[#1E3D30] rounded-full shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-semibold">Modifica</span>
        </motion.button>

        {/* Summary card (desktop) */}
        <div className="absolute bottom-8 left-8 w-80 z-10">
          <ConfigSummary onEdit={goBack} />
        </div>
      </div>

      {/* Form Panel */}
      <motion.div
        className="relative z-10 flex-1 lg:flex-none lg:w-[500px] xl:w-[550px] bg-white lg:rounded-l-[32px] shadow-2xl overflow-hidden flex flex-col"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Header */}
        <div className="p-6 lg:p-8 border-b border-gray-100">
          {/* Mobile back button */}
          <button
            onClick={goBack}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 text-[#1E3D30] rounded-full hover:bg-gray-200 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-semibold">Modifica configurazione</span>
          </button>

          {/* Mobile summary card */}
          <div className="lg:hidden mb-6">
            <ConfigSummary onEdit={goBack} />
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-[#1E3D30]">
            Richiedi Preventivo
          </h2>
          <p className="text-gray-500 mt-2">
            Compila il form e riceverai un preventivo personalizzato
          </p>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-auto p-6 lg:p-8">
          {/* Error message */}
          <AnimatePresence>
            {result && !result.success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3"
              >
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800">Errore</p>
                  <p className="text-sm text-red-700">{result.message}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form id="quote-form" action={handleSubmit} className="space-y-5">
            {/* Nome */}
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-[#1E3D30] mb-2">
                Nome e Cognome <span className="text-[#C4704B]">*</span>
              </label>
              <div className="relative">
                <User className={iconClasses('nome')} />
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  disabled={isPending}
                  onFocus={() => setFocusedField('nome')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses('nome')}
                  placeholder="Mario Rossi"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1E3D30] mb-2">
                Email <span className="text-[#C4704B]">*</span>
              </label>
              <div className="relative">
                <Mail className={iconClasses('email')} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={isPending}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses('email')}
                  placeholder="mario.rossi@example.com"
                />
              </div>
            </div>

            {/* Telefono */}
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-[#1E3D30] mb-2">
                Telefono
              </label>
              <div className="relative">
                <Phone className={iconClasses('telefono')} />
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  disabled={isPending}
                  onFocus={() => setFocusedField('telefono')}
                  onBlur={() => setFocusedField(null)}
                  className={inputClasses('telefono')}
                  placeholder="+39 123 456 7890"
                />
              </div>
            </div>

            {/* Messaggio */}
            <div>
              <label htmlFor="messaggio" className="block text-sm font-medium text-[#1E3D30] mb-2">
                Note aggiuntive
              </label>
              <div className="relative">
                <MessageSquare
                  className={`absolute left-4 top-4 w-5 h-5 transition-colors duration-300 ${
                    focusedField === 'messaggio' ? 'text-[#C4704B]' : 'text-gray-400'
                  }`}
                />
                <textarea
                  id="messaggio"
                  name="messaggio"
                  rows={3}
                  disabled={isPending}
                  onFocus={() => setFocusedField('messaggio')}
                  onBlur={() => setFocusedField(null)}
                  className={`
                    w-full pl-12 pr-4 py-4
                    bg-gray-50
                    border-2 border-transparent
                    rounded-xl
                    text-[#1E3D30]
                    placeholder:text-gray-400
                    transition-all duration-300
                    focus:bg-white focus:border-[#C4704B]/30 focus:shadow-lg focus:shadow-[#C4704B]/10
                    disabled:bg-gray-100 disabled:cursor-not-allowed
                    outline-none resize-none
                    ${focusedField === 'messaggio' ? 'bg-white border-[#C4704B]/30 shadow-lg shadow-[#C4704B]/10' : ''}
                  `}
                  placeholder="Eventuali richieste particolari..."
                />
              </div>
            </div>

            {/* Privacy */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                required
                disabled={isPending}
                className="mt-1 w-5 h-5 text-[#C4704B] border-gray-300 rounded focus:ring-[#C4704B] focus:ring-2 disabled:cursor-not-allowed cursor-pointer"
              />
              <label htmlFor="privacy" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                Accetto la{' '}
                <Link href="/privacy" className="text-[#C4704B] hover:underline font-medium">
                  privacy policy
                </Link>{' '}
                e autorizzo il trattamento dei miei dati personali{' '}
                <span className="text-[#C4704B]">*</span>
              </label>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isPending}
              whileHover={{ scale: isPending ? 1 : 1.02 }}
              whileTap={{ scale: isPending ? 1 : 0.98 }}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#C4704B] text-white font-semibold rounded-xl shadow-lg shadow-[#C4704B]/25 hover:bg-[#B35F3A] disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Invio in corso...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Invia Richiesta
                </>
              )}
            </motion.button>

            <p className="text-xs text-gray-400 text-center">
              <span className="text-[#C4704B]">*</span> Campi obbligatori
            </p>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}
