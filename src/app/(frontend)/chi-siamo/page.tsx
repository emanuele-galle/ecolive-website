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
  Play,
} from 'lucide-react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'
import CountUp from '@/components/ui/CountUp'
import YouTubeEmbed from '@/components/ui/YouTubeEmbed'

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
  { value: 7, label: 'Giorni di montaggio', suffix: '' },
  { value: 30, label: 'Anni di garanzia struttura', suffix: '' },
  { value: 3, label: 'Tecnologie in un sistema', suffix: '' },
]

/* ─── Page ─── */

export default function ChiSiamoPage() {
  return (
    <div className="overflow-hidden">

      {/* ── 1. HERO — Full-bleed foto cantiere ── */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/processo/gru-solleva-pannello.webp"
            alt="Gru solleva pannello prefabbricato X-Frame in cantiere EcoLive"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F] via-[#1D1D1F]/50 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 md:pb-24">
          <ScrollReveal duration={0.8}>
            <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
              Chi Siamo
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mt-4 max-w-3xl">
              La bioedilizia pi&ugrave; innovativa
              <span className="block text-[#A0845C]">parte dal Sud</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
              Dal cuore della Calabria, nel Parco delle Serre, progettiamo, produciamo e costruiamo
              edifici in bioedilizia con il sistema costruttivo X-Frame.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. STATS — inline su sfondo scuro ── */}
      <section className="py-12 lg:py-14 px-6 bg-[#1D1D1F]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1} direction="up">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#A0845C]">
                    <CountUp to={stat.value} duration={2.5} delay={0.3} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-sm text-white/50 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#FFFFFF" height={80} />

      {/* ── 3. LA NOSTRA STORIA — Testo + foto connettore X-Frame ── */}
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
                brand.
              </p>
              <p>
                Anni di ricerca hanno portato alla creazione del{' '}
                <strong className="text-[#1D1D1F]">sistema X-Frame</strong>: un ibrido
                proprietario che combina Platform Frame, X-Lam e Post and Beam.
                Non una semplice casa in legno, ma un&apos;opera
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
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/xframe-dettaglio/connettore-fondazione.webp"
                alt="Connettore brevettato X-Frame: staffa in acciaio zincato su fondazione"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/90 text-sm font-medium drop-shadow-lg">
                  Il connettore brevettato X-Frame &mdash; il cuore del sistema costruttivo
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#F5F5F7" height={80} />

      {/* ── 4. IL NOSTRO STABILIMENTO — Foto-driven ── */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Il Nostro Stabilimento
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                Qualit&agrave; artigianale, precisione industriale
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
              <p className="mt-6 text-[#86868B] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                A Spadola riceviamo semilavorati dall&apos;Austria e li trasformiamo in ogni
                elemento strutturale necessario. Temperatura, umidit&agrave; e tempi di
                asciugatura sono costantemente monitorati.
              </p>
            </div>
          </ScrollReveal>

          {/* Bento gallery — foto reali fabbrica e cantiere */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* Grande CNC — spanning 2 cols */}
            <ScrollReveal delay={0.1} direction="up" className="col-span-2">
              <div className="relative aspect-[2/1] md:aspect-[21/9] rounded-2xl overflow-hidden group cursor-default">
                <Image
                  src="/images/fabbrica/linea-cnc.webp"
                  alt="Linea CNC automatizzata per assemblaggio pannelli parete"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <p className="text-white font-semibold text-sm md:text-base drop-shadow-lg">Linea CNC automatizzata</p>
                  <p className="text-white/70 text-xs mt-0.5">Assemblaggio pannelli parete</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Sezionatrice */}
            <ScrollReveal delay={0.2} direction="up" className="col-span-1">
              <div className="relative aspect-[3/4] md:aspect-[3/4] rounded-2xl overflow-hidden group cursor-default">
                <Image
                  src="/images/fabbrica/sezionatrice.webp"
                  alt="Operaio X-Frame alla sezionatrice verticale"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <p className="text-white font-semibold text-sm drop-shadow-lg">Sezionatrice verticale</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Pressa + Montaggio + Operaio — 3 cols */}
            <ScrollReveal delay={0.15} direction="up" className="col-span-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-default">
                <Image
                  src="/images/fabbrica/pressa-idraulica.webp"
                  alt="Pressa idraulica per laminazione pannelli"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <p className="text-white font-semibold text-sm drop-shadow-lg">Pressa idraulica</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.25} direction="up" className="col-span-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-default">
                <Image
                  src="/images/processo/montaggio-colonne.webp"
                  alt="Squadra monta colonne legno nei connettori X-Frame"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <p className="text-white font-semibold text-sm drop-shadow-lg">Montaggio in cantiere</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3} direction="up" className="col-span-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-default">
                <Image
                  src="/images/processo/operaio-installazione.webp"
                  alt="Operaio installa componenti su parete in legno lamellare"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <p className="text-white font-semibold text-sm drop-shadow-lg">Artigianalit&agrave;</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Differentiators — 4 cards sotto le foto */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Zap, title: 'Sistema X-Frame', text: 'Tre tecnologie in un ibrido proprietario senza precedenti.' },
              { icon: Thermometer, title: 'Ambiente controllato', text: '95% della produzione in laboratorio a condizioni monitorate.' },
              { icon: Clock, title: '7 giorni di montaggio', text: 'Struttura portante montata in una settimana.' },
              { icon: Shield, title: '30 anni di garanzia', text: 'Classe energetica fino ad A4, standard casa passiva.' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <ScrollReveal key={item.title} delay={i * 0.08} direction="up">
                  <div className="bg-white rounded-xl p-6 border border-[#E5E5E7] h-full hover:shadow-md hover:border-[#A0845C]/20 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-[#A0845C]/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#A0845C]" />
                    </div>
                    <h3 className="text-base font-bold text-[#1D1D1F] mb-1.5">{item.title}</h3>
                    <p className="text-sm text-[#86868B] leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ── 5. IL TEAM ── */}
      <section className="py-24 lg:py-32 px-6 bg-white">
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
              <ScrollReveal key={member.name} delay={i * 0.12} direction="up">
                <div className="group text-center">
                  <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden shadow-lg ring-2 ring-[#A0845C]/20">
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                      <span className="text-2xl font-bold text-white/90 select-none">
                        {member.initials}
                      </span>
                    </div>
                  </div>
                  <div className="mt-5">
                    <h3 className="text-lg font-bold text-[#1D1D1F]">{member.name}</h3>
                    <p className="text-[#A0845C] font-medium text-sm mt-0.5">{member.role}</p>
                    <a
                      href={`tel:+39${member.phone.replace(/\./g, '')}`}
                      className="text-[#86868B] text-sm mt-2 inline-flex items-center gap-1.5 hover:text-[#A0845C] transition-colors cursor-pointer"
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

      <SectionTransition from="#FFFFFF" to="#1D1D1F" height={80} />

      {/* ── 6. LA NOSTRA VISIONE ── */}
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
              </p>
              <p>
                La Calabria possiede foreste straordinarie. La nostra visione &egrave; costruire una{' '}
                <strong className="text-white">filiera locale del legno calabrese</strong> che
                valorizzi questo patrimonio naturale e crei lavoro qualificato sul territorio.
              </p>
            </div>
            <motion.div
              className="mt-8 px-6 py-4 rounded-xl border border-[#A0845C]/30 bg-[#A0845C]/10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[#A0845C] font-semibold text-lg italic">
                &ldquo;Sartoriali, artigianali. Ogni casa &egrave; un capolavoro.&rdquo;
              </p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15} duration={0.7}>
            <div className="space-y-5">
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

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ── 7. VIDEO — Featured + secondary ── */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
                Video
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3">
                Scopri EcoLive
              </h2>
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
                <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
                <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              </div>
            </div>
          </ScrollReveal>

          {/* Featured video — grande */}
          <ScrollReveal delay={0.1}>
            <div className="mb-6">
              <YouTubeEmbed
                videoId="Q29WmCQuqa8"
                title="Ecolive Srl: La Nostra Storia nel mondo delle Case in Legno"
              />
            </div>
          </ScrollReveal>

          {/* Secondary videos — grid 2 col */}
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal delay={0.2} direction="left">
              <YouTubeEmbed
                videoId="swQRUOTvxJ8"
                title="Made in Calabria — Tgr RAI Calabria"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.3} direction="right">
              <YouTubeEmbed
                videoId="nptTzlZwGOg"
                title="Costruzione di una Casa in Legno Ecolive"
              />
            </ScrollReveal>
          </div>

          {/* Link al canale */}
          <ScrollReveal delay={0.4}>
            <div className="mt-8 text-center">
              <a
                href="https://www.youtube.com/@Ecolive-xframe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#86868B] hover:text-[#A0845C] font-medium uppercase tracking-wider transition-colors cursor-pointer group"
              >
                Tutti i video sul nostro canale YouTube
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ── 8. COMPANY INFO + CTA ── */}
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
                        <a href="tel:+390963530945" className="hover:text-[#A0845C] transition-colors cursor-pointer">
                          (0963) 530945
                        </a>
                        {' / '}
                        <a href="tel:+393662037106" className="hover:text-[#A0845C] transition-colors cursor-pointer">
                          366.2037106
                        </a>
                      </span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#A0845C] shrink-0" />
                      <a href="mailto:info@ecolive.srl" className="hover:text-[#A0845C] transition-colors cursor-pointer">
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
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/contatti"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#A0845C] text-white font-semibold rounded-full hover:bg-[#856B45] transition-all duration-300 hover:shadow-lg hover:shadow-[#A0845C]/20 cursor-pointer"
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
