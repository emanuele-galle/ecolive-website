'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import CountUp from '@/components/ui/CountUp'

const grainOverlay = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`

const transportAdvantages = [
  {
    title: 'Doppia quantita, meta camion',
    description: 'Dove altri costruttori usano 4 bilici per una casa, noi ne usiamo 2. Il trasporto orizzontale raddoppia la quantita di elementi per ogni viaggio. Meno viaggi significa meno costi e meno impatto ambientale.',
  },
  {
    title: 'Stabilita e sicurezza',
    description: 'Pareti e solai viaggiano in orizzontale, non in verticale come la concorrenza. Baricentro basso, nessun rischio di oscillazione, integrita perfetta degli elementi anche su percorsi lunghi e strade tortuose.',
  },
  {
    title: 'Ottimizzazione geniale del carico',
    description: 'Moduli di copertura alla base del carico, pareti, travi e pilastri impilati sopra. Le travi portanti viaggiano all\'interno dei moduli solaio interpiano: ogni centimetro cubo del camion viene sfruttato.',
  },
  {
    title: 'Meno costi, meno prezzo finale',
    description: 'Dimezzando i trasporti si abbattono i costi logistici. Questo risparmio si riflette direttamente sul prezzo finale della casa. Il trasporto orizzontale non e un dettaglio: e un vantaggio competitivo strutturale.',
  },
]

const timelineSteps = [
  {
    time: '07:00',
    label: 'Piastre di base e pilastri',
    description: 'Posizionamento degli ancoraggi sulla platea e innesto dei pilastri portanti. Operazione completata in circa 30 minuti. La struttura verticale prende forma.',
    phase: 'mattina',
  },
  {
    time: '08:00',
    label: 'Pareti perimetrali',
    description: 'Tutte le pareti esterne vengono sollevate dall\'autogru e posizionate una ad una. Entro mezzogiorno l\'intero perimetro e chiuso. La casa ha gia la sua forma definitiva.',
    phase: 'mattina',
  },
  {
    time: '13:00',
    label: 'Moduli di copertura',
    description: 'Dopo la pausa pranzo si posano i moduli tetto prefabbricati. La struttura viene chiusa e protetta dalle intemperie. Le tegole possono essere posate immediatamente.',
    phase: 'pomeriggio',
  },
  {
    time: 'Giorno +1',
    label: 'Fissaggio definitivo',
    description: 'Connessioni strutturali definitive, verifica degli allineamenti, collaudo dei collegamenti antisismici. La struttura e pronta per la fase di finitura.',
    phase: 'completamento',
  },
]

export default function TrasportoMontaggioContent() {
  return (
    <div className="min-h-screen">

      {/* ===== HERO ===== */}
      <section className="relative bg-[#1D1D1F] pt-32 pb-24 lg:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: grainOverlay }} />
        <div className="relative max-w-6xl mx-auto">
          <ScrollReveal>
            <nav className="flex items-center gap-2 text-sm text-white/40 mb-10">
              <Link href="/sistema-x-frame" className="hover:text-white/70 transition-colors">Sistema X-Frame</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#A0845C]">Trasporto e Montaggio</span>
            </nav>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#A0845C]" />
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">Lo spettacolo</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Trasporto e <span className="text-[#A0845C]">Montaggio</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mb-14">
              Al mattino non c&apos;e nulla. La sera avete una struttura presente.
              Il montaggio X-Frame e uno spettacolo che non ha paragoni in Italia e in Europa.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { value: 2, label: 'Camion (vs 4)', suffix: '' },
                { value: 1, label: 'Giorno montaggio', suffix: '' },
                { value: 30, label: 'Giorni chiavi in mano', suffix: '' },
                { value: 50, label: 'Anni garanzia', suffix: '' },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#A0845C]">
                    <CountUp to={stat.value} duration={2.5} delay={0.4 + i * 0.15} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-white/40 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== TRASPORTO ORIZZONTALE ===== */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#A0845C]" />
              <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">Differenza chiave</span>
              <div className="w-8 h-px bg-[#A0845C]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mb-4">
              Trasporto Orizzontale
            </h2>
            <p className="text-[#86868B] text-lg max-w-3xl mb-16">
              Il nostro sistema esclusivo di trasporto orizzontale e una delle ragioni principali per cui
              una casa X-Frame costa meno a parita di prestazioni. Dove altri costruttori usano 4 bilici, noi ne usiamo 2.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {transportAdvantages.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <motion.div
                  className="group p-8 bg-white rounded-2xl border-t-2 border-t-transparent border border-[#EDE6DB] h-full hover:border-t-[#A0845C] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  whileHover={{ scale: 1.005 }}
                >
                  <div className="w-8 h-1 bg-[#A0845C]/30 rounded-full mb-5 group-hover:w-12 group-hover:bg-[#A0845C] transition-all duration-300" />
                  <h3 className="text-xl font-bold text-[#1D1D1F] mb-3 group-hover:text-[#A0845C] transition-colors">{item.title}</h3>
                  <p className="text-[#86868B] leading-relaxed">{item.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIMELINE MONTAGGIO ===== */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#A0845C]" />
                <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">Strutture fino a 150 m&sup2;</span>
                <div className="w-8 h-px bg-[#A0845C]" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F]">
                Una Giornata, una Casa
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative pl-8 md:pl-12 border-l-2 border-[#A0845C]/30 space-y-10">
            {timelineSteps.map((step, i) => (
              <ScrollReveal key={step.time} direction="left" delay={i * 0.12} distance={20}>
                <div className="relative">
                  <div className="absolute -left-[calc(2rem+7px)] md:-left-[calc(3rem+7px)] top-1.5 w-3.5 h-3.5 rounded-full bg-[#A0845C] ring-4 ring-white shadow-md" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-2">
                    <span className="text-[#A0845C] font-bold text-xl whitespace-nowrap">{step.time}</span>
                    <h3 className="font-bold text-[#1D1D1F] text-xl">{step.label}</h3>
                  </div>
                  <p className="text-[#86868B] leading-relaxed text-lg">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-16 p-8 bg-[#F5F5F7] rounded-2xl border-l-4 border-l-[#A0845C]">
              <p className="text-[#1D1D1F] text-lg leading-relaxed italic">
                &ldquo;Al mattino non c&apos;e nulla, la sera avete una struttura presente.
                Non c&apos;e paragone con nessun&apos;altra realta in Italia e in Europa.&rdquo;
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== ORGANIZZAZIONE CANTIERE ===== */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F] overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: grainOverlay }} />
        <div className="relative max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#A0845C]/50" />
                <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">Precisione militare</span>
                <div className="w-8 h-px bg-[#A0845C]/50" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Organizzazione del Cantiere
              </h2>
              <p className="text-white/50 text-lg max-w-3xl mx-auto">
                Un coordinatore generale come direttore d&apos;orchestra. Tre squadre specializzate in parallelo.
                Ogni movimento e pianificato, ogni minuto conta.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { value: '8-12', label: 'Operatori specializzati', description: 'Squadre formate internamente, con esperienza diretta sul sistema X-Frame' },
              { value: '1', label: 'Autogru (30m+ portata)', description: 'Braccio sufficiente per raggiungere qualsiasi punto della struttura' },
              { value: '3', label: 'Squadre coordinate', description: 'Fondazioni, pareti e coperture in parallelo sotto un unico coordinatore' },
            ].map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.12}>
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center h-full hover:bg-white/8 transition-colors">
                  <div className="text-4xl md:text-5xl font-bold text-[#A0845C] mb-3">{item.value}</div>
                  <div className="text-white font-semibold mb-2">{item.label}</div>
                  <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                { title: 'Sicurezza totale', text: 'DPI completi per ogni operatore, documentazione di sicurezza in cantiere, coordinatore dedicato, ponteggi e sistemi anticaduta professionali.' },
                { title: 'Il montaggio e un evento', text: 'Droni, foto e video professionali, striscioni. Invitiamo gli spettatori. I potenziali clienti vengono a vedere, i professionisti imparano il sistema.' },
              ].map((card, i) => (
                <div key={card.title} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-white font-bold mb-2">{card.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== TEMPI DI COSTRUZIONE ===== */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-8 h-px bg-[#A0845C]" />
                <span className="text-[#A0845C] text-xs tracking-[0.2em] uppercase font-medium">Tempi certi, costi certi</span>
                <div className="w-8 h-px bg-[#A0845C]" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F]">
                Tempi di Costruzione
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-5">
            {[
              { level: 'Grezzo di base', days: '3', unit: 'giorni', description: 'Struttura portante, pareti perimetrali, copertura posata', price: null },
              { level: 'Grezzo avanzato', days: '7', unit: 'giorni', description: 'Struttura completa, serramenti, cappotto, finiture esterne. Manca solo la mano finale acrilsilossanica.', price: '1.250 \u20ac/mq' },
              { level: 'Chiavi in mano', days: '30', unit: 'giorni', description: 'Casa completa con impianti, finiture interne, certificazioni, pronta da abitare', price: '+430 \u20ac/mq' },
            ].map((item, i) => (
              <ScrollReveal key={item.level} delay={i * 0.1}>
                <div className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 md:p-8 bg-white rounded-2xl border border-[#EDE6DB] hover:border-[#A0845C]/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-5 flex-1">
                    <div className="text-center min-w-[4rem]">
                      <div className="text-3xl md:text-4xl font-bold text-[#A0845C]">{item.days}</div>
                      <div className="text-xs text-[#86868B]">{item.unit}</div>
                    </div>
                    <div className="border-l border-[#EDE6DB] pl-5">
                      <h3 className="font-bold text-[#1D1D1F] text-lg">{item.level}</h3>
                      <p className="text-[#86868B] text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  {item.price && (
                    <div className="md:text-right">
                      <span className="text-lg font-bold text-[#A0845C]">{item.price}</span>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-20 lg:py-24 px-6 bg-[#1D1D1F] overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: grainOverlay }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Configura la tua <span className="text-[#A0845C]">Casa X-Frame</span>
            </h2>
            <p className="text-white/50 text-lg mb-8">
              Scegli metratura, tipologia e livello di finitura. Preventivo personalizzato in pochi minuti.
            </p>
            <Link
              href="/configuratore"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#A0845C] text-white font-semibold rounded-full hover:bg-[#8B7049] transition-colors"
            >
              Vai al Configuratore
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== NAVIGATION ===== */}
      <section className="py-12 px-6 bg-[#F5F5F7] border-t border-[#EDE6DB]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/sistema-x-frame/coperture" className="group inline-flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Coperture</span>
          </Link>
          <Link href="/sistema-x-frame/confronto" className="group inline-flex items-center gap-2 text-[#A0845C] hover:text-[#8B7049] transition-colors font-medium">
            <span>Confronto</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}
