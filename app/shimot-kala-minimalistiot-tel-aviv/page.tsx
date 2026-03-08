import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import JsonLd, { localBusinessSchema, breadcrumbSchema } from '@/components/seo/JsonLd'
import { dresses } from '@/content/dresses'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://juliekarn.com'

export const metadata: Metadata = {
  title: 'שמלות כלה מינימליסטיות תל אביב | עיצוב אישי | ג\'ולי קארן בריידל',
  description: 'שמלות כלה מינימליסטיות בעיצוב אישי בתל אביב. סגנון נקי, בדים פרמיום, התאמה מדויקת. ג\'ולי קארן בריידל — לכלה שבוחרת לא להיות כמו כולן.',
  keywords: [
    'שמלות כלה מינימליסטיות תל אביב', 'שמלות כלה מינימליסטיות', 'שמלות כלה בקו נקי',
    'שמלות כלה חלקות', 'שמלות כלה פשוטות', 'שמלות כלה עיצוב אישי תל אביב',
    'שמלות כלה 2025', 'מעצבת שמלות כלה תל אביב',
  ],
  alternates: { canonical: '/shimot-kala-minimalistiot-tel-aviv' },
  openGraph: {
    title: 'שמלות כלה מינימליסטיות תל אביב | ג\'ולי קארן בריידל',
    description: 'שמלות כלה מינימליסטיות בעיצוב אישי — לכלה שבוחרת לא להיות כמו כולן.',
    locale: 'he_IL',
  },
}

const HERO = 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&q=90&fit=crop'
const minDresses = dresses.filter(d => d.tags.en.some(t => ['minimalist', 'column', 'clean', 'fluid'].includes(t))).slice(0, 3)

export default function ShimotKalaMinimalistiotTelAvivPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'בית', url: BASE },
    { name: 'שמלות כלה מינימליסטיות תל אביב', url: `${BASE}/shimot-kala-minimalistiot-tel-aviv` },
  ])

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumb} />
      <Header />
      <main className="pt-24" dir="rtl" lang="he">

        {/* Hero */}
        <section className="relative h-[70vh] flex items-end bg-charcoal overflow-hidden">
          <Image src={HERO} alt="שמלות כלה מינימליסטיות תל אביב" fill className="object-cover opacity-60" priority />
          <div className="absolute inset-0 hero-overlay" />
          <div className="relative z-10 container-luxury pb-16">
            <p className="eyebrow text-cream/60 mb-3">ג'ולי קארן בריידל · תל אביב</p>
            <h1 className="font-serif text-display-lg text-cream max-w-2xl leading-tight">
              שמלות כלה מינימליסטיות<br />
              <span className="text-gold font-light">תל אביב</span>
            </h1>
          </div>
        </section>

        {/* Intro */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury">
            <div className="max-w-3xl mb-16">
              <p className="eyebrow mb-4">הסגנון שלנו</p>
              <h2 className="font-serif text-display-md text-charcoal mb-6">
                מינימליזם שמדבר בשם עצמו
              </h2>
              <p className="text-body-lg text-textSecondary leading-relaxed mb-4">
                שמלת כלה מינימליסטית היא לא "פשוטה" — היא מדויקת. כל קו, כל תפר, כל בד — נבחרו בכוונה. אין מקום להסתתר מאחורי קישוטים: כשהשמלה מינימלית, האישה שלובשת אותה היא הנושא.
              </p>
              <p className="text-body-lg text-textSecondary leading-relaxed">
                ג'ולי קארן מעצבת שמלות כלה מינימליסטיות לכלות בתל אביב ובמרכז הארץ — שמלות שמצולמות יפה, נוחות ללבישה בחום הישראלי, ומרגישות אישיות לגמרי.
              </p>
            </div>

            {/* Dresses */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
              {minDresses.map(dress => (
                <Link key={dress.id} href={`/dresses/${dress.slug}`} className="group block">
                  <div className="img-hover relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    <Image src={dress.image} alt={`${dress.name.he} — שמלת כלה מינימליסטית`} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                  </div>
                  <div className="mt-4">
                    <p className="font-serif text-xl text-charcoal">{dress.name.he}</p>
                    <p className="eyebrow text-taupe mt-1">{dress.fabric.he}</p>
                    <p className="text-body-sm text-textSecondary mt-2 line-clamp-2">{dress.description.he}</p>
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/dresses" className="btn-outline">לכל הקולקציה ←</Link>
          </div>
        </section>

        {/* Why minimalist — rich SEO text */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl">
              <div>
                <h2 className="font-serif text-display-sm text-charcoal mb-5">
                  למה לבחור בשמלת כלה מינימליסטית?
                </h2>
                <ul className="space-y-4">
                  {[
                    'צילום טוב יותר — הכלה, לא השמלה, היא הנושא',
                    'נוחות לבישה — בד איכותי בלי שכבות מיותרות',
                    'על-זמניות — לא תיראי כמו תצלום ישן בעוד 10 שנה',
                    'ייחודיות — פחות נפוץ, יותר אישי',
                    'גמישות — שמלה מינימלית מתאימה לכל סוג טקס',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-body-md text-textSecondary">
                      <span className="text-gold flex-shrink-0 mt-1.5">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-serif text-display-sm text-charcoal mb-5">
                  הסגנונות המינימליסטיים שלנו
                </h2>
                <ul className="space-y-4">
                  {[
                    'עמוד — גזרה ישרה, נקייה, עם מחשוף עמוק בגב',
                    'A-ליין — מחמיאה, זורמת קלות, על-זמנית',
                    'ביאס-קאט — נפילה אלכסונית מדהימה, לא בת-השוואה בסאטן',
                    'כתפיות דקות — סיכת בוקר בים-תיכוני',
                    'מחשוף מרובע — אדריכלי, מודרני, נפוץ אצל כלות תל אביביות',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-body-md text-textSecondary">
                      <span className="text-gold flex-shrink-0 mt-1.5">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process mini */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury max-w-3xl">
            <h2 className="font-serif text-display-md text-charcoal mb-10">איך זה עובד</h2>
            <div className="space-y-8">
              {[
                { n: '01', t: 'פגישת היכרות', d: 'נדבר על הסגנון, הגוף, האירוע. ללא התחייבות.' },
                { n: '02', t: 'עיצוב מינימליסטי מותאם', d: 'אעצב שמלה בדיוק עבורך — לא קטלוג, לא מדף.' },
                { n: '03', t: 'ניסיונות מדויקים', d: 'כמה פגישות התאמה עד שהכל ישבה בדיוק נכון.' },
                { n: '04', t: 'יום החתונה', d: 'את מגיעה מוכנה. אנחנו ידענו שזה יהיה מושלם.' },
              ].map(step => (
                <div key={step.n} className="flex gap-8">
                  <span className="font-serif text-4xl text-gold/40 flex-shrink-0 leading-none">{step.n}</span>
                  <div>
                    <h3 className="font-serif text-xl text-charcoal mb-1">{step.t}</h3>
                    <p className="text-body-md text-textSecondary">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal links */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <h2 className="font-serif text-display-sm text-charcoal mb-8">קראי עוד</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { href: '/blog/minimalist-wedding-dress-trends', label: 'שמלות כלה מינימליסטיות: הסגנון הנקי' },
                { href: '/shimot-kala-elegantiot-tel-aviv', label: 'שמלות כלה אלגנטיות תל אביב' },
                { href: '/shimot-kala-itzuv-ishi', label: 'שמלות כלה בעיצוב אישי' },
              ].map(l => (
                <Link key={l.href} href={l.href} className="block p-6 bg-warmWhite hover:bg-cream transition-colors duration-300 group">
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
            <h2 className="font-serif text-display-md text-cream mb-4">מוכנה לשמלה הנכונה?</h2>
            <p className="text-body-lg text-cream/70 mb-8">פגישה ראשונה ללא התחייבות. רק שיחה על החלום שלך.</p>
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
