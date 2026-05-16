// src/app/layout.tsx
import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { QueryProvider } from '@/components/providers/QueryProvider'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: { default: 'Savoria — Premium Restaurant', template: '%s | Savoria' },
  description: 'Experience culinary artistry at its finest. 3 Michelin stars.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${dmSans.variable} ${playfair.variable} font-sans bg-[#0a0a0a] text-[#f5f0e8] antialiased`}
        style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}
      >
        <QueryProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#f5f0e8',
                border: '1px solid rgba(201,168,76,0.2)',
                fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                fontSize: '0.875rem',
              },
              success: { iconTheme: { primary: '#3d9e6e', secondary: '#f5f0e8' } },
              error: { iconTheme: { primary: '#c94040', secondary: '#f5f0e8' } },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  )
}
