'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useConfiguratoreStore } from '@/lib/configuratore-v3/store'
import { calcolaRangePrezzo, formatPrezzo } from '@/lib/configuratore-v3/price-calculator'
import { finiture } from '@/lib/configuratore-v3/configurations'
import { tipologie } from '@/data/tipologie'
import type { ContattoLead } from '@/lib/configuratore-v3/types'

const tettoLabels: Record<string, string> = {
  'piano': 'Piano',
  'una-falda': 'Una Falda',
  'due-falde': 'Due Falde',
}

export default function StepRiepilogo() {
  const { tipologia, modulo, finitura, stanze, tetto, setContatto } = useConfiguratoreStore()

  const [form, setForm] = useState<ContattoLead>({
    nome: '',
    email: '',
    telefono: '',
    localitaTerreno: '',
    note: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContattoLead, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const tipologiaData = tipologie.find((t) => t.id === tipologia)
  const finituraData = finiture.find((f) => f.id === finitura)

  const prezzi = tipologia && modulo && finitura
    ? calcolaRangePrezzo(tipologia, modulo.mq, finitura)
    : null

  const roomCounts = stanze.reduce<Record<string, number>>((acc, s) => {
    acc[s.tipo] = (acc[s.tipo] || 0) + 1
    return acc
  }, {})

  function validate(): boolean {
    const newErrors: Partial<Record<keyof ContattoLead, string>> = {}
    if (!form.nome.trim()) newErrors.nome = 'Campo obbligatorio'
    if (!form.email.trim()) {
      newErrors.email = 'Campo obbligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email non valida'
    }
    if (!form.telefono.trim()) {
      newErrors.telefono = 'Campo obbligatorio'
    } else if (!/^[\d\s+()-]{6,}$/.test(form.telefono)) {
      newErrors.telefono = 'Numero non valido'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function updateField(field: keyof ContattoLead, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setContatto(form)

    const configSummary = [
      `Tipologia: ${tipologiaData?.title ?? tipologia}`,
      `Modulo: ${modulo?.label ?? '—'} (${modulo?.mq ?? 0} m²)`,
      `Finitura: ${finituraData?.label ?? finitura}`,
      `Tetto: ${tettoLabels[tetto] ?? tetto}`,
      `Stanze: ${stanze.map((s) => s.label).join(', ') || '—'}`,
      prezzi ? `Range GA: ${formatPrezzo(prezzi.grezzoAvanzato.min)}–${formatPrezzo(prezzi.grezzoAvanzato.max)}` : '',
      prezzi ? `Range CiM: ${formatPrezzo(prezzi.chiaviInMano.min)}–${formatPrezzo(prezzi.chiaviInMano.max)}` : '',
      form.localitaTerreno ? `Località terreno: ${form.localitaTerreno}` : '',
      form.note ? `Note: ${form.note}` : '',
    ].filter(Boolean).join('\n')

    try {
      const res = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          telefono: form.telefono,
          messaggio: configSummary,
          source: '/configuratore',
          configurazione: {
            tipoCasa: modulo && modulo.livelli > 1 ? '2-piani' : '1-piano',
            numStanze: stanze.filter((s) => s.tipo === 'camera').length,
            metratura: modulo?.mq ?? 0,
          },
        }),
      })

      if (!res.ok) throw new Error('Errore invio')
      setSubmitted(true)
    } catch {
      alert('Errore durante l\'invio. Riprova o contattaci direttamente al (0963) 530945.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleSaveEmail() {
    if (!validate()) return
    setContatto(form)

    const configSummary = [
      `[RICHIESTA RIEPILOGO VIA EMAIL]`,
      `Tipologia: ${tipologiaData?.title ?? tipologia}`,
      `Modulo: ${modulo?.label ?? '—'} (${modulo?.mq ?? 0} m²)`,
      `Finitura: ${finituraData?.label ?? finitura}`,
      `Tetto: ${tettoLabels[tetto] ?? tetto}`,
      `Stanze: ${stanze.map((s) => s.label).join(', ') || '—'}`,
      prezzi ? `Range GA: ${formatPrezzo(prezzi.grezzoAvanzato.min)}–${formatPrezzo(prezzi.grezzoAvanzato.max)}` : '',
      prezzi ? `Range CiM: ${formatPrezzo(prezzi.chiaviInMano.min)}–${formatPrezzo(prezzi.chiaviInMano.max)}` : '',
      form.localitaTerreno ? `Località terreno: ${form.localitaTerreno}` : '',
      form.note ? `Note: ${form.note}` : '',
    ].filter(Boolean).join('\n')

    try {
      const res = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          telefono: form.telefono,
          messaggio: configSummary,
          source: '/configuratore',
          configurazione: {
            tipoCasa: modulo && modulo.livelli > 1 ? '2-piani' : '1-piano',
            numStanze: stanze.filter((s) => s.tipo === 'camera').length,
            metratura: modulo?.mq ?? 0,
          },
        }),
      })

      if (!res.ok) throw new Error('Errore invio')
      setSubmitted(true)
    } catch {
      alert('Errore durante il salvataggio. Riprova o contattaci al (0963) 530945.')
    }
  }

  // Success state
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto flex max-w-md flex-col items-center gap-6 rounded-2xl border border-[#E5E5E7] bg-white p-10 text-center shadow-sm"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#6B8F71]/15">
          <svg className="h-8 w-8 text-[#6B8F71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#1D1D1F]">Grazie!</h3>
        <p className="text-sm leading-relaxed text-[#86868B]">
          Ti contatteremo entro 24 ore per fissare la visita in sede e definire insieme ogni dettaglio del tuo progetto.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-full bg-[#A0845C] px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#8B7049] hover:shadow-lg"
        >
          Torna alla Home
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 gap-8 lg:grid-cols-2"
    >
      {/* Left column: Summary */}
      <div className="rounded-2xl border border-[#E5E5E7] bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-lg font-bold text-[#1D1D1F]">Riepilogo Configurazione</h3>

        <div className="space-y-4 text-sm">
          <SummaryRow label="Tipologia" value={tipologiaData?.title ?? '—'} />
          <SummaryRow label="Dimensione" value={modulo ? `${modulo.label} (${modulo.mq} m\u00B2)` : '—'} />
          <SummaryRow label="Finitura" value={finituraData?.label ?? '—'} />

          {finituraData && (
            <div className="rounded-lg bg-[#FAFAFA] p-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#86868B]">Materiali inclusi</p>
              <ul className="space-y-1">
                {finituraData.materiali.map((m) => (
                  <li key={m} className="flex items-start gap-2 text-xs text-[#48484A]">
                    <span className="mt-1 block h-1 w-1 flex-shrink-0 rounded-full bg-[#A0845C]" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <SummaryRow label="Tipo tetto" value={tettoLabels[tetto] ?? tetto} />

          <SummaryRow
            label="Stanze"
            value={
              [
                roomCounts.camera && `${roomCounts.camera} ${roomCounts.camera === 1 ? 'camera' : 'camere'}`,
                roomCounts.bagno && `${roomCounts.bagno} ${roomCounts.bagno === 1 ? 'bagno' : 'bagni'}`,
                roomCounts.soggiorno && `${roomCounts.soggiorno} soggiorno`,
                roomCounts.cucina && `${roomCounts.cucina} cucina`,
              ]
                .filter(Boolean)
                .join(', ') || '—'
            }
          />

          {/* Prezzi */}
          {prezzi && (
            <div className="mt-4 space-y-3 rounded-xl border border-[#A0845C]/20 bg-[#A0845C]/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A0845C]">Range prezzo indicativo</p>

              <div className="flex items-baseline justify-between">
                <span className="text-sm text-[#48484A]">Grezzo avanzato</span>
                <span className="text-sm font-bold text-[#1D1D1F]">
                  {formatPrezzo(prezzi.grezzoAvanzato.min)} &mdash; {formatPrezzo(prezzi.grezzoAvanzato.max)}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-[#48484A]">Chiavi in mano</span>
                <span className="text-sm font-bold text-[#1D1D1F]">
                  {formatPrezzo(prezzi.chiaviInMano.min)} &mdash; {formatPrezzo(prezzi.chiaviInMano.max)}
                </span>
              </div>
            </div>
          )}

          <p className="pt-2 text-xs italic text-[#86868B]">
            Prezzo indicativo. Il preventivo definitivo viene elaborato dopo la visita in sede.
          </p>
        </div>
      </div>

      {/* Right column: Contact form */}
      <div className="rounded-2xl border border-[#E5E5E7] bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-lg font-bold text-[#1D1D1F]">Prenota la tua visita in sede</h3>

        <AnimatePresence mode="wait">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FormField
              label="Nome e Cognome"
              value={form.nome}
              onChange={(v) => updateField('nome', v)}
              error={errors.nome}
              required
            />
            <FormField
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => updateField('email', v)}
              error={errors.email}
              required
            />
            <FormField
              label="Telefono"
              type="tel"
              value={form.telefono}
              onChange={(v) => updateField('telefono', v)}
              error={errors.telefono}
              required
            />
            <FormField
              label="Localit\u00E0 del terreno"
              value={form.localitaTerreno}
              onChange={(v) => updateField('localitaTerreno', v)}
              placeholder="Es. Provincia di Milano"
            />

            <div>
              <label className="mb-1 block text-sm font-medium text-[#1D1D1F]">Note</label>
              <textarea
                value={form.note}
                onChange={(e) => updateField('note', e.target.value)}
                rows={3}
                placeholder="Domande, richieste particolari..."
                className="w-full rounded-xl border border-[#E5E5E7] bg-[#FAFAFA] px-4 py-3 text-sm text-[#1D1D1F] outline-none transition-colors placeholder:text-[#C7C7CC] focus:border-[#A0845C] focus:ring-1 focus:ring-[#A0845C]/30"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full rounded-full bg-[#A0845C] py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#8B7049] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Invio in corso...' : 'Prenota Visita in Sede'}
            </button>

            <button
              type="button"
              onClick={handleSaveEmail}
              className="w-full rounded-full border-2 border-[#A0845C] bg-transparent py-3 text-sm font-semibold text-[#A0845C] transition-colors hover:bg-[#A0845C]/5"
            >
              Salva e ricevi via email
            </button>
          </form>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ── Helper Components ────────────────────────────────────────────── */

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-[#F5F5F7] pb-2">
      <span className="text-[#86868B]">{label}</span>
      <span className="font-medium text-[#1D1D1F]">{value}</span>
    </div>
  )
}

function FormField({
  label,
  value,
  onChange,
  error,
  type = 'text',
  required,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  error?: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-[#1D1D1F]">
        {label}
        {required && <span className="ml-0.5 text-[#FF3B30]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-[#FAFAFA] px-4 py-3 text-sm text-[#1D1D1F] outline-none transition-colors placeholder:text-[#C7C7CC] focus:ring-1 ${
          error
            ? 'border-[#FF3B30] focus:border-[#FF3B30] focus:ring-[#FF3B30]/30'
            : 'border-[#E5E5E7] focus:border-[#A0845C] focus:ring-[#A0845C]/30'
        }`}
      />
      {error && <p className="mt-1 text-xs text-[#FF3B30]">{error}</p>}
    </div>
  )
}
