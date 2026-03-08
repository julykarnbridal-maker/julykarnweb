import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import JsonLd, { localBusinessSchema, breadcrumbSchema } from '@/components/seo/JsonLd'
import { dresses } from '@/content/dresses'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://juliekarn.com'

export const metadata: Metadata = {
  title: 'שמלות כלה אלגנטיות תל אביב | ג\'ולי קארן בריידל',
  description: 'שמלות כלה אלגנטיות בעיצוב אישי בתל אביב. בדים פרמיום, תפירה מדויקת, ליווי אישי. ג\'ולי קארן בריידל.',
  keywords: [
    'שמלות כלה אלגנטיות תל אביב', 'שמלות כלה אלגנטיות', 'שמלות כלה יוקרה ישראל',
    'שמלות כלה בעיצוב אישי', 'מעצבת שמלות כלה תל אביב', 'שמלות כלה על זמניות',
  ],
  alternates: { canonical: '/shimot-kala-elegantiot-tel-aviv' },
  openGraph: {
    title: 'שמלות כלה אלגנטיות תל אביב | ג\'ולי קארן',
    description: 'שמלות כלה אלגנטיות בעיצוב אישי — לכלה שבוחרת לא להיות כמו כולן.',
    locale: 'he_IL',
  },
}

const HERO = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=90&fit=crop'

export default function ShimotKalaElegantiotTelAvivPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'בית', url: BASE },
    { name: 'שמלות כלה אלגנטיות תל אביב', url: `${BASE}/shimot-kala-elegantiot-tel-aviv` },
  ])

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumb} />
      <Header />
      <main className="pt-24" dir="rtl" lang="he">

        {/* Hero */}
        <section className="relative h-[70vh] flex items-end bg-charcoal overflow-hidden">
          <Image src={HERO} alt="שמלות כלה אלגנטיות תל אביב" fill className="object-cover opacity-60" priority />
          <div className="absolute inset-0 hero-overlay" />
          <div className="relative z-10 container-luxury pb-16">
            <p className="eyebrow text-cream/60 mb-3">ג'ולי קארן בריידל · תל אביב</p>
            <h1 className="font-serif text-display-lg text-cream max-w-2xl leading-tight">
              שמלות כלה אלגנטיות<br />
              <span className="text-gold font-light">תל אביב</span>
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury">
            <div className="max-w-3xl mb-16">
              <p className="eyebrow mb-4">אלגנטיות אמיתית</p>
              <h2 className="font-serif text-display-md text-charcoal mb-6">
                שמלה שמכבדת אותך
              </h2>
              <p className="text-body-lg text-textSecondary leading-relaxed mb-4">
                אלגנטיות בשמלת כלה היא לא עניין של מחיר — היא עניין של כוונה. כל פרט מדוד. כל בד נבחר. כל גזרה מותאמת לגוף ולאישיות הספציפיים שלך.
              </p>
              <p className="text-body-lg text-textSecondary leading-relaxed">
                ג'ולי קארן מעצבת שמלות כלה אלגנטיות לכלות בתל אביב ובמרכז הארץ. לא מהמדף, לא מקטלוג — עיצוב אישי לחלוטין.
              </p>
            </div>

            {/* 3-col grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              {dresses.slice(0, 3).map(dress => (
                <Link key={dress.id} href={`/dresses/${dress.slug}`} className="group block">
                  <div className="img-hover relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    <Image src={dress.image} alt={`${dress.name.he} — שמלת כלה אלגנטית תל אביב`} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                  </div>
                  <div className="mt-4">
                    <p className="font-serif text-xl text-charcoal">{dress.name.he}</p>
                    <p className="eyebrow text-taupe mt-1">{dress.fabric.he}</p>
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/dresses" className="btn-outline">לכל הקולקציה ←</Link>
          </div>
        </section>

        {/* Rich text for SEO */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl">
              <div>
                <h2 className="font-serif text-display-sm text-charcoal mb-5">מה הופך שמלה לאלגנטית?</h2>
                <ul className="space-y-4">
                  {[
                    'פרופורציות מדויקות — כל קו במקומו הנכון',
                    'בד פרמיום — המשי והסאטן מדברים בעצמם',
                    'גזרה שמכבדת את הגוף — לא נלחמת בו',
                    'פרטים נבחרים — כל תפר הוא בחירה, לא מקרה',
                    'ביטחון עצמי — שמלה אלגנטית נותנת לך ביטחון לעמוד בפני כולם',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-body-md text-textSecondary">
                      <span className="text-gold flex-shrink-0 mt-1.5">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-serif text-display-sm text-charcoal mb-5">שמלות כלה אלגנטיות בתל אביב</h2>
                <p className="text-body-md text-textSecondary leading-relaxed mb-4">
                  הכלה התל אביבית יודעת מה היא רוצה. היא לא מחפשת שמלה "שמדברת לכולם" — היא מחפשת שמלה שמדברת אליה.
                </p>
                <p className="text-body-md text-textSecondary leading-relaxed">
                  הסטודיו של ג'ולי קארן בתל אביב מקבל כלות מכל מרכז הארץ — רמת גן, הרצליה, פתח תקווה, רחובות — שמחפשות חווית עיצוב אישית ואמיתית.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal links */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury">
            <h2 className="font-serif text-display-sm text-charcoal mb-8">עוד מג'ולי קארן</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { href: '/shimot-kala-minimalistiot-tel-aviv', label: 'שמלות כלה מינימליסטיות תל אביב' },
                { href: '/shimot-kala-itzuv-ishi', label: 'שמלות כלה בעיצוב אישי' },
                { href: '/blog/timeless-wedding-dress-guide', label: 'מדריך: שמלות כלה על-זמניות' },
              ].map(l => (
                <Link key={l.href} href={l.href} className="block p-6 bg-ivory hover:bg-cream transition-colors duration-300 group">
                  <p className="font-serif text-lg text-charcoal group-hover:text-taupe transition-colors duration-300">{l.label}</p>
                  <span className="eyebrow text-taupe mt-2 block">קראי עוד →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-charcoal">
          <div className="container-luxury text-center">
            <h2 className="font-serif text-display-md text-cream mb-4">לכלה שבוחרת לא להיות כמו כולן</h2>
            <p className="text-body-lg text-cream/70 mb-8">הפגישה הראשונה ללא התחייבות.</p>
            <Link href="/book" className="btn-primary bg-cream text-charcoal hover:bg-warmWhite px-12 py-4">
              קבעי תור לפגישה אישית
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
