import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { BLOG_POSTS } from '../data/blogPosts'

gsap.registerPlugin(ScrollTrigger)

export default function BlogStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs   = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const valid = cardRefs.current.filter(Boolean)
      gsap.fromTo(
        valid,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
          delay: 0.2,
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const posts = BLOG_POSTS.slice(0, 3)

  return (
    <section
      ref={sectionRef}
      className="bg-teal-deep py-24"
      aria-label="Latest from the Winity Journal"
    >
      <div className="container-wide">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <span className="text-eyebrow mb-3 block">Winity Journal</span>
            <h2 className="text-3xl md:text-4xl font-black text-off-white leading-tight">
              Stories worth reading.
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-mint text-sm font-semibold hover:text-aqua transition-colors"
          >
            All articles <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-deep-base/65 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-deep-base/75 text-mint text-[10px] font-semibold rounded-full border border-mint/20 backdrop-blur-sm">
                  {post.category}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-off-white font-bold text-sm leading-snug mb-3 group-hover:text-mint transition-colors duration-300 flex-1">
                  {post.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted/55 mt-auto">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  {post.readTime}
                  <span className="mx-1.5 opacity-30">·</span>
                  {post.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
