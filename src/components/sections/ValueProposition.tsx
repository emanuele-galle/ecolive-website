'use client'

import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { Award, Clock, Zap, Leaf, Users } from 'lucide-react'

// Animated counter component
function AnimatedCounter({
  value,
  suffix = '',
  duration = 2
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix
      }
    })
    return unsubscribe
  }, [springValue, suffix])

  return <span ref={ref}>0{suffix}</span>
}

const values = [
  {
    icon: Clock,
    stat: 30,
    suffix: '',
    label: 'Giorni',
    title: 'Consegna Rapida',
    description: 'Dalla firma alla consegna chiavi in mano in tempi record.',
  },
  {
    icon: Zap,
    stat: 'A4',
    label: 'Classe',
    title: 'Massima Efficienza',
    description: 'Certificazione energetica ai massimi livelli per risparmi reali.',
  },
  {
    icon: Leaf,
    stat: 100,
    suffix: '%',
    label: 'Sostenibile',
    title: 'Legno Certificato PEFC',
    description: 'Materiali eco-friendly da foreste gestite responsabilmente.',
  },
  {
    icon: Users,
    stat: 98,
    suffix: '%',
    label: 'Soddisfatti',
    title: 'Clienti Felici',
    description: 'Referenze verificabili di famiglie che hanno scelto Ecolive.',
  },
]

export default function ValueProposition() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 lg:py-32 px-4 bg-[#FAF7F2] relative overflow-hidden">
      {/* Decorative blurs - espansi su ultrawide */}
      <div className="absolute top-0 right-0 w-96 3xl:w-[600px] h-96 3xl:h-[600px] bg-[#C4704B]/5 3xl:bg-[#C4704B]/8 rounded-full blur-3xl 3xl:-right-20" />
      <div className="absolute bottom-0 left-0 w-64 3xl:w-[500px] h-64 3xl:h-[500px] bg-[#1E3D30]/5 3xl:bg-[#1E3D30]/8 rounded-full blur-3xl 3xl:-left-20" />
      <div className="hidden 3xl:block absolute top-1/2 -translate-y-1/2 -left-32 w-[400px] h-[400px] bg-[#C4704B]/5 rounded-full blur-3xl" />
      <div className="hidden 3xl:block absolute top-1/3 -right-32 w-[350px] h-[350px] bg-[#2D5A47]/5 rounded-full blur-3xl" />

      <div className="max-w-6xl 3xl:max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <span className="text-[#C4704B] font-semibold text-sm uppercase tracking-wider">
            Perche Noi
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mt-2">
            Perche Scegliere <span className="text-[#C4704B]">Ecolive</span>
          </h2>
          <p className="text-[#6B6560] text-lg max-w-2xl mx-auto mt-4">
            Oltre 25 anni di esperienza nella bioedilizia di qualita,
            con tecnologie innovative e passione artigianale.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Large Card - Experience (col-span-2, row-span-2) */}
          <motion.div
            className="col-span-2 row-span-2 relative overflow-hidden rounded-3xl group cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.9 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/casa-value.jpg"
                alt="Casa Ecolive"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E3D30]/95 via-[#1E3D30]/60 to-[#1E3D30]/30" />

            {/* Dot Pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C4704B]/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

            {/* Content */}
            <div className="relative z-10 h-full min-h-[320px] md:min-h-[400px] flex flex-col justify-end p-8">
              <div className="w-14 h-14 mb-4 rounded-2xl bg-[#C4704B] flex items-center justify-center">
                <Award className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Esperienza Ventennale
              </h3>
              <p className="text-white/70 mb-6 max-w-sm">
                Pionieri della bioedilizia in Italia dal 1999, con oltre 40 case realizzate.
              </p>

              <div className="pt-6 border-t border-white/20">
                <div className="text-5xl md:text-6xl font-bold text-[#C4704B]">
                  <AnimatedCounter value={25} suffix="+" />
                </div>
                <div className="text-white/60 text-sm mt-1">Anni di Esperienza</div>
              </div>
            </div>
          </motion.div>

          {/* Small Cards */}
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="relative overflow-hidden rounded-2xl bg-white p-6 border border-[#DDD5C9] group hover:border-[#C4704B]/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
              whileHover={{ y: -5 }}
            >
              {/* Icon */}
              <div className="w-12 h-12 mb-4 rounded-xl bg-[#C4704B]/10 flex items-center justify-center group-hover:bg-[#C4704B]/20 transition-colors">
                <value.icon className="w-6 h-6 text-[#C4704B]" />
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-[#1E3D30] mb-1">{value.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {value.description}
              </p>

              {/* Stat */}
              <div className="pt-4 border-t border-[#E8E0D5]">
                <div className="text-3xl font-bold text-[#C4704B]">
                  {typeof value.stat === 'number' ? (
                    <AnimatedCounter value={value.stat} suffix={value.suffix || ''} />
                  ) : (
                    value.stat
                  )}
                </div>
                <div className="text-gray-400 text-xs">{value.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
