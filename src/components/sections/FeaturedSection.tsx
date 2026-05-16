'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCartStore } from '@/store/useCartStore'
import toast from 'react-hot-toast'

const featured = [
  { id: '5', name: 'Wagyu Beef Tenderloin', desc: 'A5 Wagyu with red wine jus, bone marrow butter & seasonal vegetables', price: 68, emoji: '🥩', badge: "Chef's Pick" },
  { id: '6', name: 'Pan-Seared Halibut', desc: 'Line-caught halibut, saffron beurre blanc, charred leek & samphire', price: 48, emoji: '🐠', badge: 'Popular' },
  { id: '1', name: 'Burrata & Heirloom', desc: 'Creamy burrata with heirloom tomatoes, basil oil & sea salt flakes', price: 18, emoji: '🥗', badge: 'Veg' },
  { id: '14', name: 'Chocolate Soufflé', desc: '72% Valrhona dark chocolate, Tahitian vanilla crème anglaise', price: 22, emoji: '🍫', badge: 'Signature' },
]

export default function FeaturedSection() {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <section style={{ padding: '5rem 5vw', maxWidth: '1280px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '10px', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>Chef's Selection</p>
        <h2 style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, marginBottom: '12px', color: '#f5f0e8' }}>Featured Dishes</h2>
        <div style={{ width: '60px', height: '2px', background: 'linear-gradient(to right, #c9a84c, transparent)', marginBottom: '14px' }} />
        <p style={{ color: 'rgba(245,240,232,0.5)', fontSize: '1rem', maxWidth: '480px', lineHeight: 1.7, fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>Handpicked by our Executive Chef — where tradition meets innovation.</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
        {featured.map((item, i) => (
          <motion.div key={item.id}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            style={{ background: '#111', border: '1px solid rgba(201,168,76,0.12)', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer' }}
          >
            <div style={{ height: '200px', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', position: 'relative' }}>
              {item.emoji}
              <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#c9a84c', color: '#1a1200', fontSize: '0.65rem', fontWeight: 700, padding: '3px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>
                {item.badge}
              </span>
            </div>
            <div style={{ padding: '1.2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', fontWeight: 600, fontSize: '1rem', marginBottom: '6px', color: '#f5f0e8' }}>{item.name}</h3>
              <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '1rem', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>{item.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif', fontSize: '1.2rem', fontWeight: 700, color: '#c9a84c' }}>${item.price}</span>
                <button
                  onClick={() => { addItem({ id: item.id, name: item.name, description: item.desc, price: item.price, emoji: item.emoji, slug: item.name, categoryId: '', isActive: true, isFeatured: true, isVegetarian: false, isSpicy: false, isGlutenFree: false, allergens: [], prepTime: 15, sortOrder: 0, createdAt: '' }); toast.success(`${item.name} added to cart`) }}
                  style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#c9a84c', border: 'none', cursor: 'pointer', color: '#1a1200', fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                >
                  +
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link href="/menu" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '12px 32px', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', borderRadius: '12px', textDecoration: 'none', fontSize: '0.88rem', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', transition: 'background 0.2s' }}>
          View Full Menu →
        </Link>
      </div>
    </section>
  )
}
