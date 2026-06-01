/**
 * LoyaltySection — Winity Life | Emerald Noir
 * ──────────────────────────────────────────────────────────────────────
 * Dynamic visual storytelling calculator.
 * As the slider moves, point thresholds unlock different experience tiers.
 * Section: Points calculator + animated experience showcase.
 * ──────────────────────────────────────────────────────────────────────
 */
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type LoyaltyTier = 'exclusive' | 'executive'

// ── Experience showcase data — shown based on current points threshold ──────────
const EXPERIENCE_SHOWCASES = [
  {
    id: 'everyday',
    minPts: 0,
    maxPts: 199,
    badge: 'Getting Started',
    title: 'Everyday Rewards',
    desc: 'Mobile top-ups, café credits, and everyday lifestyle perks — your points start working immediately.',
    img: '/loyalty_points_cafe.png',
    tags: ['Mobile Recharge', 'Café Credits', 'Everyday Spend'],
    accentColor: '#21E6A7',
    accentBg: 'rgba(33,230,167,0.08)',
  },
  {
    id: 'lifestyle',
    minPts: 200,
    maxPts: 499,
    badge: 'Lifestyle Unlocked',
    title: 'Curated Experiences',
    desc: 'Spa treatments, fine dining reservations, and curated city experiences in top global destinations.',
    img: '/winity_lifestyle_dining.jpg',
    tags: ['Spa & Wellness', 'Fine Dining', 'City Escapes'],
    accentColor: '#3CF2D0',
    accentBg: 'rgba(60,242,208,0.07)',
  },
  {
    id: 'travel',
    minPts: 500,
    maxPts: 999,
    badge: 'Travel Access',
    title: 'Airport Lounges & Stays',
    desc: 'Premium airport lounge access, hotel room upgrades, and short-haul flights — the world within reach.',
    img: '/loyalty_hero_lounge.png',
    tags: ['Lounge Access', 'Hotel Upgrades', 'Short Flights'],
    accentColor: '#21E6A7',
    accentBg: 'rgba(33,230,167,0.08)',
  },
  {
    id: 'luxury',
    minPts: 1000,
    maxPts: Infinity,
    badge: 'Premium Tier',
    title: 'Luxury Without Limits',
    desc: 'Long-haul business class, five-star stays, and curated exclusive experiences in the world\'s finest destinations.',
    img: '/winity_lifestyle_travel.png',
    tags: ['Business Class', '5★ Hotels', 'Exclusive Experiences'],
    accentColor: '#E8A84E',
    accentBg: 'rgba(184,115,51,0.08)',
  },
]

// ── Quick stat badges below the calculator ───────────────────────────────────
const executiveBenefitTags = [
  'Airport Lounge Access',
  'Fitness Memberships',
  'Golf Privileges',
  'Netflix',
  'ChatGPT Premium',
  'Premium Subscriptions',
]

// ── Component ────────────────────────────────────────────────────────────────
export default function LoyaltySection() {
  const sectionRef     = useRef<HTMLElement>(null)
  const headerRef      = useRef<HTMLDivElement>(null)
  const calculatorRef  = useRef<HTMLDivElement>(null)
  const showcaseRef    = useRef<HTMLDivElement>(null)
  const prevShowcaseId = useRef<string>('')
  const imgRef         = useRef<HTMLImageElement>(null)
  const textRef        = useRef<HTMLDivElement>(null)

  const [loyaltyTier,  setLoyaltyTier]  = useState<LoyaltyTier>('exclusive')
  const [spendAmount,  setSpendAmount]  = useState(1000)
  const [showcaseIdx,  setShowcaseIdx]  = useState(0)

  const isExecutive = loyaltyTier === 'executive'
  const points      = isExecutive ? Math.floor(spendAmount / 8) : Math.floor(spendAmount / 10)

  // Determine which showcase to show
  const activeShowcase = EXPERIENCE_SHOWCASES.find(
    e => points >= e.minPts && points <= e.maxPts
  ) ?? EXPERIENCE_SHOWCASES[0]

  // When showcase changes → animate transition
  useEffect(() => {
    if (activeShowcase.id === prevShowcaseId.current) return
    prevShowcaseId.current = activeShowcase.id

    const idx = EXPERIENCE_SHOWCASES.findIndex(e => e.id === activeShowcase.id)
    setShowcaseIdx(idx)

    if (!imgRef.current || !textRef.current) return
    // Crossfade the showcase panel
    gsap.fromTo(
      [imgRef.current, textRef.current],
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.08 }
    )
  }, [activeShowcase.id])

  // Section entrance
  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headerRef.current, calculatorRef.current, showcaseRef.current],
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="loyalty"
      className="overflow-hidden relative"
      aria-label="Winity Loyalty Programme"
      style={{
        background: 'linear-gradient(180deg, #030C0C 0%, #061C1E 50%, #040E0E 100%)',
        paddingTop: 'clamp(80px, 9vw, 130px)',
        paddingBottom: 'clamp(80px, 9vw, 130px)',
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '20%', right: '-5%',
        width: 560, height: 560, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(33,230,167,0.04) 0%, transparent 68%)',
        pointerEvents: 'none',
      }} />

      <div className="container-wide relative z-10">

        {/* ── Section Header ── */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vh,72px)', opacity: 0 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14,
            fontSize: 11, fontWeight: 600, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: '#21E6A7',
          }}>
            <span style={{ display: 'inline-block', width: 24, height: 1, background: '#21E6A7' }} />
            Winity Loyalty
          </span>
          <h2 style={{
            fontSize: 'clamp(28px,4.2vw,54px)', fontWeight: 900,
            color: '#F4F7F6', letterSpacing: '-0.03em', lineHeight: 1.06,
            margin: '0 auto 14px', maxWidth: 680,
          }}>
            Points that open{' '}
            <span className="text-gradient-mint">the world.</span>
          </h2>
          <p style={{
            fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(244,247,246,0.5)',
            lineHeight: 1.7, maxWidth: 560, margin: '0 auto',
          }}>
            Every eligible purchase earns Winity Points. See exactly what you could unlock — then redeem for travel, dining, and curated lifestyle experiences.
          </p>
        </div>

        {/* ── Calculator + Live Showcase ── */}
        <div
          ref={calculatorRef}
          style={{ opacity: 0 }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
            gap: 'clamp(24px, 3.5vw, 48px)',
            alignItems: 'stretch',
          }}>

            {/* LEFT: Points Calculator */}
            <div style={{
              background: 'linear-gradient(160deg, rgba(15,63,58,0.50) 0%, rgba(6,20,20,0.70) 100%)',
              border: '1px solid rgba(33,230,167,0.12)',
              borderRadius: 22,
              padding: 'clamp(24px, 3vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}>

              {/* Tier toggle */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(33,230,167,0.6)', marginBottom: 12 }}>
                  Card Type
                </p>
                <div
                  style={{
                    display: 'inline-flex', borderRadius: 99,
                    background: 'rgba(6,12,12,0.60)', padding: 4,
                  }}
                  role="tablist"
                  aria-label="Loyalty tier"
                >
                  {(['exclusive', 'executive'] as LoyaltyTier[]).map((tier) => {
                    const active = loyaltyTier === tier
                    return (
                      <button
                        key={tier}
                        role="tab"
                        aria-selected={active}
                        onClick={() => setLoyaltyTier(tier)}
                        style={{
                          padding: '8px 20px', borderRadius: 99,
                          fontSize: 13, fontWeight: active ? 600 : 400,
                          background: active ? '#21E6A7' : 'transparent',
                          color: active ? '#061C1E' : 'rgba(244,247,246,0.55)',
                          border: 'none', cursor: 'pointer',
                          transition: 'all 0.28s cubic-bezier(0.16,1,0.3,1)',
                        }}
                      >
                        {tier.charAt(0).toUpperCase() + tier.slice(1)}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Spend slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                  <label
                    htmlFor="loyalty-spend-slider"
                    style={{ fontSize: 13, fontWeight: 600, color: 'rgba(244,247,246,0.75)' }}
                  >
                    Monthly Card Spend (USD)
                  </label>
                  <span style={{ fontSize: 18, fontWeight: 900, color: '#21E6A7' }}>
                    ${spendAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  id="loyalty-spend-slider"
                  type="range"
                  min={100} max={10000} step={50}
                  value={spendAmount}
                  onChange={(e) => setSpendAmount(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: '#21E6A7' }}
                  aria-label={`Monthly spend: $${spendAmount}`}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ fontSize: 10, color: 'rgba(244,247,246,0.35)', fontWeight: 500 }}>$100 /mo</span>
                  <span style={{ fontSize: 10, color: 'rgba(244,247,246,0.35)', fontWeight: 500 }}>$10,000 /mo</span>
                </div>
              </div>

              {/* Points result */}
              <div style={{
                background: 'rgba(6,12,12,0.65)',
                border: '1px solid rgba(33,230,167,0.12)',
                borderRadius: 16,
                padding: '20px 22px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <p style={{ fontSize: 11, color: 'rgba(244,247,246,0.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', margin: '0 0 4px' }}>
                    You earn each month
                  </p>
                  <p
                    style={{ fontSize: 'clamp(36px,4vw,48px)', fontWeight: 900, color: '#21E6A7', lineHeight: 1, margin: 0 }}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {points.toLocaleString()}
                  </p>
                  <p style={{ fontSize: 12, color: 'rgba(244,247,246,0.35)', margin: '4px 0 0' }}>
                    Winity Points · 1pt per ${isExecutive ? '8' : '10'} spent
                  </p>
                </div>
                {/* Tier progress indicator */}
                <div style={{ textAlign: 'right' }}>
                  {EXPERIENCE_SHOWCASES.map((tier, i) => (
                    <div
                      key={tier.id}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        marginBottom: 5,
                        opacity: showcaseIdx >= i ? 1 : 0.28,
                        transition: 'opacity 0.35s ease',
                      }}
                    >
                      <span style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: showcaseIdx >= i ? tier.accentColor : 'rgba(244,247,246,0.2)',
                        boxShadow: showcaseIdx >= i ? `0 0 6px ${tier.accentColor}` : 'none',
                        transition: 'all 0.35s ease',
                      }} />
                      <span style={{ fontSize: 10, fontWeight: 600, color: showcaseIdx >= i ? 'rgba(244,247,246,0.75)' : 'rgba(244,247,246,0.3)' }}>
                        {tier.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rate label */}
              <p style={{ fontSize: 11, color: 'rgba(244,247,246,0.35)', lineHeight: 1.6, margin: 0 }}>
                {isExecutive
                  ? 'Executive: 1 point per $8 spent. Includes premium benefit subscriptions and lounge access.'
                  : 'Exclusive: 1 point per $10 spent. Earn on all eligible card purchases.'}
              </p>

              {/* Executive benefits */}
              {isExecutive && (
                <div style={{
                  borderTop: '1px solid rgba(33,230,167,0.10)',
                  paddingTop: 16,
                }}>
                  <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#21E6A7', marginBottom: 10 }}>
                    Included Benefits
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {executiveBenefitTags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 11, padding: '3px 10px', borderRadius: 99,
                          background: 'rgba(33,230,167,0.08)',
                          border: '1px solid rgba(33,230,167,0.15)',
                          color: 'rgba(244,247,246,0.70)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT: Live Experience Showcase */}
            <div
              ref={showcaseRef}
              style={{
                position: 'relative',
                borderRadius: 22,
                overflow: 'hidden',
                minHeight: 420,
                opacity: 0,
              }}
            >
              {/* Background image — crossfades on tier change */}
              <img
                ref={imgRef}
                src={activeShowcase.img}
                alt={activeShowcase.title}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  willChange: 'opacity',
                  transition: 'none',
                }}
              />

              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(4,14,14,0.97) 0%, rgba(4,14,14,0.55) 45%, rgba(4,14,14,0.25) 100%)',
              }} />

              {/* Dynamic accent color overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse 90% 60% at 50% 100%, ${activeShowcase.accentBg} 0%, transparent 70%)`,
                transition: 'background 0.6s ease',
              }} />

              {/* Copper top bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${activeShowcase.accentColor}88, transparent)`,
                transition: 'background 0.6s ease',
              }} />

              {/* Content */}
              <div
                ref={textRef}
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 'clamp(20px, 3vw, 32px)',
                  willChange: 'opacity, transform',
                }}
              >
                {/* Active badge */}
                <div style={{ marginBottom: 12 }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '5px 12px', borderRadius: 99,
                    background: `${activeShowcase.accentBg}`,
                    border: `1px solid ${activeShowcase.accentColor}40`,
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: activeShowcase.accentColor,
                    transition: 'all 0.4s ease',
                  }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: activeShowcase.accentColor,
                      boxShadow: `0 0 6px ${activeShowcase.accentColor}`,
                    }} />
                    {activeShowcase.badge}
                  </span>
                </div>

                <h3 style={{
                  fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 900,
                  color: '#F4F7F6', letterSpacing: '-0.02em',
                  lineHeight: 1.12, margin: '0 0 10px',
                }}>
                  {activeShowcase.title}
                </h3>

                <p style={{
                  fontSize: 13, color: 'rgba(244,247,246,0.65)',
                  lineHeight: 1.65, margin: '0 0 16px',
                  maxWidth: 380,
                }}>
                  {activeShowcase.desc}
                </p>

                {/* Reward tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 16 }}>
                  {activeShowcase.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 11, padding: '4px 11px', borderRadius: 99,
                        background: 'rgba(6,28,30,0.75)',
                        border: '1px solid rgba(255,255,255,0.10)',
                        color: 'rgba(244,247,246,0.75)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Points needed label */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '8px 14px', borderRadius: 12,
                  background: 'rgba(6,12,12,0.75)',
                  border: `1px solid ${activeShowcase.accentColor}25`,
                  backdropFilter: 'blur(10px)',
                  width: 'fit-content',
                }}>
                  <span style={{ fontSize: 11, color: 'rgba(244,247,246,0.45)', fontWeight: 500 }}>
                    Current rate:
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 900, color: activeShowcase.accentColor }}>
                    {points.toLocaleString()} pts/mo
                  </span>
                  <span style={{ fontSize: 11, color: 'rgba(244,247,246,0.35)' }}>
                    @ ${spendAmount.toLocaleString()} spend
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Tier progress bar */}
          <div style={{
            marginTop: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '14px 18px',
            borderRadius: 14,
            background: 'rgba(6,12,12,0.50)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(244,247,246,0.35)', marginRight: 4, whiteSpace: 'nowrap' }}>
              Unlock tier:
            </span>
            <div style={{ flex: 1, display: 'flex', gap: 6 }}>
              {EXPERIENCE_SHOWCASES.map((tier, i) => (
                <div
                  key={tier.id}
                  style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}
                >
                  <div style={{
                    height: 3, borderRadius: 99,
                    background: showcaseIdx >= i
                      ? `linear-gradient(90deg, ${tier.accentColor}cc, ${tier.accentColor}66)`
                      : 'rgba(255,255,255,0.07)',
                    transition: 'background 0.4s ease',
                    boxShadow: showcaseIdx >= i ? `0 0 6px ${tier.accentColor}55` : 'none',
                  }} />
                  <span style={{
                    fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.10em',
                    color: showcaseIdx >= i ? 'rgba(244,247,246,0.60)' : 'rgba(244,247,246,0.20)',
                    transition: 'color 0.4s ease',
                  }}>
                    {tier.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fine print disclaimer */}
          <p style={{
            fontSize: 10, color: 'rgba(244,247,246,0.28)',
            lineHeight: 1.6, marginTop: 14, textAlign: 'center',
          }}>
            * Points shown are for illustrative purposes only and represent estimated monthly earnings at the selected spend level.
            Actual points earned may vary. Reward redemption is subject to availability, partner terms, and Winity Life's{' '}
            <a href="https://winity.life/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(33,230,167,0.5)', textDecoration: 'none' }}>
              full terms &amp; conditions
            </a>.
          </p>
        </div>

        {/* ── CTA row ── */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 48, flexWrap: 'wrap' }}>
          <Link
            to="/loyalty"
            className="btn-pill"
            style={{ padding: '12px 16px 12px 26px', fontSize: 14 }}
            aria-label="Explore Full Loyalty Programme"
          >
            Explore Full Loyalty Programme
            <span className="pill-icon" style={{ width: 30, height: 30 }} aria-hidden="true">
              <svg width="12" height="12" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
              </svg>
            </span>
          </Link>
          <a
            href="https://apps.apple.com/us/app/winity-life/id6752761057"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-outline"
            style={{ padding: '12px 16px 12px 26px', fontSize: 14 }}
          >
            Download the App
            <span className="pill-icon" style={{ width: 30, height: 30 }} aria-hidden="true">
              <svg width="12" height="12" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
              </svg>
            </span>
          </a>
        </div>

      </div>
    </section>
  )
}
