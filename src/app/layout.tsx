/*
  ============================================================
  CLIENT:      Winity Life
  PHILOSOPHY:  Emerald Noir
  DELIVERABLE: Ads Landing Page V6 — Next.js Layout
  TSS STUDIO | CREATED BY AN ARTIST. POWERED BY AI.
  ============================================================
*/

import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Winity Life — Spend Your Stablecoins Anywhere Visa® Is Accepted',
  description: 'The Winity Exclusive Card. Deposit USDT or USDC. Spend globally at 150M+ merchants. Available in 180+ countries. Apply now.',
  robots: 'noindex, nofollow',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#030C0C',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ════ CRITICAL PRELOADS — LCP optimization ════ */}
        <link rel="preload" as="image" href="/hero_bg_mobile.png" fetchPriority="high" type="image/png"
          media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/hero_bg_desktop.png" fetchPriority="high" type="image/png"
          media="(min-width: 768px)" />
        <link rel="preconnect" href="https://www.facebook.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />

        {/* Roboto from Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

        {/* ════ META PIXEL — 1328390426153027 ════ */}
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','1328390426153027');
          fbq('track','PageView');
        ` }} />
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=1328390426153027&ev=PageView&noscript=1" alt="" />
        </noscript>

        {/* ════ MICROSOFT CLARITY — x4ccp4h8xb ════ */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,"clarity","script","x4ccp4h8xb");
        ` }} />

        {/* ════ GTM — GTM-TZMJLDNQ ════ */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TZMJLDNQ');
        ` }} />
      </head>
      <body>
        {/* GTM noscript */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TZMJLDNQ"
            height="0" width="0" style={{display:'none',visibility:'hidden'}} />
        </noscript>

        {children}

        {/* ════ GA4 ════ */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          window.dataLayer=window.dataLayer||[];
          function gtag(){dataLayer.push(arguments);}
          gtag('js',new Date());
          gtag('config','G-XXXXXXXXXX',{send_page_view:true});
        ` }} />
      </body>
    </html>
  );
}
