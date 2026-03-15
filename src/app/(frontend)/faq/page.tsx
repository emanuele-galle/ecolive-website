'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  Euro,
  Clock,
  Layers,
  Shield,
  MapPin,
  GitCompare,
  Phone,
  MessageCircle,
  Mail,
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'
import BlurText from '@/components/ui/BlurText'
import JsonLd from '@/components/JsonLd'

/* ──────────────────── Types ──────────────────── */

type FAQItem = { question: string; answer: string | string[] }

/* ──────────────────── Data ──────────────────── */

const categories = [
  { id: 'costi', label: 'Costi', icon: Euro },
  { id: 'tempi', label: 'Tempi', icon: Clock },
  { id: 'materiali', label: 'Materiali', icon: Layers },
  { id: 'garanzie', label: 'Garanzie', icon: Shield },
  { id: 'terreno', label: 'Terreno', icon: MapPin },
  { id: 'confronto', label: 'Confronto', icon: GitCompare },
]

const faqsByCategory: Record<string, FAQItem[]> = {
  costi: [
    {
      question: 'Quanto costa una casa EcoLive?',
      answer: [
        'Il grezzo avanzato (GA) parte da 1.250 \u20AC/mq con la nostra parete premium residenziale. Per il chiavi in mano (CiM) si aggiungono circa 430 \u20AC/mq.',
        '\u00ABIl prezzo \u00E8 sensibilmente superiore perch\u00E9 preferiamo fare poche costruzioni con precisione assoluta, sartoriali.\u00BB',
        'Per chi cerca un ingresso pi\u00F9 accessibile, \u00E8 disponibile la configurazione con pannelli OSB e polistirene, che permette una riduzione di circa il 20% rispetto alla versione premium.',
      ],
    },
    {
      question: 'Come funzionano i pagamenti?',
      answer: [
        'Grezzo avanzato: 10% alla firma del contratto, 30% sessanta giorni prima dell\u2019inizio lavori, 30% al completamento del grezzo base, 30% al grezzo avanzato.',
        'Chiavi in mano: 30% al completamento impianti e massetti, 40% alla posa degli infissi, 20% alla posa pavimenti e porte interne, 10% al verbale di consegna.',
        '\u00ABL\u2019importo della progettazione viene scorporato dal prezzo della casa\u00BB \u2014 nessun costo aggiuntivo a sorpresa.',
      ],
    },
    {
      question: 'Ci sono costi nascosti?',
      answer: [
        'Sono a carico del committente: la relazione geologica, il permesso di costruire e la platea di fondazione. EcoLive fornisce tutti i calcoli statici e le specifiche tecniche.',
        'Se i calcoli statici vengono depositati da un ingegnere esterno, si applica un costo pari al 3% dell\u2019importo della struttura.',
        'Non ci sono spese impreviste: il preventivo definitivo viene elaborato in sede dopo aver analizzato ogni dettaglio del progetto.',
      ],
    },
  ],
  tempi: [
    {
      question: 'Quanto ci vuole per avere la casa?',
      answer: [
        'Per una struttura di circa 100 mq: il grezzo base viene completato in 3 giorni, il grezzo avanzato in 7 giorni, il chiavi in mano in circa 30 giorni.',
        '\u00ABAl mattino non c\u2019\u00E8 nulla, la sera avete una struttura.\u00BB I tempi non includono la preparazione della platea di fondazione, che \u00E8 a cura del committente.',
      ],
    },
    {
      question: 'Quanto tempo richiede il montaggio?',
      answer: [
        'La struttura viene montata in 7 giorni lavorativi. Nei primi 2 giorni si montano pilastri e struttura portante, nei giorni 3-4 le pareti e la controventatura, nei giorni 5-6 la copertura, e il giorno 7 si completa il fissaggio definitivo e le sigillature. Sul cantiere operano 8-12 operatori specializzati con autogru.',
        'I componenti arrivano in cantiere gi\u00E0 prefabbricati con precisione millimetrica dal nostro laboratorio di Spadola.',
      ],
    },
    {
      question: 'Cosa pu\u00F2 rallentare i lavori?',
      answer: [
        'Tipicamente tre fattori esterni: la relazione geologica, il rilascio del permesso di costruire e la preparazione della platea da parte dell\u2019impresa del cliente.',
        '\u00ABI tempi tecnici non sono mai quelli previsti dal cliente\u00BB \u2014 per questo consigliamo di avviare le pratiche burocratiche il prima possibile, parallelamente alla progettazione.',
      ],
    },
  ],
  materiali: [
    {
      question: 'Che tipo di legno utilizzate?',
      answer: [
        'Utilizziamo lamellare Bilam dall\u2019Austria, un materiale con elevata stabilit\u00E0 dimensionale, gi\u00E0 essiccato e proveniente da foreste certificate. I pannelli strutturali sono tre strati \u03BCXlam.',
        '\u00ABIn futuro puntiamo a una filiera locale calabrese\u00BB \u2014 un progetto di sostenibilit\u00E0 a km zero che stiamo sviluppando.',
      ],
    },
    {
      question: 'Sughero o polistirene per l\u2019isolamento?',
      answer: [
        'Lo standard prevede sughero ad alta densit\u00E0 (3 cm) abbinato a XPS nelle zone particolarmente umide. Per chi cerca un\u2019opzione pi\u00F9 economica, il polistirene (3 cm) \u00E8 disponibile su tutta la parete.',
        '\u00ABA livello strutturale la differenza non \u00E8 elevata, tocca le performance energetiche\u00BB \u2014 il sughero garantisce un comportamento termoigrometrico superiore e una maggiore traspirabilit\u00E0.',
      ],
    },
    {
      question: 'Le pareti sono resistenti al fuoco?',
      answer: [
        'La lana di roccia utilizzata \u00E8 totalmente incombustibile. I pannelli interni in gesso fibro-rinforzato sono classificati A1 (incombustibili) secondo la normativa europea.',
        '\u00ABIl legno non brucia come si pensa \u2014 carbonizza proteggendo la struttura.\u00BB La carbonizzazione crea uno strato isolante che rallenta la propagazione del fuoco, superando in sicurezza molte soluzioni in acciaio.',
      ],
    },
  ],
  garanzie: [
    {
      question: 'Quanto dura la garanzia?',
      answer: [
        'La struttura (grezzo avanzato) \u00E8 coperta da garanzia 50 anni. La fornitura chiavi in mano ha garanzia 10 anni. Sono tra le garanzie pi\u00F9 lunghe dell\u2019intero settore.',
        '\u00ABUna casa X-Frame durer\u00E0 molto pi\u00F9 di qualsiasi casa in muratura\u00BB \u2014 la qualit\u00E0 dei materiali e la precisione della prefabbricazione lo rendono possibile.',
      ],
    },
    {
      question: 'Che certificazioni avete?',
      answer: [
        'Le nostre case raggiungono la Classe energetica A4 CliMAX, il massimo livello di efficienza. Siamo certificati Passive House Institute / PHIUS, ARCA, LEED for Homes e Woodworks.',
        'Queste certificazioni attestano i pi\u00F9 alti standard internazionali di efficienza energetica, durabilit\u00E0 strutturale e sostenibilit\u00E0 ambientale.',
      ],
    },
  ],
  terreno: [
    {
      question: 'Devo gi\u00E0 avere un terreno?',
      answer: [
        'S\u00EC, per procedere con il progetto \u00E8 necessario disporre di un terreno edificabile con i permessi necessari.',
        '\u00ABDiventa fondamentale che al primo incontro il cliente arrivi con bozza, dimensioni, rilievo, particella, posizionamento.\u00BB Pi\u00F9 informazioni avete, pi\u00F9 il preventivo sar\u00E0 preciso e rapido.',
      ],
    },
    {
      question: 'Chi si occupa della platea di fondazione?',
      answer: [
        'La platea \u00E8 a cura del cliente, solitamente tramite un\u2019impresa edile locale. Noi forniamo le specifiche tecniche dettagliate con il posizionamento delle barre filettate e verifichiamo il risultato prima del montaggio.',
        '\u00ABLa platea non richiede un cordolo preciso grazie alla base XPS\u00BB \u2014 questo semplifica il lavoro dell\u2019impresa e riduce i margini di errore.',
      ],
    },
    {
      question: 'Che caratteristiche deve avere il cantiere?',
      answer: [
        'Il sito deve essere consegnato pronto per il montaggio: accessi adeguati per bilici e autogru (almeno 30 metri di sbraccio), spazi di manovra per i mezzi, nessun ostacolo alla movimentazione degli elementi strutturali.',
        'Prima dell\u2019arrivo della struttura effettuiamo una verifica tecnica della platea: corretto posizionamento delle dime, ancoraggi e barre filettate livellate. Questo controllo preventivo evita ritardi il giorno del montaggio.',
      ],
    },
  ],
  confronto: [
    {
      question: 'Perch\u00E9 EcoLive costa di pi\u00F9 della muratura?',
      answer: [
        '\u00ABPreferiamo poche costruzioni con precisione assoluta, quasi sartoriale. Il prezzo corrisponde alla qualit\u00E0 dimostrata.\u00BB',
        'Il risparmio reale si vede nel costo complessivo: fino al 20% in meno rispetto alla muratura tradizionale, grazie alla drastica riduzione dei tempi e dei costi di cantiere. Meno operai, meno giorni, meno imprevisti.',
        'Se il prezzo fosse troppo basso, il cliente potrebbe interpretarlo come segnale di qualit\u00E0 inferiore. Il nostro sistema costruttivo, la qualit\u00E0 e le prestazioni giustificano pienamente il posizionamento.',
      ],
    },
    {
      question: 'Che differenze ci sono rispetto a Wolf Haus e Rubner Haus?',
      answer: [
        'Il sistema X-Frame \u00E8 un ibrido unico che combina Platform Frame, X-Lam e Post and Beam, superando in prestazioni i singoli sistemi costruttivi usati dai competitor.',
        'Il prezzo \u00E8 comparabile ai leader europei perch\u00E9 la qualit\u00E0 lo giustifica pienamente. La differenza chiave: tempi di montaggio ridotti fino al 70% e presenza diretta sul territorio calabrese/sud-italiano.',
        'Il cliente pu\u00F2 visitare la sede, assistere alla costruzione, vedere il sistema dal vivo \u2014 cosa impossibile con le aziende del Nord che operano raramente al Sud.',
      ],
    },
    {
      question: 'Perch\u00E9 scegliere il legno rispetto al cemento?',
      answer: [
        'La maggior parte delle abitazioni in Italia presenta problemi: impianti obsoleti, scarsa efficienza energetica, standard strutturali non aggiornati. Una casa X-Frame \u00E8 antisismica per natura, con capacit\u00E0 dissipativa eccellente.',
        'Il legno \u00E8 un materiale rinnovabile, che sequestra CO\u2082 e non ne produce durante la costruzione. La struttura non \u00E8 esposta agli agenti atmosferici ma protetta da strati isolanti e rivestimenti esterni.',
        'In Calabria le case in legno sono circa l\u20191% del costruito, contro il 10-15% del Nord Italia e il 70% del Nord Europa. Il mercato ha un potenziale enorme.',
      ],
    },
    {
      question: '\u00C8 possibile ridurre il prezzo scegliendo materiali diversi?',
      answer: [
        'S\u00EC, in casi particolari \u00E8 possibile ottenere una riduzione fino al 20% apportando alcune modifiche: cappotto in polistirene invece del sughero, pannelli OSB al posto dei lamellari a tre strati.',
        'La struttura portante rimane invariata (telai in Bilam). Si ha una riduzione solo nelle prestazioni energetiche e nella durabilit\u00E0 dei materiali di tamponamento, non nella sicurezza strutturale.',
        'All\u2019interno delle pareti \u00E8 sempre presente uno strato di 16 cm di lana di roccia, quindi l\u2019isolamento termoacustico resta elevato.',
      ],
    },
  ],
}

/* ──────────────────── JSON-LD ──────────────────── */

const faqJsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: Object.values(faqsByCategory)
    .flat()
    .map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: Array.isArray(faq.answer) ? faq.answer.join(' ') : faq.answer,
      },
    })),
}

/* ──────────────────── Animations ──────────────────── */

const accordionVariants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { height: 'auto', opacity: 1 },
}

const accordionTransition = {
  height: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  opacity: { duration: 0.3, delay: 0.1 },
}

const collapseTransition = {
  height: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
  opacity: { duration: 0.2 },
}

const springTabTransition = { type: 'spring' as const, bounce: 0.2, duration: 0.5 }

/* ──────────────────── Components ──────────────────── */

function FAQAccordionItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: FAQItem
  isOpen: boolean
  onToggle: (index: number) => void
  index: number
}) {
  const answerParagraphs = Array.isArray(faq.answer) ? faq.answer : [faq.answer]
  const handleClick = useCallback(() => onToggle(index), [onToggle, index])

  return (
    <ScrollReveal delay={index * 0.06}>
      <div
        className={`rounded-2xl border transition-all duration-500 ${
          isOpen
            ? 'bg-white border-[#A0845C]/30 shadow-lg shadow-[#A0845C]/5'
            : 'bg-white border-[#EDE6DB] shadow-sm hover:shadow-md hover:border-[#A0845C]/20'
        }`}
      >
        <button
          onClick={handleClick}
          className="w-full flex items-center gap-4 p-6 sm:p-7 text-left group"
          aria-expanded={isOpen}
        >
          {/* Gold accent bar */}
          <div
            className={`w-1 self-stretch rounded-full transition-all duration-500 flex-shrink-0 ${
              isOpen ? 'bg-[#A0845C]' : 'bg-[#EDE6DB] group-hover:bg-[#A0845C]/40'
            }`}
          />
          <h3
            className={`flex-1 text-lg font-semibold transition-colors duration-300 ${
              isOpen ? 'text-[#1D1D1F]' : 'text-[#48484A] group-hover:text-[#1D1D1F]'
            }`}
          >
            {faq.question}
          </h3>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
              isOpen
                ? 'bg-[#A0845C] rotate-180'
                : 'bg-[#F5F5F7] group-hover:bg-[#A0845C]/10'
            }`}
          >
            <ChevronDown
              className={`w-5 h-5 transition-colors duration-300 ${
                isOpen ? 'text-white' : 'text-[#86868B] group-hover:text-[#A0845C]'
              }`}
            />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={accordionVariants}
              transition={isOpen ? accordionTransition : collapseTransition}
              className="overflow-hidden"
            >
              <div className="px-6 sm:px-7 pb-7 pl-[calc(1.5rem+1.25rem)] sm:pl-[calc(1.75rem+1.25rem)]">
                <div className="w-12 h-0.5 bg-[#A0845C]/30 mb-5" />
                <div className="space-y-3">
                  {answerParagraphs.map((paragraph, i) => {
                    const isQuote =
                      paragraph.startsWith('\u00AB') || paragraph.startsWith('"')
                    return (
                      <p
                        key={i}
                        className={
                          isQuote
                            ? 'text-[#A0845C] font-medium italic text-base leading-relaxed'
                            : 'text-[#86868B] text-base leading-relaxed'
                        }
                      >
                        {paragraph}
                      </p>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  )
}

function CategoryTab({
  cat,
  isActive,
  onClick,
}: {
  cat: (typeof categories)[number]
  isActive: boolean
  onClick: (id: string) => void
}) {
  const Icon = cat.icon
  const handleClick = useCallback(() => onClick(cat.id), [onClick, cat.id])

  return (
    <button
      onClick={handleClick}
      className={`relative flex items-center gap-2.5 px-6 py-3.5 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
        isActive
          ? 'bg-[#1D1D1F] text-white shadow-lg shadow-[#1D1D1F]/20'
          : 'bg-white text-[#86868B] hover:bg-[#F5F5F7] hover:text-[#1D1D1F] border border-[#EDE6DB]'
      }`}
    >
      <Icon
        className={`w-4 h-4 transition-colors duration-300 ${
          isActive ? 'text-[#A0845C]' : ''
        }`}
      />
      {cat.label}
      {isActive && (
        <motion.div
          layoutId="activeTabIndicator"
          className="absolute inset-0 rounded-full bg-[#1D1D1F] -z-10"
          transition={springTabTransition}
        />
      )}
    </button>
  )
}

/* ──────────────────── Page ──────────────────── */

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('costi')
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const currentFAQs = faqsByCategory[activeCategory] || []
  const activeCat = categories.find((c) => c.id === activeCategory)

  const handleCategoryChange = useCallback((id: string) => {
    setActiveCategory(id)
    setOpenFAQ(0)
  }, [])

  const handleToggle = useCallback((index: number) => {
    setOpenFAQ((prev) => (prev === index ? null : index))
  }, [])

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <JsonLd data={faqJsonLdData} />

      {/* ===== HERO ===== */}
      <section className="relative py-32 lg:py-44 bg-[#1D1D1F] overflow-hidden">
        {/* Grain texture */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-[#A0845C]/5 blur-3xl" />
        <div className="absolute bottom-10 right-[15%] w-48 h-48 rounded-full bg-[#A0845C]/3 blur-2xl" />
        <div className="absolute top-16 right-20 w-2 h-2 rounded-full bg-[#A0845C]/30" />
        <div className="absolute bottom-24 left-16 w-1.5 h-1.5 rounded-full bg-white/10" />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <ScrollReveal delay={0}>
            <span className="inline-block text-[#A0845C] text-sm tracking-[0.25em] uppercase font-medium mb-6">
              Le risposte che cerchi
            </span>
          </ScrollReveal>

          <BlurText
            text="Domande Frequenti"
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 justify-center"
            delay={80}
            animateBy="words"
          />

          <ScrollReveal delay={0.3}>
            <p className="text-xl sm:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Costi, tempi, materiali, garanzie: tutto quello che devi sapere
              per scegliere con consapevolezza la tua casa in legno.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="flex items-center justify-center gap-3 mt-10">
              <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
              <div className="w-8 h-0.5 bg-[#A0845C]/40" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={60} />

      {/* ===== STICKY CATEGORY TABS ===== */}
      <section className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-[#EDE6DB]/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-2.5 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <CategoryTab
                key={cat.id}
                cat={cat}
                isActive={activeCategory === cat.id}
                onClick={handleCategoryChange}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ LIST ===== */}
      <section className="py-16 lg:py-28 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Category header */}
          <ScrollReveal>
            <div className="mb-10 flex items-center gap-4">
              {activeCat && (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-[#1D1D1F] flex items-center justify-center">
                    <activeCat.icon className="w-6 h-6 text-[#A0845C]" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D1D1F]">
                      {activeCat.label}
                    </h2>
                    <p className="text-[#86868B] text-sm mt-0.5">
                      {currentFAQs.length} domand{currentFAQs.length === 1 ? 'a' : 'e'}
                    </p>
                  </div>
                </>
              )}
            </div>
          </ScrollReveal>

          {/* Accordion items */}
          <div className="space-y-4">
            {currentFAQs.map((faq, index) => (
              <FAQAccordionItem
                key={`${activeCategory}-${index}`}
                faq={faq}
                isOpen={openFAQ === index}
                onToggle={handleToggle}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#1D1D1F" height={80} />

      {/* ===== CTA ===== */}
      <section className="relative py-28 lg:py-40 px-4 bg-[#1D1D1F] overflow-hidden">
        {/* Grain */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#A0845C]/3 blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <span className="text-[#A0845C] text-sm tracking-[0.25em] uppercase font-medium">
              Parliamone
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-5 mb-6">
              Non hai trovato la risposta?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-white/50 mb-12 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              Il nostro team &egrave; a disposizione per rispondere a qualsiasi
              domanda. Prenota una visita in sede o contattaci direttamente.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#A0845C] hover:bg-[#8B7050] text-white font-semibold rounded-full shadow-lg shadow-[#A0845C]/20 transition-all duration-300 hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                Contattaci
              </Link>
              <a
                href="tel:+390963530945"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/15 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Chiama Ora
              </a>
            </div>
          </ScrollReveal>

          {/* Contact cards */}
          <ScrollReveal delay={0.4}>
            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <a
                href="tel:+390963530945"
                className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-[#A0845C]/15 rounded-xl flex items-center justify-center group-hover:bg-[#A0845C]/25 transition-colors">
                  <Phone className="w-5 h-5 text-[#A0845C]" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">Telefono</p>
                  <p className="text-white/40 text-sm">(0963) 530945</p>
                </div>
              </a>
              <a
                href="mailto:info@ecolive.srl"
                className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-[#A0845C]/15 rounded-xl flex items-center justify-center group-hover:bg-[#A0845C]/25 transition-colors">
                  <Mail className="w-5 h-5 text-[#A0845C]" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">Email</p>
                  <p className="text-white/40 text-sm">info@ecolive.srl</p>
                </div>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#FFFFFF" height={60} />
    </div>
  )
}
