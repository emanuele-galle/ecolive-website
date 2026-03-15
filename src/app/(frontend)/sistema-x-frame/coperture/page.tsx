'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import CountUp from '@/components/ui/CountUp'

const grainOverlay = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`

const roofTypes = [
  {
    title: 'Tetto Piano',
    subtitle: 'Architettura contemporanea',
    description: 'Leggera pendenza esterna per il deflusso delle acque, rivestimento in pannelli metallici coibentati. La soluzione per ville moderne dal design pulito e lineare, con la possibilita di creare terrazze verdi o praticabili.',
    stats: [
      { label: 'Pendenza', value: '1-3%' },
      { label: 'Finitura', value: 'Pannelli coibentati' },
    ],
  },
  {
    title: 'Tetto a Una Falda',
    subtitle: 'Effetto architettonico',
    description: 'Struttura inclinata con travi a vista che crea un effetto drammatico negli ambienti interni. L\'altezza variabile genera spazi dinamici e permette l\'inserimento di ampie vetrate sul lato alto per massima luminosita naturale.',
    stats: [
      { label: 'Pendenza', value: '5-15%' },
      { label: 'Struttura', value: 'Travi a vista' },
    ],
  },
  {
    title: 'Tetto a Due Falde',
    subtitle: 'Eleganza classica',
    description: 'La configurazione tradizionale con tegole in argilla o laterizi, perfetta per pendenze superiori al 10%. Coniuga l\'estetica classica del tetto italiano con le prestazioni termiche e antisismiche del sistema X-Frame.',
    stats: [
      { label: 'Pendenza', value: '>10%' },
      { label: 'Finitura', value: 'Tegole tradizionali' },
    ],
  },
]

const roofMaterials = [
  {
    title: 'Pannelli grecati coibentati',
    description: 'Obbligatori per basse pendenze e coperture piane. Strato isolante integrato con rivestimento metallico che garantisce impermeabilita totale. La soluzione tecnica piu performante per architetture contemporanee.',
    tag: 'Obbligatorio basse pendenze',
  },
  {
    title: 'Pannelli strutturali con tegola',
    description: 'Disponibili con tegola antichizzata per un aspetto rustico-elegante o con tegola moderna per linee piu pulite. Il pannello strutturale integra ventilazione e supporto in un unico elemento.',
    tag: null,
  },
  {
    title: 'Tegole tradizionali argilla/laterizi',
    description: 'Per chi desidera il massimo della tradizione mediterranea. Ancoraggio diretto sui contro-listelli gia montati nei monoblocchi di copertura. Nessuna lavorazione aggiuntiva in cantiere.',
    tag: null,
  },
  {
    title: 'Gronde e scossaline pluviali in alluminio',
    description: 'Sistema completo di raccolta e convogliamento delle acque piovane. Alluminio resistente alla corrosione, integrato esteticamente nella linea della copertura per un aspetto finale pulito e professionale.',
    tag: null,
  },
]

export default function CoperturePage() {
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
              <span className="text-[#A0845C]">Coperture</span>
            </nav>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#A0845C]" />
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">Tre configurazioni</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Coperture <span className="text-[#A0845C]">X-Frame</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed">
              Tetto piano, a una falda o a due falde. I monoblocchi arrivano dal nostro laboratorio
              di Spadola con camera di ventilazione e contro-listelli gia montati. Posa immediata della copertura.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== TIPOLOGIE DI TETTO ===== */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#A0845C]" />
              <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">Soluzioni architettoniche</span>
              <div className="w-8 h-px bg-[#A0845C]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-16">
              Tre Tipologie di Copertura
            </h2>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-6">
            {roofTypes.map((roof, i) => (
              <ScrollReveal key={roof.title} delay={i * 0.12}>
                <motion.div
                  className="group bg-white rounded-2xl border-t-2 border-t-transparent border border-[#EDE6DB] p-8 h-full flex flex-col hover:border-t-[#A0845C] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  whileHover={{ scale: 1.01 }}
                >
                  <span className="text-[#A0845C] text-xs tracking-[0.15em] uppercase font-medium mb-3">{roof.subtitle}</span>
                  <h3 className="text-2xl font-bold text-[#1D1D1F] mb-4">{roof.title}</h3>
                  <p className="text-[#86868B] leading-relaxed flex-1 mb-6">{roof.description}</p>
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#EDE6DB]">
                    {roof.stats.map((stat) => (
                      <div key={stat.label}>
                        <div className="text-xs text-[#86868B] mb-1">{stat.label}</div>
                        <div className="text-sm font-bold text-[#A0845C]">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MATERIALI DI COPERTURA ===== */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#A0845C]" />
              <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">Finiture selezionate</span>
              <div className="w-8 h-px bg-[#A0845C]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-4">
              Materiali di Copertura
            </h2>
            <p className="text-[#86868B] text-lg max-w-3xl mb-16">
              Materiali selezionati per durabilita, estetica e compatibilita con il sistema X-Frame.
              Ogni soluzione si integra con i monoblocchi prefabbricati senza lavorazioni aggiuntive.
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            {roofMaterials.map((mat, i) => (
              <ScrollReveal key={mat.title} delay={i * 0.1}>
                <div className="group flex flex-col md:flex-row md:items-start gap-5 p-6 md:p-8 bg-[#F5F5F7] rounded-2xl border border-transparent hover:border-[#A0845C]/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#A0845C]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#A0845C] font-bold text-lg">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-[#1D1D1F] group-hover:text-[#A0845C] transition-colors">{mat.title}</h3>
                      {mat.tag && (
                        <span className="px-3 py-1 bg-[#A0845C]/10 text-[#A0845C] text-xs font-semibold rounded-full">{mat.tag}</span>
                      )}
                    </div>
                    <p className="text-[#86868B] leading-relaxed">{mat.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VANTAGGIO CHIAVE ===== */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F] overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: grainOverlay }} />
        <div className="relative max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-8 h-px bg-[#A0845C]/50" />
                <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">Vantaggio esclusivo</span>
                <div className="w-8 h-px bg-[#A0845C]/50" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Monoblocchi <span className="text-[#A0845C]">Pronti alla Posa</span>
              </h2>
              <p className="text-white/50 text-lg max-w-3xl mx-auto leading-relaxed">
                I monoblocchi di copertura X-Frame arrivano in cantiere gia equipaggiati con camera di
                ventilazione e contro-listelli per l&apos;ancoraggio delle tegole. La posa della copertura
                finale avviene immediatamente, senza nessuna lavorazione intermedia.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {[
              { value: 7, label: 'Giorni di montaggio' },
              { value: 100, label: '% Prefabbricato', suffix: '%' },
              { value: 0, label: 'Lavorazioni extra in cantiere' },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.15}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#A0845C]">
                    <CountUp to={stat.value} duration={2} delay={0.3 + i * 0.2} suffix={stat.suffix || ''} />
                  </div>
                  <div className="text-sm text-white/40 mt-3 tracking-wide">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
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
              Scegli tipologia di copertura, metratura e livello di finitura. Preventivo personalizzato.
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
          <Link href="/sistema-x-frame/solai" className="group inline-flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Solai</span>
          </Link>
          <Link href="/sistema-x-frame/trasporto-montaggio" className="group inline-flex items-center gap-2 text-[#A0845C] hover:text-[#8B7049] transition-colors font-medium">
            <span>Trasporto e Montaggio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}
