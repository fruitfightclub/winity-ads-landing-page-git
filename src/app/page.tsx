'use client';

/*
  ============================================================
  CLIENT:      Winity Life
  PHILOSOPHY:  Emerald Noir
  COLORS:      Primary #0B2E2C | Accent #21E6A7 | Base #030C0C | Surface #061C1E
  FONTS:       Roboto
  DELIVERABLE: Ads Landing Page V6 — Conversion Engine (Next.js)
  PHASE:       6 — Build
  TSS STUDIO | CREATED BY AN ARTIST. POWERED BY AI.
  ============================================================
*/

import { useEffect, useRef, useState, useCallback } from 'react';
import './landing.css';

/* ── WEBHOOK URLS ─────────────────────────────────────── */
const VIRTUAL_CARD_WEBHOOK   = 'https://script.google.com/macros/s/AKfycbz_virtual_placeholder/exec';
const PHYSICAL_CARD_WEBHOOK  = 'https://script.google.com/macros/s/AKfycbz_physical_placeholder/exec';
const EXECUTIVE_CARD_WEBHOOK = 'https://script.google.com/macros/s/AKfycbz_executive_placeholder/exec';

/* ── DATA ─────────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  'Available in 180+ Countries',
  'Visa® Accepted Globally',
  '0% Stablecoin Deposit Fee',
  'Visa® Card Services',
  '150M+ Merchants Worldwide',
  'Instant Virtual Issuance',
];

const CAROUSEL_SLIDES = [
  {
    img: '/uc_digital_marketing.webp',
    fallback: '/ads_1.webp',
    alt: 'Power your ad accounts',
    tag: 'Digital Marketing',
    title: 'Power your ad accounts.',
    desc: 'Meta, Google, TikTok, LinkedIn. Load your Winity card and run campaigns globally. No declined transactions, no currency headaches.',
  },
  {
    img: '/uc_saas.webp',
    fallback: '/ads_2.webp',
    alt: 'One card for every tool',
    tag: 'SaaS & Subscriptions',
    title: 'One card for every tool.',
    desc: 'Notion, Figma, AWS, Shopify, Adobe, Slack. Manage all your software subscriptions from a single Winity card with full spend visibility.',
  },
  {
    img: '/uc_travel.webp',
    fallback: '/winity_lifestyle_travel.webp',
    alt: 'Spend like a local, anywhere',
    tag: 'Travel & Hotels',
    title: 'Spend like a local, anywhere.',
    desc: 'From Dubai to Tokyo, pay at hotels, restaurants, and retail. Your card works at 150M+ Visa® locations across 200+ countries.',
  },
  {
    img: '/uc_shopping.webp',
    fallback: '/winity_gallery_culture.webp',
    alt: 'Shop global. Earn points',
    tag: 'Online Shopping',
    title: 'Shop global. Earn points.',
    desc: 'Amazon, AliExpress, ASOS, Farfetch. Shop any online store that accepts Visa® and earn 1 Winity Point per USD 10 spent automatically.',
  },
];

const FAQS = [
  {
    q: 'Is this a crypto card?',
    a: <>No. The Winity card is a <strong>digital asset-linked Visa® card</strong>. Supported digital assets are converted within the Winity platform into a USD spending balance prior to card transactions. You spend USD — not crypto — wherever Visa® is accepted.</>,
  },
  {
    q: 'Which countries can I use it in?',
    a: <>The Winity Card is available in <strong>187+ countries</strong> across Europe, Asia, Africa, the Americas, and Oceania. Card services are issued by licensed partners and available globally wherever Visa® is accepted. Availability may vary by jurisdiction.</>,
  },
  {
    q: 'Which stablecoins and networks are supported?',
    a: <>Winity supports deposits of <strong>USDT and USDC</strong> with <strong>0% deposit fee</strong>. Non-stable assets (5% conversion fee) include WCO, ETH, BSC, POL, Tron, and SOL. Supported networks include <strong>Ethereum, W Chain, Polygon, Tron, Solana, and Binance Smart Chain</strong>. Loaded stablecoins are converted within the platform into your USD spending balance.</>,
  },
  {
    q: 'How do I get the physical card?',
    a: <>Spend USD 25 on your virtual card to qualify for the physical card at no issuance cost. Request it from the card management section in the app. The first 6 months of the USD 20/year annual fee are waived on new activations. Shipping charges may apply.</>,
  },
];

const COUNTRIES = [
  'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Bahrain',
  'Kuwait', 'Oman', 'United Kingdom', 'Hong Kong', 'Singapore', 'Other',
];

type ModalId = 'modalVirtual' | 'modalPhysical' | 'modalExecutive' | 'modalDownload' | null;
type FormId  = 'formVirtual' | 'formPhysical' | 'formExecutive' | 'formDownload';

/* ── ICONS ────────────────────────────────────────────── */
const AppleIcon = () => (
  <svg viewBox="0 0 384 512" width="16" height="16" fill="currentColor" style={{flexShrink:0}}>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-48.7-19.1-77.5-19.1-38.3 0-77 21.8-97.5 57.5-41.2 71.7-10.7 178.6 29 236.4 19.5 28.1 42.4 59.4 72.8 58.2 29.2-1.2 40.5-18.9 76-18.9 35.1 0 45.4 18.9 76 18.5 31.1-.4 51.5-28.5 70.7-56.6 22.2-32.4 31.2-63.6 31.7-65.4-.6-.2-61.1-23.5-61.7-93.5zM277.6 98c15.2-18.3 24.4-43 21.7-67.7-21.1 1-47.2 14.3-62.4 32.1-13.6 15.6-25.5 40.7-22.3 65 23.6 1.8 48.2-11.1 63-29.4z"/>
  </svg>
);

const GooglePlayIcon = () => (
  <svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor" style={{flexShrink:0}}>
    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58-33.2-60.7 60.7 60.7 60.7 58-33.2c15-8.6 24.8-23.7 24.8-42.5s-9.8-33.9-24.8-42.5zM104.6 499l220.7-126.3 60.1 60.1L104.6 499z"/>
  </svg>
);

const ArrowIcon = ({size = 14}: {size?: number}) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" fill="none" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" fill="none" strokeWidth="3">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

/* ── PILL BUTTON COMPONENTS ──────────────────────────── */
function BtnPill({ onClick, children, style }: { onClick?: () => void; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <button className="btn-pill" onClick={onClick} style={style}>
      {children}
    </button>
  );
}

function BtnPillOutline({ onClick, children, style }: { onClick?: () => void; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <button className="btn-pill-outline" onClick={onClick} style={style}>
      {children}
    </button>
  );
}

function AppStoreBtn({ onClick, style }: { onClick?: () => void; style?: React.CSSProperties }) {
  return (
    <BtnPill onClick={onClick} style={style}>
      <AppleIcon /> App Store
      <span className="pill-icon"><ArrowIcon /></span>
    </BtnPill>
  );
}

function GooglePlayBtn({ onClick, style }: { onClick?: () => void; style?: React.CSSProperties }) {
  return (
    <BtnPillOutline onClick={onClick} style={style}>
      <GooglePlayIcon /> Google Play
      <span className="pill-icon"><ArrowIcon /></span>
    </BtnPillOutline>
  );
}

/* ── MODAL FORM ──────────────────────────────────────── */
function ModalForm({
  id, title, sub, formId, btnLabel, btnStyle, onClose,
}: {
  id: string; title: string; sub: string; formId: FormId;
  btnLabel: string; btnStyle?: React.CSSProperties; onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const name = (form.querySelector('[name="name"]') as HTMLInputElement)?.value || '';
    const email = (form.querySelector('[name="email"]') as HTMLInputElement)?.value || '';
    const country = (form.querySelector('[name="country"]') as HTMLSelectElement)?.value || '';

    let tier = 'exclusive';
    let webhookUrl = '';
    if (formId === 'formVirtual')  { tier = 'exclusive_virtual';  webhookUrl = VIRTUAL_CARD_WEBHOOK; }
    if (formId === 'formPhysical') { tier = 'exclusive_physical'; webhookUrl = PHYSICAL_CARD_WEBHOOK; }
    if (formId === 'formExecutive'){ tier = 'executive_metal';    webhookUrl = EXECUTIVE_CARD_WEBHOOK; }
    if (formId === 'formDownload') { tier = 'app_download';       webhookUrl = VIRTUAL_CARD_WEBHOOK; }

    const params = new URLSearchParams(window.location.search);
    const data = {
      firstName: name, lastName: '', email, region: country, tier,
      kycStatus: 'Pending Verification', liveKyc: false, diditSessionId: '',
      source: formId,
      utmSource:   params.get('utm_source')   || '',
      utmMedium:   params.get('utm_medium')   || '',
      utmCampaign: params.get('utm_campaign') || '',
      utmContent:  params.get('utm_content')  || '',
      timestamp: new Date().toISOString(),
      page: window.location.href,
    };

    // Fire tracking
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', 'Lead', { content_name: `Winity Exclusive Card - ${tier}`, content_category: country, value: 0, currency: 'USD' });
    }
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'generate_lead', { event_category: 'Form', event_label: formId, country });
    }

    const showSuccess = () => { setLoading(false); setSubmitted(true); };

    if (webhookUrl && !webhookUrl.includes('_placeholder')) {
      try {
        await fetch(webhookUrl, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        showSuccess();
      } catch { showSuccess(); }
    } else {
      setTimeout(showSuccess, 600);
    }
  };

  const isDownload = formId === 'formDownload';

  return (
    <div style={{ position: 'relative' }}>
      <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
      <div className="modal-drag" />
      <div className="modal-title" style={isDownload ? { textAlign: 'center' } : {}}>{title}</div>
      <p className="modal-sub" style={isDownload ? { textAlign: 'center' } : {}}>{sub}</p>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor={`${formId}-name`}>First Name</label>
            <input id={`${formId}-name`} name="name" type="text" placeholder="Your first name" required autoComplete="given-name" />
          </div>
          <div className="field">
            <label htmlFor={`${formId}-email`}>Email Address</label>
            <input id={`${formId}-email`} name="email" type="email" placeholder="you@example.com" required autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor={`${formId}-country`}>Country</label>
            <select id={`${formId}-country`} name="country" required>
              <option value="">Select your country</option>
              {COUNTRIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <button type="submit" className={`submit-btn${loading ? ' loading' : ''}`} style={btnStyle} disabled={loading}>
            {loading ? 'Submitting…' : btnLabel}
          </button>
          <p className="form-disclaimer">
            {formId === 'formExecutive'
              ? 'Winity Executive Card is subject to verification and onboarding review.'
              : 'Winity card services are issued by licensed partners and available globally wherever Visa® is accepted. Availability may vary by jurisdiction.'}
          </p>
        </form>
      ) : (
        <div className="ty-state" style={{ display: 'block' }}>
          <div className="ty-icon">
            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2.5" fill="none" /></svg>
          </div>
          {isDownload ? (
            <>
              <div className="ty-title">Thank you!</div>
              <p className="ty-sub" style={{ marginBottom: 24 }}>Your download links are ready. Choose your platform below to download Winity Life:</p>
              <div className="download-buttons-group" style={{ justifyContent: 'center', gap: 12, marginTop: 16 }}>
                <a href="https://apps.apple.com/us/app/winity-life/id6752761057" target="_blank" rel="noopener" className="btn-pill" style={{ padding: '8px 12px 8px 16px' }}>
                  <svg viewBox="0 0 384 512" width="14" height="14" fill="currentColor" style={{flexShrink:0}}><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-48.7-19.1-77.5-19.1-38.3 0-77 21.8-97.5 57.5-41.2 71.7-10.7 178.6 29 236.4 19.5 28.1 42.4 59.4 72.8 58.2 29.2-1.2 40.5-18.9 76-18.9 35.1 0 45.4 18.9 76 18.5 31.1-.4 51.5-28.5 70.7-56.6 22.2-32.4 31.2-63.6 31.7-65.4-.6-.2-61.1-23.5-61.7-93.5zM277.6 98c15.2-18.3 24.4-43 21.7-67.7-21.1 1-47.2 14.3-62.4 32.1-13.6 15.6-25.5 40.7-22.3 65 23.6 1.8 48.2-11.1 63-29.4z"/></svg>
                  App Store
                  <span className="pill-icon" style={{width:20,height:20}}><ArrowIcon size={8} /></span>
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.winity.life" target="_blank" rel="noopener" className="btn-pill-outline" style={{ padding: '8px 12px 8px 16px' }}>
                  <svg viewBox="0 0 512 512" width="14" height="14" fill="currentColor" style={{flexShrink:0}}><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58-33.2-60.7 60.7 60.7 60.7 58-33.2c15-8.6 24.8-23.7 24.8-42.5s-9.8-33.9-24.8-42.5zM104.6 499l220.7-126.3 60.1 60.1L104.6 499z"/></svg>
                  Google Play
                  <span className="pill-icon" style={{width:20,height:20}}><ArrowIcon size={8} /></span>
                </a>
              </div>
            </>
          ) : formId === 'formExecutive' ? (
            <>
              <div className="ty-title">Interest Registered.</div>
              <p className="ty-sub">An onboarding specialist will reach out to schedule your review call.</p>
            </>
          ) : formId === 'formPhysical' ? (
            <>
              <div className="ty-title">You&apos;re on the list.</div>
              <p className="ty-sub">We&apos;ll contact you shortly with shipment details for your physical card.</p>
            </>
          ) : (
            <>
              <div className="ty-title">You&apos;re on the list.</div>
              <p className="ty-sub">We&apos;ll reach out within 24 hours to set up your virtual card.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════ */
export default function WinityLandingV6() {
  /* --- State --- */
  const [activeModal, setActiveModal] = useState<ModalId>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [navDark, setNavDark] = useState(false);
  const [heroH1, setHeroH1] = useState<React.ReactNode>(
    <>Your Stablecoins.<br /><em>Liquid Globally.</em></>
  );
  const [heroSub, setHeroSub] = useState(
    'Deposit USDT or USDC. Convert instantly to USD. Spend at 150M+ merchants with your Winity Visa® card. Free virtual card, 0% deposit fee.'
  );

  const progRef = useRef<HTMLDivElement>(null);
  const carouselIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const viewContentFiredRef = useRef(false);

  /* --- Modal helpers --- */
  const openModal = useCallback((id: ModalId) => {
    setActiveModal(id);
    document.body.style.overflow = 'hidden';
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', 'InitiateCheckout', { content_name: `Winity Exclusive - Open - ${id}` });
    }
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    document.body.style.overflow = '';
  }, []);

  /* --- Carousel --- */
  const showSlide = useCallback((idx: number) => {
    const len = CAROUSEL_SLIDES.length;
    setCarouselIdx(((idx % len) + len) % len);
  }, []);

  const resetTimer = useCallback(() => {
    if (carouselIntervalRef.current) clearInterval(carouselIntervalRef.current);
    carouselIntervalRef.current = setInterval(() => setCarouselIdx(i => (i + 1) % CAROUSEL_SLIDES.length), 5000);
  }, []);

  /* --- Touch swipe for carousel --- */
  const touchStartX = useRef(0);
  const onCarouselTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onCarouselTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { showSlide(carouselIdx + (diff > 0 ? 1 : -1)); resetTimer(); }
  };

  /* --- Init effects --- */
  useEffect(() => {
    // UTM dynamic headlines
    const p = new URLSearchParams(window.location.search);
    const campaign = p.get('utm_campaign') || '';
    const content  = p.get('utm_content')  || '';

    if (campaign.includes('ksa') || content.includes('sovereign')) {
      setHeroH1(<>From Saudi Arabia<br />to Anywhere.<br /><em>One Card.</em></>);
      setHeroSub('Deposit USDT or USDC. Converted within the Winity platform into a USD spending balance — spend globally at 150M+ merchants with your Winity Visa® card.');
    } else if (content.includes('match_day') || content.includes('travel')) {
      setHeroH1(<>Match Day.<br />Your Stablecoins.<br /><em>Finally Connected.</em></>);
      setHeroSub('Flying for the game? Deposit USDT or USDC — converted within the platform into USD. Pay for flights, hotels, tickets and more with your Winity Visa® card. 180+ countries.');
    } else if (content.includes('shopping')) {
      setHeroH1(<>Last Minute<br />Shopping Spree?<br /><em>We&apos;ve Got You.</em></>);
      setHeroSub('Add USDT or USDC. Converted within the Winity platform into a USD spending balance — spend at 150M+ merchants, online or in-store, anywhere Visa® is accepted.');
    } else if (campaign.includes('uk')) {
      setHeroH1(<>Wealth<br />in Motion.<br /><em>Spend Globally.</em></>);
      setHeroSub('The Winity Exclusive Card for the UK. Deposit USDT or USDC, converted within the platform into a USD spending balance — spend everywhere Visa® is accepted across 180+ countries.');
    }

    // Scroll animations
    document.body.classList.add('js-ready');

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.anim:not(#hero .anim)').forEach(el => io.observe(el));
    document.querySelectorAll('#hero .anim').forEach(el => el.classList.add('in'));

    // Scroll progress + nav dark
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? scrolled / total : 0;
      if (progRef.current) progRef.current.style.transform = `scaleX(${pct})`;
      setNavDark(scrolled > 60);
      if (!viewContentFiredRef.current && pct >= 0.25) {
        viewContentFiredRef.current = true;
        if (typeof (window as any).fbq !== 'undefined') {
          (window as any).fbq('track', 'ViewContent', { content_name: 'Winity Exclusive Page' });
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ESC key
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKey);

    // Carousel autoplay
    resetTimer();

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKey);
      io.disconnect();
      if (carouselIntervalRef.current) clearInterval(carouselIntervalRef.current);
    };
  }, [closeModal, resetTimer]);

  /* ── RENDER ──────────────────────────────────────────── */
  return (
    <>
      {/* Scroll progress */}
      <div id="prog" ref={progRef} aria-hidden="true" />

      {/* ═══ NAV ═══════════════════════════════════════════ */}
      <nav id="nav" className={`nav${navDark ? ' dark' : ''}`}>
        <img className="nav-logo" src="/winity_logo.png" alt="Winity Life" width={100} height={22} />
        <div className="nav-btn-group">
          <button className="nav-btn-store btn-pill" onClick={() => openModal('modalDownload')}>
            <svg viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-48.7-19.1-77.5-19.1-38.3 0-77 21.8-97.5 57.5-41.2 71.7-10.7 178.6 29 236.4 19.5 28.1 42.4 59.4 72.8 58.2 29.2-1.2 40.5-18.9 76-18.9 35.1 0 45.4 18.9 76 18.5 31.1-.4 51.5-28.5 70.7-56.6 22.2-32.4 31.2-63.6 31.7-65.4-.6-.2-61.1-23.5-61.7-93.5zM277.6 98c15.2-18.3 24.4-43 21.7-67.7-21.1 1-47.2 14.3-62.4 32.1-13.6 15.6-25.5 40.7-22.3 65 23.6 1.8 48.2-11.1 63-29.4z"/></svg>
            <span className="nav-store-text">App Store</span>
            <span className="pill-icon"><ArrowIcon size={8} /></span>
          </button>
          <button className="nav-btn-store btn-pill-outline" onClick={() => openModal('modalDownload')}>
            <svg viewBox="0 0 512 512" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58-33.2-60.7 60.7 60.7 60.7 58-33.2c15-8.6 24.8-23.7 24.8-42.5s-9.8-33.9-24.8-42.5zM104.6 499l220.7-126.3 60.1 60.1L104.6 499z"/></svg>
            <span className="nav-store-text">Google Play</span>
            <span className="pill-icon"><ArrowIcon size={8} /></span>
          </button>
        </div>
      </nav>

      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section id="hero" aria-label="Hero">
        <div className="hero-container">
          {/* Copy column */}
          <div className="hero-copy-col">
            <div className="hero-eyebrow anim anim-d1">
              <span className="blink" />
              Winity Exclusive Card
            </div>

            <h1 className="hero-h1 anim anim-d2">{heroH1}</h1>

            <p className="hero-sub anim anim-d3">{heroSub}</p>

            {/* Stats grid */}
            <div className="hero-stats-grid anim anim-d4">
              {[
                { val: '180+', lbl: 'Countries Supported' },
                { val: '150M+', lbl: 'Merchants Worldwide' },
                { val: '0%', lbl: 'Deposit Fee' },
                { val: 'Visa®', lbl: 'Accepted Globally' },
              ].map(s => (
                <div className="hero-stat-item" key={s.lbl}>
                  <span className="hero-stat-val">{s.val}</span>
                  <span className="hero-stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>

            {/* Desktop download buttons */}
            <div className="download-buttons-group anim anim-d5 desktop-only" style={{ marginTop: 24 }}>
              <AppStoreBtn onClick={() => openModal('modalDownload')} />
              <GooglePlayBtn onClick={() => openModal('modalDownload')} />
            </div>
          </div>

          {/* Right column — empty, shows background graphic */}
          <div className="hero-visual-col desktop-only" aria-hidden="true" style={{ height: '100%', minHeight: 400 }} />
        </div>

        {/* Marquee banner */}
        <div className="hero-marquee-banner">
          <div className="marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span className="marquee-item" key={i}>
                <span className="marquee-dot" />{item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ USP + STEPS (SECTION 2) ═════════════════════════ */}
      <section className="section" id="network-hub" aria-label="Networks and Value Propositions">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <span className="section-label">Supported Assets &amp; USPs</span>
          <h2 className="section-h2">Spend stablecoins globally.<br /><em>Get started in minutes.</em></h2>

          {/* 3 USP cards */}
          <div className="usp-highlight-row">
            <div className="usp-card">
              <div className="usp-icon">
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 12h8"/>
                </svg>
              </div>
              <h3>0% Deposit Fees</h3>
              <p>Deposit USDT and USDC directly with zero platform fees. Fund your card balance instantly on Solana, Polygon, Ethereum, TRON, or BSC networks.</p>
            </div>
            <div className="usp-card">
              <div className="usp-icon">
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2.5">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
                </svg>
              </div>
              <h3>Free Virtual Card</h3>
              <p>Generate your Winity Exclusive card immediately after KYC. Link to Google Pay instantly and spend globally at 150M+ merchants.</p>
            </div>
            <div className="usp-card">
              <div className="usp-icon">
                <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3>Physical Card Waived</h3>
              <p>The annual fee of USD 20 for the premium recycled ocean-plastic physical card is fully waived for your first 6 months, or free when you spend $25+ in your first 30 days.</p>
            </div>
          </div>

          {/* 4 Steps slider */}
          <span className="section-label" style={{ marginTop: 24 }}>Four Steps to Start</span>
          <h2 className="section-h2" style={{ marginBottom: 24 }}>Get started in <em>minutes.</em></h2>

          <div className="steps-slider-container">
            <div className="steps-slider-track">
              {[
                { src: '/Download and verify.webp', alt: 'Step 1: Download & Verify' },
                { src: '/Choose your card.webp',    alt: 'Step 2: Choose Your Card' },
                { src: '/Fund your card.webp',      alt: 'Step 3: Fund Your Balance' },
                { src: '/Spend and Earn.webp',      alt: 'Step 4: Spend & Earn' },
              ].map(s => (
                <div className="steps-slider-slide" key={s.alt}>
                  <img src={s.src} alt={s.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile download buttons under steps */}
          <div className="download-buttons-group mobile-only" style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 24 }}>
            <AppStoreBtn onClick={() => openModal('modalDownload')} style={{ padding: '10px 16px 10px 22px' }} />
            <GooglePlayBtn onClick={() => openModal('modalDownload')} style={{ padding: '10px 16px 10px 22px' }} />
          </div>
        </div>
      </section>

      {/* ═══ WHERE TO USE IT CAROUSEL (SECTION 3) ════════════ */}
      <section className="section" id="experience" aria-label="Where to Use It">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <span className="section-label">Where to Use It</span>
          <h2 className="section-h2">One card. <em>Every moment.</em></h2>

          <div
            className="carousel-container"
            onTouchStart={onCarouselTouchStart}
            onTouchEnd={onCarouselTouchEnd}
          >
            <div
              className="carousel-track"
              id="carouselTrack"
              style={{ transform: `translateX(-${carouselIdx * 100}%)` }}
            >
              {CAROUSEL_SLIDES.map((slide, i) => (
                <div className="carousel-slide" key={i}>
                  <img
                    className="carousel-img"
                    src={slide.img}
                    onError={(e) => { (e.target as HTMLImageElement).src = slide.fallback; }}
                    alt={slide.alt}
                    loading="lazy"
                    width={1100} height={540}
                  />
                  <div className="carousel-content">
                    <div className="carousel-text-box">
                      <span className="carousel-tag">{slide.tag}</span>
                      <h3 className="carousel-title">{slide.title}</h3>
                      <p className="carousel-desc">{slide.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows (desktop only — hidden on mobile via CSS) */}
            <button className="carousel-arrow" style={{ position: 'absolute', left: 24, bottom: 24, zIndex: 20 }}
              onClick={() => { showSlide(carouselIdx - 1); resetTimer(); }} aria-label="Previous Slide">
              <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button className="carousel-arrow" style={{ position: 'absolute', left: 76, bottom: 24, zIndex: 20 }}
              onClick={() => { showSlide(carouselIdx + 1); resetTimer(); }} aria-label="Next Slide">
              <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
            </button>

            {/* Dots */}
            <div className="carousel-nav">
              {CAROUSEL_SLIDES.map((_, i) => (
                <button key={i} className={`carousel-dot${carouselIdx === i ? ' active' : ''}`}
                  onClick={() => { showSlide(i); resetTimer(); }} aria-label={`Go to slide ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CHOOSE YOUR CARD ════════════════════════════════ */}
      <section className="section" id="cards-compare">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <span className="section-label">Choose Your Card</span>
          <h2 className="section-h2">Find the card that fits your lifestyle</h2>
          <div className="cards-grid">

            {/* 1 — Exclusive Virtual */}
            <article className="c-card">
              <div className="c-img-wrap" style={{ background: 'rgba(33,230,167,0.02)' }}>
                <img src="/card_exclusive_virtual.webp" alt="Winity Exclusive Virtual Card" loading="lazy" />
              </div>
              <div className="c-body">
                <div className="c-badge">Virtual</div>
                <h3>Exclusive Virtual</h3>
                <p className="c-desc">Generates instantly after biometric verification. Spend digital assets globally with Google Pay compatibility.</p>
                <div className="c-price">USD 0<span>/year</span></div>
                <ul className="feat-list">
                  <li><CheckIcon />No annual maintenance fee</li>
                  <li><CheckIcon />1 Winity Point per $10 spent</li>
                  <li><CheckIcon />Google Pay integration</li>
                  <li><CheckIcon />0% deposit fee on USDT/USDC</li>
                </ul>
                <button className="c-btn" onClick={() => openModal('modalVirtual')}>Get Virtual Card</button>
              </div>
            </article>

            {/* 2 — Exclusive Physical (Featured) */}
            <article className="c-card featured">
              <div className="c-img-wrap" style={{ background: 'rgba(33,230,167,0.04)', borderBottom: '1px solid var(--border)' }}>
                <img src="/card_exclusive_physical.webp" alt="Winity Exclusive Physical Card" loading="lazy" />
              </div>
              <div className="c-body">
                <div className="c-badge">Physical</div>
                <h3>Exclusive Physical</h3>
                <p className="c-desc">Everything virtual offers, plus a premium physical card in your wallet, ready at the ATM.</p>
                <div className="c-price">USD 20<span>/year (waived first 6m)</span></div>
                <ul className="feat-list">
                  <li><CheckIcon />Free card when spending $25+</li>
                  <li><CheckIcon />1 Winity Point per $10 spent</li>
                  <li><CheckIcon />ATM cash withdrawals globally</li>
                  <li><CheckIcon />Google Pay + Contactless Tap</li>
                </ul>
                <button className="c-btn" onClick={() => openModal('modalPhysical')}>Get Physical Card</button>
              </div>
            </article>

            {/* 3 — Executive Metal */}
            <article className="c-card">
              <div className="c-img-wrap" style={{ background: 'linear-gradient(135deg, #0d0d0d 0%, #15110d 100%)' }}>
                <img src="/Executive Card.webp" alt="Winity Executive Metal Card" loading="lazy" style={{ height: '62%' }} />
              </div>
              <div className="c-body">
                <div className="c-badge copper-theme">Metal</div>
                <h3 style={{ color: 'var(--copper-bright)' }}>Executive Metal</h3>
                <p className="c-desc">Laser-cut matte black titanium metal. Built for high-volume travelers seeking concierge and VIP benefits.</p>
                <div className="c-price">USD 1,000<span>/year</span></div>
                <ul className="feat-list">
                  <li className="copper-icon"><CheckIcon />1 Winity Point per $8 spent</li>
                  <li className="copper-icon"><CheckIcon />24/7 dedicated personal concierge</li>
                  <li className="copper-icon"><CheckIcon />VIP airport lounge access</li>
                  <li className="copper-icon"><CheckIcon />Onboarding strategy call</li>
                </ul>
                <button className="c-btn copper-btn" onClick={() => openModal('modalExecutive')}>Register Interest</button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═════════════════════════════════════════════ */}
      <section className="section" id="faqs">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <span className="section-label">Common Questions</span>
          <h2 className="section-h2">Everything you need to know</h2>
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className={`faq-item${openFaqIdx === i ? ' open' : ''}`}>
                <button className="faq-q" onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}>
                  {faq.q}
                  <span className="faq-icon"><ChevronDownIcon /></span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ══════════════════════════════════════ */}
      <section id="join">
        <div className="join-inner">
          <h2 className="join-h2">Ready to spend<br /><em>smarter?</em></h2>
          <p className="join-sub">Get your Winity Exclusive card today. Download the app to start spending globally.</p>
          <div className="download-buttons-group" style={{ justifyContent: 'center', marginTop: 32 }}>
            <AppStoreBtn onClick={() => openModal('modalDownload')} />
            <GooglePlayBtn onClick={() => openModal('modalDownload')} />
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ══════════════════════════════════════════ */}
      <footer style={{ background: '#040E0E', fontFamily: "'Roboto', sans-serif" }}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <img className="footer-logo" src="/winity_logo.png" alt="Winity Life" width={80} height={18} loading="lazy" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 12, color: 'var(--muted)' }}>
              {[
                { href: '/terms',        label: 'Terms of Use' },
                { href: '/privacy',      label: 'Privacy Policy' },
                { href: '/risk',         label: 'Risk Disclosure' },
                { href: '/google-pay-tc',label: 'Google Pay T&C' },
              ].map((link, i, arr) => (
                <span key={link.href} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <a href={link.href} target="_blank" rel="noopener" style={{ transition: 'color 0.2s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#21E6A7')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
                    {link.label}
                  </a>
                  {i < arr.length - 1 && <span>•</span>}
                </span>
              ))}
            </div>
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', width: '100%' }} />
          <p className="footer-legal" style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.65, maxWidth: 900, margin: 0 }}>
            Disclaimer: Winity Life is a financial technology platform, not a bank. Winity card services are issued by licensed partners and are available globally wherever Visa® is accepted. Digital asset-linked card services involve significant risks. Supported digital assets (such as USDT and USDC) are converted within the Winity platform into a USD spending balance prior to card transactions. &ldquo;Visa&rdquo; is a registered trademark of Visa International Service Association.
            <br /><br />
            © 2026 WTY Technology Hong Kong Limited. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ═══ STICKY MOBILE CTA ═══════════════════════════════ */}
      <div className="sticky-bar" id="stickyBar">
        <button className="sticky-btn" onClick={() => openModal('modalDownload')}>Get Your Free Card</button>
      </div>

      {/* ═══ MODAL FORMS ═════════════════════════════════════ */}

      {/* Virtual */}
      <div className={`modal-overlay${activeModal === 'modalVirtual' ? ' open' : ''}`}
        onClick={e => { if ((e.target as HTMLElement).classList.contains('modal-overlay')) closeModal(); }}>
        <div className="modal" style={{ position: 'relative' }}>
          <ModalForm id="modalVirtual" formId="formVirtual"
            title="Winity Exclusive Virtual" sub="Generate your virtual card instantly with zero annual fees."
            btnLabel="Get Virtual Card →" onClose={closeModal} />
        </div>
      </div>

      {/* Physical */}
      <div className={`modal-overlay${activeModal === 'modalPhysical' ? ' open' : ''}`}
        onClick={e => { if ((e.target as HTMLElement).classList.contains('modal-overlay')) closeModal(); }}>
        <div className="modal" style={{ position: 'relative' }}>
          <ModalForm id="modalPhysical" formId="formPhysical"
            title="Winity Exclusive Physical" sub="Recycled ocean-plastic card with contactless spending and global ATM access."
            btnLabel="Get Physical Card →" onClose={closeModal} />
        </div>
      </div>

      {/* Executive */}
      <div className={`modal-overlay${activeModal === 'modalExecutive' ? ' open' : ''}`}
        onClick={e => { if ((e.target as HTMLElement).classList.contains('modal-overlay')) closeModal(); }}>
        <div className="modal" style={{ position: 'relative' }}>
          <ModalForm id="modalExecutive" formId="formExecutive"
            title="Winity Executive Metal" sub="Matte black titanium card, VIP lounge access, and dedicated personal concierge."
            btnLabel="Register Interest →" btnStyle={{ background: 'var(--copper)', color: 'var(--deep)', borderColor: 'var(--copper)' }}
            onClose={closeModal} />
        </div>
      </div>

      {/* Download */}
      <div className={`modal-overlay${activeModal === 'modalDownload' ? ' open' : ''}`}
        onClick={e => { if ((e.target as HTMLElement).classList.contains('modal-overlay')) closeModal(); }}>
        <div className="modal" style={{ position: 'relative' }}>
          <ModalForm id="modalDownload" formId="formDownload"
            title="Download Winity Life" sub="Enter your details to receive secure download links and get started."
            btnLabel="Get Download Links →" onClose={closeModal} />
        </div>
      </div>
    </>
  );
}
