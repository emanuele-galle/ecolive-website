'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, Phone, Mail, MapPin } from 'lucide-react'

export default function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form handling would go here
    window.location.href = `/contatti?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(formData.phone)}`
  }

  return (
    <section ref={ref} className="py-20 lg:py-28 px-4 bg-[#2C2825] relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Glow - espansi su ultrawide */}
      <div className="absolute top-0 right-1/4 3xl:right-10 w-96 3xl:w-[500px] h-96 3xl:h-[500px] bg-[#C4704B]/10 3xl:bg-[#C4704B]/15 rounded-full blur-3xl" />
      <div className="hidden 3xl:block absolute bottom-0 -left-20 w-[450px] h-[450px] bg-[#D4896A]/8 rounded-full blur-3xl" />
      <div className="hidden 3xl:block absolute top-1/2 -right-32 w-[400px] h-[400px] bg-[#C4704B]/8 rounded-full blur-3xl" />

      <div className="max-w-5xl 3xl:max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
          >
            <h2 className="font-inter text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Pronto a Costruire
              <span className="block text-[#D4896A]">la Tua Casa?</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Compila il form per ricevere una consulenza gratuita.
              Ti ricontatteremo entro 24 ore.
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              <a
                href="tel:+390963195139"
                className="flex items-center gap-3 text-white/80 hover:text-[#D4896A] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#C4704B]/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+39 0963 195139</span>
              </a>
              <a
                href="mailto:info@ecolive.srl"
                className="flex items-center gap-3 text-white/80 hover:text-[#D4896A] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#C4704B]/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span>info@ecolive.srl</span>
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>Via Conte Ruggiero 128, Spadola (VV)</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <div className="space-y-5">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Nome e Cognome</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#C4704B] transition-colors"
                    placeholder="Mario Rossi"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#C4704B] transition-colors"
                    placeholder="mario@esempio.it"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Telefono</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#C4704B] transition-colors"
                    placeholder="+39 333 1234567"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full mt-6 px-6 py-4 bg-[#C4704B] hover:bg-[#A85A3A] text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#C4704B]/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Richiedi Preventivo Gratuito
                <Send className="w-5 h-5" />
              </motion.button>

              <p className="text-white/40 text-xs text-center mt-4">
                Inviando accetti la nostra Privacy Policy
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
