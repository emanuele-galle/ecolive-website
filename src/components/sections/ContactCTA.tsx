'use client'

import Link from 'next/link'
import { ArrowRight, Home, Briefcase, Users } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const paths = [
  {
    icon: Home,
    title: 'Hai un terreno?',
    description: 'Configura la tua casa e scopri quanto costa realizzarla con il sistema X-Frame.',
    cta: 'Configura la tua Casa',
    href: '/configuratore',
  },
  {
    icon: Briefcase,
    title: 'Sei un professionista?',
    description: 'Architetti, ingegneri e geometri: scopri come collaborare con EcoLive.',
    cta: 'Scopri le opportunità',
    href: '/professionisti',
  },
  {
    icon: Users,
    title: 'Vuoi affiliarti?',
    description: 'Porta la rivoluzione X-Frame nel tuo territorio. Noi ti diamo il cliente.',
    cta: 'Scopri il franchising',
    href: '/franchising',
  },
]

export default function ContactCTA() {
  return (
    <section className="py-24 lg:py-32 bg-[#F5F5F7]">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-[#A0845C] uppercase tracking-[0.15em] mb-4">INIZIA DA QUI</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1F] tracking-tight">
              Qual è il tuo prossimo passo?
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paths.map((path, i) => {
            const Icon = path.icon
            return (
              <ScrollReveal key={path.href} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 h-full flex flex-col border border-[#D2D2D7]/60 hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-[#A0845C]/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#A0845C]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">{path.title}</h3>
                  <p className="text-[#86868B] leading-relaxed mb-6 flex-1">{path.description}</p>
                  <Link
                    href={path.href}
                    className="inline-flex items-center gap-2 text-[#A0845C] font-semibold hover:gap-3 transition-all duration-300 group"
                  >
                    {path.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-12">
            <p className="text-[#86868B] mb-4">Oppure contattaci direttamente</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+390963530945"
                className="text-[#1D1D1F] font-semibold hover:text-[#A0845C] transition-colors"
              >
                (0963) 530945
              </a>
              <span className="hidden sm:inline text-[#D2D2D7]">|</span>
              <a
                href="mailto:info@ecolive.srl"
                className="text-[#1D1D1F] font-semibold hover:text-[#A0845C] transition-colors"
              >
                info@ecolive.srl
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
