import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Check,
  Sparkles,
  Users,
  Clock,
  ArrowRight,
  Info
} from 'lucide-react';

export const PackagesSection: React.FC = () => {
  const { packages, openBookingWithPrefill, setSelectedPackageForModal, t } = useApp();

  const activePackages = packages.filter(p => p.is_active);

  return (
    <section id="packages" className="py-24 bg-[#0a0b10] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-xs font-semibold text-[#f3e5ab] mb-3 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            Bespoke Nightlife Hospitality
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif mb-4">
            {t('packages_title')}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            {t('packages_sub')}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activePackages.map(pkg => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl ${
                pkg.badge === 'Most Popular'
                  ? 'border-[#d4af37] bg-[#141622] scale-102 lg:-translate-y-2'
                  : 'border-white/10 bg-[#10121a] hover:border-[#d4af37]/50'
              }`}
            >
              {/* Badge if featured/popular */}
              {pkg.badge && (
                <div className="absolute top-0 right-0 z-10 bg-gradient-to-l from-[#d4af37] to-[#b7791f] text-black text-[11px] font-extrabold uppercase tracking-wider py-1 px-4 rounded-bl-xl shadow-md">
                  {pkg.badge}
                </div>
              )}

              <div>
                {/* Image Banner */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pkg.featured_image}
                    alt={pkg.name}
                    className="w-full h-full object-cover brightness-80 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10121a] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-gray-300 font-medium">
                      {pkg.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 font-serif">
                    {pkg.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-6 leading-relaxed">
                    {pkg.short_description}
                  </p>

                  {/* Pricing Box */}
                  <div className="rounded-xl bg-black/40 border border-white/10 p-4 mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-[#f3e5ab]">
                        €{pkg.sale_price ? pkg.sale_price : pkg.regular_price}
                      </span>
                      {pkg.sale_price && (
                        <span className="text-sm text-gray-500 line-through">
                          €{pkg.regular_price}
                        </span>
                      )}
                      <span className="text-xs text-gray-400 ml-auto">
                        {t('per_package')}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-300 mt-3 pt-3 border-t border-white/5">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{pkg.min_guests}-{pkg.max_guests} Guests</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Inclusions list */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">
                      Package Inclusions:
                    </span>
                    {pkg.inclusions.slice(0, 4).map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <Check className="w-4 h-4 text-[#25d366] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => openBookingWithPrefill(undefined, pkg.id)}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-[#f6e05e] via-[#d4af37] to-[#b7791f] hover:brightness-110 shadow-lg shadow-[#d4af37]/20 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>{t('btn_book_package')}</span>
                </button>

                <button
                  onClick={() => setSelectedPackageForModal(pkg)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-gray-400 hover:text-white bg-transparent hover:bg-white/5 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-gray-400" />
                  <span>View All Options & Add-ons</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
