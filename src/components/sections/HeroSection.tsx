'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false })

const stats = [
  { value: '4.9', label: 'Avg Rating' },
  { value: '12K+', label: 'Happy Guests' },
  { value: '85+', label: 'Menu Items' },
  { value: '3', label: 'Michelin Stars' },
]

export default function HeroSection() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: '#0a0a0a',
    }}>
      {/* Radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.05) 0%, transparent 50%)', pointerEvents: 'none' }} />

      {/* 3D Canvas */}
      <HeroScene />

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '80px 5vw 80px',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '4rem',
        alignItems: 'center',
        width: '100%',
      }}>
        {/* Left - text */}
        <div style={{ maxWidth: '620px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: '100px',
              border: '1px solid rgba(201,168,76,0.3)',
              background: 'rgba(201,168,76,0.05)',
              color: '#c9a84c',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            ✦ Award-winning restaurant since 2012
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif',
              fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              marginBottom: '1.2rem',
              color: '#f5f0e8',
            }}
          >
            Where Every Dish{' '}
            <em style={{ color: '#c9a84c', fontStyle: 'italic' }}>Tells a Story</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              color: 'rgba(245,240,232,0.55)',
              fontSize: '1.05rem',
              lineHeight: 1.75,
              marginBottom: '2.5rem',
              maxWidth: '480px',
              fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
            }}
          >
            Experience culinary artistry at its finest. Fresh ingredients, bold flavors, and an atmosphere that transforms dining into a memory.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <Link href="/menu" style={{
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #c9a84c, #e8c87a)',
              color: '#1a1200',
              fontWeight: 700,
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
              display: 'inline-block',
              transition: 'opacity 0.2s, transform 0.2s',
            }}>
              Explore Menu
            </Link>
            <Link href="/reservation" style={{
              padding: '14px 32px',
              border: '1px solid rgba(201,168,76,0.4)',
              color: '#c9a84c',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
              display: 'inline-block',
              transition: 'background 0.2s',
            }}>
              Book a Table
            </Link>
          </motion.div>
        </div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', minWidth: '280px' }}
          className="hidden lg:grid"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(201,168,76,0.15)',
                borderRadius: '16px',
                padding: '24px 20px',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#c9a84c',
                marginBottom: '4px',
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(245,240,232,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'rgba(245,240,232,0.25)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #c9a84c, transparent)' }} />
        Scroll
      </motion.div>
    </section>
  )
}
