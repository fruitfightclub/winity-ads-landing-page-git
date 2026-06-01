export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  image: string
  author: string
  content: BlogSection[]
}

export interface BlogSection {
  type: 'heading' | 'paragraph' | 'list' | 'callout'
  text?: string
  items?: string[]
}

export const BLOG_POSTS: BlogPost[] = [
  // ─── Post 1: How to spend USDT — from client Blog_01 ──────────────────────
  {
    slug: 'how-to-spend-usdt-without-a-bank-2026',
    title: 'How to Spend Your USDT Without Sending It to a Bank First (2026 Guide)',
    excerpt: 'Getting money out of stablecoins should not be a four-step obstacle course. Here is how Winity Life closes the gap between your USDT wallet and the point of sale.',
    category: 'How It Works',
    readTime: '5 min read',
    date: 'May 20, 2026',
    image: '/hero_phone.png',
    author: 'Winity Life',
    content: [
      { type: 'paragraph', text: 'You have USDT. You want to buy something. Sounds simple — but if you have tried it, you know the reality is a four-step obstacle course. Send to an exchange. Sell for fiat. Wait 1–5 business days for the bank wire. Use your bank card. By step four, you have paid fees, waited days, and dealt with a bank that probably flagged your transfer.' },
      { type: 'paragraph', text: 'The crypto industry talks endlessly about on-ramping — buying your first Bitcoin, staking ETH, bridging across chains. The off-ramp? That is where it falls apart. Winity Life is built specifically to close that gap.' },
      { type: 'heading', text: 'Who this solves a real problem for' },
      { type: 'list', items: [
        'Freelancers and remote workers receiving international payments in stablecoins',
        'Digital nomads who need one predictable spending currency across 20+ countries',
        'Traders who have moved assets into stables and want to use them — not wait',
        'Expats receiving value transfers without access to traditional banking',
      ]},
      { type: 'heading', text: 'Step 1: Download and pass KYC' },
      { type: 'paragraph', text: 'Download the Winity Life app on iOS or Android. KYC verification completes within minutes using a passport, driving licence, or national ID. Once approved, your Winity Exclusive virtual card is issued immediately — zero annual fee, ready for Google Pay.' },
      { type: 'heading', text: 'Step 2: Load USDT or USDC — zero platform fee' },
      { type: 'paragraph', text: 'Open the app, tap Add, and select your network. Winity supports USDT and USDC across Tron (TRC-20 — lowest gas fees, typically under $0.10), Ethereum (ERC-20), Binance Smart Chain, Polygon, Solana, and W Chain. Stablecoin transfers carry a 0% Winity platform fee. Non-stable digital assets carry a 5% conversion fee.' },
      { type: 'heading', text: 'Step 3: Your balance becomes USD' },
      { type: 'paragraph', text: 'Once your transfer arrives, your Winity wallet shows a USD balance. No manual sell order. No exchange rate negotiation. Conversion happens automatically at the current rate.' },
      { type: 'heading', text: 'Step 4: Spend at 150M+ Visa® merchants worldwide' },
      { type: 'paragraph', text: 'Add your virtual card to Google Pay and tap to pay anywhere NFC is accepted. Your physical card works at 150M+ Visa® merchant locations across 200+ countries and at ATMs worldwide (USD 3 per ATM withdrawal). Every eligible spend earns 1 Winity Point per USD 10.' },
      { type: 'callout', text: 'Zero spend fees on the Exclusive card. No annual fee on the virtual tier. The card costs nothing to hold and nothing to use.' },
      { type: 'heading', text: 'What to know before you start' },
      { type: 'list', items: [
        'Assets loaded become USD for card spending. Winity does not convert back to crypto wallets.',
        'ATM withdrawal: USD 3 per transaction at any Visa-supported ATM worldwide.',
        'Apple Pay: currently Google Pay only. Apple Pay is in development.',
        'Physical card: spend USD 25 on your virtual card and receive the physical card at no issuance cost (first 6 months annual fee waived; shipping charges may apply).',
      ]},
      { type: 'paragraph', text: 'Your USDT can start working for you today — not three banking days from now. Download Winity Life on the App Store or Google Play, complete KYC, and your virtual card is ready within minutes.' },
    ],
  },

  // ─── Post 2: Winity Loop referral programme ───────────────────────────────
  {
    slug: 'winity-loop-three-tier-referral-how-it-works',
    title: 'Winity Loop: How One Referral Can Build a Three-Tier Earning Network',
    excerpt: 'Most referral programmes stop at one level. Winity Loop runs three levels deep — you earn Winity Points from the spending of everyone in your referral network, not just the people you invite directly.',
    category: 'Product',
    readTime: '4 min read',
    date: 'May 15, 2026',
    image: '/app_referral.png',
    author: 'Winity Life',
    content: [
      { type: 'paragraph', text: 'Most referral programmes reward you once: one friend, one bonus, done. Winity Loop works differently. When you invite someone to Winity Life, you earn Winity Points from their eligible card spending. When they invite someone, you earn from that network too. When that person invites their own contacts, the earning continues — three tiers deep from a single share.' },
      { type: 'heading', text: 'How the three tiers work' },
      { type: 'paragraph', text: 'Think of your referral network as three concentric circles. The first circle is the people you personally invite. Every time they make an eligible card purchase, you earn Winity Points from their activity. That is Level 1.' },
      { type: 'paragraph', text: 'Level 2 is the network your direct referrals build themselves. When someone you invited brings in their own contacts, you also earn points from those people spending — even though you did not invite them directly. Level 3 extends that logic one more step outward.' },
      { type: 'heading', text: 'How to get started' },
      { type: 'list', items: [
        'Download Winity Life on iOS or Android',
        'Complete KYC verification — takes a few minutes',
        'Open the Loop section of the app to find your unique referral link',
        'Share your link. When your contacts join and start spending, your earning begins.',
      ]},
      { type: 'callout', text: 'Your unique referral link lives in the Loop section of the Winity Life app. Download, verify your identity, and start sharing.' },
      { type: 'heading', text: 'Points from spending, not just sign-ups' },
      { type: 'paragraph', text: 'Winity Loop rewards are based on the eligible card spending activity of your referral network — not on how many people you sign up. This is a meaningful distinction. You earn because people are actively using their Winity cards to spend on things they were already buying. The programme is built on real utility, not recruitment counts.' },
      { type: 'heading', text: 'Why the timing matters' },
      { type: 'paragraph', text: 'Referral networks reward early participants. People who join a community before it reaches scale tend to build the largest networks over time. Winity Loop is still early. The programme is live and growing across 200+ countries globally.' },
      { type: 'paragraph', text: 'Winity Loop is a referral rewards programme — not a multi-level marketing scheme. Points are earned based on the eligible spending activity of your network, subject to programme terms available at winity.life.' },
    ],
  },

  // ─── Post 3: UMI Partnership ───────────────────────────────────────────────
  {
    slug: 'winity-umi-global-data-partnership',
    title: 'Why We Partnered With UMI: Global Travel Data Built Into Your Card',
    excerpt: 'Landing in a new country used to mean hunting for a SIM card before you could do anything else. The Winity and UMI partnership changes that equation permanently.',
    category: 'Partnerships',
    readTime: '3 min read',
    date: 'May 8, 2026',
    image: '/exp_lifestyle_train.png',
    author: 'Winity Life',
    content: [
      { type: 'paragraph', text: 'The first 45 minutes in a new country used to go one of two ways. You either paid an extortionate rate for roaming data on your home network, or you queued at an airport kiosk for a local SIM, waited to swap it in, and hoped the plan you bought was worth what you paid. Neither option is acceptable for people who travel regularly.' },
      { type: 'heading', text: 'What digital travel data changes' },
      { type: 'paragraph', text: 'An eSIM is a digital SIM that lives inside your phone. No physical card to swap, no shop to visit. You activate a data plan remotely and your phone connects to a local network in the destination country — while keeping your home number active on the same device simultaneously.' },
      { type: 'paragraph', text: 'UMI operates this infrastructure across 100+ countries. Activation is instant. Coverage is built on local carrier partnerships, which means you are connecting locally — not roaming at elevated rates.' },
      { type: 'heading', text: 'What Winity cardholders receive' },
      { type: 'list', items: [
        'Exclusive cardholders: 1 GB complimentary UMI travel data after USD 5,000 in eligible cumulative card spend',
        'Executive cardholders: 3 GB of complimentary UMI travel data per year — automatically included with membership',
        'Winity Club members: 20% off all UMI data purchases via the UMI app',
        'Available across 100+ countries — activate from the Winity Life app, no physical SIM swap',
      ]},
      { type: 'callout', text: 'Executive cardholders: your data allocation resets every year. Three gigabytes of complimentary UMI travel data annually, activatable instantly whenever you travel.' },
      { type: 'heading', text: 'Why we chose UMI' },
      { type: 'paragraph', text: 'We reviewed every major eSIM provider before making this decision. UMI had the widest country coverage for the markets where Winity cardholders travel most frequently. The activation flow was the cleanest. The network quality in the destinations that mattered was consistent. We wanted connectivity to be a native part of the Winity card experience — not an afterthought you have to think about before every trip.' },
    ],
  },

  // ─── Post 4: USDT to dinner — how the conversion works ────────────────────
  {
    slug: 'from-usdt-to-spending-how-winity-works',
    title: 'From Digital Assets to Dinner in Tokyo: How Winity Life Converts Stablecoins to Card Spend',
    excerpt: 'The gap between a stablecoin wallet and a restaurant in Tokyo has never been about philosophy. It has been about infrastructure. Here is exactly how Winity Life bridges it.',
    category: 'How It Works',
    readTime: '5 min read',
    date: 'May 4, 2026',
    image: '/card_phone_scene.jpg',
    author: 'Winity Life',
    content: [
      { type: 'paragraph', text: 'The fundamental problem with spending digital assets in the physical world has never been philosophical. It has been operational. By the time you explain how to accept cryptocurrency at a restaurant, dinner is cold. Winity Life solves this at the infrastructure level.' },
      { type: 'heading', text: 'Step 1: Load Assets' },
      { type: 'paragraph', text: 'Open the Winity Life app and tap Add. Choose your preferred network: Tron, Solana, BNB Chain, Ethereum, Polygon, or W Chain. You receive a unique wallet address for that network. Send USDT or USDC from any compatible wallet. There is no platform load fee for stablecoins. The assets arrive in your Winity account.' },
      { type: 'heading', text: 'Step 2: Conversion' },
      { type: 'paragraph', text: 'Once transferred, your stablecoins are converted within the platform into USD. Your Winity dashboard shows a USD balance — and that is the balance your card draws from when you spend. The conversion is handled automatically. You do not need to interact with any exchange.' },
      { type: 'heading', text: 'Step 3: Spend' },
      { type: 'paragraph', text: 'Your Winity digital asset-linked Visa card works at 150M+ Visa® merchants worldwide. Add it to Google Pay and tap to pay from the moment your KYC is approved. The restaurant in Tokyo processes a standard Visa® transaction. You see a deduction from your USD balance. Zero friction at the point of sale.' },
      { type: 'heading', text: 'Step 4: Earn' },
      { type: 'paragraph', text: 'Every eligible purchase earns Winity Points. Exclusive cardholders earn 1 point per USD 10 spent. Those points redeem for travel vouchers, dining credits, streaming subscriptions, global UMI travel data, and more through the Winity Loyalty programme.' },
      { type: 'callout', text: 'Zero card spend fees on the Exclusive tier. Zero annual fee on the virtual card. The Winity Exclusive card costs nothing to hold or use.' },
      { type: 'heading', text: 'What Winity Life is not' },
      { type: 'paragraph', text: 'This is not a card that pays you in token rewards denominated in a project coin. This is not tied to a specific blockchain ecosystem. Winity Life converts digital assets into real-world spending power. The card is issued on the Visa® network. The infrastructure is REAP. The experience is as normal as tapping your phone on any reader, anywhere in the world.' },
    ],
  },

  // ─── Post 5: Winity Points complete guide ─────────────────────────────────
  {
    slug: 'winity-points-loyalty-complete-guide',
    title: 'Winity Points: A Complete Guide to Earning and Spending Your Loyalty Balance',
    excerpt: 'The difference between a loyalty programme that sits dormant and one that travels with you is redemption breadth. Here is every way to build and spend your Winity Points balance.',
    category: 'Rewards',
    readTime: '6 min read',
    date: 'April 30, 2026',
    image: '/exp_lounge.png',
    author: 'Winity Life',
    content: [
      { type: 'paragraph', text: 'A loyalty programme is only as good as what you can do with it. Most card rewards sit accumulating for months before the cardholder realises they do not actually want any of the things on offer. Winity Points are designed for the category of spending that already defines your lifestyle: travel, dining, entertainment, connectivity, and experience.' },
      { type: 'heading', text: 'How you earn Winity Points' },
      { type: 'list', items: [
        'Card spend: 1 point per USD 10 on the Exclusive card; 1 point per USD 8 on the Executive card',
        'Balance bonus: earn up to 15 bonus points on qualifying USDT or USDC balances',
        'Winity Loop: earn from the referral activity of your network — both from referrals you make and referrals your referrals make',
      ]},
      { type: 'heading', text: 'What you can redeem' },
      { type: 'paragraph', text: 'Travel is the largest redemption category — flights, hotel stays, rail journeys, and curated experiences. Dining redemptions cover restaurant vouchers and curated food experiences in supported markets. Entertainment includes streaming platforms and gaming credits. Lifestyle covers wellness and curated partner benefits. Mobile recharge and charity giving are available in supported markets.' },
      { type: 'heading', text: 'The Executive tier earn rate advantage' },
      { type: 'paragraph', text: 'Executive cardholders earn points 20% faster than Exclusive — 1 point per USD 8 vs. 1 per USD 10. Beyond the earn rate, the Executive tier includes airport lounge access, premium lifestyle benefits, and 3 GB annual complimentary UMI travel data, all included within the USD 1,000 annual membership.' },
      { type: 'callout', text: 'Balance bonuses are the fastest way to accelerate your starting balance. A qualifying high balance can earn up to 15 bonus points on top of your regular card spend.' },
      { type: 'heading', text: 'Redeeming in the app' },
      { type: 'paragraph', text: 'Open the Winity Life app, navigate to Loyalty, and browse available rewards by category. Select the reward you want, confirm the redemption, and your points are deducted instantly. Reward availability varies by market and partner terms. Points do not expire while your account remains active.' },
      { type: 'heading', text: 'Making the most of your balance' },
      { type: 'paragraph', text: 'Combine three earning streams — card spend, balance bonuses, and Winity Loop referral activity — and your balance builds meaningfully each month. Exclusive cardholders have access to the same spectrum of reward categories as Executive. The difference is earn rate and the included premium benefits layer that comes with the Executive tier.' },
    ],
  },

  // ─── Post 6: Guide to Spend Like a Stallion — from client Blog_03 ─────────
  {
    slug: 'guide-to-spend-like-a-stallion-winitys-cny-tiered-rewards',
    title: "Guide to Spend Like a Stallion: Winity's CNY Tiered Rewards",
    excerpt: "Winity's CNY Tiered Spend Rewards program rewards you with point multipliers — Bronze 2×, Silver 4×, Gold 6× — on every eligible settled transaction.",
    category: 'Rewards',
    readTime: '4 min read',
    date: 'February 20, 2026',
    image: 'https://winity.life/wp-content/uploads/2026/02/Blog_v0010-5-1024x538.webp',
    author: 'Winity Life',
    content: [
      { type: 'paragraph', text: 'This Lunar New Year, Winity Life is introducing the "Spend Like a Stallion" tiered rewards program. Running from 17 February through 3 March 2026, this campaign rewards active cardholders with significant Winity Points multipliers based on their spending volume during the festive period.' },
      { type: 'heading', text: 'Understanding the reward multipliers' },
      { type: 'paragraph', text: 'Points are automatically multiplied as you hit each tier threshold. The three confirmed tiers are designed to accelerate your points collection for travel, dining, and premium lifestyle redemptions.' },
      { type: 'list', items: [
        'Bronze Tier: 2× multiplier on every eligible settled transaction.',
        'Silver Tier: 4× multiplier on all eligible card spending.',
        'Gold Tier: 6× multiplier on all transactions once the top threshold is settled.',
      ]},
      { type: 'heading', text: 'Eligible card transactions and settling' },
      { type: 'paragraph', text: 'All standard domestic and international card transactions settled during the promotional window qualify for the points multiplier. Please note that pending transactions must be fully settled by the merchant before the campaign close date to receive the bonus multiplier.' },
      { type: 'callout', text: 'Points multipliers are applied automatically upon transaction settlement. Check your points ledger in the Loyalty section of the app to track your accumulated balance.' },
    ],
  },

  // ─── Post 7: 7 Ways Winity Makes CNY Travels Smoother ─────────────────────
  {
    slug: '7-ways-winity-life-makes-your-cny-travels-smoother',
    title: 'Spend Like a Stallion on the Move: 7 Ways Winity Life Makes Your CNY Travels Smoother',
    excerpt: 'Whether flying home for reunion dinner or jetting off to a tropical escape, Winity keeps your wallet moving as fast as you do during Lunar New Year.',
    category: 'Product',
    readTime: '5 min read',
    date: 'February 17, 2026',
    image: 'https://winity.life/wp-content/uploads/2026/02/Blog_v008-4.jpg',
    author: 'Winity Life',
    content: [
      { type: 'paragraph', text: 'Lunar New Year is the busiest travel season of the year. Whether you are returning to Hong Kong for family reunions or boarding a flight for a holiday getaway, international financial transactions should be the least of your concerns.' },
      { type: 'heading', text: 'Seven ways to travel with confidence' },
      { type: 'paragraph', text: 'Winity Life offers several native features designed specifically for the frequent traveller during festive seasons.' },
      { type: 'list', items: [
        '1. Instant virtual card issuance — approved immediately upon KYC, ready for Google Pay.',
        '2. Zero spend fees — no additional charge on your card purchases.',
        '3. Direct USD denomination — spend stablecoins converted directly to USD balance.',
        '4. Global Visa acceptance — welcomed at over 150 million merchant locations worldwide.',
        '5. ATM access worldwide — withdraw local cash in 200+ countries at a flat USD 3 per transaction.',
        '6. Biometric wallet security — OTP-free 3D Secure in-app approval for secure transactions.',
        '7. Integrated eSIM data — stay connected internationally through our UMI partnership.',
      ]},
      { type: 'callout', text: 'Add your Winity Exclusive card to Google Pay before you arrive at the airport to ensure seamless contactless payments from day one.' },
    ],
  },

  // ─── Post 8: Your Card, On Us Campaign ───────────────────────────────────
  {
    slug: 'winity-life-launches-your-card-on-us-campaign',
    title: "Winity.Life Launches 'Your Card, On Us' Campaign to Reward Active Users",
    excerpt: 'Winity Life announces a new campaign offering free physical cards to active users who meet spending requirements.',
    category: 'Product',
    readTime: '3 min read',
    date: 'January 22, 2026',
    image: 'https://winity.life/wp-content/uploads/2026/01/Blog_v004-7.jpg',
    author: 'Winity Life',
    content: [
      { type: 'paragraph', text: 'Winity Technology Limited has officially launched the "Your Card, On Us" campaign. Designed to reward active members of the Winity ecosystem, this initiative allows virtual cardholders to receive a physical Winity Exclusive Visa card at zero issuance cost.' },
      { type: 'heading', text: 'How to qualify for your physical card' },
      { type: 'paragraph', text: 'Getting your physical card delivered requires meeting a simple spending threshold in the Winity app.' },
      { type: 'list', items: [
        'Download the app and complete KYC verification.',
        'Spend a cumulative USD 25 or more using your Winity Exclusive virtual card.',
        'Request physical card delivery through the card management dashboard.',
        'Annual physical card fee of USD 20/year is waived for the first 6 months.',
      ]},
      { type: 'callout', text: 'Physical card shipping charges may apply depending on your location. The USD 25 spending requirement must consist of settled retail transactions.' },
      { type: 'paragraph', text: 'Card services are issued in Hong Kong and available globally wherever Visa® is accepted. Availability may vary by jurisdiction. See winity.life/terms for full campaign terms.' },
    ],
  },

  // ─── Post 9: Winity Loop Launch Press Release ─────────────────────────────
  {
    slug: 'winity-life-launches-winity-loop-referral-program',
    title: 'Winity Life Launches Winity Loop, a Referral Program That Turns Everyday Spending into Shared Value',
    excerpt: 'The new referral program rewards both referrers and referees with instant credits when spending thresholds are met.',
    category: 'Product',
    readTime: '4 min read',
    date: 'December 29, 2025',
    image: 'https://winity.life/wp-content/uploads/2025/12/Winity-Loop-Press.jpg',
    author: 'Winity Life',
    content: [
      { type: 'paragraph', text: 'Today Winity Life announces the official launch of Winity Loop, a double-sided cash referral rewards program integrated directly into our digital asset payments platform.' },
      { type: 'heading', text: 'Shared value for the community' },
      { type: 'paragraph', text: 'Most referral initiatives only benefit one party. Winity Loop is built to reward both the referrer and the new member equally, encouraging shared growth.' },
      { type: 'list', items: [
        'Generate your unique referral link within the Loop dashboard in the Winity app.',
        'Invite friends to download the app and complete KYC verification.',
        'When the referred friend spends USD 10 cumulative on their card, both parties earn.',
        'USD 2 cash is instantly credited to both accounts with no maximum limit.',
      ]},
      { type: 'callout', text: 'Winity Loop rewards are credited in cash directly to your card balance. Spend immediately anywhere Visa® is accepted.' },
    ],
  },

  // ─── Post 10: Christmas That Keeps Giving ──────────────────────────────────
  {
    slug: 'winity-life-unveils-christmas-that-keeps-giving',
    title: "Winity Life Unveils 'Christmas That Keeps Giving' Campaign",
    excerpt: 'Holiday campaign offers bonus Winity Points and exclusive rewards for cardholders throughout the festive season.',
    category: 'Rewards',
    readTime: '3 min read',
    date: 'December 23, 2025',
    image: 'https://winity.life/wp-content/uploads/2025/12/Christmas-Campaign.jpg',
    author: 'Winity Life',
    content: [
      { type: 'paragraph', text: 'To mark our inaugural festive season, Winity Life is unveiling "The Christmas That Keeps Giving" campaign. This seasonal program offers elevated Winity Points rates and bonus points awards to cardholders during the holidays.' },
      { type: 'heading', text: 'Dynamic balance rewards and loyalty perks' },
      { type: 'paragraph', text: 'Cardholders who top up their wallets and spend during the promotional period receive bonus points multipliers and priority customer assistance.' },
      { type: 'list', items: [
        'Load stablecoins to unlock special holiday loyalty points multipliers.',
        'Qualifying spends earn double Winity Points on selected dining and travel categories.',
        'Exclusive concierge access for high-volume transactions.',
      ]},
      { type: 'callout', text: 'Campaign is active for all KYC-approved cardholders. Terms and conditions apply. Check your in-app inbox for full participation details.' },
    ],
  },

  // ─── Post 7: Executive card guide (rewritten — no false copper info) ───────
  {
    slug: 'winity-executive-metal-card-guide',
    title: 'Winity Executive Metal Card: Fees, Benefits, and How to Join the Waitlist',
    excerpt: 'The premium Winity Executive metal card is coming. Here is everything confirmed about the annual fee, earn rate, included benefits, and how to secure your place in line.',
    category: 'Product',
    readTime: '4 min read',
    date: 'May 27, 2026',
    image: '/executive_hero_holding.jpg',
    author: 'Winity Life',
    content: [
      { type: 'paragraph', text: 'The Winity Executive Card is a premium metal digital asset-linked Visa card designed for global business professionals and high-volume cardholders. It is currently in development with a waitlist open for early access. Here is what is confirmed.' },
      { type: 'heading', text: 'Annual fee and earn rate' },
      { type: 'list', items: [
        'Annual fee: USD 1,000',
        'Earn rate: 1 Winity Point per USD 8 spent (vs. 1 per USD 10 on the Exclusive card)',
        'Material: premium metal finish',
        'Network: Visa® — accepted at 150M+ locations across 200+ countries',
      ]},
      { type: 'heading', text: 'Included benefits' },
      { type: 'paragraph', text: 'The Executive card includes a set of premium lifestyle benefits bundled with the annual membership. Confirmed inclusions are: 3 GB of complimentary UMI travel data per year (resets annually, activatable whenever you travel), priority customer support routing, and access to dedicated concierge services for members holding USD 100,000 or more in account balances in the ecosystem.' },
      { type: 'paragraph', text: 'Additional Executive member benefits — airport lounge access, premium platform subscriptions, wellness and lifestyle perks — are confirmed as part of the tier. Full benefit details are published at winity.life/executive.' },
      { type: 'heading', text: 'How to join the waitlist' },
      { type: 'paragraph', text: 'The Executive card waitlist is active and open at winity.life/executive. Complete the form with your name, email address, and country of residence. Applications take under three minutes. Waitlist members will be contacted directly when the Executive card launches in their jurisdiction.' },
      { type: 'callout', text: 'The Executive card waitlist is open now. Complete your registration at winity.life/executive to secure your priority slot.' },
      { type: 'heading', text: 'How it compares to the Exclusive card' },
      { type: 'list', items: [
        'Annual fee: USD 1,000 (Executive) vs. USD 0 virtual / USD 20/yr physical (Exclusive)',
        'Earn rate: 1 pt / USD 8 (Executive) vs. 1 pt / USD 10 (Exclusive)',
        'UMI Travel Data: 3 GB per year included (Executive) vs. 1 GB after USD 5,000 spend (Exclusive)',
        'Support: Priority routing (Executive) vs. 24/7 WhatsApp (all tiers)',
      ]},
      { type: 'paragraph', text: 'Card services are issued in Hong Kong and available globally wherever Visa® is accepted. The Executive card is subject to availability and applicable terms. Availability may vary by jurisdiction.' },
    ],
  },

  // ─── Post 8: Exclusive card — free physical card guide (rewritten) ─────────
  {
    slug: 'winity-exclusive-free-physical-card',
    title: 'The Winity Exclusive Card: How to Get a Free Physical Visa Card',
    excerpt: 'Most card programmes charge for physical card issuance on top of annual fees. Here is exactly how the Winity Exclusive physical card issuance offer works — and what to check before applying.',
    category: 'Product',
    readTime: '4 min read',
    date: 'May 22, 2026',
    image: '/exclusive_card_fanned.png',
    author: 'Winity Life',
    content: [
      { type: 'paragraph', text: 'The Winity Exclusive Card is a digital asset-linked Visa card with zero annual fee on the virtual tier. Accepted at over 150 million Visa® merchant locations and ATMs globally, the card is issued digitally upon KYC approval — ready to add to Google Pay and spend within minutes.' },
      { type: 'heading', text: 'The virtual card: USD 0 to hold, USD 0 to use' },
      { type: 'paragraph', text: 'Your Winity Exclusive virtual card carries no annual fee. There are no hidden charges on card spend. Stablecoin loads (USDT and USDC) arrive with zero platform load fee. The virtual card is issued immediately after KYC approval — no waiting for shipping, no activation fee.' },
      { type: 'heading', text: 'How to get the physical card at no issuance cost' },
      { type: 'paragraph', text: 'Spend USD 25 on your virtual card and the Winity Exclusive physical card is issued at no issuance cost. The first 6 months of the USD 20/year physical card annual fee are also waived for new activations. Shipping charges may apply depending on your country.' },
      { type: 'callout', text: 'To unlock the free physical card: download the app → complete KYC → receive your virtual card → spend USD 25 → your physical card ships at no issuance cost.' },
      { type: 'heading', text: 'What networks and stablecoins are supported' },
      { type: 'paragraph', text: 'Winity supports 0% load fees for USDT and USDC across multiple blockchains: Tron (TRC-20, typically the lowest gas fees), Ethereum (ERC-20), Binance Smart Chain, Polygon, Solana, and W Chain. All loads convert automatically to USD within the platform for immediate card spend. Non-stablecoin digital assets carry a 5% conversion fee.' },
      { type: 'heading', text: 'Key fee summary' },
      { type: 'list', items: [
        'Virtual card annual fee: USD 0',
        'Physical card annual fee: USD 20/year (first 6 months waived on new activations)',
        'Physical card issuance cost: USD 0 after USD 25 eligible spend',
        'Card spend fee: USD 0',
        'Stablecoin load fee: 0%',
        'ATM withdrawal: USD 3 per transaction at any Visa® ATM worldwide',
        'Earn rate: 1 Winity Point per USD 10 eligible spend',
      ]},
      { type: 'paragraph', text: 'The Winity Exclusive card is available globally wherever Visa® is accepted. Availability may vary by jurisdiction. Card services are issued in Hong Kong. See winity.life/terms for full terms and conditions.' },
    ],
  },
]
