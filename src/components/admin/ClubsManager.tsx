import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  Star,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Club } from '../../types';

export const ClubsManager: React.FC = () => {
  const { clubs, setClubs, addActivityLog } = useApp();

  const [editingClub, setEditingClub] = useState<Partial<Club> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (club: Club) => {
    setEditingClub({ ...club });
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setEditingClub({
      id: Date.now(),
      name: '',
      slug: '',
      short_description: '',
      full_description: '',
      address: 'Carrer de Valencia, 150, 08011 Barcelona',
      neighborhood: 'Eixample',
      city: 'Barcelona',
      opening_hours: '22:30 - 06:00',
      phone: '+34 931 000 000',
      website: 'https://barcelonanightlife.com',
      map_url: 'https://maps.google.com/?q=Barcelona',
      featured_image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1200&auto=format&fit=crop',
      facilities: ['VIP Rooms', 'Valet Parking', 'Champagne Bar'],
      dress_code: 'Smart Casual',
      entry_fee: 25.00,
      is_featured: false,
      status: 'active',
      rating: 4.8,
      reviews_count: 50,
      vip_zones: ['Mezzanine Table', 'Private Booth']
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClub || !editingClub.name) return;

    const slug = editingClub.slug || editingClub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const updated: Club = {
      ...(editingClub as Club),
      slug
    };

    setClubs(prev => {
      const idx = prev.findIndex(c => c.id === updated.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = updated;
        return copy;
      }
      return [updated, ...prev];
    });

    addActivityLog('club.saved', `Club "${updated.name}" was updated in CMS`);
    setIsModalOpen(false);
    setEditingClub(null);
  };

  const handleDelete = (id: number) => {
    const club = clubs.find(c => c.id === id);
    if (confirm(`Are you sure you want to delete club "${club?.name}"?`)) {
      setClubs(prev => prev.filter(c => c.id !== id));
      addActivityLog('club.deleted', `Club "${club?.name}" deleted from database`);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-serif">
            Clubs & Venues CMS
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage Barcelona adult entertainment venue listings, photos, entry fees, and facilities.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#f6e05e] via-[#d4af37] to-[#b7791f] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Add New Club</span>
        </button>
      </div>

      {/* Grid of Clubs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map(club => (
          <div
            key={club.id}
            className="rounded-2xl border border-white/10 bg-[#12141d] overflow-hidden flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="relative h-44 overflow-hidden">
                <img
                  src={club.featured_image}
                  alt={club.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141d] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 border border-white/10 text-[10px] text-white">
                  {club.neighborhood}
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#d4af37] text-black text-[11px] font-bold">
                  ★ {club.rating}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-white font-serif">
                    {club.name}
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                    club.status === 'active' ? 'bg-[#25d366]/20 text-[#25d366]' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {club.status}
                  </span>
                </div>

                <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                  {club.short_description}
                </p>

                <div className="text-[11px] text-gray-400 space-y-1 border-t border-white/5 pt-2">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#d4af37]" />
                    <span className="truncate">{club.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#d4af37]" />
                    <span>{club.opening_hours}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between gap-2 mt-2">
              <span className="text-xs font-bold text-[#f3e5ab]">
                Entry: €{club.entry_fee.toFixed(2)}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(club)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition"
                  title="Edit Club"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#d4af37]" />
                </button>

                <button
                  onClick={() => handleDelete(club.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                  title="Delete Club"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && editingClub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-[#d4af37]/40 bg-[#12141d] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-white font-serif mb-4 pb-2 border-b border-white/10">
              {editingClub.id ? 'Edit Club Details' : 'Create New Club'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Club Name *</label>
                  <input
                    type="text"
                    required
                    value={editingClub.name || ''}
                    onChange={(e) => setEditingClub({ ...editingClub, name: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Neighborhood *</label>
                  <input
                    type="text"
                    required
                    value={editingClub.neighborhood || ''}
                    onChange={(e) => setEditingClub({ ...editingClub, neighborhood: e.target.value })}
                    placeholder="e.g. Eixample, Gothic Quarter"
                    className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingClub.short_description || ''}
                  onChange={(e) => setEditingClub({ ...editingClub, short_description: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Full Address *</label>
                  <input
                    type="text"
                    required
                    value={editingClub.address || ''}
                    onChange={(e) => setEditingClub({ ...editingClub, address: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Opening Hours *</label>
                  <input
                    type="text"
                    required
                    value={editingClub.opening_hours || ''}
                    onChange={(e) => setEditingClub({ ...editingClub, opening_hours: e.target.value })}
                    placeholder="22:00 - 06:00"
                    className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">General Entry Fee (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingClub.entry_fee || 0}
                    onChange={(e) => setEditingClub({ ...editingClub, entry_fee: parseFloat(e.target.value) })}
                    className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={editingClub.rating || 4.8}
                    onChange={(e) => setEditingClub({ ...editingClub, rating: parseFloat(e.target.value) })}
                    className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Status</label>
                  <select
                    value={editingClub.status || 'active'}
                    onChange={(e) => setEditingClub({ ...editingClub, status: e.target.value as any })}
                    className="w-full h-10 px-3 rounded-lg bg-black/60 border border-white/15 text-xs text-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Featured Image URL</label>
                <input
                  type="url"
                  value={editingClub.featured_image || ''}
                  onChange={(e) => setEditingClub({ ...editingClub, featured_image: e.target.value })}
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
                  Save Club
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
