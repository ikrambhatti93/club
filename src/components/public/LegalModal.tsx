import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck } from 'lucide-react';

export const LegalModal: React.FC = () => {
  const { activeLegalModal, setActiveLegalModal } = useApp();

  if (!activeLegalModal) return null;

  const contentMap: { [key: string]: { title: string; body: React.ReactNode } } = {
    privacy: {
      title: "Privacy Policy (GDPR Compliance)",
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <p>
            This Privacy Policy governs the processing of personal data collected through the Strip Clubs Barcelona website, managed in full compliance with Regulation (EU) 2016/679 (General Data Protection Regulation - GDPR) and Spanish Organic Law 3/2018 (LOPDGDD).
          </p>
          <h4 className="text-white font-bold text-sm">1. Data Controller</h4>
          <p>
            The data controller is BCN VIP Hospitality Services S.L., with registered address at Passeig de Gràcia 45, Barcelona, Spain. Email: reservations@stripclubsbcn.com.
          </p>
          <h4 className="text-white font-bold text-sm">2. Purpose of Collection</h4>
          <p>
            We collect guest names, email addresses, phone numbers, and reservation preferences solely for the purpose of booking VIP table hospitality, limousine transfers, and coordinating venue access.
          </p>
          <h4 className="text-white font-bold text-sm">3. Discreet Processing & Data Minimization</h4>
          <p>
            We strictly practice data minimization. We do not store sensitive payment card details (PAN/CVV). All payment processing is conducted through authorized external providers under bank-level encryption.
          </p>
        </div>
      )
    },
    terms: {
      title: "Terms and Conditions of Service",
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <p>
            By booking through Strip Clubs Barcelona, you agree to these terms governing table reservations, venue admissions, and transport services.
          </p>
          <h4 className="text-white font-bold text-sm">1. Nature of Hospitality Services</h4>
          <p>
            We provide official VIP table reservations, bottle hospitality packages, and private limousine bookings for licensed entertainment establishments in Barcelona. We do NOT provide, broker, or facilitate sexual services, escort services, or unlawful activities of any kind.
          </p>
          <h4 className="text-white font-bold text-sm">2. Minimum Age & Venue Admission</h4>
          <p>
            All patrons must be at least 18 years of age. A valid government photo ID (passport, national ID, or driver’s license) is mandatory at the door. Venues reserve the standard right of admission in accordance with Catalan nightlife regulations.
          </p>
          <h4 className="text-white font-bold text-sm">3. Cancellation & Deposit Policy</h4>
          <p>
            Deposits are refundable up to 48 hours prior to your scheduled reservation time. Late cancellations or no-shows forfeit the deposit to cover table reservation and transport holding costs.
          </p>
        </div>
      )
    },
    cookies: {
      title: "Cookie Policy",
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <p>
            Our website uses strictly necessary cookies to ensure basic platform functionality, remember language selections, and store age verification status.
          </p>
          <h4 className="text-white font-bold text-sm">1. Essential Cookies</h4>
          <p>
            These cookies are required for site security, session maintenance, and storing whether you have confirmed you are 18 years of age or older.
          </p>
          <h4 className="text-white font-bold text-sm">2. Third-Party Analytical Cookies</h4>
          <p>
            We utilize anonymous aggregated web analytics to measure page load performance, mobile responsiveness, and reservation conversion rates without tracking individual identity.
          </p>
        </div>
      )
    },
    disclaimer: {
      title: "Lawful Adult Entertainment Notice & Compliance",
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <p>
            Strip Clubs Barcelona operates strictly as a legal hospitality and nightlife concierge service for licensed adult entertainment cabaret clubs, gentlemen's lounges, and private nightlife venues in Barcelona, Spain.
          </p>
          <div className="p-3 rounded-lg bg-black/60 border border-[#d4af37]/30 text-xs text-[#f3e5ab]">
            In strict compliance with Spanish Penal Code regulations, municipal ordinances, and international payment brand policies, this platform strictly prohibits and disavows prostitution, sexual solicitation, escort services, or any non-consensual exploitation.
          </div>
          <p>
            All venue performers, hostesses, and staff work under registered legal contracts. Patrons violating venue codes of conduct or demonstrating disrespectful behavior will be removed immediately without refund.
          </p>
        </div>
      )
    }
  };

  const modalData = contentMap[activeLegalModal] || contentMap.privacy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/15 bg-[#10121a] shadow-2xl p-6 sm:p-8 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
            <h3 className="text-lg font-bold text-white font-serif">{modalData.title}</h3>
          </div>
          <button
            onClick={() => setActiveLegalModal(null)}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 pr-2">
          {modalData.body}
        </div>

        <div className="pt-4 mt-6 border-t border-white/10 flex justify-end">
          <button
            onClick={() => setActiveLegalModal(null)}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
