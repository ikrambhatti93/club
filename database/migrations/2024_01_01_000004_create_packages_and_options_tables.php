<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Package Categories (VIP, Stag Party, Couple, Economy, Group)
        Schema::create('package_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Packages
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('package_categories')->cascadeOnDelete();
            $table->foreignId('preferred_club_id')->nullable()->constrained('clubs')->nullOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('short_description');
            $table->longText('full_description')->nullable();
            $table->decimal('regular_price', 10, 2);
            $table->decimal('sale_price', 10, 2)->nullable();
            $table->string('currency', 3)->default('EUR');
            $table->integer('min_guests')->default(1);
            $table->integer('max_guests')->default(30);
            $table->string('duration')->nullable(); // e.g. "Full Night" or "3 Hours"
            $table->json('inclusions')->nullable(); // e.g. ["Priority VIP Entry", "Reserved Lounge", "1 Premium Bottle", "Hostess Greeting"]
            $table->json('exclusions')->nullable();
            $table->string('featured_image');
            $table->json('gallery_images')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->string('badge')->nullable(); // "Best Seller", "Stag Favorite", "VIP Exclusive"
            $table->string('seo_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->timestamps();
        });

        // Package Options / Add-ons (e.g., Limousine Transfer, Extra Champagne, VIP Security)
        Schema::create('package_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('package_id')->constrained()->cascadeOnDelete();
            $table->string('option_name');
            $table->text('description')->nullable();
            $table->decimal('price', 8, 2)->default(0.00);
            $table->boolean('is_required')->default(false);
            $table->integer('default_quantity')->default(1);
            $table->integer('max_quantity')->default(10);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('package_options');
        Schema::dropIfExists('packages');
        Schema::dropIfExists('package_categories');
    }
};
