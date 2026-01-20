'use client'

import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle, Shield, FileText, Download, ExternalLink, ChevronDown, ArrowLeft,
  Scale, Zap, Flame, Volume2, BadgeCheck, Building2, Clock, Home, Leaf,
  Phone, Mail, ArrowRight
} from 'lucide-react'
import Button from '@/components/ui/Button'

// AnimatedCounter component
function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2
}: {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const formatted = value < 1 ? latest.toFixed(2) : Math.floor(latest).toString()
        ref.current.textContent = prefix + formatted + suffix
      }
    })
    return unsubscribe
  }, [springValue, suffix, prefix, value])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

// Data
const certifications = [
  {
    id: 'passive',
    name: 'Passive House',
    logo: '/api/media/file/passive-house.png',
    mainStat: { value: 15, suffix: '', unit: 'kWh/m²' },
    statLabel: 'Consumo max annuo',
    description: 'Lo standard internazionale più rigoroso per edifici ad altissima efficienza energetica.',
    details: [
      'Consumo energetico max 15 kWh/m²/anno',
      'Trasmittanza termica U < 0.15 W/m²K',
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
    mainStat: { value: 'Gold', suffix: '', unit: '' },
    statLabel: 'Classe certificazione',
    description: 'La certificazione italiana per edifici sostenibili, salubri e ad alta efficienza.',
    details: [
      'Classi da Gold ad A (migliori prestazioni)',
      'Valutazione dell\'intero ciclo di vita',
      'Comfort abitativo certificato',
      'Riduzione emissioni CO2',
      'Qualità dell\'aria interna garantita',
    ],
    link: 'https://www.agenziacasaclima.it/',
    accent: '#40916c',
    icon: Leaf,
  },
  {
    id: 'arca',
    name: 'ARCA',
    logo: '/api/media/file/arca.png',
    mainStat: { value: 100, suffix: '%', unit: '' },
    statLabel: 'Tracciabilità materiali',
    description: 'Architettura Comfort Ambiente - Lo standard italiano specifico per le costruzioni in legno.',
    details: [
      'Controllo qualità in produzione',
      'Tracciabilità dei materiali',
      'Prestazioni strutturali certificate',
      'Durabilità garantita',
      'Sostenibilità ambientale verificata',
    ],
    link: 'https://www.arcacert.com/',
    accent: '#2D5A47',
    icon: Shield,
  },
  {
    id: 'a4',
    name: 'Classe A4',
    logo: null,
    mainStat: { value: 'NZEB', suffix: '', unit: '' },
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

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

export default function CertificazioniPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const bentoRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const seismicRef = useRef<HTMLDivElement>(null)
  const docsRef = useRef<HTMLDivElement>(null)
  const normRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const bentoInView = useInView(bentoRef, { once: false, margin: "-100px" })
  const tabsInView = useInView(tabsRef, { once: false, margin: "-100px" })
  const seismicInView = useInView(seismicRef, { once: false, margin: "-100px" })
  const docsInView = useInView(docsRef, { once: false, margin: "-100px" })
  const normInView = useInView(normRef, { once: false, margin: "-100px" })
  const ctaInView = useInView(ctaRef, { once: false, margin: "-100px" })

  const [activeCert, setActiveCert] = useState<'passive' | 'casaclima' | 'arca' | 'a4'>('passive')
  const [activeNorm, setActiveNorm] = useState<'strutturale' | 'energetica' | 'antincendio' | 'acustica'>('strutturale')

  const activeCertData = certifications.find(c => c.id === activeCert)!
  const activeNormData = normativeCategories.find(n => n.id === activeNorm)!

  return (
    <main className="min-h-screen bg-[#FFFCF7]">
      {/* ===== HERO FULL-SCREEN ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(135deg, #1E3D30 0%, #2D5A47 50%, #1E3D30 100%)',
              'linear-gradient(135deg, #2D5A47 0%, #1E3D30 50%, #2D5A47 100%)',
              'linear-gradient(135deg, #1E3D30 0%, #2D5A47 50%, #1E3D30 100%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Parallax Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.05]"
          style={{ y: heroY }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}
          />
        </motion.div>

        {/* Floating Shapes with Scale */}
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-[#C4704B]/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-48 h-48 bg-[#40916c]/15 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -40, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-4 py-24"
          style={{ opacity: heroOpacity }}
        >
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/area-tecnica"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Area Tecnica</span>
            </Link>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/10"
          >
            <BadgeCheck className="w-4 h-4 text-[#C4704B]" />
            <span className="text-white/90 text-sm font-medium">Standard Internazionali</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Le Nostre
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="block text-[#C4704B]"
            >
              Certificazioni
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-xl md:text-2xl text-white/70 max-w-2xl mb-12"
          >
            Standard internazionali che garantiscono qualita, efficienza e sostenibilita delle nostre costruzioni.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            className="flex flex-wrap justify-start gap-8 md:gap-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white">
                <AnimatedCounter value={4} suffix="" />
              </div>
              <div className="text-sm text-white/60 mt-1">Certificazioni</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#C4704B]">15</div>
              <div className="text-sm text-white/60 mt-1">kWh/m²/anno</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white">
                <AnimatedCounter value={1} suffix="" />
              </div>
              <div className="text-sm text-white/60 mt-1">Zona Sismica</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white">A4</div>
              <div className="text-sm text-white/60 mt-1">Classe NZEB</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.9 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/60 text-sm font-medium">Scopri di piu</span>
            <ChevronDown className="w-6 h-6 text-white/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== BENTO GRID - I NOSTRI STANDARD ===== */}
      <section ref={bentoRef} className="min-h-screen flex items-center py-24 lg:py-32 px-4 bg-[#FAF7F2] relative overflow-hidden">
        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #2C2825 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Decorative blurs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2D5A47]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#C4704B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={bentoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <span className="text-[#C4704B] font-semibold text-sm uppercase tracking-wider">Eccellenza Certificata</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mt-3">I Nostri Standard</h2>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Large "4" Card */}
            <motion.div
              className="col-span-2 row-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E3D30] to-[#2D5A47] p-8 md:p-10 group cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={bentoInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Dot Pattern */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Glow Effect */}
              <motion.div
                className="absolute -top-10 -right-10 w-64 h-64 bg-[#C4704B]/30 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Content */}
              <div className="relative z-10 h-full min-h-[280px] md:min-h-[320px] flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-[#C4704B]/20 rounded-2xl flex items-center justify-center mb-4">
                    <BadgeCheck className="w-7 h-7 text-[#C4704B]" />
                  </div>
                  <p className="text-white/60 text-sm uppercase tracking-wider mb-2">Certificazioni Attive</p>
                </div>

                {/* Big Number */}
                <div className="relative">
                  <motion.div
                    className="text-9xl md:text-[12rem] font-bold text-white leading-none"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <AnimatedCounter value={4} suffix="" duration={2.5} />
                  </motion.div>
                  {/* Glow text */}
                  <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-white blur-2xl opacity-20 leading-none">4</div>
                </div>

                <p className="text-white/80 text-xl md:text-2xl">Standard Internazionali</p>
              </div>
            </motion.div>

            {/* Passive House Card */}
            <motion.div
              className="relative overflow-hidden rounded-2xl bg-white p-6 border border-[#E8E0D5] group hover:border-[#C4704B]/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={bentoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-white rounded-xl p-2 flex items-center justify-center shadow-md border border-[#E8E0D5] mb-4">
                <Image
                  src="/api/media/file/passive-house.png"
                  alt="Passive House"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-[#1E3D30] mb-1">Passive House</h3>
              <p className="text-gray-500 text-sm mb-4">Massima efficienza</p>
              <div className="pt-4 border-t border-[#E8E0D5]">
                <div className="text-3xl font-bold text-[#C4704B]">
                  <AnimatedCounter value={15} suffix="" />
                </div>
                <div className="text-gray-400 text-xs">kWh/m² anno</div>
              </div>
            </motion.div>

            {/* Casa Clima Card */}
            <motion.div
              className="relative overflow-hidden rounded-2xl bg-white p-6 border border-[#E8E0D5] group hover:border-[#40916c]/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={bentoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-white rounded-xl p-2 flex items-center justify-center shadow-md border border-[#E8E0D5] mb-4">
                <Image
                  src="/api/media/file/casa-clima.png"
                  alt="Casa Clima"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-[#1E3D30] mb-1">Casa Clima</h3>
              <p className="text-gray-500 text-sm mb-4">Certificazione italiana</p>
              <div className="pt-4 border-t border-[#E8E0D5]">
                <div className="text-3xl font-bold text-[#40916c]">Gold</div>
                <div className="text-gray-400 text-xs">Classe massima</div>
              </div>
            </motion.div>

            {/* ARCA + A4 Wide Card */}
            <motion.div
              className="col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2D5A47] to-[#1E3D30] p-6 group"
              initial={{ opacity: 0, y: 20 }}
              animate={bentoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Dot pattern */}
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '20px 20px'
                }}
              />

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {/* ARCA */}
                  <div className="text-center">
                    <div className="w-14 h-14 bg-white/10 rounded-xl p-2 flex items-center justify-center mb-2">
                      <Image
                        src="/api/media/file/arca.png"
                        alt="ARCA"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <p className="text-white/60 text-xs">ARCA</p>
                  </div>

                  {/* Plus sign */}
                  <div className="text-white/40 text-2xl font-light">+</div>

                  {/* A4 */}
                  <div className="text-center">
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-2">
                      <Zap className="w-7 h-7 text-[#C9A86C]" />
                    </div>
                    <p className="text-white/60 text-xs">Classe A4</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl md:text-4xl font-bold text-white">100%</div>
                  <p className="text-white/60 text-sm">Tracciabilita + NZEB</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            className="mt-8 grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={bentoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-white rounded-2xl p-4 border border-[#E8E0D5] text-center">
              <div className="text-2xl font-bold text-[#C4704B]">
                <AnimatedCounter value={30} suffix="" />
              </div>
              <div className="text-gray-500 text-sm">Giorni montaggio</div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-[#E8E0D5] text-center">
              <div className="text-2xl font-bold text-[#2D5A47]">A4</div>
              <div className="text-gray-500 text-sm">Classe energetica</div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-[#E8E0D5] text-center">
              <div className="text-2xl font-bold text-[#C4704B]">
                <AnimatedCounter value={25} suffix="+" />
              </div>
              <div className="text-gray-500 text-sm">Anni garanzia</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TABS CERTIFICAZIONI ===== */}
      <section ref={tabsRef} className="py-24 lg:py-32 px-4 bg-white relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C4704B]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={tabsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <span className="text-[#C4704B] font-semibold text-sm uppercase tracking-wider">Approfondimenti</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mt-3">Dettaglio Certificazioni</h2>
          </motion.div>

          {/* Tab Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={tabsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex bg-[#FAF7F2] rounded-2xl p-2 gap-2 border border-[#E8E0D5]">
              {certifications.map((cert) => {
                const Icon = cert.icon
                return (
                  <motion.button
                    key={cert.id}
                    onClick={() => setActiveCert(cert.id as typeof activeCert)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                      activeCert === cert.id
                        ? 'bg-[#C4704B] text-white shadow-lg shadow-[#C4704B]/25'
                        : 'text-[#6B6560] hover:text-[#1E3D30] hover:bg-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{cert.name}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCert}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-8 items-start"
            >
              {/* Left - Info Card */}
              <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#E8E0D5]">
                {/* Logo/Icon */}
                <div className="flex items-center gap-4 mb-6">
                  {activeCertData.logo ? (
                    <div className="w-20 h-20 bg-white rounded-2xl p-3 flex items-center justify-center shadow-md border border-[#E8E0D5]">
                      <Image
                        src={activeCertData.logo}
                        alt={activeCertData.name}
                        width={56}
                        height={56}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${activeCertData.accent}15` }}
                    >
                      <activeCertData.icon className="w-10 h-10" style={{ color: activeCertData.accent }} />
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-[#1E3D30]">{activeCertData.name}</h3>
                    {activeCertData.link && (
                      <a
                        href={activeCertData.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-[#C4704B] hover:underline mt-1"
                      >
                        <span>Sito ufficiale</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Stat Highlight */}
                <div className="bg-white rounded-2xl p-6 border border-[#E8E0D5] mb-6">
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-bold" style={{ color: activeCertData.accent }}>
                      {typeof activeCertData.mainStat.value === 'number' ? (
                        <AnimatedCounter value={activeCertData.mainStat.value} suffix={activeCertData.mainStat.suffix} />
                      ) : (
                        activeCertData.mainStat.value
                      )}
                    </span>
                    {activeCertData.mainStat.unit && (
                      <span className="text-lg text-gray-500 mb-2">{activeCertData.mainStat.unit}</span>
                    )}
                  </div>
                  <p className="text-gray-500 mt-1">{activeCertData.statLabel}</p>
                </div>

                {/* Description */}
                <p className="text-[#6B6560] leading-relaxed">{activeCertData.description}</p>
              </div>

              {/* Right - Details List */}
              <div className="bg-white rounded-3xl p-8 border border-[#E8E0D5] shadow-lg shadow-black/5">
                <h4 className="font-bold text-[#1E3D30] mb-6 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#C4704B]" />
                  Caratteristiche Principali
                </h4>
                <ul className="space-y-4">
                  {activeCertData.details.map((detail, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FAF7F2] transition-colors"
                    >
                      <CheckCircle
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: activeCertData.accent }}
                      />
                      <span className="text-[#4A4540]">{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ===== SEISMIC SAFETY ===== */}
      <section ref={seismicRef} id="sismica" className="relative py-24 lg:py-32 px-4 bg-[#1E3D30] overflow-hidden">
        {/* SVG Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="seismic-grid-small" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#fff" strokeWidth="0.5"/>
              </pattern>
              <pattern id="seismic-grid-large" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#seismic-grid-small)"/>
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#fff" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#seismic-grid-large)"/>
          </svg>
        </div>

        {/* Glow Effects */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-[#C4704B]/15 rounded-full blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative max-w-6xl mx-auto z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={seismicInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={seismicInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="w-20 h-20 bg-[#C4704B]/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Shield className="w-10 h-10 text-[#C4704B]" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Sicurezza Sismica - Zona 1</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Le strutture X-Frame sono certificate per la zona sismica piu restrittiva d&apos;Italia.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={seismicInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#C4704B]">
                <AnimatedCounter value={1} suffix="" />
              </div>
              <div className="text-white/60 text-sm mt-1">Zona Sismica</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#C4704B]">
                <AnimatedCounter value={2018} suffix="" />
              </div>
              <div className="text-white/60 text-sm mt-1">NTC Standard</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#C4704B]">
                <AnimatedCounter value={25} suffix="+" />
              </div>
              <div className="text-white/60 text-sm mt-1">Anni Garanzia</div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={seismicInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {seismicFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#C4704B]/30 hover:bg-white/10 transition-all duration-300"
                >
                  <motion.div
                    className="w-12 h-12 bg-[#C4704B]/20 rounded-xl flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Icon className="w-6 h-6 text-[#C4704B]" />
                  </motion.div>
                  <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== DOCUMENTATION ===== */}
      <section ref={docsRef} id="documentazione" className="relative py-24 lg:py-32 px-4 bg-[#FAF7F2]">
        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #1E3D30 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative max-w-4xl mx-auto z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={docsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={docsInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="w-20 h-20 bg-[#C4704B]/10 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <FileText className="w-10 h-10 text-[#C4704B]" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mb-4">Documentazione</h2>
            <p className="text-[#6B6560] text-lg">
              Scarica la documentazione tecnica e commerciale
            </p>
          </motion.div>

          {/* Documents List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={docsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {documents.map((doc, index) => (
              <motion.a
                key={index}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.01 }}
                className="group relative flex items-center gap-6 p-6 bg-white rounded-2xl border border-[#E8E0D5] hover:border-[#C4704B]/30 hover:shadow-xl hover:shadow-[#C4704B]/10 transition-all duration-300 overflow-hidden"
              >
                {/* Icon with Ring Animation */}
                <motion.div
                  className="w-16 h-16 bg-[#C4704B]/10 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden group-hover:bg-[#C4704B] transition-colors duration-300"
                >
                  {/* Animated Ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-[#C4704B] rounded-xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Download className="w-8 h-8 text-[#C4704B] group-hover:text-white transition-colors duration-300 relative z-10" />
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-[#1E3D30] text-lg group-hover:text-[#C4704B] transition-colors">{doc.title}</h3>
                    <span className="px-2 py-0.5 bg-[#C4704B]/10 text-[#C4704B] text-xs font-semibold rounded">{doc.type}</span>
                  </div>
                  <p className="text-[#6B6560]">{doc.description}</p>
                </div>

                {/* Size */}
                <div className="text-right">
                  <span className="text-[#6B6560] text-sm">{doc.size}</span>
                </div>

                {/* Progress Bar on Hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C4704B]/10 rounded-b-2xl overflow-hidden">
                  <motion.div
                    className="h-full bg-[#C4704B]"
                    initial={{ width: '0%' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== NORMATIVE TABS ===== */}
      <section ref={normRef} id="normative" className="relative py-24 lg:py-32 px-4 bg-[#1E3D30] overflow-hidden">
        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Glow */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C4704B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={normInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="text-center mb-12"
          >
            <span className="text-[#C4704B] font-semibold text-sm uppercase tracking-wider">Conformita</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">Normative di Riferimento</h2>
          </motion.div>

          {/* Tab Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={normInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex bg-white/5 rounded-2xl p-2 gap-2 backdrop-blur-sm border border-white/10">
              {normativeCategories.map((cat) => {
                const Icon = cat.icon
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveNorm(cat.id as typeof activeNorm)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                      activeNorm === cat.id
                        ? 'bg-[#C4704B] text-white shadow-lg shadow-[#C4704B]/25'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{cat.title.replace('Normativa ', '')}</span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNorm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#C4704B]/20 rounded-xl flex items-center justify-center">
                    <activeNormData.icon className="w-6 h-6 text-[#C4704B]" />
                  </div>
                  <h3 className="text-white font-bold text-xl">{activeNormData.title}</h3>
                </div>
                <ul className="space-y-3">
                  {activeNormData.items.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5 text-[#C4704B] flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section ref={ctaRef} className="relative py-24 lg:py-32 px-4 overflow-hidden">
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(135deg, #C4704B 0%, #A85A3A 100%)',
              'linear-gradient(135deg, #A85A3A 0%, #C4704B 100%)',
              'linear-gradient(135deg, #C4704B 0%, #A85A3A 100%)',
            ]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Circles */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"
          animate={{ scale: [1, 1.4, 1], y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />

        <div className="relative max-w-5xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
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

            {/* Right Content - Glass Card */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Contatti Rapidi</h3>
              <div className="space-y-4">
                <a href="tel:+390968441431" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>+39 0968 441431</span>
                </a>
                <a href="mailto:info@ecolive.it" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>info@ecolive.it</span>
                </a>
              </div>

              {/* Response Badge */}
              <div className="flex items-center gap-2 mt-6 pt-6 border-t border-white/10">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Clock className="w-4 h-4 text-white/60" />
                </motion.div>
                <span className="text-white/60 text-sm">Rispondiamo in 24h</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
