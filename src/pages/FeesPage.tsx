import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const MINT      = '#21E6A7'
const COPPER    = '#E8A84E'
const OFF_WHITE = '#F0EDE6'
const MUTED     = 'rgba(240,237,230,0.55)'
const BASE      = '#061C1E'
const CARD_BG   = '#0B2E2C'
const BORDER    = 'rgba(33,230,167,0.10)'

const FEE_SECTIONS = [
  {
    title: 'Card Fees',
    rows: [
      { label: 'Virtual Card Annual Fee',           value: 'See app', note: 'Check current rates in the Winity app' },
      { label: 'Physical Card Annual Fee',           value: 'USD 20 / year', note: 'First 6 months free on new activations' },
      { label: 'Physical Card Issuance',             value: 'USD 0',   note: 'Shipping charges may apply' },
      { label: 'Card Spend Fee',                     value: 'See app', note: 'Check current rates in the Winity app' },
      { label: 'ATM Withdrawal Fee',                 value: 'USD 3',   note: 'Per withdrawal at any Visa® ATM worldwide' },
      { label: 'Contactless / NFC Payments',         value: 'USD 0',   note: 'Google Pay supported' },
    ],
  },
  {
    title: 'Deposit & Conversion Fees',
    rows: [
      { label: 'USDC Deposit',                       value: '0%',      note: 'Stablecoin, no conversion fee' },
      { label: 'USDT Deposit',                       value: '0%',      note: 'Stablecoin, no conversion fee' },
      { label: 'Other Digital Asset Deposit',        value: '5%',      note: 'Conversion fee applied at time of deposit' },
      { label: 'Fiat Withdrawal (where supported)',  value: 'Varies',  note: 'See app for live rates' },
    ],
  },
  {
    title: 'Rewards & Benefits',
    rows: [
      { label: 'Winity Points Earn Rate',            value: '1 pt / USD 10', note: 'On eligible card spend' },
      { label: 'Umi Data Benefit',                    value: '1 GB free', note: 'After USD 5,000 in eligible spend' },
      { label: 'Umi First Purchase Discount',        value: '20% off first purchase', note: 'One-time discount code, one use per member' },
      { label: 'Winity Loop Referral Points',        value: 'Winity Points', note: 'Awarded when referred users activate card' },
    ],
  },
  {
    title: 'Premium Services',
    rows: [
      { label: 'Concierge Access',                   value: 'USD 100,000+ deposit', note: 'Dedicated relationship manager + curated service' },
      { label: 'Priority Support Routing',           value: 'High-tier members',    note: 'Faster support resolution' },
      { label: '24/7 WhatsApp Support',              value: 'All members',          note: 'Available to every Winity cardholder' },
    ],
  },
]

export default function FeesPage() {
  return (
    <>
      <SEO
        title="Fees & Limits | Winity Life"
        description="Complete fee schedule for Winity Life digital-asset-linked Visa cards."
      />
      <div style={{ background: BASE, minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>

        {/* Header */}
        <div style={{
          background: CARD_BG, borderBottom: `1px solid ${BORDER}`,
          padding: 'clamp(80px, 12vh, 120px) clamp(20px, 6vw, 96px) clamp(40px, 6vh, 60px)',
        }}>
          <div style={{ maxWidth: 840, margin: '0 auto' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: MINT, marginBottom: 14 }}>
              Transparency
            </p>
            <h1 style={{ fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 900, color: OFF_WHITE, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 12 }}>
              Fees & Limits
            </h1>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.6 }}>
              No surprises. Here's exactly what you pay to use Winity.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 840, margin: '0 auto', padding: 'clamp(40px, 7vh, 80px) clamp(20px, 6vw, 96px)' }}>

          {/* Highlight strip */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 56,
          }}>
            {[
              { v: 'See app', l: 'Virtual card annual fee' },
              { v: '0%', l: 'Stablecoin deposit fee' },
              { v: 'USD 3', l: 'ATM withdrawal' },
              { v: 'USD 20/yr', l: 'Physical card annual fee' },
            ].map(h => (
              <div key={h.l} style={{
                flex: '1 1 160px', padding: '18px 20px', borderRadius: 16,
                background: CARD_BG, border: `1px solid ${BORDER}`,
                textAlign: 'center',
              }}>
                <p style={{ fontSize: 24, fontWeight: 900, color: MINT, marginBottom: 4 }}>{h.v}</p>
                <p style={{ fontSize: 12, color: MUTED }}>{h.l}</p>
              </div>
            ))}
          </div>

          {FEE_SECTIONS.map(section => (
            <div key={section.title} style={{ marginBottom: 48 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: MINT, marginBottom: 16 }}>
                {section.title}
              </p>
              <div style={{
                borderRadius: 16, overflow: 'hidden',
                border: `1px solid ${BORDER}`,
              }}>
                {section.rows.map((row, i) => (
                  <div key={row.label} style={{
                    display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center',
                    padding: '16px 20px',
                    background: i % 2 === 0 ? CARD_BG : 'rgba(11,46,44,0.50)',
                    borderBottom: i < section.rows.length - 1 ? `1px solid rgba(33,230,167,0.06)` : 'none',
                  }}>
                    <span style={{ flex: '1 1 240px', fontSize: 13, color: MUTED }}>{row.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: OFF_WHITE, minWidth: 100, textAlign: 'right' }}>{row.value}</span>
                    {row.note && <span style={{ width: '100%', fontSize: 11, color: 'rgba(240,237,230,0.30)', marginTop: -4 }}>{row.note}</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Disclaimer */}
          <div style={{
            padding: '20px 22px', borderRadius: 14,
            background: 'rgba(33,230,167,0.03)', border: `1px solid ${BORDER}`,
            marginBottom: 32,
          }}>
            <p style={{ fontSize: 12, color: 'rgba(240,237,230,0.38)', lineHeight: 1.7 }}>
              All fees are in USD and correct as of 27 May 2026. Winity reserves the right to amend fees with 30 days' notice to members.
              Deposit bonus rates, points programme terms, and Umi partnership benefits are subject to their own programme terms.
              Physical card shipping charges vary by destination country. See the Winity Life app for live rates and the most current fee schedule.
            </p>
          </div>

          <Link to="/" style={{ fontSize: 13, color: MINT, textDecoration: 'none' }}>← Back to Winity Life</Link>
        </div>
      </div>
    </>
  )
}
