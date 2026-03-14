'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Home, Briefcase, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const paths: { icon: LucideIcon; title: string; description: string; cta: string; href: string }[] = [
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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

export default function ContactCTA() {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background with warm gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5] via-[#F5F5F7] to-[#EDE6DB]" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#A0845C]/[0.04] blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#A0845C]/[0.03] blur-[100px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#A0845C]/40" />
            <span className="text-xs font-semibold text-[#A0845C] uppercase tracking-[0.2em]">
              Inizia da qui
            </span>
            <div className="h-px w-12 bg-[#A0845C]/40" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1D1D1F] tracking-tight">
            Qual è il tuo<br />
            <span className="text-[#A0845C]">prossimo passo?</span>
          </h2>
        </motion.div>

        {/* 3 Path Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {paths.map((path, i) => {
            const Icon = path.icon
            return (
              <motion.div
                key={path.href}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                <Link href={path.href} className="group block h-full">
                  <div className="relative bg-white rounded-2xl p-8 lg:p-10 h-full flex flex-col border border-[#D2D2D7]/40 hover:border-[#A0845C]/30 transition-all duration-500 hover:shadow-[0_20px_60px_-12px_rgba(160,132,92,0.15)] hover:-translate-y-2">
                    {/* Gold accent line top */}
                    <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#A0845C] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />

                    <div className="w-14 h-14 rounded-2xl bg-[#A0845C]/8 flex items-center justify-center mb-8 group-hover:bg-[#A0845C]/15 transition-colors duration-500">
                      <Icon className="w-6 h-6 text-[#A0845C]" />
                    </div>

                    <h3 className="text-2xl font-bold text-[#1D1D1F] mb-3 tracking-tight">{path.title}</h3>
                    <p className="text-[#86868B] leading-relaxed mb-8 flex-1">{path.description}</p>

                    <span className="inline-flex items-center gap-2 text-[#A0845C] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                      {path.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom contact strip */}
        <motion.div
          className="mt-16 pt-10 border-t border-[#D2D2D7]/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <span className="text-[#86868B]">Oppure contattaci direttamente</span>
            <div className="flex items-center gap-4">
              <a
                href="tel:+390963530945"
                className="text-[#1D1D1F] font-semibold hover:text-[#A0845C] transition-colors tracking-wide"
              >
                (0963) 530945
              </a>
              <span className="w-px h-4 bg-[#D2D2D7]" />
              <a
                href="mailto:info@ecolive.srl"
                className="text-[#1D1D1F] font-semibold hover:text-[#A0845C] transition-colors"
              >
                info@ecolive.srl
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
