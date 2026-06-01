/**
 * Shared shell for legal / support pages.
 * Winity Life — Emerald Noir
 */
import { ReactNode } from 'react'

const MINT     = '#21E6A7'
const OFF_WHITE = '#F0EDE6'
const MUTED    = 'rgba(240,237,230,0.55)'
const BASE     = '#061C1E'
const CARD_BG  = '#0B2E2C'
const BORDER   = 'rgba(33,230,167,0.10)'

export function LegalShell({
  title,
  subtitle,
  updated,
  children,
}: {
  title: string
  subtitle: string
  updated: string
  children: ReactNode
}) {
  return (
    <div style={{ background: BASE, minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>

      {/* Header band */}
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
            {title}
          </h1>
          <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.6 }}>{subtitle}</p>
          <p style={{ fontSize: 12, color: 'rgba(240,237,230,0.30)', marginTop: 12 }}>Last updated: {updated}</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 840, margin: '0 auto', padding: 'clamp(40px, 7vh, 80px) clamp(20px, 6vw, 96px)' }}>
        {children}
      </div>

    </div>
  )
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 style={{ fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 800, color: '#F0EDE6', letterSpacing: '-0.01em', marginTop: 48, marginBottom: 12 }}>
      {children}
    </h2>
  )
}

export function Para({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontSize: 14, color: 'rgba(240,237,230,0.60)', lineHeight: 1.75, marginBottom: 16 }}>
      {children}
    </p>
  )
}

export function UL({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: 14, color: 'rgba(240,237,230,0.60)', lineHeight: 1.75, marginBottom: 6 }}>
          {item}
        </li>
      ))}
    </ul>
  )
}

export function Divider() {
  return <div style={{ height: 1, background: 'rgba(33,230,167,0.08)', margin: '32px 0' }} />
}
