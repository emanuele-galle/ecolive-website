'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { ChevronDown, Euro, Clock, Layers, Shield, MapPin, GitCompare, Phone, MessageCircle, Mail } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'
import BlurText from '@/components/ui/BlurText'
import JsonLd from '@/components/JsonLd'

type FAQItem = { question: string; answer: string }

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
      answer: 'Il grezzo avanzato parte da 1.250 \u20AC/mq con la nostra parete premium residenziale. Per il chiavi in mano si aggiungono circa 430 \u20AC/mq. Il preventivo definitivo viene elaborato dopo la visita in sede, dove analizziamo insieme il progetto nei dettagli.',
    },
    {
      question: 'Come funzionano i pagamenti?',
      answer: 'Per il grezzo avanzato: 10% alla firma del contratto, 30% sessanta giorni prima dell\u2019inizio lavori, 30% al completamento del grezzo base, 30% al grezzo avanzato. Per il chiavi in mano le tranche sono: 30% al completamento impianti e massetti, 40% alla posa degli infissi, 20% alla posa pavimenti e porte interne, 10% al verbale di consegna.',
    },
    {
      question: "L\u2019importo della progettazione \u00E8 incluso?",
      answer: 'S\u00EC, il costo della progettazione \u00E8 incluso e viene scorporato dal prezzo finale della casa. Non ci sono costi nascosti o sorprese.',
    },
  ],
  tempi: [
    {
      question: 'Quanto ci vuole per avere la casa?',
      answer: 'Per una struttura di circa 100 mq: il grezzo di base viene completato in 3 giorni, il grezzo avanzato in 7 giorni, il chiavi in mano in circa 30 giorni. Questi tempi non includono la preparazione della platea di fondazione.',
    },
    {
      question: 'Davvero montate in 1 giorno?',
      answer: 'S\u00EC, per strutture fino a 150 mq ad un livello il montaggio della struttura base avviene in una singola giornata. I componenti arrivano in cantiere gi\u00E0 prefabbricati con precisione millimetrica dal nostro laboratorio.',
    },
    {
      question: 'Cosa devo preparare prima?',
      answer: 'Serve la platea di fondazione con barre filettate, predisposta secondo le nostre specifiche tecniche. Forniamo tutti i dettagli costruttivi e verifichiamo il risultato prima di procedere con il montaggio.',
    },
  ],
  materiali: [
    {
      question: 'Che legno usate?',
      answer: 'Utilizziamo lamellare Bilam e pannelli tre strati \u03BCXlam, acquistati dall\u2019Austria. Sono caratterizzati da elevata stabilit\u00E0 dimensionale e provengono da foreste certificate gestite responsabilmente.',
    },
    {
      question: 'Sughero o polistirene?',
      answer: 'Lo standard prevede sughero ad alta densit\u00E0 (3 cm), materiale naturale con eccellenti propriet\u00E0 isolanti. Nelle zone particolarmente umide si utilizza XPS ad alta densit\u00E0. Per chi cerca un\u2019opzione pi\u00F9 economica, \u00E8 disponibile il polistirene su tutta la parete.',
    },
    {
      question: 'Le pareti sono resistenti al fuoco?',
      answer: 'S\u00EC. La lana di roccia utilizzata \u00E8 totalmente incombustibile. I pannelli interni in gesso fibro-rinforzato sono classificati A1 incombustibili secondo la normativa europea. La struttura garantisce resistenza al fuoco certificata.',
    },
  ],
  garanzie: [
    {
      question: 'Quanto dura la garanzia?',
      answer: 'La struttura (grezzo avanzato) \u00E8 coperta da garanzia 50 anni. La fornitura chiavi in mano ha garanzia 10 anni. Sono tra le garanzie pi\u00F9 lunghe del settore, a testimonianza della qualit\u00E0 dei nostri materiali e processi.',
    },
    {
      question: 'Che certificazioni avete?',
      answer: 'Le nostre case raggiungono la Classe energetica A4 CliMAX. Siamo certificati Passive House Institute / PHIUS, ARCA e LEED for Homes. Queste certificazioni attestano i massimi standard di efficienza energetica e sostenibilit\u00E0 ambientale.',
    },
  ],
  terreno: [
    {
      question: 'Devo gi\u00E0 avere un terreno?',
      answer: 'S\u00EC, per procedere con il progetto \u00E8 necessario disporre di un terreno edificabile con i permessi necessari. Se hai dubbi sull\u2019edificabilit\u00E0 del tuo terreno, possiamo aiutarti a verificarlo.',
    },
    {
      question: 'Chi si occupa della platea?',
      answer: 'La platea di fondazione \u00E8 a cura del cliente, solitamente tramite un\u2019impresa edile locale. Noi forniamo le specifiche tecniche dettagliate con posizionamento delle barre filettate e verifichiamo il risultato prima del montaggio.',
    },
  ],
  confronto: [
    {
      question: 'Perch\u00E9 EcoLive costa di pi\u00F9 della muratura?',
      answer: 'La qualit\u00E0 \u00E8 superiore su ogni fronte: produzione in laboratorio con precisione millimetrica, velocit\u00E0 di montaggio, efficienza energetica A1-A4 garantita e garanzia 50 anni. Il costo complessivo dell\u2019edificio risulta fino al 20% inferiore rispetto alla muratura tradizionale, grazie alla drastica riduzione dei costi e dei tempi di cantiere.',
    },
    {
      question: 'Che differenze ci sono con Wolf e Rubner?',
      answer: 'Il nostro sistema X-Frame \u00E8 un ibrido che surclassa i singoli sistemi costruttivi. Nella fase di montaggio siamo nettamente superiori, con tempi ridotti fino al 70%. Il prezzo \u00E8 comparabile ai leader europei perch\u00E9 la qualit\u00E0 lo giustifica pienamente.',
    },
  ],
}

const faqJsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: Object.values(faqsByCategory).flat().map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

function FAQAccordionItem({ faq, isOpen, onToggle, index }: {
  faq: FAQItem; isOpen: boolean; onToggle: () => void; index: number
}) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <div className="bg-white rounded-2xl border border-[#EDE6DB] shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-4 p-6 text-left hover:bg-[var(--color-surface)] transition-colors"
        >
          <h3 className="flex-1 text-lg font-semibold text-[var(--color-secondary-dark)]">
            {faq.question}
          </h3>
          <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-[var(--color-primary)]' : 'text-[#EDE6DB]'
          }`} />
        </button>
        <div
          className="grid transition-all duration-300 ease-in-out"
          style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <p className="px-6 pb-6 text-[var(--color-muted)] leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

function CategoryTab({ cat, isActive, onClick }: {
  cat: typeof categories[number]; isActive: boolean; onClick: (id: string) => void
}) {
  const Icon = cat.icon
  const handleClick = useCallback(() => onClick(cat.id), [onClick, cat.id])
  return (
    <button
      onClick={handleClick}
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
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('costi')
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const currentFAQs = faqsByCategory[activeCategory] || []

  const handleCategoryChange = useCallback((id: string) => {
    setActiveCategory(id)
    setOpenFAQ(0)
  }, [])

  const handleToggle = useCallback((index: number) => {
    setOpenFAQ((prev) => (prev === index ? null : index))
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <JsonLd data={faqJsonLdData} />

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
              Tutto quello che devi sapere sulle case EcoLive: costi, tempi, materiali, garanzie e confronto con la muratura tradizionale.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#48484A" to="#F5F5F7" height={60} />

      {/* ===== CATEGORY TABS ===== */}
      <section className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-[#EDE6DB] shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
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
      <section className="py-16 lg:py-24 px-4">
        <div className="max-w-3xl mx-auto space-y-5">
          {currentFAQs.map((faq, index) => (
            <FAQAccordionItem
              key={`${activeCategory}-${index}`}
              faq={faq}
              isOpen={openFAQ === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#1D1D1F" height={80} />

      {/* ===== CTA ===== */}
      <section className="py-28 lg:py-36 px-4 bg-[var(--color-secondary-dark)]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Non hai trovato la risposta?
            </h2>
            <p className="text-white/70 mb-12 text-lg max-w-xl mx-auto">
              Il nostro team &egrave; a disposizione per rispondere a tutte le tue domande.
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

      <SectionTransition from="#1D1D1F" to="#FFFFFF" height={60} />
    </div>
  )
}
