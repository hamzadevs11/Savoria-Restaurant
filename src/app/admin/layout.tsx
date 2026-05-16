'use client'
// src/app/admin/layout.tsx
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, CalendarDays, Users, BarChart3, Palette, Globe, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Menu Items', href: '/admin/menu', icon: UtensilsCrossed },
  { label: 'Reservations', href: '/admin/reservations', icon: CalendarDays },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Theme', href: '/admin/theme', icon: Palette },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-savoria-bg">
      {/* Sidebar */}
      <aside className={cn('sticky top-0 h-screen bg-savoria-bg2 border-r border-gold/10 flex flex-col transition-all duration-300 flex-shrink-0', collapsed ? 'w-16' : 'w-56')}>
        <div className="p-4 border-b border-gold/10 flex items-center justify-between">
          {!collapsed && <span className="font-display text-gold text-lg">Savoria</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="w-7 h-7 rounded-lg border border-gold/15 flex items-center justify-center text-white/40 hover:text-gold transition-colors text-sm flex-shrink-0">
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {!collapsed && <p className="px-4 pt-4 pb-1 text-[10px] uppercase tracking-widest text-white/25">Main</p>}

        <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href}
                className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all', active ? 'bg-gold/10 text-gold' : 'text-white/50 hover:text-white hover:bg-white/5')}>
                <item.icon size={16} className="flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="p-2 border-t border-gold/10 space-y-1">
          <Link href="/" className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all')}>
            <Globe size={16} />
            {!collapsed && <span>View Site</span>}
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-900/10 transition-all">
            <LogOut size={16} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
