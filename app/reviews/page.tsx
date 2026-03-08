'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import RevealAnimation from '@/components/ui/RevealAnimation'

const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/place/Julie+Karn+Bridal/@32.0497163,34.7566952,17z/data=!4m6!3m5!1s0x151d4dbcea7d5fab:0x2b8e52efd6f2cfb3!8m2!3d32.0497163!4d34.7566952!16s%2Fg%2F11qbfrvqxw?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D'

export default function ReviewsPage() {
  const { t, locale } = useLanguage()
  const r = t.reviews

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Header */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <RevealAnimation>
              <p className="eyebrow mb-4">{r.eyebrow}</p>
              <h1 className="font-serif text-display-lg text-charcoal">{r.headline}</h1>
            </RevealAnimation>
          </div>
        </section>

        {/* Reviews grid */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-charcoal/8">
              {r.items.map((item, i) => (
                <RevealAnimation key={i} delay={i * 0.1}>
                  <a
                    href={GOOGLE_REVIEWS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-warmWhite p-10 lg:p-14 group transition-colors duration-300 hover:bg-ivory"
                  >
                    <span className="font-serif text-6xl text-gold/40 leading-none block mb-2">&ldquo;</span>
                    <p className="font-serif text-2xl text-charcoal font-light leading-relaxed mb-8">
                      {item.quote}
                    </p>
                    <div className="border-t border-charcoal/10 pt-6 flex items-end justify-between gap-4">
                      <div>
                        <p className="font-serif text-lg text-charcoal">{item.name}</p>
                        <p className="eyebrow text-taupe mt-1">{item.wedding}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {[...Array(5)].map((_, s) => (
                          <svg key={s} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                        <svg className="w-4 h-4 text-taupe/40 ms-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </RevealAnimation>
              ))}
            </div>

            {/* CTA to Google */}
            <div className="mt-16 text-center">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-3"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
                </svg>
                {locale === 'he' ? 'כל הביקורות ב-Google' : 'All reviews on Google'}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
