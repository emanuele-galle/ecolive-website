'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
interface TipologiaSpec {
  label: string
  value: string
}

interface TipologiaModule {
  label: string
  mq: number
  livelli: number
}

interface TipologiaTemplateProps {
  title: string
  category: string
  description: string
  extendedDescription: string
  heroImage: string
  color: string
  surfaceRange: string
  priceRange: string
  features: string[]
  specs: TipologiaSpec[]
  modules: TipologiaModule[]
}

export default function TipologiaTemplate({
  title,
  category,
  extendedDescription,
  heroImage,
  color,
  priceRange,
  features,
  specs,
  modules,
}: TipologiaTemplateProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] mb-3" style={{ color }}>{category}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">{title}</h1>
        </div>
      </section>

      {/* Description + Specs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollReveal>
              <div>
                <p className="text-lg text-[#86868B] leading-relaxed mb-8">
                  {extendedDescription}
                </p>
                <div className="space-y-3">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}20` }}>
                        <Check className="w-3 h-3" style={{ color }} />
                      </div>
                      <span className="text-[#1D1D1F]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="space-y-6">
                {/* Specs */}
                <div className="bg-[#F5F5F7] rounded-2xl p-8">
                  <h3 className="text-lg font-bold text-[#1D1D1F] mb-6">Specifiche</h3>
                  <div className="space-y-4">
                    {specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between items-center border-b border-[#D2D2D7]/50 pb-3 last:border-0">
                        <span className="text-[#86868B]">{spec.label}</span>
                        <span className="font-semibold text-[#1D1D1F]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="rounded-2xl p-8 border-2" style={{ borderColor: `${color}30` }}>
                  <p className="text-sm text-[#86868B] mb-1">A partire da</p>
                  <p className="text-2xl font-bold" style={{ color }}>{priceRange}</p>
                  <p className="text-xs text-[#86868B] mt-2">Prezzo indicativo. Il preventivo definitivo viene elaborato dopo la visita in sede.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Modules */}
      {modules.length > 0 && (
        <section className="py-20 bg-[#F5F5F7]">
          <div className="max-w-7xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] mb-10 text-center">
                Configurazioni Modulari
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {modules.map((mod, i) => (
                <ScrollReveal key={mod.label} delay={i * 0.1}>
                  <div className="bg-white rounded-xl p-6 text-center border border-[#D2D2D7]/60">
                    <p className="text-3xl font-bold text-[#1D1D1F] mb-1">{mod.mq} <span className="text-lg font-normal">m²</span></p>
                    <p className="text-sm text-[#86868B] mb-2">{mod.label}</p>
                    <p className="text-xs font-medium" style={{ color }}>
                      {mod.livelli === 1 ? '1 livello' : '2 livelli'}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] mb-4">
              Configura la tua {title}
            </h2>
            <p className="text-[#86868B] mb-8">
              Scegli dimensioni, finitura e vedi il range di prezzo in tempo reale.
            </p>
            <Link
              href="/configuratore"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#A0845C] hover:bg-[#856B45] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] group"
            >
              Configura la tua Casa
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
