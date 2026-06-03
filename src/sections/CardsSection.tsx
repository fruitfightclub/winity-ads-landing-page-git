/**
 * CardsSection — Winity Life | Emerald Noir
 * Full-width immersive card comparison.
 * Philosophy: Dark Precision — copper accents, glassmorphism, surgical layout.
 */
import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CardData {
  id: string
  name: string
  tagline: string
  description: string
  image: string
  badge: string
  badgeColor: string
  annualFee: string
  feeNote: string
  pointsRate: number
  pointsLabel: string
  features: { label: string; value: string }[]
  isExecutive: boolean
  accentColor: string
  glowColor: string
  ctaLink: string
}

const CARDS: CardData[] = [
  {
    id: 'exclusive-virtual',
    name: 'Exclusive Virtual',
    tagline: 'Your global companion.',
    description: 'Live everywhere, pay anywhere. Virtual card issued upon KYC approval. Google Pay ready from day one.',
    image: 'https://winity.life/wp-content/uploads/2025/11/Exclusive-Virtual.webp',
    badge: 'Virtual',
    badgeColor: '#21E6A7',
    annualFee: 'USD 20/yr',
    feeNote: 'First 6 months free',
    pointsRate: 1 / 10,
    pointsLabel: '1 pt / $10',
    features: [
      { label: 'Issuance',    value: 'Virtual (upon KYC)' },
      { label: 'Pay',         value: 'Google Pay ready' },
      { label: 'Merchants',   value: '150M+ worldwide' },
      { label: 'Rewards',     value: '1 pt / $10 spent' },
      { label: 'Support',     value: '24/7 WhatsApp' },
      { label: 'ATM',         value: '—' },
    ],
    isExecutive: false,
    accentColor: '#21E6A7',
    glowColor: 'rgba(33,230,167,0.18)',
    ctaLink: '/exclusive',
  },
  {
    id: 'exclusive-physical',
    name: 'Exclusive Physical',
    tagline: 'Premium plastic, global reach.',
    description: 'Everything virtual offers, plus a premium physical card in your wallet, ready at the ATM.',
    image: 'https://winity.life/wp-content/uploads/2025/11/Exclusive-Physical.webp',
    badge: 'Physical',
    badgeColor: '#21E6A7',
    annualFee: 'USD 20/yr',
    feeNote: 'Free physical issuance (limited)',
    pointsRate: 1 / 10,
    pointsLabel: '1 pt / $10',
    features: [
      { label: 'Issuance',    value: 'Physical card*' },
      { label: 'Pay',         value: 'Google Pay ready' },
      { label: 'Merchants',   value: '150M+ worldwide' },
      { label: 'Rewards',     value: '1 pt / $10 spent' },
      { label: 'Support',     value: '24/7 WhatsApp' },
      { label: 'ATM',         value: 'Cash withdrawal' },
    ],
    isExecutive: false,
    accentColor: '#21E6A7',
    glowColor: 'rgba(33,230,167,0.18)',
    ctaLink: '/exclusive',
  },
  {
    id: 'executive',
    name: 'Executive Metal',
    tagline: 'For those who demand more.',
    description: 'The premium brushed metal card: faster earning, curated luxury privileges, and up to 5 additional cards.',
    image: 'https://winity.life/wp-content/uploads/2025/11/ExecutiveMetalNoVisa.webp',
    badge: 'Metal',
    badgeColor: '#E8A84E',
    annualFee: 'USD 1,000/yr',
    feeNote: 'Premium tier',
    pointsRate: 1 / 8,
    pointsLabel: '1 pt / $8',
    features: [
      { label: 'Issuance',    value: 'Brushed metal' },
      { label: 'Pay',         value: 'Google Pay ready' },
      { label: 'Merchants',   value: '150M+ worldwide' },
      { label: 'Rewards',     value: '1 pt / $8 spent' },
      { label: 'Support',     value: 'Priority concierge' },
      { label: 'ATM',         value: 'Cash withdrawal' },
    ],
    isExecutive: true,
    accentColor: '#21E6A7',
    glowColor: 'rgba(33,230,167,0.18)',
    ctaLink: '/executive',
  },
]

function calcPoints(spend: number, rate: number) {
  return Math.floor(spend * rate)
}

export default function CardsSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const headerRef    = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(1) // default: physical
  const [spend, setSpend]   = useState(2000)

  const card = CARDS[active]

  // ── Scroll entrance ────────────────────────────────────────────────
  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true } }
      )
      gsap.fromTo('.cards-row-item',
        { opacity: 0, y: 50, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.cards-row', start: 'top 80%', once: true } }
      )
      gsap.fromTo('.cards-detail-panel',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.cards-detail-panel', start: 'top 82%', once: true } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // ── Detail panel fade on card change ──────────────────────────────
  const panelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!panelRef.current) return
    gsap.fromTo(panelRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    )
  }, [active])

  const prev = useCallback(() => setActive(i => (i - 1 + CARDS.length) % CARDS.length), [])
  const next = useCallback(() => setActive(i => (i + 1) % CARDS.length), [])

  // Touch
  const tx = useRef(0)
  const onTouchStart = (e: React.TouchEvent) => { tx.current = e.changedTouches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    const d = tx.current - e.changedTouches[0].clientX
    if (Math.abs(d) > 44) d > 0 ? next() : prev()
  }

  return (
    <section
      ref={sectionRef}
      id="winitycards"
      aria-label="Choose Your Card"
      style={{
        position: 'relative',
        padding: '100px 0 120px',
        overflow: 'hidden',
        fontFamily: 'Roboto, sans-serif',
        background: active === 0 ? '#021211' : active === 1 ? '#011114' : '#0F0B06',
        transition: 'background 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
    >
      {/* ── Dynamic Active Card Background Gradients ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {/* Default solid dark base */}
        <div style={{
          position: 'absolute', inset: 0,
          background: active === 0 ? '#021211' : active === 1 ? '#011114' : '#0F0B06',
          transition: 'background 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
        }} />
        
        {/* Virtual Glow (Active = 0) - Emerald Green */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(33,230,167,0.18) 0%, rgba(2,18,17,0) 70%)',
          opacity: active === 0 ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
        }} />

        {/* Physical Glow (Active = 1) - Rich Teal */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(60,242,208,0.14) 0%, rgba(1,17,20,0) 70%)',
          opacity: active === 1 ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
        }} />

        {/* Executive Glow (Active = 2) - Premium Bronze */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(232,168,78,0.18) 0%, rgba(15,11,6,0) 70%)',
          opacity: active === 2 ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
        }} />
      </div>

      <style>{`
        .card-thumb {
          cursor: pointer;
          transition: transform 0.5s cubic-bezier(0.25,1,0.5,1), box-shadow 0.5s ease, filter 0.35s ease, opacity 0.4s ease;
        }
        .card-thumb:hover { transform: translateY(-10px) scale(1.04); filter: brightness(1.1); }
        .card-thumb.is-active {
          transform: translateY(-16px) scale(1.09);
          filter: brightness(1.12);
        }
        .card-thumb.is-inactive { opacity: 0.42; transform: scale(0.9); filter: brightness(0.8); }
        .card-thumb.is-inactive:hover { opacity: 0.75; transform: scale(0.95) translateY(-6px); filter: brightness(1.0); }
        .spend-range { -webkit-appearance: none; appearance: none; height: 3px; border-radius: 2px; outline: none; cursor: pointer; }
        .spend-range::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #21E6A7; cursor: pointer; box-shadow: 0 0 12px rgba(33,230,167,0.4); }
        .spend-range-exec::-webkit-slider-thumb { background: #E8A84E; box-shadow: 0 0 12px rgba(232,168,78,0.4); }
        .feat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .feat-row:last-child { border-bottom: none; }
        @media (max-width: 900px) {
          .cards-layout { flex-direction: column !important; }
          .cards-detail-panel { width: 100% !important; }
        }
        @media (max-width: 900px) {
          /* ── Center stacked panels ── */
          .cards-feat-panel {
            max-width: min(480px, 100%);
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .cards-detail-panel {
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
        @media (max-width: 768px) {
          /* ── Mobile single-card carousel ── */
          .cards-row-item.is-inactive {
            display: none !important;
          }
          .cards-row-item {
            width: min(72vw, 280px) !important;
          }
          .card-thumb.is-active {
            transform: translateY(-6px) scale(1.05) !important;
            filter: brightness(1.1) !important;
          }
          /* ── Tighten header spacing ── */
          .cards-mobile-header { margin-bottom: 36px !important; }
          /* ── Redemption grid 2-col on small screens ── */
          .cards-redeem-grid { grid-template-columns: repeat(2,1fr) !important; }
          .cards-redeem-tile { height: 64px !important; }
        }
        @media (max-width: 640px) {
          /* Detail panel must be full-width on phones — prevents min-width overflow */
          .cards-detail-panel { width: 100% !important; min-width: 0 !important; }
          /* Feature panel also full-width */
          .cards-feat-panel { width: 100% !important; max-width: 100% !important; }
        }
      `}</style>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1240, margin: '0 auto', paddingInline: 'clamp(20px, 5vw, 60px)' }}>

        {/* ── Header ── */}
        <div ref={headerRef} className="cards-mobile-header" style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{
            display: 'inline-block', marginBottom: 16,
            fontSize: 11, fontWeight: 600, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: '#21E6A7',
          }}>
            Choose Your Card
          </span>
          <h2 style={{
            fontSize: 'clamp(24px, 3.2vw, 44px)',
            fontWeight: 800, letterSpacing: '-0.03em',
            color: '#F4F7F6', lineHeight: 1.06, margin: 0,
          }}>
            Pick your card. Start free.
          </h2>
          <p style={{ color: 'rgba(244,247,246,0.45)', marginTop: 16, fontSize: 15, maxWidth: 480, marginInline: 'auto' }}>
            One Visa network, three tiers: from virtual-first to brushed metal. Upgrade any time, no lock-in.
          </p>
        </div>

        {/* ── Card thumbnails row ── */}
        <div
          className="cards-row"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(16px, 3vw, 40px)', marginBottom: 64, perspective: 1200 }}
        >
          {CARDS.map((c, i) => (
            <div
              key={c.id}
              className={`cards-row-item card-thumb${i === active ? ' is-active' : ' is-inactive'}`}
              onClick={() => setActive(i)}
              role="button"
              tabIndex={0}
              aria-pressed={i === active}
              onKeyDown={(e) => e.key === 'Enter' && setActive(i)}
              style={{
                width: 'clamp(140px, 18vw, 240px)',
                borderRadius: 16,
                overflow: 'hidden',
                border: i === active
                  ? `2px solid ${c.accentColor}70`
                  : '2px solid rgba(255,255,255,0.06)',
                boxShadow: i === active ? `0 24px 60px rgba(0,0,0,0.6), 0 0 40px ${c.glowColor}` : '0 12px 30px rgba(0,0,0,0.4)',
                background: '#0B2E2C',
                position: 'relative',
                transition: 'all 0.5s cubic-bezier(0.25,1,0.5,1)',
              }}
            >
              <img src={c.image} alt={c.name} style={{ width: '100%', display: 'block' }} draggable={false} />
              {/* Card name label */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '24px 14px 14px',
                background: 'linear-gradient(to top, rgba(4,14,14,0.96) 0%, transparent 100%)',
              }}>
                <span style={{
                  display: 'inline-block', padding: '3px 10px', borderRadius: 20,
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                  color: c.badgeColor, border: `1px solid ${c.badgeColor}40`,
                  background: `${c.badgeColor}12`,
                }}>
                  {c.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Nav dots ── */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 60 }}>
          <button onClick={prev} aria-label="Previous card" style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(15,63,58,0.8)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7L9 3" stroke="#F4F7F6" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          {CARDS.map((c, i) => (
            <button key={c.id} onClick={() => setActive(i)} aria-label={`Select ${c.name}`}
              style={{
                borderRadius: 999, border: 'none', cursor: 'pointer',
                width: i === active ? 28 : 8, height: 8,
                background: i === active ? card.accentColor : 'rgba(244,247,246,0.18)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
          <button onClick={next} aria-label="Next card" style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(15,63,58,0.8)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3L9 7L5 11" stroke="#F4F7F6" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* ── Detail layout ── */}
        <div
          className="cards-layout"
          style={{ display: 'flex', gap: 'clamp(24px, 4vw, 56px)', alignItems: 'flex-start' }}
        >
          {/* LEFT: feature table */}
          <div className="cards-feat-panel" style={{
            flex: 1,
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'linear-gradient(160deg, rgba(11,46,44,0.7) 0%, rgba(6,20,20,0.85) 100%)',
            backdropFilter: 'blur(20px)',
            overflow: 'hidden',
          }}>
            {/* Copper top bar */}
            <div style={{ height: 3, background: `linear-gradient(90deg, ${card.accentColor}00, ${card.accentColor}, ${card.accentColor}00)` }} />
            <div style={{ padding: 'clamp(24px, 3vw, 36px)' }}>
              <p style={{ color: 'rgba(244,247,246,0.35)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 24 }}>
                Card Features
              </p>
              {card.features.map((f) => (
                <div key={f.label} className="feat-row" style={{ padding: '14px 0' }}>
                  <span style={{ color: 'rgba(244,247,246,0.5)', fontSize: 13 }}>{f.label}</span>
                  <span style={{ color: f.value === '—' ? 'rgba(244,247,246,0.2)' : '#F4F7F6', fontSize: 13, fontWeight: 600, textAlign: 'right' }}>
                    {f.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: detail panel */}
          <div
            ref={panelRef}
            className="cards-detail-panel"
            style={{ width: 'clamp(280px, 42%, 440px)', flexShrink: 0 }}
          >
            {/* Card name + fee */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase', padding: '4px 14px', borderRadius: 20,
                  color: card.accentColor,
                  border: `1px solid ${card.accentColor}40`,
                  background: `${card.accentColor}10`,
                }}>
                  {card.annualFee}
                </span>
                <span style={{ fontSize: 12, color: 'rgba(244,247,246,0.35)' }}>{card.feeNote}</span>
              </div>
              <h3 style={{
                fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800,
                color: '#F4F7F6', letterSpacing: '-0.025em', lineHeight: 1.1,
                marginBottom: 10,
              }}>
                {card.name}
              </h3>
              <p style={{ color: 'rgba(244,247,246,0.5)', fontSize: 15, lineHeight: 1.65 }}>
                {card.description}
              </p>
            </div>

            {/* Points calculator */}
            <div style={{
              borderRadius: 16, padding: 24, marginBottom: 28,
              border: `1px solid ${card.accentColor}20`,
              background: `linear-gradient(135deg, ${card.accentColor}08 0%, rgba(6,20,20,0.6) 100%)`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: card.accentColor }}>
                  Points Calculator
                </span>
                <span style={{ fontSize: 12, color: 'rgba(244,247,246,0.4)' }}>{card.pointsLabel}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: 'rgba(244,247,246,0.45)' }}>Monthly spend</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#F4F7F6' }}>${spend.toLocaleString()}</span>
              </div>
              <input
                type="range" min={0} max={12000} step={100} value={spend}
                onChange={(e) => setSpend(Number(e.target.value))}
                aria-label="Monthly spend"
                className={`spend-range${card.isExecutive ? ' spend-range-exec' : ''}`}
                style={{
                  width: '100%', marginBottom: 16,
                  background: `linear-gradient(to right, ${card.accentColor} 0%, ${card.accentColor} ${(spend / 12000) * 100}%, rgba(244,247,246,0.1) ${(spend / 12000) * 100}%, rgba(244,247,246,0.1) 100%)`,
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
                <div>
                  <p style={{ fontSize: 12, color: 'rgba(244,247,246,0.35)', marginBottom: 4 }}>Points / month</p>
                  <p style={{ fontSize: 32, fontWeight: 900, color: card.accentColor, lineHeight: 1 }}
                    aria-live="polite">
                    {calcPoints(spend, card.pointsRate).toLocaleString()}
                    <span style={{ fontSize: 14, fontWeight: 500, marginLeft: 6, color: `${card.accentColor}80` }}>pts</span>
                  </p>
                </div>
                {card.isExecutive && (
                  <span style={{
                    fontSize: 11, padding: '4px 12px', borderRadius: 20,
                    border: '1px solid rgba(33,230,167,0.3)', color: '#21E6A7',
                    background: 'rgba(33,230,167,0.08)',
                  }}>Best earn rate</span>
                )}
              </div>

              {/* Redemption categories */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
                <p style={{ fontSize: 10, color: 'rgba(244,247,246,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Redeem for
                </p>
                <div className="cards-redeem-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
                  {[
                    { label: 'Flights', img: '/winity_lifestyle_travel.png' },
                    { label: 'Lounges', img: '/winity_lifestyle_lounge.jpg' },
                    { label: 'Dining',  img: '/winity_lifestyle_dining.jpg' },
                    { label: 'Retail',  img: '/winity_lifestyle_art.jpg' },
                  ].map(({ label, img }) => (
                    <div key={label} className="cards-redeem-tile" style={{
                      borderRadius: 8, overflow: 'hidden', position: 'relative',
                      height: 50, cursor: 'default',
                    }}>
                      <img src={img} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.45)' }} />
                      <div style={{
                        position: 'absolute', inset: 0, display: 'flex',
                        alignItems: 'flex-end', padding: '5px 5px',
                        background: 'linear-gradient(to top, rgba(6,20,20,0.8) 0%, transparent 60%)',
                      }}>
                        <span style={{ fontSize: 9, fontWeight: 700, color: '#F4F7F6', letterSpacing: '0.04em' }}>{label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              to={card.ctaLink}
              className="btn-pill"
              style={{ width: '100%', justifyContent: 'center', padding: '13px 18px 13px 26px', fontSize: 15 }}
            >
              Apply for {card.name}
              <span className="pill-icon" aria-hidden="true">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
                </svg>
              </span>
            </Link>

            <Link to="/exclusive" style={{
              display: 'block', textAlign: 'center', marginTop: 14,
              fontSize: 13, color: 'rgba(244,247,246,0.35)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
              className="hover:text-mint"
            >
              Compare all cards →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
