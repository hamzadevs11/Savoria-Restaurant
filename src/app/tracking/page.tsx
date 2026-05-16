'use client'
// src/app/tracking/page.tsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, ChefHat, Truck } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Link from 'next/link'

const STEPS = [
  { label: 'Confirmed', icon: <CheckCircle2 size={16} />, desc: 'Order received' },
  { label: 'Preparing', icon: <ChefHat size={16} />, desc: 'Chef is cooking' },
  { label: 'Ready', icon: <Clock size={16} />, desc: 'Ready for delivery' },
  { label: 'Delivered', icon: <Truck size={16} />, desc: 'On the way!' },
]

export default function TrackingPage() {
  const [activeStep, setActiveStep] = useState(1)

  // Simulate order progress
  useEffect(() => {
    const timers = [
      setTimeout(() => setActiveStep(2), 8000),
      setTimeout(() => setActiveStep(3), 20000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-savoria-bg">
        <div className="max-w-xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-4xl font-bold mb-8">Order <em className="text-gold not-italic">Tracking</em></h1>

            <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-6 mb-5">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Order ID</p>
              <p className="font-display text-2xl text-gold font-bold">#SAV-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
              <div className="mt-4 flex items-center gap-2 bg-green-900/15 border border-green-800/25 rounded-full px-4 py-2 w-fit">
                <Clock size={14} className="text-green-400" />
                <span className="text-green-400 text-sm font-semibold">Estimated arrival: 25–30 minutes</span>
              </div>

              {/* Steps */}
              <div className="flex items-center mt-8 relative">
                {STEPS.map((step, i) => (
                  <div key={step.label} className="flex-1 flex flex-col items-center relative">
                    {/* Connector line */}
                    {i < STEPS.length - 1 && (
                      <div className="absolute top-4 left-1/2 right-0 h-0.5 z-0">
                        <div className="h-full bg-savoria-bg3 w-full" />
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-green-500"
                          initial={{ width: 0 }}
                          animate={{ width: i < activeStep ? '100%' : '0%' }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </div>
                    )}
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm z-10 border-2 transition-colors duration-500 ${
                        i < activeStep ? 'bg-green-600 border-green-600 text-white' :
                        i === activeStep ? 'bg-gold border-gold text-black shadow-[0_0_16px_rgba(201,168,76,0.4)]' :
                        'bg-savoria-bg3 border-gold/20 text-white/30'
                      }`}
                    >
                      {i < activeStep ? '✓' : step.icon}
                    </motion.div>
                    <span className={`text-[10px] mt-2 text-center leading-tight ${i === activeStep ? 'text-gold font-semibold' : 'text-white/40'}`}>{step.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-savoria-bg3 rounded-xl p-4 text-sm text-white/60">
                <span className="text-white font-semibold">🧑‍🍳 Chef Marco</span> is preparing your order with extra care.
              </div>
            </div>

            {/* Order items */}
            <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-5 mb-5">
              <h3 className="font-semibold text-sm mb-4 pb-3 border-b border-gold/10">Items Ordered</h3>
              <div className="space-y-3 text-sm text-white/60">
                <div className="flex justify-between"><span>🥩 Wagyu Beef Tenderloin ×1</span><span className="text-gold">$68.00</span></div>
                <div className="flex justify-between"><span>🍄 Wild Mushroom Risotto ×1</span><span className="text-gold">$36.00</span></div>
                <div className="flex justify-between"><span>🍫 Chocolate Soufflé ×2</span><span className="text-gold">$44.00</span></div>
                <div className="flex justify-between border-t border-gold/10 pt-3 font-bold text-gold">
                  <span>Total Paid</span><span>$151.99</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link href="/menu" className="flex-1 text-center py-3 border border-gold/20 text-gold rounded-xl hover:bg-gold/5 transition-all text-sm">Order Again</Link>
              <Link href="/" className="flex-1 text-center py-3 bg-savoria-bg3 text-white/60 rounded-xl hover:bg-savoria-bg2 transition-all text-sm">Back to Home</Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
