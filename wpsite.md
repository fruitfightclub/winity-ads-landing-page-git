## Public routes

The public page URLs visible from the current Pages screens are below, and these are the primary React routes you should preserve for path continuity. The Home page is marked as the Front Page, and the Legal section includes multiple child pages whose nested paths should stay exactly the same in React to avoid broken links.

| Type | Title | Current URL | React route |
|---|---|---|---|
| Page | Home | `https://winity.life/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) | `/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) |
| Page | Blogs | `https://winity.life/blogs/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) | `/blogs`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) |
| Page | Card Availability | `https://winity.life/card-availability/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) | `/card-availability`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) |
| Page | Delete Account | `https://winity.life/delete-account/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) | `/delete-account`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) |
| Page | FAQ | `https://winity.life/faqs/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) | `/faqs`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) |
| Page | Legal | `https://winity.life/legal/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) | `/legal`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) |
| Page | Free Physical Card Campaign Terms | `https://winity.life/legal/free-physical-exclusive-card-terms/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) | `/legal/free-physical-exclusive-card-terms`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) |
| Page | Google Pay Terms and Conditions | `https://winity.life/legal/googlepay-tnc/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) | `/legal/googlepay-tnc`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) |
| Page | Privacy Policy | `https://winity.life/legal/privacypolicy/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) | `/legal/privacypolicy`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) |
| Page | Referral Program Terms | `https://winity.life/legal/referral-program-terms/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) | `/legal/referral-program-terms`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) |
| Page | Risk Disclosure | `https://winity.life/legal/riskdisclosure/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) | `/legal/riskdisclosure`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) |
| Page | Terms of Use | `https://winity.life/legal/termsofuse/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) | `/legal/termsofuse`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) |
| Page | Winity CNY Tiered Spend Rewards | `https://winity.life/legal/cny-tiered-spend-rewards-terms/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) | `/legal/cny-tiered-spend-rewards-terms`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) |
| Page | Winter Bonus Campaign Terms | `https://winity.life/legal/winter-bonus-terms/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) | `/legal/winter-bonus-terms`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) |
| Page | New Exclusive Card | `https://winity.life/exclusive-card/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) | `/exclusive-card`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) |
| Page | Press Room | `https://winity.life/press-room/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) | `/press-room`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) |
| Page | Support | `https://winity.life/support/`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) | `/support`  [winity](https://winity.life/wp-admin/edit.php?post_type=page) |
| Page | Thank you | `https://winity.life/thank-you/`  | `/thank-you`  |

## Blog URLs

The Posts screen shows 10 posts total, with 9 published and 1 draft, so these published post slugs should also be recreated in React if the new site is replacing WordPress fully. The posts currently fall mainly under the Blogs and Press Release categories, which suggests you should preserve both the `/blogs` listing page and individual article detail pages. 

| Status | Post title | Current URL |
|---|---|---|
| Published | How to Spend Your USDT Without Sending It to a Bank First (2026 Guide) | `https://winity.life/how-to-spend-your-usdt-without-sending-it-to-a-bank-first-2026-guide/`  |
| Published | KYC, Reimagined: From Verification to Activation | `https://winity.life/kyc-reimagined-from-verification-to-activation/`  |
| Published | Guide to Spend Like a Stallion: Winity’s CNY Tiered Rewards | `https://winity.life/guide-to-spend-like-a-stallion-winitys-cny-tiered-rewards/`  |
| Published | Spend Like a Stallion on the Move: 7 Ways Winity Life Makes Your CNY Travels Smoother | `https://winity.life/spend-like-a-stallion-on-the-move-7-ways-winity-life-makes-your-cny-travels-smoother/`  |
| Published | Share the Freedom: How Winity Loop Rewards You and Your Friends! | `https://winity.life/share-the-freedom-how-winity-loop-rewards-you-and-your-friends/`  |
| Published | Winity.Life Launches “Your Card, On Us” Campaign to Reward Active Users | `https://winity.life/winity-life-launches-your-card-on-us-campaign-to-reward-active-users/`  |
| Published | Winity Life Launches Winity Loop, a Referral Program That Turns Everyday Spending into Shared Value | `https://winity.life/winity-life-launches-winity-loop-a-referral-program-that-turns-everyday-spending-into-shared-value/`  |
| Published | Winity Life Unveils “Christmas That Keeps Giving” | `https://winity.life/winity-life-unveils-christmas-that-keeps-giving/`  |
| Published | Winity Life Launches Its First Visa Card and Mobile App | `https://winity.life/winity-life-launches-its-first-visa-card-and-mobile-app/`  |

## Migration scope

A few items in WordPress should be treated carefully during deployment planning because they are not plain static pages. `Fees and Rewards` is marked private even though it has a view URL, and there are draft/public preview pages like `Winity Loop`, `Winter Bonus!`, `New Exclusive Card` draft, and `Elementor Page #5352`, so these should not be made public in React unless your team explicitly wants them live.

The admin also shows BetterDocs, Portfolio, Forminator, Elementor, ElementsKit, LiteSpeed Cache, and WP Staging Pro, which means the old site may depend on docs content, portfolio content, forms, Elementor-built layouts, and current WordPress-side caching or staging workflows. BetterDocs is installed but the “All Docs” admin screen content retrieved here does not expose any actual docs entries, so docs should be verified separately before final cutover if they are publicly linked anywhere on the site.

## Deployment checklist

For the React launch, this is the practical set of things you need to prepare based on what is live now. The goal is to preserve public URLs, avoid SEO loss, and replace WordPress-only behavior cleanly.

- Route inventory: replicate all 18 published page URLs and 9 published post URLs exactly where possible. 
- Redirect map: create 301 redirects for any slug you change, especially if blog routes move under `/blogs/...` instead of staying at root-level post slugs. 
- Content migration: move page copy, blog content, legal pages, media assets, metadata, and any downloadable assets from Elementor/WordPress into your React CMS or source files.
- Forms replacement: audit Forminator usage and replace each form with React + backend/API handling before decommissioning WordPress forms. 
- Docs check: confirm whether BetterDocs content is live anywhere publicly, because installed docs tooling suggests there may be knowledge-base URLs not yet captured here.
- SEO handoff: preserve title tags, meta descriptions, canonical URLs, robots rules, sitemap generation, and structured data for pages and articles. The current site has distinct blog and press-style content that should retain search visibility.
- Hosting behavior: if deploying as an SPA, configure rewrite-to-index for client-side routes while still supporting direct access to nested paths like `/legal/googlepay-tnc`. Those nested paths already exist publicly today.
- Analytics and scripts: review Elementor custom code, header/footer injections, and WordPress header/footer settings so no tracking, chat, or compliance script is lost during migration. The admin shows both Elementor Custom Code and WP Headers and Footers settings. 
- Cache/CDN swap: LiteSpeed Cache is active in WordPress admin, so equivalent caching should move to your React hosting layer or CDN after cutover. 
- Staging and rollback: WP Staging Pro is present, which fits a staged rollout; keep a rollback plan so the domain can point back temporarily if React launch misses critical pages or forms.

## React structure

A clean route structure for the new app would keep the current public slugs intact while separating page templates, blog templates, and legal content in code. This mirrors the live information currently visible in WordPress and keeps deployment safer.

```txt
src/
  routes/
    index.tsx
  pages/
    Home.tsx
    Blogs.tsx
    BlogPost.tsx
    CardAvailability.tsx
    DeleteAccount.tsx
    FAQs.tsx
    ExclusiveCard.tsx
    PressRoom.tsx
    Support.tsx
    ThankYou.tsx
    legal/
      LegalIndex.tsx
      FreePhysicalExclusiveCardTerms.tsx
      GooglePayTnc.tsx
      PrivacyPolicy.tsx
      ReferralProgramTerms.tsx
      RiskDisclosure.tsx
      TermsOfUse.tsx
      CnyTieredSpendRewardsTerms.tsx
      WinterBonusTerms.tsx
  content/
    posts/
      how-to-spend-your-usdt-without-sending-it-to-a-bank-first-2026-guide.md
      kyc-reimagined-from-verification-to-activation.md
      ...
```

If you keep current slugs unchanged, your router should support:
- `/`
- `/blogs`
- `/:postSlug`
- `/card-availability`
- `/delete-account`
- `/faqs`
- `/exclusive-card`
- `/press-room`
- `/support`
- `/thank-you`
- `/legal`
- `/legal/:legalSlug`

The one big architecture decision is whether blog articles remain at root-level slugs, as they are now, or move under `/blogs/slug`; the current WordPress posts are published at root-level article URLs, so changing that will require explicit 301 redirects. 

Would you like me to turn this into a deployment-ready deliverable next: a full migration spreadsheet format with columns for old URL, new React route, content type, status, redirect needed, and owner?