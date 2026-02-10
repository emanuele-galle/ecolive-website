'use client'

import Link from 'next/link'
import {
  Award, Shield, Home, Leaf, Zap, ArrowRight,
  Clock, Thermometer, Timer, Volume2,
  Phone, Mail, Building2
} from 'lucide-react'
import Button from '@/components/ui/Button'
import BlurText from '@/components/ui/BlurText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SpotlightCard from '@/components/ui/SpotlightCard'
import CountUp from '@/components/ui/CountUp'
import InfiniteMarquee from '@/components/ui/InfiniteMarquee'
import SectionTransition, { transitionPresets } from '@/components/ui/SectionTransition'

const certifications = [
  {
    name: 'Passive House',
    icon: Home,
    value: '15',
    unit: 'kWh/m\u00b2',
    tagline: 'Consumo quasi zero',
    features: ['Risparmio 90% energia', 'Comfort 365 giorni', 'Zero ponti termici', 'Aria sempre pulita'],
  },
  {
    name: 'Casa Clima',
    icon: Leaf,
    value: 'Gold',
    unit: '',
    tagline: 'Sostenibilita certificata',
    features: ['Materiali eco', 'Qualita garantita', 'Valore +30%', 'Benessere abitativo'],
  },
  {
    name: 'ARCA',
    icon: Shield,
    value: '100%',
    unit: '',
    tagline: 'Tracciabilita totale',
    features: ['Legno certificato', 'Filiera controllata', 'Made in Italy', 'Garanzia 30 anni'],
  },
  {
    name: 'Classe A4',
    icon: Zap,
    value: 'NZEB',
    unit: '',
    tagline: 'Nearly Zero Energy',
    features: ['Bollette minime', 'Indipendenza energetica', 'Max incentivi', 'Futuro garantito'],
  },
]

const performances = [
  { icon: Thermometer, name: 'Trasmittanza', value: 0.12, unit: 'W/m\u00b2K', label: 'Isolamento termico', suffix: '' },
  { icon: Timer, name: 'Sfasamento', value: 12, unit: 'ore', label: 'Inerzia termica', suffix: '+' },
  { icon: Volume2, name: 'Isolamento acustico', value: 55, unit: 'dB', label: 'Abbattimento rumore', suffix: '' },
  { icon: Shield, name: 'Resistenza sismica', value: null, unit: '', label: 'Certificazione massima', displayValue: 'Zona 1' },
]

const comparisonRows = [
  { aspect: 'Tempi di costruzione', ecolive: '30-45 giorni', traditional: '12-18 mesi' },
  { aspect: 'Classe energetica', ecolive: 'A4 garantita', traditional: 'B-C media' },
  { aspect: 'Resistenza sismica', ecolive: 'Zona 1', traditional: 'Variabile' },
  { aspect: 'Costo indicativo', ecolive: '\u20ac1.100-1.500/mq', traditional: '\u20ac1.500-2.500/mq' },
  { aspect: 'Impatto ambientale', ecolive: 'CO\u2082 negativo', traditional: 'CO\u2082 positivo' },
]

const summaryStats = [
  { value: 30, unit: 'giorni', label: 'Costruzione', suffix: '' },
  { value: 90, unit: '', label: 'Risparmio energia', suffix: '%' },
  { value: null, unit: '', label: 'Resistenza fuoco', displayValue: 'REI 60' },
  { value: 30, unit: 'anni', label: 'Garanzia struttura', suffix: '' },
  { value: 25, unit: 'anni', label: 'Esperienza', suffix: '+' },
  { value: null, unit: '', label: 'Classe energetica', displayValue: 'A4' },
]

const marqueeItems = [
  'Antisismica',
  'Classe A4',
  'PEFC Certified',
  'X-Frame System',
  'Made in Italy',
  '30 Anni Garanzia',
  'Passive House',
  'Casa Clima Gold',
]

export default function AreaTecnicaPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">

      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-[var(--color-secondary-dark)] via-[var(--color-secondary)] to-[var(--color-secondary-dark)] py-28 lg:py-40">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <BlurText
            text="Area Tecnica"
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 justify-center"
            delay={80}
            animateBy="words"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-14">
              Certificazioni, prestazioni e specifiche del sistema X-Frame
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8 md:gap-14">
              {[
                { value: 4, label: 'Certificazioni' },
                { value: null, label: 'Classe Energia', displayValue: 'A4' },
                { value: 30, label: 'Anni Garanzia' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
                    {stat.value !== null ? (
                      <CountUp to={stat.value} duration={2} delay={0.3 + i * 0.15} />
                    ) : (
                      stat.displayValue
                    )}
                  </div>
                  <div className="text-white/50 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="py-5 bg-[var(--color-surface)] border-y border-[#EDE6DB]">
        <InfiniteMarquee
          items={marqueeItems}
          speed={25}
          className="text-[var(--color-secondary-dark)]/60"
        />
      </div>

      {/* ===== CERTIFICAZIONI ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary-dark)] mb-4">
                Certificazioni
              </h2>
              <p className="text-[var(--color-muted)] text-lg max-w-xl mx-auto">
                I nostri standard di qualita riconosciuti a livello internazionale
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, i) => {
              const Icon = cert.icon
              return (
                <ScrollReveal key={cert.name} delay={i * 0.1}>
                  <SpotlightCard className="bg-white border border-[#EDE6DB] h-full">
                    <div className="p-8">
                      <div className="flex items-start gap-4 mb-5">
                        <div className="w-12 h-12 bg-[var(--color-secondary-dark)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-[var(--color-secondary-dark)]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[var(--color-secondary-dark)]">{cert.name}</h3>
                          <p className="text-[var(--color-muted)] text-sm">{cert.tagline}</p>
                        </div>
                        <div className="ml-auto text-right">
                          <span className="text-2xl font-bold text-[var(--color-primary)]">{cert.value}</span>
                          {cert.unit && <span className="text-sm text-[var(--color-muted)] ml-1">{cert.unit}</span>}
                        </div>
                      </div>
                      <ul className="grid grid-cols-2 gap-2">
                        {cert.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-[#4A4540]">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              )
            })}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-12">
              <Link
                href="/area-tecnica/certificazioni"
                className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:gap-3 transition-all"
              >
                Vedi tutte le certificazioni nel dettaglio <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" variant="wave" height={80} />

      {/* ===== PRESTAZIONI ===== */}
      <section className="py-28 lg:py-36 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary-dark)] mb-4">
                Prestazioni
              </h2>
              <p className="text-[var(--color-muted)] text-lg">
                Valori che superano ampiamente gli standard normativi
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {performances.map((perf, i) => {
              const Icon = perf.icon
              return (
                <ScrollReveal key={perf.name} delay={i * 0.1}>
                  <SpotlightCard className="bg-[var(--color-surface)] border border-[#EDE6DB] h-full">
                    <div className="p-8">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-[var(--color-secondary-dark)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-7 h-7 text-[var(--color-secondary-dark)]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-[var(--color-muted)]">{perf.label}</p>
                          <h3 className="text-lg font-bold text-[var(--color-secondary-dark)]">{perf.name}</h3>
                        </div>
                        <div className="text-right">
                          <span className="text-3xl font-bold text-[var(--color-primary)]">
                            {perf.value !== null ? (
                              <CountUp to={perf.value} duration={2} delay={0.2 + i * 0.1} suffix={perf.suffix} />
                            ) : (
                              perf.displayValue
                            )}
                          </span>
                          {perf.unit && <span className="text-sm text-[var(--color-muted)] ml-1">{perf.unit}</span>}
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" variant="angle" height={80} />

      {/* ===== CONFRONTO ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[var(--color-secondary-dark)]">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                X-Frame vs Tradizionale
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-4 px-4 text-white/60 font-medium text-sm">Aspetto</th>
                    <th className="py-4 px-4 text-[var(--color-primary)] font-bold">Ecolive X-Frame</th>
                    <th className="py-4 px-4 text-white/50 font-medium">Tradizionale</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.aspect} className={i % 2 === 0 ? 'bg-white/5' : ''}>
                      <td className="py-4 px-4 text-white/80 font-medium">{row.aspect}</td>
                      <td className="py-4 px-4 text-[var(--color-primary)] font-bold">{row.ecolive}</td>
                      <td className="py-4 px-4 text-white/40">{row.traditional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-center text-white/40 text-sm mt-8">
              Valori indicativi basati su progetti realizzati
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" variant="wave" height={80} />

      {/* ===== NUMERI IN SINTESI ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-secondary-dark)]">
                In Sintesi
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {summaryStats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08}>
                <SpotlightCard className="bg-white border border-[#EDE6DB] h-full">
                  <div className="p-6 text-center">
                    <div className="flex items-baseline justify-center gap-1.5">
                      <span className="text-3xl md:text-4xl font-bold text-[var(--color-secondary-dark)]">
                        {stat.value !== null ? (
                          <CountUp to={stat.value} duration={2} delay={0.1 + i * 0.08} suffix={stat.suffix} />
                        ) : (
                          stat.displayValue
                        )}
                      </span>
                      {stat.unit && <span className="text-lg text-[var(--color-muted)]">{stat.unit}</span>}
                    </div>
                    <p className="text-[var(--color-muted)] text-sm mt-2">{stat.label}</p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#1D1D1F" variant="angle" height={80} />

      {/* ===== CTA ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[var(--color-secondary-dark)]">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Hai domande tecniche?
            </h2>
            <p className="text-white/70 text-lg mb-12">
              Il nostro team di esperti e pronto a rispondere.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contatti" variant="primary" size="lg">
                <Mail className="w-5 h-5 mr-2" />
                Contattaci
              </Button>
              <a
                href="tel:+3909631951395"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Chiama Ora
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
