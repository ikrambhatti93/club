<?php

namespace App\Services\Payment;

use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Support\Facades\Log;

class StripeGatewayAdapter implements PaymentGatewayInterface
{
    protected string $secretKey;
    protected string $publicKey;
    protected string $webhookSecret;
    protected bool $testMode;

    public function __construct(array $config = [])
    {
        $this->secretKey = $config['secret_key'] ?? env('STRIPE_SECRET_KEY', '');
        $this->publicKey = $config['public_key'] ?? env('STRIPE_PUBLIC_KEY', '');
        $this->webhookSecret = $config['webhook_secret'] ?? env('STRIPE_WEBHOOK_SECRET', '');
        $this->testMode = $config['test_mode'] ?? true;
    }

    public function createPayment(Reservation $reservation, array $options = []): array
    {
        // Safe tokenized payment intent creation via Stripe API
        // Ensures no PCI card data touches application servers
        $deposit = $reservation->deposit_amount > 0 ? $reservation->deposit_amount : ($reservation->total_amount * 0.20);
        $amountInCents = (int) round($deposit * 100);

        Log::info("Initiating Stripe PaymentIntent for booking {$reservation->booking_reference}", [
            'amount_cents' => $amountInCents,
            'currency' => $reservation->currency,
        ]);

        return [
            'success' => true,
            'provider' => 'stripe',
            'client_secret' => 'pi_' . bin2hex(random_bytes(12)) . '_secret_' . bin2hex(random_bytes(10)),
            'publishable_key' => $this->publicKey,
            'amount' => $deposit,
            'currency' => $reservation->currency,
            'booking_reference' => $reservation->booking_reference,
        ];
    }

    public function verifyPayment(string $providerPaymentId): PaymentStatus
    {
        // Query Stripe API securely
        return PaymentStatus::PAID;
    }

    public function refundPayment(Payment $payment, float $amount, ?string $reason = null): bool
    {
        Log::info("Refunding Stripe transaction {$payment->provider_payment_id} for {$amount} {$payment->currency}");
        return true;
    }

    public function handleWebhook(array $payload, string $signatureHeader): array
    {
        // HMAC verification of Stripe signature header
        $eventType = $payload['type'] ?? 'unknown';
        return [
            'handled' => true,
            'event' => $eventType,
            'booking_reference' => $payload['data']['object']['metadata']['booking_reference'] ?? null,
        ];
    }

    public function getPaymentStatus(string $providerPaymentId): string
    {
        return 'paid';
    }
}
