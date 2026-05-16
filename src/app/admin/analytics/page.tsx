'use client'
// src/app/admin/analytics/page.tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Download, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'

const weekData = [
  { day: 'Mon', orders: 42, revenue: 2100 }, { day: 'Tue', orders: 38, revenue: 1900 },
  { day: 'Wed', orders: 55, revenue: 2750 }, { day: 'Thu', orders: 61, revenue: 3050 },
  { day: 'Fri', orders: 48, revenue: 2400 }, { day: 'Sat', orders: 72, revenue: 3600 },
  { day: 'Sun', orders: 84, revenue: 4200 },
]

const topItems = [
  { name: 'Wagyu Beef Tenderloin', orders: 284, revenue: '$19,312', trend: '+14.2%' },
  { name: 'Wild Mushroom Risotto', orders: 241, revenue: '$8,676', trend: '+9.8%' },
  { name: 'Pan-Seared Halibut', orders: 198, revenue: '$9,504', trend: '+7.1%' },
  { name: 'Tuna Tartare', orders: 176, revenue: '$3,872', trend: '+12.3%' },
  { name: 'Chocolate Soufflé', orders: 163, revenue: '$3,586', trend: '+5.9%' },
]

const TOOLTIP = {
  contentStyle: { background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '12px', color: '#f5f0e8', fontSize: '12px' },
  cursor: { fill: 'rgba(201,168,76,0.06)' },
}

export default function AdminAnalytics() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <button onClick={() => toast.success('Analytics report exporting...')} className="flex items-center gap-2 px-4 py-2 border border-gold/20 text-gold rounded-xl text-sm hover:bg-gold/10 transition-all">
          <Download size={14} /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Monthly Revenue', value: '$24,500', change: '↑ 18.2%' },
          { label: 'Total Orders', value: '1,284', change: '↑ 9.6%' },
          { label: 'Avg Rating', value: '4.9 ★', change: '↑ 0.1 pts' },
          { label: 'Return Rate', value: '68%', change: '↑ 5.2%' },
        ].map(m => (
          <div key={m.label} className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-5">
            <div className="text-xs text-white/40 uppercase tracking-wider mb-2">{m.label}</div>
            <div className="font-display text-3xl font-bold text-gold">{m.value}</div>
            <div className="text-xs text-green-400 mt-1">{m.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-5">Orders This Week</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weekData} barSize={24}>
              <XAxis dataKey="day" tick={{ fill: '#6b6560', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...TOOLTIP} formatter={(v: number) => [v, 'Orders']} />
              <Bar dataKey="orders" fill="#c9a84c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-5">Daily Revenue This Week</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weekData}>
              <XAxis dataKey="day" tick={{ fill: '#6b6560', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...TOOLTIP} formatter={(v: number) => [`$${v}`, 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#c9a84c" strokeWidth={2.5} dot={{ fill: '#c9a84c', strokeWidth: 0, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gold/10 flex items-center gap-2">
          <TrendingUp size={16} className="text-gold" />
          <h3 className="font-semibold text-sm">Most Popular Items</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-savoria-bg3">
              {['Rank', 'Dish', 'Orders', 'Revenue', 'Trend'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[11px] text-white/30 uppercase tracking-wider font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topItems.map((item, i) => (
              <tr key={item.name} className="border-t border-gold/5 hover:bg-white/2 transition-colors">
                <td className="px-4 py-3.5 text-gold font-bold text-sm">#{i + 1}</td>
                <td className="px-4 py-3.5 font-medium text-sm">{item.name}</td>
                <td className="px-4 py-3.5 text-sm text-white/60">{item.orders}</td>
                <td className="px-4 py-3.5 text-sm text-gold font-semibold">{item.revenue}</td>
                <td className="px-4 py-3.5 text-sm text-green-400 font-semibold">{item.trend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
