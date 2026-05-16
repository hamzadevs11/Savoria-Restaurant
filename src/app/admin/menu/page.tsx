'use client'
// src/app/admin/menu/page.tsx
import { useState } from 'react'
import { Plus, Pencil, Trash2, Search, X, Star } from 'lucide-react'
import toast from 'react-hot-toast'

type MenuItem = {
  id: string
  name: string
  cat: string
  price: number
  emoji: string
  active: boolean
  featured: boolean
  description?: string
}

const INITIAL_ITEMS: MenuItem[] = [
  { id: '1', name: 'Burrata & Heirloom', cat: 'Starters', price: 18, emoji: '🥗', active: true, featured: true, description: 'Fresh burrata with heirloom tomatoes and basil oil.' },
  { id: '2', name: 'Tuna Tartare', cat: 'Starters', price: 22, emoji: '🐟', active: true, featured: true, description: 'Hand-cut yellowfin tuna with avocado and sesame.' },
  { id: '3', name: 'Foie Gras Torchon', cat: 'Starters', price: 28, emoji: '🍞', active: true, featured: false, description: 'Classic torchon served with brioche and fig jam.' },
  { id: '4', name: 'Truffle Arancini', cat: 'Starters', price: 16, emoji: '🧀', active: true, featured: false, description: 'Crispy risotto balls with black truffle and parmesan.' },
  { id: '5', name: 'Wagyu Beef Tenderloin', cat: 'Mains', price: 68, emoji: '🥩', active: true, featured: true, description: 'A5 wagyu with bone marrow butter and roasted bone.' },
  { id: '6', name: 'Pan-Seared Halibut', cat: 'Mains', price: 48, emoji: '🐠', active: true, featured: true, description: 'Wild-caught halibut with saffron beurre blanc.' },
  { id: '7', name: 'Wild Mushroom Risotto', cat: 'Mains', price: 36, emoji: '🍄', active: true, featured: false, description: 'Seasonal mushroom medley with aged parmesan.' },
  { id: '8', name: 'Duck Confit', cat: 'Mains', price: 44, emoji: '🦆', active: true, featured: false, description: 'Slow-cooked duck leg with lentils and port jus.' },
  { id: '9', name: 'Château Margaux 2018', cat: 'Drinks', price: 95, emoji: '🍷', active: true, featured: false, description: 'Grand Cru Classé, full-bodied with dark fruit notes.' },
  { id: '10', name: 'Champagne Billecart', cat: 'Drinks', price: 65, emoji: '🥂', active: true, featured: false, description: 'Blanc de Blancs, crisp and elegant.' },
  { id: '11', name: 'Chocolate Soufflé', cat: 'Desserts', price: 22, emoji: '🍫', active: true, featured: true, description: 'Warm valrhona soufflé with vanilla crème anglaise.' },
  { id: '12', name: 'Crème Brûlée', cat: 'Desserts', price: 16, emoji: '🍮', active: true, featured: false, description: 'Classic vanilla custard with caramelized sugar crust.' },
]

const CATS = ['All', 'Starters', 'Mains', 'Drinks', 'Desserts']
const EMOJIS = ['🥗', '🐟', '🍞', '🧀', '🥩', '🐠', '🍄', '🦆', '🍷', '🥂', '🍫', '🍮', '🍲', '🥘', '🫕', '🍣', '🦞', '🍤', '🥞', '☕']

function EditModal({ item, onSave, onClose }: { item: MenuItem; onSave: (updated: MenuItem) => void; onClose: () => void }) {
  const [form, setForm] = useState<MenuItem>({ ...item })

  const set = (key: keyof MenuItem, val: string | number | boolean) =>
    setForm(f => ({ ...f, [key]: val }))

  const handleSave = () => {
    if (!form.name.trim()) { toast.error('Name required'); return }
    if (form.price <= 0) { toast.error('Price must be > 0'); return }
    onSave(form)
    toast.success(`${form.name} updated!`)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-savoria-bg2 border border-gold/20 rounded-2xl w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gold/10">
          <h2 className="font-semibold text-base">Edit Menu Item</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg border border-gold/15 flex items-center justify-center text-white/40 hover:text-gold transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">
          {/* Name */}
          <div>
            <label className="text-[11px] text-white/40 uppercase tracking-wider block mb-1.5">Item Name</label>
            <input
              value={form.name}
              onChange={e => set('name', e.target.value)}
              className="w-full px-4 py-2.5 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30"
              placeholder="Item name..."
            />
          </div>

          {/* Category + Price row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-white/40 uppercase tracking-wider block mb-1.5">Category</label>
              <select
                value={form.cat}
                onChange={e => set('cat', e.target.value)}
                className="w-full px-4 py-2.5 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white"
              >
                {['Starters', 'Mains', 'Drinks', 'Desserts'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-white/40 uppercase tracking-wider block mb-1.5">Price ($)</label>
              <input
                type="number"
                value={form.price}
                onChange={e => set('price', Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white"
                min={1}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-[11px] text-white/40 uppercase tracking-wider block mb-1.5">Description</label>
            <textarea
              value={form.description || ''}
              onChange={e => set('description', e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/40 text-white placeholder:text-white/30 resize-none"
              placeholder="Short description..."
            />
          </div>

          {/* Emoji picker */}
          <div>
            <label className="text-[11px] text-white/40 uppercase tracking-wider block mb-1.5">Icon</label>
            <div className="flex flex-wrap gap-2">
              {EMOJIS.map(e => (
                <button
                  key={e}
                  onClick={() => set('emoji', e)}
                  className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all ${form.emoji === e ? 'bg-gold/20 border-2 border-gold scale-110' : 'bg-savoria-bg3 border border-gold/10 hover:border-gold/30'}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex gap-4">
            {/* Featured */}
            <button
              onClick={() => set('featured', !form.featured)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs border transition-all ${form.featured ? 'bg-gold/15 border-gold text-gold' : 'border-gold/15 text-white/40 hover:border-gold/30'}`}
            >
              <Star size={12} fill={form.featured ? 'currentColor' : 'none'} /> Featured
            </button>

            {/* Active */}
            <button
              onClick={() => set('active', !form.active)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs border transition-all ${form.active ? 'bg-green-900/20 border-green-800/40 text-green-400' : 'border-gold/15 text-white/40 hover:border-gold/30'}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${form.active ? 'bg-green-400' : 'bg-white/30'}`} />
              {form.active ? 'Active' : 'Hidden'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gold/10 flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 border border-gold/15 text-white/50 rounded-xl text-sm hover:text-white hover:border-gold/30 transition-all">
            Cancel
          </button>
          <button onClick={handleSave} className="px-5 py-2 bg-gradient-to-r from-gold to-gold-light text-black font-semibold rounded-xl text-sm hover:opacity-90 transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminMenu() {
  const [items, setItems] = useState<MenuItem[]>(INITIAL_ITEMS)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

  const filtered = items.filter(i =>
    (catFilter === 'All' || i.cat === catFilter) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = (updated: MenuItem) => {
    setItems(prev => prev.map(i => i.id === updated.id ? updated : i))
    setEditingItem(null)
  }

  const handleDelete = (item: MenuItem) => {
    setItems(prev => prev.filter(i => i.id !== item.id))
    toast.success(`${item.name} deleted`)
  }

  return (
    <div>
      {/* Edit Modal */}
      {editingItem && (
        <EditModal
          item={editingItem}
          onSave={handleSave}
          onClose={() => setEditingItem(null)}
        />
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Menu Items</h1>
        <button onClick={() => toast.success('Add item modal would open here')} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold to-gold-light text-black font-semibold rounded-xl text-sm">
          <Plus size={14} /> Add Item
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            placeholder="Search items..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/30 text-white placeholder:text-white/30"
          />
        </div>
        <div className="flex gap-1.5">
          {CATS.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-all ${catFilter === c ? 'bg-gold text-black border-gold font-bold' : 'border-gold/15 text-white/50 hover:text-gold hover:border-gold/30'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-savoria-bg2 border border-gold/10 rounded-xl overflow-hidden hover:border-gold/20 transition-colors group">
            <div className="h-28 bg-savoria-bg3 flex items-center justify-center text-4xl relative">
              {item.emoji}
              {item.featured && (
                <span className="absolute top-2 left-2 bg-gold text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">FEATURED</span>
              )}
              {!item.active && (
                <span className="absolute top-2 right-2 bg-white/10 text-white/40 text-[9px] font-bold px-1.5 py-0.5 rounded-full">HIDDEN</span>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-xs mb-0.5 truncate group-hover:text-gold transition-colors">{item.name}</h3>
              <p className="text-gold text-xs font-bold mb-2">
                ${item.price} <span className="text-white/30 font-normal">· {item.cat}</span>
              </p>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setEditingItem(item)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-gold/20 text-white/50 rounded-lg text-[10px] hover:text-gold hover:border-gold/40 transition-all"
                >
                  <Pencil size={9} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-red-800/30 text-red-400/60 rounded-lg text-[10px] hover:text-red-400 hover:border-red-800/50 transition-all"
                >
                  <Trash2 size={9} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}