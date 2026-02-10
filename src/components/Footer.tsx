import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube, ArrowUpRight, Download } from 'lucide-react'

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
  { label: 'Richiedi Preventivo', href: '/contatti' },
]

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/ecolivesrl', icon: Facebook, hoverColor: 'hover:bg-[#1877F2]' },
  { name: 'Instagram', href: 'https://www.instagram.com/ecolive.srl', icon: Instagram, hoverColor: 'hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888]' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/ecolivesrl', icon: Linkedin, hoverColor: 'hover:bg-[#0A66C2]' },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCg6jKyIT6s7ABhfrn1nT_fQ', icon: Youtube, hoverColor: 'hover:bg-[#FF0000]' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-secondary-darker)] text-white/60">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column - wider */}
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

            <p className="font-serif text-lg text-white/80 leading-relaxed mb-6 italic">
              &ldquo;Dal 1999 contribuiamo alla salvaguardia del pianeta attraverso un modo di vivere ecosostenibile.&rdquo;
            </p>

            <div className="flex items-center gap-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-[var(--color-eco-green)] animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[var(--color-eco-green)] font-medium">
                100% Ecosostenibile
              </span>
            </div>

            {/* Brochure Download */}
            <a
              href="https://storage.fodivps2.cloud/ecolive-media/documenti/Brochure-2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg border border-[var(--color-primary)]/40 text-[var(--color-primary-light)] hover:bg-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/60 transition-all duration-300 text-sm font-medium group"
            >
              <Download className="w-4 h-4" />
              Scarica Brochure 2025
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </a>
          </div>

          {/* Link Rapidi */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="font-serif text-base text-white mb-6 tracking-wide">
              Link Rapidi
            </h3>
            <ul className="space-y-3">
              {linkRapidi.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servizi */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-base text-white mb-6 tracking-wide">
              Servizi
            </h3>
            <ul className="space-y-3">
              {servizi.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatti + Social */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-base text-white mb-6 tracking-wide">
              Contatti
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="https://maps.google.com/?q=Via+Conte+Ruggiero+128+Spadola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white transition-colors duration-200 group"
                >
                  <MapPin className="w-4 h-4 text-[var(--color-primary-light)] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <span>Via Conte Ruggiero, 128<br />89822 Spadola (VV)</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+3909631951395"
                  className="flex items-center gap-3 hover:text-white transition-colors duration-200 group"
                >
                  <Phone className="w-4 h-4 text-[var(--color-primary-light)] flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  +39 0963 1951395
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ecolive.srl"
                  className="flex items-center gap-3 hover:text-white transition-colors duration-200 group"
                >
                  <Mail className="w-4 h-4 text-[var(--color-primary-light)] flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  info@ecolive.srl
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-3 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-white/8 ${social.hoverColor} flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                  aria-label={social.name}
                >
                  <social.icon className="w-4.5 h-4.5 text-white/70 hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Separator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/35">
          <p>&copy; {currentYear} Ecolive S.r.l. &mdash; P.IVA 03012345678 &mdash; Tutti i diritti riservati</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white/60 transition-colors duration-200">
              Privacy Policy
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/cookie" className="hover:text-white/60 transition-colors duration-200">
              Cookie Policy
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link href="/termini" className="hover:text-white/60 transition-colors duration-200">
              Termini
            </Link>
          </div>
          <p>
            Realizzato da{' '}
            <a
              href="https://www.fodisrl.it"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors duration-200"
            >
              Fodi S.r.l.
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
