'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ChevronDown, Leaf, Euro, Shield, FileCheck, CheckCircle,
  ArrowRight, Flame, Thermometer, Wind, Droplets, CreditCard,
  Award, HelpCircle, Phone, MessageCircle, Mail
} from 'lucide-react'
import BlurText from '@/components/ui/BlurText'
import ScrollReveal from '@/components/ui/ScrollReveal'
import InfiniteMarquee from '@/components/ui/InfiniteMarquee'
import SectionTransition from '@/components/ui/SectionTransition'

const categories = [
  { id: 'sistema', label: 'Sistema X-Frame', icon: Leaf },
  { id: 'costi', label: 'Costi e Tempi', icon: Euro },
  { id: 'qualita', label: 'Qualita e Sicurezza', icon: Shield },
  { id: 'permessi', label: 'Iter e Permessi', icon: FileCheck },
]

type FAQItem = {
  question: string
  answer: React.ReactNode
}

const faqsByCategory: Record<string, FAQItem[]> = {
  sistema: [
    {
      question: 'Perche scegliere il sistema X-Frame?',
      answer: (
        <>
          <p className="mb-4 text-[var(--color-muted)]">
            Il sistema X-Frame rappresenta l&apos;evoluzione dell&apos;edilizia in legno,
            combinando tre tecnologie collaudate in un unico sistema ibrido.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[var(--color-secondary-dark)]">Rispetto per l&apos;ambiente</strong> — materiali naturali e rinnovabili</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[var(--color-secondary-dark)]">Innovazione tecnologica</strong> — precisione industriale millimetrica</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[var(--color-secondary-dark)]">Comfort superiore</strong> — isolamento termico e acustico eccellente</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[var(--color-secondary-dark)]">Classe A4 garantita</strong> — massima efficienza energetica</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[var(--color-secondary-dark)]">Casa pronta in 60 giorni</strong> — tempi di costruzione ridotti</span>
            </li>
          </ul>
        </>
      )
    },
    {
      question: 'Quali sono i vantaggi rispetto alle case tradizionali?',
      answer: (
        <>
          <p className="mb-4 text-[var(--color-muted)]">
            Rispetto all&apos;edilizia in muratura, le nostre case offrono vantaggi concreti
            sia economici che prestazionali.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-[var(--color-secondary-dark)]/5 rounded-xl">
              <h4 className="font-semibold text-[var(--color-secondary-dark)] mb-2">Tempi ridotti</h4>
              <p className="text-sm text-[var(--color-muted)]">Costruzione 70% piu veloce: 4-8 settimane invece di mesi</p>
            </div>
            <div className="p-4 bg-[var(--color-secondary-dark)]/5 rounded-xl">
              <h4 className="font-semibold text-[var(--color-secondary-dark)] mb-2">Risparmio economico</h4>
              <p className="text-sm text-[var(--color-muted)]">Costi inferiori del 20-40% a parita di qualita</p>
            </div>
            <div className="p-4 bg-[var(--color-secondary-dark)]/5 rounded-xl">
              <h4 className="font-semibold text-[var(--color-secondary-dark)] mb-2">Efficienza energetica</h4>
              <p className="text-sm text-[var(--color-muted)]">Consumi ridotti fino all&apos;80% rispetto alle case tradizionali</p>
            </div>
            <div className="p-4 bg-[var(--color-secondary-dark)]/5 rounded-xl">
              <h4 className="font-semibold text-[var(--color-secondary-dark)] mb-2">Resistenza sismica</h4>
              <p className="text-sm text-[var(--color-muted)]">Strutture certificate per zona sismica 1</p>
            </div>
          </div>
        </>
      )
    },
  ],
  costi: [
    {
      question: 'Quanto costa una casa Ecolive?',
      answer: (
        <>
          <p className="mb-4 text-[var(--color-muted)]">
            Offriamo diverse soluzioni per adattarci alle tue esigenze e budget.
          </p>
          <div className="space-y-3 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[var(--color-surface)] rounded-xl border-l-4 border-[var(--color-primary)] gap-2">
              <div>
                <h4 className="font-semibold text-[var(--color-secondary-dark)]">Grezzo Base</h4>
                <p className="text-sm text-[var(--color-muted)]">Struttura completa</p>
              </div>
              <span className="text-xl font-bold text-[var(--color-primary)]">da &euro;1.100/mq</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[var(--color-surface)] rounded-xl border-l-4 border-[var(--color-primary)] gap-2">
              <div>
                <h4 className="font-semibold text-[var(--color-secondary-dark)]">Grezzo Avanzato</h4>
                <p className="text-sm text-[var(--color-muted)]">Pronto per finiture</p>
              </div>
              <span className="text-xl font-bold text-[var(--color-primary)]">da &euro;1.200/mq</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[var(--color-secondary-dark)] rounded-xl gap-2">
              <div>
                <h4 className="font-semibold text-white">Chiavi in Mano</h4>
                <p className="text-sm text-white/70">Casa pronta da abitare</p>
              </div>
              <span className="text-xl font-bold text-[var(--color-primary)]">da &euro;1.800/mq</span>
            </div>
          </div>
          <p className="text-sm text-[var(--color-muted)] italic">
            Preventivo dettagliato e bloccato, nessuna sorpresa. Prezzo garantito fino alla consegna.
          </p>
        </>
      )
    },
    {
      question: 'Quanto tempo ci vuole per costruire una casa?',
      answer: (
        <>
          <p className="mb-4 text-[var(--color-muted)]">
            Una delle cose che stupisce di piu i nostri clienti e la velocita di realizzazione.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="text-center p-4 bg-[var(--color-primary)]/10 rounded-xl flex-1 min-w-[120px]">
              <div className="text-3xl font-bold text-[var(--color-primary)]">5-7</div>
              <div className="text-sm text-[var(--color-muted)]">giorni montaggio</div>
            </div>
            <ArrowRight className="w-6 h-6 text-[#EDE6DB] hidden sm:block" />
            <div className="text-center p-4 bg-[var(--color-secondary-dark)]/10 rounded-xl flex-1 min-w-[120px]">
              <div className="text-3xl font-bold text-[var(--color-secondary-dark)]">30</div>
              <div className="text-sm text-[var(--color-muted)]">giorni chiavi in mano</div>
            </div>
          </div>
          <p className="text-[var(--color-muted)] text-sm">
            Questi tempi non includono la preparazione del terreno, le fondazioni
            e gli allacci alle utenze (che dipendono da fattori esterni).
          </p>
        </>
      )
    },
    {
      question: 'Quali opzioni di finanziamento sono disponibili?',
      answer: (
        <>
          <p className="mb-4 text-[var(--color-muted)]">
            Le banche finanziano le case in legno esattamente come quelle tradizionali.
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[var(--color-secondary-dark)]">Mutuo ipotecario</strong> — la soluzione classica</span>
            </li>
            <li className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[var(--color-secondary-dark)]">Finanziamenti convenzionati</strong> — accordi con istituti partner</span>
            </li>
            <li className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[var(--color-secondary-dark)]">Contributi regionali</strong> — incentivi per efficienza energetica</span>
            </li>
            <li className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[var(--color-secondary-dark)]">Conto Termico</strong> — contributi statali per rinnovabili</span>
            </li>
          </ul>
          <p className="text-[var(--color-muted)] text-sm">
            I nostri consulenti ti guideranno nella scelta migliore, con piani da 5 a 30 anni.
          </p>
        </>
      )
    },
  ],
  qualita: [
    {
      question: 'Le case in legno durano nel tempo?',
      answer: (
        <>
          <p className="mb-4 text-[var(--color-muted)]">
            <strong className="text-[var(--color-secondary-dark)]">Assolutamente si.</strong> Con la giusta cura, una casa in legno
            puo durare secoli — come dimostrano le costruzioni storiche in Scandinavia e Giappone.
          </p>
          <p className="mb-4 text-[var(--color-muted)]">Le nostre case sono progettate per durare grazie a:</p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
              <span className="text-[var(--color-muted)]">Legno essiccato industrialmente con umidita controllata al 12%</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
              <span className="text-[var(--color-muted)]">Trattamenti protettivi contro funghi, insetti e umidita</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
              <span className="text-[var(--color-muted)]">Membrane traspiranti e barriere al vapore</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
              <span className="text-[var(--color-muted)]">Sistema di ventilazione che previene condense e muffe</span>
            </li>
          </ul>
          <p className="text-[var(--color-muted)] text-sm">
            La manutenzione richiesta e simile a quella di una casa tradizionale.
          </p>
        </>
      )
    },
    {
      question: 'Sono sicure in caso di incendio?',
      answer: (
        <>
          <p className="mb-4 text-[var(--color-muted)]">
            <strong className="text-[var(--color-secondary-dark)]">Si, sono molto sicure.</strong> Contrariamente a quanto si pensa,
            il legno ha un comportamento prevedibile in caso di incendio — a differenza
            dell&apos;acciaio che puo collassare improvvisamente.
          </p>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-red-500" />
              <h4 className="font-semibold text-[var(--color-foreground)]">Resistenza al fuoco REI 60</h4>
            </div>
            <p className="text-sm text-[var(--color-muted)]">
              60 minuti di resistenza strutturale certificata — tempo sufficiente
              per evacuare e per l&apos;intervento dei vigili del fuoco.
            </p>
          </div>
          <p className="text-[var(--color-muted)] text-sm">
            Utilizziamo inoltre materiali ignifughi, compartimentazione degli ambienti
            e impianti conformi alle normative piu recenti.
          </p>
        </>
      )
    },
    {
      question: 'Come viene garantita la qualita?',
      answer: (
        <>
          <p className="mb-4 text-[var(--color-muted)]">La qualita e al centro di tutto quello che facciamo.</p>
          <div className="space-y-4 mb-4">
            {[
              { num: '1', title: 'Produzione in stabilimento', desc: 'Componenti realizzati con precisione millimetrica' },
              { num: '2', title: 'Materiali certificati', desc: 'Legno da foreste gestite responsabilmente' },
              { num: '3', title: 'Collaudo finale', desc: 'Test e verifiche prima della consegna' },
            ].map((step) => (
              <div key={step.num} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{step.num}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-secondary-dark)]">{step.title}</h4>
                  <p className="text-sm text-[var(--color-muted)]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 p-4 bg-[var(--color-secondary-dark)]/5 rounded-xl">
            <Award className="w-8 h-8 text-[var(--color-primary)]" />
            <div>
              <p className="font-semibold text-[var(--color-secondary-dark)]">Garanzia 10 anni</p>
              <p className="text-sm text-[var(--color-muted)]">Sulla struttura portante</p>
            </div>
          </div>
        </>
      )
    },
  ],
  permessi: [
    {
      question: 'Quali permessi sono necessari?',
      answer: (
        <>
          <p className="mb-4 text-[var(--color-muted)]">
            Le case in legno sono edifici a tutti gli effetti e richiedono
            gli stessi permessi dell&apos;edilizia tradizionale.
          </p>
          <div className="space-y-2 mb-4">
            {[
              { label: 'Permesso di Costruire', desc: 'per nuove costruzioni' },
              { label: 'SCIA', desc: 'per alcune tipologie di intervento' },
              { label: 'Denuncia al Genio Civile', desc: 'per la parte strutturale' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 bg-[var(--color-surface)] rounded-xl">
                <FileCheck className="w-5 h-5 text-[var(--color-primary)]" />
                <span className="text-[var(--color-foreground)]"><strong className="text-[var(--color-secondary-dark)]">{item.label}</strong> — {item.desc}</span>
              </div>
            ))}
          </div>
          <div className="p-4 bg-[var(--color-secondary-dark)]/5 rounded-xl border-l-4 border-[var(--color-primary)]">
            <p className="font-medium text-[var(--color-secondary-dark)]">Non preoccuparti della burocrazia — ci pensiamo noi!</p>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              Gestiamo tutta la documentazione, le pratiche e i rapporti con gli enti.
            </p>
          </div>
        </>
      )
    },
    {
      question: 'Come funziona il riscaldamento e raffrescamento?',
      answer: (
        <>
          <p className="mb-4 text-[var(--color-muted)]">
            Le nostre case sono progettate per il massimo comfort con consumi minimi.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <Thermometer className="w-6 h-6 text-blue-500 mb-2" />
              <h4 className="font-semibold text-[var(--color-foreground)] text-sm">Riscaldamento a pavimento</h4>
              <p className="text-xs text-[var(--color-muted)] mt-1">Calore uniforme in ogni ambiente</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <Leaf className="w-6 h-6 text-green-500 mb-2" />
              <h4 className="font-semibold text-[var(--color-foreground)] text-sm">Pompa di calore</h4>
              <p className="text-xs text-[var(--color-muted)] mt-1">Riscalda e raffresca</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <Wind className="w-6 h-6 text-purple-500 mb-2" />
              <h4 className="font-semibold text-[var(--color-foreground)] text-sm">VMC</h4>
              <p className="text-xs text-[var(--color-muted)] mt-1">Recupero calore al 95%</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <Droplets className="w-6 h-6 text-orange-500 mb-2" />
              <h4 className="font-semibold text-[var(--color-foreground)] text-sm">Deumidificazione</h4>
              <p className="text-xs text-[var(--color-muted)] mt-1">Controllo umidita ottimale</p>
            </div>
          </div>
          <p className="text-sm text-[var(--color-muted)]">
            Grazie all&apos;eccellente isolamento, i consumi sono ridotti fino all&apos;80%
            rispetto a una casa tradizionale.
          </p>
        </>
      )
    },
  ],
}

function FAQItemComponent({ faq, isOpen, onToggle, index }: { faq: FAQItem; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <div className="bg-white rounded-2xl border border-[#EDE6DB] shadow-premium overflow-hidden hover:shadow-premium-lg transition-all duration-300">
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-4 p-6 text-left hover:bg-[var(--color-surface)] transition-colors"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
            isOpen ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
          }`}>
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="flex-1 text-lg font-semibold text-[var(--color-secondary-dark)]">
            {faq.question}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className={`transition-colors duration-300 ${isOpen ? 'text-[var(--color-primary)]' : 'text-[#EDE6DB]'}`}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="px-6 pb-6 pt-2 ml-14">
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  )
}

const marqueeItems = [
  'Domande?',
  'Chiama Ora',
  'Consulenza Gratuita',
  'info@ecolive.srl',
  'Risposte Rapide',
  'Team di Esperti',
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('sistema')
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const currentFAQs = faqsByCategory[activeCategory] || []

  return (
    <main className="min-h-screen bg-[var(--color-surface)]">

      {/* ===== HERO ===== */}
      <section className="relative py-28 lg:py-40 bg-gradient-to-br from-[var(--color-secondary-dark)] to-[var(--color-secondary)]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <BlurText
            text="Domande Frequenti"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 justify-center"
            delay={80}
            animateBy="words"
          />

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Tutto quello che devi sapere sulle case prefabbricate in legno Ecolive.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#48484A" to="#F5F5F7" variant="wave" height={60} />

      {/* ===== CATEGORY TABS ===== */}
      <section className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-[#EDE6DB] shadow-premium">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    setOpenFAQ(0)
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'bg-[var(--color-secondary-dark)] text-white shadow-lg shadow-[var(--color-secondary-dark)]/20'
                      : 'bg-[var(--color-surface)] text-[var(--color-muted)] hover:bg-[#EDE6DB] hover:text-[var(--color-secondary-dark)]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--color-primary)]' : ''}`} />
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== FAQ LIST ===== */}
      <section className="py-16 lg:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              {currentFAQs.map((faq, index) => (
                <FAQItemComponent
                  key={index}
                  faq={faq}
                  isOpen={openFAQ === index}
                  onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-5 bg-white border-y border-[#EDE6DB]">
        <InfiniteMarquee
          items={marqueeItems}
          speed={20}
          className="text-[var(--color-primary)]/60"
        />
      </div>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" variant="angle" height={80} />

      {/* ===== CTA ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[var(--color-secondary-dark)]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Non hai trovato la risposta?
            </h2>
            <p className="text-white/70 mb-12 text-lg max-w-xl mx-auto">
              Il nostro team e a disposizione per rispondere a tutte le tue domande
              e fornirti una consulenza personalizzata.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-semibold rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Contattaci
              </Link>
              <a
                href="tel:+3909631951395"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Chiama Ora
              </a>
            </div>

            {/* Quick contact cards */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <a href="tel:+3909631951395" className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="w-10 h-10 bg-[var(--color-primary)]/20 rounded-xl flex items-center justify-center group-hover:bg-[var(--color-primary)]/30 transition-colors">
                  <Phone className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium text-sm">Telefono</p>
                  <p className="text-white/50 text-xs">+39 0963 1951395</p>
                </div>
              </a>
              <a href="mailto:info@ecolive.srl" className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="w-10 h-10 bg-[var(--color-primary)]/20 rounded-xl flex items-center justify-center group-hover:bg-[var(--color-primary)]/30 transition-colors">
                  <Mail className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium text-sm">Email</p>
                  <p className="text-white/50 text-xs">info@ecolive.srl</p>
                </div>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#FFFFFF" variant="wave" height={60} />

      {/* ===== BROCHURE ===== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-[var(--color-secondary-dark)] to-[var(--color-secondary)] rounded-2xl shadow-premium-lg">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Scarica la Brochure 2025
                </h3>
                <p className="text-white/70">
                  Scopri tutti i nostri prodotti, servizi e progetti realizzati
                </p>
              </div>
              <a
                href="http://127.0.0.1:9000/ecolive-media/documenti/Brochure-2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[var(--color-surface)] text-[var(--color-secondary-dark)] font-semibold rounded-xl transition-colors whitespace-nowrap shadow-premium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Scarica PDF
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
