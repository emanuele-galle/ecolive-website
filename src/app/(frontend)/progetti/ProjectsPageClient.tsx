'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { Project, Media } from '@/payload-types'
import {
  MapPin,
  Maximize2,
  Calendar,
  ArrowRight,
  Building2,
  Home,
  Store,
  Wrench,
  Sparkles,
  Award,
  ChevronDown,
  Eye,
  Grid3X3,
  LayoutList,
  Filter,
  X,
  ArrowUpRight,
  Clock,
  Users,
  CheckCircle2,
} from 'lucide-react'

interface ProjectsPageClientProps {
  projects: Project[]
  totalProjects: number
  selectedCategory?: string
  categoryLabels: Record<string, string>
}

const categoryIcons: Record<string, React.ReactNode> = {
  residenziale: <Home className="w-4 h-4" />,
  bungalow: <Building2 className="w-4 h-4" />,
  commerciale: <Store className="w-4 h-4" />,
  ristrutturazione: <Wrench className="w-4 h-4" />,
}

// Animated counter hook
function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: false })

  useEffect(() => {
    if (inView) {
      let startTime: number
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }
  }, [end, duration, inView])

  return { count, ref }
}

export default function ProjectsPageClient({
  projects,
  totalProjects,
  selectedCategory,
  categoryLabels,
}: ProjectsPageClientProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const heroRef = useRef(null)
  const projectsRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -80])

  const projectsInView = useInView(projectsRef, { once: false, margin: '-100px' })

  // Stats counters
  const projectsCounter = useCounter(47, 2000)
  const sqmCounter = useCounter(8500, 2500)
  const yearsCounter = useCounter(12, 2000)
  const satisfactionCounter = useCounter(98, 2000)

  // Get featured projects for showcase (first 3) and remaining for grid
  const showcaseProjects = projects.slice(0, 3)
  const gridProjects = projects.slice(3)

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO CINEMATICO FULL-SCREEN
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[800px] flex items-center overflow-hidden">
        {/* Background with Parallax */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E3D30]/70 via-[#1E3D30]/50 to-[#1E3D30]/80 z-10" />
          <Image
            src="/images/xframe-render/optimized/render-avanzato.webp"
            alt="Villa moderna Ecolive"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <motion.div
          style={{ y: textY }}
          className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4704B] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C4704B]" />
                </span>
                <span className="text-white/90 text-sm font-medium">Portfolio Realizzazioni</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
              >
                <span className="block">Case che</span>
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#C4704B] via-[#D4815C] to-[#C4704B]">
                    Ispirano
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 1.2 }}
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-[#C4704B]/30 origin-left"
                  />
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="text-lg sm:text-xl text-white/70 max-w-xl mb-10 leading-relaxed"
              >
                Ogni progetto racconta una storia di <span className="text-white font-medium">qualità</span>,{' '}
                <span className="text-white font-medium">sostenibilità</span> e{' '}
                <span className="text-white font-medium">innovazione</span>.
                Scopri le nostre realizzazioni.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="#progetti"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 px-8 py-4 bg-[#C4704B] hover:bg-[#B35F3A] text-white font-semibold rounded-full shadow-2xl shadow-[#C4704B]/30 transition-all duration-300"
                >
                  <Eye className="w-5 h-5" />
                  <span>Esplora i Progetti</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <Link
                  href="/contatti"
                  className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 transition-all duration-300"
                >
                  <span>Richiedi Preventivo</span>
                </Link>
              </motion.div>
            </div>

            {/* Right: Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              <div ref={projectsCounter.ref} className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">{projectsCounter.count}+</div>
                <div className="text-white/60 text-sm">Progetti Completati</div>
                <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="h-full bg-[#C4704B] rounded-full"
                  />
                </div>
              </div>

              <div ref={sqmCounter.ref} className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">{sqmCounter.count.toLocaleString()}</div>
                <div className="text-white/60 text-sm">Metri Quadri Costruiti</div>
                <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                    className="h-full bg-[#C4704B] rounded-full"
                  />
                </div>
              </div>

              <div ref={yearsCounter.ref} className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">{yearsCounter.count}</div>
                <div className="text-white/60 text-sm">Anni di Esperienza</div>
                <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '90%' }}
                    transition={{ duration: 1.5, delay: 1.4 }}
                    className="h-full bg-[#C4704B] rounded-full"
                  />
                </div>
              </div>

              <div ref={satisfactionCounter.ref} className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">{satisfactionCounter.count}%</div>
                <div className="text-white/60 text-sm">Clienti Soddisfatti</div>
                <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '98%' }}
                    transition={{ duration: 1.5, delay: 1.6 }}
                    className="h-full bg-[#C4704B] rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/50 text-xs font-medium uppercase tracking-wider">Scopri i progetti</span>
            <ChevronDown className="w-6 h-6 text-white/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SHOWCASE IMMERSIVO - Realizzazioni in Evidenza
      ═══════════════════════════════════════════════════════════════════ */}
      {projects.length >= 3 && (
        <section className="relative bg-[#1E3D30] overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#C4704B]/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#2D5A47]/50 rounded-full blur-[120px]" />
          </div>

          {/* Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '48px 48px',
            }}
          />

          <div className="relative z-10 py-24">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1.2 }}
                className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-6">
                    <Award className="w-4 h-4 text-[#C4704B]" />
                    <span className="text-white/80 text-sm font-medium">Eccellenza Costruttiva</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                    Storie di <span className="text-[#C4704B]">Successo</span>
                  </h2>
                  <p className="text-white/60 text-lg mt-4 max-w-xl">
                    Ogni casa racconta la storia di una famiglia. Scopri come abbiamo trasformato i sogni in realtà.
                  </p>
                </div>

                <Link
                  href="/contatti"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[#C4704B] hover:bg-[#A85A3A] text-white font-semibold rounded-full transition-all group"
                >
                  <span>Inizia il tuo progetto</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Immersive Showcase Grid */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-6">
                {/* Main Featured Card - Large */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 1.2 }}
                  className="lg:col-span-7"
                >
                  <Link
                    href={`/progetti/${projects[0].slug}`}
                    className="group block relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden"
                  >
                    <img
                      src={(projects[0].featuredImage as Media)?.sizes?.card?.url || (projects[0].featuredImage as Media)?.url || '/placeholder.jpg'}
                      alt={projects[0].title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Floating Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#C4704B] text-white text-sm font-bold rounded-full shadow-lg">
                        <Sparkles className="w-4 h-4" />
                        Progetto in Evidenza
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium flex items-center gap-2">
                          {categoryIcons[projects[0].category]}
                          {categoryLabels[projects[0].category]}
                        </span>
                        {projects[0].year && (
                          <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm">
                            {projects[0].year}
                          </span>
                        )}
                      </div>

                      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3 group-hover:text-[#C4704B] transition-colors">
                        {projects[0].title}
                      </h3>

                      <div className="flex items-center gap-6 text-white/70 mb-6">
                        {projects[0].location && (
                          <span className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {projects[0].location}
                          </span>
                        )}
                        {projects[0].area && (
                          <span className="flex items-center gap-2">
                            <Maximize2 className="w-4 h-4" />
                            {projects[0].area} mq
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-white font-semibold group-hover:gap-5 transition-all">
                        <span>Esplora il progetto</span>
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* Right Column - Two Stacked Cards */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {/* Second Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.2, delay: 0.1 }}
                    className="flex-1"
                  >
                    <Link
                      href={`/progetti/${projects[1].slug}`}
                      className="group block relative h-full min-h-[280px] rounded-3xl overflow-hidden"
                    >
                      <img
                        src={(projects[1].featuredImage as Media)?.sizes?.card?.url || (projects[1].featuredImage as Media)?.url || '/placeholder.jpg'}
                        alt={projects[1].title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-xs font-medium flex items-center gap-1.5">
                            {categoryIcons[projects[1].category]}
                            {categoryLabels[projects[1].category]}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C4704B] transition-colors">
                          {projects[1].title}
                        </h3>
                        <div className="flex items-center gap-4 text-white/60 text-sm">
                          {projects[1].location && (
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" />
                              {projects[1].location}
                            </span>
                          )}
                          {projects[1].area && (
                            <span className="flex items-center gap-1.5">
                              <Maximize2 className="w-3.5 h-3.5" />
                              {projects[1].area} mq
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>

                  {/* Third Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="flex-1"
                  >
                    <Link
                      href={`/progetti/${projects[2].slug}`}
                      className="group block relative h-full min-h-[280px] rounded-3xl overflow-hidden"
                    >
                      <img
                        src={(projects[2].featuredImage as Media)?.sizes?.card?.url || (projects[2].featuredImage as Media)?.url || '/placeholder.jpg'}
                        alt={projects[2].title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-xs font-medium flex items-center gap-1.5">
                            {categoryIcons[projects[2].category]}
                            {categoryLabels[projects[2].category]}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C4704B] transition-colors">
                          {projects[2].title}
                        </h3>
                        <div className="flex items-center gap-4 text-white/60 text-sm">
                          {projects[2].location && (
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" />
                              {projects[2].location}
                            </span>
                          )}
                          {projects[2].area && (
                            <span className="flex items-center gap-1.5">
                              <Maximize2 className="w-3.5 h-3.5" />
                              {projects[2].area} mq
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: '100%', label: 'Clienti Soddisfatti', icon: Users },
                  { value: '30', label: 'Giorni Consegna Media', icon: Clock },
                  { value: '10+', label: 'Anni di Garanzia', icon: Award },
                  { value: 'A+', label: 'Classe Energetica', icon: Home },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                  >
                    <stat.icon className="w-6 h-6 text-[#C4704B] mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-white/50 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          FILTERS & PROJECTS GRID
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="progetti" ref={projectsRef} className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Category Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-[#1E3D30]/60 mr-2">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filtra:</span>
                </div>

                <Link
                  href="/progetti"
                  className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    !selectedCategory
                      ? 'bg-[#1E3D30] text-white shadow-lg'
                      : 'bg-white text-[#1E3D30] hover:bg-[#1E3D30]/5 border border-gray-200'
                  }`}
                >
                  Tutti
                </Link>

                {Object.entries(categoryLabels).map(([value, label]) => (
                  <Link
                    key={value}
                    href={`/progetti?category=${value}`}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === value
                        ? 'bg-[#1E3D30] text-white shadow-lg'
                        : 'bg-white text-[#1E3D30] hover:bg-[#1E3D30]/5 border border-gray-200'
                    }`}
                  >
                    <span className={selectedCategory === value ? 'text-[#C4704B]' : 'text-[#C4704B]/70'}>
                      {categoryIcons[value]}
                    </span>
                    {label}
                  </Link>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-white rounded-xl p-1.5 border border-gray-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-[#1E3D30] text-white'
                      : 'text-[#1E3D30]/50 hover:text-[#1E3D30]'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-[#1E3D30] text-white'
                      : 'text-[#1E3D30]/50 hover:text-[#1E3D30]'
                  }`}
                >
                  <LayoutList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mb-10 flex items-center gap-3"
          >
            <div className="w-1 h-8 bg-gradient-to-b from-[#C4704B] to-[#1E3D30] rounded-full" />
            <p className="text-[#1E3D30]/70">
              {selectedCategory ? (
                <>
                  <span className="font-bold text-[#1E3D30] text-xl">{projects.length}</span>{' '}
                  {projects.length === 1 ? 'progetto' : 'progetti'} in{' '}
                  <span className="font-semibold text-[#C4704B]">
                    {categoryLabels[selectedCategory as keyof typeof categoryLabels]}
                  </span>
                </>
              ) : (
                <>
                  <span className="font-bold text-[#1E3D30] text-xl">{projects.length}</span>{' '}
                  progetti documentati
                </>
              )}
            </p>
          </motion.div>

          {/* Projects Display */}
          {projects.length > 0 ? (
            <AnimatePresence mode="wait">
              {viewMode === 'grid' ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {(projects.length >= 3 ? gridProjects : projects).map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      categoryLabels={categoryLabels}
                      isHovered={hoveredProject === String(project.id)}
                      onHover={setHoveredProject}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {(projects.length >= 3 ? gridProjects : projects).map((project, index) => (
                    <ProjectListItem
                      key={project.id}
                      project={project}
                      index={index}
                      categoryLabels={categoryLabels}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <EmptyState selectedCategory={selectedCategory} categoryLabels={categoryLabels} />
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROCESS SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3D30]/5 rounded-full mb-6">
              <Clock className="w-4 h-4 text-[#1E3D30]" />
              <span className="text-[#1E3D30] text-sm font-medium">Il nostro processo</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1E3D30] mb-4">
              Da sogno a realtà in <span className="text-[#C4704B]">30 giorni</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Ogni progetto segue un percorso collaudato che garantisce qualità e tempistiche certe.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consulenza', desc: 'Analizziamo le tue esigenze e il terreno', icon: Users },
              { step: '02', title: 'Progettazione', desc: 'Creiamo il design su misura per te', icon: Building2 },
              { step: '03', title: 'Produzione', desc: 'Realizziamo la struttura X-Frame', icon: Wrench },
              { step: '04', title: 'Consegna', desc: 'Montiamo la tua nuova casa', icon: CheckCircle2 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.9, delay: i * 0.1 }}
                className="relative"
              >
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#C4704B] to-transparent" />
                )}
                <div className="text-center">
                  <div className="relative inline-flex">
                    <div className="w-16 h-16 bg-[#1E3D30] rounded-2xl flex items-center justify-center mb-4">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-[#C4704B] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1E3D30] mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-[#1E3D30] via-[#2D5A47] to-[#1E3D30] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Pronto a costruire la <span className="text-[#C4704B]">tua casa</span>?
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Ogni progetto nasce da un sogno. Raccontaci il tuo e insieme lo trasformeremo in realtà.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C4704B] hover:bg-[#A85A3A] text-white font-semibold rounded-full shadow-xl transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Richiedi Preventivo Gratuito
              </Link>

              <Link
                href="/sistema-x-frame"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 transition-all"
              >
                Scopri Sistema X-Frame
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

// ═══════════════════════════════════════════════════════════════════
// PROJECT CARD COMPONENT
// ═══════════════════════════════════════════════════════════════════
function ProjectCard({
  project,
  index,
  categoryLabels,
  isHovered,
  onHover,
}: {
  project: Project
  index: number
  categoryLabels: Record<string, string>
  isHovered: boolean
  onHover: (id: string | null) => void
}) {
  const featuredImage = project.featuredImage as Media
  const imageUrl = featuredImage?.sizes?.card?.url || featuredImage?.url || '/placeholder.jpg'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseEnter={() => onHover(String(project.id))}
      onMouseLeave={() => onHover(null)}
    >
      <Link
        href={`/progetti/${project.slug}`}
        className="group block relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E3D30]/90 via-[#1E3D30]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/95 backdrop-blur-sm text-[#1E3D30] shadow-lg">
              {categoryIcons[project.category]}
              {categoryLabels[project.category]}
            </span>
          </div>

          {/* Hover Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex flex-wrap gap-3 text-white text-sm">
              {project.location && (
                <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <MapPin className="w-3.5 h-3.5" />
                  {project.location}
                </span>
              )}
              {project.area && (
                <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Maximize2 className="w-3.5 h-3.5" />
                  {project.area} mq
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-[#1E3D30] mb-3 group-hover:text-[#C4704B] transition-colors line-clamp-2">
            {project.title}
          </h3>

          <div className="flex items-center gap-4 text-sm text-[#1E3D30]/60 mb-4">
            {project.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C4704B]/60" />
                {project.location}
              </span>
            )}
            {project.year && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C4704B]/60" />
                {project.year}
              </span>
            )}
          </div>

          <div className="pt-4 border-t border-[#1E3D30]/10">
            <span className="inline-flex items-center gap-2 text-[#C4704B] font-semibold text-sm group-hover:gap-3 transition-all">
              Scopri il progetto
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// PROJECT LIST ITEM COMPONENT
// ═══════════════════════════════════════════════════════════════════
function ProjectListItem({
  project,
  index,
  categoryLabels,
}: {
  project: Project
  index: number
  categoryLabels: Record<string, string>
}) {
  const featuredImage = project.featuredImage as Media
  const imageUrl = featuredImage?.sizes?.card?.url || featuredImage?.url || '/placeholder.jpg'

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <Link
        href={`/progetti/${project.slug}`}
        className="group flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        {/* Image */}
        <div className="relative w-full sm:w-64 aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-white/95 text-[#1E3D30]">
              {categoryIcons[project.category]}
              {categoryLabels[project.category]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-[#1E3D30] mb-3 group-hover:text-[#C4704B] transition-colors">
            {project.title}
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[#1E3D30]/60 mb-4">
            {project.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C4704B]" />
                {project.location}
              </span>
            )}
            {project.area && (
              <span className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-[#C4704B]" />
                {project.area} mq
              </span>
            )}
            {project.year && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C4704B]" />
                {project.year}
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-2 text-[#C4704B] font-semibold group-hover:gap-3 transition-all">
            Scopri il progetto
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// EMPTY STATE COMPONENT
// ═══════════════════════════════════════════════════════════════════
function EmptyState({
  selectedCategory,
  categoryLabels,
}: {
  selectedCategory?: string
  categoryLabels: Record<string, string>
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-20"
    >
      <div className="relative w-32 h-32 mx-auto mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3D30]/10 to-[#C4704B]/10 rounded-full animate-pulse" />
        <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-xl">
          <Building2 className="w-12 h-12 text-[#1E3D30]/30" />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-[#1E3D30] mb-4">Nessun progetto trovato</h2>
      <p className="text-[#1E3D30]/60 mb-8 max-w-md mx-auto">
        {selectedCategory
          ? 'Non ci sono progetti in questa categoria al momento. Prova a esplorare altre categorie.'
          : 'Non ci sono progetti pubblicati al momento.'}
      </p>
      {selectedCategory && (
        <Link
          href="/progetti"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#C4704B] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          Vedi tutti i progetti
          <ArrowRight className="w-5 h-5" />
        </Link>
      )}
    </motion.div>
  )
}
