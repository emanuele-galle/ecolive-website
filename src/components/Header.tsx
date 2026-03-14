'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'

const menuItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Sistema X-Frame',
    href: '/sistema-x-frame',
    submenu: [
      { label: 'Panoramica', href: '/sistema-x-frame' },
      { label: 'Pareti', href: '/sistema-x-frame/pareti' },
      { label: 'Solai', href: '/sistema-x-frame/solai' },
      { label: 'Coperture', href: '/sistema-x-frame/coperture' },
      { label: 'Trasporto e Montaggio', href: '/sistema-x-frame/trasporto-montaggio' },
      { label: 'Confronto', href: '/sistema-x-frame/confronto' },
    ],
  },
  { label: 'Tipologie', href: '/tipologie' },
  { label: 'Configuratore', href: '/configuratore' },
  { label: 'Progetti', href: '/progetti' },
  {
    label: 'Azienda',
    href: '/chi-siamo',
    submenu: [
      { label: 'Chi Siamo', href: '/chi-siamo' },
      { label: 'Il Processo', href: '/il-processo' },
      { label: 'Professionisti', href: '/professionisti' },
      { label: 'Franchising', href: '/franchising' },
    ],
  },
  { label: 'News', href: '/news' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null)
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null)
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
    setMobileSubmenuOpen(null)
  }, [])

  const handleSubmenuEnter = useCallback((href: string) => {
    if (submenuTimeout.current) clearTimeout(submenuTimeout.current)
    setSubmenuOpen(href)
  }, [])

  const handleSubmenuLeave = useCallback(() => {
    submenuTimeout.current = setTimeout(() => setSubmenuOpen(null), 150)
  }, [])

  const handleSubmenuKeyDown = useCallback((e: React.KeyboardEvent, href: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setSubmenuOpen((prev) => (prev === href ? null : href))
    } else if (e.key === 'Escape') {
      setSubmenuOpen(null)
    }
  }, [])

  const toggleMobileSubmenu = useCallback((href: string) => {
    setMobileSubmenuOpen((prev) => (prev === href ? null : href))
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(160,132,92,0.2)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'h-16 lg:h-[72px]' : 'h-18 lg:h-[88px]'
          }`}>

            {/* Logo — left */}
            <Link href="/" className="flex-shrink-0" onClick={closeMobile}>
              <div className={`relative transition-all duration-500 ${
                scrolled
                  ? 'h-10 lg:h-12'
                  : 'h-12 lg:h-14 brightness-0 invert drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]'
              }`}>
                <Image
                  src="/images/logo-ecolive.png"
                  alt="Ecolive - Case Prefabbricate in Legno"
                  width={180}
                  height={56}
                  className="h-full w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop nav — center */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => {
                const hasSubmenu = !!item.submenu
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => hasSubmenu && handleSubmenuEnter(item.href)}
                    onMouseLeave={() => hasSubmenu && handleSubmenuLeave()}
                    onFocus={() => hasSubmenu && handleSubmenuEnter(item.href)}
                    onBlur={(e) => {
                      if (hasSubmenu && !e.currentTarget.contains(e.relatedTarget)) {
                        handleSubmenuLeave()
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1 px-3.5 py-2 text-[13px] uppercase tracking-[0.1em] font-medium transition-colors duration-300 ${
                        scrolled
                          ? 'text-[#2C2C2C] hover:text-[#A0845C]'
                          : 'text-white/80 hover:text-white'
                      }`}
                      {...(hasSubmenu && {
                        'aria-expanded': submenuOpen === item.href,
                        'aria-haspopup': true as const,
                        onKeyDown: (e: React.KeyboardEvent) => handleSubmenuKeyDown(e, item.href),
                      })}
                    >
                      {item.label}
                      {hasSubmenu && (
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-300 ${
                            submenuOpen === item.href ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </Link>

                    {/* Dropdown */}
                    {hasSubmenu && (
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ease-out ${
                          submenuOpen === item.href
                            ? 'opacity-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 -translate-y-3 pointer-events-none'
                        }`}
                      >
                        <div className="w-64 bg-white rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] ring-1 ring-black/[0.04] py-2.5 overflow-hidden">
                          {item.submenu!.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="group/item relative block px-6 py-3 text-sm text-[#4A4A4A] hover:text-[#A0845C] transition-all duration-200"
                            >
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-[#A0845C] scale-y-0 group-hover/item:scale-y-100 transition-transform duration-200 origin-center" />
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Desktop CTA — right */}
            <Link
              href="/configuratore"
              className={`hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] uppercase tracking-[0.06em] font-medium transition-all duration-500 group ${
                scrolled
                  ? 'bg-[#A0845C] text-white hover:bg-[#8B7150] shadow-[0_2px_12px_-2px_rgba(160,132,92,0.4)]'
                  : 'border border-white/30 text-white hover:border-white/60 hover:bg-white/10'
              }`}
            >
              Configura la tua Casa
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className={`lg:hidden p-2.5 rounded-xl transition-colors duration-300 ${
                scrolled
                  ? 'text-[#2C2C2C] hover:bg-neutral-100'
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
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobile}
      />

      {/* Mobile slide-in panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-[320px] max-w-[85vw] bg-white transition-transform duration-400 ease-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-6 h-18 border-b border-neutral-100">
          <Image
            src="/images/logo-ecolive.png"
            alt="Ecolive"
            width={130}
            height={40}
            className="h-9 w-auto object-contain"
          />
          <button
            onClick={closeMobile}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile nav */}
        <nav className="px-4 py-8 space-y-1 overflow-y-auto h-[calc(100%-4.5rem-5.5rem)]">
          {menuItems.map((item) => (
            <div key={item.href}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleMobileSubmenu(item.href)}
                    aria-expanded={mobileSubmenuOpen === item.href}
                    className="flex items-center justify-between w-full px-4 py-3.5 text-[#2C2C2C] hover:text-[#A0845C] rounded-xl transition-colors duration-200 font-medium text-[15px]"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
                      mobileSubmenuOpen === item.href ? 'rotate-180' : ''
                    }`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${
                    mobileSubmenuOpen === item.href ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="ml-4 pl-4 border-l-2 border-[#A0845C]/20 space-y-0.5 pb-2">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={closeMobile}
                          className="block px-3 py-2.5 text-sm text-neutral-500 hover:text-[#A0845C] rounded-lg transition-colors duration-200"
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
                  className="block px-4 py-3.5 text-[#2C2C2C] hover:text-[#A0845C] rounded-xl transition-colors duration-200 font-medium text-[15px]"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-neutral-100 bg-white">
          <Link
            href="/configuratore"
            onClick={closeMobile}
            className="flex items-center justify-center gap-2.5 w-full py-4 bg-[#A0845C] text-white rounded-xl font-medium text-[15px] hover:bg-[#8B7150] transition-colors duration-300 shadow-[0_4px_20px_-4px_rgba(160,132,92,0.4)]"
          >
            Configura la tua Casa
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  )
}
