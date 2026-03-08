'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/hooks/useLanguage'
import LanguageSwitcher from './LanguageSwitcher'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // On non-home pages always use solid background
  const solid = scrolled || !isHome

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { href: '/about', label: t.nav.about },
    { href: '/dresses', label: t.nav.dresses },
    { href: '/process', label: t.nav.process },
    { href: '/reviews', label: t.nav.reviews },
    { href: '/faq', label: t.nav.faq },
    { href: '/contact', label: t.nav.contact },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ease-luxury ${
          solid
            ? 'bg-warmWhite/95 backdrop-blur-sm border-b border-charcoal/8'
            : 'bg-gradient-to-b from-black/50 to-transparent'
        }`}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-18 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className={`font-serif text-xl tracking-[0.05em] transition-colors duration-400 ${
                solid ? 'text-charcoal' : 'text-cream'
              }`}
            >
              Julie Karn
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {links.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[0.8rem] font-normal tracking-[0.15em] uppercase transition-colors duration-300 hover:text-charcoal ${
                    solid ? 'text-textSecondary' : 'text-cream'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-5">
              <LanguageSwitcher
                className={`hidden md:flex ${solid ? '' : '[&>div]:border-cream/30 [&_button]:text-cream/70 [&_button:hover]:text-cream [&_.bg-charcoal]:bg-cream/20'}`}
              />
              <Link
                href="/book"
                className={`hidden md:inline-flex btn-primary text-xs py-3 px-5 ${
                  solid ? '' : 'bg-cream/15 backdrop-blur-sm border border-cream/30 hover:bg-cream hover:text-charcoal'
                }`}
              >
                {t.nav.bookCta}
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(o => !o)}
                className={`lg:hidden p-1 transition-colors duration-300 ${
                  solid ? 'text-charcoal' : 'text-cream'
                }`}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-warmWhite transition-all duration-600 ease-out-expo flex flex-col ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container-luxury flex flex-col h-full pt-28 pb-12">
          <nav className="flex flex-col gap-2 flex-1">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-display-sm text-charcoal hover:text-taupe transition-colors duration-300 py-2"
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-charcoal/10 pt-8 space-y-5">
            {/* Language switcher — prominent on mobile */}
            <div className="flex items-center gap-3">
              <span className="text-caption text-textMuted uppercase tracking-widest">Language</span>
              <LanguageSwitcher className="[&>div]:border-charcoal/30 [&_button]:py-1.5 [&_button]:px-4 [&_button]:text-xs" />
            </div>
            <Link href="/book" onClick={() => setMenuOpen(false)} className="btn-primary w-full text-center">
              {t.nav.bookCta}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
