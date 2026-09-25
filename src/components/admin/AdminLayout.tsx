import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Building2,
  Gift,
  CreditCard,
  Settings,
  Image,
  Menu as MenuIcon,
  Activity,
  Server,
  LogOut,
  ExternalLink,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { ReservationsManager } from './ReservationsManager';
import { ClubsManager } from './ClubsManager';
import { PackagesManager } from './PackagesManager';
import { PaymentGatewaysCMS } from './PaymentGatewaysCMS';
import { SettingsCMS } from './SettingsCMS';
import { MediaLibrary } from './MediaLibrary';
import { DeploymentGuideView } from './DeploymentGuideView';

export const AdminLayout: React.FC = () => {
  const { adminSection, setAdminSection, setCurrentView, reservations, clubs, packages } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const pendingCount = reservations.filter(r => r.status === 'pending').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      id: 'reservations',
      label: 'Reservations',
      icon: <CalendarCheck className="w-4 h-4" />,
      badge: pendingCount > 0 ? `${pendingCount} new` : undefined
    },
    { id: 'clubs', label: 'Clubs CMS', icon: <Building2 className="w-4 h-4" />, count: clubs.length },
    { id: 'packages', label: 'Packages CMS', icon: <Gift className="w-4 h-4" />, count: packages.length },
    { id: 'media', label: 'Media Library', icon: <Image className="w-4 h-4" /> },
    { id: 'payments', label: 'Payment Gateways', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'settings', label: 'Site Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'deploy', label: 'Hostinger & Git Guide', icon: <Server className="w-4 h-4" />, highlight: true }
  ];

  const renderContent = () => {
    switch (adminSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'reservations':
        return <ReservationsManager />;
      case 'clubs':
        return <ClubsManager />;
      case 'packages':
        return <PackagesManager />;
      case 'payments':
        return <PaymentGatewaysCMS />;
      case 'settings':
        return <SettingsCMS />;
      case 'media':
        return <MediaLibrary />;
      case 'deploy':
        return <DeploymentGuideView />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-gray-200 flex flex-col md:flex-row font-sans">
      {/* Sidebar for Desktop */}
      <aside className="w-64 bg-[#0d0f17] border-r border-white/10 hidden md:flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f6e05e] to-[#b7791f] p-0.5 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              <div>
                <span className="font-serif font-bold text-sm text-white tracking-wide block">
                  BCN VIP CMS
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                  Admin Panel
                </span>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1">
            {navItems.map(item => {
              const isActive = adminSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAdminSection(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#d4af37]/20 to-[#d4af37]/5 text-[#f3e5ab] border border-[#d4af37]/40 shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-[#d4af37]' : 'text-gray-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d4af37] text-black">
                      {item.badge}
                    </span>
                  )}
                  {item.count !== undefined && !item.badge && (
                    <span className="text-[11px] text-gray-500 font-mono">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={() => setCurrentView('public')}
            className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>View Public Website</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0d0f17] border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#d4af37]" />
          <span className="font-serif font-bold text-sm text-white">BCN VIP CMS</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('public')}
            className="text-xs text-[#d4af37] font-semibold px-2.5 py-1 rounded bg-white/5"
          >
            Website
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded-lg bg-white/5 text-gray-300"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden bg-[#10121d] border-b border-white/10 p-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setAdminSection(item.id);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-medium ${
                adminSection === item.id ? 'bg-[#d4af37]/20 text-[#f3e5ab]' : 'text-gray-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d4af37] text-black">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto max-h-screen p-4 sm:p-8">
        {renderContent()}
      </main>
    </div>
  );
};
