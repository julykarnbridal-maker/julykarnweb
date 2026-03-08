import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import FeaturedDresses from '@/components/home/FeaturedDresses'
import DesignerSection from '@/components/home/DesignerSection'
import ProcessSection from '@/components/home/ProcessSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import InstagramSection from '@/components/home/InstagramSection'
import BookingCTA from '@/components/home/BookingCTA'
import JsonLd, { localBusinessSchema } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <Header />
      <main>
        <HeroSection />
        <FeaturedDresses />
        <DesignerSection />
        <ProcessSection />
        <TestimonialsSection />
        <InstagramSection />
        <BookingCTA />
      </main>
      <Footer />
    </>
  )
}
