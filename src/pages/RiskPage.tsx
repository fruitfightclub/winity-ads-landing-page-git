import { LegalShell, H2, Para, UL, Divider } from './LegalPageShell'
import SEO from '../components/SEO'

export default function RiskPage() {
  return (
    <>
      <SEO
        title="Risk Disclosure | Winity Life"
        description="Detailed disclosure of financial, regulatory, and technical risks associated with virtual assets."
      />
      <LegalShell
        title="Risk Disclosure"
        subtitle="Important information regarding the risks of digital assets and card services."
        updated="1st of August 2025"
      >
        <H2>Introduction</H2>

        <Para>Your use of the services and this site being provided by WTY Technology Hongkong Limited (“Company,” “we,” “us,” or “our”), whose reference shall also be used interchangeably with “WINITY”, is on the understanding and acceptance by you and all users of our services (referred to as “Users” or “you” herein) of the inherent risks involved in the use of our services, site and platforms.</Para>

        <Para>The WINITY card program is not available to the general public. It is offered only to eligible users whose access aligns with approved commercial use cases under our compliance framework.</Para>

        <Para>At WINITY, we believe in transparency and informed decision-making. This document outlines the key risks associated with virtual assets and the use of our services. It is not an exhaustive list, and users should carefully evaluate whether engaging with virtual assets aligns with their financial situation and risk appetite.</Para>

        <H2>Document Scope</H2>

        <Para>This Risk Disclosure outlines the material risks associated with using WINITY’s services, including those related to virtual assets, financial markets, infrastructure dependencies, regulatory uncertainty, and third-party digital wallets. It applies to all users of the WINITY platform and should be read alongside the WINITY Terms of Use, Privacy Policy, and any relevant issuer or Partner terms.</Para>

        <H2>Regulatory Uncertainty</H2>

        <Para>The legal and regulatory landscape for virtual assets is constantly evolving. Laws and policies regarding digital assets are occasionally subject to change, and their interpretation remains untested in many jurisdictions. Future regulatory developments may impact virtual assets and related services, potentially affecting their legality, availability, or usability.</Para>

        <Para>Users are responsible for understanding and complying with the laws applicable to their jurisdiction before engaging with virtual assets. WINITY does not provide financial advice, investment advice nor legal guidance, and WINITY shall have no responsibility for changes in regulatory frameworks that may impact users. Use of WINITY services may not be lawful in all jurisdictions. It is the sole responsibility of users to ensure their compliance with local laws and regulations prior to engaging with our services.</Para>

        <H2>Market Risks & Volatility</H2>

        <Para>Virtual assets are highly volatile and may experience rapid price fluctuations. Their valuation is influenced by multiple factors, including global market trends, liquidity constraints, technological advancements, and speculative trading activity.</Para>

        <Para>There is no guarantee that a virtual asset will retain its value, and users should be prepared for the possibility of significant losses. The decision to hold, trade, or transact using virtual assets should be made with a full understanding of these risks.</Para>

        <H2>Operational & Security Risks</H2>

        <Para>Engaging with virtual assets requires reliance on digital platforms, networks, and third-party service providers. These systems are susceptible to disruptions, cyber threats, and operational failures. Malicious third-party actors may attempt to exploit vulnerabilities through unauthorised access, malware, phishing attacks, or coordinated cyberattacks.</Para>

        <Para>Users are responsible for securing their personal accounts, including safeguarding login credentials, passwords, and two-factor authentication tools.</Para>

        <Para>Additionally, failures in infrastructure—such as outages, software malfunctions, or third-party service disruptions—may temporarily affect access to virtual assets or services. WINITY takes security seriously but cannot guarantee protection against all forms of cyber risks.</Para>

        <H2>Digital Wallet Risks</H2>

        <Para>When using WINITY cards through third-party digital wallets (such as Apple Pay or Google Pay), users assume the risk of service outages, biometric lockout, device-level failures, or rejection by merchants. WINITY is not responsible for limitations of external wallet providers or mobile operating systems.</Para>

        <H2>Financial & Liquidity Risks</H2>

        <Para>Our services are supported by licensed third-party financial institutions, custodians, and payment processors (“Partners”). These entities operate independently and are subject to their own risk controls, terms, and limitations. While WINITY conducts due diligence, we do not guarantee their solvency, availability, or uninterrupted operation.</Para>

        <Para>In the event of insolvency, financial distress, or service suspension, there is no absolute assurance that users will be able to recover funds held within the platform. Virtual asset markets are not insured or protected in the same way as traditional financial institutions, and recovery of assets in cases of bankruptcy may be subject to legal proceedings and applicable regulations. You should take your own independent legal advice from qualified persons and not deposit assets that you are unable to lose.</Para>

        <H2>Accuracy of Information</H2>

        <Para>While we strive to ensure the accuracy and timeliness of information provided through our services, there is no guarantee that all displayed data, pricing, or market trends are up to date or free from errors. Users should independently verify critical information before making financial or other decisions relating to our WINITY services or platforms.</Para>

        <H2>User Responsibilities</H2>

        <Para>Users are solely responsible for ensuring the security of their access credentials and account details. This includes safeguarding email accounts, passwords, private keys, and authentication mechanisms. Additionally, users should maintain secure hardware and software environments to minimise the risk of unauthorised access or data breaches.</Para>

        <Para>By engaging with WINITY’s services, users acknowledge and accept the risks outlined in this disclosure. It is strongly recommended that individuals conduct their own due diligence and seek independent financial or legal advice before any involvement with virtual assets or related services.</Para>

        <Para>For information regarding how your data is collected and used when engaging with WINITY services, please review our Privacy Policy available at https://winity.life/legal/privacypolicy/ .</Para>

        <H2>Contact WINITY</H2>

        <Para>For inquiries related to this document, please contact us at:</Para>

        <UL items={[
          'Support: support@winity.life',
          'Legal: legal@winity.life',
          'Website: https://www.winity.life'
        ]} />

        <Para>By using WINITY, and any and all of our services and platforms, you acknowledge that you have read, understood, and accept our privacy policies set out herein, and that this document should be read alongside WINITY Terms of Use and related policies.</Para>

        <Para>Version: 1.0</Para>

        <Para>Last Updated: 1st of August 2025</Para>
      </LegalShell>
    </>
  )
}
