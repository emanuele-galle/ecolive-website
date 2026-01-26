'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Coffee, Snowflake, Sun, Volume2, Heart, Sparkles } from 'lucide-react'

const lifestyleMoments = [
  {
    icon: Coffee,
    title: 'La Colazione Perfetta',
    description: 'Il profumo del caffè si mescola al legno naturale. Ogni mattina è un piccolo lusso.',
    gradient: 'from-amber-500/20 to-orange-600/20',
    iconColor: 'text-amber-600'
  },
  {
    icon: Snowflake,
    title: 'Inverno senza Pensieri',
    description: 'Fuori nevica, dentro 22° costanti. Zero riscaldamento, zero bollette da paura.',
    gradient: 'from-blue-500/20 to-cyan-600/20',
    iconColor: 'text-blue-600'
  },
  {
    icon: Sun,
    title: 'Estate Sempre Fresca',
    description: 'Agosto torrido? Nella tua casa 24° naturali. Il legno respira e ti protegge.',
    gradient: 'from-yellow-500/20 to-amber-600/20',
    iconColor: 'text-yellow-600'
  },
  {
    icon: Volume2,
    title: 'Il Silenzio che Cura',
    description: 'Nessun rumore dalla strada. Solo il canto degli uccelli e la pace che meriti.',
    gradient: 'from-purple-500/20 to-indigo-600/20',
    iconColor: 'text-purple-600'
  },
  {
    icon: Heart,
    title: 'La Famiglia al Centro',
    description: 'Spazi pensati per stare insieme. I bambini giocano sicuri, voi vi rilassate.',
    gradient: 'from-rose-500/20 to-pink-600/20',
    iconColor: 'text-rose-600'
  },
  {
    icon: Sparkles,
    title: 'La Tua Oasi Privata',
    description: 'La veranda al tramonto. Un libro, una coperta, il tempo che scorre lento.',
    gradient: 'from-emerald-500/20 to-teal-600/20',
    iconColor: 'text-emerald-600'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
}

export default function LifestyleVision() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 lg:py-32 px-4 bg-gradient-to-br from-[#FAF7F2] to-[#F5F1E8] relative overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#C4704B]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1E3D30]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-[#C4704B]/10 border border-[#C4704B]/30 text-[#C4704B] font-semibold text-sm uppercase tracking-wider mb-4"
            whileHover={{ scale: 1.05 }}
          >
            La Vita che Meriti
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3D30] mt-4 mb-6">
            Immagina la Tua <span className="text-[#C4704B]">Vita Qui</span>
          </h2>
          <p className="text-[#6B6560] text-lg md:text-xl max-w-3xl mx-auto">
            Non è solo una casa. È dove ogni momento diventa speciale, ogni stagione è perfetta, ogni giorno è un privilegio.
          </p>
        </motion.div>

        {/* Grid di momenti lifestyle */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {lifestyleMoments.map((moment, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="relative h-full p-8 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-[#E5E0D8] hover:border-[#C4704B]/40 transition-all duration-500 overflow-hidden">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${moment.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-white to-[#FAF7F2] border-2 border-[#E5E0D8] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.6 } }}
                  >
                    <moment.icon className={`w-8 h-8 ${moment.iconColor}`} strokeWidth={1.5} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#1E3D30] mb-3 group-hover:text-[#C4704B] transition-colors duration-300">
                    {moment.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#6B6560] leading-relaxed text-sm md:text-base">
                    {moment.description}
                  </p>
                </div>

                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_40px_rgba(196,112,75,0.1)]" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-[#6B6560] text-lg mb-6">
            Questa non è immaginazione. È la vita quotidiana di chi ha scelto Ecolive.
          </p>
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C4704B]/10 border border-[#C4704B]/30"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(196, 112, 75, 0.15)' }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles className="w-5 h-5 text-[#C4704B]" />
            <span className="text-[#C4704B] font-semibold">Vivi meglio, ogni giorno</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
