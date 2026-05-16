'use client'
import { motion } from 'framer-motion'

const features = [
  { icon: '🌿', title: 'Farm-to-Table Freshness', desc: 'Locally sourced, seasonal ingredients delivered daily from trusted partner farms.' },
  { icon: '👨‍🍳', title: 'Award-Winning Chefs', desc: 'Our team brings decades of expertise from Michelin-starred kitchens worldwide.' },
  { icon: '🚀', title: '30-Min Delivery', desc: 'Lightning-fast delivery with real-time GPS tracking from kitchen to your door.' },
  { icon: '🔒', title: 'Secure & Safe', desc: 'Bank-level encryption for every transaction. Your data, always protected.' },
]

export default function ExperienceSection() {
  return (
    <section style={{ padding: '5rem 5vw', background: '#111', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '10px', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>Why Choose Us</p>
          <h2 style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, marginBottom: '12px', color: '#f5f0e8' }}>A Dining Experience Unlike Any Other</h2>
          <div style={{ width: '60px', height: '2px', background: 'linear-gradient(to right, #c9a84c, transparent)', marginBottom: '20px' }} />
          <p style={{ color: 'rgba(245,240,232,0.5)', lineHeight: 1.75, marginBottom: '2.5rem', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>From farm-fresh ingredients to impeccable service, every detail is curated to delight.</p>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px', color: '#f5f0e8', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>{f.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(245,240,232,0.45)', lineHeight: 1.6, fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ borderRadius: '24px', background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.1)', height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7rem', position: 'relative', overflow: 'hidden' }}>
          🍽️
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.06), transparent 70%)' }} />
        </motion.div>
      </div>
    </section>
  )
}
