import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import LiveRateBar from '../components/LiveRateBar'

gsap.registerPlugin(ScrollTrigger)

// ─── Supported Assets (Official Winity Facts) ───────────────────────────
const ASSETS = [
  { symbol: 'USDT', name: 'Tether', fee: '0%', feeLabel: 'Zero fee', color: '#26A17B', isStable: true },
  { symbol: 'USDC', name: 'USD Coin', fee: '0%', feeLabel: 'Zero fee', color: '#2775CA', isStable: true },
  { symbol: 'ETH',  name: 'Ethereum', fee: '5%', feeLabel: 'Conversion', color: '#8C8C8C', isStable: false },
  { symbol: 'SOL',  name: 'Solana',   fee: '5%', feeLabel: 'Conversion', color: '#14F195', isStable: false },
  { symbol: 'POL',  name: 'Polygon',  fee: '5%', feeLabel: 'Conversion', color: '#8247E5', isStable: false },
  { symbol: 'TRX',  name: 'Tron',     fee: '5%', feeLabel: 'Conversion', color: '#EF0027', isStable: false },
  { symbol: 'WCO',  name: 'W Chain',  fee: '5%', feeLabel: 'Conversion', color: '#21E6A7', isStable: false },
]

// ─── Network Chips ───────────────────────────────────────────────────────
const NETWORKS = [
  { name: 'Ethereum',     dot: '#8C8C8C' },
  { name: 'Solana',       dot: '#14F195' },
  { name: 'Tron',         dot: '#EF0027' },
  { name: 'Polygon',      dot: '#8247E5' },
  { name: 'BNB Chain',    dot: '#F3BA2F' },
  { name: 'W Chain',      dot: '#21E6A7' },
]


// ─── Floating Live Transaction Feed Data ─────────────────────────────────
const TRANSACTIONS = [
  { text: 'Coffee purchased in London', value: '£3.80', type: 'spend', location: 'UK' },
  { text: 'USDT transfer received', value: '+$850.00', type: 'deposit', location: 'Hong Kong' },
  { text: 'Metro fare paid in Paris', value: '€2.10', type: 'spend', location: 'France' },
  { text: 'Winity Loop bonus unlocked', value: '+$2.00', type: 'loop', location: 'Singapore' },
  { text: 'USDC transfer received', value: '+$1,500.00', type: 'deposit', location: 'USA' },
  { text: 'Hotel lounge charge in Tokyo', value: '¥14,200', type: 'spend', location: 'Japan' },
]

// ─── Cobe WebGL Globe (v2 API: uses update() + RAF for rotation) ─────────
function VolumetricGlobe() {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap   = wrapRef.current
    if (!canvas || !wrap) return

    // cobe v2 creates a wrapper div with height:100% around the canvas.
    // Without an explicit height on wrapRef, that 100% resolves to 0 (circular dependency).
    // Measure width first, then lock the wrapper to a square before createGlobe runs.
    const size = Math.min(wrap.offsetWidth || 500, 540)
    const dpr  = Math.min(window.devicePixelRatio || 1, 2)

    wrap.style.height  = `${size}px`   // lock wrapper height so cobe's inner div resolves correctly
    canvas.style.width  = `${size}px`
    canvas.style.height = `${size}px`

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width:  size * dpr,
      height: size * dpr,
      phi:    0.5,
      theta:  0.2,
      dark:   1,
      diffuse: 1.4,
      mapSamples:    16000,
      mapBrightness: 5.5,
      baseColor:   [0.08, 0.28, 0.25],
      markerColor: [0.13, 0.90, 0.65],
      glowColor:   [0.07, 0.45, 0.38],
      markers: [
        { location: [ 51.5,  -0.1], size: 0.045 }, // London
        { location: [ 40.7, -74.0], size: 0.055 }, // New York
        { location: [ 35.7, 139.7], size: 0.045 }, // Tokyo
        { location: [ 22.3, 114.2], size: 0.08  }, // Hong Kong (HQ)
        { location: [ 25.2,  55.3], size: 0.05  }, // Dubai
        { location: [  1.3, 103.8], size: 0.05  }, // Singapore
        { location: [-33.9, 151.2], size: 0.04  }, // Sydney
        { location: [ 48.9,   2.3], size: 0.045 }, // Paris
        { location: [-23.5, -46.6], size: 0.045 }, // São Paulo
        { location: [  6.5,   3.4], size: 0.04  }, // Lagos
      ],
    })

    let phi   = 0.5
    let rafId = 0
    const animate = () => {
      phi += 0.003
      globe.update({ phi })
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      globe.destroy()
    }
  }, [])

  return (
    // minHeight ensures the column has height even before the effect runs
    <div
      ref={wrapRef}
      style={{ width: '100%', maxWidth: 540, minHeight: 400, margin: '0 auto', position: 'relative' }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block' }}
        aria-label="Interactive 3D payments globe"
      />
    </div>
  )
}

// ─── Parallax Lifestyle Moments Data ─────────────────────────────────────
const MOMENTS = [
  {
    image: '/winity_lifestyle_lounge.jpg',
    eyebrow: 'Executive Benefits',
    title: 'Premium Experiences. Included.',
    description: 'The Winity Executive metal card opens access to a curated world of privilege — dedicated concierge services, exclusive lifestyle benefits, and a personal relationship manager available 24/7 for members who move at the highest level.',
  },
  {
    image: '/winity_lifestyle_travel.png',
    eyebrow: 'Nomadic Mobility',
    title: 'Spend Without Boundaries',
    description: 'Travel countries seamlessly. Digital asset-linked card conversions take place instantly inside the platform, meaning your wallet stays fully functional, converting to fiat USD locally at millions of Visa terminals.',
  },
]

// ─── GlobeSection Main component ──────────────────────────────────────────
export default function GlobeSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const headerRef    = useRef<HTMLDivElement>(null)
  const assetsGridRef = useRef<HTMLDivElement>(null)
  const networksRef  = useRef<HTMLDivElement>(null)
  const globeWrapRef = useRef<HTMLDivElement>(null)
  
  const [feedIndex, setFeedIndex] = useState(0)

  // ── Auto-scroll transaction feed
  useEffect(() => {
    const timer = setInterval(() => {
      setFeedIndex(prev => (prev + 1) % TRANSACTIONS.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  // ── GSAP Reveals & Parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column reveal
      gsap.set(headerRef.current, { opacity: 0, y: 28 })
      gsap.to(headerRef.current,
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true } }
      )

      // Asset card stagger (inside the already-revealed left col)
      const cards = document.querySelectorAll('.merged-asset-card')
      gsap.fromTo(cards,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06,
          scrollTrigger: { trigger: assetsGridRef.current, start: 'top 82%', once: true } }
      )

      // Networks
      gsap.fromTo(networksRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: networksRef.current, start: 'top 85%', once: true } }
      )

      // Globe entry — set invisible first, then slide in from right on scroll in sync with header
      gsap.set(globeWrapRef.current, { opacity: 0, x: 40, scale: 0.96 })
      gsap.to(globeWrapRef.current,
        { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true } }
      )

      // Lifestyle Parallax scrolling background translations
      const parallaxImages = gsap.utils.toArray('.lifestyle-parallax-bg')
      parallaxImages.forEach((img: any) => {
        gsap.fromTo(img,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
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

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #040E0E 0%, #061C1E 40%, #0B2E2C 100%)',
        paddingTop: 'clamp(80px, 9vw, 130px)',
        fontFamily: 'Roboto, sans-serif',
      }}
      aria-label="Winity Life digital asset ecosystem and global network"
    >
      {/* ── Copper top highlight bar (Matches global .copper-border-card layout) ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #8A5520, #B87333, #E8A84E, #B87333, #8A5520)',
          backgroundSize: '200% 100%',
          animation: 'copper-shimmer 3s ease-in-out infinite',
          zIndex: 10,
        }}
      />

      {/* Ambient backgrounds */}
      <div style={{
        position: 'absolute', top: '15%', right: '-8%',
        width: 640, height: 640, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(33,230,167,0.04) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      <div className="container-wide relative z-10" style={{ paddingBottom: 'clamp(80px, 10vw, 120px)' }}>

        {/* ── Two-column grid: left = header + content, right = globe ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-center"
          style={{ gap: 'clamp(48px, 6vw, 72px)' }}
        >

          {/* LEFT: headline + tokens + networks + callout + live rates */}
          <div ref={headerRef} className="flex flex-col gap-8">

            {/* Section headline */}
            <div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
                fontSize: 11, fontWeight: 600, letterSpacing: '0.22em',
                textTransform: 'uppercase' as const, color: '#21E6A7',
              }}>
                <span style={{ display: 'inline-block', width: 24, height: 1, background: '#21E6A7' }} />
                Ecosystem & Global Network
              </span>
              <h2 style={{
                fontSize: 'clamp(28px, 4.5vw, 56px)', fontWeight: 800,
                color: '#F4F7F6', letterSpacing: '-0.03em', lineHeight: 1.06,
              }}>
                Your digital assets.<br />
                <span className="text-gradient-mint">The whole world, accepted.</span>
              </h2>
              <p style={{
                fontSize: 'clamp(14px, 1.1vw, 16px)', color: 'rgba(244,247,246,0.5)',
                lineHeight: 1.7, maxWidth: 520, marginTop: 14,
              }}>
                Load stablecoins with zero fees, or convert non-stable digital assets instantly. One card. 200+ countries. Every Visa terminal on the planet.
              </p>
            </div>

            {/* Supported tokens — compact pill row */}
            <div ref={assetsGridRef}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(33,230,167,0.55)', marginBottom: 16 }}>
                Supported Assets
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ASSETS.map((asset) => (
                  <div
                    key={asset.symbol}
                    className="merged-asset-card"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      padding: '7px 13px 7px 9px',
                      borderRadius: 99,
                      background: 'rgba(6,28,30,0.70)',
                      border: asset.isStable ? '1px solid rgba(33,230,167,0.20)' : '1px solid rgba(255,255,255,0.07)',
                      backdropFilter: 'blur(10px)',
                      cursor: 'default',
                      transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.borderColor = asset.isStable ? 'rgba(33,230,167,0.45)' : `${asset.color}55`
                      el.style.boxShadow = `0 0 16px ${asset.isStable ? 'rgba(33,230,167,0.10)' : asset.color + '0D'}`
                      el.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.borderColor = asset.isStable ? 'rgba(33,230,167,0.20)' : 'rgba(255,255,255,0.07)'
                      el.style.boxShadow = 'none'
                      el.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: `${asset.color}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ fontSize: 7, fontWeight: 900, color: asset.color, letterSpacing: '0.02em' }}>
                        {asset.symbol.slice(0, 3)}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#F4F7F6' }}>{asset.symbol}</span>
                    {asset.isStable && (
                      <span style={{
                        fontSize: 8, fontWeight: 700, letterSpacing: '0.08em',
                        color: '#21E6A7', textTransform: 'uppercase',
                        background: 'rgba(33,230,167,0.10)', padding: '1px 5px', borderRadius: 9,
                      }}>0%</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Network chips */}
            <div ref={networksRef} style={{ opacity: 0 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(33,230,167,0.55)', marginBottom: 14 }}>
                Supported Networks
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {NETWORKS.map((net) => (
                  <div
                    key={net.name}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '5px 12px', borderRadius: 99,
                      background: 'rgba(6,20,20,0.5)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: net.dot, boxShadow: `0 0 5px ${net.dot}88`, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(244,247,246,0.65)' }}>{net.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Zero-fee callout */}
            <div style={{
              padding: '18px 22px',
              borderRadius: 16,
              background: 'linear-gradient(135deg, rgba(33,230,167,0.07) 0%, rgba(15,63,58,0.30) 100%)',
              border: '1px solid rgba(33,230,167,0.14)',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(33,230,167,0.12)',
                border: '1px solid rgba(33,230,167,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: 15, fontWeight: 900, color: '#21E6A7' }}>0%</span>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#F4F7F6', margin: '0 0 2px 0' }}>
                  Zero stablecoin transfer fees
                </p>
                <p style={{ fontSize: 11, color: 'rgba(244,247,246,0.45)', margin: 0 }}>
                  USDT & USDC loaded with no margin. Non-stable assets converted at 5%.
                </p>
              </div>
            </div>

            {/* Live market rates — CoinGecko powered */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(33,230,167,0.55)', marginBottom: 10 }}>
                Live Market Rates
              </p>
              <div style={{ borderRadius: 12, overflow: 'hidden' }}>
                <LiveRateBar />
              </div>
            </div>

          </div>

          {/* RIGHT: Globe — fills column, vertically centred */}
          <div
            ref={globeWrapRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Single relative wrapper so overlays anchor to the globe area */}
            <div style={{ position: 'relative', width: '100%', maxWidth: 540 }}>

              {/* Mint ambient glow */}
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120%', height: '120%',
                background: 'radial-gradient(circle, rgba(33,230,167,0.07) 0%, transparent 65%)',
                pointerEvents: 'none', zIndex: 0,
              }} />

              {/* Live Activity card — top-left of globe */}
              <div style={{
                position: 'absolute',
                top: 24, left: 0,
                zIndex: 20,
                pointerEvents: 'none',
                width: 230,
              }}>
                <div style={{
                  background: 'rgba(6,28,30,0.82)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(33,230,167,0.28)',
                  borderRadius: 14,
                  padding: '10px 14px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.55)',
                  display: 'flex', flexDirection: 'column', gap: 3,
                  transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#21E6A7', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Live Activity
                    </span>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#21E6A7', animation: 'pulse 1.5s infinite' }} />
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#F4F7F6', margin: 0 }}>
                    {TRANSACTIONS[feedIndex].text}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 1 }}>
                    <span style={{ fontSize: 10, color: 'rgba(244,247,246,0.4)' }}>
                      {TRANSACTIONS[feedIndex].location}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#F4F7F6' }}>
                      {TRANSACTIONS[feedIndex].value}
                    </span>
                  </div>
                </div>
              </div>

              {/* Globe */}
              <VolumetricGlobe />


            </div>
          </div>

        </div>{/* end globe-main-grid */}
      </div>

      {/* ─── FULL-BLEED PARALLAX LIFESTYLE SCROLLER ─── */}
      <div className="w-full overflow-hidden flex flex-col">
        {MOMENTS.map((mom, i) => (
          <div
            key={mom.title}
            className="w-full relative"
            style={{
              height: '80vh',
              minHeight: '480px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            {/* Parallax Background Image */}
            <img
              src={mom.image}
              alt=""
              className="lifestyle-parallax-bg"
              style={{
                position: 'absolute',
                top: '-15%', left: 0,
                width: '100%', height: '130%',
                objectFit: 'cover',
                willChange: 'transform',
                zIndex: 0,
              }}
            />

            {/* Dark gradient mask */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(3,12,12,0.9) 0%, rgba(3,12,12,0.2) 50%, rgba(3,12,12,0.85) 100%)',
              zIndex: 1,
            }} />

            {/* Overlaid glassmorphic premium benefit card */}
            <div
              className="container-wide relative z-10 flex"
              style={{
                justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                paddingInline: 'clamp(20px, 5vw, 80px)',
                width: '100%',
              }}
            >
              <div style={{
                maxWidth: 440,
                background: 'rgba(6,28,30,0.72)',
                border: '1px solid rgba(33,230,167,0.2)',
                borderRadius: 22,
                padding: '32px',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: '#21E6A7', display: 'block', marginBottom: 8,
                }}>
                  {mom.eyebrow}
                </span>
                <h3 style={{
                  fontSize: 'clamp(22px, 2.2vw, 32px)', fontWeight: 800,
                  color: '#F4F7F6', letterSpacing: '-0.02em', margin: '0 0 12px 0', lineHeight: 1.15,
                }}>
                  {mom.title}
                </h3>
                <p style={{
                  fontSize: 14, color: 'rgba(244,247,246,0.65)',
                  lineHeight: 1.65, margin: 0,
                }}>
                  {mom.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── GLOBAL STATISTICS TICKER & FINAL CTAS ─── */}
      <div className="relative z-10 py-24" style={{ background: '#030c0c' }}>
        <div className="container-wide">
          
          {/* Stats grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 20,
            marginBottom: 64,
            textAlign: 'center',
          }}>
            {[
              { value: '150M+', label: 'Visa Merchants', sub: 'Worldwide acceptance terminals' },
              { value: '200+',  label: 'Countries & Regions', sub: 'Active global membership utility' },
              { value: 'USD',   label: 'Base Denomination', sub: 'Transactions denominated in USD for global spend' },
              { value: '0%',    label: 'Stablecoin transfer fees', sub: 'Zero hidden margin on loads' },
            ].map(stat => (
              <div
                key={stat.label}
                style={{
                  padding: '24px', borderRadius: 16,
                  background: 'linear-gradient(160deg, rgba(15,63,58,0.2) 0%, rgba(6,20,20,0.4) 100%)',
                  border: '1px solid rgba(33,230,167,0.08)',
                }}
              >
                <p style={{
                  fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 900,
                  color: '#F4F7F6', letterSpacing: '-0.03em', lineHeight: 1, margin: '0 0 6px 0',
                }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#21E6A7', margin: '0 0 3px 0' }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: 11, color: 'rgba(244,247,246,0.3)', margin: 0 }}>
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
            <a
              href="https://apps.apple.com/us/app/winity-life/id6752761057"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill"
              style={{ padding: '13px 18px 13px 28px', fontSize: 15 }}
            >
              Get the App
              <span className="pill-icon" aria-hidden="true">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
                </svg>
              </span>
            </a>
            <Link
              to="/loyalty"
              className="btn-pill-outline"
              style={{ padding: '13px 18px 13px 28px', fontSize: 15 }}
            >
              View Loyalty Rewards
              <span className="pill-icon" aria-hidden="true">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Legal disclaimers in compliant fine print */}
          <div style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center', opacity: 0.38 }}>
            <p style={{ fontSize: 11, color: 'rgba(244,247,246,0.85)', lineHeight: 1.6, margin: '0 0 8px 0' }}>
              Disclaimer: Winity Life is not a bank. Digital asset-linked card services involve risks. See winity.life/terms.
            </p>
            <p style={{ fontSize: 11, color: 'rgba(244,247,246,0.85)', lineHeight: 1.6, margin: 0 }}>
              Card services are issued in Hong Kong and available globally wherever Visa® is accepted. Availability may vary by jurisdiction.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
