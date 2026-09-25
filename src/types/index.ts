export type Language = 'en' | 'es' | 'fr';

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';

export interface Club {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  address: string;
  neighborhood: string; // Eixample, Gothic Quarter, Port Olímpic, Les Corts
  city: string;
  opening_hours: string;
  phone: string;
  website: string;
  map_url: string;
  featured_image: string;
  gallery_images: string[];
  facilities: string[];
  dress_code: string;
  entry_fee: number;
  is_featured: boolean;
  status: 'active' | 'inactive';
  rating: number;
  reviews_count: number;
  vip_zones: string[];
}

export interface PackageOption {
  id: number;
  package_id: number;
  option_name: string;
  description: string;
  price: number;
  is_required: boolean;
  default_quantity: number;
  max_quantity: number;
  is_active: boolean;
}

export interface Package {
  id: number;
  name: string;
  slug: string;
  category: 'Stag Party' | 'VIP Table' | 'Bachelor Elite' | 'Couple' | 'Group' | 'Economy';
  short_description: string;
  full_description: string;
  regular_price: number;
  sale_price?: number;
  currency: string;
  min_guests: number;
  max_guests: number;
  duration: string;
  inclusions: string[];
  exclusions: string[];
  featured_image: string;
  gallery_images: string[];
  is_featured: boolean;
  is_active: boolean;
  badge?: string;
  options: PackageOption[];
}

export interface ReservationItem {
  id?: number;
  package_option_id?: number;
  item_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Reservation {
  id: number;
  booking_reference: string;
  customer_id?: number;
  club_id?: number;
  club_name?: string;
  package_id?: number;
  package_name?: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  guest_whatsapp?: string;
  reservation_date: string;
  preferred_time: string;
  number_of_guests: number;
  pickup_requested: boolean;
  pickup_location?: string;
  pickup_vehicle_type?: string;
  total_amount: number;
  deposit_amount: number;
  currency: string;
  status: ReservationStatus;
  customer_notes?: string;
  admin_notes?: string;
  created_at: string;
  items?: ReservationItem[];
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  total_reservations: number;
  total_spend: number;
  notes?: string;
  created_at: string;
}

export interface PaymentGateway {
  id: number;
  name: string;
  provider: 'stripe' | 'redsys' | 'bank_transfer' | 'cash_on_arrival';
  enabled: boolean;
  test_mode: boolean;
  public_key?: string;
  secret_key?: string;
  webhook_secret?: string;
  description: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  desktop_image: string;
  mobile_image?: string;
  button_text: string;
  button_url: string;
  secondary_button_text?: string;
  secondary_button_url?: string;
  placement: 'homepage_hero' | 'packages_banner' | 'promo_bar';
  is_active: boolean;
  sort_order: number;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  seo_title: string;
  meta_description: string;
  status: 'published' | 'draft';
  updated_at: string;
}

export interface MediaItem {
  id: number;
  filename: string;
  original_name: string;
  url: string;
  mime_type: string;
  size_kb: number;
  folder: 'clubs' | 'packages' | 'gallery' | 'banners' | 'general';
  alt_text: string;
}

export interface MenuItem {
  id: number;
  title: string;
  url: string;
  target?: string;
  sort_order: number;
  is_active: boolean;
}

export interface Testimonial {
  id: number;
  customer_name: string;
  customer_country: string;
  event_type: string;
  text: string;
  rating: number;
  date: string;
}

export interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  created_at: string;
}

export interface SiteSettings {
  site_name: string;
  tagline: string;
  phone: string;
  whatsapp_number: string;
  whatsapp_prefilled_text: string;
  email: string;
  address: string;
  opening_hours: string;
  currency: string;
  default_language: Language;
  age_gate_enabled: boolean;
  minimum_age: number;
  deposit_percentage: number;
  google_maps_url: string;
  instagram_url: string;
  telegram_url: string;
  seo_default_title: string;
  seo_default_description: string;
}

export interface ActivityLogItem {
  id: number;
  user: string;
  action: string;
  description: string;
  timestamp: string;
}
