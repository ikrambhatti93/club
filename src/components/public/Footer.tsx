import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Phone, Mail, MessageCircle, MapPin, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setActiveLegalModal, setCurrentView, t } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#050608] border-t border-[#d4af37]/20 text-gray-400 pt-16 pb-24 md:pb-16 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f6e05e] via-[#d4af37] to-[#996515] p-0.5 shadow-lg">
                <div className="w-full h-full bg-[#0b0c10] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                </div>
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-wider text-white uppercase">
                  Strip Clubs <span className="text-[#d4af37]">BCN</span>
                </span>
                <span className="block text-[10px] tracking-widest text-gray-400 uppercase">
                  VIP Venue Hospitality
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              The Catalan capital's trusted portal for verified adult entertainment establishments, VIP table hospitality, and discrete stag party reservations.
            </p>

            <div className="pt-2 text-xs text-gray-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{settings.email}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-serif">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#home" className="hover:text-[#d4af37] transition">Home</a></li>
              <li><a href="#clubs" className="hover:text-[#d4af37] transition">Featured Clubs</a></li>
              <li><a href="#packages" className="hover:text-[#d4af37] transition">VIP Stag Packages</a></li>
              <li><a href="#gallery" className="hover:text-[#d4af37] transition">Nightlife Gallery</a></li>
              <li><a href="#faq" className="hover:text-[#d4af37] transition">FAQ & Etiquette</a></li>
              <li><a href="#contact" className="hover:text-[#d4af37] transition">24/7 Concierge Contact</a></li>
            </ul>
          </div>

          {/* Col 4: Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-serif">
              Legal & Compliance
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveLegalModal('privacy')}
                  className="hover:text-[#d4af37] transition text-left cursor-pointer"
                >
                  Privacy Policy (GDPR)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveLegalModal('terms')}
                  className="hover:text-[#d4af37] transition text-left cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveLegalModal('cookies')}
                  className="hover:text-[#d4af37] transition text-left cursor-pointer"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveLegalModal('disclaimer')}
                  className="hover:text-[#d4af37] transition text-left cursor-pointer"
                >
                  Lawful Entertainment Notice
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="text-[#d4af37] hover:underline transition text-left cursor-pointer flex items-center gap-1 mt-2"
                >
                  <span>CMS Portal Access</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: VIP Newsletter */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-serif">
              VIP Guest Club
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Subscribe for exclusive weekend guestlist perks and secret cabaret events.
            </p>
            {newsletterSuccess ? (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#25d366]/10 border border-[#25d366]/30 text-xs text-[#25d366]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-black/70 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-white/10 hover:bg-[#d4af37] hover:text-black text-xs font-semibold text-white transition"
                >
                  Join VIP Guestlist
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Accepted Payment Methods & Strict Discretion */}
        <div className="border-t border-white/10 pt-8 pb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="font-semibold text-white">Accepted VIP Settlement Methods:</span>
            <div className="flex items-center gap-2 pl-2">
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-300 font-mono">VISA</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-300 font-mono">MASTERCARD</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-300 font-mono">APPLE PAY</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-300 font-mono">SEPA WIRE</span>
            </div>
          </div>

          <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Strict 18+ Age Verification Required on Door</span>
          </div>
        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="border-t border-white/5 pt-6 text-[11px] text-gray-400 space-y-2">
          <p className="leading-relaxed">
            {t('footer_disclaimer')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-gray-400 pt-2">
            <span>© {new Date().getFullYear()} Strip Clubs Barcelona. All rights reserved. Registered Catalan Hospitality & Tourism Services.</span>
            <span className="mt-1 sm:mt-0 text-[10px] text-gray-400">Hostinger PHP/MySQL Production Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
