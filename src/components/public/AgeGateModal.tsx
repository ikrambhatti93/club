import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

export const AgeGateModal: React.FC = () => {
  const { ageConfirmed, confirmAge, settings, t } = useApp();

  if (ageConfirmed || !settings.age_gate_enabled) {
    return null;
  }

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4">
      <div className="relative w-full max-w-lg border border-[#d4af37]/40 bg-[#10121a] p-8 text-center shadow-2xl rounded-2xl">
        {/* Glow effect */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 bg-[#d4af37]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#d4af37] bg-[#1a1c26] text-[#d4af37] shadow-lg">
          <ShieldAlert className="h-10 w-10 text-[#d4af37]" />
        </div>

        <span className="inline-block rounded-full bg-[#d4af37]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#f3e5ab] mb-3">
          Age Restricted Content (18+)
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
          {t('age_gate_title')}
        </h2>

        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
          {t('age_gate_desc')}
        </p>

        <div className="rounded-lg bg-black/50 border border-white/10 p-3 text-xs text-gray-400 mb-8">
          Strictly for lawful adult entertainment venue hospitality, VIP table bookings, and licensed bachelor events. By entering, you confirm you are of legal adult age.
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={confirmAge}
            className="flex-1 py-3.5 px-6 rounded-xl font-semibold text-black bg-gradient-to-r from-[#f6e05e] via-[#d4af37] to-[#b7791f] hover:brightness-110 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle className="w-5 h-5 text-black" />
            <span>{t('age_confirm_btn')}</span>
          </button>

          <button
            onClick={handleExit}
            className="py-3.5 px-6 rounded-xl font-medium text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <XCircle className="w-5 h-5 text-gray-400" />
            <span>{t('age_exit_btn')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
