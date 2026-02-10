'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ArrowRight,
  PhoneCall,
  Building2,
  CheckCircle2,
  Send,
} from 'lucide-react'
import ContactForm from './ContactForm'
import BlurText from '@/components/ui/BlurText'

interface ContactPageClientProps {
  onSubmit: (formData: FormData) => Promise<{ success: boolean; message: string }>
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const contactMethods = [
  {
    icon: PhoneCall,
    title: 'Chiamaci',
    detail: '+39 0963 1951395',
    sub: 'Lun-Ven 9:00-18:00',
    href: 'tel:+3909631951395',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    detail: 'Chat veloce',
    sub: 'Risposta entro 2h',
    href: 'https://wa.me/3909631951395?text=Ciao,%20vorrei%20informazioni%20sulle%20case%20in%20legno%20Ecolive',
    external: true,
  },
  {
    icon: Mail,
    title: 'Email',
    detail: 'info@ecolive.srl',
    sub: 'Risposta entro 24h',
    href: 'mailto:info@ecolive.srl',
  },
  {
    icon: Building2,
    title: 'Visita lo Showroom',
    detail: 'Spadola (VV)',
    sub: 'Su appuntamento',
    href: 'https://maps.google.com/?q=Via+Conte+Ruggiero+128+Spadola+VV',
    external: true,
  },
]

export default function ContactPageClient({ onSubmit }: ContactPageClientProps) {
  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      {/* HERO COMPATTO */}
      <section className="bg-[#1E3D30] py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <BlurText
            text="Inizia il tuo Progetto"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-6"
            delay={100}
            animateBy="words"
            direction="bottom"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Ogni grande casa inizia con una conversazione.
            <br className="hidden sm:block" />
            Siamo qui per trasformare la tua visione in realta.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <a
              href="#form"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#C4704B] hover:bg-[#B35F3A] text-white font-semibold rounded-full shadow-lg transition-colors duration-300"
            >
              <Send className="w-5 h-5" />
              Richiedi Preventivo
            </a>
            <a
              href="tel:+3909631951395"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 transition-colors duration-300"
            >
              <PhoneCall className="w-5 h-5" />
              Chiama Ora
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 text-white/60 text-sm"
          >
            <span>25+ anni di esperienza</span>
            <span className="hidden sm:inline">|</span>
            <span>40+ case realizzate</span>
            <span className="hidden sm:inline">|</span>
            <span>98% clienti soddisfatti</span>
          </motion.div>
        </div>
      </section>

      {/* METODI DI CONTATTO */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div {...fadeIn} className="text-center mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E3D30] mb-4">
              Come contattarci
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Scegli il canale di comunicazione piu comodo per te.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.external ? '_blank' : undefined}
                rel={method.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 bg-white border border-gray-200 rounded-2xl hover:border-[#1E3D30] hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-[#1E3D30]/5 group-hover:bg-[#1E3D30]/10 rounded-2xl flex items-center justify-center transition-colors duration-300">
                  <method.icon className="w-7 h-7 text-[#1E3D30]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1E3D30] mb-1">{method.title}</h3>
                <p className="text-[#C4704B] font-medium text-sm mb-2">{method.detail}</p>
                <p className="text-gray-400 text-xs">{method.sub}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="form" className="py-20 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Sinistra: info */}
            <motion.div {...fadeIn} className="lg:sticky lg:top-32">
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="p-5 bg-white rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#C4704B]/10 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#C4704B]" />
                    </div>
                    <h4 className="font-semibold text-[#1E3D30]">Orari</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Lun - Ven: 9:00 - 18:00</p>
                  <p className="text-gray-600 text-sm">Sabato: 9:00 - 13:00</p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#1E3D30]/10 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#1E3D30]" />
                    </div>
                    <h4 className="font-semibold text-[#1E3D30]">Sede</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Via Conte Ruggiero, 128</p>
                  <p className="text-gray-600 text-sm">89822 Spadola (VV)</p>
                </div>
              </div>

              <div className="p-6 bg-[#1E3D30] rounded-2xl">
                <h4 className="font-serif text-white text-xl mb-4">Perche contattarci?</h4>
                <div className="space-y-3">
                  {[
                    'Consulenza gratuita e senza impegno',
                    'Preventivo personalizzato in 48h',
                    'Team dedicato per ogni progetto',
                    'Garanzia 10 anni sulla struttura',
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#C4704B] flex-shrink-0" />
                      <span className="text-white/90 text-sm">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Destra: form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xl border border-gray-100">
                <div className="mb-8">
                  <h3 className="font-serif text-2xl text-[#1E3D30] mb-2">Richiedi Informazioni</h3>
                  <p className="text-gray-500 text-sm">Ti risponderemo entro 24 ore</p>
                </div>
                <ContactForm onSubmit={onSubmit} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAPPA */}
      <section className="relative bg-white">
        <div className="relative h-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3107.5!2d16.4175!3d38.6325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x131531e5a5a5a5a5%3A0x1234567890abcdef!2sVia%20Conte%20Ruggiero%2C%20128%2C%2089822%20Spadola%20VV!5e0!3m2!1sit!2sit!4v1704067200000!5m2!1sit!2sit"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sede Ecolive - Spadola (VV)"
            className="grayscale-[20%]"
          />

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0 w-[90%] sm:w-auto max-w-md z-20">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1E3D30] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[#1E3D30] text-lg">Ecolive S.r.l.</h4>
                  <p className="text-gray-600 text-sm mt-1">Via Conte Ruggiero, 128</p>
                  <p className="text-gray-600 text-sm">89822 Spadola (VV), Calabria</p>
                  <div className="flex gap-3 mt-4">
                    <a
                      href="https://maps.google.com/?q=Via+Conte+Ruggiero+128+Spadola+VV"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3D30] hover:bg-[#2D5A47] text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                      Indicazioni
                    </a>
                    <a
                      href="tel:+3909631951395"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#C4704B] hover:bg-[#B35F3A] text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Chiama
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
