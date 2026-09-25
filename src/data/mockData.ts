import {
  Club,
  Package,
  Reservation,
  Customer,
  PaymentGateway,
  Banner,
  Page,
  MediaItem,
  MenuItem,
  Testimonial,
  FAQ,
  SiteSettings,
  ActivityLogItem,
  ContactMessage
} from '../types';

export const INITIAL_CLUBS: Club[] = [
  {
    id: 1,
    name: "Club Bacarra Barcelona",
    slug: "club-bacarra-barcelona",
    short_description: "Barcelona's iconic high-end cabaret and gentlemen's lounge in central Eixample, boasting lavish private VIP suites.",
    full_description: "Established as one of the Catalan capital's most prestigious adult entertainment destinations, Club Bacarra blends timeless European glamour with cutting-edge nightlife hospitality. Located just off Passeig de Gràcia, it features world-class performers, an ultra-discrete VIP mezzanine, curated champagne cellar, and customized corporate & bachelor accommodations.",
    address: "Carrer de Balmes, 12, 08007 Barcelona",
    neighborhood: "Eixample",
    city: "Barcelona",
    opening_hours: "22:00 - 06:00 (Daily)",
    phone: "+34 932 154 892",
    website: "https://bacarrabarcelona.com",
    map_url: "https://maps.google.com/?q=Carrer+de+Balmes+12+Barcelona",
    featured_image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop"
    ],
    facilities: ["Private VIP Salons", "Valet Parking", "Champagne Cellar", "Shisha Lounge", "Multilingual Hostesses", "Discreet Security Entrance"],
    dress_code: "Smart Casual / Elegant (No sport shorts or beachwear)",
    entry_fee: 30.00,
    is_featured: true,
    status: "active",
    rating: 4.9,
    reviews_count: 142,
    vip_zones: ["Royal Mezzanine", "Amber Crystal Suite", "Private Stage Balcony"]
  },
  {
    id: 2,
    name: "Darling Gentlemen's Club",
    slug: "darling-gentlemens-club-barcelona",
    short_description: "Ultra-modern luxury lounge featuring intimate booths, ambient mood lighting, and top-tier hospitality for discerning visitors.",
    full_description: "Darling Club is renowned for its contemporary velvet décor, ambient acoustic architecture, and warm hospitality. Featuring an expansive main showcase stage flanked by plush circular leather booths, Darling caters to private parties, overseas tourists, and VIP bottle service seekers.",
    address: "Carrer de Muntaner, 34, 08011 Barcelona",
    neighborhood: "Eixample Esquerra",
    city: "Barcelona",
    opening_hours: "22:30 - 05:30 (Daily)",
    phone: "+34 934 518 733",
    website: "https://darlingclubbarcelona.com",
    map_url: "https://maps.google.com/?q=Carrer+de+Muntaner+34+Barcelona",
    featured_image: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop"
    ],
    facilities: ["Central Stage", "Cocktail Bar", "VIP Booths", "Air Conditioning", "Card Payments Accepted"],
    dress_code: "Smart Casual",
    entry_fee: 25.00,
    is_featured: true,
    status: "active",
    rating: 4.8,
    reviews_count: 98,
    vip_zones: ["Velvet Ring Tables", "Private Velvet Booths"]
  },
  {
    id: 3,
    name: "Eden Private Club Barcelona",
    slug: "eden-private-club-barcelona",
    short_description: "Discreet and sophisticated club near Gothic Quarter, popular for high-profile bachelor weekends and private bookings.",
    full_description: "Eden combines an intimate private club feeling with vibrant nightlife energy. With secluded private lounges and an extensive spirits menu, Eden has hosted thousands of successful bachelor parties and international travelers seeking a memorable, secure night in Barcelona.",
    address: "Plaça Reial, 9, 08002 Barcelona",
    neighborhood: "Gothic Quarter",
    city: "Barcelona",
    opening_hours: "23:00 - 06:00 (Wed-Sun)",
    phone: "+34 933 189 021",
    website: "https://edenbarcelona.com",
    map_url: "https://maps.google.com/?q=Placa+Reial+9+Barcelona",
    featured_image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop"
    ],
    facilities: ["Secluded Rooms", "Bottle Service", "Limousine Drop-off Point", "Bilingual Hosts"],
    dress_code: "Nightlife Chic",
    entry_fee: 25.00,
    is_featured: true,
    status: "active",
    rating: 4.7,
    reviews_count: 84,
    vip_zones: ["Gothic Vault Suite", "Gold Lounge"]
  },
  {
    id: 4,
    name: "Velvet Cabaret Club",
    slug: "velvet-cabaret-club-barcelona",
    short_description: "Lavish French cabaret-inspired interior with high ceilings, private booths, and premium table service.",
    full_description: "Velvet Cabaret offers a sensory journey reminiscent of Moulin Rouge styling updated for contemporary Barcelona nightlife. Featuring choreographed stage performances, private dance areas, and fine champagne service, Velvet is the connoisseur's choice.",
    address: "Carrer d'Aribau, 68, 08036 Barcelona",
    neighborhood: "Eixample",
    city: "Barcelona",
    opening_hours: "22:00 - 05:30 (Daily)",
    phone: "+34 934 876 112",
    website: "https://velvetcabaretbcn.com",
    map_url: "https://maps.google.com/?q=Carrer+dAribau+68+Barcelona",
    featured_image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=800&auto=format&fit=crop"
    ],
    facilities: ["Cabaret Stage", "Cigar Lounge Area", "Premium Champagne Bar", "Exclusive VIP Tables"],
    dress_code: "Elegant / Smart Casual",
    entry_fee: 30.00,
    is_featured: false,
    status: "active",
    rating: 4.9,
    reviews_count: 110,
    vip_zones: ["Imperial Cabaret Table", "Private Salon Rouge"]
  },
  {
    id: 5,
    name: "NightCity Club Barcelona",
    slug: "nightcity-club-barcelona",
    short_description: "Spacious multi-level venue near the Port Olímpic district with stage lighting, laser effects, and party packages.",
    full_description: "Ideal for large groups, bachelor celebrations, and energetic partygoers, NightCity Club features high-energy sound systems, private mezzanine seating, and direct access to beachfront nightlife. Perfect for groups wishing to combine seaside Barcelona nightlife with private entertainment.",
    address: "Passeig Marítim de la Barceloneta, 38, 08003 Barcelona",
    neighborhood: "Port Olímpic",
    city: "Barcelona",
    opening_hours: "23:00 - 06:00 (Daily)",
    phone: "+34 932 210 994",
    website: "https://nightcitybcn.com",
    map_url: "https://maps.google.com/?q=Passeig+Maritim+Barceloneta+38+Barcelona",
    featured_image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [
      "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop"
    ],
    facilities: ["Multi-Level Layout", "Private Mezzanine", "Shisha Bar", "Group Packages", "Limo Parking"],
    dress_code: "Casual Chic",
    entry_fee: 20.00,
    is_featured: false,
    status: "active",
    rating: 4.6,
    reviews_count: 73,
    vip_zones: ["Skybox Mezzanine", "Ocean VIP Lounge"]
  }
];

export const INITIAL_PACKAGES: Package[] = [
  {
    id: 1,
    name: "Stag Party Premier Barcelona",
    slug: "stag-party-premier-barcelona",
    category: "Stag Party",
    short_description: "The ultimate stag celebration in Barcelona with private VIP booth, 2 premium spirits, and personal hostess greeting.",
    full_description: "Tailored for unforgettable bachelor weekends. Enjoy expedited queue jump at Barcelona's premier venue, a prime reserved VIP table for your entire group, 2 full 70cl bottles of premium spirit (Grey Goose / Jack Daniel's / Hendrick's) with unlimited soft mixers, and a welcoming champagne toast for the groom-to-be.",
    regular_price: 650.00,
    sale_price: 550.00,
    currency: "EUR",
    min_guests: 4,
    max_guests: 12,
    duration: "Full Night Entry",
    inclusions: [
      "Fast-Track VIP Queue Skip for up to 10 guests",
      "Reserved Prime VIP Table overlooking the stage",
      "2x 70cl Premium Spirit Bottles (Grey Goose / Whiskey / Gin)",
      "Unlimited Mixers & Energy Drinks",
      "Welcome Champagne Toast for the Stag",
      "Dedicated Table Hostess throughout the night"
    ],
    exclusions: ["Transportation (Optional Add-on)", "Special request vintage champagnes"],
    featured_image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=800&auto=format&fit=crop"
    ],
    is_featured: true,
    is_active: true,
    badge: "Most Popular",
    options: [
      {
        id: 101,
        package_id: 1,
        option_name: "Stretch Lincoln Limousine Transfer",
        description: "1-hour city cruise with chilled cava bottle & VIP club drop-off",
        price: 180.00,
        is_required: false,
        default_quantity: 1,
        max_quantity: 3,
        is_active: true
      },
      {
        id: 102,
        package_id: 1,
        option_name: "Extra Premium Spirit Bottle (70cl)",
        description: "Choose from Grey Goose, Belvedere, Hendrick's, or Black Label",
        price: 160.00,
        is_required: false,
        default_quantity: 1,
        max_quantity: 5,
        is_active: true
      },
      {
        id: 103,
        package_id: 1,
        option_name: "Dom Pérignon Vintage Champagne (75cl)",
        description: "Served on ice with sparkling pyrotechnic presentation",
        price: 380.00,
        is_required: false,
        default_quantity: 1,
        max_quantity: 4,
        is_active: true
      }
    ]
  },
  {
    id: 2,
    name: "VIP Table & Premium Bottle Service",
    slug: "vip-table-premium-bottle-service",
    category: "VIP Table",
    short_description: "Intimate and luxurious VIP table reservation with top-shelf bottle for small groups or private guests.",
    full_description: "Experience Barcelona nightlife at its most sophisticated. Enjoy complimentary entry for up to 4 guests, front-row or secluded mezzanine seating, 1 premium 70cl spirit bottle with mixers, and attentive discrete service.",
    regular_price: 350.00,
    sale_price: 290.00,
    currency: "EUR",
    min_guests: 1,
    max_guests: 4,
    duration: "Full Night Entry",
    inclusions: [
      "VIP Entry & Coat Check for up to 4 guests",
      "Reserved Center Table or Mezzanine Booth",
      "1x 70cl Premium Bottle of Choice",
      "Selection of Premium Mixers",
      "VIP Table Attendant"
    ],
    exclusions: ["Hotel transfer"],
    featured_image: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop"
    ],
    is_featured: true,
    is_active: true,
    badge: "Best Value",
    options: [
      {
        id: 201,
        package_id: 2,
        option_name: "Mercedes S-Class Private Chauffeur Pickup",
        description: "Direct luxury transfer from your Barcelona hotel or restaurant",
        price: 95.00,
        is_required: false,
        default_quantity: 1,
        max_quantity: 2,
        is_active: true
      },
      {
        id: 202,
        package_id: 2,
        option_name: "Upgrade to Moët & Chandon Brut Impérial",
        description: "Upgrade bottle to Moët & Chandon Champagne",
        price: 85.00,
        is_required: false,
        default_quantity: 1,
        max_quantity: 3,
        is_active: true
      }
    ]
  },
  {
    id: 3,
    name: "The Bachelor King VIP Package",
    slug: "bachelor-king-vip-package",
    category: "Bachelor Elite",
    short_description: "The supreme all-inclusive Barcelona nightlife experience with Hummer limousine, private lounge, and 4 bottles.",
    full_description: "Created specifically for groups demanding absolute perfection. Includes pick up in an immense Hummer or Chrysler limousine with complimentary cava, direct priority red-carpet escort into the club, a private dedicated salon area, 4 premium spirit bottles, and continuous concierge attention.",
    regular_price: 1350.00,
    sale_price: 1190.00,
    currency: "EUR",
    min_guests: 6,
    max_guests: 18,
    duration: "Full Night Entry & Transport",
    inclusions: [
      "Private 1-Hour Hummer / Chrysler Limo Tour with 3 Cava Bottles",
      "Immediate Red Carpet Queue Bypass for entire party",
      "Exclusive Private VIP Salon / Section for the night",
      "4x 70cl Top-Shelf Spirit Bottles (Grey Goose, Jack Daniel's, etc.)",
      "Unlimited Soft Mixers & Red Bull",
      "Special Stag Commemorative Bottle Presentation with Sparklers",
      "Dedicated Security & Personal VIP Host"
    ],
    exclusions: [],
    featured_image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop"
    ],
    is_featured: true,
    is_active: true,
    badge: "Ultimate VIP",
    options: [
      {
        id: 301,
        package_id: 3,
        option_name: "Return Limousine Transfer (End of Night)",
        description: "Scheduled late-night chauffeur return back to accommodation",
        price: 190.00,
        is_required: false,
        default_quantity: 1,
        max_quantity: 2,
        is_active: true
      }
    ]
  },
  {
    id: 4,
    name: "Couples & Private Duo Experience",
    slug: "couples-private-duo-experience",
    category: "Couple",
    short_description: "Designed for open-minded couples and duos seeking an elegant, discrete evening in a luxury cabaret setting.",
    full_description: "Barcelona is world-renowned for its progressive and elegant adult entertainment culture. This package provides open-minded couples with an intimate, welcoming environment. Features discreet reserved booth seating, a bottle of fine French champagne, and personalized service.",
    regular_price: 260.00,
    sale_price: 220.00,
    currency: "EUR",
    min_guests: 2,
    max_guests: 2,
    duration: "Full Night Entry",
    inclusions: [
      "Discreet VIP Entry for 2",
      "Intimate Private Booth Seating",
      "1x Bottle of Moët & Chandon Brut",
      "Artisan Chocolates & Strawberries",
      "Discrete Hospitality"
    ],
    exclusions: [],
    featured_image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1200&auto=format&fit=crop",
    gallery_images: [],
    is_featured: false,
    is_active: true,
    badge: "Couples Favorite",
    options: []
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 1,
    booking_reference: "BCN-2026-8819",
    customer_id: 1,
    club_id: 1,
    club_name: "Club Bacarra Barcelona",
    package_id: 1,
    package_name: "Stag Party Premier Barcelona",
    guest_name: "Marcus Davies",
    guest_email: "marcus.davies.uk@gmail.com",
    guest_phone: "+44 7911 123456",
    guest_whatsapp: "+44 7911 123456",
    reservation_date: "2026-10-03",
    preferred_time: "23:30",
    number_of_guests: 8,
    pickup_requested: true,
    pickup_location: "W Barcelona Hotel, Plaça Rosa Del Vents 1",
    pickup_vehicle_type: "Lincoln Stretch Limousine",
    total_amount: 730.00,
    deposit_amount: 146.00,
    currency: "EUR",
    status: "confirmed",
    customer_notes: "Groom's name is George. Please ensure sparkler presentation on arrival.",
    admin_notes: "Lincoln limo booked with Transports BCN for 22:45. VIP Table 4 assigned.",
    created_at: "2026-09-24T18:30:00Z"
  },
  {
    id: 2,
    booking_reference: "BCN-2026-8824",
    customer_id: 2,
    club_id: 2,
    club_name: "Darling Gentlemen's Club",
    package_id: 2,
    package_name: "VIP Table & Premium Bottle Service",
    guest_name: "Alexandre Dupont",
    guest_email: "dupont.alex@orange.fr",
    guest_phone: "+33 612 345678",
    guest_whatsapp: "+33 612 345678",
    reservation_date: "2026-10-04",
    preferred_time: "00:00",
    number_of_guests: 3,
    pickup_requested: false,
    total_amount: 290.00,
    deposit_amount: 58.00,
    currency: "EUR",
    status: "pending",
    customer_notes: "Prefer Hendrick's Gin with Fever-Tree tonic.",
    admin_notes: "Awaiting WhatsApp confirmation from guest.",
    created_at: "2026-09-25T08:15:00Z"
  },
  {
    id: 3,
    booking_reference: "BCN-2026-8802",
    customer_id: 3,
    club_id: 3,
    club_name: "Eden Private Club Barcelona",
    package_id: 3,
    package_name: "The Bachelor King VIP Package",
    guest_name: "Julian Weber",
    guest_email: "j.weber.berlin@gmx.de",
    guest_phone: "+49 170 9876543",
    guest_whatsapp: "+49 170 9876543",
    reservation_date: "2026-09-26",
    preferred_time: "23:00",
    number_of_guests: 11,
    pickup_requested: true,
    pickup_location: "Arts Hotel Barcelona",
    pickup_vehicle_type: "Hummer H2 Limo",
    total_amount: 1380.00,
    deposit_amount: 276.00,
    currency: "EUR",
    status: "confirmed",
    customer_notes: "Group arriving from Germany for 30th birthday.",
    admin_notes: "Hummer arranged. Deposit settled via Stripe.",
    created_at: "2026-09-23T14:20:00Z"
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 1,
    name: "Marcus Davies",
    email: "marcus.davies.uk@gmail.com",
    phone: "+44 7911 123456",
    whatsapp: "+44 7911 123456",
    total_reservations: 1,
    total_spend: 730.00,
    notes: "VIP guest from London. Great communicator via WhatsApp.",
    created_at: "2026-09-24T18:30:00Z"
  },
  {
    id: 2,
    name: "Alexandre Dupont",
    email: "dupont.alex@orange.fr",
    phone: "+33 612 345678",
    whatsapp: "+33 612 345678",
    total_reservations: 1,
    total_spend: 290.00,
    notes: "Parisian corporate visitor.",
    created_at: "2026-09-25T08:15:00Z"
  },
  {
    id: 3,
    name: "Julian Weber",
    email: "j.weber.berlin@gmx.de",
    phone: "+49 170 9876543",
    whatsapp: "+49 170 9876543",
    total_reservations: 2,
    total_spend: 2150.00,
    notes: "Repeat VIP group organizer from Berlin.",
    created_at: "2026-09-23T14:20:00Z"
  }
];

export const INITIAL_PAYMENT_GATEWAYS: PaymentGateway[] = [
  {
    id: 1,
    name: "Stripe VIP Checkout",
    provider: "stripe",
    enabled: true,
    test_mode: true,
    public_key: "pk_test_51Mz0...xK9",
    secret_key: "••••••••••••••••••••••••",
    webhook_secret: "whsec_••••••••••••••••",
    description: "Accepts Visa, Mastercard, Apple Pay, and Google Pay with zero raw card data stored on server."
  },
  {
    id: 2,
    name: "Redsys Spain (Banco Santander / CaixaBank)",
    provider: "redsys",
    enabled: false,
    test_mode: true,
    public_key: "348921094",
    secret_key: "••••••••••••••••••••••••",
    description: "Official Spanish merchant virtual POS redirection gateway."
  },
  {
    id: 3,
    name: "SEPA Bank Wire Transfer",
    provider: "bank_transfer",
    enabled: true,
    test_mode: false,
    description: "Direct bank transfer for corporate bookings and high-value stag party deposits."
  },
  {
    id: 4,
    name: "On-Arrival VIP Concierge Settlement",
    provider: "cash_on_arrival",
    enabled: true,
    test_mode: false,
    description: "Pay balance directly at the venue door or to the private limousine chauffeur upon arrival."
  }
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 1,
    title: "Barcelona's Premier Adult Entertainment & VIP Reservations",
    subtitle: "Direct access to licensed luxury clubs, exclusive tables, and bespoke bachelor party packages.",
    desktop_image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop",
    button_text: "Reserve VIP Table",
    button_url: "#reservations",
    secondary_button_text: "WhatsApp Concierge",
    secondary_button_url: "https://wa.me/34600123456",
    placement: "homepage_hero",
    is_active: true,
    sort_order: 1
  },
  {
    id: 2,
    title: "Stag Party Specials — Limousine & VIP Entry",
    subtitle: "Complimentary bottle of cava and luxury transport upgrade for groups of 6 or more.",
    desktop_image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1600&auto=format&fit=crop",
    button_text: "Explore Stag Packages",
    button_url: "#packages",
    placement: "packages_banner",
    is_active: true,
    sort_order: 2
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    customer_name: "Oliver B.",
    customer_country: "London, United Kingdom",
    event_type: "Bachelor Party of 10",
    text: "Organized my brother's stag party in Barcelona through this service. Everything was flawless: the stretch limo met us right outside our hotel, and when we arrived at Bacarra, we skipped the entire queue straight into our private booth. Totally transparent pricing, zero tourist scams.",
    rating: 5,
    date: "September 2026"
  },
  {
    id: 2,
    customer_name: "Guillaume L.",
    customer_country: "Lyon, France",
    event_type: "VIP Table Reservation",
    text: "Service conciergerie impeccable. Réservation rapide sur WhatsApp, confirmation instantanée, et accueil au club Darling digne d'un établissement 5 étoiles. Je recommande vivement pour une soirée haut de gamme à Barcelone.",
    rating: 5,
    date: "August 2026"
  },
  {
    id: 3,
    customer_name: "Christian M.",
    customer_country: "Munich, Germany",
    event_type: "Group Night Out",
    text: "Very professional communication in English. We felt completely safe and respected. Great atmosphere, beautiful venue, and the bottle service was top quality. Will definitely book again next time we are in Barcelona.",
    rating: 5,
    date: "August 2026"
  },
  {
    id: 4,
    customer_name: "Dave K.",
    customer_country: "Dublin, Ireland",
    event_type: "Stag Weekend",
    text: "Saved us immense hassle. Trying to get 12 lads into top clubs in Barcelona without a prior booking is impossible. These guys took care of the booking, transport, and drinks before we even landed. 10/10.",
    rating: 5,
    date: "July 2026"
  }
];

export const INITIAL_FAQS: FAQ[] = [
  {
    id: 1,
    category: "Reservations & Booking",
    question: "How do I secure our reservation, and do we need to pay in advance?",
    answer: "You can reserve directly through our online booking form or via our 24/7 WhatsApp concierge. To secure your VIP table and queue-skip privileges, a modest 20% deposit is payable online or via bank transfer. The remaining balance can be settled comfortably at the venue upon arrival or with your private chauffeur."
  },
  {
    id: 2,
    category: "Dress Code & Entry",
    question: "What is the dress code for Barcelona gentlemen's and adult clubs?",
    answer: "The standard dress code across top Barcelona clubs is Smart Casual or Elegant. Collared shirts, stylish t-shirts, and dark smart jeans with clean dress shoes or clean minimalist sneakers are accepted. Please avoid beach shorts, flip-flops, sportswear tracksuits, or football club jerseys, as doormen enforce standard venue admission policies."
  },
  {
    id: 3,
    category: "Safety & Legal Compliance",
    question: "Are the clubs licensed, safe, and lawful establishments?",
    answer: "Yes, 100%. All venues listed on our platform are fully licensed, inspected, and legally registered entertainment and hospitality venues operating under Spanish and Catalan municipal regulations. They feature professional security staff, transparent computerized menu pricing, and strict adherence to patron safety and dignity."
  },
  {
    id: 4,
    category: "Bachelor & Stag Groups",
    question: "Can large stag parties be accommodated easily?",
    answer: "Absolutely. Barcelona is one of Europe's premier bachelor weekend destinations. Our packages are specifically calibrated for stag groups of 4 to 30 people, ensuring guaranteed admission, combined VIP tables, bottle service, and optional stretch limousine transfers."
  },
  {
    id: 5,
    category: "Discretion & Billing",
    question: "How is payment discretion handled on bank statements?",
    answer: "Discretion is our absolute priority. Online deposit transactions appear under a neutral corporate hospitality name (e.g. 'BCN Hospitality Services S.L.') with no reference to nightlife or adult entertainment."
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 1,
    filename: "club-bacarra-main.webp",
    original_name: "bacarra_vip_salon.jpg",
    url: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1200&auto=format&fit=crop",
    mime_type: "image/webp",
    size_kb: 142,
    folder: "clubs",
    alt_text: "Club Bacarra luxury VIP lounge interior"
  },
  {
    id: 2,
    filename: "darling-lounge.webp",
    original_name: "darling_velvet_tables.jpg",
    url: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1200&auto=format&fit=crop",
    mime_type: "image/webp",
    size_kb: 168,
    folder: "clubs",
    alt_text: "Darling Gentlemen's Club velvet booth and ambient lighting"
  },
  {
    id: 3,
    filename: "limo-transfer.webp",
    original_name: "lincoln_limousine_bcn.jpg",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
    mime_type: "image/webp",
    size_kb: 210,
    folder: "packages",
    alt_text: "VIP Barcelona Limousine Transfer"
  },
  {
    id: 4,
    filename: "champagne-celebration.webp",
    original_name: "champagne_vip_service.jpg",
    url: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1200&auto=format&fit=crop",
    mime_type: "image/webp",
    size_kb: 185,
    folder: "gallery",
    alt_text: "VIP Bottle service with sparklers and luxury champagne"
  },
  {
    id: 5,
    filename: "hero-nightlife.webp",
    original_name: "barcelona_nightlife_glamour.jpg",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop",
    mime_type: "image/webp",
    size_kb: 245,
    folder: "banners",
    alt_text: "Barcelona nightlife entertainment stage and crowd"
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  site_name: "Strip Clubs Barcelona",
  tagline: "VIP Nightlife & Luxury Adult Venue Reservations",
  phone: "+34 931 234 567",
  whatsapp_number: "+34 600 123 456",
  whatsapp_prefilled_text: "Hello, I would like to inquire about VIP club reservations and packages in Barcelona.",
  email: "reservations@stripclubsbcn.com",
  address: "Passeig de Gràcia, 45, Eixample, 08007 Barcelona, Spain",
  opening_hours: "Concierge 24/7 | Clubs 22:00 - 06:00",
  currency: "EUR",
  default_language: "en",
  age_gate_enabled: true,
  minimum_age: 18,
  deposit_percentage: 20,
  google_maps_url: "https://maps.google.com/?q=Barcelona+Spain",
  instagram_url: "https://instagram.com/stripclubsbcn_official",
  telegram_url: "https://t.me/bcnnightlifevip",
  seo_default_title: "Strip Clubs Barcelona | Luxury Adult Entertainment & VIP Reservations",
  seo_default_description: "Premier Barcelona adult-entertainment venues, VIP tables, stag party packages, and bespoke nightlife hospitality. Guaranteed queue skip and discrete booking."
};

export const INITIAL_ACTIVITY_LOGS: ActivityLogItem[] = [
  {
    id: 1,
    user: "Admin System",
    action: "reservation.confirmed",
    description: "Reservation BCN-2026-8819 for Marcus Davies confirmed with Lincoln Limo.",
    timestamp: "2026-09-24 19:10"
  },
  {
    id: 2,
    user: "Staff Concierge",
    action: "club.updated",
    description: "Updated opening hours and VIP zone list for Club Bacarra.",
    timestamp: "2026-09-24 16:45"
  },
  {
    id: 3,
    user: "Admin System",
    action: "gateway.toggled",
    description: "Stripe VIP Checkout updated to Live Test Mode.",
    timestamp: "2026-09-23 11:20"
  }
];

export const INITIAL_MENUS: MenuItem[] = [
  { id: 1, title: "Home", url: "#home", sort_order: 1, is_active: true },
  { id: 2, title: "Clubs", url: "#clubs", sort_order: 2, is_active: true },
  { id: 3, title: "VIP Packages", url: "#packages", sort_order: 3, is_active: true },
  { id: 4, title: "Reservations", url: "#reservations", sort_order: 4, is_active: true },
  { id: 5, title: "Gallery", url: "#gallery", sort_order: 5, is_active: true },
  { id: 6, title: "FAQ", url: "#faq", sort_order: 6, is_active: true },
  { id: 7, title: "Contact", url: "#contact", sort_order: 7, is_active: true }
];
