'use client'
// src/app/menu/page.tsx
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Plus, Leaf, Flame } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useCartStore } from '@/store/useCartStore'
import toast from 'react-hot-toast'
import type { MenuItem } from '@/types'

const MENU_DATA: MenuItem[] = [
  { id: '1', name: 'Burrata & Heirloom', slug: 'burrata', description: 'Creamy burrata with heirloom tomatoes, basil oil & sea salt flakes', price: 18, emoji: '🥗', categoryId: 'starters', isVegetarian: true, isSpicy: false, isGlutenFree: false, isActive: true, isFeatured: true, allergens: ['dairy'], prepTime: 10, calories: 320, sortOrder: 1, createdAt: '' },
  { id: '2', name: 'Tuna Tartare', slug: 'tuna-tartare', description: 'Sashimi-grade tuna with avocado, yuzu ponzu & crispy wontons', price: 22, emoji: '🐟', categoryId: 'starters', isVegetarian: false, isSpicy: true, isGlutenFree: false, isActive: true, isFeatured: true, allergens: ['fish', 'gluten'], prepTime: 12, calories: 280, sortOrder: 2, createdAt: '' },
  { id: '3', name: 'Foie Gras Torchon', slug: 'foie-gras', description: 'House-cured foie gras with brioche, pickled cherries & Sauternes gel', price: 28, emoji: '🍞', categoryId: 'starters', isVegetarian: false, isSpicy: false, isGlutenFree: false, isActive: true, isFeatured: false, allergens: ['gluten', 'dairy'], prepTime: 8, calories: 510, sortOrder: 3, createdAt: '' },
  { id: '4', name: 'Truffle Arancini', slug: 'truffle-arancini', description: 'Black truffle risotto balls, parmesan crisp, lemon aioli', price: 16, emoji: '🧀', categoryId: 'starters', isVegetarian: true, isSpicy: false, isGlutenFree: false, isActive: true, isFeatured: false, allergens: ['dairy', 'gluten', 'eggs'], prepTime: 15, calories: 390, sortOrder: 4, createdAt: '' },
  { id: '5', name: 'Wagyu Beef Tenderloin', slug: 'wagyu', description: 'A5 Wagyu with red wine jus, bone marrow butter & seasonal vegetables', price: 68, emoji: '🥩', categoryId: 'mains', isVegetarian: false, isSpicy: false, isGlutenFree: true, isActive: true, isFeatured: true, allergens: [], prepTime: 25, calories: 720, sortOrder: 1, createdAt: '' },
  { id: '6', name: 'Pan-Seared Halibut', slug: 'halibut', description: 'Line-caught halibut, saffron beurre blanc, charred leek & samphire', price: 48, emoji: '🐠', categoryId: 'mains', isVegetarian: false, isSpicy: false, isGlutenFree: true, isActive: true, isFeatured: true, allergens: ['fish', 'dairy'], prepTime: 20, calories: 480, sortOrder: 2, createdAt: '' },
  { id: '7', name: 'Wild Mushroom Risotto', slug: 'mushroom-risotto', description: 'Aged carnaroli rice, porcini & chanterelles, white truffle oil, 36-month Parmigiano', price: 36, emoji: '🍄', categoryId: 'mains', isVegetarian: true, isSpicy: false, isGlutenFree: true, isActive: true, isFeatured: false, allergens: ['dairy'], prepTime: 22, calories: 560, sortOrder: 3, createdAt: '' },
  { id: '8', name: 'Duck Confit', slug: 'duck-confit', description: 'Slow-confit Barbary duck, cherry gastrique, pomme sarladaise & wilted greens', price: 44, emoji: '🦆', categoryId: 'mains', isVegetarian: false, isSpicy: false, isGlutenFree: false, isActive: true, isFeatured: false, allergens: [], prepTime: 20, calories: 680, sortOrder: 4, createdAt: '' },
  { id: '9', name: 'Lobster Bisque', slug: 'lobster-bisque', description: 'Classic French bisque, brandy cream, Maine lobster, chive oil & caviar', price: 38, emoji: '🦞', categoryId: 'mains', isVegetarian: false, isSpicy: false, isGlutenFree: false, isActive: true, isFeatured: false, allergens: ['shellfish', 'dairy'], prepTime: 15, calories: 440, sortOrder: 5, createdAt: '' },
  { id: '10', name: 'Château Margaux 2018', slug: 'margaux', description: 'Premier Grand Cru Classé. Notes of blackcurrant, cedar and violet', price: 95, emoji: '🍷', categoryId: 'drinks', isVegetarian: true, isSpicy: false, isGlutenFree: true, isActive: true, isFeatured: false, allergens: ['sulfites'], prepTime: 2, sortOrder: 1, createdAt: '' },
  { id: '11', name: 'Champagne Billecart', slug: 'champagne', description: 'Blanc de Blancs NV. Crisp acidity, fine bubbles, pastry and citrus notes', price: 65, emoji: '🥂', categoryId: 'drinks', isVegetarian: true, isSpicy: false, isGlutenFree: true, isActive: true, isFeatured: false, allergens: ['sulfites'], prepTime: 2, sortOrder: 2, createdAt: '' },
  { id: '12', name: 'Negroni Sbagliato', slug: 'negroni', description: 'Campari, sweet vermouth, Prosecco — twisted on the classic Negroni', price: 18, emoji: '🍊', categoryId: 'drinks', isVegetarian: true, isSpicy: false, isGlutenFree: true, isActive: true, isFeatured: false, allergens: [], prepTime: 3, sortOrder: 3, createdAt: '' },
  { id: '13', name: 'Artisan Coffee', slug: 'coffee', description: 'Single-origin Ethiopian pour-over or traditional espresso', price: 8, emoji: '☕', categoryId: 'drinks', isVegetarian: true, isSpicy: false, isGlutenFree: true, isActive: true, isFeatured: false, allergens: [], prepTime: 5, sortOrder: 4, createdAt: '' },
  { id: '14', name: 'Chocolate Soufflé', slug: 'souffle', description: '72% Valrhona dark chocolate, Tahitian vanilla crème anglaise, 20-min wait', price: 22, emoji: '🍫', categoryId: 'desserts', isVegetarian: true, isSpicy: false, isGlutenFree: false, isActive: true, isFeatured: true, allergens: ['dairy', 'eggs', 'gluten'], prepTime: 20, calories: 440, sortOrder: 1, createdAt: '' },
  { id: '15', name: 'Crème Brûlée', slug: 'creme-brulee', description: 'Classic vanilla crème brûlée with a perfectly caramelized crust', price: 16, emoji: '🍮', categoryId: 'desserts', isVegetarian: true, isSpicy: false, isGlutenFree: true, isActive: true, isFeatured: false, allergens: ['dairy', 'eggs'], prepTime: 15, calories: 380, sortOrder: 2, createdAt: '' },
  { id: '16', name: 'Tarte Tatin', slug: 'tarte-tatin', description: 'Upside-down caramelized apple tart, Calvados flambé, Normandy cream', price: 18, emoji: '🥧', categoryId: 'desserts', isVegetarian: true, isSpicy: false, isGlutenFree: false, isActive: true, isFeatured: false, allergens: ['gluten', 'dairy', 'eggs'], prepTime: 18, calories: 420, sortOrder: 3, createdAt: '' },
]

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Mains' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'desserts', label: 'Desserts' },
]

function MenuItemCard({ item }: { item: MenuItem }) {
  const addItem = useCartStore((s) => s.addItem)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -3 }}
      className="bg-savoria-bg2 border border-gold/10 rounded-2xl flex gap-4 p-4 hover:border-gold/25 transition-colors group"
    >
      <div className="w-20 h-20 rounded-xl bg-savoria-bg3 flex items-center justify-center text-3xl flex-shrink-0">{item.emoji}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-sm mb-1 group-hover:text-gold transition-colors truncate">{item.name}</h3>
            <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mb-2">{item.description}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {item.isVegetarian && <span className="flex items-center gap-0.5 text-green-400 text-[10px] border border-green-800/40 bg-green-900/10 px-1.5 py-0.5 rounded-full"><Leaf size={9} /> Veg</span>}
            {item.isSpicy && <span className="flex items-center gap-0.5 text-red-400 text-[10px] border border-red-800/40 bg-red-900/10 px-1.5 py-0.5 rounded-full"><Flame size={9} /> Spicy</span>}
            {item.calories && <span className="text-white/30 text-[10px]">{item.calories} cal</span>}
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-gold">${item.price}</span>
            <button
              onClick={() => { addItem(item); toast.success(`${item.name} added!`) }}
              className="w-8 h-8 rounded-lg bg-gold text-black flex items-center justify-center hover:bg-gold-light hover:scale-110 transition-all"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function MenuPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [vegOnly, setVegOnly] = useState(false)

  const filtered = useMemo(() => {
    return MENU_DATA.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.categoryId === activeCategory
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase())
      const matchesVeg = !vegOnly || item.isVegetarian
      return matchesCat && matchesSearch && matchesVeg
    })
  }, [search, activeCategory, vegOnly])

  const grouped = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {}
    filtered.forEach((item) => {
      const cat = CATEGORIES.find((c) => c.id === item.categoryId)?.label || item.categoryId
      if (!groups[cat]) groups[cat] = []
      groups[cat].push(item)
    })
    return groups
  }, [filtered])

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* Hero */}
        <div className="bg-savoria-bg2 border-b border-gold/10 px-4 py-16 text-center">
          <h1 className="font-display text-5xl sm:text-6xl font-bold mb-3">Our <em className="text-gold not-italic">Menu</em></h1>
          <p className="text-white/50 mb-8">Crafted with passion, served with love</p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm placeholder:text-white/30 focus:outline-none focus:border-gold/40 text-white"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="sticky top-16 z-40 bg-savoria-bg/90 backdrop-blur-xl border-b border-gold/10 px-4 py-3 flex items-center gap-3 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all border ${activeCategory === cat.id ? 'bg-gold text-black border-gold font-semibold' : 'border-gold/15 text-white/60 hover:text-gold hover:border-gold/30'}`}
            >
              {cat.label}
            </button>
          ))}
          <div className="ml-auto flex-shrink-0">
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all ${vegOnly ? 'bg-green-900/30 border-green-700/40 text-green-400' : 'border-gold/15 text-white/50'}`}
            >
              <Leaf size={12} /> Veg Only
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-white/40">
              <div className="text-4xl mb-4">🍽️</div>
              <p>No dishes found. Try a different search.</p>
            </div>
          ) : (
            <AnimatePresence>
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-lg font-semibold text-white/60">{category}</h2>
                    <div className="flex-1 h-px bg-gold/10" />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {items.map((item) => <MenuItemCard key={item.id} item={item} />)}
                  </div>
                </div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
