/**
 * ---
 * client: Winity Life
 * philosophy: Emerald Noir
 * deliverable: ExperiencePanels — full-screen hover, parallax images, story-driven scroll
 * phase: 6
 * date: 2026-05-28
 * status: Draft
 * ---
 *
 * ExperiencePanels — Emerald Noir
 * ─────────────────────────────────────────────────────────────────────
 * Desktop:
 *   — Resting: 3 equal panels, only the panel TITLE overlaid on image
 *   — Hover: active panel expands to ~85% width (near full-screen feel),
 *            glassmorphism card slides up with subheadline + body + CTA
 *   — Compressed: thin slivers with rotated vertical label
 *
 * Mobile:
 *   — Stacked cards, tap to expand / collapse content
 *
 * Image parallax via GSAP ScrollTrigger (independent y movement).
 * ─────────────────────────────────────────────────────────────────────
 */
import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

// ─── Types ────────────────────────────────────────────────────────────────────

interface PanelData {
  id: string
  number: string
  title: string
  subheadline: string
  body: string
  cta: string
  ctaLink: string
  external?: boolean
  image: string
  bgBase: string
}

// ─── Panel data ───────────────────────────────────────────────────────────────

const panels: PanelData[] = [
  {
    id: 'benefits',
    number: '01',
    title: 'Member Benefits',
    subheadline: 'Earn on every spend. Redeem where it counts.',
    body: 'Earn rewards on every spend and unlock premier access: 24/7 dedicated member services, the Winity Loop referral program, and exclusive discounts with curated lifestyle partners worldwide.',
    cta: 'Explore rewards',
    ctaLink: '/loyalty',
    image: '/winity_lifestyle_lounge.webp',
    bgBase: '#0B2E2C',
  },
  {
    id: 'cards',
    number: '02',
    title: 'Winity Cards',
    subheadline: 'Start free. Upgrade when you\'re ready.',
    body: 'The Exclusive virtual card is issued upon KYC approval, Google Pay ready, and accepted at 150M+ Visa merchant locations worldwide. The Executive metal card unlocks a faster earn rate and premium perks for high-volume travellers.',
    cta: 'Compare cards',
    ctaLink: '/exclusive',
    image: '/exp_cards_closeup.webp',
    bgBase: '#061C1E',
  },
  {
    id: 'lifestyle',
    number: '03',
    title: 'Winity Life',
    subheadline: 'Built for people who live without borders.',
    body: 'Dinner in Tokyo, art fairs in Basel, sunsets in Dubai. Your Winity card earns on every purchase and travels with you through 180+ countries, all managed from one app, 24/7.',
    cta: 'Download the app',
    ctaLink: 'https://apps.apple.com/us/app/winity-life/id6752761057',
    external: true,
    image: '/winity_lifestyle_art.webp',
    bgBase: '#0F3F3A',
  },
]

// ─── CTA button ──────────────────────────────────────────────────────────────

function PanelCTA({ label, href, external }: { label: string; href: string; external?: boolean }) {
  const style: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '10px 20px', borderRadius: 50,
    background: 'linear-gradient(135deg, rgba(33,230,167,0.18) 0%, rgba(15,63,58,0.65) 100%)',
    border: '1px solid rgba(33,230,167,0.40)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    color: '#21E6A7', fontSize: 13, fontWeight: 600, letterSpacing: '0.02em',
    textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap' as const,
    transition: 'all 0.3s ease',
  }

  const inner = <>{label}<ArrowRight size={14} /></>

  const hoverOn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    el.style.background = 'linear-gradient(135deg, rgba(33,230,167,0.30) 0%, rgba(15,63,58,0.85) 100%)'
    el.style.borderColor = 'rgba(33,230,167,0.65)'
    el.style.boxShadow   = '0 0 24px rgba(33,230,167,0.22)'
  }
  const hoverOff = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget
    el.style.background = 'linear-gradient(135deg, rgba(33,230,167,0.18) 0%, rgba(15,63,58,0.65) 100%)'
    el.style.borderColor = 'rgba(33,230,167,0.40)'
    el.style.boxShadow   = 'none'
  }

  if (external) return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={style} onMouseEnter={hoverOn} onMouseLeave={hoverOff}
    >{inner}</a>
  )
  return (
    <Link to={href} style={style} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
      {inner}
    </Link>
  )
}

// ─── ExperiencePanels ─────────────────────────────────────────────────────────

export default function ExperiencePanels() {
  const sectionRef  = useRef<HTMLElement>(null)
  const panelRefs   = useRef<(HTMLDivElement | null)[]>([])
  const headerRef   = useRef<HTMLDivElement>(null)
  const imgRefs     = useRef<(HTMLImageElement | null)[]>([])

  const [activeIndex,  setActiveIndex]  = useState<number | null>(null)
  const [mobileActive, setMobileActive] = useState<number | null>(null)
  const [isMobile,     setIsMobile]     = useState(false)

  // ── Detect mobile ─────────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches)
    update(mq)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // ── GSAP: scroll entrance + image parallax ────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true } }
        )
      }

      // Panel entrance
      const validPanels = panelRefs.current.filter(Boolean) as HTMLDivElement[]
      if (validPanels.length) {
        gsap.fromTo(validPanels,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.14, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true } }
        )
      }

      // Parallax — image moves at ~60% scroll speed vs container (30% range)
      validPanels.forEach((panel, i) => {
        const img = imgRefs.current[i]
        if (!img) return
        gsap.fromTo(img,
          { yPercent: -12 },
          { yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const current = isMobile ? mobileActive : activeIndex

  return (
    <section
      ref={sectionRef}
      className="bg-deep-base py-24 overflow-hidden"
      aria-label="The Winity Life Experience"
    >
      <style>{`
        /* ── ExperiencePanels CSS ──────────────────────────────────────────── */
        .ep-panel {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          cursor: pointer;
          outline: none;
        }
        .ep-panel:focus-visible {
          box-shadow: 0 0 0 2px rgba(33,230,167,0.5);
        }

        /* Desktop expand / compress transitions */
        @media (min-width: 768px) {
          .ep-panel {
            transition: flex 700ms cubic-bezier(0.4,0,0.2,1),
                        box-shadow 500ms ease;
          }
        }

        /* Vertical label on compressed panels */
        .ep-compressed-label {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 30;
        }
        .ep-compressed-label span {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          color: rgba(244,247,246,0.45);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        /* Resting title — bold, overlaid directly on image */
        .ep-resting-title {
          position: absolute;
          bottom: 28px;
          left: 28px;
          right: 28px;
          z-index: 30;
          transition: opacity 360ms ease, transform 360ms ease;
        }
        .ep-resting-title h3 {
          font-size: clamp(22px, 2.6vw, 34px);
          font-weight: 700;
          color: #F4F7F6;
          letter-spacing: -0.025em;
          line-height: 1.1;
          text-shadow: 0 2px 24px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.6);
          margin: 0;
        }

        /* Number badge — top-left */
        .ep-number {
          position: absolute;
          top: 22px;
          left: 24px;
          z-index: 30;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(33,230,167,0.7);
          transition: opacity 400ms ease;
        }

        /* Glassmorphism content card — slides up on active */
        .ep-content-card {
          position: absolute;
          bottom: 24px;
          left: 24px;
          right: 24px;
          z-index: 30;
          background: rgba(6,28,30,0.74);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border: 1px solid rgba(33,230,167,0.45);
          border-radius: 16px;
          padding: 20px 22px 22px;
          box-shadow: 0 14px 44px rgba(33,230,167,0.12), inset 0 1px 0 rgba(33,230,167,0.14);
          transition: opacity 400ms ease, transform 440ms cubic-bezier(0.25,1,0.5,1);
        }
        .ep-content-card .ep-sub {
          font-size: 14px;
          font-weight: 600;
          color: #A8D8C8;
          letter-spacing: -0.005em;
          margin-bottom: 10px;
          line-height: 1.45;
        }
        .ep-content-card .ep-body {
          font-size: 14px;
          line-height: 1.68;
          color: rgba(200,221,216,0.86);
          margin-bottom: 16px;
        }
        .ep-content-card .ep-title-sm {
          font-size: clamp(15px, 1.3vw, 18px);
          font-weight: 700;
          color: #F4F7F6;
          letter-spacing: -0.015em;
          margin-bottom: 8px;
        }

        /* Mobile stacked cards */
        @media (max-width: 767px) {
          .ep-resting-title { bottom: 22px; left: 20px; right: 20px; }
          .ep-resting-title h3 { font-size: 22px; }
          .ep-content-card { bottom: 18px; left: 18px; right: 18px; }
        }
      `}</style>

      <div className="container-wide">

        {/* ── Section header ── */}
        <div ref={headerRef} className="mb-14 max-w-2xl">
          <p className="text-eyebrow mb-4">The Winity Life Experience</p>
          <h2 className="text-h2 text-off-white">
            Freedom in <span className="text-gradient-mint">motion.</span>
          </h2>
        </div>

        {/* ── Panel row ── */}
        <div
          className={cn(
            'flex gap-3',
            'flex-col md:flex-row',
            'min-h-[280px] md:min-h-[600px]',
          )}
          role="list"
        >
          {panels.map((panel, i) => {
            const isActive     = current === i
            const isCompressed = current !== null && !isActive

            return (
              <div
                key={panel.id}
                ref={(el) => { panelRefs.current[i] = el }}
                role="listitem"
                className="ep-panel"
                style={{
                  background: panel.bgBase,
                  // Desktop: active expands dramatically, compressed slivers
                  flex: isMobile
                    ? '1 1 auto'
                    : isActive
                      ? '4.2 1 0%'
                      : isCompressed
                        ? '0.28 1 0%'
                        : '1 1 0%',
                  minHeight: isMobile
                    ? isActive ? '520px' : '300px'
                    : undefined,
                  boxShadow: isActive
                    ? 'inset 0 0 0 1px rgba(33,230,167,0.22), 0 0 60px rgba(33,230,167,0.08)'
                    : '0 0 0 1px rgba(255,255,255,0.04)',
                }}
                onMouseEnter={() => !isMobile && setActiveIndex(i)}
                onMouseLeave={() => !isMobile && setActiveIndex(null)}
                onFocus={() => !isMobile && setActiveIndex(i)}
                onBlur={() => !isMobile && setActiveIndex(null)}
                onClick={() => isMobile && setMobileActive(mobileActive === i ? null : i)}
                tabIndex={0}
                aria-expanded={isActive}
              >

                {/* ── Image with parallax ── */}
                <img
                  ref={(el) => { imgRefs.current[i] = el }}
                  src={panel.image}
                  alt=""
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '125%',         // extra height for parallax room
                    top: '-12%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    willChange: 'transform',
                    transition: 'transform 700ms ease',
                    transform: isActive ? 'scale(1.05)' : 'scale(1.0)',
                  }}
                />

                {/* ── Gradient overlay ── */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute', inset: 0, zIndex: 10,
                    background: isCompressed
                      ? 'rgba(6,28,30,0.88)'
                      : isActive
                        ? 'linear-gradient(to top, rgba(6,28,30,0.97) 0%, rgba(6,28,30,0.55) 45%, rgba(6,28,30,0.08) 85%, transparent 100%)'
                        : 'linear-gradient(to top, rgba(6,28,30,0.94) 0%, rgba(6,28,30,0.52) 48%, rgba(6,28,30,0.1) 80%, transparent 100%)',
                    transition: 'background 600ms ease',
                  }}
                />

                {/* ── Compressed: vertical label ── */}
                {isCompressed && !isMobile && (
                  <div className="ep-compressed-label" aria-hidden="true">
                    <span>{panel.title}</span>
                  </div>
                )}

                {/* ── Panel number ── */}
                {!isCompressed && (
                  <div className="ep-number" aria-hidden="true">
                    {panel.number}
                  </div>
                )}

                {/* ── Resting title (no card) — fades out when active ── */}
                {!isCompressed && (
                  <div
                    className="ep-resting-title"
                    style={{
                      opacity: isActive ? 0 : 1,
                      transform: isActive ? 'translateY(8px)' : 'translateY(0)',
                      pointerEvents: 'none',
                    }}
                  >
                    <h3>{panel.title}</h3>
                  </div>
                )}

                {/* ── Active: glassmorphism content card ── */}
                {!isCompressed && (
                  <div
                    className="ep-content-card"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    <p className="ep-title-sm">{panel.title}</p>
                    <p className="ep-sub">{panel.subheadline}</p>
                    <p className="ep-body">{panel.body}</p>
                    <PanelCTA label={panel.cta} href={panel.ctaLink} external={panel.external} />
                  </div>
                )}

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
