'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import RevealAnimation from '@/components/ui/RevealAnimation'
import { Plus, Minus } from 'lucide-react'

// ── Page content (self-contained, HE + EN) ───────────────────────
const CONTENT = {
  he: {
    eyebrow: 'התהליך שלנו',
    h1: 'איך נוצרת שמלת הכלה שלך',
    intro: 'ב־Julie Karn Bridal, סטודיו לשמלות כלה בתל אביב, אני מלווה אותך אישית לאורך כל הדרך — מהפגישה הראשונה ועד המדידה האחרונה. כל שמלה נוצרת מתוך דגש על עיצוב על־זמני, התאמה מדויקת ואיכות תפירה גבוהה.',
    intro2: 'יש שלושה מסלולים ליצירת שמלת הכלה שלך, כולם בשפה העיצובית של הסטודיו וללא העתקות.',
    section1H2: 'איך נוצרות שמלות הכלה ב־Julie Karn Bridal תל אביב',
    section1Body: 'כל כלה מגיעה עם ויז׳ן אחר, לוח זמנים אחר ורמת התאמה אישית שונה. לכן הסטודיו מציע שלושה מסלולים ברורים: בחירה בשמלה מהקולקציה, התאמה אישית של דגם קיים, או עיצוב אישי מאפס.',
    section1Body2: 'כל מסלול שומר על אותם ערכים: אלגנטיות, ליווי אישי, איכות תפירה גבוהה ותהליך רגוע, פרטי ומדויק.',
    options: [
      {
        num: '01',
        h2: 'שמלה מהקולקציה',
        body: 'בוחרים דגם קיים מהקולקציה ומדייקים את ההתאמה לפי הגוף שלך.',
        body2: 'העיצוב נשאר כפי שהוא — עם תפירה מדויקת, גימור נקי והתאמה מחמיאה.',
        body3: undefined as string | undefined,
        ideal: 'זהו מסלול מושלם לכלה שמצאה דגם שהיא אוהבת ורוצה ליהנות מהתאמה מקצועית ותוצאה מדויקת.',
        adjustmentsLabel: undefined as string | undefined,
        adjustments: null as string[] | null,
      },
      {
        num: '02',
        h2: 'שמלה מהקולקציה עם התאמה אישית',
        body: 'בוחרים דגם מהקולקציה והופכים אותו לשלך.',
        body2: 'השמלה נתפרת לפי המידות שלך, עם אפשרות לשינויים עדינים או שילובים בין דגמים שונים — תוך שמירה על האסתטיקה העל־זמנית של הסטודיו.',
        body3: undefined,
        ideal: 'זהו מסלול שמתאים לכלה שמחפשת שמלת כלה בהתאמה אישית ועדיין רוצה להישאר קרובה לקו של הקולקציה.',
        adjustmentsLabel: 'אפשר לבצע התאמות כמו:',
        adjustments: ['מחשוף', 'שרוולים', 'גב', 'אורך', 'שילוב אלמנטים מדגמים שונים'],
      },
      {
        num: '03',
        h2: 'שמלת כלה בעיצוב אישי בתל אביב',
        body: 'לכלות שמחפשות משהו חד־פעמי, הסטודיו מציע עיצוב אישי של שמלת כלה בתל אביב.',
        body2: 'השמלה מעוצבת ונתפרת מאפס — לפי הגוף שלך, הוויז׳ן שלך והשפה העיצובית המדויקת של הסטודיו.',
        body3: 'מהסקיצה הראשונה, דרך בניית הגזרה ועד התפר האחרון — כל פרט נוצר במיוחד בשבילך.',
        ideal: undefined,
        adjustmentsLabel: undefined,
        adjustments: null,
      },
    ],
    fittingsH2: 'תהליך המדידות והתיקונים לשמלת כלה',
    fittingsBody: 'תהליך המדידות הוא אישי, רגוע וממוקד בפרטים.',
    fittingsBody2: 'ברוב המקרים נדרשות 3 עד 5 מדידות, בהתאם למסלול שנבחר ולרמת ההתאמות הנדרשת.',
    fittingsBody3: 'בכל מסלול יש התאמות מקצועיות כדי להגיע לישיבה מדויקת ולגימור מושלם.',
    ctaH2: 'קביעת פגישה למדידת שמלות כלה בתל אביב',
    ctaBody: 'הפגישה הראשונה היא המקום שבו נכיר את הסגנון שלך, את הגזרות שמתאימות לך, את לוח הזמנים שלך ואת סוג השמלה שהכי נכון עבורך.',
    ctaBody2: 'במהלך הפגישה נבין יחד אם המסלול הנכון עבורך הוא שמלה מהקולקציה, קולקציה עם התאמה אישית או עיצוב אישי.',
    ctaAddress: 'כתובת הסטודיו: יהודה הימית 27, תל אביב',
    ctaTransport: 'תחנת הרכבת הקלה בלומפילד נמצאת במרחק של כ־2 דקות, ובדרך כלל ניתן למצוא חניה באזור.',
    ctaButton: 'לקביעת פגישה',
    ctaCollection: 'לכל הקולקציה',
    faqH2: 'שאלות נפוצות',
    faqCta: 'עוד שאלות? נשמח לדבר.',
    faqCtaBook: 'לקביעת פגישה',
    faqCtaContact: 'צרי קשר',
    faq: [
      { q: 'איך אני בוחרת את המסלול הנכון — קולקציה, התאמה אישית או עיצוב אישי?', a: 'בפגישה נבין יחד את הסגנון שלך, את לוח הזמנים ואת סוג ההתאמה שאת מחפשת, ומשם נבחר את המסלול המדויק עבורך.' },
      { q: 'יש אפשרות להשכרה וגם לרכישה?', a: 'כן. ניתן להציע את השמלות להשכרה או לרכישה, בהתאם לדגם ולרמת העבודה.' },
      { q: 'מה כלול בתהליך המדידות והתיקונים?', a: 'כל שמלה כוללת מדידות ותיקונים במטרה להגיע להתאמה המדויקת ביותר. היקף ההתאמות משתנה לפי המסלול.' },
      { q: 'כמה זמן מראש כדאי לקבוע פגישה?', a: 'מומלץ לקבוע 3–6 חודשים לפני החתונה. גם אם לוח הזמנים קצר יותר, נוכל לבדוק יחד את האפשרות המתאימה ביותר.' },
      { q: 'אפשר לבצע שינויים בשמלה מהקולקציה?', a: 'כן — במסלול של קולקציה עם התאמה אישית. ניתן לדייק מחשוף, שרוולים, גב, אורך או לשלב אלמנטים מדגמים שונים.' },
      { q: 'אפשר לשחזר שמלה מתמונה או להעתיק מעצב אחר?', a: 'לא. בסטודיו לא מבצעים העתקות. אנחנו יוצרות שמלות מקוריות בסגנון Julie Karn Bridal ובהשראה מהטעם שלך — בלי לשכפל דגם קיים.' },
      { q: 'כמה מדידות יש בדרך כלל?', a: 'לרוב נדרשות 3–5 מדידות, בהתאם למסלול ולרמת ההתאמות.' },
      { q: 'איפה הסטודיו נמצא?', a: 'הסטודיו נמצא ברחוב יהודה הימית 27, תל אביב.' },
      { q: 'מה כדאי להביא לפגישה?', a: 'מומלץ להביא הלבשה תחתונה בגוון ניוד ללא תפרים, ואם אפשר גם נעליים בגובה דומה למה שמתוכנן לחתונה. אפשר גם להביא תמונות השראה.' },
      { q: 'מה קורה בפגישה הראשונה?', a: 'בפגישה נכיר, נבין את הסגנון שלך, נמדוד גזרות שונות, נסביר על האפשרויות, ונבנה כיוון מדויק לשמלה שלך.' },
      { q: 'את עובדת עם מידות סטנדרטיות או תפירה לפי מידות?', a: 'גם וגם. יש אפשרות לבחור שמלה מהקולקציה עם התאמות, או לבחור שמלה שנתפרת לפי המידות שלך.' },
      { q: 'איך נקבע המחיר ואיך מתבצע התשלום?', a: 'המחיר תלוי במסלול שנבחר, בבדים וברמת העבודה. בפגישה תקבלי הסבר ברור, כולל אפשרויות השכרה או רכישה.' },
    ],
    localH2: 'שמלות כלה בתל אביב',
    localBody: 'Julie Karn Bridal הוא סטודיו לשמלות כלה בתל אביב המתמחה ב־שמלות כלה מינימליסטיות, אלגנטיות ועל־זמניות.',
    localBody2: 'אפשר לבחור בין שמלות מהקולקציה, התאמה אישית או עיצוב אישי, כולן בליווי אישי, בבדים איכותיים ובתפירה מדויקת.',
    localBody3: 'הסטודיו ממוקם ברחוב יהודה הימית בתל אביב, ומציע חוויה רגועה, אישית ומדויקת לכלה שמחפשת מראה נקי, ייחודי ואלגנטי.',
    localLinks: {
      dresses: 'שמלות כלה',
      book: 'קביעת פגישה',
      about: 'על המעצבת',
      contact: 'צרי קשר',
    },
  },

  en: {
    eyebrow: 'The Process',
    h1: 'How Your Wedding Dress Is Created',
    intro: 'At Julie Karn Bridal, a bridal studio in Tel Aviv, I personally guide you through every step — from the first appointment to the final fitting. Each dress is created with a focus on timeless design, precise fit, and premium craftsmanship.',
    intro2: "There are three ways to create your wedding dress, all within the studio's signature aesthetic and without copies.",
    section1H2: 'Creating Your Wedding Dress at Julie Karn Bridal Tel Aviv',
    section1Body: 'Every bride arrives with a different vision, timeline, and level of customization in mind. That is why the studio offers three clear paths: choosing a dress from the collection, personalizing a collection design, or creating a fully custom gown from scratch.',
    section1Body2: 'Each option is designed to offer the same signature values: elegance, personal guidance, quality construction, and a calm, private process.',
    options: [
      {
        num: '01',
        h2: 'Collection Dress',
        body: 'Choose an existing gown from the collection and refine the fit to your body.',
        body2: 'The design stays as it is — with clean, precise tailoring and finishing.',
        body3: undefined as string | undefined,
        ideal: 'This option is ideal for brides who want an existing design they love, with professional fitting and a polished final result.',
        adjustmentsLabel: undefined as string | undefined,
        adjustments: null as string[] | null,
      },
      {
        num: '02',
        h2: 'Personalized Collection Dress',
        body: 'Choose a gown from the collection and make it your own.',
        body2: "The dress is made according to your measurements, with the option for subtle changes or combining elements from different designs while staying within the studio's timeless aesthetic.",
        body3: undefined,
        ideal: 'This option is perfect for brides who want a personalized wedding dress while staying close to the collection style.',
        adjustmentsLabel: 'Possible adjustments may include:',
        adjustments: ['neckline', 'sleeves', 'back', 'length', 'combining selected elements from different gowns'],
      },
      {
        num: '03',
        h2: 'Custom Wedding Dress Design in Tel Aviv',
        body: 'For brides who want something truly unique, the studio offers custom wedding dress design in Tel Aviv.',
        body2: "The gown is designed and made from scratch — based on your body, your vision, and the studio's refined, timeless design language.",
        body3: 'From the first sketch to pattern-making and the final stitch, every detail is created especially for you.',
        ideal: undefined,
        adjustmentsLabel: undefined,
        adjustments: null,
      },
    ],
    fittingsH2: 'Wedding Dress Fitting Process',
    fittingsBody: 'The fitting process is personal, calm, and detail-focused.',
    fittingsBody2: 'Most brides need 3 to 5 fittings, depending on the design path and level of tailoring required.',
    fittingsBody3: 'Every option includes professional fitting adjustments to ensure the best possible fit and finish.',
    ctaH2: 'Book a Bridal Appointment in Tel Aviv',
    ctaBody: 'The first appointment is where we get to know your style, silhouette preferences, timeline, and the type of dress that suits you best.',
    ctaBody2: 'During the appointment, we can explore whether a collection dress, a personalized design, or a custom gown is the right path for you.',
    ctaAddress: 'Studio address: Yehuda Hayamit 27, Tel Aviv',
    ctaTransport: 'Bloomfield light rail station is just 2 minutes away, and parking is usually available nearby.',
    ctaButton: 'Book a Fitting Appointment',
    ctaCollection: 'View Collection',
    faqH2: 'Frequently Asked Questions',
    faqCta: "Still have questions? We'd love to help.",
    faqCtaBook: 'Book a Fitting',
    faqCtaContact: 'Contact Us',
    faq: [
      { q: 'How do I choose the right option — collection, personalization, or custom?', a: 'During your appointment, we explore your style, timeline, and fit preferences together. Then we choose the best path for you.' },
      { q: 'Do you offer rental and purchase?', a: 'Yes. Dresses can be offered as rental or purchase, depending on the design and level of work involved.' },
      { q: 'What is included in the fitting and tailoring process?', a: 'Each dress includes fitting and tailoring to achieve the best possible fit. The exact level of adjustments depends on the option you choose.' },
      { q: 'How far in advance should I book?', a: 'For the best experience, we recommend booking 3–6 months before the wedding. If your timeline is shorter, we will guide you toward the best available option.' },
      { q: 'Can I make changes to a collection dress?', a: 'Yes — within the personalized collection option. You can refine details such as neckline, sleeves, back, length, or combine elements from different designs.' },
      { q: 'Can you recreate a dress from a photo or another designer?', a: 'No. The studio does not make copies. We create original gowns in the Julie Karn Bridal style and can design something inspired by your preferences without duplicating another design.' },
      { q: 'How many fittings will I need?', a: 'Most brides need 3–5 fittings, depending on the option and tailoring required.' },
      { q: 'Where is the studio located?', a: 'The studio is located at Yehuda Hayamit 27, Tel Aviv.' },
      { q: 'What should I bring to the appointment?', a: 'Bring nude seamless underwear, and if possible, shoes similar to your planned heel height. You can also bring inspiration photos.' },
      { q: 'What happens during the first appointment?', a: 'We get to know your style, try silhouettes, discuss the available options, and define the best direction for your dress.' },
      { q: 'Do you work with standard sizes or made-to-measure?', a: 'Both. Some brides choose a collection dress with fitting adjustments, while others prefer a dress made from scratch to their measurements.' },
      { q: 'How do pricing and payment work?', a: "Pricing depends on the chosen path, fabric, and level of work. You'll receive clear guidance during your appointment, including rental or purchase options." },
    ],
    localH2: 'Wedding Dresses in Tel Aviv',
    localBody: 'Julie Karn Bridal is a bridal studio in Tel Aviv specializing in minimalist, elegant, and timeless wedding dresses.',
    localBody2: 'Brides can choose between collection gowns, personalized designs, or custom wedding dresses, all created with personal guidance, premium fabrics, and precise tailoring.',
    localBody3: 'The studio is located in Yehuda Hayamit, Tel Aviv, offering a calm and personal experience for brides looking for a refined and original bridal look.',
    localLinks: {
      dresses: 'Wedding Dresses',
      book: 'Book a Fitting',
      about: 'About',
      contact: 'Contact',
    },
  },
}

// ── FAQ schema (English — primary crawl language) ────────────────
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: CONTENT.en.faq.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function ProcessPage() {
  const { locale } = useLanguage()
  const c = CONTENT[locale]
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <Header />
      <main className="pt-24">

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury max-w-3xl">
            <RevealAnimation>
              <p className="eyebrow mb-4">{c.eyebrow}</p>
              <h1 className="font-serif text-display-lg text-charcoal mb-8">{c.h1}</h1>
              <p className="text-body-lg text-textSecondary leading-relaxed mb-4">{c.intro}</p>
              <p className="text-body-lg text-textSecondary leading-relaxed">{c.intro2}</p>
            </RevealAnimation>
          </div>
        </section>

        {/* ── Section 1 ─────────────────────────────────────────── */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury max-w-3xl">
            <RevealAnimation>
              <h2 className="font-serif text-display-md text-charcoal mb-6">{c.section1H2}</h2>
              <p className="text-body-lg text-textSecondary leading-relaxed mb-4">{c.section1Body}</p>
              <p className="text-body-lg text-textSecondary leading-relaxed">{c.section1Body2}</p>
            </RevealAnimation>
          </div>
        </section>

        {/* ── 3 Options ─────────────────────────────────────────── */}
        <section className="section-padding bg-cream">
          <div className="container-luxury">
            <div className="max-w-3xl">
              {c.options.map((opt, i) => (
                <RevealAnimation key={opt.num} delay={i * 0.1}>
                  <div
                    className={`flex gap-10 sm:gap-16 ${
                      i !== c.options.length - 1 ? 'pb-16 mb-16 border-b border-charcoal/10' : ''
                    }`}
                  >
                    {/* Number */}
                    <div className="flex-shrink-0 w-12 sm:w-16">
                      <span className="font-serif text-5xl sm:text-6xl text-charcoal/[0.12] leading-none select-none">
                        {opt.num}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="pt-1 flex-1 min-w-0">
                      <h2 className="font-serif text-display-sm text-charcoal mb-4">{opt.h2}</h2>
                      <p className="text-body-lg text-textSecondary leading-relaxed mb-3">{opt.body}</p>
                      <p className="text-body-lg text-textSecondary leading-relaxed mb-3">{opt.body2}</p>
                      {opt.body3 && (
                        <p className="text-body-lg text-textSecondary leading-relaxed mb-3">{opt.body3}</p>
                      )}
                      {opt.adjustments && opt.adjustmentsLabel && (
                        <div className="mt-5 mb-5">
                          <p className="text-body-md text-textSecondary mb-3">{opt.adjustmentsLabel}</p>
                          <ul className="space-y-2">
                            {opt.adjustments.map((item) => (
                              <li key={item} className="flex items-start gap-3 text-body-md text-textSecondary">
                                <span className="mt-[9px] w-1 h-1 rounded-full bg-taupe flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {opt.ideal && (
                        <p className="mt-5 text-body-md text-taupe italic leading-relaxed">{opt.ideal}</p>
                      )}
                    </div>
                  </div>
                </RevealAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* ── Fittings ──────────────────────────────────────────── */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury max-w-3xl">
            <RevealAnimation>
              <h2 className="font-serif text-display-md text-charcoal mb-6">{c.fittingsH2}</h2>
              <p className="text-body-lg text-textSecondary leading-relaxed mb-4">{c.fittingsBody}</p>
              <p className="text-body-lg text-textSecondary leading-relaxed mb-4">{c.fittingsBody2}</p>
              <p className="text-body-lg text-textSecondary leading-relaxed">{c.fittingsBody3}</p>
            </RevealAnimation>
          </div>
        </section>

        {/* ── CTA (dark) ────────────────────────────────────────── */}
        <section className="section-padding bg-charcoal">
          <div className="container-luxury max-w-3xl">
            <RevealAnimation>
              <h2 className="font-serif text-display-md text-cream mb-6">{c.ctaH2}</h2>
              <p className="text-body-lg text-cream/70 leading-relaxed mb-4">{c.ctaBody}</p>
              <p className="text-body-lg text-cream/70 leading-relaxed mb-8">{c.ctaBody2}</p>
              <div className="mb-10 space-y-1.5">
                <p className="text-body-md text-cream/50">{c.ctaAddress}</p>
                <p className="text-body-md text-cream/50">{c.ctaTransport}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link href="/book" className="btn-primary bg-cream text-charcoal hover:bg-warmWhite px-10 py-4">
                  {c.ctaButton}
                </Link>
                <Link href="/dresses" className="btn-outline text-cream border-cream/40 hover:bg-cream hover:text-charcoal hover:border-cream px-8 py-3">
                  {c.ctaCollection}
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury max-w-3xl">
            <RevealAnimation>
              <h2 className="font-serif text-display-md text-charcoal mb-12">{c.faqH2}</h2>
            </RevealAnimation>

            <div className="divide-y divide-charcoal/10">
              {c.faq.map((item, i) => (
                <RevealAnimation key={i} delay={i * 0.03}>
                  <div>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 py-7 text-start group"
                    >
                      <span className="font-serif text-xl text-charcoal group-hover:text-taupe transition-colors duration-300">
                        {item.q}
                      </span>
                      <span className="flex-shrink-0 text-taupe">
                        {openFaq === i ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>

                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-7 text-body-md text-textSecondary leading-relaxed">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </RevealAnimation>
              ))}
            </div>

            {/* CTA after FAQ */}
            <RevealAnimation delay={0.2} className="mt-16 pt-12 border-t border-charcoal/10 text-center">
              <p className="font-serif text-display-sm text-charcoal mb-8">{c.faqCta}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/book" className="btn-primary px-10 py-4">
                  {c.faqCtaBook}
                </Link>
                <Link href="/contact" className="btn-outline px-10 py-4">
                  {c.faqCtaContact}
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </section>

        {/* ── Local SEO ─────────────────────────────────────────── */}
        <section className="py-16 bg-ivory border-t border-charcoal/[0.06]">
          <div className="container-luxury max-w-3xl">
            <RevealAnimation>
              <h2 className="font-serif text-display-sm text-charcoal mb-5">{c.localH2}</h2>
              <div className="space-y-3 mb-8">
                <p className="text-body-md text-textSecondary leading-relaxed">{c.localBody}</p>
                <p className="text-body-md text-textSecondary leading-relaxed">{c.localBody2}</p>
                <p className="text-body-md text-textSecondary leading-relaxed">{c.localBody3}</p>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
                <Link href="/dresses" className="text-body-sm text-taupe hover:text-charcoal underline underline-offset-4 transition-colors duration-300">
                  {c.localLinks.dresses}
                </Link>
                <span className="text-charcoal/20 text-xs">·</span>
                <Link href="/book" className="text-body-sm text-taupe hover:text-charcoal underline underline-offset-4 transition-colors duration-300">
                  {c.localLinks.book}
                </Link>
                <span className="text-charcoal/20 text-xs">·</span>
                <Link href="/about" className="text-body-sm text-taupe hover:text-charcoal underline underline-offset-4 transition-colors duration-300">
                  {c.localLinks.about}
                </Link>
                <span className="text-charcoal/20 text-xs">·</span>
                <Link href="/contact" className="text-body-sm text-taupe hover:text-charcoal underline underline-offset-4 transition-colors duration-300">
                  {c.localLinks.contact}
                </Link>
              </div>
            </RevealAnimation>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
