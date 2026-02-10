'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'X-Frame', href: '/sistema-x-frame' },
  { label: 'Configuratore', href: '/configuratore' },
  { label: 'Tipologie', href: '/tipologie' },
  { label: 'Chi Siamo', href: '/chi-siamo' },
  {
    label: 'Area Tecnica',
    href: '/area-tecnica',
    submenu: [
      { label: 'Panoramica', href: '/area-tecnica' },
      { label: 'Certificazioni', href: '/area-tecnica/certificazioni' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  { label: 'News', href: '/news' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors transition-shadow duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-premium-lg'
            : 'bg-gradient-to-b from-black/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" onClick={closeMobile}>
              <div className={`relative h-10 lg:h-12 w-auto transition-all duration-300 ${
                scrolled ? '' : 'brightness-0 invert drop-shadow-md'
              }`}>
                <Image
                  src="/images/logo-ecolive.png"
                  alt="Ecolive - Case Prefabbricate in Legno"
                  width={160}
                  height={48}
                  className="h-10 lg:h-12 w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.submenu && setSubmenuOpen(true)}
                  onMouseLeave={() => item.submenu && setSubmenuOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`px-3 py-2 text-sm uppercase tracking-wider font-medium transition-colors duration-200 inline-flex items-center gap-1 ${
                      scrolled
                        ? 'text-[var(--color-muted)] hover:text-[var(--color-secondary-dark)]'
                        : 'text-white/85 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${submenuOpen ? 'rotate-180' : ''}`} />
                    )}
                  </Link>

                  {/* Hover submenu */}
                  {item.submenu && submenuOpen && (
                    <div className="absolute top-full left-0 pt-2">
                      <div className="w-48 bg-white rounded-lg shadow-premium-lg border border-[var(--color-border)] py-1.5">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-colors duration-150"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <Link
              href="/contatti"
              className={`hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                scrolled
                  ? 'border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
                  : 'border border-white/50 text-white hover:bg-white/10'
              }`}
            >
              Preventivo
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
                scrolled
                  ? 'text-[var(--color-secondary-dark)] hover:bg-[var(--color-surface)]'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobile}
      />

      {/* Mobile slide-in menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--color-border)]">
          <span className="text-sm uppercase tracking-wider font-medium text-[var(--color-muted)]">Menu</span>
          <button onClick={closeMobile} className="p-2 rounded-lg text-[var(--color-muted)] hover:bg-[var(--color-surface)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-4 py-6 space-y-1 overflow-y-auto h-[calc(100%-4rem-5rem)]">
          {menuItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={closeMobile}
                className="block px-4 py-3 text-[var(--color-foreground)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] rounded-lg transition-colors duration-150 font-medium"
              >
                {item.label}
              </Link>
              {item.submenu && (
                <div className="pl-6 space-y-0.5 mt-0.5">
                  {item.submenu.slice(1).map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={closeMobile}
                      className="block px-4 py-2.5 text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] rounded-lg transition-colors duration-150"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--color-border)]">
          <Link
            href="/contatti"
            onClick={closeMobile}
            className="flex items-center justify-center gap-2 w-full py-3 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-200"
          >
            Richiedi Preventivo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  )
}
