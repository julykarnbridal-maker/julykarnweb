'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'
import { dresses } from '@/content/dresses'
import RevealAnimation from '@/components/ui/RevealAnimation'

export default function FeaturedDresses() {
  const { t, locale } = useLanguage()
  const f = t.featured
  const featured = dresses.filter(d => d.featured).slice(0, 4)

  return (
    <section className="section-padding bg-warmWhite">
      <div className="container-luxury">
        {/* Header */}
        <RevealAnimation>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="eyebrow mb-3">{f.eyebrow}</p>
              <h2 className="font-serif text-display-md text-charcoal">{f.headline}</h2>
            </div>
            <Link href="/dresses" className="btn-ghost flex-shrink-0">
              {f.viewAll} →
            </Link>
          </div>
        </RevealAnimation>

        {/* Editorial grid — asymmetric 2+2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Large card — left */}
          <RevealAnimation delay={0.1} className="md:col-span-7">
            <Link href={`/dresses/${featured[0].slug}`} className="group block">
              <div className="img-hover relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <Image
                  src={featured[0].image}
                  alt={featured[0].name[locale]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 58vw"
                  priority
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-all duration-600" />
                {/* Label */}
                <div className="absolute bottom-6 start-6 bg-warmWhite/90 backdrop-blur-sm px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <p className="font-serif text-lg text-charcoal">{featured[0].name[locale]}</p>
                  <p className="eyebrow text-taupe mt-0.5">{featured[0].fabric[locale]}</p>
                </div>
              </div>
              <div className="mt-5">
                <p className="font-serif text-2xl text-charcoal">{featured[0].name[locale]}</p>
                <p className="eyebrow text-taupe mt-1">{featured[0].fabric[locale]}</p>
              </div>
            </Link>
          </RevealAnimation>

          {/* Right column — stacked */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {featured.slice(1, 3).map((dress, i) => (
              <RevealAnimation key={dress.id} delay={0.2 + i * 0.1}>
                <Link href={`/dresses/${dress.slug}`} className="group block">
                  <div className="img-hover relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <Image
                      src={dress.image}
                      alt={dress.name[locale]}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 42vw"
                    />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-all duration-600" />
                  </div>
                  <div className="mt-4 flex items-start justify-between">
                    <div>
                      <p className="font-serif text-xl text-charcoal">{dress.name[locale]}</p>
                      <p className="eyebrow text-taupe mt-1">{dress.fabric[locale]}</p>
                    </div>
                    <span className="text-taupe opacity-0 group-hover:opacity-100 transition-opacity duration-400 mt-1">→</span>
                  </div>
                </Link>
              </RevealAnimation>
            ))}
          </div>
        </div>

        {/* Bottom sub-text */}
        <RevealAnimation delay={0.4} className="mt-16 text-center">
          <p className="text-body-sm text-textSecondary max-w-lg mx-auto">{f.subheadline}</p>
        </RevealAnimation>
      </div>
    </section>
  )
}
