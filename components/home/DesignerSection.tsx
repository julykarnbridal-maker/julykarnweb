'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import RevealAnimation from '@/components/ui/RevealAnimation'

const DESIGNER_IMAGE = 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=900&q=85&fit=crop'

const STATS = [
  { value: '15+', key: 'experience' },
  { value: '200+', key: 'brides' },
  { value: '30+', key: 'fabrics' },
]

export default function DesignerSection() {
  const { t } = useLanguage()
  const d = t.designer

  return (
    <section className="section-padding bg-ivory">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <RevealAnimation className="order-2 lg:order-1">
            <div className="relative">
              <div className="img-hover relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <Image
                  src={DESIGNER_IMAGE}
                  alt="Julie Karn — Bridal Designer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Stats overlay card */}
              <div className="absolute -bottom-6 -end-6 bg-warmWhite p-8 shadow-sm hidden md:block">
                <div className="grid grid-cols-3 gap-8 divide-x rtl:divide-x-reverse divide-warmGrey/20">
                  {STATS.map(stat => (
                    <div key={stat.key} className="px-4 first:ps-0 last:pe-0">
                      <p className="font-serif text-3xl text-charcoal">{stat.value}</p>
                      <p className="eyebrow text-taupe mt-1">
                        {d[stat.key as keyof typeof d] as string}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealAnimation>

          {/* Text side */}
          <div className="order-1 lg:order-2 lg:ps-8">
            <RevealAnimation>
              <p className="eyebrow mb-4">{d.eyebrow}</p>
              <h2 className="font-serif text-display-md text-charcoal mb-3">{d.headline}</h2>
              <div className="line-accent mb-8" />
            </RevealAnimation>

            <div className="space-y-5">
              {[d.body1, d.body2, d.body3].map((para, i) => (
                <RevealAnimation key={i} delay={0.1 + i * 0.1}>
                  <p className="text-body-md text-textSecondary leading-relaxed">{para}</p>
                </RevealAnimation>
              ))}
            </div>

            <RevealAnimation delay={0.4} className="mt-10">
              <Link href="/about" className="btn-outline">
                {d.cta}
              </Link>
            </RevealAnimation>

            {/* Mobile stats */}
            <RevealAnimation delay={0.5} className="mt-10 md:hidden">
              <div className="grid grid-cols-3 gap-4">
                {STATS.map(stat => (
                  <div key={stat.key} className="text-center">
                    <p className="font-serif text-2xl text-charcoal">{stat.value}</p>
                    <p className="eyebrow text-taupe mt-1 text-center">{d[stat.key as keyof typeof d] as string}</p>
                  </div>
                ))}
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
