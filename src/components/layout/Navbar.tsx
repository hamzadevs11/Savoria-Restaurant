'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/useCartStore'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/reservation', label: 'Reservations' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const itemCount = useCartStore((s) => s.getItemCount())

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        justifyContent: 'space-between',
        transition: 'background 0.3s',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{
        fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif',
        fontSize: '1.5rem',
        color: '#c9a84c',
        letterSpacing: '0.04em',
        textDecoration: 'none',
        fontWeight: 600,
      }}>
        Savoria
      </Link>

      {/* Desktop Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden md:flex">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} style={{
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '0.875rem',
            color: pathname === link.href ? '#c9a84c' : 'rgba(245,240,232,0.6)',
            background: pathname === link.href ? 'rgba(201,168,76,0.1)' : 'transparent',
            textDecoration: 'none',
            transition: 'all 0.2s',
            fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
          }}>
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Cart */}
        <Link href="/cart" style={{
          position: 'relative',
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          border: '1px solid rgba(201,168,76,0.2)',
          background: 'rgba(255,255,255,0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(245,240,232,0.6)',
          textDecoration: 'none',
        }}>
          <ShoppingCart size={15} />
          {itemCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#c94040',
              color: '#fff',
              borderRadius: '50%',
              width: '16px',
              height: '16px',
              fontSize: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
            }}>
              {itemCount}
            </span>
          )}
        </Link>

        {/* Sign In */}
        <Link href="/auth/login" style={{
          padding: '6px 16px',
          borderRadius: '8px',
          border: '1px solid rgba(201,168,76,0.35)',
          color: '#c9a84c',
          fontSize: '0.85rem',
          textDecoration: 'none',
          fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
          display: 'none',
        }} className="hidden sm:block">
          Sign In
        </Link>

        {/* Admin */}
        <Link href="/admin" style={{
          padding: '6px 16px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #c9a84c, #e8c87a)',
          color: '#1a1200',
          fontSize: '0.85rem',
          fontWeight: 600,
          textDecoration: 'none',
          fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
        }} className="hidden sm:block">
          Admin
        </Link>

        {/* Mobile menu */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: '1px solid rgba(201,168,76,0.2)',
            background: 'rgba(255,255,255,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(245,240,232,0.6)',
            cursor: 'pointer',
          }}
          className="md:hidden"
        >
          {mobileOpen ? <X size={15} /> : <Menu size={15} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              background: 'rgba(10,10,10,0.97)',
              borderBottom: '1px solid rgba(201,168,76,0.1)',
              padding: '12px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: pathname === link.href ? '#c9a84c' : 'rgba(245,240,232,0.6)',
                background: pathname === link.href ? 'rgba(201,168,76,0.08)' : 'transparent',
                textDecoration: 'none',
                fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
              }}>
                {link.label}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
              <Link href="/auth/login" style={{ flex: 1, textAlign: 'center', padding: '8px', fontSize: '0.85rem', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>Sign In</Link>
              <Link href="/admin" style={{ flex: 1, textAlign: 'center', padding: '8px', fontSize: '0.85rem', background: 'linear-gradient(135deg,#c9a84c,#e8c87a)', color: '#1a1200', fontWeight: 600, borderRadius: '8px', textDecoration: 'none', fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}>Admin</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
