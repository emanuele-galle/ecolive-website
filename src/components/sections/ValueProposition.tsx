'use client'

import CountUp from '@/components/ui/CountUp'
import SpotlightCard from '@/components/ui/SpotlightCard'
import ScrollReveal from '@/components/ui/ScrollReveal'
import SectionTransition, { transitionPresets } from '@/components/ui/SectionTransition'
import { Shield, Home, Award, Leaf } from 'lucide-react'

const stats = [
  { value: 25, suffix: '+', label: 'Anni di Esperienza', description: 'Nel settore bioedilizia', icon: Shield },
  { value: 40, suffix: '+', label: 'Case Realizzate', description: 'In tutta Italia', icon: Home },
  { value: 30, suffix: '', label: 'Anni di Garanzia', description: 'Sulla struttura portante', icon: Award },
  { value: 70, suffix: '%', label: 'Risparmio Energetico', description: 'Classe energetica A4', icon: Leaf },
]

export default function ValueProposition() {
  return (
    <>
      <SectionTransition from="#FFFCF7" to="#FAF7F2" variant="wave" height={80} />
      <section className="py-28 lg:py-36 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3D30]">
                Perche Scegliere <span className="text-[#C4704B]">Ecolive</span>
              </h2>
              <p className="text-[#6B6560] text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
                Oltre 25 anni di esperienza nella bioedilizia per case che durano nel tempo
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <ScrollReveal key={stat.label} delay={i * 0.12}>
                  <SpotlightCard
                    className="bg-white border border-[#E5E0D8]/60 p-8 text-center h-full"
                    spotlightColor="rgba(196, 112, 75, 0.12)"
                  >
                    <div className="w-12 h-12 mx-auto mb-5 rounded-xl bg-[#1E3D30]/5 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#C4704B]" />
                    </div>
                    <div className="text-5xl md:text-6xl font-bold text-[#C4704B] mb-2">
                      <CountUp to={stat.value} suffix={stat.suffix} duration={2.5} />
                    </div>
                    <div className="text-lg font-semibold text-[#1E3D30] mb-1">{stat.label}</div>
                    <div className="text-sm text-[#6B6560]">{stat.description}</div>

                    {/* Subtle decorative bottom line */}
                    <div className="mt-5 mx-auto w-10 h-px bg-gradient-to-r from-transparent via-[#C4704B]/30 to-transparent" />
                  </SpotlightCard>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
