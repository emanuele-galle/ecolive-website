'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle, Shield, FileText, Download, ExternalLink, ArrowLeft,
  Scale, Zap, Flame, Volume2, BadgeCheck, Building2, Home, Leaf,
  Phone, Mail
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
    id: 'passive',
    name: 'Passive House',
    logo: '/api/media/file/passive-house.png',
    mainStat: '15 kWh/m\u00b2',
    statLabel: 'Consumo max annuo',
    description: 'Lo standard internazionale piu rigoroso per edifici ad altissima efficienza energetica.',
    details: [
      'Consumo energetico max 15 kWh/m\u00b2/anno',
      'Trasmittanza termica U < 0.15 W/m\u00b2K',
      'Tenuta all\'aria n50 < 0.6/h',
      'Assenza di ponti termici',
      'Ventilazione meccanica con recupero calore > 75%',
    ],
    link: 'https://passivehouse.com/',
    accent: '#C4704B',
    icon: Home,
  },
  {
    id: 'casaclima',
    name: 'Casa Clima',
    logo: '/api/media/file/casa-clima.png',
    mainStat: 'Gold',
    statLabel: 'Classe certificazione',
    description: 'La certificazione italiana per edifici sostenibili, salubri e ad alta efficienza.',
    details: [
      'Classi da Gold ad A (migliori prestazioni)',
      'Valutazione dell\'intero ciclo di vita',
      'Comfort abitativo certificato',
      'Riduzione emissioni CO2',
      'Qualita dell\'aria interna garantita',
    ],
    link: 'https://www.agenziacasaclima.it/',
    accent: '#40916c',
    icon: Leaf,
  },
  {
    id: 'arca',
    name: 'ARCA',
    logo: '/api/media/file/arca.png',
    mainStat: '100%',
    statLabel: 'Tracciabilita materiali',
    description: 'Architettura Comfort Ambiente - Lo standard italiano specifico per le costruzioni in legno.',
    details: [
      'Controllo qualita in produzione',
      'Tracciabilita dei materiali',
      'Prestazioni strutturali certificate',
      'Durabilita garantita',
      'Sostenibilita ambientale verificata',
    ],
    link: 'https://www.arcacert.com/',
    accent: '#2D5A47',
    icon: Shield,
  },
  {
    id: 'a4',
    name: 'Classe A4',
    logo: null,
    mainStat: 'NZEB',
    statLabel: 'Nearly Zero Energy',
    description: 'La massima classe energetica prevista dalla normativa italiana (NZEB - Nearly Zero Energy Building).',
    details: [
      'Consumo quasi zero',
      'Produzione energia da fonti rinnovabili',
      'Isolamento termico superiore',
      'Impianti ad alta efficienza',
      'Comfort termico tutto l\'anno',
    ],
    link: null,
    accent: '#C9A86C',
    icon: Zap,
  },
]

const seismicFeatures = [
  {
    icon: Scale,
    title: 'Calcoli strutturali',
    description: 'Progettazione sismica avanzata secondo NTC 2018',
  },
  {
    icon: BadgeCheck,
    title: 'Materiali certificati',
    description: 'Legno lamellare con marcatura CE e certificazione di prodotto',
  },
  {
    icon: Building2,
    title: 'Collegamenti antisismici',
    description: 'Connessioni metalliche certificate per dissipazione energia',
  },
  {
    icon: Shield,
    title: 'Collaudo statico',
    description: 'Verifica e certificazione da parte di strutturista abilitato',
  },
]

const documents = [
  {
    title: 'Brochure Ecolive 2025',
    description: 'Catalogo completo prodotti e servizi',
    url: 'http://127.0.0.1:9000/ecolive-media/documenti/Brochure-2025.pdf',
    size: '8.4 MB',
    type: 'PDF',
  },
]

const normativeCategories = [
  {
    id: 'strutturale',
    icon: Scale,
    title: 'Normativa Strutturale',
    items: [
      'NTC 2018 - Norme Tecniche per le Costruzioni',
      'Circolare n. 7/2019 - Istruzioni applicative',
      'Eurocodice 5 - Progettazione strutture in legno',
      'Eurocodice 8 - Progettazione antisismica',
    ],
  },
  {
    id: 'energetica',
    icon: Zap,
    title: 'Normativa Energetica',
    items: [
      'D.Lgs. 192/2005 e s.m.i. - Efficienza energetica',
      'DM 26/06/2015 - Requisiti minimi',
      'UNI EN ISO 13790 - Calcolo fabbisogno energetico',
      'UNI TS 11300 - Prestazioni energetiche edifici',
    ],
  },
  {
    id: 'antincendio',
    icon: Flame,
    title: 'Normativa Antincendio',
    items: [
      'DM 03/08/2015 - Codice di prevenzione incendi',
      'DM 14/01/2008 - Reazione al fuoco materiali',
      'EN 13501-1 - Classificazione al fuoco',
      'EN 1995-1-2 - Eurocodice 5 (fuoco)',
    ],
  },
  {
    id: 'acustica',
    icon: Volume2,
    title: 'Normativa Acustica',
    items: [
      'DPCM 05/12/1997 - Requisiti acustici passivi',
      'UNI 11367 - Classificazione acustica',
      'EN ISO 140 - Misurazione isolamento',
      'EN ISO 717 - Valutazione isolamento',
    ],
  },
]

export default function CertificazioniPage() {
  const [activeCert, setActiveCert] = useState<string>('passive')
  const [activeNorm, setActiveNorm] = useState<string>('strutturale')

  const activeCertData = certifications.find(c => c.id === activeCert)!
  const activeNormData = normativeCategories.find(n => n.id === activeNorm)!

  return (
    <main className="min-h-screen bg-[#FFFCF7]">

      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-[#1E3D30] via-[#2D5A47] to-[#1E3D30] py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/area-tecnica"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Area Tecnica</span>
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Le Nostre <span className="text-[#C4704B]">Certificazioni</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/70 max-w-2xl mb-12"
          >
            Standard internazionali che garantiscono qualita, efficienza e sostenibilita delle nostre costruzioni.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-8 md:gap-12"
          >
            {[
              { value: '4', label: 'Certificazioni' },
              { value: '15', label: 'kWh/m\u00b2/anno', color: '#C4704B' },
              { value: '1', label: 'Zona Sismica' },
              { value: 'A4', label: 'Classe NZEB' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-4xl md:text-5xl font-bold ${stat.color ? `text-[${stat.color}]` : 'text-white'}`} style={stat.color ? { color: stat.color } : undefined}>
                  {stat.value}
                </div>
                <div className="text-sm text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PANORAMICA CERTIFICAZIONI ===== */}
      <section className="py-20 lg:py-28 px-4 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-14">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1E3D30]">I Nostri Standard</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {certifications.map((cert, i) => {
              const Icon = cert.icon
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-[#E8E0D5] text-center"
                >
                  {cert.logo ? (
                    <div className="w-16 h-16 bg-white rounded-xl p-2 flex items-center justify-center shadow-sm border border-[#E8E0D5] mx-auto mb-4">
                      <Image src={cert.logo} alt={cert.name} width={48} height={48} className="object-contain" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${cert.accent}15` }}>
                      <Icon className="w-8 h-8" style={{ color: cert.accent }} />
                    </div>
                  )}
                  <h3 className="font-bold text-[#1E3D30] mb-1">{cert.name}</h3>
                  <div className="text-2xl font-bold mt-3" style={{ color: cert.accent }}>{cert.mainStat}</div>
                  <div className="text-[#6B6560] text-xs mt-1">{cert.statLabel}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== DETTAGLIO CERTIFICAZIONI (Tabs) ===== */}
      <section className="py-20 lg:py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1E3D30]">Dettaglio Certificazioni</h2>
          </motion.div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <div className="inline-flex bg-[#FAF7F2] rounded-2xl p-2 gap-2 border border-[#E8E0D5]">
              {certifications.map((cert) => {
                const Icon = cert.icon
                return (
                  <button
                    key={cert.id}
                    onClick={() => setActiveCert(cert.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                      activeCert === cert.id
                        ? 'bg-[#C4704B] text-white shadow-lg shadow-[#C4704B]/25'
                        : 'text-[#6B6560] hover:text-[#1E3D30] hover:bg-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{cert.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCert}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-8 items-start"
            >
              {/* Left - Info Card */}
              <div className="bg-[#FAF7F2] rounded-2xl p-8 border border-[#E8E0D5]">
                <div className="flex items-center gap-4 mb-6">
                  {activeCertData.logo ? (
                    <div className="w-20 h-20 bg-white rounded-2xl p-3 flex items-center justify-center shadow-sm border border-[#E8E0D5]">
                      <Image src={activeCertData.logo} alt={activeCertData.name} width={56} height={56} className="object-contain" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${activeCertData.accent}15` }}>
                      <activeCertData.icon className="w-10 h-10" style={{ color: activeCertData.accent }} />
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-[#1E3D30]">{activeCertData.name}</h3>
                    {activeCertData.link && (
                      <a href={activeCertData.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-[#C4704B] hover:underline mt-1">
                        <span>Sito ufficiale</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-[#E8E0D5] mb-6">
                  <span className="text-4xl font-bold" style={{ color: activeCertData.accent }}>{activeCertData.mainStat}</span>
                  <p className="text-[#6B6560] mt-1">{activeCertData.statLabel}</p>
                </div>

                <p className="text-[#6B6560] leading-relaxed">{activeCertData.description}</p>
              </div>

              {/* Right - Details */}
              <div className="bg-white rounded-2xl p-8 border border-[#E8E0D5]">
                <h4 className="font-bold text-[#1E3D30] mb-6 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C4704B]" />
                  Caratteristiche Principali
                </h4>
                <ul className="space-y-4">
                  {activeCertData.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FAF7F2] transition-colors">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: activeCertData.accent }} />
                      <span className="text-[#4A4540]">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ===== SICUREZZA SISMICA ===== */}
      <section className="py-20 lg:py-28 px-4 bg-[#1E3D30]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-14">
            <div className="w-16 h-16 bg-[#C4704B]/20 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-[#C4704B]" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Sicurezza Sismica - Zona 1</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Le strutture X-Frame sono certificate per la zona sismica piu restrittiva d&apos;Italia.
            </p>
          </motion.div>

          <motion.div {...fadeIn} className="flex flex-wrap justify-center gap-8 md:gap-16 mb-14">
            {[
              { value: '1', label: 'Zona Sismica' },
              { value: '2018', label: 'NTC Standard' },
              { value: '25+', label: 'Anni Garanzia' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#C4704B]">{stat.value}</div>
                <div className="text-white/60 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seismicFeatures.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10"
                >
                  <div className="w-12 h-12 bg-[#C4704B]/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#C4704B]" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== DOCUMENTAZIONE ===== */}
      <section className="py-20 lg:py-28 px-4 bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-12">
            <div className="w-16 h-16 bg-[#C4704B]/10 rounded-xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-[#C4704B]" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1E3D30] mb-4">Documentazione</h2>
            <p className="text-[#6B6560] text-lg">Scarica la documentazione tecnica e commerciale</p>
          </motion.div>

          <div className="space-y-4">
            {documents.map((doc, i) => (
              <motion.a
                key={i}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex items-center gap-6 p-6 bg-white rounded-2xl border border-[#E8E0D5] hover:border-[#C4704B]/30 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-[#C4704B]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#C4704B] transition-colors">
                  <Download className="w-7 h-7 text-[#C4704B] group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-[#1E3D30] text-lg group-hover:text-[#C4704B] transition-colors">{doc.title}</h3>
                    <span className="px-2 py-0.5 bg-[#C4704B]/10 text-[#C4704B] text-xs font-semibold rounded">{doc.type}</span>
                  </div>
                  <p className="text-[#6B6560]">{doc.description}</p>
                </div>
                <span className="text-[#6B6560] text-sm">{doc.size}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NORMATIVE ===== */}
      <section className="py-20 lg:py-28 px-4 bg-[#1E3D30]">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">Normative di Riferimento</h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <div className="inline-flex bg-white/5 rounded-2xl p-2 gap-2 border border-white/10">
              {normativeCategories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveNorm(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                      activeNorm === cat.id
                        ? 'bg-[#C4704B] text-white shadow-lg shadow-[#C4704B]/25'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{cat.title.replace('Normativa ', '')}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeNorm}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#C4704B]/20 rounded-xl flex items-center justify-center">
                    <activeNormData.icon className="w-6 h-6 text-[#C4704B]" />
                  </div>
                  <h3 className="text-white font-bold text-xl">{activeNormData.title}</h3>
                </div>
                <ul className="space-y-3">
                  {activeNormData.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <CheckCircle className="w-5 h-5 text-[#C4704B] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 lg:py-28 px-4 bg-[#C4704B]">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeIn} className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
                Vuoi saperne di piu?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Il nostro team tecnico e a disposizione per fornirti tutte le informazioni
                sulle certificazioni e le normative.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/contatti" variant="secondary" size="lg">
                  Contatta il Team
                </Button>
                <Button href="/area-tecnica" variant="ghost" size="lg" className="!text-white hover:!bg-white/10">
                  Torna all&apos;Area Tecnica
                </Button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Contatti Rapidi</h3>
              <div className="space-y-4">
                <a href="tel:+390968441431" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>+39 0968 441431</span>
                </a>
                <a href="mailto:info@ecolive.srl" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>info@ecolive.srl</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
