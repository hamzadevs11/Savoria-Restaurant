// src/app/api/auth/register/route.ts
import { NextRequest } from 'next/server'
import { signAccessToken, signRefreshToken } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api'

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json()

    if (!email || !password || !name) return errorResponse('All fields required')
    if (password.length < 6) return errorResponse('Password too short')

    // Demo mode - just return success
    const payload = { userId: Date.now().toString(), email, role: 'CUSTOMER' }
    const accessToken = await signAccessToken(payload)
    const refreshToken = await signRefreshToken(payload)

    return successResponse({
      user: { id: payload.userId, email, name, role: 'CUSTOMER' },
      accessToken,
    }, 201)
  } catch (err) {
    return errorResponse('Internal server error', 500)
  }
}