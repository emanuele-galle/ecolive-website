'use client'

import { motion } from 'framer-motion'
import { Timeline, TimelineContent, TimelineImageGrid } from '@/components/ui/timeline'

// Placeholder images from Unsplash (construction/architecture theme)
const placeholderImages = {
  fondazione: [
    { src: 'https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=600&q=80', alt: 'Fondazione Ecolive' },
    { src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80', alt: 'Prima sede' },
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', alt: 'Progetto iniziale' },
    { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', alt: 'Team fondatori' },
  ],
  primeCase: [
    { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', alt: 'Prima casa completata' },
    { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80', alt: 'Interni prima casa' },
    { src: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80', alt: 'Costruzione in corso' },
    { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80', alt: 'Dettaglio legno' },
  ],
  platformFrame: [
    { src: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&q=80', alt: 'Sistema Platform Frame' },
    { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80', alt: 'Struttura in legno' },
    { src: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&q=80', alt: 'Montaggio pannelli' },
    { src: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&q=80', alt: 'Casa completata' },
  ],
  xlam: [
    { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80', alt: 'Pannelli X-Lam' },
    { src: 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=600&q=80', alt: 'Lavorazione CLT' },
    { src: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600&q=80', alt: 'Stabilimento' },
    { src: 'https://images.unsplash.com/photo-1600566753104-685f4f24cb4d?w=600&q=80', alt: 'Progetto X-Lam' },
  ],
  espansione: [
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', alt: 'Progetti in Italia' },
    { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', alt: 'Team allargato' },
    { src: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&q=80', alt: 'Nuovi progetti' },
    { src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80', alt: 'Showroom' },
  ],
  xframe: [
    { src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80', alt: 'Sistema X-Frame' },
    { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', alt: 'KlimaHouse 2024' },
    { src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80', alt: 'Brevetto X-Frame' },
    { src: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80', alt: 'Casa X-Frame' },
  ],
}

// Timeline data with Ecolive history
const timelineData = [
  {
    title: '1999',
    content: (
      <TimelineContent>
        <div className="mb-8">
          <h4 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] mb-4">
            Fondazione
          </h4>
          <p className="text-[#86868B] text-base md:text-lg leading-relaxed mb-6">
            Nasce Ecolive a <strong className="text-[#A0845C]">Spadola</strong>, nel cuore della Calabria.
            Un sogno che prende forma tra le montagne delle Serre, dove la tradizione del legno
            incontra la visione di un&apos;edilizia sostenibile. Le prime costruzioni seguono
            le tecniche tradizionali della carpenteria locale.
          </p>
        </div>
        <TimelineImageGrid images={placeholderImages.fondazione} />
      </TimelineContent>
    ),
  },
  {
    title: '2005',
    content: (
      <TimelineContent>
        <div className="mb-8">
          <h4 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] mb-4">
            Prime Case Complete
          </h4>
          <p className="text-[#86868B] text-base md:text-lg leading-relaxed mb-6">
            Consegniamo le prime abitazioni complete ai nostri clienti. Ogni casa e un progetto
            unico, costruito con <strong className="text-[#A0845C]">cura artigianale</strong> e
            attenzione ai dettagli. La soddisfazione dei clienti diventa il nostro miglior biglietto da visita.
          </p>
        </div>
        <TimelineImageGrid images={placeholderImages.primeCase} />
      </TimelineContent>
    ),
  },
  {
    title: '2008',
    content: (
      <TimelineContent>
        <div className="mb-8">
          <h4 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] mb-4">
            Sistema Platform Frame
          </h4>
          <p className="text-[#86868B] text-base md:text-lg leading-relaxed mb-6">
            Adottiamo la tecnologia <strong className="text-[#A0845C]">Platform Frame</strong>,
            il sistema costruttivo piu diffuso al mondo per le case in legno. Questo metodo ci
            permette di garantire tempi di costruzione piu rapidi e una maggiore precisione nelle finiture.
          </p>
        </div>
        <TimelineImageGrid images={placeholderImages.platformFrame} />
      </TimelineContent>
    ),
  },
  {
    title: '2012',
    content: (
      <TimelineContent>
        <div className="mb-8">
          <h4 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] mb-4">
            Tecnologia X-Lam (CLT)
          </h4>
          <p className="text-[#86868B] text-base md:text-lg leading-relaxed mb-6">
            Introduciamo i pannelli <strong className="text-[#A0845C]">X-Lam</strong> (Cross Laminated Timber),
            portando la nostra offerta a un nuovo livello di resistenza e prestazioni.
            Questa tecnologia ci permette di realizzare edifici pluripiano con caratteristiche antisismiche eccezionali.
          </p>
        </div>
        <TimelineImageGrid images={placeholderImages.xlam} />
      </TimelineContent>
    ),
  },
  {
    title: '2020',
    content: (
      <TimelineContent>
        <div className="mb-8">
          <h4 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] mb-4">
            Espansione Nazionale
          </h4>
          <p className="text-[#86868B] text-base md:text-lg leading-relaxed mb-6">
            Ecolive si afferma sul mercato italiano. Dalla Calabria, i nostri progetti raggiungono
            tutto il territorio nazionale. Il team si amplia, lo stabilimento di Spadola si modernizza,
            ma i <strong className="text-[#A0845C]">valori artigianali</strong> rimangono al centro di tutto.
          </p>
        </div>
        <TimelineImageGrid images={placeholderImages.espansione} />
      </TimelineContent>
    ),
  },
  {
    title: '2024',
    content: (
      <TimelineContent>
        <div className="mb-8">
          <h4 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] mb-4">
            X-Frame a KlimaHouse
          </h4>
          <p className="text-[#86868B] text-base md:text-lg leading-relaxed mb-6">
            Presentiamo a <strong className="text-[#A0845C]">KlimaHouse 2024</strong> il nostro sistema
            brevettato <strong className="text-[#A0845C]">X-Frame</strong>: un&apos;evoluzione ibrida
            che combina il meglio di Platform Frame e X-Lam. Resistenza sismica superiore,
            efficienza energetica classe A4, tempi di costruzione ridotti del 40%.
          </p>
        </div>
        <TimelineImageGrid images={placeholderImages.xframe} />
      </TimelineContent>
    ),
  },
]

export default function OurStoryTimeline() {
  return (
    <section className="py-20 lg:py-32 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
            La Nostra Storia
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D1D1F] mt-3">
            25 anni di{' '}
            <span className="text-[#A0845C]">Innovazione</span>
          </h2>
          <p className="text-[#86868B] text-lg mt-4 max-w-2xl mx-auto">
            Da Spadola, nel cuore della Calabria, abbiamo rivoluzionato
            il modo di costruire case in Italia.
          </p>
        </motion.div>

        {/* Timeline */}
        <Timeline
          data={timelineData}
          lineColor="rgba(221, 213, 201, 0.5)"
          activeLineGradient="linear-gradient(to bottom, #A0845C 0%, #B89B74 50%, transparent 100%)"
        />
      </div>
    </section>
  )
}
