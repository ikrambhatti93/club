import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageCircle, Sparkles } from 'lucide-react';

export const WhatsAppStickyCTA: React.FC = () => {
  const { settings, openBookingWithPrefill, t } = useApp();

  const handleWhatsApp = () => {
    const cleanNumber = settings.whatsapp_number.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(settings.whatsapp_prefilled_text)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Floating Desktop & Tablet WhatsApp Concierge Button */}
      <aside aria-label="WhatsApp VIP Concierge" className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={handleWhatsApp}
          className="group flex items-center gap-3 px-5 py-3 rounded-full bg-[#25d366] text-black shadow-2xl hover:scale-105 hover:brightness-110 transition-all duration-300 font-bold text-xs uppercase tracking-wider cursor-pointer"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-black" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full animate-ping" />
          </div>
          <span>{t('floating_whatsapp')}</span>
        </button>
      </aside>

      {/* Sticky Mobile Bottom Bar (Thumb-friendly booking + WhatsApp) */}
      <aside aria-label="Mobile Navigation and Booking" className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0c0d12]/95 backdrop-blur-lg border-t border-[#d4af37]/30 p-2.5 px-4 flex items-center gap-3 shadow-2xl">
        <button
          onClick={handleWhatsApp}
          className="flex-1 py-3 px-3 rounded-xl bg-[#25d366] text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-black" />
          <span>WhatsApp VIP</span>
        </button>

        <button
          onClick={() => openBookingWithPrefill()}
          className="flex-1 py-3 px-3 rounded-xl bg-gradient-to-r from-[#f6e05e] via-[#d4af37] to-[#b7791f] text-black text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-black" />
          <span>Book VIP Table</span>
        </button>
      </aside>
    </>
  );
};
