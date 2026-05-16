'use client'
// src/app/admin/dashboard/page.tsx  (also used as /admin/page.tsx)
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, ShoppingBag, Users, Star, Download } from 'lucide-react'
import toast from 'react-hot-toast'

const revenueData = [
  { month: 'Jan', revenue: 8200 }, { month: 'Feb', revenue: 11400 }, { month: 'Mar', revenue: 9800 },
  { month: 'Apr', revenue: 14200 }, { month: 'May', revenue: 12100 }, { month: 'Jun', revenue: 15800 },
  { month: 'Jul', revenue: 18200 }, { month: 'Aug', revenue: 16400 }, { month: 'Sep', revenue: 19100 },
  { month: 'Oct', revenue: 22300 }, { month: 'Nov', revenue: 20800 }, { month: 'Dec', revenue: 24500 },
]

const peakData = [
  { hour: '12pm', orders: 12 }, { hour: '1pm', orders: 18 }, { hour: '2pm', orders: 8 },
  { hour: '6pm', orders: 22 }, { hour: '7pm', orders: 35 }, { hour: '8pm', orders: 28 },
  { hour: '9pm', orders: 15 }, { hour: '10pm', orders: 8 },
]

const categoryData = [
  { name: 'Mains', value: 40, color: '#c9a84c' },
  { name: 'Drinks', value: 25, color: '#3d9e6e' },
  { name: 'Starters', value: 20, color: '#c94040' },
  { name: 'Desserts', value: 15, color: '#6b6560' },
]

const recentOrders = [
  { id: '#SAV-2847', customer: 'James Wilson', items: 'Wagyu + Truffle Risotto', total: '$112.99', status: 'Preparing', time: '2 min ago' },
  { id: '#SAV-2846', customer: 'Aisha Patel', items: 'Halibut + Château Margaux', total: '$143.00', status: 'Ready', time: '8 min ago' },
  { id: '#SAV-2845', customer: 'Carlos Ruiz', items: 'Tuna Tartare + Duck Confit', total: '$66.00', status: 'Delivered', time: '22 min ago' },
  { id: '#SAV-2844', customer: 'Emma Stone', items: 'Lobster Bisque + Soufflé', total: '$60.99', status: 'Delivered', time: '35 min ago' },
]

const STATUS_STYLES: Record<string, string> = {
  Preparing: 'bg-yellow-900/20 text-yellow-400 border border-yellow-800/30',
  Ready: 'bg-green-900/20 text-green-400 border border-green-800/30',
  Delivered: 'bg-green-900/30 text-green-300 border border-green-800/40',
  Cancelled: 'bg-red-900/20 text-red-400 border border-red-800/30',
}

const CHART_TOOLTIP_STYLE = {
  contentStyle: { background: '#1a1a1a', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '12px', color: '#f5f0e8', fontSize: '12px' },
  cursor: { fill: 'rgba(201,168,76,0.06)' },
}

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-white/40 text-sm mt-0.5">Welcome back, Marco 👋</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => toast.success('Report exported!')} className="flex items-center gap-2 px-4 py-2 border border-gold/20 text-gold rounded-xl text-sm hover:bg-gold/10 transition-all">
            <Download size={14} /> Export
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-gold to-gold-light text-black font-semibold rounded-xl text-sm">+ Add Item</button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Today's Revenue", value: '$4,287', change: '+12.4%', icon: TrendingUp, positive: true },
          { label: 'Orders Today', value: '84', change: '+8 from avg', icon: ShoppingBag, positive: true },
          { label: 'Active Reservations', value: '23', change: '+3 new today', icon: Users, positive: true },
          { label: 'Avg. Order Value', value: '$51', change: '-2.1% this week', icon: Star, positive: false },
        ].map(m => (
          <div key={m.label} className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-5 hover:border-gold/20 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-white/40 uppercase tracking-wider">{m.label}</span>
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center"><m.icon size={14} className="text-gold" /></div>
            </div>
            <div className="font-display text-3xl font-bold text-gold mb-1">{m.value}</div>
            <div className={`text-xs font-medium ${m.positive ? 'text-green-400' : 'text-red-400'}`}>{m.change}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-savoria-bg2 border border-gold/10 rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-5">Monthly Revenue 2025–26</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData} barSize={20}>
              <XAxis dataKey="month" tick={{ fill: '#6b6560', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip {...CHART_TOOLTIP_STYLE} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#c9a84c" radius={[4, 4, 0, 0]} fillOpacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category pie */}
        <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-5">Sales by Category</h3>
          <div className="flex items-center gap-4">
            <PieChart width={110} height={110}>
              <Pie data={categoryData} cx={50} cy={50} innerRadius={30} outerRadius={50} dataKey="value" paddingAngle={3}>
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
            <div className="space-y-2">
              {categoryData.map(c => (
                <div key={c.name} className="flex items-center gap-2 text-xs text-white/60">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                  {c.name} {c.value}%
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Peak hours + orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-4">Peak Hours Today</h3>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={peakData} barSize={14}>
              <XAxis dataKey="hour" tick={{ fill: '#6b6560', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP_STYLE} formatter={(v: number) => [v, 'Orders']} />
              <Bar dataKey="orders" fill="#c9a84c" radius={[3, 3, 0, 0]} fillOpacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent orders table */}
        <div className="lg:col-span-2 bg-savoria-bg2 border border-gold/10 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gold/10 flex justify-between items-center">
            <h3 className="font-semibold text-sm">Recent Orders</h3>
            <button className="text-xs text-gold hover:underline">View All →</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-savoria-bg3">
                {['Order', 'Customer', 'Total', 'Status', 'Time'].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-[11px] text-white/30 uppercase tracking-wider font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(o => (
                <tr key={o.id} className="border-t border-gold/5 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3 text-gold font-semibold text-xs">{o.id}</td>
                  <td className="px-4 py-3 text-sm">{o.customer}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gold">{o.total}</td>
                  <td className="px-4 py-3"><span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${STATUS_STYLES[o.status]}`}>{o.status}</span></td>
                  <td className="px-4 py-3 text-xs text-white/40">{o.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
