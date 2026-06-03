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

// ── Crypto icons ──────────────────────────────────────────────────────────────
// These represent DEPOSIT ASSETS only — funds are converted to USD for card spend.
// Colors are brand-official to represent the actual supported tokens.
const CRYPTO_ICONS = [
  {
    // Left-side top — 10 o'clock position
    id: 'usdt', label: 'USDT', color: '#26A17B', glow: 'rgba(38,161,123,0.25)',
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.43 6.94H13.2v5.7h-2.4v-5.7H7.43v-1.5h8v1.5zm0-2.2H7.43v-1.5h8v1.5z" fill="#26A17B" />
      </svg>
    ),
    pos: { left: '10%', top: '18%' },
  },
  {
    // Left-side mid — 8 o'clock
    id: 'usdc', label: 'USDC', color: '#2775CA', glow: 'rgba(39,117,202,0.25)',
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#2775CA" />
        <path d="M15.972 13.923c-.272-1.353-1.666-1.848-3.926-2.128-1.564-.194-2.036-.575-2.036-1.15 0-.528.423-.95 1.272-.95.836 0 1.22.308 1.377.94h1.996c-.198-1.488-1.258-2.457-2.91-2.695V6h-1.674v1.942c-1.748.243-2.936 1.31-2.936 2.809 0 1.486 1.206 2.054 3.723 2.378 1.84.24 2.239.697 2.239 1.24 0 .546-.576.993-1.423.993-.974 0-1.49-.39-1.615-1.1h-2.052c.162 1.637 1.426 2.585 3.09 2.827V18h1.674v-1.936c1.782-.224 3.037-1.196 2.977-2.14z" fill="#FFF" />
      </svg>
    ),
    pos: { left: '22%', top: '46%' },
  },
  {
    // Right-side top — 2 o'clock
    id: 'sol', label: 'SOL', color: '#14F195', glow: 'rgba(20,241,149,0.25)',
    svg: (
      <svg viewBox="0 0 40 40" width="22" height="22">
        <defs>
          <linearGradient id="solana-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9945FF" />
            <stop offset="100%" stopColor="#14F195" />
          </linearGradient>
        </defs>
        <path d="M30 11H12.5L9.5 14H27L30 11ZM27 18.5H9.5L6.5 21.5H24L27 18.5ZM24 26H6.5L3.5 29H21L24 26Z" fill="url(#solana-grad)" />
      </svg>
    ),
    pos: { right: '10%', top: '18%' },
  },
  {
    // Right-side mid — 4 o'clock
    id: 'eth', label: 'ETH', color: '#8C8C8C', glow: 'rgba(140,140,140,0.25)',
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" style={{ display: 'block' }}>
        <path d="M12 2L11.83 2.56v12.83l.17.17 5.5-3.25L12 2z" fill="#343433" />
        <path d="M12 2L6.5 12.31l5.5 3.25V2.56L12 2z" fill="#8C8C8C" />
        <path d="M12 16.59l-.09.11v4.74l.09.26 5.51-3.24L12 16.59z" fill="#3C3C3D" />
        <path d="M12 21.7v-5.11l-5.5 1.87L12 21.7z" fill="#8C8C8C" />
        <path d="M12 15.4L17.5 12.15 12 8.9V15.4z" fill="#141414" />
        <path d="M12 8.9L6.5 12.15 12 15.4V8.9z" fill="#3C3C3D" />
      </svg>
    ),
    pos: { right: '22%', top: '46%' },
  },
]

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

      tl.from('.crypto-icon', { opacity: 0, scale: 0.5, stagger: 0.12, duration: 0.8, ease: 'back.out(1.4)' }, 1.2)
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

      // LEFT cards fan out (Executive cards) — scaled down travel for smaller cards
      st.to('.ec-0', { x: -80,  y: 20,  rotation: -8,  ease: 'none' }, 0)
      st.to('.ec-1', { x: -160, y: 8,   rotation: -18, ease: 'none' }, 0)
      st.to('.ec-2', { x: -240, y: -10, rotation: -28, ease: 'none' }, 0)
      st.to('.ec-3', { x: -320, y: -30, rotation: -38, ease: 'none' }, 0)

      // RIGHT cards fan out (Exclusive cards) — scaled down travel
      st.to('.dk-0', { x: 80,   y: 20,  rotation: 8,   ease: 'none' }, 0)
      st.to('.dk-1', { x: 160,  y: 8,   rotation: 18,  ease: 'none' }, 0)
      st.to('.dk-2', { x: 240,  y: -10, rotation: 28,  ease: 'none' }, 0)
      st.to('.dk-3', { x: 320,  y: -30, rotation: 38,  ease: 'none' }, 0)

      // Icons collapse behind phone center on scroll
      // USDT (far left) travels far right inward; USDC (closer) shorter travel
      st.to('#icon-usdt', { x: '18vw', y: 90, opacity: 0, ease: 'none' }, 0)
      st.to('#icon-usdc', { x: '6vw',  y: 50, opacity: 0, ease: 'none' }, 0)
      // SOL (far right) travels far left inward; ETH (closer) shorter travel
      st.to('#icon-sol',  { x: '-18vw', y: 90, opacity: 0, ease: 'none' }, 0)
      st.to('#icon-eth',  { x: '-6vw',  y: 50, opacity: 0, ease: 'none' }, 0)

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
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
        paddingTop: 'clamp(80px, 10vh, 120px)',
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
          Many ways to move,<br />One way to pay.
        </h1>
      </div>

      {/* ── Hero Stage ─────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        height: 'clamp(520px, 60vh, 720px)',
        width: '100%',
        marginTop: 'clamp(32px, 4vh, 56px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}>

        {/* Crypto icons — U-shape along arch */}
        {CRYPTO_ICONS.map((coin) => (
          <div
            id={`icon-${coin.id}`}
            key={coin.id}
            className="crypto-icon"
            style={{
              position: 'absolute',
              ...coin.pos,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 8,
              pointerEvents: 'none',
              willChange: 'transform, opacity',
            }}
          >
            <div style={{
              width: 56, height: 56,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(33,230,167,0.15) 0%, rgba(60,242,208,0.06) 100%)',
              border: '1.5px solid rgba(33,230,167,0.32)',
              boxShadow: '0 0 22px rgba(33,230,167,0.14), 0 0 6px rgba(33,230,167,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }}>
              {coin.svg}
            </div>
          </div>
        ))}

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
              width: 'clamp(200px, 21vw, 290px)',
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
              src="https://winity.life/wp-content/uploads/2025/11/Exclusive-Physical.webp"
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
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        paddingBlock: 28,
        background: 'rgba(3,12,12,0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to right, #030C0C, transparent)', zIndex: 10 }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to left, #030C0C, transparent)', zIndex: 10 }} />
        <p style={{
          textAlign: 'center', marginBottom: 18,
          color: 'rgba(255,255,255,0.26)', fontSize: 12, fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '0.24em',
        }}>
          Featured On
        </p>
        <div style={{ overflow: 'hidden' }}>
          <div className="pr-track" style={{ display: 'flex', width: 'max-content' }}>
            {[...PR_LOGOS, ...PR_LOGOS].map((logo, i) => (
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
