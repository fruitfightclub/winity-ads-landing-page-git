import { useState } from 'react'
import SEO from '../components/SEO'

const MINT      = '#21E6A7'
const OFF_WHITE = '#F0EDE6'
const MUTED     = 'rgba(240,237,230,0.55)'
const BASE      = '#061C1E'
const CARD_BG   = '#0B2E2C'
const BORDER    = 'rgba(33,230,167,0.10)'

const REGIONS = [
  {
    name: 'Europe',
    count: 44,
    countries: [
      'Andorra','Austria','Belgium','Bosnia and Herzegovina','Croatia','Czech Republic',
      'Denmark','Estonia','Faroe Islands','Finland','France','Germany','Gibraltar','Greece',
      'Guernsey','Hungary','Iceland','Ireland','Isle of Man','Italy','Jersey','Kosovo',
      'Latvia','Liechtenstein','Lithuania','Luxembourg','Malta','Moldova','Monaco',
      'Montenegro','Netherlands','North Macedonia','Norway','Poland','Portugal','Romania',
      'San Marino','Serbia','Slovakia','Slovenia','Spain','Sweden','Switzerland',
      'United Kingdom','Vatican City',
    ],
  },
  {
    name: 'Asia',
    count: 39,
    countries: [
      'Armenia','Azerbaijan','Bahrain','Bangladesh','Bhutan','Brunei','Cambodia','Cyprus',
      'East Timor (Timor-Leste)','Gaza Strip','Georgia','Hong Kong','Israel','Kazakhstan',
      'Kuwait','Kyrgyzstan','Laos','Macau','Malaysia','Maldives','Mongolia','Myanmar',
      'Nepal','Oman','Pakistan','Philippines','Qatar','Saudi Arabia','Sri Lanka','Taiwan',
      'Tajikistan','Thailand','Turkey','Turkmenistan','United Arab Emirates','Uzbekistan',
      'Vietnam','West Bank',
    ],
  },
  {
    name: 'Africa',
    count: 35,
    countries: [
      'Algeria','Angola','Benin','Botswana','Cabo Verde (Cape Verde)',
      'Central African Republic','Chad','Comoros',"Côte d'Ivoire",'Djibouti','Egypt',
      'Equatorial Guinea','Eswatini (Swaziland)','Ethiopia','Gabon','The Gambia','Ghana',
      'Guinea','Lesotho','Madagascar','Malawi','Mauritania','Mauritius','Mayotte','Niger',
      'Nigeria','Réunion','Saint Helena','Sao Tome and Principe','Senegal','Seychelles',
      'Togo','Tunisia','Western Sahara','Zambia',
    ],
  },
  {
    name: 'North & Central America',
    count: 10,
    countries: [
      'Belize','Canada','Costa Rica','El Salvador','Greenland','Guatemala','Honduras',
      'Mexico','Panama','Saint-Pierre and Miquelon',
    ],
  },
  {
    name: 'South America',
    count: 13,
    countries: [
      'Argentina','Bolivia','Brazil','Chile','Colombia','Ecuador','Falkland Islands',
      'French Guiana','Guyana','Paraguay','Peru','Suriname','Uruguay',
    ],
  },
  {
    name: 'Caribbean',
    count: 23,
    countries: [
      'Anguilla','Antigua and Barbuda','Aruba','The Bahamas','Barbados','Bermuda',
      'British Virgin Islands','Cayman Islands','Curaçao','Dominica','Dominican Republic',
      'Grenada','Guadeloupe','Martinique','Montserrat','Puerto Rico',
      'Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines',
      'Sint Maarten','Trinidad and Tobago','Turks and Caicos Islands',
      'United States Virgin Islands',
    ],
  },
  {
    name: 'Oceania',
    count: 23,
    countries: [
      'American Samoa','Cocos (Keeling) Islands','Cook Islands','Fiji','French Polynesia',
      'Guam','Kiribati','Marshall Islands','Micronesia','Nauru','New Caledonia',
      'New Zealand','Niue','Northern Mariana Islands','Papua New Guinea','Pitcairn Island',
      'Samoa','Solomon Islands','Tokelau','Tonga','Tuvalu','Vanuatu','Wallis and Futuna',
    ],
  },
]

const total = REGIONS.reduce((s, r) => s + r.countries.length, 0)

function RegionPanel({ region }: { region: typeof REGIONS[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      border: `1px solid ${open ? 'rgba(33,230,167,0.28)' : BORDER}`,
      borderRadius: 14,
      overflow: 'hidden',
      transition: 'border-color 0.2s',
      background: CARD_BG,
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: OFF_WHITE }}>{region.name}</span>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            color: MINT, background: 'rgba(33,230,167,0.10)',
            border: '1px solid rgba(33,230,167,0.18)',
            borderRadius: 20, padding: '2px 9px',
          }}>
            {region.countries.length} countries
          </span>
        </div>
        <svg
          width="18" height="18" viewBox="0 0 18 18" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}
        >
          <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke={MINT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div style={{ padding: '4px 24px 24px', borderTop: `1px solid ${BORDER}` }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '8px 16px',
            marginTop: 16,
          }}>
            {region.countries.map(c => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: MINT, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: MUTED, lineHeight: 1.5 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function CardAvailabilityPage() {
  return (
    <>
      <SEO
        title="Card Availability — Winity Life"
        description={`The Winity Visa® Card is available in ${total}+ countries and regions across Europe, Asia, Africa, the Americas, and Oceania.`}
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
              Card Availability
            </h1>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.6, maxWidth: 560 }}>
              The Winity Card is widely accepted across {total}+ countries and regions, giving you the flexibility to make seamless payments wherever you go.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ borderBottom: `1px solid ${BORDER}`, background: 'rgba(11,46,44,0.4)' }}>
          <div style={{ maxWidth: 840, margin: '0 auto', padding: '20px clamp(20px, 6vw, 96px)', display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[
              { label: 'Countries & regions', value: `${total}+` },
              { label: 'Continents', value: '7' },
              { label: 'Merchant locations', value: '150M+' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 22, fontWeight: 900, color: MINT }}>{s.value}</div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Region accordions */}
        <div style={{ maxWidth: 840, margin: '0 auto', padding: 'clamp(40px, 7vh, 80px) clamp(20px, 6vw, 96px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {REGIONS.map(r => <RegionPanel key={r.name} region={r} />)}
          </div>

          <p style={{ marginTop: 48, fontSize: 12, color: 'rgba(240,237,230,0.30)', lineHeight: 1.7 }}>
            Card services are issued in Hong Kong and available globally wherever Visa® is accepted. Availability may vary by jurisdiction and is subject to applicable laws and compliance requirements.
          </p>
        </div>
      </div>
    </>
  )
}
