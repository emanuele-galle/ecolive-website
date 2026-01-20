'use client'

import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Leaf, Shield, Sparkles, Heart, Target, Eye,
  Phone, MapPin, ArrowRight, ChevronRight
} from 'lucide-react'
import SectionDivider from '@/components/ui/SectionDivider'
import CraftmanshipSection from '@/components/sections/CraftmanshipSection'

// ============================================
// DATA
// ============================================
const teamMembers = [
  {
    name: 'Dominik Galle',
    role: 'Founder & CEO',
    image: '/api/media/file/dominik-galle.jpeg',
    quote: 'Costruire il futuro, un albero alla volta.',
  },
  {
    name: 'Pasquale Zaffino',
    role: 'Technical Director',
    image: '/api/media/file/pasquale-zaffino.jpg',
    quote: "L'innovazione nasce dall'ascolto.",
  },
  {
    name: 'Luisa Baffa Trasci',
    role: 'Commercial Director',
    image: '/api/media/file/luisa-baffa-trasci.jpg',
    quote: 'Ogni casa racconta una storia.',
  },
]

const milestones = [
  {
    year: '1999',
    event: 'Fondazione',
    description: 'Nasce Ecolive a Spadola, nel cuore della Calabria. Un sogno che prende forma.',
    color: '#C4704B'
  },
  {
    year: '2008',
    event: 'Platform Frame',
    description: 'Prima tecnologia costruttiva adottata. Inizia il percorso di innovazione.',
    color: '#2D5A47'
  },
  {
    year: '2012',
    event: 'X-Lam',
    description: 'Introduzione dei pannelli CLT. Nuovi standard di qualita e resistenza.',
    color: '#40916c'
  },
  {
    year: '2018',
    event: 'X-Frame',
    description: 'Nasce il sistema brevettato ibrido che rivoluziona la bioedilizia italiana.',
    color: '#C4704B'
  },
  {
    year: '2026',
    event: 'X-Frame 2.0',
    description: 'Evoluzione con integrazione IoT e ottimizzazione energetica AI-driven.',
    color: '#1E3D30'
  },
]

const values = [
  {
    icon: Leaf,
    title: 'Sostenibilita',
    description: 'Legno certificato PEFC da foreste gestite responsabilmente. Impatto ambientale ridotto del 70%.',
    color: '#40916c',
    size: 'large'
  },
  {
    icon: Shield,
    title: 'Qualita',
    description: 'Garanzia 30 anni sulla struttura. Certificazione ISO 9001.',
    color: '#1E3D30',
    size: 'normal'
  },
  {
    icon: Sparkles,
    title: 'Innovazione',
    description: 'Sistema X-Frame brevettato. Tecnologia unica in Italia.',
    color: '#C4704B',
    size: 'normal'
  },
  {
    icon: Heart,
    title: 'Passione',
    description: 'Ogni casa e un progetto unico, costruito con dedizione artigianale e cura per i dettagli.',
    color: '#A85A3A',
    size: 'wide'
  },
]

const stats = [
  { value: 25, suffix: '+', label: 'Anni', sublabel: 'Dal 1999' },
  { value: 40, suffix: '+', label: 'Case', sublabel: 'In Italia' },
  { value: 30, suffix: '', label: 'Giorni', sublabel: 'Chiavi in mano' },
  { value: 98, suffix: '%', label: 'Soddisfazione', sublabel: 'Clienti' },
]

const marqueeText = 'Bioedilizia \u2022 Dal 1999 \u2022 Calabria \u2022 X-Frame \u2022 Sostenibilita \u2022 Classe A4 \u2022 Made in Italy \u2022 '

// ============================================
// ANIMATED COUNTER COMPONENT
// ============================================
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const springValue = useSpring(0, { stiffness: 50, damping: 20 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      springValue.set(value)
    }
  }, [isInView, value, springValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest))
    })
    return unsubscribe
  }, [springValue])

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  )
}

// ============================================
// MILESTONE CARD COMPONENT
// ============================================
function MilestoneCard({
  milestone,
  index,
  isActive,
  onClick
}: {
  milestone: typeof milestones[0]
  index: number
  isActive: boolean
  onClick: () => void
}) {
  return (
    <motion.div
      className="flex-shrink-0 w-[280px] md:w-[320px] cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
    >
      {/* Year dot */}
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          className="w-4 h-4 rounded-full relative"
          style={{ backgroundColor: milestone.color }}
          animate={isActive ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: milestone.color }}
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>
        <span
          className="text-4xl md:text-5xl font-bold transition-colors"
          style={{ color: isActive ? milestone.color : '#1E3D30' }}
        >
          {milestone.year}
        </span>
      </div>

      {/* Card */}
      <motion.div
        className={`
          p-6 rounded-2xl border-2 transition-all duration-300
          ${isActive
            ? 'bg-white shadow-premium-lg border-[#C4704B]/30'
            : 'bg-white/50 border-transparent hover:bg-white hover:shadow-premium'
          }
        `}
        whileHover={{ y: -5 }}
      >
        <h3 className="text-xl font-bold text-[#1E3D30] mb-2">{milestone.event}</h3>
        <AnimatePresence>
          {isActive && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="text-[#6B6560] text-sm leading-relaxed overflow-hidden"
            >
              {milestone.description}
            </motion.p>
          )}
        </AnimatePresence>
        {!isActive && (
          <p className="text-[#8A857F] text-xs">Clicca per scoprire</p>
        )}
      </motion.div>
    </motion.div>
  )
}

// ============================================
// BENTO VALUE CARD COMPONENT
// ============================================
function BentoValueCard({
  value,
  index
}: {
  value: typeof values[0]
  index: number
}) {
  const Icon = value.icon
  const [isHovered, setIsHovered] = useState(false)

  const sizeClass = value.size === 'large'
    ? 'bento-large'
    : value.size === 'wide'
    ? 'bento-wide'
    : ''

  return (
    <motion.div
      className={`
        ${sizeClass}
        relative p-6 md:p-8 rounded-3xl bg-white border border-[#DDD5C9]
        overflow-hidden cursor-pointer gradient-sweep group
      `}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* Background gradient on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${value.color}10 0%, transparent 60%)`
        }}
      />

      {/* Icon */}
      <motion.div
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-6"
        style={{ backgroundColor: `${value.color}15` }}
        animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 0.9 }}
      >
        <Icon
          className="w-7 h-7 md:w-8 md:h-8"
          style={{ color: value.color }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-xl md:text-2xl font-bold text-[#1E3D30] mb-2">
          {value.title}
        </h3>
        <p className="text-[#6B6560] text-sm md:text-base leading-relaxed">
          {value.description}
        </p>
      </div>

      {/* Corner accent */}
      <div
        className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ backgroundColor: value.color }}
      />
    </motion.div>
  )
}

// ============================================
// TEAM MEMBER CARD COMPONENT
// ============================================
function TeamMemberCard({
  member,
  index,
  offset
}: {
  member: typeof teamMembers[0]
  index: number
  offset: 'up' | 'center' | 'down'
}) {
  const [isHovered, setIsHovered] = useState(false)
  const offsetClass = offset === 'up' ? 'lg:-mt-12' : offset === 'down' ? 'lg:mt-12' : ''

  return (
    <motion.div
      className={`relative ${offsetClass}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          whileInView={{ clipPath: 'inset(0)' }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, delay: index * 0.15 }}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E3D30]/80 via-[#1E3D30]/20 to-transparent" />

        {/* Quote overlay on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-8"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{
            opacity: isHovered ? 1 : 0,
            backdropFilter: isHovered ? 'blur(8px)' : 'blur(0px)'
          }}
          transition={{ duration: 0.5 }}
          style={{ backgroundColor: 'rgba(30, 61, 48, 0.85)' }}
        >
          <p className="text-white text-center text-lg md:text-xl italic font-light leading-relaxed">
            &ldquo;{member.quote}&rdquo;
          </p>
        </motion.div>
      </div>

      {/* Info card */}
      <motion.div
        className="absolute -bottom-6 left-4 right-4 glass-card rounded-2xl p-5 shadow-premium-lg"
        whileHover={{ y: -5 }}
      >
        <h3 className="font-bold text-[#1E3D30] text-lg">{member.name}</h3>
        <p className="text-[#C4704B] text-sm font-medium">{member.role}</p>
      </motion.div>
    </motion.div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function ChiSiamoPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [activeMilestone, setActiveMilestone] = useState(0)

  // Hero parallax
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.15])
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0])
  const textY = useTransform(heroProgress, [0, 1], [0, 150])

  // Mission/Vision parallax refs
  const missionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: missionProgress } = useScroll({
    target: missionRef,
    offset: ["start end", "end start"]
  })
  const missionX = useTransform(missionProgress, [0, 1], [50, -50])
  const visionX = useTransform(missionProgress, [0, 1], [-50, 50])

  return (
    <main ref={containerRef} className="bg-[#FFFCF7] overflow-hidden">

      {/* ============================================ */}
      {/* HERO - Cinematic Typography */}
      {/* ============================================ */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background with Ken Burns */}
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <Image
            src="/api/media/file/chi-siamo.jpg"
            alt="Ecolive Team"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#1E3D30]" />

        {/* Main content */}
        <motion.div
          className="relative z-10 text-center px-4"
          style={{ opacity: heroOpacity, y: textY }}
        >
          {/* Typography split */}
          <div className="overflow-hidden">
            <motion.h1
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold leading-none tracking-tight"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <span className="block text-outline text-[#C4704B]">CHI</span>
            </motion.h1>
          </div>
          <div className="overflow-hidden -mt-4 md:-mt-8">
            <motion.h1
              className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold leading-none tracking-tight text-[#1E3D30]"
              style={{ WebkitTextStroke: 'none', WebkitTextFillColor: '#FAF7F2' }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              SIAMO
            </motion.h1>
          </div>
        </motion.div>

        {/* Marquee */}
        <div className="absolute bottom-24 left-0 right-0 overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="animate-marquee flex">
              {[...Array(2)].map((_, i) => (
                <span
                  key={i}
                  className="text-white/30 text-sm md:text-base tracking-[0.3em] uppercase mx-4"
                >
                  {marqueeText}
                </span>
              ))}
            </div>
            <div className="animate-marquee flex" aria-hidden>
              {[...Array(2)].map((_, i) => (
                <span
                  key={i}
                  className="text-white/30 text-sm md:text-base tracking-[0.3em] uppercase mx-4"
                >
                  {marqueeText}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/40 text-xs tracking-[0.2em] uppercase">Scroll</span>
            <motion.div
              className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Transition: Hero (dark) to Story (light) */}
      <SectionDivider from="#1E3D30" to="#FAF7F2" height="200px" />

      {/* ============================================ */}
      {/* STORY - Horizontal Timeline */}
      {/* ============================================ */}
      <section className="py-20 lg:py-32 px-4 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            <span className="text-[#C4704B] text-sm tracking-[0.2em] uppercase font-medium">
              La Nostra Storia
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3D30] mt-3">
              25 anni di{' '}
              <span className="text-[#C4704B]">Innovazione</span>
            </h2>
            <p className="text-[#6B6560] text-lg mt-4 max-w-2xl mx-auto">
              Da Spadola, nel cuore della Calabria, abbiamo rivoluzionato il modo di costruire case in Italia.
            </p>
          </motion.div>

          {/* Timeline horizontal scroll */}
          <div className="relative">
            {/* Progress line */}
            <div className="hidden md:block absolute top-[52px] left-0 right-0 h-0.5 bg-[#DDD5C9]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#C4704B] to-[#D4896A]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ transformOrigin: 'left' }}
              />
            </div>

            {/* Cards container */}
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-8 -mx-4 px-4 snap-x snap-mandatory">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="snap-start">
                  <MilestoneCard
                    milestone={milestone}
                    index={index}
                    isActive={activeMilestone === index}
                    onClick={() => setActiveMilestone(index)}
                  />
                </div>
              ))}
            </div>

            {/* Pagination dots mobile */}
            <div className="flex justify-center gap-2 mt-6 md:hidden">
              {milestones.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeMilestone === index
                      ? 'bg-[#C4704B] w-6'
                      : 'bg-[#DDD5C9]'
                  }`}
                  onClick={() => setActiveMilestone(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transition: Story (cream) to Values (white) */}
      <SectionDivider from="#FAF7F2" to="#FFFFFF" height="150px" />

      {/* ============================================ */}
      {/* VALUES - Bento Grid */}
      {/* ============================================ */}
      <section className="py-20 lg:py-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            <span className="text-[#C4704B] text-sm tracking-[0.2em] uppercase font-medium">
              I Nostri Principi
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3D30] mt-3">
              Valori
            </h2>
          </motion.div>

          {/* Bento grid */}
          <div className="bento-grid">
            {values.map((value, index) => (
              <BentoValueCard key={value.title} value={value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Transition: Values (white) to Craftmanship (cream) */}
      <SectionDivider from="#FFFFFF" to="#FAF7F2" height="150px" />

      {/* ============================================ */}
      {/* CRAFTMANSHIP - Approccio Sartoriale */}
      {/* ============================================ */}
      <CraftmanshipSection />

      {/* Transition: Craftmanship (cream) to Team (dark) */}
      <SectionDivider from="#FAF7F2" to="#1E3D30" height="200px" />

      {/* ============================================ */}
      {/* TEAM - Staggered Gallery */}
      {/* ============================================ */}
      <section className="py-20 lg:py-32 px-4 bg-[#1E3D30] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#C4704B]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            <span className="text-[#C4704B] text-sm tracking-[0.2em] uppercase font-medium">
              Le Persone
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3">
              Il Team
            </h2>
            <p className="text-white/60 text-lg mt-4 max-w-xl mx-auto">
              Esperienza, passione e visione al servizio della tua casa
            </p>
          </motion.div>

          {/* Team grid with stagger */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 pb-12">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={member.name}
                member={member}
                index={index}
                offset={index === 0 ? 'down' : index === 1 ? 'center' : 'up'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Transition: Team (dark) to Numbers (light) */}
      <SectionDivider from="#1E3D30" to="#FAF7F2" height="200px" />

      {/* ============================================ */}
      {/* NUMBERS - Counter Wall */}
      {/* ============================================ */}
      <section className="py-20 lg:py-32 px-4 bg-gradient-to-br from-[#FAF7F2] via-white to-[#FAF7F2] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#C4704B]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#2D5A47]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            <span className="text-[#C4704B] text-sm tracking-[0.2em] uppercase font-medium">
              I Risultati
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3D30] mt-3">
              Numeri
            </h2>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="text-counter text-[#1E3D30] group-hover:text-[#C4704B] transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </motion.div>
                <div className="text-[#1E3D30] font-semibold text-lg mt-2">
                  {stat.label}
                </div>
                <div className="text-[#8A857F] text-sm">
                  {stat.sublabel}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transition: Numbers (light) to Mission (dark) */}
      <SectionDivider from="#FAF7F2" to="#1E3D30" height="200px" />

      {/* ============================================ */}
      {/* MISSION / VISION - Parallax Split */}
      {/* ============================================ */}
      <section ref={missionRef} className="relative">
        {/* Mission */}
        <div className="relative min-h-[500px] lg:min-h-[600px] flex items-center justify-center p-8 lg:p-16 bg-[#1E3D30] overflow-hidden">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}
          />

          <motion.div
            className="relative z-10 max-w-2xl text-center"
            style={{ x: missionX }}
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#C4704B] flex items-center justify-center"
              whileHover={{ scale: 1.1, rotateY: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Target className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Mission
            </h3>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed">
              Costruire case che migliorano la vita delle persone, utilizzando materiali sostenibili
              e tecnologie innovative per creare ambienti sani, efficienti e in armonia con la natura.
            </p>
          </motion.div>
        </div>

        {/* Vision */}
        <div className="relative min-h-[500px] lg:min-h-[600px] flex items-center justify-center p-8 lg:p-16 bg-[#C4704B] overflow-hidden">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}
          />

          <motion.div
            className="relative z-10 max-w-2xl text-center"
            style={{ x: visionX }}
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-white flex items-center justify-center"
              whileHover={{ scale: 1.1, rotateY: -15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Eye className="w-10 h-10 text-[#C4704B]" />
            </motion.div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Vision
            </h3>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed">
              Essere il punto di riferimento in Italia per l&apos;edilizia sostenibile,
              dove qualita costruttiva, rispetto per l&apos;ambiente e benessere abitativo
              si fondono in ogni progetto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Transition: Vision (terracotta) to CTA (cream) */}
      <SectionDivider from="#C4704B" to="#FFFCF7" height="180px" />

      {/* ============================================ */}
      {/* CTA - Magnetic Contact */}
      {/* ============================================ */}
      <section className="py-24 lg:py-32 px-4 bg-[#FFFCF7]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3D30] leading-tight">
              Vuoi conoscerci
              <span className="block text-[#C4704B]">di persona?</span>
            </h2>

            <p className="mt-6 text-lg md:text-xl text-[#6B6560] max-w-xl mx-auto">
              Vieni a trovarci a Spadola per vedere come nascono le nostre case.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contatti"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1E3D30] text-white font-semibold rounded-full hover:bg-[#2D5A47] transition-colors"
                >
                  Contattaci
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="tel:+390963195139"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-[#1E3D30] font-semibold rounded-full border-2 border-[#1E3D30] hover:bg-[#1E3D30] hover:text-white transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Chiama Ora
                </a>
              </motion.div>
            </div>

            {/* Location */}
            <motion.div
              className="mt-12 inline-flex items-center gap-2 text-[#8A857F]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <MapPin className="w-5 h-5 text-[#C4704B]" />
              </motion.div>
              <span>Via Conte Ruggiero 128, Spadola (VV)</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
