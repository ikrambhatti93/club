<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Customers
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->index();
            $table->string('phone')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('country_code', 5)->nullable();
            $table->string('preferred_language', 5)->default('en');
            $table->text('internal_notes')->nullable();
            $table->integer('total_reservations')->default(0);
            $table->decimal('total_spend', 10, 2)->default(0.00);
            $table->timestamps();
        });

        // Reservations
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('booking_reference')->unique(); // e.g. BCN-2026-8941
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('club_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('package_id')->nullable()->constrained()->nullOnDelete();
            $table->string('guest_name');
            $table->string('guest_email');
            $table->string('guest_phone');
            $table->string('guest_whatsapp')->nullable();
            $table->date('reservation_date');
            $table->time('preferred_time')->default('23:00:00');
            $table->integer('number_of_guests')->default(2);
            $table->boolean('pickup_requested')->default(false);
            $table->string('pickup_location')->nullable();
            $table->string('pickup_vehicle_type')->nullable(); // Sedan, Stretch Limo, Luxury Van
            $table->decimal('total_amount', 10, 2)->default(0.00);
            $table->decimal('deposit_amount', 10, 2)->default(0.00);
            $table->string('currency', 3)->default('EUR');
            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed', 'no_show'])->default('pending');
            $table->text('customer_notes')->nullable();
            $table->text('admin_notes')->nullable();
            $table->boolean('consent_terms')->default(true);
            $table->boolean('is_age_confirmed')->default(true);
            $table->string('source_channel')->default('website'); // website, whatsapp_referral, concierge
            $table->timestamps();
        });

        // Reservation Items / Selected Addons
        Schema::create('reservation_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('package_option_id')->nullable()->constrained()->nullOnDelete();
            $table->string('item_name');
            $table->integer('quantity')->default(1);
            $table->decimal('unit_price', 10, 2)->default(0.00);
            $table->decimal('total_price', 10, 2)->default(0.00);
            $table->timestamps();
        });

        // Reservation Staff/Admin Notes
        Schema::create('reservation_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->text('note');
            $table->boolean('is_customer_visible')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservation_notes');
        Schema::dropIfExists('reservation_items');
        Schema::dropIfExists('reservations');
        Schema::dropIfExists('customers');
    }
};
