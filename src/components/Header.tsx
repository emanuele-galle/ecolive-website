'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react'

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const submenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target as Node)) {
        setActiveSubmenu(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-premium-lg'
          : 'bg-gradient-to-b from-[var(--color-secondary-dark)]/60 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className={`relative h-12 w-auto transition-all duration-300 ${
              isScrolled ? '' : 'brightness-0 invert drop-shadow-lg'
            }`}>
              <Image
                src="/images/logo-ecolive.png"
                alt="Ecolive - Case Prefabbricate in Legno"
                width={180}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Premium */}
          <nav className="hidden lg:flex items-center space-x-1" ref={submenuRef}>
            {menuItems.map((item) => (
              <div key={item.href} className="relative">
                {item.submenu ? (
                  <button
                    onClick={() => setActiveSubmenu(activeSubmenu === item.label ? null : item.label)}
                    className={`relative px-3 py-2 font-medium transition-colors duration-300 group flex items-center gap-1 ${
                      isScrolled
                        ? 'text-[var(--color-muted)] hover:text-[var(--color-secondary-dark)]'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeSubmenu === item.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`relative px-3 py-2 font-medium transition-colors duration-300 group ${
                      isScrolled
                        ? 'text-[var(--color-muted)] hover:text-[var(--color-secondary-dark)]'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                      isScrolled ? 'bg-[var(--color-primary)]' : 'bg-white'
                    }`} />
                  </Link>
                )}

                {/* Submenu */}
                {item.submenu && activeSubmenu === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[var(--color-border)] py-2 z-50">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        onClick={() => setActiveSubmenu(null)}
                        className="block px-4 py-2.5 text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-colors"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* CTA Button Premium */}
            <Link
              href="/contatti"
              className="ml-4 group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white font-semibold rounded-full shadow-lg shadow-[var(--color-primary)]/25 hover:shadow-xl hover:shadow-[var(--color-primary)]/30 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Preventivo</span>
              <ArrowRight className="relative z-10 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </nav>

          {/* Mobile Menu Button Premium */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
              isScrolled
                ? 'text-[var(--color-secondary-dark)] hover:bg-[var(--color-secondary-dark)]/5'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Premium */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-[var(--color-border)]">
          <nav className="px-4 py-6 space-y-1">
            {menuItems.map((item, index) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3.5 text-[var(--color-muted)] hover:text-[var(--color-secondary-dark)] hover:bg-[var(--color-surface)] rounded-xl transition-all duration-300 font-medium"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <div className="pl-6 space-y-1 mt-1">
                    {item.submenu.slice(1).map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm text-[var(--color-muted-light)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] rounded-lg transition-all duration-300"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link
                href="/contatti"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white text-center font-semibold rounded-xl shadow-lg shadow-[var(--color-primary)]/20 transition-all duration-300"
              >
                Richiedi preventivo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
