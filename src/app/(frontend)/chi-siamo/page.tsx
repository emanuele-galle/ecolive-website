'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Leaf, Hammer, Lightbulb, Handshake, ArrowRight, MapPin, Phone } from 'lucide-react'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const teamMembers = [
  {
    name: 'Dominik Galle',
    role: 'Founder & CEO',
    image: '/api/media/file/dominik-galle.jpeg',
    bio: 'Visionario della bioedilizia calabrese, guida Ecolive dal 1999 con passione per l\'innovazione sostenibile.',
  },
  {
    name: 'Pasquale Zaffino',
    role: 'Direttore Tecnico',
    image: '/api/media/file/pasquale-zaffino.jpg',
    bio: 'Ingegnere strutturista specializzato in costruzioni in legno e sistemi antisismici avanzati.',
  },
  {
    name: 'Luisa Baffa Trasci',
    role: 'Direttore Commerciale',
    image: '/api/media/file/luisa-baffa-trasci.jpg',
    bio: 'Accompagna ogni cliente dalla prima idea alla consegna delle chiavi, con cura e trasparenza.',
  },
]

const milestones = [
  { year: '1999', title: 'Fondazione a Serra San Bruno' },
  { year: '2005', title: 'Primo progetto residenziale in legno' },
  { year: '2012', title: 'Brevetto sistema X-Frame' },
  { year: '2020', title: 'Espansione su tutto il territorio nazionale' },
  { year: '2024', title: 'Lancio X-Frame 2.0' },
]

const values = [
  {
    icon: Leaf,
    title: 'Sostenibilita',
    description: 'Legno certificato PEFC da foreste gestite responsabilmente. Impatto ambientale ridotto del 70%.',
  },
  {
    icon: Hammer,
    title: 'Qualita Artigianale',
    description: 'Ogni casa e costruita con cura sartoriale. Garanzia 30 anni sulla struttura portante.',
  },
  {
    icon: Lightbulb,
    title: 'Innovazione',
    description: 'Sistema X-Frame brevettato: tecnologia unica in Italia per case in classe energetica A4.',
  },
  {
    icon: Handshake,
    title: 'Trasparenza',
    description: 'Preventivi dettagliati, tempi certi e comunicazione diretta in ogni fase del progetto.',
  },
]

export default function ChiSiamoPage() {
  return (
    <main className="overflow-hidden">

      {/* HERO */}
      <section className="relative bg-[#1E3D30] py-32 md:py-40 lg:py-48">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3D30] via-[#1E3D30] to-[#152922]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Dal 1999, costruiamo il futuro dell&apos;abitare
          </motion.h1>
          <motion.p
            className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Bioedilizia di eccellenza in Calabria
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-8 md:gap-12 text-white/60 text-sm tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span><strong className="text-white text-2xl font-bold block">25+</strong>Anni di esperienza</span>
            <span><strong className="text-white text-2xl font-bold block">40+</strong>Case realizzate</span>
            <span><strong className="text-white text-2xl font-bold block">98%</strong>Clienti soddisfatti</span>
          </motion.div>
        </div>
      </section>

      {/* LA NOSTRA STORIA */}
      <section className="py-20 lg:py-28 px-6 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div {...fadeIn}>
            <span className="text-[#C4704B] text-sm tracking-[0.2em] uppercase font-medium">
              La Nostra Storia
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3D30] mt-3 leading-tight">
              Da Serra San Bruno al futuro della bioedilizia
            </h2>
            <div className="mt-6 space-y-4 text-[#6B6560] text-lg leading-relaxed">
              <p>
                Ecolive nasce nel cuore della Calabria dalla visione di chi crede che
                costruire in legno significhi costruire meglio. Da oltre 25 anni realizziamo
                abitazioni che combinano tradizione artigianale e tecnologia all&apos;avanguardia.
              </p>
              <p>
                Il nostro sistema brevettato <strong className="text-[#1E3D30]">X-Frame</strong> rappresenta
                l&apos;evoluzione della bioedilizia italiana: case in classe energetica A4,
                antisismiche, consegnate in 60 giorni.
              </p>
            </div>
          </motion.div>

          {/* Timeline compatta */}
          <motion.div {...fadeIn} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="relative pl-8 border-l-2 border-[#C4704B]/30 space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  className="relative"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-[#C4704B]" />
                  <span className="text-[#C4704B] font-bold text-lg">{m.year}</span>
                  <p className="text-[#1E3D30] font-medium mt-0.5">{m.title}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* IL TEAM */}
      <section className="py-20 lg:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-14" {...fadeIn}>
            <span className="text-[#C4704B] text-sm tracking-[0.2em] uppercase font-medium">
              Le Persone
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3D30] mt-3">
              Il nostro team
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF7F2]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E3D30]/60 via-transparent to-transparent" />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-[#1E3D30]">{member.name}</h3>
                  <p className="text-[#C4704B] font-medium text-sm">{member.role}</p>
                  <p className="text-[#6B6560] text-sm mt-2 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* I NOSTRI VALORI */}
      <section className="py-20 lg:py-28 px-6 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-14" {...fadeIn}>
            <span className="text-[#C4704B] text-sm tracking-[0.2em] uppercase font-medium">
              I Nostri Principi
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3D30] mt-3">
              Valori che ci guidano
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  className="bg-white rounded-2xl p-6 border border-[#DDD5C9]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1E3D30]/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#1E3D30]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1E3D30] mb-2">{value.title}</h3>
                  <p className="text-[#6B6560] text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 px-6 bg-[#1E3D30]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Vieni a trovarci nel nostro stabilimento a Spadola
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto">
              Scopri come nascono le nostre case e parla direttamente con il nostro team.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C4704B] text-white font-semibold rounded-full hover:bg-[#A85A3A] transition-colors"
              >
                Prenota una visita
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+3909631951395"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Chiama Ora
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center gap-2 text-white/50 text-sm">
              <MapPin className="w-4 h-4 text-[#C4704B]" />
              <span>Via Conte Ruggiero 128, Spadola (VV) — 0963 195 1395</span>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
