'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section style={{ padding: '5rem 5vw', textAlign: 'center', background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06), transparent 70%)' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '1rem', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>Special Offer</p>
        <h2 style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif', fontSize: 'clamp(1.8rem, 3vw, 3rem)', fontWeight: 700, marginBottom: '1rem', color: '#f5f0e8', maxWidth: '520px', margin: '0 auto 1rem' }}>Get 20% Off Your First Online Order</h2>
        <p style={{ color: 'rgba(245,240,232,0.5)', marginBottom: '2rem', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>
          Use code <strong style={{ color: '#c9a84c' }}>SAVORIA20</strong> at checkout. New customers only.
        </p>
        <Link href="/menu" style={{ display: 'inline-block', padding: '16px 40px', background: 'linear-gradient(135deg, #c9a84c, #e8c87a)', color: '#1a1200', fontWeight: 700, borderRadius: '14px', textDecoration: 'none', fontSize: '1rem', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>
          Order Now →
        </Link>
      </motion.div>
    </section>
  )
}
