import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, MapPin, Clock, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';
import { Club } from '../../types';

export const FeaturedClubs: React.FC = () => {
  const { clubs, setSelectedClubForModal, openBookingWithPrefill, t } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const neighborhoods = ['all', 'Eixample', 'Gothic Quarter', 'Port Olímpic'];

  const filteredClubs = clubs.filter(c => {
    if (c.status !== 'active') return false;
    if (activeFilter === 'all') return true;
    return c.neighborhood.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <section id="clubs" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-xs font-semibold text-[#f3e5ab] mb-3 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          Verified Barcelona Directory
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif mb-4">
          {t('featured_clubs_title')}
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          {t('featured_clubs_sub')}
        </p>

        {/* Neighborhood Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {neighborhoods.map(nh => (
            <button
              key={nh}
              onClick={() => setActiveFilter(nh)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition capitalize cursor-pointer ${
                activeFilter === nh
                  ? 'bg-gradient-to-r from-[#f6e05e] via-[#d4af37] to-[#b7791f] text-black shadow-lg shadow-[#d4af37]/20'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {nh === 'all' ? t('filter_all') : nh}
            </button>
          ))}
        </div>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredClubs.map(club => (
          <div
            key={club.id}
            className="group relative rounded-2xl border border-white/10 bg-[#12141d] hover:border-[#d4af37]/50 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1 shadow-xl hover:shadow-[#d4af37]/10"
          >
            {/* Image & Badges */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={club.featured_image}
                alt={club.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141d] via-[#12141d]/30 to-transparent" />

              {/* Neighborhood badge */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs text-white">
                <MapPin className="w-3 h-3 text-[#d4af37]" />
                <span>{club.neighborhood}</span>
              </div>

              {/* Rating */}
              <div className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#d4af37] text-black text-xs font-bold shadow-md">
                <Star className="w-3 h-3 fill-black text-black" />
                <span>{club.rating}</span>
                <span className="text-[10px] text-black/80 font-normal">({club.reviews_count})</span>
              </div>

              {club.is_featured && (
                <div className="absolute bottom-3 left-3.5 px-2.5 py-0.5 rounded bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] text-[10px] uppercase font-bold tracking-wider">
                  Featured Club
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 font-serif group-hover:text-[#f3e5ab] transition">
                  {club.name}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                  {club.short_description}
                </p>

                {/* Facilities Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {club.facilities.slice(0, 3).map((facility, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] text-gray-300"
                    >
                      {facility}
                    </span>
                  ))}
                  {club.facilities.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-[#d4af37] font-medium">
                      +{club.facilities.length - 3} more
                    </span>
                  )}
                </div>

                {/* Quick Info */}
                <div className="space-y-1.5 text-xs text-gray-400 border-t border-white/10 pt-3 mb-5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Open: {club.opening_hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Dress Code: {club.dress_code}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => setSelectedClubForModal(club)}
                  className="py-2.5 px-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                </button>

                <button
                  onClick={() => openBookingWithPrefill(club.id)}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#f6e05e] via-[#d4af37] to-[#b7791f] text-black text-xs font-bold uppercase tracking-wider hover:brightness-110 transition shadow-md flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  <span>Reserve</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
