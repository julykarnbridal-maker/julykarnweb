'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'
import RevealAnimation from '@/components/ui/RevealAnimation'
import { Instagram } from 'lucide-react'

const FALLBACK = [
  'https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?w=600&q=80&fit=crop',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80&fit=crop',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80&fit=crop',
  'https://images.unsplash.com/photo-1536632788163-5e1b88742f76?w=600&q=80&fit=crop',
  'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=600&q=80&fit=crop',
  'https://images.unsplash.com/photo-1551803091-e20673f15770?w=600&q=80&fit=crop',
]

type Post = { id: string; url: string; permalink: string }

export default function InstagramSection() {
  const { t } = useLanguage()
  const [posts, setPosts] = useState<Post[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/instagram')
      .then(r => r.json())
      .then(data => {
        setPosts(data.posts || [])
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  const items = posts.length === 6 ? posts : null

  return (
    <section className="section-padding bg-ivory">
      <div className="container-luxury">
        <RevealAnimation>
          <div className="text-center mb-12">
            <a
              href="https://www.instagram.com/juliekarn.bridal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 eyebrow hover:text-charcoal transition-colors duration-300"
            >
              <Instagram size={14} />
              {t.contact.instagram}
            </a>
          </div>
        </RevealAnimation>

        {/* 6-photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {(items
            ? items.map((post, i) => ({ key: post.id, src: post.url, href: post.permalink, i }))
            : FALLBACK.map((src, i) => ({ key: String(i), src, href: 'https://www.instagram.com/juliekarn.bridal', i }))
          ).map(({ key, src, href, i }) => (
            <RevealAnimation key={key} delay={i * 0.05}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="img-hover block aspect-square relative overflow-hidden bg-ivory"
              >
                <Image
                  src={src}
                  alt={`Julie Karn Bridal — Instagram ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  unoptimized={!!items}
                />
                <div className="absolute inset-0 bg-charcoal/0 hover:bg-charcoal/20 transition-all duration-400 flex items-center justify-center">
                  <Instagram size={20} className="text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </div>
              </a>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
