'use client'
// src/app/cart/page.tsx
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, Tag } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useCartStore } from '@/store/useCartStore'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, promoCode, promoDiscount, applyPromo, removePromo } = useCartStore()
  const [promoInput, setPromoInput] = useState('')
  const subtotal = getSubtotal()
  const delivery = 3.99
  const tax = subtotal * 0.08
  const discount = subtotal * (promoDiscount / 100)
  const total = subtotal + delivery + tax - discount

  const handlePromo = async () => {
    const PROMOS: Record<string, number> = { SAVORIA20: 20, WELCOME10: 10 }
    const code = promoInput.toUpperCase().trim()
    if (PROMOS[code]) {
      applyPromo(code, PROMOS[code])
      toast.success(`${PROMOS[code]}% discount applied!`)
    } else {
      toast.error('Invalid promo code')
    }
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-16 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <ShoppingBag size={64} className="text-white/20 mx-auto mb-6" />
            <h2 className="font-display text-3xl mb-3">Your cart is empty</h2>
            <p className="text-white/50 mb-8">Add some delicious items from our menu</p>
            <Link href="/menu" className="px-8 py-3 bg-gradient-to-r from-gold to-gold-light text-black font-semibold rounded-xl hover:opacity-90 transition-all">Browse Menu</Link>
          </motion.div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display text-4xl font-bold mb-8">Your <em className="text-gold not-italic">Cart</em></h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-4 flex gap-4 items-center"
                  >
                    <div className="w-16 h-16 rounded-xl bg-savoria-bg3 flex items-center justify-center text-3xl flex-shrink-0">{item.menuItem.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1 truncate">{item.menuItem.name}</h3>
                      <p className="text-gold text-xs">{formatCurrency(item.menuItem.price)} each</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-lg border border-gold/20 bg-savoria-bg3 flex items-center justify-center hover:border-gold/50 transition-colors"><Minus size={12} /></button>
                        <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-lg border border-gold/20 bg-savoria-bg3 flex items-center justify-center hover:border-gold/50 transition-colors"><Plus size={12} /></button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-bold text-gold">{formatCurrency(item.menuItem.price * item.quantity)}</span>
                      <button onClick={() => { removeItem(item.id); toast.success('Removed from cart') }} className="text-white/30 hover:text-red-400 transition-colors p-1"><Trash2 size={14} /></button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-6 h-fit sticky top-24">
              <h3 className="font-semibold mb-5 pb-4 border-b border-gold/10">Order Summary</h3>
              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between text-white/60"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between text-white/60"><span>Delivery</span><span>{formatCurrency(delivery)}</span></div>
                <div className="flex justify-between text-white/60"><span>Tax (8%)</span><span>{formatCurrency(tax)}</span></div>
                {promoCode && <div className="flex justify-between text-green-400"><span>Discount ({promoDiscount}%)</span><span>-{formatCurrency(discount)}</span></div>}
              </div>

              {/* Promo */}
              {!promoCode ? (
                <div className="flex gap-2 mb-5">
                  <div className="flex-1 relative">
                    <Tag size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input value={promoInput} onChange={(e) => setPromoInput(e.target.value)} placeholder="Promo code" className="w-full pl-8 pr-3 py-2 bg-savoria-bg3 border border-gold/15 rounded-lg text-xs focus:outline-none focus:border-gold/40 text-white" onKeyDown={(e) => e.key === 'Enter' && handlePromo()} />
                  </div>
                  <button onClick={handlePromo} className="px-3 py-2 bg-savoria-bg3 border border-gold/20 text-gold rounded-lg text-xs hover:bg-gold/10 transition-all">Apply</button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-900/15 border border-green-800/30 rounded-lg px-3 py-2 mb-5">
                  <span className="text-green-400 text-xs font-semibold">{promoCode} applied ✓</span>
                  <button onClick={removePromo} className="text-white/40 text-xs hover:text-white">Remove</button>
                </div>
              )}

              <div className="flex justify-between font-bold text-gold border-t border-gold/10 pt-4 mb-5">
                <span>Total</span><span>{formatCurrency(total)}</span>
              </div>
              <Link href="/checkout" className="block w-full text-center py-3 bg-gradient-to-r from-gold to-gold-light text-black font-bold rounded-xl hover:opacity-90 transition-all text-sm">Proceed to Checkout →</Link>
              <Link href="/menu" className="block w-full text-center py-2.5 mt-2 border border-gold/20 text-gold rounded-xl hover:bg-gold/5 transition-all text-sm">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
