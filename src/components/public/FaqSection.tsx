import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { faqs, t } = useApp();
  const [openId, setOpenId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(f =>
    f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-xs font-semibold text-[#f3e5ab] mb-3 uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-[#d4af37]" />
          Clear Answers
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif mb-4">
          {t('faq_title')}
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mb-8">
          {t('faq_sub')}
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. dress code, limo, payment)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#12141c] border border-white/15 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#d4af37] transition"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredFaqs.map(faq => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="rounded-xl border border-white/10 bg-[#12141d] overflow-hidden transition"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition"
              >
                <span className="text-sm sm:text-base font-semibold text-white">
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#d4af37] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 bg-black/20">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
