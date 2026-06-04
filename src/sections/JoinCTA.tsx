import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function AppleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
    </svg>
  )
}

export default function JoinCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const copyRef    = useRef<HTMLDivElement>(null)
  const btnsRef    = useRef<HTMLDivElement>(null)
  const trustRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 65%', once: true },
        defaults: { ease: 'power3.out' },
      })

      if (copyRef.current) {
        tl.fromTo(
          [...copyRef.current.children],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, stagger: 0.1 },
          0
        )
      }
      tl.fromTo(btnsRef.current,  { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, 0.4)
      if (trustRef.current) {
        tl.fromTo(
          [...trustRef.current.children],
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.07 },
          0.6
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#030C0C', minHeight: '540px' }}
      aria-label="Get started with Winity Life"
    >
      {/* Grid / mesh background — distinct from the hero arch */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, overflow: 'hidden',
          background: 'radial-gradient(ellipse 100% 70% at 50% 100%, rgba(33,230,167,0.07) 0%, transparent 65%)',
        }}
      >
        {/* Horizontal lines — subtle grid */}
        <svg
          width="100%" height="100%"
          style={{ position: 'absolute', inset: 0, opacity: 0.035 }}
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#21E6A7" strokeWidth="0.7"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
        {/* Centered bloom */}
        <div style={{
          position: 'absolute', bottom: '-10%', left: '50%', transform: 'translateX(-50%)',
          width: '70vw', height: '60vw', maxWidth: 900,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(33,230,167,0.09) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }} />
      </div>

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, #061C1E 0%, rgba(3,12,12,0.7) 50%, #030C0C 100%)',
        }}
      />

      {/* Top fade from previous section */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(to bottom, #061C1E, transparent)',
          zIndex: 5,
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center"
        style={{ minHeight: '540px', padding: 'clamp(64px, 10vh, 120px) 24px' }}
      >
        <div ref={copyRef}>
          <span
            className="text-eyebrow mb-6 inline-flex items-center justify-center gap-2"
          >
            <span className="inline-block w-5 h-px bg-mint" />
            Start Today
            <span className="inline-block w-5 h-px bg-mint" />
          </span>

          <h2
            className="font-black text-off-white leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(32px, 5.5vw, 68px)', maxWidth: 820, margin: '0 auto 24px' }}
          >
            Get the card that keeps up.
          </h2>

          <p
            className="text-muted leading-relaxed"
            style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', maxWidth: 540, margin: '0 auto' }}
          >
            Download Winity Life, verify in minutes, and spend your crypto anywhere Visa is accepted across 180+ countries.
          </p>
        </div>

        {/* App Buttons */}
        <div ref={btnsRef} className="flex justify-center gap-4 mt-10 flex-wrap">
          <a
            href="https://apps.apple.com/us/app/winity-life/id6752761057"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
            aria-label="Download on App Store"
          >
            <AppleIcon />
            App Store
            <span className="pill-icon" aria-hidden="true">
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
              </svg>
            </span>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.winity.life"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-outline"
            aria-label="Get it on Google Play"
          >
            <GoogleIcon />
            Google Play
            <span className="pill-icon" aria-hidden="true">
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
              </svg>
            </span>
          </a>
        </div>

        {/* Trust signals */}
        <div
          ref={trustRef}
          className="flex justify-center gap-6 mt-10 flex-wrap"
          aria-label="Trust credentials"
        >
          {[
            { text: 'Visa Secured' },
            { text: 'KYC Verified' },
            { text: '180+ Countries' },
            { text: '150M+ Merchants' },
          ].map(({ text }) => (
            <div key={text} className="flex items-center gap-1.5 text-xs text-muted/55">
              <span className="w-1 h-1 rounded-full bg-mint/50" aria-hidden="true" />
              {text}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
