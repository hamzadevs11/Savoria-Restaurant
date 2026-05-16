// src/app/page.tsx
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedSection from '@/components/sections/FeaturedSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Savoria — Premium Restaurant & Delivery',
  description: 'Experience culinary artistry at its finest. 3 Michelin stars. Fresh ingredients, bold flavors.',
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedSection />
        <ExperienceSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
