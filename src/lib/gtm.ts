declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export const GTM_ID = (import.meta as any).env?.VITE_GTM_ID || 'GTM-TZMJLDNQ'

export function trackGTMPageView(path: string) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'virtualPageview',
      pagePath: path,
    })
  }
}
