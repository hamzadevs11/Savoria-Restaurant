'use client'
// src/app/admin/orders/page.tsx
import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

const ORDERS = [
  { id: '#SAV-2847', customer: 'James Wilson', email: 'james@ex.com', items: 'Wagyu + Truffle Risotto', total: '$112.99', status: 'Preparing', method: 'Delivery', time: '2 min ago' },
  { id: '#SAV-2846', customer: 'Aisha Patel', email: 'aisha@ex.com', items: 'Halibut + Château Margaux', total: '$143.00', status: 'Ready', method: 'Pickup', time: '8 min ago' },
  { id: '#SAV-2845', customer: 'Carlos Ruiz', email: 'carlos@ex.com', items: 'Tuna Tartare + Duck Confit', total: '$66.00', status: 'Delivered', method: 'Delivery', time: '22 min ago' },
  { id: '#SAV-2844', customer: 'Emma Stone', email: 'emma@ex.com', items: 'Lobster Bisque + Soufflé', total: '$60.99', status: 'Delivered', method: 'Delivery', time: '35 min ago' },
  { id: '#SAV-2843', customer: 'Raj Sharma', email: 'raj@ex.com', items: 'Foie Gras + Negroni', total: '$46.00', status: 'Cancelled', method: 'Pickup', time: '1h ago' },
  { id: '#SAV-2842', customer: 'Sarah Lee', email: 'sarah@ex.com', items: 'Wagyu + Champagne', total: '$163.00', status: 'Delivered', method: 'Delivery', time: '2h ago' },
]

const STATUS_STYLES: Record<string, string> = {
  Preparing: 'bg-yellow-900/20 text-yellow-400 border border-yellow-800/30',
  Ready: 'bg-green-900/20 text-green-400 border border-green-800/30',
  Delivered: 'bg-green-900/30 text-green-300 border border-green-800/40',
  Cancelled: 'bg-red-900/20 text-red-400 border border-red-800/30',
  Pending: 'bg-amber-900/20 text-amber-400 border border-amber-800/30',
}

export default function AdminOrders() {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled']
  const filtered = filter === 'All' ? ORDERS : ORDERS.filter(o => o.status === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <button onClick={() => toast.success('Orders refreshed')} className="flex items-center gap-2 px-4 py-2 border border-gold/20 text-gold rounded-xl text-sm hover:bg-gold/10 transition-all">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs border transition-all ${filter === f ? 'bg-gold text-black border-gold font-bold' : 'border-gold/15 text-white/50 hover:text-gold hover:border-gold/30'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-gold/10 text-sm font-semibold">
          {filtered.length} order{filtered.length !== 1 ? 's' : ''}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-savoria-bg3">
                {['Order ID', 'Customer', 'Items', 'Total', 'Method', 'Status', 'Time', 'Action'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] text-white/30 uppercase tracking-wider font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} className="border-t border-gold/5 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3.5 text-gold font-semibold text-xs">{o.id}</td>
                  <td className="px-4 py-3.5"><div className="text-sm font-medium">{o.customer}</div><div className="text-xs text-white/30">{o.email}</div></td>
                  <td className="px-4 py-3.5 text-xs text-white/60 max-w-[160px] truncate">{o.items}</td>
                  <td className="px-4 py-3.5 text-sm font-bold text-gold">{o.total}</td>
                  <td className="px-4 py-3.5 text-xs text-white/50">{o.method}</td>
                  <td className="px-4 py-3.5"><span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${STATUS_STYLES[o.status]}`}>{o.status}</span></td>
                  <td className="px-4 py-3.5 text-xs text-white/40 whitespace-nowrap">{o.time}</td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => toast.success(`${o.id} status updated`)} className="px-3 py-1 border border-gold/20 text-gold rounded-lg text-xs hover:bg-gold/10 transition-all whitespace-nowrap">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
