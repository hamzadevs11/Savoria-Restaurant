'use client'
import { motion } from 'framer-motion'

const testimonials = [
  { text: 'The lamb chops were transcendent. The truffle risotto — I dream about it still. This is what fine dining should be.', author: 'Sophie R.', role: 'Food Critic, The Times', initials: 'SR' },
  { text: 'Ordered delivery for our anniversary dinner. The packaging was stunning, food arrived hot, tasted like restaurant quality.', author: 'Marcus K.', role: 'Regular Guest', initials: 'MK' },
  { text: 'The reservation system is seamless. Booked a table for 12, got instant confirmation. World-class service.', author: 'Amara L.', role: 'Event Planner', initials: 'AL' },
]

export default function TestimonialsSection() {
  return (
    <section style={{ padding: '5rem 5vw', background: '#111', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '10px', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>Guest Reviews</p>
          <h2 style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, color: '#f5f0e8' }}>What Our Guests Say</h2>
          <div style={{ width: '60px', height: '2px', background: 'linear-gradient(to right, #c9a84c, transparent)', marginTop: '16px' }} />
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              style={{ background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '20px', padding: '1.5rem' }}>
              <div style={{ color: '#c9a84c', fontSize: '0.9rem', letterSpacing: '0.2em', marginBottom: '14px' }}>★★★★★</div>
              <p style={{ color: 'rgba(245,240,232,0.55)', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '1.2rem', fontStyle: 'italic', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #e8c87a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a1200', fontWeight: 700, fontSize: '0.82rem', flexShrink: 0, fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>{t.initials}</div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f5f0e8', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>{t.author}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.35)', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
