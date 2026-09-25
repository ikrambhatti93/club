import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Phone
} from 'lucide-react';

export const ClubDetailModal: React.FC = () => {
  const { selectedClubForModal, setSelectedClubForModal, openBookingWithPrefill } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedClubForModal) return null;

  const club = selectedClubForModal;
  const allImages = [club.featured_image, ...(club.gallery_images || [])];

  const handleBookNow = () => {
    const clubId = club.id;
    setSelectedClubForModal(null);
    openBookingWithPrefill(clubId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-[#d4af37]/40 bg-[#10121a] shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] text-xs font-semibold uppercase tracking-wider">
              {club.neighborhood}
            </span>
            <div className="flex items-center gap-1 text-[#d4af37] text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-[#d4af37]" />
              <span>{club.rating} ({club.reviews_count} reviews)</span>
            </div>
          </div>

          <button
            onClick={() => setSelectedClubForModal(null)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Gallery Display */}
          <div>
            <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden mb-3 border border-white/10">
              <img
                src={allImages[activeImageIndex]}
                alt={club.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mb-1">
                  {club.name}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-gray-300">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{club.address}</span>
                  <a
                    href={club.map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#d4af37] hover:underline ml-2"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                      activeImageIndex === idx ? 'border-[#d4af37]' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description & Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-[#f3e5ab] uppercase tracking-wider mb-2">
                  About the Establishment
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {club.full_description}
                </p>
              </div>

              {/* VIP Zones */}
              {club.vip_zones && club.vip_zones.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Available VIP Seating Areas
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {club.vip_zones.map((zone, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-white">
                        <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{zone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Facilities */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Facilities & Services
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {club.facilities.map((fac, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#25d366] shrink-0" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="space-y-4 rounded-xl bg-black/40 border border-white/10 p-5 h-fit">
              <div className="border-b border-white/10 pb-3">
                <span className="text-[11px] text-gray-400 uppercase tracking-wider">General Admission</span>
                <div className="text-xl font-bold text-white mt-0.5">
                  €{club.entry_fee.toFixed(2)}{' '}
                  <span className="text-xs text-gray-400 font-normal">/ person (inc. drink)</span>
                </div>
                <div className="text-[11px] text-[#25d366] mt-0.5">Free with VIP Table Package</div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-gray-400 block mb-0.5">Opening Schedule</span>
                  <div className="flex items-center gap-1.5 text-white font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{club.opening_hours}</span>
                  </div>
                </div>

                <div>
                  <span className="text-gray-400 block mb-0.5">Dress Code</span>
                  <div className="flex items-center gap-1.5 text-white font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{club.dress_code}</span>
                  </div>
                </div>

                <div>
                  <span className="text-gray-400 block mb-0.5">Direct Inquiry Phone</span>
                  <div className="flex items-center gap-1.5 text-white font-medium">
                    <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{club.phone}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleBookNow}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-[#f6e05e] via-[#d4af37] to-[#b7791f] hover:brightness-110 shadow-lg shadow-[#d4af37]/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Reserve VIP Booth</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
