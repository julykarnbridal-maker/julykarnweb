'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import type { Dress } from '@/content/dresses'

export default function DressCard({ dress }: { dress: Dress }) {
  const { locale } = useLanguage()

  return (
    <Link href={`/dresses/${dress.slug}`} className="group block">
      <div className="img-hover aspect-[3/4] relative bg-ivory overflow-hidden">
        <Image
          src={dress.image}
          alt={dress.name[locale]}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/15 transition-all duration-600 ease-luxury" />
      </div>
      <div className="pt-5 pb-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-serif text-xl text-charcoal leading-tight">{dress.name[locale]}</p>
            <p className="eyebrow mt-1">{dress.fabric[locale]}</p>
          </div>
          <span className="text-taupe mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-lg">→</span>
        </div>
        <p className="mt-3 text-body-sm text-textSecondary line-clamp-2">{dress.description[locale]}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {dress.tags[locale].map(tag => (
            <span key={tag} className="eyebrow border border-warmGrey/30 px-2 py-1 rounded-none text-taupe">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
