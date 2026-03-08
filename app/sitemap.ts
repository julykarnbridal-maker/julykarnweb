import { MetadataRoute } from 'next'
import { dresses } from '@/content/dresses'
import { blogPosts } from '@/content/blog'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://juliekarn.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Core pages
  const core = [
    { path: '', priority: 1.0, freq: 'weekly' as const },
    { path: '/about', priority: 0.9, freq: 'monthly' as const },
    { path: '/dresses', priority: 0.9, freq: 'monthly' as const },
    { path: '/process', priority: 0.8, freq: 'monthly' as const },
    { path: '/reviews', priority: 0.8, freq: 'monthly' as const },
    { path: '/book', priority: 0.9, freq: 'monthly' as const },
    { path: '/faq', priority: 0.7, freq: 'monthly' as const },
    { path: '/contact', priority: 0.8, freq: 'monthly' as const },
  ].map(({ path, priority, freq }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }))

  // Local SEO
  const local = [
    '/tel-aviv',
  ].map(path => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Hebrew SEO landing pages
  const hebrewSeo = [
    '/shimot-kala-minimalistiot-tel-aviv',
    '/shimot-kala-elegantiot-tel-aviv',
    '/shimot-kala-itzuv-ishi',
  ].map(path => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // English SEO landing pages
  const englishSeo = [
    '/minimalist-wedding-dresses',
    '/elegant-wedding-dresses',
    '/timeless-wedding-dresses',
  ].map(path => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Blog
  const blog = [
    {
      url: `${BASE}/blog`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...blogPosts.map(post => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.dateModified),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]

  // Dress catalog
  const dressCatalog = dresses.map(d => ({
    url: `${BASE}/dresses/${d.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...core, ...local, ...hebrewSeo, ...englishSeo, ...blog, ...dressCatalog]
}
