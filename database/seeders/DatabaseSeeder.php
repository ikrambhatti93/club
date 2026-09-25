<?php

namespace Database\Seeders;

use App\Models\Club;
use App\Models\Package;
use App\Models\PaymentGateway;
use App\Models\Role;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Roles & Default Admin User
        $superAdminRole = Role::create([
            'name' => 'super_admin',
            'display_name' => 'Super Administrator',
            'description' => 'Full administrative access across all modules and settings'
        ]);

        Role::create([
            'name' => 'reservation_manager',
            'display_name' => 'Reservation Manager',
            'description' => 'Manages reservations, customer notes, and booking statuses'
        ]);

        User::create([
            'name' => 'Admin Concierge',
            'email' => 'admin@stripclubsbcn.com',
            'password' => Hash::make('BcnVip2026!Secure'),
            'role_id' => $superAdminRole->id,
            'is_active' => true,
        ]);

        // 2. Clubs Seed
        $bacarra = Club::create([
            'name' => "Club Bacarra Barcelona",
            'slug' => "club-bacarra-barcelona",
            'short_description' => "Barcelona's iconic high-end cabaret and gentlemen's lounge in central Eixample, boasting lavish private VIP suites.",
            'full_description' => "Established as one of the Catalan capital's most prestigious adult entertainment destinations, Club Bacarra blends timeless European glamour with cutting-edge nightlife hospitality. Located just off Passeig de Gràcia, it features world-class performers, an ultra-discrete VIP mezzanine, curated champagne cellar, and customized corporate & bachelor accommodations.",
            'address' => "Carrer de Balmes, 12, 08007 Barcelona",
            'neighborhood' => "Eixample",
            'city' => "Barcelona",
            'opening_hours' => "22:00 - 06:00 (Daily)",
            'phone' => "+34 932 154 892",
            'website' => "https://bacarrabarcelona.com",
            'map_url' => "https://maps.google.com/?q=Carrer+de+Balmes+12+Barcelona",
            'featured_image' => "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1200&auto=format&fit=crop",
            'facilities' => ["Private VIP Salons", "Valet Parking", "Champagne Cellar", "Shisha Lounge", "Multilingual Hostesses"],
            'dress_code' => "Smart Casual / Elegant",
            'entry_fee' => 30.00,
            'is_featured' => true,
            'status' => 'active',
        ]);

        $darling = Club::create([
            'name' => "Darling Gentlemen's Club",
            'slug' => "darling-gentlemens-club-barcelona",
            'short_description' => "Ultra-modern luxury lounge featuring intimate booths, ambient mood lighting, and top-tier hospitality.",
            'full_description' => "Darling Club is renowned for its contemporary velvet décor, ambient acoustic architecture, and warm hospitality.",
            'address' => "Carrer de Muntaner, 34, 08011 Barcelona",
            'neighborhood' => "Eixample Esquerra",
            'city' => "Barcelona",
            'opening_hours' => "22:30 - 05:30 (Daily)",
            'phone' => "+34 934 518 733",
            'website' => "https://darlingclubbarcelona.com",
            'map_url' => "https://maps.google.com/?q=Carrer+de+Muntaner+34+Barcelona",
            'featured_image' => "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1200&auto=format&fit=crop",
            'facilities' => ["Central Stage", "Cocktail Bar", "VIP Booths", "Air Conditioning"],
            'dress_code' => "Smart Casual",
            'entry_fee' => 25.00,
            'is_featured' => true,
            'status' => 'active',
        ]);

        // 3. Packages Seed
        $stagPkg = Package::create([
            'name' => "Stag Party Premier Barcelona",
            'slug' => "stag-party-premier-barcelona",
            'preferred_club_id' => $bacarra->id,
            'short_description' => "The ultimate stag celebration in Barcelona with private VIP booth, 2 premium spirits, and personal hostess greeting.",
            'full_description' => "Tailored for unforgettable bachelor weekends. Enjoy expedited queue jump at Barcelona's premier venue, a prime reserved VIP table for your entire group, 2 full 70cl bottles of premium spirit with unlimited soft mixers.",
            'regular_price' => 650.00,
            'sale_price' => 550.00,
            'currency' => "EUR",
            'min_guests' => 4,
            'max_guests' => 12,
            'duration' => "Full Night Entry",
            'inclusions' => [
                "Fast-Track VIP Queue Skip for up to 10 guests",
                "Reserved Prime VIP Table overlooking the stage",
                "2x 70cl Premium Spirit Bottles (Grey Goose / Whiskey / Gin)",
                "Unlimited Mixers & Energy Drinks",
                "Welcome Champagne Toast for the Stag"
            ],
            'featured_image' => "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
            'is_featured' => true,
            'is_active' => true,
            'badge' => "Most Popular"
        ]);

        $stagPkg->options()->createMany([
            [
                'option_name' => "Stretch Lincoln Limousine Transfer",
                'description' => "1-hour city cruise with chilled cava bottle & VIP club drop-off",
                'price' => 180.00,
                'default_quantity' => 1,
                'max_quantity' => 2,
                'is_active' => true
            ],
            [
                'option_name' => "Extra Premium Spirit Bottle (70cl)",
                'description' => "Grey Goose, Belvedere, or Hendrick's Gin",
                'price' => 160.00,
                'default_quantity' => 1,
                'max_quantity' => 5,
                'is_active' => true
            ]
        ]);

        // 4. Payment Gateways Seed
        PaymentGateway::create([
            'name' => 'Stripe VIP Checkout',
            'provider' => 'stripe',
            'enabled' => true,
            'test_mode' => true,
            'public_key' => 'pk_test_sample',
            'configuration' => ['allowed_methods' => ['card', 'apple_pay', 'google_pay']]
        ]);

        PaymentGateway::create([
            'name' => 'SEPA Bank Wire Transfer',
            'provider' => 'bank_transfer',
            'enabled' => true,
            'test_mode' => false,
            'configuration' => ['iban' => 'ES91 0049 1500 0512 3456 7890', 'bank' => 'Banco Santander']
        ]);

        PaymentGateway::create([
            'name' => 'On-Arrival VIP Concierge Settlement',
            'provider' => 'cash_on_arrival',
            'enabled' => true,
            'test_mode' => false,
            'configuration' => ['description' => 'Pay remaining balance upon door arrival']
        ]);

        // 5. Central Settings Seed
        Setting::set('site_name', 'Strip Clubs Barcelona', 'string', 'general');
        Setting::set('phone', '+34 931 234 567', 'string', 'contact');
        Setting::set('whatsapp_number', '+34 600 123 456', 'string', 'contact');
        Setting::set('email', 'reservations@stripclubsbcn.com', 'string', 'contact');
        Setting::set('currency', 'EUR', 'string', 'reservations');
        Setting::set('deposit_percentage', 20, 'integer', 'reservations');
        Setting::set('age_gate_enabled', true, 'boolean', 'compliance');
    }
}
