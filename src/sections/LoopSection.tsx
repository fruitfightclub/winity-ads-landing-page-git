/**
 * LoopSection — Winity Life | Emerald Noir
 * ──────────────────────────────────────────────────────────────────────
 * Winity Loop referral programme.
 * Level 1 Direct Referral — only active level.
 * Both referrer + referee earn Winity Points once new user spends $10 cumulative.
 * ──────────────────────────────────────────────────────────────────────
 */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

// ── How it works steps (Level 1 only) ─────────────────────────────────────────
const HOW_IT_WORKS = [
  {
    num: '01',
    title: 'Share your link',
    desc: 'Get a unique referral link from the Winity app and send it to friends, family, or your audience.',
  },
  {
    num: '02',
    title: 'They sign up & spend',
    desc: 'Your referred friend creates a Winity account and makes their first $10 cumulative in card transactions.',
  },
  {
    num: '03',
    title: 'You both earn Winity Points',
    desc: 'The moment their spend threshold is reached, Winity Points are credited to both accounts. Automatically.',
  },
]

// ── Premium 3D Loop Network Canvas ────────────────────────────────────────────
function LoopNetworkCanvas() {
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
      S = Math.min(container ? container.offsetWidth : 480, 480)
      canvas.style.width  = `${S}px`
      canvas.style.height = `${S}px`
      canvas.width  = S * dpr
      canvas.height = S * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    let isVisible = false

    // ── Particle system ──────────────────────────────────────────────────
    interface Particle {
      friendIdx: number   // 0-4 = which friend node
      t: number           // 0→1 progress along path to YOU
      speed: number
      trail: { x: number; y: number }[]
    }

    const FRIEND_COUNT = 5
    const particles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      friendIdx: i % FRIEND_COUNT,
      t: (i / 12),
      speed: 0.0030 + (i % 4) * 0.0005,
      trail: [],
    }))

    // "earnings arrived" pulses
    const arrivals: { x: number; y: number; scale: number; alpha: number; text: string }[] = []

    const getFriendPos = (idx: number, s: number) => {
      // Arc of 5 friend nodes in a semicircle below/around the YOU node
      const total   = FRIEND_COUNT
      const spread  = Math.PI * 0.85
      const startA  = Math.PI / 2 + spread / 2
      const angle   = startA - (idx / (total - 1)) * spread
      const rx = s * 0.38
      const ry = s * 0.30
      const cx = s * 0.50
      const cy = s * 0.42
      return {
        x: cx + rx * Math.cos(angle),
        y: cy + ry * Math.sin(angle),
      }
    }

    const getYouPos = (s: number) => ({ x: s * 0.50, y: s * 0.18 })

    const draw = () => {
      if (!S) { rafRef.current = requestAnimationFrame(draw); return }
      timeRef.current += 0.016
      const t = timeRef.current
      ctx.clearRect(0, 0, S, S)

      const youP  = getYouPos(S)

      // ── Soft ambient background glow under YOU ──
      const bgGrad = ctx.createRadialGradient(youP.x, youP.y, 0, youP.x, youP.y, S * 0.45)
      bgGrad.addColorStop(0, 'rgba(33,230,167,0.07)')
      bgGrad.addColorStop(1, 'rgba(33,230,167,0)')
      ctx.beginPath()
      ctx.arc(youP.x, youP.y, S * 0.45, 0, Math.PI * 2)
      ctx.fillStyle = bgGrad
      ctx.fill()

      // ── Draw bezier connections: each friend → YOU ──
      for (let i = 0; i < FRIEND_COUNT; i++) {
        const fP = getFriendPos(i, S)
        // Bezier control point: offset toward center to create a nice arc
        const cpx = (fP.x + youP.x) / 2
        const cpy = (fP.y + youP.y) / 2 - S * 0.06

        ctx.beginPath()
        ctx.moveTo(fP.x, fP.y)
        ctx.quadraticCurveTo(cpx, cpy, youP.x, youP.y)
        ctx.strokeStyle = 'rgba(33,230,167,0.09)'
        ctx.lineWidth = 1.2
        ctx.setLineDash([4, 8])
        ctx.stroke()
        ctx.setLineDash([])
      }

      // ── Update & draw particles ──
      particles.forEach(p => {
        p.t += p.speed
        if (p.t >= 1) {
          p.t -= 1
          // Trigger arrival pulse
          arrivals.push({ x: youP.x, y: youP.y, scale: 0, alpha: 1, text: '+Pts' })
        }

        const fP = getFriendPos(p.friendIdx, S)
        const cpx = (fP.x + youP.x) / 2
        const cpy = (fP.y + youP.y) / 2 - S * 0.06

        // Quadratic bezier position
        const mt = 1 - p.t
        const px  = mt * mt * fP.x + 2 * mt * p.t * cpx + p.t * p.t * youP.x
        const py  = mt * mt * fP.y + 2 * mt * p.t * cpy + p.t * p.t * youP.y

        // Trail
        p.trail.push({ x: px, y: py })
        if (p.trail.length > 10) p.trail.shift()

        // Fade edges of travel path
        const edge = p.t < 0.10 ? p.t / 0.10 : p.t > 0.90 ? (1 - p.t) / 0.10 : 1

        // Comet trail
        p.trail.forEach((tp, ti) => {
          const tf = ti / p.trail.length
          ctx.beginPath()
          ctx.arc(tp.x, tp.y, 1.8 * tf, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(60,242,208,${edge * tf * 0.45})`
          ctx.fill()
        })

        // Particle core
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(33,230,167,${edge * 0.95})`
        ctx.shadowColor = '#21E6A7'
        ctx.shadowBlur  = 8
        ctx.fill()
        ctx.shadowBlur  = 0
      })

      // ── Arrival pulses (earning animations) ──
      for (let i = arrivals.length - 1; i >= 0; i--) {
        const a = arrivals[i]
        a.scale += 0.04
        a.alpha -= 0.022
        if (a.alpha <= 0) { arrivals.splice(i, 1); continue }

        // Expanding ring
        ctx.beginPath()
        ctx.arc(a.x, a.y, S * 0.06 * a.scale, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(33,230,167,${a.alpha * 0.55})`
        ctx.lineWidth   = 1.5
        ctx.stroke()

        // "+$2" label floating upward
        ctx.font      = `700 ${Math.round(S * 0.030)}px Roboto, sans-serif`
        ctx.textAlign = 'center'
        ctx.fillStyle = `rgba(33,230,167,${a.alpha})`
        ctx.fillText(a.text, a.x, a.y - S * 0.06 * a.scale - 8)
      }

      // ── Friend nodes ──
      for (let i = 0; i < FRIEND_COUNT; i++) {
        const fP = getFriendPos(i, S)
        const R  = S * 0.054

        // Node glow
        const nodeGrad = ctx.createRadialGradient(fP.x, fP.y, 0, fP.x, fP.y, R * 2)
        nodeGrad.addColorStop(0, 'rgba(33,230,167,0.10)')
        nodeGrad.addColorStop(1, 'rgba(33,230,167,0)')
        ctx.beginPath()
        ctx.arc(fP.x, fP.y, R * 2, 0, Math.PI * 2)
        ctx.fillStyle = nodeGrad
        ctx.fill()

        // Dark fill
        ctx.beginPath()
        ctx.arc(fP.x, fP.y, R, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(6,28,30,0.92)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(33,230,167,0.25)'
        ctx.lineWidth   = 1.2
        ctx.stroke()

        // Inner dot
        ctx.beginPath()
        ctx.arc(fP.x, fP.y, R * 0.36, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(33,230,167,0.55)'
        ctx.fill()

        // Person icon (simplified silhouette via text)
        ctx.font      = `500 ${Math.round(S * 0.026)}px Roboto, sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'rgba(244,247,246,0.5)'
        ctx.fillText('F', fP.x, fP.y)
      }

      // ── YOU node — pulsing radiant orb ──
      const youR  = S * 0.082
      const pulse = Math.abs(Math.sin(t * 1.4))

      // Outer pulse ring
      ctx.beginPath()
      ctx.arc(youP.x, youP.y, youR + S * 0.055 * pulse, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(33,230,167,${0.28 * (1 - pulse)})`
      ctx.lineWidth   = 1.5
      ctx.stroke()

      // Secondary pulse ring
      const pulse2 = Math.abs(Math.sin(t * 1.4 + 1.2))
      ctx.beginPath()
      ctx.arc(youP.x, youP.y, youR + S * 0.030 * pulse2, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(33,230,167,${0.18 * (1 - pulse2)})`
      ctx.lineWidth   = 1
      ctx.stroke()

      // Main orb — radial gradient for 3D sphere feel
      const orbGrad = ctx.createRadialGradient(
        youP.x - youR * 0.22, youP.y - youR * 0.22, 0,
        youP.x, youP.y, youR
      )
      orbGrad.addColorStop(0, '#3CF2D0')
      orbGrad.addColorStop(0.45, '#21E6A7')
      orbGrad.addColorStop(1, '#0ABFAA')
      ctx.beginPath()
      ctx.arc(youP.x, youP.y, youR, 0, Math.PI * 2)
      ctx.fillStyle = orbGrad
      ctx.shadowColor = '#21E6A7'
      ctx.shadowBlur  = 20
      ctx.fill()
      ctx.shadowBlur  = 0

      // White specular highlight
      const specGrad = ctx.createRadialGradient(
        youP.x - youR * 0.3, youP.y - youR * 0.3, 0,
        youP.x - youR * 0.15, youP.y - youR * 0.15, youR * 0.55
      )
      specGrad.addColorStop(0, 'rgba(255,255,255,0.32)')
      specGrad.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.beginPath()
      ctx.arc(youP.x, youP.y, youR, 0, Math.PI * 2)
      ctx.fillStyle = specGrad
      ctx.fill()

      // Label
      ctx.font      = `700 ${Math.round(S * 0.036)}px Roboto, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#061C1E'
      ctx.fillText('You', youP.x, youP.y)

      rafRef.current = isVisible ? requestAnimationFrame(draw) : 0
    }

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting
        if (isVisible && rafRef.current === 0) draw()
      },
      { threshold: 0.01 }
    )
    observer.observe(canvas)

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
      aria-label="Winity Loop referral network visualisation"
    />
  )
}

// ── Section ────────────────────────────────────────────────────────────────────
export default function LoopSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)
  const stepsRef   = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 72%', once: true },
        }
      )
      gsap.fromTo(
        rightRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 72%', once: true },
        }
      )
      const validSteps = stepsRef.current.filter(Boolean)
      gsap.fromTo(
        validSteps,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: section, start: 'top 66%', once: true },
          delay: 0.3,
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-28"
      aria-label="Winity Loop referral programme"
      style={{ background: '#040E0E' }}
    >
      {/* ── Winity Loop design as background — cropped + dimmed ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0,
        }}
      >
        <img
          src="/Winity Loop design.webp"
          alt=""
          style={{
            position: 'absolute',
            top: '-10%', right: '-5%',
            width: '65%', height: '120%',
            objectFit: 'contain',
            objectPosition: 'center right',
            opacity: 0.04,
            filter: 'saturate(0.5) brightness(2)',
            pointerEvents: 'none',
          }}
        />
        {/* Gradient vignette over the design background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 100% at 0% 50%, #040E0E 30%, transparent 100%)',
        }} />
      </div>

      {/* Ambient teal glows */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '10%', left: '5%',
        width: '40%', height: '60%',
        background: 'radial-gradient(ellipse, rgba(33,230,167,0.05) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Copy + How it works ── */}
          <div ref={leftRef}>

            <span className="text-eyebrow mb-5 inline-flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-mint" />
              Winity Loop
            </span>

            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 900,
              color: '#F4F7F6',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              marginBottom: 16,
            }}>
              When your friends spend,{' '}
              <span className="text-gradient-mint">you both win.</span>
            </h2>

            <p style={{
              fontSize: 'clamp(15px, 1.15vw, 17px)',
              color: 'rgba(244,247,246,0.55)',
              lineHeight: 1.72,
              marginBottom: 36,
              maxWidth: 480,
            }}>
              Share Winity with your network. When a friend you invite makes their first eligible card
              transactions, you both earn Winity Points. No limits, no expiry, no fine print.
            </p>

            {/* How it works — 3 steps */}
            <div className="flex flex-col gap-4">
              {HOW_IT_WORKS.map((step, i) => (
                <div
                  key={step.num}
                  ref={(el) => { stepsRef.current[i] = el }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 16,
                    padding: '18px 20px',
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, rgba(15,63,58,0.35) 0%, rgba(6,20,20,0.55) 100%)',
                    border: '1px solid rgba(33,230,167,0.10)',
                    transition: 'border-color 0.3s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(33,230,167,0.28)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(33,230,167,0.10)' }}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%',
                    background: 'rgba(33,230,167,0.12)',
                    border: '1px solid rgba(33,230,167,0.28)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontSize: 10, fontWeight: 900, color: '#21E6A7', letterSpacing: '0.05em' }}>
                      {step.num}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#F4F7F6', margin: '0 0 4px 0' }}>
                      {step.title}
                    </p>
                    <p style={{ fontSize: 13, color: 'rgba(244,247,246,0.50)', margin: 0, lineHeight: 1.6 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Earn badge */}
            <div style={{
              marginTop: 24,
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: '12px 20px',
              borderRadius: 99,
              background: 'linear-gradient(90deg, rgba(33,230,167,0.12) 0%, rgba(33,230,167,0.06) 100%)',
              border: '1px solid rgba(33,230,167,0.22)',
            }}>
              <span style={{
                fontSize: 20, fontWeight: 900, color: '#21E6A7',
                textShadow: '0 0 20px rgba(33,230,167,0.5)',
              }}>Points</span>
              <span style={{ fontSize: 13, color: 'rgba(244,247,246,0.65)', fontWeight: 500 }}>
                earned by <strong style={{ color: '#F4F7F6' }}>both</strong> of you per successful referral
              </span>
            </div>

            <div className="flex gap-3 mt-8 flex-wrap">
              <Link to="/referral" className="btn-pill" style={{ padding: '10px 14px 10px 22px', fontSize: 14 }}>
                Start Earning
                <span className="pill-icon" style={{ width: 28, height: 28 }} aria-hidden="true">
                  <svg width="12" height="12" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
                  </svg>
                </span>
              </Link>
              <Link to="/referral" className="btn-pill-outline" style={{ padding: '10px 14px 10px 22px', fontSize: 14 }}>
                Learn More
                <span className="pill-icon" style={{ width: 28, height: 28 }} aria-hidden="true">
                  <svg width="12" height="12" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* ── Right: Premium animated network diagram ── */}
          <div ref={rightRef} className="hidden lg:flex items-center justify-center relative">
            {/* Subtle glow behind the canvas */}
            <div style={{
              position: 'absolute',
              width: '80%', height: '80%',
              background: 'radial-gradient(circle, rgba(33,230,167,0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <LoopNetworkCanvas />
          </div>

        </div>
      </div>
    </section>
  )
}
