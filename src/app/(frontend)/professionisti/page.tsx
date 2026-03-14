import { Metadata } from 'next'
import Link from 'next/link'
import {
  Compass, FileText, Presentation, Layers, Box, ArrowRight,
  CheckCircle, Phone, Mail, Ruler,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Per i Professionisti - Collabora con EcoLive',
  description:
    'Architetti, ingegneri e geometri: collabora con il sistema costruttivo X-Frame più avanzato del Sud Italia. Supporto tecnico, materiale progettuale, BIM Revit.',
}

const whyCards = [
  {
    icon: Compass,
    title: 'Differenziati sul Mercato',
    description:
      'Offri ai tuoi clienti un sistema costruttivo rivoluzionario. Distinguiti dalla concorrenza che propone solo muratura tradizionale.',
  },
  {
    icon: FileText,
    title: 'Supporto Tecnico Completo',
    description:
      'Calcoli strutturali, dettagli stratigrafici, documentazione Eurocode 5 e assistenza tecnica continua durante tutto il progetto.',
  },
  {
    icon: Presentation,
    title: 'Materiale di Presentazione',
    description:
      'Accesso a rendering professionali, animazioni, documentazione tecnica da presentare ai tuoi committenti.',
  },
]

const wallLayers = [
  { code: 'A', name: 'Pannello interno in cartongesso', thickness: '12.5 mm' },
  { code: 'B', name: 'Freno vapore e tenuta aria', thickness: '-' },
  { code: 'C', name: 'Installazione impiantistica', thickness: '50 mm' },
  { code: 'D', name: 'Pannello OSB strutturale', thickness: '15 mm' },
  { code: 'E', name: 'Montante in legno + fibra di legno', thickness: '120 mm' },
  { code: 'F', name: 'Pannello OSB di controvento', thickness: '15 mm' },
  { code: 'G', name: 'Isolamento fibra di legno', thickness: '60 mm' },
  { code: 'Q', name: 'Intonaco su rete / rivestimento', thickness: '8 mm' },
]

const techSpecs = [
  { label: 'Trasmittanza parete', value: 'U = 0.159 W/m\u00b2K' },
  { label: 'Sfasamento parete', value: '18.8 ore' },
  { label: 'Spessore parete totale', value: '29 cm' },
  { label: 'Trasmittanza copertura', value: 'U = 0.137 W/m\u00b2K' },
  { label: 'Sfasamento copertura', value: '14.5 ore' },
  { label: 'Spessore copertura', value: '40 cm' },
  { label: 'Griglia strutturale', value: '4\u20134.5 m \u00d7 7 m' },
  { label: 'Normativa', value: 'Eurocode 5 (NTC 2018)' },
]

const steps = [
  {
    number: '01',
    title: 'Contatto Iniziale',
    description: 'Contatta EcoLive con il progetto del tuo cliente. Analizziamo insieme fattibilit\u00e0, tempistiche e costi.',
  },
  {
    number: '02',
    title: 'Valutazione Tecnica Congiunta',
    description: 'Studio congiunto del progetto: adattamento al sistema X-Frame, verifica strutturale, ottimizzazione energetica.',
  },
  {
    number: '03',
    title: 'Produzione e Montaggio',
    description: 'EcoLive gestisce produzione nello stabilimento, trasporto e montaggio della struttura in cantiere.',
  },
  {
    number: '04',
    title: 'Direzione Lavori',
    description: 'Il professionista gestisce pratiche autorizzative, direzione lavori e coordinamento delle altre maestranze.',
  },
]

const bimFeatures = [
  'Progettazione in ambiente Revit',
  'Libreria BIM con componenti X-Frame (in sviluppo)',
  'Spessori, elementi strutturali e serramenti parametrici',
  'Passaggio diretto da modello BIM a disegni di produzione (AutoCAD)',
  'Processo standardizzato che riduce i tempi di progettazione',
]

export default function ProfessionistiPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO ===== */}
      <section className="relative py-28 lg:py-40 bg-gradient-to-br from-[#1D1D1F] to-[#48484A]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-[var(--color-primary)] bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              Per Architetti, Ingegneri e Geometri
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Per i Professionisti
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Architetti, ingegneri e geometri: scopri come integrare il sistema X-Frame
              nei tuoi progetti e offrire ai tuoi clienti una soluzione costruttiva superiore.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PERCHE COLLABORARE ===== */}
      <section className="py-24 lg:py-32 px-4 bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-secondary-dark)] mb-4 text-center">
              Perch&eacute; Collaborare con EcoLive
            </h2>
            <p className="text-[var(--color-muted)] text-lg text-center max-w-2xl mx-auto mb-16">
              Vantaggi concreti per la tua attivit&agrave; professionale
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {whyCards.map((card, i) => {
              const Icon = card.icon
              return (
                <ScrollReveal key={card.title} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#EDE6DB] h-full">
                    <div className="w-14 h-14 bg-[var(--color-secondary-dark)]/10 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-[var(--color-secondary-dark)]" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-secondary-dark)] mb-3">
                      {card.title}
                    </h3>
                    <p className="text-[var(--color-muted)] leading-relaxed">{card.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== SPECIFICHE TECNICHE ===== */}
      <section className="py-24 lg:py-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-secondary-dark)] mb-4 text-center">
              Specifiche Tecniche per Professionisti
            </h2>
            <p className="text-[var(--color-muted)] text-lg text-center max-w-2xl mx-auto mb-16">
              Dati di progetto del sistema costruttivo X-Frame
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Stratigrafia parete */}
            <ScrollReveal delay={0.1}>
              <div className="bg-[var(--color-surface)] rounded-2xl p-8 border border-[#EDE6DB]">
                <div className="flex items-center gap-3 mb-6">
                  <Layers className="w-6 h-6 text-[var(--color-primary)]" />
                  <h3 className="text-xl font-bold text-[var(--color-secondary-dark)]">
                    Stratigrafia Parete
                  </h3>
                </div>
                <div className="space-y-3">
                  {wallLayers.map((layer) => (
                    <div
                      key={layer.code}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span className="w-7 h-7 bg-[var(--color-secondary-dark)] text-white rounded flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {layer.code}
                      </span>
                      <span className="flex-1 text-[#4A4540]">{layer.name}</span>
                      <span className="text-[var(--color-muted)] font-mono text-xs">{layer.thickness}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Valori prestazionali */}
            <ScrollReveal delay={0.2}>
              <div className="bg-[var(--color-surface)] rounded-2xl p-8 border border-[#EDE6DB]">
                <div className="flex items-center gap-3 mb-6">
                  <Ruler className="w-6 h-6 text-[var(--color-primary)]" />
                  <h3 className="text-xl font-bold text-[var(--color-secondary-dark)]">
                    Valori Prestazionali
                  </h3>
                </div>
                <div className="space-y-4">
                  {techSpecs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between border-b border-[#EDE6DB] pb-3 last:border-0"
                    >
                      <span className="text-[#4A4540] text-sm">{spec.label}</span>
                      <span className="text-[var(--color-secondary-dark)] font-bold text-sm">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== INTEGRAZIONE BIM ===== */}
      <section className="py-24 lg:py-32 px-4 bg-[var(--color-secondary-dark)]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Box className="w-7 h-7 text-[var(--color-primary)]" />
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
                  Integrazione BIM
                </h2>
              </div>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">
                Dal modello Revit alla produzione: un processo digitale integrato
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10">
              <ul className="space-y-5">
                {bimFeatures.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== COME FUNZIONA ===== */}
      <section className="py-24 lg:py-32 px-4 bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-secondary-dark)] mb-4 text-center">
              Come Funziona
            </h2>
            <p className="text-[var(--color-muted)] text-lg text-center max-w-2xl mx-auto mb-16">
              Il percorso di collaborazione in quattro fasi
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#EDE6DB] h-full">
                  <span className="text-4xl font-bold text-[var(--color-primary)]/20">{step.number}</span>
                  <h3 className="text-xl font-bold text-[var(--color-secondary-dark)] mt-2 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[var(--color-muted)] leading-relaxed">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 lg:py-32 px-4 bg-[var(--color-secondary-dark)]">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
              Diventa Partner Tecnico
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Entra nella rete dei professionisti EcoLive. Supporto dedicato, materiale tecnico e nuove opportunit&agrave; progettuali.
            </p>

            <Link
              href="/contatti?oggetto=professionista"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white font-semibold text-lg rounded-xl hover:bg-[#856B45] transition-colors"
            >
              Contattaci <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-white/50 text-sm mb-3">Contatto diretto</p>
              <p className="text-white font-semibold text-lg">Ing. Luisa Baffa</p>
              <p className="text-white/60 text-sm mb-4">Responsabile Commerciale</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+393287107639"
                  className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  328.710.7639
                </a>
                <a
                  href="mailto:info@ecolive.srl"
                  className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@ecolive.srl
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
