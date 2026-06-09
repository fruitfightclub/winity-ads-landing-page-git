import { useEffect, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import SEO from '../components/SEO'
import { BLOG_POSTS, BlogSection } from '../data/blogPosts'

gsap.registerPlugin(ScrollTrigger)

function parseTextWithLinks(text: string): React.ReactNode[] | string {
  if (!text) return ''
  
  // Matches markdown links, raw http/https links, www. links, or winity.life domain occurrences
  const regex = /(\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s]+|www\.[a-zA-Z0-9-]+\.[a-zA-Z0-9-.:%&?#=/_~+]+|winity\.life[^\s]*)/gi
  
  const parts = text.split(regex)
  if (parts.length === 1) return text
  
  return parts.map((part, index) => {
    const mdMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (mdMatch) {
      const linkText = mdMatch[1]
      let url = mdMatch[2]
      if (!url.startsWith('http') && !url.startsWith('/')) {
        url = 'https://' + url
      }
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-mint hover:text-aqua underline transition-colors"
        >
          {linkText}
        </a>
      )
    }
    
    if (part.match(/^https?:\/\/[^\s]+$/i)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-mint hover:text-aqua underline break-all transition-colors"
        >
          {part}
        </a>
      )
    }
    
    if (part.match(/^(www\.[a-zA-Z0-9-]+|winity\.life)/i)) {
      const url = part.toLowerCase().startsWith('http') ? part : `https://${part}`
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-mint hover:text-aqua underline transition-colors"
        >
          {part}
        </a>
      )
    }
    
    return part
  })
}

function renderSection(section: BlogSection, key: number) {
  switch (section.type) {
    case 'heading':
      return (
        <h2 key={key} className="text-2xl font-black text-off-white mt-10 mb-4 leading-tight tracking-tight">
          {section.text}
        </h2>
      )
    case 'paragraph':
      return (
        <p key={key} className="text-muted leading-relaxed mb-5" style={{ fontSize: 'clamp(15px,1.1vw,17px)' }}>
          {parseTextWithLinks(section.text || '')}
        </p>
      )
    case 'list':
      return (
        <ul key={key} className="space-y-3 mb-6 pl-1">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted" style={{ fontSize: 'clamp(14px,1.05vw,16px)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-mint flex-shrink-0 mt-2" aria-hidden="true" />
              {parseTextWithLinks(item)}
            </li>
          ))}
        </ul>
      )
    case 'callout':
      return (
        <blockquote
          key={key}
          className="border-l-2 border-mint pl-5 py-1 my-7"
        >
          <p className="text-off-white font-semibold italic leading-relaxed" style={{ fontSize: 'clamp(15px,1.1vw,17px)' }}>
            {parseTextWithLinks(section.text || '')}
          </p>
        </blockquote>
      )
    case 'image':
      return (
        <div key={key} className="my-8 flex flex-col items-center">
          <div className="rounded-xl overflow-hidden border border-mint/10 max-w-full shadow-lg">
            <img
              src={section.url}
              alt={section.alt || ''}
              className="w-full h-auto object-cover"
              style={{ maxHeight: '500px' }}
            />
          </div>
          {section.alt && (
            <span className="text-muted/60 text-xs mt-2.5 italic">
              {section.alt}
            </span>
          )}
        </div>
      )
    default:
      return null
  }
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const heroRef    = useRef<HTMLDivElement>(null)
  const articleRef = useRef<HTMLElement>(null)

  const post = BLOG_POSTS.find(p => p.slug === slug)
  const postIndex = BLOG_POSTS.findIndex(p => p.slug === slug)
  const related = BLOG_POSTS.filter((_, i) => i !== postIndex).slice(0, 2)

  useEffect(() => {
    if (!post) return
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          [...heroRef.current.children],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.1 }
        )
      }
      if (articleRef.current) {
        gsap.fromTo(
          articleRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: articleRef.current, start: 'top 85%', once: true },
            delay: 0.1,
          }
        )
      }
    })
    return () => ctx.revert()
  }, [post])

  if (!post) return <Navigate to="/blog" replace />

  return (
    <div className="bg-deep-base min-h-screen">
      <SEO
        title={`${post.title} | Winity Journal`}
        description={post.excerpt}
        ogImage={post.image}
      />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-8 bg-gradient-to-b from-teal-deep/20 to-deep-base">
        <div className="container-wide" style={{ maxWidth: '800px', margin: '0 auto', paddingInline: '24px' }}>
          <div ref={heroRef} className="relative z-10 pb-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted/70 text-xs hover:text-mint transition-colors mb-6"
            >
              <ArrowLeft size={12} /> Back to Journal
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 bg-mint/15 text-mint text-xs font-semibold rounded-full border border-mint/20">
                {post.category}
              </span>
              <span className="text-muted text-xs flex items-center gap-1.5">
                <Clock className="w-3 h-3" aria-hidden="true" />
                {post.readTime}
              </span>
              <span className="text-muted/50 text-xs">{post.date}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-off-white leading-tight tracking-tight mb-8">
              {post.title}
            </h1>
          </div>

          {/* Centered, clean, non-skewed 16:9 visual image container */}
          <div 
            className="relative aspect-[16/9] max-h-[480px] w-full rounded-2xl overflow-hidden border border-mint/15 shadow-2xl mx-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(15,63,58,0.25) 0%, rgba(7,30,30,0.45) 100%)',
            }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full"
              style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-base/50 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ───────────────────────────────────────────────────── */}
      <article ref={articleRef} className="bg-deep-base pb-24">
        <div className="container-wide" style={{ maxWidth: '800px', margin: '0 auto', paddingInline: '24px' }}>
          <p className="text-muted/70 text-sm mb-10 pb-8 border-b border-mint/10 leading-relaxed" style={{ fontSize: 'clamp(16px,1.15vw,18px)' }}>
            {post.excerpt}
          </p>

          <div className="prose prose-invert max-w-none">
            {post.content.map((section, i) => renderSection(section, i))}
          </div>

          <div className="mt-16 pt-8 border-t border-mint/10 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-mint/15 flex items-center justify-center border border-mint/20">
                <span className="text-mint text-xs font-bold">WL</span>
              </div>
              <div>
                <div className="text-off-white text-sm font-semibold">{post.author}</div>
                <div className="text-muted text-xs">{post.date}</div>
              </div>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 text-mint text-sm font-semibold hover:text-aqua transition-colors">
              More articles <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </article>

      {/* ── RELATED ────────────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-deep-base border-t border-mint/10 py-24">
          <div className="container-wide" style={{ maxWidth: '1140px', margin: '0 auto', paddingInline: '24px' }}>
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="text-mint text-xs font-bold tracking-wider uppercase block mb-2">Continue Reading</span>
                <h2 className="text-off-white font-black text-3xl md:text-4xl tracking-tight">Related Articles & Releases</h2>
              </div>
              <Link to="/blog" className="hidden sm:inline-flex items-center gap-2 text-mint hover:text-aqua text-sm font-semibold transition-colors">
                View all insights <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.map(rp => (
                <Link
                  key={rp.slug}
                  to={`/blog/${rp.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-mint/15 hover:border-mint/35 transition-all duration-300 hover:-translate-y-1.5"
                  style={{
                    background: 'linear-gradient(160deg, rgba(15,63,58,0.35) 0%, rgba(6,20,20,0.65) 100%)',
                    boxShadow: '0 15px 45px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="aspect-[16/10] overflow-hidden relative border-b border-mint/10">
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-full h-full"
                      style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-deep-base/90 text-mint text-xs font-bold rounded-full border border-mint/20 backdrop-blur-sm shadow-md">
                        {rp.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-between flex-1">
                    <div>
                      <p className="text-off-white font-black text-lg md:text-xl leading-snug group-hover:text-mint transition-colors duration-300 mb-3 line-clamp-2">
                        {rp.title}
                      </p>
                      <p className="text-muted/70 text-sm line-clamp-2 mb-6 leading-relaxed">
                        {rp.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/[0.04]">
                      <span className="text-muted/50 text-xs flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {rp.readTime}
                      </span>
                      <span className="text-mint text-sm font-semibold inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                        Read post <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
