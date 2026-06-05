import { LegalShell, H2, Para, UL, Divider } from './LegalPageShell'
import SEO from '../components/SEO'

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy | Winity Life"
        description="How Winity Life collects, uses, and protects your personal data."
      />
      <LegalShell
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information."
        updated="1st of August 2025"
      >
        <H2>Introduction</H2>

        <Para>Your use of the services and this site being provided by WTY Technology Hongkong Limited (“Company,” “we,” “us,” or “our”), whose reference shall also be used interchangeably with “WINITY”, is on the understanding and acceptance by you and all users of our services (referred to as “Users” or “you” herein) of our privacy policy(/ies) involved in the use of our services, site and platforms.</Para>

        <Para>WINITY, along with our affiliates and subsidiaries (collectively referred to as “WINITY,” “we,” “us,” or “our”), sets forth this policy to outline our approach to protecting, collecting, using, and sharing your personal information.</Para>

        <Para>Our privacy policy applies whenever you engage with us and/or partake in our services, including:</Para>

        <UL items={[
          'Digital Services: Our website https://www.winity.life , mobile applications, dashboards and online platforms that we operate.',
          'Social Media & Communications: Our interactions via social media accounts, e-mails and digital marketing channels.',
          'API & Integrated Services: The use of WINITY’s APIs and third-party services that integrate with our systems. WINITY APIs are designed for institutional integration and require token-based access. All data exchanges are secured through encryption and subject to this Privacy Policy.'
        ]} />

        <Para>By accessing or using our services, you confirm that you have read and understood this Privacy Policy and agree to the collection, use, and processing of your data as described herein, subject to applicable laws.</Para>

        <H2>Document Scope</H2>

        <Para>This Privacy Policy describes how WINITY, operated by WTY Technology Hongkong Limited, collects, uses, discloses, and protects personal data across its platforms and services. It applies to all users and visitors engaging with WINITY websites, apps, APIs, and integrated features. This policy is to be read in conjunction with the WINITY Terms of Use, Risk Disclosure, and applicable laws in your jurisdiction.</Para>

        <H2>Definition of Personal Data</H2>

        <Para>Personal data refers to any information that can identify an individual, either directly or indirectly, and is processed to provide our services securely and effectively to bona fide users and clients (where applicable).</Para>

        <H2>Information We Collect & How We Use It</H2>

        <Para>We collect various types of personal data to enhance your experience, ensure security, and comply with applicable regulations.</Para>

        <UL items={[
          'Usage Data: When you visit our website or use our app, we collect information such as pages visited, device type, location, IP address, and browser type. This helps us analyse website traffic, personalise user experience, and improve service efficiency.',
          'Account Information: When you register with WINITY, we collect your full name, email, phone number, and password. This data enables us to verify your identity, manage account access, and protect against unauthorised activity.',
          'Customer Communications: If you contact us via our website, email, or support channels, we collect your messages along with your contact details to address inquiries and provide assistance effectively.',
          'Compliance & Regulatory Data: WINITY is committed to meeting legal and regulatory requirements. To verify identity and comply with AML (Anti-Money Laundering) and KYC (Know Your Customer) obligations, we collect copies of your government-issued IDs, proof of residence and other compliance-related information.',
          'Marketing Preferences & Insights: If you opt-in to receive updates, we collect data related to your preferences and interactions with our promotional content to tailor communications about new products, services, or industry updates.',
          'Financial & Transactional Data: If you engage in transactions on our platform, we collect details such as account numbers, deposit and withdrawal history, and API keys. This allows us to process payments securely and maintain accurate financial records.',
          'Device Identifiers & Security Data: To enhance security, we gather information from your device, including IMEI numbers, MAC addresses, and operating system details. This helps in fraud detection and system optimisation.',
          'Regulated Financial Services Data: If you use services that require additional compliance, such as regulated financial transactions, we may collect nationality, tax status, and other relevant information to meet legal obligations.'
        ]} />

        <H2>Data from Third Parties</H2>

        <Para>In some cases, we may receive data from external sources to enhance our verification processes and service efficiency. This includes identity verification data from regulatory partners, analytics from social media platforms, and fraud detection insights from business affiliates.</Para>

        <H2>How We Share Your Data</H2>

        <Para>We do not sell or rent personal information. However, data may be shared under the following circumstances:</Para>

        <UL items={[
          'With Trusted Partners & Vendors: Third-party service providers assist us with payment processing, security, identity verification, and cloud storage. We may also share your information with our licensed financial institution partners, card issuers, custodians, and compliance service providers as necessary to deliver regulated card and wallet services. These partners are subject to their own regulatory obligations and data protection frameworks.',
          'For Legal & Compliance Reasons: We may disclose data to law enforcement or regulatory bodies when required by law.',
          'Business Restructuring & Mergers: If WINITY undergoes a merger, acquisition, or restructuring, personal data may be transferred to the relevant entities.',
          'At Your Request: If you initiate transactions or integrations that require external data sharing, we will facilitate them accordingly.'
        ]} />

        <Para>Certain partners may process data in jurisdictions with differing privacy protections. We ensure contractual safeguards (e.g., Standard Contractual Clauses or equivalent) are in place where legally required.</Para>

        <H2>External Links & Third-Party Services</H2>

        <Para>Our website and digital services may contain links to external platforms, this includes third-party digital wallet providers (e.g., Apple Pay and Google Pay), whose platforms may independently collect and process your information. Since these third-party services operate independently, and use is governed by their respective privacy policies and terms, we encourage users to review their privacy policies before engaging with them. WINITY is not responsible for the privacy practices of external websites or applications.</Para>

        <H2>Data Security & Storage</H2>

        <Para>We implement advanced security protocols, including encryption, secure authentication, and regular security audits, to safeguard user data. While we strive to maintain the highest level of security, we encourage users to take precautions such as using strong passwords and enabling multi-factor authentication.</Para>

        <Para>Data is stored securely using cloud services such as AWS and Google Cloud, ensuring compliance with global security standards.</Para>

        <H2>Cookies and Tracking Technologies</H2>

        <H2>What Are Cookies?</H2>

        <Para>Cookies are small data files that are stored on your device when you visit a website or use an application. These files help optimise user experience, track site usage, and support certain functionalities. WINITY, as well as third-party service providers, may use cookies and similar tracking technologies to enhance performance and ensure security when you access our platforms.</Para>

        <H2>How We Use Cookies</H2>

        <Para>We use cookies to improve your experience, analyse platform performance, and enhance security. These cookies help us:</Para>

        <UL items={[
          'Maintain user sessions and keep you signed in.',
          'Recognise user preferences and optimise the platform for a smoother experience.',
          'Monitor and analyse website traffic to improve our services.',
          'Track engagement with advertisements or marketing campaigns.'
        ]} />

        <Para>Cookies also allow us to generate anonymised statistical reports that help refine our platform’s performance and security measures.</Para>

        <H2>Types of Cookies We Use</H2>

        <UL items={[
          'Essential Cookies: Required for basic platform functionality, such as account authentication and secure transactions. Disabling these cookies may impact site usability.',
          'Functional Cookies: Enhance your experience by remembering settings and preferences, such as language selection and login credentials.',
          'Performance Cookies: Track website interactions, helping us understand user behaviour and optimise site performance.',
          'Targeting Cookies: Used by advertising and analytics partners to personalise content and deliver relevant marketing material.'
        ]} />

        <H2>Managing Your Cookie Preferences</H2>

        <Para>Most browsers accept cookies by default, but you have the option to modify these settings. You can disable or delete cookies through your browser settings; however, doing so may limit the functionality of certain services.</Para>

        <Para>If you wish to opt out of being tracked by Google Analytics across all websites, you can do so at Google Analytics Opt-Out .</Para>

        <H2>Third-Party Cookies</H2>

        <Para>Our website may contain links to third-party sites that use cookies beyond our control. We encourage users to review their respective privacy policies before interacting with external services.</Para>

        <H2>Your Rights & Choices</H2>

        <Para>As a WINITY user, you have control over your personal data. You can:</Para>

        <UL items={[
          'Request Access or Updates: You may request a copy of your data or correct any inaccuracies by submitting a Data Access Request (DAR) or Data Correction Request (DCR).',
          'Restrict Processing: You can opt-out of certain uses of your data, such as direct marketing, by contacting support@winitylife.com .',
          'Withdraw Consent: You may modify your preferences regarding promotional content at any time.',
          'Request Data Deletion: Under specific conditions, you may request the removal of personal data. However, certain legal and regulatory requirements may prevent immediate deletion.'
        ]} />

        <Para>We aim to process all user requests within 50 days. However, requests may be denied if:</Para>

        <UL items={[
          'They conflict with legal or regulatory obligations.',
          'There are active fraud investigations.',
          'The request lacks sufficient details for processing.'
        ]} />

        <H2>Additional Provisions</H2>

        <H2>Children’s Privacy</H2>

        <Para>Our services are not intended for individuals under 18. If we identify that a minor has provided personal data without parental consent, we will take steps to remove such information immediately.</Para>

        <H2>Risk Considerations</H2>

        <Para>The use of WINITY services involves financial and operational risks associated with virtual assets and digital payments. For a detailed explanation, please refer to our Risk Disclosure document, which should be reviewed in conjunction with this Privacy Policy. This document should be read alongside WINITY Terms of Use and related policies.</Para>

        <H2>Data Retention Policy</H2>

        <Para>We retain user data only for as long as necessary for:</Para>

        <UL items={[
          'Providing our services effectively.',
          'Meeting legal and regulatory requirements.',
          'Detecting fraud and ensuring security.'
        ]} />

        <Para>Once data is no longer required, it is either anonymised or securely deleted, unless legal obligations mandate retention.</Para>

        <H2>Privacy Policy Updates</H2>

        <Para>We may revise this Privacy Policy periodically. Any substantial changes will be communicated via email or app notifications. Continued use of our services after updates indicates your acceptance of the revised policy.</Para>

        <H2>Contact WINITY</H2>

        <Para>For privacy-related inquiries, please reach out to us:</Para>

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
