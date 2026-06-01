import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import SEO from '../components/SEO'
import { BLOG_POSTS } from '../data/blogPosts'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = ['All', 'Product', 'Partnerships', 'How It Works', 'Rewards']

export default function BlogPage() {
  const heroRef     = useRef<HTMLDivElement>(null)
  const gridRef     = useRef<HTMLDivElement>(null)
  const cardRefs    = useRef<(HTMLAnchorElement | null)[]>([])

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
            y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
            delay: 0.2,
          }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  const [featured, ...rest] = BLOG_POSTS

  return (
    <div className="bg-deep-base min-h-screen">
      <SEO
        title="Winity Journal — Global Finance and Lifestyle | Winity Life"
        description="Product updates, how-to guides, and lifestyle stories for the borderless professional. The Winity Life Journal."
      />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-deep to-deep-base pt-24 pb-20">
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{ width: '45%', height: '100%', background: 'radial-gradient(ellipse at top right, rgba(33,230,167,0.06) 0%, transparent 65%)' }}
          aria-hidden="true"
        />
        <div className="container-wide relative z-10">
          <div ref={heroRef}>
            <span className="text-eyebrow mb-5 inline-flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-mint" />
              Winity Journal
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-off-white leading-tight mb-4 tracking-tight max-w-2xl">
              Stories for the<br />
              <span className="text-mint">borderless professional.</span>
            </h1>
            <p className="text-muted max-w-lg leading-relaxed" style={{ fontSize: 'clamp(15px,1.2vw,17px)' }}>
              Product updates, guides, and lifestyle writing for people who work,
              spend, and live across borders.
            </p>
          </div>
        </div>
      </section>

      {/* ── FEATURED ARTICLE ───────────────────────────────────────────────── */}
      <section className="bg-deep-base py-12">
        <div className="container-wide">
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-2xl overflow-hidden border border-off-white/[0.06] hover:border-mint/20 transition-colors duration-300"
          >
            <div className="relative aspect-[16/9] lg:aspect-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: '280px' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-deep-base/20" />
            </div>

            <div className="p-8 lg:p-10 flex flex-col justify-center bg-teal-deep/40">
              <div className="flex items-center gap-3 mb-5">
                <span className="px-3 py-1 bg-mint/15 text-mint text-xs font-semibold rounded-full border border-mint/20">
                  {featured.category}
                </span>
                <span className="text-muted text-xs flex items-center gap-1.5">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  {featured.readTime}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-off-white leading-tight mb-4 tracking-tight group-hover:text-mint transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-2 text-mint text-sm font-semibold">
                Read article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── ARTICLE GRID ───────────────────────────────────────────────────── */}
      <section className="bg-deep-base pb-24">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-off-white font-bold text-xl">Latest articles</h2>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.slice(0, 4).map(cat => (
                <span
                  key={cat}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border border-off-white/10 text-muted hover:border-mint/30 hover:text-mint transition-colors cursor-default"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <Link
                key={post.slug}
                ref={el => { cardRefs.current[i] = el }}
                to={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-off-white/[0.06] hover:border-mint/20 transition-colors duration-300"
                style={{ background: '#0B2E2C' }}
              >
                <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-base/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-deep-base/75 text-mint text-xs font-semibold rounded-full border border-mint/20 backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-off-white font-bold text-base leading-snug mb-3 group-hover:text-mint transition-colors duration-300 flex-1">
                    {post.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted/60">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER STRIP ───────────────────────────────────────────────── */}
      <section className="bg-teal-mid py-16 border-t border-mint/10">
        <div className="container-wide text-center">
          <h2 className="text-xl md:text-2xl font-black text-off-white mb-3">
            Stay in the loop.
          </h2>
          <p className="text-muted text-sm mb-6 max-w-md mx-auto">
            Product updates and articles, straight to the app.
            Download Winity Life to get notified.
          </p>
          <a
            href="https://apps.apple.com/us/app/winity-life/id6752761057"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
          >
            Get the app
            <span className="pill-icon" aria-hidden="true">
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
              </svg>
            </span>
          </a>
        </div>
      </section>
    </div>
  )
}
