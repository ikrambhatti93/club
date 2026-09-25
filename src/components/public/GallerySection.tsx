import React, { useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'vip' | 'limo' | 'clubs'>('all');

  const galleryItems = [
    {
      url: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1000&auto=format&fit=crop",
      title: "VIP Crystal Salon — Eixample",
      category: "vip"
    },
    {
      url: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1000&auto=format&fit=crop",
      title: "Atmospheric Velvet Lounge",
      category: "clubs"
    },
    {
      url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop",
      title: "Stretch Limousine City Tour",
      category: "limo"
    },
    {
      url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
      title: "Main Stage Light Show",
      category: "clubs"
    },
    {
      url: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop",
      title: "Champagne Bottle Presentation",
      category: "vip"
    },
    {
      url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
      title: "Exclusive Mezzanine Seating",
      category: "vip"
    }
  ];

  const filtered = activeTab === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <section id="gallery" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-xs font-semibold text-[#f3e5ab] mb-3 uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5 text-[#d4af37]" />
          Visual Tour
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-serif mb-4">
          Atmosphere & VIP Lounges
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          A glimpse into the elegance, private booths, and luxury transport of Barcelona's nightlife.
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'vip', label: 'VIP Salons & Bottles' },
            { id: 'clubs', label: 'Main Stages & Clubs' },
            { id: 'limo', label: 'Limousines & Transport' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#d4af37] text-black shadow-md'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="group relative h-72 rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/50 shadow-xl transition-all duration-300"
          >
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] text-[#f3e5ab] uppercase font-bold tracking-wider mb-1 block">
                {item.category.toUpperCase()}
              </span>
              <h3 className="text-base font-bold text-white font-serif">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
