import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import JsonLd, { localBusinessSchema, breadcrumbSchema } from '@/components/seo/JsonLd'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://juliekarn.com'

export const metadata: Metadata = {
  title: 'שמלות כלה תל אביב | Bridal Dresses Tel Aviv | ג\'ולי קארן',
  description: 'מעצבת שמלות כלה בתל אביב. שמלות כלה מינימליסטיות ואלגנטיות בעיצוב אישי. ג\'ולי קארן בריידל — סטודיו בלב תל אביב.',
  keywords: [
    'שמלות כלה תל אביב', 'מעצבת שמלות כלה תל אביב', 'bridal designer tel aviv',
    'wedding dress tel aviv', 'שמלות כלה מרכז', 'שמלות כלה ישראל',
    'wedding dresses israel', 'bridal studio tel aviv',
  ],
  alternates: { canonical: '/tel-aviv' },
  openGraph: {
    title: 'שמלות כלה תל אביב | ג\'ולי קארן בריידל',
    description: 'מעצבת שמלות כלה בלב תל אביב. עיצוב אישי, בדים פרמיום, ליווי אישי.',
    locale: 'he_IL',
  },
}

const NEARBY = [
  { he: 'רמת גן', en: 'Ramat Gan' },
  { he: 'הרצליה', en: 'Herzliya' },
  { he: 'פתח תקווה', en: 'Petah Tikva' },
  { he: 'רחובות', en: 'Rehovot' },
  { he: 'נס ציונה', en: 'Nes Ziona' },
  { he: 'ראשון לציון', en: 'Rishon LeZion' },
  { he: 'כפר סבא', en: 'Kfar Saba' },
  { he: 'רעננה', en: 'Ra\'anana' },
  { he: 'נתניה', en: 'Netanya' },
  { he: 'מודיעין', en: 'Modi\'in' },
]

export default function TelAvivPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: BASE },
    { name: 'Tel Aviv — שמלות כלה תל אביב', url: `${BASE}/tel-aviv` },
  ])

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumb} />
      <Header />
      <main className="pt-24">

        {/* Hero */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="eyebrow mb-4">תל אביב · Tel Aviv</p>
                <h1 className="font-serif text-display-lg text-charcoal mb-6" dir="rtl" lang="he">
                  שמלות כלה תל אביב
                </h1>
                <h2 className="font-serif text-display-sm text-taupe mb-6">
                  Bridal Designer Tel Aviv
                </h2>
                <p className="text-body-lg text-textSecondary leading-relaxed mb-6" dir="rtl" lang="he">
                  ג'ולי קארן בריידל הוא סטודיו לעיצוב שמלות כלה הממוקם בתל אביב. אנחנו מלווים כלות מכל מרכז הארץ — מהפגישה הראשונה ועד יום החתונה.
                </p>
                <p className="text-body-md text-textSecondary leading-relaxed mb-8">
                  Julie Karn Bridal is a wedding dress design studio based in Tel Aviv, serving brides across central Israel and beyond.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/book" className="btn-primary">
                    קבעי תור · Book a Fitting
                  </Link>
                  <Link href="/dresses" className="btn-outline">
                    הקולקציה · The Collection
                  </Link>
                </div>
              </div>
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <iframe
                  title="Julie Karn Bridal — Tel Aviv Studio"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108240.57893064614!2d34.7151!3d32.0853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4ca6193b7c1f%3A0xc1fb72a2c0963f90!2sTel%20Aviv-Yafo!5e0!3m2!1sen!2sil!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(30%) contrast(1.1)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nearby cities — local SEO signals */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury">
            <div className="max-w-3xl">
              <h2 className="font-serif text-display-sm text-charcoal mb-6" dir="rtl" lang="he">
                כלות מגיעות מכל מרכז הארץ
              </h2>
              <p className="text-body-md text-textSecondary mb-8" dir="rtl" lang="he">
                הסטודיו שלנו בתל אביב קרוב לכל חלקי מרכז הארץ. כלות מגיעות אלינו מ:
              </p>
              <div className="flex flex-wrap gap-3 mb-8" dir="rtl">
                {NEARBY.map(city => (
                  <span key={city.en} className="eyebrow border border-warmGrey/30 px-3 py-2 text-textSecondary">
                    {city.he}
                  </span>
                ))}
              </div>
              <p className="text-body-sm text-textSecondary" dir="rtl" lang="he">
                מגיעה מחוץ לתל אביב? מרחק הנסיעה שווה את זה. נבנה לוח זמנים ניסיונות שיהיה נוח לך.
              </p>
            </div>
          </div>
        </section>

        {/* SEO page links — in Hebrew AND English */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <h2 className="font-serif text-display-sm text-charcoal mb-10">
              <span dir="rtl" lang="he">שמלות כלה בתל אביב — לפי סגנון</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { href: '/shimot-kala-minimalistiot-tel-aviv', heLabel: 'שמלות כלה מינימליסטיות תל אביב', enLabel: 'Minimalist Dresses Tel Aviv' },
                { href: '/shimot-kala-elegantiot-tel-aviv', heLabel: 'שמלות כלה אלגנטיות תל אביב', enLabel: 'Elegant Dresses Tel Aviv' },
                { href: '/shimot-kala-itzuv-ishi', heLabel: 'שמלות כלה בעיצוב אישי', enLabel: 'Custom Wedding Dresses Israel' },
                { href: '/minimalist-wedding-dresses', heLabel: 'שמלות מינימליסטיות (EN)', enLabel: 'Minimalist Wedding Dresses' },
                { href: '/elegant-wedding-dresses', heLabel: 'שמלות אלגנטיות (EN)', enLabel: 'Elegant Wedding Dresses' },
                { href: '/timeless-wedding-dresses', heLabel: 'שמלות על-זמניות (EN)', enLabel: 'Timeless Wedding Dresses' },
              ].map(l => (
                <Link key={l.href} href={l.href} className="block p-6 bg-warmWhite hover:bg-cream transition-colors duration-300 group">
                  <p className="font-serif text-lg text-charcoal group-hover:text-taupe transition-colors duration-300 mb-1" dir="rtl" lang="he">
                    {l.heLabel}
                  </p>
                  <p className="text-body-sm text-textMuted">{l.enLabel}</p>
                  <span className="eyebrow text-gold mt-3 block">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section-padding bg-charcoal">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-display-md text-cream mb-6" dir="rtl" lang="he">
                  בואי לסטודיו
                </h2>
                <p className="text-body-lg text-cream/70 mb-8" dir="rtl" lang="he">
                  פגישה ראשונה ללא התחייבות. נדבר על החלום שלך.
                </p>
                <Link href="/book" className="btn-primary bg-cream text-charcoal hover:bg-warmWhite px-10 py-4">
                  קבעי תור · Book Now
                </Link>
              </div>
              <div className="space-y-4" dir="rtl" lang="he">
                <p className="text-body-md text-cream/70">📍 תל אביב, ישראל</p>
                <p className="text-body-md text-cream/70">📞 +972-54-896-48-28</p>
                <p className="text-body-md text-cream/70">✉️ julykarnbridal@gmail.com</p>
                <p className="text-body-md text-cream/70">📷 @juliekarn.bridal</p>
                <p className="text-body-sm text-cream/50">ראשון–חמישי: 10:00–20:00 | שישי: 10:00–14:00</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
