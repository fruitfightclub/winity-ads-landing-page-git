/**
 * HomePage — Winity Life | Emerald Noir
 * Assembles all homepage sections in sequence
 */
import SEO from '../components/SEO'
import HeroSection from '../sections/HeroSection'
import StatsTicker from '../sections/StatsTicker'
import CardsSection from '../sections/CardsSection'
import UseCasesSection from '../sections/UseCasesSection'
import HowItWorks from '../sections/HowItWorks'
import GlobeSection from '../sections/GlobeSection'
import LoyaltySection from '../sections/LoyaltySection'
import ExperiencePanels from '../sections/ExperiencePanels'
import BlogStrip from '../sections/BlogStrip'
import JoinCTA from '../sections/JoinCTA'

export default function HomePage() {
  return (
    <>
      <SEO
        title="Winity Life | Global Visa Card & Payments Platform"
        description="Spend digital assets globally with a Winity Visa card. Supports USDT, USDC, ETH, SOL and more. Earn points on every purchase. Available in 180+ countries wherever Visa is accepted."
        canonicalUrl="https://winity.life"
        ogImage="/og-image.webp"
      />

      {/* Section 1 — Hero */}
      <HeroSection />

      {/* Section 2 — Winity Life Experience panels */}
      <ExperiencePanels />

      {/* Section 3 — How It Works */}
      <HowItWorks />

      {/* Section 4 — Cards comparison */}
      <CardsSection />

      {/* Section 5 — Real-world use cases */}
      <UseCasesSection />

      {/* Section 6 — Global reach & Ecosystem */}
      <GlobeSection />

      {/* Section 8 — Loyalty points programme */}
      <LoyaltySection />

{/* Section 10 — Blog strip */}
      <BlogStrip />

      {/* Section 11 — Final CTA with copper arch */}
      <JoinCTA />
    </>
  )
}
