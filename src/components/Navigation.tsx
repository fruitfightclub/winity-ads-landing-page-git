import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { gsap } from 'gsap'

// ─── Cards dropdown items ────────────────────────────────────────────────────
const cardsDropdownLinks = [
  {
    label: 'Exclusive',
    href: '/exclusive',
    desc: 'Virtual & Physical Visa Card',
    tag: 'From $20/yr',
  },
  {
    label: 'Executive',
    href: '/executive',
    desc: 'Premium Metal Visa Card',
    tag: 'From $1,000/yr',
  },
]

// ─── Regular nav links ───────────────────────────────────────────────────────
const navLinks = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Loyalty',      href: '/loyalty'        },
  { label: 'FAQs',         href: '/faqs'           },
  { label: 'Support',      href: '/support'        },
]

// ─── Component ───────────────────────────────────────────────────────────────
export default function Navigation() {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [cardsOpen,    setCardsOpen]    = useState(false)
  const [mobileCards,  setMobileCards]  = useState(false)
  const [storeUrl,     setStoreUrl]     = useState('https://apps.apple.com/us/app/winity-life/id6752761057')

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
    if (/android/i.test(userAgent)) {
      setStoreUrl('https://play.google.com/store/apps/details?id=com.winity.life')
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setStoreUrl('https://apps.apple.com/us/app/winity-life/id6752761057')
    } else {
      setStoreUrl('https://apps.apple.com/us/app/winity-life/id6752761057')
    }
  }, [])

  const navRef         = useRef<HTMLElement>(null)
  const mobileMenuRef  = useRef<HTMLDivElement>(null)
  const dropdownRef    = useRef<HTMLDivElement>(null)
  const dropdownTimer  = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { pathname } = useLocation()

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false)
    setMobileCards(false)
  }, [pathname])

  // Mobile menu entrance animation
  useEffect(() => {
    if (!mobileMenuRef.current) return
    if (mobileOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
      )
    }
  }, [mobileOpen])

  // Dropdown open/close animation
  useEffect(() => {
    if (!dropdownRef.current) return
    if (cardsOpen) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -8, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: 'power2.out' }
      )
    }
  }, [cardsOpen])

  // Nav entrance animation
  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(
      navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 }
    )
  }, [])

  const isActive = (href: string) => pathname === href

  // Hover handlers with delay to prevent flicker
  const handleCardsEnter = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current)
    setCardsOpen(true)
  }
  const handleCardsLeave = () => {
    dropdownTimer.current = setTimeout(() => setCardsOpen(false), 120)
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'nav-blur py-2' : 'py-3 bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div className="container-wide flex items-center justify-between">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            aria-label="Winity Life home"
          >
            <div className="relative">
              <img
                src="/WINITY Text Logo Green and copper .png"
                alt="Winity Life"
                className="h-8 md:h-[34px] w-auto relative z-10"
                onError={(e) => {
                  const t = e.target as HTMLImageElement
                  t.src = '/winity-logo-white.png'
                }}
              />
              {/* Mint glow that emanates from behind the logo on hover */}
              <div
                className="absolute opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  inset: '-6px -10px',
                  background: 'radial-gradient(ellipse 120% 80% at 50% 115%, rgba(33,230,167,0.55) 0%, rgba(33,230,167,0.20) 38%, transparent 66%)',
                  filter: 'blur(9px)',
                  transition: 'opacity 0.45s cubic-bezier(0.16,1,0.3,1)',
                  zIndex: -1,
                }}
              />
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <ul className="hidden lg:flex items-center gap-1" role="list">

            {/* Cards dropdown trigger */}
            <li
              className="relative"
              onMouseEnter={handleCardsEnter}
              onMouseLeave={handleCardsLeave}
            >
              <button
                className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive('/exclusive') || isActive('/executive') || isActive('/business')
                    ? 'text-mint bg-mint/10'
                    : 'text-off-white/60 hover:text-off-white hover:bg-off-white/5'
                }`}
                aria-haspopup="true"
                aria-expanded={cardsOpen}
              >
                Cards
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${cardsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown panel */}
              {cardsOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(11,46,44,0.97)',
                    border: '1px solid rgba(184,115,51,0.20)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(33,230,167,0.04)',
                  }}
                  role="menu"
                  onMouseEnter={handleCardsEnter}
                  onMouseLeave={handleCardsLeave}
                >
                  {/* Copper top accent */}
                  <div
                    className="h-[1.5px] w-full"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, #B87333, #E8A84E, #B87333, transparent)',
                    }}
                  />

                  <div className="p-2">
                    {cardsDropdownLinks.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        role="menuitem"
                        className={`flex flex-col px-3.5 py-3 rounded-xl transition-all duration-150 group/item ${
                          isActive(item.href)
                            ? 'bg-mint/10 text-mint'
                            : 'hover:bg-off-white/[0.05] text-off-white/80 hover:text-off-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">{item.label}</span>
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                            style={{
                              background: 'rgba(184,115,51,0.15)',
                              color: '#CD9A5A',
                            }}
                          >
                            {item.tag}
                          </span>
                        </div>
                        <span className="text-xs text-muted-grey/70 mt-0.5">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* Regular links — underline-slide style (distinct from Cards bg-fill) */}
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className={`nav-link-underline px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? 'text-off-white active'
                      : 'text-off-white/55 hover:text-off-white'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTAs ── */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill"
              style={{ fontSize: 13, padding: '8px 12px 8px 18px' }}
            >
              Get the App
              <span className="pill-icon" style={{ width: 26, height: 26 }} aria-hidden="true">
                <svg width="13" height="13" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
                </svg>
              </span>
            </a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="lg:hidden p-2 rounded-lg text-off-white/70 hover:text-off-white hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 pt-20 px-4 overflow-y-auto"
          style={{ background: 'rgba(6,28,30,0.97)', backdropFilter: 'blur(20px)' }}
        >
          <div className="flex flex-col gap-1 mb-8">

            {/* Cards accordion */}
            <div>
              <button
                onClick={() => setMobileCards(!mobileCards)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-lg font-medium text-off-white/80 hover:text-mint rounded-xl hover:bg-mint/5 transition-all"
              >
                <span>Cards</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 text-off-white/40 ${mobileCards ? 'rotate-180' : ''}`}
                />
              </button>

              {mobileCards && (
                <div className="ml-4 mt-1 flex flex-col gap-1">
                  {cardsDropdownLinks.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`flex items-center justify-between px-4 py-3 text-base rounded-xl transition-all ${
                        isActive(item.href)
                          ? 'text-mint bg-mint/10'
                          : 'text-off-white/70 hover:text-mint hover:bg-mint/5'
                      }`}
                    >
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-xs text-muted-grey/60 mt-0.5">{item.desc}</p>
                      </div>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(184,115,51,0.15)', color: '#CD9A5A' }}
                      >
                        {item.tag}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Regular links */}
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`block px-4 py-3.5 text-lg font-medium rounded-xl transition-all ${
                  isActive(link.href)
                    ? 'text-mint bg-mint/10'
                    : 'text-off-white/80 hover:text-mint hover:bg-mint/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="divider-copper mb-8" />

          {/* Mobile CTAs */}
          <div className="flex flex-col gap-3 pb-8">
            <a
              href="https://apps.apple.com/us/app/winity-life/id6752761057"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-outline justify-center"
              style={{ padding: '13px 18px 13px 28px' }}
              onClick={() => setMobileOpen(false)}
            >
              App Store
              <span className="pill-icon" aria-hidden="true">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
                </svg>
              </span>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.winity.life"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-outline justify-center"
              style={{ padding: '13px 18px 13px 28px' }}
              onClick={() => setMobileOpen(false)}
            >
              Google Play
              <span className="pill-icon" aria-hidden="true">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      )}
    </>
  )
}
