'use client'

import { useLanguage } from '@/hooks/useLanguage'

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useLanguage()

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center rounded-full border border-charcoal/20 overflow-hidden">
        <button
          onClick={() => setLocale('he')}
          className={`px-3 py-1 text-caption font-sans tracking-widest uppercase transition-all duration-300 ${
            locale === 'he'
              ? 'bg-charcoal text-cream'
              : 'text-textSecondary hover:text-charcoal'
          }`}
          aria-label="Switch to Hebrew"
        >
          HE
        </button>
        <button
          onClick={() => setLocale('en')}
          className={`px-3 py-1 text-caption font-sans tracking-widest uppercase transition-all duration-300 ${
            locale === 'en'
              ? 'bg-charcoal text-cream'
              : 'text-textSecondary hover:text-charcoal'
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
      </div>
    </div>
  )
}
