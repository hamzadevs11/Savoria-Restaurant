// src/app/api/menu/route.ts
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse, unauthorizedResponse, forbiddenResponse } from '@/lib/api'
import { getCurrentUser } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')

    const items = await prisma.menuItem.findMany({
      where: {
        isActive: true,
        ...(category && { category: { slug: category } }),
        ...(featured === 'true' && { isFeatured: true }),
        ...(search && { OR: [{ name: { contains: search, mode: 'insensitive' } }, { description: { contains: search, mode: 'insensitive' } }] }),
      },
      include: { category: true },
      orderBy: [{ category: { sortOrder: 'asc' } }, { sortOrder: 'asc' }],
    })
    return successResponse(items)
  } catch (err) {
    return errorResponse('Failed to fetch menu', 500)
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser(req)
  if (!user) return unauthorizedResponse()
  if (user.role !== 'ADMIN') return forbiddenResponse()

  try {
    const body = await req.json()
    const item = await prisma.menuItem.create({ data: body, include: { category: true } })
    return successResponse(item, 201)
  } catch (err) {
    return errorResponse('Failed to create menu item', 500)
  }
}
