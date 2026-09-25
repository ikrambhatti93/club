import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, MessageCircle, ShieldCheck, Zap, Star } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t, settings, openBookingWithPrefill } = useApp();

  const handleWhatsApp = () => {
    const cleanNumber = settings.whatsapp_number.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(settings.whatsapp_prefilled_text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
      {/* Background with luxury gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2000&auto=format&fit=crop"
          alt="Barcelona Luxury Nightlife"
          className="w-full h-full object-cover object-center brightness-35 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/70 to-[#08090c]/90" />
        <div className="absolute inset-0 bg-radial from-[#d4af37]/10 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#161822]/80 backdrop-blur-md mb-6 shadow-xl">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span className="text-xs font-semibold tracking-wider uppercase text-[#f3e5ab]">
            {t('hero_badge')}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight font-serif">
          {t('hero_title')}
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-xl text-gray-300 mb-10 leading-relaxed font-sans">
          {t('hero_subtitle')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => openBookingWithPrefill()}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm sm:text-base font-bold uppercase tracking-wider text-black bg-gradient-to-r from-[#f6e05e] via-[#d4af37] to-[#b7791f] hover:brightness-110 shadow-2xl shadow-[#d4af37]/30 transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5"
          >
            <Sparkles className="w-5 h-5 text-black" />
            <span>{t('btn_book_vip')}</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto px-7 py-4 rounded-xl text-sm sm:text-base font-semibold text-white bg-[#25d366]/20 hover:bg-[#25d366]/30 border border-[#25d366]/50 transition flex items-center justify-center gap-2.5 cursor-pointer shadow-lg"
          >
            <MessageCircle className="w-5 h-5 text-[#25d366]" />
            <span>{t('btn_whatsapp')}</span>
          </button>
        </div>

        {/* Key Trust Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-white/10 text-left">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
            <ShieldCheck className="w-7 h-7 text-[#d4af37] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white uppercase">Licensed Only</div>
              <div className="text-[11px] text-gray-400">100% legal venues</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
            <Zap className="w-7 h-7 text-[#d4af37] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white uppercase">Queue-Skip VIP</div>
              <div className="text-[11px] text-gray-400">Direct booth escort</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
            <Star className="w-7 h-7 text-[#d4af37] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white uppercase">Stag Specialists</div>
              <div className="text-[11px] text-gray-400">Packages from €220</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
            <MessageCircle className="w-7 h-7 text-[#25d366] shrink-0" />
            <div>
              <div className="text-xs font-bold text-white uppercase">24/7 Concierge</div>
              <div className="text-[11px] text-gray-400">Instant WhatsApp reply</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
