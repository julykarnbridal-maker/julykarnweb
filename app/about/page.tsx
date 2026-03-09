'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import RevealAnimation from '@/components/ui/RevealAnimation'

const CONTENT = {
  he: {
    eyebrow: 'אודות המעצבת',
    h1: 'אודות המעצבת',
    hero: {
      tagline: 'לכלות שבוחרות באלגנטיות ולא בהגזמה.',
      p1: 'אני Julie Karn, מעצבת שמלות כלה בתל אביב. אני יוצרת שמלות שמרגישות אלגנטיות, על־זמניות ואישיות באמת.',
      p2: 'העיצוב שלי מבוסס על אלגנטיות שקטה — שמלות שמדגישות את האישה שלובשת אותן ולא מסתירות אותה מאחורי קישוטים.',
      p3: 'כל שמלה שאני יוצרת נבנית בדיוק, מתוך הבנה עמוקה בבניית הבגד ובאיכות התפירה.',
    },
    story: {
      eyebrow: 'הסיפור',
      h2: 'הסיפור מאחורי Julie Karn Bridal',
      p1: 'הדרך שלי לעיצוב שמלות כלה התחילה מתוך חיפוש אישי מאוד.',
      p2: 'כאשר חיפשתי שמלת כלה לעצמי, גיליתי עד כמה קשה למצוא שמלה שמרגישה באמת כמוני.',
      p3: 'בעולם הכלות פעמים רבות הכול מרגיש מוגזם — גזרות דרמטיות, הרבה קישוטים ושמלות שיוצרות דמות פנטזיונית במקום להדגיש את האישה עצמה.',
      p4: 'אני חיפשתי משהו אחר.',
      p5: 'משהו שקט יותר. אלגנטי יותר.',
      p6: 'שמלה שמדגישה את היופי והאישיות של האישה שלובשת אותה.',
      p7: 'מתוך הרעיון הזה נולד Julie Karn Bridal — סטודיו שבו אני מעצבת שמלות כלה בדיוק, ברגישות ובכבוד לאישה.',
    },
    craft: {
      eyebrow: 'המלאכה',
      h2: 'תפירה מדויקת וליווי אישי',
      p1: 'אני מלווה כל כלה באופן אישי לאורך כל הדרך — מהפגישה הראשונה ועד המדידה האחרונה.',
      p2: 'שנים של ניסיון בתפירה, הבנה עמוקה בבניית גזרות ובמבנה הבגד, ובחירה מדויקת של בדים איכותיים מאפשרים לי ליצור שמלה שאינה רק יפה, אלא גם נוחה ומאוזנת בצורה מושלמת.',
      p3: 'כל כלה מקבלת ממני תשומת לב מלאה לאורך כל התהליך.',
    },
    studio: {
      eyebrow: 'הסטודיו',
      h2: 'סטודיו לשמלות כלה בתל אביב',
      p1: 'הסטודיו שלי, Julie Karn Bridal, ממוקם בתל אביב.',
      p2: 'לכאן מגיעות כלות מכל רחבי הארץ כדי ליצור שמלה שמרגישה על־זמנית, אלגנטית ואישית באמת.',
      p3: 'הפגישות מתקיימות באווירה רגועה ופרטית, עם זמן ותשומת לב מלאה לכל כלה.',
    },
    cta: {
      eyebrow: 'קבעי פגישה',
      h2: 'לקביעת פגישה',
      p: 'שמלת הכלה שלך מתחילה בפגישה. אני מזמינה אותך לקבוע פגישה אישית בסטודיו Julie Karn Bridal בתל אביב, להכיר את הקולקציה, למדוד גזרות שונות ולמצוא את הכיוון המדויק לשמלה שלך.',
      btn: 'לקביעת פגישה',
    },
    links: { dresses: 'לקולקציה', process: 'תהליך העבודה', contact: 'צרי קשר' },
  },
  en: {
    eyebrow: 'About the Designer',
    h1: 'About the Designer',
    hero: {
      tagline: 'For brides who choose elegance over excess.',
      p1: 'I am Julie Karn, a bridal designer based in Tel Aviv. I create wedding dresses that feel refined, timeless and deeply personal.',
      p2: 'My work is centered around quiet elegance — dresses that highlight the woman wearing them rather than hiding her behind decoration.',
      p3: 'Each gown I design is created with precision, craftsmanship and a deep understanding of garment construction.',
    },
    story: {
      eyebrow: 'The Story',
      h2: 'The Story Behind Julie Karn Bridal',
      p1: 'My journey into bridal design started from a very personal place.',
      p2: 'When I was searching for a wedding dress myself, I realized how difficult it was to find something that truly reflected who I was.',
      p3: 'In many places, the world of bridal fashion felt overwhelming — dramatic silhouettes, heavy decoration, dresses that created a fantasy character rather than highlighting the woman herself.',
      p4: 'I wanted something different.',
      p5: 'Something quieter. Something more refined.',
      p6: 'A wedding dress that enhances the beauty and personality of the woman wearing it.',
      p7: 'That idea became the foundation of Julie Karn Bridal — a studio where wedding dresses are designed with precision, restraint and deep respect for individuality.',
    },
    craft: {
      eyebrow: 'Craftsmanship',
      h2: 'Craftsmanship and Personal Guidance',
      p1: 'I personally guide every bride through the entire process — from the first appointment to the final fitting.',
      p2: 'Years of sewing experience, a deep understanding of garment construction, and carefully selected premium fabrics allow me to create dresses that are not only beautiful, but also comfortable and perfectly balanced.',
      p3: 'Every bride receives my full attention throughout the entire process.',
    },
    studio: {
      eyebrow: 'The Studio',
      h2: 'Bridal Studio in Tel Aviv',
      p1: 'My studio, Julie Karn Bridal, is located in Tel Aviv.',
      p2: 'Brides from across Israel come here to create dresses that feel timeless, refined and personal.',
      p3: 'Appointments take place in a calm and private atmosphere, allowing every bride the time and attention she deserves.',
    },
    cta: {
      eyebrow: 'Book an Appointment',
      h2: 'Book a Bridal Appointment',
      p: 'Your wedding dress begins with a conversation. I invite you to book a private appointment at the Julie Karn Bridal studio in Tel Aviv, where you can explore the collection, try different silhouettes and discover the direction for your dress.',
      btn: 'Book a Fitting',
    },
    links: { dresses: 'View Collection', process: 'How It Works', contact: 'Contact' },
  },
}

const HERO_IMAGE = '/about/hero.JPG'
const STORY_IMAGE = '/about/story.JPG'
const CRAFT_IMAGES = [
  '/about/craft-1.JPG',
  '/about/craft-2.JPG',
]

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Julie Karn',
      jobTitle: 'Bridal Designer',
      worksFor: { '@type': 'LocalBusiness', name: 'Julie Karn Bridal' },
      url: 'https://julie-karn-bridal.vercel.app/about',
    },
    {
      '@type': 'LocalBusiness',
      name: 'Julie Karn Bridal',
      description: 'Bridal designer studio in Tel Aviv specialising in minimalist, elegant and timeless wedding dresses.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'יהודה הימית 27',
        addressLocality: 'Tel Aviv',
        addressCountry: 'IL',
      },
      telephone: '+972548964828',
      url: 'https://julie-karn-bridal.vercel.app',
    },
  ],
}

export default function AboutPage() {
  const { locale, t } = useLanguage()
  const c = CONTENT[locale]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <main className="pt-24">

        {/* ── Page header ─────────────────────────────────── */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <RevealAnimation>
              <p className="eyebrow mb-4">{c.eyebrow}</p>
              <h1 className="font-serif text-display-lg text-charcoal">{c.h1}</h1>
              <div className="line-accent mt-6" />
            </RevealAnimation>
          </div>
        </section>

        {/* ── Section 1: Hero — image + intro ─────────────── */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <RevealAnimation>
                <div className="img-hover relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                  <Image
                    src={HERO_IMAGE}
                    alt="Julie Karn — Bridal Designer Tel Aviv"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </RevealAnimation>

              <RevealAnimation delay={0.15}>
                <p className="font-serif text-display-md text-charcoal mb-8 leading-snug">
                  {c.hero.tagline}
                </p>
                <div className="space-y-4 text-body-lg text-textSecondary leading-relaxed">
                  <p>{c.hero.p1}</p>
                  <p>{c.hero.p2}</p>
                  <p>{c.hero.p3}</p>
                </div>
              </RevealAnimation>
            </div>
          </div>
        </section>

        {/* ── Section 2: The Story ─────────────────────────── */}
        <section className="section-padding bg-cream">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <RevealAnimation className="order-2 lg:order-1">
                <p className="eyebrow text-taupe mb-3">{c.story.eyebrow}</p>
                <h2 className="font-serif text-display-sm text-charcoal mb-8">{c.story.h2}</h2>
                <div className="space-y-4 text-body-lg text-textSecondary leading-relaxed">
                  <p>{c.story.p1}</p>
                  <p>{c.story.p2}</p>
                  <p>{c.story.p3}</p>
                  <p>{c.story.p4}</p>
                  <p>{c.story.p5}</p>
                  <p>{c.story.p6}</p>
                  <p>{c.story.p7}</p>
                </div>
              </RevealAnimation>

              <RevealAnimation delay={0.15} className="order-1 lg:order-2">
                <div className="img-hover relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <Image
                    src={STORY_IMAGE}
                    alt="Julie Karn Bridal — Wedding dresses Tel Aviv"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </RevealAnimation>
            </div>
          </div>
        </section>

        {/* ── Section 3: Craftsmanship ─────────────────────── */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <RevealAnimation>
                <div className="grid grid-cols-2 gap-4">
                  {CRAFT_IMAGES.map((src, i) => (
                    <div key={i} className={`img-hover relative overflow-hidden ${i === 0 ? 'col-span-2' : ''}`} style={{ aspectRatio: i === 0 ? '16/9' : '3/4' }}>
                      <Image
                        src={src}
                        alt={`Julie Karn Bridal — craftsmanship ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              </RevealAnimation>

              <RevealAnimation delay={0.15}>
                <p className="eyebrow text-taupe mb-3">{c.craft.eyebrow}</p>
                <h2 className="font-serif text-display-sm text-charcoal mb-8">{c.craft.h2}</h2>
                <div className="space-y-4 text-body-lg text-textSecondary leading-relaxed">
                  <p>{c.craft.p1}</p>
                  <p>{c.craft.p2}</p>
                  <p>{c.craft.p3}</p>
                </div>
              </RevealAnimation>
            </div>
          </div>
        </section>

        {/* ── Section 4: Studio ────────────────────────────── */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury max-w-3xl">
            <RevealAnimation>
              <p className="eyebrow text-taupe mb-3">{c.studio.eyebrow}</p>
              <h2 className="font-serif text-display-sm text-charcoal mb-8">{c.studio.h2}</h2>
              <div className="space-y-4 text-body-lg text-textSecondary leading-relaxed mb-12">
                <p>{c.studio.p1}</p>
                <p>{c.studio.p2}</p>
                <p>{c.studio.p3}</p>
              </div>
              <div className="flex flex-wrap gap-6">
                <Link href="/dresses" className="btn-ghost">{c.links.dresses} →</Link>
                <Link href="/process" className="btn-ghost">{c.links.process} →</Link>
                <Link href="/contact" className="btn-ghost">{c.links.contact} →</Link>
              </div>
            </RevealAnimation>
          </div>
        </section>

        {/* ── Section 5: CTA ──────────────────────────────── */}
        <section className="section-padding bg-charcoal">
          <div className="container-luxury text-center max-w-2xl">
            <RevealAnimation>
              <p className="eyebrow text-cream/50 mb-3">{c.cta.eyebrow}</p>
              <h2 className="font-serif text-display-sm text-cream mb-6">{c.cta.h2}</h2>
              <p className="text-body-lg text-cream/70 leading-relaxed mb-10">{c.cta.p}</p>
              <Link href="/book" className="btn-primary bg-cream text-charcoal hover:bg-warmWhite">
                {c.cta.btn}
              </Link>
            </RevealAnimation>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
