/**
 * ---
 * client: Winity Life
 * philosophy: Emerald Noir
 * colors:
 *   primary: "#0B2E2C"
 *   accent: "#21E6A7"
 * deliverable: Press Room Page — custom press release grid
 * phase: 6
 * date: 2026-05-28
 * status: Production
 * ---
 */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import SEO from '../components/SEO'
import { BLOG_POSTS } from '../data/blogPosts'

gsap.registerPlugin(ScrollTrigger)

// The 4 official press releases
const PRESS_SLUGS = [
  'winity-life-launches-your-card-on-us-campaign',
  'winity-life-launches-winity-loop-referral-program',
  'guide-to-spend-like-a-stallion-winitys-cny-tiered-rewards',
  'winity-life-unveils-christmas-that-keeps-giving'
]

export default function PressRoomPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          [...heroRef.current.children],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.1 }
        )
      }

      const valid = cardRefs.current.filter(Boolean)
      if (valid.length) {
        gsap.fromTo(
          valid,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
            delay: 0.15,
          }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  // Filter out the PR articles from BLOG_POSTS in the correct order of campaign releases
  const pressArticles = PRESS_SLUGS.map(slug => BLOG_POSTS.find(post => post.slug === slug)).filter(Boolean)

  return (
    <div className="bg-deep-base min-h-screen">
      <SEO
        title="Winity Press Room — Media & Announcements | Winity Life"
        description="Official press releases, product campaign updates, and media notices from @WTY Technology Hong Kong Limited."
      />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-deep to-deep-base pt-32 pb-20">
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{ width: '45%', height: '100%', background: 'radial-gradient(ellipse at top right, rgba(33,230,167,0.06) 0%, transparent 65%)' }}
          aria-hidden="true"
        />
        <div className="container-wide relative z-10">
          <div ref={heroRef}>
            <span className="text-eyebrow mb-5 inline-flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-mint" />
              Press Room
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-off-white leading-tight mb-4 tracking-tight max-w-2xl">
              Official Media &<br />
              <span className="text-mint">Announcements.</span>
            </h1>
            <p className="text-muted max-w-lg leading-relaxed" style={{ fontSize: 'clamp(15px,1.2vw,17px)' }}>
              Follow our official product campaign launches, ecosystem milestones, and digital asset payments notices.
            </p>
          </div>
        </div>
      </section>

      {/* ── PR GRID ────────────────────────────────────────────────────────── */}
      <section className="bg-deep-base pb-32">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-off-white font-bold text-xl tracking-tight">Ecosystem Releases</h2>
            <div className="h-px bg-mint/15 flex-1 mx-6 hidden sm:block" />
            <span className="text-xs text-muted/50 font-medium">@WTY Technology Hong Kong Limited</span>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pressArticles.map((post: any, i) => (
              <Link
                key={post.slug}
                ref={el => { cardRefs.current[i] = el }}
                to={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-mint/10 hover:border-mint/25 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(160deg, rgba(11,46,44,0.4) 0%, rgba(6,28,30,0.6) 100%)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
                }}
              >
                <div className="relative aspect-[16/9] overflow-hidden flex-shrink-0 border-b border-mint/5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-base/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-deep-base/80 text-mint text-xs font-semibold rounded-full border border-mint/20 backdrop-blur-sm shadow-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <span className="text-xs text-muted/60 mb-2 uppercase tracking-widest font-semibold">{post.date}</span>
                  <h3 className="text-off-white font-black text-xl leading-snug mb-4 group-hover:text-mint transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-6 flex-1 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-white/[0.04] mt-auto">
                    <span className="text-muted/50 text-xs flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {post.readTime}
                    </span>
                    <span className="text-mint text-sm font-semibold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      Read announcement <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT PRESS STRIP ────────────────────────────────────────────── */}
      <section className="bg-teal-mid py-20 border-t border-mint/10 relative overflow-hidden">
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(33,230,167,0.03) 0%, transparent 65%)',
          pointerEvents: 'none'
        }} />
        <div className="container-wide text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-black text-off-white mb-4 tracking-tight">
            Media Relations & Press Inquiry
          </h2>
          <p className="text-muted text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed">
            For press kits, logo packs, and executive interview requests, please contact our support desk or reach out via our dedicated channel.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/help"
              className="btn-pill"
            >
              Contact Support
              <span className="pill-icon" aria-hidden="true">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
                </svg>
              </span>
            </Link>
            <a
              href="https://t.me/winitylife"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-sm font-semibold text-off-white/80 hover:text-white border border-off-white/10 hover:border-mint/25 transition-all"
            >
              Telegram Media Desk
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
