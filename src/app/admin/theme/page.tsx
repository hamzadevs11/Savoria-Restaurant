'use client'
// src/app/admin/theme/page.tsx
import { useState } from 'react'
import toast from 'react-hot-toast'

const FONTS = ['Playfair Display', 'Cormorant Garamond', 'DM Serif Display', 'Libre Baskerville']
const BODY_FONTS = ['DM Sans', 'Outfit', 'Nunito', 'Inter']
const BG_COLORS = ['#0a0a0a', '#0f0f0f', '#1a0a00', '#000814', '#08000f']
const ACCENT_COLORS = ['#c9a84c', '#d4af37', '#b8966e', '#e8c17a', '#a0753a']

export default function AdminTheme() {
  const [accentColor, setAccentColor] = useState('#c9a84c')
  const [bgColor, setBgColor] = useState('#0a0a0a')
  const [font, setFont] = useState('Playfair Display')
  const [bodyFont, setBodyFont] = useState('DM Sans')
  const [sections, setSections] = useState({ hero: true, featured: true, experience: true, testimonials: true, cta: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Theme Customization</h1>
        <button onClick={() => toast.success('Theme settings saved!')} className="px-5 py-2 bg-gradient-to-r from-gold to-gold-light text-black font-semibold rounded-xl text-sm">
          💾 Save Theme
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Colors */}
        <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-4 text-white/60 uppercase tracking-wider text-xs">Colors</h3>
          <div className="space-y-5">
            <div>
              <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Accent / Primary Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)}
                  className="w-12 h-12 rounded-xl border border-gold/20 cursor-pointer bg-transparent" />
                <div className="flex gap-2">
                  {ACCENT_COLORS.map(c => (
                    <button key={c} onClick={() => setAccentColor(c)} className="w-7 h-7 rounded-lg border-2 transition-all hover:scale-110"
                      style={{ background: c, borderColor: accentColor === c ? '#fff' : 'transparent' }} />
                  ))}
                </div>
                <span className="text-xs text-white/40 font-mono">{accentColor}</span>
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Background Color</label>
              <div className="flex gap-2">
                {BG_COLORS.map(c => (
                  <button key={c} onClick={() => setBgColor(c)} className="w-10 h-10 rounded-xl border-2 transition-all hover:scale-110 flex items-center justify-center text-[9px] text-white/40"
                    style={{ background: c, borderColor: bgColor === c ? '#c9a84c' : 'rgba(201,168,76,0.15)' }}>
                    {bgColor === c && '✓'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-4 text-white/60 uppercase tracking-wider text-xs">Typography</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Display / Heading Font</label>
              <select value={font} onChange={e => setFont(e.target.value)}
                className="w-full px-4 py-2.5 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white">
                {FONTS.map(f => <option key={f}>{f}</option>)}
              </select>
              <p className="mt-2 text-lg" style={{ fontFamily: font }}>The Quick Brown Fox</p>
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Body Font</label>
              <select value={bodyFont} onChange={e => setBodyFont(e.target.value)}
                className="w-full px-4 py-2.5 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white">
                {BODY_FONTS.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Section Visibility */}
        <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-4 text-white/60 uppercase tracking-wider text-xs">Homepage Sections</h3>
          <div className="space-y-1">
            {Object.entries(sections).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between py-2.5 border-b border-gold/8 last:border-0">
                <span className="text-sm capitalize">{key === 'cta' ? 'CTA Banner' : key} Section</span>
                <button onClick={() => setSections(s => ({ ...s, [key]: !val }))}
                  className={`w-10 h-5.5 rounded-full transition-all relative ${val ? 'bg-gold' : 'bg-savoria-bg3 border border-gold/20'}`}
                  style={{ height: '22px', width: '40px' }}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${val ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-4 text-white/60 uppercase tracking-wider text-xs">Live Preview</h3>
          <div className="rounded-xl overflow-hidden border border-gold/10" style={{ background: bgColor }}>
            <div className="p-6">
              <div className="h-2 w-16 rounded mb-3" style={{ background: accentColor }} />
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: font, color: accentColor }}>Savoria</h2>
              <p className="text-white/50 text-sm mb-4" style={{ fontFamily: bodyFont }}>Premium dining experience</p>
              <button className="px-5 py-2 rounded-lg text-black text-sm font-semibold" style={{ background: accentColor }}>Order Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
