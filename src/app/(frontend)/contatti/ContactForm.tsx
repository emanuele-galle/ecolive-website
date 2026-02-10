'use client'

import { useState, useTransition } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { User, Mail, Phone, MessageSquare, CheckCircle2, XCircle, Send, Loader2 } from 'lucide-react'

interface ContactFormProps {
  onSubmit: (formData: FormData) => Promise<{ success: boolean; message: string }>
}

const inputClasses =
  'w-full pl-12 pr-4 py-4 bg-[var(--color-surface)] border-2 border-transparent rounded-xl text-[var(--color-text)] placeholder:text-[var(--color-muted-light)] transition-all duration-300 focus:bg-white focus:border-[var(--color-primary)]/30 focus:shadow-lg focus:shadow-[var(--color-primary)]/10 disabled:bg-gray-100 disabled:cursor-not-allowed outline-none'

const iconClasses =
  'absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-light)] transition-colors duration-300 group-focus-within:text-[var(--color-primary)]'

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const response = await onSubmit(formData)
      setResult(response)

      if (response.success) {
        const form = document.getElementById('contact-form') as HTMLFormElement
        form?.reset()
        setTimeout(() => setResult(null), 5000)
      }
    })
  }

  return (
    <>
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.4 }}
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
        {/* Nome */}
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Nome e Cognome <span className="text-[var(--color-primary)]">*</span>
          </label>
          <div className="relative group">
            <User className={iconClasses} />
            <input
              type="text"
              id="nome"
              name="nome"
              required
              disabled={isPending}
              className={inputClasses}
              placeholder="Mario Rossi"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Email <span className="text-[var(--color-primary)]">*</span>
          </label>
          <div className="relative group">
            <Mail className={iconClasses} />
            <input
              type="email"
              id="email"
              name="email"
              required
              disabled={isPending}
              className={inputClasses}
              placeholder="mario.rossi@example.com"
            />
          </div>
        </div>

        {/* Telefono */}
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Telefono
          </label>
          <div className="relative group">
            <Phone className={iconClasses} />
            <input
              type="tel"
              id="telefono"
              name="telefono"
              disabled={isPending}
              className={inputClasses}
              placeholder="+39 123 456 7890"
            />
          </div>
        </div>

        {/* Messaggio */}
        <div>
          <label htmlFor="messaggio" className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Messaggio <span className="text-[var(--color-primary)]">*</span>
          </label>
          <div className="relative group">
            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-[var(--color-muted-light)] transition-colors duration-300 group-focus-within:text-[var(--color-primary)]" />
            <textarea
              id="messaggio"
              name="messaggio"
              required
              rows={5}
              disabled={isPending}
              className={`${inputClasses} resize-none`}
              placeholder="Descrivi il tuo progetto o la tua richiesta..."
            />
          </div>
        </div>

        {/* Privacy */}
        <div className="flex items-start gap-3 p-4 bg-[var(--color-surface)] rounded-xl">
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
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-8 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold rounded-xl shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-xl hover:shadow-[var(--color-primary)]/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-3"
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Invio in corso...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Invia messaggio
            </>
          )}
        </button>

        <p className="text-xs text-[var(--color-muted-light)] text-center pt-2">
          <span className="text-[var(--color-primary)]">*</span> Campi obbligatori
        </p>
      </form>
    </>
  )
}
