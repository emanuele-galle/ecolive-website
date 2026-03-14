'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { tipologie } from '@/data/tipologie'

export default function TipologiePreview() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs uppercase tracking-[0.25em] font-medium text-[#A0845C] mb-4"
        >
          Le nostre soluzioni
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-3xl md:text-5xl font-bold text-[#1D1D1F] mb-16"
        >
          Dalla suite glamping alla villa di pregio
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tipologie.map((tip, i) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link href={tip.href} className="group relative block rounded-2xl overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative aspect-[4/3] md:aspect-[3/4]"
                >
                  <Image
                    src={tip.imageUrl}
                    alt={tip.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Hover accent border */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ backgroundColor: tip.color }}
                  />

                  {/* Content overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col gap-3">
                    <span className="self-start px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white">
                      {tip.category}
                    </span>

                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                      {tip.title}
                    </h3>

                    <p className="text-sm text-white/60">
                      {tip.surfaceRange} &middot; {tip.priceRange}
                    </p>

                    {/* Animated line */}
                    <div className="relative h-px w-full mt-1">
                      <div className="absolute inset-0 bg-white/10" />
                      <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full bg-white/40 transition-all duration-700" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
