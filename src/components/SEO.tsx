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

    // Open Graph
    const setOG = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', property)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setOG('og:title', title)
    setOG('og:description', description)
    if (canonicalUrl) setOG('og:url', canonicalUrl)
    if (ogImage) setOG('og:image', ogImage)
  }, [title, description, canonicalUrl, ogImage])

  return null
}
