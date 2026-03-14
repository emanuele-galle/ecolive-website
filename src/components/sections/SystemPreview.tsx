'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const stats = [
  { value: 0.159, display: '0,159', suffix: '', unit: 'W/m\u00B2K', label: 'Trasmittanza' },
  { value: 18.8, display: '18,8', suffix: '', unit: 'ore', label: 'Sfasamento' },
  { value: 29, display: '29', suffix: '', unit: 'cm', label: 'Spessore' },
]

function CountUp({ value, display, suffix }: { value: number; display: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [text, setText] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const duration = 1400
    const steps = 40
    const stepTime = duration / steps
    let current = 0
    const interval = setInterval(() => {
      current++
      const progress = current / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      const num = eased * value
      if (Number.isInteger(value)) {
        setText(Math.round(num).toString())
      } else {
        setText(num.toFixed(display.includes(',') ? display.split(',')[1].length : 1).replace('.', ','))
      }
      if (current >= steps) {
        setText(display)
        clearInterval(interval)
      }
    }, stepTime)
    return () => clearInterval(interval)
  }, [isInView, value, display])

  return <span ref={ref}>{text}{suffix}</span>
}

export default function SystemPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
  const lineInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative bg-white overflow-hidden">
      {/* Curved top transition */}
      <div className="absolute -top-px left-0 right-0 h-16 bg-[#F5F5F7]">
        <div className="absolute inset-0 bg-white rounded-t-[3rem]" />
      </div>

      <div className="relative pt-20 pb-0 lg:pt-28 lg:pb-0">
        <div className="max-w-[90rem] mx-auto">
          <div className="relative flex flex-col lg:flex-row items-stretch min-h-[700px] lg:min-h-[800px]">

            {/* Image — 60% width on desktop, dramatic tall crop */}
            <motion.div
              className="relative w-full lg:w-[62%] lg:ml-auto order-1 lg:order-2"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full overflow-hidden">
                {/* Warm color overlay */}
                <div className="absolute inset-0 bg-[#A0845C]/[0.05] z-10 mix-blend-multiply" />
                <motion.div className="absolute inset-0 -inset-y-[10%]" style={{ y: imageY }}>
                  <Image
                    src="/images/xframe-render/optimized/spaccato-copertina.webp"
                    alt="Sezione trasversale del sistema costruttivo X-Frame Ecolive"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 62vw"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Content card — overlaps image on desktop */}
            <motion.div
              className="relative z-20 order-2 lg:order-1 lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[46%] lg:max-w-[600px] px-6 lg:pl-12 xl:pl-20 lg:pr-0"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-[0_8px_60px_-12px_rgba(0,0,0,0.12)] p-8 md:p-10 lg:p-12 -mt-16 lg:mt-0">
                {/* Gold accent line */}
                <motion.div
                  className="absolute left-0 top-8 bottom-8 w-[3px] rounded-full bg-gradient-to-b from-[#A0845C] via-[#C4A770] to-[#A0845C]"
                  initial={{ scaleY: 0 }}
                  animate={lineInView ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originY: 0 }}
                />

                {/* Label with animated underline */}
                <div className="relative inline-block ml-4 lg:ml-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A0845C]">
                    Sistema Costruttivo
                  </span>
                  <motion.div
                    className="absolute -bottom-1 left-0 h-[1.5px] bg-[#A0845C]/40"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  />
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#1D1D1F] tracking-tight leading-[1.1] mt-5 ml-4 lg:ml-5">
                  L&apos;ibrido che
                  <br />
                  surclassa tutti
                </h2>

                <p className="text-[#6E6E73] text-base lg:text-lg leading-relaxed mt-5 ml-4 lg:ml-5">
                  L&apos;X-Frame combina Platform Frame, X-Lam e Post &amp; Beam
                  in un unico sistema costruttivo. Pareti, solai e coperture
                  vengono prodotti in laboratorio e arrivano in cantiere
                  gi&agrave; finiti.
                </p>

                {/* Stats bar */}
                <div className="flex items-stretch mt-8 ml-4 lg:ml-5 border-t border-[#E5E5EA] pt-6">
                  {stats.map((stat, i) => (
                    <div key={stat.label} className="flex items-stretch">
                      {i > 0 && (
                        <div className="w-px bg-[#E5E5EA] mx-5 md:mx-6 self-stretch" />
                      )}
                      <div className="flex flex-col">
                        <span className="text-2xl md:text-3xl font-bold text-[#1D1D1F] tabular-nums">
                          <CountUp value={stat.value} display={stat.display} suffix={stat.suffix} />
                        </span>
                        <span className="text-xs text-[#86868B] mt-1 uppercase tracking-wide">
                          {stat.unit} &middot; {stat.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8 ml-4 lg:ml-5">
                  <Link
                    href="/sistema-x-frame"
                    className="group inline-flex items-center gap-2 text-[#A0845C] font-semibold hover:text-[#856B45] transition-colors"
                  >
                    Approfondisci il Sistema
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom wave/curve transition */}
      <div className="relative h-16 bg-white">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d="M0 0h1440v32c-240 22-480 32-720 32S240 54 0 32V0z"
            fill="#F5F5F7"
          />
        </svg>
      </div>
    </section>
  )
}
