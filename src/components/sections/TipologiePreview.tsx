'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { tipologie } from '@/data/tipologie'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

export default function TipologiePreview() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm uppercase tracking-widest font-medium text-[#A0845C] mb-3">
          Le nostre soluzioni
        </p>
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-16">
          Dalla suite glamping alla villa di pregio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tipologie.map((tip, i) => (
            <motion.div
              key={tip.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <Link
                href={tip.href}
                className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={tip.imageUrl}
                    alt={tip.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5 space-y-2">
                  <span
                    className="text-xs uppercase tracking-wider font-semibold"
                    style={{ color: tip.color }}
                  >
                    {tip.category}
                  </span>
                  <h3 className="text-xl font-bold">{tip.title}</h3>
                  <p className="text-sm text-gray-500">{tip.surfaceRange}</p>
                  <p className="text-sm font-medium text-[#A0845C]">
                    {tip.priceRange}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[#A0845C] group-hover:gap-2 transition-all">
                    Scopri <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
