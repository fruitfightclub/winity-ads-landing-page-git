/**
 * ---
 * client: Winity Life
 * philosophy: Emerald Noir
 * deliverable: Support — Contact Page
 * phase: 6
 * date: 2026-05-28
 * status: Draft
 * ---
 */
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

// ─── Palette ──────────────────────────────────────────────────────────────────
const MINT      = '#21E6A7'
const OFF_WHITE = '#F0EDE6'
const MUTED     = 'rgba(240,237,230,0.55)'
const BASE      = '#061C1E'
const CARD_BG   = 'rgba(11,46,44,0.72)'

// ─── Grain ───────────────────────────────────────────────────────────────────
const GrainOverlay = ({ id = 'g', opacity = 0.03 }: { id?: string; opacity?: number }) => (
  <svg
    aria-hidden="true"
    style={{ pointerEvents: 'none', position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 5, mixBlendMode: 'overlay' as const, opacity }}
  >
    <filter id={id}>
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter={`url(#${id})`} />
  </svg>
)

// ─── Telegram SVG icon ────────────────────────────────────────────────────────
const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

// ─── Component ────────────────────────────────────────────────────────────────
export default function SupportPage() {
  return (
    <>
      <SEO
        title="Support | Winity Life"
        description="Contact Winity Life support. Reach us via email, Telegram, WhatsApp, or business enquiries."
      />
      <div style={{ background: BASE, minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>

        {/* ── HERO ────────────────────────────────────────────────────────────── */}
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: 'clamp(320px, 45vh, 480px)' }}>
          <img
            src="/winity_lifestyle_lounge.webp"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 30%',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(6,28,30,0.82) 0%, rgba(6,28,30,0.65) 50%, rgba(6,28,30,0.95) 100%)',
          }} />
          <GrainOverlay id="g-hero" opacity={0.04} />

          <div style={{
            position: 'relative', zIndex: 10,
            maxWidth: 840, margin: '0 auto',
            padding: 'clamp(100px, 14vh, 160px) clamp(20px, 6vw, 64px) clamp(50px, 7vh, 80px)',
          }}>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: MINT, marginBottom: 16,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ display: 'inline-block', width: 20, height: 1, background: MINT }} />
              Support
            </p>
            <h1 style={{
              fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: 900,
              color: OFF_WHITE, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 14,
            }}>
              We're here when<br />
              <span style={{ color: MINT }}>you need us.</span>
            </h1>
            <p style={{ fontSize: 'clamp(14px, 1.3vw, 16px)', color: MUTED, lineHeight: 1.65, maxWidth: 460 }}>
              24/7 member support across every channel. Reach our team directly below.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 840, margin: '0 auto', padding: 'clamp(40px, 7vh, 72px) clamp(20px, 6vw, 64px)' }}>

          {/* ── Contact channels ──────────────────────────────────────────────── */}
          <div style={{ marginBottom: 64 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(33,230,167,0.6)', marginBottom: 20 }}>
              Reach Us
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[
                {
                  label: 'Email Support',
                  sub: 'support@winity.life',
                  detail: 'Response within 24h',
                  href: 'mailto:support@winity.life',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="22" height="22">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  color: MINT,
                },
                {
                  label: 'Telegram',
                  sub: 't.me/winitylife',
                  detail: 'Community & quick help',
                  href: 'https://t.me/winitylife',
                  icon: <TelegramIcon />,
                  color: '#29B6F6',
                },
                {
                  label: 'WhatsApp',
                  sub: 'In-app support',
                  detail: '24/7 member support',
                  href: 'https://wa.me/917742253607',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  ),
                  color: '#25D366',
                },
                {
                  label: 'Business',
                  sub: 'business@winity.life',
                  detail: 'Enterprise & partnerships',
                  href: 'mailto:business@winity.life',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" width="22" height="22">
                      <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  color: '#E8A84E',
                },
              ].map(c => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'block', padding: '20px 20px',
                    borderRadius: 16, background: CARD_BG,
                    border: '1px solid rgba(33,230,167,0.15)',
                    backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                    textDecoration: 'none', transition: 'border-color 0.22s, background 0.22s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = `${c.color}40`
                    el.style.background = 'rgba(15,63,58,0.65)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = 'rgba(33,230,167,0.15)'
                    el.style.background = CARD_BG
                  }}
                >
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, marginBottom: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${c.color}14`, border: `1px solid ${c.color}30`, color: c.color,
                  }}>
                    {c.icon}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: OFF_WHITE, marginBottom: 3 }}>{c.label}</div>
                  <div style={{ fontSize: 12, color: c.color, marginBottom: 3 }}>{c.sub}</div>
                  <div style={{ fontSize: 11, color: MUTED }}>{c.detail}</div>
                </a>
              ))}
            </div>
          </div>

          {/* ── Back link ────────────────────────────────────────────────────── */}
          <div>
            <Link to="/" style={{ fontSize: 13, color: MINT, textDecoration: 'none', opacity: 0.7 }}>
              ← Back to Winity Life
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
