// src/lib/api.ts
import { NextResponse } from 'next/server'

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status })
}

export function unauthorizedResponse() {
  return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
}

export function forbiddenResponse() {
  return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
}

// Rate limiting (simple in-memory for demo; use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(key: string, max = 100, windowMs = 60000): boolean {
  const now = Date.now()
  const existing = rateLimitMap.get(key)

  if (!existing || now > existing.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (existing.count >= max) return false

  existing.count++
  return true
}

// Input sanitization
export function sanitizeString(str: string): string {
  return str.trim().replace(/[<>]/g, '')
}

// Generate order number
export function generateOrderNumber(): string {
  const prefix = 'SAV'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${prefix}-${timestamp}${random}`
}

// Calculate order totals
export function calculateOrderTotals(subtotal: number, deliveryMethod: string, promoDiscount = 0) {
  const deliveryFee = deliveryMethod === 'DELIVERY' ? 3.99 : 0
  const tax = subtotal * 0.08
  const discount = subtotal * (promoDiscount / 100)
  const total = subtotal + deliveryFee + tax - discount
  return { deliveryFee, tax, discount, total }
}
