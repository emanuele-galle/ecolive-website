'use client'

import Link from 'next/link'
import { ChevronRight, ArrowLeft, ArrowRight, Home, Triangle, Mountain, Shield, Droplets, Hammer } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const roofTypes = [
  { icon: Home, title: 'Tetto Piano', description: 'Leggera pendenza esterna per il deflusso delle acque. Rivestimento in pannelli metallici coibentati per massima impermeabilità e isolamento.', accent: '#A0845C' },
  { icon: Triangle, title: 'Tetto a Una Falda', description: 'Struttura inclinata a vista, ideale per design moderno e contemporaneo. Perfetto per massimizzare la luminosità interna con ampie vetrate.', accent: '#8B7355' },
  { icon: Mountain, title: 'Tetto a Due Falde', description: 'Configurazione classica con tegole, indicata per pendenze superiori al 10%. Estetica tradizionale con prestazioni X-Frame.', accent: '#6B5B4E' },
]

const roofMaterials = [
  { icon: Shield, title: 'Pannelli grecati coibentati', description: 'Obbligatori per basse pendenze e coperture non a vista. Garantiscono impermeabilità totale e isolamento termico integrato.', mandatory: true },
  { icon: Hammer, title: 'Pannelli strutturali con tegola', description: 'Disponibili con tegola antichizzata o moderna, per un aspetto estetico curato che si integra con il contesto architettonico.', mandatory: false },
  { icon: Droplets, title: 'Tegole tradizionali in argilla/laterizi', description: 'Per chi desidera il massimo della tradizione. Ancoraggio diretto sui contro-listelli già montati nel monoblocco.', mandatory: false },
  { icon: Droplets, title: 'Gronde e scossaline pluviali in alluminio', description: 'Sistema completo di raccolta acque, resistente alla corrosione e integrato esteticamente nella copertura.', mandatory: false },
]

export default function CoperturePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* HEADER */}
      <section className="bg-[#1D1D1F] pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <nav className="flex items-center gap-2 text-sm text-white/50 mb-8">
              <Link href="/sistema-x-frame" className="hover:text-white transition-colors">Sistema X-Frame</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#A0845C]">Coperture</span>
            </nav>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Coperture <span className="text-[#A0845C]">X-Frame</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-white/60 max-w-2xl">
              Tetto piano, a una falda o a due falde: soluzioni prefabbricate con camera di ventilazione e contro-listelli già montati.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* TIPOLOGIE DI TETTO */}
      <section className="py-24 lg:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">
              Tre <span className="text-[#A0845C]">Tipologie</span>
            </h2>
            <p className="text-[#86868B] text-lg max-w-2xl mb-14">Ogni progetto ha la sua copertura ideale. X-Frame offre tre configurazioni per adattarsi a qualsiasi contesto.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {roofTypes.map((roof, i) => (
              <ScrollReveal key={roof.title} delay={i * 0.12}>
                <div className="p-8 bg-[#F5F5F7] rounded-2xl border border-[#EDE6DB] h-full text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: `${roof.accent}15` }}>
                    <roof.icon className="w-7 h-7" style={{ color: roof.accent }} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1D1D1F] mb-3">{roof.title}</h3>
                  <p className="text-[#86868B] leading-relaxed text-sm">{roof.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALI DI COPERTURA */}
      <section className="py-24 lg:py-32 px-6 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-4">Materiali di <span className="text-[#A0845C]">Copertura</span></h2>
            <p className="text-[#86868B] text-lg max-w-2xl mb-14">Finiture selezionate per durabilità, estetica e compatibilità con il sistema X-Frame.</p>
          </ScrollReveal>
          <div className="space-y-4">
            {roofMaterials.map((mat, i) => (
              <ScrollReveal key={mat.title} delay={i * 0.1}>
                <div className="flex items-start gap-5 p-6 bg-white rounded-2xl border border-[#EDE6DB]">
                  <div className="w-12 h-12 rounded-xl bg-[#A0845C]/10 flex items-center justify-center flex-shrink-0">
                    <mat.icon className="w-6 h-6 text-[#A0845C]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-[#1D1D1F]">{mat.title}</h3>
                      {mat.mandatory && (
                        <span className="px-2 py-0.5 bg-[#A0845C]/10 text-[#A0845C] text-xs font-semibold rounded-full">Obbligatorio basse pendenze</span>
                      )}
                    </div>
                    <p className="text-[#86868B] leading-relaxed text-sm">{mat.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* VANTAGGIO CHIAVE */}
      <section className="py-24 lg:py-32 px-6 bg-[#1D1D1F]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="w-16 h-16 rounded-2xl bg-[#A0845C]/20 flex items-center justify-center mx-auto mb-8">
              <Shield className="w-8 h-8 text-[#A0845C]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
              Monoblocchi <span className="text-[#A0845C]">Pronti alla Posa</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
              I monoblocchi di copertura X-Frame arrivano in cantiere già equipaggiati con camera di ventilazione e contro-listelli per l&apos;ancoraggio delle tegole. La posa delle tegole può avvenire immediatamente, senza lavorazioni aggiuntive.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto mt-10">
              <div><div className="text-2xl md:text-3xl font-bold text-[#A0845C]">1</div><div className="text-xs text-white/40 mt-1">Giorno di montaggio</div></div>
              <div><div className="text-2xl md:text-3xl font-bold text-white">100%</div><div className="text-xs text-white/40 mt-1">Prefabbricato</div></div>
              <div><div className="text-2xl md:text-3xl font-bold text-[#A0845C]">0</div><div className="text-xs text-white/40 mt-1">Lavorazioni extra</div></div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* NAVIGATION */}
      <section className="py-12 px-6 bg-[#F5F5F7] border-t border-[#EDE6DB]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/sistema-x-frame/solai" className="group inline-flex items-center gap-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Solai</span>
          </Link>
          <Link href="/sistema-x-frame" className="group inline-flex items-center gap-2 text-[#A0845C] hover:text-[#8B7049] transition-colors font-medium">
            <span>Trasporto e Montaggio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}
