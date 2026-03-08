'use client'

import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { Instagram, Mail, Phone } from 'lucide-react'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-charcoal text-cream">
      <div className="container-luxury">
        {/* Top */}
        <div className="section-padding border-b border-cream/10 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p className="font-serif text-3xl mb-4">Julie Karn</p>
            <p className="text-body-sm text-cream/60 max-w-xs leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="line-accent bg-gold mt-6" />
          </div>

          {/* Links */}
          <div>
            <p className="eyebrow text-cream/40 mb-5">Navigation</p>
            <div className="flex flex-col gap-3">
              {[
                { href: '/dresses', label: t.footer.links.dresses },
                { href: '/about', label: t.footer.links.about },
                { href: '/process', label: t.footer.links.process },
                { href: '/book', label: t.footer.links.book },
                { href: '/contact', label: t.footer.links.contact },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-body-sm text-cream/60 hover:text-cream transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow text-cream/40 mb-5">Contact</p>
            <div className="flex flex-col gap-4">
              <a
                href={`tel:${t.contact.phone}`}
                className="flex items-center gap-3 text-body-sm text-cream/60 hover:text-cream transition-colors duration-300"
              >
                <Phone size={14} className="text-gold flex-shrink-0" />
                <span dir="ltr">{t.contact.phone}</span>
              </a>
              <a
                href={`mailto:${t.contact.email}`}
                className="flex items-center gap-3 text-body-sm text-cream/60 hover:text-cream transition-colors duration-300"
              >
                <Mail size={14} className="text-gold flex-shrink-0" />
                {t.contact.email}
              </a>
              <a
                href="https://www.instagram.com/juliekarn.bridal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-body-sm text-cream/60 hover:text-cream transition-colors duration-300"
              >
                <Instagram size={14} className="text-gold flex-shrink-0" />
                {t.contact.instagram}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-caption text-cream/40">{t.footer.copyright}</p>
          <Link
            href="/privacy"
            className="text-caption text-cream/40 hover:text-cream/70 transition-colors duration-300"
          >
            {t.footer.links.privacy}
          </Link>
        </div>
      </div>
    </footer>
  )
}
