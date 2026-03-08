'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import RevealAnimation from '@/components/ui/RevealAnimation'
import { Mail, Instagram, MapPin, Clock } from 'lucide-react'

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.832L.057 23.215a.75.75 0 0 0 .728.943l5.556-1.457A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.68-.51-5.21-1.402l-.374-.22-3.876 1.016 1.036-3.77-.243-.389A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  )
}

export default function ContactPage() {
  const { t } = useLanguage()
  const c = t.contact

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Header */}
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <RevealAnimation>
              <p className="eyebrow mb-4">{c.eyebrow}</p>
              <h1 className="font-serif text-display-lg text-charcoal">{c.headline}</h1>
              <p className="mt-4 text-body-lg text-textSecondary max-w-xl">{c.subheadline}</p>
            </RevealAnimation>
          </div>
        </section>

        {/* Contact info + map */}
        <section className="section-padding bg-warmWhite">
          <div className="container-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Info */}
              <div className="space-y-10">
                <RevealAnimation>
                  <div className="space-y-6">
                    {[
                      { icon: WhatsAppIcon, value: c.phone, href: `https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`, dir: 'ltr' as const, target: '_blank' as const },
                      { icon: Mail, value: c.email, href: `mailto:${c.email}` },
                      { icon: Instagram, value: c.instagram, href: 'https://www.instagram.com/juliekarn.bridal', target: '_blank' },
                      { icon: MapPin, value: c.address },
                      { icon: Clock, value: c.hours },
                    ].map(({ icon: Icon, value, href, dir, target }) => (
                      <div key={value} className="flex items-start gap-4">
                        <Icon size={16} className="text-gold mt-1 flex-shrink-0" />
                        {href ? (
                          <a
                            href={href}
                            target={target}
                            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                            dir={dir}
                            className="text-body-md text-textSecondary hover:text-charcoal transition-colors duration-300"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-body-md text-textSecondary" dir={dir}>{value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </RevealAnimation>

                {/* Decorative quote */}
                <RevealAnimation delay={0.2}>
                  <div className="border-s-2 border-gold ps-6">
                    <p className="font-serif text-2xl text-charcoal italic leading-relaxed">
                      &ldquo;{t.hero.subheadline}&rdquo;
                    </p>
                  </div>
                </RevealAnimation>
              </div>

              {/* Map embed placeholder */}
              <RevealAnimation delay={0.2}>
                <div className="relative overflow-hidden bg-ivory" style={{ aspectRatio: '4/3' }}>
                  <iframe
                    title="Julie Karn Bridal — Location"
                    src="https://www.google.com/maps?q=יהודה+הימית+27,+תל+אביב&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(40%) contrast(1.1)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                </div>
              </RevealAnimation>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
