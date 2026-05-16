// src/components/layout/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#111', borderTop: '1px solid rgba(201,168,76,0.1)', padding: '4rem 5vw 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif', color: '#c9a84c', fontSize: '1.4rem', marginBottom: '1rem' }}>Savoria</h3>
            <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.82rem', lineHeight: 1.7, fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>Premium dining experience and delivery. Crafting memories, one dish at a time.</p>
          </div>
          {[
            { title: 'Quick Links', links: [['/', 'Home'], ['/menu', 'Menu'], ['/reservation', 'Reservations'], ['/cart', 'Cart']] },
            { title: 'Company', links: [['/about', 'About Us'], ['/contact', 'Contact'], ['#', 'Careers'], ['#', 'Press']] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(245,240,232,0.3)', marginBottom: '1rem', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>{col.title}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map(([href, label]) => (
                  <Link key={label} href={href} style={{ fontSize: '0.85rem', color: 'rgba(245,240,232,0.5)', textDecoration: 'none', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif', transition: 'color 0.2s' }}>{label}</Link>
                ))}
              </div>
            </div>
          ))}
          <div>
            <h4 style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(245,240,232,0.3)', marginBottom: '1rem', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'rgba(245,240,232,0.5)', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>
              <span>📍 This Is only Sample Website Complete Dveloped By HAMZA</span>
              <span>📞 +92 349 4103037</span>
              <span>✉️ hamza.hcfounder@gmail.com</span>
              <span>🕐 Mon–Sun: 12 PM – 11 PM</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.78rem', color: 'rgba(245,240,232,0.3)', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>
          <span>© 2026 Savoria. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy', 'Terms', 'Sitemap'].map(l => <Link key={l} href="#" style={{ color: 'rgba(245,240,232,0.3)', textDecoration: 'none' }}>{l}</Link>)}
          </div>
        </div>
      </div>
    </footer>
  )
}
