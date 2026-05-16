// src/types/index.ts

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: 'CUSTOMER' | 'STAFF' | 'ADMIN'
  avatar?: string
  createdAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  emoji?: string
  image?: string
  sortOrder: number
  isActive: boolean
}

export interface MenuItem {
  id: string
  name: string
  slug: string
  description: string
  price: number
  image?: string
  emoji?: string
  categoryId: string
  category?: Category
  isActive: boolean
  isFeatured: boolean
  isVegetarian: boolean
  isSpicy: boolean
  isGlutenFree: boolean
  allergens: string[]
  prepTime: number
  calories?: number
  sortOrder: number
  createdAt: string
}

export interface CartItem {
  id: string
  menuItem: MenuItem
  quantity: number
  notes?: string
}

export interface Order {
  id: string
  orderNumber: string
  userId?: string
  user?: User
  guestName?: string
  guestEmail?: string
  status: OrderStatus
  deliveryMethod: 'DELIVERY' | 'PICKUP'
  deliveryAddress?: DeliveryAddress
  paymentMethod: 'CARD' | 'CASH' | 'APPLE_PAY' | 'GOOGLE_PAY'
  subtotal: number
  deliveryFee: number
  tax: number
  discount: number
  total: number
  promoCode?: string
  notes?: string
  estimatedTime?: number
  items: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  menuItem: MenuItem
  quantity: number
  unitPrice: number
  totalPrice: number
  notes?: string
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED'

export interface DeliveryAddress {
  street: string
  city: string
  state: string
  zip: string
  country?: string
}

export interface Reservation {
  id: string
  guestName: string
  guestEmail: string
  guestPhone: string
  date: string
  time: string
  guestCount: number
  tableNumber?: number
  status: 'PENDING' | 'CONFIRMED' | 'SEATED' | 'COMPLETED' | 'CANCELLED'
  notes?: string
  occasion?: string
  createdAt: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface DashboardStats {
  todayRevenue: number
  todayOrders: number
  activeReservations: number
  avgOrderValue: number
  revenueChange: number
  ordersChange: number
}
