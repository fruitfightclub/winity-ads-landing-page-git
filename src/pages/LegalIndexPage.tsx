import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const BASE     = '#061C1E'
const CARD_BG  = '#0B2E2C'
const MINT     = '#21E6A7'
const OFF_WHITE = '#F0EDE6'
const MUTED    = 'rgba(240,237,230,0.55)'
const BORDER   = 'rgba(33,230,167,0.10)'

const DOCS = [
  {
    title: 'Terms of Use',
    description: 'Rules and guidelines governing the WINITY card program: user responsibilities, permitted activities, transaction limits, and legal obligations.',
    to: '/terms',
    tag: 'Core',
  },
  {
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your personal information, including data storage, sharing practices, cookies, and your rights as a user.',
    to: '/privacy',
    tag: 'Core',
  },
  {
    title: 'Risk Disclosure',
    description: 'Material risks associated with digital assets and card services: market volatility, regulatory uncertainty, operational security, and liquidity risks.',
    to: '/risk',
    tag: 'Core',
  },
  {
    title: 'Google Pay Terms & Conditions',
    description: 'Specific terms governing WINITY card integration with Google Pay: wallet usage, security responsibilities, and digital wallet limitations.',
    to: '/google-pay-tc',
    tag: 'Integrations',
  },
]

export default function LegalIndexPage() {
  return (
    <>
      <SEO
        title="Legal | Winity Life"
        description="Terms of Use, Privacy Policy, Risk Disclosure, and Google Pay Terms and Conditions for Winity Life."
      />

      <div style={{ background: BASE, minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>

        {/* Header */}
        <div style={{
          background: CARD_BG,
          borderBottom: `1px solid ${BORDER}`,
          padding: 'clamp(80px, 12vh, 120px) clamp(20px, 6vw, 96px) clamp(40px, 6vh, 60px)',
        }}>
          <div style={{ maxWidth: 840, margin: '0 auto' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: MINT, marginBottom: 14 }}>
              Winity Life
            </p>
            <h1 style={{ fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 900, color: OFF_WHITE, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 12 }}>
              Legal
            </h1>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.6, maxWidth: 580 }}>
              Essential documentation governing your use of the Winity Life platform, including Terms of Use, Privacy Policy, Risk Disclosure, and Google Pay integration terms.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div style={{ maxWidth: 840, margin: '0 auto', padding: 'clamp(40px, 7vh, 80px) clamp(20px, 6vw, 96px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
            {DOCS.map(doc => (
              <Link
                key={doc.to}
                to={doc.to}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  background: CARD_BG,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  padding: '28px 28px 24px',
                  transition: 'border-color 0.2s, transform 0.2s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = 'rgba(33,230,167,0.35)'
                    el.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = BORDER
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                      textTransform: 'uppercase', color: MINT,
                      background: 'rgba(33,230,167,0.10)', border: '1px solid rgba(33,230,167,0.18)',
                      borderRadius: 20, padding: '3px 10px',
                    }}>
                      {doc.tag}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.4 }}>
                      <path d="M3 8h10M9 4l4 4-4 4" stroke={MINT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 style={{ fontSize: 17, fontWeight: 800, color: OFF_WHITE, marginBottom: 10, lineHeight: 1.25 }}>
                    {doc.title}
                  </h2>
                  <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.65, margin: 0 }}>
                    {doc.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer note */}
          <div style={{ marginTop: 56, paddingTop: 32, borderTop: `1px solid ${BORDER}` }}>
            <p style={{ fontSize: 13, color: 'rgba(240,237,230,0.35)', lineHeight: 1.7, maxWidth: 600 }}>
              Card services are issued in Hong Kong and available globally wherever Visa® is accepted. Availability may vary by jurisdiction.
              For legal or compliance enquiries contact{' '}
              <a href="mailto:legal@winity.life" style={{ color: MINT, textDecoration: 'none' }}>legal@winity.life</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
