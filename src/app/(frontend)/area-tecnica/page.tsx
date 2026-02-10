'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Award, Shield, Home, Leaf, Zap, ArrowRight,
  Clock, Thermometer, Timer, Volume2,
  Phone, Mail, Building2
} from 'lucide-react'
import Button from '@/components/ui/Button'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

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
  { icon: Thermometer, name: 'Trasmittanza', value: '0.12', unit: 'W/m\u00b2K', label: 'Isolamento termico' },
  { icon: Timer, name: 'Sfasamento', value: '12+', unit: 'ore', label: 'Inerzia termica' },
  { icon: Volume2, name: 'Isolamento acustico', value: '55', unit: 'dB', label: 'Abbattimento rumore' },
  { icon: Shield, name: 'Resistenza sismica', value: 'Zona 1', unit: '', label: 'Certificazione massima' },
]

const comparisonRows = [
  { aspect: 'Tempi di costruzione', ecolive: '30-45 giorni', traditional: '12-18 mesi' },
  { aspect: 'Classe energetica', ecolive: 'A4 garantita', traditional: 'B-C media' },
  { aspect: 'Resistenza sismica', ecolive: 'Zona 1', traditional: 'Variabile' },
  { aspect: 'Costo indicativo', ecolive: '\u20ac1.100-1.500/mq', traditional: '\u20ac1.500-2.500/mq' },
  { aspect: 'Impatto ambientale', ecolive: 'CO\u2082 negativo', traditional: 'CO\u2082 positivo' },
]

const summaryStats = [
  { value: '30', unit: 'giorni', label: 'Costruzione' },
  { value: '90%', unit: '', label: 'Risparmio energia' },
  { value: 'REI 60', unit: '', label: 'Resistenza fuoco' },
  { value: '30', unit: 'anni', label: 'Garanzia struttura' },
  { value: '25+', unit: 'anni', label: 'Esperienza' },
  { value: 'A4', unit: '', label: 'Classe energetica' },
]

export default function AreaTecnicaPage() {
  return (
    <main className="min-h-screen bg-[#FFFCF7]">

      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-[#1E3D30] via-[#2D5A47] to-[#1E3D30] py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Area Tecnica
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-white/70 max-w-2xl mx-auto mb-12"
          >
            Certificazioni, prestazioni e specifiche del sistema X-Frame
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 md:gap-10"
          >
            {[
              { value: '4', label: 'Certificazioni' },
              { value: 'A4', label: 'Classe Energia' },
              { value: '30', label: 'Anni Garanzia' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#C4704B]">{stat.value}</div>
                <div className="text-white/50 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CERTIFICAZIONI ===== */}
      <section className="py-20 lg:py-28 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-14">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1E3D30] mb-4">
              Certificazioni
            </h2>
            <p className="text-[#6B6560] text-lg">
              I nostri standard di qualita riconosciuti a livello internazionale
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, i) => {
              const Icon = cert.icon
              return (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-[#E8E0D5]"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 bg-[#1E3D30]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#1E3D30]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1E3D30]">{cert.name}</h3>
                      <p className="text-[#6B6560] text-sm">{cert.tagline}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <span className="text-2xl font-bold text-[#C4704B]">{cert.value}</span>
                      {cert.unit && <span className="text-sm text-[#6B6560] ml-1">{cert.unit}</span>}
                    </div>
                  </div>
                  <ul className="grid grid-cols-2 gap-2">
                    {cert.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-[#4A4540]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C4704B] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>

          <motion.div {...fadeIn} className="text-center mt-10">
            <Link
              href="/area-tecnica/certificazioni"
              className="inline-flex items-center gap-2 text-[#C4704B] font-semibold hover:gap-3 transition-all"
            >
              Vedi tutte le certificazioni nel dettaglio <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== PRESTAZIONI ===== */}
      <section className="py-20 lg:py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-14">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1E3D30] mb-4">
              Prestazioni
            </h2>
            <p className="text-[#6B6560] text-lg">
              Valori che superano ampiamente gli standard normativi
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {performances.map((perf, i) => {
              const Icon = perf.icon
              return (
                <motion.div
                  key={perf.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#FAF7F2] rounded-2xl p-8 border border-[#E8E0D5]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#1E3D30]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-[#1E3D30]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#6B6560]">{perf.label}</p>
                      <h3 className="text-lg font-bold text-[#1E3D30]">{perf.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-[#C4704B]">{perf.value}</span>
                      {perf.unit && <span className="text-sm text-[#6B6560] ml-1">{perf.unit}</span>}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== CONFRONTO ===== */}
      <section className="py-20 lg:py-28 px-4 bg-[#1E3D30]">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-14">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              X-Frame vs Tradizionale
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-x-auto"
          >
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-4 px-4 text-white/60 font-medium text-sm">Aspetto</th>
                  <th className="py-4 px-4 text-[#C4704B] font-bold">Ecolive X-Frame</th>
                  <th className="py-4 px-4 text-white/50 font-medium">Tradizionale</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.aspect} className={i % 2 === 0 ? 'bg-white/5' : ''}>
                    <td className="py-4 px-4 text-white/80 font-medium">{row.aspect}</td>
                    <td className="py-4 px-4 text-[#C4704B] font-bold">{row.ecolive}</td>
                    <td className="py-4 px-4 text-white/40">{row.traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.p
            {...fadeIn}
            className="text-center text-white/40 text-sm mt-8"
          >
            Valori indicativi basati su progetti realizzati
          </motion.p>
        </div>
      </section>

      {/* ===== NUMERI IN SINTESI ===== */}
      <section className="py-20 lg:py-28 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-14">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1E3D30]">
              In Sintesi
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {summaryStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-[#E8E0D5] text-center"
              >
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="text-3xl md:text-4xl font-bold text-[#1E3D30]">{stat.value}</span>
                  {stat.unit && <span className="text-lg text-[#6B6560]">{stat.unit}</span>}
                </div>
                <p className="text-[#6B6560] text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 lg:py-28 px-4 bg-[#1E3D30]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Hai domande tecniche?
            </h2>
            <p className="text-white/70 text-lg mb-10">
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
          </motion.div>
        </div>
      </section>
    </main>
  )
}
