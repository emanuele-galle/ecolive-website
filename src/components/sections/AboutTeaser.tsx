'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function AboutTeaser() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 lg:py-32 px-4 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image - Takes more space */}
          <motion.div
            className="lg:col-span-7 relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2 }}
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/api/media/file/chi-siamo.jpg"
                alt="Team Ecolive"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/30 to-transparent" />
            </div>

            {/* Floating year card */}
            <motion.div
              className="absolute -bottom-6 -right-6 sm:right-auto sm:-left-6 bg-white p-6 rounded-2xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.4 }}
            >
              <div className="text-5xl font-inter font-bold text-[#e85d04] mb-2">1999</div>
              <div className="text-[#5c677d]">Anno di fondazione</div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="lg:col-span-5 lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-[#e85d04] bg-[#e85d04]/10 rounded-full">
              Chi Siamo
            </span>

            <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a2540] mb-6 leading-tight">
              Costruiamo il
              <span className="block text-[#e85d04]">Futuro Sostenibile</span>
            </h2>

            <p className="text-lg text-[#5c677d] mb-8 leading-relaxed">
              Da oltre 25 anni progettiamo e realizziamo case prefabbricate in legno
              che coniugano innovazione tecnologica, comfort abitativo e rispetto
              per l&apos;ambiente. Il nostro sistema X-Frame 2.0 rappresenta l&apos;evoluzione
              dell&apos;edilizia sostenibile.
            </p>

            <Link href="/chi-siamo">
              <motion.span
                className="inline-flex items-center gap-3 text-[#0a2540] font-semibold text-lg group"
                whileHover={{ x: 5 }}
              >
                Scopri la nostra storia
                <span className="w-10 h-10 rounded-full bg-[#0a2540] flex items-center justify-center group-hover:bg-[#e85d04] transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 text-white" />
                </span>
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
