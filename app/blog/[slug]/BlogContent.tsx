'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import type { BlogPost, BlogSection } from '@/content/blog'
import RevealAnimation from '@/components/ui/RevealAnimation'
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react'

function Section({ section, locale }: { section: BlogSection; locale: 'he' | 'en' }) {
  switch (section.type) {
    case 'h2':
      return <h2 className="font-serif text-display-sm text-charcoal mt-10 mb-4">{section.text}</h2>
    case 'h3':
      return <h3 className="font-serif text-2xl text-charcoal mt-8 mb-3">{section.text}</h3>
    case 'p':
      return <p className="text-body-lg text-textSecondary leading-relaxed mb-4">{section.text}</p>
    case 'ul':
      return (
        <ul className="space-y-3 mb-6 ps-0">
          {section.items?.map((item, i) => (
            <li key={i} className="flex gap-3 text-body-md text-textSecondary">
              <span className="text-gold flex-shrink-0 mt-1.5">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'cta':
      return (
        <div className="my-10 p-8 bg-cream flex flex-col sm:flex-row items-center gap-4 justify-between">
          <p className="font-serif text-xl text-charcoal">{section.ctaText}</p>
          <Link href={section.ctaHref || '/book'} className="btn-primary flex-shrink-0">
            {locale === 'he' ? 'קבעי תור' : 'Book a Fitting'}
          </Link>
        </div>
      )
    default:
      return null
  }
}

export default function BlogContent({ post }: { post: BlogPost }) {
  const { locale } = useLanguage()
  const content = post.content[locale]
  const ArrowBack = locale === 'he' ? ArrowRight : ArrowLeft

  return (
    <main className="pt-24">
      {/* Hero image */}
      <div className="relative h-[50vh] md:h-[60vh] bg-charcoal overflow-hidden">
        <Image
          src={post.image}
          alt={post.title[locale]}
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute bottom-0 start-0 end-0 container-luxury pb-10">
          <p className="eyebrow text-cream/60 mb-3">{post.category[locale]}</p>
          <h1 className="font-serif text-display-md text-cream max-w-3xl">{post.title[locale]}</h1>
        </div>
      </div>

      {/* Meta bar */}
      <div className="bg-ivory border-b border-charcoal/10">
        <div className="container-luxury py-4 flex flex-wrap items-center justify-between gap-4">
          <Link href="/blog" className="btn-ghost text-textSecondary flex items-center gap-2">
            <ArrowBack size={14} />
            {locale === 'he' ? 'כל הכתבות' : 'All articles'}
          </Link>
          <div className="flex items-center gap-4 text-caption text-textMuted">
            <time dateTime={post.datePublished}>
              {new Date(post.datePublished).toLocaleDateString(
                locale === 'he' ? 'he-IL' : 'en-GB',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </time>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.readingTime} {locale === 'he' ? 'דקות קריאה' : 'min read'}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="section-padding bg-warmWhite">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main content */}
            <div className="lg:col-span-8">
              <RevealAnimation>
                <p className="text-body-lg text-textSecondary italic mb-8 pb-8 border-b border-charcoal/10">
                  {post.description[locale]}
                </p>
              </RevealAnimation>

              <RevealAnimation delay={0.1}>
                {content.map((section, i) => (
                  <Section key={i} section={section} locale={locale} />
                ))}
              </RevealAnimation>

              {/* Share / tags */}
              <RevealAnimation delay={0.2} className="mt-12 pt-8 border-t border-charcoal/10">
                <div className="flex flex-wrap gap-2">
                  {post.keywords.slice(0, 5).map(kw => (
                    <span key={kw} className="eyebrow border border-warmGrey/30 px-3 py-1 text-taupe">
                      {kw}
                    </span>
                  ))}
                </div>
              </RevealAnimation>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-8">
                {/* CTA card */}
                <RevealAnimation>
                  <div className="bg-charcoal p-8 text-cream">
                    <p className="font-serif text-2xl mb-3">
                      {locale === 'he' ? 'מוכנה להתחיל?' : 'Ready to begin?'}
                    </p>
                    <p className="text-body-sm text-cream/70 mb-6">
                      {locale === 'he'
                        ? 'פגישה ראשונה ללא התחייבות — שיחה על החלום שלך.'
                        : 'First meeting, no obligation — a conversation about your dream.'}
                    </p>
                    <Link href="/book" className="btn-primary bg-cream text-charcoal hover:bg-warmWhite w-full justify-center">
                      {locale === 'he' ? 'קבעי תור' : 'Book a Fitting'}
                    </Link>
                  </div>
                </RevealAnimation>

                {/* Related links */}
                {post.relatedLinks.length > 0 && (
                  <RevealAnimation delay={0.1}>
                    <div>
                      <p className="eyebrow mb-4">{locale === 'he' ? 'קריאה נוספת' : 'Further reading'}</p>
                      <div className="space-y-3">
                        {post.relatedLinks.map(link => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="block text-body-sm text-textSecondary hover:text-charcoal transition-colors duration-300 border-b border-charcoal/8 pb-3"
                          >
                            {link.label[locale]} →
                          </Link>
                        ))}
                      </div>
                    </div>
                  </RevealAnimation>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
