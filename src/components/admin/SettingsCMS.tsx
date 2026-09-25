import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Save,
  CheckCircle2,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Globe,
  DollarSign,
  ShieldCheck,
  Search
} from 'lucide-react';
import { Language } from '../../types';

export const SettingsCMS: React.FC = () => {
  const { settings, updateSettings } = useApp();
  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-serif">
            Central Application Settings
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Global business configuration. Changes immediately take effect on the public website and reservation system.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#25d366]/20 border border-[#25d366]/40 text-[#25d366] text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact & Concierge Information */}
        <div className="rounded-2xl border border-white/10 bg-[#12141d] p-6 space-y-4">
          <h2 className="text-base font-bold text-white font-serif flex items-center gap-2 border-b border-white/10 pb-3">
            <Phone className="w-4 h-4 text-[#d4af37]" />
            <span>Contact & WhatsApp Concierge Settings</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                WhatsApp Concierge Number (with international prefix)
              </label>
              <input
                type="text"
                required
                value={form.whatsapp_number}
                onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
              />
              <span className="text-[10px] text-gray-500 mt-0.5 block">Used for all floating CTAs and booking dispatch links</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Public Inquiry Phone Number
              </label>
              <input
                type="text"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              WhatsApp Pre-filled Customer Message
            </label>
            <input
              type="text"
              value={form.whatsapp_prefilled_text}
              onChange={(e) => setForm({ ...form, whatsapp_prefilled_text: e.target.value })}
              className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Admin Notification Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Operating Schedule Label
              </label>
              <input
                type="text"
                value={form.opening_hours}
                onChange={(e) => setForm({ ...form, opening_hours: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Central Office Address
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
            />
          </div>
        </div>

        {/* Reservation Rules & Compliance */}
        <div className="rounded-2xl border border-white/10 bg-[#12141d] p-6 space-y-4">
          <h2 className="text-base font-bold text-white font-serif flex items-center gap-2 border-b border-white/10 pb-3">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>Reservation Rules & 18+ Age Verification</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Deposit Requirement (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={form.deposit_percentage}
                onChange={(e) => setForm({ ...form, deposit_percentage: Number(e.target.value) })}
                className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
              />
              <span className="text-[10px] text-gray-500 mt-0.5 block">Standard is 20%</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Default Currency Code
              </label>
              <input
                type="text"
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Age Gate Status
              </label>
              <div className="flex items-center gap-3 h-10">
                <label className="flex items-center gap-2 text-xs text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.age_gate_enabled}
                    onChange={(e) => setForm({ ...form, age_gate_enabled: e.target.checked })}
                    className="w-4 h-4 accent-[#d4af37]"
                  />
                  <span>Require 18+ verification modal</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Global SEO Defaults */}
        <div className="rounded-2xl border border-white/10 bg-[#12141d] p-6 space-y-4">
          <h2 className="text-base font-bold text-white font-serif flex items-center gap-2 border-b border-white/10 pb-3">
            <Search className="w-4 h-4 text-[#d4af37]" />
            <span>Default Search Engine Optimization (SEO)</span>
          </h2>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Default Meta Title (Title Tag)
            </label>
            <input
              type="text"
              value={form.seo_default_title}
              onChange={(e) => setForm({ ...form, seo_default_title: e.target.value })}
              className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Default Meta Description
            </label>
            <textarea
              rows={3}
              value={form.seo_default_description}
              onChange={(e) => setForm({ ...form, seo_default_description: e.target.value })}
              className="w-full p-2.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#f6e05e] via-[#d4af37] to-[#b7791f] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4 text-black" />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
