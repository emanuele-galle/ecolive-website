'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import CountUp from '@/components/ui/CountUp'

const grainOverlay = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`

const roofStratigraphy = [
  {
    letter: 'A',
    name: 'Struttura portante lamellare (16x32)',
    detail: 'La spina dorsale del solaio. Travi in legno lamellare con sezione 16x32cm, calcolate per garantire portata e rigidezza strutturale su luci fino a 13 metri senza pilastri intermedi.',
    color: '#8B7355',
  },
  {
    letter: 'C',
    name: 'Pannelli tre strati a vista',
    detail: 'Legno levigato e trattato che resta a vista come soffitto del piano sottostante. Superficie naturale che respira, regola l\'umidita e dona calore visivo agli ambienti.',
    color: '#C4A47B',
  },
  {
    letter: 'D',
    name: 'Lana di roccia 22cm',
    detail: 'Isolante minerale incombustibile con eccellente comportamento al fuoco (classe A1). 22 centimetri di protezione termica e acustica che garantiscono sfasamento superiore a 14 ore.',
    color: '#D4B896',
  },
  {
    letter: 'I',
    name: 'Pannelli OSB strutturali',
    detail: 'Pannelli a scaglie orientate che chiudono il pacchetto dall\'esterno, creando un piano rigido continuo. Contribuiscono alla controventatura complessiva della struttura.',
    color: '#B8956E',
  },
  {
    letter: 'F',
    name: 'Freno vapore + membrana traspirante',
    detail: 'Doppia gestione dell\'umidita: il freno vapore interno impedisce alla condensa di entrare nel pacchetto isolante, mentre la membrana esterna lascia traspirare l\'eventuale umidita verso l\'esterno.',
    color: '#B8C4D0',
  },
]

const interfloorFeatures = [
  {
    title: 'Lastra di irrigidimento strutturale',
    description: 'Il solaio interpiano non e un semplice piano di calpestio: funge da vera e propria piastra di irrigidimento che distribuisce i carichi sismici e stabilizza l\'intera struttura dell\'edificio.',
  },
  {
    title: 'Spazi tecnici integrati',
    description: 'Vani predisposti per tutti gli impianti: elettrico, idraulico, scarichi. Ogni intervento futuro non richiede demolizioni. Accessibilita totale senza compromettere la struttura.',
  },
  {
    title: 'Passaggio trasversale impiantistico',
    description: 'Le intercapedini tra le tavole di abete consentono il passaggio trasversale di tubazioni e cavi, permettendo la distribuzione impiantistica su tutta la superficie senza forare elementi portanti.',
  },
  {
    title: 'Pavimentazione diretta o con massetto',
    description: 'Due opzioni: pavimento SPC posabile direttamente sul solaio per massima velocita, oppure massetto alleggerito da 5 a 10cm per piastrelle e ceramiche di qualsiasi formato.',
  },
]

export default function SolaiPage() {
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
              <span className="text-[#A0845C]">Solai</span>
            </nav>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#A0845C]" />
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">Copertura & Interpiano</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Solai <span className="text-[#A0845C]">X-Frame</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed">
              Moduli prefabbricati larghi 2,10 metri e lunghi fino a 13. Arrivano in cantiere completi,
              immediatamente calpestabili, stoccabili all&apos;aperto. Prodotti interamente nel nostro
              laboratorio di Spadola a temperatura e umidita controllate.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SOLAIO DI COPERTURA — STRATIGRAFIA ===== */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#A0845C]" />
              <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">Stratigrafia certificata</span>
              <div className="w-8 h-px bg-[#A0845C]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-4">
              Solaio di Copertura
            </h2>
            <p className="text-[#86868B] text-lg max-w-3xl mb-16">
              Cinque strati progettati per lavorare insieme: struttura, estetica, isolamento, rigidezza e gestione dell&apos;umidita.
              Ogni componente ha un ruolo preciso nella prestazione complessiva.
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            {roofStratigraphy.map((layer, i) => (
              <ScrollReveal key={layer.letter} delay={i * 0.08}>
                <motion.div
                  className="group flex flex-col md:flex-row md:items-start gap-5 p-6 md:p-8 bg-[#F5F5F7] rounded-2xl border border-transparent hover:border-[#A0845C]/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  whileHover={{ scale: 1.005 }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-lg font-bold shadow-md"
                    style={{ backgroundColor: layer.color }}
                  >
                    {layer.letter}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#1D1D1F] mb-2 group-hover:text-[#A0845C] transition-colors">
                      {layer.name}
                    </h3>
                    <p className="text-[#86868B] leading-relaxed">{layer.detail}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS — DARK ===== */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F] overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: grainOverlay }} />
        <div className="relative max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white text-center mb-16">
              Prestazioni <span className="text-[#A0845C]">Certificate</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {[
              { value: 40, suffix: ' cm', label: 'Spessore totale', decimals: 0 },
              { value: 0.137, suffix: '', label: 'W/m\u00b2K trasmittanza', decimals: 3 },
              { value: 14.5, suffix: ' ore', label: 'Sfasamento termico', decimals: 1 },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.15}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#A0845C]">
                    <CountUp to={stat.value} duration={2.5} delay={0.3 + i * 0.2} decimals={stat.decimals} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-white/40 mt-3 tracking-wide">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOLAIO INTERPIANO ===== */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#A0845C]" />
              <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">Multifunzionale</span>
              <div className="w-8 h-px bg-[#A0845C]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-4">
              Solaio Interpiano
            </h2>
            <p className="text-[#86868B] text-lg max-w-3xl mb-16">
              Non solo un piano di calpestio, ma una piastra strutturale che irrigidisce l&apos;edificio
              e integra tutti gli spazi tecnici per impianti elettrici, idraulici e di scarico.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {interfloorFeatures.map((feat, i) => (
              <ScrollReveal key={feat.title} delay={i * 0.1}>
                <div className="group p-8 bg-white rounded-2xl border-t-2 border-t-transparent border border-[#EDE6DB] h-full hover:border-t-[#A0845C] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-8 h-1 bg-[#A0845C]/30 rounded-full mb-5 group-hover:w-12 group-hover:bg-[#A0845C] transition-all duration-300" />
                  <h3 className="text-lg font-bold text-[#1D1D1F] mb-3">{feat.title}</h3>
                  <p className="text-[#86868B] leading-relaxed">{feat.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPECIFICHE MODULO ===== */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] text-center mb-6">
              Il Modulo
            </h2>
            <p className="text-[#86868B] text-lg max-w-2xl mx-auto text-center mb-16">
              Ogni modulo solaio esce dal laboratorio completo e impermeabilizzato.
              Stoccabile all&apos;aperto senza protezioni aggiuntive.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: '2,10', unit: 'm', label: 'Larghezza modulo' },
              { value: '13', unit: 'm', label: 'Lunghezza massima' },
              { value: '100', unit: '%', label: 'Impermeabilizzato' },
              { value: '0', unit: 'min', label: 'Attesa calpestabilita' },
            ].map((spec, i) => (
              <ScrollReveal key={spec.label} delay={i * 0.1}>
                <div className="group p-6 md:p-8 bg-[#F5F5F7] rounded-2xl border border-transparent hover:border-[#A0845C]/20 text-center transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-[#A0845C]">
                    {spec.value}
                    <span className="text-lg md:text-xl text-[#A0845C]/60 ml-1">{spec.unit}</span>
                  </div>
                  <div className="text-xs md:text-sm text-[#86868B] mt-3 tracking-wide">{spec.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 p-8 bg-[#1D1D1F] rounded-2xl text-center relative overflow-hidden">
              <div className="absolute inset-0" style={{ backgroundImage: grainOverlay }} />
              <div className="relative">
                <p className="text-white/70 text-lg leading-relaxed max-w-3xl mx-auto">
                  <span className="text-[#A0845C] font-semibold">Ottimizzazione geniale:</span>{' '}
                  le travi portanti viaggiano <em>all&apos;interno</em> dei moduli solaio interpiano durante il trasporto.
                  Nessuno spazio sprecato, nessun carico aggiuntivo.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-20 lg:py-24 px-6 bg-[#1D1D1F] overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: grainOverlay }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Configura la tua <span className="text-[#A0845C]">Casa X-Frame</span>
            </h2>
            <p className="text-white/50 text-lg mb-8">
              Scegli metratura, tipologia e livello di finitura. Preventivo personalizzato in pochi minuti.
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
          <Link href="/sistema-x-frame" className="group inline-flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Pareti</span>
          </Link>
          <Link href="/sistema-x-frame/coperture" className="group inline-flex items-center gap-2 text-[#A0845C] hover:text-[#8B7049] transition-colors font-medium">
            <span>Coperture</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}
