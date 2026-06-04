/**
 * HowItWorks — Winity Life | Emerald Noir
 * ─────────────────────────────────────────────────────────────────────
 * Pattern: Sticky scroll panel — left text steps, right phone crossfade.
 * Copper active line tracks current step. Mint glow on active number.
 * Mobile: swipeable card slider with progress indicator.
 * ─────────────────────────────────────────────────────────────────────
 */
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LiveRateBar from '../components/LiveRateBar'

gsap.registerPlugin(ScrollTrigger)

// ── Step Data ─────────────────────────────────────────────────────────────────
const STEPS = [
  {
    number: '01',
    title: 'Download & Verify',
    desc: 'Get the Winity Life app on iOS or Android. Verify your identity in minutes: no branch visits, no paperwork, no waiting.',
    img: '/Download and verify.png',
    badge: 'iOS & Android',
    stat: '< 3 min setup',
  },
  {
    number: '02',
    title: 'Choose Your Card',
    desc: 'Pick the card that moves with your life. Start with the Exclusive virtual card, Google Pay ready upon KYC approval. Step up to Executive metal when your lifestyle demands more.',
    img: '/Choose your card.png',
    badge: 'Free to start',
    stat: '2 card tiers',
  },
  {
    number: '03',
    title: 'Load Your Wallet',
    desc: 'Transfer USDT or USDC at zero fee, or add ETH, SOL, WCO and more. Your crypto converts to USD automatically. No bank required, no extra steps.',
    img: '/Fund your card.png',
    badge: 'Freedom in flexibility',
    stat: '0% stablecoin fee',
  },
  {
    number: '04',
    title: 'Spend & Earn',
    desc: 'Spend anywhere Visa is accepted in 200+ countries with 150M+ merchant locations. Every eligible purchase earns Winity Points. Redeem for travel, dining and exclusive rewards.',
    img: '/Spend and Earn.png',
    badge: 'Earn on every spend',
    stat: '200+ countries',
  },
]

// ── Mobile Card ────────────────────────────────────────────────────────────────
function MobileCard({ step, isActive }: { step: typeof STEPS[0]; isActive: boolean }) {
  return (
    <div
      className="copper-border-card rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0F3F3A 0%, #071E1E 100%)',
        border: isActive ? '1px solid rgba(184,115,51,0.35)' : '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.4s cubic-bezier(0.25,1,0.5,1)',
        boxShadow: isActive
          ? '0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(184,115,51,0.1)'
          : '0 8px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* Phone screenshot */}
      <div style={{
        position: 'relative',
        background: '#040E0E',
        overflow: 'hidden',
        height: 280,
      }}>
        <img
          src={step.img}
          alt={step.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
          }}
          loading="lazy"
        />
        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 48, pointerEvents: 'none',
          background: 'linear-gradient(to top, #040E0E, transparent)',
        }} />
      </div>

      {/* Text */}
      <div style={{ padding: '20px 24px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase' as const, color: '#21E6A7',
          }}>
            Step {step.number}
          </span>
          <span style={{
            padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 600,
            color: '#21E6A7', border: '1px solid rgba(33,230,167,0.25)',
            background: 'rgba(33,230,167,0.08)',
          }}>
            {step.badge}
          </span>
        </div>
        <h3 style={{
          fontSize: 18, fontWeight: 700, color: '#F4F7F6',
          letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 8,
        }}>
          {step.title}
        </h3>
        <p style={{ fontSize: 13, color: 'rgba(244,247,246,0.5)', lineHeight: 1.65 }}>
          {step.desc}
        </p>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          marginTop: 14, padding: '5px 12px', borderRadius: 20,
          background: isActive ? 'rgba(33,230,167,0.10)' : 'rgba(255,255,255,0.04)',
          border: isActive ? '1px solid rgba(33,230,167,0.28)' : '1px solid rgba(255,255,255,0.06)',
          transition: 'all 0.3s ease',
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: isActive ? '#21E6A7' : 'rgba(255,255,255,0.2)',
            boxShadow: isActive ? '0 0 8px rgba(33,230,167,0.6)' : 'none',
            transition: 'all 0.3s ease',
          }} />
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: isActive ? '#21E6A7' : 'rgba(244,247,246,0.35)',
            letterSpacing: '0.08em',
          }}>
            {step.stat}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Main Section ───────────────────────────────────────────────────────────────
export default function HowItWorks() {
  const sectionRef    = useRef<HTMLElement>(null)
  const headerRef     = useRef<HTMLDivElement>(null)
  const copperLineRef = useRef<HTMLDivElement>(null)
  const stepRefs      = useRef<(HTMLDivElement | null)[]>([])
  const phoneRef      = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [mobileActive, setMobileActive] = useState(0)
  const touchStartX   = useRef(0)
  const imgRefs       = useRef<(HTMLImageElement | null)[]>([])

  // ── Scroll entrance for header + copper line draw ──────────────────
  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {

      // Header fade up
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 44 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true } }
      )

      // Copper divider line draws in
      gsap.fromTo(copperLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.1, ease: 'power3.out', transformOrigin: 'left',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
      )

      // Desktop: sticky scroll — track which step is active
      if (window.innerWidth >= 1024) {
        stepRefs.current.forEach((el, i) => {
          if (!el) return
          ScrollTrigger.create({
            trigger: el,
            start: 'top 45%',
            end: 'bottom 45%',
            onEnter: () => setActiveStep(i),
            onEnterBack: () => setActiveStep(i),
          })
        })

        // Stagger step entrance (desktop only)
        gsap.fromTo('.hiw-step-item',
          { opacity: 0, x: -32 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15,
            scrollTrigger: { trigger: '.hiw-steps-col', start: 'top 78%', once: true } }
        )

        // Phone column entrance
        gsap.fromTo('.hiw-phone-col',
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.hiw-phone-col', start: 'top 78%', once: true } }
        )
      } else {
        // Mobile cards entrance
        gsap.fromTo('.hiw-mobile-card',
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: '.hiw-mobile-grid', start: 'top 80%', once: true } }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // ── Phone image crossfade on step change ──────────────────────────
  useEffect(() => {
    imgRefs.current.forEach((img, i) => {
      if (!img) return
      if (i === activeStep) {
        gsap.to(img, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' })
      } else {
        gsap.to(img, { opacity: 0, y: 20, scale: 0.96, duration: 0.35, ease: 'power3.in' })
      }
    })
  }, [activeStep])

  // ── Mobile swipe ──────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.changedTouches[0].clientX }
  const onTouchEnd   = useCallback((e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 44) {
      setMobileActive(i => delta > 0
        ? Math.min(i + 1, STEPS.length - 1)
        : Math.max(i - 1, 0)
      )
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      aria-label="How It Works"
      className="section-copper-top"
      style={{
        background: 'linear-gradient(180deg, #061C1E 0%, #0B2E2C 60%, #061C1E 100%)',
        paddingTop: 'clamp(80px, 10vw, 130px)',
        paddingBottom: 'clamp(80px, 10vw, 130px)',
        overflow: 'hidden',
        fontFamily: 'Roboto, sans-serif',
        position: 'relative',
      }}
    >
      {/* Copper line ref for draw animation */}
      <div ref={copperLineRef} className="divider-copper" style={{
        position: 'absolute', top: 0, left: '10%', right: '10%',
        transformOrigin: 'left',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(33,230,167,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-wide">

        {/* ── Header ── */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: 'clamp(56px,8vh,96px)', opacity: 0 }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: 16 }}>How It Works</span>
          <h2 style={{
            fontSize: 'clamp(32px,5vw,60px)', fontWeight: 800,
            color: '#F4F7F6', letterSpacing: '-0.03em', lineHeight: 1.06,
            margin: '0 auto', maxWidth: 680,
          }}>
            From download to first spend:{' '}
            <span className="text-gradient-mint">four steps, no branch visit.</span>
          </h2>
          <p style={{
            color: 'rgba(244,247,246,0.45)', marginTop: 18,
            fontSize: 'clamp(14px,1.1vw,17px)', maxWidth: 480, marginInline: 'auto', lineHeight: 1.7,
          }}>
            Verify once, load your wallet, and you're ready to spend in 200+ countries.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            DESKTOP LAYOUT — Sticky scroll panel
        ═══════════════════════════════════════════════════════════ */}
        <div className="hiw-desktop" style={{ display: 'none' }}>
          {/* show via CSS for lg+ */}
        </div>
        <style>{`
          .hiw-desktop-layout {
            display: none;
          }
          .hiw-mobile-layout {
            display: block;
          }
          @media (min-width: 1024px) {
            .hiw-desktop-layout { display: flex; gap: clamp(40px,6vw,96px); align-items: flex-start; }
            .hiw-mobile-layout  { display: none; }
          }
          /* ── Mobile card layout — constrained & centred ── */
          @media (max-width: 1023px) {
            .hiw-mobile-grid {
              max-width: min(420px, 100%);
              margin: 0 auto;
            }
            .hiw-mobile-card {
              width: 100%;
            }
          }
        `}</style>

        {/* ── DESKTOP ── */}
        <div className="hiw-desktop-layout">

          {/* LEFT: Step list */}
          <div className="hiw-steps-col" style={{ flex: 1, paddingTop: 8 }}>
            <div style={{ position: 'relative' }}>

              {/* Vertical copper rail */}
              <div style={{
                position: 'absolute', left: 22, top: 25, bottom: 79, width: 2,
                background: 'rgba(255,255,255,0.05)', borderRadius: 1,
              }} />
              {/* Active fill */}
              <div style={{
                position: 'absolute', left: 22, top: 25, width: 2, borderRadius: 1,
                background: 'linear-gradient(180deg, #21E6A7, #0ECFB5)',
                height: `${(activeStep / (STEPS.length - 1)) * 100}%`,
                transition: 'height 0.5s cubic-bezier(0.25,1,0.5,1)',
                boxShadow: '0 0 12px rgba(33,230,167,0.4)',
              }} />

              {STEPS.map((step, i) => (
                <div
                  key={step.number}
                  ref={(el) => { stepRefs.current[i] = el }}
                  className="hiw-step-item"
                  onClick={() => setActiveStep(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveStep(i)}
                  aria-current={i === activeStep ? 'step' : undefined}
                  style={{
                    display: 'flex', gap: 28, paddingBottom: 56,
                    cursor: 'pointer', opacity: 0,
                    transition: 'opacity 0.3s ease',
                    position: 'relative',
                  }}
                >
                  {/* Step number bubble */}
                  <div style={{ flexShrink: 0, paddingTop: 2 }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: '50%',
                      border: i === activeStep
                        ? '2px solid rgba(33,230,167,0.55)'
                        : '2px solid rgba(255,255,255,0.08)',
                      background: i === activeStep ? '#0D3D35' : '#0B2926',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.4s cubic-bezier(0.25,1,0.5,1)',
                      boxShadow: i === activeStep ? '0 0 20px rgba(33,230,167,0.20)' : 'none',
                      position: 'relative', zIndex: 1,
                    }}>
                      <span style={{
                        fontSize: 13, fontWeight: 700,
                        color: i === activeStep ? '#21E6A7' : 'rgba(244,247,246,0.35)',
                        transition: 'color 0.3s ease',
                        fontFamily: 'Roboto, sans-serif',
                      }}>
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Text content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <h3 style={{
                        fontSize: 'clamp(17px,1.5vw,22px)', fontWeight: 700,
                        color: i === activeStep ? '#F4F7F6' : 'rgba(244,247,246,0.4)',
                        letterSpacing: '-0.015em', lineHeight: 1.2,
                        transition: 'color 0.3s ease',
                      }}>
                        {step.title}
                      </h3>
                      <span style={{
                        padding: '2px 10px', borderRadius: 20, fontSize: 10, fontWeight: 600,
                        color: i === activeStep ? '#21E6A7' : 'rgba(33,230,167,0.3)',
                        border: `1px solid ${i === activeStep ? 'rgba(33,230,167,0.3)' : 'rgba(33,230,167,0.1)'}`,
                        background: i === activeStep ? 'rgba(33,230,167,0.08)' : 'transparent',
                        transition: 'all 0.3s ease',
                        flexShrink: 0,
                      }}>
                        {step.badge}
                      </span>
                    </div>
                    <p style={{
                      fontSize: 'clamp(13px,1vw,15px)', lineHeight: 1.7,
                      color: i === activeStep ? 'rgba(244,247,246,0.6)' : 'rgba(244,247,246,0.25)',
                      transition: 'color 0.3s ease', maxWidth: 420,
                    }}>
                      {step.desc}
                    </p>
                    {/* Stat pill */}
                    {i === activeStep && (
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 7,
                        marginTop: 14, padding: '6px 14px', borderRadius: 20,
                        background: 'rgba(33,230,167,0.08)', border: '1px solid rgba(33,230,167,0.22)',
                        animation: 'fade-up 0.4s ease forwards',
                      }}>
                        <div style={{
                          width: 6, height: 6, borderRadius: '50%', background: '#21E6A7',
                          boxShadow: '0 0 8px rgba(33,230,167,0.6)',
                        }} />
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#21E6A7', letterSpacing: '0.08em' }}>
                          {step.stat}
                        </span>
                      </div>
                    )}
                    {/* Live rate ticker — shown inside Load Your Wallet step */}
                    {i === activeStep && step.number === '03' && (
                      <div style={{ marginTop: 18, maxWidth: 420, borderRadius: 10, overflow: 'hidden', animation: 'fade-up 0.5s ease forwards' }}>
                        <LiveRateBar />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Sticky phone */}
          <div
            className="hiw-phone-col"
            style={{
              width: 'clamp(280px,36vw,440px)', flexShrink: 0,
              position: 'sticky', top: '15vh',
              opacity: 0, // GSAP handles entrance
            }}
            ref={phoneRef}
          >
            {/* Glass card frame */}
            <div style={{
              borderRadius: 28,
              background: 'linear-gradient(160deg, rgba(15,63,58,0.6) 0%, rgba(6,20,20,0.85) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              overflow: 'hidden',
              padding: '28px 28px 0',
              boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
              position: 'relative',
            }}>
              {/* Copper top accent */}
              <div style={{
                position: 'absolute', top: 0, left: '15%', right: '15%', height: 2,
                background: 'linear-gradient(90deg, transparent, #B87333, #E8A84E, #B87333, transparent)',
              }} />

              {/* Step indicator pills */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    aria-label={`Go to step ${i + 1}`}
                    style={{
                      height: 3, borderRadius: 2, border: 'none', cursor: 'pointer',
                      width: i === activeStep ? 32 : 10,
                      background: i === activeStep
                        ? 'linear-gradient(90deg, #21E6A7, #0ECFB5)'
                        : 'rgba(255,255,255,0.12)',
                      transition: 'all 0.4s cubic-bezier(0.25,1,0.5,1)',
                      boxShadow: i === activeStep ? '0 0 8px rgba(33,230,167,0.4)' : 'none',
                    }}
                  />
                ))}
              </div>

              {/* Phone screenshot stack */}
              <div style={{ position: 'relative', height: 'clamp(360px,46vw,540px)', background: '#040E0E', margin: '0 -28px' }}>
                {STEPS.map((step, i) => (
                  <img
                    key={step.number}
                    ref={(el) => { imgRefs.current[i] = el }}
                    src={step.img}
                    alt={step.title}
                    loading="lazy"
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover', objectPosition: 'top center',
                      opacity: i === 0 ? 1 : 0,
                      transition: 'none', // GSAP handles this
                    }}
                  />
                ))}
                {/* Bottom fade */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
                  background: 'linear-gradient(to top, #040E0E, transparent)',
                  pointerEvents: 'none',
                }} />
              </div>
            </div>

            {/* Active step label below phone */}
            <div style={{
              textAlign: 'center', marginTop: 20,
              opacity: 0.6, fontSize: 12, color: '#F4F7F6', letterSpacing: '0.1em',
              textTransform: 'uppercase' as const, fontWeight: 500,
            }}>
              Step {STEPS[activeStep]?.number} of {STEPS.length}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            MOBILE LAYOUT — Swipeable card stack
        ═══════════════════════════════════════════════════════════ */}
        <div className="hiw-mobile-layout">
          {/* Progress dots */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileActive(i)}
                aria-label={`Step ${i + 1}`}
                style={{
                  width: i === mobileActive ? 28 : 8, height: 8, borderRadius: 4,
                  border: 'none', cursor: 'pointer',
                  background: i === mobileActive
                    ? 'linear-gradient(90deg, #21E6A7, #0ECFB5)'
                    : 'rgba(255,255,255,0.15)',
                  transition: 'all 0.35s cubic-bezier(0.25,1,0.5,1)',
                  boxShadow: i === mobileActive ? '0 0 10px rgba(33,230,167,0.35)' : 'none',
                }}
              />
            ))}
          </div>

          {/* Cards — show active only on mobile, faded others */}
          <div
            className="hiw-mobile-grid"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            {/* Show active card prominently */}
            <div className="hiw-mobile-card" style={{ marginBottom: 16 }}>
              <MobileCard step={STEPS[mobileActive]} isActive={true} />
            </div>

            {/* Swipe cue — animated chevron pair */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 20, opacity: 0.35 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M12 5L7 10L12 15" stroke="#21E6A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M8 5L13 10L8 15" stroke="#21E6A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
