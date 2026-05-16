// src/store/useCartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MenuItem, CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  promoCode: string | null
  promoDiscount: number
  addItem: (menuItem: MenuItem, notes?: string) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  applyPromo: (code: string, discount: number) => void
  removePromo: () => void
  getSubtotal: () => number
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      promoDiscount: 0,

      addItem: (menuItem, notes) => {
        set((state) => {
          const existing = state.items.find((i) => i.menuItem.id === menuItem.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.menuItem.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }
          return {
            items: [...state.items, { id: `${menuItem.id}-${Date.now()}`, menuItem, quantity: 1, notes }],
          }
        })
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }))
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }))
      },

      clearCart: () => set({ items: [], promoCode: null, promoDiscount: 0 }),

      applyPromo: (code, discount) => set({ promoCode: code, promoDiscount: discount }),
      removePromo: () => set({ promoCode: null, promoDiscount: 0 }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        const discount = subtotal * (get().promoDiscount / 100)
        const tax = subtotal * 0.08
        return subtotal - discount + tax + 3.99
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },
    }),
    { name: 'savoria-cart' }
  )
)
