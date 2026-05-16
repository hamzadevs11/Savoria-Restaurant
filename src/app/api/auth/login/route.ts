import { NextRequest } from 'next/server'
import { signAccessToken, signRefreshToken } from '@/lib/auth'
import { successResponse, errorResponse } from '@/lib/api'

const DEMO_USERS = [
  { id: '1', email: 'admin@savoria.com', password: 'admin123', name: 'Marco Conti', role: 'ADMIN' },
  { id: '2', email: 'demo@savoria.com', password: 'user123', name: 'James Wilson', role: 'CUSTOMER' },
]

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('Login attempt:', body.email, body.password) // debug

    const user = DEMO_USERS.find(
      u => u.email === body.email && u.password === body.password
    )

    console.log('User found:', user) // debug

    if (!user) return errorResponse('Invalid credentials', 401)

    const payload = { userId: user.id, email: user.email, role: user.role }
    const accessToken = await signAccessToken(payload)
    const refreshToken = await signRefreshToken(payload)

    return successResponse({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      accessToken,
    })
  } catch (err) {
    console.error('Error:', err)
    return errorResponse('Internal server error', 500)
  }
}