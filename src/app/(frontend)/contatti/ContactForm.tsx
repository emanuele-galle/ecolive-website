'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { User, Mail, Phone, MessageSquare, CheckCircle2, XCircle, Send, Loader2 } from 'lucide-react'

interface ContactFormProps {
  onSubmit: (formData: FormData) => Promise<{ success: boolean; message: string }>
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const response = await onSubmit(formData)
      setResult(response)

      // Reset form on success
      if (response.success) {
        const form = document.getElementById('contact-form') as HTMLFormElement
        form?.reset()

        // Clear result after 5 seconds on success
        setTimeout(() => setResult(null), 5000)
      }
    })
  }

  const inputClasses = (fieldName: string) => `
    w-full pl-12 pr-4 py-4
    bg-[var(--color-surface)]
    border-2 border-transparent
    rounded-xl
    text-[var(--color-text)]
    placeholder:text-[var(--color-muted-light)]
    transition-all duration-300
    focus:bg-white focus:border-[var(--color-primary)]/30 focus:shadow-lg focus:shadow-[var(--color-primary)]/10
    disabled:bg-gray-100 disabled:cursor-not-allowed
    outline-none
    ${focusedField === fieldName ? 'bg-white border-[var(--color-primary)]/30 shadow-lg shadow-[var(--color-primary)]/10' : ''}
  `

  const iconClasses = (fieldName: string) => `
    absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5
    transition-colors duration-300
    ${focusedField === fieldName ? 'text-[var(--color-primary)]' : 'text-[var(--color-muted-light)]'}
  `

  return (
    <>
      {/* Result Message */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.5 }}
            className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
              result.success
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            {result.success ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                {result.success ? 'Inviato!' : 'Errore'}
              </p>
              <p className={`text-sm ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                {result.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form id="contact-form" action={handleSubmit} className="space-y-5">
        {/* Nome e Cognome */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label htmlFor="nome" className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Nome e Cognome <span className="text-[var(--color-primary)]">*</span>
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
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Email <span className="text-[var(--color-primary)]">*</span>
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
        </motion.div>

        {/* Telefono */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label htmlFor="telefono" className="block text-sm font-medium text-[var(--color-text)] mb-2">
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
        </motion.div>

        {/* Messaggio */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <label htmlFor="messaggio" className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Messaggio <span className="text-[var(--color-primary)]">*</span>
          </label>
          <div className="relative">
            <MessageSquare className={`absolute left-4 top-4 w-5 h-5 transition-colors duration-300 ${focusedField === 'messaggio' ? 'text-[var(--color-primary)]' : 'text-[var(--color-muted-light)]'}`} />
            <textarea
              id="messaggio"
              name="messaggio"
              required
              rows={5}
              disabled={isPending}
              onFocus={() => setFocusedField('messaggio')}
              onBlur={() => setFocusedField(null)}
              className={`
                w-full pl-12 pr-4 py-4
                bg-[var(--color-surface)]
                border-2 border-transparent
                rounded-xl
                text-[var(--color-text)]
                placeholder:text-[var(--color-muted-light)]
                transition-all duration-300
                focus:bg-white focus:border-[var(--color-primary)]/30 focus:shadow-lg focus:shadow-[var(--color-primary)]/10
                disabled:bg-gray-100 disabled:cursor-not-allowed
                outline-none resize-none
                ${focusedField === 'messaggio' ? 'bg-white border-[var(--color-primary)]/30 shadow-lg shadow-[var(--color-primary)]/10' : ''}
              `}
              placeholder="Descrivi il tuo progetto o la tua richiesta..."
            />
          </div>
        </motion.div>

        {/* Privacy Checkbox */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-start gap-3 p-4 bg-[var(--color-surface)] rounded-xl"
        >
          <input
            type="checkbox"
            id="privacy"
            name="privacy"
            required
            disabled={isPending}
            className="mt-1 w-5 h-5 text-[var(--color-primary)] border-[var(--color-border)] rounded focus:ring-[var(--color-primary)] focus:ring-2 disabled:cursor-not-allowed cursor-pointer"
          />
          <label htmlFor="privacy" className="text-sm text-[var(--color-muted)] leading-relaxed cursor-pointer">
            Accetto la{' '}
            <Link href="/privacy-policy" className="text-[var(--color-primary)] hover:underline font-medium">
              privacy policy
            </Link>{' '}
            e autorizzo il trattamento dei miei dati personali{' '}
            <span className="text-[var(--color-primary)]">*</span>
          </label>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <motion.button
            type="submit"
            disabled={isPending}
            whileHover={{ scale: isPending ? 1 : 1.02 }}
            whileTap={{ scale: isPending ? 1 : 0.98 }}
            className="w-full group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white font-semibold rounded-xl shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-xl hover:shadow-[var(--color-primary)]/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-3"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <span className="relative z-10 flex items-center gap-3">
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Invio in corso...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  Invia messaggio
                </>
              )}
            </span>
          </motion.button>
        </motion.div>

        {/* Required fields note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs text-[var(--color-muted-light)] text-center pt-2"
        >
          <span className="text-[var(--color-primary)]">*</span> Campi obbligatori
        </motion.p>
      </form>
    </>
  )
}
