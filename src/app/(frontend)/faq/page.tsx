'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ChevronDown, Leaf, Euro, Shield, FileCheck, CheckCircle,
  ArrowRight, Flame, Thermometer, Wind, Droplets, CreditCard,
  Award, HelpCircle, Phone, MessageCircle
} from 'lucide-react'

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
          <p className="mb-4 text-gray-600">
            Il sistema X-Frame rappresenta l&apos;evoluzione dell&apos;edilizia in legno,
            combinando tre tecnologie collaudate in un unico sistema ibrido.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#C4704B] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[#1E3D30]">Rispetto per l&apos;ambiente</strong> — materiali naturali e rinnovabili</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#C4704B] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[#1E3D30]">Innovazione tecnologica</strong> — precisione industriale millimetrica</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#C4704B] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[#1E3D30]">Comfort superiore</strong> — isolamento termico e acustico eccellente</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#C4704B] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[#1E3D30]">Classe A4 garantita</strong> — massima efficienza energetica</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#C4704B] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[#1E3D30]">Casa pronta in 60 giorni</strong> — tempi di costruzione ridotti</span>
            </li>
          </ul>
        </>
      )
    },
    {
      question: 'Quali sono i vantaggi rispetto alle case tradizionali?',
      answer: (
        <>
          <p className="mb-4 text-gray-600">
            Rispetto all&apos;edilizia in muratura, le nostre case offrono vantaggi concreti
            sia economici che prestazionali.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#1E3D30]/5 rounded-xl">
              <h4 className="font-semibold text-[#1E3D30] mb-2">Tempi ridotti</h4>
              <p className="text-sm text-gray-600">Costruzione 70% piu veloce: 4-8 settimane invece di mesi</p>
            </div>
            <div className="p-4 bg-[#1E3D30]/5 rounded-xl">
              <h4 className="font-semibold text-[#1E3D30] mb-2">Risparmio economico</h4>
              <p className="text-sm text-gray-600">Costi inferiori del 20-40% a parita di qualita</p>
            </div>
            <div className="p-4 bg-[#1E3D30]/5 rounded-xl">
              <h4 className="font-semibold text-[#1E3D30] mb-2">Efficienza energetica</h4>
              <p className="text-sm text-gray-600">Consumi ridotti fino all&apos;80% rispetto alle case tradizionali</p>
            </div>
            <div className="p-4 bg-[#1E3D30]/5 rounded-xl">
              <h4 className="font-semibold text-[#1E3D30] mb-2">Resistenza sismica</h4>
              <p className="text-sm text-gray-600">Strutture certificate per zona sismica 1</p>
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
          <p className="mb-4 text-gray-600">
            Offriamo diverse soluzioni per adattarci alle tue esigenze e budget.
          </p>
          <div className="space-y-3 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl border-l-4 border-[#C4704B] gap-2">
              <div>
                <h4 className="font-semibold text-[#1E3D30]">Grezzo Base</h4>
                <p className="text-sm text-gray-600">Struttura completa</p>
              </div>
              <span className="text-xl font-bold text-[#C4704B]">da &euro;1.100/mq</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl border-l-4 border-[#C4704B] gap-2">
              <div>
                <h4 className="font-semibold text-[#1E3D30]">Grezzo Avanzato</h4>
                <p className="text-sm text-gray-600">Pronto per finiture</p>
              </div>
              <span className="text-xl font-bold text-[#C4704B]">da &euro;1.200/mq</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#1E3D30] rounded-xl gap-2">
              <div>
                <h4 className="font-semibold text-white">Chiavi in Mano</h4>
                <p className="text-sm text-white/70">Casa pronta da abitare</p>
              </div>
              <span className="text-xl font-bold text-[#C4704B]">da &euro;1.800/mq</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic">
            Preventivo dettagliato e bloccato, nessuna sorpresa. Prezzo garantito fino alla consegna.
          </p>
        </>
      )
    },
    {
      question: 'Quanto tempo ci vuole per costruire una casa?',
      answer: (
        <>
          <p className="mb-4 text-gray-600">
            Una delle cose che stupisce di piu i nostri clienti e la velocita di realizzazione.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="text-center p-4 bg-[#C4704B]/10 rounded-xl flex-1 min-w-[120px]">
              <div className="text-3xl font-bold text-[#C4704B]">5-7</div>
              <div className="text-sm text-gray-600">giorni montaggio</div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 hidden sm:block" />
            <div className="text-center p-4 bg-[#1E3D30]/10 rounded-xl flex-1 min-w-[120px]">
              <div className="text-3xl font-bold text-[#1E3D30]">30</div>
              <div className="text-sm text-gray-600">giorni chiavi in mano</div>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
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
          <p className="mb-4 text-gray-600">
            Le banche finanziano le case in legno esattamente come quelle tradizionali.
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[#C4704B] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[#1E3D30]">Mutuo ipotecario</strong> — la soluzione classica</span>
            </li>
            <li className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[#C4704B] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[#1E3D30]">Finanziamenti convenzionati</strong> — accordi con istituti partner</span>
            </li>
            <li className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[#C4704B] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[#1E3D30]">Contributi regionali</strong> — incentivi per efficienza energetica</span>
            </li>
            <li className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[#C4704B] mt-0.5 flex-shrink-0" />
              <span><strong className="text-[#1E3D30]">Conto Termico</strong> — contributi statali per rinnovabili</span>
            </li>
          </ul>
          <p className="text-gray-600 text-sm">
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
          <p className="mb-4 text-gray-600">
            <strong className="text-[#1E3D30]">Assolutamente si.</strong> Con la giusta cura, una casa in legno
            puo durare secoli — come dimostrano le costruzioni storiche in Scandinavia e Giappone.
          </p>
          <p className="mb-4 text-gray-600">Le nostre case sono progettate per durare grazie a:</p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#C4704B] mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">Legno essiccato industrialmente con umidita controllata al 12%</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#C4704B] mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">Trattamenti protettivi contro funghi, insetti e umidita</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#C4704B] mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">Membrane traspiranti e barriere al vapore</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#C4704B] mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">Sistema di ventilazione che previene condense e muffe</span>
            </li>
          </ul>
          <p className="text-gray-500 text-sm">
            La manutenzione richiesta e simile a quella di una casa tradizionale.
          </p>
        </>
      )
    },
    {
      question: 'Sono sicure in caso di incendio?',
      answer: (
        <>
          <p className="mb-4 text-gray-600">
            <strong className="text-[#1E3D30]">Si, sono molto sicure.</strong> Contrariamente a quanto si pensa,
            il legno ha un comportamento prevedibile in caso di incendio — a differenza
            dell&apos;acciaio che puo collassare improvvisamente.
          </p>
          <div className="p-4 bg-red-50 rounded-xl border border-red-100 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-red-500" />
              <h4 className="font-semibold text-gray-800">Resistenza al fuoco REI 60</h4>
            </div>
            <p className="text-sm text-gray-600">
              60 minuti di resistenza strutturale certificata — tempo sufficiente
              per evacuare e per l&apos;intervento dei vigili del fuoco.
            </p>
          </div>
          <p className="text-gray-600 text-sm">
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
          <p className="mb-4 text-gray-600">La qualita e al centro di tutto quello che facciamo.</p>
          <div className="space-y-4 mb-4">
            {[
              { num: '1', title: 'Produzione in stabilimento', desc: 'Componenti realizzati con precisione millimetrica' },
              { num: '2', title: 'Materiali certificati', desc: 'Legno da foreste gestite responsabilmente' },
              { num: '3', title: 'Collaudo finale', desc: 'Test e verifiche prima della consegna' },
            ].map((step) => (
              <div key={step.num} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#C4704B] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{step.num}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1E3D30]">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 p-4 bg-[#1E3D30]/5 rounded-xl">
            <Award className="w-8 h-8 text-[#C4704B]" />
            <div>
              <p className="font-semibold text-[#1E3D30]">Garanzia 10 anni</p>
              <p className="text-sm text-gray-600">Sulla struttura portante</p>
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
          <p className="mb-4 text-gray-600">
            Le case in legno sono edifici a tutti gli effetti e richiedono
            gli stessi permessi dell&apos;edilizia tradizionale.
          </p>
          <div className="space-y-2 mb-4">
            {[
              { label: 'Permesso di Costruire', desc: 'per nuove costruzioni' },
              { label: 'SCIA', desc: 'per alcune tipologie di intervento' },
              { label: 'Denuncia al Genio Civile', desc: 'per la parte strutturale' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <FileCheck className="w-5 h-5 text-[#C4704B]" />
                <span className="text-gray-700"><strong className="text-[#1E3D30]">{item.label}</strong> — {item.desc}</span>
              </div>
            ))}
          </div>
          <div className="p-4 bg-[#1E3D30]/5 rounded-xl border-l-4 border-[#C4704B]">
            <p className="font-medium text-[#1E3D30]">Non preoccuparti della burocrazia — ci pensiamo noi!</p>
            <p className="text-sm text-gray-600 mt-1">
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
          <p className="mb-4 text-gray-600">
            Le nostre case sono progettate per il massimo comfort con consumi minimi.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <Thermometer className="w-6 h-6 text-blue-500 mb-2" />
              <h4 className="font-semibold text-gray-800 text-sm">Riscaldamento a pavimento</h4>
              <p className="text-xs text-gray-600 mt-1">Calore uniforme in ogni ambiente</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <Leaf className="w-6 h-6 text-green-500 mb-2" />
              <h4 className="font-semibold text-gray-800 text-sm">Pompa di calore</h4>
              <p className="text-xs text-gray-600 mt-1">Riscalda e raffresca</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <Wind className="w-6 h-6 text-purple-500 mb-2" />
              <h4 className="font-semibold text-gray-800 text-sm">VMC</h4>
              <p className="text-xs text-gray-600 mt-1">Recupero calore al 95%</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <Droplets className="w-6 h-6 text-orange-500 mb-2" />
              <h4 className="font-semibold text-gray-800 text-sm">Deumidificazione</h4>
              <p className="text-xs text-gray-600 mt-1">Controllo umidita ottimale</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Grazie all&apos;eccellente isolamento, i consumi sono ridotti fino all&apos;80%
            rispetto a una casa tradizionale.
          </p>
        </>
      )
    },
  ],
}

function FAQItemComponent({ faq, isOpen, onToggle }: { faq: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="w-10 h-10 bg-[#C4704B]/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <HelpCircle className="w-5 h-5 text-[#C4704B]" />
        </div>
        <h3 className="flex-1 text-lg font-semibold text-[#1E3D30]">
          {faq.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="px-6 pb-6 pt-2 ml-14">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('sistema')
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const currentFAQs = faqsByCategory[activeCategory] || []

  return (
    <main className="min-h-screen bg-[#FAF7F2]">

      {/* ===== HERO ===== */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[#1E3D30] to-[#2D5A47]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Domande <span className="text-[#C4704B]">Frequenti</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-white/70 max-w-2xl mx-auto"
          >
            Tutto quello che devi sapere sulle case prefabbricate in legno Ecolive.
          </motion.p>
        </div>
      </section>

      {/* ===== CATEGORY TABS ===== */}
      <section className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
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
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1E3D30] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C4704B]' : ''}`} />
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== FAQ LIST ===== */}
      <section className="py-12 lg:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {currentFAQs.map((faq, index) => (
                <FAQItemComponent
                  key={index}
                  faq={faq}
                  isOpen={openFAQ === index}
                  onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 px-4 bg-[#1E3D30]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Non hai trovato la risposta?
            </h2>
            <p className="text-white/70 mb-10 text-lg max-w-xl mx-auto">
              Il nostro team e a disposizione per rispondere a tutte le tue domande
              e fornirti una consulenza personalizzata.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C4704B] hover:bg-[#A85A3A] text-white font-semibold rounded-xl transition-colors"
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
          </motion.div>
        </div>
      </section>

      {/* ===== BROCHURE ===== */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-[#1E3D30] to-[#2D5A47] rounded-2xl">
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-[#1E3D30] font-semibold rounded-xl transition-colors whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Scarica PDF
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
