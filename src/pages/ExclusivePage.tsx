/**
 * ---
 * client: Winity Life
 * philosophy: Emerald Noir
 * colors:
 *   primary: "#0B2E2C"
 *   accent: "#21E6A7"
 *   base: "#061C1E"
 * deliverable: Exclusive Card Page — Vertical Card Fan Hero + Premium Features
 * phase: 6
 * date: 2026-05-27
 * status: Draft
 * skills_used: tss-master, tss-frontend-pro, tss-creative-components,
 *              ag-scroll-reveal, tss-gsap-webflow
 * ---
 *
 * EXCLUSIVE CARD PAGE — v3
 * Hero: 2-col split — copy left, 3-card vertical fan right. Fanning deck on scroll.
 * Hero card: /card_exclusive_visa.png — Winity Visa Platinum Business (navy/teal geometric)
 * Compliance: no "instant issuance", shipping noted, 150M+ Visa merchants.
 * UMI fix: eSIM free by default — we market 1GB data benefit + 20% Winity Club discount.
 * New features: ATM worldwide, deposit bonuses, 100k+ concierge.
 */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Check, Zap, Globe, Smartphone, Shield,
  CreditCard, Wifi, Gift, ExternalLink, Banknote, Star, Users,
} from 'lucide-react'
import SEO from '../components/SEO'

gsap.registerPlugin(ScrollTrigger, SplitText)

// ─── Palette ──────────────────────────────────────────────────────────────────
const MINT    = '#21E6A7'
const MINT_HI = '#3CF2D0'
const COPPER  = '#E8A84E'

// ─── UMI Partner URLs ─────────────────────────────────────────────────────────
const UMI_CLUB_URL = 'https://umi.app/winity'  // TODO: confirm with client

// ─── Grain overlay ────────────────────────────────────────────────────────────
const GrainOverlay = ({ id = 'grain', opacity = 0.035 }: { id?: string; opacity?: number }) => (
  <svg
    aria-hidden="true"
    style={{
      pointerEvents: 'none', position: 'absolute', inset: 0,
      width: '100%', height: '100%', zIndex: 10,
      mixBlendMode: 'overlay' as const, opacity,
    }}
  >
    <filter id={id}>
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter={`url(#${id})`} />
  </svg>
)

const Label = ({ text, color = MINT }: { text: string; color?: string }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 8,
    fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const,
    color, marginBottom: 20,
  }}>
    <span style={{ display: 'inline-block', width: 24, height: 1, background: color }} />
    {text}
  </span>
)

// ─── Hero card fan — CSS transform-origin pivot (Medium article pattern) ───────
const FAN_CARD_SRC  = '/card_exclusive_visa.png'
// Base angles for the 5-card fan — all full opacity, scroll-triggered entrance
const FAN_BASE_ANGLES = [-28, -14, 0, 14, 28]
const FAN_OPACITIES   = [1.0, 1.0, 1.0, 1.0, 1.0]

// ─── Feature Moments (combined editorial) ─────────────────────────────────────
const MOMENTS = [
  {
    label:    'Free to Start',
    headline: 'Virtual card.\nReady on approval.',
    body:     'Your Winity Exclusive virtual card is issued upon KYC approval. Add it to Google Pay and start spending at 150M+ Visa® merchant locations globally. 0% stablecoin load fee.',
    image:    'https://winity.life/wp-content/uploads/2025/11/Exclusive-Virtual.webp',
    fallback: '/hero_card_exclusive.png',
    icon:     Zap,
    badge:    'Issued on approval',
    imgRight: true,
    appScreen: true,
  },
  {
    label:    'Physical Card',
    headline: 'Get the physical\ncard on us.',
    body:     'Spend just $25 on your virtual card and receive your premium Exclusive physical card at no issuance cost. First 6 months of the USD 20/yr annual fee waived on new activations. Shipping charges may apply.',
    image:    '/card_hand_pull.jpg',
    fallback: '/exp_cards_closeup.png',
    icon:     CreditCard,
    badge:    'Free after $25 spend*',
    imgRight: false,
    appScreen: false,
  },
  {
    label:    'Global ATM Access',
    headline: 'Cash. Anywhere\nVisa® is accepted.',
    body:     'Withdraw cash at any Visa® ATM in 180+ countries and territories worldwide. Your physical card gives you access to global banking infrastructure, wherever you travel. USD 3 per withdrawal, no foreign transaction fee.',
    image:    '/card_hero_float.jpg',
    fallback: '/exp_cards_closeup.png',
    icon:     Banknote,
    badge:    '180+ Countries',
    imgRight: true,
    appScreen: false,
  },
  {
    label:    'Travel Connected',
    headline: '1 GB free data.\nSave 20% on more.',
    body:     'Reach USD 5,000 in eligible spend and unlock 1 GB of complimentary UMI data, activated digitally in 100+ countries. Join the Winity Club on the UMI app and save 20% on every additional data package you purchase.',
    image:    '/winity_lifestyle_travel.png',
    fallback: '/loyalty_hero_lounge.png',
    icon:     Wifi,
    badge:    'Winity Club: 20% off data',
    imgRight: false,
    appScreen: false,
  },
]

// ─── Premium balance features ─────────────────────────────────────────────────
const PREMIUM_TIERS = [
  {
    icon:  Banknote,
    title: 'Executive Balance Bonuses',
    body:  'Earn enhanced rewards on qualifying high-value account balances. Winity Life recognises high-tier members with exclusive rate benefits. See programme terms for eligible balance amounts and applicable rates.',
    badge: 'Qualifying balances',
    color: MINT,
  },
  {
    icon:  Star,
    title: 'Curated Concierge',
    body:  'Members holding USD 100,000 or more in account balances receive access to a dedicated relationship manager and curated concierge service: travel bookings, venue access, personalised support, 24/7.',
    badge: 'USD 100,000+ balances',
    color: COPPER,
  },
  {
    icon:  Users,
    title: '24/7 Priority Support',
    body:  'Every Winity member has access to 24/7 WhatsApp support. High-tier members benefit from priority routing and dedicated account management. Your lifestyle doesn\'t pause. Neither do we.',
    badge: 'All members',
    color: MINT,
  },
]

// ─── Small feature grid ───────────────────────────────────────────────────────
const SMALL_FEATURES = [
  { icon: Globe,       stat: '150M+',    title: 'Visa Merchants',    desc: 'Accepted worldwide at 150M+ Visa® locations across 180+ countries.' },
  { icon: Smartphone,  stat: 'NFC',      title: 'Google Pay Ready',  desc: 'Tap to pay anywhere NFC is accepted. Apple Pay arriving soon.' },
  { icon: Shield,      stat: 'OTP-Free', title: '3D Secure',         desc: 'Biometric in-app authentication replaces SMS codes, faster and more secure.' },
  { icon: Zap,         stat: '0%',       title: 'Transfer Fees',     desc: 'Load with USDC or USDT at zero fee. No hidden margin on stablecoins.' },
]

// ─── How it works ─────────────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  { n: '01', title: 'Download the app',      body: 'Available for iOS and Android. Takes under two minutes to set up.' },
  { n: '02', title: 'Complete verification', body: 'Complete your KYC verification to unlock your Exclusive card and membership.' },
  { n: '03', title: 'Receive your card',     body: 'Virtual card issued upon KYC approval. Physical card shipped on request (shipping charges may apply).' },
  { n: '04', title: 'Start spending',        body: 'Add to Google Pay and spend at 150M+ Visa® merchant locations worldwide.' },
]

// ─── Fees ─────────────────────────────────────────────────────────────────────
const FEES = [
  { label: 'Virtual Card Annual Fee',   value: 'See app' },
  { label: 'Physical Card Annual Fee',  value: 'USD 20 / year (first 6 months free)' },
  { label: 'Physical Card Issuance',    value: 'USD 0 (shipping charges may apply)' },
  { label: 'Card Spend Fee',            value: 'See app' },
  { label: 'Stablecoin Load',           value: '0%' },
  { label: 'Other Digital Asset Load',  value: '5% conversion fee' },
  { label: 'ATM Withdrawal',            value: 'USD 3 per withdrawal' },
  { label: 'Points Earn Rate',          value: '1 Winity Point per USD 10 spent' },
  { label: 'UMI Data Benefit',          value: '1 GB data after USD 5,000 eligible spend' },
  { label: 'Winity Club Data Discount', value: '20% off via UMI app (Winity Club members)' },
]

const TICKER_ITEMS = [
  'Google Pay Ready', '0% Stablecoin Load',
  '150M+ Visa Merchants', '180+ Countries', 'ATM Worldwide', 'OTP-Free 3DS',
  '1 pt per USD 10', 'Winity Loop', '20% Data Discount',
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function ExclusivePage() {
  const heroRef        = useRef<HTMLElement>(null)
  const headlineRef    = useRef<HTMLHeadingElement>(null)
  const tickerRef      = useRef<HTMLDivElement>(null)
  const promoBigRef    = useRef<HTMLElement>(null)
  const momentRowRefs  = useRef<(HTMLDivElement | null)[]>([])
  const smallFeatRefs  = useRef<(HTMLDivElement | null)[]>([])
  const premiumRefs    = useRef<(HTMLDivElement | null)[]>([])
  const howRef         = useRef<HTMLElement>(null)
  const stepRefs       = useRef<(HTMLDivElement | null)[]>([])
  const esimRef        = useRef<HTMLElement>(null)
  const feesRef        = useRef<HTMLElement>(null)
  const ctaRef         = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero entrance ────────────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      if (headlineRef.current) {
        const split = new SplitText(headlineRef.current, { type: 'words' })
        tl.from(split.words, { opacity: 0, y: 44, duration: 0.9, stagger: 0.07 }, 0.15)
      }
      tl.from('.hero-sub',    { opacity: 0, y: 24, duration: 0.8 }, 0.55)
      tl.from('.hero-cta',    { opacity: 0, y: 20, duration: 0.7 }, 0.75)
      tl.from('.hero-trust',  { opacity: 0, y: 16, duration: 0.6 }, 0.9)
      tl.from('.card-badges', { opacity: 0, y: 14, duration: 0.6 }, 1.2)
      tl.from('.pr-strip',    { opacity: 0, y: 20, duration: 0.5 }, 1.4)

      // ── CSS Card Fan — scroll-triggered entrance ──────────────────────────
      // All cards stacked at center, invisible — transform-origin set below card
      gsap.set(['.fan-c-0','.fan-c-1','.fan-c-2','.fan-c-3','.fan-c-4'], {
        rotate: 0, opacity: 0, transformOrigin: 'center 140%',
      })

      // Fan out staggered — delay-based so it always fires on page load
      // (hero is above the fold; scroll triggers are unreliable for viewport-top elements)
      FAN_BASE_ANGLES.forEach((angle, i) => {
        gsap.to(`.fan-c-${i}`, {
          rotate: angle,
          opacity: FAN_OPACITIES[i],
          duration: 1.0,
          ease: 'back.out(1.4)',
          delay: 0.85 + i * 0.12,
        })
      })

      // Gentle hero copy parallax on scroll
      gsap.to('.hero-copy-col', {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: heroRef.current!, start: 'top top', end: '+=500', scrub: 0.4 },
      })

      // ── Ticker ────────────────────────────────────────────────────────────
      if (tickerRef.current) {
        const track = tickerRef.current.querySelector('.ticker-track') as HTMLElement
        if (track) {
          track.innerHTML += track.innerHTML
          gsap.to(track, { x: -track.scrollWidth / 2, duration: 30, ease: 'none', repeat: -1 })
        }
      }

      // ── YOUR CARD ON US promo ─────────────────────────────────────────────
      if (promoBigRef.current) {
        gsap.fromTo(promoBigRef.current.querySelectorAll('.promo-reveal'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: promoBigRef.current, start: 'top 76%', once: true } }
        )
        gsap.fromTo(promoBigRef.current.querySelector('.promo-img'),
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: promoBigRef.current, start: 'top 78%', once: true } }
        )
      }

      // ── MOMENTS editorial ─────────────────────────────────────────────────
      momentRowRefs.current.forEach((row, i) => {
        if (!row) return
        const imgEl  = row.querySelector('.moment-img')
        const copyEl = row.querySelector('.moment-copy')
        const fromRight = i % 2 === 0
        if (imgEl) {
          gsap.fromTo(imgEl,
            { x: fromRight ? 60 : -60, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.0, ease: 'power3.out',
              scrollTrigger: { trigger: row, start: 'top 78%', once: true } }
          )
        }
        if (copyEl) {
          gsap.fromTo(copyEl,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15,
              scrollTrigger: { trigger: row, start: 'top 78%', once: true } }
          )
        }
      })

      // ── Small features ────────────────────────────────────────────────────
      const validSmall = smallFeatRefs.current.filter(Boolean)
      if (validSmall.length) {
        gsap.fromTo(validSmall,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', stagger: 0.09,
            scrollTrigger: { trigger: validSmall[0]!, start: 'top 82%', once: true } }
        )
      }

      // ── Premium tiers ─────────────────────────────────────────────────────
      const validPrem = premiumRefs.current.filter(Boolean)
      if (validPrem.length) {
        gsap.fromTo(validPrem,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: validPrem[0]!, start: 'top 80%', once: true } }
        )
      }

      // ── How it works ──────────────────────────────────────────────────────
      if (howRef.current) {
        gsap.fromTo(howRef.current.querySelector('.section-hdr'),
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: howRef.current, start: 'top 76%', once: true } }
        )
        stepRefs.current.filter(Boolean).forEach((step, i) => {
          gsap.fromTo(step,
            { x: -32, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.65, ease: 'power3.out', delay: i * 0.08,
              scrollTrigger: { trigger: step!, start: 'top 82%', once: true } }
          )
        })
      }

      // ── UMI + Fees + CTA ──────────────────────────────────────────────────
      ;[esimRef, feesRef, ctaRef].forEach((ref) => {
        if (!ref.current) return
        gsap.fromTo(ref.current.querySelectorAll('.reveal-up'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true } }
        )
      })

      if (feesRef.current) {
        gsap.fromTo(feesRef.current.querySelectorAll('.fee-row'),
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.05, delay: 0.3,
            scrollTrigger: { trigger: feesRef.current, start: 'top 75%', once: true } }
        )
      }

      gsap.utils.toArray<HTMLElement>('.line-draw').forEach((el) => {
        gsap.fromTo(el,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1.1, ease: 'power2.inOut',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
        )
      })

    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ fontFamily: 'Roboto, sans-serif', background: '#061C1E', overflowX: 'hidden' }}>
      <SEO
        title="Winity Exclusive Card | Free Virtual Visa Card | Winity Life"
        description="The Winity Exclusive digital asset-linked Visa card — USD 0 virtual, 150M+ Visa merchants, ATM access worldwide, Google Pay ready. Physical card after $25 spend."
      />

      <style>{`
        /* ── CSS Card Fan — pivot from bottom-center (Medium article pattern) ─ */
        .card-fan-deck {
          position: relative;
          width: clamp(240px, 30vw, 340px);
          height: clamp(148px, 18.5vw, 210px);
          cursor: pointer;
          margin: 0 auto;
        }
        .card-fan-card {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: auto;
          border-radius: 14px;
          transform-origin: center 140%;
          will-change: transform, opacity;
        }
        .fan-c-0 { z-index: 1; }
        .fan-c-1 { z-index: 2; }
        .fan-c-2 { z-index: 3; }
        .fan-c-3 { z-index: 4; }
        .fan-c-4 { z-index: 5; }

        /* ── Tablet / mobile layout collapses ──────────────────────────── */
        @media (max-width: 900px) {
          .hero-grid   { grid-template-columns: 1fr !important; gap: 32px !important; }
          .moment-grid { grid-template-columns: 1fr !important; direction: ltr !important; }
          .moment-img  { min-height: 260px !important; }
          .small-feat  { grid-template-columns: 1fr 1fr !important; }
          .stat-cell:nth-child(2n) { border-right: none !important; }
          .stat-cell:nth-child(odd) { border-right: 1px solid rgba(33,230,167,0.07) !important; border-bottom: 1px solid rgba(33,230,167,0.07); }
          .stat-cell:nth-child(3), .stat-cell:nth-child(4) { border-bottom: none; }
          .how-grid    { grid-template-columns: 1fr !important; }
          .esim-grid   { grid-template-columns: 1fr !important; }
          .promo-grid  { grid-template-columns: 1fr !important; }
          .prem-grid   { grid-template-columns: 1fr !important; }
          .fees-grid   { grid-template-columns: 1fr !important; }
        }

        /* ── Mobile: smaller fan, hide outer 2 cards ───────────────────── */
        @media (max-width: 640px) {
          .card-fan-deck {
            width: clamp(160px, 62vw, 240px) !important;
            height: clamp(100px, 38.6vw, 150px) !important;
          }
          .fan-c-0, .fan-c-1 { display: none !important; }
          .hero-copy-col { text-align: center; }
          .hero-cta      { justify-content: center; }
          .hero-trust    { justify-content: center; }
          .card-badges   { justify-content: center; }
          .small-feat    { grid-template-columns: 1fr !important; }
          .stat-cell     { border-right: none !important; border-bottom: 1px solid rgba(33,230,167,0.07) !important; }
          .stat-cell:last-child { border-bottom: none !important; }
        }

        /* ── Fees table responsive ──────────────────────────────────────── */
        @media (max-width: 540px) {
          .fees-row-value { font-size: 13px !important; }
        }

        /* ── How It Works: disable sticky on mobile to prevent overlap ──── */
        @media (max-width: 900px) {
          .how-sticky { position: static !important; top: auto !important; }
          .moment-img-virtual { padding: 24px 16px 56px !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — 2-col split, vertical card fan deck on scroll
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: '#061C1E' }}
      >
        {/* Background — hero photo + gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <img
            src="/EXCLUSIVE_PAGE_BACKGROUND.png"
            alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
            }}
          />
          {/* Gradient overlay — heavier on left for text legibility */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(105deg, rgba(6,28,30,0.90) 0%, rgba(6,28,30,0.70) 35%, rgba(6,28,30,0.38) 60%, rgba(6,28,30,0.15) 100%)',
          }} />
          {/* Bottom fade to page background */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '38%',
            background: 'linear-gradient(to top, #061C1E 0%, transparent 100%)',
          }} />
        </div>
        <GrainOverlay id="grain-hero" opacity={0.036} />

        <div style={{ maxWidth: 1240, margin: '0 auto', paddingInline: 'clamp(24px, 6vw, 96px)', position: 'relative', zIndex: 20 }}>
          <div
            className="hero-grid"
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(40px, 6vw, 80px)',
              alignItems: 'center',
              minHeight: '100vh',
              paddingTop: 'clamp(80px, 10vh, 120px)',
              paddingBottom: 60,
            }}
          >
            {/* LEFT — copy */}
            <div className="hero-copy-col" style={{ position: 'relative', zIndex: 5 }}>
              <Label text="Exclusive Card" />
              <h1
                ref={headlineRef}
                style={{
                  fontWeight: 700, fontSize: 'clamp(2rem, 4.2vw, 62px)',
                  lineHeight: 1.04, letterSpacing: '-0.035em', color: '#FFF',
                  marginBottom: 22,
                }}
              >
                One card.<br />
                <span style={{ color: MINT_HI }}>The whole world.</span>
              </h1>
              <p
                className="hero-sub"
                style={{
                  color: 'rgba(143,163,160,0.85)',
                  fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.68,
                  maxWidth: 440, marginBottom: 36,
                }}
              >
                The Winity Exclusive card is issued upon KYC approval.
                Spend at 150M+ Visa® merchant locations across 180+ countries.
                ATM access wherever Visa® is accepted.
              </p>

              {/* CTAs */}
              <div
                className="hero-cta"
                style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 28 }}
              >
                <a
                  href="https://main.d1hk1kkou2qjtz.amplifyapp.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 34px', borderRadius: 999,
                    fontWeight: 700, fontSize: 14, letterSpacing: '0.02em',
                    color: '#061C1E', textDecoration: 'none',
                    background: `linear-gradient(135deg, ${MINT} 0%, ${MINT_HI} 100%)`,
                    transition: 'filter 0.25s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1.1)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.filter = 'none' }}
                >
                  Sign Up Now <ArrowRight size={16} />
                </a>
                <Link
                  to="/executive"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 34px', borderRadius: 999,
                    fontWeight: 500, fontSize: 14, color: '#fff',
                    border: '1px solid rgba(255,255,255,0.14)',
                    textDecoration: 'none', transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = `${MINT}50` }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.14)' }}
                >
                  See Executive Card
                </Link>
              </div>

              {/* Trust chips */}
              <div
                className="hero-trust"
                style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}
              >
                {['USD 0 virtual fee', 'Issued on KYC approval', '150M+ Visa merchants', 'ATM worldwide'].map((chip) => (
                  <span
                    key={chip}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: 12, fontWeight: 500, padding: '6px 14px', borderRadius: 999,
                      background: 'rgba(33,230,167,0.08)', border: '1px solid rgba(33,230,167,0.18)',
                      color: 'rgba(143,163,160,0.9)',
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: MINT, flexShrink: 0 }} />
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — CSS card fan — overflow visible so cards can fan freely */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', position: 'relative',
              minHeight: 'clamp(360px, 52vh, 600px)',
              overflow: 'visible',
            }}>
              {/* Ambient glow */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '85%', height: '85%',
                background: 'radial-gradient(ellipse, rgba(33,230,167,0.15) 0%, transparent 65%)',
                filter: 'blur(40px)', pointerEvents: 'none',
              }} />

              {/* CSS card fan — all 5 cards pivot from transform-origin: center 140% */}
              <div className="card-fan-deck" aria-label="Winity Exclusive Card spread">
                {[0, 1, 2, 3, 4].map(i => (
                  <img
                    key={i}
                    className={`card-fan-card fan-c-${i}`}
                    src={FAN_CARD_SRC}
                    alt={i === 2 ? 'Winity Exclusive Visa Card' : ''}
                    aria-hidden={i !== 2}
                    style={{
                      boxShadow: i === 4
                        ? '0 24px 64px rgba(0,0,0,0.88), 0 0 44px rgba(33,230,167,0.24)'
                        : `0 ${8 + i * 5}px ${20 + i * 10}px rgba(0,0,0,${0.55 + i * 0.06})`,
                    }}
                  />
                ))}
              </div>

              {/* Card tier badges */}
              <div
                className="card-badges"
                style={{ display: 'flex', gap: 10, marginTop: 'clamp(120px, 15vw, 180px)', position: 'relative', zIndex: 30, flexWrap: 'wrap', justifyContent: 'center' }}
              >
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '5px 14px', borderRadius: 999,
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
                  background: 'rgba(33,230,167,0.12)', border: '1px solid rgba(33,230,167,0.3)',
                  color: MINT,
                }}>
                  <Zap size={10} /> Virtual: USD 0 / year
                </span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '5px 14px', borderRadius: 999,
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.6)',
                }}>
                  <CreditCard size={10} /> Physical: from USD 20 / yr*
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div
          ref={tickerRef}
          className="pr-strip"
          style={{
            position: 'relative', zIndex: 30, width: '100%', overflow: 'hidden',
            borderTop: '1px solid rgba(255,255,255,0.05)', paddingBlock: 20,
            background: 'rgba(6,28,30,0.7)', backdropFilter: 'blur(8px)',
          }}
        >
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 100,
            background: 'linear-gradient(to right, #061C1E, transparent)', zIndex: 10,
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 100,
            background: 'linear-gradient(to left, #061C1E, transparent)', zIndex: 10,
          }} />
          <div className="ticker-track" style={{ display: 'flex', width: 'max-content' }}>
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} style={{ padding: '0 36px', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: MINT }}>
                  {item}
                </span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(33,230,167,0.4)', flexShrink: 0 }} />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          YOUR CARD ON US — prominent hero-level promo
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={promoBigRef}
        style={{
          position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(180deg, #061C1E 0%, #0A2820 100%)',
          padding: 'clamp(64px, 10vh, 120px) 0',
          borderBottom: '1px solid rgba(33,230,167,0.1)',
        }}
      >
        <div style={{
          position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(33,230,167,0.07) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <GrainOverlay id="grain-promo" opacity={0.032} />

        <div style={{ maxWidth: 1240, margin: '0 auto', paddingInline: 'clamp(24px, 6vw, 96px)', position: 'relative', zIndex: 10 }}>
          <div
            className="promo-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 7vw, 80px)', alignItems: 'center' }}
          >
            <div
              className="promo-img"
              style={{
                borderRadius: 24, overflow: 'hidden', position: 'relative',
                minHeight: 'clamp(280px, 38vw, 500px)',
                boxShadow: '0 48px 100px rgba(0,0,0,0.7), 0 0 60px rgba(33,230,167,0.08)',
                border: '1px solid rgba(33,230,167,0.12)',
              }}
            >
              <img
                src="/card_wallet_green.jpg"
                alt="Winity Exclusive physical card"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}
                onError={(e) => { (e.target as HTMLImageElement).src = '/exp_cards_closeup.png' }}
              />
              <div style={{
                position: 'absolute', top: 20, left: 20, zIndex: 10,
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 999,
                background: 'rgba(33,230,167,0.18)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(33,230,167,0.35)',
                fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: MINT,
              }}>
                <Gift size={12} /> YOUR CARD, ON US
              </div>
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                background: 'linear-gradient(to top, rgba(6,28,30,0.8) 0%, transparent 100%)',
              }} />
            </div>

            <div>
              <div className="promo-reveal"><Label text="Limited Promotion" /></div>
              <h2
                className="promo-reveal"
                style={{
                  fontSize: 'clamp(1.8rem, 3.8vw, 3.2rem)', fontWeight: 900, lineHeight: 1.04,
                  letterSpacing: '-0.04em', color: '#fff', marginBottom: 24,
                }}
              >
                Spend $25.<br />
                <span style={{ color: MINT_HI }}>Physical card at no issuance cost.</span>
              </h2>
              <p
                className="promo-reveal"
                style={{ color: 'rgba(143,163,160,0.82)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.72, maxWidth: 440, marginBottom: 32 }}
              >
                Reach $25 in eligible card spend and your premium Winity Exclusive physical card
                is issued at no cost. First 6 months of the USD 20/yr fee waived.
                Shipping charges may apply.
              </p>

              <div className="promo-reveal" style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
                {[
                  'Virtual card: issued upon KYC approval',
                  'Physical card: no issuance cost after $25 eligible spend',
                  'First 6 months annual fee waived for new physical activations',
                  'Accepted at 150M+ Visa® merchant locations globally',
                ].map((txt) => (
                  <div key={txt} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(33,230,167,0.12)', border: '1px solid rgba(33,230,167,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Check size={10} color={MINT} strokeWidth={2.5} />
                    </div>
                    <span style={{ color: 'rgba(143,163,160,0.85)', fontSize: 14 }}>{txt}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://main.d1hk1kkou2qjtz.amplifyapp.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="promo-reveal"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '15px 38px', borderRadius: 999,
                  fontWeight: 700, fontSize: 15, color: '#061C1E', textDecoration: 'none',
                  background: `linear-gradient(135deg, ${MINT} 0%, ${MINT_HI} 100%)`,
                  transition: 'filter 0.25s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1.08)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.filter = 'none' }}
              >
                Sign Up Now <ArrowRight size={15} />
              </a>
              <p style={{ fontSize: 11, color: 'rgba(143,163,160,0.4)', marginTop: 10 }}>
                * Shipping charges may apply. Subject to availability and programme terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FEATURE MOMENTS — magazine editorial (lifestyle + features combined)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(180deg, #0A2820 0%, #0B2E2C 100%)',
          padding: 'clamp(64px, 10vh, 120px) 0',
        }}
      >
        <GrainOverlay id="grain-moments" opacity={0.03} />
        <div style={{ maxWidth: 1240, margin: '0 auto', paddingInline: 'clamp(24px, 6vw, 96px)', position: 'relative', zIndex: 10 }}>

          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 8vh, 88px)' }}>
            <Label text="What You Get" />
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.8vw, 3.2rem)', fontWeight: 900,
              letterSpacing: '-0.035em', color: '#fff', lineHeight: 1.05,
            }}>
              Every benefit, in full.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(60px, 10vh, 100px)' }}>
            {MOMENTS.map((moment, i) => {
              const Icon = moment.icon
              return (
                <div
                  key={moment.label}
                  ref={(el) => { momentRowRefs.current[i] = el }}
                  className="moment-grid"
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr',
                    gap: 'clamp(32px, 6vw, 72px)', alignItems: 'center',
                    direction: moment.imgRight ? 'ltr' : 'rtl',
                  }}
                >
                  {/* Virtual card (i===0): natural size display — no fixed-height box */}
                  {i === 0 ? (
                    <div
                      className="moment-img"
                      style={{
                        direction: 'ltr', borderRadius: 20,
                        position: 'relative',
                        background: 'linear-gradient(145deg, rgba(6,28,30,0.9) 0%, rgba(11,46,44,0.75) 100%)',
                        boxShadow: '0 40px 90px rgba(0,0,0,0.65), 0 0 40px rgba(33,230,167,0.07)',
                        border: '1px solid rgba(33,230,167,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '40px 24px 64px',
                      }}
                    >
                      <img
                        src={moment.image}
                        alt={moment.label}
                        style={{
                          maxWidth: '88%', height: 'auto', display: 'block',
                          borderRadius: 12,
                          boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 32px rgba(33,230,167,0.12)',
                        }}
                        onError={moment.fallback ? (e) => { (e.target as HTMLImageElement).src = moment.fallback as string } : undefined}
                      />
                      <div style={{
                        position: 'absolute', bottom: 18, left: 18, zIndex: 5,
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: 999,
                        background: 'rgba(6,28,30,0.85)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(33,230,167,0.25)',
                        fontSize: 11, fontWeight: 700, color: MINT, letterSpacing: '0.08em',
                      }}>
                        <Icon size={11} strokeWidth={2} /> {moment.badge}
                      </div>
                    </div>
                  ) : (
                  <div
                    className="moment-img"
                    style={{
                      direction: 'ltr', borderRadius: 20, overflow: 'hidden',
                      position: 'relative', minHeight: 'clamp(260px, 32vw, 440px)',
                      boxShadow: '0 40px 90px rgba(0,0,0,0.65), 0 0 40px rgba(33,230,167,0.07)',
                      border: '1px solid rgba(33,230,167,0.1)',
                    }}
                  >
                    <img
                      src={moment.image}
                      alt={moment.label}
                      style={{
                        width: '100%', height: '100%', display: 'block', position: 'absolute', inset: 0,
                        objectFit: moment.appScreen ? 'contain' : 'cover',
                        objectPosition: 'center',
                        padding: moment.appScreen ? '16px' : '0',
                      }}
                      onError={moment.fallback ? (e) => { (e.target as HTMLImageElement).src = moment.fallback as string } : undefined}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(6,28,30,0.65) 0%, transparent 55%)',
                    }} />
                    <div style={{
                      position: 'absolute', bottom: 18, left: 18, zIndex: 5,
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '6px 14px', borderRadius: 999,
                      background: 'rgba(6,28,30,0.8)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(33,230,167,0.25)',
                      fontSize: 11, fontWeight: 700, color: MINT, letterSpacing: '0.08em',
                    }}>
                      <Icon size={11} strokeWidth={2} /> {moment.badge}
                    </div>
                  </div>
                  )}

                  <div className="moment-copy" style={{ direction: 'ltr' }}>
                    <Label text={moment.label} />
                    <h3 style={{
                      fontSize: 'clamp(1.7rem, 3.4vw, 2.9rem)', fontWeight: 900,
                      lineHeight: 1.06, letterSpacing: '-0.04em', color: '#fff',
                      marginBottom: 20, whiteSpace: 'pre-line',
                    }}>
                      {moment.headline.split('\n').map((line, li) => (
                        <span key={li} style={{ display: 'block' }}>
                          {li === 1 ? <span style={{ color: MINT_HI }}>{line}</span> : line}
                        </span>
                      ))}
                    </h3>
                    <p style={{
                      color: 'rgba(143,163,160,0.82)', fontSize: 'clamp(14px, 1.3vw, 16px)',
                      lineHeight: 1.72, maxWidth: 420, marginBottom: 28,
                    }}>
                      {moment.body}
                    </p>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 12,
                      padding: '12px 18px', borderRadius: 14,
                      background: 'rgba(33,230,167,0.07)', border: '1px solid rgba(33,230,167,0.15)',
                    }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                        background: 'rgba(33,230,167,0.12)', border: '1px solid rgba(33,230,167,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={16} color={MINT} strokeWidth={1.8} />
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{moment.label}</div>
                        <div style={{ fontSize: 12, color: MINT }}>{moment.badge}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── Editorial stats strip — replaces icon grid ── */}
          <div
            className="small-feat"
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 0, marginTop: 'clamp(64px, 10vh, 96px)',
              border: '1px solid rgba(33,230,167,0.10)',
              borderRadius: 20, overflow: 'hidden',
              background: 'rgba(6,28,30,0.55)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {SMALL_FEATURES.map((f, i) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  ref={(el) => { smallFeatRefs.current[i] = el }}
                  className="stat-cell"
                  style={{
                    padding: 'clamp(22px, 3vw, 36px)',
                    borderRight: i < SMALL_FEATURES.length - 1
                      ? '1px solid rgba(33,230,167,0.07)' : 'none',
                    position: 'relative', cursor: 'default',
                    transition: 'background 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(33,230,167,0.04)'
                    const accent = e.currentTarget.querySelector<HTMLElement>('.stat-accent')
                    if (accent) accent.style.opacity = '1'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = 'transparent'
                    const accent = e.currentTarget.querySelector<HTMLElement>('.stat-accent')
                    if (accent) accent.style.opacity = '0'
                  }}
                >
                  {/* Large stat number — the hero of each cell */}
                  <div style={{
                    fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 900,
                    color: MINT, letterSpacing: '-0.03em', lineHeight: 1,
                    marginBottom: 10,
                  }}>
                    {f.stat}
                  </div>
                  {/* Icon + label row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                    <Icon size={13} color={`${MINT}80`} strokeWidth={2} />
                    <span style={{
                      fontSize: 13, fontWeight: 700, color: '#F4F7F6',
                      letterSpacing: '-0.01em',
                    }}>
                      {f.title}
                    </span>
                  </div>
                  {/* Description */}
                  <p style={{
                    fontSize: 12, color: 'rgba(143,163,160,0.68)',
                    lineHeight: 1.6, margin: 0,
                  }}>
                    {f.desc}
                  </p>
                  {/* Hover bottom accent */}
                  <div className="stat-accent" style={{
                    position: 'absolute', bottom: 0, left: '15%', right: '15%', height: 1.5,
                    background: `linear-gradient(90deg, transparent, ${MINT}60, transparent)`,
                    opacity: 0, transition: 'opacity 0.3s ease',
                  }} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PREMIUM MEMBER BENEFITS — deposits, concierge
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative', overflow: 'hidden',
          background: '#061C1E',
          padding: 'clamp(64px, 10vh, 120px) 0',
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(232,168,78,0.4), transparent)',
        }} />
        <GrainOverlay id="grain-prem" opacity={0.03} />
        <div style={{ maxWidth: 1240, margin: '0 auto', paddingInline: 'clamp(24px, 6vw, 96px)', position: 'relative', zIndex: 10 }}>

          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vh, 64px)' }}>
            <Label text="Premium Benefits" color={COPPER} />
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.8vw, 3rem)', fontWeight: 900,
              letterSpacing: '-0.035em', color: '#fff', lineHeight: 1.05,
            }}>
              For those who go further.
            </h2>
            <p style={{ color: 'rgba(143,163,160,0.75)', fontSize: 16, maxWidth: 480, marginInline: 'auto', marginTop: 14, lineHeight: 1.65 }}>
              Winity Life recognises members who hold serious capital. High account balances unlock
              exclusive rate benefits and dedicated personal service.
            </p>
          </div>

          <div
            className="prem-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
          >
            {PREMIUM_TIERS.map((tier, i) => {
              const Icon = tier.icon
              return (
                <div
                  key={tier.title}
                  ref={(el) => { premiumRefs.current[i] = el }}
                  style={{
                    borderRadius: 22, padding: 'clamp(24px, 3vw, 36px)',
                    background: i === 1
                      ? 'linear-gradient(145deg, rgba(40,28,10,0.8) 0%, rgba(28,20,6,0.6) 100%)'
                      : 'linear-gradient(145deg, rgba(15,63,58,0.5) 0%, rgba(11,46,44,0.32) 100%)',
                    border: `1px solid ${i === 1 ? 'rgba(232,168,78,0.25)' : 'rgba(33,230,167,0.12)'}`,
                    position: 'relative', overflow: 'hidden',
                    transition: 'border-color 0.35s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = i === 1 ? 'rgba(232,168,78,0.5)' : 'rgba(33,230,167,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = i === 1 ? 'rgba(232,168,78,0.25)' : 'rgba(33,230,167,0.12)'
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 0, left: 24, right: 24, height: 1,
                    background: `linear-gradient(90deg, transparent, ${i === 1 ? 'rgba(232,168,78,0.5)' : 'rgba(33,230,167,0.4)'}, transparent)`,
                  }} />
                  <div style={{
                    width: 46, height: 46, borderRadius: 14, marginBottom: 20,
                    background: i === 1 ? 'rgba(232,168,78,0.1)' : 'rgba(33,230,167,0.1)',
                    border: `1px solid ${i === 1 ? 'rgba(232,168,78,0.22)' : 'rgba(33,230,167,0.22)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={22} color={tier.color} strokeWidth={1.5} />
                  </div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '3px 10px', borderRadius: 999, marginBottom: 14,
                    background: i === 1 ? 'rgba(232,168,78,0.1)' : 'rgba(33,230,167,0.08)',
                    border: `1px solid ${i === 1 ? 'rgba(232,168,78,0.2)' : 'rgba(33,230,167,0.15)'}`,
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const,
                    color: tier.color,
                  }}>
                    {tier.badge}
                  </div>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 10, letterSpacing: '-0.01em' }}>
                    {tier.title}
                  </h3>
                  <p style={{ color: 'rgba(143,163,160,0.78)', fontSize: 14, lineHeight: 1.65 }}>
                    {tier.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={howRef}
        style={{
          position: 'relative', padding: 'clamp(64px, 10vh, 140px) 0',
          background: 'linear-gradient(180deg, #061C1E 0%, #061C1E 100%)', overflow: 'hidden',
        }}
      >
        <GrainOverlay id="grain-how" opacity={0.03} />
        <div style={{ maxWidth: 1240, margin: '0 auto', paddingInline: 'clamp(24px, 6vw, 96px)', position: 'relative', zIndex: 10 }}>
          <div className="how-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 8vw, 80px)', alignItems: 'start' }}>
            <div className="how-sticky" style={{ position: 'sticky', top: 120 }}>
              <div className="section-hdr">
                <Label text="Get Started" />
                <h2 style={{
                  fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.05,
                  letterSpacing: '-0.03em', color: '#fff', marginBottom: 20,
                }}>
                  Up and spending<br />in four steps.
                </h2>
                <p style={{ color: 'rgba(143,163,160,0.8)', fontSize: 16, lineHeight: 1.65, maxWidth: 340, marginBottom: 32 }}>
                  From download to first transaction in minutes.
                  No bank account required. No staking. No waiting.
                </p>
                <a
                  href="https://main.d1hk1kkou2qjtz.amplifyapp.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '12px 28px', borderRadius: 999,
                    fontWeight: 700, fontSize: 14, color: '#061C1E', textDecoration: 'none',
                    background: `linear-gradient(135deg, ${MINT} 0%, ${MINT_HI} 100%)`,
                  }}
                >
                  Sign Up Now <ArrowRight size={15} />
                </a>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {HOW_IT_WORKS.map((step, i) => (
                <div
                  key={step.n}
                  ref={(el) => { stepRefs.current[i] = el }}
                  style={{
                    position: 'relative', borderRadius: 20, padding: 28,
                    background: 'linear-gradient(145deg, rgba(15,63,58,0.45) 0%, rgba(11,46,44,0.3) 100%)',
                    border: '1px solid rgba(33,230,167,0.1)', overflow: 'hidden',
                  }}
                >
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div style={{
                      position: 'absolute', left: 30, bottom: -14, width: 1, height: 14,
                      background: 'rgba(33,230,167,0.2)',
                    }} />
                  )}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(33,230,167,0.12)', border: '1px solid rgba(33,230,167,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 11, letterSpacing: '0.1em', color: MINT,
                    }}>
                      {step.n}
                    </div>
                    <div>
                      <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{step.title}</h3>
                      <p style={{ color: 'rgba(143,163,160,0.8)', fontSize: 14, lineHeight: 1.65 }}>{step.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          UMI PARTNERSHIP — 1GB data + 20% Winity Club discount
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={esimRef}
        style={{
          position: 'relative', padding: 'clamp(64px, 10vh, 140px) 0',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #0B2E2C 0%, #0F3F3A 50%, #0B2E2C 100%)',
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(33,230,167,0.4), transparent)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(33,230,167,0.4), transparent)',
        }} />
        <GrainOverlay id="grain-esim" opacity={0.032} />

        <div style={{ maxWidth: 1240, margin: '0 auto', paddingInline: 'clamp(24px, 6vw, 96px)', position: 'relative', zIndex: 10 }}>
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vh, 64px)' }}>
            <Label text="UMI Partnership" />
            <h2 style={{
              fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.05,
              letterSpacing: '-0.03em', color: '#fff',
            }}>
              Travel data benefits.<br />
              <span style={{ color: MINT_HI }}>Built into your card.</span>
            </h2>
            <p style={{ color: 'rgba(143,163,160,0.8)', fontSize: 16, lineHeight: 1.65, maxWidth: 540, marginInline: 'auto', marginTop: 16 }}>
              Winity has partnered with{' '}
              <a href="https://umi.app" target="_blank" rel="noopener noreferrer"
                style={{ color: MINT, textDecoration: 'none', borderBottom: '1px solid rgba(33,230,167,0.35)' }}
              >
                UMI <ExternalLink size={11} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </a>{' '}
              to bring exclusive data benefits to Exclusive cardholders. Two ways to benefit:
            </p>
          </div>

          <div
            className="reveal-up esim-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 36 }}
          >
            {[
              {
                icon: Wifi,
                headline: '1 GB Free Data',
                subhead: 'After USD 5,000 eligible spend',
                body: 'Reach USD 5,000 in eligible card spend and unlock 1 GB of complimentary UMI data, digitally activated in 100+ countries with no physical SIM needed.',
                badge: 'Spend milestone reward',
              },
              {
                icon: Gift,
                headline: '20% Off All Data',
                subhead: 'Winity Club members via UMI app',
                body: 'Join the Winity Club on the UMI app and save 20% on every data package you purchase. An exclusive ongoing benefit for Winity cardholders.',
                badge: 'Winity Club: ongoing discount',
              },
            ].map((benefit) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.headline}
                  style={{
                    borderRadius: 22, padding: 'clamp(28px, 3.5vw, 44px)',
                    background: 'linear-gradient(145deg, rgba(6,28,30,0.85) 0%, rgba(11,46,44,0.6) 100%)',
                    border: '1px solid rgba(33,230,167,0.2)', position: 'relative', overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 0, left: 24, right: 24, height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(33,230,167,0.6), transparent)',
                  }} />
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, marginBottom: 20,
                    background: 'rgba(33,230,167,0.1)', border: '1px solid rgba(33,230,167,0.22)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={22} color={MINT} strokeWidth={1.5} />
                  </div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' as const,
                    color: MINT, marginBottom: 10,
                  }}>{benefit.badge}</div>
                  <h3 style={{ color: '#fff', fontWeight: 900, fontSize: 'clamp(20px, 2.4vw, 28px)', letterSpacing: '-0.03em', marginBottom: 6 }}>
                    {benefit.headline}
                  </h3>
                  <div style={{ color: MINT_HI, fontSize: 13, fontWeight: 600, marginBottom: 14 }}>{benefit.subhead}</div>
                  <p style={{ color: 'rgba(143,163,160,0.8)', fontSize: 14, lineHeight: 1.65 }}>{benefit.body}</p>
                </div>
              )
            })}
          </div>

          {/* Winity Club CTA */}
          <div
            className="reveal-up"
            style={{
              borderRadius: 22, padding: 'clamp(24px, 3.5vw, 40px)',
              background: 'linear-gradient(135deg, rgba(33,230,167,0.1) 0%, rgba(11,46,44,0.6) 100%)',
              border: '1px solid rgba(33,230,167,0.22)',
              display: 'flex', flexWrap: 'wrap', alignItems: 'center',
              justifyContent: 'space-between', gap: 24,
            }}
          >
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: MINT, marginBottom: 6 }}>
                Winity Club × UMI
              </p>
              <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 20, marginBottom: 8, letterSpacing: '-0.02em' }}>
                Join Winity Club on the UMI app to unlock 20% off all data purchases.
              </h3>
              <p style={{ color: 'rgba(143,163,160,0.78)', fontSize: 14, lineHeight: 1.6, maxWidth: 500 }}>
                An exclusive, ongoing data discount for Winity cardholders. Simply join the Winity Club within the UMI platform.
              </p>
            </div>
            <a
              href={UMI_CLUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0,
                padding: '14px 28px', borderRadius: 999,
                fontWeight: 700, fontSize: 14, color: '#061C1E', textDecoration: 'none',
                background: `linear-gradient(135deg, ${MINT} 0%, ${MINT_HI} 100%)`,
                whiteSpace: 'nowrap',
              }}
            >
              Join Winity Club on UMI <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FEE TRANSPARENCY
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={feesRef}
        style={{
          position: 'relative', padding: 'clamp(64px, 10vh, 140px) 0',
          background: '#061C1E', overflow: 'hidden',
        }}
      >
        <GrainOverlay id="grain-fees" opacity={0.03} />
        <div style={{ maxWidth: 780, margin: '0 auto', paddingInline: 'clamp(24px, 6vw, 96px)', position: 'relative', zIndex: 10 }}>
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vh, 56px)' }}>
            <Label text="Transparent Pricing" />
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.035em', color: '#fff' }}>
              No hidden fees. Ever.
            </h2>
          </div>
          <div className="reveal-up" style={{
            borderRadius: 28, overflow: 'hidden', position: 'relative',
            background: 'linear-gradient(145deg, rgba(15,63,58,0.55) 0%, rgba(11,46,44,0.4) 100%)',
            border: '1px solid rgba(33,230,167,0.15)',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(33,230,167,0.6), transparent)',
            }} />
            <div style={{ padding: 'clamp(24px, 4vw, 48px)' }}>
              {FEES.map(({ label, value }, i) => (
                <div
                  key={label}
                  className="fee-row"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 0',
                    borderBottom: i < FEES.length - 1 ? '1px solid rgba(33,230,167,0.07)' : 'none',
                  }}
                >
                  <span style={{ color: 'rgba(143,163,160,0.8)', fontSize: 13 }}>{label}</span>
                  <span style={{
                    color: i === 0 ? MINT : '#fff', fontSize: i === 0 ? 16 : 13,
                    fontWeight: i === 0 ? 800 : 600, textAlign: 'right', maxWidth: '55%',
                  }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="reveal-up" style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'rgba(143,163,160,0.4)' }}>
            * Shipping charges may apply for physical card delivery. First 6 months waived applies to new physical activations only. Subject to terms.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        ref={ctaRef}
        style={{
          position: 'relative', padding: 'clamp(80px, 12vh, 160px) 0',
          overflow: 'hidden', textAlign: 'center',
          background: 'linear-gradient(180deg, #0B2E2C 0%, #061C1E 100%)',
        }}
      >
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(33,230,167,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <GrainOverlay id="grain-cta" opacity={0.03} />
        <div style={{ maxWidth: 700, margin: '0 auto', paddingInline: 24, position: 'relative', zIndex: 10 }}>
          <div className="reveal-up"><Label text="Get Started Today" /></div>
          <h2 className="reveal-up" style={{
            fontSize: 'clamp(2.2rem, 5vw, 4.2rem)', fontWeight: 900, lineHeight: 1.0,
            letterSpacing: '-0.045em', color: '#fff', marginBottom: 20,
          }}>
            Get the card.<br />
            <span style={{ color: MINT_HI }}>The world is already waiting.</span>
          </h2>
          <p className="reveal-up" style={{
            color: 'rgba(143,163,160,0.75)',
            fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', lineHeight: 1.7, marginBottom: 44,
          }}>
            Download the Winity Life app, complete your KYC verification, and receive your
            Exclusive virtual card, issued upon KYC approval. Physical card available after $25 spend.
          </p>
          <div className="reveal-up" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            <a
              href="https://main.d1hk1kkou2qjtz.amplifyapp.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '15px 40px', borderRadius: 999,
                fontWeight: 700, fontSize: 15, color: '#061C1E', textDecoration: 'none',
                background: `linear-gradient(135deg, ${MINT} 0%, ${MINT_HI} 100%)`,
              }}
            >
              Sign Up Now <ArrowRight size={16} />
            </a>
            <Link
              to="/loyalty"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '15px 40px', borderRadius: 999,
                fontWeight: 500, fontSize: 15, color: '#fff', textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.15)',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = `${MINT}50` }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.15)' }}
            >
              View Loyalty Rewards
            </Link>
          </div>
        </div>
      </section>

      {/* ── Compliance footer ────────────────────────────────────────────── */}
      <section style={{
        padding: '40px 0', background: '#061C1E',
        borderTop: '1px solid rgba(33,230,167,0.07)',
      }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', paddingInline: 'clamp(24px, 6vw, 96px)' }}>
          <p style={{
            color: 'rgba(143,163,160,0.42)', fontSize: 12, lineHeight: 1.65,
            maxWidth: 800, margin: '0 auto', textAlign: 'center',
          }}>
            Card services are issued in Hong Kong and available globally wherever Visa® is accepted.
            Availability may vary by jurisdiction. Winity Life is not a bank. Digital asset-linked card
            services involve risks. Physical card USD 20/yr with first
            6 months waived for new activations. Physical card issued at no cost after $25 eligible spend;
            shipping charges may apply. ATM withdrawal fee USD 3 per transaction. 150M+ refers to Visa®
            merchant locations worldwide. UMI data benefit subject to USD 5,000 eligible spend threshold.
            Winity Club 20% discount via UMI app only. Large deposit bonuses subject to programme terms.
            USD 100,000+ concierge subject to eligibility. See{' '}
            <a href="https://winity.life/terms" target="_blank" rel="noopener noreferrer"
              style={{ color: 'rgba(33,230,167,0.5)' }}>winity.life/terms</a>{' '}
            for full terms and conditions.
          </p>
        </div>
      </section>
    </div>
  )
}
