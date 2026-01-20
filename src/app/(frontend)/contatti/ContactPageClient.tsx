'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import SectionDivider from '@/components/ui/SectionDivider'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ArrowRight,
  PhoneCall,
  Building2,
  CheckCircle2,
  Sparkles,
  Calendar,
  Video,
  ChevronDown,
  Play,
  Users,
  Award,
  Home,
  Send,
} from 'lucide-react'
import ContactForm from './ContactForm'

interface ContactPageClientProps {
  onSubmit: (formData: FormData) => Promise<{ success: boolean; message: string }>
}

// Animated counter hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: false })

  useEffect(() => {
    if (!startOnView || inView) {
      let startTime: number
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }
  }, [end, duration, inView, startOnView])

  return { count, ref }
}

export default function ContactPageClient({ onSubmit }: ContactPageClientProps) {
  const [activeMethod, setActiveMethod] = useState<string | null>(null)
  const [showVideo, setShowVideo] = useState(false)

  const heroRef = useRef(null)
  const methodsRef = useRef(null)
  const formSectionRef = useRef(null)
  const mapRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  const methodsInView = useInView(methodsRef, { once: false, margin: '-100px' })
  const formInView = useInView(formSectionRef, { once: false, margin: '-100px' })
  const mapInView = useInView(mapRef, { once: false, margin: '-100px' })

  // Stats with animated counters
  const projectsCounter = useCounter(47, 2000)
  const yearsCounter = useCounter(12, 2000)
  const satisfactionCounter = useCounter(98, 2000)

  const contactMethods = [
    {
      id: 'call',
      icon: PhoneCall,
      title: 'Chiamaci',
      subtitle: 'Risposta immediata',
      description: 'Parla direttamente con un nostro consulente esperto',
      action: 'tel:+393276473099',
      actionText: '+39 327 647 3099',
      color: 'from-emerald-500 to-emerald-600',
      available: 'Lun-Ven 9:00-18:00',
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      title: 'WhatsApp',
      subtitle: 'Chat veloce',
      description: 'Scrivici su WhatsApp per una risposta rapida',
      action: 'https://wa.me/393276473099?text=Ciao,%20vorrei%20informazioni%20sulle%20case%20in%20legno%20Ecolive',
      actionText: 'Apri WhatsApp',
      color: 'from-green-500 to-green-600',
      available: 'Risposta entro 2h',
    },
    {
      id: 'email',
      icon: Mail,
      title: 'Email',
      subtitle: 'Risposta dettagliata',
      description: 'Inviaci una email per richieste approfondite',
      action: 'mailto:info@ecolive.srl',
      actionText: 'info@ecolive.srl',
      color: 'from-blue-500 to-blue-600',
      available: 'Risposta entro 24h',
    },
    {
      id: 'visit',
      icon: Building2,
      title: 'Visita lo Showroom',
      subtitle: 'Esperienza diretta',
      description: 'Vieni a vedere i nostri materiali e prototipi dal vivo',
      action: 'https://maps.google.com/?q=Via+Conte+Ruggiero+128+Spadola+VV',
      actionText: 'Prenota visita',
      color: 'from-amber-500 to-amber-600',
      available: 'Su appuntamento',
    },
  ]

  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF7F2]">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO CINEMATICO FULL-SCREEN
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E3D30]/80 via-[#1E3D30]/60 to-[#1E3D30]/90 z-10" />
          <Image
            src="/images/hero-house.jpg"
            alt="Casa Ecolive"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <motion.div
          style={{ y: textY }}
          className="relative z-30 max-w-6xl mx-auto px-4 text-center"
        >
          {/* Badge animato */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-white/90 text-sm font-medium">Rispondiamo in meno di 24 ore</span>
          </motion.div>

          {/* Titolo principale con effetto reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 tracking-tight"
          >
            <span className="block">Inizia il tuo</span>
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#C4704B] via-[#D4815C] to-[#C4704B]">
                Progetto
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1.2 }}
                className="absolute -bottom-2 left-0 right-0 h-3 bg-[#C4704B]/30 origin-left"
              />
            </span>
          </motion.h1>

          {/* Sottotitolo */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="text-lg sm:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Ogni grande casa inizia con una conversazione.
            <br className="hidden sm:block" />
            <span className="text-white/90">Siamo qui per trasformare la tua visione in realtà.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#form"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 px-8 py-4 bg-[#C4704B] hover:bg-[#B35F3A] text-white font-semibold rounded-full shadow-2xl shadow-[#C4704B]/30 transition-all duration-300"
            >
              <Send className="w-5 h-5" />
              <span>Richiedi Preventivo Gratuito</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="tel:+393276473099"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 transition-all duration-300"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Chiamaci Ora</span>
            </motion.a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-12"
          >
            <div className="text-center" ref={projectsCounter.ref}>
              <p className="text-3xl sm:text-4xl font-bold text-white">{projectsCounter.count}+</p>
              <p className="text-white/60 text-sm mt-1">Progetti Realizzati</p>
            </div>
            <div className="text-center" ref={yearsCounter.ref}>
              <p className="text-3xl sm:text-4xl font-bold text-white">{yearsCounter.count}</p>
              <p className="text-white/60 text-sm mt-1">Anni di Esperienza</p>
            </div>
            <div className="text-center" ref={satisfactionCounter.ref}>
              <p className="text-3xl sm:text-4xl font-bold text-white">{satisfactionCounter.count}%</p>
              <p className="text-white/60 text-sm mt-1">Clienti Soddisfatti</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
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
            <span className="text-white/50 text-xs font-medium uppercase tracking-wider">Scopri di più</span>
            <ChevronDown className="w-6 h-6 text-white/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Transition: Hero dark to Contact Methods white */}
      <SectionDivider from="#1E3D30" to="#FFFFFF" height="180px" />

      {/* ═══════════════════════════════════════════════════════════════════
          CONTACT METHODS - Interactive Cards
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={methodsRef} className="py-24 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#C4704B]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#1E3D30]/5 to-transparent rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={methodsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={methodsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3D30]/5 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#C4704B]" />
              <span className="text-[#1E3D30] text-sm font-medium">Scegli come contattarci</span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl font-bold text-[#1E3D30] mb-4">
              Il modo che preferisci
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Ogni progetto è unico. Scegli il canale di comunicazione più comodo per te.
            </p>
          </motion.div>

          {/* Contact Method Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.id}
                href={method.action}
                target={method.id === 'whatsapp' || method.id === 'visit' ? '_blank' : undefined}
                rel={method.id === 'whatsapp' || method.id === 'visit' ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={methodsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: index * 0.1 }}
                onMouseEnter={() => setActiveMethod(method.id)}
                onMouseLeave={() => setActiveMethod(null)}
                className={`group relative p-6 rounded-3xl border-2 transition-all duration-500 cursor-pointer overflow-hidden ${
                  activeMethod === method.id
                    ? 'border-[#C4704B] bg-gradient-to-br from-[#1E3D30] to-[#2D5A47] shadow-2xl scale-[1.02]'
                    : 'border-gray-100 bg-white hover:border-[#C4704B]/30 hover:shadow-xl'
                }`}
              >
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 ${
                    activeMethod === method.id
                      ? 'bg-white/20'
                      : 'bg-[#1E3D30]/5 group-hover:bg-white/20'
                  }`}>
                    <method.icon className={`w-7 h-7 transition-colors duration-500 ${
                      activeMethod === method.id
                        ? 'text-white'
                        : 'text-[#1E3D30] group-hover:text-white'
                    }`} />
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-bold mb-1 transition-colors duration-500 ${
                    activeMethod === method.id ? 'text-white' : 'text-[#1E3D30] group-hover:text-white'
                  }`}>
                    {method.title}
                  </h3>
                  <p className={`text-sm font-medium mb-3 transition-colors duration-500 ${
                    activeMethod === method.id ? 'text-white/80' : 'text-[#C4704B] group-hover:text-white/80'
                  }`}>
                    {method.subtitle}
                  </p>
                  <p className={`text-sm mb-4 transition-colors duration-500 ${
                    activeMethod === method.id ? 'text-white/70' : 'text-gray-500 group-hover:text-white/70'
                  }`}>
                    {method.description}
                  </p>

                  {/* Action */}
                  <div className={`flex items-center justify-between pt-4 border-t transition-colors duration-500 ${
                    activeMethod === method.id ? 'border-white/20' : 'border-gray-100 group-hover:border-white/20'
                  }`}>
                    <span className={`text-xs font-medium transition-colors duration-500 ${
                      activeMethod === method.id ? 'text-white/60' : 'text-gray-400 group-hover:text-white/60'
                    }`}>
                      {method.available}
                    </span>
                    <ArrowRight className={`w-5 h-5 transition-all duration-500 ${
                      activeMethod === method.id
                        ? 'text-white translate-x-0'
                        : 'text-[#C4704B] group-hover:text-white group-hover:translate-x-1'
                    }`} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Transition: Contact Methods (white) to Form (cream) */}
      <SectionDivider from="#FFFFFF" to="#FAF7F2" height="150px" />

      {/* ═══════════════════════════════════════════════════════════════════
          FORM SECTION - Split Layout Premium
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="form" ref={formSectionRef} className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Visual + Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2 }}
              className="lg:sticky lg:top-32"
            >
              {/* Image with overlay */}
              <div className="relative rounded-3xl overflow-hidden mb-8 aspect-[4/3]">
                <Image
                  src="/images/showroom.jpg"
                  alt="Showroom Ecolive"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3D30]/80 via-transparent to-transparent" />

                {/* Play button for virtual tour */}
                <motion.button
                  onClick={() => setShowVideo(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group"
                >
                  <Play className="w-8 h-8 text-[#1E3D30] ml-1 group-hover:scale-110 transition-transform" />
                </motion.button>

                {/* Bottom info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/80 text-sm mb-2">Tour Virtuale</p>
                  <p className="text-white font-semibold text-lg">Scopri il nostro showroom</p>
                </div>
              </div>

              {/* Info boxes */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 bg-white rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#C4704B]/10 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#C4704B]" />
                    </div>
                    <h4 className="font-semibold text-[#1E3D30]">Orari</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Lun - Ven: 9:00 - 18:00</p>
                  <p className="text-gray-600 text-sm">Sabato: 9:00 - 13:00</p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#1E3D30]/10 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#1E3D30]" />
                    </div>
                    <h4 className="font-semibold text-[#1E3D30]">Sede</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Via Conte Ruggiero, 128</p>
                  <p className="text-gray-600 text-sm">89822 Spadola (VV)</p>
                </div>
              </div>

              {/* Why contact us */}
              <div className="mt-8 p-6 bg-gradient-to-br from-[#1E3D30] to-[#2D5A47] rounded-3xl">
                <h4 className="text-white font-bold text-lg mb-4">Perché contattarci?</h4>
                <div className="space-y-3">
                  {[
                    { icon: CheckCircle2, text: 'Consulenza gratuita e senza impegno' },
                    { icon: Home, text: 'Preventivo personalizzato in 48h' },
                    { icon: Users, text: 'Team dedicato per ogni progetto' },
                    { icon: Award, text: 'Garanzia 10 anni sulla struttura' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-[#C4704B]" />
                      <span className="text-white/90 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-gray-200/50 border border-gray-100">
                {/* Form Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C4704B] to-[#A85A3A] flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#1E3D30]">Richiedi Informazioni</h3>
                      <p className="text-gray-500 text-sm">Ti risponderemo entro 24 ore</p>
                    </div>
                  </div>

                  {/* Quick contact options */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    <a
                      href="tel:+393276473099"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3D30]/5 hover:bg-[#1E3D30]/10 rounded-full text-sm text-[#1E3D30] transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Preferisci chiamare?
                    </a>
                    <a
                      href="https://wa.me/393276473099"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 rounded-full text-sm text-green-700 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-gray-400 text-sm">oppure compila il form</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Contact Form */}
                <ContactForm onSubmit={onSubmit} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          MAP SECTION - Immersive
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={mapRef} className="relative">
        {/* Top gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

        <div className="relative h-[600px]">
          {/* Map */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3107.5!2d16.4175!3d38.6325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x131531e5a5a5a5a5%3A0x1234567890abcdef!2sVia%20Conte%20Ruggiero%2C%20128%2C%2089822%20Spadola%20VV!5e0!3m2!1sit!2sit!4v1704067200000!5m2!1sit!2sit"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sede Ecolive - Spadola (VV)"
            className="grayscale-[20%]"
          />

          {/* Floating info card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0 w-[90%] sm:w-auto max-w-md z-20"
          >
            <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1E3D30] to-[#2D5A47] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[#1E3D30] text-lg">Ecolive S.r.l.</h4>
                  <p className="text-gray-600 text-sm mt-1">Via Conte Ruggiero, 128</p>
                  <p className="text-gray-600 text-sm">89822 Spadola (VV), Calabria</p>
                  <div className="flex gap-3 mt-4">
                    <a
                      href="https://maps.google.com/?q=Via+Conte+Ruggiero+128+Spadola+VV"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3D30] hover:bg-[#2D5A47] text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                      Indicazioni
                    </a>
                    <a
                      href="tel:+393276473099"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#C4704B] hover:bg-[#A85A3A] text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Chiama
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-[#1E3D30] via-[#2D5A47] to-[#1E3D30] relative overflow-hidden">
        {/* Pattern */}
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
              Pronto a costruire il tuo futuro?
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Ogni giorno che passa è un giorno in meno verso la casa dei tuoi sogni.
              Inizia oggi il tuo percorso con Ecolive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#form"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C4704B] hover:bg-[#A85A3A] text-white font-semibold rounded-full shadow-xl transition-all"
              >
                <Calendar className="w-5 h-5" />
                Prenota una Consulenza
              </motion.a>

              <motion.a
                href="tel:+393276473099"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 transition-all"
              >
                <PhoneCall className="w-5 h-5" />
                +39 327 647 3099
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideo(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <p className="text-lg">Video Tour Coming Soon</p>
              </div>
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
