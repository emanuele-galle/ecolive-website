'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  PhoneCall,
  Building2,
  Send,
  Navigation,
  ArrowRight,
} from 'lucide-react'
import ContactForm from './ContactForm'
import BlurText from '@/components/ui/BlurText'
import SpotlightCard from '@/components/ui/SpotlightCard'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'

/* ──────────────────── Types ──────────────────── */

interface ContactPageClientProps {
  onSubmit: (formData: FormData) => Promise<{ success: boolean; message: string }>
}

/* ──────────────────── Data ──────────────────── */

const contactCards = [
  {
    icon: MapPin,
    title: 'Sede & Laboratorio',
    lines: ['Via Conte Ruggiero, 128', '89822 Spadola (VV), Calabria'],
    href: 'https://maps.google.com/?q=Via+Conte+Ruggiero+128+Spadola+VV',
    cta: 'Apri Mappa',
    external: true,
  },
  {
    icon: Phone,
    title: 'Telefono Fisso',
    lines: ['(0963) 530945', 'Lun\u2013Ven 9:00\u201318:00'],
    href: 'tel:+390963530945',
    cta: 'Chiama',
  },
  {
    icon: PhoneCall,
    title: 'Cellulare / WhatsApp',
    lines: ['+39 0963 1951395', 'Anche Sabato mattina'],
    href: 'tel:+3909631951395',
    cta: 'Chiama',
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['info@ecolive.srl', 'Risposta entro 24h'],
    href: 'mailto:info@ecolive.srl',
    cta: 'Scrivi',
  },
]

const officeHours = [
  { day: 'Luned\u00EC \u2013 Venerd\u00EC', hours: '9:00 \u2013 18:00' },
  { day: 'Sabato', hours: '9:00 \u2013 13:00' },
  { day: 'Domenica', hours: 'Chiuso' },
]

const teamMembers = [
  {
    name: 'Francesco Ferraro',
    role: 'Fondatore & Direzione Tecnica',
    phone: '+39 0963 1951395',
    initial: 'FF',
  },
  {
    name: 'Ufficio Tecnico',
    role: 'Progettazione & Calcoli Strutturali',
    phone: '(0963) 530945',
    initial: 'UT',
  },
  {
    name: 'Ufficio Commerciale',
    role: 'Preventivi & Consulenza',
    phone: '(0963) 530945',
    initial: 'UC',
  },
  {
    name: 'Assistenza Cantiere',
    role: 'Coordinamento Montaggio',
    phone: '+39 0963 1951395',
    initial: 'AC',
  },
]

const directions = [
  {
    title: 'Da Lamezia Terme (Aeroporto)',
    desc: 'Autostrada A2 direzione Reggio Calabria, uscita Serra San Bruno. Seguire per Spadola (circa 1h 15min).',
  },
  {
    title: 'Da Catanzaro',
    desc: 'SS106 Jonica fino a Soverato, poi SS182 delle Serre verso Serra San Bruno e Spadola (circa 1h 30min).',
  },
  {
    title: 'Da Vibo Valentia',
    desc: 'SP10 verso Serra San Bruno, poi indicazioni per Spadola. Percorso panoramico attraverso il Parco delle Serre (circa 40min).',
  },
]

/* ──────────────────── Animation constants ──────────────────── */

const fadeInUpInitial = { opacity: 0, y: 20 }
const fadeInUpAnimate = { opacity: 1, y: 0 }
const heroSubTransition = { duration: 0.6, delay: 0.1 }
const heroCtaTransition = { duration: 0.6, delay: 0.2 }
const mapIframeStyle = { border: 0 }

/* ──────────────────── Component ──────────────────── */

export default function ContactPageClient({ onSubmit }: ContactPageClientProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* ===== HERO ===== */}
      <section className="relative bg-[#1D1D1F] py-32 lg:py-44 overflow-hidden">
        {/* Grain */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />

        {/* Decorative glows */}
        <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-[#A0845C]/5 blur-3xl" />
        <div className="absolute bottom-10 left-[15%] w-56 h-56 rounded-full bg-[#A0845C]/3 blur-2xl" />
        <div className="absolute top-16 left-20 w-2 h-2 rounded-full bg-[#A0845C]/30" />
        <div className="absolute bottom-24 right-16 w-1.5 h-1.5 rounded-full bg-white/10" />

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <ScrollReveal delay={0}>
            <span className="inline-block text-[#A0845C] text-sm tracking-[0.25em] uppercase font-medium mb-6">
              Parliamo del tuo progetto
            </span>
          </ScrollReveal>

          <BlurText
            text="Contattaci"
            className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white mb-6 justify-center"
            delay={100}
            animateBy="words"
            direction="bottom"
          />

          <motion.p
            initial={fadeInUpInitial}
            animate={fadeInUpAnimate}
            transition={heroSubTransition}
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Prenota una visita in sede a Spadola e tocca con mano
            <br className="hidden sm:block" />
            la qualit&agrave; del sistema costruttivo X-Frame.
          </motion.p>

          <motion.div
            initial={fadeInUpInitial}
            animate={fadeInUpAnimate}
            transition={heroCtaTransition}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#form"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#A0845C] hover:bg-[#8B7050] text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#A0845C]/20"
            >
              <Send className="w-5 h-5" />
              Richiedi Preventivo
            </a>
            <a
              href="tel:+3909631951395"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/15 transition-all duration-300"
            >
              <PhoneCall className="w-5 h-5" />
              Chiama Ora
            </a>
          </motion.div>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#FFFFFF" height={60} />

      {/* ===== CONTACT INFO CARDS ===== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Recapiti
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1D1D1F] mt-3 mb-4">
                Come raggiungerci
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((card, index) => (
              <ScrollReveal key={card.title} delay={index * 0.1} direction="up">
                <a
                  href={card.href}
                  target={card.external ? '_blank' : undefined}
                  rel={card.external ? 'noopener noreferrer' : undefined}
                  className="block h-full"
                >
                  <SpotlightCard className="bg-white p-7 border border-[#EDE6DB] h-full hover:border-[#A0845C]/30 hover:shadow-lg hover:shadow-[#A0845C]/5 transition-all duration-500 text-center group">
                    <div className="w-14 h-14 mx-auto mb-5 bg-[#1D1D1F] rounded-2xl flex items-center justify-center group-hover:bg-[#A0845C] transition-colors duration-500">
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1D1D1F] mb-3">
                      {card.title}
                    </h3>
                    {card.lines.map((line) => (
                      <p key={line} className="text-[#86868B] text-sm leading-relaxed">
                        {line}
                      </p>
                    ))}
                    <span className="inline-flex items-center gap-1.5 mt-4 text-[#A0845C] text-sm font-medium group-hover:gap-2.5 transition-all duration-300">
                      {card.cta}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </SpotlightCard>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#F5F5F7" height={60} />

      {/* ===== FORM + INFO SECTION ===== */}
      <section id="form" className="py-24 lg:py-32 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Scrivici
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1D1D1F] mt-3">
                Richiedi informazioni
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            {/* Left column: Info */}
            <div className="lg:col-span-2 lg:sticky lg:top-32 space-y-6">
              {/* Office hours */}
              <ScrollReveal direction="left">
                <SpotlightCard className="p-6 bg-white border border-[#EDE6DB] hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-[#A0845C]/10 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#A0845C]" />
                    </div>
                    <h4 className="font-semibold text-[#1D1D1F] text-lg">
                      Orari di apertura
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {officeHours.map((item) => (
                      <div
                        key={item.day}
                        className="flex justify-between items-center py-2 border-b border-[#F5F5F7] last:border-0"
                      >
                        <span className="text-[#48484A] text-sm font-medium">
                          {item.day}
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            item.hours === 'Chiuso'
                              ? 'text-[#86868B]/50'
                              : 'text-[#A0845C]'
                          }`}
                        >
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </ScrollReveal>

              {/* Address card */}
              <ScrollReveal direction="left" delay={0.1}>
                <SpotlightCard className="p-6 bg-white border border-[#EDE6DB] hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#1D1D1F]/10 rounded-xl flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#1D1D1F]" />
                    </div>
                    <h4 className="font-semibold text-[#1D1D1F] text-lg">Sede</h4>
                  </div>
                  <p className="text-[#86868B] text-sm leading-relaxed">
                    Via Conte Ruggiero, 128
                    <br />
                    89822 Spadola (VV), Calabria
                  </p>
                  <a
                    href="https://maps.google.com/?q=Via+Conte+Ruggiero+128+Spadola+VV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-[#A0845C] text-sm font-medium hover:gap-3 transition-all duration-300"
                  >
                    <Navigation className="w-4 h-4" />
                    Apri in Google Maps
                  </a>
                </SpotlightCard>
              </ScrollReveal>

              {/* Dark CTA */}
              <ScrollReveal direction="left" delay={0.2}>
                <div className="p-7 bg-[#1D1D1F] rounded-2xl">
                  <h4 className="font-serif text-white text-xl mb-2">
                    Preferisci parlare a voce?
                  </h4>
                  <p className="text-white/50 text-sm mb-5 leading-relaxed">
                    Chiamaci per una consulenza gratuita e senza impegno.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="tel:+390963530945"
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-[#A0845C]/20 rounded-lg flex items-center justify-center group-hover:bg-[#A0845C]/30 transition-colors">
                        <Phone className="w-5 h-5 text-[#A0845C]" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">Fisso</p>
                        <p className="text-white/40 text-xs">(0963) 530945</p>
                      </div>
                    </a>
                    <a
                      href="tel:+3909631951395"
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-[#A0845C]/20 rounded-lg flex items-center justify-center group-hover:bg-[#A0845C]/30 transition-colors">
                        <PhoneCall className="w-5 h-5 text-[#A0845C]" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">Cellulare</p>
                        <p className="text-white/40 text-xs">+39 0963 1951395</p>
                      </div>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right column: Form */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="right" delay={0.15}>
                <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-[#EDE6DB]/50">
                  <div className="mb-8">
                    <h3 className="font-serif text-2xl text-[#1D1D1F] mb-2">
                      Compila il modulo
                    </h3>
                    <p className="text-[#86868B] text-sm">
                      Ti risponderemo entro 24 ore lavorative
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="w-8 h-0.5 bg-[#A0845C]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#A0845C]/40" />
                    </div>
                  </div>
                  <ContactForm onSubmit={onSubmit} />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#1D1D1F" height={80} />

      {/* ===== TEAM QUICK CONTACT ===== */}
      <section className="relative py-24 lg:py-32 bg-[#1D1D1F] overflow-hidden">
        {/* Grain */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#A0845C]/3 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Il nostro team
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white mt-3 mb-4">
                Contatto diretto
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.1} direction="up">
                <a
                  href={`tel:${member.phone.replace(/[^+\d]/g, '')}`}
                  className="block group"
                >
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-[#A0845C]/30 transition-all duration-500 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#A0845C]/15 rounded-2xl flex items-center justify-center group-hover:bg-[#A0845C]/25 transition-colors duration-500">
                      <span className="text-[#A0845C] font-bold text-lg">
                        {member.initial}
                      </span>
                    </div>
                    <h4 className="text-white font-semibold mb-1">{member.name}</h4>
                    <p className="text-white/40 text-sm mb-3">{member.role}</p>
                    <span className="inline-flex items-center gap-2 text-[#A0845C] text-sm font-medium">
                      <Phone className="w-4 h-4" />
                      {member.phone}
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#FFFFFF" height={60} />

      {/* ===== COME RAGGIUNGERCI ===== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Indicazioni
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1D1D1F] mt-3 mb-4">
                Come raggiungerci
              </h2>
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
              <p className="text-[#86868B] text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
                La sede e il laboratorio EcoLive si trovano a Spadola, nel cuore
                del Parco Naturale delle Serre, in Calabria.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {directions.map((dir, index) => (
              <ScrollReveal key={dir.title} delay={index * 0.1} direction="up">
                <SpotlightCard className="p-7 bg-white border border-[#EDE6DB] h-full hover:border-[#A0845C]/30 hover:shadow-lg hover:shadow-[#A0845C]/5 transition-all duration-500">
                  <div className="w-10 h-10 bg-[#1D1D1F] rounded-xl flex items-center justify-center mb-4">
                    <Navigation className="w-5 h-5 text-[#A0845C]" />
                  </div>
                  <h4 className="font-semibold text-[#1D1D1F] text-lg mb-3">
                    {dir.title}
                  </h4>
                  <p className="text-[#86868B] text-sm leading-relaxed">{dir.desc}</p>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Google Maps embed */}
        <div className="relative h-[450px] sm:h-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3107.5!2d16.4175!3d38.6325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x131531e5a5a5a5a5%3A0x1234567890abcdef!2sVia%20Conte%20Ruggiero%2C%20128%2C%2089822%20Spadola%20VV!5e0!3m2!1sit!2sit!4v1704067200000!5m2!1sit!2sit"
            width="100%"
            height="100%"
            style={mapIframeStyle}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sede Ecolive - Spadola (VV)"
            className="grayscale-[20%]"
          />

          {/* Floating address card */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0 w-[90%] sm:w-auto max-w-md z-20">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#EDE6DB]/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1D1D1F] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[#1D1D1F] text-lg">
                    Ecolive S.r.l.
                  </h4>
                  <p className="text-[#86868B] text-sm mt-1">
                    Via Conte Ruggiero, 128
                  </p>
                  <p className="text-[#86868B] text-sm">
                    89822 Spadola (VV), Calabria
                  </p>
                  <div className="flex gap-3 mt-4">
                    <a
                      href="https://maps.google.com/?q=Via+Conte+Ruggiero+128+Spadola+VV"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#1D1D1F] hover:bg-[#48484A] text-white text-sm font-medium rounded-lg transition-colors duration-300"
                    >
                      <ArrowRight className="w-4 h-4" />
                      Indicazioni
                    </a>
                    <a
                      href="tel:+390963530945"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#A0845C] hover:bg-[#8B7050] text-white text-sm font-medium rounded-lg transition-colors duration-300"
                    >
                      <Phone className="w-4 h-4" />
                      Chiama
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
