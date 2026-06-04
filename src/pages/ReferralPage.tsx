/**
 * ---
 * client: Winity Life
 * philosophy: Emerald Noir
 * colors:
 *   primary: "#0B2E2C"
 *   accent: "#21E6A7"
 *   base: "#071E20"
 * deliverable: Referral Programme (Winity Loop) — Premium Dark Rebuild
 * phase: 6
 * date: 2026-05-27
 * status: Draft
 * skills_used: tss-master, tss-frontend-pro, tss-creative-components, ag-scroll-reveal
 * ---
 *
 * REFERRAL PAGE — Premium inline-style rebuild
 * Matches Emerald Noir dark aesthetic of the rest of the site.
 * Winity Points language throughout — zero dollar amount references.
 * Arch hero background. Keep LoopCanvas network diagram.
 * UMI section mentions Winity Club data discount.
 */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Users, Repeat2, TrendingUp, Wifi, ExternalLink, Gift } from 'lucide-react'
import SEO from '../components/SEO'

gsap.registerPlugin(ScrollTrigger, SplitText)

// ─── Palette ──────────────────────────────────────────────────────────────────
const MINT    = '#21E6A7'
const MINT_HI = '#3CF2D0'
const UMI_CLUB_URL = 'https://umi.app/winity'   // TODO: confirm with client

// ─── Grain overlay ────────────────────────────────────────────────────────────
const GrainOverlay = ({ id = 'grain', opacity = 0.035 }: { id?: string; opacity?: number }) => (
  <svg
    aria-hidden="true"
    style={{
      pointerEvents: 'none', position: 'absolute', inset: 0,
      width: '100%', height: '100%', zIndex: 10,
      mixBlendMode: 'overlay' as const, opacity,
    }}
  >
    <filter id={id}>
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter={`url(#${id})`} />
  </svg>
)

const Label = ({ text }: { text: string }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 8,
    fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const,
    color: MINT, marginBottom: 20,
  }}>
    <span style={{ display: 'inline-block', width: 24, height: 1, background: MINT }} />
    {text}
  </span>
)

// ─── Canvas: three-level network diagram (unchanged — it's good) ──────────────
function LoopCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const timeRef   = useRef(0)
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let S = 0

    const resize = () => {
      const container = canvas.parentElement
      S = Math.min(container ? container.offsetWidth : 440, 440)
      canvas.style.width  = `${S}px`
      canvas.style.height = `${S}px`
      canvas.width  = S * dpr
      canvas.height = S * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    let isVisible = false
    const YOU_FY = 0.13
    const L1_FY  = 0.43
    const L2_FY  = 0.75
    const L1_FXS = [0.17, 0.50, 0.83]
    const L2_FXS = [0.06, 0.30, 0.40, 0.60, 0.70, 0.94]
    const L2_PAR = [0, 0, 1, 1, 2, 2]

    interface Particle { segIdx: number; t: number; speed: number }
    const particles: Particle[] = [
      ...L2_FXS.map((_, i) => ({ segIdx: i,     t: i / 6,           speed: 0.0026 + (i % 3) * 0.0006 })),
      ...L1_FXS.map((_, i) => ({ segIdx: 6 + i, t: 0.28 + i * 0.32, speed: 0.0035 + i * 0.0005 })),
    ]

    const getSegment = (segIdx: number, s: number) => {
      if (segIdx < 6) return { x1: L2_FXS[segIdx] * s, y1: L2_FY * s, x2: L1_FXS[L2_PAR[segIdx]] * s, y2: L1_FY * s }
      return { x1: L1_FXS[segIdx - 6] * s, y1: L1_FY * s, x2: 0.50 * s, y2: YOU_FY * s }
    }

    const draw = () => {
      if (!S) { rafRef.current = requestAnimationFrame(draw); return }
      timeRef.current += 0.016
      const t = timeRef.current
      ctx.clearRect(0, 0, S, S)

      const youX = 0.50 * S, youY = YOU_FY * S
      const l1Y = L1_FY * S, l2Y = L2_FY * S

      const gYou = ctx.createRadialGradient(youX, youY, 0, youX, youY, S * 0.32)
      gYou.addColorStop(0, 'rgba(33,230,167,0.09)')
      gYou.addColorStop(1, 'rgba(33,230,167,0)')
      ctx.beginPath(); ctx.arc(youX, youY, S * 0.32, 0, Math.PI * 2)
      ctx.fillStyle = gYou; ctx.fill()

      ctx.setLineDash([4, 7]); ctx.lineWidth = 1
      L1_FXS.forEach(fx => {
        ctx.beginPath(); ctx.moveTo(fx * S, l1Y); ctx.lineTo(youX, youY)
        ctx.strokeStyle = 'rgba(33,230,167,0.17)'; ctx.stroke()
      })
      L2_FXS.forEach((fx, i) => {
        ctx.beginPath(); ctx.moveTo(fx * S, l2Y); ctx.lineTo(L1_FXS[L2_PAR[i]] * S, l1Y)
        ctx.strokeStyle = 'rgba(33,230,167,0.10)'; ctx.stroke()
      })
      ctx.setLineDash([])

      particles.forEach(p => {
        p.t += p.speed; if (p.t > 1) p.t -= 1
        const { x1, y1, x2, y2 } = getSegment(p.segIdx, S)
        const px = x1 + (x2 - x1) * p.t, py = y1 + (y2 - y1) * p.t
        const fade = p.t < 0.12 ? p.t / 0.12 : p.t > 0.88 ? (1 - p.t) / 0.12 : 1
        ctx.beginPath(); ctx.arc(px, py, 5.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(33,230,167,${fade * 0.13})`; ctx.fill()
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(33,230,167,${fade * 0.88})`; ctx.fill()
      })

      const r2 = S * 0.036
      L2_FXS.forEach(fx => {
        const x = fx * S
        ctx.beginPath(); ctx.arc(x, l2Y, r2, 0, Math.PI * 2); ctx.fillStyle = 'rgba(11,46,44,0.95)'; ctx.fill()
        ctx.beginPath(); ctx.arc(x, l2Y, r2, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(33,230,167,0.22)'; ctx.lineWidth = 1; ctx.stroke()
        ctx.beginPath(); ctx.arc(x, l2Y, r2 * 0.38, 0, Math.PI * 2); ctx.fillStyle = 'rgba(33,230,167,0.42)'; ctx.fill()
      })

      const r1 = S * 0.056
      L1_FXS.forEach(fx => {
        const x = fx * S
        ctx.beginPath(); ctx.arc(x, l1Y, r1, 0, Math.PI * 2); ctx.fillStyle = 'rgba(11,46,44,0.97)'; ctx.fill()
        ctx.beginPath(); ctx.arc(x, l1Y, r1, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(33,230,167,0.33)'; ctx.lineWidth = 1.2; ctx.stroke()
        ctx.beginPath(); ctx.arc(x, l1Y, r1 * 0.40, 0, Math.PI * 2); ctx.fillStyle = 'rgba(33,230,167,0.58)'; ctx.fill()
      })

      const ripplePhase = Math.abs(Math.sin(t * 1.55))
      ctx.beginPath(); ctx.arc(youX, youY, S * 0.076 + S * 0.048 * ripplePhase, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(33,230,167,${0.20 * (1 - ripplePhase)})`; ctx.lineWidth = 1; ctx.stroke()
      ctx.beginPath(); ctx.arc(youX, youY, S * 0.076, 0, Math.PI * 2); ctx.fillStyle = '#21E6A7'; ctx.fill()
      ctx.beginPath(); ctx.arc(youX, youY, S * 0.076, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(255,255,255,0.22)'; ctx.lineWidth = 1.5; ctx.stroke()
      ctx.fillStyle = '#061C1E'; ctx.font = `bold ${Math.round(S * 0.038)}px Roboto, sans-serif`
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('You', youX, youY)

      rafRef.current = isVisible ? requestAnimationFrame(draw) : 0
    }

    const observer = new IntersectionObserver(
      (entries) => { isVisible = entries[0].isIntersecting; if (isVisible && rafRef.current === 0) draw() },
      { threshold: 0.01 }
    )
    observer.observe(canvas)

    return () => { cancelAnimationFrame(rafRef.current); rafRef.current = 0; window.removeEventListener('resize', resize); observer.disconnect() }
  }, [])

  return <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto' }} aria-label="Three-tier referral network" aria-hidden="true" />
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const LEVELS = [
  {
    number: '01',
    title: 'Direct Referrals',
    desc: 'Invite someone to Winity. Every time a person in your network uses their card, you earn Winity Points.',
  },
  {
    number: '02',
    title: 'Second Tier',
    desc: 'When the people you invited bring in their own referrals, your points network grows a level deeper.',
  },
  {
    number: '03',
    title: 'Third Tier',
    desc: 'Three levels of points earning from a single referral chain. The network compounds over time.',
  },
]

const HOW_IT_WORKS = [
  { icon: Users,      step: '01', title: 'Download the app',      desc: 'Get Winity Life from the App Store or Google Play.' },
  { icon: Repeat2,    step: '02', title: 'Get your referral link', desc: 'Find your unique link in the Loop section of the app.' },
  { icon: TrendingUp, step: '03', title: 'Share and earn points',  desc: 'When your referrals spend, you earn Winity Points across three network tiers.' },
]

const CARD_TERMS = [
  'Free virtual Winity Exclusive card, issued upon KYC approval',
  'Virtual card issued upon completion of KYC verification',
  'Google Pay ready immediately after issuance',
  'Accepted at 150M+ Visa® merchant locations worldwide',
  'Earn 1 Winity Point per USD 10 spent',
  'Available in 180+ countries and regions',
  'Physical card available from USD 20/yr (first 6 months free after $25 spend)',
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ReferralPage() {
  const heroRef    = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const levelsRef  = useRef<HTMLElement>(null)
  const levelCardRefs = useRef<(HTMLDivElement | null)[]>([])
  const howRef     = useRef<HTMLElement>(null)
  const umiRef     = useRef<HTMLElement>(null)
  const ctaRef     = useRef<HTMLElement>(null)
  const termsRef   = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero entrance ──────────────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: 'words' })
        tl.from(split.words, { opacity: 0, y: 44, duration: 0.9, stagger: 0.07 }, 0.15)
      }
      tl.from('.hero-sub',   { opacity: 0, y: 24, duration: 0.8 }, 0.55)
      tl.from('.hero-cta',   { opacity: 0, y: 20, duration: 0.7 }, 0.75)
      tl.from('.hero-canvas', { opacity: 0, scale: 0.9, duration: 1.2, ease: 'power3.out' }, 0.4)

      // ── Section reveals ────────────────────────────────────────────────────
      ;[levelsRef, howRef, umiRef, ctaRef, termsRef].forEach((ref) => {
        if (!ref.current) return
        gsap.fromTo(ref.current.querySelectorAll('.reveal-up'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true } }
        )
      })

      // ── Level cards ────────────────────────────────────────────────────────
      const validCards = levelCardRefs.current.filter(Boolean)
      if (validCards.length) {
        gsap.fromTo(validCards,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: validCards[0]!, start: 'top 80%', once: true } }
        )
      }

      // ── How it works steps ─────────────────────────────────────────────────
      if (howRef.current) {
        const steps = howRef.current.querySelectorAll('.how-step')
        gsap.fromTo(steps,
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: howRef.current, start: 'top 76%', once: true } }
        )
      }

    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ fontFamily: 'Roboto, sans-serif', background: '#071E20', overflowX: 'hidden' }}>
      <SEO
        title="Winity Loop | The Referral Programme | Winity Life"
        description="Share Winity Life and earn Winity Points across three tiers of your network. Every eligible spend by your referrals contributes to your balance. Get your free card today."
      />

      <style>{`
        @media (max-width: 768px) {
          .hero-grid      { grid-template-columns: 1fr !important; }
          .level-grid     { grid-template-columns: 1fr !important; }
          .how-grid       { grid-template-columns: 1fr !important; }
          .umi-grid       { grid-template-columns: 1fr !important; }
          .free-card-grid { grid-template-columns: 1fr !important; }

          /* Hero canvas — shrink to fit on mobile */
          .hero-canvas canvas { max-width: 80vw !important; }

          /* Level cards — add vertical gap */
          .level-grid > * { margin-bottom: 0 !important; }

          /* How-to steps — centre icon on mobile */
          .how-step { text-align: center !important; }
          .how-step > div:first-child { margin-left: auto !important; margin-right: auto !important; }

          /* UMI section — image comes first on mobile */
          .umi-grid { direction: ltr !important; }
          .umi-grid > *:first-child { order: 1; min-height: 240px !important; }
          .umi-grid > *:last-child  { order: 2; }
        }

        @media (max-width: 480px) {
          /* Hero headline — a bit tighter on very small phones */
          .hero-grid h1 { letter-spacing: -0.025em !important; }
          /* Loop canvas — hidden on tiny phones to save space */
          .hero-canvas { display: none !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — arch bg, headline, LoopCanvas
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: 'relative', overflow: 'hidden',
          background: '#071E20',
          padding: 'clamp(100px, 13vh, 160px) 0 clamp(64px, 10vh, 120px)',
          minHeight: '88vh',
        }}
      >
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 80% 70% at 60% 40%, #0D4038 0%, #082820 55%, #071E20 100%)',
          }} />
          <img
            src="/hero_bg_arch3.png"
            alt=""
            style={{
              position: 'absolute', bottom: 0, left: 0,
              width: '100%', height: 'auto',
              mixBlendMode: 'screen',
              filter: 'brightness(1.1) saturate(1.2) contrast(1.05)',
              opacity: 0.75,
            }}
          />
        </div>
        <GrainOverlay id="grain-hero-ref" opacity={0.036} />

        <div style={{ maxWidth: 1240, margin: '0 auto', paddingInline: 'clamp(24px, 6vw, 96px)', position: 'relative', zIndex: 20 }}>
          <div
            className="hero-grid"
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(40px, 7vw, 80px)', alignItems: 'center',
            }}
          >
            {/* Copy */}
            <div>
              <Label text="Winity Loop" />
              <h1
                ref={headlineRef}
                style={{
                  fontWeight: 700, fontSize: 'clamp(28px, 4vw, 58px)',
                  lineHeight: 1.06, letterSpacing: '-0.03em', color: '#FFF',
                  marginBottom: 20,
                }}
              >
                Share Winity.<br />
                <span style={{ color: MINT_HI }}>Earn for every level.</span>
              </h1>
              <p
                className="hero-sub"
                style={{
                  color: 'rgba(143,163,160,0.82)',
                  fontSize: 'clamp(15px, 1.4vw, 17px)',
                  lineHeight: 1.7, maxWidth: 460, marginBottom: 36,
                }}
              >
                Winity Loop rewards you across three tiers of your referral network.
                Every qualified spend by your referrals earns you Winity Points, and
                the network keeps growing.
              </p>
              <div
                className="hero-cta"
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}
              >
                <a
                  href="https://apps.apple.com/us/app/winity-life/id6752761057"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '13px 28px', borderRadius: 999,
                    fontWeight: 700, fontSize: 14, color: '#071E20', textDecoration: 'none',
                    background: `linear-gradient(135deg, ${MINT} 0%, ${MINT_HI} 100%)`,
                    transition: 'filter 0.25s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1.08)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.filter = 'none' }}
                >
                  Start Referring <ArrowRight size={15} />
                </a>
                <Link
                  to="/loyalty"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '13px 28px', borderRadius: 999,
                    fontWeight: 500, fontSize: 14, color: '#fff',
                    border: '1px solid rgba(255,255,255,0.14)',
                    textDecoration: 'none', transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = `${MINT}50` }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.14)' }}
                >
                  Loyalty Programme
                </Link>
              </div>
            </div>

            {/* LoopCanvas */}
            <div className="hero-canvas" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: '100%', maxWidth: 440 }}>
                <LoopCanvas />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FREE CARD — Free virtual card highlight
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(180deg, #071E20 0%, #0A2820 100%)',
          padding: 'clamp(64px, 10vh, 120px) 0',
          borderTop: '1px solid rgba(33,230,167,0.08)',
          borderBottom: '1px solid rgba(33,230,167,0.08)',
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(33,230,167,0.35), transparent)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(33,230,167,0.35), transparent)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', right: '10%', transform: 'translateY(-50%)',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(33,230,167,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <GrainOverlay id="grain-free" opacity={0.032} />

        <div style={{ maxWidth: 1240, margin: '0 auto', paddingInline: 'clamp(24px, 6vw, 96px)', position: 'relative', zIndex: 10 }}>
          <div
            className="free-card-grid"
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(40px, 7vw, 80px)', alignItems: 'center',
            }}
          >
            {/* Copy */}
            <div>
              <Label text="Free Card" />
              <h2 style={{
                fontSize: 'clamp(1.8rem, 3.8vw, 3.2rem)', fontWeight: 900, lineHeight: 1.06,
                letterSpacing: '-0.04em', color: '#fff', marginBottom: 20,
              }}>
                The Exclusive card.<br />
                <span style={{ color: MINT_HI }}>Ready when you are.</span>
              </h2>
              <p style={{ color: 'rgba(143,163,160,0.82)', fontSize: 16, lineHeight: 1.7, maxWidth: 420, marginBottom: 28 }}>
                Your Winity Exclusive virtual card is issued upon KYC approval.
                Add it to Google Pay and start spending at 150M+ Visa® merchant locations globally.
                Physical card available after $25 in eligible spend (shipping charges may apply).
              </p>
              <a
                href="https://apps.apple.com/us/app/winity-life/id6752761057"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 28px', borderRadius: 999,
                  fontWeight: 700, fontSize: 14, color: '#071E20', textDecoration: 'none',
                  background: `linear-gradient(135deg, ${MINT} 0%, ${MINT_HI} 100%)`,
                }}
              >
                Get Your Free Card <ArrowRight size={15} />
              </a>
            </div>

            {/* Card terms panel */}
            <div style={{
              borderRadius: 24, padding: 'clamp(24px, 3.5vw, 40px)',
              background: 'linear-gradient(145deg, rgba(15,63,58,0.5) 0%, rgba(11,46,44,0.35) 100%)',
              border: '1px solid rgba(33,230,167,0.15)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 24, right: 24, height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(33,230,167,0.55), transparent)',
              }} />
              {/* Card image + name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <img
                  src="/card_hero_float.jpg"
                  alt="Winity Exclusive Card"
                  style={{ width: 72, height: 'auto', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.6)' }}
                  onError={(e) => { (e.target as HTMLImageElement).src = '/hero_card_exclusive.png' }}
                />
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>Winity Exclusive</div>
                  <div style={{ color: MINT, fontSize: 12, fontWeight: 600 }}>Winity Exclusive</div>
                </div>
              </div>
              {/* Feature list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {CARD_TERMS.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                      background: 'rgba(33,230,167,0.12)', border: '1px solid rgba(33,230,167,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Check size={9} color={MINT} strokeWidth={2.5} />
                    </div>
                    <span style={{ color: 'rgba(143,163,160,0.82)', fontSize: 13, lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          THREE LEVELS — how the network works
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={levelsRef}
        style={{
          position: 'relative', overflow: 'hidden',
          background: '#061C1E',
          padding: 'clamp(64px, 10vh, 140px) 0',
        }}
      >
        <GrainOverlay id="grain-levels" opacity={0.03} />
        <div style={{ maxWidth: 1240, margin: '0 auto', paddingInline: 'clamp(24px, 6vw, 96px)', position: 'relative', zIndex: 10 }}>
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vh, 64px)' }}>
            <Label text="How It Works" />
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.8vw, 3rem)', fontWeight: 900, letterSpacing: '-0.035em', color: '#fff', marginBottom: 16,
            }}>
              Three levels deep.
            </h2>
            <p style={{ color: 'rgba(143,163,160,0.8)', fontSize: 16, lineHeight: 1.65, maxWidth: 520, marginInline: 'auto' }}>
              One referral can unlock Winity Points across three separate network tiers.
              The more people in your network, the more your points balance grows.
            </p>
          </div>

          <div
            className="level-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
          >
            {LEVELS.map((level, i) => (
              <div
                key={level.number}
                ref={(el) => { levelCardRefs.current[i] = el }}
                style={{
                  position: 'relative', borderRadius: 22, padding: 'clamp(24px, 3vw, 36px)',
                  background: 'linear-gradient(145deg, rgba(15,63,58,0.5) 0%, rgba(11,46,44,0.32) 100%)',
                  border: '1px solid rgba(33,230,167,0.1)', overflow: 'hidden',
                  transition: 'border-color 0.35s ease', cursor: 'default',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(33,230,167,0.3)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(33,230,167,0.1)' }}
              >
                {/* Large number watermark */}
                <div style={{
                  position: 'absolute', top: 12, right: 18,
                  fontSize: 64, fontWeight: 900, color: 'rgba(33,230,167,0.05)',
                  lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
                }}>
                  {level.number}
                </div>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, marginBottom: 20,
                  background: 'rgba(33,230,167,0.1)', border: '1px solid rgba(33,230,167,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: 18, color: MINT,
                }}>
                  {i + 1}
                </div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 10, letterSpacing: '-0.01em' }}>
                  {level.title}
                </h3>
                <p style={{ color: 'rgba(143,163,160,0.78)', fontSize: 14, lineHeight: 1.65 }}>
                  {level.desc}
                </p>
              </div>
            ))}
          </div>

          {/* LoopCanvas again in the levels section */}
          <div style={{
            display: 'flex', justifyContent: 'center', marginTop: 'clamp(48px, 8vh, 80px)',
          }}>
            <div style={{ width: '100%', maxWidth: 440, opacity: 0.9 }}>
              <LoopCanvas />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          HOW TO START
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={howRef}
        style={{
          position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(180deg, #071E20 0%, #0A2820 100%)',
          padding: 'clamp(64px, 10vh, 140px) 0',
        }}
      >
        <GrainOverlay id="grain-how" opacity={0.03} />
        <div style={{ maxWidth: 1240, margin: '0 auto', paddingInline: 'clamp(24px, 6vw, 96px)', position: 'relative', zIndex: 10 }}>
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vh, 64px)' }}>
            <Label text="Getting Started" />
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.8vw, 3rem)', fontWeight: 900, letterSpacing: '-0.035em', color: '#fff',
            }}>
              Your link is waiting.
            </h2>
          </div>

          <div
            className="how-grid"
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(20px, 4vw, 40px)', maxWidth: 900, marginInline: 'auto',
            }}
          >
            {HOW_IT_WORKS.map(({ icon: Icon, step, title, desc }) => (
              <div
                key={step}
                className="how-step"
                style={{ textAlign: 'center' }}
              >
                <div style={{
                  width: 60, height: 60, borderRadius: 18, marginInline: 'auto', marginBottom: 20,
                  background: 'rgba(33,230,167,0.1)', border: '1px solid rgba(33,230,167,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={24} color={MINT} strokeWidth={1.6} />
                </div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: MINT, marginBottom: 8, textTransform: 'uppercase' }}>
                  {step}
                </p>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{title}</h3>
                <p style={{ color: 'rgba(143,163,160,0.78)', fontSize: 13, lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div className="reveal-up" style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 48, flexWrap: 'wrap' }}>
            <a
              href="https://apps.apple.com/us/app/winity-life/id6752761057"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', borderRadius: 999,
                fontWeight: 700, fontSize: 14, color: '#071E20', textDecoration: 'none',
                background: `linear-gradient(135deg, ${MINT} 0%, ${MINT_HI} 100%)`,
              }}
            >
              Start Referring <ArrowRight size={15} />
            </a>
            <Link
              to="/loyalty"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', borderRadius: 999,
                fontWeight: 500, fontSize: 14, color: '#fff',
                border: '1px solid rgba(255,255,255,0.14)',
                textDecoration: 'none', transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = `${MINT}50` }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.14)' }}
            >
              View Loyalty Programme
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          UMI + LIFESTYLE — Loop, Spend, Travel. Stay connected.
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={umiRef}
        style={{
          position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(180deg, #0B2E2C 0%, #061C1E 100%)',
          padding: 'clamp(64px, 10vh, 140px) 0',
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(33,230,167,0.35), transparent)',
        }} />
        <GrainOverlay id="grain-umi" opacity={0.032} />

        <div style={{ maxWidth: 1240, margin: '0 auto', paddingInline: 'clamp(24px, 6vw, 96px)', position: 'relative', zIndex: 10 }}>
          <div
            className="umi-grid"
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(40px, 7vw, 80px)', alignItems: 'center',
            }}
          >
            {/* Lifestyle image panel */}
            <div
              className="reveal-up"
              style={{
                position: 'relative', borderRadius: 22, overflow: 'hidden',
                minHeight: 'clamp(280px, 35vw, 420px)',
                boxShadow: '0 40px 90px rgba(0,0,0,0.65)',
                border: '1px solid rgba(33,230,167,0.1)',
              }}
            >
              <img
                src="/winity_lifestyle_dining.jpg"
                alt="Winity lifestyle"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(6,28,30,0.85) 0%, rgba(7,30,32,0.2) 60%, transparent 100%)',
              }} />
              {/* UMI chip */}
              <div style={{
                position: 'absolute', bottom: 20, left: 20, zIndex: 5,
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '8px 16px', borderRadius: 999,
                background: 'rgba(7,30,32,0.85)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(33,230,167,0.3)',
                fontSize: 12, fontWeight: 700, color: MINT, letterSpacing: '0.05em',
              }}>
                <Wifi size={13} /> UMI Travel Data, 100+ Countries
              </div>
            </div>

            {/* Copy */}
            <div>
              <div className="reveal-up">
                <Label text="Loop · Spend · Travel" />
              </div>
              <h2 className="reveal-up" style={{
                fontSize: 'clamp(1.8rem, 3.8vw, 3rem)', fontWeight: 900, lineHeight: 1.06,
                letterSpacing: '-0.04em', color: '#fff', marginBottom: 20,
              }}>
                Stay connected<br />
                <span style={{ color: MINT_HI }}>wherever Winity takes you.</span>
              </h2>
              <p className="reveal-up" style={{ color: 'rgba(143,163,160,0.82)', fontSize: 16, lineHeight: 1.7, maxWidth: 420, marginBottom: 28 }}>
                Winity Exclusive cardholders who reach USD 5,000 in eligible spend unlock
                complimentary UMI travel data. eSIM activation is already free. Winity provides the data package on us.
              </p>

              {/* Winity Club highlight */}
              <div
                className="reveal-up"
                style={{
                  borderRadius: 18, padding: 'clamp(18px, 2.5vw, 28px)', marginBottom: 28,
                  background: 'rgba(33,230,167,0.08)', border: '1px solid rgba(33,230,167,0.18)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                    background: 'rgba(33,230,167,0.12)', border: '1px solid rgba(33,230,167,0.22)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Gift size={16} color={MINT} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Winity Club × UMI</div>
                    <div style={{ fontSize: 12, color: MINT }}>20% off all data purchases</div>
                  </div>
                </div>
                <p style={{ color: 'rgba(143,163,160,0.78)', fontSize: 13, lineHeight: 1.6 }}>
                  Join the Winity Club on the UMI app to save 20% on every data package
                  you purchase. Exclusive to Winity cardholders.
                </p>
              </div>

              <div className="reveal-up" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <a
                  href={UMI_CLUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '12px 24px', borderRadius: 999,
                    fontWeight: 700, fontSize: 14, color: '#071E20', textDecoration: 'none',
                    background: `linear-gradient(135deg, ${MINT} 0%, ${MINT_HI} 100%)`,
                  }}
                >
                  Join Winity Club on UMI <ExternalLink size={13} />
                </a>
                <Link
                  to="/exclusive"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '12px 24px', borderRadius: 999,
                    fontWeight: 500, fontSize: 14, color: '#fff',
                    border: '1px solid rgba(255,255,255,0.14)',
                    textDecoration: 'none', transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = `${MINT}50` }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.14)' }}
                >
                  Explore Exclusive Card
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        style={{
          position: 'relative', overflow: 'hidden', textAlign: 'center',
          background: '#071E20',
          padding: 'clamp(80px, 12vh, 140px) 0',
        }}
      >
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(33,230,167,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <GrainOverlay id="grain-cta" opacity={0.03} />
        <div style={{ maxWidth: 680, margin: '0 auto', paddingInline: 24, position: 'relative', zIndex: 10 }}>
          <div className="reveal-up"><Label text="Start Today" /></div>
          <h2 className="reveal-up" style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.0,
            letterSpacing: '-0.045em', color: '#fff', marginBottom: 20,
          }}>
            Build your network.<br />
            <span style={{ color: MINT_HI }}>Earn Winity Points.</span>
          </h2>
          <p className="reveal-up" style={{
            color: 'rgba(143,163,160,0.75)',
            fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', lineHeight: 1.7, marginBottom: 40,
          }}>
            Download the app, get your free Exclusive card, and start sharing your referral link.
            Every spend by your network earns you Winity Points across three tiers.
          </p>
          <div className="reveal-up" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            <a
              href="https://apps.apple.com/us/app/winity-life/id6752761057"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '15px 40px', borderRadius: 999,
                fontWeight: 700, fontSize: 15, color: '#071E20', textDecoration: 'none',
                background: `linear-gradient(135deg, ${MINT} 0%, ${MINT_HI} 100%)`,
              }}
            >
              Get the App <ArrowRight size={16} />
            </a>
            <Link
              to="/exclusive"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '15px 40px', borderRadius: 999,
                fontWeight: 500, fontSize: 15, color: '#fff', textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.15)',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = `${MINT}50` }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.15)' }}
            >
              Explore the Card
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PROGRAMME TERMS
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={termsRef}
        style={{
          position: 'relative', overflow: 'hidden',
          background: 'rgba(11,46,44,0.4)',
          padding: 'clamp(48px, 8vh, 80px) 0',
          borderTop: '1px solid rgba(33,230,167,0.08)',
        }}
      >
        <div style={{ maxWidth: 760, margin: '0 auto', paddingInline: 'clamp(24px, 6vw, 96px)' }}>
          <h2 className="reveal-up" style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 24 }}>
            Programme Terms
          </h2>
          <div className="reveal-up" style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
            {[
              'Winity Loop is a referral rewards programme, not a multi-level marketing scheme.',
              'Points are earned based on the eligible spending activity of your referral network, not on recruitment alone.',
              'Reward rates, eligible transactions, and programme structure may change at any time.',
              'Participation is subject to applicable law in your jurisdiction.',
              'Card services are issued in Hong Kong. Availability varies by country.',
              'Winity Life is a financial technology company, not a bank.',
            ].map(term => (
              <div key={term} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                  background: 'rgba(33,230,167,0.1)', border: '1px solid rgba(33,230,167,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Check size={9} color={MINT} strokeWidth={2.5} />
                </div>
                <span style={{ color: 'rgba(143,163,160,0.72)', fontSize: 13, lineHeight: 1.6 }}>{term}</span>
              </div>
            ))}
          </div>
          <div className="reveal-up" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ color: 'rgba(143,163,160,0.45)', fontSize: 12, lineHeight: 1.65 }}>
              Winity Loop rewards are subject to terms and conditions. See full terms at{' '}
              <a href="https://winity.life/terms" target="_blank" rel="noopener noreferrer"
                style={{ color: 'rgba(33,230,167,0.55)', textDecoration: 'none' }}>
                winity.life/terms
              </a>.
            </p>
            <p style={{ color: 'rgba(143,163,160,0.45)', fontSize: 12, lineHeight: 1.65 }}>
              UMI data benefit and Winity Club discount subject to programme terms and eligibility.
              eSIM activation is free; complementary data is subject to spending thresholds.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
