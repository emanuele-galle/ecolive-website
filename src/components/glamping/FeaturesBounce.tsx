'use client'

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Clock, Leaf, Palette, Wrench, Mountain, Sparkles, type LucideIcon } from 'lucide-react'
import { AnimatedGridBackground } from '@/components/ui/GlowEffect'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  color: string
  bgImage?: string
}

interface FeaturesBounceProps {
  features: string[]
  color: string
}

const featureDetails: Feature[] = [
  {
    icon: Clock,
    title: 'Pronte in 30 giorni',
    description: 'Dalla conferma alla consegna chiavi in mano. Tempi certi e garantiti per contratto.',
    color: '#40916c',
  },
  {
    icon: Leaf,
    title: 'Zero fondazioni invasive',
    description: 'Rispetto totale del terreno e dell\'ambiente circostante grazie al sistema costruttivo X-Frame.',
    color: '#2D5A47',
    bgImage: '/images/glamping/glamping-single-forest.webp',
  },
  {
    icon: Palette,
    title: 'Design personalizzabile',
    description: 'Ogni struttura è unica come il tuo progetto. Scegli finiture, layout e materiali.',
    color: '#40916c',
    bgImage: '/images/glamping/glamping-duo-symmetric.webp',
  },
  {
    icon: Wrench,
    title: 'Manutenzione minima',
    description: 'Materiali duraturi per costi di gestione ridotti nel lungo periodo.',
    color: '#2D5A47',
  },
  {
    icon: Mountain,
    title: 'Integrazione paesaggio',
    description: 'Design pensato per fondersi naturalmente con l\'ambiente circostante.',
    color: '#40916c',
  },
  {
    icon: Sparkles,
    title: 'Comfort premium',
    description: 'Lusso e natura in perfetto equilibrio per esperienze indimenticabili.',
    color: '#2D5A47',
  }
]

function BentoFeatureCard({
  feature,
  isLarge,
  delay,
  themeColor
}: {
  feature: Feature
  isLarge: boolean
  delay: number
  themeColor: string
}) {
  const Icon = feature.icon
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), { stiffness: 200, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }
  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: isLarge ? rotateX : undefined,
        rotateY: isLarge ? rotateY : undefined,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={isLarge ? handleMouseMove : undefined}
      onMouseLeave={isLarge ? handleMouseLeave : undefined}
      whileHover={{ y: -10, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      className={`
        relative overflow-hidden rounded-3xl
        bg-gradient-to-br from-white to-[#FAF7F2]
        border border-[#E8E0D5]/60
        shadow-sm hover:shadow-2xl
        transition-shadow duration-500
        group
        ${isLarge ? 'col-span-12 md:col-span-8 min-h-[260px]' : 'col-span-12 md:col-span-4 min-h-[220px]'}
      `}
    >
      {/* Star border animation */}
      <motion.div
        className="absolute w-[300%] h-[50%] opacity-0 group-hover:opacity-50 bottom-[-11px] right-[-250%] rounded-full transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${themeColor}, transparent 10%)`
        }}
        animate={{ x: ['0%', '-100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-[300%] h-[50%] opacity-0 group-hover:opacity-50 top-[-10px] left-[-250%] rounded-full transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${themeColor}, transparent 10%)`
        }}
        animate={{ x: ['0%', '100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Background blurred image for large cards */}
      {isLarge && feature.bgImage && (
        <motion.div
          className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700 bg-cover bg-center"
          style={{
            backgroundImage: `url(${feature.bgImage})`,
            filter: 'blur(3px)',
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Background gradient on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 30% 80%, ${themeColor}15 0%, transparent 60%)`
        }}
      />

      {/* Shine sweep on hover */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 55%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'shineSweep 2s ease-in-out',
          }}
        />
      </div>

      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #1E3D30 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className={`
        relative z-10 h-full p-7 md:p-9
        flex flex-col justify-between
      `}>
        {/* Icon with gradient background + animated ring */}
        <div className="relative mb-5">
          <motion.div
            className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle, ${themeColor}15 0%, transparent 70%)`
            }}
          />
          <motion.div
            className="relative rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${themeColor}20, ${themeColor}08)`,
              width: isLarge ? 64 : 52,
              height: isLarge ? 64 : 52,
            }}
            whileHover={{ scale: 1.15, rotate: 8 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: `conic-gradient(from 0deg, transparent, ${themeColor}30, transparent)`,
              }}
            />
            <Icon
              className={`relative z-10 ${isLarge ? 'w-8 h-8' : 'w-6 h-6'}`}
              style={{ color: themeColor }}
            />
          </motion.div>
        </div>

        <div>
          {/* Title */}
          <h3 className={`
            font-bold text-[#1E3D30] mb-2
            ${isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}
          `}>
            {feature.title}
          </h3>

          {/* Description */}
          <p className={`
            text-[#6B6560] leading-relaxed
            ${isLarge ? 'text-base md:text-lg max-w-lg' : 'text-sm'}
          `}>
            {feature.description}
          </p>
        </div>

        {/* CTA for large cards with animated arrow */}
        {isLarge && (
          <motion.div
            className="flex items-center gap-2 text-sm font-medium mt-4 group/cta cursor-pointer"
            style={{ color: themeColor }}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.3 }}
          >
            <span className="group-hover/cta:underline underline-offset-4">Scopri di più</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              &rarr;
            </motion.span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function FeaturesBounce({ features, color }: FeaturesBounceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section ref={containerRef} className="py-20 lg:py-28 px-4 bg-white relative overflow-hidden">
      <AnimatedGridBackground color="#40916c" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ color: '#C4704B', backgroundColor: '#C4704B12' }}
          >
            Tutto Incluso
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E3D30] mb-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
            >
              Il pacchetto{' '}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="relative"
              style={{ color }}
            >
              Glamping
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                style={{ backgroundColor: color }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              {' '}completo
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-[#6B6560] text-lg max-w-xl mx-auto"
          >
            Ogni dettaglio pensato per offrire un&apos;esperienza unica ai tuoi ospiti
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-5">
          <BentoFeatureCard feature={featureDetails[0]} isLarge={false} delay={0} themeColor={color} />
          <BentoFeatureCard feature={featureDetails[1]} isLarge={true} delay={0.1} themeColor={color} />
          <BentoFeatureCard feature={featureDetails[2]} isLarge={true} delay={0.2} themeColor={color} />
          <BentoFeatureCard feature={featureDetails[3]} isLarge={false} delay={0.3} themeColor={color} />
          <div className="col-span-12 md:col-span-6">
            <BentoFeatureCard feature={featureDetails[4]} isLarge={false} delay={0.4} themeColor={color} />
          </div>
          <div className="col-span-12 md:col-span-6">
            <BentoFeatureCard feature={featureDetails[5]} isLarge={false} delay={0.5} themeColor={color} />
          </div>
        </div>
      </div>
    </section>
  )
}
