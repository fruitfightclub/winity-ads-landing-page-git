import { LegalShell, H2, Para, UL, Divider } from './LegalPageShell'
import SEO from '../components/SEO'

export default function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service | Winity Life"
        description="Terms and conditions governing use of the Winity Life platform and card services."
      />
      <LegalShell
        title="Terms of Service"
        subtitle="The rules governing use of the Winity Life platform and digital-asset-linked Visa card."
        updated="1st of August 2025"
      >
        <H2>Introduction</H2>

        <Para>These Terms and Conditions (“Terms”) govern the use of the WINITY card program and associated services provided by WTY Technology Hong Kong Limited (“Company,” “we,” “us,” “our”). By creating an account or using any part of the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. Participation is limited to approved users whose usage aligns with commercial objectives and is not open to the general public.</Para>

        <H2>Document Scope</H2>

        <Para>This Terms of Use governs access to and participation in the WINITY card program and associated financial services provided by WTY Technology Hongkong Limited. It outlines eligibility, user responsibilities, transaction limits, supported currencies, legal rights, and obligations. This document must be read in conjunction with the WINITY Privacy Policy , Risk Disclosure , and any applicable third-party Partner or card issuer terms.</Para>

        <H2>1. Definitions and Interpretation</H2>

        <H2>1.1 Definitions</H2>

        <Para>For the purposes of these Terms, the following terms shall have the meanings set out below:</Para>

        <UL items={[
          '“Account” means a user’s registered access to the WINITY Services.',
          '“Card” means a payment card issued by a licensed Partner via the Visa® network, including virtual and physical cards.',
          '“Custody Wallet” means a wallet provided by a Partner for the temporary holding and conversion of supported digital assets.',
          '“Fees and Limits” means all thresholds, minimum balances, fees, and other charges set out in Annex A.',
          '“Partner” means an authorised third-party issuer, custodian, processor, or vendor engaged in providing regulated services to support the WINITY program.',
          '“Services” means the WINITY platform, mobile applications, dashboards, websites, cards, and associated features.',
          '“Digital Wallet” means Apple Pay, Google Pay, or any supported third-party contactless payment platform that may be used in conjunction with the Card.'
        ]} />

        <H2>1.2 Interpretation</H2>

        <UL items={[
          'Headings are for convenience only and shall not affect interpretation.',
          'References to “you” or “user” include any approved account holder.',
          'Unless otherwise stated, monetary amounts are in United States Dollars (USD).'
        ]} />

        <H2>2. Program Overview</H2>

        <H2>2.1 Nature of Services</H2>

        <Para>WINITY provides a commercial-use payment card program in cooperation with licensed Partners. WINITY is a technology provider and program manager and is not a bank, custodian, or financial institution.</Para>

        <H2>2.2 Partner Role</H2>

        <Para>Licensed Partners provide regulated activities such as card issuance, custody, digital asset conversion, and settlement. By using the Services, you agree to any separate Partner terms applicable to these activities.</Para>

        <H2>2.3 Visa® Network</H2>

        <Para>Cards may be used wherever Visa® is accepted, subject to merchant capability, applicable law, and the restrictions set out in these Terms.</Para>

        <H2>3. Eligibility and Access Restrictions</H2>

        <H2>3.1 Approved Users Only</H2>

        <UL items={[
          'Access is not available to the general public.',
          'Only approved users whose participation aligns with commercial or business-linked use cases may access the Services.'
        ]} />

        <H2>3.2 Age and Legal Capacity</H2>

        <Para>You must be at least the age of majority in your jurisdiction and capable of entering legally binding contracts.</Para>

        <H2>3.3 Sanctions Restrictions</H2>

        <Para>You may not use the Services if you are subject to economic or trade sanctions, or ordinarily resident in a sanctioned territory. See Annex B.</Para>

        <H2>3.4 Right to Refuse or Suspend</H2>

        <Para>We may refuse, restrict, or revoke access at our discretion, including but not limited to suspected fraud, noncompliance with these Terms, or as required by law.</Para>

        <H2>4. Card Issuance and Activation</H2>

        <H2>4.1 Issuance</H2>

        <Para>Cards are issued by licensed Partners and remain the property of the issuer. Cards may be offered in virtual or physical form.</Para>

        <H2>4.2 Activation</H2>

        <UL items={[
          'Cards must be activated using the instructions provided in the WINITY platform.',
          'Virtual cards that do not meet the minimum deposit threshold within 14 days may be deactivated (see Annex A).'
        ]} />

        <H2>4.3 Reissuance</H2>

        <Para>Lost, stolen, or compromised cards may be replaced subject to applicable fees and limits.</Para>

        <H2>4.4 Ownership</H2>

        <Para>Cards are issued solely for the use of the approved account holder. They may not be transferred, loaned, or assigned.</Para>

        <H2>5. Supported Currencies and Digital Asset Conversion</H2>

        <H2>5.1 Conversion Requirement</H2>

        <UL items={[
          'Supported digital assets (where permitted for funding) are converted to USD prior to card use.',
          'No digital assets are ever loaded directly onto cards.'
        ]} />

        <H2>5.2 Conversion Rates</H2>

        <Para>Partners determine the exchange rate and method at the time of settlement. WINITY does not guarantee rates or conversion times.</Para>

        <H2>5.3 Unsupported Assets</H2>

        <Para>Assets not supported by the platform may be permanently lost if sent to custody addresses.</Para>

        <H2>6. Card Usage Guidelines</H2>

        <H2>6.1 Permitted Use</H2>

        <UL items={[
          'Cards can be used for legitimate purchases and ATM withdrawals where Visa® is accepted.',
          'Users must comply with all applicable laws and network rules.'
        ]} />

        <H2>6.2 Prohibited Use</H2>

        <Para>Cards may not be used for:</Para>

        <UL items={[
          'Illegal or fraudulent transactions;',
          'Cash equivalent purchases where restricted;',
          'Transactions that violate sanctions or Partner policies;',
          'Activity inconsistent with commercial or business-linked use.'
        ]} />

        <H2>6.3 User Responsibility</H2>

        <Para>You are responsible for:</Para>

        <UL items={[
          'Safeguarding card numbers, CVVs, and login credentials;',
          'Monitoring account activity and reporting unauthorised use immediately;',
          'Complying with transaction limits and maintaining sufficient balances (see Annex A).'
        ]} />

        <H2>6.4 Network Acceptance</H2>

        <Para>Acceptance at merchants and ATMs is subject to merchant capability and local regulations. WINITY is not responsible if a merchant refuses your card.</Para>

        <H2>7. Limits, Fees, and Charges</H2>

        <H2>7.1 General</H2>

        <Para>7.1.1 All limits, thresholds, and fees applicable to your use of the Services are set out in Annex A – Fees and Limits and/or as disclosed within the WINITY platform at the time of use.</Para>

        <Para>7.1.2 We and our Partners may introduce, modify, or remove limits and fees from time to time, where permitted by law and network rules. Any such changes will be effective when posted in the platform, unless otherwise required by law.</Para>

        <Para>7.1.3 You are responsible for reviewing applicable limits and fees before initiating transactions. Initiating a transaction constitutes acceptance of the applicable limits and fees.</Para>

        <H2>7.2 Limits</H2>

        <Para>7.2.1 Limits may include, without limitation, minimum balances, daily/monthly transaction caps, ATM withdrawal limits, and per transaction authorisation limits.</Para>

        <Para>7.2.2 Limits may differ by user, product tier, usage history, jurisdiction, and risk profile and may be adjusted at any time for risk, compliance, or operational reasons.</Para>

        <Para>7.2.3 Regulatory, network, or Partner imposed limits may apply in addition to limits specified by WINITY.</Para>

        <H2>7.3 Fees</H2>

        <Para>7.3.1 Fees may apply to account activation, card issuance/replacement, ATM usage, foreign exchange, dispute handling, and other services as disclosed.</Para>

        <Para>7.3.2 Third parties (e.g., ATM operators, merchants) may charge additional fees; WINITY does not control such fees.</Para>

        <Para>7.3.3 Fees are generally nonrefundable unless required by law or network rules.</Para>

        <H2>7.4 Currency, Conversion & FX</H2>

        <Para>7.4.1 Supported digital assets (where permitted) are converted to USD prior to card use. No digital assets are ever loaded onto the card.</Para>

        <Para>7.4.2 FX and conversion parameters are set by Partners at the time of settlement. Final amounts may vary due to network adjustments, merchant tips, or currency fluctuations.</Para>

        <H2>7.5 More Information</H2>

        <Para>For more information on limits, fees, charges, and benefits download our app. Customers may request a detailed account statement; a fee of $5 will apply to each request.</Para>

        <H2>8. Account Security and User Responsibilities</H2>

        <H2>8.1 Account Security</H2>

        <Para>8.1.1 You must maintain the security of your credentials (passwords, PINs, 2FA codes) and devices used to access the Services.</Para>

        <Para>8.1.2 You must enable and keep up to date available security features (including multifactor authentication).</Para>

        <Para>8.1.3 You must promptly notify WINITY Support if you suspect unauthorised access, loss, or compromise of your credentials or card details.</Para>

        <H2>8.2 Accurate Information</H2>

        <Para>8.2.1 You represent that all information provided to WINITY or Partners is accurate, complete, and not misleading.</Para>

        <Para>8.2.2 You must keep your contact and verification information current. Failure to do so may result in transaction declines, holds, or suspension.</Para>

        <H2>8.3 Device and Network</H2>

        <Para>8.3.1 You are responsible for securing your devices and networks used to access the Services, including installing updates and reputable antimalware.</Para>

        <Para>8.3.2 WINITY is not responsible for losses arising from your device or network vulnerabilities or from the actions of third parties who gain access due to your failure to secure your environment.</Para>

        <H2>8.4 Records and Monitoring</H2>

        <Para>8.4.1 You should regularly review your transactions and statements available through the platform.</Para>

        <Para>8.4.2 You must promptly report any errors, discrepancies, or suspicious activity.</Para>

        <H2>9. Compliance with Regulations</H2>

        <H2>9.1 KYC/KYB, AML/CTF, and Sanctions</H2>

        <Para>9.1.1 You agree to all identity, business verification (if applicable), and ongoing monitoring requirements required by WINITY or Partners.</Para>

        <Para>9.1.2 You must provide additional information or documentation upon request; failure to do so may lead to delays, declines, or suspension of Services.</Para>

        <Para>9.1.3 You may not use the Services if you are subject to applicable sanctions or are ordinarily resident in a sanctioned jurisdiction (see Annex B).</Para>

        <H2>9.2 Transaction Monitoring</H2>

        <Para>9.2.1 Transactions may be screened and monitored for risk and compliance purposes.</Para>

        <Para>9.2.2 We may delay, decline, or reverse transactions, impose holds, or request further information to satisfy regulatory obligations.</Para>

        <H2>9.3 Use Consistent with Commercial Purposes</H2>

        <Para>9.3.1 Program access is limited to approved users whose participation aligns with commercial or business-linked purposes and is not open to the general public.</Para>

        <Para>9.3.2 We may restrict access if use is inconsistent with these purposes or appears to target consumer/retail functionality contrary to program rules.</Para>

        <H2>10. Fraud Prevention and Transaction Monitoring</H2>

        <H2>10.1 Fraud Controls</H2>

        <Para>10.1.1 We and Partners use automated and manual tools to detect and mitigate fraudulent activity.</Para>

        <Para>10.1.2 Transactions may be blocked, reversed, or subject to additional checks to manage fraud, chargeback risk, or network compliance.</Para>

        <H2>10.2 Holds and Reversals</H2>

        <Para>10.2.1 Authorisation holds may apply; final settlement amounts can differ due to adjustments by merchants (e.g., tips, preauth releases).</Para>

        <Para>10.2.2 Where fraud or error is suspected, we may place temporary holds or reverse transactions in accordance with applicable rules and laws.</Para>

        <H2>10.3 User Cooperation</H2>

        <Para>10.3.1 You agree to cooperate with any fraud investigation, including providing timely information and evidence.</Para>

        <Para>10.3.2 Failure to cooperate may result in denial of claims and/or account suspension.</Para>

        <H2>11. Liability and Limitations</H2>

        <H2>11.1 No Warranties</H2>

        <Para>11.1.1 The Services are provided “as is” and “as available.” To the maximum extent permitted by law, we disclaim all warranties not expressly stated in these Terms.</Para>

        <H2>11.2 Limitation of Liability</H2>

        <Para>11.2.1 To the fullest extent permitted by law, WINITY, its affiliates, and Partners shall not be liable for indirect, incidental, special, consequential, punitive, or exemplary damages, or for loss of profits, data, or business, even if advised of the possibility of such damages.</Para>

        <Para>11.2.2 Our aggregate liability to you for claims arising out of or in connection with the Services shall not exceed USD 500 or the total fees paid by you to us during the 12 months preceding the event giving rise to the claim, whichever is lower, except where prohibited by law.</Para>

        <H2>11.3 Network, Partner, and Third Parties</H2>

        <Para>11.3.1 We are not responsible for the actions or omissions of Partners, card networks, merchants, ATM operators, systems or other third parties.</Para>

        <Para>11.3.2 Acceptance of the Card is at the discretion of merchants and ATM operators; we are not liable for refusal or technical failures outside our control.</Para>

        <H2>11.4 Your Responsibilities</H2>

        <Para>11.4.1 You are responsible for losses resulting from your failure to secure credentials, devices, or account access; from wilful or negligent acts; or from breaches of these Terms.</Para>

        <Para>11.4.2 You must promptly notify us of any unauthorised transactions; delay may prejudice your ability to recover funds per network rules.</Para>

        <H2>11.5 Risk Acknowledgment</H2>

        <Para>By using WINITY services, you acknowledge that engagement with digital assets and associated services may involve risk, including market volatility, regulatory changes, and platform disruptions. You acknowledge that there is also standard inherent risk that digital assets may decrease or lose their value.</Para>

        <Para>For a full outline of potential risks, please review our Risk Disclosure available at https://winity.life/legal/riskdisclosure/ . WINITY does not provide financial, investment, or legal advice.</Para>

        <H2>12. Suspension, Termination, and Card Expiry</H2>

        <H2>12.1 Suspension/Termination</H2>

        <Para>12.1.1 We may suspend or terminate your access immediately (with or without notice) where permitted by law, including for suspected fraud, noncompliance, or risk concerns.</Para>

        <Para>12.1.2 Partners may likewise suspend or terminate access in accordance with their policies and legal obligations.</Para>

        <H2>12.2 Dormancy</H2>

        <Para>12.2.1 We may designate an account as dormant after a period of inactivity and take actions permitted by law and these Terms.</Para>

        <Para>12.2.2 Reasonable administrative measures may apply to dormant accounts where permitted by law and disclosed in the platform.</Para>

        <H2>12.3 Card Expiry and Replacement</H2>

        <Para>12.3.1 Cards expire on the date shown. You may request a replacement subject to applicable fees and eligibility.</Para>

        <Para>12.3.2 We may refuse replacement or reissuance at our discretion, including for risk or compliance reasons.</Para>

        <H2>12.4 Effect of Termination</H2>

        <Para>12.4.1 On termination, your right to use the Services and any Cards ceases. Outstanding obligations, including fees and chargebacks, survive termination.</Para>

        <Para>12.4.2 We may retain information as required by law and for legitimate business purposes, upon termination of the Services.</Para>

        <H2>13. Data Privacy and Communication</H2>

        <H2>13.1 Privacy Policy</H2>

        <Para>13.1.1 Your personal data is processed in accordance with the WINITY Privacy Policy, which explains how we collect, use, disclose, and transfer data.</Para>

        <Para>13.1.2 By using the Services, you consent to processing and international data transfers necessary for the provision of Services and for compliance purposes.</Para>

        <Para>13.1.3 Use of the WINITY platform is subject to our Privacy Policy, which outlines how personal data is collected, processed, stored, and shared. By accepting these Terms, you also agree to the terms set out in the Privacy Policy, accessible at https://winity.life/legal/privacypolicy/ .</Para>

        <Para>13.1.4 WINITY platforms may use cookies and other tracking technologies to enhance security, monitor engagement, and personalise your experience. Details are available in our Privacy Policy.</Para>

        <H2>13.2 Communications</H2>

        <Para>13.2.1 You consent to receive electronic communications, including notices, disclosures, and statements, via the platform or email.</Para>

        <Para>13.2.2 You must keep your contact information current; undelivered communications are deemed provided when sent to your last known details.</Para>

        <H2>13.3 Records</H2>

        <Para>13.3.1 We may maintain records of communications and transactions as required by law and for program governance.</Para>

        <Para>13.3.2 You should download or retain copies of statements and notices for your records.</Para>

        <H2>14. Customer Support and Dispute Resolution</H2>

        <H2>14.1 Support Channels</H2>

        <Para>14.1.1 For assistance, contact support@winity.life . Additional contact methods may be listed in the platform.</Para>

        <Para>14.1.2 We will make reasonable efforts to respond promptly, but response times may vary.</Para>

        <H2>14.2 Transaction Disputes and Chargebacks</H2>

        <Para>14.2.1 If you believe a transaction is unauthorised or incorrect, you must notify WINITY Support as soon as possible and within any time limits required by card network or issuer rules.</Para>

        <Para>14.2.2 You must provide all information and documentation requested to support your dispute.</Para>

        <Para>14.2.3 Submission of a dispute does not guarantee recovery. Outcomes depend on network and issuer rules, evidence, and merchant response. Fees may apply where permitted. You agree that all decisions made by WINITY are final and binding.</Para>

        <H2>14.3 Refunds and Reversals</H2>

        <Para>14.3.1 Refunds are processed according to network and merchant procedures. Processing times may vary; WINITY does not control merchant or issuer timelines.</Para>

        <Para>14.3.2 Where a reversal is initiated due to error or risk, we will act in accordance with applicable law and network rules. You agree that all decisions made by WINITY are final and binding.</Para>

        <H2>14.4 Escalation</H2>

        <Para>14.4.1 If a matter remains unresolved after contacting support, you may follow the formal dispute resolution process set out in Section 16 (Governing Law and Arbitration).</Para>

        <H2>15. Amendments to Terms</H2>

        <H2>15.1 Changes</H2>

        <Para>15.1.1 We may update these Terms to reflect operational, legal, or network requirements. Material changes will be notified where required by law.</Para>

        <Para>15.1.2 The latest version will be posted in the platform and is effective when posted unless otherwise required.</Para>

        <H2>15.2 Continued Use</H2>

        <Para>15.2.1 Your continued use of the Services after changes take effect constitutes acceptance of the updated Terms.</Para>

        <Para>15.2.2 If you do not agree to the changes, you must discontinue use and, if applicable, request immediate account closure, wherein you remain liable for all your other obligations until discharged.</Para>

        <H2>16. Governing Law and Arbitration</H2>

        <H2>16.1 Governing Law</H2>

        <Para>16.1.1 These Terms and any noncontractual obligations arising out of or in connection with them are governed by the laws of Hong Kong.</Para>

        <H2>16.2 Arbitration</H2>

        <Para>16.2.1 Notwithstanding any other relevant laws, by agreeing to this Agreement, you contractually agree to be bound by this arbitration provision and you waive your rights absolutely to any class action to resolve any disputes that occur.</Para>

        <Para>16.2.2 Any dispute that cannot be resolved through WINITY Support within 60 days shall be referred to and finally resolved by arbitration administered by the Hong Kong International Arbitration Centre (HKIAC) under the HKIAC Administered Arbitration Rules then in force. The seat of arbitration shall be Hong Kong, presided over by a single arbitrator. The language of arbitration shall be English.</Para>

        <Para>16.2.3 Nothing in these Terms prevents WINITY from seeking interim or injunctive relief from a court of competent jurisdiction.</Para>

        <H2>Annex A – Fees and Limits</H2>

        <Para>A1. General A1.1 All monetary amounts indicated with “$” represent United States Dollars (USD).</Para>

        <Para>A1.2 WINITY may revise fees, thresholds, and related terms at its discretion, in accordance with applicable regulations. Updates will be posted in the platform. Continued use implies acceptance. A2. Minimum Funding and Balance A2.1 Virtual Card Activation Funding: Accounts that activate a virtual card but do not receive a minimum deposit of USD 25.00 within 14 days will have the virtual card automatically deactivated. This does not apply to virtual cards connected to an active physical card. Users may reissue a card at any time.</Para>

        <Para>A2.2 Minimum Balance for Card Usage: A minimum balance of USD 25 is required to complete card transactions. If your balance falls below this threshold, card usage will be temporarily disabled until the balance is restored. A3. Card Quantity and Restrictions A3.1 If a user surpasses the permitted number of active cards, their account may be temporarily restricted. Please contact WINITY Support for assistance. A4. Additional Notes A4.1 Third parties (e.g., ATM operators) may apply separate fees that WINITY does not control.</Para>

        <Para>A4.2 Limits may vary based on user profile, program tier, and risk considerations; additional regulatory limits may apply.</Para>

        <H2>Annex B – Restricted Jurisdictions and Sanctions Policy</H2>

        <Para>B1. Sanctions and Watchlists B1.1 You may not access or use the Services if you are domiciled, ordinarily resident in, or a national of a country or territory subject to comprehensive sanctions, or if you appear on relevant government watchlists, denied persons lists, or similar restrictions.</Para>

        <Para>B1.2 We and our Partners reserve the right to refuse, restrict, or terminate access where required by law, by card network rules, or by Partner policy. B2. Changes to Sanctions Landscape B2.1 Sanctions regimes may change without notice. Continued access is subject to ongoing screening and compliance checks.</Para>

        <H2>Annex C – Partner Roles and Disclaimers</H2>

        <Para>C1. Roles C1.1 Card Issuer / Program Manager: Licensed Partner(s) responsible for card issuance and network connectivity. Cards remain the property of the issuer.</Para>

        <Para>C1.2 Custody & Conversion: Licensed providers offering custody of supported digital assets and conversion to USD prior to card use.</Para>

        <Para>C1.3 Payment Processing & KYC/AML: Third-party processors and compliance vendors facilitating transaction processing, identity verification, monitoring, and screening. C2. Separate Terms C2.1 Access to specific features may require acceptance of additional Partner terms, which govern those features and prevail where applicable. C3. Disclaimer C3.1 WINITY is a technology platform and program manager and is not liable for Partner actions or omissions beyond its role, except as required by law.</Para>

        <H2>Contact WINITY</H2>

        <Para>For inquiries related to this document, please contact us at:</Para>

        <UL items={[
          'Support: support@winity.life',
          'Legal: legal@winity.life',
          'Website: https://www.winity.life'
        ]} />

        <Para>By using WINITY, and any and all of our services and platforms, you acknowledge that you have read, understood, and agreed to the information and disclaimers set out herein, and that this document should be read alongside WINITY risk disclosure , privacy policy and related policies.</Para>

        <Divider />

        <p style={{fontSize: 12, color: 'rgba(240,237,230,0.28)', lineHeight: 1.6}}>Version: 1.0 Last Updated: 1st of August 2025</p>
      </LegalShell>
    </>
  )
}
