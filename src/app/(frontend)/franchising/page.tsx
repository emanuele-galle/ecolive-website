import { Metadata } from 'next'
import Link from 'next/link'
import { Factory, GraduationCap, Wrench, Users, CheckCircle, Phone, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

export const metadata: Metadata = {
  title: 'Franchising - Porta X-Frame nel Tuo Territorio',
  description: 'Affiliati a EcoLive: produci case X-Frame nel tuo territorio. Know-how, formazione, macchinari e clienti garantiti. Investimento da 100.000\u20AC.',
}

const provisions = [
  {
    icon: Factory,
    title: 'Know-how produttivo',
    description: 'Accesso completo alla tecnologia X-Frame: brevetti, processi industriali, software gestionale e controllo qualit\u00E0.',
  },
  {
    icon: GraduationCap,
    title: 'Formazione continua',
    description: 'Training iniziale e aggiornamenti periodici per il tuo team: produzione, vendita, gestione cantiere.',
  },
  {
    icon: Wrench,
    title: 'Attrezzature',
    description: 'Setup completo del laboratorio produttivo con macchinari dedicati. Investimento iniziale a partire da 100.000\u20AC.',
  },
  {
    icon: Users,
    title: 'Flusso clienti garantito',
    description: 'Quando EcoLive non pu\u00F2 servire un cliente per tempi o logistica, il cliente viene affidato a te. Nessun altro franchising pu\u00F2 garantirti questo.',
  },
]

const businessModelItems = [
  'Fee di ingresso per accesso al know-how e setup iniziale',
  'Royalties sulla produzione: modello trasparente e sostenibile',
  'Contratto di affiliazione con esclusiva territoriale',
  'Supporto marketing centralizzato e materiale promozionale',
]

const scalabilitySteps = [
  { num: '01', title: 'Singolo laboratorio', desc: 'Inizi con un laboratorio nella tua zona, servendo il mercato locale.' },
  { num: '02', title: 'Espansione regionale', desc: 'Cresci con nuove commesse e ampli la capacit\u00E0 produttiva.' },
  { num: '03', title: 'Rete nazionale', desc: 'Diventi parte di una rete di produzione decentralizzata su tutto il territorio.' },
]

export default function FranchisingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO ===== */}
      <section className="relative py-28 lg:py-40 bg-gradient-to-br from-[var(--color-secondary-dark)] to-[var(--color-secondary)]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="inline-block px-5 py-2 mb-8 text-sm font-medium text-[var(--color-primary)] bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              Opportunit\u00E0 di Business
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              Porta la Rivoluzione X-Frame
              <span className="block text-[var(--color-primary)]">nel Tuo Territorio</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Produci case X-Frame nella tua zona con il know-how EcoLive.
              Un modello di produzione decentralizzata che porta innovazione e lavoro sul territorio.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== THE VISION ===== */}
      <section className="py-20 lg:py-28 px-4 bg-[var(--color-surface)]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-secondary-dark)] mb-8 text-center">
              La Visione: Produzione Decentralizzata
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg text-[var(--color-muted)] leading-relaxed text-center max-w-3xl mx-auto">
              EcoLive ha sviluppato un sistema costruttivo brevettato che pu&ograve; essere replicato ovunque.
              Gli affiliati producono localmente utilizzando il know-how, i processi e gli standard qualitativi EcoLive.
              Meno trasporto, pi&ugrave; velocit&agrave;, pi&ugrave; valore per il territorio.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== UNIQUE ADVANTAGE ===== */}
      <section className="py-20 lg:py-28 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-[var(--color-secondary-dark)] to-[var(--color-secondary)] rounded-3xl p-10 md:p-14 text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
                Il Vantaggio Unico: Noi Ti Diamo il Cliente
              </h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
                Quando EcoLive riceve una richiesta che non pu&ograve; gestire per tempistiche o logistica,
                il cliente viene affidato all&apos;affiliato pi&ugrave; vicino.
              </p>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--color-primary)]/20 rounded-xl border border-[var(--color-primary)]/30">
                <CheckCircle className="w-6 h-6 text-[var(--color-primary)]" />
                <span className="text-white font-semibold">
                  Nessun altro franchising edile pu&ograve; garantirti questo
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== WHAT ECOLIVE PROVIDES ===== */}
      <section className="py-20 lg:py-28 px-4 bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-secondary-dark)] mb-4 text-center">
              Cosa Ti Forniamo
            </h2>
            <p className="text-[var(--color-muted)] text-center mb-14 max-w-2xl mx-auto">
              Tutto ci&ograve; che serve per avviare e gestire la tua produzione X-Frame.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            {provisions.map((item, index) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#EDE6DB] hover:shadow-md transition-shadow h-full">
                    <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-[var(--color-primary)]" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-secondary-dark)] mb-3">{item.title}</h3>
                    <p className="text-[var(--color-muted)] leading-relaxed">{item.description}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== BUSINESS MODEL ===== */}
      <section className="py-20 lg:py-28 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-secondary-dark)] mb-12 text-center">
              Modello di Business
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="bg-[var(--color-surface)] rounded-2xl p-8 md:p-10 border border-[#EDE6DB]">
              <ul className="space-y-5">
                {businessModelItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <span className="text-[var(--color-secondary-dark)] text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SCALABILITY ===== */}
      <section className="py-20 lg:py-28 px-4 bg-[var(--color-surface)]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-secondary-dark)] mb-4 text-center">
              Scalabilit&agrave;
            </h2>
            <p className="text-[var(--color-muted)] text-center mb-14 max-w-2xl mx-auto">
              Da singolo laboratorio a rete produttiva nazionale.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {scalabilitySteps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.12}>
                <div className="relative bg-white rounded-2xl p-8 border border-[#EDE6DB] text-center h-full">
                  <span className="text-5xl font-bold text-[var(--color-primary)]/20">{step.num}</span>
                  <h3 className="text-xl font-bold text-[var(--color-secondary-dark)] mt-2 mb-3">{step.title}</h3>
                  <p className="text-[var(--color-muted)]">{step.desc}</p>
                  {index < scalabilitySteps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--color-primary)]/40 z-10" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="py-20 lg:py-28 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-[var(--color-surface)] rounded-2xl p-8 md:p-10 border border-[#EDE6DB] text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-secondary-dark)] mb-3">
                Referente Affiliazioni
              </h2>
              <p className="text-xl font-semibold text-[var(--color-secondary-dark)] mb-1">
                Dott.ssa Sara Santaguida
              </p>
              <p className="text-[var(--color-muted)] mb-6">
                Area Legale / Affiliazioni
              </p>
              <a
                href="tel:+393387774250"
                className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold text-lg hover:underline"
              >
                <Phone className="w-5 h-5" />
                338.7774250
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 lg:py-32 px-4 bg-gradient-to-br from-[var(--color-secondary-dark)] to-[var(--color-secondary)]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Pronto a portare X-Frame nel tuo territorio?
            </h2>
            <p className="text-white/70 mb-10 text-lg max-w-2xl mx-auto">
              Contattaci per ricevere il dossier di affiliazione completo e fissare un incontro con il nostro team.
            </p>
            <Link
              href="/contatti?oggetto=affiliazione"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold text-lg rounded-xl transition-colors"
            >
              Richiedi il Dossier
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
