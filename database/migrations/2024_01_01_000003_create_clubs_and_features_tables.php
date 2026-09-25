<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Club Categories
        Schema::create('club_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Clubs
        Schema::create('clubs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('club_categories')->nullOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('short_description');
            $table->longText('full_description')->nullable();
            $table->string('address');
            $table->string('neighborhood')->nullable(); // Eixample, Gothic Quarter, Port Olimpic
            $table->string('city')->default('Barcelona');
            $table->string('postal_code')->nullable();
            $table->string('opening_hours')->default('22:00 - 06:00');
            $table->string('phone')->nullable();
            $table->string('website')->nullable();
            $table->text('map_url')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('featured_image');
            $table->json('gallery_images')->nullable();
            $table->json('facilities')->nullable(); // e.g. ["VIP Rooms", "Valet Parking", "Champagne Lounge"]
            $table->enum('status', ['active', 'inactive', 'draft'])->default('active');
            $table->boolean('is_featured')->default(false);
            $table->integer('sort_order')->default(0);
            $table->string('dress_code')->default('Smart Casual / Elegant');
            $table->decimal('entry_fee', 8, 2)->default(0.00);
            $table->string('seo_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->timestamps();
        });

        // Club Features
        Schema::create('club_features', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('icon')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Club - Feature Pivot
        Schema::create('club_club_feature', function (Blueprint $table) {
            $table->foreignId('club_id')->constrained()->cascadeOnDelete();
            $table->foreignId('club_feature_id')->constrained()->cascadeOnDelete();
            $table->primary(['club_id', 'club_feature_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('club_club_feature');
        Schema::dropIfExists('club_features');
        Schema::dropIfExists('clubs');
        Schema::dropIfExists('club_categories');
    }
};
