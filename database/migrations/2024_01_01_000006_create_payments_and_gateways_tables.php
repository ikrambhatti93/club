<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Payment Gateways
        Schema::create('payment_gateways', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g. "Stripe VIP Checkout", "Redsys Spain", "Bank Wire", "On-Arrival Concierge"
            $table->string('provider'); // stripe, redsys, bank_transfer, cash_on_arrival
            $table->boolean('enabled')->default(false);
            $table->boolean('test_mode')->default(true);
            $table->string('public_key')->nullable();
            $table->text('secret_key')->nullable(); // Encrypted at model level
            $table->string('webhook_secret')->nullable();
            $table->json('configuration')->nullable(); // fees, allowed cards, instructions
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Payments
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_id')->nullable()->constrained()->nullOnDelete();
            $table->string('provider'); // stripe, redsys, bank_transfer, concierge
            $table->string('provider_payment_id')->nullable()->index();
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('EUR');
            $table->enum('status', ['pending', 'authorized', 'paid', 'failed', 'refunded', 'cancelled'])->default('pending');
            $table->string('payment_method')->nullable(); // card, apple_pay, google_pay, wire, cash
            $table->timestamp('paid_at')->nullable();
            $table->json('metadata')->nullable(); // gateway transaction reference, tokenized metadata (NO PAN/CVV)
            $table->timestamps();
        });

        // Coupons / Promotional Discount Codes
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->enum('type', ['percentage', 'fixed'])->default('percentage');
            $table->decimal('value', 8, 2);
            $table->decimal('minimum_spend', 8, 2)->default(0.00);
            $table->integer('max_uses')->nullable();
            $table->integer('used_count')->default(0);
            $table->dateTime('valid_from')->nullable();
            $table->dateTime('valid_until')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('coupons');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('payment_gateways');
    }
};
