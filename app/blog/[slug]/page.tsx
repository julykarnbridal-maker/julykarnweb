import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BlogContent from './BlogContent'
import JsonLd, { articleSchema, breadcrumbSchema } from '@/components/seo/JsonLd'
import { blogPosts } from '@/content/blog'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return {}

  return {
    title: post.title.en,
    description: post.description.en,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title.en,
      description: post.description.en,
      images: [{ url: post.image }],
      type: 'article',
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
    },
  }
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://juliekarn.com'

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) notFound()

  const jsonLd = articleSchema({
    title: post.title.en,
    description: post.description.en,
    slug: post.slug,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    image: post.image,
  })

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: BASE },
    { name: 'Blog', url: `${BASE}/blog` },
    { name: post.title.en, url: `${BASE}/blog/${slug}` },
  ])

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumb} />
      <Header />
      <BlogContent post={post} />
      <Footer />
    </>
  )
}
