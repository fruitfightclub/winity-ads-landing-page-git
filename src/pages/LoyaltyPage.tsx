/**
 * ---
 * client: Winity Life
 * philosophy: Emerald Noir
 * colors:
 *   primary: "#0B2E2C"
 *   accent: "#21E6A7"
 * deliverable: Loyalty Page — Full Rebuild
 * phase: 6
 * date: 2026-05-26
 * status: Draft
 * skills_used: tss-master, tss-frontend-pro, tss-creative-components, ag-scroll-reveal
 * ---
 *
 * LOYALTY PAGE — Emerald Noir
 * Premium travel and lifestyle rewards hub.
 * Redemption partner (Xoxoday) kept private until public launch.
 * Sections: LoyaltyHero → PointsEngine → UmiBenefits →
 *           RewardsPreview → LoyaltyDashboardPreview → LoyaltyCTA
 */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { ArrowRight, Wifi, Check, TrendingUp, Zap, MapPin } from 'lucide-react'
import SEO from '../components/SEO'

gsap.registerPlugin(ScrollTrigger)

// ─── Premium easing constants (never ease/linear) ────────────────────────────
const EASE_POWER   = 'cubic-bezier(0.16, 1, 0.3, 1)'
const EASE_EDITORIAL = 'cubic-bezier(0.77, 0, 0.175, 1)'

// ─── Grain overlay SVG ───────────────────────────────────────────────────────
const GrainOverlay = () => (
  <svg
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 w-full h-full z-10 opacity-[0.035]"
    style={{ mixBlendMode: 'overlay' }}
  >
    <filter id="grain-loyalty">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain-loyalty)" />
  </svg>
)

// ─── Section label ────────────────────────────────────────────────────────────
const SectionLabel = ({ text }: { text: string }) => (
  <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-mint mb-6">
    <span className="inline-block w-6 h-px bg-mint" />
    {text}
  </span>
)

// ─── Data ────────────────────────────────────────────────────────────────────

const POINTS_CARDS = [
  {
    step: '01',
    icon: Zap,
    title: 'Earn',
    copy: 'Collect Winity Points whenever you make eligible purchases with your Winity card.',
  },
  {
    step: '02',
    icon: TrendingUp,
    title: 'Track',
    copy: 'Follow your points balance, spend milestones, and unlocked benefits in one clean dashboard.',
  },
  {
    step: '03',
    icon: MapPin,
    title: 'Redeem',
    copy: 'A curated partner rewards experience is being integrated so users can unlock more value from their points.',
  },
]

const UMI_TIERS = [
  {
    card: 'Executive Card',
    badge: 'Executive',
    perk: '3 GB of complimentary UMI travel data annually.',
    note: 'Connect globally, three gigabytes on us.',
    highlight: true,
  },
  {
    card: 'Exclusive Card',
    badge: 'Exclusive',
    perk: 'Unlock 1 GB of complimentary UMI travel data after reaching $5,000 in eligible card spend.',
    note: 'Reach the milestone, travel connected.',
    highlight: false,
  },
]

const REWARD_CATEGORIES = [
  { label: 'Travel',     desc: 'Flights, hotels and beyond' },
  { label: 'Lifestyle',  desc: 'Wellness, dining, and culture' },
  { label: 'Everyday',   desc: 'Subscriptions and daily essentials' },
]

const TIER_PROGRESS = [
  { tier: 'Silver',   threshold: '$0',      current: true  },
  { tier: 'Gold',     threshold: '$2,500+', current: false },
  { tier: 'Platinum', threshold: '$5,000+', current: false },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoyaltyPage() {
  const heroRef          = useRef<HTMLElement>(null)
  const heroContentRef   = useRef<HTMLDivElement>(null)
  const pointsRef        = useRef<HTMLElement>(null)
  const pointsCardsRef   = useRef<(HTMLDivElement | null)[]>([])
  const umiRef           = useRef<HTMLElement>(null)
  const umiCardsRef      = useRef<(HTMLDivElement | null)[]>([])
  const rewardsRef       = useRef<HTMLElement>(null)
  const dashRef          = useRef<HTMLElement>(null)
  const ctaRef           = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero entrance: headline lines stagger up ─────────────────────────
      if (heroContentRef.current) {
        const els = heroContentRef.current.querySelectorAll('.hero-animate')
        gsap.fromTo(els,
          { y: 48, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1.1,
            ease: EASE_POWER,
            stagger: 0.14,
            delay: 0.2,
          }
        )
      }

      // ── Hero image parallax ───────────────────────────────────────────────
      if (heroRef.current) {
        const bg = heroRef.current.querySelector('.hero-bg') as HTMLElement
        if (bg) {
          gsap.to(bg, {
            yPercent: 18,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.2,
            },
          })
        }
      }

      // ── Points section header reveal ─────────────────────────────────────
      if (pointsRef.current) {
        const header = pointsRef.current.querySelector('.section-header')
        if (header) {
          gsap.fromTo(header,
            { y: 36, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.9, ease: EASE_POWER,
              scrollTrigger: { trigger: pointsRef.current, start: 'top 76%', once: true },
            }
          )
        }
        // ── Parallax on section header image ─────────────────────────────
        const heroImg = pointsRef.current.querySelector('.loyalty-points-hero-img') as HTMLElement | null
        if (heroImg) {
          gsap.fromTo(heroImg,
            { yPercent: -8 },
            { yPercent: 8, ease: 'none',
              scrollTrigger: {
                trigger: heroImg.parentElement,
                start: 'top bottom', end: 'bottom top',
                scrub: 1.2,
              }
            }
          )
        }
      }

      // ── Points cards stagger ─────────────────────────────────────────────
      const validPointsCards = pointsCardsRef.current.filter(Boolean)
      if (validPointsCards.length) {
        gsap.fromTo(validPointsCards,
          { y: 52, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.75, ease: EASE_POWER, stagger: 0.12,
            scrollTrigger: { trigger: pointsRef.current, start: 'top 72%', once: true },
            delay: 0.25,
          }
        )
      }

      // ── UMI section reveal ────────────────────────────────────────────────
      if (umiRef.current) {
        const header = umiRef.current.querySelector('.section-header')
        if (header) {
          gsap.fromTo(header,
            { y: 36, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.9, ease: EASE_POWER,
              scrollTrigger: { trigger: umiRef.current, start: 'top 76%', once: true },
            }
          )
        }
        const validUmiCards = umiCardsRef.current.filter(Boolean)
        if (validUmiCards.length) {
          gsap.fromTo(validUmiCards,
            { y: 44, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.7, ease: EASE_POWER, stagger: 0.15,
              scrollTrigger: { trigger: umiRef.current, start: 'top 72%', once: true },
              delay: 0.3,
            }
          )
        }
      }

      // ── Rewards / Dash / CTA section reveals ─────────────────────────────
      const simpleSections = [rewardsRef, dashRef, ctaRef]
      simpleSections.forEach((ref) => {
        if (!ref.current) return
        gsap.fromTo(ref.current.querySelectorAll('.reveal-up'),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.85, ease: EASE_POWER, stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
          }
        )
      })

      // ── Horizontal rule line draw ─────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('.line-draw').forEach((el) => {
        gsap.fromTo(el,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1, duration: 1.1, ease: EASE_EDITORIAL,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        )
      })

    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-deep-base min-h-screen overflow-x-hidden">
      <SEO
        title="Winity Points & Loyalty | Earn Rewards on Every Eligible Spend | Winity Life"
        description="Earn Winity Points on eligible card transactions. Track milestones, unlock UMI travel data perks, and prepare for a curated rewards experience built around real-world value."
      />

      {/* ── SECTION 1: LOYALTY HERO ──────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-end overflow-hidden"
      >
        {/* Full-bleed bg image with dark cinematic overlay */}
        <div
          className="hero-bg absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: "url('/loyalty_hero_lounge.png')" }}
          aria-hidden="true"
        />
        {/* Multi-layer overlay: bottom-heavy for copy legibility */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: 'linear-gradient(to top, rgba(6,28,30,0.96) 0%, rgba(6,28,30,0.72) 40%, rgba(6,28,30,0.38) 70%, rgba(6,28,30,0.2) 100%)',
          }}
          aria-hidden="true"
        />
        <GrainOverlay />

        {/* Mint radial bloom — top right */}
        <div
          className="absolute top-0 right-0 z-[2] pointer-events-none"
          style={{ width: 520, height: 520, background: 'radial-gradient(circle at 80% 20%, rgba(33,230,167,0.09) 0%, transparent 65%)' }}
          aria-hidden="true"
        />

        <div className="container-wide relative z-20 pb-20 pt-32 lg:pb-28">
          <div ref={heroContentRef} className="max-w-3xl">
            <div className="hero-animate">
              <SectionLabel text="Winity Loyalty" />
            </div>

            <h1
              className="hero-animate font-bold leading-[1.03] tracking-[-0.03em] text-white mb-6"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
            >
              Your spending should<br />
              <span className="text-mint">take you further.</span>
            </h1>

            <p className="hero-animate text-base lg:text-lg text-[#8FA3A0] max-w-xl mb-10 leading-relaxed">
              Earn Winity Points on eligible card transactions and move closer to
              travel, lifestyle, and partner rewards inside the Winity ecosystem.
            </p>

            <div className="hero-animate flex flex-wrap gap-4">
              <Link
                to="/cards"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm tracking-wide text-deep-base"
                style={{ background: 'linear-gradient(135deg, #21E6A7 0%, #3CF2D0 100%)' }}
              >
                Explore Loyalty
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/cards"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm tracking-wide text-white border border-white/20 hover:border-mint/50 transition-colors duration-300"
              >
                View Card Benefits
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: POINTS ENGINE — image-first editorial ─────────────── */}
      <section ref={pointsRef} style={{ background: '#061C1E', overflow: 'hidden' }}>

        {/* Full-bleed parallax header image */}
        <div className="relative overflow-hidden" style={{ height: 'clamp(380px, 52vh, 560px)' }}>
          <img
            src="/loyalty_points_cafe.png"
            alt=""
            aria-hidden="true"
            className="loyalty-points-hero-img"
            style={{
              position: 'absolute', inset: 0, width: '100%',
              height: '130%', top: '-15%', objectFit: 'cover', objectPosition: 'center',
              willChange: 'transform',
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(6,28,30,0.62) 0%, rgba(6,28,30,0.45) 40%, rgba(6,28,30,0.95) 100%)' }}
            aria-hidden="true"
          />
          <GrainOverlay />

          {/* Centred headline overlay */}
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
            style={{ paddingTop: 'clamp(60px,8vh,100px)' }}
          >
            <div className="section-header">
              <SectionLabel text="How It Works" />
              <h2
                className="font-bold text-white tracking-[-0.03em] leading-[1.05]"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', maxWidth: 680, margin: '0 auto' }}
              >
                Every spend takes you<br />
                <span className="text-mint">somewhere new.</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Three editorial image panels — full-height, image-first */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ borderTop: '1px solid rgba(33,230,167,0.08)' }}
        >
          {[
            {
              step: '01',
              title: 'Earn',
              copy: 'Collect Winity Points on every eligible card purchase: dining, travel, shopping, wherever life takes you.',
              image: '/winity_lifestyle_dining.jpg',
            },
            {
              step: '02',
              title: 'Track',
              copy: 'Your points balance and spend milestones update in real time inside the Winity app. One view. Full picture.',
              image: '/winity_lifestyle_art.jpg',
            },
            {
              step: '03',
              title: 'Redeem',
              copy: 'A curated partner rewards experience is being integrated, turning your points into real-world moments.',
              image: '/winity_lifestyle_travel.png',
            },
          ].map((item, i) => (
            <div
              key={item.step}
              ref={(el) => { pointsCardsRef.current[i] = el as HTMLDivElement | null }}
              className={`relative overflow-hidden editorial-panel-border`}
              style={{
                height: 'clamp(360px, 48vh, 520px)',
                borderRight: i < 2 ? '1px solid rgba(33,230,167,0.06)' : 'none',
              }}
            >
              <img
                src={item.image}
                alt=""
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'center',
                  transition: 'transform 600ms cubic-bezier(0.4,0,0.2,1)',
                }}
                className="editorial-panel-img"
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(6,28,30,0.97) 0%, rgba(6,28,30,0.65) 45%, rgba(6,28,30,0.2) 85%, transparent 100%)' }}
                aria-hidden="true"
              />
              {/* Content pinned to bottom */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-7">
                <span
                  style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(33,230,167,0.6)', display: 'block', marginBottom: 12 }}
                >
                  {item.step}
                </span>
                <h3
                  className="text-white font-bold mb-3 tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1.1 }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(200,221,216,0.82)', lineHeight: 1.68 }}>
                  {item.copy}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CSS: hover scale on editorial panels + mobile border fix */}
        <style>{`
          .editorial-panel-img { transform: scale(1.02); }
          div:hover > .editorial-panel-img { transform: scale(1.07); }
          @media (max-width: 767px) {
            .editorial-panel-border { border-right: none !important; border-bottom: 1px solid rgba(33,230,167,0.08) !important; }
            .editorial-panel-border:last-child { border-bottom: none !important; }
          }
        `}</style>
      </section>

      {/* ── SECTION 3: UMI TRAVEL BENEFITS ────────────────────────────────── */}
      <section
        ref={umiRef}
        className="relative py-28 lg:py-36 overflow-hidden"
        style={{ background: '#061C1E' }}
      >
        {/* Full-bleed city image — right half only on large screens */}
        <div
          className="absolute top-0 right-0 bottom-0 w-full lg:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/loyalty_umi_city.png')" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, #061C1E 35%, rgba(6,28,30,0.7) 60%, rgba(6,28,30,0.45) 100%)',
          }}
          aria-hidden="true"
        />
        <GrainOverlay />

        {/* Aqua radial accent */}
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 pointer-events-none"
          style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(60,242,208,0.06) 0%, transparent 65%)' }}
          aria-hidden="true"
        />

        <div className="container-wide relative z-10">
          <div className="max-w-xl">
            <div className="section-header">
              <SectionLabel text="UMI Travel Perks" />
              <h2
                className="font-bold text-white tracking-[-0.03em] leading-[1.08] mb-5"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              >
                Travel connected with<br />Winity and UMI.
              </h2>
              <p className="text-[#8FA3A0] text-base leading-relaxed mb-10">
                Winity is partnering with UMI to bring connected travel benefits directly into
                the card experience. Whether you are moving through Europe, Asia, or your next
                work trip, your card activity can unlock mobile data perks that keep you
                online when it matters.
              </p>
            </div>

            {/* Tier cards */}
            <div className="flex flex-col gap-4">
              {UMI_TIERS.map((tier, i) => (
                <div
                  key={tier.badge}
                  ref={(el) => { umiCardsRef.current[i] = el }}
                  className="relative rounded-2xl p-6 overflow-hidden"
                  style={{
                    background: tier.highlight
                      ? 'linear-gradient(135deg, rgba(33,230,167,0.12) 0%, rgba(15,63,58,0.5) 100%)'
                      : 'linear-gradient(135deg, rgba(15,63,58,0.4) 0%, rgba(11,46,44,0.3) 100%)',
                    border: tier.highlight
                      ? '1px solid rgba(33,230,167,0.3)'
                      : '1px solid rgba(33,230,167,0.1)',
                  }}
                >
                  {tier.highlight && (
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(33,230,167,0.6) 50%, transparent 100%)' }}
                      aria-hidden="true"
                    />
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(33,230,167,0.12)', border: '1px solid rgba(33,230,167,0.25)' }}
                    >
                      <Wifi size={18} className="text-mint" strokeWidth={1.6} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-xs font-semibold tracking-[0.15em] uppercase px-2.5 py-0.5 rounded-full"
                          style={{
                            background: tier.highlight ? 'rgba(33,230,167,0.15)' : 'rgba(33,230,167,0.08)',
                            color: '#21E6A7',
                            border: '1px solid rgba(33,230,167,0.2)',
                          }}
                        >
                          {tier.badge}
                        </span>
                      </div>
                      <p className="text-white font-medium text-sm leading-relaxed mb-1">
                        {tier.perk}
                      </p>
                      <p className="text-[#8FA3A0] text-xs leading-relaxed">
                        {tier.note}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* UMI Data disclaimer */}
            <p className="mt-6 text-[#8FA3A0] text-xs leading-relaxed"
               style={{ borderLeft: '2px solid rgba(33,230,167,0.2)', paddingLeft: '0.875rem' }}>
              Complimentary UMI data benefits are subject to eligibility, supported destinations,
              partner availability, and final program terms. eSIM activation is already free for all users.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: REWARDS PREVIEW ────────────────────────────────────── */}
      <section
        ref={rewardsRef}
        className="relative py-28 lg:py-36"
        style={{ background: 'linear-gradient(180deg, #0B2E2C 0%, #0F3F3A 60%, #0B2E2C 100%)' }}
      >
        <GrainOverlay />

        {/* Decorative grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(33,230,167,1) 1px, transparent 1px), linear-gradient(90deg, rgba(33,230,167,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
          aria-hidden="true"
        />

        <div className="container-wide relative z-10 text-center">
          <div className="reveal-up">
            <SectionLabel text="Coming Soon" />
          </div>
          <h2
            className="reveal-up font-bold text-white tracking-[-0.03em] leading-[1.08] mb-5 mx-auto"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', maxWidth: '680px' }}
          >
            A new rewards experience<br />is coming.
          </h2>
          <p className="reveal-up text-[#8FA3A0] text-base lg:text-lg leading-relaxed mx-auto mb-16"
             style={{ maxWidth: '540px' }}>
            We are building a curated redemption experience where Winity Points can be
            used toward selected lifestyle, travel, and everyday rewards. Until the
            redemption portal is live, users can keep earning and tracking progress in
            the Winity app.
          </p>

          {/* Category preview tiles — locked state */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {REWARD_CATEGORIES.map((cat) => (
              <div
                key={cat.label}
                className="reveal-up relative rounded-2xl p-7 overflow-hidden"
                style={{
                  background: 'rgba(11,46,44,0.5)',
                  border: '1px solid rgba(33,230,167,0.1)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Lock badge */}
                <div
                  className="absolute top-4 right-4 text-[10px] font-semibold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(33,230,167,0.08)', color: 'rgba(33,230,167,0.5)', border: '1px solid rgba(33,230,167,0.12)' }}
                >
                  Soon
                </div>

                <div
                  className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
                  style={{ background: 'rgba(33,230,167,0.08)', border: '1px solid rgba(33,230,167,0.15)' }}
                >
                  <div className="w-4 h-4 rounded-full" style={{ background: 'rgba(33,230,167,0.4)' }} />
                </div>

                <h3 className="text-white font-semibold text-lg mb-1.5">{cat.label}</h3>
                <p className="text-[#8FA3A0] text-sm">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: TIER / DASHBOARD PREVIEW ──────────────────────────── */}
      <section
        ref={dashRef}
        className="relative py-28 lg:py-36"
        style={{ background: '#061C1E' }}
      >
        <GrainOverlay />

        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Copy */}
            <div>
              <div className="reveal-up">
                <SectionLabel text="Tier Momentum" />
              </div>
              <h2
                className="reveal-up font-bold text-white tracking-[-0.03em] leading-[1.08] mb-5"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
              >
                Track your progress.<br />Unlock more.
              </h2>
              <p className="reveal-up text-[#8FA3A0] text-base leading-relaxed mb-8 max-w-md">
                Your tier moves as your spend grows. Each level unlocks a richer set of
                benefits, from UMI travel data passes to curated rewards access.
              </p>

              <div className="reveal-up space-y-3">
                {[
                  'Monitor your points balance in the Winity app',
                  'Track eligible spend milestones toward tier upgrades',
                  'Unlock enhanced benefits as you advance',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(33,230,167,0.12)', border: '1px solid rgba(33,230,167,0.25)' }}
                    >
                      <Check size={11} className="text-mint" />
                    </div>
                    <span className="text-[#8FA3A0] text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Tier progress UI mockup */}
            <div
              className="reveal-up relative rounded-3xl p-8 lg:p-10 overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(15,63,58,0.6) 0%, rgba(11,46,44,0.4) 100%)',
                border: '1px solid rgba(33,230,167,0.15)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Top glow line */}
              <div
                className="absolute top-0 left-8 right-8 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(33,230,167,0.5), transparent)' }}
                aria-hidden="true"
              />

              {/* Points balance mockup */}
              <div className="mb-8">
                <p className="text-[#8FA3A0] text-xs tracking-[0.15em] uppercase mb-1">Points Balance</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white tracking-[-0.03em]">—</span>
                  <span className="text-mint text-sm font-medium">pts</span>
                </div>
                <p className="text-[#8FA3A0] text-xs mt-1">Available in the Winity app</p>
              </div>

              {/* Tier ladder */}
              <div className="space-y-3">
                {TIER_PROGRESS.map((t, idx) => (
                  <div key={t.tier} className="relative">
                    <div
                      className="flex items-center justify-between rounded-xl px-5 py-3.5"
                      style={{
                        background: t.current
                          ? 'rgba(33,230,167,0.1)'
                          : 'rgba(11,46,44,0.4)',
                        border: t.current
                          ? '1px solid rgba(33,230,167,0.3)'
                          : '1px solid rgba(33,230,167,0.07)',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ background: t.current ? '#21E6A7' : 'rgba(33,230,167,0.25)' }}
                        />
                        <span
                          className="text-sm font-medium"
                          style={{ color: t.current ? '#F4F7F6' : '#8FA3A0' }}
                        >
                          {t.tier}
                        </span>
                      </div>
                      <span
                        className="text-xs"
                        style={{ color: t.current ? '#21E6A7' : '#8FA3A0' }}
                      >
                        {t.current ? 'Active' : t.threshold}
                      </span>
                    </div>
                    {idx < TIER_PROGRESS.length - 1 && (
                      <div
                        className="absolute left-[1.625rem] top-full w-px h-3"
                        style={{ background: 'rgba(33,230,167,0.15)' }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* App CTA chip */}
              <div className="mt-8 flex items-center gap-2">
                <div
                  className="flex-1 h-px"
                  style={{ background: 'rgba(33,230,167,0.15)' }}
                  aria-hidden="true"
                />
                <span className="text-[#8FA3A0] text-xs px-2">Track in the app</span>
                <div
                  className="flex-1 h-px"
                  style={{ background: 'rgba(33,230,167,0.15)' }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: FINAL CTA ─────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        className="relative py-28 lg:py-40 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0B2E2C 0%, #061C1E 100%)' }}
      >
        {/* Mint radial bloom — centered */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(33,230,167,0.07) 0%, transparent 65%)' }}
          aria-hidden="true"
        />
        <GrainOverlay />

        <div className="container-wide relative z-10 text-center">
          <div className="reveal-up">
            <SectionLabel text="Start Earning" />
          </div>
          <h2
            className="reveal-up font-bold text-white tracking-[-0.03em] leading-[1.06] mb-5 mx-auto"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.2rem)', maxWidth: '720px' }}
          >
            Your next reward is<br />
            <span className="text-mint">already in motion.</span>
          </h2>
          <p className="reveal-up text-[#8FA3A0] text-base lg:text-lg leading-relaxed mx-auto mb-12"
             style={{ maxWidth: '500px' }}>
            Use Winity for eligible everyday spend, grow your points balance, and unlock
            more ways to move through the world.
          </p>

          <div className="reveal-up flex flex-wrap justify-center gap-4">
            <Link
              to="/cards"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-sm tracking-wide text-deep-base"
              style={{ background: 'linear-gradient(135deg, #21E6A7 0%, #3CF2D0 100%)' }}
            >
              View Card Benefits
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://apps.apple.com/us/app/winity-life/id6752761057"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-sm tracking-wide text-white border border-white/20 hover:border-mint/40 transition-colors duration-300"
            >
              App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.winity.life"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-sm tracking-wide text-white border border-white/20 hover:border-mint/40 transition-colors duration-300"
            >
              Google Play
            </a>
          </div>
        </div>
      </section>

      {/* ── GLOBAL COMPLIANCE FOOTER ──────────────────────────────────────── */}
      <section
        className="py-10"
        style={{ background: '#061C1E', borderTop: '1px solid rgba(33,230,167,0.07)' }}
      >
        <div className="container-wide">
          <p className="text-[#8FA3A0] text-xs leading-relaxed max-w-3xl mx-auto text-center">
            Card services and rewards availability may vary by jurisdiction. Eligibility,
            redemption options, and partner benefits are subject to final terms and conditions.
            Card services are issued in Hong Kong and available globally wherever Visa® is
            accepted. Winity Life is not a bank. Digital asset-linked card services involve
            risks. See{' '}
            <Link
              to="/terms"
              className="text-mint/60 hover:text-mint transition-colors"
            >
              winity.life/terms
            </Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
