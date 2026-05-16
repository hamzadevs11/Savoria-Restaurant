'use client'
// src/app/admin/reservations/page.tsx
import { useState } from 'react'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'

const RESERVATIONS = [
  { id: 'R-4821', name: 'Thompson Family', guests: 4, date: 'Today, 19:00', table: 'Table 7', status: 'Confirmed', email: 'thompson@ex.com' },
  { id: 'R-4820', name: 'Sarah & Mike', guests: 2, date: 'Today, 20:30', table: 'Table 2', status: 'Confirmed', email: 'sarah@ex.com' },
  { id: 'R-4819', name: 'Hernandez Party', guests: 8, date: 'Tomorrow, 19:30', table: 'Private Room', status: 'Pending', email: 'hernandez@ex.com' },
  { id: 'R-4818', name: 'Dr. Chen', guests: 3, date: 'May 3, 20:00', table: 'Table 9', status: 'Confirmed', email: 'chen@ex.com' },
  { id: 'R-4817', name: 'Birthday Group', guests: 10, date: 'May 4, 19:00', table: 'Private Room', status: 'Pending', email: 'group@ex.com' },
]

export default function AdminReservations() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Reservations</h1>
        <button onClick={() => toast.success('Add reservation form')} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold to-gold-light text-black font-semibold rounded-xl text-sm">
          <Plus size={14} /> Add Reservation
        </button>
      </div>
      <div className="bg-savoria-bg2 border border-gold/10 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-gold/10 font-semibold text-sm">{RESERVATIONS.length} upcoming reservations</div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-savoria-bg3">
                {['ID', 'Guest', 'Guests', 'Date & Time', 'Table', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] text-white/30 uppercase tracking-wider font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RESERVATIONS.map(r => (
                <tr key={r.id} className="border-t border-gold/5 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3.5 text-gold font-semibold text-xs">{r.id}</td>
                  <td className="px-4 py-3.5"><div className="text-sm font-medium">{r.name}</div><div className="text-xs text-white/30">{r.email}</div></td>
                  <td className="px-4 py-3.5 text-sm text-center">{r.guests}</td>
                  <td className="px-4 py-3.5 text-sm whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3.5 text-sm text-white/60">{r.table}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${r.status === 'Confirmed' ? 'bg-green-900/20 text-green-400 border border-green-800/30' : 'bg-amber-900/20 text-amber-400 border border-amber-800/30'}`}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3.5 flex gap-1.5">
                    <button onClick={() => toast.success(`${r.id} confirmed`)} className="px-2.5 py-1 border border-gold/20 text-gold rounded-lg text-xs hover:bg-gold/10 transition-all">Confirm</button>
                    <button onClick={() => toast.success(`${r.id} cancelled`)} className="px-2.5 py-1 border border-red-800/30 text-red-400/60 rounded-lg text-xs hover:bg-red-900/10 transition-all">Cancel</button>
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
