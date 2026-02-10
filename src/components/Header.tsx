'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback, useRef } from 'react'
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
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false)
  const submenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
    setMobileSubmenuOpen(false)
  }, [])

  const handleSubmenuEnter = useCallback(() => {
    if (submenuTimeout.current) clearTimeout(submenuTimeout.current)
    setSubmenuOpen(true)
  }, [])

  const handleSubmenuLeave = useCallback(() => {
    submenuTimeout.current = setTimeout(() => setSubmenuOpen(false), 150)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-premium-lg'
            : 'bg-gradient-to-b from-black/50 via-black/20 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 relative" onClick={closeMobile}>
              <div className={`relative h-10 lg:h-12 w-auto transition-all duration-500 ${
                scrolled ? '' : 'brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]'
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
            <nav className="hidden lg:flex items-center gap-0.5">
              {menuItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.submenu && handleSubmenuEnter()}
                  onMouseLeave={() => item.submenu && handleSubmenuLeave()}
                >
                  <Link
                    href={item.href}
                    className={`relative px-3 py-2 text-[13px] uppercase tracking-[0.08em] font-medium transition-colors duration-300 inline-flex items-center gap-1 group ${
                      scrolled
                        ? 'text-[#86868B] hover:text-[#1D1D1F]'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${submenuOpen ? 'rotate-180' : ''}`} />
                    )}
                    {/* Animated underline */}
                    <span className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out ${
                      scrolled ? 'bg-[#A0845C]' : 'bg-white'
                    }`} />
                  </Link>

                  {/* Submenu */}
                  {item.submenu && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                        submenuOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="w-52 bg-white/95 backdrop-blur-xl rounded-xl shadow-premium-xl border border-[#D2D2D7]/50 py-2 overflow-hidden">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="block px-5 py-2.5 text-sm text-[#86868B] hover:text-[#A0845C] hover:bg-[#F5F5F7] transition-all duration-200 hover:pl-6"
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
              className={`hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 group ${
                scrolled
                  ? 'bg-[#A0845C] text-white hover:bg-[#856B45] shadow-md hover:shadow-lg'
                  : 'border border-white/40 text-white hover:bg-white/15 hover:border-white/60 backdrop-blur-sm'
              }`}
            >
              Richiedi Preventivo
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
                scrolled
                  ? 'text-[#1D1D1F] hover:bg-[#F5F5F7]'
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
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
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
        {/* Mobile menu header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#D2D2D7]/50">
          <Image
            src="/images/logo-ecolive.png"
            alt="Ecolive"
            width={120}
            height={36}
            className="h-8 w-auto object-contain"
          />
          <button
            onClick={closeMobile}
            className="p-2 rounded-xl text-[#86868B] hover:bg-[#F5F5F7] transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile nav items */}
        <nav className="px-4 py-6 space-y-0.5 overflow-y-auto h-[calc(100%-4rem-5.5rem)]">
          {menuItems.map((item) => (
            <div key={item.href}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                    className="flex items-center justify-between w-full px-4 py-3.5 text-[#1D1D1F] hover:text-[#A0845C] hover:bg-[#F5F5F7] rounded-xl transition-all duration-200 font-medium"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 text-[#86868B] transition-transform duration-300 ${
                      mobileSubmenuOpen ? 'rotate-180' : ''
                    }`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${
                    mobileSubmenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="pl-4 pb-1 space-y-0.5">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={closeMobile}
                          className="block px-4 py-2.5 text-sm text-[#86868B] hover:text-[#A0845C] hover:bg-[#F5F5F7] rounded-lg transition-all duration-200"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={closeMobile}
                  className="block px-4 py-3.5 text-[#1D1D1F] hover:text-[#A0845C] hover:bg-[#F5F5F7] rounded-xl transition-all duration-200 font-medium"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#D2D2D7]/50 bg-white">
          <Link
            href="/contatti"
            onClick={closeMobile}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#A0845C] text-white rounded-xl font-medium hover:bg-[#856B45] transition-colors duration-200 shadow-md"
          >
            Richiedi Preventivo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  )
}
