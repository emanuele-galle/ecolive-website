import Link from 'next/link'
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, Leaf } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const linkRapidi = [
    { label: 'Home', href: '/' },
    { label: 'Tipologie', href: '/tipologie' },
    { label: 'Chi Siamo', href: '/chi-siamo' },
    { label: 'News', href: '/news' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contatti', href: '/contatti' },
  ]

  const servizi = [
    { label: 'Richiedi Preventivo', href: '/contatti' },
    { label: 'Sistema X-Frame', href: '/sistema-x-frame' },
    { label: 'Area Tecnica', href: '/area-tecnica' },
    { label: 'Certificazioni', href: '/area-tecnica/certificazioni' },
    { label: 'Brochure 2025', href: 'http://127.0.0.1:9000/ecolive-media/documenti/Brochure-2025.pdf', external: true },
  ]

  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/ecolivesrl', icon: Facebook },
    { name: 'Instagram', href: 'https://www.instagram.com/ecolive.srl', icon: Instagram },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/ecolivesrl', icon: Linkedin },
    { name: 'YouTube', href: 'https://www.youtube.com/channel/UCg6jKyIT6s7ABhfrn1nT_fQ', icon: Youtube },
  ]

  return (
    <footer className="relative overflow-hidden">
      {/* Background gradient - Forest green theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-secondary-dark)] via-[var(--color-secondary-darker)] to-[#0f1f1a]" />

      {/* Top decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[var(--color-primary)] to-transparent" />

      {/* Decorative glow */}
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-[var(--color-secondary)]/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Logo e Tagline */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-3 mb-6 group">
                <div className="relative w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-xl flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20 group-hover:shadow-xl group-hover:shadow-[var(--color-primary)]/30 transition-all duration-300">
                  <span className="text-white font-inter font-bold text-xl">E</span>
                </div>
                <span className="font-inter text-2xl font-bold text-white group-hover:text-[var(--color-primary)] transition-colors duration-300">
                  Ecolive
                </span>
              </Link>

              <p className="text-white/70 mb-6 leading-relaxed">
                Dal 1999 contribuiamo alla salvaguardia del pianeta attraverso un modo di vivere ecosostenibile.
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-eco-green)]/10 rounded-full border border-[var(--color-eco-green)]/20">
                <Leaf className="w-4 h-4 text-[var(--color-eco-green)]" />
                <span className="text-sm text-[var(--color-eco-green)] font-medium">100% Ecosostenibile</span>
              </div>
            </div>

            {/* Link Rapidi */}
            <div>
              <h3 className="font-inter text-lg font-semibold text-white mb-6">Link Rapidi</h3>
              <ul className="space-y-3">
                {linkRapidi.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]/50 group-hover:bg-[var(--color-primary)] transition-colors duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Servizi */}
            <div>
              <h3 className="font-inter text-lg font-semibold text-white mb-6">Servizi</h3>
              <ul className="space-y-3">
                {servizi.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]/50 group-hover:bg-[var(--color-primary)] transition-colors duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contatti */}
            <div>
              <h3 className="font-inter text-lg font-semibold text-white mb-6">Contatti</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://maps.google.com/?q=Via+Conte+Ruggiero+128+Spadola"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 text-white/60 hover:text-white transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-primary)]/10 transition-colors duration-300 flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <span className="pt-2 leading-relaxed">Via Conte Ruggiero, 128<br />89822 Spadola (VV)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+390963195139"
                    className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-primary)]/10 transition-colors duration-300 flex-shrink-0">
                      <Phone className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <span>+39 0963 1951395</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@ecolive.srl"
                    className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-primary)]/10 transition-colors duration-300 flex-shrink-0">
                      <Mail className="w-5 h-5 text-[var(--color-primary)]" />
                    </div>
                    <span>info@ecolive.srl</span>
                  </a>
                </li>
              </ul>

              {/* Social Icons Premium */}
              <div className="flex gap-3 mt-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-white/5 hover:bg-[var(--color-primary)] flex items-center justify-center transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-white/40">
                &copy; {currentYear} Ecolive S.r.l. - P.IVA 03012345678 - Tutti i diritti riservati
              </p>
              <p className="text-xs text-white/30 mt-1">
                Realizzato da{" "}
                <a href="https://www.fodisrl.it" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Fodi S.r.l.
                </a>
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-white/40 hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/cookie"
                  className="text-white/40 hover:text-white transition-colors duration-300"
                >
                  Cookie Policy
                </Link>
                <Link
                  href="/termini"
                  className="text-white/40 hover:text-white transition-colors duration-300"
                >
                  Termini di Servizio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
