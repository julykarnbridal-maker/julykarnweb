'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BookingForm from '@/components/forms/BookingForm'
import { useLanguage } from '@/hooks/useLanguage'
import RevealAnimation from '@/components/ui/RevealAnimation'
import { Phone, Mail, Instagram } from 'lucide-react'

export default function BookPage() {
  const { t } = useLanguage()
  const b = t.booking

  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Left — info */}
              <div>
                <RevealAnimation>
                  <p className="eyebrow mb-4">{b.eyebrow}</p>
                  <h1 className="font-serif text-display-lg text-charcoal mb-6">{b.headline}</h1>
                  <div className="line-accent mb-8" />
                  <p className="text-body-lg text-textSecondary leading-relaxed">{b.subheadline}</p>
                </RevealAnimation>

                {/* Process reminder */}
                <RevealAnimation delay={0.2} className="mt-12 bg-cream p-8 space-y-4">
                  {t.process.steps.slice(0, 2).map(step => (
                    <div key={step.num} className="flex gap-4">
                      <span className="font-serif text-2xl text-gold font-light leading-none flex-shrink-0">
                        {step.num}
                      </span>
                      <div>
                        <p className="font-sans text-sm font-medium text-charcoal">{step.title}</p>
                        <p className="text-body-sm text-textSecondary mt-1">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </RevealAnimation>

                {/* Alt contact */}
                <RevealAnimation delay={0.3} className="mt-10 space-y-4">
                  <a href={`tel:${t.contact.phone}`} className="flex items-center gap-3 text-body-sm text-textSecondary hover:text-charcoal transition-colors duration-300">
                    <Phone size={14} className="text-gold" />
                    <span dir="ltr">{t.contact.phone}</span>
                  </a>
                  <a href={`mailto:${t.contact.email}`} className="flex items-center gap-3 text-body-sm text-textSecondary hover:text-charcoal transition-colors duration-300">
                    <Mail size={14} className="text-gold" />
                    {t.contact.email}
                  </a>
                  <a href="https://www.instagram.com/juliekarn.bridal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-body-sm text-textSecondary hover:text-charcoal transition-colors duration-300">
                    <Instagram size={14} className="text-gold" />
                    {t.contact.instagram}
                  </a>
                </RevealAnimation>
              </div>

              {/* Right — form */}
              <RevealAnimation delay={0.2}>
                <BookingForm />
              </RevealAnimation>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
