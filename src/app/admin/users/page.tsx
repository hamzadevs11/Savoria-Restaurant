'use client'
// src/app/admin/users/page.tsx
import { Search } from 'lucide-react'
import { useState } from 'react'

const USERS = [
  { id: '1', name: 'James Wilson', email: 'james@ex.com', orders: 12, spent: '$892', role: 'Customer', status: 'Active', joined: 'Jan 2024' },
  { id: '2', name: 'Aisha Patel', email: 'aisha@ex.com', orders: 8, spent: '$1,240', role: 'Customer', status: 'Active', joined: 'Mar 2024' },
  { id: '3', name: 'Carlos Ruiz', email: 'carlos@ex.com', orders: 3, spent: '$245', role: 'Customer', status: 'Active', joined: 'Jun 2024' },
  { id: '4', name: 'Marco Conti', email: 'marco@savoria.com', orders: 0, spent: '—', role: 'Admin', status: 'Active', joined: 'Jan 2012' },
  { id: '5', name: 'Elena Larsson', email: 'elena@savoria.com', orders: 0, spent: '—', role: 'Staff', status: 'Active', joined: 'Mar 2015' },
  { id: '6', name: 'Emma Stone', email: 'emma@ex.com', orders: 5, spent: '$600', role: 'Customer', status: 'Active', joined: 'Aug 2024' },
]

const ROLE_STYLES: Record<string, string> = {
  Admin: 'bg-gold/15 text-gold border border-gold/30',
  Staff: 'bg-blue-900/20 text-blue-400 border border-blue-800/30',
  Customer: 'bg-green-900/20 text-green-400 border border-green-800/30',
}

export default function AdminUsers() {
  const [search, setSearch] = useState('')
  const filtered = USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search.toLowerCase()))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-savoria-bg3 border border-gold/15 rounded-xl text-sm focus:outline-none focus:border-gold/30 text-white placeholder:text-white/30" />
        </div>
      </div>
      <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-savoria-bg3">
                {['Name', 'Email', 'Orders', 'Total Spent', 'Role', 'Status', 'Joined'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] text-white/30 uppercase tracking-wider font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="border-t border-gold/5 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3.5 font-medium text-sm">{u.name}</td>
                  <td className="px-4 py-3.5 text-xs text-white/50">{u.email}</td>
                  <td className="px-4 py-3.5 text-sm text-center">{u.orders}</td>
                  <td className="px-4 py-3.5 text-sm text-gold font-semibold">{u.spent}</td>
                  <td className="px-4 py-3.5"><span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${ROLE_STYLES[u.role]}`}>{u.role}</span></td>
                  <td className="px-4 py-3.5"><span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-green-900/20 text-green-400 border border-green-800/30">{u.status}</span></td>
                  <td className="px-4 py-3.5 text-xs text-white/40">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
