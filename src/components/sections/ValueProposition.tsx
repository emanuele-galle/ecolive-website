'use client'

import CountUp from '@/components/ui/CountUp'
import SpotlightCard from '@/components/ui/SpotlightCard'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { Shield, Home, Award, Leaf } from 'lucide-react'

const stats = [
  {
    value: 25,
    suffix: '+',
    label: 'Anni di Esperienza',
    description: 'Pionieri della bioedilizia in Italia',
    icon: Shield,
  },
  {
    value: 40,
    suffix: '+',
    label: 'Progetti Realizzati',
    description: 'Residenze, glamping e spazi commerciali',
    icon: Home,
  },
  {
    value: 30,
    suffix: '',
    label: 'Anni di Garanzia',
    description: 'Sulla struttura portante certificata',
    icon: Award,
  },
  {
    value: 70,
    suffix: '%',
    label: 'Risparmio Energetico',
    description: 'Prestazioni in classe A4',
    icon: Leaf,
  },
]

export default function ValueProposition() {
  return (
    <section className="py-24 lg:py-32 bg-[#F5F5F7]">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D1D1F] tracking-tight">
              Perch&eacute; Scegliere <span className="text-[#A0845C]">Ecolive</span>
            </h2>
            <p className="text-[#86868B] text-lg max-w-2xl mx-auto mt-5 leading-relaxed font-normal">
              Dal 1999 progettiamo abitazioni sostenibili certificate che valorizzano il territorio e
              il benessere delle persone
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <ScrollReveal key={stat.label} delay={i * 0.12}>
                <SpotlightCard
                  className="bg-white border border-[#D2D2D7]/60 p-8 text-center h-full"
                  spotlightColor="rgba(160, 132, 92, 0.12)"
                >
                  <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-[#A0845C]/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#A0845C]" />
                  </div>
                  <div className="text-5xl md:text-6xl font-bold text-[#A0845C] mb-2">
                    <CountUp to={stat.value} suffix={stat.suffix} duration={2.5} />
                  </div>
                  <div className="text-lg font-semibold text-[#1D1D1F] mb-1">{stat.label}</div>
                  <div className="text-sm text-[#86868B] font-normal">{stat.description}</div>

                  {/* Subtle decorative bottom line */}
                  <div className="mt-5 mx-auto w-10 h-px bg-gradient-to-r from-transparent via-[#A0845C]/20 to-transparent" />
                </SpotlightCard>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
