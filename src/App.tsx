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
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
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
import LegalIndexPage from './pages/LegalIndexPage'
import CardAvailabilityPage from './pages/CardAvailabilityPage'
import DeleteAccountPage from './pages/DeleteAccountPage'
import FAQsPage from './pages/FAQsPage'

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

// Scroll progress bar — thin mint line across the top of the viewport
function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? (scrolled / total) * 100 : 0
      if (barRef.current) barRef.current.style.width = `${pct}%`
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <div id="scroll-progress" ref={barRef} aria-hidden="true" />
}

// Global ripple — attaches one delegated listener so every .btn-ripple-target gets feedback
function RippleInit() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as Element).closest(
        '.btn-primary,.btn-pill,.btn-pill-outline,.btn-glass,.btn-glass-copper,.btn-copper'
      ) as HTMLElement | null
      if (!target) return
      const rect = target.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2
      const ripple = document.createElement('span')
      ripple.className = 'btn-ripple'
      ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`
      target.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true })
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])
  return null
}

function AppInner() {
  return (
    <LenisProvider>
      <ScrollProgress />
      <RippleInit />
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
          <Route path="/support" element={<SupportPage />} />
          <Route path="/fees" element={<FeesPage />} />
          <Route path="/risk" element={<RiskPage />} />
          <Route path="/google-pay-tc" element={<GooglePayPage />} />

          {/* ── WordPress slug redirects ── */}

          {/* Pages: slug mismatches */}
          <Route path="/blogs" element={<Navigate replace to="/blog" />} />
          <Route path="/exclusive-card" element={<Navigate replace to="/exclusive" />} />
          <Route path="/help" element={<Navigate replace to="/support" />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/card-availability" element={<CardAvailabilityPage />} />
          <Route path="/delete-account" element={<DeleteAccountPage />} />

          {/* Legal: WP nested paths → React equivalents */}
          <Route path="/legal/privacypolicy" element={<Navigate replace to="/privacy" />} />
          <Route path="/legal/termsofuse" element={<Navigate replace to="/terms" />} />
          <Route path="/legal/riskdisclosure" element={<Navigate replace to="/risk" />} />
          <Route path="/legal/googlepay-tnc" element={<Navigate replace to="/google-pay-tc" />} />
          {/* Legal sub-pages pending content migration → terms in the interim */}
          <Route path="/legal" element={<LegalIndexPage />} />
          <Route path="/legal/free-physical-exclusive-card-terms" element={<Navigate replace to="/terms" />} />
          <Route path="/legal/referral-program-terms" element={<Navigate replace to="/terms" />} />
          <Route path="/legal/cny-tiered-spend-rewards-terms" element={<Navigate replace to="/terms" />} />
          <Route path="/legal/winter-bonus-terms" element={<Navigate replace to="/terms" />} />

          {/* Blog: WP root-level slugs → /blog/slug */}
          <Route path="/how-to-spend-your-usdt-without-sending-it-to-a-bank-first-2026-guide" element={<Navigate replace to="/blog/how-to-spend-usdt-without-a-bank-2026" />} />
          <Route path="/guide-to-spend-like-a-stallion-winitys-cny-tiered-rewards" element={<Navigate replace to="/blog/guide-to-spend-like-a-stallion-winitys-cny-tiered-rewards" />} />
          <Route path="/spend-like-a-stallion-on-the-move-7-ways-winity-life-makes-your-cny-travels-smoother" element={<Navigate replace to="/blog/7-ways-winity-life-makes-your-cny-travels-smoother" />} />
          <Route path="/winity-life-launches-your-card-on-us-campaign-to-reward-active-users" element={<Navigate replace to="/blog/winity-life-launches-your-card-on-us-campaign" />} />
          <Route path="/winity-life-launches-winity-loop-a-referral-program-that-turns-everyday-spending-into-shared-value" element={<Navigate replace to="/blog/winity-life-launches-winity-loop-referral-program" />} />
          <Route path="/winity-life-unveils-christmas-that-keeps-giving" element={<Navigate replace to="/blog/winity-life-unveils-christmas-that-keeps-giving" />} />
          <Route path="/winity-life-launches-its-first-visa-card-and-mobile-app" element={<Navigate replace to="/blog/winity-life-launches-its-first-visa-card-and-mobile-app" />} />
          <Route path="/kyc-reimagined-from-verification-to-activation" element={<Navigate replace to="/blog/kyc-reimagined-from-verification-to-activation" />} />
          <Route path="/share-the-freedom-how-winity-loop-rewards-you-and-your-friends" element={<Navigate replace to="/blog/share-the-freedom-how-winity-loop-rewards-you-and-your-friends" />} />

          {/* Pages pending content */}
          <Route path="/thank-you" element={<Navigate replace to="/" />} />

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
