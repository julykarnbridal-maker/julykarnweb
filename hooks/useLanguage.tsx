'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, type Locale } from '@/content/translations'

type LanguageContextType = {
  locale: Locale
  t: typeof translations.he
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('he')

  useEffect(() => {
    const saved = localStorage.getItem('jk_locale') as Locale | null
    if (saved === 'en' || saved === 'he') {
      setLocaleState(saved)
    } else {
      // Auto-detect: Hebrew browser → he, everything else → en
      const browserLang = navigator.language || ''
      setLocaleState(browserLang.startsWith('he') ? 'he' : 'en')
    }
  }, [])

  useEffect(() => {
    const t = translations[locale]
    document.documentElement.lang = t.lang
    document.documentElement.dir = t.dir
    localStorage.setItem('jk_locale', locale)
  }, [locale])

  const setLocale = (l: Locale) => setLocaleState(l)
  const toggleLocale = () => setLocaleState(l => l === 'he' ? 'en' : 'he')

  return (
    <LanguageContext.Provider value={{
      locale,
      t: translations[locale] as typeof translations.he,
      setLocale,
      toggleLocale,
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
