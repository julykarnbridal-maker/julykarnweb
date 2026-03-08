'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import RevealAnimation from '@/components/ui/RevealAnimation'
import { Plus, Minus } from 'lucide-react'

// Schema is injected server-side via a separate script tag in the head
// (can't do it client-side with useLanguage — add schema in metadata for the EN version)

export default function FaqPage() {
  const { t, locale } = useLanguage()
  const f = t.faq
  const [open, setOpen] = useState<number | null>(0)

  return (
    <>
      {/* FAQ JSON-LD — English version for Google (primary crawl lang) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'How long does the design process take?', acceptedAnswer: { '@type': 'Answer', text: 'On average, 4–6 months from the first meeting to the wedding day. It\'s recommended to contact me 9–12 months before your date.' } },
              { '@type': 'Question', name: 'What does the price include?', acceptedAnswer: { '@type': 'Answer', text: 'The price includes the gown design, all fitting appointments, and personal guidance throughout the entire process. No surprises.' } },
              { '@type': 'Question', name: 'Where is the studio located?', acceptedAnswer: { '@type': 'Answer', text: 'The studio is located in Tel Aviv, Israel. Exact details are provided after booking an appointment.' } },
              { '@type': 'Question', name: 'Can changes be made mid-process?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — flexibility is part of the service. We work together until everything feels exactly right.' } },
              { '@type': 'Question', name: 'Can I bring someone to the appointment?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. Bringing your mother, sister, or closest friend can make the appointment even more special.' } },
              { '@type': 'Question', name: 'What is the price range?', acceptedAnswer: { '@type': 'Answer', text: 'Gowns start from ₪8,000. The final price depends on the design, fabrics, and complexity.' } },
            ],
          }),
        }}
      />
      <Header />
      <main className="pt-24">
        {/* Header */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <RevealAnimation>
              <p className="eyebrow mb-4">{f.eyebrow}</p>
              <h1 className="font-serif text-display-lg text-charcoal">{f.headline}</h1>
            </RevealAnimation>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury max-w-3xl">
            <div className="divide-y divide-charcoal/10">
              {f.items.map((item, i) => (
                <RevealAnimation key={i} delay={i * 0.05}>
                  <div>
                    <button
                      onClick={() => setOpen(open === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 py-7 text-start group"
                    >
                      <span className="font-serif text-xl text-charcoal group-hover:text-taupe transition-colors duration-300">
                        {item.q}
                      </span>
                      <span className="flex-shrink-0 text-taupe">
                        {open === i ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>

                    <AnimatePresence>
                      {open === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-7 text-body-md text-textSecondary leading-relaxed">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </RevealAnimation>
              ))}
            </div>

            {/* CTA */}
            <RevealAnimation delay={0.4} className="mt-16 text-center">
              <p className="text-body-md text-textSecondary mb-6">
                {t.contact.subheadline}
              </p>
              <Link href="/book" className="btn-primary">
                {t.nav.bookCta}
              </Link>
            </RevealAnimation>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
