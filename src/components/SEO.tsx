import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  canonicalUrl?: string
  ogImage?: string
}

export default function SEO({ title, description, canonicalUrl, ogImage }: SEOProps) {
  useEffect(() => {
    document.title = title

    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = description

    // Helper to set meta tags by property (Open Graph)
    const setOG = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', property)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // Helper to set meta tags by name (Twitter Cards, description, etc.)
    const setMetaName = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement
      if (!el) {
        el = document.createElement('meta')
        el.name = name
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // Resolve absolute URL for ogImage / twitter:image
    const defaultImage = '/og-image.webp'
    const imagePath = ogImage || defaultImage
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://winity.life'
    const absoluteOgImage = imagePath.startsWith('http') ? imagePath : `${origin}${imagePath}`

    // Update Open Graph (Facebook, LinkedIn, Slack, WhatsApp)
    setOG('og:title', title)
    setOG('og:description', description)
    setOG('og:image', absoluteOgImage)

    const absoluteCanonical = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://winity.life')
    setOG('og:url', absoluteCanonical)

    // Update Twitter Cards
    setMetaName('twitter:title', title)
    setMetaName('twitter:description', description)
    setMetaName('twitter:image', absoluteOgImage)
  }, [title, description, canonicalUrl, ogImage])

  return null
}
