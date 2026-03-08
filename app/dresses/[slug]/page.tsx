'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import { dresses } from '@/content/dresses'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

export default function DressPage({ params }: { params: Promise<{ slug: string }> }) {
  const { locale, t } = useLanguage()
  const { slug } = (params as unknown as { slug: string })
  const dress = dresses.find(d => d.slug === slug)

  const [activeIndex, setActiveIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  if (!dress) return notFound()

  const prev = () => setActiveIndex(i => (i - 1 + dress.images.length) % dress.images.length)
  const next = () => setActiveIndex(i => (i + 1) % dress.images.length)

  return (
    <>
      <Header />
      <main className="pt-24">
        <div className="container-luxury section-padding">
          {/* Back */}
          <Link
            href="/dresses"
            className="eyebrow text-taupe hover:text-charcoal transition-colors flex items-center gap-2 mb-10"
          >
            <ChevronLeft size={14} />
            {locale === 'he' ? 'חזרה לקולקציה' : 'Back to collection'}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Gallery */}
            <div>
              {/* Main image */}
              <div className="relative aspect-[3/4] bg-ivory overflow-hidden mb-4">
                {showVideo && dress.video ? (
                  <video
                    src={dress.video}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <Image
                      src={dress.images[activeIndex]}
                      alt={dress.name[locale]}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                      unoptimized
                    />
                    {/* Prev / Next */}
                    {dress.images.length > 1 && (
                      <>
                        <button
                          onClick={prev}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-warmWhite/80 backdrop-blur-sm p-2 hover:bg-warmWhite transition-colors"
                          aria-label="Previous"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={next}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-warmWhite/80 backdrop-blur-sm p-2 hover:bg-warmWhite transition-colors"
                          aria-label="Next"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                    {/* Counter */}
                    <div className="absolute bottom-3 right-3 bg-charcoal/60 text-cream text-xs px-2 py-1">
                      {activeIndex + 1} / {dress.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {dress.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveIndex(i); setShowVideo(false) }}
                    className={`flex-shrink-0 relative w-16 h-20 overflow-hidden transition-all duration-300 ${
                      activeIndex === i && !showVideo ? 'ring-1 ring-charcoal' : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" unoptimized />
                  </button>
                ))}
                {dress.video && (
                  <button
                    onClick={() => setShowVideo(true)}
                    className={`flex-shrink-0 w-16 h-20 bg-charcoal flex items-center justify-center transition-all duration-300 ${
                      showVideo ? 'ring-1 ring-charcoal' : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <Play size={16} className="text-cream" />
                  </button>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow text-taupe mb-4">{dress.fabric[locale]}</p>
              <h1 className="font-serif text-display-md text-charcoal mb-6">{dress.name[locale]}</h1>
              <p className="text-body-lg text-textSecondary leading-relaxed mb-8">{dress.description[locale]}</p>

              <div className="flex flex-wrap gap-2 mb-10">
                {dress.tags[locale].map(tag => (
                  <span key={tag} className="eyebrow border border-charcoal/20 px-3 py-1.5 text-taupe">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="border-t border-charcoal/10 pt-10 space-y-4">
                <Link href="/book" className="btn-primary w-full justify-center">
                  {t.nav.bookCta}
                </Link>
                <Link href="/contact" className="btn-outline w-full justify-center">
                  {locale === 'he' ? 'שאלי על השמלה' : 'Ask about this dress'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
