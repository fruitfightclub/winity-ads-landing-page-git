/**
 * HeroSection — Winity Life | Emerald Noir
 * ─────────────────────────────────────────
 * Cards: all 8 start stacked BEHIND the phone, then fan left/right on scroll.
 * Icons: ride the copper arch curve, U-shape, left + right.
 * No CTA buttons.
 */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)


const PR_LOGOS = [
  { name: 'Financial Times', style: { fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 18 } },
  { name: 'REUTERS',         style: { fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: '0.12em' } },
  { name: 'AP',              style: { fontFamily: 'Roboto, sans-serif', fontWeight: 900, fontSize: 22 } },
  { name: 'Business Insider',style: { fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: '0.04em' } },
  { name: 'Bloomberg',       style: { fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: 15 } },
  { name: 'CoinDesk',        style: { fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: '0.03em' } },
  { name: 'Yahoo Finance',   style: { fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: '0.02em' } },
]

// ── Left/Right cards (Symmetric fanned card dimensions) ──────────────────────
const CARD_W = 'clamp(200px, 20vw, 280px)'
const CARD_H = 'clamp(126px, 12.6vw, 177px)'

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const prRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {

      // ── ENTRANCE ────────────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: 'words' })
        tl.from(split.words, { opacity: 0, y: 44, duration: 0.9, stagger: 0.07 }, 0.15)
      }

      // Phone rises into view
      tl.from('.phone-wrap', { y: 200, scale: 0.88, opacity: 0, duration: 1.4, ease: 'power3.out' }, 0.3)

      // Cards start BEHIND phone (x:0) — invisible, then on scroll they fan out
      // So on page load they're already in position (x:0) and at opacity 0
      gsap.set('.hero-card', { x: 0, y: 0, rotation: 0, opacity: 0 })

      tl.from(prRef.current,  { opacity: 0, y: 20, duration: 0.5 }, 1.5)

      // ── SCROLL — cards fan out + parallax ──────────────────────────
      // scrub: 0.25 = snappier, responsive feel. end: +=600 = fan completes faster
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: 'top top',
          end: '+=600',
          scrub: 0.25,
        }
      })

      st.to('.hero-bg-arch', { yPercent: 14, ease: 'none' }, 0)
      st.to('.phone-wrap',   { y: -80, ease: 'none' }, 0)

      // Smoothly fade in cards on scroll start
      st.to('.hero-card', { opacity: 1, duration: 0.1, ease: 'none' }, 0)

      // Scale fan travel to viewport so cards never bleed off-screen on mobile
      const isMobile = window.innerWidth < 640
      const fanScale = isMobile ? 0.38 : 1

      // LEFT cards fan out (Executive cards)
      st.to('.ec-0', { x: -80  * fanScale, y: 20,  rotation: -8,  ease: 'none' }, 0)
      st.to('.ec-1', { x: -160 * fanScale, y: 8,   rotation: -18, ease: 'none' }, 0)
      st.to('.ec-2', { x: -240 * fanScale, y: -10, rotation: -28, ease: 'none' }, 0)
      st.to('.ec-3', { x: -320 * fanScale, y: -30, rotation: -38, ease: 'none' }, 0)

      // RIGHT cards fan out (Exclusive cards)
      st.to('.dk-0', { x: 80   * fanScale, y: 20,  rotation: 8,   ease: 'none' }, 0)
      st.to('.dk-1', { x: 160  * fanScale, y: 8,   rotation: 18,  ease: 'none' }, 0)
      st.to('.dk-2', { x: 240  * fanScale, y: -10, rotation: 28,  ease: 'none' }, 0)
      st.to('.dk-3', { x: 320  * fanScale, y: -30, rotation: 38,  ease: 'none' }, 0)

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        fontFamily: 'Roboto, sans-serif',
        background: '#030C0C',
      }}
    >
      <style>{`
        @keyframes pr-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .pr-track { animation: pr-marquee 34s linear infinite; }
        .pr-track:hover { animation-play-state: paused; }

        .hero-bg-arch-desktop {
          display: block;
          position: absolute; bottom: 0; left: 0;
          width: 100%; height: auto;
          mix-blend-mode: screen;
          filter: brightness(1.15) saturate(1.2) contrast(1.05);
          opacity: 0.95; will-change: transform;
        }
        .hero-bg-arch-mobile {
          display: none;
          position: absolute; bottom: 0; left: 0;
          width: 100%; height: auto;
          mix-blend-mode: screen;
          filter: brightness(1.1) saturate(1.2) contrast(1.05);
          opacity: 0.95; will-change: transform;
        }
        @media (max-width: 768px) {
          .hero-bg-arch-desktop { display: none; }
          .hero-bg-arch-mobile  { display: block; }
          .crypto-icon          { display: none; }
          .hero-stage-wrap      { margin-top: 4px !important; }
          .phone-wrap           { bottom: 4% !important; }
          .hero-section         { min-height: 0 !important; }
        }
      `}</style>

      {/* ── Background ─────────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 90% 80% at 50% 70%, #0D4540 0%, #071E1E 55%, #030C0C 100%)',
        }} />
        <img src="/hero_bg_arch3.png"       alt="" className="hero-bg-arch hero-bg-arch-desktop" />
        <img src="/hero_bg_arch_mobile.png" alt="" className="hero-bg-arch hero-bg-arch-mobile" />
      </div>

      {/* ── Headline ───────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 30,
        textAlign: 'center',
        paddingTop: 'clamp(52px, 10vh, 120px)',
        paddingInline: 24,
      }}>
        <h1
          ref={headlineRef}
          style={{
            margin: '0 auto',
            maxWidth: 760,
            fontWeight: 700,
            fontSize: 'clamp(30px, 4.2vw, 60px)',
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: '#FFF',
          }}
        >
          Many ways to Move,<br />One way to Pay.
        </h1>
      </div>

      {/* ── Hero Stage ─────────────────────────────────────────────────── */}
      <div className="hero-stage-wrap" style={{
        position: 'relative',
        height: 'clamp(300px, 60vh, 720px)',
        width: '100%',
        marginTop: 'clamp(16px, 4vh, 56px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}>

        {/* ── Executive cards (LEFT fan) — start at center, fan left on scroll ── */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`ec-${i}`}
            className={`hero-card ec-${i}`}
            style={{
              position: 'absolute',
              bottom: '18%', // higher start = cards spread sooner on scroll
              left: '50%',
              marginLeft: `calc(${CARD_W} / -2)`,
              width: CARD_W,
              height: CARD_H,
              transformOrigin: 'center bottom',
              zIndex: 20 - i,
              filter: `drop-shadow(0 ${6 + i * 3}px ${16 + i * 4}px rgba(0,0,0,0.75))`,
              willChange: 'transform',
              borderRadius: 10,
              overflow: 'hidden',
              opacity: 0, // start completely hidden to avoid peeking behind phone before scroll
            }}
          >
            <img
              src="/hero_card_executive_cropped_auto.png"
              alt={`Winity Executive card ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}

        {/* ── Phone (zIndex 28 — always in front of cards) ── */}
        <div className="phone-wrap" style={{
          position: 'absolute',
          bottom: '-8%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 28,
          willChange: 'transform',
        }}>
          <img
            src="/hero_phone.png"
            alt="Winity App"
            style={{
              width: 'clamp(180px, 48vw, 290px)',
              height: 'auto',
              filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.9)) drop-shadow(0 0 40px rgba(33,230,167,0.1))',
              display: 'block',
            }}
          />
        </div>

        {/* ── Dark/Exclusive cards (RIGHT fan) — identical in size ── */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`dk-${i}`}
            className={`hero-card dk-${i}`}
            style={{
              position: 'absolute',
              bottom: '18%',
              left: '50%',
              marginLeft: `calc(${CARD_W} / -2)`,
              width: CARD_W,
              height: CARD_H,
              transformOrigin: 'center bottom',
              zIndex: 20 - i,
              filter: `drop-shadow(0 ${6 + i * 3}px ${16 + i * 4}px rgba(0,0,0,0.8))`,
              willChange: 'transform',
              borderRadius: 10,
              overflow: 'hidden',
              opacity: 0, // start completely hidden to avoid peeking behind phone before scroll
            }}
          >
            <img
              src="/card_exclusive_physical.webp"
              alt={`Winity Exclusive card ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}

        {/* Mint glow under phone */}
        <div style={{
          position: 'absolute', bottom: '0%', left: '50%',
          transform: 'translateX(-50%)',
          width: 340, height: 60,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(33,230,167,0.12) 0%, transparent 70%)',
          zIndex: 1, pointerEvents: 'none',
        }} />
      </div>

      {/* ── PR Strip ───────────────────────────────────────────────────── */}
      <div ref={prRef} style={{
        position: 'relative', zIndex: 30,
        width: '100%',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        paddingBlock: 20,
        marginTop: 'clamp(60px, 10vh, 100px)',
        background: 'rgba(3,12,12,0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}>
        <p style={{
          textAlign: 'center', marginBottom: 18,
          color: 'rgba(255,255,255,0.26)', fontSize: 12, fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '0.24em',
        }}>
          Featured On
        </p>
        <div style={{
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}>
          <div className="pr-track" style={{ display: 'flex', width: 'max-content' }}>
            {[...PR_LOGOS, ...PR_LOGOS, ...PR_LOGOS, ...PR_LOGOS].map((logo, i) => (
              <span key={i} style={{
                ...(logo.style as React.CSSProperties),
                padding: '0 48px',
                whiteSpace: 'nowrap',
                color: 'rgba(255,255,255,0.38)',
                flexShrink: 0,
                display: 'inline-block',
              }}>
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 160,
        background: 'linear-gradient(to bottom, transparent, #030C0C)',
        zIndex: 29, pointerEvents: 'none',
      }} />
    </section>
  )
}
