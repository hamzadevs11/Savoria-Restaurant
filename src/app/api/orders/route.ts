// src/app/api/orders/route.ts
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse, unauthorizedResponse, generateOrderNumber, calculateOrderTotals } from '@/lib/api'
import { getCurrentUser } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const user = await getCurrentUser(req)
  if (!user) return unauthorizedResponse()

  try {
    const where = user.role === 'ADMIN' ? {} : { userId: user.userId }
    const orders = await prisma.order.findMany({
      where,
      include: { items: { include: { menuItem: true } }, address: true },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    return successResponse(orders)
  } catch {
    return errorResponse('Failed to fetch orders', 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, deliveryMethod, deliveryAddress, paymentMethod, promoCode, notes, guestName, guestEmail } = body
    const user = await getCurrentUser(req)

    if (!items || items.length === 0) return errorResponse('Cart is empty')

    // Fetch menu items to verify prices
    const menuItemIds = items.map((i: { menuItemId: string }) => i.menuItemId)
    const menuItems = await prisma.menuItem.findMany({ where: { id: { in: menuItemIds }, isActive: true } })

    if (menuItems.length !== menuItemIds.length) return errorResponse('Some items are unavailable')

    const subtotal = items.reduce((sum: number, item: { menuItemId: string; quantity: number }) => {
      const mi = menuItems.find(m => m.id === item.menuItemId)!
      return sum + mi.price * item.quantity
    }, 0)

    let promoDiscount = 0
    if (promoCode) {
      const promo = await prisma.promoCode.findFirst({ where: { code: promoCode.toUpperCase(), isActive: true } })
      if (promo && subtotal >= promo.minOrder) promoDiscount = promo.discount
    }

    const { deliveryFee, tax, discount, total } = calculateOrderTotals(subtotal, deliveryMethod, promoDiscount)

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: user?.userId,
        guestName, guestEmail,
        status: 'CONFIRMED',
        deliveryMethod,
        deliveryAddress,
        paymentMethod: paymentMethod || 'CARD',
        subtotal, deliveryFee, tax, discount, total,
        promoCode, notes,
        estimatedTime: deliveryMethod === 'DELIVERY' ? 30 : 15,
        items: {
          create: items.map((item: { menuItemId: string; quantity: number; notes?: string }) => {
            const mi = menuItems.find(m => m.id === item.menuItemId)!
            return { menuItemId: item.menuItemId, quantity: item.quantity, unitPrice: mi.price, totalPrice: mi.price * item.quantity, notes: item.notes }
          })
        }
      },
      include: { items: { include: { menuItem: true } } }
    })

    return successResponse(order, 201)
  } catch (err) {
    console.error('Order error:', err)
    return errorResponse('Failed to create order', 500)
  }
}
