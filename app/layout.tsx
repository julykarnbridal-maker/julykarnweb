import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter, Frank_Ruhl_Libre, Heebo } from 'next/font/google'
import { LanguageProvider } from '@/hooks/useLanguage'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500'],
  variable: '--font-frank-ruhl',
  display: 'swap',
})

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500'],
  variable: '--font-heebo',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://juliekarn.com'),
  title: {
    default: 'Julie Karn Bridal | שמלות כלה בעיצוב אישי | תל אביב',
    template: '%s | Julie Karn Bridal',
  },
  description: 'שמלות כלה מינימליסטיות ואלגנטיות בעיצוב אישי. לכלה שבוחרת לא להיות כמו כולן. סטודיו בתל אביב.',
  keywords: [
    'שמלות כלה', 'שמלות כלה מינימליסטיות', 'שמלות כלה אלגנטיות',
    'שמלות כלה בעיצוב אישי', 'שמלות כלה תל אביב', 'שמלות כלה על זמניות',
    'minimalist wedding dresses', 'elegant wedding dresses israel', 'custom wedding gown tel aviv',
  ],
  authors: [{ name: 'Julie Karn Bridal' }],
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    alternateLocale: ['en_US'],
    siteName: 'Julie Karn Bridal',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${cormorant.variable} ${inter.variable} ${frankRuhl.variable} ${heebo.variable}`}>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
