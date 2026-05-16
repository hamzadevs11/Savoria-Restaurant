'use client'
// src/app/checkout/page.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, MapPin, CreditCard } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import { useCartStore } from '@/store/useCartStore'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getSubtotal, promoDiscount, clearCart } = useCartStore()
  const [deliveryMethod, setDeliveryMethod] = useState<'DELIVERY' | 'PICKUP'>('DELIVERY')
  const [payMethod, setPayMethod] = useState('CARD')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', street: '', city: '', zip: '', cardNumber: '', expiry: '', cvv: '', cardholder: '' })

  const subtotal = getSubtotal()
  const delivery = deliveryMethod === 'DELIVERY' ? 3.99 : 0
  const tax = subtotal * 0.08
  const discount = subtotal * (promoDiscount / 100)
  const total = subtotal + delivery + tax - discount

  const placeOrder = async () => {
    if (!form.firstName) { toast.error('Please fill in your details'); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    clearCart()
    toast.success('Order placed successfully! 🎉')
    router.push('/tracking')
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-display text-4xl font-bold mb-8">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-5">
              {/* Delivery Method */}
              <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-5">
                <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4">Delivery Method</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[{ id: 'DELIVERY', label: 'Delivery', sub: '~25-35 min · $3.99', icon: '🚚' }, { id: 'PICKUP', label: 'Pickup', sub: '~15 min · Free', icon: '🏪' }].map((m) => (
                    <button key={m.id} onClick={() => setDeliveryMethod(m.id as 'DELIVERY' | 'PICKUP')}
                      className={`flex gap-3 items-start p-4 rounded-xl border-2 text-left transition-all ${deliveryMethod === m.id ? 'border-gold bg-gold/5' : 'border-gold/15 hover:border-gold/30'}`}>
                      <span className="text-2xl">{m.icon}</span>
                      <div><div className="font-semibold text-sm">{m.label}</div><div className="text-xs text-white/40">{m.sub}</div></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Address */}
              {deliveryMethod === 'DELIVERY' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-5">
                  <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2"><MapPin size={12} /> Delivery Address</h3>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input placeholder="First name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="col-span-1 px-4 py-2.5 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
                    <input placeholder="Last name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="col-span-1 px-4 py-2.5 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
                  </div>
                  <input placeholder="Street address" value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} className="w-full px-4 py-2.5 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm mb-3 focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="px-4 py-2.5 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
                    <input placeholder="ZIP code" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className="px-4 py-2.5 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
                  </div>
                </motion.div>
              )}

              {/* Payment */}
              <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-5">
                <h3 className="text-xs uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2"><CreditCard size={12} /> Payment</h3>
                <div className="flex gap-2 mb-4">
                  {['💳 Card', '📱 Apple Pay', '🏦 Cash'].map((m) => (
                    <button key={m} onClick={() => setPayMethod(m.split(' ')[1])}
                      className={`flex-1 py-2 rounded-xl text-sm border-2 transition-all ${payMethod === m.split(' ')[1] ? 'border-gold text-gold bg-gold/5' : 'border-gold/15 text-white/50'}`}>
                      {m}
                    </button>
                  ))}
                </div>
                {payMethod === 'Card' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input placeholder="4242 4242 4242 4242" value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })} className="col-span-2 px-4 py-2.5 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input placeholder="MM/YY" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} className="px-4 py-2.5 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
                      <input placeholder="CVV" type="password" value={form.cvv} onChange={(e) => setForm({ ...form, cvv: e.target.value })} className="px-4 py-2.5 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
                    </div>
                  </div>
                )}
              </div>

              <button onClick={placeOrder} disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-gold to-gold-light text-black font-bold rounded-xl hover:opacity-90 transition-all text-base flex items-center justify-center gap-2 disabled:opacity-60">
                {loading ? <span className="animate-spin">⏳</span> : <><Lock size={16} /> Place Order — Pay {formatCurrency(total)}</>}
              </button>
              <p className="text-center text-xs text-white/30 flex items-center justify-center gap-1"><Lock size={10} /> Secured by 256-bit SSL encryption</p>
            </div>

            {/* Summary sidebar */}
            <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-5 h-fit sticky top-24">
              <h3 className="font-semibold mb-4 pb-3 border-b border-gold/10 text-sm">Order ({items.length} items)</h3>
              <div className="space-y-2 mb-4">
                {items.map((i) => (
                  <div key={i.id} className="flex justify-between text-xs text-white/60">
                    <span className="truncate">{i.menuItem.emoji} {i.menuItem.name} ×{i.quantity}</span>
                    <span className="flex-shrink-0 ml-2">{formatCurrency(i.menuItem.price * i.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm border-t border-gold/10 pt-3 mb-3">
                <div className="flex justify-between text-white/60"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between text-white/60"><span>Delivery</span><span>{formatCurrency(delivery)}</span></div>
                <div className="flex justify-between text-white/60"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
                {promoDiscount > 0 && <div className="flex justify-between text-green-400"><span>Discount</span><span>-{formatCurrency(discount)}</span></div>}
              </div>
              <div className="flex justify-between font-bold text-gold border-t border-gold/10 pt-3">
                <span>Total</span><span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
