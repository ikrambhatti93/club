import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Check,
  Sparkles,
  Users,
  Clock,
  Plus,
  Minus,
  CheckCircle2
} from 'lucide-react';

export const PackageDetailModal: React.FC = () => {
  const { selectedPackageForModal, setSelectedPackageForModal, openBookingWithPrefill } = useApp();
  const [selectedOptionsState, setSelectedOptionsState] = useState<{ [optionId: number]: number }>({});

  if (!selectedPackageForModal) return null;

  const pkg = selectedPackageForModal;
  const basePrice = pkg.sale_price || pkg.regular_price;

  const toggleOption = (optionId: number, currentQty: number) => {
    setSelectedOptionsState(prev => {
      const next = { ...prev };
      if (next[optionId]) {
        delete next[optionId];
      } else {
        next[optionId] = 1;
      }
      return next;
    });
  };

  const updateQuantity = (optionId: number, delta: number) => {
    setSelectedOptionsState(prev => {
      const current = prev[optionId] || 0;
      const nextQty = Math.max(0, current + delta);
      const next = { ...prev };
      if (nextQty === 0) {
        delete next[optionId];
      } else {
        next[optionId] = nextQty;
      }
      return next;
    });
  };

  const addOnsTotal = Object.entries(selectedOptionsState).reduce((acc, [optId, qty]) => {
    const opt = pkg.options.find(o => o.id === Number(optId));
    return acc + (opt ? opt.price * qty : 0);
  }, 0);

  const estimatedTotal = basePrice + addOnsTotal;

  const handleBookNow = () => {
    const pkgId = pkg.id;
    setSelectedPackageForModal(null);
    openBookingWithPrefill(undefined, pkgId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-[#d4af37]/40 bg-[#10121a] shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] text-xs font-semibold uppercase tracking-wider">
              {pkg.category}
            </span>
            <span className="text-gray-400 text-xs flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#d4af37]" />
              {pkg.min_guests}-{pkg.max_guests} Guests
            </span>
          </div>

          <button
            onClick={() => setSelectedPackageForModal(null)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Banner & Intro */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <img
              src={pkg.featured_image}
              alt={pkg.name}
              className="w-full sm:w-48 h-40 object-cover rounded-xl border border-white/10 shrink-0"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white font-serif mb-2">
                {pkg.name}
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                {pkg.full_description}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                  {pkg.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                  Capacity: up to {pkg.max_guests} guests
                </span>
              </div>
            </div>
          </div>

          {/* Inclusions */}
          <div className="rounded-xl bg-black/40 border border-white/10 p-5">
            <h3 className="text-xs font-semibold text-[#f3e5ab] uppercase tracking-wider mb-3">
              Included in Package:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {pkg.inclusions.map((inc, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#25d366] shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Configurable Package Options / Add-ons */}
          {pkg.options && pkg.options.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Select Luxury Upgrades & Add-ons (Optional)</span>
                <span className="text-[11px] text-gray-400 font-normal">Customizable in booking form</span>
              </h3>
              <div className="space-y-3">
                {pkg.options.map(opt => {
                  const qty = selectedOptionsState[opt.id] || 0;
                  const isSelected = qty > 0;
                  return (
                    <div
                      key={opt.id}
                      className={`p-4 rounded-xl border transition flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-[#d4af37] bg-[#d4af37]/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{opt.option_name}</span>
                          <span className="text-xs font-bold text-[#f3e5ab]">+€{opt.price.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{opt.description}</p>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2">
                        {isSelected ? (
                          <div className="flex items-center gap-2 bg-black/60 border border-[#d4af37]/50 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(opt.id, -1)}
                              className="w-6 h-6 flex items-center justify-center rounded bg-white/10 text-white hover:bg-white/20"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-white px-1.5">{qty}</span>
                            <button
                              onClick={() => updateQuantity(opt.id, 1)}
                              className="w-6 h-6 flex items-center justify-center rounded bg-white/10 text-white hover:bg-white/20"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => toggleOption(opt.id, 1)}
                            className="px-3 py-1.5 rounded-lg border border-white/20 hover:border-[#d4af37] text-xs font-medium text-gray-200 hover:text-white transition flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3 text-[#d4af37]" />
                            <span>Add</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pricing & Booking Footer */}
          <div className="rounded-xl bg-gradient-to-r from-[#141622] to-black border border-[#d4af37]/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-gray-400">Estimated Total (Deposit is only 20%):</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#f3e5ab]">
                  €{estimatedTotal.toFixed(2)}
                </span>
                <span className="text-xs text-[#25d366] font-medium">
                  (Deposit: €{(estimatedTotal * 0.2).toFixed(2)})
                </span>
              </div>
            </div>

            <button
              onClick={handleBookNow}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-[#f6e05e] via-[#d4af37] to-[#b7791f] hover:brightness-110 shadow-lg shadow-[#d4af37]/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Proceed to Booking</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
