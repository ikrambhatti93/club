import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  Search,
  Filter,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  Car,
  Phone,
  Mail,
  MessageCircle,
  FileText,
  Trash2,
  Edit3
} from 'lucide-react';
import { Reservation, ReservationStatus } from '../../types';

export const ReservationsManager: React.FC = () => {
  const {
    reservations,
    updateReservationStatus,
    deleteReservation,
    clubs,
    packages,
    settings
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);
  const [editingNotes, setEditingNotes] = useState('');

  const filtered = reservations.filter(r => {
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesSearch =
      r.booking_reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.guest_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.guest_phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.club_name && r.club_name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = ['Reference', 'Guest Name', 'Email', 'Phone', 'Date', 'Time', 'Guests', 'Club', 'Package', 'Total', 'Deposit', 'Status'];
    const rows = filtered.map(r => [
      r.booking_reference,
      `"${r.guest_name}"`,
      r.guest_email,
      r.guest_phone,
      r.reservation_date,
      r.preferred_time,
      r.number_of_guests,
      `"${r.club_name || ''}"`,
      `"${r.package_name || ''}"`,
      r.total_amount,
      r.deposit_amount,
      r.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `reservations_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openNotesModal = (r: Reservation) => {
    setSelectedRes(r);
    setEditingNotes(r.admin_notes || '');
  };

  const handleSaveNotes = () => {
    if (selectedRes) {
      updateReservationStatus(selectedRes.id, selectedRes.status, editingNotes);
      setSelectedRes(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-serif">
            Reservations Management
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Review guest requests, assign VIP sections, and manage confirmation statuses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 transition flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-white/10 bg-[#12141d] p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reference, guest, phone, club..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#d4af37] text-black shadow-md'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Reservations Table */}
      <div className="rounded-2xl border border-white/10 bg-[#12141d] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/40 border-b border-white/10 text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Booking Ref</th>
                <th className="py-3.5 px-4">Guest Details</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Club / Package</th>
                <th className="py-3.5 px-4">Total / Deposit</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No reservations matching current criteria.
                  </td>
                </tr>
              ) : (
                filtered.map(res => (
                  <tr key={res.id} className="hover:bg-white/5 transition">
                    <td className="py-4 px-4 font-mono font-bold text-[#f3e5ab]">
                      {res.booking_reference}
                      {res.pickup_requested && (
                        <div className="flex items-center gap-1 text-[10px] text-blue-400 mt-1 font-sans">
                          <Car className="w-3 h-3" />
                          <span>Limo Requested</span>
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-white text-sm">{res.guest_name}</div>
                      <div className="text-gray-400 text-[11px] flex items-center gap-2 mt-0.5">
                        <a href={`mailto:${res.guest_email}`} className="hover:underline flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-500" />
                          <span>{res.guest_email}</span>
                        </a>
                        <span>•</span>
                        <a href={`tel:${res.guest_phone}`} className="hover:underline flex items-center gap-1">
                          <Phone className="w-3 h-3 text-gray-500" />
                          <span>{res.guest_phone}</span>
                        </a>
                      </div>
                      {res.customer_notes && (
                        <div className="text-[11px] text-amber-300/90 italic mt-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 w-fit">
                          Note: "{res.customer_notes}"
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4 text-gray-300">
                      <div className="font-semibold text-white">{res.reservation_date}</div>
                      <div className="text-gray-400 text-[11px]">{res.preferred_time} ({res.number_of_guests} guests)</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-semibold text-white">{res.club_name || 'Assigned on arrival'}</div>
                      <div className="text-[11px] text-[#d4af37]">{res.package_name || 'Standard Table'}</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-white">€{res.total_amount.toFixed(2)}</div>
                      <div className="text-[11px] text-emerald-400">Dep: €{res.deposit_amount.toFixed(2)}</div>
                    </td>

                    <td className="py-4 px-4">
                      <select
                        value={res.status}
                        onChange={(e) => updateReservationStatus(res.id, e.target.value as ReservationStatus)}
                        className={`h-8 px-2 rounded-lg text-xs font-semibold uppercase tracking-wider border cursor-pointer ${
                          res.status === 'confirmed'
                            ? 'bg-[#25d366]/20 text-[#25d366] border-[#25d366]/40'
                            : res.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : res.status === 'completed'
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                            : 'bg-red-500/20 text-red-300 border-red-500/40'
                        }`}
                      >
                        <option value="pending" className="bg-[#12141e] text-white">Pending</option>
                        <option value="confirmed" className="bg-[#12141e] text-white">Confirmed</option>
                        <option value="completed" className="bg-[#12141e] text-white">Completed</option>
                        <option value="cancelled" className="bg-[#12141e] text-white">Cancelled</option>
                        <option value="no_show" className="bg-[#12141e] text-white">No Show</option>
                      </select>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Direct WhatsApp Concierge Reachout */}
                        <a
                          href={`https://wa.me/${res.guest_whatsapp?.replace(/[^0-9]/g, '') || res.guest_phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${res.guest_name}, regarding your booking ${res.booking_reference} for ${res.reservation_date} in Barcelona...`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-[#25d366]/15 hover:bg-[#25d366]/30 text-[#25d366] transition"
                          title="Contact Guest on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>

                        {/* Staff Notes */}
                        <button
                          onClick={() => openNotesModal(res)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition"
                          title="Staff Internal Notes"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#d4af37]" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete reservation ${res.booking_reference}?`)) {
                              deleteReservation(res.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                          title="Delete Reservation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Internal Staff Notes Modal */}
      {selectedRes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#12141d] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-white font-serif text-sm">
                Internal Staff Notes: {selectedRes.booking_reference}
              </h3>
              <button
                onClick={() => setSelectedRes(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5">
                Staff Instructions, Table Assignment & Driver Notes
              </label>
              <textarea
                rows={4}
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                placeholder="e.g. VIP Booth 4 assigned. Lincoln limo confirmed with driver Jordi..."
                className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedRes(null)}
                className="px-4 py-2 rounded-lg bg-white/5 text-xs text-gray-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 rounded-lg bg-[#d4af37] text-black font-bold text-xs uppercase"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
