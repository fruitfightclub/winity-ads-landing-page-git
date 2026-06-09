/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  TSS STUDIO — BRAND SITE DESIGN & INFRASTRUCTURE
 *  "Created by an Artist. Powered by AI."
 *  Timothy Stewart Shaw (Tim) — Master Creative Director
 *  Antigravity IDE Agentic Development Suite (May 2026)
 *  [Internal Signature - Non-Public Facing Handover Source]
 * ─────────────────────────────────────────────────────────────────────────────
 * client: Winity Life
 * philosophy: Emerald Noir
 * deliverable: Site Footer — winity.life-style, all legal pages internal
 * date: 2026-05-27
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { Link } from 'react-router-dom'

// ─── Internal link columns ────────────────────────────────────────────────────
// ─── Internal link columns ────────────────────────────────────────────────────
const footerLinks = {
  'Company': [
    { label: 'Contact Us',    to: '/support' },
    { label: 'Press Room',    to: '/press' },
    { label: 'Blogs',         to: '/blog' },
  ],
  'Winity Cards': [
    { label: 'Exclusive',     to: '/exclusive' },
    { label: 'Executive',     to: '/executive' },
  ],
  'Member Services': [
    { label: 'WhatsApp',      href: 'https://wa.me/917742253607' },
    { label: 'Support Portal', to: '/support' },
    { label: 'FAQs',           to: '/faqs' },
  ],
}

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/winitylife',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: 'https://t.me/winitylife',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/winitylife',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/winity.life',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/winitylife',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@winitylife',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 002.11 2.11c1.858.508 9.388.508 9.388.508s7.53 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@winity.life',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z" />
      </svg>
    ),
  },
]

// ─── Helper: link item ────────────────────────────────────────────────────────
function FooterLink({ label, to, href }: { label: string; to?: string; href?: string }) {
  const baseStyle: React.CSSProperties = {
    fontSize: 13, color: 'rgba(240,237,230,0.68)',
    textDecoration: 'none',
    transition: 'color 0.18s',
    display: 'block',
  }
  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = '#F0EDE6' }
  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = 'rgba(240,237,230,0.68)' }

  if (to) return <Link to={to} style={baseStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>{label}</Link>
  return <a href={href} target="_blank" rel="noopener noreferrer" style={baseStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>{label}</a>
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer
      style={{ background: '#040E0E', fontFamily: 'Roboto, sans-serif' }}
      role="contentinfo"
    >
      {/* Top copper accent */}
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, #B87333, #E8A84E, #B87333, transparent)',
        opacity: 0.70,
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(48px, 8vh, 80px) clamp(20px, 5vw, 64px)' }}>

        {/* ── Row 1: Brand left, Social right ── */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 32,
          alignItems: 'flex-start', justifyContent: 'space-between',
          marginBottom: 52,
        }}>
          <div style={{ maxWidth: 260 }}>
            <Link to="/" style={{ display: 'inline-flex', marginBottom: 16 }}>
              <img
                src="/WINITY Text Logo Green and copper .png"
                alt="Winity Life"
                style={{ height: 34, width: 'auto' }}
              />
            </Link>
            <p style={{ fontSize: 13, color: 'rgba(240,237,230,0.65)', lineHeight: 1.65 }}>
              Many Ways to Move. One Way to Pay.
            </p>
            <p style={{ fontSize: 11, color: 'rgba(240,237,230,0.50)', marginTop: 8, lineHeight: 1.5 }}>
              Digital asset-linked Visa cards for the global economy. Available in 180+ countries.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: 34, height: 34, borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(240,237,230,0.09)',
                  color: 'rgba(240,237,230,0.65)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = '#21E6A7'
                  el.style.borderColor = 'rgba(33,230,167,0.28)'
                  el.style.background = 'rgba(33,230,167,0.06)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = 'rgba(240,237,230,0.65)'
                  el.style.borderColor = 'rgba(240,237,230,0.09)'
                  el.style.background = 'transparent'
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Row 2: Link columns ── */}
        <div
          className="footer-link-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 'clamp(24px, 4vw, 52px)',
            marginBottom: 52,
          }}
        >
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 style={{
                fontSize: 10, fontWeight: 800, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'rgba(240,237,230,0.55)',
                marginBottom: 16,
              }}>
                {section}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <FooterLink
                      label={link.label}
                      to={'to' in link ? link.to : undefined}
                      href={'href' in link ? link.href : undefined}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* App download column */}
          <div>
            <h3 style={{
              fontSize: 10, fontWeight: 800, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'rgba(240,237,230,0.55)',
              marginBottom: 16,
            }}>
              Download
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a
                href="https://apps.apple.com/us/app/winity-life/id6752761057"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', borderRadius: 10,
                  border: '1px solid rgba(240,237,230,0.09)',
                  color: '#F0EDE6', textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor='rgba(33,230,167,0.25)'; el.style.background='rgba(33,230,167,0.05)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor='rgba(240,237,230,0.09)'; el.style.background='transparent' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <div style={{ fontSize: 9, color: 'rgba(240,237,230,0.40)', lineHeight: 1 }}>Download on</div>
                  <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>App Store</div>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.winity.life"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', borderRadius: 10,
                  border: '1px solid rgba(240,237,230,0.09)',
                  color: '#F0EDE6', textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor='rgba(33,230,167,0.25)'; el.style.background='rgba(33,230,167,0.05)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor='rgba(240,237,230,0.09)'; el.style.background='transparent' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div>
                  <div style={{ fontSize: 9, color: 'rgba(240,237,230,0.40)', lineHeight: 1 }}>Get it on</div>
                  <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: 'rgba(240,237,230,0.06)', marginBottom: 24 }} />

        {/* ── Disclaimers — EXACTLY like Winity.life ── */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 13, color: 'rgba(240,237,230,0.65)', lineHeight: 1.7, margin: 0 }}>
            Card services are issued in Hong Kong and available globally wherever Visa® is accepted. Availability may vary by jurisdiction.
          </p>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: 'rgba(240,237,230,0.06)', marginBottom: 24 }} />

        {/* ── Bottom Bar: Copyright and internal legal links ── */}
        <div
          className="footer-bottom-bar"
          style={{
            display: 'flex', flexWrap: 'wrap', gap: 20,
            justifyContent: 'space-between', alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'rgba(240,237,230,0.65)' }}>
              © 2026 WTY Technology Hong Kong Limited.
            </span>
            <Link to="/risk" style={{ fontSize: 13, color: 'rgba(240,237,230,0.65)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#21E6A7'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,237,230,0.65)'}>Risk Disclosure</Link>
            <Link to="/terms" style={{ fontSize: 13, color: 'rgba(240,237,230,0.65)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#21E6A7'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,237,230,0.65)'}>Terms of Use</Link>
            <Link to="/privacy" style={{ fontSize: 13, color: 'rgba(240,237,230,0.65)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#21E6A7'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,237,230,0.65)'}>Privacy Policy</Link>
            <Link to="/google-pay-tc" style={{ fontSize: 13, color: 'rgba(240,237,230,0.65)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#21E6A7'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,237,230,0.65)'}>Google Pay T&C</Link>
          </div>

          {/* Site creation signature moved internally to code comments - no public facing footer credit */}
        </div>

      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 640px) {
          footer .footer-link-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          footer .footer-bottom-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </footer>
  )
}
