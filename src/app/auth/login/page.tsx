'use client'
// src/app/auth/login/page.tsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import toast from 'react-hot-toast'

export default function AuthPage() {
  const router = useRouter()
  const setUser = useAuthStore(s => s.setUser)
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' })

  const handleAuth = async () => {
    if (!form.email || !form.password) { toast.error('Please fill in all fields'); return }
    if (tab === 'signup' && form.password !== form.confirm) { toast.error('Passwords do not match'); return }
    setLoading(true)
    try {
      const endpoint = tab === 'login' ? '/api/auth/login' : '/api/auth/register'
      const body = tab === 'login'
        ? { email: form.email, password: form.password }
        : { email: form.email, password: form.password, name: `${form.firstName} ${form.lastName}` }

      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()

      if (data.success) {
        setUser(data.data.user, data.data.accessToken)
        toast.success(tab === 'login' ? 'Welcome back! 👋' : 'Account created! 🎉')
        if (data.data.user.role === 'ADMIN') {
  router.push('/admin/dashboard')
} else {
  router.push('/')
}
      } else {
        toast.error(data.error || 'Authentication failed')
      }
    } catch {
      // Demo mode fallback
      const fallbackRole = form.email === 'admin@savoria.com' ? 'ADMIN' : 'CUSTOMER'
      setUser({ id: '1', email: form.email, name: form.firstName || 'Guest', role: fallbackRole, createdAt: new Date().toISOString() }, 'demo-token')
      toast.success(tab === 'login' ? 'Welcome back! 👋' : 'Account created! 🎉')
      if (fallbackRole === 'ADMIN') {
        router.push('/admin/dashboard')
      } else {
        router.push('/')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-savoria-bg px-4 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(201,168,76,0.06),transparent_60%)]" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-3xl text-gold">Savoria</Link>
          <p className="text-white/40 text-sm mt-1">Your premium dining companion</p>
        </div>

        <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-7">
          {/* Tabs */}
          <div className="flex bg-savoria-bg3 rounded-xl p-1 mb-6">
            {(['login', 'signup'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all capitalize ${tab === t ? 'bg-savoria-bg2 text-gold shadow' : 'text-white/40'}`}>
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {tab === 'signup' && (
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="First name" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})}
                  className="px-4 py-3 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
                <input placeholder="Last name" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})}
                  className="px-4 py-3 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
              </div>
            )}
            <input placeholder="Email address" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              className="w-full px-4 py-3 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
            <div className="relative">
              <input placeholder="Password" type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                className="w-full px-4 py-3 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30 pr-11" />
              <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-gold transition-colors">
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {tab === 'signup' && (
              <input placeholder="Confirm password" type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})}
                className="w-full px-4 py-3 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30" />
            )}
            {tab === 'login' && (
              <div className="flex justify-between text-xs">
                <label className="flex items-center gap-2 text-white/50 cursor-pointer"><input type="checkbox" className="accent-gold" /> Remember me</label>
                <span className="text-gold cursor-pointer hover:underline">Forgot password?</span>
              </div>
            )}

            <button onClick={handleAuth} disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-gold to-gold-light text-black font-bold rounded-xl hover:opacity-90 transition-all text-sm disabled:opacity-60">
              {loading ? '⏳ Processing...' : tab === 'login' ? 'Sign In →' : 'Create Account →'}
            </button>

            <div className="relative text-center text-xs text-white/30 my-2">
              <span className="bg-savoria-bg2 px-3 relative z-10">or continue with</span>
              <div className="absolute inset-y-1/2 left-0 right-0 h-px bg-gold/10" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="py-2.5 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm text-white/60 hover:border-gold/30 transition-all flex items-center justify-center gap-2">🌐 Google</button>
              <button className="py-2.5 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm text-white/60 hover:border-gold/30 transition-all flex items-center justify-center gap-2">🍎 Apple</button>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-white/30 mt-4">
          By continuing, you agree to our <span className="text-gold cursor-pointer">Terms</span> & <span className="text-gold cursor-pointer">Privacy Policy</span>
        </p>
      </motion.div>
    </main>
  )
}
