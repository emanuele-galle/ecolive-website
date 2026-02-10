'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const galleryImages = [
  { src: '/images/luxury/gallery-3.jpg', label: 'Villa Moderna', detail: '180 mq' },
  { src: '/images/luxury/gallery-7.jpg', label: 'Casa Bifamiliare', detail: '220 mq' },
  { src: '/images/luxury/gallery-12.jpg', label: 'Residenza Premium', detail: '250 mq' },
  { src: '/images/luxury/gallery-18.jpg', label: 'Villa Luxury', detail: '300 mq' },
  { src: '/images/luxury/gallery-24.jpg', label: 'Casa Passiva', detail: '160 mq' },
  { src: '/images/luxury/gallery-30.jpg', label: 'Design Contemporaneo', detail: '200 mq' },
]

export default function LifestyleVision() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1E3D30]">
            Le Nostre <span className="text-[#C4704B]">Realizzazioni</span>
          </h2>
          <p className="text-[#6B6560] text-lg max-w-xl mx-auto mt-4">
            Ogni progetto e unico, pensato per il tuo stile di vita
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div>
                  <p className="text-white font-semibold text-lg">{img.label}</p>
                  <p className="text-white/70 text-sm">{img.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
