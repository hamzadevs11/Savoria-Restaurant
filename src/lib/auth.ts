// src/lib/auth.ts
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
)
const REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret'
)

export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

export async function signAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN || '15m')
    .sign(JWT_SECRET)
}

export async function signRefreshToken(payload: Omit<JWTPayload, 'iat' | 'exp'>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_REFRESH_EXPIRES_IN || '7d')
    .sign(REFRESH_SECRET)
}

export async function verifyAccessToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}

export async function verifyRefreshToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, REFRESH_SECRET)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('Authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  const cookieStore = req.cookies
  return cookieStore.get('access_token')?.value || null
}

export async function getCurrentUser(req: NextRequest): Promise<JWTPayload | null> {
  const token = getTokenFromRequest(req)
  if (!token) return null
  return verifyAccessToken(token)
}

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  const isProd = process.env.NODE_ENV === 'production'
  res.headers.append('Set-Cookie', `access_token=${accessToken}; HttpOnly; Path=/; Max-Age=900; SameSite=Strict${isProd ? '; Secure' : ''}`)
  res.headers.append('Set-Cookie', `refresh_token=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict${isProd ? '; Secure' : ''}`)
}

export function clearAuthCookies(res: Response) {
  res.headers.append('Set-Cookie', 'access_token=; HttpOnly; Path=/; Max-Age=0')
  res.headers.append('Set-Cookie', 'refresh_token=; HttpOnly; Path=/; Max-Age=0')
}
