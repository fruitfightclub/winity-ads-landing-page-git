# Meta Tracking & Image Optimization Setup
**Task:** Implement Meta Tracking Funnel & Compress Web Assets

Before we deploy this branch to production, we need the full Meta tracking funnel active for the ads, and we need to fix the image payload size to avoid mobile bounce rates.

### 1. Inject the Meta Pixel
Open `index.html` and paste this right before the closing `</head>` tag:
```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1328390426153027');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1328390426153027&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

### 2. Add Event Tracking to React Buttons
Add this helper function to the project so we can fire events when users click things:
```typescript
export const trackMetaEvent = (eventName: string) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName);
  }
};
```
*   Then add `onClick={() => trackMetaEvent('InitiateCheckout')}` to the **"Apply Now" / "Get a Card"** buttons.
*   Add `onClick={() => trackMetaEvent('Lead')}` to the **email submission** or waitlist button.

### 3. Optimize the Images (Crucial for Ad Performance)
The current `index.html` is loading `cdn_hero_card_exclusive.png` which is massive (2.5MB). This will cause mobile users from the ads to bounce before the page loads. Please run the images in the `public/` folder through a WebP converter and compress them before pushing this branch live.