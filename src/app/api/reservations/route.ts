// src/app/api/reservations/route.ts
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api'
import { getCurrentUser } from '@/lib/auth'
import { randomBytes } from 'crypto'

export async function GET(req: NextRequest) {
  const user = await getCurrentUser(req)
  if (!user) return errorResponse('Unauthorized', 401)

  const where = user.role === 'ADMIN' ? {} : { userId: user.userId }
  const reservations = await prisma.reservation.findMany({
    where,
    orderBy: { date: 'asc' },
    take: 100,
  })
  return successResponse(reservations)
}

export async function POST(req: NextRequest) {
  try {
    const { guestName, guestEmail, guestPhone, date, time, guestCount, notes, occasion } = await req.json()
    const user = await getCurrentUser(req)

    if (!guestName || !guestEmail || !date || !time || !guestCount) {
      return errorResponse('Missing required fields')
    }

    const confirmToken = randomBytes(32).toString('hex')

    const reservation = await prisma.reservation.create({
      data: {
        userId: user?.userId,
        guestName, guestEmail, guestPhone: guestPhone || '',
        date: new Date(date), time, guestCount,
        notes, occasion,
        status: 'PENDING',
        confirmToken,
      }
    })

    return successResponse(reservation, 201)
  } catch (err) {
    console.error('Reservation error:', err)
    return errorResponse('Failed to create reservation', 500)
  }
}
