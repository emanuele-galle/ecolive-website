'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle, Leaf, Clock, Palette, Wrench, Mountain, Sparkles } from 'lucide-react'

interface Feature {
  icon: typeof CheckCircle
  title: string
  description: string
  gradient: string
  span: 'small' | 'large'
}

interface FeaturesBounceProps {
  features: string[]
  color: string
}

const featureDetails: Feature[] = [
  {
    icon: Clock,
    title: 'Pronte in 30 giorni',
    description: 'Dalla conferma alla consegna chiavi in mano',
    gradient: 'from-emerald-400 to-teal-500',
    span: 'small'
  },
  {
    icon: Leaf,
    title: 'Zero fondazioni invasive',
    description: 'Rispetto totale del terreno e dell\'ambiente circostante',
    gradient: 'from-green-400 to-emerald-500',
    span: 'large'
  },
  {
    icon: Palette,
    title: 'Design personalizzabile',
    description: 'Ogni struttura e unica come il tuo progetto',
    gradient: 'from-teal-400 to-cyan-500',
    span: 'large'
  },
  {
    icon: Wrench,
    title: 'Manutenzione minima',
    description: 'Materiali duraturi per costi di gestione ridotti',
    gradient: 'from-cyan-400 to-sky-500',
    span: 'small'
  },
  {
    icon: Mountain,
    title: 'Integrazione paesaggio',
    description: 'Si fondono naturalmente con l\'ambiente',
    gradient: 'from-sky-400 to-blue-500',
    span: 'small'
  },
  {
    icon: Sparkles,
    title: 'Comfort premium',
    description: 'Lusso e natura in perfetto equilibrio',
    gradient: 'from-violet-400 to-purple-500',
    span: 'small'
  }
]

const BounceCard = ({
  className,
  children,
  delay = 0
}: {
  className?: string
  children: React.ReactNode
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-50px' }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 0.97, rotate: '-1deg' }}
      className={`group relative min-h-[280px] cursor-pointer overflow-hidden rounded-3xl bg-[#FAF7F2] p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function FeaturesBounce({ features, color }: FeaturesBounceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, margin: '-100px' })

  return (
    <section ref={containerRef} className="py-20 lg:py-28 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color }}
            >
              Caratteristiche
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mt-2">
              Tutto incluso nel pacchetto{' '}
              <span style={{ color }}>Glamping</span>
            </h2>
          </div>
        </motion.div>

        {/* Bounce Cards Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Row 1 */}
          <BounceCard className="col-span-12 md:col-span-4" delay={0}>
            <FeatureCardContent feature={featureDetails[0]} />
          </BounceCard>

          <BounceCard className="col-span-12 md:col-span-8" delay={0.1}>
            <FeatureCardContent feature={featureDetails[1]} />
          </BounceCard>

          {/* Row 2 */}
          <BounceCard className="col-span-12 md:col-span-8" delay={0.2}>
            <FeatureCardContent feature={featureDetails[2]} />
          </BounceCard>

          <BounceCard className="col-span-12 md:col-span-4" delay={0.3}>
            <FeatureCardContent feature={featureDetails[3]} />
          </BounceCard>

          {/* Row 3 */}
          <BounceCard className="col-span-12 md:col-span-6" delay={0.4}>
            <FeatureCardContent feature={featureDetails[4]} />
          </BounceCard>

          <BounceCard className="col-span-12 md:col-span-6" delay={0.5}>
            <FeatureCardContent feature={featureDetails[5]} />
          </BounceCard>
        </div>
      </div>
    </section>
  )
}

function FeatureCardContent({ feature }: { feature: Feature }) {
  const Icon = feature.icon

  return (
    <>
      {/* Icon */}
      <div className="relative z-10 mb-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg shadow-black/10`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-xl md:text-2xl font-bold text-[#1E3D30] mb-2">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-[#6B6560] leading-relaxed">
        {feature.description}
      </p>

      {/* Animated gradient panel on hover */}
      <div
        className={`absolute bottom-0 left-4 right-4 top-[60%] translate-y-8 rounded-t-2xl bg-gradient-to-br ${feature.gradient} p-4 transition-transform duration-300 group-hover:translate-y-4 group-hover:rotate-[2deg]`}
      >
        <div className="flex items-center justify-center h-full">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle className="w-10 h-10 text-white/80" />
          </motion.div>
        </div>
      </div>

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] rounded-3xl"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #1E3D30 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />
    </>
  )
}
