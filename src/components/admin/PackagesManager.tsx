import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Gift,
  Plus,
  Edit2,
  Trash2,
  Users,
  Clock,
  Sparkles,
  Check
} from 'lucide-react';
import { Package } from '../../types';

export const PackagesManager: React.FC = () => {
  const { packages, setPackages, addActivityLog } = useApp();
  const [editingPkg, setEditingPkg] = useState<Partial<Package> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (pkg: Package) => {
    setEditingPkg({ ...pkg });
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setEditingPkg({
      id: Date.now(),
      name: '',
      slug: '',
      category: 'Stag Party',
      short_description: '',
      full_description: '',
      regular_price: 450.00,
      sale_price: 390.00,
      currency: 'EUR',
      min_guests: 4,
      max_guests: 10,
      duration: 'Full Night Entry',
      inclusions: ['VIP Queue Skip', 'Reserved Booth', '1 Premium Spirit Bottle', 'Soft Mixers'],
      exclusions: [],
      featured_image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
      gallery_images: [],
      is_featured: false,
      is_active: true,
      badge: 'New Offer',
      options: []
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg || !editingPkg.name) return;

    const slug = editingPkg.slug || editingPkg.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const updated: Package = {
      ...(editingPkg as Package),
      slug
    };

    setPackages(prev => {
      const idx = prev.findIndex(p => p.id === updated.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = updated;
        return copy;
      }
      return [updated, ...prev];
    });

    addActivityLog('package.saved', `VIP Package "${updated.name}" was saved in CMS`);
    setIsModalOpen(false);
    setEditingPkg(null);
  };

  const handleDelete = (id: number) => {
    const pkg = packages.find(p => p.id === id);
    if (confirm(`Are you sure you want to delete package "${pkg?.name}"?`)) {
      setPackages(prev => prev.filter(p => p.id !== id));
      addActivityLog('package.deleted', `Package "${pkg?.name}" was removed`);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-serif">
            VIP Packages & Stag Offers CMS
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Configure stag party packages, champagne bottle service prices, inclusions, and add-ons.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#f6e05e] via-[#d4af37] to-[#b7791f] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Add New Package</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <div
            key={pkg.id}
            className="rounded-2xl border border-white/10 bg-[#12141d] overflow-hidden flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="relative h-40 overflow-hidden">
                <img
                  src={pkg.featured_image}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141d] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 border border-white/10 text-[10px] text-white">
                  {pkg.category}
                </div>
                {pkg.badge && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#d4af37] text-black text-[10px] font-extrabold uppercase">
                    {pkg.badge}
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-white font-serif mb-1">
                  {pkg.name}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                  {pkg.short_description}
                </p>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-extrabold text-[#f3e5ab]">
                    €{pkg.sale_price || pkg.regular_price}
                  </span>
                  {pkg.sale_price && (
                    <span className="text-xs text-gray-500 line-through">
                      €{pkg.regular_price}
                    </span>
                  )}
                  <span className="text-[11px] text-gray-400 ml-auto">
                    {pkg.min_guests}-{pkg.max_guests} guests
                  </span>
                </div>

                <div className="space-y-1 text-xs text-gray-300 border-t border-white/5 pt-3">
                  {pkg.inclusions.slice(0, 3).map((inc, i) => (
                    <div key={i} className="flex items-center gap-1.5 truncate">
                      <Check className="w-3.5 h-3.5 text-[#25d366] shrink-0" />
                      <span className="truncate">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between mt-2">
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                pkg.is_active ? 'bg-[#25d366]/20 text-[#25d366]' : 'bg-red-500/20 text-red-400'
              }`}>
                {pkg.is_active ? 'Active' : 'Disabled'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#d4af37]" />
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-[#d4af37]/40 bg-[#12141d] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white font-serif mb-4 pb-2 border-b border-white/10">
              {editingPkg.id ? 'Edit Package' : 'Create New Package'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Package Name *</label>
                  <input
                    type="text"
                    required
                    value={editingPkg.name || ''}
                    onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Category *</label>
                  <select
                    value={editingPkg.category || 'Stag Party'}
                    onChange={(e) => setEditingPkg({ ...editingPkg, category: e.target.value as any })}
                    className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                  >
                    <option value="Stag Party">Stag Party</option>
                    <option value="VIP Table">VIP Table</option>
                    <option value="Bachelor Elite">Bachelor Elite</option>
                    <option value="Couple">Couple</option>
                    <option value="Group">Group</option>
                    <option value="Economy">Economy</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Regular Price (€) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingPkg.regular_price || 0}
                    onChange={(e) => setEditingPkg({ ...editingPkg, regular_price: parseFloat(e.target.value) })}
                    className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Sale / Discount Price (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingPkg.sale_price || ''}
                    onChange={(e) => setEditingPkg({ ...editingPkg, sale_price: e.target.value ? parseFloat(e.target.value) : undefined })}
                    className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={editingPkg.badge || ''}
                    onChange={(e) => setEditingPkg({ ...editingPkg, badge: e.target.value })}
                    placeholder="e.g. Most Popular"
                    className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingPkg.short_description || ''}
                  onChange={(e) => setEditingPkg({ ...editingPkg, short_description: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Featured Image URL</label>
                <input
                  type="url"
                  value={editingPkg.featured_image || ''}
                  onChange={(e) => setEditingPkg({ ...editingPkg, featured_image: e.target.value })}
                  className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 text-xs text-gray-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#d4af37] text-black font-bold text-xs uppercase"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
