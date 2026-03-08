'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import DressCard from '@/components/ui/DressCard'
import { useLanguage } from '@/hooks/useLanguage'
import { dresses } from '@/content/dresses'
import RevealAnimation from '@/components/ui/RevealAnimation'

export default function DressesPage() {
  const { t, locale } = useLanguage()

  const filtered = dresses

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <RevealAnimation>
              <p className="eyebrow mb-4">{t.featured.eyebrow}</p>
              <h1 className="font-serif text-display-lg text-charcoal">{t.nav.dresses}</h1>
              <p className="mt-4 text-body-lg text-textSecondary max-w-xl">{t.featured.subheadline}</p>
            </RevealAnimation>
          </div>
        </section>

        {/* Dresses grid */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {filtered.map((dress, i) => (
                <RevealAnimation key={dress.id} delay={i * 0.05}>
                  <DressCard dress={dress} />
                </RevealAnimation>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="font-serif text-2xl text-textMuted">—</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
