import { useState } from 'react'
import SEO from '../components/SEO'

const MINT      = '#21E6A7'
const OFF_WHITE = '#F0EDE6'
const MUTED     = 'rgba(240,237,230,0.55)'
const BASE      = '#061C1E'
const CARD_BG   = 'rgba(11,46,44,0.72)'
const BORDER    = 'rgba(33,230,167,0.13)'

// ─── FAQ data ──────────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: 'registration',
    label: 'Registration & Account Setup',
    items: [
      {
        q: 'How do I download and install the Winity Life app?',
        a: `For Android: Open the Google Play Store, search "Winity", select the official Winity Life app, and tap Install.\n\nFor iOS: Open the App Store, search "Winity", select the official Winity Life app, tap Get, and confirm with your Apple ID, Face ID, or Touch ID.`,
      },
      {
        q: 'What information is required to register an account?',
        a: `Registration: Enter your phone number, then the OTP received to access the app.\n\nIdentity Verification: Verify your email with the OTP sent to your inbox. Provide personal details (name, date of birth, address), upload an ID document (National ID, Driving Licence, or Passport), and take a selfie as prompted. Submit for verification and await approval — once approved, your application will proceed for card issuance.`,
      },
      {
        q: 'In which countries is the Winity Card available?',
        a: 'The Winity Card is available in 187+ countries across Europe, Asia, Africa, the Americas, and Oceania. See the full list on our Card Availability page.',
      },
      {
        q: 'Are there any restrictions on who can use the Winity Card?',
        a: 'You must be 18 years or older, have successfully completed KYC verification, and be a resident of a supported (non-restricted) country.',
      },
    ],
  },
  {
    id: 'kyc',
    label: 'KYC Process',
    items: [
      {
        q: 'How long does identity verification (KYC) take?',
        a: 'Identity verification (KYC) is usually completed within minutes. In some cases a manual review may be required, which typically takes 1–2 business days.',
      },
      {
        q: 'What documents are needed to complete KYC?',
        a: 'You can use any of the following: Passport, Driving Licence, or National Identity Card.',
      },
      {
        q: 'How secure is my personal information during KYC?',
        a: 'Your information is kept confidential in accordance with applicable data protection laws and regulatory requirements in Hong Kong. All data shared during KYC is encrypted and stored securely.',
      },
      {
        q: 'Can I update my KYC information later?',
        a: 'Yes, you can update your KYC details at a later stage. However, a card will only be issued once your Identity Verification has been successfully completed.',
      },
    ],
  },
  {
    id: 'card',
    label: 'Card Issuance & Usage',
    items: [
      {
        q: 'Is the card virtual, physical, or both?',
        a: 'Winity offers two card types — Exclusive and Executive — both available in virtual and physical formats. The Exclusive card includes a free virtual card. The Executive card includes both a free virtual card and a premium metal physical card.',
      },
      {
        q: 'Where can I use the Winity Card?',
        a: 'The Winity Card can be used across 150 million merchants globally wherever Visa® is accepted, including online and in-store.',
      },
      {
        q: 'How do I add the card to Google Pay?',
        a: `1. Open the Google Pay app on your phone.\n2. Tap Add a Payment Method.\n3. Enter your Winity Card details (card number, expiry date, CVV).\n4. Verify via the OTP sent to your registered phone or email.\n5. Once verified, your Winity Card is ready for contactless and online payments.`,
      },
      {
        q: 'How do I get the physical card?',
        a: 'Spend USD 25 on your virtual card to qualify for the physical card at no issuance cost. Request it from the card management section in the app. The first 6 months of the USD 20/year annual fee are waived on new activations. Shipping charges may apply.',
      },
      {
        q: 'Can I use the Winity Card at ATMs?',
        a: 'Yes. Your physical Winity Card works at any Visa® ATM in 200+ countries. ATM withdrawal fee: USD 3 per transaction. PIN change at ATM: USD 5.',
      },
    ],
  },
  {
    id: 'wallet',
    label: 'Wallet and Funding',
    items: [
      {
        q: 'What is a Wallet Address?',
        a: 'A Wallet Address is your unique blockchain address for receiving funds. In the Winity Life app, wallet addresses can be found in the Deposit section on the home page, with a separate address shown for each supported network.',
      },
      {
        q: 'How do I check my wallet balance and transaction history?',
        a: 'Your balance is shown on the main home page under each card. Recent transactions appear in the activity section. For more detail, go to the Transactions section where you can filter by card, time period, or transaction type (deposits, spends, rewards).',
      },
      {
        q: 'How can I add funds to the Winity Life App?',
        a: `Open the Winity Life app and go to the Deposit section on the home page. Select the network you want to use — a separate wallet address is shown for each supported network. Copy the address or scan the QR code, then transfer your chosen digital currency to that address.\n\n⚠️ Always ensure you select the correct network and token before making a deposit. Using the wrong network may result in failed or lost transactions. Sender-side blockchain gas fees may apply; these are charged by the network, not by Winity Life.`,
      },
      {
        q: 'Which digital currencies are supported?',
        a: `Stablecoins (0% deposit fee): USDT, USDC\nNon-stable assets (5% conversion fee): WCO, ETH, BSC, POL, Tron, SOL\nSupported networks: Ethereum, W Chain, Polygon, Tron, Solana, Binance Smart Chain.`,
      },
      {
        q: 'What happens when I deposit digital assets?',
        a: 'Once your transfer is completed, your digital assets appear in the Deposit section. Your available balance is then shown in USD for use with your Winity Card. Network gas fees may apply depending on the asset and network used.',
      },
      {
        q: 'How can I withdraw funds from the Winity Card?',
        a: 'You can withdraw funds at any ATM worldwide where Visa® is accepted. The Winity Life App does not support withdrawal of funds in the form of digital assets.',
      },
      {
        q: 'Can I request a deposit back as digital assets?',
        a: `Deposits are intended for Winity Card use, and withdrawals back into digital assets are not supported. In exceptional cases, contact Winity Support to submit a review request. The team will temporarily block your card, review relevant transactions, confirm the eligible refundable amount after fees, and process the refund once you approve the confirmation email.\n\nConditions: only the most recent deposit is considered; the request must be submitted immediately after the deposit; if any card transaction occurs after the deposit, the request cannot be processed; the final decision rests with Winity Life.`,
      },
    ],
  },
  {
    id: 'transactions',
    label: 'Transactions & Payments',
    items: [
      {
        q: 'Can I use the Winity Card for online and in-store payments?',
        a: 'Yes. The Winity Card works for online purchases and in-store payments at over 150 million merchants globally. You can spend in USD funded by USDT, USDC, or other supported digital assets.',
      },
      {
        q: 'What happens if a payment is declined?',
        a: `You will be notified immediately. Before retrying:\n• Ensure your Winity Card has sufficient balance (minimum USD 25).\n• Verify the card is active, valid, and enabled for the transaction type.\n• Check you have not exceeded any applicable transaction or daily spending limits.\n\nIf the issue continues, contact our customer support team.`,
      },
      {
        q: 'What is the exchange rate at which my balance is converted?',
        a: 'Your balance is converted at the current market exchange rate at the time of the transaction. Winity automatically applies the prevailing rate to ensure transparency when converting between digital assets and USD.',
      },
      {
        q: 'How many Winity Points do I earn per purchase?',
        a: `Exclusive Card: 1 Winity Point for every USD 10 spent.\nExecutive Card: 1 Winity Point for every USD 8 spent.\n\nRewards are automatically credited as Winity Points and can be tracked directly in the app.`,
      },
      {
        q: 'How secure are Winity Card transactions?',
        a: 'Winity Card transactions are protected by advanced encryption and security protocols. Each transaction is processed through Visa\'s global network, ensuring the highest standards of security and fraud protection.',
      },
    ],
  },
  {
    id: 'security',
    label: 'Security and Privacy',
    items: [
      {
        q: 'How is my financial data protected?',
        a: 'Your information is kept confidential in accordance with applicable data protection laws in Hong Kong. All data is encrypted and stored securely in compliance with regulatory requirements.',
      },
      {
        q: 'What should I do if I notice an unauthorised transaction?',
        a: 'Block your card immediately through the app or by contacting support@winity.life. Report the details as soon as possible with the transaction details so we can review the case and raise it with Visa for further investigation.',
      },
      {
        q: 'How do I set up a security PIN?',
        a: 'You will be prompted to create a PIN during registration. To change it later: Settings → Privacy & Security → Change PIN.',
      },
      {
        q: 'Can I set up biometric authentication?',
        a: 'Yes. For online transactions, biometric authentication via the Winity Life App is required. Enable or disable it under: Settings → Privacy & Security → Enable/Disable Biometrics.',
      },
      {
        q: 'How do I freeze my card?',
        a: `1. Open the Winity Life app and go to the Home Page.\n2. Locate the card you want to freeze.\n3. Tap the Freeze icon displayed under the card.\n4. Confirm when prompted.\n\nOnce confirmed, your card is frozen immediately and cannot be used for transactions.`,
      },
      {
        q: 'What is 3D Secure (3DS) and how does it work with Winity?',
        a: '3D Secure is an extra layer of protection for online card transactions. When you make an online payment, you\'ll receive a notification in the Winity Life app asking you to approve the transaction via biometric authentication (fingerprint or Face ID). No OTP is required — Winity\'s 3DS is OTP-free for a faster and more secure experience.',
      },
    ],
  },
  {
    id: 'fees',
    label: 'Fees and Charges',
    items: [
      {
        q: 'What are the ATM fees?',
        a: 'ATM Withdrawal Fee: USD 3 per transaction.\nPIN Change at ATM: USD 5.',
      },
      {
        q: 'Are there card spend or deposit fees?',
        a: `Card Spend Fee: USD 0.\nStablecoins (USDT, USDC) Deposit Fee: 0%.\nWCO Deposit Fee: 5%.\nCrypto Assets Conversion Fee: 5% (applies to non-stable coins and non-WCO assets).`,
      },
      {
        q: 'What is the minimum balance required for card transactions?',
        a: 'A minimum balance of USD 25 is required to complete card transactions. If your balance falls below this threshold, card usage will be temporarily disabled until restored. A minimum spend fee of USD 0.10 applies to transactions below USD 25.',
      },
      {
        q: 'What is the Chargeback Fee?',
        a: 'USD 100 per chargeback. This fee is charged for processing chargeback disputes.',
      },
      {
        q: 'How does the Deposit Bonus work?',
        a: `Earn bonus Winity Points on qualifying deposits:\n• USD 500+ deposit → 2 Winity Points\n• USD 1,000+ deposit → 5 Winity Points\n• USD 1,500+ deposit → 9 Winity Points\n• USD 2,000+ deposit → 15 Winity Points`,
      },
    ],
  },
  {
    id: 'offers',
    label: 'Active Offers',
    items: [
      {
        q: 'Christmas That Keeps Giving — Campaign FAQ (Ended)',
        a: `This campaign ran from December 20, 2025 and bonus funds were valid through March 31, 2026.\n\nNew Users: Complete KYC and make a first deposit of at least USD 10 to receive an instant USD 5 bonus (total USD 15 to spend).\nExisting Users: Make a single deposit of at least USD 25 to receive a USD 5 bonus (total USD 30 to spend).\n\nBonus funds were credited instantly and available for Winity Card spending only. Direct withdrawals to external wallets were not supported. Unused bonus funds after March 31, 2026 were forfeited. Only one bonus per user. Eligibility may vary by jurisdiction.`,
      },
    ],
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${BORDER}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 700, color: open ? MINT : OFF_WHITE, transition: 'color 0.2s', lineHeight: 1.45 }}>
          {q}
        </span>
        <svg
          width="18" height="18" viewBox="0 0 18 18" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}
        >
          <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke={MINT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div style={{ paddingBottom: 18 }}>
          {a.split('\n').map((line, i) => (
            line.trim() === ''
              ? <div key={i} style={{ height: 8 }} />
              : <p key={i} style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, margin: '0 0 2px' }}>{line}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default function FAQsPage() {
  const [activeSection, setActiveSection] = useState('registration')

  return (
    <>
      <SEO
        title="FAQs — Winity Life"
        description="Frequently asked questions about the Winity Life app, card issuance, KYC, wallet funding, transactions, fees, and security."
      />
      <div style={{ background: BASE, minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>

        {/* Header */}
        <div style={{
          background: '#0B2E2C',
          borderBottom: `1px solid ${BORDER}`,
          padding: 'clamp(80px, 12vh, 120px) clamp(20px, 6vw, 96px) clamp(40px, 6vh, 60px)',
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: MINT, marginBottom: 14 }}>
              Winity Life
            </p>
            <h1 style={{ fontSize: 'clamp(26px, 4vw, 46px)', fontWeight: 900, color: OFF_WHITE, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 12 }}>
              Frequently Asked Questions
            </h1>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.6 }}>
              Everything you need to know about Winity Life.
            </p>
          </div>
        </div>

        {/* Tab nav */}
        <div style={{ borderBottom: `1px solid ${BORDER}`, background: 'rgba(11,46,44,0.4)', overflowX: 'auto' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(20px, 6vw, 96px)', display: 'flex', gap: 4 }}>
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                style={{
                  padding: '14px 16px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap',
                  color: activeSection === s.id ? MINT : MUTED,
                  borderBottom: activeSection === s.id ? `2px solid ${MINT}` : '2px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ content */}
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(40px, 7vh, 72px) clamp(20px, 6vw, 96px)' }}>
          {SECTIONS.filter(s => s.id === activeSection).map(section => (
            <div key={section.id}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 32,
                padding: '6px 14px', borderRadius: 24,
                background: 'rgba(33,230,167,0.08)', border: `1px solid rgba(33,230,167,0.18)`,
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: MINT, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {section.label}
                </span>
                <span style={{ fontSize: 11, color: 'rgba(33,230,167,0.6)' }}>
                  {section.items.length} {section.items.length === 1 ? 'question' : 'questions'}
                </span>
              </div>
              <div>
                {section.items.map((item, i) => (
                  <AccordionItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}

          <div style={{ marginTop: 56, padding: '24px', background: CARD_BG, borderRadius: 14, border: `1px solid ${BORDER}` }}>
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, margin: 0 }}>
              Still have questions?{' '}
              <a href="mailto:support@winity.life" style={{ color: MINT, textDecoration: 'none', fontWeight: 600 }}>
                support@winity.life
              </a>
              {' '}or reach us via WhatsApp through the Help menu in the Winity Life app.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
