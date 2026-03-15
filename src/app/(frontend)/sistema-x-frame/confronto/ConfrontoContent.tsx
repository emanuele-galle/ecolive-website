'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Factory,
  Sparkles,
  TrendingDown,
  Award,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import CountUp from '@/components/ui/CountUp'
import GlassCard from '@/components/ui/GlassCard'

const grainOverlay = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`

const confrontoSistemi = [
  { parametro: 'Diffusione storica', telaio: 4, xlam: 3, xframe: 2 },
  { parametro: 'Numero costruzioni', telaio: 5, xlam: 4, xframe: 2 },
  { parametro: 'Eurocodice 5', telaio: 4, xlam: 4, xframe: 5 },
  { parametro: 'Prefabbricazione max', telaio: 2, xlam: 3, xframe: 5 },
  { parametro: 'Tempi cantiere', telaio: 2, xlam: 3, xframe: 5 },
  { parametro: 'Capacit\u00E0 dissipativa sismica', telaio: 3, xlam: 4, xframe: 5 },
  { parametro: 'Resistenza al fuoco', telaio: 3, xlam: 4, xframe: 5 },
  { parametro: 'Trasmittanza (parit\u00E0 spessore)', telaio: 3, xlam: 2, xframe: 5 },
  { parametro: 'Sfasamento (parit\u00E0 spessore)', telaio: 2, xlam: 3, xframe: 5 },
  { parametro: 'Tenuta all\'aria', telaio: 2, xlam: 5, xframe: 5 },
  { parametro: 'Sostituibilit\u00E0 parti', telaio: 5, xlam: 2, xframe: 5 },
  { parametro: 'Edifici multipiano', telaio: 2, xlam: 5, xframe: 4 },
  { parametro: 'Flessibilit\u00E0 impiantistica', telaio: 4, xlam: 2, xframe: 5 },
  { parametro: 'Prezzo (parit\u00E0 classe/strutt.)', telaio: 3, xlam: 2, xframe: 5 },
]

const confrontoMuratura = [
  { parametro: 'Tempo struttura', xframe: '3-7 giorni', muratura: '12-48 mesi', xframeWins: true },
  { parametro: 'Chiavi in mano', xframe: '30 giorni', muratura: 'Non definibile', xframeWins: true },
  { parametro: 'Classe energetica base', xframe: 'A1', muratura: 'B-C (con cappotto)', xframeWins: true },
  { parametro: 'Classe energetica max', xframe: 'A4 (passiva)', muratura: 'A1 (raro, costoso)', xframeWins: true },
  { parametro: 'Trasmittanza pareti', xframe: '0,159 W/m\u00B2K', muratura: '0,28-0,40 W/m\u00B2K', xframeWins: true },
  { parametro: 'Sfasamento', xframe: '18,8 ore', muratura: '8-12 ore', xframeWins: true },
  { parametro: 'Antisismicit\u00E0', xframe: 'Eccellente (capacit\u00E0 dissipativa)', muratura: 'Dipende da esecuzione', xframeWins: true },
  { parametro: 'Prefabbricazione', xframe: '95%+ in laboratorio', muratura: '0% (tutto in cantiere)', xframeWins: true },
  { parametro: 'Ponti termici', xframe: 'Eliminati (base XPS)', muratura: 'Presenti (cordoli, pilastri)', xframeWins: true },
  { parametro: 'Controllo qualit\u00E0', xframe: 'Laboratorio controllato', muratura: 'Cantiere (intemperie)', xframeWins: true },
  { parametro: 'Garanzia struttura', xframe: '30 anni', muratura: 'Non standard', xframeWins: true },
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
              X-Frame &egrave; un ibrido dei sistemi Platform Frame, X-Lam e Post and Beam.
              Confronta i dati reali di prestazione su 14 parametri tecnici rispetto ai sistemi
              tradizionali in legno e alla muratura convenzionale.
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
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-4">
              X-Frame vs Telaio vs X-Lam
            </h2>
            <p className="text-[#86868B] text-lg max-w-3xl mb-16">
              X-Frame eccelle in prefabbricazione, tempi cantiere, capacit&agrave; dissipativa,
              resistenza al fuoco, trasmittanza, sfasamento, flessibilit&agrave; impiantistica
              e prezzo a parit&agrave; di classe. I dati sono dalla brochure tecnica 2025.
            </p>
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
                    {confrontoSistemi.map((row, i) => {
                      const isXframeBest = row.xframe >= row.telaio && row.xframe >= row.xlam
                      return (
                        <tr key={row.parametro} className={`border-b border-[#EDE6DB]/60 ${i % 2 !== 0 ? 'bg-[#F5F5F7]/50' : ''}`}>
                          <td className="py-4 px-6 text-[#1D1D1F] font-medium">{row.parametro}</td>
                          <td className="py-4 px-4"><DotRating value={row.telaio} /></td>
                          <td className="py-4 px-4"><DotRating value={row.xlam} /></td>
                          <td className="py-4 px-4 bg-[#A0845C]/5">
                            <DotRating value={row.xframe} highlight={isXframeBest} />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 bg-[#A0845C]/5 border-t border-[#EDE6DB]">
                <p className="text-xs text-[#86868B] text-center">
                  Valutazione su scala 1-5. Dati da brochure tecnica EcoLive 2025. X-Frame raggiunge il punteggio massimo su 10 parametri su 14.
                </p>
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
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-4">
              X-Frame vs Muratura Tradizionale
            </h2>
            <p className="text-[#86868B] text-lg max-w-3xl mb-16">
              Il committente deve avere chiare le differenze per fare un paragone obiettivo.
              Non si possono confrontare pere con mele. Ecco i numeri reali, parametro per parametro.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-[#F5F5F7] rounded-2xl border border-[#EDE6DB] overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#EDE6DB] bg-white">
                      <th className="text-left py-5 px-6 font-bold text-[#1D1D1F]">Parametro</th>
                      <th className="text-center py-5 px-6 font-bold text-[#A0845C] bg-[#A0845C]/5">
                        <div className="flex items-center justify-center gap-2">
                          <span>EcoLive X-Frame</span>
                        </div>
                      </th>
                      <th className="text-center py-5 px-6 font-bold text-[#86868B]">Muratura Tradizionale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confrontoMuratura.map((row, i) => (
                      <motion.tr
                        key={row.parametro}
                        className={`border-b border-[#EDE6DB]/60 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F5F5F7]/50'}`}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04, duration: 0.35 }}
                      >
                        <td className="py-4 px-6 text-[#1D1D1F] font-medium">{row.parametro}</td>
                        <td className="py-4 px-6 bg-[#A0845C]/5 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {row.xframeWins && <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                            <span className="font-bold text-[#A0845C]">{row.xframe}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {row.xframeWins && <XCircle className="w-4 h-4 text-red-400/60 flex-shrink-0" />}
                            <span className="text-[#86868B]">{row.muratura}</span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                Perch&eacute; costiamo di pi&ugrave; <span className="text-[#A0845C]">e perch&eacute; vale di pi&ugrave;</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-8">
            <ScrollReveal delay={0.1}>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 border-l-4 border-l-[#A0845C]">
                <div className="flex items-start gap-4">
                  <Award className="w-6 h-6 text-[#A0845C] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-bold text-xl mb-3">La domanda giusta da porsi</h3>
                    <p className="text-white/60 text-lg leading-relaxed mb-4">
                      Il nostro prezzo non &egrave; inferiore a Wolf Haus o Rubner Haus. Il cliente
                      deve chiedersi: <em className="text-white/80">perch&eacute; una realt&agrave; calabrese ha prezzi
                      simili ai grandi marchi altoatesini?</em>
                    </p>
                    <p className="text-white/40 leading-relaxed">
                      La risposta &egrave; semplice: il sistema costruttivo, la qualit&agrave; dei materiali e le
                      prestazioni lo giustificano completamente. Non vendiamo un brand,
                      vendiamo un sistema costruttivo superiore a un prezzo equo.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <GlassCard intensity="light" className="p-8">
                <div className="flex items-start gap-4">
                  <Factory className="w-6 h-6 text-[#A0845C] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-bold text-xl mb-3">Artigianato sartoriale, non produzione di massa</h3>
                    <p className="text-white/50 leading-relaxed">
                      Preferiamo fare poche costruzioni ma con precisione assoluta, sartoriali, artigianali.
                      Ogni elemento viene prodotto nel nostro laboratorio di Spadola a temperatura e umidit&agrave; controllate.
                      Un livello di controllo qualit&agrave; impossibile da ottenere in cantiere, dove pioggia, vento e
                      variazioni termiche compromettono lavorazioni e materiali.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <GlassCard intensity="light" className="p-8">
                <div className="flex items-start gap-4">
                  <TrendingDown className="w-6 h-6 text-[#A0845C] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-bold text-xl mb-3">Meno tempo in cantiere = 20% risparmio complessivo</h3>
                    <p className="text-white/50 leading-relaxed mb-4">
                      Gran parte della lavorazione avviene in laboratorio. I tempi in cantiere sono brevissimi.
                      Questo si traduce in un risparmio fino al 20% sui costi complessivi rispetto a prestazioni
                      equivalenti in muratura: meno esposizione a ritardi meteo, aumenti imprevisti
                      dei prezzi dei materiali e costi di cantiere prolungato.
                    </p>
                    <p className="text-white/50 leading-relaxed">
                      30 giorni per le chiavi in mano contro i 12-48 mesi della muratura tradizionale.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <GlassCard intensity="light" className="p-8">
                <div className="flex items-start gap-4">
                  <Sparkles className="w-6 h-6 text-[#A0845C] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-bold text-xl mb-3">Possibilit&agrave; di ulteriore risparmio</h3>
                    <p className="text-white/50 leading-relaxed">
                      Per chi cerca un prezzo ancora pi&ugrave; competitivo, &egrave; possibile ottenere
                      uno sconto ulteriore scegliendo materiali alternativi a parit&agrave; di prestazione:
                      polistirene al posto del sughero, pannelli OSB al posto dei tre strati.
                      Le prestazioni restano eccellenti, cambia solo il materiale.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-white font-bold text-xl mb-4 text-center">Costo totale di propriet&agrave;</h3>
                <p className="text-white/50 leading-relaxed text-center mb-8 max-w-2xl mx-auto">
                  Una casa in classe A4 consuma fino all&apos;80% in meno di energia rispetto a una costruzione
                  tradizionale. In 30 anni il risparmio energetico supera abbondantemente il costo iniziale aggiuntivo.
                  Con una garanzia strutturale di 30 anni, i costi di manutenzione straordinaria sono azzerati.
                </p>
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                  {[
                    { value: 80, suffix: '%', label: 'Risparmio energetico' },
                    { value: 50, suffix: '', label: 'Anni garanzia struttura' },
                    { value: 20, suffix: '%', label: 'Risparmio costi complessivi' },
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

            <ScrollReveal delay={0.6}>
              <div className="p-6 rounded-2xl bg-[#A0845C]/10 border border-[#A0845C]/20 text-center">
                <p className="text-white/80 text-lg font-medium">
                  30 anni di garanzia sulla struttura parlano da soli.
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
