import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/public/Header';
import { HeroSection } from './components/public/HeroSection';
import { QuickReservationWidget } from './components/public/QuickReservationWidget';
import { FeaturedClubs } from './components/public/FeaturedClubs';
import { PackagesSection } from './components/public/PackagesSection';
import { WhyChooseUs } from './components/public/WhyChooseUs';
import { NightlifeGuide } from './components/public/NightlifeGuide';
import { GallerySection } from './components/public/GallerySection';
import { TestimonialsSection } from './components/public/TestimonialsSection';
import { FaqSection } from './components/public/FaqSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { WhatsAppStickyCTA } from './components/public/WhatsAppStickyCTA';
import { AgeGateModal } from './components/public/AgeGateModal';
import { ClubDetailModal } from './components/public/ClubDetailModal';
import { PackageDetailModal } from './components/public/PackageDetailModal';
import { ReservationModal } from './components/public/ReservationModal';
import { LegalModal } from './components/public/LegalModal';
import { AdminLayout } from './components/admin/AdminLayout';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  if (currentView === 'admin') {
    return <AdminLayout />;
  }

  return (
    <div className="min-h-screen bg-[#08090c] text-gray-200 selection:bg-[#d4af37]/30 selection:text-[#f3e5ab]">
      {/* Age Confirmation Gate */}
      <AgeGateModal />

      {/* Public Header */}
      <Header />

      {/* Main Sections */}
      <main>
        <HeroSection />
        <QuickReservationWidget />
        <FeaturedClubs />
        <PackagesSection />
        <WhyChooseUs />
        <NightlifeGuide />
        <GallerySection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating & Sticky CTAs */}
      <WhatsAppStickyCTA />

      {/* Interactive Modals */}
      <ClubDetailModal />
      <PackageDetailModal />
      <ReservationModal />
      <LegalModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
