<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Central Settings (Key-Value with type, group)
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('string'); // string, text, boolean, json, integer
            $table->string('group')->default('general'); // general, contact, reservations, appearance, seo, social
            $table->string('label')->nullable();
            $table->timestamps();
        });

        // Contact Messages
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('subject');
            $table->text('message');
            $table->enum('status', ['new', 'read', 'replied', 'closed', 'spam'])->default('new');
            $table->text('reply_notes')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();
        });

        // Newsletter Subscribers
        Schema::create('newsletter_subscribers', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('language', 5)->default('en');
            $table->boolean('is_active')->default(true);
            $table->timestamp('subscribed_at')->useCurrent();
            $table->timestamps();
        });

        // SEO Metadata per route or custom path
        Schema::create('seo_metadata', function (Blueprint $table) {
            $table->id();
            $table->string('path')->unique(); // e.g. '/', '/clubs', '/packages', '/contact'
            $table->string('meta_title');
            $table->text('meta_description');
            $table->string('canonical_url')->nullable();
            $table->string('og_title')->nullable();
            $table->text('og_description')->nullable();
            $table->string('og_image')->nullable();
            $table->string('schema_type')->default('WebPage'); // LocalBusiness, Organization, WebPage
            $table->json('custom_schema_json')->nullable();
            $table->timestamps();
        });

        // 301/302 Redirects
        Schema::create('redirects', function (Blueprint $table) {
            $table->id();
            $table->string('source_url')->index();
            $table->string('target_url');
            $table->smallInteger('status_code')->default(301);
            $table->boolean('is_active')->default(true);
            $table->integer('hits')->default(0);
            $table->timestamps();
        });

        // Activity Logs (Admin Audit Trail)
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('user_name')->nullable();
            $table->string('action'); // e.g. "reservation.status_changed", "club.updated"
            $table->string('subject_type')->nullable(); // App\Models\Reservation
            $table->unsignedBigInteger('subject_id')->nullable();
            $table->text('description');
            $table->json('properties')->nullable(); // old vs new values
            $table->string('ip_address', 45)->nullable();
            $table->timestamps();
        });

        // Multilingual Translations Table
        Schema::create('translations', function (Blueprint $table) {
            $table->id();
            $table->string('translatable_type'); // App\Models\Club, App\Models\Package, etc.
            $table->unsignedBigInteger('translatable_id');
            $table->string('locale', 5); // en, es, fr
            $table->string('field'); // name, short_description, full_description
            $table->longText('value')->nullable();
            $table->timestamps();

            $table->index(['translatable_type', 'translatable_id', 'locale', 'field'], 'trans_lookup_idx');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('translations');
        Schema::dropIfExists('activity_logs');
        Schema::dropIfExists('redirects');
        Schema::dropIfExists('seo_metadata');
        Schema::dropIfExists('newsletter_subscribers');
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('settings');
    }
};
