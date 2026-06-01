// ─── Featured In / Press Strip ───────────────────────────────────────────────
// Replaces the stats marquee — shows press publication logos in a clean strip
// matching the Figma "Featured On" design

const pressItems = [
  {
    name: 'Financial Times',
    abbr: 'FT',
    style: {
      fontWeight: 900,
      fontStyle: 'italic',
      fontSize: '1.15rem',
      color: '#FCC200',
      letterSpacing: '-0.01em',
    },
  },
  {
    name: 'Reuters',
    abbr: 'Reuters',
    style: {
      fontWeight: 700,
      fontSize: '1rem',
      color: '#FF8000',
      letterSpacing: '0.02em',
    },
  },
  {
    name: 'Associated Press',
    abbr: 'AP',
    style: {
      fontWeight: 900,
      fontSize: '1.3rem',
      color: '#ffffff',
      letterSpacing: '-0.02em',
    },
  },
  {
    name: 'Business Insider',
    abbr: 'Business Insider',
    style: {
      fontWeight: 700,
      fontSize: '0.88rem',
      color: '#F4F7F6',
      letterSpacing: '0.04em',
      textTransform: 'uppercase' as const,
    },
  },
  {
    name: 'MERC',
    abbr: 'MERC',
    style: {
      fontWeight: 900,
      fontSize: '1.05rem',
      color: '#21E6A7',
      letterSpacing: '0.12em',
      textTransform: 'uppercase' as const,
    },
  },
  {
    name: 'Bloomberg',
    abbr: 'Bloomberg',
    style: {
      fontWeight: 700,
      fontSize: '0.95rem',
      color: '#F4F7F6',
      letterSpacing: '0.01em',
    },
  },
  {
    name: 'CoinDesk',
    abbr: 'CoinDesk',
    style: {
      fontWeight: 700,
      fontSize: '0.88rem',
      color: '#7B96EA',
      letterSpacing: '0.03em',
    },
  },
]

// Duplicate for seamless marquee loop
const doubled = [...pressItems, ...pressItems]

// ─── Separator between items ─────────────────────────────────────────────────
function Separator() {
  return (
    <div
      className="flex-shrink-0 mx-6"
      aria-hidden="true"
      style={{
        width: '1px',
        height: '18px',
        background: 'rgba(184,115,51,0.30)',
      }}
    />
  )
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function StatsTicker() {
  return (
    <section
      className="relative overflow-hidden py-5"
      style={{
        background: '#0B2E2C',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
      aria-label="Winity press coverage"
    >
      {/* ── Left fade ── */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0B2E2C, transparent)' }}
      />

      {/* ── Right fade ── */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #0B2E2C, transparent)' }}
      />

      {/* ── "Featured In" label pinned left ── */}
      <div
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="text-[10px] font-semibold tracking-widest uppercase"
          style={{ color: 'rgba(184,115,51,0.70)' }}
        >
          Featured In
        </span>
        <div
          style={{
            width: '24px',
            height: '1px',
            background: 'rgba(184,115,51,0.40)',
          }}
        />
      </div>

      {/* ── Marquee track ── */}
      <div
        className="flex items-center"
        style={{
          animation: 'marquee 36s linear infinite',
          willChange: 'transform',
          width: 'max-content',
          paddingLeft: '180px', // offset for the "Featured In" label on desktop
        }}
        aria-hidden="true"
      >
        {doubled.map((item, i) => (
          <div key={`${item.abbr}-${i}`} className="flex items-center flex-shrink-0">
            <div
              className="px-4 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-default"
              style={item.style}
            >
              {item.abbr}
            </div>
            <Separator />
          </div>
        ))}
      </div>

      {/* ── Accessible static list ── */}
      <ul className="sr-only">
        {pressItems.map((p) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
    </section>
  )
}
