import React from 'react';
import { Compass, Moon, ShieldAlert, Sparkles } from 'lucide-react';

export const NightlifeGuide: React.FC = () => {
  return (
    <section className="py-20 bg-[#0d0e15] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-xs font-semibold text-[#f3e5ab] mb-4 uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
              Barcelona Nightlife Insider Guide
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif mb-6 leading-tight">
              Essential Etiquette & Insider Tips for Barcelona Adult Venues
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              Barcelona enjoys a vibrant, sophisticated cabaret and adult entertainment culture regulated under Catalan hospitality standards. To ensure a seamless, high-class experience, we recommend arriving between 23:30 and 01:00 when performances and atmosphere hit their peak.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <Moon className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Peak Hours & Showtime Schedule</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Most Barcelona venues open doors around 22:00, with featured choreography and cabaret stage sets commencing at 23:30 and running throughout the night until 06:00.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <ShieldAlert className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Patron Code of Conduct & Respect</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Venues enforce strict respectful behavior policies. Photography and recording on mobile devices are prohibited inside main showroom areas to safeguard performer privacy and guest discretion.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <Sparkles className="w-6 h-6 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Tipping & Table Gratuity</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    While service is included in your VIP package, voluntary gratuities for dedicated table hostesses and stage artists are customary and warmly appreciated.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-96 sm:h-[480px] rounded-3xl overflow-hidden border border-[#d4af37]/30 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1200&auto=format&fit=crop"
                alt="Barcelona Nightlife Atmosphere"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="p-5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10">
                  <div className="text-xs font-bold text-[#f3e5ab] uppercase tracking-wider mb-1">
                    Official Hostess Advice
                  </div>
                  <p className="text-xs text-gray-300 italic">
                    "Pre-booking a VIP table guarantees your entire group enters together without delays, with cold premium champagne ready at your private table."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
