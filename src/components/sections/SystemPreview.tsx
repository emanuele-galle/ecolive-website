'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Ruler, Clock, Layers } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const stats = [
  { value: '0,159', label: 'W/m\u00B2K Trasmittanza', icon: Layers },
  { value: '18,8', label: 'ore Sfasamento', icon: Clock },
  { value: '29', label: 'cm Spessore', icon: Ruler },
]

export default function SystemPreview() {
  return (
    <section className="py-24 lg:py-32 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column — Text */}
          <div>
            <ScrollReveal>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A0845C]">
                Sistema Costruttivo
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] tracking-tight mt-4">
                L&apos;ibrido che surclassa tutti
              </h2>
              <p className="text-[#86868B] text-lg leading-relaxed mt-5 max-w-xl">
                L&apos;X-Frame combina i vantaggi di Platform Frame, X-Lam e Post
                and Beam in un unico sistema costruttivo. Pareti, solai e
                coperture vengono prodotti interamente in laboratorio e arrivano
                in cantiere gi&agrave; finiti.
              </p>
            </ScrollReveal>

            {/* Stats row */}
            <ScrollReveal delay={0.15}>
              <div className="grid grid-cols-3 gap-6 mt-10">
                {stats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label}>
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-[#A0845C]" />
                        <span className="text-2xl md:text-3xl font-bold text-[#1D1D1F]">
                          {stat.value}
                        </span>
                      </div>
                      <span className="text-sm text-[#86868B]">
                        {stat.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal delay={0.25}>
              <div className="mt-10">
                <Link
                  href="/sistema-x-frame"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-[#A0845C] text-white font-medium rounded-xl hover:bg-[#856B45] transition-colors"
                >
                  Approfondisci il Sistema
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column — Image */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/xframe-spaccato.webp"
                alt="Sezione trasversale del sistema costruttivo X-Frame Ecolive"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
