'use client'
// src/app/contact/page.tsx
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { toast.error('Please fill all required fields'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    toast.success('Message sent! We\'ll get back to you within 24 hours.')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="bg-savoria-bg2 border-b border-gold/10 px-4 py-16">
          <p className="text-xs tracking-widest uppercase text-gold mb-3">Get In Touch</p>
          <h1 className="font-display text-5xl font-bold">Contact <em className="text-gold not-italic">Us</em></h1>
          <p className="text-white/50 mt-2">We'd love to hear from you</p>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-semibold text-lg mb-8">Contact Information</h2>
            <div className="space-y-6 mb-10">
              {[
                { icon: '📍', label: 'Address', val: 'This Is only Sample Website Complete Dveloped By HAMZA' },
                { icon: '📞', label: 'Phone', val: '+92 349 4103037' },
                { icon: '✉️', label: 'Email', val: 'hamza.hcfounder@gmail.com' },
                { icon: '🕐', label: 'Hours', val: 'Mon–Sun: 12:00 PM – 11:00 PM' },
              ].map(item => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl overflow-hidden h-44 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-10" style={{backgroundImage:'linear-gradient(#c9a84c 1px,transparent 1px),linear-gradient(90deg,#c9a84c 1px,transparent 1px)',backgroundSize:'28px 28px'}} />
              <div className="text-center relative z-10">
                <div className="text-3xl mb-2">🗺️</div>
                <p className="text-xs text-white/40">Find us on Google Maps</p>
              </div>
            </div>
          </div>

          <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-6">
            <h3 className="font-semibold mb-5">Send a Message</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Your name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="px-4 py-3 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
                <input placeholder="Email *" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="px-4 py-3 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
              </div>
              <input placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                className="w-full px-4 py-3 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
              <textarea rows={5} placeholder="Your message *" value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                className="w-full px-4 py-3 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30 resize-none" />
              <button onClick={handleSubmit} disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-gold to-gold-light text-black font-bold rounded-xl hover:opacity-90 transition-all text-sm disabled:opacity-60">
                {loading ? '⏳ Sending...' : 'Send Message →'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
