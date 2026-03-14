'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  Clock,
  Factory,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Shield,
  Thermometer,
  TreePine,
  Zap,
} from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'
import CountUp from '@/components/ui/CountUp'

/* ─── Data ─── */

const teamMembers = [
  {
    name: 'Dominik Gallè',
    role: 'Amministratore',
    phone: '366.2037106',
    initials: 'DG',
    color: 'from-[#A0845C] to-[#7A6544]',
  },
  {
    name: 'Arch. Pasquale Zaffino',
    role: 'Direttore tecnico',
    phone: '340.9013774',
    initials: 'PZ',
    color: 'from-[#5C7A60] to-[#3D5A42]',
  },
  {
    name: 'Ing. Luisa Baffa',
    role: 'Responsabile commerciale',
    phone: '328.7107639',
    initials: 'LB',
    color: 'from-[#5C6E8A] to-[#3D4F6A]',
  },
  {
    name: 'Dott.ssa Sara Santaguida',
    role: 'Area legale / Affiliazioni',
    phone: '338.7774250',
    initials: 'SS',
    color: 'from-[#8A6B5C] to-[#6A4D3D]',
  },
]

const stats = [
  { value: 95, label: 'Produzione in laboratorio', suffix: '%' },
  { value: 1, label: 'Giorno di montaggio', suffix: '' },
  { value: 50, label: 'Anni di garanzia struttura', suffix: '' },
  { value: 3, label: 'Tecnologie in un sistema', suffix: '' },
]

const differentiators = [
  {
    icon: Zap,
    title: 'Sistema X-Frame',
    text: 'L\u2019unico sistema costruttivo che combina tre tecnologie \u2014 Platform Frame, X-Lam e Post and Beam \u2014 in un ibrido proprietario senza precedenti nel settore.',
  },
  {
    icon: Thermometer,
    title: 'Ambiente controllato',
    text: 'Il 95%+ della produzione avviene nel nostro stabilimento a temperatura, umidit\u00e0 e tempi di asciugatura monitorati. Zero imprevisti da cantiere tradizionale.',
  },
  {
    icon: Clock,
    title: 'Montaggio in 1 giorno',
    text: 'La struttura portante viene montata in una sola giornata. Come il pit stop della Formula 1: 8-12 operatori, divise, droni, time-lapse. Il cantiere diventa spettacolo.',
  },
  {
    icon: Shield,
    title: 'Garanzia 50 anni',
    text: 'Mezzo secolo di garanzia sulla struttura portante. Classe energetica fino ad A4, standard casa passiva. Qualit\u00e0 che si posiziona al livello dei migliori marchi nazionali.',
  },
]

/* ─── Page ─── */

export default function ChiSiamoPage() {
  return (
    <div className="overflow-hidden">

      {/* ── 1. HERO ── */}
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
              La bioedilizia pi&ugrave; innovativa
              <span className="block text-[#A0845C]">parte dal Sud</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Dal cuore della Calabria, nel Parco delle Serre, progettiamo, produciamo e costruiamo
              edifici in bioedilizia con il sistema costruttivo X-Frame. Poche case, ma perfette.
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
              Due anime, un unico brand
            </h2>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-12 h-0.5 bg-[#A0845C]" />
              <div className="w-2 h-2 rounded-full bg-[#A0845C]/40" />
            </div>
            <div className="mt-6 space-y-4 text-[#86868B] text-lg leading-relaxed">
              <p>
                EcoLive nasce dall&apos;unione di due esperienze complementari:{' '}
                <strong className="text-[#1D1D1F]">EcoLive S.r.l.</strong> con sede a Spadola
                (VV), nel cuore del Parco delle Serre, ed{' '}
                <strong className="text-[#1D1D1F]">Edilius S.r.l.</strong> con sede a Cosenza.
                Due societ&agrave; che hanno fuso competenze, visione e know-how sotto un unico
                brand per dar vita a qualcosa di mai visto nel panorama della bioedilizia italiana.
              </p>
              <p>
                Anni di ricerca e sviluppo hanno portato alla creazione del{' '}
                <strong className="text-[#1D1D1F]">sistema X-Frame</strong>: un ibrido
                proprietario che combina Platform Frame, X-Lam e Post and Beam in un sistema
                costruttivo senza precedenti. Non una semplice casa in legno, ma un&apos;opera
                di ingegneria e artigianalit&agrave;.
              </p>
              <p>
                Lo stabilimento di Spadola &egrave;{' '}
                <strong className="text-[#1D1D1F]">centro di trasformazione autorizzato
                dal Ministero dei Lavori Pubblici</strong>: l&apos;unica realt&agrave; del Sud
                Italia che gestisce l&apos;intero ciclo, dalla progettazione alla costruzione.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15} duration={0.7}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8E8ED] shadow-premium">
              <Image
                src="/images/chi-siamo-hero.webp"
                alt="Stabilimento EcoLive nel Parco delle Serre, Spadola"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#1D1D1F" height={80} />

      {/* ── 4. IL NOSTRO STABILIMENTO (dark) ── */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Il Nostro Stabilimento
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3">
                Qualit&agrave; artigianale, precisione industriale
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
              <p className="mt-6 text-white/70 text-lg max-w-3xl mx-auto leading-relaxed">
                A Spadola riceviamo semilavorati dall&apos;Austria &mdash; pannelli lamellari a
                tre strati e travi in legno lamellare &mdash; e li trasformiamo in travi, pilastri
                e ogni elemento strutturale necessario. Il tutto in un ambiente dove temperatura,
                umidit&agrave; e tempi di asciugatura sono costantemente monitorati.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {differentiators.map((item, i) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={item.title} delay={i * 0.1} direction="up">
                  <motion.div
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full"
                    whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-xl bg-[#A0845C]/20 flex items-center justify-center shrink-0">
                        <Icon className="w-7 h-7 text-[#A0845C]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-white/60 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ── 5. IL TEAM ── */}
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
              <p className="mt-6 text-[#86868B] text-lg max-w-2xl mx-auto">
                Un team multidisciplinare che copre ogni aspetto: dalla visione imprenditoriale
                alla direzione tecnica, dalla relazione commerciale alla tutela legale.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {teamMembers.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.15} direction="up">
                <div className="group text-center">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden shadow-premium">
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                      <span className="text-3xl font-bold text-white/90 select-none">
                        {member.initials}
                      </span>
                    </div>
                  </div>
                  <div className="mt-5">
                    <h3 className="text-lg font-bold text-[#1D1D1F]">{member.name}</h3>
                    <p className="text-[#A0845C] font-medium text-sm mt-0.5">{member.role}</p>
                    <a
                      href={`tel:+39${member.phone.replace(/\./g, '')}`}
                      className="text-[#86868B] text-sm mt-2 inline-flex items-center gap-1.5 hover:text-[#A0845C] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
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

      {/* ── 6. LA NOSTRA VISIONE (dark) ── */}
      <section className="relative py-24 lg:py-32 px-6 bg-[#1D1D1F]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03]" />
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left" duration={0.7}>
            <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
              La Nostra Visione
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight">
              Poche case, ma perfette
            </h2>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-12 h-0.5 bg-[#A0845C]" />
              <div className="w-2 h-2 rounded-full bg-[#A0845C]/40" />
            </div>
            <div className="mt-6 space-y-4 text-white/70 text-lg leading-relaxed">
              <p>
                Non cerchiamo il volume: cerchiamo l&apos;eccellenza. Ogni casa EcoLive &egrave;
                un progetto sartoriale, costruito su misura con la massima cura artigianale.
                Il nostro posizionamento non &egrave; inferiore ai grandi marchi del Nord come
                Wolf Haus o Rubner Haus, perch&eacute; la qualit&agrave; lo giustifica.
              </p>
              <p>
                La Calabria possiede foreste straordinarie. La nostra visione a lungo termine
                &egrave; costruire una{' '}
                <strong className="text-white">filiera locale del legno calabrese</strong> che
                valorizzi questo patrimonio naturale, riduca la dipendenza dall&apos;importazione
                e crei lavoro qualificato sul territorio.
              </p>
            </div>
            <motion.div
              className="mt-8 inline-block px-8 py-4 rounded-xl border border-[#A0845C]/30 bg-[#A0845C]/10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[#A0845C] font-semibold text-lg italic">
                &ldquo;Sartoriali, artigianali. Ogni casa &egrave; un capolavoro.&rdquo;
              </p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15} duration={0.7}>
            <div className="space-y-6">
              {[
                { icon: TreePine, label: 'Filiera locale del legno calabrese', desc: 'Valorizzazione dei boschi del Parco delle Serre' },
                { icon: Factory, label: 'Espansione produttiva', desc: 'Doppi turni e rete di produttori affiliati in Italia' },
                { icon: Building2, label: 'Classe energetica A4', desc: 'Standard casa passiva per ogni edificio' },
                { icon: Leaf, label: 'Sostenibilit\u00e0 concreta', desc: 'Legno certificato, produzione a impatto ridotto' },
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
                      <div>
                        <p className="text-white font-medium">{item.label}</p>
                        <p className="text-white/50 text-sm mt-0.5">{item.desc}</p>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#FFFFFF" height={80} />

      {/* ── 7. COMPANY INFO + CTA ── */}
      <section className="py-20 lg:py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-[#F5F5F7] rounded-2xl p-8 md:p-12 border border-[#D2D2D7]">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1D1D1F]">
                    EcoLive S.r.l.
                  </h3>
                  <div className="mt-5 space-y-3 text-[#86868B]">
                    <p className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#A0845C] mt-1 shrink-0" />
                      <span>Via Conte Ruggero, 128<br />89822 Spadola (VV), Calabria</span>
                    </p>
                    <p className="text-sm">P.IVA 03607430794</p>
                    <p className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#A0845C] shrink-0" />
                      <span>
                        <a href="tel:+390963530945" className="hover:text-[#A0845C] transition-colors">
                          (0963) 530945
                        </a>
                        {' / '}
                        <a href="tel:+393662037106" className="hover:text-[#A0845C] transition-colors">
                          366.2037106
                        </a>
                      </span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#A0845C] shrink-0" />
                      <a href="mailto:info@ecolive.srl" className="hover:text-[#A0845C] transition-colors">
                        info@ecolive.srl
                      </a>
                    </p>
                  </div>
                </div>

                <div className="text-center md:text-right">
                  <h3 className="font-serif text-2xl font-bold text-[#1D1D1F]">
                    Vieni a trovarci
                  </h3>
                  <p className="mt-3 text-[#86868B] leading-relaxed">
                    Visita il nostro stabilimento a Spadola e scopri come nascono le case EcoLive.
                    Parla direttamente con il nostro team.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/contatti"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#A0845C] text-white font-semibold rounded-full hover:bg-[#856B45] transition-all duration-300 hover:shadow-lg hover:shadow-[#A0845C]/20"
                    >
                      Contattaci
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
