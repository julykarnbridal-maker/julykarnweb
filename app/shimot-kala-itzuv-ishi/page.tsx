import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import JsonLd, { localBusinessSchema, breadcrumbSchema } from '@/components/seo/JsonLd'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://juliekarn.com'

export const metadata: Metadata = {
  title: 'שמלות כלה בעיצוב אישי | Custom Wedding Dresses Israel | ג\'ולי קארן',
  description: 'שמלות כלה בעיצוב אישי בתל אביב. כל שמלה מעוצבת מאפס עבורך — הגוף שלך, הסגנון שלך, האישיות שלך. ג\'ולי קארן בריידל.',
  keywords: [
    'שמלות כלה בעיצוב אישי', 'שמלות כלה מותאמות אישית', 'מעצבת שמלות כלה ישראל',
    'custom wedding dress israel', 'bespoke wedding gown tel aviv', 'שמלת כלה על הזמנה',
    'שמלת כלה בהתאמה אישית',
  ],
  alternates: { canonical: '/shimot-kala-itzuv-ishi' },
  openGraph: {
    title: 'שמלות כלה בעיצוב אישי | ג\'ולי קארן בריידל',
    description: 'כל שמלה מעוצבת מאפס עבורך. עיצוב אישי בתל אביב.',
    locale: 'he_IL',
  },
}

const HERO = 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=1400&q=90&fit=crop'

const PROCESS = [
  { n: '01', t: 'פגישת היכרות', d: 'שיחה ראשונה — נדבר על החזון שלך, הסגנון, מבנה הגוף, ותאריך החתונה. ללא עלות וללא התחייבות.' },
  { n: '02', t: 'סקיצה ועיצוב', d: 'אעצב סקיצה ראשונה בהתבסס על שיחתנו. נבחר יחד את הבד, הגזרה, הפרטים הקטנים.' },
  { n: '03', t: 'ייצור מדויק', d: 'השמלה נתפרת מאפס — רק עבורך. כל תפר, כל גזייה מדויקת למידות שלך.' },
  { n: '04', t: 'ניסיונות וסיומות', d: '2–3 פגישות ניסיון להתאמה מושלמת. עד שהכל מרגיש נכון.' },
  { n: '05', t: 'מסירה', d: 'השמלה שלך מוכנה. עבדנו יחד, ועכשיו היא שלך לחלוטין.' },
]

export default function ShimotKalaItzuvIshiPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'בית', url: BASE },
    { name: 'שמלות כלה בעיצוב אישי', url: `${BASE}/shimot-kala-itzuv-ishi` },
  ])

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumb} />
      <Header />
      <main className="pt-24" dir="rtl" lang="he">

        {/* Hero */}
        <section className="relative h-[70vh] flex items-end bg-charcoal overflow-hidden">
          <Image src={HERO} alt="שמלות כלה בעיצוב אישי" fill className="object-cover opacity-55" priority />
          <div className="absolute inset-0 hero-overlay" />
          <div className="relative z-10 container-luxury pb-16">
            <p className="eyebrow text-cream/60 mb-3">ג'ולי קארן בריידל</p>
            <h1 className="font-serif text-display-lg text-cream max-w-2xl leading-tight">
              שמלות כלה<br />
              <span className="text-gold font-light">בעיצוב אישי</span>
            </h1>
          </div>
        </section>

        {/* Intro */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="eyebrow mb-4">מה זה עיצוב אישי?</p>
                <h2 className="font-serif text-display-md text-charcoal mb-6">
                  השמלה שלך. מאפס. בשבילך.
                </h2>
                <p className="text-body-lg text-textSecondary leading-relaxed mb-4">
                  עיצוב אישי הוא לא לבחור מקטלוג עם "שינויים קטנים". זה תהליך שבו השמלה נולדת מהשיחה ביניך לבין המעצבת — מהאישיות שלך, מהגוף שלך, מהחלומות שלך.
                </p>
                <p className="text-body-lg text-textSecondary leading-relaxed mb-6">
                  ג'ולי קארן עובדת עם מספר מצומצם של כלות בכל פעם — כי כל כלה מקבלת ממנה תשומת לב מלאה, מהפגישה הראשונה ועד יום החתונה.
                </p>
                <Link href="/book" className="btn-primary">קבעי פגישת היכרות ←</Link>
              </div>
              <div className="bg-cream p-10">
                <p className="eyebrow mb-4">עיצוב אישי כולל</p>
                <ul className="space-y-4">
                  {[
                    'פגישת ייעוץ ראשונה ללא עלות',
                    'עיצוב בלעדי — שמלה שלא קיימת אצל אף אחת אחרת',
                    'בחירת בד יחד מתוך רנג של חומרים פרמיום',
                    'פגישות ניסיון מרובות',
                    'ליווי אישי לאורך כל התהליך',
                    'אפשרות לשינויים ורעיונות לאורך הדרך',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-body-md text-textSecondary">
                      <span className="text-gold flex-shrink-0 mt-1.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <h2 className="font-serif text-display-md text-charcoal mb-14">התהליך</h2>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-px bg-charcoal/10">
              {PROCESS.map(step => (
                <div key={step.n} className="bg-ivory hover:bg-cream transition-colors duration-400 p-6">
                  <span className="font-serif text-4xl text-gold/40 leading-none block mb-4">{step.n}</span>
                  <h3 className="font-serif text-xl text-charcoal mb-3">{step.t}</h3>
                  <p className="text-body-sm text-textSecondary">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ mini */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury max-w-3xl">
            <h2 className="font-serif text-display-sm text-charcoal mb-10">שאלות נפוצות</h2>
            <div className="space-y-8 divide-y divide-charcoal/10">
              {[
                { q: 'כמה עולה שמלת כלה בעיצוב אישי?', a: 'השמלות שלי מתחילות מ-8,000 ש"ח. המחיר הסופי תלוי בעיצוב, הבד ומורכבות התפירה. בפגישה הראשונה נדבר על תקציב.' },
                { q: 'כמה זמן לוקח התהליך?', a: 'בממוצע 4–6 חודשים. מומלץ לפנות אלי 9–12 חודשים לפני תאריך החתונה.' },
                { q: 'האם אפשר לראות דוגמאות לעבודות קודמות?', a: 'כן — בפגישת ההיכרות אראה לך תיק עבודות ורשמים מדוגמניות וכלות קודמות.' },
                { q: 'האם אפשר לשלב רעיונות שמצאתי באינסטגרם?', a: 'בהחלט. שתפי אותי בכל מה שאהבת — נמצא יחד מה אמיתי לך מתוך ההשראות האלה.' },
              ].map((faq, i) => (
                <div key={i} className="pt-6">
                  <h3 className="font-serif text-xl text-charcoal mb-2">{faq.q}</h3>
                  <p className="text-body-md text-textSecondary">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Links */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <h2 className="font-serif text-display-sm text-charcoal mb-8">קראי עוד</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { href: '/shimot-kala-minimalistiot-tel-aviv', label: 'שמלות כלה מינימליסטיות תל אביב' },
                { href: '/blog/how-to-choose-wedding-dress', label: 'איך לבחור שמלת כלה' },
                { href: '/process', label: 'תהליך העבודה המלא' },
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
            <h2 className="font-serif text-display-md text-cream mb-4">הגיע הזמן לשמלה שלך</h2>
            <p className="text-body-lg text-cream/70 mb-8">פגישה ראשונה — ללא עלות וללא התחייבות.</p>
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
