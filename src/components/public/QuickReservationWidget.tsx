import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Users, Building, Gift, ArrowRight } from 'lucide-react';

export const QuickReservationWidget: React.FC = () => {
  const { clubs, packages, openBookingWithPrefill, t } = useApp();

  const [selectedClub, setSelectedClub] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [date, setDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState<number>(4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openBookingWithPrefill(
      selectedClub ? parseInt(selectedClub) : undefined,
      selectedPackage ? parseInt(selectedPackage) : undefined
    );
  };

  return (
    <div className="relative -mt-10 z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-[#d4af37]/35 bg-[#12141c]/95 backdrop-blur-xl p-5 sm:p-7 shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
          <span className="h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#f3e5ab]">
            {t('quick_res_title')}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
          {/* Club Selector */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{t('select_club')}</span>
            </label>
            <select
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] transition"
            >
              <option value="">{t('all_clubs')}</option>
              {clubs.filter(c => c.status === 'active').map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.neighborhood})</option>
              ))}
            </select>
          </div>

          {/* Package Selector */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{t('select_package')}</span>
            </label>
            <select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] transition"
            >
              <option value="">Any VIP Table or Entry</option>
              {packages.filter(p => p.is_active).map(p => (
                <option key={p.id} value={p.id}>{p.name} (€{p.sale_price || p.regular_price})</option>
              ))}
            </select>
          </div>

          {/* Date Selector */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{t('select_date')}</span>
            </label>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] transition"
            />
          </div>

          {/* Guests Count */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{t('number_of_guests')}</span>
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] transition"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 25, 30].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full h-11 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-[#f6e05e] via-[#d4af37] to-[#b7791f] hover:brightness-110 shadow-lg shadow-[#d4af37]/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book VIP</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
