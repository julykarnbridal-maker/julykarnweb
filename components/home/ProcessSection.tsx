'use client'

import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import RevealAnimation from '@/components/ui/RevealAnimation'

export default function ProcessSection() {
  const { t } = useLanguage()
  const p = t.process

  return (
    <section className="section-padding bg-warmWhite">
      <div className="container-luxury">
        {/* Header */}
        <RevealAnimation>
          <div className="max-w-2xl mb-20">
            <p className="eyebrow mb-4">{p.eyebrow}</p>
            <h2 className="font-serif text-display-md text-charcoal mb-5">{p.headline}</h2>
            <p className="text-body-lg text-textSecondary">{p.subheadline}</p>
          </div>
        </RevealAnimation>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-charcoal/10">
          {p.steps.map((step, i) => (
            <RevealAnimation key={step.num} delay={i * 0.1}>
              <div className="bg-warmWhite p-8 lg:p-10 h-full group hover:bg-ivory transition-colors duration-400">
                <p className="font-serif text-6xl text-charcoal/10 group-hover:text-gold/30 transition-colors duration-400 leading-none mb-6">
                  {step.num}
                </p>
                <h3 className="font-serif text-2xl text-charcoal mb-4">{step.title}</h3>
                <p className="text-body-sm text-textSecondary leading-relaxed">{step.body}</p>
              </div>
            </RevealAnimation>
          ))}
        </div>

        {/* CTA */}
        <RevealAnimation delay={0.4} className="mt-16 flex justify-center">
          <Link href="/book" className="btn-primary">
            {p.cta}
          </Link>
        </RevealAnimation>
      </div>
    </section>
  )
}
