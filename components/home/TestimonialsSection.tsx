'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage'
import RevealAnimation from '@/components/ui/RevealAnimation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function TestimonialsSection() {
  const { t } = useLanguage()
  const r = t.reviews
  const [active, setActive] = useState(0)

  const prev = () => setActive(a => (a - 1 + r.items.length) % r.items.length)
  const next = () => setActive(a => (a + 1) % r.items.length)

  return (
    <section className="section-padding bg-charcoal text-cream overflow-hidden">
      <div className="container-luxury">
        {/* Header */}
        <RevealAnimation>
          <div className="text-center mb-16">
            <p className="eyebrow text-cream/40 mb-3">{r.eyebrow}</p>
            <h2 className="font-serif text-display-md text-cream">{r.headline}</h2>
          </div>
        </RevealAnimation>

        {/* Testimonial carousel */}
        <div className="max-w-3xl mx-auto">
          <RevealAnimation>
            <div className="relative min-h-[220px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-center w-full"
                >
                  {/* Quote mark */}
                  <span className="font-serif text-8xl text-gold/30 leading-none block -mb-4">&ldquo;</span>

                  <blockquote className="font-serif text-display-sm text-cream font-light leading-relaxed mb-8">
                    {r.items[active].quote}
                  </blockquote>

                  <div className="flex flex-col items-center gap-1">
                    <p className="font-serif text-lg text-cream">{r.items[active].name}</p>
                    <p className="eyebrow text-cream/40">{r.items[active].location} · {r.items[active].wedding}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-12">
              <button
                onClick={prev}
                className="w-10 h-10 flex items-center justify-center border border-cream/20 text-cream/60 hover:border-cream hover:text-cream transition-all duration-300"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {r.items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`transition-all duration-400 ${
                      i === active
                        ? 'w-8 h-px bg-gold'
                        : 'w-2 h-px bg-cream/30 hover:bg-cream/50'
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 flex items-center justify-center border border-cream/20 text-cream/60 hover:border-cream hover:text-cream transition-all duration-300"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  )
}
