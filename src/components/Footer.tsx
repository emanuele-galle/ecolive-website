import Link from 'next/link'
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

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
  { label: 'Brochure 2025', href: 'https://storage.fodivps2.cloud/ecolive-media/documenti/Brochure-2025.pdf', external: true },
]

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/ecolivesrl', icon: Facebook, hoverColor: 'hover:bg-[#1877F2]' },
  { name: 'Instagram', href: 'https://www.instagram.com/ecolive.srl', icon: Instagram, hoverColor: 'hover:bg-[#E4405F]' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/ecolivesrl', icon: Linkedin, hoverColor: 'hover:bg-[#0A66C2]' },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UCg6jKyIT6s7ABhfrn1nT_fQ', icon: Youtube, hoverColor: 'hover:bg-[#FF0000]' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1a2e25] text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + Tagline */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-[var(--color-primary)] transition-colors duration-200">
                Ecolive
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              Dal 1999 contribuiamo alla salvaguardia del pianeta attraverso un modo di vivere ecosostenibile.
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-eco-green)] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-eco-green)]" />
              100% Ecosostenibile
            </span>
          </div>

          {/* Link Rapidi */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold text-white mb-5">Link Rapidi</h3>
            <ul className="space-y-2.5">
              {linkRapidi.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servizi */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold text-white mb-5">Servizi</h3>
            <ul className="space-y-2.5">
              {servizi.map((link) => (
                <li key={link.href}>
                  {'external' in link ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contatti + Social */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-semibold text-white mb-5">Contatti</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://maps.google.com/?q=Via+Conte+Ruggiero+128+Spadola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-white transition-colors duration-150"
                >
                  <MapPin className="w-4 h-4 text-[var(--color-primary)] mt-0.5 flex-shrink-0" />
                  <span>Via Conte Ruggiero, 128<br />89822 Spadola (VV)</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+3909631951395"
                  className="flex items-center gap-2.5 hover:text-white transition-colors duration-150"
                >
                  <Phone className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" />
                  +39 0963 1951395
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ecolive.srl"
                  className="flex items-center gap-2.5 hover:text-white transition-colors duration-150"
                >
                  <Mail className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0" />
                  info@ecolive.srl
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-2.5 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-lg bg-white/10 ${social.hoverColor} flex items-center justify-center transition-colors duration-200`}
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
            <p>&copy; {currentYear} Ecolive S.r.l. - P.IVA 03012345678 - Tutti i diritti riservati</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-white/70 transition-colors duration-150">Privacy Policy</Link>
              <Link href="/cookie" className="hover:text-white/70 transition-colors duration-150">Cookie Policy</Link>
              <Link href="/termini" className="hover:text-white/70 transition-colors duration-150">Termini di Servizio</Link>
            </div>
            <p>
              Realizzato da{' '}
              <a href="https://www.fodisrl.it" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors duration-150">
                Fodi S.r.l.
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
