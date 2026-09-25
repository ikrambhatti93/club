import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Image,
  Upload,
  Trash2,
  Copy,
  Check,
  Search,
  Filter
} from 'lucide-react';
import { MediaItem } from '../../types';

export const MediaLibrary: React.FC = () => {
  const { media, setMedia, addActivityLog } = useApp();
  const [filterFolder, setFilterFolder] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const folders = ['all', 'clubs', 'packages', 'gallery', 'banners'];

  const filteredMedia = media.filter(m => filterFolder === 'all' || m.folder === filterFolder);

  const handleCopyUrl = (id: number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const newItem: MediaItem = {
        id: Date.now(),
        filename: `upload_${Date.now()}.webp`,
        original_name: 'barcelona_vip_event.jpg',
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
        mime_type: 'image/webp',
        size_kb: 178,
        folder: filterFolder === 'all' ? 'gallery' : (filterFolder as any),
        alt_text: 'Newly uploaded Barcelona VIP media asset'
      };
      setMedia(prev => [newItem, ...prev]);
      addActivityLog('media.uploaded', `Uploaded new image: ${newItem.filename}`);
      setIsUploading(false);
    }, 700);
  };

  const handleDelete = (id: number) => {
    setMedia(prev => prev.filter(m => m.id !== id));
    addActivityLog('media.deleted', `Removed image ID #${id}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-serif">
            Media Library & Asset Manager
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Optimized image repository for club showcases, package features, and hero banners.
          </p>
        </div>

        <button
          onClick={handleSimulateUpload}
          disabled={isUploading}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#f6e05e] via-[#d4af37] to-[#b7791f] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Upload className="w-4 h-4 text-black" />
          <span>{isUploading ? 'Uploading...' : 'Upload Image (WebP)'}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-3">
        {folders.map(f => (
          <button
            key={f}
            onClick={() => setFilterFolder(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
              filterFolder === f
                ? 'bg-[#d4af37] text-black'
                : 'text-gray-400 hover:text-white bg-white/5'
            }`}
          >
            {f === 'all' ? 'All Assets' : f}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.map(item => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/10 bg-[#12141d] overflow-hidden group shadow-lg flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden bg-black/50">
              <img
                src={item.url}
                alt={item.alt_text}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-gray-300">
                {item.folder}
              </span>
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-gray-400 font-mono">
                {item.size_kb} KB
              </span>
            </div>

            <div className="p-3">
              <div className="text-xs font-semibold text-white truncate mb-1">
                {item.filename}
              </div>
              <p className="text-[10px] text-gray-500 truncate mb-3">
                {item.alt_text}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <button
                  onClick={() => handleCopyUrl(item.id, item.url)}
                  className="flex items-center gap-1 text-[11px] text-gray-300 hover:text-[#d4af37] transition"
                  title="Copy direct URL"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#25d366]" />
                      <span className="text-[#25d366]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-gray-500 hover:text-red-400 p-1 transition"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
