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
} from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition from '@/components/ui/SectionTransition'

/* ─── Data ─── */

const teamMembers = [
  {
    name: 'Dominik Gallè',
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

const pillars = [
  {
    icon: Factory,
    title: 'Produzione in Laboratorio',
    text: 'Tutto viene preparato nel nostro stabilimento dove controlliamo alla perfezione temperatura, umidità e tempi di essiccazione. Questo elimina tutti i problemi tipici della costruzione in cantiere.',
  },
  {
    icon: Monitor,
    title: 'Strumenti all\u2019Avanguardia',
    text: 'Revit per la modellazione BIM, Blender e Twinmotion per render fotorealistici, droni per i rilievi, AutoCAD per i disegni di produzione.',
  },
  {
    icon: Clapperboard,
    title: 'Montaggio Spettacolare',
    text: 'Il giorno del montaggio è un evento. Squadre coordinate, attrezzature professionali, documentazione completa con time-lapse e riprese drone.',
  },
]

/* ─── Page ─── */

export default function ChiSiamoPage() {
  return (
    <div className="overflow-hidden">

      {/* ── 1. HERO ── */}
      <section className="relative bg-[#1D1D1F] py-32 md:py-40 lg:py-48">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1D1D1F] via-[#1D1D1F] to-[#141414]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal duration={0.8}>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
              La bioedilizia più innovativa parte dal Sud
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              EcoLive è una realtà rivoluzionaria nel mondo delle costruzioni.
              Dal cuore della Calabria progettiamo, produciamo e costruiamo
              case prefabbricate in legno con il sistema X-Frame.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#1D1D1F" to="#F5F5F7" height={80} />

      {/* ── 2. LA NOSTRA STORIA ── */}
      <section className="py-28 lg:py-36 px-6 bg-[#F5F5F7]">
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
                proprietario che combina Platform Frame, X-Lam e Post and Beam.
              </p>
              <p>
                Oggi EcoLive è l&apos;unica azienda che gestisce l&apos;intero ciclo —
                dalla progettazione alla produzione, dalla vendita alla costruzione —
                all&apos;interno di un centro di trasformazione autorizzato dal Ministero
                dei Lavori Pubblici.
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

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ── 3. FILOSOFIA ── */}
      <section className="py-28 lg:py-36 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
              La Nostra Filosofia
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3 leading-tight">
              Poche case, ma perfette
            </h2>
            <div className="mt-5 flex items-center justify-center gap-3">
              <div className="w-8 h-0.5 bg-[#A0845C]/40" />
              <div className="w-2 h-2 rounded-full bg-[#A0845C]" />
              <div className="w-8 h-0.5 bg-[#A0845C]/40" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-8 space-y-4 text-[#86868B] text-lg leading-relaxed">
              <p>
                Preferiamo costruire poche case con una precisione assoluta — su misura,
                artigianali, con la massima cura. Il nostro prezzo è sensibilmente più alto
                rispetto ad altri, perché la qualità, la precisione e l&apos;innovazione
                lo giustificano.
              </p>
              <p>
                Ogni casa EcoLive è un capolavoro di ingegneria e artigianalità.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#FFFFFF" to="#F5F5F7" height={80} />

      {/* ── 4. COME LAVORIAMO ── */}
      <section className="py-28 lg:py-36 px-6 bg-[#F5F5F7]">
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
                  <div className="bg-white rounded-2xl p-8 border border-[#D2D2D7] h-full">
                    <div className="w-14 h-14 rounded-xl bg-[#1D1D1F]/10 flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-[#1D1D1F]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">{p.title}</h3>
                    <p className="text-[#86868B] leading-relaxed">{p.text}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ── 5. IL TEAM ── */}
      <section className="py-28 lg:py-36 px-6 bg-white">
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
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#F5F5F7] shadow-premium">
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

      <SectionTransition from="#FFFFFF" to="#F5F5F7" height={80} />

      {/* ── 6. VISIONE FUTURA ── */}
      <section className="py-28 lg:py-36 px-6 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left" duration={0.7}>
            <span className="text-[#A0845C] text-sm tracking-[0.2em] uppercase font-medium">
              Visione Futura
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] mt-3 leading-tight">
              La risorsa che la natura ci ha dato
            </h2>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-12 h-0.5 bg-[#A0845C]" />
              <div className="w-2 h-2 rounded-full bg-[#A0845C]/40" />
            </div>
            <div className="mt-6 space-y-4 text-[#86868B] text-lg leading-relaxed">
              <p>
                La Calabria possiede foreste straordinarie. Il nostro obiettivo è costruire
                una filiera locale del legno che valorizzi questo patrimonio, riducendo la
                dipendenza dall&apos;importazione e creando lavoro sul territorio.
              </p>
              <p>
                Oggi realizziamo <strong className="text-[#1D1D1F]">5-10 case l&apos;anno</strong>.
                Il piano è scalare la produzione attraverso una rete di produttori affiliati
                su tutto il territorio nazionale, portando il metodo X-Frame ovunque.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15} duration={0.7}>
            <div className="space-y-6">
              {[
                { icon: TreePine, label: 'Filiera locale del legno calabrese' },
                { icon: Building2, label: 'Scalare la produzione (5-10 case/anno oggi)' },
                { icon: Leaf, label: 'Rete di produttori affiliati in Italia' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <ScrollReveal key={item.label} delay={0.2 + i * 0.1} direction="left" distance={20}>
                    <div className="flex items-start gap-4 bg-white rounded-xl p-5 border border-[#D2D2D7]">
                      <div className="w-11 h-11 rounded-lg bg-[#A0845C]/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#A0845C]" />
                      </div>
                      <p className="text-[#1D1D1F] font-medium">{item.label}</p>
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionTransition from="#F5F5F7" to="#FFFFFF" height={80} />

      {/* ── 7. COMPANY INFO CARD ── */}
      <section className="py-20 lg:py-28 px-6 bg-white">
        <ScrollReveal>
          <div className="max-w-xl mx-auto bg-[#F5F5F7] rounded-2xl p-8 md:p-10 border border-[#D2D2D7] text-center">
            <h3 className="font-serif text-2xl font-bold text-[#1D1D1F]">
              EcoLive S.r.l.
            </h3>
            <div className="mt-5 space-y-2 text-[#86868B]">
              <p className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-[#A0845C]" />
                Via Conte Ruggero, 128 — 89822 Spadola (VV)
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

      {/* ── 8. CTA ── */}
      <section className="py-28 lg:py-36 px-6 bg-[#1D1D1F]">
        <div className="max-w-3xl mx-auto text-center">
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
