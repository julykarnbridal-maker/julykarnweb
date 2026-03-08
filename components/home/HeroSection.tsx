'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { ArrowDown } from 'lucide-react'

// Replace VIDEO_URL with your real video file path (e.g. '/hero-video.mp4')
// When VIDEO_URL is empty, the cinematic Ken Burns CSS animation plays instead.
const VIDEO_URL = '/hero-video.mp4'

const SLIDES = [
  'https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?w=1920&q=90&fit=crop',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=90&fit=crop',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=90&fit=crop',
]

export default function HeroSection() {
  const { t } = useLanguage()
  const h = t.hero

  const lines = h.headline.split('\n')

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-charcoal">
        {VIDEO_URL ? (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            autoPlay
            muted
            loop
            playsInline
            poster={SLIDES[0]}
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        ) : (
          /* Cinematic Ken Burns slideshow — 3 images crossfading with slow zoom */
          <div className="absolute inset-0">
            {SLIDES.map((src, i) => (
              <div
                key={src}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${src})`,
                  opacity: 0.72,
                  animation: `heroSlide 18s ease-in-out ${i * 6}s infinite`,
                  animationFillMode: 'both',
                }}
              />
            ))}
          </div>
        )}
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <style jsx global>{`
        @keyframes heroSlide {
          0%   { opacity: 0; transform: scale(1.08); }
          8%   { opacity: 0.72; }
          33%  { opacity: 0.72; transform: scale(1.0); }
          42%  { opacity: 0; transform: scale(1.0); }
          100% { opacity: 0; transform: scale(1.08); }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 text-center text-cream px-6 flex flex-col items-center w-full max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          className="eyebrow text-cream/60 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {h.eyebrow}
        </motion.p>

        {/* Headline */}
        <h1 className="font-serif font-light text-cream">
          {lines.map((line, i) => (
            <motion.span
              key={i}
              className="block text-display-xl"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.4 + i * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          className="mt-8 text-body-lg text-cream/70 font-sans font-light tracking-wide max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {h.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-12 w-full flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Link
            href="/book"
            className="btn-primary bg-cream text-charcoal hover:bg-warmWhite px-10 py-4 text-xs"
          >
            {h.cta}
          </Link>
          <Link
            href="/dresses"
            className="btn-primary bg-cream text-charcoal hover:bg-warmWhite px-10 py-4 text-xs"
          >
            {t.featured.viewAll}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
