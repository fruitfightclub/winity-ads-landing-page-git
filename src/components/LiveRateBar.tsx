/**
 * LiveRateBar — Winity Life | Emerald Noir
 * ──────────────────────────────────────────────────────────────────────
 * Thin ticker bar showing:
 *  - Live prices for supported deposit assets (CoinGecko free API)
 *  - Visitor's local currency equivalent via GeoJS + currency-api
 *  - "Spend globally" messaging reinforcement
 *
 * APIs used (all free, no key required):
 *  - CoinGecko: https://api.coingecko.com/api/v3/simple/price
 *  - GeoJS:     https://get.geojs.io/v1/ip/country.json
 *  - currency-api (fawazahmed0): CDN-hosted, zero rate limits
 * ──────────────────────────────────────────────────────────────────────
 */
import { useEffect, useRef, useState } from 'react'

interface AssetPrice {
  symbol: string
  label: string
  usd: number | null
  change24h: number | null
}

interface LocalRate {
  currency: string
  rate: number | null
  symbol: string
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  gbp: '£', eur: '€', jpy: '¥', aud: 'A$', cad: 'C$',
  sgd: 'S$', hkd: 'HK$', cny: '¥', inr: '₹', brl: 'R$',
  mxn: 'MX$', krw: '₩', chf: 'CHF', nzd: 'NZ$', thb: '฿',
  usd: '$',
}

const COUNTRY_CURRENCY: Record<string, string> = {
  GB: 'gbp', DE: 'eur', FR: 'eur', ES: 'eur', IT: 'eur', NL: 'eur',
  AU: 'aud', CA: 'cad', SG: 'sgd', HK: 'hkd', CN: 'cny', IN: 'inr',
  JP: 'jpy', BR: 'brl', MX: 'mxn', KR: 'krw', CH: 'chf', NZ: 'nzd',
  TH: 'thb', US: 'usd',
}

const COINGECKO_IDS: Record<string, string> = {
  USDT: 'tether',
  USDC: 'usd-coin',
  ETH:  'ethereum',
  SOL:  'solana',
  TRX:  'tron',
  POL:  'matic-network',
}

const ASSETS_TO_SHOW = ['USDT', 'USDC', 'ETH', 'SOL', 'TRX']

function formatPrice(usd: number): string {
  if (usd >= 1000) return `$${usd.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  if (usd >= 1)    return `$${usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  return `$${usd.toFixed(4)}`
}

export default function LiveRateBar() {
  const [prices, setPrices] = useState<AssetPrice[]>(
    ASSETS_TO_SHOW.map(s => ({ symbol: s, label: s, usd: null, change24h: null }))
  )
  const [localRate, setLocalRate] = useState<LocalRate>({ currency: 'usd', rate: 1, symbol: '$' })
  const [isLoaded, setIsLoaded] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      try {
        // 1. Detect visitor country → local currency
        let currency = 'usd'
        try {
          const geoRes = await fetch('https://get.geojs.io/v1/ip/country.json', { signal: AbortSignal.timeout(3000) })
          const geoData = await geoRes.json()
          const countryCode = (geoData.country as string)?.toUpperCase()
          currency = COUNTRY_CURRENCY[countryCode] ?? 'usd'
        } catch {
          // GeoJS timeout — fall back to USD
        }

        // 2. Fetch FX rate for local currency (currency-api CDN, zero rate limits)
        let fxRate = 1
        if (currency !== 'usd') {
          try {
            const fxRes = await fetch(
              `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`,
              { signal: AbortSignal.timeout(4000) }
            )
            const fxData = await fxRes.json()
            fxRate = fxData.usd?.[currency] ?? 1
          } catch {
            fxRate = 1
          }
        }

        // 3. Fetch live asset prices from CoinGecko (free tier, no key)
        const ids = ASSETS_TO_SHOW.map(s => COINGECKO_IDS[s]).join(',')
        const cgRes = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
          { signal: AbortSignal.timeout(6000) }
        )
        const cgData = await cgRes.json()

        if (cancelled) return

        const updated: AssetPrice[] = ASSETS_TO_SHOW.map(symbol => {
          const id = COINGECKO_IDS[symbol]
          const entry = cgData[id]
          return {
            symbol,
            label: symbol,
            usd: entry?.usd ?? null,
            change24h: entry?.usd_24h_change ?? null,
          }
        })

        setPrices(updated)
        setLocalRate({
          currency: currency.toUpperCase(),
          rate: fxRate,
          symbol: CURRENCY_SYMBOLS[currency] ?? currency.toUpperCase(),
        })
        setIsLoaded(true)
      } catch {
        // Silent fail — bar just stays hidden
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 60_000) // refresh every 60s
    return () => { cancelled = true; clearInterval(interval) }
  }, [])

  if (!isLoaded) return null

  const items = prices.filter(p => p.usd !== null)
  if (items.length === 0) return null

  const doubled = [...items, ...items]

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #040F10 0%, #061C1E 50%, #040F10 100%)',
        borderTop: '1px solid rgba(33,230,167,0.08)',
        borderBottom: '1px solid rgba(33,230,167,0.08)',
        height: 36,
        display: 'flex',
        alignItems: 'stretch',
      }}
      aria-label="Live deposit asset prices"
      role="region"
    >
      <style>{`
        @keyframes live-ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .live-ticker-track { animation: live-ticker 40s linear infinite; }
        .live-ticker-track:hover { animation-play-state: paused; }
        @keyframes live-pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
      `}</style>

      {/* LIVE badge — proper flex column, never overlaps ticker */}
      <div style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '0 14px 0 16px',
        borderRight: '1px solid rgba(33,230,167,0.10)',
        background: 'linear-gradient(90deg, #040F10, #061C1E)',
      }}>
        <div style={{
          width: 5, height: 5, borderRadius: '50%',
          background: '#21E6A7',
          boxShadow: '0 0 6px rgba(33,230,167,0.7)',
          animation: 'live-pulse 2s ease-in-out infinite',
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.18em',
          textTransform: 'uppercase' as const, color: 'rgba(33,230,167,0.65)',
          fontFamily: 'Roboto, sans-serif',
          whiteSpace: 'nowrap',
        }}>Live</span>
      </div>

      {/* Scrolling ticker — isolated overflow container */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Right fade */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, zIndex: 10, pointerEvents: 'none',
          background: 'linear-gradient(to left, #040F10, transparent)',
        }} />

        <div
          ref={trackRef}
          className="live-ticker-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            width: 'max-content',
          }}
          aria-hidden="true"
        >
          {doubled.map((asset, i) => {
            const isPositive = (asset.change24h ?? 0) >= 0
            const rate = localRate.rate ?? 1
            const localPrice = asset.usd !== null && localRate.currency !== 'USD'
              ? `${localRate.symbol}${(asset.usd * rate).toLocaleString('en-US', { maximumFractionDigits: asset.usd * rate > 100 ? 0 : 2 })}`
              : null

            return (
              <div key={`${asset.symbol}-${i}`} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '0 24px',
                borderRight: '1px solid rgba(255,255,255,0.04)',
                flexShrink: 0,
                height: '100%',
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                  color: '#F4F7F6', fontFamily: 'Roboto, sans-serif',
                }}>
                  {asset.symbol}
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 500,
                  color: 'rgba(244,247,246,0.7)', fontFamily: 'Roboto, sans-serif',
                }}>
                  {asset.usd !== null ? formatPrice(asset.usd) : '—'}
                </span>
                {localPrice && (
                  <span style={{
                    fontSize: 10, color: 'rgba(143,163,160,0.6)', fontFamily: 'Roboto, sans-serif',
                  }}>
                    {localPrice} {localRate.currency}
                  </span>
                )}
                {asset.change24h !== null && (
                  <span style={{
                    fontSize: 10, fontWeight: 600,
                    color: isPositive ? '#21E6A7' : '#EF5350',
                    fontFamily: 'Roboto, sans-serif',
                  }}>
                    {isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
