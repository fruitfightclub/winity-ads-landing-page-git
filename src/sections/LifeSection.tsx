import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const MOMENTS = [
  {
    image: '/exp_lounge.png',
    label: 'Airport Lounge, Dubai',
    tag: 'Executive Benefit',
    accent: 'copper' as const,
  },
  {
    image: '/exp_lifestyle_train.png',
    label: 'Rail Journey, Europe',
    tag: 'Travel Rewards',
    accent: 'mint' as const,
  },
  {
    image: '/exp_cards_closeup.png',
    label: 'Spend Everywhere',
    tag: '150M+ Merchants',
    accent: 'mint' as const,
  },
]

export default function LifeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const copyRef    = useRef<HTMLDivElement>(null)
  const imgRefs    = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        copyRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 72%', once: true },
        }
      )

      const valid = imgRefs.current.filter(Boolean)
      gsap.fromTo(
        valid,
        { x: 40, opacity: 0, scale: 0.97 },
        {
          x: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: section, start: 'top 70%', once: true },
          delay: 0.15,
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  // ── 3D kinetic tilt on each image card ────────────────────────────────────
  useEffect(() => {
    const cards = imgRefs.current.filter(Boolean) as HTMLDivElement[]
    const cleanups: (() => void)[] = []

    cards.forEach((el) => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left - r.width  / 2) / (r.width  / 2)
        const y = (e.clientY - r.top  - r.height / 2) / (r.height / 2)
        gsap.to(el, {
          rotateX: -y * 6,
          rotateY:  x * 10,
          scale:    1.025,
          duration: 0.45,
          ease:     'power2.out',
          transformPerspective: 900,
        })
      }
      const onLeave = () => gsap.to(el, {
        rotateX: 0, rotateY: 0, scale: 1,
        duration: 0.75, ease: 'back.out(1.2)',
      })
      el.style.willChange = 'transform'
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanups.forEach(fn => fn())
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-deep-base py-24 overflow-hidden"
      aria-label="Life in motion"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left — copy */}
          <div ref={copyRef}>
            <span className="text-eyebrow mb-5 inline-flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-mint" />
              Life in Motion
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-off-white leading-tight mb-6 tracking-tight">
              One card for<br />
              <span className="text-mint">every life you live.</span>
            </h2>
            <p className="text-muted mb-6 leading-relaxed max-w-md" style={{ fontSize: 'clamp(15px,1.2vw,17px)' }}>
              Tokyo at midnight. A wine cellar in Bordeaux. A suite in Dubai you
              didn't plan for. Your Winity card travels with you and earns on
              everything you were already doing.
            </p>
            <p className="text-muted mb-8 leading-relaxed max-w-md" style={{ fontSize: 'clamp(15px,1.2vw,17px)' }}>
              Zero spend fees on the Exclusive card. 1 point per $10 on everything.
              Upgrade to Executive for the fastest earn rate and included benefits
              that match the way you travel.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/loyalty" className="btn-pill">
                View Loyalty
                <span className="pill-icon" aria-hidden="true">
                  <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
                  </svg>
                </span>
              </Link>
              <Link to="/exclusive" className="btn-ghost">
                Compare cards <ArrowRight size={14} className="inline-block" />
              </Link>
            </div>
          </div>

          {/* Right — 3D kinetic image stack */}
          <div className="relative grid grid-cols-2 gap-3">

            {/* ── Decorative orbital rings (depth layer behind images) ── */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '140%', height: '140%',
                pointerEvents: 'none', zIndex: 0,
              }}
            >
              <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', height: '100%' }}
              >
                {/* Animated dashed outer ring */}
                <circle cx="250" cy="250" r="235" stroke="#21E6A7" strokeWidth="0.6"
                  strokeDasharray="3 10" opacity="0.12">
                  <animateTransform attributeName="transform" type="rotate"
                    from="0 250 250" to="360 250 250" dur="60s" repeatCount="indefinite" />
                </circle>
                {/* Static copper inner ring */}
                <circle cx="250" cy="250" r="180" stroke="#B87333" strokeWidth="0.5"
                  strokeDasharray="2 8" opacity="0.10" />
                {/* Faint fill glow */}
                <circle cx="250" cy="250" r="200"
                  fill="url(#life-glow)" opacity="0.06" />
                <defs>
                  <radialGradient id="life-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#21E6A7" />
                    <stop offset="100%" stopColor="#21E6A7" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* Accent dots at cardinal points */}
                {[0, 90, 180, 270].map((deg, i) => {
                  const rad = (deg * Math.PI) / 180
                  return (
                    <circle key={i}
                      cx={250 + 235 * Math.cos(rad)} cy={250 + 235 * Math.sin(rad)}
                      r="2.5" fill={i % 2 === 0 ? '#21E6A7' : '#B87333'} opacity="0.35"
                    />
                  )
                })}
              </svg>
            </div>

            {/* Top full-width */}
            <div
              ref={el => { imgRefs.current[0] = el }}
              className="col-span-2 relative rounded-2xl overflow-hidden group"
              style={{
                height: '220px', zIndex: 1,
                boxShadow: '0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(184,115,51,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <img
                src={MOMENTS[0].image}
                alt={MOMENTS[0].label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: 'center 30%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-base/80 via-transparent to-transparent" />
              {/* Top copper accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, transparent, #B87333, #E8A84E, #B87333, transparent)' }}
                aria-hidden="true"
              />
              {/* Specular highlight on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)' }}
              />
              <div className="absolute bottom-4 left-4">
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-copper/20 text-copper-bright border border-copper/30 mb-1.5 backdrop-blur-sm">
                  {MOMENTS[0].tag}
                </span>
                <p className="text-off-white font-semibold text-sm">{MOMENTS[0].label}</p>
              </div>
            </div>

            {/* Bottom two */}
            {MOMENTS.slice(1).map((m, i) => (
              <div
                key={m.label}
                ref={el => { imgRefs.current[i + 1] = el }}
                className="relative rounded-2xl overflow-hidden group"
                style={{
                  height: '180px', zIndex: 1,
                  boxShadow: i === 0
                    ? '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(33,230,167,0.10), inset 0 1px 0 rgba(255,255,255,0.05)'
                    : '0 16px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(33,230,167,0.08)',
                }}
              >
                <img
                  src={m.image}
                  alt={m.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-base/80 via-transparent to-transparent" />
                {/* Specular highlight */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)' }}
                />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-mint/15 text-mint border border-mint/20 mb-1 backdrop-blur-sm">
                    {m.tag}
                  </span>
                  <p className="text-off-white font-semibold text-xs leading-snug">{m.label}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
