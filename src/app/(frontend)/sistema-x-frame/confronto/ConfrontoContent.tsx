'use client'

import Link from 'next/link'
import {
  ArrowLeft, ChevronRight, CheckCircle, TrendingUp,
  Factory, Timer, ShieldCheck, Banknote
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import BlurText from '@/components/ui/BlurText'
import SectionTransition from '@/components/ui/SectionTransition'
import Button from '@/components/ui/Button'

const confrontoSistemi = [
  { parametro: 'Diffusione storica', telaio: 4, xlam: 3, xframe: 2 },
  { parametro: 'Numero costruzioni', telaio: 5, xlam: 4, xframe: 2 },
  { parametro: 'Eurocodice 5', telaio: 4, xlam: 4, xframe: 5 },
  { parametro: 'Prefabbricazione max', telaio: 2, xlam: 3, xframe: 5 },
  { parametro: 'Tempi cantiere', telaio: 2, xlam: 3, xframe: 5 },
  { parametro: 'Capacit\u00e0 dissipativa sismica', telaio: 3, xlam: 4, xframe: 5 },
  { parametro: 'Resistenza al fuoco', telaio: 3, xlam: 4, xframe: 5 },
  { parametro: 'Trasmittanza (parit\u00e0 spessore)', telaio: 3, xlam: 2, xframe: 5 },
  { parametro: 'Sfasamento (parit\u00e0 spessore)', telaio: 2, xlam: 3, xframe: 5 },
  { parametro: 'Tenuta all\u2019aria', telaio: 2, xlam: 5, xframe: 5 },
  { parametro: 'Sostituibilit\u00e0 parti', telaio: 5, xlam: 2, xframe: 5 },
  { parametro: 'Edifici multipiano', telaio: 2, xlam: 5, xframe: 4 },
  { parametro: 'Flessibilit\u00e0 impiantistica', telaio: 4, xlam: 2, xframe: 5 },
  { parametro: 'Prezzo (parit\u00e0 classe/strutt.)', telaio: 3, xlam: 2, xframe: 5 },
]

const confrontoMuratura = [
  { parametro: 'Tempo struttura', xframe: '3-7 giorni', muratura: '12-48 mesi' },
  { parametro: 'Chiavi in mano', xframe: '30 giorni', muratura: 'Non definibile' },
  { parametro: 'Classe energetica base', xframe: 'A1', muratura: 'B-C (con cappotto)' },
  { parametro: 'Classe energetica max', xframe: 'A4 (passiva)', muratura: 'A1 (raro, costoso)' },
  { parametro: 'Trasmittanza pareti', xframe: '0,159 W/m\u00b2K', muratura: '0,28-0,40 W/m\u00b2K' },
  { parametro: 'Sfasamento', xframe: '18,8 ore', muratura: '8-12 ore' },
  { parametro: 'Antisismicit\u00e0', xframe: 'Eccellente', muratura: 'Dipende da esecuzione' },
  { parametro: 'Prefabbricazione', xframe: '95%+ in laboratorio', muratura: '0% (cantiere)' },
  { parametro: 'Ponti termici', xframe: 'Eliminati (base XPS)', muratura: 'Presenti' },
  { parametro: 'Controllo qualit\u00e0', xframe: 'Laboratorio controllato', muratura: 'Cantiere (intemperie)' },
  { parametro: 'Garanzia struttura', xframe: '50 anni', muratura: 'Non standard' },
]

const valueReasons = [
  {
    icon: Factory,
    title: 'Prefabbricazione = meno costi in cantiere',
    description: 'Il 95% del lavoro avviene in laboratorio controllato. Meno ore in cantiere, meno imprevisti, fino al 20% di risparmio complessivo rispetto a prestazioni equivalenti in muratura.',
  },
  {
    icon: ShieldCheck,
    title: 'Qualit\u00e0 impossibile in cantiere',
    description: 'Temperatura, umidit\u00e0 e tempi di lavorazione monitorati. Ogni elemento viene prodotto con precisione millimetrica, un livello di controllo irraggiungibile all\u2019aperto.',
  },
  {
    icon: Timer,
    title: 'Velocit\u00e0 = meno imprevisti',
    description: '30 giorni per le chiavi in mano significa meno esposizione a ritardi meteo, aumenti dei prezzi dei materiali e costi di cantiere prolungato.',
  },
  {
    icon: Banknote,
    title: 'Costo totale di propriet\u00e0',
    description: 'Una casa in classe A4 consuma fino all\u201980% in meno di energia. In 30 anni il risparmio energetico supera abbondantemente il costo iniziale aggiuntivo.',
  },
]

function StarRating({ value, highlight }: { value: number; highlight?: boolean }) {
  return (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`w-3 h-3 rounded-full inline-block ${
            i < value
              ? highlight
                ? 'bg-[var(--color-primary)]'
                : 'bg-[var(--color-secondary-dark)]/40'
              : 'bg-[#EDE6DB]'
          }`}
        />
      ))}
    </div>
  )
}

export default function ConfrontoContent() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">

      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-[var(--color-secondary-dark)] via-[var(--color-secondary)] to-[var(--color-secondary-dark)] py-28 lg:py-40">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative max-w-6xl mx-auto px-4">
          <ScrollReveal direction="left">
            <nav className="flex items-center gap-2 text-white/60 text-sm mb-8">
              <Link href="/sistema-x-frame" className="hover:text-white transition-colors">Sistema X-Frame</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">Confronto</span>
            </nav>
          </ScrollReveal>

          <BlurText
            text="Confronto Costruttivo"
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8"
            delay={80}
            animateBy="words"
          />

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/70 max-w-3xl">
              L&apos;innovativo X-Frame rappresenta un ibrido dei sistemi costruttivi Platform Frame, X-Lam e Post and Beam. Confronta i dati reali di prestazione su 14 parametri tecnici.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ===== TABLE 1: X-Frame vs Telaio vs X-Lam ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[var(--color-primary)] text-sm tracking-[0.2em] uppercase font-medium">
                14 parametri tecnici
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary-dark)] mt-3">
                X-Frame vs Telaio vs X-Lam
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[var(--color-primary)]/40" />
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                <div className="w-8 h-0.5 bg-[var(--color-primary)]/40" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-2xl border border-[#EDE6DB] overflow-hidden shadow-premium">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#EDE6DB]">
                      <th className="text-left py-4 px-5 font-bold text-[var(--color-secondary-dark)]">Parametro</th>
                      <th className="text-center py-4 px-4 font-bold text-[var(--color-muted)]">Telaio</th>
                      <th className="text-center py-4 px-4 font-bold text-[var(--color-muted)]">X-Lam</th>
                      <th className="text-center py-4 px-4 font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/5">X-Frame</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confrontoSistemi.map((row, i) => (
                      <tr key={row.parametro} className={`border-b border-[#EDE6DB]/60 ${i % 2 === 0 ? '' : 'bg-[var(--color-surface)]/50'}`}>
                        <td className="py-3.5 px-5 text-[var(--color-secondary-dark)] font-medium">{row.parametro}</td>
                        <td className="py-3.5 px-4"><StarRating value={row.telaio} /></td>
                        <td className="py-3.5 px-4"><StarRating value={row.xlam} /></td>
                        <td className="py-3.5 px-4 bg-[var(--color-primary)]/5"><StarRating value={row.xframe} highlight /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ===== TABLE 2: X-Frame vs Muratura ===== */}
      <section className="py-28 lg:py-36 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[var(--color-primary)] text-sm tracking-[0.2em] uppercase font-medium">
                Dati reali di prestazione
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary-dark)] mt-3">
                X-Frame vs Muratura Tradizionale
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[var(--color-primary)]/40" />
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                <div className="w-8 h-0.5 bg-[var(--color-primary)]/40" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-[var(--color-surface)] rounded-2xl border border-[#EDE6DB] overflow-hidden shadow-premium">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#EDE6DB]">
                      <th className="text-left py-4 px-5 font-bold text-[var(--color-secondary-dark)]">Parametro</th>
                      <th className="text-center py-4 px-5 font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/5">X-Frame</th>
                      <th className="text-center py-4 px-5 font-bold text-[var(--color-muted)]">Muratura</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confrontoMuratura.map((row, i) => (
                      <tr key={row.parametro} className={`border-b border-[#EDE6DB]/60 ${i % 2 === 0 ? '' : 'bg-white/60'}`}>
                        <td className="py-3.5 px-5 text-[var(--color-secondary-dark)] font-medium">{row.parametro}</td>
                        <td className="py-3.5 px-5 text-center bg-[var(--color-primary)]/5">
                          <span className="font-semibold text-[var(--color-primary)]">{row.xframe}</span>
                        </td>
                        <td className="py-3.5 px-5 text-center text-[var(--color-muted)]">{row.muratura}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" height={80} />

      {/* ===== PERCHE VALE DI PIU ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[var(--color-secondary-dark)]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="w-16 h-16 bg-[var(--color-primary)]/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                Perch&eacute; vale di pi&ugrave;
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                50 anni di garanzia sulla struttura parlano da soli. Ma c&apos;&egrave; molto di pi&ugrave; dietro il valore di una casa X-Frame.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {valueReasons.map((reason, i) => {
              const Icon = reason.icon
              return (
                <ScrollReveal key={reason.title} delay={i * 0.1}>
                  <div className="p-7 rounded-2xl bg-white/5 border border-white/10 h-full hover:bg-white/8 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[var(--color-primary)]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[var(--color-primary)]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-2">{reason.title}</h3>
                        <p className="text-white/60 text-sm leading-relaxed">{reason.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-14 p-6 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 max-w-3xl mx-auto">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                <p className="text-white/80 leading-relaxed">
                  <strong className="text-white">Garanzia 50 anni sulla struttura.</strong>{' '}
                  Il costo iniziale si ammortizza in pochi anni grazie al risparmio energetico e all&apos;assenza di manutenzione straordinaria.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#A0845C" height={80} />

      {/* ===== CTA ===== */}
      <section className="py-24 lg:py-32 px-4 bg-[var(--color-primary)]">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Configura la tua Casa
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              Scegli tipologia, metratura e livello di finitura. Ricevi un preventivo personalizzato in pochi minuti.
            </p>
            <Button href="/configuratore" variant="secondary" size="lg">
              Vai al Configuratore
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== NAVIGATION ===== */}
      <section className="py-16 px-4 bg-[var(--color-surface)] border-t border-[#EDE6DB]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <Link
            href="/sistema-x-frame/trasporto-montaggio"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-secondary-dark)]/20 text-[var(--color-secondary-dark)] font-semibold rounded-full hover:bg-[var(--color-secondary-dark)]/5 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Trasporto e Montaggio
          </Link>
          <Link
            href="/sistema-x-frame"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-secondary-dark)]/20 text-[var(--color-secondary-dark)] font-semibold rounded-full hover:bg-[var(--color-secondary-dark)]/5 transition-all"
          >
            Sistema X-Frame
          </Link>
        </div>
      </section>

    </div>
  )
}
