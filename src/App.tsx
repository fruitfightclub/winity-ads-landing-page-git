/**
 * ---
 * client: Winity Life
 * philosophy: Emerald Noir
 * colors:
 *   primary: "#0B2E2C"
 *   accent: "#21E6A7"
 * deliverable: Website App Router
 * phase: 5
 * skills_used: [tss-master, tss-frontend-pro, tss-canvas-design]
 * date: 2026-05-02
 * status: Production
 * ---
 */
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import LenisProvider from './components/LenisProvider'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ExclusivePage from './pages/ExclusivePage'
import ExecutivePage from './pages/ExecutivePage'
import LoyaltyPage from './pages/LoyaltyPage'
import ReferralPage from './pages/ReferralPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import BusinessPage from './pages/BusinessPage'
import PressRoomPage from './pages/PressRoomPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import SupportPage from './pages/SupportPage'
import FeesPage from './pages/FeesPage'
import RiskPage from './pages/RiskPage'
import GooglePayPage from './pages/GooglePayPage'

// Scroll to top on route change — skips scrollTo when a hash target is present
function ScrollReset() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
    } else {
      // Give React time to render the destination page before scrolling
      const id = hash.slice(1)
      const timer = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          window.scrollTo(0, 0)
        }
      }, 120)
      return () => clearTimeout(timer)
    }
  }, [pathname, hash])
  return null
}

function AppInner() {
  return (
    <LenisProvider>
      <ScrollReset />
      <Navigation />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exclusive" element={<ExclusivePage />} />
          <Route path="/executive" element={<ExecutivePage />} />
          <Route path="/loyalty" element={<LoyaltyPage />} />
          <Route path="/referral" element={<ReferralPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/press" element={<PressRoomPage />} />
          <Route path="/press-room" element={<PressRoomPage />} />
          <Route path="/business" element={<BusinessPage />} />
          {/* Legal & Support */}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/help" element={<SupportPage />} />
          <Route path="/fees" element={<FeesPage />} />
          <Route path="/risk" element={<RiskPage />} />
          <Route path="/google-pay-tc" element={<GooglePayPage />} />
          {/* Catch-all → home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </LenisProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
