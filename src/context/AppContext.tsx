import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Club,
  Package,
  Reservation,
  Customer,
  PaymentGateway,
  Banner,
  MediaItem,
  MenuItem,
  Testimonial,
  FAQ,
  SiteSettings,
  ActivityLogItem,
  Language,
  ReservationStatus,
  ContactMessage
} from '../types';
import {
  INITIAL_CLUBS,
  INITIAL_PACKAGES,
  INITIAL_RESERVATIONS,
  INITIAL_CUSTOMERS,
  INITIAL_PAYMENT_GATEWAYS,
  INITIAL_BANNERS,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
  INITIAL_MEDIA,
  INITIAL_SETTINGS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_MENUS
} from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  currentView: 'public' | 'admin';
  setCurrentView: (view: 'public' | 'admin') => void;
  adminSection: string;
  setAdminSection: (sec: string) => void;

  clubs: Club[];
  setClubs: React.Dispatch<React.SetStateAction<Club[]>>;
  packages: Package[];
  setPackages: React.Dispatch<React.SetStateAction<Package[]>>;
  reservations: Reservation[];
  customers: Customer[];
  paymentGateways: PaymentGateway[];
  setPaymentGateways: React.Dispatch<React.SetStateAction<PaymentGateway[]>>;
  banners: Banner[];
  setBanners: React.Dispatch<React.SetStateAction<Banner[]>>;
  media: MediaItem[];
  setMedia: React.Dispatch<React.SetStateAction<MediaItem[]>>;
  menus: MenuItem[];
  setMenus: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  testimonials: Testimonial[];
  faqs: FAQ[];
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  activityLogs: ActivityLogItem[];
  contactMessages: ContactMessage[];
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'created_at' | 'status'>) => void;

  addReservation: (resData: any) => Reservation;
  updateReservationStatus: (id: number, status: ReservationStatus, adminNotes?: string) => void;
  deleteReservation: (id: number) => void;
  addActivityLog: (action: string, description: string) => void;

  selectedClubForModal: Club | null;
  setSelectedClubForModal: (club: Club | null) => void;
  selectedPackageForModal: Package | null;
  setSelectedPackageForModal: (pkg: Package | null) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  bookingPrefill: { clubId?: number; packageId?: number } | null;
  openBookingWithPrefill: (clubId?: number, packageId?: number) => void;

  ageConfirmed: boolean;
  confirmAge: () => void;
  activeLegalModal: 'privacy' | 'terms' | 'cookies' | 'disclaimer' | null;
  setActiveLegalModal: (modal: 'privacy' | 'terms' | 'cookies' | 'disclaimer' | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load stored state or fallbacks
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('bcn_lang') as Language) || 'en';
  });

  const [currentView, setCurrentView] = useState<'public' | 'admin'>(() => {
    return window.location.hash.includes('admin') ? 'admin' : 'public';
  });

  const [adminSection, setAdminSection] = useState<string>('dashboard');

  const [ageConfirmed, setAgeConfirmed] = useState<boolean>(() => {
    return localStorage.getItem('bcn_age_verified') === 'true';
  });

  const [clubs, setClubs] = useState<Club[]>(() => {
    const saved = localStorage.getItem('bcn_clubs');
    return saved ? JSON.parse(saved) : INITIAL_CLUBS;
  });

  const [packages, setPackages] = useState<Package[]>(() => {
    const saved = localStorage.getItem('bcn_packages');
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('bcn_reservations');
    return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('bcn_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>(() => {
    const saved = localStorage.getItem('bcn_gateways');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENT_GATEWAYS;
  });

  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem('bcn_banners');
    return saved ? JSON.parse(saved) : INITIAL_BANNERS;
  });

  const [media, setMedia] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem('bcn_media');
    return saved ? JSON.parse(saved) : INITIAL_MEDIA;
  });

  const [menus, setMenus] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('bcn_menus');
    return saved ? JSON.parse(saved) : INITIAL_MENUS;
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('bcn_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(INITIAL_ACTIVITY_LOGS);

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([
    {
      id: 1,
      name: "Jean-Paul Marat",
      email: "jp.marat@outlook.fr",
      phone: "+33 699 123456",
      subject: "Stag group of 14 coming next weekend",
      message: "Bonjour, we are flying to Barcelona with 14 guys on Friday. Can you provide custom limousine pickup from El Prat airport and VIP table at Bacarra?",
      status: "new",
      created_at: "2026-09-25T07:22:00Z"
    }
  ]);

  // Modal controls
  const [selectedClubForModal, setSelectedClubForModal] = useState<Club | null>(null);
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<Package | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingPrefill, setBookingPrefill] = useState<{ clubId?: number; packageId?: number } | null>(null);
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | 'cookies' | 'disclaimer' | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('bcn_clubs', JSON.stringify(clubs));
  }, [clubs]);

  useEffect(() => {
    localStorage.setItem('bcn_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('bcn_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('bcn_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('bcn_gateways', JSON.stringify(paymentGateways));
  }, [paymentGateways]);

  useEffect(() => {
    localStorage.setItem('bcn_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('bcn_media', JSON.stringify(media));
  }, [media]);

  useEffect(() => {
    localStorage.setItem('bcn_menus', JSON.stringify(menus));
  }, [menus]);

  useEffect(() => {
    localStorage.setItem('bcn_settings', JSON.stringify(settings));
  }, [settings]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bcn_lang', lang);
  };

  const confirmAge = () => {
    setAgeConfirmed(true);
    localStorage.setItem('bcn_age_verified', 'true');
  };

  const t = (key: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return (dict as any)[key] || (TRANSLATIONS.en as any)[key] || key;
  };

  const addActivityLog = (action: string, description: string) => {
    const newLog: ActivityLogItem = {
      id: Date.now(),
      user: "Admin Manager",
      action,
      description,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addActivityLog('settings.updated', 'Site configuration settings updated');
  };

  const addContactMessage = (msg: Omit<ContactMessage, 'id' | 'created_at' | 'status'>) => {
    const newMessage: ContactMessage = {
      ...msg,
      id: Date.now(),
      status: 'new',
      created_at: new Date().toISOString()
    };
    setContactMessages(prev => [newMessage, ...prev]);
    addActivityLog('contact.received', `New inquiry from ${msg.name}: "${msg.subject}"`);
  };

  const openBookingWithPrefill = (clubId?: number, packageId?: number) => {
    setBookingPrefill({ clubId, packageId });
    setIsBookingModalOpen(true);
  };

  const addReservation = (resData: any): Reservation => {
    const ref = `BCN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const deposit = Math.round((resData.total_amount || 0) * (settings.deposit_percentage / 100));

    const club = clubs.find(c => c.id === resData.club_id);
    const pkg = packages.find(p => p.id === resData.package_id);

    const newRes: Reservation = {
      id: Date.now(),
      booking_reference: ref,
      guest_name: resData.guest_name,
      guest_email: resData.guest_email,
      guest_phone: resData.guest_phone,
      guest_whatsapp: resData.guest_whatsapp || resData.guest_phone,
      reservation_date: resData.reservation_date,
      preferred_time: resData.preferred_time || "23:00",
      number_of_guests: Number(resData.number_of_guests) || 2,
      club_id: resData.club_id,
      club_name: club?.name || "Direct Concierge Selection",
      package_id: resData.package_id,
      package_name: pkg?.name || "Custom VIP Table",
      pickup_requested: Boolean(resData.pickup_requested),
      pickup_location: resData.pickup_location,
      pickup_vehicle_type: resData.pickup_vehicle_type,
      total_amount: resData.total_amount || 0,
      deposit_amount: deposit,
      currency: "EUR",
      status: "pending",
      customer_notes: resData.customer_notes,
      admin_notes: "Awaiting WhatsApp concierge confirmation.",
      created_at: new Date().toISOString()
    };

    setReservations(prev => [newRes, ...prev]);

    // Update or add customer
    setCustomers(prev => {
      const existing = prev.find(c => c.email.toLowerCase() === resData.guest_email.toLowerCase());
      if (existing) {
        return prev.map(c => c.id === existing.id ? {
          ...c,
          total_reservations: c.total_reservations + 1,
          total_spend: c.total_spend + newRes.total_amount,
          phone: resData.guest_phone,
          whatsapp: resData.guest_whatsapp || resData.guest_phone
        } : c);
      } else {
        const newCust: Customer = {
          id: Date.now(),
          name: resData.guest_name,
          email: resData.guest_email,
          phone: resData.guest_phone,
          whatsapp: resData.guest_whatsapp || resData.guest_phone,
          total_reservations: 1,
          total_spend: newRes.total_amount,
          notes: "Created via website reservation form",
          created_at: new Date().toISOString()
        };
        return [newCust, ...prev];
      }
    });

    addActivityLog('reservation.created', `New reservation ${ref} created for ${resData.guest_name} (${resData.number_of_guests} guests)`);
    return newRes;
  };

  const updateReservationStatus = (id: number, status: ReservationStatus, adminNotes?: string) => {
    setReservations(prev => prev.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status,
          admin_notes: adminNotes !== undefined ? adminNotes : r.admin_notes
        };
      }
      return r;
    }));
    addActivityLog('reservation.status_changed', `Reservation ID #${id} status changed to ${status}`);
  };

  const deleteReservation = (id: number) => {
    setReservations(prev => prev.filter(r => r.id !== id));
    addActivityLog('reservation.deleted', `Reservation ID #${id} was deleted`);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentView,
        setCurrentView,
        adminSection,
        setAdminSection,
        clubs,
        setClubs,
        packages,
        setPackages,
        reservations,
        customers,
        paymentGateways,
        setPaymentGateways,
        banners,
        setBanners,
        media,
        setMedia,
        menus,
        setMenus,
        testimonials: INITIAL_TESTIMONIALS,
        faqs: INITIAL_FAQS,
        settings,
        updateSettings,
        activityLogs,
        contactMessages,
        addContactMessage,
        addReservation,
        updateReservationStatus,
        deleteReservation,
        addActivityLog,
        selectedClubForModal,
        setSelectedClubForModal,
        selectedPackageForModal,
        setSelectedPackageForModal,
        isBookingModalOpen,
        setIsBookingModalOpen,
        bookingPrefill,
        openBookingWithPrefill,
        ageConfirmed,
        confirmAge,
        activeLegalModal,
        setActiveLegalModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
