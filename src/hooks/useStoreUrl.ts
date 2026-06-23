// ==============================================================================
// TSS STUDIO — PHILOSOPHY REFERENCE BLOCK
// Client: Winity Life
// Philosophy: Emerald Noir
// Palette: Deep Teal (#0B2E2C) | Mint Accent (#21E6A7) | Aqua Glow (#3CF2D0)
// Phase: Phase 6 (Build & Optimization)
// Date: 2026-06-15
// Status: Production
// ==============================================================================

import { useState, useEffect } from 'react'

export function useStoreUrl() {
  const [storeUrl, setStoreUrl] = useState('https://apps.apple.com/us/app/winity-life/id6752761057')

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
    
    if (/android/i.test(userAgent)) {
      setStoreUrl('https://play.google.com/store/apps/details?id=com.winity.life')
    } else {
      setStoreUrl('https://apps.apple.com/us/app/winity-life/id6752761057')
    }
  }, [])

  return storeUrl
}
