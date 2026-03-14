'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import CountUp from '@/components/ui/CountUp'

const grainOverlay = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`

const confrontoSistemi = [
  { parametro: 'Diffusione storica', telaio: 4, xlam: 3, xframe: 2 },
  { parametro: 'Numero costruzioni', telaio: 5, xlam: 4, xframe: 2 },
  { parametro: 'Eurocodice 5', telaio: 4, xlam: 4, xframe: 5 },
  { parametro: 'Prefabbricazione max', telaio: 2, xlam: 3, xframe: 5 },
  { parametro: 'Tempi cantiere', telaio: 2, xlam: 3, xframe: 5 },
  { parametro: 'Capacita dissipativa sismica', telaio: 3, xlam: 4, xframe: 5 },
  { parametro: 'Resistenza al fuoco', telaio: 3, xlam: 4, xframe: 5 },
  { parametro: 'Trasmittanza (parita spessore)', telaio: 3, xlam: 2, xframe: 5 },
  { parametro: 'Sfasamento (parita spessore)', telaio: 2, xlam: 3, xframe: 5 },
  { parametro: 'Tenuta all\'aria', telaio: 2, xlam: 5, xframe: 5 },
  { parametro: 'Sostituibilita parti', telaio: 5, xlam: 2, xframe: 5 },
  { parametro: 'Edifici multipiano', telaio: 2, xlam: 5, xframe: 4 },
  { parametro: 'Flessibilita impiantistica', telaio: 4, xlam: 2, xframe: 5 },
  { parametro: 'Prezzo (parita classe/strutt.)', telaio: 3, xlam: 2, xframe: 5 },
]

const confrontoMuratura = [
  { parametro: 'Tempo struttura', xframe: '3-7 giorni', muratura: '12-48 mesi' },
  { parametro: 'Chiavi in mano', xframe: '30 giorni', muratura: 'Non definibile' },
  { parametro: 'Classe energetica base', xframe: 'A1', muratura: 'B-C (con cappotto)' },
  { parametro: 'Classe energetica max', xframe: 'A4 (passiva)', muratura: 'A1 (raro, costoso)' },
  { parametro: 'Trasmittanza pareti', xframe: '0,159 W/m\u00b2K', muratura: '0,28-0,40 W/m\u00b2K' },
  { parametro: 'Sfasamento', xframe: '18,8 ore', muratura: '8-12 ore' },
  { parametro: 'Antisismicita', xframe: 'Eccellente', muratura: 'Dipende da esecuzione' },
  { parametro: 'Prefabbricazione', xframe: '95%+ in laboratorio', muratura: '0% (cantiere)' },
  { parametro: 'Ponti termici', xframe: 'Eliminati (base XPS)', muratura: 'Presenti' },
  { parametro: 'Controllo qualita', xframe: 'Laboratorio controllato', muratura: 'Cantiere (intemperie)' },
  { parametro: 'Garanzia struttura', xframe: '50 anni', muratura: 'Non standard' },
]

function DotRating({ value, highlight }: { value: number; highlight?: boolean }) {
  return (
    <div className="flex gap-1.5 justify-center">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`w-3 h-3 rounded-full inline-block transition-colors ${
            i < value
              ? highlight
                ? 'bg-[#A0845C]'
                : 'bg-[#1D1D1F]/30'
              : 'bg-[#EDE6DB]'
          }`}
        />
      ))}
    </div>
  )
}

export default function ConfrontoContent() {
  return (
    <div className="min-h-screen">

      {/* ===== HERO ===== */}
      <section className="relative bg-[#1D1D1F] pt-32 pb-24 lg:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: grainOverlay }} />
        <div className="relative max-w-6xl mx-auto">
          <ScrollReveal>
            <nav className="flex items-center gap-2 text-sm text-white/40 mb-10">
              <Link href="/sistema-x-frame" className="hover:text-white/70 transition-colors">Sistema X-Frame</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#A0845C]">Confronto</span>
            </nav>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#A0845C]" />
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">Dati reali, non marketing</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Confronto <span className="text-[#A0845C]">Costruttivo</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/50 max-w-3xl leading-relaxed">
              X-Frame e un ibrido dei sistemi Platform Frame, X-Lam e Post and Beam.
              Confronta i dati reali di prestazione su 14 parametri tecnici rispetto ai sistemi tradizionali e alla muratura.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== TABLE 1: X-Frame vs Telaio vs X-Lam ===== */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#A0845C]" />
              <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">14 parametri tecnici</span>
              <div className="w-8 h-px bg-[#A0845C]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-16">
              X-Frame vs Telaio vs X-Lam
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-white rounded-2xl border border-[#EDE6DB] overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#EDE6DB]">
                      <th className="text-left py-5 px-6 font-bold text-[#1D1D1F]">Parametro</th>
                      <th className="text-center py-5 px-4 font-bold text-[#86868B]">Telaio</th>
                      <th className="text-center py-5 px-4 font-bold text-[#86868B]">X-Lam</th>
                      <th className="text-center py-5 px-4 font-bold text-[#A0845C] bg-[#A0845C]/5">X-Frame</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confrontoSistemi.map((row, i) => (
                      <tr key={row.parametro} className={`border-b border-[#EDE6DB]/60 ${i % 2 !== 0 ? 'bg-[#F5F5F7]/50' : ''}`}>
                        <td className="py-4 px-6 text-[#1D1D1F] font-medium">{row.parametro}</td>
                        <td className="py-4 px-4"><DotRating value={row.telaio} /></td>
                        <td className="py-4 px-4"><DotRating value={row.xlam} /></td>
                        <td className="py-4 px-4 bg-[#A0845C]/5"><DotRating value={row.xframe} highlight /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== TABLE 2: X-Frame vs Muratura ===== */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#A0845C]" />
              <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">Due mondi a confronto</span>
              <div className="w-8 h-px bg-[#A0845C]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-16">
              X-Frame vs Muratura Tradizionale
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="space-y-3">
              {/* Header */}
              <div className="grid grid-cols-3 gap-4 px-6 py-3">
                <div className="text-sm font-bold text-[#86868B] uppercase tracking-wide">Parametro</div>
                <div className="text-sm font-bold text-[#A0845C] uppercase tracking-wide text-center">X-Frame</div>
                <div className="text-sm font-bold text-[#86868B] uppercase tracking-wide text-center">Muratura</div>
              </div>
              {confrontoMuratura.map((row, i) => (
                <motion.div
                  key={row.parametro}
                  className="grid grid-cols-3 gap-4 px-6 py-4 bg-[#F5F5F7] rounded-xl border border-transparent hover:border-[#A0845C]/20 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <div className="text-[#1D1D1F] font-medium text-sm">{row.parametro}</div>
                  <div className="text-center">
                    <span className="font-bold text-[#A0845C] text-sm">{row.xframe}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[#86868B] text-sm">{row.muratura}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PERCHE COSTIAMO DI PIU ===== */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F] overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: grainOverlay }} />
        <div className="relative max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#A0845C]/50" />
                <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">Una questione di valore</span>
                <div className="w-8 h-px bg-[#A0845C]/50" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Perche <span className="text-[#A0845C]">Costiamo di Piu</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-8">
            <ScrollReveal delay={0.1}>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 border-l-4 border-l-[#A0845C]">
                <p className="text-white/70 text-lg leading-relaxed italic mb-4">
                  &ldquo;Il committente deve avere chiare le differenze per fare un paragone obiettivo.
                  Non si possono confrontare pere con mele.&rdquo;
                </p>
                <p className="text-white/40 text-sm">
                  Il prezzo al metro quadro di una casa X-Frame puo sembrare piu alto di una costruzione tradizionale.
                  Ma la differenza si spiega interamente con cio che e incluso: classe energetica A4, antisismicita certificata,
                  prefabbricazione al 95%, 50 anni di garanzia strutturale.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-white font-bold text-xl mb-4">Artigianato sartoriale, non produzione di massa</h3>
                <p className="text-white/50 leading-relaxed">
                  Preferiamo fare poche costruzioni ma con precisione assoluta, sartoriali, artigianali.
                  Ogni elemento viene prodotto nel nostro laboratorio di Spadola a temperatura e umidita controllate.
                  Un livello di controllo qualita impossibile da ottenere in cantiere, dove pioggia, vento e
                  variazioni termiche compromettono lavorazioni e materiali.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-white font-bold text-xl mb-4">Meno tempo in cantiere = meno costo complessivo</h3>
                <p className="text-white/50 leading-relaxed">
                  Rimanendo poco tempo sul cantiere, portando tutti i pezzi gia pronti, riusciamo ad abbattere
                  anche di un 20% il costo complessivo rispetto a prestazioni equivalenti in muratura.
                  30 giorni per le chiavi in mano significa meno esposizione a ritardi meteo, aumenti imprevisti
                  dei prezzi dei materiali e costi di cantiere prolungato.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-white font-bold text-xl mb-4">Costo totale di proprieta</h3>
                <p className="text-white/50 leading-relaxed mb-6">
                  Una casa in classe A4 consuma fino all&apos;80% in meno di energia rispetto a una costruzione tradizionale.
                  In 30 anni il risparmio energetico supera abbondantemente il costo iniziale aggiuntivo.
                  E con una garanzia strutturale di 50 anni, i costi di manutenzione straordinaria sono azzerati.
                </p>
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                  {[
                    { value: 80, suffix: '%', label: 'Risparmio energetico' },
                    { value: 50, suffix: '', label: 'Anni garanzia' },
                    { value: 20, suffix: '%', label: 'Risparmio complessivo' },
                  ].map((stat, i) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-[#A0845C]">
                        <CountUp to={stat.value} duration={2.5} delay={0.5 + i * 0.2} suffix={stat.suffix} />
                      </div>
                      <div className="text-xs text-white/40 mt-2">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="p-6 rounded-2xl bg-[#A0845C]/10 border border-[#A0845C]/20 text-center">
                <p className="text-white/80 text-lg font-medium">
                  50 anni di garanzia sulla struttura parlano da soli.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 lg:py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">
              Configura la tua <span className="text-[#A0845C]">Casa X-Frame</span>
            </h2>
            <p className="text-[#86868B] text-lg mb-8">
              Scegli tipologia, metratura e livello di finitura. Ricevi un preventivo personalizzato in pochi minuti.
            </p>
            <Link
              href="/configuratore"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#A0845C] text-white font-semibold rounded-full hover:bg-[#8B7049] transition-colors"
            >
              Vai al Configuratore
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== NAVIGATION ===== */}
      <section className="py-12 px-6 bg-[#F5F5F7] border-t border-[#EDE6DB]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/sistema-x-frame/trasporto-montaggio" className="group inline-flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Trasporto e Montaggio</span>
          </Link>
          <Link href="/sistema-x-frame" className="group inline-flex items-center gap-2 text-[#A0845C] hover:text-[#8B7049] transition-colors font-medium">
            <span>Sistema X-Frame</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}
