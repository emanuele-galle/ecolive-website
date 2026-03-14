import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, ArrowRight, Download, Shield, Leaf, Zap, Award } from 'lucide-react'

const linkRapidi = [
  { label: 'Home', href: '/' },
  { label: 'Tipologie', href: '/tipologie' },
  { label: 'Configuratore', href: '/configuratore' },
  { label: 'Chi Siamo', href: '/chi-siamo' },
  { label: 'News', href: '/news' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contatti', href: '/contatti' },
]

const servizi = [
  { label: 'Sistema X-Frame', href: '/sistema-x-frame' },
  { label: 'Area Tecnica', href: '/area-tecnica' },
  { label: 'Certificazioni', href: '/area-tecnica/certificazioni' },
  { label: 'Franchising', href: '/franchising' },
  { label: 'Glamping', href: '/glamping' },
  { label: 'SmartSuite', href: '/smartsuite' },
]

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/ecolivesrl', icon: Facebook },
  { name: 'Instagram', href: 'https://www.instagram.com/ecolive.srl', icon: Instagram },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/ecolivesrl', icon: Linkedin },
  { name: 'YouTube', href: 'https://www.youtube.com/@Ecolive-xframe', icon: Youtube },
]

const certBadges = [
  { label: 'Classe A4', sublabel: 'NZEB', icon: Zap },
  { label: 'Garanzia', sublabel: '50 Anni', icon: Shield },
  { label: 'Passive House', sublabel: 'Certified', icon: Leaf },
  { label: 'Made in Italy', sublabel: 'Calabria', icon: Award },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden">
      {/* Certification Trust Bar */}
      <div className="bg-[#1D1D1F] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-[#A0845C]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#A0845C]/25 transition-colors">
                  <badge.icon className="w-5 h-5 text-[#A0845C]" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">{badge.label}</p>
                  <p className="text-white/50 text-xs">{badge.sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#1D1D1F] relative">
        {/* Subtle grain texture */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/images/logo-ecolive.png"
                  alt="Ecolive - Case Prefabbricate in Legno"
                  width={160}
                  height={56}
                  className="h-12 w-auto object-contain brightness-0 invert"
                />
              </Link>

              <p className="text-white/60 leading-relaxed mb-6 max-w-xs">
                Case prefabbricate in legno con sistema costruttivo X-Frame. Bioedilizia certificata dal 1999 dalla Calabria.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href="/configuratore"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#A0845C] hover:bg-[#856B45] text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] group"
                >
                  Configura la tua Casa
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <a
                  href="https://storage.fodivps2.cloud/ecolive-media/documenti/Brochure-2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-white/20 hover:border-white/40 text-white/80 hover:text-white text-sm font-medium rounded-xl transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  Brochure 2025
                </a>
              </div>

              {/* Social */}
              <div className="flex gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#A0845C] flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    aria-label={social.name}
                  >
                    <social.icon className="w-[18px] h-[18px] text-white/50 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Rapidi */}
            <div className="lg:col-span-2 lg:col-start-6">
              <h3 className="text-xs font-semibold text-[#A0845C] uppercase tracking-[0.15em] mb-5">
                Navigazione
              </h3>
              <ul className="space-y-2.5">
                {linkRapidi.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Servizi */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-semibold text-[#A0845C] uppercase tracking-[0.15em] mb-5">
                Soluzioni
              </h3>
              <ul className="space-y-2.5">
                {servizi.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contatti */}
            <div className="lg:col-span-4">
              <h3 className="text-xs font-semibold text-[#A0845C] uppercase tracking-[0.15em] mb-5">
                Contatti
              </h3>

              <div className="space-y-4 mb-8">
                <a
                  href="https://maps.google.com/?q=Via+Conte+Ruggiero+128+Spadola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/50 hover:text-white transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-[#A0845C]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <MapPin className="w-4 h-4 text-[#A0845C]" />
                  </div>
                  <div className="text-sm leading-relaxed pt-1.5">
                    Via Conte Ruggiero, 128<br />89822 Spadola (VV), Calabria
                  </div>
                </a>

                <a
                  href="tel:+3909631951395"
                  className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-[#A0845C]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Phone className="w-4 h-4 text-[#A0845C]" />
                  </div>
                  <span className="text-sm pt-0.5">+39 0963 1951395</span>
                </a>

                <a
                  href="mailto:info@ecolive.srl"
                  className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-[#A0845C]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Mail className="w-4 h-4 text-[#A0845C]" />
                  </div>
                  <span className="text-sm pt-0.5">info@ecolive.srl</span>
                </a>
              </div>

              {/* Orari */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <p className="text-xs text-[#A0845C] font-medium uppercase tracking-wider mb-2">Orari Ufficio</p>
                <p className="text-sm text-white/60">Lun — Ven: 08:30 — 17:30</p>
                <p className="text-sm text-white/40">Sab — Dom: Su appuntamento</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
              <p>&copy; {currentYear} Ecolive S.r.l. &mdash; P.IVA 03607430794</p>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:text-white/60 transition-colors">
                  Privacy Policy
                </Link>
                <span className="w-px h-3 bg-white/10" />
                <Link href="/cookie" className="hover:text-white/60 transition-colors">
                  Cookie Policy
                </Link>
                <span className="w-px h-3 bg-white/10" />
                <Link href="/termini" className="hover:text-white/60 transition-colors">
                  Termini
                </Link>
              </div>
              <p>
                Realizzato da{' '}
                <a
                  href="https://www.fodisrl.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-[#A0845C] transition-colors"
                >
                  Fodi S.r.l.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
