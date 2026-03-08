import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { dresses } from '@/content/dresses'

export const metadata: Metadata = {
  title: 'Minimalist Wedding Dresses Israel | שמלות כלה מינימליסטיות תל אביב | Julie Karn',
  description: 'Premium minimalist wedding dresses in Israel. Clean lines, premium fabrics, timeless silhouettes. Custom-designed by Julie Karn in Tel Aviv. שמלות כלה מינימליסטיות בסגנון עכשווי — בעיצוב אישי בתל אביב.',
  keywords: ['minimalist wedding dresses', 'minimalist wedding dresses israel', 'שמלות כלה מינימליסטיות', 'שמלות כלה מינימליסטיות תל אביב', 'clean wedding dress', 'simple wedding gown israel'],
  alternates: { canonical: '/minimalist-wedding-dresses' },
  openGraph: {
    title: 'Minimalist Wedding Dresses | Julie Karn Bridal',
    description: 'Clean, timeless, minimal. Custom wedding gowns for the modern bride.',
  },
}

const HERO = 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&q=90&fit=crop'
const minimalDresses = dresses.filter(d => d.tags.en.some(t => ['minimalist', 'column', 'clean', 'fluid'].includes(t)))

export default function MinimalistWeddingDressesPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative h-[70vh] flex items-end bg-charcoal overflow-hidden">
          <Image
            src={HERO}
            alt="Minimalist Wedding Dresses Israel"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="relative z-10 container-luxury pb-16">
            <p className="eyebrow text-cream/60 mb-3">Julie Karn Bridal</p>
            <h1 className="font-serif text-display-lg text-cream max-w-2xl">
              Minimalist Wedding Dresses<br />
              <span className="text-gold font-light">שמלות כלה מינימליסטיות</span>
            </h1>
          </div>
        </section>

        {/* Intro */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-body-lg text-textSecondary leading-relaxed">
                A minimalist wedding dress is not about removing — it is about refining.
                Every seam, every line, every fabric choice is intentional.
                Julie Karn creates gowns that are effortlessly elegant, designed to photograph beautifully and feel even better.
              </p>
              <p className="text-body-md text-textSecondary mt-4 leading-relaxed" dir="rtl" lang="he">
                שמלת כלה מינימליסטית היא לא פשוטה — היא מדויקת. כל תפר, כל קו, כל בד — נבחרו בכוונה.
                ג'ולי קארן מעצבת שמלות שהן אלגנטיות בצורה קלה, מצולמות יפה ומרגישות אפילו יותר טוב.
              </p>
            </div>

            {/* Dresses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {minimalDresses.map(dress => (
                <Link key={dress.id} href={`/dresses/${dress.slug}`} className="group block">
                  <div className="img-hover relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    <Image
                      src={dress.image}
                      alt={`${dress.name.en} — Minimalist Wedding Dress Israel`}
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

        {/* SEO text block */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
              <div>
                <h2 className="font-serif text-display-sm text-charcoal mb-5">
                  Minimalist Wedding Gowns in Israel
                </h2>
                <p className="text-body-md text-textSecondary leading-relaxed">
                  Julie Karn Bridal specialises in minimalist and modern wedding dresses for Israeli brides.
                  Based in Tel Aviv, Julie works personally with each bride to create a gown that reflects her individual style — not a trend.
                  From satin column gowns to silk crepe A-lines, every dress is made to order.
                </p>
              </div>
              <div dir="rtl" lang="he">
                <h2 className="font-serif text-display-sm text-charcoal mb-5">
                  שמלות כלה מינימליסטיות בישראל
                </h2>
                <p className="text-body-md text-textSecondary leading-relaxed">
                  ג'ולי קארן בריידל מתמחה בשמלות כלה מינימליסטיות ומודרניות לכלות ישראליות.
                  מבוסס בתל אביב, ג'ולי עובדת אישית עם כל כלה ליצירת שמלה שמשקפת את הסגנון האישי שלה — לא טרנד.
                  משמלות עמוד בסאטן ועד A-ליין בקרפ משי — כל שמלה עשויה להזמנה.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-charcoal">
          <div className="container-luxury text-center">
            <h2 className="font-serif text-display-md text-cream mb-6">Book a Fitting — קבעי תור</h2>
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
