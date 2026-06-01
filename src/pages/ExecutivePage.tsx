/**
 * ---
 * client: Winity Life
 * philosophy: Emerald Noir
 * colors:
 *   primary: "#0B2E2C"
 *   accent: "#21E6A7"
 *   executive: "#B87333"
 * deliverable: Executive Card — Coming Soon Page + Waitlist Popup
 * phase: 6
 * date: 2026-05-26
 * status: Draft
 * skills_used: tss-master, tss-frontend-pro, tss-creative-components
 * ---
 *
 * EXECUTIVE CARD — COMING SOON
 * Full-viewport dark cinematic page with copper glow.
 * Popup waitlist form — ready to wire to Google Sheets / Airtable / webhook.
 * To connect: replace handleSubmit() body with your POST endpoint.
 */

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, X, Check } from 'lucide-react'
import SEO from '../components/SEO'

// ─── Easing ──────────────────────────────────────────────────────────────────
const EASE_POWER = 'cubic-bezier(0.16, 1, 0.3, 1)'

// ─── Palette ─────────────────────────────────────────────────────────────────
const MINT = '#21E6A7'
const MINT_HI = '#3CF2D0'
const TEAL = '#0ABFAA'

// ─── Grain ───────────────────────────────────────────────────────────────────
const GrainOverlay = () => (
  <svg
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 w-full h-full z-10 opacity-[0.035]"
    style={{ mixBlendMode: 'overlay' }}
  >
    <filter id="grain-exec-cs">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain-exec-cs)" />
  </svg>
)

// ─── Country list ─────────────────────────────────────────────────────────────
const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia',
  'Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium',
  'Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria',
  'Burkina Faso','Burundi','Cambodia','Cameroon','Canada','Cape Verde','Chad','Chile','China','Colombia',
  'Congo','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic','Denmark','Dominican Republic',
  'Ecuador','Egypt','El Salvador','Estonia','Ethiopia','Fiji','Finland','France','Gabon','Georgia',
  'Germany','Ghana','Greece','Guatemala','Guyana','Haiti','Honduras','Hungary','Iceland','India',
  'Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya',
  'Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Liberia','Libya','Lithuania','Luxembourg','Malaysia',
  'Maldives','Malta','Mauritius','Mexico','Moldova','Monaco','Mongolia','Montenegro','Morocco',
  'Mozambique','Myanmar','Namibia','Nepal','Netherlands','New Zealand','Nicaragua','Nigeria','Norway',
  'Oman','Pakistan','Panama','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania',
  'Russia','Rwanda','Saudi Arabia','Senegal','Serbia','Seychelles','Singapore','Slovakia','Slovenia',
  'Somalia','South Africa','South Korea','Spain','Sri Lanka','Sudan','Sweden','Switzerland','Taiwan',
  'Tajikistan','Tanzania','Thailand','Togo','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan',
  'Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan',
  'Venezuela','Vietnam','Yemen','Zambia','Zimbabwe',
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function ExecutivePage() {
  const [modalOpen, setModalOpen]   = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', country: '', phone: '',
  })

  const pageRef   = useRef<HTMLDivElement>(null)
  const copyRef   = useRef<HTMLDivElement>(null)
  const modalRef  = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  // ── Page entrance animations ───────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (copyRef.current) {
        gsap.fromTo(
          copyRef.current.querySelectorAll('.page-line'),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.15, ease: EASE_POWER, stagger: 0.13, delay: 0.25 }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  // ── Modal open/close animations ────────────────────────────────────────────
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
      if (backdropRef.current && modalRef.current) {
        gsap.fromTo(backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.35, ease: EASE_POWER }
        )
        gsap.fromTo(modalRef.current,
          { y: 40, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: EASE_POWER }
        )
      }
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  const closeModal = () => {
    if (!backdropRef.current || !modalRef.current) { setModalOpen(false); return }
    gsap.to(modalRef.current, {
      y: 20, opacity: 0, scale: 0.97, duration: 0.3,
      ease: 'cubic-bezier(0.45, 0, 0.55, 1)',
      onComplete: () => setModalOpen(false),
    })
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: 'none' })
  }

  // ── Form submit ────────────────────────────────────────────────────────────
  // TODO: Replace this body with a POST to your Google Sheets webhook / Airtable / CRM endpoint.
  // Example (Google Apps Script web app):
  //   await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
  //     method: 'POST',
  //     body: JSON.stringify(formData),
  //   })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // Simulated delay — replace with real API call
    await new Promise((res) => setTimeout(res, 1400))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <>
      <SEO
        title="Winity Executive Card | Coming Soon | Winity Life"
        description="The Winity Executive metal card is coming. Join the waitlist and be the first to know when it launches."
      />

      {/* ── FULL VIEWPORT PAGE ──────────────────────────────────────────── */}
      <div
        ref={pageRef}
        className="relative min-h-screen overflow-hidden bg-[#061C1E]"
      >
        {/* Cinematic hero background */}
        <div className="absolute inset-0 z-0">
          {/* Primary background image */}
          <img
            src="/EXECUTIVE_PAGE_BACKGROUND.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center pointer-events-none select-none"
          />
          {/* Dark overlay — heavier on the left so white text is highly readable, lighter on the right */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to left, rgba(6,28,30,0.35) 0%, rgba(6,28,30,0.55) 45%, rgba(6,28,30,0.88) 75%, rgba(6,28,30,0.96) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(6,28,30,0.4) 0%, rgba(6,28,30,0.05) 35%, rgba(6,28,30,0.55) 80%, rgba(6,28,30,0.95) 100%)',
            }}
          />
          {/* Copper ambient accent */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 30% 40%, rgba(184,115,51,0.12) 0%, transparent 70%)',
            }}
          />
        </div>

        <GrainOverlay />

        {/* Content — left-aligned so card creative on the right is unobstructed */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-start"
          style={{ padding: 'clamp(80px, 10vh, 120px) clamp(24px, 7vw, 120px)' }}
        >
        <div ref={copyRef} className="flex flex-col items-start text-left" style={{ maxWidth: 520, width: '100%' }}>

          {/* Coming Soon badge */}
          <div className="page-line mb-8">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase px-4 py-2 rounded-full"
              style={{ background: 'rgba(33,230,167,0.08)', border: '1px solid rgba(33,230,167,0.25)', color: MINT }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: MINT }}
              />
              Coming Soon
            </span>
          </div>

          {/* Headline */}
          <h1
            className="page-line font-black text-white leading-[1.0] tracking-[-0.045em] mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            Winity{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 50%, #94A3B8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Executive
            </span>
          </h1>

          {/* Sub copy */}
          <p
            className="page-line text-[#8FA3A0] leading-relaxed mb-4 max-w-lg"
            style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)' }}
          >
            Our premium metal card for global business leaders is on its way.
            Metal finish. Best earn rate. 3 GB of complimentary UMI data annually. Priority support.
            Built for those who operate at the highest level.
          </p>

          <p className="page-line text-[#8FA3A0]/60 text-sm mb-12">
            Join the waitlist and be the first to know when it launches.
          </p>

          {/* CTA */}
          <div className="page-line flex flex-wrap gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-semibold text-sm tracking-wide text-[#061C1E] transition-all duration-300 hover:brightness-105 active:scale-[0.98] shadow-lg shadow-[#21E6A7]/10"
              style={{ background: `linear-gradient(135deg, ${MINT} 0%, ${TEAL} 100%)` }}
            >
              Join the Waitlist
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Card specs teaser */}
          <div className="page-line mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {[
              { label: 'Annual Fee',  value: 'USD 1,000' },
              { label: 'Material',    value: 'Premium Metal' },
              { label: 'Free UMI Data', value: '3 GB / Year' },
              { label: 'Earn Rate',   value: '1 pt / USD 8' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-5 text-center"
                style={{
                  background: 'rgba(33,230,167,0.03)',
                  border: '1px solid rgba(33,230,167,0.12)',
                }}
              >
                <p className="text-xs tracking-[0.12em] uppercase mb-1.5" style={{ color: 'rgba(33,230,167,0.7)' }}>
                  {stat.label}
                </p>
                <p className="font-bold text-white text-sm">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
        </div>{/* end right-align wrapper */}

        {/* Bottom legal line */}
        <div
          className="absolute bottom-0 left-0 right-0 py-6 z-20"
          style={{ borderTop: '1px solid rgba(33,230,167,0.1)' }}
        >
          <p className="text-center text-xs text-[#8FA3A0]/50 px-6">
            Card services issued in Hong Kong. Available globally wherever Visa® is accepted.
            Availability may vary by jurisdiction.
          </p>
        </div>
      </div>

      {/* ── WAITLIST MODAL ────────────────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* Backdrop */}
          <div
            ref={backdropRef}
            className="absolute inset-0 cursor-pointer"
            style={{ background: 'rgba(6,28,30,0.88)', backdropFilter: 'blur(10px)' }}
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <div
            ref={modalRef}
            className="relative w-full z-10 rounded-3xl overflow-hidden"
            style={{
              maxWidth: '480px',
              background: 'linear-gradient(145deg, rgba(15,63,58,0.95) 0%, rgba(11,46,44,0.9) 100%)',
              border: '1px solid rgba(33,230,167,0.22)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(33,230,167,0.06)',
            }}
          >
            {/* Top mint-teal gradient bar */}
            <div
              className="absolute top-0 left-8 right-8 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(33,230,167,0.5), transparent)' }}
              aria-hidden="true"
            />

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 z-10"
              style={{ background: 'rgba(255,255,255,0.06)', color: '#8FA3A0' }}
              aria-label="Close"
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#F4F7F6' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#8FA3A0' }}
            >
              <X size={16} />
            </button>

            <div className="p-8 lg:p-10">
              {submitted ? (
                /* ── Success state ── */
                <div className="text-center py-4">
                  <div
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6"
                    style={{ background: 'rgba(33,230,167,0.12)', border: '1px solid rgba(33,230,167,0.25)' }}
                  >
                    <Check size={28} style={{ color: MINT }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">You're on the list.</h3>
                  <p className="text-[#8FA3A0] text-sm leading-relaxed">
                    We'll notify you the moment the Winity Executive card is ready to apply for.
                    Thank you for your interest.
                  </p>
                  <button
                    onClick={closeModal}
                    className="mt-7 inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-[#061C1E] transition-all duration-300 hover:brightness-105"
                    style={{ background: `linear-gradient(135deg, ${MINT} 0%, ${TEAL} 100%)` }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                /* ── Form state ── */
                <>
                  <div className="mb-7">
                    <span
                      className="text-xs font-semibold tracking-[0.18em] uppercase mb-2 inline-block"
                      style={{ color: MINT_HI }}
                    >
                      Executive Waitlist
                    </span>
                    <h2 className="text-xl font-bold text-white tracking-[-0.02em]">
                      Be first in line.
                    </h2>
                    <p className="text-[#8FA3A0] text-sm mt-1">
                      We'll reach out the moment applications open.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'wl-first', label: 'First Name', key: 'firstName', placeholder: 'John' },
                        { id: 'wl-last',  label: 'Last Name',  key: 'lastName',  placeholder: 'Doe' },
                      ].map(({ id, label, key, placeholder }) => (
                        <div key={id}>
                          <label className="block text-xs font-medium text-[#8FA3A0] mb-1.5" htmlFor={id}>
                            {label} <span className="text-mint">*</span>
                          </label>
                          <input
                            id={id}
                            type="text"
                            required
                            value={formData[key as keyof typeof formData]}
                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl text-white text-sm placeholder-[#8FA3A0]/50 focus:outline-none transition-colors duration-200"
                            style={{ background: 'rgba(6,28,30,0.7)', border: '1px solid rgba(33,230,167,0.12)' }}
                            placeholder={placeholder}
                            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(33,230,167,0.45)' }}
                            onBlur={(e)  => { e.currentTarget.style.borderColor = 'rgba(33,230,167,0.12)' }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-[#8FA3A0] mb-1.5" htmlFor="wl-email">
                        Email Address <span className="text-mint">*</span>
                      </label>
                      <input
                        id="wl-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-white text-sm placeholder-[#8FA3A0]/50 focus:outline-none transition-colors duration-200"
                        style={{ background: 'rgba(6,28,30,0.7)', border: '1px solid rgba(33,230,167,0.12)' }}
                        placeholder="john@example.com"
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(33,230,167,0.45)' }}
                        onBlur={(e)  => { e.currentTarget.style.borderColor = 'rgba(33,230,167,0.12)' }}
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-xs font-medium text-[#8FA3A0] mb-1.5" htmlFor="wl-country">
                        Country <span className="text-mint">*</span>
                      </label>
                      <select
                        id="wl-country"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-white text-sm focus:outline-none transition-colors duration-200"
                        style={{ background: 'rgba(6,28,30,0.7)', border: '1px solid rgba(33,230,167,0.12)', colorScheme: 'dark' }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(33,230,167,0.45)' }}
                        onBlur={(e)  => { e.currentTarget.style.borderColor = 'rgba(33,230,167,0.12)' }}
                      >
                        <option value="">Select your country</option>
                        {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    {/* Phone (optional) */}
                    <div>
                      <label className="block text-xs font-medium text-[#8FA3A0] mb-1.5" htmlFor="wl-phone">
                        Phone <span className="text-[#8FA3A0]/50 font-normal">(optional)</span>
                      </label>
                      <input
                        id="wl-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-white text-sm placeholder-[#8FA3A0]/50 focus:outline-none transition-colors duration-200"
                        style={{ background: 'rgba(6,28,30,0.7)', border: '1px solid rgba(33,230,167,0.12)' }}
                        placeholder="+1 234 567 890"
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(33,230,167,0.45)' }}
                        onBlur={(e)  => { e.currentTarget.style.borderColor = 'rgba(33,230,167,0.12)' }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm text-[#061C1E] transition-all duration-300 disabled:opacity-60 mt-2 shadow-lg shadow-[#21E6A7]/10"
                      style={{ background: submitting ? 'rgba(33,230,167,0.4)' : `linear-gradient(135deg, ${MINT} 0%, ${TEAL} 100%)` }}
                    >
                      {submitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-[#061C1E]/30 border-t-[#061C1E] rounded-full animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>Join the Waitlist <ArrowRight size={15} /></>
                      )}
                    </button>

                    <p className="text-center text-xs text-[#8FA3A0]/50 pt-1">
                      No spam. We'll only contact you when the Executive card is ready.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
