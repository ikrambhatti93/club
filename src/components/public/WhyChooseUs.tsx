import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, FastForward, Receipt, Car, GlassWater, Award, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { t } = useApp();

  const services = [
    {
      icon: <GlassWater className="w-6 h-6 text-[#d4af37]" />,
      title: "VIP Table & Bottle Service",
      description: "Priority reserved booths overlooking main stages with curated top-shelf spirits and dedicated champagne hostesses."
    },
    {
      icon: <Car className="w-6 h-6 text-[#d4af37]" />,
      title: "Luxury Transport & Limousines",
      description: "Lincoln stretch limousines, Hummer H2s, or Mercedes S-Class chauffeurs directly to and from your accommodation."
    },
    {
      icon: <Award className="w-6 h-6 text-[#d4af37]" />,
      title: "Stag & Bachelor Event Planning",
      description: "Tailor-made itineraries for groups of 4 to 30. Guaranteed admission, welcome toasts, and unforgettable memories."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#d4af37]" />,
      title: "Corporate & Private Hosting",
      description: "Discrete arrangements for international business delegations, VIP clients, and private salon buyouts."
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Why Choose Us */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif mb-4">
          {t('why_us_title')}
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Experience the Catalan capital's nightlife with absolute confidence, safety, and exclusivity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <div className="rounded-2xl border border-white/10 bg-[#12141c] p-6 hover:border-[#d4af37]/40 transition">
          <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center mb-5 text-[#d4af37]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 font-serif">{t('why_1_title')}</h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{t('why_1_desc')}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#12141c] p-6 hover:border-[#d4af37]/40 transition">
          <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center mb-5 text-[#d4af37]">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 font-serif">{t('why_2_title')}</h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{t('why_2_desc')}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#12141c] p-6 hover:border-[#d4af37]/40 transition">
          <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center mb-5 text-[#d4af37]">
            <FastForward className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 font-serif">{t('why_3_title')}</h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{t('why_3_desc')}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#12141c] p-6 hover:border-[#d4af37]/40 transition">
          <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center mb-5 text-[#d4af37]">
            <Receipt className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2 font-serif">{t('why_4_title')}</h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{t('why_4_desc')}</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="rounded-3xl border border-[#d4af37]/25 bg-gradient-to-b from-[#141624] to-[#0c0e14] p-8 sm:p-12 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#f3e5ab] uppercase tracking-wider block mb-2">
            Tailored Nightlife Hospitality
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Our Premium Concierge Services
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, i) => (
            <div key={i} className="rounded-xl bg-black/40 border border-white/10 p-5 hover:border-white/20 transition">
              <div className="mb-4">{svc.icon}</div>
              <h4 className="text-base font-bold text-white mb-2 font-serif">{svc.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{svc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
