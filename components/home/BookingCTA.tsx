'use client'

import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import RevealAnimation from '@/components/ui/RevealAnimation'

export default function BookingCTA() {
  const { t } = useLanguage()
  const b = t.booking

  return (
    <section className="section-padding bg-cream">
      <div className="container-luxury">
        <div className="max-w-2xl mx-auto text-center">
          <RevealAnimation>
            <p className="eyebrow mb-5">{b.eyebrow}</p>
            <h2 className="font-serif text-display-lg text-charcoal mb-6">{b.headline}</h2>
            <p className="text-body-lg text-textSecondary mb-10">{b.subheadline}</p>
            <Link href="/book" className="btn-primary px-12 py-4">
              {t.nav.bookCta}
            </Link>
          </RevealAnimation>
        </div>
      </div>
    </section>
  )
}
