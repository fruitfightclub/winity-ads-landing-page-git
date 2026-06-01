/**
 * GlobeSection — Winity Life | Emerald Noir
 * ─────────────────────────────────────────────────────────────────────
 * High-fidelity combined digital ecosystem and global reach component.
 * - Volumetric 3D Globe with 3D flying transaction arcs & sparks.
 * - Supported Assets Grid (USDT, USDC, ETH, SOL, POL, TRX, WCO) with zero stablecoin fees.
 * - Networks Chips bar.
 * - Real-time scrolling transaction notifications.
 * - Full-bleed vertical parallax lifestyle story telling scroller (Airport Lounge, Rail Journey).
 * - Global Stats Ticker.
 * ─────────────────────────────────────────────────────────────────────
 */
import { useEffect, useRef, useState } from 'react'
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

// ─── Cities & 3D Connections for Globe ─────────────────────────────────────
interface City {
  name: string
  lat: number
  lng: number
}

interface ScreenCity extends City {
  x: number
  y: number
  z: number
}

const CITIES: City[] = [
  { name: 'London',       lat: 51.5,   lng: -0.1   },
  { name: 'New York',     lat: 40.7,   lng: -74.0  },
  { name: 'Tokyo',        lat: 35.7,   lng: 139.7  },
  { name: 'Hong Kong',    lat: 22.3,   lng: 114.2  },
  { name: 'Dubai',        lat: 25.2,   lng: 55.3   },
  { name: 'Singapore',    lat: 1.3,    lng: 103.8  },
  { name: 'Sydney',       lat: -33.9,  lng: 151.2  },
  { name: 'Paris',        lat: 48.9,   lng: 2.3    },
  { name: 'São Paulo',    lat: -23.5,  lng: -46.6  },
  { name: 'Lagos',        lat: 6.5,    lng: 3.4    },
]

const CONNECTION_PAIRS: [number, number][] = [
  [0, 1], // London -> New York
  [3, 4], // Hong Kong -> Dubai
  [5, 2], // Singapore -> Tokyo
  [0, 7], // London -> Paris
  [3, 5], // Hong Kong -> Singapore
  [1, 8], // New York -> São Paulo
]

const PULSE_INDICES = [0, 1, 3, 4, 5]

function project(lat: number, lng: number, cx: number, cy: number, radius: number, rotation: number) {
  const phi   = ((90 - lat) * Math.PI) / 180
  const theta = ((lng + 180) * Math.PI) / 180
  const x = cx + radius * Math.sin(phi) * Math.cos(theta + rotation)
  const y = cy + radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta + rotation)
  return { x, y, z }
}

// ─── Floating Live Transaction Feed Data ─────────────────────────────────
const TRANSACTIONS = [
  { text: 'Coffee purchased in London', value: '£3.80', type: 'spend', location: 'UK' },
  { text: 'USDT transfer received', value: '+$850.00', type: 'deposit', location: 'Hong Kong' },
  { text: 'Metro fare paid in Paris', value: '€2.10', type: 'spend', location: 'France' },
  { text: 'Winity Loop bonus unlocked', value: '+$2.00', type: 'loop', location: 'Singapore' },
  { text: 'USDC transfer received', value: '+$1,500.00', type: 'deposit', location: 'USA' },
  { text: 'Hotel lounge charge in Tokyo', value: '¥14,200', type: 'spend', location: 'Japan' },
]

// ─── 3D Canvas Globe Component ───────────────────────────────────────────
function VolumetricGlobe() {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const rotRef       = useRef(0)
  const timeRef      = useRef(0)
  const rafRef       = useRef<number>(0)
  const activePairTimerRef = useRef(0)
  const activePairIndexRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let SIZE = 0

    const resize = () => {
      const container = canvas.parentElement
      const maxSize = Math.min(container ? container.offsetWidth : 440, 440)
      SIZE = maxSize
      canvas.style.width  = `${SIZE}px`
      canvas.style.height = `${SIZE}px`
      canvas.width  = SIZE * dpr
      canvas.height = SIZE * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    let isVisible = false
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting
        if (isVisible && rafRef.current === 0) draw()
      },
      { threshold: 0.01 }
    )
    observer.observe(canvas)

    const draw = () => {
      if (!SIZE) { rafRef.current = requestAnimationFrame(draw); return }

      rotRef.current  += 0.0025
      timeRef.current += 0.016
      
      activePairTimerRef.current++
      if (activePairTimerRef.current > 180) {
        activePairTimerRef.current = 0
        activePairIndexRef.current = (activePairIndexRef.current + 1) % CONNECTION_PAIRS.length
      }

      ctx.clearRect(0, 0, SIZE, SIZE)
      const cx = SIZE / 2
      const cy = SIZE / 2
      const R  = SIZE * 0.38
      const rot = rotRef.current
      const t   = timeRef.current

      // 1. Draw solid background space & back-globe shadow
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = '#030c0c'
      ctx.fill()

      // 2. Draw Latitude/Longitude coordinate grids
      ctx.setLineDash([3, 6])
      ctx.strokeStyle = 'rgba(33,230,167,0.06)'
      ctx.lineWidth = 0.8
      for (let latDeg = -60; latDeg <= 60; latDeg += 30) {
        const phi = ((90 - latDeg) * Math.PI) / 180
        const ry  = R * Math.cos(phi)
        const rx  = R * Math.sin(phi)
        if (rx < 1) continue
        ctx.beginPath()
        ctx.ellipse(cx, cy + ry, rx, rx * 0.15, 0, 0, Math.PI * 2)
        ctx.stroke()
      }
      for (let lngDeg = 0; lngDeg < 180; lngDeg += 30) {
        const theta = (lngDeg * Math.PI) / 180
        const angle = theta + rot
        ctx.beginPath()
        ctx.ellipse(cx, cy, R * Math.abs(Math.cos(angle)), R, 0, 0, Math.PI * 2)
        ctx.stroke()
      }
      ctx.setLineDash([])

      // 3. Project Cities in 3D
      const projected: ScreenCity[] = CITIES.map(city => {
        const { x, y, z } = project(city.lat, city.lng, cx, cy, R, rot)
        return { ...city, x, y, z }
      })

      // 4. Draw True 3D Flying Arcs (Dynamic altitudes, rotation-aware depth occlusion)
      CONNECTION_PAIRS.forEach((pair, pairIdx) => {
        const [ai, bi] = pair
        const cityA = projected[ai]
        const cityB = projected[bi]

        const isCurrentArc = pairIdx === activePairIndexRef.current

        // Calculate segment points along the spherical arc
        const STEPS = 20
        const points2D: { x: number; y: number; z: number }[] = []
        let totalZ = 0

        for (let step = 0; step <= STEPS; step++) {
          const p = step / STEPS
          const lat_p = cityA.lat + p * (cityB.lat - cityA.lat)
          
          let lngDiff = cityB.lng - cityA.lng
          if (lngDiff > 180) lngDiff -= 360
          if (lngDiff < -180) lngDiff += 360
          const lng_p = cityA.lng + p * lngDiff

          // Bubble the arc radius outwards in a beautiful sine curve (max 28px altitude)
          const altitude = Math.sin(p * Math.PI) * 26
          const Rp = R + altitude

          const pt = project(lat_p, lng_p, cx, cy, Rp, rot)
          points2D.push(pt)
          totalZ += pt.z
        }

        const avgZ = totalZ / (STEPS + 1)
        
        // Hide/dim paths that are behind the globe
        if (avgZ > -R * 0.3) {
          const depthAlpha = Math.max(0.04, (avgZ + R) / (2 * R))
          const alphaMultiplier = isCurrentArc ? 0.48 : 0.15
          
          ctx.beginPath()
          ctx.moveTo(points2D[0].x, points2D[0].y)
          for (let step = 1; step <= STEPS; step++) {
            ctx.lineTo(points2D[step].x, points2D[step].y)
          }
          ctx.strokeStyle = `rgba(33,230,167,${depthAlpha * alphaMultiplier})`
          ctx.lineWidth = isCurrentArc ? 1.2 : 0.8
          if (!isCurrentArc) {
            ctx.setLineDash([2, 4])
          }
          ctx.stroke()
          ctx.setLineDash([])

          // If current active arc, animate a flying spark traveling along the projected 3D coordinates
          if (isCurrentArc) {
            const sparkProgress = (t * 0.5) % 1
            const sparkIndex = Math.floor(sparkProgress * STEPS)
            const nextIndex = Math.min(sparkIndex + 1, STEPS)
            const remainder = (sparkProgress * STEPS) % 1
            
            const ptA = points2D[sparkIndex]
            const ptB = points2D[nextIndex]
            
            if (ptA && ptB && ptA.z > 0) {
              const sparkX = ptA.x + remainder * (ptB.x - ptA.x)
              const sparkY = ptA.y + remainder * (ptB.y - ptA.y)

              ctx.beginPath()
              ctx.arc(sparkX, sparkY, 3, 0, Math.PI * 2)
              ctx.fillStyle = '#21E6A7'
              ctx.shadowColor = '#21E6A7'
              ctx.shadowBlur = 8
              ctx.fill()
              ctx.shadowBlur = 0 // reset
            }
          }
        }
      })

      // 5. Draw Cities (Strictly occlude/clip dots rotating to back side)
      projected.forEach((city, idx) => {
        // Deep back-side occlusion
        if (city.z < -R * 0.1) return

        const depthAlpha = Math.max(0.1, (city.z + R) / (2 * R))
        const isFacing   = city.z > 0.05
        const dotR       = isFacing ? 3.5 : 1.5
        const alpha      = isFacing ? depthAlpha * 0.95 : 0.15

        // Dot
        ctx.beginPath()
        ctx.arc(city.x, city.y, dotR, 0, Math.PI * 2)
        ctx.fillStyle = isFacing ? `rgba(33,230,167,${alpha})` : `rgba(143,163,160,${alpha})`
        ctx.fill()

        // Volumetric pulsing locator for active nodes
        if (PULSE_INDICES.includes(idx) && isFacing) {
          const pulseScale = 5 + 6 * Math.abs(Math.sin(t * 1.5 + idx * 1.1))
          const pulseAlpha = 0.5 * (1 - Math.abs(Math.sin(t * 1.5 + idx * 1.1)))
          
          ctx.beginPath()
          ctx.arc(city.x, city.y, pulseScale, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(33,230,167,${pulseAlpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
          
          ctx.beginPath()
          ctx.arc(city.x, city.y, 4, 0, Math.PI * 2)
          ctx.fillStyle = '#21E6A7'
          ctx.fill()
        }
      })

      // 6. Volumetric Radial Glass Sphere Shading (Rim highlight and dark shadow overlay)
      const rimHighlight = ctx.createRadialGradient(cx - R * 0.1, cy - R * 0.1, R * 0.75, cx, cy, R * 1.03)
      rimHighlight.addColorStop(0, 'rgba(33,230,167,0)')
      rimHighlight.addColorStop(0.75, 'rgba(33,230,167,0.03)')
      rimHighlight.addColorStop(0.96, 'rgba(33,230,167,0.18)')
      rimHighlight.addColorStop(1, 'rgba(33,230,167,0.35)')
      
      ctx.beginPath()
      ctx.arc(cx, cy, R * 1.03, 0, Math.PI * 2)
      ctx.fillStyle = rimHighlight
      ctx.fill()

      rafRef.current = isVisible ? requestAnimationFrame(draw) : 0
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      window.removeEventListener('resize', resize)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="block mx-auto relative z-10"
      aria-label="Interactive 3D payments globe"
    />
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
      // Header reveal
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true } }
      )

      // Asset cards
      const cards = document.querySelectorAll('.merged-asset-card')
      gsap.fromTo(cards,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: assetsGridRef.current, start: 'top 80%', once: true } }
      )

      // Networks Chips bar
      gsap.fromTo(networksRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: networksRef.current, start: 'top 85%', once: true } }
      )

      // Globe entry
      gsap.fromTo(globeWrapRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: globeWrapRef.current, start: 'top 78%', once: true } }
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

      <div className="container-wide relative z-10" style={{ marginBottom: 'clamp(80px, 10vw, 120px)' }}>

        {/* ── Section Header ── */}
        <div ref={headerRef} style={{ marginBottom: 'clamp(48px, 6vh, 72px)', opacity: 0 }}>
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
            maxWidth: 620,
          }}>
            Your digital assets.<br />
            <span className="text-gradient-mint">The whole world, accepted.</span>
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.1vw, 16px)', color: 'rgba(244,247,246,0.5)',
            lineHeight: 1.7, maxWidth: 580, marginTop: 14,
          }}>
            Load stablecoins with zero fees, or convert non-stable digital assets instantly. One card. 200+ countries. Every Visa terminal on the planet.
          </p>
        </div>

        {/* ── Two Column Dynamic Story Telling Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
          gap: 'clamp(32px, 5vw, 72px)',
          alignItems: 'center',
        }}>
          <style>{`
            @media (min-width: 1024px) {
              .globe-story-grid { grid-template-columns: 1.1fr 0.9fr !important; }
            }
          `}</style>

          {/* LEFT: Compact token pills + network chips — clean, minimal */}
          <div className="flex flex-col gap-8">

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

          {/* RIGHT: High-Fidelity Volumetric Globe + Real-time Spend overlays */}
          <div ref={globeWrapRef} className="flex flex-col items-center justify-center relative" style={{ opacity: 0 }}>
            {/* Backdrop lighting */}
            <div style={{
              position: 'absolute', width: '90%', height: '90%',
              background: 'radial-gradient(circle, rgba(33,230,167,0.04) 0%, transparent 70%)',
              zIndex: 0, pointerEvents: 'none',
            }} />

            {/* Scrolling Transaction Overlays */}
            <div style={{
              position: 'absolute',
              top: '5%', left: '5%',
              zIndex: 20,
              pointerEvents: 'none',
              width: '240px',
            }}>
              <div style={{
                background: 'rgba(6,28,30,0.78)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(33,230,167,0.25)',
                borderRadius: 14,
                padding: '10px 14px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
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

            {/* Volumetric Rotating Canvas Globe */}
            <VolumetricGlobe />

            {/* Static labels around the globe */}
            <div style={{
              position: 'absolute', bottom: '15%', right: '8%',
              background: 'rgba(11,46,44,0.85)',
              border: '1px solid rgba(33,230,167,0.22)',
              borderRadius: 20, padding: '4px 12px',
              backdropFilter: 'blur(10px)',
              zIndex: 12,
            }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#21E6A7' }}>Hong Kong Node (HQ)</span>
            </div>
            <div style={{
              position: 'absolute', top: '15%', left: '8%',
              background: 'rgba(11,46,44,0.85)',
              border: '1px solid rgba(33,230,167,0.22)',
              borderRadius: 20, padding: '4px 12px',
              backdropFilter: 'blur(10px)',
              zIndex: 12,
            }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#F4F7F6' }}>Visa network routing</span>
            </div>
          </div>
        </div>

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
