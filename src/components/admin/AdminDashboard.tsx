import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  Clock,
  CheckCircle,
  Building2,
  Gift,
  MessageCircle,
  DollarSign,
  TrendingUp,
  Activity,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    reservations,
    clubs,
    packages,
    contactMessages,
    activityLogs,
    setAdminSection
  } = useApp();

  const pending = reservations.filter(r => r.status === 'pending');
  const confirmed = reservations.filter(r => r.status === 'confirmed');
  const completed = reservations.filter(r => r.status === 'completed');

  const totalRevenue = reservations.reduce((acc, r) => acc + (r.total_amount || 0), 0);
  const totalDeposits = reservations.reduce((acc, r) => acc + (r.deposit_amount || 0), 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight">
            VIP Management Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Real-time reservations, venue directory status, and revenue analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAdminSection('reservations')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#f6e05e] via-[#d4af37] to-[#b7791f] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Manage Reservations</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pending Card */}
        <div
          onClick={() => setAdminSection('reservations')}
          className="rounded-2xl border border-[#d4af37]/40 bg-[#12141e] p-5 cursor-pointer hover:border-[#d4af37] transition shadow-lg group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pending Bookings</span>
            <div className="w-8 h-8 rounded-lg bg-[#d4af37]/15 flex items-center justify-center text-[#d4af37]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#f3e5ab] mb-1">
            {pending.length}
          </div>
          <div className="text-[11px] text-gray-400 flex items-center justify-between">
            <span>Awaiting concierge contact</span>
            <span className="text-[#d4af37] font-medium group-hover:underline">Review →</span>
          </div>
        </div>

        {/* Confirmed Bookings */}
        <div className="rounded-2xl border border-white/10 bg-[#12141e] p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Confirmed Bookings</span>
            <div className="w-8 h-8 rounded-lg bg-[#25d366]/15 flex items-center justify-center text-[#25d366]">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">
            {confirmed.length}
          </div>
          <div className="text-[11px] text-gray-400">
            Guaranteed tables & transport
          </div>
        </div>

        {/* Total Booked Volume */}
        <div className="rounded-2xl border border-white/10 bg-[#12141e] p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Booked Volume</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">
            €{totalRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-gray-400">
            Deposits secured: €{totalDeposits.toLocaleString()}
          </div>
        </div>

        {/* Active Catalog */}
        <div className="rounded-2xl border border-white/10 bg-[#12141e] p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Inventory</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">
            {clubs.length} Clubs
          </div>
          <div className="text-[11px] text-gray-400">
            {packages.length} Packages active
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Bookings & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Reservations Table (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#10121a] p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-serif flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-[#d4af37]" />
              <span>Latest VIP Reservations</span>
            </h2>
            <button
              onClick={() => setAdminSection('reservations')}
              className="text-xs text-[#d4af37] hover:underline"
            >
              View all ({reservations.length})
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-gray-400 uppercase tracking-wider">
                <tr>
                  <th className="pb-3">Reference</th>
                  <th className="pb-3">Guest</th>
                  <th className="pb-3">Venue / Package</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {reservations.slice(0, 5).map(res => (
                  <tr key={res.id} className="hover:bg-white/5 transition">
                    <td className="py-3 font-mono font-bold text-[#f3e5ab]">
                      {res.booking_reference}
                    </td>
                    <td className="py-3">
                      <div className="font-semibold text-white">{res.guest_name}</div>
                      <div className="text-[10px] text-gray-400">{res.guest_phone}</div>
                    </td>
                    <td className="py-3">
                      <div className="text-gray-200">{res.club_name}</div>
                      <div className="text-[10px] text-gray-400">{res.package_name || 'Standard Table'}</div>
                    </td>
                    <td className="py-3 text-gray-300">
                      <div>{res.reservation_date}</div>
                      <div className="text-[10px] text-gray-500">{res.preferred_time} ({res.number_of_guests}p)</div>
                    </td>
                    <td className="py-3 font-bold text-white">
                      €{res.total_amount.toFixed(2)}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        res.status === 'confirmed'
                          ? 'bg-[#25d366]/20 text-[#25d366] border border-[#25d366]/30'
                          : res.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-white/10 text-gray-400'
                      }`}>
                        {res.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar: Activity Audit Trail & Contact Inquiries */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="rounded-2xl border border-white/10 bg-[#10121a] p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setAdminSection('clubs')}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition"
              >
                <Building2 className="w-4 h-4 text-[#d4af37] mb-1.5" />
                <span className="font-semibold text-white block">Add / Edit Club</span>
                <span className="text-[10px] text-gray-500">Update listings</span>
              </button>

              <button
                onClick={() => setAdminSection('packages')}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition"
              >
                <Gift className="w-4 h-4 text-[#d4af37] mb-1.5" />
                <span className="font-semibold text-white block">VIP Packages</span>
                <span className="text-[10px] text-gray-500">Pricing & options</span>
              </button>

              <button
                onClick={() => setAdminSection('settings')}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition"
              >
                <MessageCircle className="w-4 h-4 text-[#25d366] mb-1.5" />
                <span className="font-semibold text-white block">WhatsApp Number</span>
                <span className="text-[10px] text-gray-500">Configure concierge</span>
              </button>

              <button
                onClick={() => setAdminSection('deploy')}
                className="p-3 rounded-xl bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/30 text-left transition"
              >
                <Sparkles className="w-4 h-4 text-[#d4af37] mb-1.5" />
                <span className="font-semibold text-[#f3e5ab] block">Hostinger Guide</span>
                <span className="text-[10px] text-gray-400">Deploy commands</span>
              </button>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="rounded-2xl border border-white/10 bg-[#10121a] p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
              <span>Security & Audit Trail</span>
              <Activity className="w-3.5 h-3.5 text-[#d4af37]" />
            </h3>
            <div className="space-y-3">
              {activityLogs.slice(0, 4).map(log => (
                <div key={log.id} className="text-xs border-b border-white/5 pb-2.5">
                  <div className="flex items-center justify-between text-gray-400 text-[10px] mb-0.5">
                    <span>{log.user}</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <p className="text-gray-300 font-medium">{log.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
