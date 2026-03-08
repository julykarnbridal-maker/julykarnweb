import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { dresses } from '@/content/dresses'

export const metadata: Metadata = {
  title: 'Elegant Wedding Dresses Israel | שמלות כלה אלגנטיות תל אביב | Julie Karn',
  description: 'Elegant, timeless wedding dresses designed in Tel Aviv, Israel. Premium fabrics, personal fittings. Julie Karn Bridal — שמלות כלה אלגנטיות ועל-זמניות. תפירה אישית, בדים פרמיום.',
  keywords: ['elegant wedding dresses', 'elegant wedding dresses israel', 'שמלות כלה אלגנטיות', 'שמלות כלה אלגנטיות תל אביב', 'luxury wedding dress israel'],
  alternates: { canonical: '/elegant-wedding-dresses' },
}

const HERO = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=90&fit=crop'

export default function ElegantWeddingDressesPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative h-[70vh] flex items-end bg-charcoal overflow-hidden">
          <Image
            src={HERO}
            alt="Elegant Wedding Dresses Israel"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="relative z-10 container-luxury pb-16">
            <p className="eyebrow text-cream/60 mb-3">Julie Karn Bridal</p>
            <h1 className="font-serif text-display-lg text-cream max-w-2xl">
              Elegant Wedding Dresses<br />
              <span className="text-gold font-light">שמלות כלה אלגנטיות</span>
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-body-lg text-textSecondary leading-relaxed">
                Elegance is not about excess — it is about intention. Julie Karn bridal gowns are defined by their refined proportions,
                exceptional fabrics and the quiet confidence they give every bride.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {dresses.slice(0, 3).map(dress => (
                <Link key={dress.id} href={`/dresses/${dress.slug}`} className="group block">
                  <div className="img-hover relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    <Image
                      src={dress.image}
                      alt={`${dress.name.en} — Elegant Wedding Dress Israel`}
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

        <section className="section-padding bg-ivory">
          <div className="container-luxury grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
            <div>
              <h2 className="font-serif text-display-sm text-charcoal mb-5">Elegant Bridal Design in Tel Aviv</h2>
              <p className="text-body-md text-textSecondary leading-relaxed">
                Each Julie Karn gown is designed with the bride's individuality at its heart.
                Using premium silks, satins, and laces sourced from leading European mills,
                every dress is tailored to perfection through multiple personal fitting appointments in Tel Aviv.
              </p>
            </div>
            <div dir="rtl" lang="he">
              <h2 className="font-serif text-display-sm text-charcoal mb-5">עיצוב כלות אלגנטי בתל אביב</h2>
              <p className="text-body-md text-textSecondary leading-relaxed">
                כל שמלת ג'ולי קארן מעוצבת עם אישיות הכלה במרכז.
                באמצעות משי, סאטן ותחרה פרמיום מספקים אירופאים מובילים,
                כל שמלה נתפרת לשלמות דרך מספר פגישות התאמה אישיות בתל אביב.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-charcoal">
          <div className="container-luxury text-center">
            <h2 className="font-serif text-display-md text-cream mb-6">Begin Your Journey</h2>
            <Link href="/book" className="btn-primary bg-cream text-charcoal hover:bg-warmWhite">
              Book a Fitting Appointment
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
