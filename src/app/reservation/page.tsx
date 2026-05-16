'use client'
// src/app/reservation/page.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, MapPin } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import toast from 'react-hot-toast'

const TIME_SLOTS = ['12:00','12:30','13:00','13:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30']
const UNAVAILABLE = ['13:00','19:30','20:00']

export default function ReservationPage() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState(2)
  const [occasion, setOccasion] = useState('')
  const [notes, setNotes] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!date || !time) { toast.error('Please select date and time'); return }
    if (!form.name || !form.email) { toast.error('Please enter your contact info'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    toast.success(`Reservation confirmed! ${guests} guests at ${time} on ${date}. Check your email!`)
  }

  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="bg-savoria-bg2 border-b border-gold/10 px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs tracking-widest uppercase text-gold mb-3">Dine With Us</p>
            <h1 className="font-display text-5xl font-bold mb-3">Reserve a <em className="text-gold not-italic">Table</em></h1>
            <p className="text-white/50">Secure your spot for an unforgettable evening</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-6 mb-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 flex items-center gap-1.5 mb-2"><Calendar size={11} /> Date</label>
                <input type="date" min={minDate} value={date} onChange={e => setDate(e.target.value)}
                  className="w-full px-4 py-3 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 flex items-center gap-1.5 mb-2"><Users size={11} /> Guests</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 rounded-xl border border-gold/20 bg-savoria-bg3 flex items-center justify-center hover:border-gold/50 transition-colors font-bold">−</button>
                  <span className="text-xl font-bold text-gold w-8 text-center">{guests}</span>
                  <button onClick={() => setGuests(Math.min(12, guests + 1))} className="w-10 h-10 rounded-xl border border-gold/20 bg-savoria-bg3 flex items-center justify-center hover:border-gold/50 transition-colors font-bold">+</button>
                  <span className="text-sm text-white/40">guests</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs uppercase tracking-widest text-white/40 flex items-center gap-1.5 mb-3"><Clock size={11} /> Select Time</label>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map(slot => (
                  <button key={slot} disabled={UNAVAILABLE.includes(slot)}
                    onClick={() => setTime(slot)}
                    className={`py-2.5 rounded-xl text-sm border transition-all ${
                      UNAVAILABLE.includes(slot) ? 'opacity-30 cursor-not-allowed border-gold/10 text-white/30' :
                      time === slot ? 'border-gold bg-gold/10 text-gold font-semibold' :
                      'border-gold/15 text-white/60 hover:border-gold/35 hover:text-gold'
                    }`}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Occasion (Optional)</label>
              <select value={occasion} onChange={e => setOccasion(e.target.value)}
                className="w-full px-4 py-3 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white">
                <option value="">Select occasion...</option>
                {['Birthday','Anniversary','Business Dinner','Date Night','Family Celebration','Other'].map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div className="mb-6">
              <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Special Requests</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                placeholder="Allergies, seating preferences, special arrangements..."
                className="w-full px-4 py-3 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30 resize-none" />
            </div>

            <div className="mb-6">
              <label className="text-xs uppercase tracking-widest text-white/40 mb-3 block">Contact Information</label>
              <div className="space-y-3">
                <input placeholder="Your full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full px-4 py-3 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Email address" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="px-4 py-3 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
                  <input placeholder="Phone number" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    className="px-4 py-3 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
                </div>
              </div>
            </div>

            <button onClick={handleSubmit} disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-gold to-gold-light text-black font-bold rounded-xl hover:opacity-90 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? '⏳ Confirming...' : '✓ Confirm Reservation'}
            </button>
          </motion.div>

          <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl overflow-hidden">
            <div className="h-40 bg-savoria-bg3 relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-10" style={{backgroundImage:'linear-gradient(var(--tw-ring-color, #c9a84c) 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)', backgroundSize:'30px 30px'}} />
              <div className="text-center relative z-10">
                <div className="text-4xl mb-2">📍</div>
                <p className="font-semibold text-sm">12 Gourmet Lane, New York, NY 10001</p>
                <p className="text-xs text-white/40 mt-1">Open daily · 12:00 PM – 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
