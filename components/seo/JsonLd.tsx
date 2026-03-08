type Props = { data: object }

export default function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ── Schema factories ─────────────────────────────────────────────

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://juliekarn.com'

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BASE}/#business`,
  name: 'Julie Karn Bridal',
  alternateName: 'ג\'ולי קארן בריידל',
  description: 'Custom bridal gown design studio in Tel Aviv, Israel. Minimalist and elegant wedding dresses, personal fittings.',
  url: BASE,
  telephone: '+972-50-000-0000',
  email: 'julie@juliekarn.com',
  image: `${BASE}/og-image.jpg`,
  logo: `${BASE}/logo.png`,
  priceRange: '₪₪₪',
  currenciesAccepted: 'ILS',
  paymentAccepted: 'Cash, Credit Card',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tel Aviv',
    addressRegion: 'Tel Aviv District',
    addressCountry: 'IL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 32.0853,
    longitude: 34.7818,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '10:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: '10:00',
      closes: '14:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/juliekarn.bridal',
  ],
  hasMap: 'https://maps.google.com/?q=Tel+Aviv+Israel',
  areaServed: [
    { '@type': 'City', name: 'Tel Aviv' },
    { '@type': 'City', name: 'Herzliya' },
    { '@type': 'City', name: 'Ramat Gan' },
    { '@type': 'City', name: 'Petah Tikva' },
    { '@type': 'AdministrativeArea', name: 'Central District, Israel' },
  ],
  makesOffer: [
    {
      '@type': 'Offer',
      name: 'Custom Wedding Gown Design',
      description: 'Bespoke bridal gown design with personal fittings. שמלות כלה בעיצוב אישי.',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: '8000',
        priceCurrency: 'ILS',
      },
    },
  ],
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

export function articleSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  image,
}: {
  title: string
  description: string
  slug: string
  datePublished: string
  dateModified: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${BASE}/blog/${slug}`,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: 'Julie Karn',
      url: `${BASE}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Julie Karn Bridal',
      logo: { '@type': 'ImageObject', url: `${BASE}/logo.png` },
    },
    image: image || `${BASE}/og-image.jpg`,
    inLanguage: ['he', 'en'],
    isPartOf: { '@type': 'WebSite', name: 'Julie Karn Bridal', url: BASE },
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
