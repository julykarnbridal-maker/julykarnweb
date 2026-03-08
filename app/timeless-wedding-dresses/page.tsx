import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { dresses } from '@/content/dresses'

export const metadata: Metadata = {
  title: 'Timeless Wedding Dresses | שמלות כלה על-זמניות | Julie Karn Bridal Israel',
  description: 'Timeless wedding dresses that transcend trends. Designed for the bride who wants to look extraordinary in photographs for decades. Julie Karn Bridal, Tel Aviv.',
  keywords: ['timeless wedding dresses', 'timeless wedding gown israel', 'שמלות כלה על זמניות', 'classic wedding dress israel', 'satin wedding gown', 'silk wedding dress israel'],
  alternates: { canonical: '/timeless-wedding-dresses' },
}

const HERO = 'https://images.unsplash.com/photo-1536632788163-5e1b88742f76?w=1400&q=90&fit=crop'

export default function TimelessWeddingDressesPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative h-[70vh] flex items-end bg-charcoal overflow-hidden">
          <Image
            src={HERO}
            alt="Timeless Wedding Dresses Israel"
            fill
            className="object-cover opacity-55"
            priority
          />
          <div className="relative z-10 container-luxury pb-16">
            <p className="eyebrow text-cream/60 mb-3">Julie Karn Bridal</p>
            <h1 className="font-serif text-display-lg text-cream max-w-2xl">
              Timeless Wedding Dresses<br />
              <span className="text-gold font-light">שמלות כלה על-זמניות</span>
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-body-lg text-textSecondary leading-relaxed">
                A timeless wedding gown looks just as beautiful on your 25th anniversary as it did on the wedding day.
                Julie Karn designs beyond trends — focusing on proportion, fabric quality and the woman wearing the dress.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {dresses.slice(0, 6).map(dress => (
                <Link key={dress.id} href={`/dresses/${dress.slug}`} className="group block">
                  <div className="img-hover relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    <Image
                      src={dress.image}
                      alt={`${dress.name.en} — Timeless Wedding Dress`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="font-serif text-xl text-charcoal">{dress.name.en}</p>
                    <p className="eyebrow text-taupe mt-1">{dress.fabric.en}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why timeless matters — SEO rich text */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl">
              <div>
                <h2 className="font-serif text-display-sm text-charcoal mb-5">
                  What Makes a Wedding Dress Timeless?
                </h2>
                <p className="text-body-md text-textSecondary leading-relaxed mb-4">
                  Timeless bridal design avoids fast-fashion trends in favour of classic silhouettes, quality materials and expert construction.
                  A satin A-line from 1985 still looks beautiful today. The same principle guides every Julie Karn gown.
                </p>
                <p className="text-body-md text-textSecondary leading-relaxed">
                  Julie works with premium European silks, duchess satins, and fine crepes — fabrics that photograph beautifully and age gracefully.
                </p>
              </div>
              <div dir="rtl" lang="he">
                <h2 className="font-serif text-display-sm text-charcoal mb-5">
                  מה הופך שמלת כלה לעל-זמנית?
                </h2>
                <p className="text-body-md text-textSecondary leading-relaxed mb-4">
                  עיצוב כלות על-זמני נמנע מטרנדים לטובת סילואטים קלאסיים, חומרים איכותיים ותפירה מקצועית.
                  A-ליין בסאטן מ-1985 נראה יפה גם היום. אותו עיקרון מנחה כל שמלת ג'ולי קארן.
                </p>
                <p className="text-body-md text-textSecondary leading-relaxed">
                  ג'ולי עובדת עם משי אירופאי פרמיום, סאטן דאשס וקרפ עדין — בדים שמצולמים יפה ויפים לאורך שנים.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-charcoal">
          <div className="container-luxury text-center">
            <h2 className="font-serif text-display-md text-cream mb-6">
              Your Timeless Gown Awaits
            </h2>
            <Link href="/book" className="btn-primary bg-cream text-charcoal hover:bg-warmWhite">
              Book a Fitting
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
