'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone } from 'lucide-react'

// --- Static Data ---

const heroStats = [
  { value: '29 cm', label: 'Spessore parete' },
  { value: 'A4', label: 'Classe energetica' },
  { value: '30 anni', label: 'Garanzia struttura' },
]

const threePillars = [
  {
    title: 'Struttura',
    description: 'Telaio portante in legno lamellare di abete, con giunzioni ingegnerizzate per la massima resistenza sismica.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
  {
    title: 'Isolamento',
    description: 'Fibra di legno ad alta densita integrata nel pannello per un isolamento termoacustico senza ponti termici.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
  {
    title: 'Finitura',
    description: 'Pannello pronto per la posa di rivestimenti interni ed esterni, senza necessita di sottofondi aggiuntivi.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
]

const wallLayers = [
  { name: 'Intonaco esterno', thickness: '1.5 cm', color: '#A0937D' },
  { name: 'Pannello in fibra di legno', thickness: '6 cm', color: '#8B7355' },
  { name: 'OSB strutturale', thickness: '1.5 cm', color: '#C4A47B' },
  { name: 'Montanti in abete + isolante', thickness: '12 cm', color: '#D4B896' },
  { name: 'Freno vapore igrovariabile', thickness: '0.2 cm', color: '#B8C4D0' },
  { name: 'Intercapedine impianti + isolante', thickness: '5 cm', color: '#E8D5B7' },
  { name: 'Lastra in cartongesso', thickness: '2.5 cm', color: '#F0E8DC' },
]

const technicalSpecs = [
  {
    value: '0.169',
    unit: 'W/m\u00b2K',
    label: 'Trasmittanza parete',
    context: 'Il limite di legge e 0.26: superiamo lo standard del 35%',
  },
  {
    value: '10.8',
    unit: 'ore',
    label: 'Sfasamento termico',
    context: 'Il calore estivo impiega quasi 11 ore per attraversare la parete',
  },
  {
    value: '58',
    unit: 'dB',
    label: 'Abbattimento acustico',
    context: 'Silenzio assoluto: supera ampiamente i 40 dB richiesti dalla norma',
  },
  {
    value: 'Zona 1',
    unit: '',
    label: 'Resistenza sismica',
    context: 'Certificata per le zone a massima sismicita del territorio italiano',
  },
]

const comparison = [
  {
    feature: 'Tempo montaggio struttura',
    xframe: '1 giorno',
    traditional: '2-3 mesi',
    xlam: '3-5 giorni',
  },
  {
    feature: 'Classe energetica',
    xframe: 'A4',
    traditional: 'B / C',
    xlam: 'A3 / A4',
  },
  {
    feature: 'Ponti termici',
    xframe: 'Eliminati',
    traditional: 'Presenti',
    xlam: 'Ridotti',
  },
  {
    feature: 'Flessibilita progettuale',
    xframe: 'Massima',
    traditional: 'Alta',
    xlam: 'Limitata',
  },
  {
    feature: 'Garanzia struttura',
    xframe: '30 anni',
    traditional: '10 anni',
    xlam: '20 anni',
  },
  {
    feature: 'Costo al mq (grezzo)',
    xframe: 'Competitivo',
    traditional: 'Medio-alto',
    xlam: 'Alto',
  },
]

const renderImages = [
  {
    src: '/images/xframe-render/optimized/spaccato-copertina.webp',
    alt: 'Spaccato costruttivo sistema X-Frame Ecolive',
    caption: 'Spaccato Sistema X-Frame',
  },
  {
    src: '/images/xframe-render/optimized/render-avanzato.webp',
    alt: 'Render configurazione avanzata X-Frame',
    caption: 'Configurazione Avanzata',
  },
  {
    src: '/images/xframe-render/optimized/render-base.webp',
    alt: 'Render configurazione base X-Frame',
    caption: 'Configurazione Base',
  },
  {
    src: '/images/xframe-render/optimized/tetto-3-strati.webp',
    alt: 'Stratigrafia tetto 3 strati Ecolive',
    caption: 'Tetto a 3 Strati',
  },
  {
    src: '/images/xframe-render/optimized/vista-sopra.webp',
    alt: 'Vista dall\'alto struttura X-Frame',
    caption: 'Vista dall\'Alto',
  },
  {
    src: '/images/xframe-render/optimized/tetto-principale.webp',
    alt: 'Sistema tetto principale X-Frame',
    caption: 'Sistema Tetto Principale',
  },
]

// --- Page Component ---

export default function SistemaXFramePage() {
  return (
    <main className="min-h-screen">

      {/* ========== 1. HERO ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1E3D30]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/xframe-render/optimized/render-avanzato.webp"
            alt="Sistema X-Frame render"
            fill
            priority
            className="object-cover object-center opacity-30"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3D30]/60 via-[#1E3D30]/40 to-[#1E3D30]/80" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.span
            className="inline-block px-4 py-2 mb-8 text-sm font-semibold text-[#C4704B] bg-white/10 backdrop-blur-sm rounded-full border border-[#C4704B]/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Tecnologia Brevettata
          </motion.span>

          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Sistema <span className="text-[#C4704B]">X-Frame</span> 2.0
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            La tecnologia costruttiva che ridefinisce il concetto di casa in legno.
            Struttura, isolamento e finitura in un unico pannello.
          </motion.p>

          {/* 3 hero stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#C4704B]">{stat.value}</div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== 2. CHE COS'E X-FRAME ========== */}
      <section className="py-24 lg:py-32 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1E3D30]">
              Tre Sistemi, <span className="text-[#C4704B]">Un Pannello</span>
            </h2>
            <p className="text-[#6B6560] text-lg max-w-2xl mx-auto mt-4">
              X-Frame unisce il meglio del Platform Frame, dell'X-Lam e del Post &amp; Beam
              in un unico sistema costruttivo brevettato.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
            {threePillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1E3D30]/5 text-[#1E3D30] mb-5">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1E3D30] mb-3">{pillar.title}</h3>
                <p className="text-[#6B6560] leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Large image */}
          <motion.div
            className="relative aspect-[16/9] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/xframe-render/optimized/spaccato-copertina.webp"
              alt="Spaccato costruttivo del pannello X-Frame"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </motion.div>
        </div>
      </section>

      {/* ========== 3. STRATIGRAFIA ========== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1E3D30]">
              Stratigrafia della <span className="text-[#C4704B]">Parete</span>
            </h2>
            <p className="text-[#6B6560] text-lg max-w-2xl mx-auto mt-4">
              7 strati ingegnerizzati per 29 cm di parete ad altissime prestazioni
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/images/xframe-render/optimized/render-base.webp"
                alt="Stratigrafia parete X-Frame"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </motion.div>

            {/* Layers list */}
            <div className="space-y-0">
              {wallLayers.map((layer, i) => (
                <motion.div
                  key={layer.name}
                  className="flex items-center gap-4 py-4 border-b border-[#1E3D30]/10 last:border-b-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: layer.color }}
                  />
                  <div className="flex-1">
                    <span className="text-[#1E3D30] font-medium">{layer.name}</span>
                  </div>
                  <span className="text-[#C4704B] font-semibold tabular-nums">{layer.thickness}</span>
                </motion.div>
              ))}

              {/* Total */}
              <div className="flex items-center gap-4 pt-6 mt-2 border-t-2 border-[#1E3D30]">
                <div className="w-4 h-4 flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-[#1E3D30] font-bold text-lg">Spessore totale</span>
                </div>
                <span className="text-[#C4704B] font-bold text-xl">28.7 cm</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 4. PRESTAZIONI TECNICHE ========== */}
      <section className="py-24 lg:py-32 bg-[#1E3D30]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
              Prestazioni <span className="text-[#C4704B]">Certificate</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mt-4">
              Valori che superano ampiamente gli standard normativi italiani
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {technicalSpecs.map((spec, i) => (
              <motion.div
                key={spec.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-[#C4704B] mb-1">
                  {spec.value}
                </div>
                {spec.unit && (
                  <div className="text-white/40 text-sm mb-4">{spec.unit}</div>
                )}
                {!spec.unit && <div className="mb-4" />}
                <div className="text-white font-semibold text-lg mb-3">{spec.label}</div>
                <p className="text-white/50 text-sm leading-relaxed">{spec.context}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 5. CONFRONTO ========== */}
      <section className="py-24 lg:py-32 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1E3D30]">
              Perche <span className="text-[#C4704B]">X-Frame</span>
            </h2>
            <p className="text-[#6B6560] text-lg max-w-2xl mx-auto mt-4">
              Un confronto diretto con i sistemi costruttivi tradizionali
            </p>
          </motion.div>

          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-[#1E3D30]">
                  <th className="text-left py-4 pr-4 text-[#6B6560] font-medium text-sm uppercase tracking-wider">
                    Caratteristica
                  </th>
                  <th className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1E3D30] text-white rounded-full text-sm font-semibold">
                      X-Frame
                    </span>
                  </th>
                  <th className="py-4 px-4 text-center text-[#6B6560] font-medium text-sm">
                    Tradizionale
                  </th>
                  <th className="py-4 pl-4 text-center text-[#6B6560] font-medium text-sm">
                    X-Lam
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className="border-b border-[#1E3D30]/10">
                    <td className="py-4 pr-4 text-[#1E3D30] font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-[#C4704B] font-semibold">{row.xframe}</td>
                    <td className="py-4 px-4 text-center text-[#6B6560]">{row.traditional}</td>
                    <td className="py-4 pl-4 text-center text-[#6B6560]">{row.xlam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ========== 6. RENDER SHOWCASE ========== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1E3D30]">
              Dettagli <span className="text-[#C4704B]">Costruttivi</span>
            </h2>
            <p className="text-[#6B6560] text-lg max-w-2xl mx-auto mt-4">
              Render tecnici della struttura e della copertura X-Frame
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {renderImages.map((img, i) => (
              <motion.div
                key={img.src}
                className={`group relative overflow-hidden rounded-2xl ${
                  i === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes={i === 0 ? '(max-width: 768px) 100vw, 1200px' : '(max-width: 768px) 100vw, 600px'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-white font-semibold text-lg">{img.caption}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 7. CTA ========== */}
      <section className="py-24 lg:py-32 bg-[#1E3D30]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
              Scopri come X-Frame puo trasformare il tuo <span className="text-[#C4704B]">progetto</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
              Prenota una consulenza gratuita con i nostri tecnici per scoprire
              la soluzione costruttiva ideale per la tua casa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#C4704B] hover:bg-[#A85A3A] text-white font-semibold text-lg rounded-xl transition-colors duration-300"
              >
                Richiedi Consulenza Gratuita
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+3909631951395"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-transparent text-white font-semibold text-lg rounded-xl border border-white/20 hover:bg-white/5 transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
                Chiama Ora
              </a>
            </div>
            <p className="text-white/30 text-sm mt-6">
              Consulenza gratuita &middot; Risposta entro 24 ore
            </p>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
