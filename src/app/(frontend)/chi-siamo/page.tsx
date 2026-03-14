'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  Clapperboard,
  Factory,
  Leaf,
  Mail,
  MapPin,
  Monitor,
  Phone,
  TreePine,
  User,
  Cpu,
  Camera,
  HardHat,
} from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'
import CountUp from '@/components/ui/CountUp'

/* ─── Data ─── */

const teamMembers = [
  {
    name: 'Dominik Galle',
    role: 'Amministratore',
    phone: '366.2037106',
    image: '/api/media/file/dominik-galle.jpeg',
  },
  {
    name: 'Arch. Pasquale Zaffino',
    role: 'Direttore tecnico',
    phone: '340.9013774',
    image: '/api/media/file/pasquale-zaffino.jpg',
  },
  {
    name: 'Ing. Luisa Baffa',
    role: 'Resp. commerciale',
    phone: '328.7107639',
    image: '/api/media/file/luisa-baffa-trasci.jpg',
  },
  {
    name: 'Dott.ssa Sara Santaguida',
    role: 'Area legale / Affiliazioni',
    phone: '338.7774250',
    image: null as string | null,
  },
]

const stats = [
  { value: 1999, label: 'Anno di fondazione', suffix: '' },
  { value: 10, label: 'Case all\'anno', suffix: '+' },
  { value: 1, label: 'Giorno di montaggio', suffix: '' },
  { value: 100, label: 'Controllo qualita', suffix: '%' },
]

const tools = [
  {
    icon: Cpu,
    name: 'Revit (BIM)',
    desc: 'Modellazione parametrica dell\'intera struttura. Il progetto nasce digitale, ogni componente e gia pronto per la produzione.',
  },
  {
    icon: Monitor,
    name: 'Blender & Twinmotion',
    desc: 'Rendering fotorealistici ambientati nel contesto reale. Il cliente vede la sua casa senza possibilita di sbagliare.',
  },
  {
    icon: Camera,
    name: 'Rilievo Drone',
    desc: 'Video-mappatura 3D del terreno, sorvolo del lotto, analisi del contesto. Precisione millimetrica per la progettazione.',
  },
  {
    icon: Factory,
    name: 'AutoCAD Produzione',
    desc: 'Dal modello BIM ai disegni di produzione: ogni tavola, ogni taglio, ogni giunto e definito prima di entrare in laboratorio.',
  },
]

const pillars = [
  {
    icon: Factory,
    title: 'Produzione in Laboratorio',
    text: 'Tutto viene preparato nel nostro stabilimento a ambiente controllato: temperatura, umidita e tempi di essiccazione monitorati. Materie prime dall\'Austria: legno lamellare e pannelli a 3 strati di altissima qualita. Zero imprevisti tipici del cantiere tradizionale.',
  },
  {
    icon: HardHat,
    title: 'Centro Autorizzato',
    text: 'EcoLive e centro di trasformazione autorizzato dal Ministero dei Lavori Pubblici. L\'unica azienda che gestisce l\'intero ciclo: dalla progettazione alla produzione, dalla vendita alla costruzione.',
  },
  {
    icon: Clapperboard,
    title: 'Montaggio come Evento',
    text: 'Il cantiere deve essere uno spettacolo. Divise, casco, guanti. Droni, riprese foto e video. Banner. 8-12 operatori come il cambio gomme in Formula 1. Time-lapse dell\'intera giornata.',
  },
]

/* ─── Page ─── */

export default function ChiSiamoPage() {
  return (
    <div className="overflow-hidden">

      {/* ── 1. CINEMATIC HERO ── */}
      <section className="relative bg-[#1D1D1F] py-32 md:py-40 lg:py-48">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1D1D1F] via-[#1D1D1F] to-[#141414]" />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-[#A0845C]/30" />
        <div className="absolute top-32 right-20 w-1.5 h-1.5 rounded-full bg-[#A0845C]/20" />
        <div className="absolute bottom-24 left-1/4 w-1 h-1 rounded-full bg-white/10" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal duration={0.8}>
            <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
              Chi Siamo
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mt-4">
              La bioedilizia piu innovativa
              <span className="block text-[#A0845C]">parte dal Sud</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Dal cuore della Calabria, nel Parco delle Serre, progettiamo, produciamo e
              costruiamo case prefabbricate in legno con il sistema X-Frame. Poche case,
              ma perfette.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ── 2. STATS BAR ── */}
      <section className="py-16 lg:py-20 px-6 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1} direction="up">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#1D1D1F]">
                    <CountUp to={stat.value} duration={2.5} delay={0.3} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-sm text-[#86868B] uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ── 3. LA NOSTRA STORIA ── */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left" duration={0.7}>
            <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
              La Nostra Storia
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3 leading-tight">
              Da Spadola al futuro dell&apos;abitare
            </h2>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-12 h-0.5 bg-[#A0845C]" />
              <div className="w-2 h-2 rounded-full bg-[#A0845C]/40" />
            </div>
            <div className="mt-6 space-y-4 text-[#86868B] text-lg leading-relaxed">
              <p>
                Fondata nel <strong className="text-[#1D1D1F]">1999</strong>, EcoLive
                ha sede a Spadola, nel cuore del Parco delle Serre. Anni di ricerca e
                sviluppo hanno portato alla nascita del{' '}
                <strong className="text-[#1D1D1F]">sistema X-Frame</strong>: un ibrido
                proprietario che combina Platform Frame, X-Lam e Post and Beam in un
                sistema costruttivo senza precedenti.
              </p>
              <p>
                Le materie prime arrivano dall&apos;Austria: legno lamellare e pannelli a 3 strati
                di altissima qualita. Il nostro laboratorio opera in ambiente controllato dove
                temperatura, umidita e tempi di lavorazione sono monitorati costantemente.
              </p>
              <p>
                Oggi EcoLive e l&apos;unica azienda che gestisce l&apos;intero ciclo &mdash;
                dalla progettazione alla produzione, dalla vendita alla costruzione &mdash;
                all&apos;interno di un{' '}
                <strong className="text-[#1D1D1F]">centro di trasformazione autorizzato
                dal Ministero dei Lavori Pubblici</strong>.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15} duration={0.7}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8E8ED] shadow-premium">
              <Image
                src="/api/media/file/stabilimento-ecolive.jpg"
                alt="Stabilimento EcoLive a Spadola"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" height={80} />

      {/* ── 4. FILOSOFIA (dark section with grain) ── */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
              La Nostra Filosofia
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight">
              &ldquo;Poche case, ma perfette&rdquo;
            </h2>
            <div className="mt-5 flex items-center justify-center gap-3">
              <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
              <div className="w-8 h-0.5 bg-[#A0845C]/40" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-8 space-y-5 text-white/70 text-lg leading-relaxed">
              <p>
                Preferiamo costruire poche case con una{' '}
                <strong className="text-white">precisione assoluta</strong> &mdash; su misura,
                sartoriali, artigianali, con la massima cura. Ogni casa EcoLive e un
                capolavoro di ingegneria e artigianalita.
              </p>
              <p>
                Il nostro prezzo e sensibilmente piu alto rispetto ad altri, perche la
                qualita, la precisione e l&apos;innovazione lo giustificano. Non cerchiamo
                il volume: cerchiamo l&apos;eccellenza.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <motion.div
              className="mt-10 inline-block px-8 py-4 rounded-xl border border-[#A0845C]/30 bg-[#A0845C]/10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[#A0845C] font-semibold text-lg italic">
                &ldquo;Sartoriali, artigianali. Ogni casa e un capolavoro.&rdquo;
              </p>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ── 5. STRUMENTI ALL'AVANGUARDIA ── */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Tecnologia
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                Strumenti all&apos;avanguardia
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
              <p className="mt-6 text-[#86868B] text-lg max-w-2xl mx-auto">
                Il cliente vedra la sua casa in maniera realistica, senza possibilita di sbagliare.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool, i) => {
              const Icon = tool.icon
              return (
                <ScrollReveal key={tool.name} delay={i * 0.1} direction="up">
                  <motion.div
                    className="bg-white rounded-2xl p-8 border border-[#D2D2D7] h-full"
                    whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-xl bg-[#1D1D1F] flex items-center justify-center shrink-0">
                        <Icon className="w-7 h-7 text-[#A0845C]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#1D1D1F] mb-2">{tool.name}</h3>
                        <p className="text-[#86868B] leading-relaxed">{tool.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ── 6. COME LAVORIAMO (3 Pillars) ── */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Come Lavoriamo
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                Tre pilastri del metodo EcoLive
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((p, i) => {
              const Icon = p.icon
              return (
                <ScrollReveal key={p.title} delay={i * 0.12} direction="up">
                  <motion.div
                    className="bg-[#F5F5F7] rounded-2xl p-8 border border-[#D2D2D7] h-full"
                    whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#1D1D1F]/10 flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-[#1D1D1F]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">{p.title}</h3>
                    <p className="text-[#86868B] leading-relaxed">{p.text}</p>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#F5F5F7" height={80} />

      {/* ── 7. IL TEAM ── */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Le Persone
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                Il nostro team
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {teamMembers.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.15} direction="up">
                <div className="group">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#E8E8ED] shadow-premium">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#A0845C]/10 to-[#A0845C]/5">
                        <div className="w-24 h-24 rounded-full bg-[#A0845C]/15 flex items-center justify-center">
                          <User className="w-12 h-12 text-[#A0845C]/60" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/60 via-transparent to-transparent" />
                  </div>
                  <div className="mt-5">
                    <h3 className="text-xl font-bold text-[#1D1D1F]">{member.name}</h3>
                    <p className="text-[#A0845C] font-medium text-sm mt-0.5">{member.role}</p>
                    <a
                      href={`tel:+39${member.phone.replace(/\./g, '')}`}
                      className="text-[#86868B] text-sm mt-1 block hover:text-[#A0845C] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 inline mr-1" />
                      {member.phone}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#1D1D1F" height={80} />

      {/* ── 8. VISIONE FUTURA (dark + grain) ── */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left" duration={0.7}>
            <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
              Visione Futura
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight">
              La risorsa che la natura ci ha dato
            </h2>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-12 h-0.5 bg-[#A0845C]" />
              <div className="w-2 h-2 rounded-full bg-[#A0845C]/40" />
            </div>
            <div className="mt-6 space-y-4 text-white/70 text-lg leading-relaxed">
              <p>
                La Calabria possiede foreste straordinarie. Il nostro obiettivo e costruire
                una <strong className="text-white">filiera locale del legno calabrese</strong>{' '}
                che valorizzi questo patrimonio, riducendo la dipendenza dall&apos;importazione
                e creando lavoro sul territorio.
              </p>
              <p>
                Oggi realizziamo <strong className="text-white">5-10 case l&apos;anno</strong>.
                Dal 2027 dovremo far fronte alla domanda crescente: espansione in loco, doppi
                turni di lavoro, rete di produttori affiliati su tutto il territorio nazionale.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15} duration={0.7}>
            <div className="space-y-6">
              {[
                { icon: TreePine, label: 'Filiera locale del legno calabrese' },
                { icon: Building2, label: 'Espansione produttiva e doppi turni dal 2027' },
                { icon: Leaf, label: 'Rete di produttori affiliati in tutta Italia' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <ScrollReveal key={item.label} delay={0.2 + i * 0.1} direction="left" distance={20}>
                    <motion.div
                      className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10"
                      whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.08)' }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-11 h-11 rounded-lg bg-[#A0845C]/20 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#A0845C]" />
                      </div>
                      <p className="text-white font-medium">{item.label}</p>
                    </motion.div>
                  </ScrollReveal>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#FFFFFF" height={80} />

      {/* ── 9. COMPANY INFO CARD ── */}
      <section className="py-20 lg:py-28 px-6 bg-white">
        <ScrollReveal>
          <div className="max-w-xl mx-auto bg-[#F5F5F7] rounded-2xl p-8 md:p-10 border border-[#D2D2D7] text-center">
            <h3 className="font-serif text-2xl font-bold text-[#1D1D1F]">
              EcoLive S.r.l.
            </h3>
            <div className="mt-5 space-y-2 text-[#86868B]">
              <p className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-[#A0845C]" />
                Via Conte Ruggero, 128 &mdash; 89822 Spadola (VV)
              </p>
              <p>P.IVA 03607430794</p>
              <p className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 text-[#A0845C]" />
                <a href="tel:+390963530945" className="hover:text-[#A0845C] transition-colors">
                  (0963) 530945
                </a>
              </p>
              <p className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4 text-[#A0845C]" />
                <a href="mailto:info@ecolive.srl" className="hover:text-[#A0845C] transition-colors">
                  info@ecolive.srl
                </a>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" height={80} />

      {/* ── 10. CTA ── */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Vieni a trovarci
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              Visita il nostro stabilimento a Spadola e scopri come nascono le case EcoLive.
              Parla direttamente con il nostro team.
            </p>
            <div className="mt-12">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#A0845C] text-white font-semibold rounded-full hover:bg-[#856B45] transition-all duration-300 hover:shadow-lg hover:shadow-[#A0845C]/20"
              >
                Contattaci
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
