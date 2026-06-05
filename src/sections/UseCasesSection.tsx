/**
 * ---
 * client: Winity Life
 * philosophy: Emerald Noir
 * deliverable: Use Cases Section — Homepage
 * phase: 6
 * date: 2026-05-27
 * skills_used: [tss-master, tss-frontend-pro, ag-scroll-reveal]
 * ---
 *
 * Real-world use cases for the Winity card.
 * Shows how people actually use it: ads, subscriptions, travel, shopping.
 * Placed after CardsSection on the homepage.
 */

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ─── Brand tokens ──────────────────────────────────────────────────────────────
const MINT       = '#21E6A7'
const MINT_HI    = '#3CF2D0'
const COPPER_LT  = '#E8A84E'
const COPPER     = '#B87333'
const OFF_WHITE  = '#F0EDE6'
const MUTED      = 'rgba(240,237,230,0.50)'
const MUTED_DIM  = 'rgba(240,237,230,0.30)'
const BASE       = '#061C1E'
const CARD_BG    = '#0B2E2C'
const BORDER     = 'rgba(33,230,167,0.12)'
const BORDER_CU  = 'rgba(184,115,51,0.20)'

// ─── Use case data ─────────────────────────────────────────────────────────────
const USE_CASES = [
  {
    id: 'ads',
    tag: 'Digital Marketing',
    headline: 'Power your\nad accounts.',
    sub: 'Meta, Google, TikTok, LinkedIn. Load your Winity card and run campaigns globally. No declined transactions, no currency headaches.',
    platforms: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'LinkedIn'],
    badge: '🎯 Most popular use case',
    accent: MINT,
    image: '/uc_digital_marketing.png',
    imageFallback: '/ads_1.png',
    stat: '150M+',
    statLabel: 'Visa® merchants accept it',
  },
  {
    id: 'subscriptions',
    tag: 'SaaS & Subscriptions',
    headline: 'One card for\nevery tool.',
    sub: 'Notion, Figma, AWS, Shopify, Adobe, Slack. Manage all your software subscriptions from a single Winity card with full spend visibility.',
    platforms: ['Notion', 'AWS', 'Shopify', 'Adobe'],
    badge: '💳 Zero foreign transaction fees',
    accent: MINT,
    image: '/uc_saas.png',
    imageFallback: '/ads_2.png',
    stat: 'USD 0',
    statLabel: 'Exclusive card spend fee',
  },
  {
    id: 'travel',
    tag: 'Travel & Hotels',
    headline: 'Spend like\na local, anywhere.',
    sub: 'From Dubai to Tokyo, pay at hotels, restaurants, and retail. Your card works at 150M+ Visa® locations across 200+ countries.',
    platforms: ['Booking.com', 'Airbnb', 'Expedia', 'Hotels'],
    badge: '✈️ 200+ countries supported',
    accent: COPPER_LT,
    image: '/uc_travel.png',
    imageFallback: '/winity_lifestyle_travel.png',
    stat: '200+',
    statLabel: 'Countries & territories',
  },
  {
    id: 'ecommerce',
    tag: 'Online Shopping',
    headline: 'Shop global.\nEarn points.',
    sub: 'Amazon, AliExpress, ASOS, Farfetch. Shop any online store that accepts Visa® and earn 1 Winity Point per USD 10 spent automatically.',
    platforms: ['Amazon', 'ASOS', 'Farfetch', 'AliExpress'],
    badge: '⭐ 1 point per USD 10 spent',
    accent: MINT,
    image: '/uc_shopping.png',
    imageFallback: '/winity_gallery_culture.jpg',
    stat: '1pt',
    statLabel: 'Per USD 10 on every spend',
  },
  {
    id: 'dining',
    tag: 'Dining & Lifestyle',
    headline: 'Dinner anywhere\nin the world.',
    sub: 'Restaurants, cafes, bars. Anywhere Visa® is accepted, your card works. Contactless payments, Google Pay compatible, no friction.',
    platforms: ['Deliveroo', 'Uber Eats', 'OpenTable', 'Local'],
    badge: '📍 Contactless worldwide',
    accent: COPPER_LT,
    image: '/winity_lifestyle_dining.jpg',
    imageFallback: '/winity_gallary.jpg',
    stat: 'NFC',
    statLabel: 'Contactless & Apple/Google Pay',
  },
  {
    id: 'freelance',
    tag: 'Freelancers & Creators',
    headline: 'Receive digital assets.\nSpend globally.',
    sub: 'Accept digital assets as payment and spend directly with your Winity card, seamlessly bridging the gap between digital earnings and everyday expenses.',
    platforms: ['Upwork', 'Fiverr', 'Stripe', 'Digital Assets'],
    badge: '🔁 Digital asset spending built-in',
    accent: MINT,
    image: '/uc_freelancers.png',
    imageFallback: '/ads_3.png',
    stat: 'Automatic',
    statLabel: 'Conversion on card use',
  },
]

// ─── Platform pill ─────────────────────────────────────────────────────────────
function PlatformPill({ label, accent }: { label: string; accent: string }) {
  return (
    <span style={{
      display: 'inline-block',
      fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
      color: accent === COPPER_LT ? COPPER_LT : `${MINT}cc`,
      background: accent === COPPER_LT ? 'rgba(184,115,51,0.08)' : 'rgba(33,230,167,0.07)',
      border: `1px solid ${accent === COPPER_LT ? BORDER_CU : BORDER}`,
      borderRadius: 100,
      padding: '4px 10px',
    }}>
      {label}
    </span>
  )
}

// ─── Active card (hero panel left) ────────────────────────────────────────────
function ActiveCard({ useCase, index }: { useCase: typeof USE_CASES[0]; index: number }) {
  return (
    <div
      key={useCase.id}
      className="uc-active-card"
      style={{
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        height: 'clamp(380px, 48vw, 560px)',
        border: `1px solid ${useCase.accent === COPPER_LT ? BORDER_CU : BORDER}`,
        boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 60px ${useCase.accent === COPPER_LT ? 'rgba(184,115,51,0.08)' : 'rgba(33,230,167,0.06)'}`,
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1.5,
        background: useCase.accent === COPPER_LT
          ? `linear-gradient(90deg, transparent, ${COPPER}, ${COPPER_LT}, ${COPPER}, transparent)`
          : `linear-gradient(90deg, transparent, ${MINT}, ${MINT_HI}, ${MINT}, transparent)`,
        zIndex: 4,
      }} />

      {/* Image */}
      <img
        src={useCase.image}
        alt={useCase.tag}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = useCase.imageFallback
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(180deg, rgba(6,28,30,0.25) 0%, rgba(6,28,30,0.55) 45%, rgba(6,28,30,0.92) 100%)`,
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        padding: 'clamp(24px, 4vw, 40px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      }}>
        {/* Badge */}
        <p style={{
          fontSize: 11, fontWeight: 700, color: useCase.accent,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          marginBottom: 10,
        }}>{useCase.badge}</p>

        {/* Headline */}
        <h3 style={{
          fontFamily: 'Roboto, sans-serif',
          fontSize: 'clamp(26px, 3vw, 38px)',
          fontWeight: 900, color: OFF_WHITE,
          lineHeight: 1.08, letterSpacing: '-0.02em',
          marginBottom: 14,
          whiteSpace: 'pre-line',
        }}>{useCase.headline}</h3>

        {/* Sub */}
        <p style={{
          fontSize: 14, color: MUTED, lineHeight: 1.6,
          marginBottom: 20, maxWidth: 380,
        }}>{useCase.sub}</p>

        {/* Platforms */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
          {useCase.platforms.map(p => (
            <PlatformPill key={p} label={p} accent={useCase.accent} />
          ))}
        </div>

        {/* Stat */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 14,
          padding: '12px 18px', borderRadius: 14,
          background: 'rgba(6,28,30,0.7)',
          border: `1px solid ${useCase.accent === COPPER_LT ? BORDER_CU : BORDER}`,
          backdropFilter: 'blur(12px)',
          width: 'fit-content',
        }}>
          <p style={{ fontSize: 22, fontWeight: 900, color: useCase.accent, letterSpacing: '-0.02em', lineHeight: 1 }}>{useCase.stat}</p>
          <p style={{ fontSize: 12, color: MUTED_DIM, lineHeight: 1.4 }}>{useCase.statLabel}</p>
        </div>
      </div>

      {/* Index number watermark */}
      <div style={{
        position: 'absolute', top: 20, right: 24,
        fontSize: 11, fontWeight: 700, color: `${useCase.accent}60`,
        letterSpacing: '0.1em', zIndex: 3,
      }}>0{index + 1}</div>
    </div>
  )
}

// ─── Tab selector item ────────────────────────────────────────────────────────
function TabItem({
  useCase,
  active,
  onClick,
  index,
}: {
  useCase: typeof USE_CASES[0]
  active: boolean
  onClick: () => void
  index: number
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '16px 20px', borderRadius: 16, width: '100%',
        background: active
          ? useCase.accent === COPPER_LT
            ? 'rgba(184,115,51,0.08)'
            : 'rgba(33,230,167,0.07)'
          : 'transparent',
        border: `1px solid ${active
          ? useCase.accent === COPPER_LT ? 'rgba(184,115,51,0.30)' : 'rgba(33,230,167,0.25)'
          : 'transparent'}`,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
      }}
      aria-selected={active}
    >
      {/* Number */}
      <span style={{
        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: active
          ? useCase.accent === COPPER_LT ? 'rgba(184,115,51,0.15)' : 'rgba(33,230,167,0.12)'
          : 'rgba(240,237,230,0.05)',
        border: `1px solid ${active
          ? useCase.accent === COPPER_LT ? 'rgba(184,115,51,0.35)' : 'rgba(33,230,167,0.30)'
          : 'rgba(240,237,230,0.08)'}`,
        fontSize: 10, fontWeight: 800, color: active ? useCase.accent : MUTED_DIM,
        letterSpacing: '0.05em',
        transition: 'all 0.25s',
      }}>
        0{index + 1}
      </span>

      {/* Labels */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: active ? useCase.accent : MUTED_DIM,
          marginBottom: 2,
          transition: 'color 0.25s',
        }}>{useCase.tag}</p>
        <p style={{
          fontSize: 13, fontWeight: active ? 600 : 400, color: active ? OFF_WHITE : MUTED,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          transition: 'color 0.25s',
        }}>{useCase.headline.replace('\n', ' ')}</p>
      </div>

      {/* Arrow */}
      <ArrowRight
        size={14}
        style={{
          color: active ? useCase.accent : MUTED_DIM,
          flexShrink: 0,
          opacity: active ? 1 : 0.5,
          transition: 'all 0.25s',
          transform: active ? 'translateX(3px)' : 'translateX(0)',
        }}
      />
    </button>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function UseCasesSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const headRef      = useRef<HTMLDivElement>(null)
  const bodyRef      = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const touchStartX  = useRef<number | null>(null)
  const touchStartY  = useRef<number | null>(null)

  // Auto-advance every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % USE_CASES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 72%', once: true },
      })
      gsap.fromTo(bodyRef.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: section, start: 'top 68%', once: true },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  const current = USE_CASES[active]

  return (
    <section
      ref={sectionRef}
      style={{ background: BASE, padding: 'clamp(80px, 12vh, 120px) 0', overflow: 'hidden' }}
      aria-label="Real-world card use cases"
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }}>

        {/* Header */}
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: MINT, marginBottom: 16,
          }}>
            <span style={{ display: 'inline-block', width: 20, height: 1, background: MINT }} />
            Real World Use
            <span style={{ display: 'inline-block', width: 20, height: 1, background: MINT }} />
          </span>

          <h2 style={{
            fontFamily: 'Roboto, sans-serif', fontWeight: 900,
            fontSize: 'clamp(28px, 4.5vw, 58px)', lineHeight: 1.06,
            letterSpacing: '-0.025em', color: OFF_WHITE,
            maxWidth: 720, margin: '0 auto 16px',
          }}>
            Your card works where<br />
            <span style={{ color: MINT }}>your life actually happens.</span>
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.15vw, 17px)', color: MUTED,
            maxWidth: 500, margin: '0 auto', lineHeight: 1.7,
          }}>
            From running Meta campaigns to booking hotels in Tokyo, the Winity card
            is already doing the heavy lifting for thousands of users worldwide.
          </p>
        </div>

        {/* Cinematic Horizontal Split Carousel Container */}
        <div ref={bodyRef} style={{ position: 'relative', width: '100%', opacity: 0 }}>
          
          {/* Active slide card */}
          <div
            className="uc-active-slide-card"
            style={{
              display: 'flex',
              background: 'linear-gradient(160deg, rgba(15,63,58,0.35) 0%, rgba(6,20,20,0.65) 100%)',
              border: `1px solid ${current.accent === COPPER_LT ? BORDER_CU : BORDER}`,
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 60px ${current.accent === COPPER_LT ? 'rgba(184,115,51,0.06)' : 'rgba(33,230,167,0.04)'}`,
              minHeight: 480,
              position: 'relative',
              transition: 'all 0.5s ease',
            }}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX
              touchStartY.current = e.touches[0].clientY
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null || touchStartY.current === null) return
              const dx = e.changedTouches[0].clientX - touchStartX.current
              const dy = e.changedTouches[0].clientY - touchStartY.current
              // Only register horizontal swipes (dx > dy in magnitude)
              if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                if (dx < 0) {
                  // Swipe left → next
                  setActive(prev => (prev + 1) % USE_CASES.length)
                } else {
                  // Swipe right → prev
                  setActive(prev => (prev - 1 + USE_CASES.length) % USE_CASES.length)
                }
              }
              touchStartX.current = null
              touchStartY.current = null
            }}
          >
            {/* Top accent line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: current.accent === COPPER_LT
                ? `linear-gradient(90deg, transparent, ${COPPER}, ${COPPER_LT}, ${COPPER}, transparent)`
                : `linear-gradient(90deg, transparent, ${MINT}, ${MINT_HI}, ${MINT}, transparent)`,
              zIndex: 4,
            }} />

            {/* Left side — Text details */}
            <div style={{
              flex: '1 1 50%',
              padding: 'clamp(24px, 4vw, 40px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              zIndex: 2,
            }} className="uc-slide-text w-full md:w-1/2">
              
              {/* Badge */}
              <p style={{
                fontSize: 11,
                fontWeight: 700,
                color: current.accent,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}>
                {current.badge}
              </p>

              {/* Headline */}
              <h3 style={{
                fontFamily: 'Roboto, sans-serif',
                fontSize: 'clamp(24px, 2.5vw, 36px)',
                fontWeight: 900,
                color: OFF_WHITE,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: 14,
                whiteSpace: 'pre-line',
              }}>
                {current.headline}
              </h3>

              {/* Subdescription */}
              <p style={{
                fontSize: 14,
                color: MUTED,
                lineHeight: 1.65,
                marginBottom: 20,
                maxWidth: 440,
              }}>
                {current.sub}
              </p>

              {/* Platforms */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                {current.platforms.map(p => (
                  <PlatformPill key={p} label={p} accent={current.accent} />
                ))}
              </div>

              {/* Stat and CTA button group */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 16px',
                  borderRadius: 12,
                  background: 'rgba(6,28,30,0.6)',
                  border: `1px solid ${current.accent === COPPER_LT ? BORDER_CU : BORDER}`,
                  backdropFilter: 'blur(8px)',
                }}>
                  <p style={{ fontSize: 20, fontWeight: 900, color: current.accent, letterSpacing: '-0.02em', lineHeight: 1, margin: 0 }}>
                    {current.stat}
                  </p>
                  <p style={{ fontSize: 11, color: MUTED_DIM, lineHeight: 1.2, margin: 0 }}>
                    {current.statLabel}
                  </p>
                </div>

                <a
                  href="https://apps.apple.com/us/app/winity-life/id6752761057"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill"
                  style={{ fontSize: 12, padding: '10px 16px 10px 22px' }}
                >
                  Get Started
                  <span className="pill-icon" style={{ width: 26, height: 26 }} aria-hidden="true">
                    <svg width="12" height="12" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>

            {/* Right side — Full bleed image (completely separated, zero text overlap) */}
            <div style={{
              flex: '1 1 50%',
              position: 'relative',
              overflow: 'hidden',
            }} className="uc-slide-image w-full md:w-1/2 h-[260px] md:h-auto">
              <img
                src={current.image}
                alt={current.tag}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = current.imageFallback
                }}
              />
              {/* Overlay fade on image */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(6,28,30,0.6) 0%, transparent 40%)',
                pointerEvents: 'none',
              }} className="hidden md:block" />
            </div>

            {/* Index watermark */}
            <div style={{
              position: 'absolute', top: 20, left: '50%', transform: 'translateX(-120%)',
              fontSize: 12, fontWeight: 700, color: `${current.accent}60`,
              letterSpacing: '0.1em', zIndex: 3,
            }} className="hidden md:block">
              0{active + 1}
            </div>
          </div>

          {/* Navigation Chevrons on sides */}
          <button
            onClick={() => setActive(prev => (prev - 1 + USE_CASES.length) % USE_CASES.length)}
            aria-label="Previous slide"
            style={{
              position: 'absolute',
              left: -56,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(6,28,30,0.8)',
              color: '#F4F7F6',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              transition: 'all 0.3s ease',
            }}
            className="hidden xl:flex hover:border-mint hover:text-mint"
          >
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button
            onClick={() => setActive(prev => (prev + 1) % USE_CASES.length)}
            aria-label="Next slide"
            style={{
              position: 'absolute',
              right: -56,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(6,28,30,0.8)',
              color: '#F4F7F6',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              transition: 'all 0.3s ease',
            }}
            className="hidden xl:flex hover:border-mint hover:text-mint"
          >
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
              <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Auto-advance progress indicator dots */}
        <div style={{
          display: 'flex', gap: 8, justifyContent: 'center', marginTop: 32,
        }}>
          {USE_CASES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                height: 3, borderRadius: 2,
                background: i === active ? MINT : `${MUTED_DIM}`,
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                width: i === active ? 32 : 12,
              }}
              aria-label={`Use case ${i + 1}`}
            />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .uc-active-slide-card {
            flex-direction: column !important;
          }
          .uc-slide-text {
            width: 100% !important;
            flex: none !important;
          }
          .uc-slide-image {
            width: 100% !important;
            height: 260px !important;
            flex: none !important;
          }
        }
      `}</style>
    </section>
  )
}
