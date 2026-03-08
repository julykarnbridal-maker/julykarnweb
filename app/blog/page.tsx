'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import { blogPosts } from '@/content/blog'
import RevealAnimation from '@/components/ui/RevealAnimation'
import { Clock } from 'lucide-react'

export default function BlogPage() {
  const { locale } = useLanguage()

  const labels = {
    he: { eyebrow: 'בלוג', headline: 'מדריכים ועולם הכלות', sub: 'תוכן שנכתב עם ניסיון אמיתי' },
    en: { eyebrow: 'Journal', headline: 'Guides & Bridal World', sub: 'Content written from real experience' },
  }[locale]

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Header */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <RevealAnimation>
              <p className="eyebrow mb-4">{labels.eyebrow}</p>
              <h1 className="font-serif text-display-lg text-charcoal">{labels.headline}</h1>
              <p className="mt-4 text-body-lg text-textSecondary">{labels.sub}</p>
            </RevealAnimation>
          </div>
        </section>

        {/* Posts grid */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury">
            {/* Featured post */}
            <RevealAnimation className="mb-16">
              <Link href={`/blog/${blogPosts[0].slug}`} className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="img-hover relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title[locale]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div>
                  <p className="eyebrow text-taupe mb-3">{blogPosts[0].category[locale]}</p>
                  <h2 className="font-serif text-display-sm text-charcoal mb-4 group-hover:text-taupe transition-colors duration-400">
                    {blogPosts[0].title[locale]}
                  </h2>
                  <p className="text-body-md text-textSecondary mb-6">{blogPosts[0].description[locale]}</p>
                  <div className="flex items-center gap-4 text-caption text-textMuted">
                    <span>{new Date(blogPosts[0].datePublished).toLocaleDateString(locale === 'he' ? 'he-IL' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {blogPosts[0].readingTime} {locale === 'he' ? 'דקות קריאה' : 'min read'}
                    </span>
                  </div>
                  <span className="btn-ghost mt-6 inline-flex">
                    {locale === 'he' ? 'קראי עוד' : 'Read more'} →
                  </span>
                </div>
              </Link>
            </RevealAnimation>

            <hr className="hr-luxury mb-16" />

            {/* Rest of posts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {blogPosts.slice(1).map((post, i) => (
                <RevealAnimation key={post.slug} delay={i * 0.1}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="img-hover relative overflow-hidden mb-5" style={{ aspectRatio: '4/3' }}>
                      <Image
                        src={post.image}
                        alt={post.title[locale]}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <p className="eyebrow text-taupe mb-2">{post.category[locale]}</p>
                    <h2 className="font-serif text-xl text-charcoal mb-3 group-hover:text-taupe transition-colors duration-400 leading-snug">
                      {post.title[locale]}
                    </h2>
                    <p className="text-body-sm text-textSecondary line-clamp-3 mb-4">
                      {post.description[locale]}
                    </p>
                    <div className="flex items-center gap-3 text-caption text-textMuted">
                      <Clock size={11} />
                      <span>{post.readingTime} {locale === 'he' ? 'דקות' : 'min'}</span>
                    </div>
                  </Link>
                </RevealAnimation>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
