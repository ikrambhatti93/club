import React from 'react';
import { useApp } from '../../context/AppContext';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials, t } = useApp();

  return (
    <section className="py-24 bg-[#0a0b10] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-xs font-semibold text-[#f3e5ab] mb-3 uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
            Guest Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif mb-4">
            {t('testimonials_title')}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            {t('testimonials_sub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map(item => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-[#12141c] p-6 flex flex-col justify-between hover:border-[#d4af37]/40 transition shadow-xl"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#d4af37]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#d4af37]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-white/10" />
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 italic">
                  "{item.text}"
                </p>
              </div>

              <div className="border-t border-white/5 pt-4">
                <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                  <span>{item.customer_name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25d366]" />
                </div>
                <div className="text-[11px] text-gray-400">{item.customer_country}</div>
                <div className="text-[10px] text-[#d4af37] mt-1 font-medium">{item.event_type} • {item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
