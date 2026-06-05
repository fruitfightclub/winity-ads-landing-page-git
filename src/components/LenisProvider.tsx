import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

export function getLenis() {
  return lenis
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    // Drive Lenis through GSAP's ticker so ScrollTrigger and Lenis
    // share the same animation frame — prevents desync on reload
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const tickerFn = (time: number) => { lenis?.raf(time * 1000) }
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis?.off('scroll', onScroll)
      gsap.ticker.remove(tickerFn)
      lenis?.destroy()
      lenis = null
    }
  }, [])

  return <>{children}</>
}
