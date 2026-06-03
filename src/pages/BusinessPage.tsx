/**
 * ---
 * client: Winity Life
 * philosophy: Emerald Noir
 * colors:
 *   primary: "#0B2E2C"
 *   accent: "#21E6A7"
 *   copper: "#B87333"
 * deliverable: Business Page
 * phase: 6
 * skills_used: [tss-master, tss-frontend-pro, ag-scroll-reveal, tss-creative-components]
 * date: 2026-05-27
 * status: Production
 * ---
 *
 * Winity Business — Emerald Noir
 * Corporate payments + team cards + treasury + concierge
 * Inspired by kast.xyz/business, elevated to Revolut/Stripe enterprise standard
 */

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  CreditCard,
  Globe,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Lock,
  ChevronRight,
  CheckCircle2,
  Star,
  Banknote,
  Layers,
  BarChart3,
  Headphones,
  Code2,
  Wallet,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ─── Brand tokens ──────────────────────────────────────────────────────────────
const BASE       = '#061C1E'
const HERO_BG    = '#071E20'
const CARD_BG    = '#0B2E2C'
const CARD_BG2   = '#0D3330'
const BORDER     = 'rgba(33,230,167,0.12)'
const BORDER_CU  = 'rgba(184,115,51,0.20)'
const MINT       = '#21E6A7'
const MINT_HI    = '#3CF2D0'
const COPPER     = '#B87333'
const COPPER_LT  = '#E8A84E'
const OFF_WHITE  = '#F0EDE6'
const MUTED      = 'rgba(240,237,230,0.50)'
const MUTED_DIM  = 'rgba(240,237,230,0.32)'

// ─── Copper top line ──────────────────────────────────────────────────────────
function CopperLine() {
  return (
    <div
      aria-hidden="true"
      style={{
        height: 1.5,
        background: `linear-gradient(90deg, transparent, ${COPPER}, ${COPPER_LT}, ${COPPER}, transparent)`,
        opacity: 0.85,
      }}
    />
  )
}

// ─── Label component ──────────────────────────────────────────────────────────
function Label({ children, copper }: { children: React.ReactNode; copper?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: copper ? COPPER_LT : MINT,
        marginBottom: 20,
      }}
    >
      <span style={{ display: 'inline-block', width: 20, height: 1, background: copper ? COPPER_LT : MINT }} />
      {children}
      <span style={{ display: 'inline-block', width: 20, height: 1, background: copper ? COPPER_LT : MINT }} />
    </span>
  )
}

// ─── Grain overlay ────────────────────────────────────────────────────────────
function Grain() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.035, pointerEvents: 'none', zIndex: 2 }}
    >
      <filter id="biz-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#biz-grain)" />
    </svg>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function BusinessHero() {
  const heroRef   = useRef<HTMLElement>(null)
  const copyRef   = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = heroRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      if (copyRef.current) {
        tl.fromTo(
          [...copyRef.current.children],
          { y: 48, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
          0.2
        )
      }
      if (visualRef.current) {
        tl.fromTo(
          visualRef.current,
          { x: 60, opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, duration: 1.0 },
          0.35
        )
      }
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      style={{
        background: HERO_BG,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'clamp(96px, 14vh, 140px)',
        paddingBottom: 'clamp(64px, 10vh, 100px)',
      }}
      aria-label="Winity Business hero"
    >
      <Grain />

      {/* Arch background */}
      <img
        src="/hero_bg_arch3.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center bottom',
          mixBlendMode: 'screen',
          filter: 'brightness(0.55) saturate(1.1)',
          opacity: 0.45,
          pointerEvents: 'none',
        }}
      />

      {/* Radial gradient */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 80% 70% at 30% 50%, rgba(13,56,50,0.60) 0%, rgba(7,30,32,0.85) 55%, ${HERO_BG} 100%)`,
      }} />

      {/* Grid lines subtle */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(33,230,167,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(33,230,167,0.03) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(300px, 48%, 560px) 1fr',
          gap: 'clamp(48px, 8vw, 100px)',
          alignItems: 'center',
        }}>

          {/* Left — copy */}
          <div ref={copyRef}>
            <Label copper>Winity Business</Label>

            <h1 style={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(36px, 5.5vw, 72px)',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              color: OFF_WHITE,
              margin: '0 0 24px',
            }}>
              One platform.<br />
              <span style={{ color: MINT }}>Every business</span><br />
              payment.
            </h1>

            <p style={{
              fontFamily: 'Roboto, sans-serif',
              fontSize: 'clamp(15px, 1.25vw, 18px)',
              color: MUTED,
              lineHeight: 1.7,
              maxWidth: 440,
              marginBottom: 36,
            }}>
              Winity Business gives your company digital asset payment rails,
              corporate Visa cards for every team member, and dedicated treasury
              management, all in one platform built for global operations.
            </p>

            {/* Trust chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
              {[
                'Visa® Network',
                'KYC Compliant',
                '150M+ Merchants',
                '200+ Countries',
                'Team Cards',
              ].map(t => (
                <span key={t} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
                  color: `${MINT}cc`,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 100, padding: '5px 12px',
                  background: 'rgba(33,230,167,0.06)',
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: MINT, flexShrink: 0 }} />
                  {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a
                href="https://app.winity.life/business"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill"
                style={{ fontSize: 14 }}
                aria-label="Apply for Winity Business"
              >
                Apply for Business
                <span className="pill-icon" aria-hidden="true">
                  <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
                  </svg>
                </span>
              </a>
              <a
                href="mailto:business@winity.life"
                className="btn-ghost"
                style={{ fontSize: 14 }}
              >
                Talk to sales <ArrowRight size={14} style={{ display: 'inline', marginLeft: 4 }} />
              </a>
            </div>
          </div>

          {/* Right — visual */}
          <div ref={visualRef} style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Main card visual */}
            <div style={{ position: 'relative', width: '100%', maxWidth: 480 }}>
              {/* Glow */}
              <div aria-hidden="true" style={{
                position: 'absolute', inset: '-30%',
                background: `radial-gradient(ellipse 60% 50% at 50% 55%, rgba(33,230,167,0.18) 0%, transparent 70%)`,
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }} />

              {/* Card stack container */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(280px, 36vw, 420px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1200px',
              }}>
                {/* Back card — mint border team card */}
                <div style={{
                  position: 'absolute',
                  width: '82%',
                  borderRadius: 20,
                  padding: 28,
                  background: `linear-gradient(135deg, ${CARD_BG2} 0%, #0D3B38 100%)`,
                  border: `1px solid ${BORDER}`,
                  transform: 'translateY(42px) translateX(32px) rotateZ(6deg) scale(0.93)',
                  boxShadow: `0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(33,230,167,0.08)`,
                  zIndex: 1,
                }}>
                  <CopperLine />
                  <div style={{ marginTop: 16 }}>
                    <p style={{ fontSize: 10, color: MUTED_DIM, letterSpacing: '0.1em', marginBottom: 4 }}>TEAM CARD #3</p>
                    <p style={{ fontSize: 14, color: OFF_WHITE, fontWeight: 600 }}>Operations Account</p>
                  </div>
                  <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <p style={{ fontSize: 12, color: MUTED_DIM, fontFamily: 'monospace', letterSpacing: '0.15em' }}>•••• •••• •••• 7821</p>
                    <span style={{ fontSize: 11, color: `${MINT}80`, fontWeight: 700, letterSpacing: '0.1em' }}>VISA</span>
                  </div>
                </div>

                {/* Middle card */}
                <div style={{
                  position: 'absolute',
                  width: '85%',
                  borderRadius: 20,
                  padding: 28,
                  background: `linear-gradient(135deg, #0E3230 0%, #103A36 100%)`,
                  border: `1px solid rgba(184,115,51,0.18)`,
                  transform: 'translateY(20px) translateX(14px) rotateZ(2.5deg) scale(0.96)',
                  boxShadow: `0 32px 80px rgba(0,0,0,0.60), 0 0 0 1px rgba(184,115,51,0.1)`,
                  zIndex: 2,
                }}>
                  <div style={{ height: 1.5, background: `linear-gradient(90deg, transparent, ${COPPER}, ${COPPER_LT}, transparent)` }} />
                  <div style={{ marginTop: 16 }}>
                    <p style={{ fontSize: 10, color: MUTED_DIM, letterSpacing: '0.1em', marginBottom: 4 }}>TEAM CARD #2</p>
                    <p style={{ fontSize: 14, color: OFF_WHITE, fontWeight: 600 }}>Marketing Budget</p>
                  </div>
                  <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <p style={{ fontSize: 12, color: MUTED_DIM, fontFamily: 'monospace', letterSpacing: '0.15em' }}>•••• •••• •••• 4392</p>
                    <span style={{ fontSize: 11, color: `${COPPER_LT}90`, fontWeight: 700, letterSpacing: '0.1em' }}>VISA</span>
                  </div>
                </div>

                {/* Front — main business card */}
                <div style={{
                  position: 'relative',
                  width: '88%',
                  borderRadius: 22,
                  overflow: 'hidden',
                  background: `linear-gradient(135deg, #0B3230 0%, #0F3F3A 50%, #0D3530 100%)`,
                  border: `1px solid rgba(33,230,167,0.20)`,
                  boxShadow: `0 40px 100px rgba(0,0,0,0.70), 0 0 80px rgba(33,230,167,0.08), 0 0 0 1px rgba(33,230,167,0.12)`,
                  zIndex: 3,
                  padding: 32,
                  animation: 'bizCardFloat 4s ease-in-out infinite',
                }}>
                  <CopperLine />

                  {/* Header row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 20 }}>
                    <div>
                      <p style={{ fontSize: 10, color: MUTED_DIM, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>BUSINESS CARD</p>
                      <p style={{ fontSize: 16, color: OFF_WHITE, fontWeight: 700 }}>Winity Business</p>
                    </div>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: `radial-gradient(circle, ${MINT}22 0%, transparent 70%)`,
                      border: `1px solid ${BORDER}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Building2 size={18} color={MINT} />
                    </div>
                  </div>

                  {/* Chip */}
                  <div style={{
                    marginTop: 24,
                    width: 44, height: 34, borderRadius: 6,
                    background: 'linear-gradient(135deg, #E8A84E, #B87333)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ width: 28, height: 22, border: '1px solid rgba(255,255,255,0.2)', borderRadius: 3 }} />
                  </div>

                  {/* Card number */}
                  <p style={{
                    fontFamily: 'monospace', fontSize: 15, color: OFF_WHITE,
                    letterSpacing: '0.18em', marginTop: 20, fontWeight: 500,
                  }}>•••• •••• •••• 0001</p>

                  {/* Footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20 }}>
                    <div>
                      <p style={{ fontSize: 9, color: MUTED_DIM, letterSpacing: '0.1em', marginBottom: 2 }}>CARDHOLDER</p>
                      <p style={{ fontSize: 12, color: OFF_WHITE, fontWeight: 600, letterSpacing: '0.05em' }}>WINITY CORP</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: 9, color: MUTED_DIM, letterSpacing: '0.1em', marginBottom: 2 }}>NETWORK</p>
                      <p style={{ fontSize: 14, color: COPPER_LT, fontWeight: 800, letterSpacing: '0.1em' }}>VISA</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats below the card */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 24 }}>
                {[
                  { value: 'Unlimited', label: 'Team Cards' },
                  { value: '$0', label: 'Monthly Fee' },
                  { value: '200+', label: 'Countries' },
                ].map(s => (
                  <div key={s.label} style={{
                    textAlign: 'center', padding: '16px 8px',
                    background: 'rgba(33,230,167,0.04)',
                    border: `1px solid ${BORDER}`,
                    borderRadius: 14,
                  }}>
                    <p style={{ fontSize: 18, fontWeight: 800, color: MINT, marginBottom: 4, letterSpacing: '-0.01em' }}>{s.value}</p>
                    <p style={{ fontSize: 11, color: MUTED_DIM }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 6,
      }}>
        <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, transparent, ${MINT}60, transparent)` }} />
      </div>
    </section>
  )
}

// ─── FEATURE METRICS BAR ─────────────────────────────────────────────────────
function MetricsBar() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [...ref.current!.querySelectorAll('.metric-item')],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const metrics = [
    { value: '150M+', label: 'Visa® merchant locations worldwide' },
    { value: '200+', label: 'Countries supported' },
    { value: 'Unlimited', label: 'Team cards per account' },
    { value: '24/7', label: 'Business support' },
    { value: 'USD 0', label: 'Platform setup fee' },
  ]

  return (
    <div style={{ background: CARD_BG, borderTop: `1px solid ${BORDER_CU}`, borderBottom: `1px solid ${BORDER}` }}>
      <div ref={ref} style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 64px)',
        display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 0,
      }}>
        {metrics.map((m, i) => (
          <div key={m.label} className="metric-item" style={{
            textAlign: 'center',
            padding: 'clamp(20px, 3vw, 32px) clamp(16px, 2vw, 24px)',
            borderRight: i < metrics.length - 1 ? `1px solid ${BORDER}` : 'none',
            flex: '1 1 160px',
          }}>
            <p style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 900, color: MINT, letterSpacing: '-0.02em', marginBottom: 4 }}>{m.value}</p>
            <p style={{ fontSize: 11, color: MUTED_DIM, letterSpacing: '0.06em', maxWidth: 120, margin: '0 auto' }}>{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── ACCEPT DIGITAL ASSET PAYMENTS ───────────────────────────────────────────
function PaymentsSection() {
  const ref = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const vizRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(copyRef.current, { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
      gsap.fromTo(vizRef.current, { x: 40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const features = [
    { icon: Zap, text: 'Accept digital asset payments from customers globally' },
    { icon: TrendingUp, text: 'Automatic conversion to your preferred settlement currency' },
    { icon: Shield, text: 'KYC/AML compliant for all transactions' },
    { icon: Globe, text: 'Multi-currency settlement in 40+ fiat currencies' },
    { icon: BarChart3, text: 'Real-time treasury dashboard with analytics' },
  ]

  const currencies = ['BTC', 'ETH', 'USDT', 'USDC', 'SOL', 'XRP']

  return (
    <section ref={ref} style={{ background: BASE, padding: 'clamp(80px, 12vh, 128px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'clamp(300px, 46%, 520px) 1fr', gap: 'clamp(48px, 8vw, 100px)', alignItems: 'center' }}>

          {/* Left viz */}
          <div ref={vizRef} style={{ order: 1 }}>
            <div style={{
              borderRadius: 24, overflow: 'hidden',
              background: CARD_BG,
              border: `1px solid ${BORDER_CU}`,
              boxShadow: `0 40px 100px rgba(0,0,0,0.5)`,
            }}>
              <CopperLine />
              <div style={{ padding: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div>
                    <p style={{ fontSize: 11, color: MUTED_DIM, letterSpacing: '0.1em', marginBottom: 4 }}>PAYMENT RECEIVED</p>
                    <p style={{ fontSize: 28, fontWeight: 800, color: OFF_WHITE, letterSpacing: '-0.02em' }}>+$24,800.00</p>
                  </div>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'rgba(33,230,167,0.12)',
                    border: `1px solid ${BORDER}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <CheckCircle2 size={22} color={MINT} />
                  </div>
                </div>

                {/* Currency accepted row */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 10, color: MUTED_DIM, letterSpacing: '0.1em', marginBottom: 12 }}>ACCEPTED DIGITAL ASSETS</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {currencies.map(c => (
                      <span key={c} style={{
                        fontSize: 12, fontWeight: 700, color: MINT,
                        background: 'rgba(33,230,167,0.08)',
                        border: `1px solid ${BORDER}`,
                        borderRadius: 8, padding: '6px 12px',
                        letterSpacing: '0.06em',
                      }}>{c}</span>
                    ))}
                  </div>
                </div>

                {/* Transaction rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    { from: 'Enterprise Client A', amount: '+$12,400', asset: 'USDC', time: '2m ago', status: 'settled' },
                    { from: 'Global Supplier Co.', amount: '+$8,250', asset: 'ETH', time: '18m ago', status: 'settled' },
                    { from: 'Regional Partner Ltd.', amount: '+$4,150', asset: 'USDT', time: '1h ago', status: 'settled' },
                  ].map((tx, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '12px 14px', borderRadius: 12,
                      background: i === 0 ? 'rgba(33,230,167,0.05)' : 'transparent',
                      border: i === 0 ? `1px solid ${BORDER}` : '1px solid transparent',
                    }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: OFF_WHITE, marginBottom: 2 }}>{tx.from}</p>
                        <p style={{ fontSize: 11, color: MUTED_DIM }}>{tx.time} · via {tx.asset}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: MINT }}>{tx.amount}</p>
                        <p style={{ fontSize: 10, color: `${MINT}80`, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{tx.status}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Settlement line */}
                <div style={{
                  marginTop: 20, padding: '14px 16px', borderRadius: 12,
                  background: `rgba(184,115,51,0.08)`,
                  border: `1px solid ${BORDER_CU}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div>
                    <p style={{ fontSize: 10, color: MUTED_DIM, letterSpacing: '0.1em', marginBottom: 2 }}>SETTLED TO USD</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: COPPER_LT }}>$24,800.00 → Bank account</p>
                  </div>
                  <CheckCircle2 size={16} color={COPPER_LT} />
                </div>
              </div>
            </div>
          </div>

          {/* Right copy */}
          <div ref={copyRef} style={{ order: 2 }}>
            <Label>Digital Asset Payments</Label>
            <h2 style={{
              fontFamily: 'Roboto, sans-serif', fontWeight: 900,
              fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.1,
              letterSpacing: '-0.02em', color: OFF_WHITE,
              margin: '0 0 20px',
            }}>
              Accept crypto.<br />
              <span style={{ color: MINT }}>Settle in fiat.</span>
            </h2>
            <p style={{ fontSize: 'clamp(14px, 1.15vw, 17px)', color: MUTED, lineHeight: 1.7, maxWidth: 440, marginBottom: 28 }}>
              Receive digital asset payments from customers anywhere in the world.
              Winity automatically converts and settles to your preferred currency.
              Your operations stay clean, your treasury stays stable.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
              {features.map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                    background: 'rgba(33,230,167,0.08)',
                    border: `1px solid ${BORDER}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={14} color={MINT} />
                  </div>
                  <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.5, paddingTop: 7 }}>{text}</p>
                </div>
              ))}
            </div>
            <a href="https://app.winity.life/business" target="_blank" rel="noopener noreferrer" className="btn-pill" style={{ fontSize: 13 }}>
              Start accepting payments
              <span className="pill-icon" aria-hidden="true">
                <svg width="13" height="13" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TEAM CARDS ───────────────────────────────────────────────────────────────
function TeamCardsSection() {
  const ref = useRef<HTMLElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
      gsap.fromTo(
        [...cardsRef.current!.children],
        { y: 60, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true }, delay: 0.2 }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const features = [
    { icon: CreditCard, title: 'Unlimited Cards', body: 'Issue a Visa card to every team member. Set individual spend limits and category controls from one dashboard.' },
    { icon: Layers, title: 'Budget Separation', body: 'Ring-fence budgets by department, project, or event. Accounting integration included.' },
    { icon: Lock, title: 'Instant Controls', body: 'Freeze, unfreeze, or cancel any card in seconds. Set category locks, geo-restrictions, and daily limits.' },
    { icon: BarChart3, title: 'Real-Time Spend View', body: 'Every transaction visible instantly. Download reports in CSV or connect to your accounting software.' },
    { icon: Globe, title: 'Global Acceptance', body: '150M+ Visa® merchant locations across 200+ countries. ATM withdrawals wherever Visa® is accepted.' },
    { icon: Zap, title: 'Digital-First', body: 'Virtual cards issued upon KYC approval. Add to Google Pay and start spending the same day. Apple Pay support coming soon.' },
  ]

  return (
    <section ref={ref} style={{ background: CARD_BG, padding: 'clamp(80px, 12vh, 128px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }}>
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: 64 }}>
          <Label copper>Corporate Cards</Label>
          <h2 style={{
            fontFamily: 'Roboto, sans-serif', fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 54px)', lineHeight: 1.08,
            letterSpacing: '-0.02em', color: OFF_WHITE, maxWidth: 700, margin: '0 auto 20px',
          }}>
            One account.<br />
            <span style={{ color: COPPER_LT }}>Cards for your whole team.</span>
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.15vw, 17px)', color: MUTED, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Issue Visa cards to every team member with custom spend controls.
            No additional cost, no extra accounts, no delays.
          </p>
        </div>

        <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} style={{
              padding: 28, borderRadius: 20,
              background: BASE,
              border: `1px solid ${BORDER}`,
              transition: 'border-color 0.3s, transform 0.3s',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(33,230,167,0.3)`
                ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = BORDER
                ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12, marginBottom: 20,
                background: 'rgba(33,230,167,0.08)',
                border: `1px solid ${BORDER}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={18} color={MINT} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: OFF_WHITE, marginBottom: 10, letterSpacing: '-0.01em' }}>{title}</h3>
              <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{body}</p>
            </div>
          ))}
        </div>

        {/* Image row with card visual */}
        <div style={{ marginTop: 60, borderRadius: 24, overflow: 'hidden', border: `1px solid ${BORDER_CU}`, position: 'relative' }}>
          <CopperLine />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 220 }}>
            <div style={{ padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: 12, color: COPPER_LT, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Physical cards available</p>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: OFF_WHITE, lineHeight: 1.2, marginBottom: 12 }}>
                Real cards.<br />Anywhere Visa® is accepted.
              </h3>
              <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
                Physical corporate Visa cards available for key team members.
                Contactless, chip-enabled, ATM-ready. Shipping charges may apply.
              </p>
            </div>
            <div style={{ background: `linear-gradient(135deg, ${CARD_BG2} 0%, #112E2C 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
              <img
                src="/hero_card_exclusive_cropped_symmetric.png"
                alt="Winity business card"
                style={{ maxWidth: '100%', height: 'auto', maxHeight: 160, objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TREASURY & DEPOSIT BONUSES ───────────────────────────────────────────────
function TreasurySection() {
  const ref = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const tiersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(copyRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
      gsap.fromTo(
        [...tiersRef.current!.children],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: tiersRef.current, start: 'top 80%', once: true }, delay: 0.2 }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const tiers = [
    {
      icon: Wallet,
      title: 'Standard Business',
      threshold: 'USD 0 minimum',
      badge: 'All accounts',
      color: MINT,
      bg: 'rgba(33,230,167,0.05)',
      border: BORDER,
      perks: [
        'Unlimited team Visa cards',
        'Digital asset payment rails',
        '150M+ Visa® merchant locations',
        'Real-time spend dashboard',
        'Dedicated business support line',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Growth Deposit Bonus',
      threshold: 'Qualifying large deposits',
      badge: 'Deposit bonus',
      color: COPPER_LT,
      bg: 'rgba(184,115,51,0.06)',
      border: BORDER_CU,
      perks: [
        'Bonus on qualifying deposits',
        'Priority settlement windows',
        'Enhanced conversion rates',
        'Dedicated account manager',
        'Quarterly treasury review',
      ],
      note: 'Contact business@winity.life for current bonus rates and deposit qualifying thresholds.',
    },
    {
      icon: Star,
      title: 'Elite Treasury',
      threshold: 'USD 100,000+ deposits',
      badge: 'Concierge tier',
      color: COPPER_LT,
      bg: 'rgba(184,115,51,0.08)',
      border: 'rgba(184,115,51,0.35)',
      featured: true,
      perks: [
        'Curated 1-on-1 concierge service',
        'Named relationship manager',
        'Maximum deposit bonus rates',
        'Priority OTC desk access',
        'White-glove onboarding',
        'Monthly strategy reviews',
        '24/7 direct line access',
      ],
    },
  ]

  return (
    <section ref={ref} style={{ background: BASE, padding: 'clamp(80px, 12vh, 128px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }}>

        <div ref={copyRef} style={{ textAlign: 'center', marginBottom: 64 }}>
          <Label>Treasury & Deposits</Label>
          <h2 style={{
            fontFamily: 'Roboto, sans-serif', fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 54px)', lineHeight: 1.08,
            letterSpacing: '-0.02em', color: OFF_WHITE, maxWidth: 720, margin: '0 auto 20px',
          }}>
            The larger you deposit,<br />
            <span style={{ color: MINT }}>the more you earn.</span>
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.15vw, 17px)', color: MUTED, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Winity Business rewards serious capital. Qualifying large deposits unlock
            bonus rates and exclusive treasury services, including a dedicated concierge
            for members depositing USD 100,000 or more.
          </p>
        </div>

        <div ref={tiersRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {tiers.map((tier) => {
            const Icon = tier.icon
            return (
              <div key={tier.title} style={{
                borderRadius: 24, overflow: 'hidden',
                background: tier.bg,
                border: `1px solid ${tier.border}`,
                position: 'relative',
                boxShadow: tier.featured ? `0 0 80px rgba(184,115,51,0.12)` : 'none',
              }}>
                {tier.featured && <CopperLine />}
                {!tier.featured && <div style={{ height: 1.5, background: `linear-gradient(90deg, transparent, ${tier.color}50, transparent)` }} />}

                {tier.featured && (
                  <div style={{
                    position: 'absolute', top: 20, right: 20,
                    fontSize: 10, fontWeight: 700, color: COPPER_LT,
                    background: 'rgba(184,115,51,0.15)',
                    border: `1px solid rgba(184,115,51,0.30)`,
                    borderRadius: 100, padding: '4px 10px', letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    Premium
                  </div>
                )}

                <div style={{ padding: 32 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, marginBottom: 20,
                    background: `${tier.color}15`,
                    border: `1px solid ${tier.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={20} color={tier.color} />
                  </div>

                  <span style={{
                    display: 'inline-block', fontSize: 10, fontWeight: 700,
                    color: tier.color, background: `${tier.color}12`,
                    border: `1px solid ${tier.color}25`,
                    borderRadius: 100, padding: '4px 10px', letterSpacing: '0.1em',
                    textTransform: 'uppercase', marginBottom: 12,
                  }}>
                    {tier.badge}
                  </span>

                  <h3 style={{ fontSize: 20, fontWeight: 800, color: OFF_WHITE, marginBottom: 6, letterSpacing: '-0.01em' }}>{tier.title}</h3>
                  <p style={{ fontSize: 13, color: MUTED_DIM, marginBottom: 24, letterSpacing: '0.02em' }}>{tier.threshold}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {tier.perks.map(p => (
                      <div key={p} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <CheckCircle2 size={14} color={tier.color} style={{ flexShrink: 0, marginTop: 2 }} />
                        <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>{p}</p>
                      </div>
                    ))}
                  </div>

                  {tier.note && (
                    <p style={{ fontSize: 11, color: MUTED_DIM, fontStyle: 'italic', marginTop: 8, lineHeight: 1.5, borderTop: `1px solid ${BORDER}`, paddingTop: 12 }}>
                      {tier.note}
                    </p>
                  )}

                  <a
                    href={tier.featured ? 'mailto:concierge@winity.life' : 'https://app.winity.life/business'}
                    target={tier.featured ? undefined : '_blank'}
                    rel={tier.featured ? undefined : 'noopener noreferrer'}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      marginTop: 20, fontSize: 13, fontWeight: 700,
                      color: tier.color,
                      textDecoration: 'none',
                      letterSpacing: '0.02em',
                      transition: 'gap 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.gap = '12px' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.gap = '8px' }}
                  >
                    {tier.featured ? 'Contact concierge' : 'Get started'}
                    <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── CONCIERGE SECTION ────────────────────────────────────────────────────────
function ConciergeSection() {
  const ref = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [...contentRef.current!.children],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 70%', once: true } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const services = [
    { icon: Headphones, title: 'Named Relationship Manager', body: 'One person. Direct line. They know your business, your goals, and your timeline.' },
    { icon: TrendingUp, title: 'OTC Desk Priority', body: 'Large conversions handled over-the-counter for optimised rates. No market slippage.' },
    { icon: BarChart3, title: 'Monthly Treasury Reviews', body: 'Strategic reviews of your digital asset holdings, settlement flows, and growth opportunities.' },
    { icon: Shield, title: 'Compliance Guidance', body: 'Dedicated compliance support for cross-border payments and regulatory reporting.' },
  ]

  return (
    <section ref={ref} style={{
      background: CARD_BG,
      padding: 'clamp(80px, 12vh, 128px) 0',
      position: 'relative', overflow: 'hidden',
    }}>
      <Grain />

      {/* Copper arch bg element */}
      <img
        src="/hero_bg_arch3.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 0, right: 0, width: '55%', height: '100%',
          objectFit: 'cover', objectPosition: 'left center',
          mixBlendMode: 'screen', filter: 'brightness(0.4) saturate(0.8)',
          opacity: 0.3, pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 3, maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }}>

        {/* Header */}
        <div ref={contentRef} style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: COPPER_LT, marginBottom: 20,
          }}>
            <span style={{ display: 'inline-block', width: 20, height: 1, background: COPPER_LT }} />
            Concierge Programme
            <span style={{ display: 'inline-block', width: 20, height: 1, background: COPPER_LT }} />
          </div>

          <h2 style={{
            fontFamily: 'Roboto, sans-serif', fontWeight: 900,
            fontSize: 'clamp(28px, 4.5vw, 58px)', lineHeight: 1.05,
            letterSpacing: '-0.025em', color: OFF_WHITE, margin: '0 auto 20px',
          }}>
            Your capital deserves<br />
            <span style={{ color: COPPER_LT }}>personal attention.</span>
          </h2>

          <p style={{ fontSize: 'clamp(14px, 1.2vw, 17px)', color: MUTED, lineHeight: 1.7, marginBottom: 48, maxWidth: 560, margin: '0 auto 48px' }}>
            Members depositing USD 100,000 or more are assigned a dedicated relationship
            manager. One point of contact. Unlimited access. Your business treated
            with the gravity it deserves.
          </p>

          {/* Threshold callout */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 16, marginBottom: 64,
            padding: '18px 32px', borderRadius: 100,
            background: 'rgba(184,115,51,0.08)',
            border: `1px solid ${BORDER_CU}`,
            boxShadow: `0 0 40px rgba(184,115,51,0.08)`,
          }}>
            <Star size={18} color={COPPER_LT} fill={COPPER_LT} />
            <span style={{ fontSize: 15, fontWeight: 700, color: COPPER_LT, letterSpacing: '-0.01em' }}>
              Unlocks at USD 100,000+ in deposits
            </span>
            <Star size={18} color={COPPER_LT} fill={COPPER_LT} />
          </div>

          {/* Services grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, textAlign: 'left', marginBottom: 48 }}>
            {services.map(({ icon: Icon, title, body }) => (
              <div key={title} style={{
                padding: 24, borderRadius: 20,
                background: 'rgba(184,115,51,0.05)',
                border: `1px solid ${BORDER_CU}`,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, marginBottom: 14,
                  background: 'rgba(184,115,51,0.10)',
                  border: `1px solid rgba(184,115,51,0.20)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={16} color={COPPER_LT} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: OFF_WHITE, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{body}</p>
              </div>
            ))}
          </div>

          <a
            href="mailto:concierge@winity.life"
            className="btn-pill"
            style={{ fontSize: 14, background: `linear-gradient(135deg, ${COPPER}, ${COPPER_LT})`, color: '#1A0A00', borderColor: 'transparent' }}
          >
            Enquire about concierge
            <span className="pill-icon" aria-hidden="true" style={{ background: 'rgba(0,0,0,0.15)' }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── GLOBAL SPEND & ATM ───────────────────────────────────────────────────────
function GlobalSection() {
  const ref = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(copyRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
      gsap.fromTo(
        [...statsRef.current!.children],
        { y: 40, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 82%', once: true }, delay: 0.25 }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const globalFeatures = [
    { icon: Globe, title: '150M+ merchants', sub: 'Worldwide Visa® acceptance' },
    { icon: Banknote, title: 'ATM worldwide', sub: 'Wherever Visa® is accepted' },
    { icon: Users, title: '200+ countries', sub: 'Business & personal use' },
    { icon: Zap, title: 'Real-time FX', sub: 'Competitive exchange rates' },
  ]

  return (
    <section ref={ref} style={{ background: BASE, padding: 'clamp(80px, 12vh, 128px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }}>
        <div ref={copyRef} style={{ textAlign: 'center', marginBottom: 60 }}>
          <Label>Global Acceptance</Label>
          <h2 style={{
            fontFamily: 'Roboto, sans-serif', fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 54px)', lineHeight: 1.08,
            letterSpacing: '-0.02em', color: OFF_WHITE, maxWidth: 680, margin: '0 auto 20px',
          }}>
            Spend anywhere.<br />
            <span style={{ color: MINT }}>Withdraw everywhere.</span>
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.15vw, 17px)', color: MUTED, maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Winity Business cards work across 150M+ Visa® merchant locations and
            at ATMs worldwide. One card. Every market.
          </p>
        </div>

        <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {globalFeatures.map(({ icon: Icon, title, sub }) => (
            <div key={title} style={{
              padding: 32, borderRadius: 20, textAlign: 'center',
              background: CARD_BG,
              border: `1px solid ${BORDER}`,
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14, margin: '0 auto 18px',
                background: 'rgba(33,230,167,0.08)',
                border: `1px solid ${BORDER}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={22} color={MINT} />
              </div>
              <p style={{ fontSize: 18, fontWeight: 800, color: OFF_WHITE, marginBottom: 6, letterSpacing: '-0.01em' }}>{title}</p>
              <p style={{ fontSize: 12, color: MUTED_DIM }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* ATM callout */}
        <div style={{
          marginTop: 40, borderRadius: 20, padding: 'clamp(24px, 4vw, 40px)',
          background: CARD_BG, border: `1px solid ${BORDER}`,
          display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ fontSize: 13, color: COPPER_LT, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>ATM Withdrawals</p>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: OFF_WHITE, marginBottom: 8 }}>Cash. Anywhere Visa® is accepted.</h3>
            <p style={{ fontSize: 14, color: MUTED, maxWidth: 480, lineHeight: 1.6 }}>
              Withdraw local currency at any Visa® ATM worldwide. Business and personal cards accepted.
              USD 3 per withdrawal. No foreign transaction fee on Exclusive; see Executive tier for waived ATM fees.
            </p>
          </div>
          <Link to="/exclusive" className="btn-ghost" style={{ fontSize: 13, whiteSpace: 'nowrap', flexShrink: 0 }}>
            Compare card tiers <ArrowRight size={13} style={{ display: 'inline', marginLeft: 4 }} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── API / INTEGRATION ────────────────────────────────────────────────────────
function APISection() {
  const ref = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(copyRef.current, { x: 40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
      gsap.fromTo(codeRef.current, { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const codeSnippet = `// Initiate business payment
const payment = await winity.payments.create({
  amount: 15000,
  currency: "USD",
  method: "digital_asset",
  asset: "USDT",
  recipient: "vendor@example.com",
  reference: "INV-2026-001",
  settle_to: "USD"
})

// Response
{
  id: "pay_wny_9f3ab2c1",
  status: "settled",
  amount_usd: 15000,
  settled_at: "2026-05-27T09:14:22Z"
}`

  return (
    <section ref={ref} style={{ background: CARD_BG, padding: 'clamp(80px, 12vh, 128px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr clamp(300px, 46%, 520px)', gap: 'clamp(48px, 8vw, 100px)', alignItems: 'center' }}>

          {/* Code block */}
          <div ref={codeRef}>
            <div style={{
              borderRadius: 20, overflow: 'hidden',
              background: '#040E10',
              border: `1px solid ${BORDER}`,
              boxShadow: `0 40px 80px rgba(0,0,0,0.5)`,
            }}>
              {/* Code header */}
              <div style={{ padding: '12px 20px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: 8 }}>
                {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
                  <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, opacity: 0.8 }} />
                ))}
                <span style={{ marginLeft: 8, fontSize: 12, color: MUTED_DIM, fontFamily: 'monospace' }}>winity-business-api.ts</span>
              </div>
              <pre style={{
                padding: '24px 24px', margin: 0, overflow: 'auto',
                fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                fontSize: 12, lineHeight: 1.7, color: `${MINT}cc`,
              }}>
                <code>{codeSnippet}</code>
              </pre>
            </div>
          </div>

          {/* Copy */}
          <div ref={copyRef}>
            <Label>API & Integrations</Label>
            <h2 style={{
              fontFamily: 'Roboto, sans-serif', fontWeight: 900,
              fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.1,
              letterSpacing: '-0.02em', color: OFF_WHITE, margin: '0 0 20px',
            }}>
              Built for<br />
              <span style={{ color: MINT }}>developers too.</span>
            </h2>
            <p style={{ fontSize: 'clamp(14px, 1.15vw, 17px)', color: MUTED, lineHeight: 1.7, maxWidth: 420, marginBottom: 28 }}>
              Integrate Winity Business payments directly into your platform.
              REST API with webhook support, real-time settlement notifications,
              and sandbox environment for development.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {[
                { icon: Code2, text: 'REST API with full documentation' },
                { icon: Zap, text: 'Webhooks for real-time payment events' },
                { icon: Shield, text: 'Sandbox environment included' },
                { icon: BarChart3, text: 'Reporting & reconciliation exports' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <Icon size={14} color={MINT} style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: 14, color: MUTED }}>{text}</p>
                </div>
              ))}
            </div>
            <a href="mailto:api@winity.life" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 14, fontWeight: 700, color: MINT,
              textDecoration: 'none', letterSpacing: '0.02em',
            }}>
              Request API access <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PRICING ──────────────────────────────────────────────────────────────────
function PricingSection() {
  const ref = useRef<HTMLElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const plansRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<'monthly' | 'annual'>('monthly')

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%', once: true },
      })
      gsap.fromTo(
        [...plansRef.current!.children],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: plansRef.current, start: 'top 80%', once: true }, delay: 0.2 }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const plans = [
    {
      name: 'Business Starter',
      price: { monthly: '$0', annual: '$0' },
      sub: 'Per month',
      badge: 'Free',
      badgeColor: MINT,
      featured: false,
      cta: 'Get started',
      ctaHref: 'https://app.winity.life/business',
      features: [
        'Up to 5 team Visa cards',
        'Digital asset payment acceptance',
        '150M+ Visa® merchant locations',
        'ATM withdrawals (USD 3 fee)',
        'Real-time spend dashboard',
        'Business support via app',
        'Virtual cards upon KYC approval',
      ],
    },
    {
      name: 'Business Growth',
      price: { monthly: 'Custom', annual: 'Custom' },
      sub: 'Contact for pricing',
      badge: 'Most popular',
      badgeColor: MINT,
      featured: true,
      cta: 'Talk to sales',
      ctaHref: 'mailto:business@winity.life',
      features: [
        'Unlimited team Visa cards',
        'Priority digital asset payments',
        'Dedicated account manager',
        'Deposit bonus programme',
        'Enhanced conversion rates',
        'OTC desk access',
        'Quarterly treasury reviews',
        'Custom spend controls & limits',
        'Physical cards (shipping may apply)',
      ],
    },
    {
      name: 'Elite Concierge',
      price: { monthly: 'USD 100k+', annual: 'USD 100k+' },
      sub: 'Minimum deposit',
      badge: 'Concierge',
      badgeColor: COPPER_LT,
      featured: false,
      cta: 'Enquire now',
      ctaHref: 'mailto:concierge@winity.life',
      features: [
        'Everything in Growth',
        'Named relationship manager',
        'Maximum bonus deposit rates',
        'White-glove onboarding',
        'Monthly strategy reviews',
        'Priority OTC desk',
        '24/7 direct concierge line',
        'Compliance guidance',
      ],
    },
  ]

  return (
    <section ref={ref} style={{ background: BASE, padding: 'clamp(80px, 12vh, 128px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(20px, 5vw, 64px)' }}>
        <div ref={headRef} style={{ textAlign: 'center', marginBottom: 56 }}>
          <Label copper>Pricing</Label>
          <h2 style={{
            fontFamily: 'Roboto, sans-serif', fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 54px)', lineHeight: 1.08,
            letterSpacing: '-0.02em', color: OFF_WHITE, maxWidth: 600, margin: '0 auto 20px',
          }}>
            Scale as<br />
            <span style={{ color: MINT }}>your business grows.</span>
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.15vw, 17px)', color: MUTED, maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>
            Start free. Add team cards. Unlock premium treasury services when you're ready.
          </p>
        </div>

        <div ref={plansRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {plans.map(plan => (
            <div key={plan.name} style={{
              borderRadius: 24, overflow: 'hidden',
              background: plan.featured ? `linear-gradient(160deg, #0D3330 0%, #0F3F3A 100%)` : CARD_BG,
              border: plan.featured ? `1px solid rgba(33,230,167,0.30)` : `1px solid ${BORDER}`,
              boxShadow: plan.featured ? `0 0 80px rgba(33,230,167,0.10)` : 'none',
              position: 'relative',
            }}>
              {plan.featured
                ? <div style={{ height: 1.5, background: `linear-gradient(90deg, transparent, ${MINT}, ${MINT_HI}, ${MINT}, transparent)` }} />
                : <CopperLine />
              }

              <div style={{ padding: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: OFF_WHITE }}>{plan.name}</h3>
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    color: plan.badgeColor,
                    background: `${plan.badgeColor}15`,
                    border: `1px solid ${plan.badgeColor}30`,
                    borderRadius: 100, padding: '4px 10px', letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>{plan.badge}</span>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <p style={{
                    fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 900,
                    color: plan.featured ? MINT : OFF_WHITE,
                    letterSpacing: '-0.03em', lineHeight: 1,
                  }}>{plan.price[activeTab]}</p>
                  <p style={{ fontSize: 12, color: MUTED_DIM, marginTop: 4 }}>{plan.sub}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <CheckCircle2 size={14} color={plan.featured ? MINT : MUTED_DIM} style={{ flexShrink: 0, marginTop: 2 }} />
                      <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.4 }}>{f}</p>
                    </div>
                  ))}
                </div>

                <a
                  href={plan.ctaHref}
                  target={plan.ctaHref.startsWith('http') ? '_blank' : undefined}
                  rel={plan.ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={plan.featured ? 'btn-pill' : 'btn-ghost'}
                  style={{ width: '100%', justifyContent: 'center', fontSize: 14 }}
                >
                  {plan.cta}
                  {plan.featured && (
                    <span className="pill-icon" aria-hidden="true">
                      <svg width="13" height="13" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
                      </svg>
                    </span>
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p style={{ textAlign: 'center', fontSize: 11, color: MUTED_DIM, marginTop: 32, maxWidth: 680, margin: '32px auto 0', lineHeight: 1.6 }}>
          All cards are issued upon completion of KYC verification. Physical cards are available upon request; shipping charges may apply. Deposit bonus rates and thresholds are subject to current promotional terms.
          Contact business@winity.life for full terms.
        </p>
      </div>
    </section>
  )
}

// ─── BUSINESS CTA ─────────────────────────────────────────────────────────────
function BusinessCTA() {
  const ref = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [...contentRef.current!.children],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 65%', once: true } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{
      background: HERO_BG, minHeight: 500, display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <Grain />

      <img
        src="/hero_bg_arch3.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center bottom',
          mixBlendMode: 'screen', filter: 'brightness(0.65) saturate(1.2)',
          opacity: 0.5, pointerEvents: 'none',
        }}
      />
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 80% 60% at 50% 70%, rgba(13,56,50,0.55) 0%, rgba(7,30,32,0.85) 65%, ${HERO_BG} 100%)`,
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 120,
        background: `linear-gradient(to bottom, ${CARD_BG}, transparent)`, zIndex: 5,
      }} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 1280, margin: '0 auto', padding: 'clamp(64px, 10vh, 120px) clamp(20px, 5vw, 64px)', textAlign: 'center' }}>
        <div ref={contentRef}>
          <Label copper>Start Today</Label>
          <h2 style={{
            fontFamily: 'Roboto, sans-serif', fontWeight: 900,
            fontSize: 'clamp(32px, 5.5vw, 68px)', lineHeight: 1.05,
            letterSpacing: '-0.025em', color: OFF_WHITE, maxWidth: 820, margin: '0 auto 24px',
          }}>
            Your business moves fast.<br />
            <span style={{ color: MINT }}>Your payments should too.</span>
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 1.3vw, 18px)', color: MUTED,
            lineHeight: 1.7, maxWidth: 520, margin: '0 auto 40px',
          }}>
            Apply in minutes. Issue team cards immediately upon KYC approval.
            Speak to our business team and have your treasury live this week.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <a href="https://app.winity.life/business" target="_blank" rel="noopener noreferrer" className="btn-pill" style={{ fontSize: 14 }}>
              Apply for Business
              <span className="pill-icon" aria-hidden="true">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 7h9m-4-4.5L11 7l-3.5 3.5" />
                </svg>
              </span>
            </a>
            <a href="mailto:business@winity.life" className="btn-ghost" style={{ fontSize: 14 }}>
              Talk to sales <ArrowRight size={14} style={{ display: 'inline', marginLeft: 4 }} />
            </a>
          </div>

          {/* Trust signals */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 40, flexWrap: 'wrap' }}>
            {['Visa® Secured', 'KYC Compliant', '200+ Countries', 'Free to start'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: `${MUTED}80` }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: `${MINT}60` }} />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CSS KEYFRAMES ────────────────────────────────────────────────────────────
const bizStyles = `
  @keyframes bizCardFloat {
    0%, 100% { transform: perspective(1200px) translateY(0px); }
    50%       { transform: perspective(1200px) translateY(-12px); }
  }
`

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function BusinessPage() {
  useEffect(() => {
    // Inject keyframes
    const styleTag = document.createElement('style')
    styleTag.innerHTML = bizStyles
    document.head.appendChild(styleTag)
    return () => { styleTag.remove() }
  }, [])

  return (
    <div style={{ fontFamily: 'Roboto, sans-serif', background: HERO_BG }}>
      <BusinessHero />
      <MetricsBar />
      <PaymentsSection />
      <TeamCardsSection />
      <TreasurySection />
      <ConciergeSection />
      <GlobalSection />
      <APISection />
      <PricingSection />
      <BusinessCTA />
    </div>
  )
}
