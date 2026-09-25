<?php

namespace Tests\Feature;

use App\Models\Club;
use App\Models\Package;
use App\Models\Reservation;
use App\Models\User;
use App\Services\Payment\PaymentManager;
use App\Services\Payment\StripeGatewayAdapter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReservationTest extends TestCase
{
    public function test_can_submit_valid_vip_reservation(): void
    {
        $club = Club::factory()->create();
        $package = Package::factory()->create(['preferred_club_id' => $club->id]);

        $payload = [
            'guest_name' => 'Alexander Scott',
            'guest_email' => 'alex.scott.vip@gmail.com',
            'guest_phone' => '+44 7700 900077',
            'reservation_date' => now()->addDays(5)->format('Y-m-d'),
            'preferred_time' => '23:30',
            'number_of_guests' => 6,
            'club_id' => $club->id,
            'package_id' => $package->id,
            'pickup_requested' => true,
            'pickup_location' => 'Hotel Arts Barcelona',
            'consent_terms' => true,
            'is_age_confirmed' => true,
        ];

        $response = $this->postJson('/api/reservations', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('success', true)
            ->assertJsonStructure(['booking_reference', 'reservation']);

        $this->assertDatabaseHas('reservations', [
            'guest_email' => 'alex.scott.vip@gmail.com',
            'status' => 'pending',
            'number_of_guests' => 6,
        ]);
    }

    public function test_reservation_requires_age_confirmation(): void
    {
        $payload = [
            'guest_name' => 'Underage Test',
            'guest_email' => 'test@example.com',
            'guest_phone' => '+34 600 000 000',
            'reservation_date' => now()->addDays(2)->format('Y-m-d'),
            'preferred_time' => '23:00',
            'number_of_guests' => 2,
            'consent_terms' => true,
            'is_age_confirmed' => false, // Fails 18+ requirement
        ];

        $response = $this->postJson('/api/reservations', $payload);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['is_age_confirmed']);
    }

    public function test_payment_manager_resolves_stripe_adapter(): void
    {
        $adapter = PaymentManager::resolve('stripe');
        $this->assertInstanceOf(StripeGatewayAdapter::class, $adapter);
    }
}
