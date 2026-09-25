<?php

namespace App\Services\Payment;

use App\Models\Payment;
use App\Models\Reservation;

interface PaymentGatewayInterface
{
    /**
     * Initialize a payment intent/charge for a reservation.
     * Never stores or accepts raw PAN/CVV. Returns tokenized redirect or client secret.
     */
    public function createPayment(Reservation $reservation, array $options = []): array;

    /**
     * Verify payment status using transaction ID from provider.
     */
    public function verifyPayment(string $providerPaymentId): PaymentStatus;

    /**
     * Process refund for a paid transaction.
     */
    public function refundPayment(Payment $payment, float $amount, ?string $reason = null): bool;

    /**
     * Securely handle incoming provider webhook payload.
     */
    public function handleWebhook(array $payload, string $signatureHeader): array;

    /**
     * Retrieve status string enum.
     */
    public function getPaymentStatus(string $providerPaymentId): string;
}

enum PaymentStatus: string
{
    case PENDING = 'pending';
    case AUTHORIZED = 'authorized';
    case PAID = 'paid';
    case FAILED = 'failed';
    case REFUNDED = 'refunded';
    case CANCELLED = 'cancelled';
}
