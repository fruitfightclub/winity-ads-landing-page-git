import { LegalShell, H2, Para, UL, Divider } from './LegalPageShell'
import SEO from '../components/SEO'

const MINT     = '#21E6A7'
const OFF_WHITE = '#F0EDE6'
const MUTED    = 'rgba(240,237,230,0.55)'
const CARD_BG  = '#0B2E2C'
const BORDER   = 'rgba(33,230,167,0.10)'

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(230,80,80,0.07)',
      border: '1px solid rgba(230,80,80,0.22)',
      borderRadius: 10,
      padding: '16px 20px',
      marginBottom: 24,
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
    }}>
      <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>⚠️</span>
      <p style={{ fontSize: 14, color: 'rgba(240,150,140,0.9)', lineHeight: 1.65, margin: 0 }}>{children}</p>
    </div>
  )
}

function TableRow({ feature, consequence, even }: { feature: string; consequence: string; even: boolean }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 2fr',
      background: even ? 'rgba(33,230,167,0.03)' : 'transparent',
      borderBottom: `1px solid ${BORDER}`,
      padding: '12px 16px', gap: 16,
    }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: OFF_WHITE }}>{feature}</span>
      <span style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{consequence}</span>
    </div>
  )
}

const IMPLICATIONS = [
  { feature: 'App Access', consequence: 'The member is instantly logged out and cannot log back in with these credentials.' },
  { feature: 'Demographic Data', consequence: 'Once the account is deleted, the customer will not be able to access their demographic or financial data stored in the Winity Life application.' },
  { feature: 'Financial Data', consequence: 'All stored account balances, transaction history, and card information will be inaccessible. Access to the deleted account will never be reinstated.' },
  { feature: 'Scheduled Activity', consequence: 'Any scheduled transfers, payments, or recurring deposits are automatically cancelled.' },
  { feature: 'Linked Services', consequence: 'Access to any services connected through Winity Life will be revoked.' },
]

export default function DeleteAccountPage() {
  return (
    <>
      <SEO
        title="Delete Account | Winity Life"
        description="Important information regarding the permanent removal of your Winity Life account, including pre-deletion steps and data retention obligations."
      />
      <LegalShell
        title="Delete Account"
        subtitle="Important information regarding the permanent removal of your Winity account."
        updated="1st of August 2025"
      >

        <WarningBox>
          Deleting your account is a <strong style={{ color: 'rgba(240,150,140,1)' }}>permanent, irreversible action</strong>. Once an account is deleted, the member will immediately and permanently lose access to all stored information, including demographic and financial data within the Winity Life application.
        </WarningBox>

        <Para>Winity Life is committed to user control and transparency, allowing customers to delete their account at any time directly on the platform.</Para>

        <Divider />

        <H2>Your Data, Your Control</H2>
        <Para>Account deletion is initiated entirely within the Winity Life app. No support ticket is required to begin the process. Once confirmed, deletion is immediate and cannot be undone.</Para>

        <H2>Key Implications: What is Lost</H2>
        <Para>When a Winity Life account is deleted, the following consequences occur immediately:</Para>

        {/* Table */}
        <div style={{ border: `1px solid ${BORDER}`, borderRadius: 10, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 2fr',
            background: CARD_BG, borderBottom: `1px solid ${BORDER}`,
            padding: '10px 16px', gap: 16,
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: MINT }}>Feature</span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: MINT }}>Consequence of Deletion</span>
          </div>
          {IMPLICATIONS.map((row, i) => (
            <TableRow key={row.feature} feature={row.feature} consequence={row.consequence} even={i % 2 === 0} />
          ))}
        </div>

        <Divider />

        <H2>Crucial Pre-Checks Before Deletion</H2>
        <Para>Before proceeding with account deletion, members must complete the following steps to prevent disruption:</Para>

        <UL items={[
          'Zero Balance: The account balance must be zero ($0.00). All funds must be withdrawn or transferred before deletion is initiated.',
          'Download Statements: Download and save all required transaction history or financial statements for personal record-keeping.',
          'Cancel Subscriptions: Any active premium services or subscriptions linked to the Winity Life account must be cancelled to avoid unintended charges.',
        ]} />

        <Divider />

        <H2>Data Retention for Regulatory Compliance</H2>
        <Para>While a member's data becomes inaccessible to them after deletion, Winity Life is legally required to securely retain the data of deleted accounts for a specific period. This is essential for adhering to regulatory and compliance requirements in Hong Kong.</Para>

        <Para>Specifically, data is retained for up to 7 years to comply with Hong Kong financial regulations, which include:</Para>

        <UL items={[
          'Tax Purposes: Records must be kept for at least 7 years.',
          'Anti-Money Laundering (AML) Compliance: Records are required for a minimum of 5 years.',
        ]} />

        <Para>All retained records are kept secure and accessible in a compliant format (English or Chinese) to meet potential audit and legal obligations. Electronic records are maintained and convertible to written form as required by law.</Para>

        <Divider />

        <H2>How to Delete Your Account</H2>
        <UL items={[
          'Open the Winity Life app and navigate to Settings.',
          'Select Account Management.',
          'Tap Delete Account and follow the on-screen confirmation steps.',
          'Ensure your balance is zero and all pre-checks are complete before confirming.',
        ]} />

        <Para>If you encounter any issues during the deletion process or have questions, contact our support team at <strong style={{ color: MUTED }}>support@winity.life</strong> before proceeding.</Para>

      </LegalShell>
    </>
  )
}
