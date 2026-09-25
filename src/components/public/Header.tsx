import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu as MenuIcon,
  X,
  Phone,
  MessageCircle,
  Shield,
  Sparkles,
  Globe,
  Settings
} from 'lucide-react';
import { Language } from '../../types';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    settings,
    menus,
    openBookingWithPrefill,
    setCurrentView
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const activeMenuItems = menus.filter(m => m.is_active);

  const handleNavClick = (url: string) => {
    setMobileMenuOpen(false);
    if (url.startsWith('#')) {
      const el = document.querySelector(url);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' }
  ];

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#d4af37]/20 bg-[#090a0f]/90 backdrop-blur-md transition-all">
      {/* Top micro bar for VIP phone & WhatsApp */}
      <div className="hidden md:flex justify-between items-center px-6 py-1.5 text-xs border-b border-white/5 text-gray-400 bg-black/40">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-[#d4af37]">
            <Shield className="w-3.5 h-3.5" />
            <span>Official Licensed Barcelona Venues Only</span>
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400">24/7 VIP Concierge & Fast-Track Booking</span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={`tel:${settings.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 hover:text-[#d4af37] transition"
          >
            <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{settings.phone}</span>
          </a>
          <a
            href={`https://wa.me/${settings.whatsapp_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(settings.whatsapp_prefilled_text)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#25d366] hover:brightness-125 transition font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp VIP</span>
          </a>
          {/* Quick Admin Switch */}
          <button
            onClick={() => setCurrentView('admin')}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-[#d4af37]/20 hover:text-[#f3e5ab] text-gray-300 transition text-[11px] font-medium"
          >
            <Settings className="w-3 h-3 text-[#d4af37]" />
            <span>Admin CMS</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f6e05e] via-[#d4af37] to-[#996515] p-0.5 shadow-lg group-hover:scale-105 transition">
            <div className="w-full h-full bg-[#0b0c10] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
            </div>
          </div>
          <div>
            <div className="font-serif text-lg sm:text-xl font-bold tracking-wider text-white uppercase group-hover:text-[#f3e5ab] transition">
              Strip Clubs <span className="text-[#d4af37]">BCN</span>
            </div>
            <div className="text-[10px] tracking-widest text-gray-400 uppercase">
              VIP Venue Hospitality
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {activeMenuItems.map(item => (
            <a
              key={item.id}
              href={item.url}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.url);
              }}
              className="text-sm font-medium text-gray-300 hover:text-[#d4af37] transition tracking-wide"
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* Actions: Language & VIP CTA */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-gray-300 transition"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="mr-0.5">{currentLangObj.flag}</span>
              <span className="uppercase font-semibold">{currentLangObj.code}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-[#161822] border border-[#d4af37]/30 rounded-xl shadow-2xl py-1 z-50">
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-white/10 transition ${
                      language === l.code ? 'text-[#d4af37] font-semibold bg-[#d4af37]/10' : 'text-gray-300'
                    }`}
                  >
                    <span>{l.flag} {l.label}</span>
                    {language === l.code && <span className="text-[#d4af37]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => openBookingWithPrefill()}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase text-black bg-gradient-to-r from-[#f6e05e] via-[#d4af37] to-[#b7791f] hover:brightness-110 shadow-lg shadow-[#d4af37]/20 transition cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>{t('btn_book_vip')}</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={() => openBookingWithPrefill()}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#d4af37] text-black"
          >
            VIP Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-[#d4af37]/20 bg-[#0d0e14] px-5 py-6 space-y-4 animate-in slide-in-from-top-5">
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <span className="text-xs text-gray-400">Language</span>
            <div className="flex gap-2">
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2.5 py-1 text-xs rounded border ${
                    language === l.code
                      ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#f3e5ab]'
                      : 'border-white/10 text-gray-400'
                  }`}
                >
                  {l.flag} {l.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <nav className="flex flex-col space-y-3">
            {activeMenuItems.map(item => (
              <a
                key={item.id}
                href={item.url}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.url);
                }}
                className="text-base font-medium text-gray-200 hover:text-[#d4af37] transition"
              >
                {item.title}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingWithPrefill();
              }}
              className="w-full py-3 rounded-xl font-semibold text-sm uppercase text-black bg-gradient-to-r from-[#f6e05e] via-[#d4af37] to-[#b7791f]"
            >
              {t('btn_book_vip')}
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCurrentView('admin');
              }}
              className="w-full py-2.5 rounded-xl text-xs text-gray-300 bg-white/5 border border-white/10 flex items-center justify-center gap-2"
            >
              <Settings className="w-4 h-4 text-[#d4af37]" />
              <span>Switch to Admin CMS</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
