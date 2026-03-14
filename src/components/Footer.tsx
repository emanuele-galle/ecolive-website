import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Download,
  Clock,
  ExternalLink,
} from 'lucide-react'

/* ─── Data ────────────────────────────────────────────────────────── */

const navEsplora = [
  { label: 'Home', href: '/' },
  { label: 'Sistema X-Frame', href: '/sistema-x-frame' },
  { label: 'Tipologie', href: '/tipologie' },
  { label: 'Configuratore', href: '/configuratore' },
  { label: 'Progetti', href: '/progetti' },
]

const navAzienda = [
  { label: 'Chi Siamo', href: '/chi-siamo' },
  { label: 'Il Processo', href: '/il-processo' },
  { label: 'Professionisti', href: '/professionisti' },
  { label: 'Franchising', href: '/franchising' },
  { label: 'News', href: '/news' },
  { label: 'FAQ', href: '/faq' },
]

const certifications = [
  'Classe A4 CliMAX',
  'Passive House / PHIUS',
  'ARCA',
  'LEED for Homes',
  'Made in Italy, Calabria',
]

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/ecolivesrl', icon: Facebook },
  { name: 'Instagram', href: 'https://www.instagram.com/ecolive.srl', icon: Instagram },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/ecolivesrl', icon: Linkedin },
  { name: 'YouTube', href: 'https://www.youtube.com/@Ecolive-xframe', icon: Youtube },
]

/* ─── Component ───────────────────────────────────────────────────── */

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      {/* ── Pre-footer CTA Band ───────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#A0845C] to-[#856B45]">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-6 py-10 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-white text-xl sm:text-2xl font-semibold tracking-tight text-center sm:text-left">
            La tua casa inizia qui
          </p>
          <Link
            href="/configuratore"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#1D1D1F] text-sm font-semibold rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-[1.03] group flex-shrink-0"
          >
            Configura la tua Casa
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── Main Footer ───────────────────────────────────────────── */}
      <footer className="relative bg-[#1D1D1F] overflow-hidden">
        {/* Grain texture */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.02]" />

        {/* Decorative radial glow behind logo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#A0845C]/[0.03] blur-[160px] pointer-events-none" />

        {/* ── Zone A: Brand Statement ──────────────────────────── */}
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10 sm:pt-20 sm:pb-12">
          <div className="flex flex-col items-center text-center">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo-ecolive.png"
                alt="EcoLive - Case Prefabbricate in Legno"
                width={200}
                height={64}
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-2xl sm:text-3xl text-white/80 font-light tracking-tight max-w-xl leading-snug">
              La bioedilizia pi&ugrave; innovativa
              <br className="hidden sm:block" /> parte dal Sud
            </p>
          </div>
          {/* Gold separator */}
          <div className="mt-10 sm:mt-12 h-px w-full bg-gradient-to-r from-transparent via-[#A0845C]/40 to-transparent" />
        </div>

        {/* ── Zone B: 4-Column Grid ───────────────────────────── */}
        <div className="relative max-w-7xl mx-auto px-6 pb-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Col 1 — Esplora */}
            <div>
              <h4 className="text-[11px] font-semibold text-[#A0845C] uppercase tracking-[0.18em] mb-5">
                Esplora
              </h4>
              <ul className="space-y-2.5">
                {navEsplora.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/40 hover:text-white hover:translate-x-0.5 inline-block transition-all duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2 — Azienda */}
            <div>
              <h4 className="text-[11px] font-semibold text-[#A0845C] uppercase tracking-[0.18em] mb-5">
                Azienda
              </h4>
              <ul className="space-y-2.5">
                {navAzienda.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/40 hover:text-white hover:translate-x-0.5 inline-block transition-all duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Contatti */}
            <div>
              <h4 className="text-[11px] font-semibold text-[#A0845C] uppercase tracking-[0.18em] mb-5">
                Contatti
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <a
                    href="https://maps.google.com/?q=Via+Conte+Ruggiero+128+Spadola"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2.5 text-sm text-white/40 hover:text-white transition-colors group"
                  >
                    <MapPin className="w-4 h-4 text-[#A0845C] mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">
                      Via Conte Ruggiero, 128
                      <br />
                      89822 Spadola (VV)
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+390963530945"
                    className="flex items-center gap-2.5 text-sm text-white/40 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#A0845C] flex-shrink-0" />
                    (0963) 530945
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+393662037106"
                    className="flex items-center gap-2.5 text-sm text-white/40 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#A0845C] flex-shrink-0" />
                    366.2037106
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@ecolive.srl"
                    className="flex items-center gap-2.5 text-sm text-white/40 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#A0845C] flex-shrink-0" />
                    info@ecolive.srl
                  </a>
                </li>
                <li>
                  <span className="flex items-center gap-2.5 text-sm text-white/40">
                    <Clock className="w-4 h-4 text-[#A0845C] flex-shrink-0" />
                    Lun &mdash; Ven 08:30 &ndash; 17:30
                  </span>
                </li>
              </ul>

              {/* Brochure download */}
              <a
                href="https://storage.fodivps2.cloud/ecolive-media/documenti/Brochure-2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-xs text-[#A0845C] hover:text-white font-medium transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Scarica Brochure 2025
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </div>

            {/* Col 4 — Certificazioni */}
            <div>
              <h4 className="text-[11px] font-semibold text-[#A0845C] uppercase tracking-[0.18em] mb-5">
                Certificazioni
              </h4>
              <ul className="space-y-2.5">
                {certifications.map((cert) => (
                  <li
                    key={cert}
                    className="text-sm text-white/40 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#A0845C] flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Zone C: Bottom Bar ──────────────────────────────── */}
        <div className="relative border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
              {/* Left — copyright + attribution */}
              <p className="text-xs text-white/30 order-2 md:order-1">
                &copy; {currentYear} EcoLive S.r.l. &mdash; P.IVA 03607430794 &mdash; Realizzato da{' '}
                <a href="https://www.fodisrl.it" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#A0845C] transition-colors">Fodi S.r.l.</a>
              </p>

              {/* Center — social icons */}
              <div className="flex items-center gap-2 order-1 md:order-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#A0845C] flex items-center justify-center transition-all duration-300 group"
                  >
                    <s.icon className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>

              {/* Right — legal links */}
              <div className="flex items-center gap-3 text-xs text-white/30 order-3">
                <Link href="/privacy" className="hover:text-white/60 transition-colors">
                  Privacy
                </Link>
                <span className="w-px h-3 bg-white/10" />
                <Link href="/cookie" className="hover:text-white/60 transition-colors">
                  Cookie
                </Link>
                <span className="w-px h-3 bg-white/10" />
                <Link href="/termini" className="hover:text-white/60 transition-colors">
                  Termini
                </Link>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </>
  )
}
